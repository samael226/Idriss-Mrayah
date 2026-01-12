// src/components/projects/ProjectsGrid.jsx
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const ProjectsGrid = ({ projects, onProjectClick }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-medium text-white mb-2">No quests found</h3>
        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            type: 'spring',
            stiffness: 100
          }}
          className="h-full cursor-pointer group"
          onClick={() => onProjectClick(project)}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGrid;