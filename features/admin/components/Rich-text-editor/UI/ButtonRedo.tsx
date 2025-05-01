import { Editor } from '@tiptap/react'
import { Redo } from 'lucide-react'

const ButtonRedo = ({ editor }: { editor: Editor }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip="ไปข้างหน้า Ctrl+Shift+Z">
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className={`btn btn-sm ${editor.can().redo() ? '' : 'btn-disabled'}`}
            >
                <Redo size={20} />
            </button>
        </div>
    )
}

export default ButtonRedo