
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Editor from 'react-simple-code-editor';
import API from '../../api/blogApi.js';

import "./AddPost.css";
import CodeEditorInput from "../../Components/CodeEditor/CodeEditor";
import MyEditor from "../../Components/Editor/MyEditor";
import '../../Components/Typography/Typography.css'
import FAQ from "../../Components/FAQ/FAQ";
import { createUnifiedPayload } from "../../../../backend/utils/createUnifiedPayload.js";
import { TEAM_MEMBERS, blog_categories, blog_tags } from '../../data.jsx';



// === ПЛАГІН ДЛЯ ЗАВАНТАЖЕННЯ КАРТИНОК В РЕДАКТОР ===
function uploadAdapter(loader) {
    return {
        upload: () => {
            return loader.file.then(file => {
                const body = new FormData();
                // Назва 'upload' має збігатися з multer на бекенді
                body.append('upload', file); 

                // Використовуємо наш централізований клієнт API
                return API.post('/blogs/upload-image', body)
                .then(res => {
                    // Axios повертає результат у полі .data
                    if (res.data.error) throw new Error(res.data.error);
                    
                    // Повертаємо URL картинки для відображення в редакторі
                    return { default: res.data.url }; 
                })
                .catch(err => {
                    console.error("Помилка при завантаженні картинки в редактор:", err);
                    throw err;
                });
            });
        }
    };
}



// === ПЛАГІН ДЛЯ ПІДКЛЮЧЕННЯ ===
function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

const AddPost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
 
 const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);


  

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Marketing",
    tags: "",
    description: "",
    content: "", 
    code_snippet: "", 
    cpaTitle: "", 
    cpaText: "",  
    cpaLink: "" ,
    author_name: TEAM_MEMBERS[0].name,
    author_image: TEAM_MEMBERS[0].avatar,
    faqs: []
  });

   const toggleFullScreen = () => {
  setIsFullScreen(!isFullScreen);
};

useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);


  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  
 // Функція спеціально для зміни автора
