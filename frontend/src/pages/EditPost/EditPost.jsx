import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditorInput from "../../Components/CodeEditor/CodeEditor"; 
import MyEditor from "../../Components/Editor/MyEditor";
import "./EditPost.css";
import API from '../../api/blogApi.js';

 import {TEAM_MEMBERS, blog_categories, blog_tags } from '../../data.jsx';



// === ПЛАГІН ДЛЯ ЗАВАНТАЖЕННЯ КАРТИНОК В РЕДАКТОР ===
function uploadAdapter(loader) {
    return {
        upload: () => loader.file.then(file => {
            const body = new FormData();
            body.append('image', file); 

            // Використовуємо наш налаштований клієнт API
            // Він уже знає адресу Render і сам додасть baseURL
            return API.post('/blogs/upload-image', body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                // В Axios дані лежать у res.data
                if (res.data.error) throw new Error(res.data.error);
                
                // CKEditor очікує об'єкт { default: "url_картинки" }
                return { default: res.data.url }; 
            })
            .catch(err => {
                console.error("Помилка завантаження картинки:", err);
                throw err;
            });
        })
    };
}

function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => uploadAdapter(loader);
}

const EditPost = () => {
  const { slug: urlSlug } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // FAQs в окремому стейті, як у AddPost
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Marketing",
    tags: "",
    description: "",
    content: "",
    code_snippet: "",
    author_name: TEAM_MEMBERS[1].name,
    author_image: TEAM_MEMBERS[1].avatar,
    cpaTitle: "",
    cpaText: "",
    cpaLink: "",
  });

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setIsFullScreen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // ЗАВАНТАЖЕННЯ ДАНИХ СТАТТІ
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`/blogs/${urlSlug}`);
        const post = response.data;

        if (post.faqs && Array.isArray(post.faqs)) {
            setFaqs(post.faqs); 
          } else {
            setFaqs([{ question: "", answer: "" }]); // якщо порожньо, даємо одну порожню форму
               }
        
        setFormData({
          title: post.title || "",
          slug: post.slug || "",
          category: post.category || "Marketing",
          tags: post.tags ? (Array.isArray(post.tags) ? post.tags.join(", ") : post.tags) : "",
          description: post.description || "",
          content: post.content || "",
          code_snippet: post.code_snippet || "",
          author_name: post.author_name || TEAM_MEMBERS[1].name,
          author_image: post.author_image || TEAM_MEMBERS[1].avatar, 
          cpaTitle: post.cpaTitle || "",
          cpaText: post.cpaText || "",
          cpaLink: post.cpaLink || "",
        });

        if (post.faqs && post.faqs.length > 0) {
          setFaqs(post.faqs);
        }
        
        if (post.blog_image) {
          setPreviewUrl(post.blog_image);
        }
      } catch (err) {
        alert("Не вдалося завантажити статтю");
        navigate("/admin/dashboard");
      } finally {
        setFetching(false);
      }
    };
    fetchPost();
  }, [urlSlug, navigate]);

  const handleAuthorChange = (e) => {
  const selectedName = e.target.value;
  // Шукаємо об'єкт автора в масиві членів команди
  const member = TEAM_MEMBERS.find(m => m.name === selectedName);
  
  if (member) {
    setFormData(prev => ({
    ...prev,
    author_name: member.name,
    author_image: member.avatar,
    author_bio: member.bio || ""
  }));
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // FAQ ФУНКЦІЇ
  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const handleFaqChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };
  const removeFaq = (index) => setFaqs(faqs.filter((_, i) => i !== index));


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const finalSlug = urlSlug || formData.slug; 

  try {
    // 1. Отримуємо токен вручну з нашого надійного adminData
    const savedData = localStorage.getItem("adminData");
    const token = savedData ? JSON.parse(savedData).token : null;

    if (!token) {
      alert("⚠️ Помилка авторизації. Будь ласка, перелогіньтесь.");
      setLoading(false);
      return;
    }

    // Створюємо конфіг з токеном
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // 2. Формуємо дані FormData
    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'slug') dataToSend.append("slug", finalSlug);
      else dataToSend.append(key, formData[key] || "");
    });

    dataToSend.append("faqs", JSON.stringify(faqs.filter(f => f.question?.trim())));
    
    if (imageFile) {
      dataToSend.append("blog_image", imageFile);
    }

    // 3. Використовуємо API.put з ЯВНИМ конфігом (токеном)
    // Це наш залізобетонний захист від 401 Unauthorized
    await API.put(`/blogs/${finalSlug}`, dataToSend, config);

    alert("Статтю успішно оновлено! 🎉");
    navigate("/admin/dashboard"); 

  } catch (err) {
    console.error("❌ Помилка при оновленні:", err.response?.data || err.message);
    
    if (err.response?.status === 401) {
      alert("Сесія завершена. Будь ласка, залогіньтесь знову.");
      window.location.href = "/admin/login";
    } else {
      alert(err.response?.data?.message || "Помилка при оновленні статті.");
    }
  } finally {
    setLoading(false);
  }
};

  if (fetching) return <div className="loading">Завантаження...</div>;

  return (
    <div className="add-post-container">
      <h2>Редагувати статтю</h2>
      <form onSubmit={handleSubmit} className="add-post-form">
        
        <div className="form-group">
          <label>Заголовок</label>
          <input name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="file-label">Головне зображення</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
          {previewUrl && <img src={previewUrl} alt="Preview" className="img-preview" />}
        </div>

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
        
        {/* БЛОК FAQ В EDIT POST */}
<div className="admin-faq-section">
  <h3>Часті питання (FAQ)</h3>
  {faqs.map((faq, index) => (
    <div key={index} className="faq-item">
      <input 
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
  <button type="button" className="add-faq-btn" onClick={addFaq}>
    + Додати питання
  </button>
</div>

        {/* 4. АВТОР (Покращений) */}
<div className="form-group author-section">
  <label>Автор публікації</label>
  <div className="author-selector-card">
    {/* Верхня частина: Аватар та вибір імені */}
    <div className="author-card-top" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
      <div className="author-preview">
        <img 
          src={formData.author_image || 'https://via.placeholder.com/50'} 
          alt="Avatar" 
          className="author-avatar-img" 
        />
      </div>
      <div className="author-select-info">
        <select 
          name="author_name" 
          value={formData.author_name} 
          onChange={handleAuthorChange} 
          className="author-dropdown"
        >
          {TEAM_MEMBERS.map(member => (
            <option key={member.name} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
        <p className="author-role-hint">Публікація від імені команди</p>
      </div>
    </div>

    {/* Біографія автора — тепер частина картки */}
    <div className="author-bio-edit" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
      <label className="sub-label" style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>
        Резюме автора (відображається в кінці статті)
      </label>
      <textarea
        name="author_bio"
        value={formData.author_bio || ""}
        onChange={(e) => setFormData({ ...formData, author_bio: e.target.value })}
        placeholder="Тут буде біографія автора..."
        className="author-bio-textarea"
        rows="4"
        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
      />
    </div>
  </div>
</div>

        <div className="form-group">
          <label>Короткий опис (для соцмереж)</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
        </div>

        <div className="form-group">
          <label>Контент статті</label>
          <div className={`editor-wrapper ${isFullScreen ? "fullscreen-editor" : ""}`} onDoubleClick={toggleFullScreen}>
            <MyEditor 
              value={formData.content} 
              onChange={(data) => setFormData(prev => ({ ...prev, content: data }))}
              uploadPlugin={uploadPlugin} 
            />
            {isFullScreen && <button type="button" className="close-fullscreen-btn" onClick={toggleFullScreen}>Згорнути [Esc]</button>}
          </div>
        </div>

        <div className="form-group">
          <label>Технічний фрагмент (Тут твоя кнопка або HTML)</label>
          <div className="code-editor-wrapper">
            <CodeEditorInput 
              value={formData.code_snippet} 
              onChange={(code) => setFormData(prev => ({ ...prev, code_snippet: code }))} 
            />
          </div>
        </div>

        <section className="cpa-settings-section">
          <h3>Нативна рекомендація (CPA)</h3>
          <input placeholder="Заголовок блоку" value={formData.cpaTitle} onChange={(e) => setFormData({...formData, cpaTitle: e.target.value})} />
          <textarea placeholder="Опис" value={formData.cpaText} onChange={(e) => setFormData({...formData, cpaText: e.target.value})} />
          <input placeholder="Посилання" value={formData.cpaLink} onChange={(e) => setFormData({...formData, cpaLink: e.target.value})} />
        </section>

        <button type="submit" disabled={loading} className="save-btn">
          {loading ? "Збереження..." : "Оновити статтю"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;