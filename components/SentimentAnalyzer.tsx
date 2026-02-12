
import React, { useState } from 'react';
import { analyzeSentiment } from '../services/geminiService';
import { SentimentResult } from '../types';

const SentimentAnalyzer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [reviews, setReviews] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!reviews) return;
    setLoading(true);
    try {
      const data = await analyzeSentiment(reviews);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-white flex items-center gap-2">← Back</button>
        <h2 className="text-2xl font-bold">Brand Sentiment Analyzer</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase">Input Customer Reviews</h3>
            <textarea 
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="Paste customer reviews here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none min-h-[250px] focus:ring-1 focus:ring-violet-500"
            />
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 disabled:opacity-50 transition-all"
            >
              {loading ? 'Analyzing...' : 'Analyze Tone'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm text-slate-500 uppercase font-bold">Overall Score</h4>
                  <p className="text-3xl font-black text-white">{(result.score * 100).toFixed(0)}% <span className="text-sm font-normal text-slate-400">Positive</span></p>
                </div>
                <div className="text-right">
                  <h4 className="text-sm text-slate-500 uppercase font-bold">Detected Tone</h4>
                  <p className="text-lg text-violet-400 font-bold">{result.tone}</p>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase">Key Suggestions</h4>
                <ul className="space-y-2">
                  {result.suggestions.map((s, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-300 items-start">
                      <span className="text-green-500">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-6 rounded-2xl space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase">AI Rewrites</h4>
                <div className="space-y-3">
                  {result.rewrites.map((r, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-lg text-sm italic border-l-4 border-violet-500 text-slate-400">
                      "{r}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full glass-card rounded-2xl border-dashed flex items-center justify-center text-slate-600 p-8 text-center">
              <p>Analysis insights will appear here once processed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
