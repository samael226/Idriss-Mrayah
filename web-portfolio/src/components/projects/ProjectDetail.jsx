// src/components/projects/ProjectDetail.jsx
import { XMarkIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="fixed inset-0 bg-black/80" onClick={onClose} />
        
        <div className="relative mx-auto my-8 max-w-4xl w-full px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="relative bg-[#0b0b0c] rounded-lg border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-64 bg-black/50 overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
                  <CodeBracketIcon className="h-16 w-16 text-white/20" />
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <span className="px-2 py-1 text-xs rounded-full bg-white/10">
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-neutral-400 mb-6">
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>

                  <p className="text-neutral-300 mb-6">{project.description}</p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full bg-white/5 text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            <span className="text-neutral-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="md:w-64 flex-shrink-0 space-y-4">
                  {(project.githubUrl || project.demoUrl) && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-neutral-400">Links</h3>
                      <div className="space-y-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors"
                          >
                            <CodeBracketIcon className="h-4 w-4" />
                            <span>View Code</span>
                            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 ml-auto opacity-50" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors"
                          >
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            <span>Live Demo</span>
                            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 ml-auto opacity-50" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {project.challenges && project.challenges.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-neutral-400 mb-2">Challenges</h3>
                      <div className="space-y-2">
                        {project.challenges.map((challenge, i) => (
                          <div key={i} className="text-sm text-neutral-300 p-3 bg-white/5 rounded-md">
                            {challenge}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {project.results && project.results.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold mb-3">Results & Impact</h3>
                  <ul className="space-y-2">
                    {project.results.map((result, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span className="text-neutral-300">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetail;