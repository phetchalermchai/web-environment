import { Editor } from '@tiptap/react'
import { Highlighter } from 'lucide-react'

const ButtonHighlight = ({ editor }: { editor: Editor }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip="เน้นข้อความ Ctrl+Shift+H">
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive('highlight') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <Highlighter size={20} />
                </span>
            </button>
        </div>
    )
}

export default ButtonHighlight