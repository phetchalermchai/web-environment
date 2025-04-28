import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import { ListItem } from '@tiptap/extension-list-item'

// 2.A: ขยาย Paragraph
export const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      paddingLeft: { default: 0 },
      paddingRight: { default: 0 },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      {
        style: `padding-left: ${HTMLAttributes.paddingLeft}%; padding-right: ${HTMLAttributes.paddingRight}%;`,
      },
      0,
    ]
  },
})

// 2.B: ขยาย Heading
export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      paddingLeft: { default: 0 },
      paddingRight: { default: 0 },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'h2',
      {
        style: `padding-left: ${HTMLAttributes.paddingLeft}%; padding-right: ${HTMLAttributes.paddingRight}%;`,
      },
      0,
    ]
  },
})

// 2.C: ขยาย ListItem
export const CustomListItem = ListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      paddingLeft: { default: 0 },
      paddingRight: { default: 0 },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'li',
      {
        style: `padding-left: ${HTMLAttributes.paddingLeft}%; padding-right: ${HTMLAttributes.paddingRight}%;`,
      },
      0,
    ]
  },
})
