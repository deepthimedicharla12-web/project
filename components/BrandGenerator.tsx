
import React, { useState } from 'react';
import { generateBrandNames } from '../services/geminiService';

const BrandGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [industry, setIndustry] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('Modern');
  const [results, setResults] = useState<{ name: string; tagline: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generateBrandNames(industry, keywords, tone);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
          ← Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold">Brand Name Generator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-1 space-y-6 glass-card p-6 rounded-2xl h-fit">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Industry</label>
            <input 
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Fintech, E-commerce"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Keywords</label>
            <textarea 
              required
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Speed, growth, simple..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Brand Tone</label>
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-violet-500 outline-none appearance-none"
            >
              <option>Modern</option>
              <option>Luxury</option>
              <option>Playful</option>
              <option>Minimalist</option>
              <option>Corporate</option>
            </select>
          </div>
          <button 
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            {loading ? 'Generating...' : 'Pulse My Brand'}
          </button>
        </form>

        <div className="md:col-span-2 space-y-4">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((item, idx) => (
                <div key={idx} className="glass-card p-6 rounded-xl hover:border-violet-500/50 transition-colors cursor-pointer group">
                  <h4 className="text-lg font-bold text-white group-hover:text-violet-400">{item.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 italic">{item.tagline}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full min-h-[400px] glass-card rounded-2xl border-dashed flex flex-col items-center justify-center text-slate-500">
              <span className="text-5xl mb-4 opacity-20">✍️</span>
              <p>Your suggestions will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandGenerator;
