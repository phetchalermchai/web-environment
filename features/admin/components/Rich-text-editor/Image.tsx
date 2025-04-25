import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewProps } from '@tiptap/react'
import Image from 'next/image'
import { Resizable } from 're-resizable'

export interface ImageOptions {
    HTMLAttributes: Record<string, any>,
}

export const ImageExtension = Node.create<ImageOptions>({
    name: 'image',
    group: 'block',
    atom: true,
    draggable: true,

    addOptions() {
        return { HTMLAttributes: {} }
    },

    addAttributes() {
        return {
            src: { default: null },
            alt: { default: '' },
            width: { default: 560 },
            height: { default: 315 },
            textAlign: { default: 'left' },
        }
    },

    parseHTML() {
        return [{ tag: 'img[src]' }]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'img',
            mergeAttributes(this.options.HTMLAttributes, {
                ...HTMLAttributes,
                loading: 'lazy',
                style: `display: block; margin: 0 auto;`  // inline block-center; actual alignment via textAlign wrapper
            }),
        ]
    },

    addCommands() {
        return {
            // ช่วยให้ใช้ง่าย: editor.chain().focus().setImage(attrs).run()
            setImage: attrs => ({ commands }) => {
                return commands.insertContent({ type: this.name, attrs })
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent)
    },
})

const ImageComponent = ({ node, updateAttributes }: NodeViewProps) => {
    const { src, alt, width, height, textAlign } = node.attrs

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
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    layout="responsive" 
                />
            </Resizable>
        </NodeViewWrapper>
    )
}
