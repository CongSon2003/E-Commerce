import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
const Markdown = ({initialValue, onChangeDescription, name, label, error}) => {
  const editorRef = useRef(null);
  return (
    <div>
      <label htmlFor='Product-description' className='block mb-2 text-sm font-medium text-gray-700 cursor-pointer'>{label}</label>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue = {initialValue}
        apiKey='xeesvnza6do32hf5d7kqkhiply0qa7mkgggy6z33v9wxin7j'
        id='Product-description'
        // value='o'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={e => onChangeDescription(prev => ({...prev, [name] : e.target.getContent()}))}
      />
      {error && <small className='text-red-500 pl-2'>{error}</small>}
    </div>
  )
}

export default Markdown