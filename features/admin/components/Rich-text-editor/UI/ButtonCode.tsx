import { Editor } from '@tiptap/react'
import { CodeXml } from 'lucide-react'

const ButtonCode = ({ editor }: { editor: Editor }) => {
    return (
        <div className="tooltip tooltip-bottom" data-tip="Code Ctrl+E">
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <CodeXml size={20} />
                </span>
            </button>
        </div>
    )
}

export default ButtonCode