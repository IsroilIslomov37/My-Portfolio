import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

/*
 * Маленький терминал на первом экране. Команды — английские слова, как в
 * настоящей консоли; всё, что они выводят, берётся из локалей. В истории
 * хранится только тип ответа, а не готовый текст, поэтому при смене языка
 * весь вывод перерисовывается на новом языке.
 */
const COMMANDS = ['help', 'whoami', 'stack', 'projects', 'contact', 'hire', 'clear'];
const CHIPS = ['help', 'whoami', 'projects', 'contact', 'hire'];

// Названия технологий и ссылки не переводятся
const STACK = [
  { label: 'frontend', items: ['React 18', 'Next.js', 'TypeScript', 'Tailwind'] },
  { label: 'ai workflow', items: ['Claude Code', 'Cursor', 'Codex', 'DeepSeek'] },
  { label: 'infra & deploy', items: ['Vercel', 'Git', 'Figma', 'REST / NestJS'] },
];

const PROJECTS = [
  { name: 'Formo', url: 'https://formo.uz' },
  { name: 'Perfect School', url: 'https://vibrant-landing-woad.vercel.app/' },
  { name: 'Core Store', url: 'https://core-store-peach.vercel.app/' },
];

const CONTACTS = [
  { name: 'telegram', url: 'https://t.me/islomov_047', handle: '@islomov_047' },
  { name: 'github', url: 'https://github.com/IsroilIslomov37', handle: 'IsroilIslomov37' },
  { name: 'linkedin', url: 'https://www.linkedin.com/in/islomovisroil37', handle: 'islomovisroil37' },
];

const link = 'underline decoration-dotted underline-offset-4 hover:text-accent-soft';

const Output = ({ kind, cmd }) => {
  const { t } = useTranslation();

  switch (kind) {
    case 'help':
      return (
        <ul>
          {COMMANDS.map((c) => (
            <li key={c} className="flex gap-3">
              <span className="w-20 shrink-0 text-[#7ee2a0]">{c}</span>
              <span>{t(`terminal.cmd_${c}`)}</span>
            </li>
          ))}
        </ul>
      );
    case 'whoami':
      return <p>{t('terminal.whoami')}</p>;
    case 'stack':
      return (
        <ul>
          {STACK.map((block) => (
            <li key={block.label}>
              <span className="text-[#7ee2a0]">{block.label}:</span> {block.items.join(' · ')}
            </li>
          ))}
        </ul>
      );
    case 'projects':
      return (
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.name}>
              <span className="text-[#7ee2a0]">→</span>{' '}
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={link}>
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      );
    case 'contact':
      return (
        <ul>
          {CONTACTS.map((c) => (
            <li key={c.name} className="flex gap-3">
              <span className="w-20 shrink-0 text-[#7ee2a0]">{c.name}</span>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className={link}>
                {c.handle}
              </a>
            </li>
          ))}
        </ul>
      );
    case 'hire':
      return <p>{t('terminal.hire')}</p>;
    default:
      return <p className="text-[#ffb4a8]">{t('terminal.not_found', { cmd })}</p>;
  }
};

const Prompt = () => (
  <span className="text-[#7ee2a0] shrink-0" aria-hidden="true">
    isroil@portfolio:~$
  </span>
);

const Terminal = () => {
  const { t } = useTranslation();
  const [lines, setLines] = useState([{ id: 0, cmd: 'stack', kind: 'stack' }]);
  const [value, setValue] = useState('');
  const nextId = useRef(1);
  const history = useRef([]);
  const historyPos = useRef(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Новый ответ всегда виден: прокручиваем вывод вниз
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    history.current.push(cmd);
    historyPos.current = history.current.length;

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    const kind = COMMANDS.includes(cmd) ? cmd : 'unknown';
    setLines((prev) => [...prev, { id: nextId.current++, cmd, kind }]);

    // Пасхалка: «hire» уводит к форме контактов
    if (kind === 'hire') {
      setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 900);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(value);
      setValue('');
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const list = history.current;
      if (!list.length) return;
      e.preventDefault();
      const step = e.key === 'ArrowUp' ? -1 : 1;
      historyPos.current = Math.min(list.length, Math.max(0, historyPos.current + step));
      setValue(list[historyPos.current] ?? '');
    } else if (e.key === 'Tab' && value) {
      const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    }
  };

  return (
    <div className="taped relative w-full max-w-md lg:rotate-1 rounded-card bg-ink-50 text-[#e7e5e4] font-mono text-[0.8125rem] leading-relaxed shadow-elev-2">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[0.75rem] text-[#a8a29e]">{t('terminal.title')}</span>
      </div>

      {/* Клик по любому месту терминала ставит курсор в строку ввода */}
      <div
        ref={bodyRef}
        className="h-64 overflow-y-auto px-4 py-3 space-y-2.5"
        onClick={() => inputRef.current?.focus()}
      >
        <p className="text-[#a8a29e]">{t('terminal.hint')}</p>

        <div role="log" aria-live="polite" className="space-y-2.5">
          {lines.map((line) => (
            <div key={line.id}>
              <p className="flex gap-2">
                <Prompt />
                <span>{line.cmd}</span>
              </p>
              <div className="pl-0.5 text-[#d6d3d1]">
                <Output kind={line.kind} cmd={line.cmd} />
              </div>
            </div>
          ))}
        </div>

        <label className="flex gap-2 items-center">
          <Prompt />
          <span className="sr-only">{t('terminal.input_label')}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="flex-1 min-w-0 bg-transparent outline-none caret-[#7ee2a0] text-[#fafaf9]"
          />
        </label>
      </div>

      {/* Команды кнопками — чтобы на телефоне не открывать клавиатуру */}
      <div className="flex flex-wrap gap-1.5 px-4 py-3 border-t border-white/10">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="px-2.5 py-1 rounded-chip border border-white/15 text-[#d6d3d1] hover:border-[#7ee2a0] hover:text-[#7ee2a0] transition-colors duration-250"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
