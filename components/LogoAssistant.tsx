
import React, { useState } from 'react';
import { generateLogo } from '../services/geminiService';

const LogoAssistant: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!desc) return;
    setLoading(true);
    try {
      const url = await generateLogo(desc);
      setImage(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Logo Design Assistant</h2>
      </div>

      <div className="glass-card p-10 rounded-3xl flex flex-col items-center gap-8">
        <div className="w-full max-w-xl space-y-4">
          <label className="text-sm font-medium text-slate-300">Describe your ideal logo</label>
          <div className="flex gap-2">
            <input 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Minimalist mountain for a hiking gear brand..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-500 px-8 rounded-xl font-bold disabled:opacity-50 transition-all"
            >
              {loading ? 'Creating...' : 'Generate'}
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center group">
          {image ? (
            <>
              <img src={image} alt="Generated Logo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button 
                   onClick={() => window.open(image)}
                   className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm"
                 >
                   Download
                 </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className={`text-6xl ${loading ? 'animate-pulse' : ''}`}>🎨</div>
              <p className="text-slate-500">{loading ? 'Synthesizing your vision...' : 'Your logo will appear here'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoAssistant;
