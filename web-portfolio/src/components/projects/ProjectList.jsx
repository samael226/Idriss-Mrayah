// src/components/projects/ProjectList.jsx
import { useState, useMemo } from 'react';
import { PlusIcon, FunnelIcon, XMarkIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import ProjectsGrid from './ProjectsGrid';
import ProjectForm from './ProjectForm';
import ProjectFilters from './ProjectFilters';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const ProjectList = ({ 
  projects, 
  onAddProject, 
  onUpdateProject, 
  onDeleteProject, 
  onProjectClick 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    sort: 'newest',
    search: '',
    status: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Memoize filtered and sorted projects
  const { filteredProjects, totalPages } = useMemo(() => {
    let filtered = [...projects];
    
    // Apply filters
    filtered = filtered.filter(project => {
      // Category filter
      if (filters.category !== 'all' && !project.categories?.includes(filters.category)) {
        return false;
      }
      
      // Status filter
      if (filters.status !== 'all' && project.status !== filters.status) {
        return false;
      }
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies?.some(tech => tech.toLowerCase().includes(searchLower)) ||
          project.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
        case 'oldest':
          return new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt);
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'recently-updated':
          return new Date(b.lastUpdated || b.date || b.createdAt) - new Date(a.lastUpdated || a.date || a.createdAt);
        case 'most-popular':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
    
    const total = Math.ceil(sorted.length / projectsPerPage);
    
    // Apply pagination
    const paginated = sorted.slice(
      (currentPage - 1) * projectsPerPage,
      currentPage * projectsPerPage
    );
    
    return {
      filteredProjects: paginated,
      totalPages: total
    };
  }, [projects, filters, currentPage]);

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSaveProject = async (projectData) => {
    try {
      if (editingProject) {
        await onUpdateProject({ ...editingProject, ...projectData });
      } else {
        await onAddProject(projectData);
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const _handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await onDeleteProject(projectId);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };
  
  // Alias for compatibility
  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDeleteProject(projectId);
    }
  };

  const handleSubmitProject = handleSaveProject;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Projects</h1>
          <p className="text-sm text-neutral-400">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-black/30 border border-white/10 rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-white/10' : 'hover:bg-white/5'}`}
              title="Grid view"
            >
              <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-white/10' : 'hover:bg-white/5'}`}
              title="List view"
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-md border ${
              showFilters ? 'bg-white/10 border-white/20' : 'border-white/10 hover:bg-white/5'
            }`}
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          <button
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md font-medium transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-black/30 border border-white/10 rounded-lg p-4">
          <ProjectFilters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            projects={projects} 
          />
        </div>
      )}

      {showForm ? (
        <ProjectForm
          project={editingProject}
          onSave={handleSubmitProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          onDelete={editingProject ? () => handleDeleteProject(editingProject.id) : null}
        />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <ProjectsGrid 
              projects={filteredProjects} 
              onProjectClick={onProjectClick}
            />
          ) : (
            <div className="space-y-4">
              {filteredProjects.map(project => (
                <div 
                  key={project.id}
                  className="bg-black/30 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => handleEditProject(project)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white">{project.title}</h3>
                      <p className="text-sm text-neutral-400 mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies?.slice(0, 3).map(tech => (
                          <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-300">
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-500">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                        project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                        project.status === 'On Hold' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Previous
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
                  className="px-3 py-1.5 rounded border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectList;
