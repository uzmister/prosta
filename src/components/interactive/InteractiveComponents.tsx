import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Copy, 
  Sparkles, 
  Search, 
  Terminal, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Home, 
  Layers, 
  BarChart3, 
  Settings, 
  User, 
  Bell, 
  X,
  CreditCard,
  Flame,
  ArrowRight
} from 'lucide-react';

// 1. Shimmer Button
export const ShimmerButton: React.FC<{ isDark?: boolean }> = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <button
        onClick={handleClick}
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-xl p-[2px] font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20`}
      >
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#2563eb_0%,#93c5fd_50%,#2563eb_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-neutral-900/90 gap-2">
          <Sparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
          {clicked ? 'Clicked!' : 'Explore Components'}
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
      <span className="text-xs text-neutral-400 font-mono">Hover to see shimmer gradient</span>
    </div>
  );
};

// 2. Glassmorphism Pricing Card
export const GlassPricingCard: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl p-5 shadow-xl transition-all hover:border-blue-500/50">
      <div className="flex justify-between items-center mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          PRO PLAN
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-blue-500 flex items-center gap-1 font-medium"
        >
          {isYearly ? 'Yearly (-20%)' : 'Monthly'}
        </button>
      </div>

      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
          {isYearly ? '$149' : '$19'}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {isYearly ? '/year' : '/month'}
        </span>
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">
        Full access to 100+ production-ready interactive components.
      </p>

      <div className="space-y-2 mb-4 text-xs">
        {['All PRO UI Components', 'Full TSX & Tailwind Source', 'Commercial License', 'Discord VIP Access'].map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span>{f}</span>
          </div>
        ))}
      </div>

      <button className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-md shadow-blue-500/25 transition-all">
        Get Started with Visa
      </button>
    </div>
  );
};

// 3. Spotlight Search Input
export const SpotlightInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-sm rounded-xl p-[1px] overflow-hidden group transition-all"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37,99,235,0.4), transparent 80%)`,
        }}
      />
      <div className="relative flex items-center bg-white dark:bg-neutral-900 rounded-xl px-3 py-2 border border-neutral-200 dark:border-neutral-800">
        <Search className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Spotlight search components..."
          className="w-full bg-transparent text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-neutral-400 hover:text-white mr-1.5">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
          ⌘K
        </kbd>
      </div>
    </div>
  );
};

// 4. Floating Island Navbar
export const FloatingIslandNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components');
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'components', icon: Layers, label: 'Components' },
    { id: 'stats', icon: BarChart3, label: 'Metrics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex items-center justify-center p-4">
      <nav className="flex items-center gap-1 p-1.5 rounded-full bg-neutral-900/90 dark:bg-neutral-950/90 border border-neutral-800 shadow-2xl backdrop-blur-xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {isActive && <span className="text-[11px] font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// 5. Bento Feature Grid
export const BentoFeatureGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm p-2 text-left">
      <div className="col-span-2 rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3.5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
          <Terminal className="w-12 h-12 text-blue-500" />
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[10px] uppercase tracking-wider font-mono text-blue-600 dark:text-blue-400 font-bold">
            Interactive CLI
          </span>
        </div>
        <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
          Direct Terminal Addition
        </h4>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
          npx prosta@latest add button
        </p>
      </div>

      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3">
        <div className="flex items-center justify-between mb-1">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] font-mono text-green-500 font-bold">+99.9%</span>
        </div>
        <div className="text-base font-bold text-neutral-900 dark:text-white">0.2ms</div>
        <div className="text-[10px] text-neutral-400">Zero Runtime Overhead</div>
      </div>

      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3">
        <div className="flex items-center justify-between mb-1">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span className="text-[10px] font-mono text-blue-400 font-bold">100%</span>
        </div>
        <div className="text-base font-bold text-neutral-900 dark:text-white">TypeScript</div>
        <div className="text-[10px] text-neutral-400">Strict Types Ready</div>
      </div>
    </div>
  );
};

// 6. Magnetic Button
export const MagneticButton: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setOffset({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
        }}
        className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-500 active:scale-95 flex items-center gap-2"
      >
        <Flame className="w-4 h-4 text-yellow-300" />
        Magnetic Pull
      </button>
      <span className="text-[10px] text-neutral-400 mt-2 font-mono">Move cursor near the button</span>
    </div>
  );
};

// 7. Animated Gradient Card
export const AnimatedGradientCard: React.FC = () => {
  return (
    <div className="relative p-[1.5px] overflow-hidden rounded-2xl w-full max-w-xs shadow-xl">
      <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#2563eb_0%,#38bdf8_30%,#a855f7_60%,#2563eb_100%)]" />
      <div className="relative rounded-2xl bg-white dark:bg-neutral-950 p-4 border border-neutral-100 dark:border-neutral-900">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/10 text-blue-500 font-bold">
            CONIC BORDER
          </span>
          <span className="text-[10px] text-neutral-400">360° Motion</span>
        </div>
        <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
          Neon Conic Gradient
        </h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
          Smooth CSS border beam animation without any external heavy libraries.
        </p>
        <button className="w-full py-1.5 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-medium text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
          Inspect CSS
        </button>
      </div>
    </div>
  );
};

// 8. Retro Grid Hero
export const RetroGridHero: React.FC = () => {
  return (
    <div className="relative w-full h-40 overflow-hidden rounded-xl bg-neutral-950 flex flex-col items-center justify-center border border-neutral-800">
      {/* 3D perspective grid floor */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          transform: 'perspective(200px) rotateX(60deg) translateY(-20px)',
          transformOrigin: 'top center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />
      <div className="relative z-10 text-center px-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-2">
          <Sparkles className="w-3 h-3" /> Cyberpunk Grid
        </div>
        <h3 className="text-base font-extrabold text-white tracking-tight">
          Next-Gen UI Architecture
        </h3>
      </div>
    </div>
  );
};

// 9. Live Metrics Counter Card
export const LiveMetricsCard: React.FC = () => {
  const [count, setCount] = useState(48290);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 shadow-lg">
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
        <span>Component API Requests</span>
        <span className="flex items-center gap-1 text-emerald-500 font-semibold text-[11px]">
          <TrendingUp className="w-3 h-3" /> +24.8%
        </span>
      </div>
      <div className="text-2xl font-black text-neutral-900 dark:text-white font-mono tracking-tight mb-2">
        {count.toLocaleString()}
      </div>
      <div className="flex items-end gap-1 h-8 pt-1">
        {[40, 65, 45, 80, 55, 90, 75, 100, 85, 95].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 bg-blue-500/30 hover:bg-blue-500 transition-colors rounded-sm"
          />
        ))}
      </div>
    </div>
  );
};

// 10. OTP Pin Input
export const OtpPinInput: React.FC = () => {
  const [otp, setOtp] = useState(['4', '2', '4', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, index: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[index] = val.slice(-1);
    setOtp(next);
    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2.5">
        Verification Security Code
      </span>
      <div className="flex gap-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className="w-8 h-10 text-center font-mono text-sm font-bold rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
          />
        ))}
      </div>
      <span className="text-[10px] text-neutral-400 mt-2 font-mono">Auto-advances on keystroke</span>
    </div>
  );
};

// 11. Minimalist Dark/Light Toggle Switch
export const DarkToggleSwitch: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-2">
      <button
        onClick={() => setIsDark(!isDark)}
        className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
          isDark ? 'bg-neutral-800 border border-neutral-700' : 'bg-blue-100 border border-blue-200'
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 shadow-md ${
            isDark ? 'translate-x-6 bg-neutral-950 text-blue-400' : 'translate-x-0 bg-white text-amber-500'
          }`}
        >
          {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </div>
      </button>
      <span className="text-xs font-mono text-neutral-500">
        Current: {isDark ? 'Dark (Tun)' : 'Light (Kun)'}
      </span>
    </div>
  );
};

// 12. Confetti Celebration Modal Preview
export const ConfettiModalPreview: React.FC = () => {
  const handleTrigger = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#60a5fa', '#93c5fd', '#ffffff'],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-2">
      <button
        onClick={handleTrigger}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-yellow-300" />
        Fire Canvas Confetti
      </button>
      <span className="text-[10px] text-neutral-400 font-mono">Triggers celebratory physics particle burst</span>
    </div>
  );
};

// 13. Dynamic Notification Toast
export const DynamicToast: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-full max-w-xs p-2">
      {visible ? (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-white">New Pro Component</div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Added by @shadcn 2m ago</div>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-neutral-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          className="text-xs text-blue-500 font-mono hover:underline block mx-auto py-2"
        >
          Reset Toast Demo
        </button>
      )}
    </div>
  );
};

// 14. Sonar Status Badge
export const SonarBadge: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Stripe Visa Gateway Active
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        All Systems Operational
      </div>
    </div>
  );
};

// 15. Terminal Copy Command Block
export const TerminalCopyBlock: React.FC = () => {
  const [manager, setManager] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');
  const [copied, setCopied] = useState(false);

  const command = `${manager} ${manager === 'npm' ? 'i' : 'add'} @prosta/ui`;

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-3 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono">
          {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setManager(m)}
              className={`px-1.5 py-0.5 rounded transition-colors ${
                manager === m ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between p-3 font-mono text-xs">
        <span className="text-blue-400">
          <span className="text-neutral-500 mr-2">$</span>
          {command}
        </span>
        <button
          onClick={copy}
          className="text-neutral-400 hover:text-white transition-colors p-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

// 16. Radial Progress Ring
export const RadialProgressRing: React.FC = () => {
  const [percent, setPercent] = useState(84);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="text-neutral-200 dark:text-neutral-800 stroke-current"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="text-blue-600 stroke-current transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (251.2 * percent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-base font-extrabold text-neutral-900 dark:text-white font-mono">
            {percent}%
          </span>
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
            Speed Score
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {[65, 84, 98].map((val) => (
          <button
            key={val}
            onClick={() => setPercent(val)}
            className={`px-2 py-0.5 text-[10px] font-mono rounded ${
              percent === val ? 'bg-blue-600 text-white' : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            {val}%
          </button>
        ))}
      </div>
    </div>
  );
};

// Renderer registry
export const renderInteractivePreview = (previewType: string) => {
  switch (previewType) {
    case 'shimmer-button':
      return <ShimmerButton />;
    case 'glass-pricing':
      return <GlassPricingCard />;
    case 'spotlight-input':
      return <SpotlightInput />;
    case 'floating-island':
      return <FloatingIslandNav />;
    case 'bento-grid':
      return <BentoFeatureGrid />;
    case 'magnetic-button':
      return <MagneticButton />;
    case 'animated-gradient':
      return <AnimatedGradientCard />;
    case 'retro-grid':
      return <RetroGridHero />;
    case 'live-metrics':
      return <LiveMetricsCard />;
    case 'otp-input':
      return <OtpPinInput />;
    case 'dark-toggle':
      return <DarkToggleSwitch />;
    case 'confetti-modal':
      return <ConfettiModalPreview />;
    case 'dynamic-toast':
      return <DynamicToast />;
    case 'sonar-badge':
      return <SonarBadge />;
    case 'terminal-copy':
      return <TerminalCopyBlock />;
    case 'radial-progress':
      return <RadialProgressRing />;
    default:
      return <ShimmerButton />;
  }
};
