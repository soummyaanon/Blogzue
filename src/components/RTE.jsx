import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [wordCount, setWordCount] = useState(0);

  const handleEditorChange = (content) => {
    const words = content.trim().split(/\s+/).length;
    setWordCount(words);
  }

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey='cysay5ixt00oadcte5n5u68cfgd0wdn7ta5fdg3aic26mvzl'
            init={{
              initialValue: defaultValue,
              height: 300,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={(content) => {
              handleEditorChange(content);
              onChange(content);
            }}
          />
        )}
      />

      <p className='text-sm text-red-500'>{wordCount > 30 ? 'Only 30 words are allowed' : null}</p>
    </div>
  )
}