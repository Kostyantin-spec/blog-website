import { useLocation } from 'react-router-dom';
import Newsletter from '../../frontend/src/Components/Subscribe/Newsletter/Newsletter';

const ConditionalNewsletter = () => {
  const location = useLocation();

  // Список сторінок, де НЕ ТРЕБА показувати підписку
  const excludePaths = [
    '/thank-you',
    '/admin',
    '/admin/dashboard',
    '/admin/settings',
    '/admin/login',
    '/admin/register-secret-page',
    '/advert',
    '/top-tools',
    '/builders',
    '/tools',
    '/top-tools-hosting',
    '/top-tools-builders',
    '/marketing',
    '/crm',
    '/admin/add-post',
    '/admin/edit/:slug',
    '/admin/settings'
  ];

  // Перевіряємо, чи поточний шлях починається з /admin або є в списку виключень
  const shouldHide = excludePaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) return null;

  return <Newsletter />;
};

export default ConditionalNewsletter;