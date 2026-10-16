import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAI } from './src/hooks/useAI';
import debounce from 'lodash.debounce';

export default function App() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { analyzeText, polishText, suggestions, score, insights, loading } = useAI();
  const scrollViewRef = useRef<ScrollView>(null);

  const debouncedAnalysis = useCallback(
    debounce((newText) => {
      analyzeText(newText);
    }, 1500),
    [analyzeText]
  );

  const handleTextChange = (newText) => {
    setText(newText);
    debouncedAnalysis(newText);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Logic for finishing recording and polishing
      setIsRecording(false);
      // Simulated transcription of a messy sentence
      const mockTranscription = "uhm so yeah i think we should like maybe start the project now but i'm not sure if the team is ready uh also the deadline is tight";
      const polished = await polishText(mockTranscription);
      setText(prev => prev + (prev ? ' ' : '') + polished);
      Alert.alert('✨ Magic Polish Applied', 'Filler words removed and grammar fixed!');
    } else {
      setIsRecording(true);
      // Logic for starting recording
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>✒️ Premium AI</Text>
          <Text style={styles.status}>Live Syncing...</Text>
        </View>
        <View style={[styles.scoreBadge, { borderColor: score < 70 ? '#f43f5e' : '#22d3ee' }]}>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      {/* Insights Bar */}
      <View style={styles.insightBar}>
        <View className={styles.insightItem}>
          <Text style={styles.insightLabel}>Readability</Text>
          <Text style={styles.insightValue}>{insights.readability?.grade}</Text>
        </View>
        <View className={styles.insightItem}>
          <Text style={styles.insightLabel}>Tones</Text>
          <Text style={styles.insightValue}>{insights.tones[0]}</Text>
        </View>
        {loading && <ActivityIndicator size="small" color="#22d3ee" style={{ marginLeft: 10 }} />}
      </View>

      {/* Main Editor */}
      <ScrollView style={styles.editorContainer} ref={scrollViewRef}>
        <TextInput
          multiline
          placeholder="Start your masterpiece here..."
          placeholderTextColor="#475569"
          style={styles.input}
          value={text}
          onChangeText={handleTextChange}
          autoFocus
        />
      </ScrollView>

      {/* Premium Floating Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.recordBtn, isRecording && styles.recordingActive]} 
          onPress={toggleRecording}
          activeOpacity={0.7}
        >
          <Text style={styles.recordIcon}>{isRecording ? '⏹' : '🎤'}</Text>
          <Text style={styles.recordText}>{isRecording ? 'Finishing...' : 'Voice Polish'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>✨ AI Magic</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestions Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Writing Insights ({suggestions.length})</Text>
          <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>AI LIVE</Text></View>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {suggestions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.noSuggestions}>Your writing is flawless. 💎</Text>
            </View>
          ) : (
            suggestions.map((s, i) => (
              <View key={i} style={styles.suggestionCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.suggestionCategory}>{s.rule?.category?.name || 'Grammar'}</Text>
                  <TouchableOpacity><Text style={styles.applyBtn}>Apply</Text></TouchableOpacity>
                </View>
                <Text style={styles.suggestionMessage}>{s.message}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030304',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0c0d0f',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  status: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  scoreBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  scoreText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
  insightBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  insightItem: {
    marginRight: 24,
  },
  insightLabel: {
    color: '#475569',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  insightValue: {
    color: '#22d3ee',
    fontSize: 12,
    fontWeight: '700',
  },
  editorContainer: {
    flex: 1,
    padding: 24,
  },
  input: {
    color: '#f8fafc',
    fontSize: 18,
    lineHeight: 28,
    textAlignVertical: 'top',
    fontWeight: '400',
  },
  controls: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  recordBtn: {
    flex: 1,
    height: 54,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 10,
  },
  recordingActive: {
    borderColor: '#f43f5e',
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
  },
  recordIcon: {
    fontSize: 18,
    color: '#fff',
  },
  recordText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  actionBtn: {
    flex: 1,
    height: 54,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  actionText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  bottomSheet: {
    backgroundColor: '#0c0d0f',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: 320,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  aiBadge: {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  aiBadgeText: {
    color: '#22d3ee',
    fontSize: 10,
    fontWeight: '900',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noSuggestions: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suggestionCategory: {
    color: '#8b5cf6',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  applyBtn: {
    color: '#22d3ee',
    fontSize: 12,
    fontWeight: '700',
  },
  suggestionMessage: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
  }
});
