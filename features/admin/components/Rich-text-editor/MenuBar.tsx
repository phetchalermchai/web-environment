import {
    H1Icon,
    H2Icon,
    H3Icon,
    BoldIcon,
    ItalicIcon,
    StrikeIcon,
    HighlightIcon,
    LeftIcon,
    CenterIcon,
    RightIcon,
    UnderlineIcon,
    ListBulletIcon,
    NumberedListIcon,
    UndoIcon
} from '@/config/iconConfig'
import { Editor } from '@tiptap/react'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null
    }
    
    return (
        <div className="border input-bordered rounded-md p-2 mb-2 bg-base-100 space-x-2 z-50">
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <H1Icon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <H2Icon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <H3Icon className="w-5 h-5" />
                </span>
            </button>
            <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                Paragraph
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <BoldIcon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <ItalicIcon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
            >
                <span className="text-sm">
                    <UnderlineIcon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <StrikeIcon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={editor.isActive('highlight') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <HighlightIcon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive({ textAlign: 'left' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <LeftIcon className="w-5 h-5" />
                </span>
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <CenterIcon className="w-5 h-5" />
                </span>
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                <span className="text-sm">
                    <RightIcon className="w-5 h-5" />
                </span>
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                Justify
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
            >
                <span className="text-sm">
                    <ListBulletIcon className="w-5 h-5" />
                </span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
            >
                <span className="text-sm">
                    <NumberedListIcon className="w-5 h-5" />
                </span>
            </button>
        </div>
    )
}

export default MenuBar