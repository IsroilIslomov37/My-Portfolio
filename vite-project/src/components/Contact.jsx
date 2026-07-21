import { Card } from 'antd';
import SectionTitle from './SectionTitle';
import { FaTelegram, FaInstagram, FaGithub } from 'react-icons/fa6';

const Contact = () => {
  const contactLinks = [
    {
      name: 'Telegram',
      handle: '@islomv_047',
      url: 'https://t.me/islomv_047',
      icon: <FaTelegram className="text-sky-400 text-3xl" />,
    },
    {
      name: 'Instagram',
      handle: 'islomoff47',
      url: 'https://instagram.com/islomoff47',
      icon: <FaInstagram className="text-pink-500 text-3xl" />,
    },
    {
      name: 'GitHub',
      handle: 'IsroilIslomov37',
      url: 'https://github.com/IsroilIslomov37',
      icon: <FaGithub className="text-white text-3xl" />,
    },
  ];

  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title="Get In Touch" subtitle="Let's Connect" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {contactLinks.map((contact, idx) => (
          <a key={idx} href={contact.url} target="_blank" rel="noreferrer">
            <Card
              bordered={false}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-white hover:border-cyan-400 transition-all duration-300 text-center"
            >
              <div className="flex flex-col items-center gap-3">
                {contact.icon}
                <div>
                  <p className="font-semibold text-lg">{contact.name}</p>
                  <p className="text-sm text-cyan-400 font-mono">{contact.handle}</p>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;