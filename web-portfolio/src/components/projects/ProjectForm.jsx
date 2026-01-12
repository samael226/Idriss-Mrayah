// src/components/projects/ProjectForm.jsx
import { useState } from 'react';
import { XMarkIcon, ArrowUpTrayIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    technologies: [],
    tags: [],
    category: 'web',
    status: 'In Progress',
    demoUrl: '',
    githubUrl: '',
    ...project
  });
  const [techInput, setTechInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      const value = techInput.trim();
      if (value && !formData.technologies.includes(value)) {
        setFormData(prev => ({
          ...prev,
          technologies: [...prev.technologies, value]
        }));
        setTechInput('');
      }
    }
  };

  const handleTagKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      const value = tagInput.trim();
      if (value && !formData.tags.includes(value)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, value]
        }));
        setTagInput('');
      }
    }
  };

  const removeItem = (type, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-[#0a0a0a] rounded-xl border-2 border-[#1a1a1a] p-6 shadow-lg">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-[#ff4d4d] to-[#8B0000]"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] bg-clip-text text-transparent">
          {project ? 'Edit Quest' : 'New Quest'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Project Title *
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] transition-all duration-300"
              placeholder="Enter quest title"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Description *
          </label>
          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] transition-all duration-300 min-h-[120px]"
              placeholder="Describe your quest..."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quest Type
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8B0000] appearance-none cursor-pointer"
              >
                <option value="web">🌐 Web Development</option>
                <option value="mobile">📱 Mobile App</option>
                <option value="desktop">💻 Desktop App</option>
                <option value="game">🎮 Game Development</option>
                <option value="ai">🤖 AI/ML Project</option>
                <option value="design">🎨 UI/UX Design</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8B0000] appearance-none cursor-pointer"
              >
                <option value="In Progress">🟡 In Progress</option>
                <option value="Completed">🟢 Completed</option>
                <option value="On Hold">🟠 On Hold</option>
                <option value="Planned">🔵 Planned</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Technologies
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.technologies.map(tech => (
              <span 
                key={tech} 
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#8B0000]/20 text-red-200 border border-[#8B0000]/30"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeItem('technologies', tech)}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-red-400 hover:bg-[#8B0000]/30 transition-colors"
                >
                  <XCircleIcon className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKeyDown}
              className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] transition-all duration-300"
              placeholder="Add technologies (press Enter to add)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a]"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeItem('tags', tag)}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:bg-[#2a2a2a] transition-colors"
                >
                  <XCircleIcon className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] transition-all duration-300"
              placeholder="Add tags (press Enter to add)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Demo URL
            </label>
            <div className="relative">
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] transition-all duration-300"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub URL
            </label>
            <div className="relative">
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] transition-all duration-300"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Featured Image
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full bg-[#0f0f0f] border-2 border-[#1a1a1a] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2.5 bg-[#8B0000] hover:bg-[#9a1a1a] text-white rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <ArrowUpTrayIcon className="h-4 w-4" />
              Upload
            </button>
          </div>
        </div>

        {formData.imageUrl && (
          <div className="mt-2">
            <div className="relative h-48 w-full rounded-lg overflow-hidden border-2 border-[#1a1a1a] group">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                <span className="text-xs text-gray-300 bg-black/50 px-2 py-1 rounded">Image Preview</span>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-[#1a1a1a]">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-[#1a1a1a] border-2 border-[#1a1a1a] rounded-lg hover:border-[#8B0000]/50 hover:bg-[#8B0000]/10 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] hover:from-[#9a1a1a] hover:to-[#ff5e5e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>{project ? 'Update Quest' : 'Create Quest'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
