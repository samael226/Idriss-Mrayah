// src/components/projects/ProjectList.jsx
import { useState } from 'react';
import { PlusIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import ProjectsGrid from './ProjectsGrid';
import ProjectFilters from './ProjectFilters';
import ProjectForm from './ProjectForm';
import Button from '../ui/Button.jsx';

const ProjectList = ({ projects, onAddProject, onUpdateProject, onDeleteProject, onProjectClick }) => {
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

  // Apply filters and sorting
  const filteredProjects = projects
    .filter(project => {
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
    })
    .sort((a, b) => {
      // Sorting logic
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
          return new Date(b.updatedAt || b.date) - new Date(a.updatedAt || a.date);
        case 'most-popular':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSubmitProject = async (projectData) => {
    if (editingProject) {
      await onUpdateProject({ ...editingProject, ...projectData });
    } else {
      await onAddProject(projectData);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await onDeleteProject(projectId);
      setShowForm(false);
      setEditingProject(null);
    }
  };

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
          
          <Button
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="flex items-center gap-1.5"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-black/30 border border-white/10 rounded-lg p-4">
          <ProjectFilters 
            filters={filters} 
            onFilterChange={setFilters} 
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
              projects={currentProjects} 
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onProjectClick={onProjectClick}
              viewMode={viewMode}
            />
          ) : (
            <div className="space-y-4">
              {currentProjects.map(project => (
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
