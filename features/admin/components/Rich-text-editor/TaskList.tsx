import { TaskList } from '@tiptap/extension-task-list'
import { mergeAttributes } from '@tiptap/core'

export const CustomTaskList = TaskList.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                class: '',
            },
        }
    },

    renderHTML({ HTMLAttributes, node }) {
        type Align = 'left' | 'center' | 'right'
        const align = (node.attrs.textAlign as Align) || 'left'

        const justifyMap = {
            left: 'items-start',
            center: 'items-center',
            right: 'items-end',
        } as const

        const justifyClass = justifyMap[align]

        return [
            'ul',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'taskList',
                class: ['task-list', 'flex', 'flex-col', justifyClass].join(' '),
            }),
            0,
        ]
    },
})
