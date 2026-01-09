// src/components/projects/ProjectCard.jsx
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const statusColors = {
  'Completed': 'bg-green-500/10 text-green-400 border-green-500/20',
  'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'On Hold': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Planned': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Archived': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const ProjectCard = ({ project, onClick }) => {


    const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick(project);
  }
};
  return (
    <div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  // ... other props
>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/30 transition-all hover:bg-black/40 hover:border-white/20"
      onClick={() => onClick(project)}
    >
      <div className="aspect-video overflow-hidden bg-black/50 relative">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-500">
            <CodeBracketIcon className="h-12 w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform">
          <h3 className="font-semibold text-white">{project.title}</h3>
          <p className="text-xs text-neutral-300 line-clamp-2 mt-1">
            {project.description}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-2 py-1 rounded-full bg-white/5 text-neutral-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-neutral-400">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        {project.tags && project.tags.length > 0 && (
          <div className="mt-2 mb-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>{new Date(project.date).toLocaleDateString()}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-neutral-500">
              <span className="flex items-center gap-1">
                <span>👁️</span>
                <span>{project.views?.toLocaleString() || '0'}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>💬</span>
                <span>{project.comments?.length || '0'}</span>
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              statusColors[project.status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}>
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
</div>
  );
};

export default ProjectCard;