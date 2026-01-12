// src/components/projects/ProjectDetail.jsx
import { XMarkIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon, TrashIcon, ClockIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = ({ project, onClose, onDelete }) => {
  if (!project) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/10 text-green-400';
      case 'in progress':
        return 'bg-blue-500/10 text-blue-400';
      case 'on hold':
        return 'bg-yellow-500/10 text-yellow-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto p-4"
      >
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        <div className="relative mx-auto max-w-5xl w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-[#0f0f0f] rounded-xl border-2 border-[#1a1a1a] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with image */}
            <div className="relative h-72 bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#8B0000]/20 to-[#ff4d4d]/10">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    {project.title}
                  </h2>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this project?')) {
                        onDelete();
                      }
                    }}
                    className="p-2 rounded-lg bg-black/50 hover:bg-red-600/50 backdrop-blur-sm transition-all duration-200 text-red-400 hover:text-white"
                    aria-label="Delete project"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-black/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 text-gray-300 hover:text-white"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                        {project.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {project.date && (
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon className="h-4 w-4" />
                            {new Date(project.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        )}
                        {project.duration && (
                          <span className="flex items-center gap-1.5">
                            <ClockIcon className="h-4 w-4" />
                            {project.duration}
                          </span>
                        )}
                        {project.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPinIcon className="h-4 w-4" />
                            {project.location}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {project.status && (
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </div>
                    )}
                  </div>

                  <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-sm rounded-full bg-[#1a1a1a] border border-white/5 text-gray-300 hover:bg-[#8B0000]/20 hover:border-[#8B0000]/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  {project.features?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="w-1.5 h-6 bg-[#8B0000] rounded-full mr-2"></span>
                        Key Features
                      </h3>
                      <ul className="space-y-3">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start group">
                            <span className="text-[#8B0000] mr-3 mt-1">
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-gray-300 group-hover:text-white transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Results & Impact */}
                  {project.results?.length > 0 && (
                    <div className="bg-[#0a0a0a]/50 p-6 rounded-xl border border-white/5">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="w-1.5 h-6 bg-blue-500 rounded-full mr-2"></span>
                        Results & Impact
                      </h3>
                      <ul className="space-y-3">
                        {project.results.map((result, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-400 mr-3 mt-1">•</span>
                            <span className="text-gray-300">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-80 flex-shrink-0 space-y-6">
                  {/* Links */}
                  {(project.githubUrl || project.demoUrl) && (
                    <div className="bg-[#0a0a0a]/50 p-5 rounded-xl border border-white/5">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Project Links</h3>
                      <div className="space-y-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] hover:bg-[#8B0000]/20 border border-white/5 rounded-lg transition-all duration-200 group"
                          >
                            <CodeBracketIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            <span className="text-gray-300 group-hover:text-white">View Code</span>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-auto text-gray-500 group-hover:text-white" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] hover:from-[#9a1a1a] hover:to-[#ff5e5e] text-white rounded-lg transition-all duration-200 group"
                          >
                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                            <span>Live Demo</span>
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-auto text-white/70 group-hover:text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Challenges */}
                  {project.challenges?.length > 0 && (
                    <div className="bg-[#0a0a0a]/50 p-5 rounded-xl border border-white/5">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Challenges Faced</h3>
                      <div className="space-y-3">
                        {project.challenges.map((challenge, i) => (
                          <div 
                            key={i} 
                            className="text-sm text-gray-300 p-3 bg-[#1a1a1a] rounded-lg border border-white/5 hover:border-[#8B0000]/30 transition-colors"
                          >
                            {challenge}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {project.tags?.length > 0 && (
                    <div className="bg-[#0a0a0a]/50 p-5 rounded-xl border border-white/5">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs rounded-full bg-[#1a1a1a] text-gray-300 border border-white/5 hover:bg-[#8B0000]/20 hover:border-[#8B0000]/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;