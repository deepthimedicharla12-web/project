
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AppView } from './types';
import BrandGenerator from './components/BrandGenerator';
import LogoAssistant from './components/LogoAssistant';
import ContentHub from './components/ContentHub';
import SentimentAnalyzer from './components/SentimentAnalyzer';
import DesignSystemGenerator from './components/DesignSystem';
import ChatConsultant from './components/ChatConsultant';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');

  const renderView = () => {
    switch (view) {
      case 'names': return <BrandGenerator onBack={() => setView('home')} />;
      case 'logo': return <LogoAssistant onBack={() => setView('home')} />;
      case 'content': return <ContentHub onBack={() => setView('home')} />;
      case 'sentiment': return <SentimentAnalyzer onBack={() => setView('home')} />;
      case 'design': return <DesignSystemGenerator onBack={() => setView('home')} />;
      case 'consultant': return <ChatConsultant onBack={() => setView('home')} />;
      default: return <Home onSelect={(v) => setView(v)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setView} currentView={view} />
      <main className="flex-1 container mx-auto px-6 py-12">
        {renderView()}
      </main>
      <footer className="py-8 border-t border-white/5 text-center text-sm text-slate-500">
        &copy; 2024 BrandPulse AI. Powered by Advanced Gemini Models.
      </footer>
    </div>
  );
};

const Home: React.FC<{ onSelect: (v: AppView) => void }> = ({ onSelect }) => {
  const tools = [
    { id: 'names', title: 'Name Generator', icon: '📝', desc: 'Generate unique, industry-specific brand names with AI.' },
    { id: 'logo', title: 'Logo Assistant', icon: '🎨', desc: 'Create stunning professional logos and visual prompts.' },
    { id: 'content', title: 'Content Hub', icon: '✍️', desc: 'Craft high-converting ad copy and product descriptions.' },
    { id: 'sentiment', title: 'Sentiment Analysis', icon: '📊', desc: 'Analyze reviews and rewrite for better brand perception.' },
    { id: 'design', title: 'Design System', icon: '✨', desc: 'Automated color palettes and typography guidelines.' },
    { id: 'consultant', title: 'AI Consultant', icon: '🤖', desc: 'Strategy advice powered by expert branding models.' },
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Automate your <span className="gradient-text">Brand Evolution</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-xl">
          A full-stack branding suite powered by state-of-the-art AI. From naming to strategy, we build your pulse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div 
            key={tool.id}
            onClick={() => onSelect(tool.id as AppView)}
            className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group border-white/5 hover:border-violet-500/50 hover:-translate-y-2"
          >
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-white">{tool.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
