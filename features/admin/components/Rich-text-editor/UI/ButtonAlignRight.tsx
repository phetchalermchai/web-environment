import { Editor } from '@tiptap/react'
import { AlignRight } from 'lucide-react'

const ButtonAlignRight = ({ editor }: { editor: Editor }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip="จัดชิดขวา Ctrl+Shift+R">
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={editor.isActive({ textAlign: 'right' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <AlignRight size={20} />
                </span>
            </button>
        </div>
    )
}

export default ButtonAlignRight