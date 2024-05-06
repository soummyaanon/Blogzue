import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [charCount, setCharCount] = useState(0);

  const handleEditorChange = (content) => {
    const chars = content.length;
    setCharCount(chars);
  }

  return (
    <div className='w-full' style={{ fontFamily: 'Arial, sans-serif', color: '#34495e' }}>
      {label && <label className='inline-block mb-1 pl-1' style={{ fontWeight: 'bold' }}>{label}</label>}

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
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
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
                "undo redo | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={(content) => {
              handleEditorChange(content);
              onChange(content);
            }}
          />
        )}
      />

<p style={{
    fontSize: '12px',
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '5px',
    backgroundColor: '#c0392b',
    padding: '5px',
    borderRadius: '5px',
    width: 'fit-content'
}}>
    {charCount > 255 ? 'Character limit exceeded!' : null}
</p>
    </div>
  )
}