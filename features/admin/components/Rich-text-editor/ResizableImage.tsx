import { Node, mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'

export const ResizableImage = Node.create({
  name: 'resizableImage',
  group: 'block',
  inline: false,
  addAttributes() {
    return {
      src: { default: null },
      width: { default: 'auto' },
      height: { default: 'auto' },
    }
  },
  parseHTML() {
    return [{ tag: 'img' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const img = document.createElement('img')
      Object.assign(img, {
        src: node.attrs.src,
        style: `width: ${node.attrs.width}; height: ${node.attrs.height}; cursor: nwse-resize;`
      })

      let startX: number
      let startWidth: number

      const onMouseDown = (event: MouseEvent) => {
        startX = event.clientX
        startWidth = img.clientWidth
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }
      const onMouseMove = (event: MouseEvent) => {
        const delta = event.clientX - startX
        const newWidth = Math.max(32, startWidth + delta)
        editor.commands.updateAttributes('resizableImage', { width: `${newWidth}px` })
      }
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      img.addEventListener('mousedown', onMouseDown)

      return {
        dom: img,
        destroy() {
          img.removeEventListener('mousedown', onMouseDown)
        }
      }
    }
  },
})
