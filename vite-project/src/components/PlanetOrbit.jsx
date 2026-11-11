import { RiOpenaiFill } from 'react-icons/ri';
import {
  SiClaudecode,
  SiCursor,
  SiDeepseek,
  SiFigma,
  SiGit,
  SiNestjs,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

/*
 * Имя файла осталось от орбиты первой версии сайта. Теперь здесь карточка
 * стека: три блока, плитка технологии подсвечивается под курсором.
 * Подписи — названия технологий, они не переводятся.
 */
const BLOCKS = [
  {
    label: 'Frontend',
    nodes: [
      { name: 'React 18', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind', icon: <SiTailwindcss /> },
    ],
  },
  {
    label: 'AI workflow',
    nodes: [
      { name: 'Claude Code', icon: <SiClaudecode /> },
      { name: 'Cursor', icon: <SiCursor /> },
      { name: 'Codex', icon: <RiOpenaiFill /> },
      { name: 'DeepSeek', icon: <SiDeepseek /> },
    ],
  },
  {
    label: 'Infra & deploy',
    nodes: [
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Git', icon: <SiGit /> },
      { name: 'Figma', icon: <SiFigma /> },
      { name: 'REST / NestJS', icon: <SiNestjs /> },
    ],
  },
];

const PlanetOrbit = () => (
  <div className="glass-3 w-full max-w-md p-5 sm:p-6 space-y-5">
    {BLOCKS.map((block) => (
      <div key={block.label}>
        <p className="t-eyebrow mb-2.5">{block.label}</p>
        <ul className="grid grid-cols-2 gap-2">
          {block.nodes.map((node) => (
            <li
              key={node.name}
              className="group/node flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-space-800 border border-ink-50/[0.08] text-sm font-medium text-ink-100 hover:border-accent hover:text-ink-50 transition-colors duration-250"
            >
              <span
                className="text-base text-ink-300 group-hover/node:text-accent transition-colors duration-250"
                aria-hidden="true"
              >
                {node.icon}
              </span>
              <span className="truncate">{node.name}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default PlanetOrbit;
