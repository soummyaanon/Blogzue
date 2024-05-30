import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [charCount, setCharCount] = useState(0);
  const [content, setContent] = useState(defaultValue);

  const handleEditorChange = (content) => {
    const chars = content.length;
    setCharCount(chars);
    setContent(content);
  }

  return (
    <div className='w-full' style={{ fontFamily: 'Arial, sans-serif', color: '#34495e' }}>
      {label && <label className='inline-block mb-1 pl-1' style={{ fontWeight: 'bold' }}>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div style={{ position: 'relative' }}>
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
                  "paste"
                ],
                toolbar:
                  "undo redo | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                paste_preprocess: function(plugin, args) {
                  args.content = '';
                }
              }}
              onEditorChange={(newContent) => {
                handleEditorChange(newContent);
                onChange(newContent);
              }}
            />
            {content === '' && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#999',
                pointerEvents: 'none',
              }}>
                Originality is the best form of rebellion. Write your own thoughts here Do Not Copy paste.
              </div>
            )}
          </div>
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