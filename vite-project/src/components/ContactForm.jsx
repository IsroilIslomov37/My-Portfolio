import { useState } from 'react';
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
  FiInbox,
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

  /*
   * Форма обращается к собственному эндпоинту, а не к api.telegram.org напрямую.
   * Прежний вариант подставлял VITE_TELEGRAM_BOT_TOKEN в клиентский бандл, то
   * есть публиковал токен бота на сайте: любой посетитель мог прочитать его из
   * JS и завладеть ботом (Telegram такие утечки к тому же отзывает сам).
   * Теперь токен остаётся на сервере.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Не удалось отправить сообщение:', data?.error ?? response.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="glass-3 glass-spotlight p-6 sm:p-8" onMouseMove={handleSpotlight}>
      <div className="flex items-center gap-3 mb-2">
        <FiInbox className="text-xl text-accent shrink-0" aria-hidden="true" />
        <h3 className="t-card">{t('contact.form.title')}</h3>
      </div>
      <p className="t-meta mb-7">{t('contact.form.subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {/* Метки связаны с полями через htmlFor/id: раньше клик по подписи
                не переводил фокус, а скринридер читал поле безымянным. */}
            <label className="field-label" htmlFor="contact-name">
              <FiUser className="text-accent" aria-hidden="true" />
              <span>{t('contact.form.name_label')}</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact.form.name_placeholder')}
              required
              className="field"
            />
          </div>

          <div>
            <label className="field-label" htmlFor="contact-email">
              <FiMail className="text-accent" aria-hidden="true" />
              <span>{t('contact.form.email_label')}</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact.form.email_placeholder')}
              required
              className="field"
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="contact-subject">
            <FiBookmark className="text-accent" aria-hidden="true" />
            <span>{t('contact.form.subject_label')}</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t('contact.form.subject_placeholder')}
            required
            className="field"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="contact-message">
            <FiMessageSquare className="text-accent" aria-hidden="true" />
            <span>{t('contact.form.message_label')}</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('contact.form.message_placeholder')}
            required
            className="field resize-none"
          />
        </div>

        {/* Результат отправки объявляется скринридеру, а не только показывается */}
        <div role="status" aria-live="polite">
          {status === 'success' && (
            <p className="flex items-center gap-2 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-chip text-xs">
              <FiCheckCircle className="text-base shrink-0" aria-hidden="true" />
              <span>{t('contact.form.success_msg')}</span>
            </p>
          )}

          {status === 'error' && (
            <p className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 text-red-300 rounded-chip text-xs">
              <FiAlertCircle className="text-base shrink-0" aria-hidden="true" />
              <span>{t('contact.form.error_msg')}</span>
            </p>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
          {loading ? (
            <>
              <FiLoader className="animate-spin" aria-hidden="true" />
              <span>{t('contact.form.sending')}</span>
            </>
          ) : (
            <>
              <FiSend aria-hidden="true" />
              <span>{t('contact.form.send_btn')}</span>
            </>
          )}
        </button>
      </form>

      {/* Бумажный самолётик улетает, когда сообщение ушло. Монтируется заново
          при каждой успешной отправке, поэтому анимация повторяется. */}
      {status === 'success' && (
        <svg className="plane-fly" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path d="M4 22 44 4 34 44 22 28Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M22 28 44 4M22 28l-2 12 8-7" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
};

export default ContactForm;
