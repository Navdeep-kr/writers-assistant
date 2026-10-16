import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface SentimentSegment {
  text: string;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'urgent' | 'expert';
  origin?: 'ai' | 'human' | 'plagiarism';
  from: number;
  to: number;
}

const highlightColors: Record<string, string> = {
  // Sentiment
  positive: 'rgba(16, 185, 129, 0.1)',
  negative: 'rgba(244, 63, 94, 0.1)',
  urgent: 'rgba(245, 158, 11, 0.1)',
  expert: 'rgba(139, 92, 246, 0.1)',
  neutral: 'transparent',
  // Origin
  ai: 'rgba(239, 68, 68, 0.15)',      // Red
  human: 'rgba(16, 185, 129, 0.15)',   // Green
  plagiarism: 'rgba(59, 130, 246, 0.15)', // Blue
};

const highlightBorders: Record<string, string> = {
  // Sentiment
  positive: 'var(--success)',
  negative: 'var(--error)',
  urgent: 'var(--warning)',
  expert: 'var(--accent-violet)',
  neutral: 'transparent',
  // Origin
  ai: '#ef4444',      // Red
  human: '#10b981',   // Green
  plagiarism: '#3b82f6', // Blue
};

export const HeatmapExtension = Extension.create({
  name: 'heatmap',

  addStorage() {
    return {
      segments: [] as SentimentSegment[],
    };
  },

  addProseMirrorPlugins() {
    const storage = this.storage;

    return [
      new Plugin({
        key: new PluginKey('heatmap'),
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr, set) {
            set = set.map(tr.mapping, tr.doc);
            const segments = tr.getMeta('heatmapSegments');
            if (segments) {
              storage.segments = segments;
              const decorations = segments.map((segment: SentimentSegment) => {
                const type = segment.origin || segment.sentiment || 'neutral';
                const color = highlightBorders[type] === 'transparent' ? 'inherit' : highlightBorders[type];
                return Decoration.inline(segment.from, segment.to, {
                  style: `color: ${color}; transition: all 0.5s ease;`,
                  class: `segment-${type}`,
                  'data-segment-type': type,
                });
              });
              return DecorationSet.create(tr.doc, decorations);
            }
            return set;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});
