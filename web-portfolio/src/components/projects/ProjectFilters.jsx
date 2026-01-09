// src/components/projects/ProjectFilters.jsx
import { useState, useMemo } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const categories = [
  { id: 'all', name: 'All Projects', icon: '📁' },
  { id: 'web', name: 'Web', icon: '🌐' },
  { id: 'mobile', name: 'Mobile', icon: '📱' },
  { id: 'desktop', name: 'Desktop', icon: '💻' },
  { id: 'design', name: 'UI/UX Design', icon: '🎨' },
  { id: 'api', name: 'APIs', icon: '🔌' },
  { id: 'ai', name: 'AI/ML', icon: '🤖' },
  { id: 'game', name: 'Games', icon: '🎮' },
];

const sortOptions = [
  { id: 'newest', name: 'Newest First' },
  { id: 'oldest', name: 'Oldest First' },
  { id: 'a-z', name: 'A to Z' },
  { id: 'z-a', name: 'Z to A' },
  { id: 'recently-updated', name: 'Recently Updated' },
  { id: 'most-popular', name: 'Most Popular' },
];

const ProjectFilters = ({ filters, onFilterChange, projects = [] }) => {
  const [selectedTech, setSelectedTech] = useState([]);

  // Get all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => techSet.add(tech));
      }
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const toggleTech = (tech) => {
    const newSelectedTech = selectedTech.includes(tech)
      ? selectedTech.filter(t => t !== tech)
      : [...selectedTech, tech];
    setSelectedTech(newSelectedTech);
    onFilterChange({ ...filters, technologies: newSelectedTech });
  };
  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-white/10 bg-black/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent"
          placeholder="Search projects..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Technology Filter */}
      {allTechnologies.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-neutral-400 mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {allTechnologies.slice(0, 8).map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                  selectedTech.includes(tech)
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {tech}
              </button>
            ))}
            {allTechnologies.length > 8 && (
              <span className="text-xs text-neutral-400 self-center">
                +{allTechnologies.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              filters.category === category.id
                ? 'bg-white text-black'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-400">
          {filters.search ? (
            <span>
              Found {filters.search ? 'matching' : ''} projects
            </span>
          ) : null}
        </div>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className="appearance-none bg-black/30 border border-white/10 rounded-md pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                Sort: {option.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FunnelIcon className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;