import { Node, RawCommands, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import VideoComponent from './VideoComponent'

export interface CustomVideoOptions {
  HTMLAttributes: Record<string, any>
}

export const CustomVideo = Node.create<CustomVideoOptions>({
  name: 'customVideo',
  group: 'block',
  atom: false,
  inline: false,
  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attributes => ({ src: attributes.src }),
      },
      width: {
        default: 640,
        parseHTML: element => parseInt(element.getAttribute('width') || '640', 10),
        renderHTML: attributes => ({ width: attributes.width }),
      },
      height: {
        default: 360,
        parseHTML: element => parseInt(element.getAttribute('height') || '360', 10),
        renderHTML: attributes => ({ height: attributes.height }),
      },
      align: {
        default: 'center',
        parseHTML: element => element.getAttribute('data-align') || 'center',
        renderHTML: attributes => ({ 'data-align': attributes.align }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="customVideo"]',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, width, height, align } = node.attrs
    return [
      'div',
      mergeAttributes(
        { 'data-type': 'customVideo', class: `video-wrapper video-wrapper--${align}` },
        HTMLAttributes
      ),
      ['iframe', {
        ...mergeAttributes(this.options.HTMLAttributes, {
          src,
          width,
          height,
          frameborder: '0',
          allowfullscreen: 'true',
        }),
      }],
    ]
  },

  addCommands() {
    return {
      setCustomVideo:
        (options: Record<string, any>) =>
        ({ chain }: { chain: any }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: options,
            })
            .run()
        },
    } as Partial<RawCommands>
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent)
  },
})

export default CustomVideo
