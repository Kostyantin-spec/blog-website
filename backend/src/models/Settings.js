import mongoose from 'mongoose';



const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'global_config', unique: true },
  
  // ГОЛОВНЕ ПОЛЕ
  makeWebhookUrl: { type: String, default: '' },

  // ПЕРЕМИКАЧІ АВТОМАТИЗАЦІЇ (Toggles)
  syncNewPosts: { type: Boolean, default: true },      // Дублювання статей
  syncNewUsers: { type: Boolean, default: true },      // Реєстрація нових адмінів
  syncComments: { type: Boolean, default: false },     // Сповіщення про коментарі
  syncSubscribers: { type: Boolean, default: true },   // Підписка (Newsletter)
  
  // ТВОЇ ФОРМИ ТА ПОПАПИ
  syncContactForm: { type: Boolean, default: true },   // Сторінка "Контакти"
  syncAdsRequests: { type: Boolean, default: true },   // Форми реклами (3 попапи)
  
  // ДОДАТКОВІ НАЛАШТУВАННЯ САЙТУ
  siteName: { type: String, default: 'MARKETINGKIT' },
  adminNotificationEmail: { type: String, default: '' }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;