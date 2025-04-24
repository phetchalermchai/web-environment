"use client";
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import UnderLine from '@tiptap/extension-underline'
import { ResizableImage } from "tiptap-extension-resizable-image";
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import SuperScript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import LinkTipTap from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import { Resizable } from 're-resizable';
import  ReactComponent  from './Extension'
import {
    H1Icon,
    H2Icon,
    H3Icon,
    ListBulletIcon,
    NumberedListIcon,
    UndoIcon,
    RedoIcon,
    ChevronDownIcon,
} from '@/config/iconConfig'
import {
    TextQuote, CodeSquare, Bold, Italic, Strikethrough, CodeXml, Underline, Highlighter, Link, Superscript, Subscript,
    ListOrdered, ListOrderedIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, CornerDownLeft, Trash, ImagePlus,
    Link2, Baseline
} from 'lucide-react'
import { useRef, useState } from "react";
import customVideo from "./customVideo";

const Tiptap = () => {
    const [pickedColor, setPickedColor] = useState("#000000");
    const [urlImg, setUrlImg] = useState("");
    const [urlLink, setUrlLink] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-3'
                    }
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-3'
                    }
                },
            }),
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
            CodeBlock.configure({
                HTMLAttributes: {
                    class: 'bg-base-200 border input-bordered p-4 rounded-md overflow-x-auto text-sm',
                },
            }),
            Code.configure({
                HTMLAttributes: {
                    class: 'bg-base-200 border input-bordered p-1 rounded-md text-sm',
                },
            }),
            Blockquote.configure({
                HTMLAttributes: {
                    class: 'border-l-4 border-base-content pl-4 italic text-base-content/50',
                },
            }),
            SuperScript.configure({
                HTMLAttributes: {
                    class: 'text-sm align-super',
                },
            }),
            SubScript.configure({
                HTMLAttributes: {
                    class: 'text-sm align-sub',
                },
            }),
            LinkTipTap.configure({
                HTMLAttributes: {
                    class: 'text-primary underline decoration-primary decoration-2 underline-offset-4 cursor-pointer'
                },
                openOnClick: false,
            }),

            Color.configure({ types: ["textStyle"] }),
            TextAlign.configure({
                types: ['heading', 'paragraph', 'customVideo'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            UnderLine.configure(
                {
                    HTMLAttributes: {
                        class: 'underline decoration-base-content decoration-2 underline-offset-4',
                    },
                }
            ),
            customVideo,
            ReactComponent
        ],
        editorProps: {
            attributes: {
                class: 'p-6 min-h-24 border input-bordered rounded-lg focus:ring-primary focus:ring-offset-base-100 focus:ring focus:ring-offset-2 focus:outline-none',
            },
        },
        content: `
    <react-component count="0"></react-component>
    `,
        immediatelyRender: false
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

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')
        if (!url) return;
        const urlObj = new URL(url);
        const id = urlObj.searchParams.get('v')
            || url.split('/').pop();
        const embedSrc = `https://www.youtube.com/embed/${id}`;
        if (embedSrc) {
            editor
                .chain()
                .focus()
                .setCustomVideo({
                    src: embedSrc,
                    width: 800,
                    height: 450,
                    align: 'center',    // 'left' | 'center' | 'right'
                })
                .run();
        }
    }

    const insertVideo = () => {
        editor
            .chain()
            .focus()
            .setCustomVideo({
                src: 'https://www.youtube.com/embed/QVffer2fRfg',
                width: 800,
                height: 450,
                align: 'center',    // 'left' | 'center' | 'right'
            })
            .run();
    };

    return (
        <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
            <div className="border input-bordered rounded-md p-2 mb-2 bg-base-100 space-x-2 z-50">
                <div className="flex flex-wrap items-center gap-2">
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
                    <div className="mx-0 divider divider-horizontal"></div>
                    <div className="dropdown">
                        <div className="tooltip tooltip-bottom" data-tip="หัวเรื่อง">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1">
                                <span className="text-base">
                                    H
                                    <sub>1</sub>
                                </span>
                                <ChevronDownIcon className="w-3 h-3" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                            <li className="mb-1">
                                <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                    className={editor.isActive('heading', { level: 1 }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                                    <span className="flex gap-1 items-center text-sm font-normal">
                                        <H1Icon className="w-4 h-4" /> Heading 1
                                    </span>
                                </button>
                            </li>
                            <li className="mb-1">
                                <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={editor.isActive('heading', { level: 2 }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                                    <span className="flex gap-1 items-center text-sm font-normal">
                                        <H2Icon className="w-4 h-4" /> Heading 2
                                    </span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                    className={editor.isActive('heading', { level: 3 }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                                    <span className="flex gap-1 items-center text-sm font-normal">
                                        <H3Icon className="w-4 h-4" /> Heading 3
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <div className="tooltip tooltip-bottom" data-tip="รายการ">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1">
                                <ListBulletIcon className="w-5 h-5" />
                                <ChevronDownIcon className="w-3 h-3" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-16 p-2 shadow">
                            <li className="mb-1">
                                <button
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                                    className={editor.isActive('bulletList') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
                                >
                                    <ListBulletIcon className="w-4 h-4" />
                                </button>
                            </li>
                            <li className="mb-1">
                                <button
                                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                    className={editor.isActive('orderedList') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
                                >
                                    <span className="flex gap-1 items-center text-sm font-normal">
                                        <NumberedListIcon className="w-4 h-4" />
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Code Block">
                        <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
                        >
                            <CodeSquare size={20} />
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Blockquote Ctrl+Shift+B">
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
                        >
                            <TextQuote size={20} />
                        </button>
                    </div>
                    <div className="mx-0 divider divider-horizontal"></div>
                    <div className="tooltip tooltip-bottom" data-tip="เลือกสีข้อความ">
                        <label className="btn btn-sm">
                            <Baseline size={20} color={pickedColor} />
                            <input
                                type="color"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const c = e.target.value;
                                    setPickedColor(c);
                                    applyColor(c);
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </label>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="ตัวหนา Ctrl+B">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <Bold size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="ตัวเอียง Ctrl+I">
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <Italic size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="ขีดทับ Ctrl+Shift+S">
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive('strike') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <Strikethrough size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="Code Ctrl+E">
                        <button
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            className={editor.isActive('code') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <CodeXml size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="ขีดเส้นใต้ Ctrl+U">
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={editor.isActive('underline') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <Underline size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="เน้นข้อความ Ctrl+Shift+H">
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight().run()}
                            className={editor.isActive('highlight') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <Highlighter size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className={editor.isActive('link') ? 'btn btn-sm btn-primary m-1' : 'btn btn-sm'}><Link size={20} /></div>
                        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="วางลิงค์" className="input input-sm w-32" value={urlLink} onChange={(e) => setUrlLink(e.target.value)} />
                                <div className="tooltip tooltip-bottom" data-tip="เพิ่มลิงค์">
                                    <button
                                        className="btn btn-sm btn-ghost"
                                        onClick={() => {
                                            if (urlLink) {
                                                editor.chain().focus().setLink({ href: urlLink }).run();
                                            }
                                        }}
                                    >
                                        <CornerDownLeft size={20} />
                                    </button>
                                </div>
                                <div className="tooltip tooltip-bottom" data-tip="ลบลิงค์">
                                    <button
                                        className="btn btn-sm btn-ghost"
                                        onClick={() => {
                                            if (urlLink) {
                                                editor.chain().focus().unsetLink().run();
                                            }
                                            setUrlLink("")
                                        }}
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-0 divider divider-horizontal"></div>
                    <div className="tooltip tooltip-bottom" data-tip="ยกตัวอักษรขึ้น Ctrl+.">
                        <button
                            onClick={() => editor.chain().focus().toggleSuperscript().run()}
                            className={editor.isActive('superscript') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <Superscript size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="ยกตัวอักษรลง Ctrl+,">
                        <button
                            onClick={() => editor.chain().focus().toggleSubscript().run()}
                            className={editor.isActive('subscript') ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <Subscript size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="mx-0 divider divider-horizontal"></div>
                    <div className="tooltip tooltip-bottom" data-tip="จัดชิดซ้าย Ctrl+Shift+L">
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={editor.isActive({ textAlign: 'left' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <AlignLeft size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="จัดกึ่งกลาง Ctrl+Shift+E">
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={editor.isActive({ textAlign: 'center' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <AlignCenter size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="จัดชิดขวา Ctrl+Shift+R">
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={editor.isActive({ textAlign: 'right' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <AlignRight size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="จัดข้อความให้เต็มบรรทัด Ctrl+Shift+J">
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            className={editor.isActive({ textAlign: 'justify' }) ? 'btn btn-sm btn-primary' : 'btn btn-sm'}>
                            <span className="text-sm">
                                <AlignJustify size={20} />
                            </span>
                        </button>
                    </div>
                    <div className="mx-0 divider divider-horizontal"></div>
                    <div className="tooltip tooltip-bottom" data-tip="เพิ่มรูปภาพ">
                        <label className="btn btn-sm">
                            <ImagePlus size={20} />
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={onImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div className="tooltip tooltip-bottom" data-tip="ลิงค์รูปภาพ">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1"><Link2 size={20} /></div>
                        </div>
                        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="วางลิงค์" className="input input-sm w-32" value={urlImg} onChange={(e) => setUrlImg(e.target.value)} />
                                <div className="tooltip tooltip-bottom" data-tip="เพิ่มลิงค์รูปภาพ">
                                    <button
                                        className="btn btn-sm btn-ghost"
                                        onClick={() => {
                                            if (urlImg) {
                                                const img = new window.Image();
                                                img.onload = () => {
                                                    editor.chain().focus()
                                                        .setResizableImage({
                                                            src: urlImg,
                                                            alt: '',
                                                            title: '',
                                                            width: img.width,
                                                            height: img.height,
                                                            'data-keep-ratio': true,
                                                        })
                                                        .run();
                                                };
                                                img.src = urlImg;
                                            }
                                        }}
                                    ><CornerDownLeft size={20} />
                                    </button>
                                </div>
                                <div className="tooltip tooltip-bottom" data-tip="ลบลิงค์รูปภาพ">
                                    <button className="btn btn-sm btn-ghost" onClick={() => setUrlImg("")}>
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tooltip tooltip-bottom" data-tip="ลบข้อความที่เลือก">
                        <button
                            onClick={() => editor.chain().focus().deleteSelection().run()}
                            className={`btn btn-sm ${editor.can().deleteSelection() ? '' : 'btn-disabled'}`}
                        >
                            <Trash size={20} />
                        </button>
                    </div>
                    <button id="add" onClick={addYoutubeVideo}>Add YouTube video</button>
                    <button onClick={insertVideo} className="btn btn-sm mb-2">
                        แทรกวิดีโอ
                    </button>
                </div>
                <Resizable
                    defaultSize={{
                        width: 320,
                        height: 200,
                    }}
                    className="border-2 border-dashed border-base-content/50 rounded-md p-2 mb-2 bg-base-100"
                >
                    <iframe
                        src={"https://www.youtube.com/embed/QVffer2fRfg"}
                        width={300}
                        height={200}
                        allowFullScreen
                        className="block"
                    />
                </Resizable>
            </div>
            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap