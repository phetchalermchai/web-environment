// /lib/extensions/Youtube.tsx
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import { Resizable } from 're-resizable'

export interface YoutubeOptions {
    HTMLAttributes: Record<string, any>,
}

export const YoutubeExtension = Node.create<YoutubeOptions>({
    name: 'youtube',
    group: 'block',
    atom: true,
    draggable: true,

    addOptions() {
        return { HTMLAttributes: {} }
    },

    addAttributes() {
        return {
            src: { default: null },
            width: { default: 560 },
            height: { default: 315 },
            textAlign: { default: 'left' },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="youtube"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(this.options.HTMLAttributes, {
                'data-type': 'youtube',
                style: `text-align: ${HTMLAttributes.textAlign}`,
            }),
            ['iframe', {
                src: HTMLAttributes.src,
                class: 'w-full h-full',
                frameborder: 0,
                allowfullscreen: 'true',
            }],
        ]
    },

    addNodeView() {
        return ReactNodeViewRenderer(YoutubeComponent)
    },
})

const YoutubeComponent = ({ node, updateAttributes }: NodeViewProps) => {
    const { src, width, height, textAlign } = node.attrs

    return (
        <NodeViewWrapper style={{ textAlign }}>
            <Resizable
                defaultSize={{ width, height }}
                maxWidth="100%"
                maxHeight="80vh"
                bounds="parent"
                lockAspectRatio
                onResizeStop={(e, dir, ref, delta) => {
                    updateAttributes({
                        width: width + delta.width,
                        height: height + delta.height,
                    })
                }}
                handleComponent={{
                    topLeft: <div className="w-4 h-4 bg-info border-2 border-white rounded-full" />,
                    topRight: <div className="w-4 h-4 bg-info border-2 border-white rounded-full" />,
                    bottomRight: <div className="w-4 h-4 bg-info border-2 border-white rounded-full" />,
                    bottomLeft: <div className="w-4 h-4 bg-info border-2 border-white rounded-full" />,
                }}
                handleStyles={{
                    topLeft: { left: 0, top: 0, transform: 'translate(-50%, -50%)' },
                    topRight: { right: 0, top: 0, transform: 'translate(50%, -50%)' },
                    bottomRight: { right: 0, bottom: 0, transform: 'translate(50%, 50%)' },
                    bottomLeft: { left: 0, bottom: 0, transform: 'translate(-50%, 50%)' },
                }}
                style={{ display: 'inline-block' }}
                className="border-2 border-info box-border"

            >
                <iframe
                    src={src}
                    width="100%"
                    height="100%"
                    allowFullScreen
                />
            </Resizable>
        </NodeViewWrapper>
    )
}
