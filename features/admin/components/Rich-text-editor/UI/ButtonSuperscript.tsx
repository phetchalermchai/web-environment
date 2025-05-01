import { Editor } from '@tiptap/react'
import { Superscript } from 'lucide-react'

const ButtonSuperscript = ({ editor }: { editor: Editor }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip="ยกตัวอักษรขึ้น Ctrl+.">
            <button
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={editor.isActive('superscript') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <Superscript size={20} />
                </span>
            </button>
        </div>
    )
}

export default ButtonSuperscript