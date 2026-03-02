import React, { useEffect, useRef } from 'react';

const MyEditor = ({ value, onChange, uploadPlugin }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
     

  useEffect(() => {
    // Чекаємо, поки скрипт завантажиться з CDN
    if (window.CKEDITOR && !editorInstance.current) {
      window.CKEDITOR.ClassicEditor.create(editorRef.current, {
        licenseKey: 'GPL',
        extraPlugins: [uploadPlugin],
        image: {
        upload: {
            types: ['png', 'jpeg', 'jpg', 'gif', 'webp']
        }
    },
    // Це важливо для Drag & Drop
    link: {
        addTargetToExternalLinks: true
    },
       removePlugins: [
        'Base64UploadAdapter', // ЦЕ НАЙВАЖЛИВІШЕ
    // Вимикаємо весь CKBox повністю
    'CKBox',
    'CKBoxUtils',
    'CKBoxImageEdit',
    'CKBoxImageEditEditing',
    'CKBoxImageEditUI',
    
    // Інші хмарні та преміум сервіси
    'CloudServices',
    'EasyImage',
    'CKFinder',
    'AIAssistant',
    'AIAdapter',
    'OpenAITextAdapter',
    'AzureOpenAITextAdapter',
    'RealTimeCollaborativeComments',
    'RealTimeCollaborativeTrackChanges',
    'RealTimeCollaborativeRevisionHistory',
    'PresenceList',
    'Comments',
    'TrackChanges',
    'TrackChangesData',
    'RevisionHistory',
    'Pagination',
    'WProofreader',
    'MathType',
    'SlashCommand',
    'Template',
    'DocumentOutline',
    'FormatPainter',
    'TableOfContents',
    'PasteFromOfficeEnhanced',
    'CaseChange',
    'ExportPdf',
    'ExportWord'
],
        toolbar: {
          items: [
            'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', 'link', '|',
            'fontColor', 'fontBackgroundColor', 'fontSize', 'fontFamily', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'alignment', 'outdent', 'indent', '|',
            'uploadImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'horizontalLine', '|',
            'undo', 'redo', 'sourceEditing'
          ],
          shouldNotGroupWhenFull: true
        },
        // Дозволяємо всі HTML теги, щоб нічого не вирізалося
        htmlSupport: {
          allow: [{ name: /.*/, attributes: true, classes: true, styles: true }]
        }
      })
      .then(editor => {
        editorInstance.current = editor;
         if (value) {
    editor.setData(value);
  }
       
        // editor.setData(value);
       editor.model.document.on('change:data', () => {
        const data = editor.getData();
        onChange(data);
    });
        
      })
      .catch(error => console.error(error));
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return <div ref={editorRef}></div>;
};

export default MyEditor;