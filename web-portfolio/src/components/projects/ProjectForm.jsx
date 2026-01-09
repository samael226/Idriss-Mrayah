// src/components/projects/ProjectForm.jsx
import { useState } from 'react';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

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
    <div className="bg-[#0b0b0c] rounded-lg border border-white/10 p-6">
      <h2 className="text-xl font-semibold mb-6">
        {project ? 'Edit Project' : 'Add New Project'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="Enter project title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="Describe your project..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="desktop">Desktop</option>
              <option value="design">UI/UX Design</option>
              <option value="api">API</option>
              <option value="ai">AI/ML</option>
              <option value="game">Game</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Planned">Planned</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Technologies
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.technologies.map(tech => (
              <span 
                key={tech} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-200 border border-purple-800/50"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeItem('technologies', tech)}
                  className="ml-1.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-purple-400 hover:bg-purple-800/50"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="Add technologies (press Enter to add)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-200 border border-blue-800/50"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeItem('tags', tag)}
                  className="ml-1.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-blue-400 hover:bg-blue-800/50"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="Add tags (press Enter to add)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Demo URL
            </label>
            <input
              type="url"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/10 rounded-md px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Featured Image URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="flex-1 bg-black/30 border border-white/10 rounded-l-md px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              placeholder="https://example.com/image.jpg"
            />
            <button
              type="button"
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-md flex items-center gap-1 text-sm"
            >
              <ArrowUpTrayIcon className="h-4 w-4" />
              Upload
            </button>
          </div>
        </div>

        {formData.imageUrl && (
          <div className="mt-2">
            <div className="relative h-40 w-full rounded-md overflow-hidden border border-white/10">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2">
                <span className="text-xs text-neutral-300">Preview</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
