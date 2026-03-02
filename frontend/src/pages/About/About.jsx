
import React from 'react';
import './About.css';

const TEAM = [
  { 
    name: "Костянтин", 
    role: "Founder & Automation Architect", 
    bio: "Поєдную 20-річний досвід управління бізнесом з експертизою у Fullstack-розробці та AI. Допомагаю впроваджувати технології, де автоматизація та штучний інтелект стають фундаментом для масштабування. У своїх статтях ділюся лише перевіреними на практиці інструментами, які дійсно економлять час та оптимізують бізнес-процеси.",
    avatar: "/avatars/avatar-admin.png" 
  },
  { 
    name: "Марина", 
    role: "Content Lead & UX Researcher", 
    bio: "Перетворюю складні технічні рішення на зрозумілий контент. Досліджую користувацький досвід та ділюся інсайтами про те, як зробити сервіси та цифрові інструменти максимально ефективними для кожного.",
    avatar: "/avatars/9610.jpg" 
  },
  { 
    name: "Ігор", 
    role: "Technical Writer", 
    bio: "Спеціалізуюся на тестуванні швидкості та SEO-потенціалу веб-платформ. Допомагаю розібратися в нюансах конструкторів та налаштуванні інструментів, що реально працюють на результат.",
    avatar: "/avatars/1081.jpg" 
  }

];

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Ми тестуємо — ви ростете</h1>
        <p className="subtitle">
          В океані маркетингових інструментів легко потонути. Наша мета — стати
           вашим навігатором. Ми проводимо глибокий аналіз кожної платформи: 
           від Shopify до складних CRM-систем, щоб ви інвестували час і гроші тільки в те,
           що працює. Жодної води — тільки цифри, кейси та реальні плюси.
          Команда ентузіастів, які перевіряють кожен сервіс на міцність, 
          перш ніж рекомендувати його вам.
        </p>
      </section>

      {/* Наша місія */}
      <section className="about-mission">
        <div className="mission-content">
          <h2>Чому нам можна довіряти?</h2>
          <p>
            На відміну від багатьох оглядів у мережі, ми не просто копіюємо опис із сайтів виробників. 
            Ми реєструємось, оплачуємо тарифи та налаштовуємо реальні сценарії. 
            Якщо сервіс має погану підтримку або приховані платежі — ми про це напишемо.
          </p>
        </div>
      </section>

      {/* Команда (використовуємо ті ж аватарки, що в адмінці) */}
      <section className="team-section">
        <h2>Наша Команда</h2>
        <div className="team-grid">
          {TEAM.map((member) => (
            <div key={member.name} className="team-card">
              <div className="team-avatar-wrapper">
                <img src={member.avatar} alt={member.name} className="team-avatar" />
              </div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;