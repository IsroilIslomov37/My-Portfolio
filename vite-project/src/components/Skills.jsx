import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import useReveal from '../hooks/useReveal';
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiGit,
  SiCursor,
  SiClaudecode,
  SiDeepseek,
  SiVercel,
  SiFigma,
} from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';
import { TbBrandVscode } from 'react-icons/tb';
import { FiLayout } from 'react-icons/fi';

/*
 * Паутина знаний устроена в два круга, и это её главное сообщение:
 *
 *   внутренний круг — то, что я пишу сам (язык, фреймворк, вёрстка);
 *   внешний круг    — инструменты вокруг этого, включая AI-ассистентов.
 *
 * Раньше в паутине были только инструменты, а языки лежали отдельной строкой
 * чипов — из-за этого Claude Code и JavaScript читались как явления одного
 * порядка. Радиусы эллипса подобраны так, чтобы узлы вместе с подписями
 * гарантированно оставались внутри контейнера на любой ширине.
 */
const HUB = { x: 50, y: 50 };
const LINE = '#fafafa';
const LIT = '#c6f432';
const CORE_RADIUS = { x: 24, y: 25 };
const TOOL_RADIUS = { x: 40, y: 39 };

const CORE = [
  { id: 'react', angle: -90, icon: <SiReact /> },
  { id: 'javascript', angle: -30, icon: <SiJavascript /> },
  { id: 'git', angle: 30, icon: <SiGit /> },
  { id: 'ui', angle: 90, icon: <FiLayout /> },
  { id: 'css', angle: 150, icon: <SiCss /> },
  { id: 'html', angle: 210, icon: <SiHtml5 /> },
];

// Заглушка для брендов без официальной иконки в библиотеке.
const Monogram = ({ letter, className = '' }) => (
  <span className={`font-bold text-[0.8em] tracking-tight ${className}`}>{letter}</span>
);

// Угол каждого инструмента выбран рядом с «родительским» навыком, поэтому
// связующая линия получается короткой и не пересекает половину схемы.
const TOOLS = [
  { id: 'claude_code', angle: -108, parent: 'react', icon: <SiClaudecode /> },
  { id: 'cursor', angle: -72, parent: 'react', icon: <SiCursor /> },
  { id: 'codex', angle: -36, parent: 'javascript', icon: <RiOpenaiFill /> },
  { id: 'deepseek', angle: 0, parent: 'javascript', icon: <SiDeepseek /> },
  { id: 'vercel', angle: 36, parent: 'git', icon: <SiVercel /> },
  { id: 'vscode', angle: 72, parent: 'ui', icon: <TbBrandVscode /> },
  { id: 'manus', angle: 108, parent: 'ui', icon: <Monogram letter="M" /> },
  { id: 'figma', angle: 144, parent: 'css', icon: <SiFigma /> },
  { id: 'antigravity', angle: 180, parent: 'html', icon: <Monogram letter="A" /> },
  { id: 'freebuff', angle: 216, parent: 'html', icon: <Monogram letter="F" /> },
];

const place = (angle, radius) => {
  const radian = (angle * Math.PI) / 180;
  return {
    x: HUB.x + Math.cos(radian) * radius.x,
    y: HUB.y + Math.sin(radian) * radius.y,
  };
};

const CORE_NODES = CORE.map((item) => ({ ...item, group: 'core', ...place(item.angle, CORE_RADIUS) }));
const TOOL_NODES = TOOLS.map((item) => ({ ...item, group: 'tools', ...place(item.angle, TOOL_RADIUS) }));
const ALL_NODES = [...CORE_NODES, ...TOOL_NODES];

// Рёбра между соседними навыками замыкают внутренний круг — без них схема
// читалась бы как звезда, а не как связанная система.
const CORE_EDGES = CORE_NODES.map((node, i) => [node, CORE_NODES[(i + 1) % CORE_NODES.length]]);
const TOOL_EDGES = TOOL_NODES.map((tool) => [CORE_NODES.find((core) => core.id === tool.parent), tool]);

