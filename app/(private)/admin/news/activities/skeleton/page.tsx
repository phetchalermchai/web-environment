"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor: React.FC = () => {
  // สร้าง editor instance ด้วย extensions ที่ต้องการ
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>เริ่มต้นเขียนข่าวของคุณที่นี่...</p>",
    editorProps: {
      attributes: {
        class: 'p-2 border  border-solid border-base-200 rounded-lg cursor-text focus:ring-2 focus:ring-primary-500 outline-none focus:outline-offset-2',
      },
    },
  });

  return (
    <div className="bg-base-100 rounded-lg shadow m-3 p-2 sm:m-3 sm:p-3 lg:m-4 lg:p-3 xl:m-5 xl:p-5">
      <div className="py-2 px-1 "><span className="text-sm">รายละเอียดกิจกรรม</span></div>
      {/* แสดง Editor Content */}
      <input className="input input-bordered w-full bg-op"/>
          <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;

// .input input:focus {
//   outline: 2px solid transparent;
//   outline-offset: 2px;
// }
