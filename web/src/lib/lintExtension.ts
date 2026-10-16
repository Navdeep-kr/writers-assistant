import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface LintResult {
  message: string;
  from: number;
  to: number;
  ruleId: string;
  category: { id: string; name: string };
  replacements: { value: string }[];
}

export const LintExtension = Extension.create({
  name: 'lint',

  addOptions() {
    return {
      getResults: (text: string) => Promise.resolve([] as LintResult[]),
    };
  },

  addStorage() {
    return {
      results: [] as LintResult[],
    };
  },

  addProseMirrorPlugins() {
    const { getResults } = this.options;
    const storage = this.storage;

    return [
      new Plugin({
        key: new PluginKey('lint'),
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr, set) {
            set = set.map(tr.mapping, tr.doc);
            const results = tr.getMeta('lintResults');
            if (results) {
              storage.results = results;
              const decorations = results.map((result: LintResult) => {
                const color = result.category.id === 'TYPOS' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.4)';
                return Decoration.inline(result.from, result.to, {
                  style: `border-bottom: 2px wavy ${color}; cursor: pointer; background: transparent;`,
                  class: 'lint-error',
                  'data-message': result.message,
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
