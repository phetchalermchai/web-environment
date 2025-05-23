import { Command, Extension } from '@tiptap/core';
import { AllSelection, TextSelection, Transaction } from 'prosemirror-state';

export interface IndentOptions {
    types: string[];
    minLevel: number;
    maxLevel: number;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        indent: {
            indent: () => ReturnType;
            outdent: () => ReturnType;
        };
    }
}

export const Indent = Extension.create<IndentOptions>({
    name: 'indent',

    addOptions() {
        return {
            types: ['paragraph', 'heading', 'listItem', 'bulletList', 'orderedList'],
            minLevel: 0,
            maxLevel: 16,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        renderHTML: attributes => {
                            return attributes?.indent > this.options.minLevel ? { 'data-indent': attributes.indent } : null;
                        },
                        parseHTML: element => {
                            const level = Number(element.getAttribute('data-indent'));
                            return level && level > this.options.minLevel ? level : null;
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        const setNodeIndentMarkup = (tr: Transaction, pos: number, delta: number): Transaction => {
            const node = tr?.doc?.nodeAt(pos);

            if (node) {
                const nextLevel = (node.attrs.indent || 0) + delta;
                const { minLevel, maxLevel } = this.options;
                const indent = nextLevel < minLevel ? minLevel : nextLevel > maxLevel ? maxLevel : nextLevel;

                if (indent !== node.attrs.indent) {
                    const { indent: oldIndent, ...currentAttrs } = node.attrs;
                    const nodeAttrs = indent > minLevel ? { ...currentAttrs, indent } : currentAttrs;
                    return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
                }
            }
            return tr;
        };

        const updateIndentLevel = (tr: Transaction, delta: number): Transaction => {
            const { doc, selection } = tr;

            if (doc && selection && (selection instanceof TextSelection || selection instanceof AllSelection)) {
                const { from, to } = selection;
                doc.nodesBetween(from, to, (node, pos) => {
                    if (this.options.types.includes(node.type.name)) {
                        tr = setNodeIndentMarkup(tr, pos, delta);
                        return false;
                    }

                    return true;
                });
            }

            return tr;
        };
        const applyIndent: (direction: number) => () => Command =
            direction =>
                () =>
                    ({ tr, state, dispatch }) => {
                        const { selection } = state;
                        tr = tr.setSelection(selection);
                        tr = updateIndentLevel(tr, direction);

                        if (tr.docChanged) {
                            dispatch?.(tr);
                            return true;
                        }

                        return false;
                    };

        return {
            indent: applyIndent(1),
            outdent: applyIndent(-1),
        };
    },

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                if (this.editor.isActive('listItem')) {
                    return this.editor.commands.sinkListItem('listItem')
                }
                return this.editor.commands.indent();
            },
            'Shift-Tab': () => {
                return this.editor.commands.outdent();
            },
        };
    },
});

export const ClearIndentOnEnter = Extension.create({
    name: 'clearIndentOnEnter',

    addKeyboardShortcuts() {
        return {
            Enter: () => {
                const { editor } = this

                // หากอยู่ใน listItem ➞ splitListItem ปกติ
                if (editor.isActive('listItem')) {
                    return editor.chain().focus().splitListItem('listItem').run()
                }

                // สำหรับ paragraph/heading ➞ แยกบล็อกใหม่ แล้วรีเซ็ต indent
                return editor
                    .chain()
                    .focus()
                    .splitBlock()                                // แยก paragraph/heading ใหม่ :contentReference[oaicite:2]{index=2}
                    .resetAttributes('paragraph', ['indent'])    // รีเซ็ต indent ของ paragraph :contentReference[oaicite:3]{index=3}
                    .resetAttributes('heading', ['indent'])    // รีเซ็ต indent ของ heading :contentReference[oaicite:4]{index=4}
                    .run()
            },
        }
    },
})