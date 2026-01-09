import { useState } from 'react';

const RARITY_OPTIONS = [
  { value: 'common', label: 'Common', color: 'bg-gray-500' },
  { value: 'uncommon', label: 'Uncommon', color: 'bg-green-600' },
  { value: 'rare', label: 'Rare', color: 'bg-blue-600' },
  { value: 'epic', label: 'Epic', color: 'bg-purple-600' },
  { value: 'legendary', label: 'Legendary', color: 'bg-yellow-600' },
];

export default function ChallengeForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rarity, setRarity] = useState('common');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const challenge = {
      id: `challenge-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      rarity,
      timestamp: new Date().toISOString(),
      completed: false
    };
    
    onSubmit(challenge);
    setTitle('');
    setDescription('');
    setSubmitted(true);
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="border border-white/10 rounded-lg p-4 bg-black/20 backdrop-blur-sm">
      <h3 className="text-sm font-medium mb-3 text-neutral-200">Challenge Me!</h3>
      
      {submitted ? (
        <div className="text-green-400 text-sm mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Challenge submitted! Thank you for your suggestion.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Challenge title*"
              className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
              required
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the challenge (optional)"
              rows="2"
              className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {RARITY_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="rarity"
                  value={option.value}
                  checked={rarity === option.value}
                  onChange={() => setRarity(option.value)}
                  className="sr-only"
                />
                <span 
                  className={`px-2 py-1 text-xs rounded cursor-pointer transition-colors ${
                    rarity === option.value 
                      ? `${option.color} text-white` 
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
          >
            Submit Challenge
          </button>
        </form>
      )}
      
      <p className="mt-3 text-xs text-neutral-400">
        Challenge me with a new achievement! I'll work on completing it and add it to my collection.
      </p>
    </div>
  );
}
