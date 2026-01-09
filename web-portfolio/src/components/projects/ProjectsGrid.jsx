// src/components/projects/ProjectsGrid.jsx
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const ProjectsGrid = ({ projects, onProjectClick }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        No projects found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ProjectCard
            project={project}
            onClick={onProjectClick}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGrid;