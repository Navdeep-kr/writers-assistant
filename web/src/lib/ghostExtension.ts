import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export const GhostExtension = Extension.create({
  name: 'ghost',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('ghost'),
        state: {
          init() {
            return { decorations: DecorationSet.empty, suggestion: null };
          },
          apply(tr, set) {
            const mappedDecos = set.decorations.map(tr.mapping, tr.doc);
            const ghostText = tr.getMeta('ghostSuggestion');
            
            if (ghostText !== undefined) {
              if (ghostText === null) {
                return { decorations: DecorationSet.empty, suggestion: null };
              }
              const { pos, text } = ghostText;
              const deco = Decoration.widget(pos, () => {
                const el = document.createElement('span');
                // Use a stable global class that matches our new CSS
                el.className = 'ghost-text-suggestion';
                el.innerText = text;
                return el;
              }, { side: 1 });
              return { decorations: DecorationSet.create(tr.doc, [deco]), suggestion: ghostText };
            }
            return { decorations: mappedDecos, suggestion: set.suggestion };
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)?.decorations;
          },
          handleKeyDown(view, event) {
            if (event.key === 'Tab') {
              const state = this.getState(view.state);
              if (state?.suggestion) {
                const { pos, text } = state.suggestion;
                view.dispatch(view.state.tr.insertText(text, pos).setMeta('ghostSuggestion', null));
                return true;
              }
            }
            return false;
          }
        },
      }),
    ];
  },
});
