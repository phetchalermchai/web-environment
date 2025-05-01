import { Editor } from '@tiptap/react'
import { Undo } from 'lucide-react'

const ButtonUndo = ({ editor }: { editor: Editor }) => {
  return (
    <div className="tooltip tooltip-bottom" data-tip="ย้อนกลับ Ctrl+Z">
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            className={`btn btn-sm ${editor.can().undo() ? '' : 'btn-disabled'}`}
                        >
                            <Undo size={20} />
                        </button>
                    </div>
  )
}

export default ButtonUndo