const Skills = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [webRef, webVisible] = useReveal({ threshold: 0.2 });

  const activeNode = active ? ALL_NODES.find((node) => node.id === active) : null;

  // Линия подсвечивается, только если оба её конца связаны с активным узлом.
  const edgeLit = (a, b) => Boolean(active) && (a.id === active || b.id === active);

  // На мобильном уровни подписаны заголовками групп — легенда там была бы
  // повтором того же текста двумя строками выше.
  const legend = (
    <ul className="hidden md:flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
      <li className="flex items-center gap-2 t-meta">
        <span className="w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
        {t('skills.legend_core')}
      </li>
      <li className="flex items-center gap-2 t-meta">
        <span className="w-2.5 h-2.5 rounded-full border border-ink-300" aria-hidden="true" />
        {t('skills.legend_tools')}
      </li>
    </ul>
  );

  // Мобильные плитки: тап раскрывает описание под своей группой. Плитка
  // инструмента шириной в треть экрана описание внутри себя не вместит.
  const tileProps = (node) => ({
    onClick: () => setActive((current) => (current === node.id ? null : node.id)),
    'aria-expanded': active === node.id,
    'aria-controls': `skill-desc-${node.group}`,
  });

  const mobileDesc = (group) => (
    <div id={`skill-desc-${group}`}>
      {activeNode?.group === group && (
        <div className="glass-1 mt-3 px-4 py-3">
          <p className="text-sm font-medium text-ink-100 mb-1">
            {t(`skills.items.${activeNode.id}.name`)}
          </p>
          <p className="text-sm leading-snug text-ink-200">
            {t(`skills.items.${activeNode.id}.desc`)}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <section id="skills" className="section">
      <div className="container-page">
        <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} index="02" intro={t('skills.intro')} />

        {legend}

        {/* ---------------------------------------------------------- */}
        {/* Desktop / tablet — паутина знаний                          */}
        {/* ---------------------------------------------------------- */}
        <div
          ref={webRef}
          className={`hidden md:block relative w-full max-w-3xl mx-auto aspect-[7/5] ${
            webVisible ? 'web-in' : ''
          }`}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Замкнутый контур внутреннего круга */}
            {CORE_EDGES.map(([a, b]) => (
              <line
                key={`ring-${a.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={edgeLit(a, b) ? LIT : LINE}
                strokeOpacity={edgeLit(a, b) ? 0.9 : 0.14}
                strokeWidth="1"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                className="web-line"
                style={{ animationDelay: '120ms' }}
              />
            ))}

            {/* Спицы от ядра к навыкам — самые заметные связи схемы */}
            {CORE_NODES.map((node) => (
              <line
                key={`spoke-${node.id}`}
                x1={HUB.x}
                y1={HUB.y}
                x2={node.x}
                y2={node.y}
                stroke={active === node.id ? LIT : LINE}
                strokeOpacity={active === node.id ? 0.9 : 0.26}
                strokeWidth="1"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                className="web-line"
              />
            ))}

            {/* Инструмент → навык: тоньше и тише, иерархия читается сразу */}
            {TOOL_EDGES.map(([core, tool]) => (
              <line
                key={`tool-${tool.id}`}
                x1={core.x}
                y1={core.y}
                x2={tool.x}
                y2={tool.y}
                stroke={edgeLit(core, tool) ? LIT : LINE}
                strokeOpacity={edgeLit(core, tool) ? 0.9 : 0.16}
                strokeWidth="1"
                pathLength="1"
                vectorEffect="non-scaling-stroke"
                className="web-line"
                style={{ animationDelay: '260ms' }}
              />
            ))}
          </svg>

          {/* Ядро */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          >
            <div className="w-16 h-16 glass-3 !rounded-full !border-accent flex items-center justify-center">
              <span className="text-accent text-lg font-semibold">&lt;/&gt;</span>
            </div>
            <span className="t-eyebrow text-ink-300 mt-2.5 whitespace-nowrap">{t('skills.hub_label')}</span>
          </div>

          {/* Узлы */}
          {ALL_NODES.map((node, i) => {
            const isCore = node.group === 'core';
            const isActive = active === node.id;
            // Подсказка у верхних узлов раскрывается вниз, иначе она вылезет
            // за пределы контейнера.
            const tooltipBelow = node.y < 38;

            return (
              <div
                key={node.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                  webVisible ? 'animate-node-in' : 'opacity-0'
                } ${isActive ? 'z-30' : 'z-10'}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  animationDelay: `${200 + i * 45}ms`,
                }}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive((current) => (current === node.id ? null : current))}
                  onFocus={() => setActive(node.id)}
                  onBlur={() => setActive((current) => (current === node.id ? null : current))}
                  onClick={() => setActive((current) => (current === node.id ? null : node.id))}
                  className="flex flex-col items-center gap-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-chip"
                >
                  <span
                    className={`web-node flex items-center justify-center ${
                      isCore
                        ? 'w-12 h-12 glass-2 !rounded-full text-xl text-ink-100'
                        : 'w-9 h-9 glass-1 text-base text-ink-300'
                    } ${isActive ? 'scale-110 !border-accent !text-accent' : ''}`}
                  >
                    {node.icon}
                  </span>
                  <span
                    className={`whitespace-nowrap leading-none ${
                      isCore
                        ? 'text-[0.6875rem] font-medium text-ink-100'
                        : 'text-[0.625rem] text-ink-300'
                    }`}
                  >
                    {t(`skills.items.${node.id}.name`)}
                  </span>
                </button>

                {isActive && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-48 glass-2 px-3 py-2.5 text-center pointer-events-none ${
                      tooltipBelow ? 'top-[calc(100%+10px)]' : 'bottom-[calc(100%+10px)]'
                    }`}
                    role="tooltip"
                  >
                    <p className="t-eyebrow text-ink-400 mb-1.5">
                      {t(`skills.groups.${node.group}`)}
                    </p>
                    <p className="text-[0.75rem] leading-snug text-ink-200">
                      {t(`skills.items.${node.id}.desc`)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Mobile — то же деление на два уровня, без hover-зависимостей */}
        {/* ---------------------------------------------------------- */}
        <div className="md:hidden space-y-8">
          <div>
            <h3 className="t-eyebrow text-ink-300 mb-4">{t('skills.legend_core')}</h3>
            <ul className="grid grid-cols-2 gap-3">
              {CORE_NODES.map((node) => (
                <li key={node.id}>
                  <button
                    type="button"
                    {...tileProps(node)}
                    className={`glass-2 w-full h-full p-4 flex flex-col gap-2 text-left transition-colors duration-250 ${
                      active === node.id ? '!border-accent' : ''
                    }`}
                  >
                    <span className={`text-xl ${active === node.id ? 'text-accent' : 'text-ink-100'}`} aria-hidden="true">{node.icon}</span>
                    <span className="text-sm font-medium text-ink-100 leading-tight">
                      {t(`skills.items.${node.id}.name`)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {mobileDesc('core')}
          </div>

          <div>
            <h3 className="t-eyebrow text-ink-300 mb-4">{t('skills.legend_tools')}</h3>
            {/* flex-wrap, а не grid: инструментов десять, и в сетке из трёх
                колонок последний оставался бы один в углу строки. Здесь
                неполный ряд центрируется и выглядит намеренным. */}
            <ul className="flex flex-wrap justify-center gap-2.5">
              {TOOL_NODES.map((node) => (
                <li key={node.id} className="basis-[calc(33.333%-0.667rem)] grow-0 shrink-0">
                  <button
                    type="button"
                    {...tileProps(node)}
                    className={`glass-1 w-full h-full px-2 py-3 flex flex-col items-center text-center gap-2 transition-colors duration-250 ${
                      active === node.id ? '!border-accent' : ''
                    }`}
                  >
                    <span className={`text-base ${active === node.id ? 'text-accent' : 'text-ink-200'}`} aria-hidden="true">{node.icon}</span>
                    <span className="text-[0.625rem] text-ink-300 leading-tight">
                      {t(`skills.items.${node.id}.name`)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {mobileDesc('tools')}
          </div>
        </div>

        {/* Описание активного узла для скринридера: сама схема декоративна,
            но её содержимое должно быть доступно текстом. */}
        <p className="sr-only" aria-live="polite">
          {activeNode ? t(`skills.items.${activeNode.id}.desc`) : ''}
        </p>
      </div>
    </section>
  );
};

export default Skills;
