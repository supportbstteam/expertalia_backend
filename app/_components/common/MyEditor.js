import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = (props)=>{  
   
    const editorRef = useRef(null);
    const handleEditor = props.data.handleEditor
     
    return(         
        <Editor
            tinymceScriptSrc={'/assets/vendor/tinymce/tinymce.min.js'}
            onInit={(evt, editor) => editorRef.current = editor}  
            value={props.data.content}
            init={{
                height: 500,
                menubar: false,
                branding: false,
                statusbar: false,
                verify_html: false,
                toolbar_sticky: true,                                  
                plugins: 'code',
                toolbar: 'code | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            onEditorChange={ (newValue, editor) => { 
                handleEditor(newValue)
                //validate_content(newValue)
            }}
        />       
    )
}
export default MyEditor;