import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';

class AIProvider extends ChangeNotifier {
  final String _baseUrl = 'http://localhost:4000/api';
  
  String _currentText = '';
  bool _loading = false;
  int _score = 100;
  List<dynamic> _suggestions = [];
  Map<String, dynamic> _insights = {
    'tones': ['neutral'],
    'aiLikelihood': 0,
    'readability': {'score': 100, 'grade': 'General'}
  };

  String get currentText => _currentText;
  bool get loading => _loading;
  int get score => _score;
  List<dynamic> get suggestions => _suggestions;
  Map<String, dynamic> get insights => _insights;
  
  int get aiLikelihood => _insights['aiLikelihood'] ?? 0;
  int get humanLikeness => 100 - aiLikelihood;
  
  String get humanLikenessLabel {
    if (humanLikeness > 80) return 'HUMAN';
    if (humanLikeness > 40) return 'MIXED';
    return 'AI DETECTED';
  }

  Color get humanLikenessColor {
    if (humanLikeness > 80) return Colors.tealAccent;
    if (humanLikeness > 40) return Colors.orangeAccent;
    return Colors.redAccent;
  }

  Timer? _debounce;

  void onTextChanged(String text) {
    _currentText = text;
    if (_debounce?.isActive ?? false) _debounce!.cancel();
    _debounce = Timer(const Duration(milliseconds: 1000), () {
      if (text.trim().length >= 5) {
        analyzeText(text);
      }
    });
    notifyListeners();
  }

  Future<void> analyzeText(String text) async {
    _loading = true;
    notifyListeners();

    try {
      // 1. Grammar & Style Check
      final grammarRes = await http.post(
        Uri.parse('$_baseUrl/ai/check-grammar'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'text': text}),
      );
      
      if (grammarRes.statusCode == 200) {
        final data = jsonDecode(grammarRes.body);
        _suggestions = data['matches'] ?? [];
        _score = data['score'] ?? 100;
      }

      // 2. Full Insights Analysis
      final insightsRes = await http.post(
        Uri.parse('$_baseUrl/ai/analyze'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'text': text}),
      );

      if (insightsRes.statusCode == 200) {
        _insights = jsonDecode(insightsRes.body);
      }

      // 3. Register Activity (Fire and Forget)
      http.post(
        Uri.parse('$_baseUrl/user/activity'),
        headers: {'Content-Type': 'application/json'},
      );

    } catch (e) {
      debugPrint('AI Analysis Error: $e');
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  Future<void> polishText() async {
    if (_currentText.isEmpty) return;
    
    _loading = true;
    notifyListeners();

    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/ai/improve-style'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'text': _currentText,
          'style': 'professional',
          'brandVoice': 'Clear, concise, and professional'
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _currentText = data['improved'] ?? _currentText;
        analyzeText(_currentText); // Re-analyze the polished text
      }
    } catch (e) {
      debugPrint('Polish Error: $e');
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _debounce?.cancel();
    super.dispose();
  }
}
