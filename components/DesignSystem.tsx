
import React, { useState } from 'react';
import { generateDesignSystem } from '../services/geminiService';
import { DesignSystem } from '../types';

const DesignSystemGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [personality, setPersonality] = useState('');
  const [system, setSystem] = useState<DesignSystem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGen = async () => {
    if (!personality) return;
    setLoading(true);
    try {
      const data = await generateDesignSystem(personality);
      setSystem(data);
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
        <h2 className="text-2xl font-bold">Visual Design System</h2>
      </div>

      <div className="flex gap-4 max-w-2xl mx-auto mb-12">
        <input 
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Describe brand personality (e.g. Eco-friendly, aggressive, luxury tech)"
        />
        <button 
          onClick={handleGen}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-500 px-8 rounded-2xl font-bold disabled:opacity-50 transition-all"
        >
          {loading ? 'Designing...' : 'Pulse Design'}
        </button>
      </div>

      {system ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="glass-card p-10 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold">Color Palette</h3>
              <div className="flex flex-wrap gap-4">
                {system.palette.map((hex, i) => (
                  <div key={i} className="group relative flex flex-col gap-2 items-center">
                    <div 
                      className="w-16 h-16 rounded-full shadow-lg border border-white/10 group-hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: hex }}
                      onClick={() => navigator.clipboard.writeText(hex)}
                    />
                    <span className="text-xs font-mono text-slate-400">{hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-10 rounded-3xl space-y-4">
              <h3 className="text-xl font-bold">Typography</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-slate-500 uppercase block mb-1">Heading Font</label>
                  <p className="text-3xl font-bold tracking-tight text-white">{system.fonts.heading}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase block mb-1">Body Font</label>
                  <p className="text-lg text-slate-300 leading-relaxed">{system.fonts.body}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-10 rounded-3xl space-y-4 h-full">
              <h3 className="text-xl font-bold">Visual Style Guide</h3>
              <p className="text-slate-400 leading-relaxed text-lg font-light italic">
                "{system.description}"
              </p>
              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                  <span className="text-sm text-slate-300">Suggested UI density: Medium-Low</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-slate-300">Corner Radius: 12px - 24px</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                  <span className="text-sm text-slate-300">Shadow Style: Soft Ambient</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[400px] flex items-center justify-center text-slate-600 border border-dashed border-white/10 rounded-3xl">
          Enter a personality to generate visual guidelines.
        </div>
      )}
    </div>
  );
};

export default DesignSystemGenerator;
