// src/pages/Projects.jsx
import { useState, useEffect } from 'react';
import { projectsData } from '../data/projects';
import { PlusIcon } from '@heroicons/react/24/outline';
import ProjectList from '../components/projects/ProjectList';
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

  const handleAddProject = async (newProject) => {
    // In a real app, you would save to your backend here
    const projectWithId = {
      ...newProject,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      views: 0,
      comments: []
    };
    
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

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">My Projects</h1>
            <p className="mt-2 text-sm text-neutral-400">Explore my latest Main and Side Projects</p>
          </div>
          
          <button
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Project
          </button>
        </div>
        
        {showForm ? (
          <ProjectForm
            project={editingProject}
            onSave={editingProject ? handleUpdateProject : handleAddProject}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        ) : (
          <div className="rounded-lg border border-white/15 bg-black/30 p-6 backdrop-blur-sm mb-8">
            <ProjectFilters 
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        )}

        {showForm ? (
          <div />
        ) : (
          <div className="rounded-lg border border-white/15 bg-black/30 p-6 backdrop-blur-sm">
            {(() => {
              const indexOfLastProject = currentPage * projectsPerPage;
              const indexOfFirstProject = indexOfLastProject - projectsPerPage;
              const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
              const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

            return (
              <>
                <ProjectList 
                  projects={currentProjects}
                  onAddProject={handleAddProject}
                  onUpdateProject={handleUpdateProject}
                  onDeleteProject={handleDeleteProject}
                  onProjectClick={handleProjectClick}
                />
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded border border-white/10 disabled:opacity-30"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show first page, last page, and pages around current page
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
                            className={`w-10 h-10 rounded-full ${
                              currentPage === pageNum 
                                ? 'bg-white text-black' 
                                : 'hover:bg-white/10'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded border border-white/10 disabled:opacity-30"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
              );
            })()}
          </div>
        )}

      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-white/15 bg-[#0b0b0c] p-6">
            <ProjectDetail 
              project={selectedProject}
              onClose={handleCloseDetail}
            />
          </div>
        </div>
      )}
    </div>
  );
}