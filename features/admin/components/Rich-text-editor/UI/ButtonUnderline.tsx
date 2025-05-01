import { Editor } from '@tiptap/react'
import { UnderlineIcon } from 'lucide-react'

const ButtonUnderline = ({ editor }: { editor: Editor }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip="ขีดเส้นใต้ Ctrl+U">
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <UnderlineIcon size={20} />
                </span>
            </button>
        </div>
    )
}

export default ButtonUnderline