import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCursor,
  SiClaudecode,
  SiDeepseek,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiAnthropic,
} from 'react-icons/si';
import { RiOpenaiFill } from 'react-icons/ri';
import { TbBrandVscode } from 'react-icons/tb';

// Технологии, которыми пользуюсь ежедневно, но которые не входят в
// Knowledge Web ниже — показаны отдельной компактной строкой.
const CORE_STACK = [
  { id: 'react', name: 'React', icon: <SiReact className="text-cyan-400" /> },
  { id: 'javascript', name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
  { id: 'typescript', name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { id: 'tailwind', name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" /> },
  { id: 'html5', name: 'HTML5 / CSS3', icon: <SiHtml5 className="text-orange-500" /> },
];

// Заглушка для брендов без официальной иконки в библиотеке.
const Monogram = ({ letter, className = '' }) => (
  <span className={`font-black text-sm tracking-tight ${className}`}>{letter}</span>
);

// Небольшая "паутина знаний": ядро AI/Dev/Design в центре, три коротких
// кластера вокруг него. Координаты — проценты внутри компактного контейнера,
// подобраны вручную как аккуратная композиция, а не физическая симуляция.
const HUB = { x: 50, y: 44 };

const CLUSTERS = [
  {
    id: 'design',
    categoryKey: 'skills.categories.design',
    anchor: { x: 16, y: 16 },
    accent: 'rgba(232, 121, 249, 0.5)',
    tools: [
      { id: 'figma', pos: { x: 20, y: 4 }, icon: <SiFigma className="text-fuchsia-400" /> },
      { id: 'claude_design', pos: { x: 4, y: 24 }, icon: <SiAnthropic className="text-orange-300" /> },
    ],
  },
  {
    id: 'development',
    categoryKey: 'skills.categories.development',
    anchor: { x: 84, y: 16 },
    accent: 'rgba(52, 211, 153, 0.5)',
    tools: [
      { id: 'git', pos: { x: 62, y: 3 }, icon: <SiGit className="text-orange-500" /> },
      { id: 'github', pos: { x: 80, y: 2 }, icon: <SiGithub className="text-white" /> },
      { id: 'vscode', pos: { x: 97, y: 14 }, icon: <TbBrandVscode className="text-blue-400" /> },
      { id: 'vercel', pos: { x: 94, y: 33 }, icon: <SiVercel className="text-white" /> },
      { id: 'freebuff', pos: { x: 74, y: 31 }, icon: <Monogram letter="F" className="text-lime-300" /> },
    ],
  },
  {
    id: 'ai_coding',
    categoryKey: 'skills.categories.ai_coding',
    anchor: { x: 50, y: 84 },
    accent: 'rgba(96, 165, 250, 0.5)',
    tools: [
      { id: 'cursor', pos: { x: 12, y: 66 }, icon: <SiCursor className="text-white" /> },
      { id: 'claude_code', pos: { x: 26, y: 89 }, icon: <SiClaudecode className="text-orange-300" /> },
      { id: 'codex', pos: { x: 41, y: 97 }, icon: <RiOpenaiFill className="text-emerald-300" /> },
      { id: 'deepseek', pos: { x: 59, y: 97 }, icon: <SiDeepseek className="text-blue-300" /> },
      { id: 'antigravity', pos: { x: 74, y: 89 }, icon: <Monogram letter="A" className="text-indigo-300" /> },
      { id: 'manus', pos: { x: 88, y: 66 }, icon: <Monogram letter="M" className="text-teal-300" /> },
    ],
  },
];

const ALL_TOOLS = CLUSTERS.flatMap((cluster) => cluster.tools.map((tool) => ({ ...tool, clusterId: cluster.id })));

const Skills = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(null);

  const hoveredCluster = hovered ? ALL_TOOLS.find((tool) => tool.id === hovered)?.clusterId : null;

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />

      {/* Core Stack */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {CORE_STACK.map((item) => (
          <div key={item.id} className="glass-1 px-4 py-2 flex items-center gap-2 text-sm text-gray-200">
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Desktop/tablet — компактная knowledge web */}
      <div className="hidden md:block relative w-full max-w-2xl mx-auto aspect-[5/4]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {CLUSTERS.map((cluster) => (
            <line
              key={`hub-${cluster.id}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={cluster.anchor.x}
              y2={cluster.anchor.y}
              stroke={cluster.accent}
              strokeWidth={hoveredCluster === cluster.id ? 0.5 : 0.3}
              vectorEffect="non-scaling-stroke"
              className="transition-all duration-500"
            />
          ))}
          {CLUSTERS.map((cluster) =>
            cluster.tools.map((tool) => (
              <line
                key={`line-${tool.id}`}
                x1={cluster.anchor.x}
                y1={cluster.anchor.y}
                x2={tool.pos.x}
                y2={tool.pos.y}
                stroke={cluster.accent}
                strokeWidth={hovered === tool.id ? 0.55 : 0.26}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
              />
            ))
          )}
        </svg>

        {/* Ядро */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full glass-3 text-center px-1"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
        >
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
        </div>
        <div
          className="absolute text-[9px] uppercase tracking-widest text-gray-300 whitespace-nowrap"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%`, transform: 'translate(-50%, 22px)' }}
        >
          {t('skills.hub_label')}
        </div>

        {/* Узлы-инструменты */}
        {ALL_TOOLS.map((tool, i) => (
          <div
            key={tool.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
            style={{ left: `${tool.pos.x}%`, top: `${tool.pos.y}%`, animationDelay: `${(i % 5) * 0.6}s` }}
            onMouseEnter={() => setHovered(tool.id)}
            onMouseLeave={() => setHovered((h) => (h === tool.id ? null : h))}
          >
            <div
              className={`relative w-9 h-9 rounded-xl glass-2 flex items-center justify-center text-sm cursor-default transition-all duration-300 ${
                hovered === tool.id
                  ? 'scale-125 shadow-node-glow border-white/40 z-20'
                  : hoveredCluster === tool.clusterId
                  ? 'border-white/25 z-10'
                  : 'border-white/15 z-0'
              }`}
            >
              {tool.icon}
            </div>

            {hovered === tool.id && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] w-40 glass-2 px-2.5 py-2 z-30 pointer-events-none text-center">
                <p className="text-white font-semibold text-xs leading-tight">{t(`skills.tools.${tool.id}.name`)}</p>
                <p className="text-[10px] uppercase tracking-wider text-blue-300 mt-0.5">{t(`skills.categories.${tool.clusterId}`)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile — обычная сгруппированная сетка, без hover-зависимостей */}
      <div className="md:hidden space-y-6">
        {CLUSTERS.map((cluster) => (
          <div key={cluster.id} className="glass-2 p-5">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-4">{t(cluster.categoryKey)}</h3>
            <div className="grid grid-cols-3 gap-3">
              {cluster.tools.map((tool) => (
                <div key={tool.id} className="glass-2 p-3 flex flex-col items-center text-center gap-1.5">
                  <span className="text-xl">{tool.icon}</span>
                  <span className="text-[11px] font-medium text-gray-200 leading-tight">{t(`skills.tools.${tool.id}.name`)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
