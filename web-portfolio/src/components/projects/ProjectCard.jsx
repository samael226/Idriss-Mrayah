// src/components/projects/ProjectCard.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div 
      className="group bg-[#0a0a0a] rounded-lg overflow-hidden border-2 border-[#1a1a1a] hover:border-[#8B0000] transition-all duration-300 relative"
      whileHover={{ 
        y: -8, 
        boxShadow: '0 10px 25px -5px rgba(139, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
        scale: 1.02
      }}
      onClick={() => onClick(project)}
    >
      {/* Achievement Badge */}
      <div className="absolute -top-3 -right-3 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 rounded-full z-10 transform rotate-6 shadow-lg">
        {project.featured ? 'FEATURED' : 'NEW'}
      </div>
      
      {/* Pixel art corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#8B0000]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#8B0000]" />
      <div className="relative h-48 bg-[#111] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
            <span className="text-gray-500 text-sm font-mono">[PREVIEW UNAVAILABLE]</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white font-mono">{project.title}</h3>
          <span className="text-xs px-3 py-1 rounded-full bg-[#8B0000]/20 text-[#ff4d4d] border border-[#8B0000]/30">
            Lv. {project.level || Math.floor(Math.random() * 10) + 1}
          </span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 font-sans">
          {project.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>COMPLETION</span>
            <span>{Math.floor(Math.random() * 40) + 60}%</span>
          </div>
          <div className="w-full bg-[#1a1a1a] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies?.slice(0, 4).map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a] hover:bg-[#8B0000]/20 hover:border-[#8B0000]/50 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] text-gray-500 border border-[#2a2a2a]">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        
        <div className="pt-3 border-t border-[#1a1a1a]">
          <button
            className="w-full py-2 px-4 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] hover:from-[#9a1a1a] hover:to-[#ff5e5e] text-white rounded text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-[#8B0000]/20"
          >
            View Quest
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;