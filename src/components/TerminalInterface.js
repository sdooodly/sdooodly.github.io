import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { skills } from '../data/skills';

const MEDIUM_FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sdooodly';
let blogCache = null;

function getAllSkills() {
  return Object.entries(skills).map(([cat, items]) => {
    const header = `\n── ${cat} ${'─'.repeat(40 - cat.length)}`;
    const rows = items.map(s => `  ${s.name.padEnd(18)} ${'█'.repeat(Math.round(s.level))}${'░'.repeat(10 - Math.round(s.level))} ${s.level}/10  (${s.years})`).join('\n');
    return header + '\n' + rows;
  }).join('\n');
}
function formatCategory(cat) {
  const items = skills[cat];
  if (!items) return null;
  return items.map(s => `  ${s.name.padEnd(18)} ${'█'.repeat(Math.round(s.level))}${'░'.repeat(10 - Math.round(s.level))} ${s.level}/10  (${s.years})`).join('\n');
}

const CMDS = {
  'help': `Available commands:
  help               Show this help
  about              About the wanderer
  ls skills          All skills with levels
  ls skills frontend Frontend skills
  ls skills backend  Backend skills
  ls skills devops   DevOps skills
  ls skills tools    Tools
  ls blog            Latest Medium posts
  ls projects        Quests completed
  cat contact        Send a raven
  whoami             Know thyself
  pwd                Where in Middle-earth?
  last-updated       Version info
  clear              Clear the mist`,
  'about': 'A developer wandering through the lands of code, bearing the Ring of JavaScript.\nSpecialized in C#, Python, and the Cloud of Azure.\n"All we have to decide is what to code with the time that is given us."',
  'cat contact': 'Email: gayathrigs@outlook.com\nLinkedIn: linkedin.com/in/gayathri-gireesh-sujatha-3606ba189\nGitHub: github.com/sdooodly\nStatus: Open for new quests',
  'ls projects': 'portfolio-optimization/\nreact-dashboard/\napi-automation/\ndevops-automation/\ncloud-migration/',
  'whoami': '"I am Sdooodly, broken and incomplete... yet needed."',
  'pwd': '/middle-earth/code/sdoooterminal',
  'last-updated': 'v1.0.0 — April 2, 2026',
  'easter egg': 'YOU SHALL NOT PASS! (without reading the code first)',
  'fly you fools': 'One does not simply... debug production.',
  'my precious': 'Git commit -m "My Precious"',
  'one ring': 'One Ring to rule them all...\nBut in Code: One Function to rule them all! 🔮',
};

const GREETINGS = [
  'Welcome, traveler. The mines of Sdoooterminal await...',
  'A wizard is never late. He codes precisely when he means to.',
  'Even the smallest line of code can change the course of the future.',
  'One does not simply optimize code...',
];

const TerminalInterface = memo(() => {
  const [expanded, setExpanded] = useState(false);
  const [lines, setLines] = useState([{ type: 'welcome', text: GREETINGS[Math.floor(Math.random() * GREETINGS.length)] }]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [lines]);
  useEffect(() => { if (expanded && inputRef.current) inputRef.current.focus(); }, [expanded]);

  const add = useCallback((prev, texts) => [...prev, ...texts.map(t => ({ type: 'output', text: t }))], []);

  const exec = useCallback((cmd) => {
    const t = cmd.trim().toLowerCase();
    let next = [...lines, { type: 'input', text: `$ ${cmd}` }];
    if (t === 'clear') { setLines([]); }
    else if (t === '') { /* noop */ }
    else if (CMDS[t]) { next = add(next, CMDS[t].split('\n')); setLines(next); }
    else if (t === 'ls skills') { next = add(next, getAllSkills().split('\n')); setLines(next); }
    else if (t.startsWith('ls skills ')) {
      const map = { frontend: 'Frontend', backend: 'Backend', devops: 'DevOps', tools: 'Tools' };
      const cat = map[t.replace('ls skills ', '')];
      if (cat) { next = add(next, [`── ${cat} ──`, ...formatCategory(cat).split('\n')]); }
      else { next.push({ type: 'error', text: `Unknown: try frontend, backend, devops, tools` }); }
      setLines(next);
    } else if (t === 'ls blog') {
      next.push({ type: 'output', text: 'Fetching from Medium...' }); setLines(next);
      if (blogCache) { setLines(prev => add(prev, blogCache)); }
      else {
        fetch(MEDIUM_FEED_URL).then(r => r.json()).then(d => {
          if (d.status === 'ok' && d.items?.length) {
            blogCache = d.items.slice(0, 5).map((p, i) => `  ${i + 1}. ${p.title}\n     ${p.link}`);
            setLines(prev => add(prev, blogCache));
          } else { setLines(prev => [...prev, { type: 'error', text: 'No posts found.' }]); }
        }).catch(() => setLines(prev => [...prev, { type: 'error', text: 'Fetch failed.' }]));
      }
    } else { next.push({ type: 'error', text: `Not found: ${cmd}. Type 'help'` }); setLines(next); }
    setHistory(prev => [...prev, cmd]); setInput(''); setHistIdx(-1);
  }, [lines, add]);

  const onKey = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); exec(input); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); const n = histIdx + 1; if (n < history.length) { setHistIdx(n); setInput(history[history.length - 1 - n]); } }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(history[history.length - histIdx]); } else if (histIdx === 0) { setHistIdx(-1); setInput(''); } }
    else if (e.key === 'Tab') e.preventDefault();
  };

  return (
    <footer id="terminal" className={`fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 bg-bg/95 backdrop-blur-md transition-all duration-300 ${expanded ? 'h-[420px]' : 'h-10 cursor-pointer hover:border-accent/30'}`} onClick={() => !expanded && setExpanded(true)}>
      <div className="px-5 py-2 border-b border-white/6 flex items-center justify-between h-10">
        <span className="text-xs text-muted/60 font-mono tracking-wide">sdoooterminal</span>
        {expanded && <button onClick={e => { e.stopPropagation(); setExpanded(false); }} className="text-muted hover:text-accent text-lg font-light px-2" aria-label="Close">×</button>}
      </div>
      {expanded && (
        <>
          <div ref={scrollRef} className="overflow-y-auto p-4 space-y-0.5 font-mono text-xs" style={{ height: 'calc(100% - 80px)' }}>
            {lines.map((l, i) => <div key={i} className={l.type === 'welcome' ? 'text-accent/70 font-medium' : l.type === 'input' ? 'text-text/80 font-medium' : l.type === 'error' ? 'text-red-400/70' : 'text-muted'} style={{ whiteSpace: 'pre-wrap' }}>{l.text}</div>)}
          </div>
          <div className="border-t border-white/6 px-5 py-2 flex items-center gap-2 h-10">
            <span className="text-accent font-medium flex-shrink-0">›</span>
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} className="flex-1 bg-transparent outline-none text-text/80 placeholder:text-muted/30 font-mono text-xs min-w-0" placeholder="help" spellCheck="false" />
          </div>
        </>
      )}
    </footer>
  );
});

TerminalInterface.displayName = 'TerminalInterface';
export default TerminalInterface;
