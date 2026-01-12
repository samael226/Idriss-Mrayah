// src/components/projects/ProjectFilters.jsx
import { useState, useMemo, useCallback } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search with debounce
  const handleSearchWithDebounce = useCallback(
    (value) => {
      onFilterChange({ ...filters, search: value });
    },
    [filters, onFilterChange]
  );

  // Update search with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce the search
    const timer = setTimeout(() => {
      handleSearchWithDebounce(value);
    }, 300);
    
    return () => clearTimeout(timer);
  };

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

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ ...filters, category: categoryId });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sort: e.target.value });
  };

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="sm:hidden flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-crimson-500/10 hover:bg-crimson-500/20 transition-colors text-sm text-crimson-300 border border-crimson-500/30"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-crimson-400/80" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-crimson-500/20 bg-black/50 rounded-lg text-white placeholder-crimson-300/50 focus:outline-none focus:ring-2 focus:ring-crimson-500/30 focus:border-crimson-500/30 text-sm transition-all duration-200"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              onFilterChange({ ...filters, search: '' });
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-crimson-300 transition-colors"
          >
            <XMarkIcon className="h-4 w-4 text-crimson-400/80" />
          </button>
        )}
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden"
          >
            <div className="space-y-4 py-4">
              {/* Category Tabs - Mobile */}
              <div>
                <h3 className="text-sm font-medium text-neutral-300 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        handleCategoryChange(category.id);
                        setShowMobileFilters(false);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                        filters.category === category.id
                          ? 'bg-crimson-500 text-white shadow-crimson-500/20'
                          : 'bg-crimson-500/10 text-crimson-200 hover:bg-crimson-500/20'
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span className="text-xs">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology Filter */}
              {allTechnologies.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-neutral-300">Technologies</h3>
                    {selectedTech.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedTech([]);
                          onFilterChange({ ...filters, technologies: [] });
                        }}
                        className="text-xs text-crimson-400 hover:text-crimson-300 flex items-center gap-1"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1 -m-1">
                    {allTechnologies.map(tech => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                          selectedTech.includes(tech)
                            ? 'bg-crimson-600 text-white shadow-crimson-500/30 shadow-md'
                            : 'bg-crimson-500/10 text-crimson-200 hover:bg-crimson-500/20 border border-crimson-500/20'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Filters */}
      <div className="hidden sm:block space-y-6">
        {/* Category Tabs - Desktop */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                filters.category === category.id
                  ? 'bg-gradient-to-r from-crimson-600 to-crimson-700 text-white shadow-lg shadow-crimson-500/20'
                  : 'bg-crimson-500/10 text-crimson-200 hover:bg-crimson-500/20 border border-crimson-500/20'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Technology Filter - Desktop */}
        {allTechnologies.length > 0 && (
          <div className="bg-black/40 rounded-xl p-4 border border-crimson-500/20 shadow-lg shadow-crimson-500/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-neutral-300">Filter by Technology</h3>
              {selectedTech.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedTech([]);
                    onFilterChange({ ...filters, technologies: [] });
                  }}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <XMarkIcon className="h-3.5 w-3.5" />
                  <span>Clear all</span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                    selectedTech.includes(tech)
                      ? 'bg-gradient-to-r from-crimson-600 to-crimson-700 text-white shadow-md shadow-crimson-500/20'
                      : 'bg-crimson-500/10 text-crimson-200 hover:bg-crimson-500/20 border border-crimson-500/20'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results and Sort */}
      <div className="flex items-center justify-between pt-2 border-t border-crimson-500/10">
        <div className="text-sm text-neutral-400">
          {projects.length > 0 ? (
            <span>
              {filters.search ? 'Found' : 'Showing'} {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              {filters.search && ` matching "${filters.search}"`}
            </span>
          ) : (
            <span className="text-crimson-300">No projects found. Try adjusting your filters.</span>
          )}
        </div>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={handleSortChange}
            className="appearance-none bg-black/30 border border-white/10 rounded-lg pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id} className="bg-gray-800">
                {option.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
            <FunnelIcon className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;