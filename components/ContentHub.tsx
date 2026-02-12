
import React, { useState } from 'react';
import { generateMarketingContent } from '../services/geminiService';

const ContentHub: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [brandName, setBrandName] = useState('');
  const [details, setDetails] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'social' | 'ads'>('description');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGen = async (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (!brandName || !details) return;
    setLoading(true);
    try {
      const res = await generateMarketingContent(tab, brandName, details);
      setContent(res || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
       <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-white flex items-center gap-2">← Back</button>
        <h2 className="text-2xl font-bold">Marketing Content Hub</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6 glass-card p-6 rounded-2xl">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Brand Name</label>
            <input 
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:ring-1 focus:ring-violet-500"
              placeholder="Brand Pulse"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Context / USP</label>
            <textarea 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:ring-1 focus:ring-violet-500 min-h-[150px]"
              placeholder="What makes you unique? Key features?"
            />
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex gap-2 glass-card p-1 rounded-xl w-fit">
            {(['description', 'social', 'ads'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => handleGen(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="glass-card flex-1 p-8 rounded-3xl min-h-[400px] relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500"></div>
              </div>
            ) : content ? (
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-slate-200 leading-relaxed font-light">{content}</div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600">
                <span className="text-4xl mb-2">⌨️</span>
                <p>Select a type to generate content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHub;
