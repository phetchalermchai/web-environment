"use client";
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import { ResizableImage } from "tiptap-extension-resizable-image";
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
    UndoIcon,
    RedoIcon,
    PhotoIcon
} from '@/config/iconConfig'
import { useRef, useState } from "react";

const Tiptap = () => {
    const [pickedColor, setPickedColor] = useState("#000000");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editor = useEditor({
        extensions: [
            StarterKit,
            ResizableImage.configure({
                defaultWidth: 500,
                defaultHeight: 500,
                async onUpload(file: File) {
                    /* replace with your own upload handler */
                    const src = URL.createObjectURL(file);
                    return {
                        src,
                        'data-keep-ratio': true,
                    };
                },
            }),
            TextStyle,
            Color.configure({ types: ["textStyle"] }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc ml-3',
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal ml-3',
                },
            }),
            Underline.configure(
                {
                    HTMLAttributes: {
                        class: 'underline decoration-base-content decoration-2 underline-offset-4',
                    },
                }
            )
        ],
        editorProps: {
            attributes: {
                class: 'p-2 min-h-24 border input-bordered rounded-lg focus:ring-primary focus:ring-offset-base-100 focus:ring focus:ring-offset-2 focus:outline-none',
            },
        },
    });

    if (!editor) {
        return null
    }

    const applyColor = (color: string) => {
        // สั่ง editor ให้เปลี่ยนสีข้อความ
        editor.chain().focus().setColor(color).run();
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const src = reader.result as string;
            const img = new window.Image();
            img.onload = () => {
                editor.chain().focus()
                    .setResizableImage({
                        src,
                        alt: file.name,
                        title: file.name,
                        width: 500,
                        height: 500,
                        'data-keep-ratio': true,
                    })
                    .run();
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
            <div className="border input-bordered rounded-md p-2 mb-2 bg-base-100 space-x-2 z-50">
                <label className="btn btn-sm btn-outline">
                    Upload
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={onImageChange}
                        className="hidden"
                    />
                </label>
                <button onClick={() => {
                    const url = window.prompt('Enter image URL');
                    if (url) {
                        const img = new window.Image();
                        img.onload = () => {
                            editor.chain().focus()
                                .setResizableImage({
                                    src: url,
                                    alt: '',
                                    title: '',
                                    width: img.width,
                                    height: img.height,
                                    'data-keep-ratio': true,
                                })
                                .run();
                        };
                        img.src = url;
                    }
                }} className="btn btn-sm">
                    <PhotoIcon />
                </button>
                <div className="tooltip tooltip-bottom" data-tip="ย้อนกลับ">
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className={`btn btn-sm ${editor.can().undo() ? '' : 'btn-disabled'}`}
                    >
                        <UndoIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="ไปข้างหน้า">
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className={`btn btn-sm ${editor.can().redo() ? '' : 'btn-disabled'}`}
                    >
                        <RedoIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="เลือกสีข้อความ">
                    <input
                        type="color"
                        value={pickedColor}
                        onChange={(e) => {
                            const c = e.target.value;
                            setPickedColor(c);
                            applyColor(c);
                        }}
                        className="btn btn-sm px-2"
                    />
                </div>
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
            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap