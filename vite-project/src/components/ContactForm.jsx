import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FiSend, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiLoader, 
  FiUser, 
  FiMail, 
  FiBookmark, 
  FiMessageSquare,
  FiInbox
} from 'react-icons/fi';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8795106627:AAHAICgdXF5Ravh3VUYHWAnwMnxBH_7o8P8';
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '5156240282';

    // Текстовый формат сообщения без HTML-тегов
    const textMessage = 
`[Новое сообщение с портфолио]

Имя: ${formData.name}
Email: ${formData.email}
Тема: ${formData.subject}

Сообщение:
${formData.message}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: textMessage,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Ошибка от Telegram API:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b0f17]/90 border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-2">
        <FiInbox className="text-2xl text-blue-500" />
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {t('contact.form.title', 'Отправить сообщение')}
        </h3>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        {t('contact.form.subtitle', 'Заполните форму, и я отвечу вам в течение 24 часов.')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Имя и Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              <FiUser className="text-blue-400" />
              <span>{t('contact.form.name_label', 'ВАШЕ ИМЯ')}</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact.form.name_placeholder', 'Исроил Исломов')}
              required
              className="w-full bg-[#06090e] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              <FiMail className="text-blue-400" />
              <span>{t('contact.form.email_label', 'EMAIL')}</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact.form.email_placeholder', 'you@example.com')}
              required
              className="w-full bg-[#06090e] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Тема */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            <FiBookmark className="text-blue-400" />
            <span>{t('contact.form.subject_label', 'ТЕМА')}</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t('contact.form.subject_placeholder', 'Проект, предложение, сотрудничество...')}
            required
            className="w-full bg-[#06090e] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all text-sm"
          />
        </div>

        {/* Сообщение */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            <FiMessageSquare className="text-blue-400" />
            <span>{t('contact.form.message_label', 'СООБЩЕНИЕ')}</span>
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('contact.form.message_placeholder', 'Напишите о вашем проекте — цели, сроки, бюджет...')}
            required
            className="w-full bg-[#06090e] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all text-sm resize-none"
          ></textarea>
        </div>

        {/* Статусы */}
        {status === 'success' && (
          <div className="flex items-center gap-2 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm">
            <FiCheckCircle className="text-lg shrink-0" />
            <span>{t('contact.form.success_msg', 'Сообщение успешно отправлено!')}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
            <FiAlertCircle className="text-lg shrink-0" />
            <span>{t('contact.form.error_msg', 'Ошибка при отправке. Попробуйте еще раз.')}</span>
          </div>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-[0.99] cursor-pointer"
        >
          {loading ? (
            <>
              <FiLoader className="text-lg animate-spin" />
              <span>{t('contact.form.sending', 'Отправка...')}</span>
            </>
          ) : (
            <>
              <FiSend className="text-lg" />
              <span>{t('contact.form.send_btn', 'Отправить сообщение')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;