
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { FaSave, FaLink, FaInfoCircle, FaVial, FaCheckCircle, FaExclamationTriangle, FaBullhorn, FaComments, FaEnvelope } from 'react-icons/fa';
import './SettingPage.css';

const SettingsPage = () => {
  const { admin } = useContext(AuthContext);
  const [settings, setSettings] = useState({
    makeWebhookUrl: '',
    syncNewPosts: true,
    syncTelegramPosts: true,
    syncNewUsers: true,
    syncComments: false,
    syncSubscribers: true,
    syncContactForm: true,
    syncAdsRequests: true,
    siteName: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [testStatus, setTestStatus] = useState({ type: '', message: '' });

  const token = admin?.token;

  useEffect(() => {
    if (!token) return;
    
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/settings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error("Помилка завантаження:", err);
      }
    };
    fetchSettings();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTest = async () => {
    if (!settings.makeWebhookUrl) return alert("Спочатку введіть URL");
    setLoading(true);
    setTestStatus({ type: '', message: '' });
    try {
      await axios.post('http://localhost:5000/api/admin/settings/test-webhook', 
        { url: settings.makeWebhookUrl,
          data: { email_address: "test-user@example.com" }
         },
        
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTestStatus({ type: 'success', message: '✅ Make.com на зв’язку!' });
    } catch (err) {
      setTestStatus({ type: 'error', message: '⚠️ Помилка з’єднання (401 або невірний URL)' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/admin/settings', settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Налаштування оновлено!");
    } catch (error) {
      alert("❌ Помилка збереження. Перевірте консоль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <div className="settings-card">
          <h1 className="settings-title">Центр автоматизації</h1>
          
          <div className="info-banner">
            <FaInfoCircle />
            <p>Керуйте інтеграцією з Make.com. Виберіть, які дані відправляти автоматично.</p>
          </div>

          <form onSubmit={handleSave}>
            <div className="settings-section">
              <label className="section-label"><FaLink /> Webhook URL</label>
              <div className="input-group-test">
                <input
                  name="makeWebhookUrl"
                  type="url"
                  className="settings-input"
                  value={settings.makeWebhookUrl}
                  onChange={handleInputChange}
                  placeholder="https://hook.make.com/..."
                />
                <button type="button" onClick={handleTest} className="btn-test" disabled={loading}>
                  <FaVial /> {loading ? "..." : "Тест"}
                </button>
              </div>
              {testStatus.message && <p className={`status-msg ${testStatus.type}`}>{testStatus.message}</p>}
            </div>

            <div className="toggles-grid">
              <div className="toggle-group">
                <h3><FaComments /> Контент та Коментарі</h3>
                <label className="switch-label">
                  <input type="checkbox" name="syncNewPosts" checked={settings.syncNewPosts} onChange={handleInputChange} />
                  <span>Дублювати статті</span>
                </label>
                
                <label className="switch-label">
                  <input type="checkbox" name="syncComments" checked={settings.syncComments} onChange={handleInputChange} />
                  <span>Нові коментарі</span>
                </label>
              </div>

              <div className="toggle-group">
                <h3><FaBullhorn /> Маркетинг та Реклама</h3>
                <label className="switch-label">
                  <input type="checkbox" name="syncAdsRequests" checked={settings.syncAdsRequests} onChange={handleInputChange} />
                  <span>Запити на рекламу (Попапи)</span>
                </label>
                <label className="switch-label">
                  <input type="checkbox" name="syncSubscribers" checked={settings.syncSubscribers} onChange={handleInputChange} />
                  <span>Підписки (Subscribe)</span>
                </label>
              </div>

              <div className="toggle-group">
                <h3><FaEnvelope /> Зворотний зв'язок</h3>
                <label className="switch-label">
                  <input type="checkbox" name="syncContactForm" checked={settings.syncContactForm} onChange={handleInputChange} />
                  <span>Форма контактів</span>
                </label>
                <label className="switch-label">
                  <input type="checkbox" name="syncNewUsers" checked={settings.syncNewUsers} onChange={handleInputChange} />
                  <span>Нові адміністратори</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-save-all" disabled={loading}>
              <FaSave /> {loading ? "Зберігаємо..." : "Зберегти всі налаштування"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;