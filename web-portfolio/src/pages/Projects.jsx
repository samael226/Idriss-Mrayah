// src/pages/Projects.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import ProjectDetail from '../components/projects/ProjectDetail';
import ProjectFilters from '../components/projects/ProjectFilters';

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'newest',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  useEffect(() => {
    // Set initial projects data
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...projects];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchLower)
        ) ||
        (project.tags && project.tags.some(tag => 
          tag.toLowerCase().includes(searchLower)
        ))
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(project => 
        project.categories.includes(filters.category)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        case 'recently-updated':
          // Fallback to date if lastUpdated is not available
          return new Date(b.lastUpdated || b.date) - new Date(a.lastUpdated || a.date);
        case 'most-popular':
          // Fallback to 0 if views are not available
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    setFilteredProjects(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, projects]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // Update URL without page reload
    window.history.pushState({}, '', `?project=${project.id}`);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
    window.history.pushState({}, '', '/projects');
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get('project');
      if (projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) setSelectedProject(project);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects]);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleAddProject = (projectWithId) => {
    setProjects(prev => [projectWithId, ...prev]);
    setFilteredProjects(prev => [projectWithId, ...prev]);
    setShowForm(false);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setFilteredProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setShowForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setFilteredProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const _handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => navigate('/system')}
          className="mb-6 flex items-center text-gray-300 hover:text-white transition-colors group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to System
        </button>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-[#0a0a0a] rounded-xl p-6 h-full border-2 border-[#1a1a1a] shadow-lg">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] bg-clip-text text-transparent">Quest Log</h2>
              
              {/* Search */}
                <div className="mb-6 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                    Search Quests
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border-2 border-[#1a1a1a] rounded-lg bg-[#0a0a0a] text-white placeholder-gray-500 focus:outline-none focus:border-[#8B0000] focus:ring-0 text-sm transition-all duration-300"
                      placeholder="Search quests..."
                      value={filters.search}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                  <span className="w-1 h-4 bg-[#8B0000] mr-2 rounded-full"></span>
                  Quest Types
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', name: 'All Quests', icon: '🎮' },
                    { id: 'web', name: 'Web Development', icon: '🌐' },
                    { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
                    { id: 'desktop', name: 'Desktop Apps', icon: '💻' },
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`flex items-center w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                        filters.category === category.id
                          ? 'bg-gradient-to-r from-[#8B0000]/20 to-[#8B0000]/10 text-white border-l-4 border-[#8B0000]'
                          : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white border-l-4 border-transparent'
                      }`}
                    >
                      <span className="mr-3 text-base">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                      <span className="ml-auto text-xs bg-[#1a1a1a] text-gray-300 rounded-full px-2.5 py-1">
                        {projects.filter(p => p.categories.includes(category.id)).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="relative">
                <h1 className="text-3xl md:text-4xl font-bold text-white relative z-10">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Quest Board</span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] rounded-full"></span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">Complete quests to level up your skills</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex-1 sm:flex-none items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] hover:from-[#9a1a1a] hover:to-[#ff5e5e] text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#8B0000]/20 flex justify-center"
                >
                  <PlusIcon className="h-5 w-5" />
                  New Quest
                </button>
              </div>
            </div>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                const indexOfLastProject = currentPage * projectsPerPage;
                const indexOfFirstProject = indexOfLastProject - projectsPerPage;
                const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
                const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

                return (
                  <>
                    {currentProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={handleProjectClick}
                      />
                    ))}
                    {totalPages > 1 && (
                      <div className="col-span-full flex justify-center mt-8">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border-2 border-[#1a1a1a] hover:border-[#8B0000] hover:text-white hover:bg-[#8B0000]/10 transition-all duration-300 disabled:opacity-30 flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Prev
                          </button>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  currentPage === pageNum 
                                    ? 'bg-gradient-to-br from-[#8B0000] to-[#ff4d4d] text-white shadow-lg shadow-[#8B0000]/30' 
                                    : 'bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-300 hover:text-white border-2 border-[#1a1a1a] hover:border-[#8B0000]/50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border-2 border-[#1a1a1a] hover:border-[#8B0000] hover:text-white hover:bg-[#8B0000]/10 transition-all duration-300 disabled:opacity-30 flex items-center gap-1"
                          >
                            Next
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border-2 border-[#1a1a1a] bg-[#0a0a0a] p-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-[#ff4d4d] to-[#8B0000]"></div>
            <ProjectDetail 
              project={selectedProject}
              onClose={handleCloseDetail}
              onDelete={() => {
                handleDeleteProject(selectedProject.id);
                handleCloseDetail();
              }}
              onEdit={() => {
                setEditingProject(selectedProject);
                setShowForm(true);
                handleCloseDetail();
              }}
            />
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border-2 border-[#1a1a1a] bg-[#0a0a0a] p-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-[#ff4d4d] to-[#8B0000]"></div>
            <ProjectForm
              project={editingProject}
              onSave={editingProject ? handleUpdateProject : handleAddProject}
              onCancel={() => {
                setShowForm(false);
                setEditingProject(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}