const handleAuthorChange = (e) => {
  const selectedName = e.target.value;
  const member = TEAM_MEMBERS.find(m => m.name === selectedName);
  
  setFormData(prev => ({
    ...prev,
    author_name: member.name,
    author_image: member.avatar,
  }));
};

  // 4. useEffect для ВІДНОВЛЕННЯ даних (спрацює один раз при завантаженні)
  useEffect(() => {
    const savedData = localStorage.getItem('draft_post');
    if (savedData) {
      setFormData(JSON.parse(savedData));
      console.log("Дані відновлено з локального сховища");
    }
  }, []); // Порожній масив означає "виконати 1 раз"

  // 5. useEffect для ЗБЕРЕЖЕННЯ даних (спрацює при кожній зміні formData)
  useEffect(() => {
    localStorage.setItem('draft_post', JSON.stringify(formData));
  }, [formData]); // Слідкує за змінами у formData

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setFormData({ ...formData, [name]: value, slug: generateSlug(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };


const addFaq = () => {
  setFaqs([...faqs, { question: "", answer: "" }]);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Отримуємо токен з нашого об'єкта adminData
    const savedData = localStorage.getItem("adminData");
    const token = savedData ? JSON.parse(savedData).token : null;

    if (!token) {
      alert("⚠️ Помилка авторизації. Будь ласка, перелогіньтесь.");
      setLoading(false);
      return;
    }

    // Створюємо конфіг з токеном для всіх запитів до нашого бекенду
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // 2. Отримуємо налаштування (ЯВНО передаємо токен)
    let utmSource = 'admin_panel';
    let globalSettings = {};

    try {
      const settingsRes = await API.get('/admin/settings', config); 
      globalSettings = settingsRes.data;
      if (globalSettings.siteName) {
        utmSource = globalSettings.siteName.replace(/\s+/g, '_').toLowerCase();
      }
    } catch (err) {
      console.warn("Не вдалося отримати налаштування, використовуємо стандартні");
    }

    // 3. Формуємо дані (FormData для картинки)
    const dataToSend = new FormData();
    const baseSlug = formData.slug?.trim() || generateSlug(formData.title);
    const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`;

    Object.keys(formData).forEach(key => {
      if (key === 'slug') dataToSend.append("slug", uniqueSlug);
      else dataToSend.append(key, formData[key] || "");
    });

    dataToSend.append("faqs", JSON.stringify(faqs.filter(f => f.question?.trim())));
    if (imageFile) dataToSend.append("blog_image", imageFile);

    // 4. Відправка статті на сервер (ЯВНО передаємо токен)
    // Content-Type для FormData axios/браузер додадуть самі
    const response = await API.post("/blogs", dataToSend, config);

    alert("Стаття успішно створена! 🎉");
    localStorage.removeItem('draft_post');

    // 5. Синхронізація з Make.com (через твій бекенд)
    if (globalSettings?.syncNewPosts) {
      const payload = createUnifiedPayload("add_post", {
        ...formData,
        slug: uniqueSlug,
        blog_image: response.data.blog?.blog_image || imageFile?.name || ""
      }, globalSettings);

      // Використовуємо наш бекенд як проксі до Make.com
      await API.post("/send-to-make", payload, config);
      console.log("🚀 Дані для соцмереж відправлено через бекенд");
    }

  } catch (error) {
    console.error("Помилка створення статті:", error);
    if (error.response?.status === 401) {
      alert("Сесія завершена. Будь ласка, увійдіть знову.");
      window.location.href = "/admin/login";
    } else {
      alert(error.response?.data?.message || "Сталася помилка при збереженні");
    }
  } finally {
    setLoading(false);
  }
};

    return (
  <div className="add-post-container">
    <h2>Додати нову статтю</h2>
    <form onSubmit={handleSubmit} className="add-post-form">
      
      {/* 1. ЗАГОЛОВОК */}
      <div className="form-group">
        <label>Заголовок</label>
        <input name="title" value={formData.title} onChange={handleChange} required />
      </div>

      {/* 2. ГОЛОВНЕ ЗОБРАЖЕННЯ */}
      <div className="form-group">
        <label className="file-label">Головне зображення статті</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
        {previewUrl && (
          <div className="preview-container">
            <img src={previewUrl} alt="Preview" className="img-preview" />
          </div>
        )}
      </div>

      {/* 3. КАТЕГОРІЯ ТА ТЕГИ */}
      <div className="form-row">
        <div className="form-group">
             <label>Категорія</label>
                   <select 
                       name="category" 
                       value={formData.category} 
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Оберіть категорію</option>
                         {blog_categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                            ))}
                        </select>
                     </div>
       

                           <div className="form-group">
                     <label>Теги (через кому)</label>
                         <input 
                               name="tags" 
                               value={formData.tags} 
                               onChange={handleChange} 
                                placeholder="Виберіть або напишіть теги..."
                                list="tags-list" 
                            />
  
                        {/* Випадаючий список підказок при наборі тексту */}
                     <datalist id="tags-list">
                          {blog_tags.map(tag => (
                            <option key={tag.name} value={tag.name} />
                       ))}
                      </datalist>

  {/* Швидкий вибір (бейджики) */}
  <div className="quick-tags" style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
    <span style={{ fontSize: '12px', color: '#666', width: '100%' }}>Рекомендовані:</span>
    {blog_tags.map(tag => (
      <button
        key={tag.name}
        type="button"
        className="tag-badge"
        onClick={() => {
          // Логіка додавання тегу в рядок через кому
          const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
          if (!currentTags.includes(tag.name)) {
            const newTags = [...currentTags, tag.name].join(', ');
            setFormData({ ...formData, tags: newTags });
          }
        }}
        style={{
          padding: '4px 10px',
          borderRadius: '15px',
          border: '1px solid #ddd',
          background: '#f9f9f9',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        + {tag.name}
      </button>
    ))}
  </div>
</div>

      </div>

     <div className="admin-faq-section">
  <h3>Часті питання (FAQ)</h3>
  {faqs.map((faq, index) => (
  <div key={index} className="faq-item">
    <input
      type="text"
      placeholder="Питання"
      value={faq.question}
      onChange={(e) => handleFaqChange(index, "question", e.target.value)}
    />
    <textarea
      placeholder="Відповідь"
      value={faq.answer}
      onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
    />
    <button type="button" onClick={() => removeFaq(index)}>Видалити</button>
  </div>
))}
<button type="button" onClick={addFaq}>Додати питання</button>
</div>
    

                  <div className="form-group author-section">
  <label>Автор публікації</label>
  <div className="author-selector-card">
    <div className="author-card-top"> {/* Додаємо обгортку для верхньої частини */}
      <div className="author-preview">
        <img src={formData.author_image} alt="Avatar" className="author-avatar-img" />
      </div>
      <div className="author-select-info">
        <select 
          name="author_name" 
          value={formData.author_name} 
          onChange={handleAuthorChange} 
          className="author-dropdown"
        >
          {TEAM_MEMBERS.map(member => (
            <option key={member.name} value={member.name}>{member.name}</option>
          ))}
        </select>
        <p className="author-role-hint">Публікація від імені команди</p>
      </div>
    </div>

    
  </div>
</div>


      {/* 5. КОРОТКИЙ ОПИС */}
      <div className="form-group">
        <label>Короткий опис</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
      </div>

      {/* 6. ОСНОВНИЙ РЕДАКТОР (З FullScreen) */}
      <div className="form-group">
        <label>
          Контент статті 
          <small style={{ marginLeft: '10px', color: '#888' }}>(Подвійний клік — на весь екран)</small>
        </label>
        <div 
          className={`editor-wrapper ${isFullScreen ? "fullscreen-editor" : ""}`}
          // Важливо: перевіряємо, щоб клік був по контейнеру, а не по кнопках всередині
          onDoubleClick={(e) => {
            if (e.target.closest('.ck-button') || e.target.closest('.ck-input')) return;
            toggleFullScreen();
          }}
        >
          <MyEditor
            value={formData.content} 
            onChange={(data) => setFormData(prev => ({ ...prev, content: data }))}
            uploadPlugin={uploadPlugin} 
          />
          {isFullScreen && (
            <button type="button" className="close-fullscreen-btn" onClick={toggleFullScreen}>
              Згорнути [Esc]
            </button>
          )}
        </div>
      </div>

      {/* 7. ТЕХНІЧНИЙ ФРАГМЕНТ (CODE) */}
      <div className="form-group">
        <label>Технічний фрагмент (Code Snippet)</label>
        <div className="code-editor-wrapper">
          <CodeEditorInput 
            value={formData.code_snippet} 
            onChange={(code) => setFormData(prev => ({ ...prev, code_snippet: code }))} 
          />
        </div>
      </div>

      {/* 8. РОЗУМНИЙ БЛОК (CPA) */}
      <section className="cpa-settings-section">
        <h3>Нативна рекомендація (Розумний блок)</h3>
        <div className="admin-input-group">
          <label>Заголовок блоку</label>
          <input 
            type="text" 
            placeholder="Наприклад: Мій вибір для автоматизації"
            value={formData.cpaTitle}
            onChange={(e) => setFormData(prev => ({...prev, cpaTitle: e.target.value}))}
          />
        </div>
        <div className="admin-input-group">
          <label>Опис пропозиції</label>
          <textarea 
          placeholder="Чому ви рекомендуєте цей сервіс?"
            value={formData.cpaText}
            onChange={(e) => setFormData(prev => ({...prev, cpaText: e.target.value}))}
          />
        </div>
        <div className="admin-input-group">
          <label>Партнерське посилання</label>
          <input 
            type="url" 
             placeholder="https://make.com/..."
            value={formData.cpaLink}
            onChange={(e) => setFormData(prev => ({...prev, cpaLink: e.target.value}))}
          />
        </div>
      </section>

      <button type="submit" disabled={loading} className="save-btn">
        {loading ? "Збереження..." : "Опублікувати статтю"}
      </button>
    </form>
  </div>
);


};

export default AddPost;
