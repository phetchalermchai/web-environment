import { Editor } from '@tiptap/react'
import { Italic } from 'lucide-react'

const ButtonItalic = ({ editor }: { editor: Editor }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip="ตัวเอียง Ctrl+I">
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <Italic size={20} />
                </span>
            </button>
        </div>
    )
}

export default ButtonItalic