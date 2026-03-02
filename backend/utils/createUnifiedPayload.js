
export const createUnifiedPayload = (sourceType, blogData, globalSettings = {}) => {
  // 1. Очищення тексту (видаляємо зайві пробіли та переноси рядків, щоб JSON не ламався)
  const cleanText = (str) => str ? str.toString().trim() : "";

  // 2. Безпечне отримання зображення
  const getImage = () => {
    const img = blogData.blog_image || blogData.image || blogData.featuredImage || "";
    return (typeof img === 'string' && img.startsWith("http")) ? img : "";
  };

  // 3. Формування домену без протоколів (якщо випадково в налаштуваннях ввели https://)
  let domain = globalSettings.siteName || 'marketingkit.com';
  domain = domain.replace(/^https?:\/\//, '').replace(/\/$/, ''); 

  const slug = blogData.slug || blogData.uniqueSlug || "no-slug";
  const fullUrl = `https://${domain}/blog/${slug}`;

  // 4. Формуємо payload
  const payload = {
    event: sourceType,
    site: domain,
    httpUrl: fullUrl,
    name: cleanText(blogData.author_name || "Адмін"),
    email: cleanText(blogData.authorEmail || "no-reply@mysite.com"),
    // Обрізаємо опис до 500 символів, щоб Make не "захлинувся" великим текстом
    text: cleanText(blogData.description).substring(0, 500),
    source: sourceType,
    articleTitle: cleanText(blogData.title || "Нова стаття"),
    articleSlug: slug,
    actionType: sourceType,
    
    // extraData для гнучкості в Make
    extraData: {
      category: blogData.category || "",
      views: blogData.blogDetail?.views || 0,
      likes: blogData.likes || 0,
      image: getImage(),
    },

    // post_data для сумісності зі старими сценаріями
    post_data: {
      title: cleanText(blogData.title),
      description: cleanText(blogData.description).substring(0, 300),
      slug: slug,
      category: blogData.category || "",
      full_url: fullUrl,
      image: getImage(),
      reshareCount: blogData.reshareCount || 0
    },
    
    sentAt: new Date().toISOString(),
    timestamp: Date.now() // Корисно для сортування в Make
  };

  return payload;
};

export default createUnifiedPayload;