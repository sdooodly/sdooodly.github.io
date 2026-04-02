import React, { useState, useRef, useEffect, memo } from 'react';

const COMMAND_OUTPUTS = {
  'help': 'Available commands:\n  help               - Show this help message\n  ls projects        - List all quests completed\n  ls skills          - List all powers acquired\n  about              - About the wanderer\n  cat contact        - Send a raven\n  whoami             - Know thyself\n  pwd                - Where in Middle-earth?\n  last-updated       - Last dispatch from the tower\n  clear              - Clear the mist\n  exit               - Return to the Shire',
  'ls projects': 'portfolio-optimization/\nreact-dashboard/\napi-automation/\ndevops-automation/\ncloud-migration/',
  'ls skills': 'Frontend: React, TypeScript, JavaScript, HTML/CSS, Tailwind\nBackend: C#, .NET Core, Python, Node.js, Azure Functions\nDevOps: Azure DevOps, GitHub Actions, PowerShell, Git\nTools: JIRA API, RESTful, Jest, Cypress, IIS',
  'about': 'A developer wandering through the lands of code, bearing the Ring of JavaScript.\nSpecialized in the ancient arts of C#, Python, and the Cloud of Azure.\nQuest: To build scalable applications and master the DevOps.\n"All we have to decide is what to code with the time that is given us."',
  'cat contact': 'Email: gayathrigs@outlook.com\nLinkedIn: https://www.linkedin.com/in/gayathri-gireesh-sujatha-3606ba189/\nGitHub: https://github.com/sdooodly\nStatus: Open for new quests in remote lands',
  'whoami': '"I am Sdooodly, broken and incomplete... yet needed." - The wanderer',
  'pwd': '/middle-earth/code/sdoooterminal',
  'last-updated': 'v1.0.0 — April 2, 2026\nMajor release: tab-based layout, merged Reads & Writes, simplified Skills, inline Terminal.',
  'easter egg': 'YOU SHALL NOT PASS! (without reading the code first)',
  'fly you fools': 'One does not simply... debug production.',
  'my precious': 'Git commit -m "My Precious"',
  'one ring': 'One Ring to rule them all, One Ring to find them all...\nBut in the land of Code: One Function to rule them all! 🔮',
};

const LOTR_GREETINGS = [
  'Welcome, traveler. The mines of Sdoooterminal await...',
  'A wizard is never late, nor is he early. He codes precisely when he means to.',
  'All we have to decide is what to code with the time that is given us.',
  'Even the smallest line of code can change the course of the future.',
  'You are brave, but not brave enough, I am afraid.',
  'One does not simply optimize code...',
  'A Sdooodly is never late to a deployment.',
  'The Eagles are coming! (Your code is shipping)',
];

const TerminalInterface = memo(() => {
  const [lines, setLines] = useState([
    { type: 'welcome', text: LOTR_GREETINGS[Math.floor(Math.random() * LOTR_GREETINGS.length)] },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines = [...lines, { type: 'input', text: `$ ${cmd}` }];

    if (trimmedCmd === 'clear') {
      setLines([]);
    } else if (trimmedCmd === 'exit') {
      newLines.push({ type: 'output', text: 'Connect with me on GitHub or LinkedIn.' });
      setLines(newLines);
    } else if (COMMAND_OUTPUTS[trimmedCmd]) {
      COMMAND_OUTPUTS[trimmedCmd].split('\n').forEach(line => {
        newLines.push({ type: 'output', text: line });
      });
      setLines(newLines);
    } else if (trimmedCmd === '') {
      setLines(newLines.slice(0, -1));
    } else {
      newLines.push({ type: 'error', text: `Command not found: ${cmd}. Type 'help' for available commands.` });
      setLines(newLines);
    }

    setHistory(prev => [...prev, cmd]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex + 1;
      if (newIndex < history.length) {
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-20 md:py-32">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light font-serif mb-10 text-center text-text/90" style={{ letterSpacing: '0.04em' }}>
        Terminal
      </h2>
      <div className="rounded-2xl overflow-hidden border border-green-500/30 bg-black/80 backdrop-blur-md shadow-2xl">
        {/* Title bar */}
        <div className="bg-black/50 px-6 py-3 border-b border-green-500/20 flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-sm text-green-500/60 font-mono">sdoooterminal</span>
        </div>

        {/* Output area */}
        <div
          ref={scrollRef}
          className="overflow-y-auto p-6 space-y-1 font-mono text-sm min-h-[400px] max-h-[60vh]"
          style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.3)' }}
        >
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={
                line.type === 'welcome' ? 'text-green-500/80 font-semibold' :
                line.type === 'input' ? 'text-cyan-400 font-bold' :
                line.type === 'error' ? 'text-red-400' :
                'text-green-400'
              }
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-green-500/20 px-6 py-3 flex items-center gap-2 bg-black/30">
          <span className="text-cyan-400 font-bold text-lg flex-shrink-0">▶</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 placeholder:text-green-600/40 font-mono text-base min-w-0"
            placeholder="Type 'help' to see commands..."
            spellCheck="false"
          />
          {input && <span className="text-green-500/50 animate-pulse text-base flex-shrink-0">▌</span>}
        </div>
      </div>
    </section>
  );
});

TerminalInterface.displayName = 'TerminalInterface';

export default TerminalInterface;
