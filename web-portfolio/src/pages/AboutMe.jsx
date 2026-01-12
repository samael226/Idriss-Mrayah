import { motion } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon, DevicePhoneMobileIcon, CursorArrowRippleIcon } from '@heroicons/react/24/outline';
import { Suspense, lazy } from 'react';

// Lazy load the 3D model component
const CyberSamuraiModel = lazy(() => import('../components/three/CyberSamuraiModel'));

// Loading component
const ModelLoader = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-[#0a0a0a] rounded-xl border-2 border-[#1a1a1a]">
    <div className="animate-pulse text-gray-500">Loading 3D Model...</div>
  </div>
);

const AboutMe = () => {
  const skills = [
    { name: 'Frontend Development', icon: <CodeBracketIcon className="h-6 w-6" />, description: 'React, Next.js, Tailwind CSS, TypeScript' },
    { name: 'Backend Development', icon: <CommandLineIcon className="h-6 w-6" />, description: 'Node.js, Express, Python, Django' },
    { name: 'Mobile Development', icon: <DevicePhoneMobileIcon className="h-6 w-6" />, description: 'React Native, Flutter' },
    { name: 'UI/UX Design', icon: <CursorArrowRippleIcon className="h-6 w-6" />, description: 'Figma, Adobe XD, User Research' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            About Me
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            I'm a passionate developer who loves turning ideas into reality through clean, efficient code and beautiful user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-[#1a1a1a] shadow-2xl h-full">
              <Suspense fallback={<ModelLoader />}>
                <CyberSamuraiModel modelPath="/3D models/cyber_samurai_3d_model.glb" />
              </Suspense>
            </div>
            <div className="absolute -inset-4 border-2 border-[#8B0000]/30 rounded-2xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Who Am I?</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Hello! I'm a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences.
              </p>
              <p>
                With a strong foundation in both front-end and back-end development, I bring ideas to life through clean, efficient code and intuitive design.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#1a1a1a]">
                <h3 className="text-[#8B0000] text-sm font-semibold mb-1">Name</h3>
                <p className="text-white">Your Name</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#1a1a1a]">
                <h3 className="text-[#8B0000] text-sm font-semibold mb-1">Email</h3>
                <p className="text-white">your.email@example.com</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#1a1a1a]">
                <h3 className="text-[#8B0000] text-sm font-semibold mb-1">Location</h3>
                <p className="text-white">City, Country</p>
              </div>
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#1a1a1a]">
                <h3 className="text-[#8B0000] text-sm font-semibold mb-1">Availability</h3>
                <p className="text-white">Open to work</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-white">My Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="p-6 bg-[#0f0f0f] rounded-xl border border-[#1a1a1a] hover:border-[#8B0000]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#8B0000]/10 text-[#ff4d4d] rounded-lg mb-4 group-hover:bg-[#8B0000]/20 transition-colors duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
                <p className="text-gray-400 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-[#0f0f0f] rounded-2xl p-8 border border-[#1a1a1a] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B0000]/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff4d4d]/5 rounded-full -ml-32 -mb-32"></div>
          
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6 text-white">Let's Work Together</h2>
            <p className="text-gray-300 mb-8 max-w-2xl">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out if you'd like to work together or just say hi!
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#8B0000] to-[#ff4d4d] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#8B0000]/30 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
