// src/data/projects.js
export const projectsData = [
  {
    id: 'project-1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
    date: '2023-10-15',
    status: 'Completed',
    location: 'Web Application',
    categories: ['web', 'fullstack'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.example.com',
    features: [
      'User authentication and authorization',
      'Product catalog with categories and filters',
      'Shopping cart functionality',
      'Secure payment processing with Stripe',
      'Order history and tracking',
      'Admin dashboard for product management'
    ],
    challenges: [
      'Implemented real-time inventory updates to prevent overselling',
      'Optimized image loading for better performance',
      'Ensured secure handling of payment information'
    ],
    results: [
      'Reduced cart abandonment by 30% with a streamlined checkout process',
      'Achieved 99.9% uptime with proper error handling and monitoring',
      'Improved page load times by 40% through code splitting and lazy loading'
    ]
  },
  {
    id: 'project-2',
    title: 'Mobile Task Manager',
    description: 'A cross-platform mobile application for managing personal tasks and projects with a clean, intuitive interface.',
    date: '2023-08-22',
    status: 'In Progress',
    location: 'Mobile App',
    categories: ['mobile', 'frontend'],
    technologies: ['React Native', 'Expo', 'Redux', 'Firebase'],
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: 'https://github.com/username/task-manager',
    features: [
      'Create, edit, and organize tasks',
      'Set due dates and priorities',
      'Categorize tasks with tags',
      'Dark/Light theme support',
      'Offline functionality'
    ],
    challenges: [
      'Implementing smooth animations for a native feel',
      'Optimizing performance for low-end devices',
      'Ensuring data consistency across multiple devices'
    ]
  },
  {
    id: 'project-3',
    title: 'Altivio',
    description: 'A user-friendly web application which serves as a travel agency platform that can facilitate booking flights, hotels and car renting making the booking process easier and accessible.',
    date: '2023-11-10',
    status: 'Completed',
    location: 'Web Application',
    categories: ['web', 'fullstack'],
    technologies: ["React Js", "Angular", "Typescript", "Html", "Css", "Bootstrap", "Js", "Node Js", "Express Js", "MongoDB"],
    imageUrl: "/assets/altivio-removebg-preview.png",
    githubUrl: "https://github.com/idriss-samael/Altivio",
    demoUrl: "#",
    features: [
      'Flight, hotel, and car rental booking system',
      'User authentication and profile management',
      'Search and filter functionality',
      'Responsive design for all devices',
      'Secure payment processing'
    ],
    challenges: [
      'Integrating multiple third-party APIs for travel services',
      'Ensuring real-time availability and pricing',
      'Optimizing performance for complex search queries'
    ]
  },
  {
    id: 'project-4',
    title: 'Pulse Academy',
    description: 'A user-friendly web application which serves as an educational platform that can facilitate communication between teachers and students providing diverse learning options and courses making the learning process easier and accessible.',
    date: '2023-09-15',
    status: 'Completed',
    location: 'Web Application',
    categories: ['web', 'education'],
    technologies: ["Html", "Css", "Bootstrap", "Js", "Python", "Django", "MySQL"],
    imageUrl: "/assets/pulseAcademy.png",
    githubUrl: "https://github.com/idriss-samael/Pulse-Academy",
    demoUrl: "#",
    features: [
      'Course management system',
      'Teacher-student communication tools',
      'Progress tracking and assessments',
      'Interactive learning materials',
      'User role management'
    ],
    challenges: [
      'Building a scalable course delivery system',
      'Implementing real-time communication features',
      'Ensuring data security and privacy'
    ]
  },
  {
    id: 'project-5',
    title: 'SkillSprint – Real-Time Hackathon Platform',
    description: 'Full-stack web app for live coding competitions with team collaboration and AI-powered feedback.',
    date: '2023-12-05',
    status: 'In Progress',
    location: 'Web Application',
    categories: ['web', 'fullstack', 'ai'],
    technologies: ["Spring Boot (Java)", "Angular 19", "TypeScript", "SCSS", "Bootstrap", "Spring Security", "WebSocket", "Java 17", "MySQL"],
    imageUrl: "/assets/skillsprint.png",
    githubUrl: "https://github.com/idriss-samael/SkillSprint",
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    features: [
      'Real-time code collaboration',
      'Live coding competitions',
      'Team formation and management',
      'AI-powered code review',
      'Performance analytics'
    ],
    challenges: [
      'Implementing real-time code synchronization',
      'Scaling for large numbers of concurrent users',
      'Integrating AI feedback systems',
      'Ensuring low-latency communication'
    ]
  },
  {
    id: 'project-6',
    title: 'HealthTrack Pro',
    description: 'A comprehensive health and fitness tracking application that helps users monitor their workouts, nutrition, and wellness metrics in one place.',
    date: '2024-01-10',
    status: 'In Progress',
    location: 'Mobile/Web App',
    categories: ['mobile', 'health', 'pwa'],
    technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'Firebase', 'D3.js', 'Expo'],
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'Activity and workout tracking',
      'Nutrition and calorie counter',
      'Health metrics visualization',
      'Custom workout plans',
      'Progress photos and measurements',
      'Social sharing and challenges'
    ],
    challenges: [
      'Implementing accurate activity tracking',
      'Creating responsive data visualizations',
      'Ensuring data privacy and security',
      'Optimizing for both mobile and web platforms'
    ]
  },
  {
    id: 'project-7',
    title: 'EcoMarket',
    description: 'An e-commerce platform dedicated to sustainable and eco-friendly products with a built-in carbon footprint calculator.',
    date: '2023-11-25',
    status: 'Completed',
    location: 'Web Application',
    categories: ['web', 'ecommerce', 'sustainability'],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'Eco-friendly product marketplace',
      'Carbon footprint calculator',
      'Sustainable brand directory',
      'User reviews and ratings',
      'Secure checkout process',
      'Order tracking and history'
    ],
    challenges: [
      'Implementing accurate carbon footprint calculations',
      'Creating a seamless mobile shopping experience',
      'Integrating with multiple payment gateways',
      'Optimizing for performance and SEO'
    ]
  },
  {
    id: 'project-8',
    title: 'CodeCollab',
    description: 'A real-time collaborative coding environment with built-in video chat and project management tools for development teams.',
    date: '2024-02-15',
    status: 'In Progress',
    location: 'Web Application',
    categories: ['web', 'development', 'collaboration'],
    technologies: ['Vue.js', 'Node.js', 'WebSocket', 'MongoDB', 'Docker', 'Agora.io'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'Real-time code collaboration',
      'Integrated video/audio chat',
      'Multiple language support',
      'Version control integration',
      'Task and project management',
      'Code execution and debugging'
    ],
    challenges: [
      'Implementing real-time code synchronization',
      'Ensuring low-latency video communication',
      'Managing concurrent user sessions',
      'Providing a smooth developer experience',
      'Ensuring code security and access control'
    ]
  },
  {
    id: 'project-9',
    title: 'AI-Powered Resume Builder',
    description: 'An intelligent resume builder that uses AI to optimize content for ATS systems and provides real-time feedback and suggestions.',
    date: '2024-02-20',
    status: 'In Progress',
    location: 'Web Application',
    categories: ['web', 'ai', 'career'],
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Tailwind CSS', 'Express'],
    imageUrl: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'AI-powered content suggestions',
      'ATS optimization scoring',
      'Multiple template designs',
      'Export to PDF/DOCX',
      'Job description analysis',
      'Cover letter generator'
    ],
    challenges: [
      'Implementing accurate ATS scoring algorithm',
      'Generating context-aware suggestions',
      'Handling various resume formats',
      'Ensuring data privacy and security'
    ]
  },
  {
    id: 'project-10',
    title: 'Smart Home Dashboard',
    description: 'A centralized control panel for managing smart home devices with energy monitoring and automation capabilities.',
    date: '2024-01-05',
    status: 'Completed',
    location: 'Web/Mobile App',
    categories: ['iot', 'mobile', 'web'],
    technologies: ['React Native', 'Node.js', 'MQTT', 'MongoDB', 'Docker', 'AWS IoT'],
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'Unified device control',
      'Energy consumption tracking',
      'Custom automation rules',
      'Voice control integration',
      'Real-time notifications',
      'Multi-user access control'
    ],
    challenges: [
      'Supporting multiple IoT protocols',
      'Ensuring real-time updates',
      'Implementing secure device pairing',
      'Optimizing for low-power devices'
    ]
  },
  {
    id: 'project-11',
    title: 'Food Delivery Aggregator',
    description: 'A comprehensive food delivery platform connecting users with local restaurants and delivery services.',
    date: '2023-12-15',
    status: 'Completed',
    location: 'Mobile App',
    categories: ['mobile', 'ecommerce', 'food'],
    technologies: ['Flutter', 'Node.js', 'MongoDB', 'Redis', 'Google Maps API', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-087703934569?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'Restaurant discovery and filtering',
      'Real-time order tracking',
      'In-app payments',
      'Order history and favorites',
      'Delivery partner tracking',
      'Customer reviews and ratings'
    ],
    challenges: [
      'Optimizing delivery routes',
      'Handling real-time order updates',
      'Managing restaurant menus and inventory',
      'Ensuring secure payment processing'
    ]
  },
  {
    id: 'project-12',
    title: 'Blockchain Voting System',
    description: 'A decentralized voting platform ensuring secure, transparent, and tamper-proof elections.',
    date: '2024-03-01',
    status: 'In Progress',
    location: 'Web Application',
    categories: ['blockchain', 'web', 'security'],
    technologies: ['Ethereum', 'Solidity', 'Web3.js', 'React', 'Node.js', 'IPFS'],
    imageUrl: 'https://images.unsplash.com/photo-1601588462470-17879b5d1f4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'Secure voter authentication',
      'Immutable vote recording',
      'Real-time results dashboard',
      'Anonymous voting',
      'Smart contract-based governance',
      'Vote auditing tools'
    ],
    challenges: [
      'Ensuring voter privacy',
      'Preventing Sybil attacks',
      'Optimizing gas costs',
      'Creating intuitive user experience',
      'Handling network congestion'
    ]
  },
  {
    id: 'project-13',
    title: 'AR Interior Design Tool',
    description: 'An augmented reality application that lets users visualize furniture and decor in their space before purchasing.',
    date: '2024-02-10',
    status: 'In Progress',
    location: 'Mobile App',
    categories: ['ar', 'mobile', 'design'],
    technologies: ['ARKit', 'RealityKit', 'Swift', 'Firebase', '3D Modeling', 'SceneKit'],
    imageUrl: 'https://images.unsplash.com/photo-1616486338815-3d1f2f1a0a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'AR furniture placement',
      '3D product catalog',
      'Room scanning',
      'Customization options',
      'Save and share designs',
      'Direct purchase integration'
    ],
    challenges: [
      'Accurate room measurement',
      'Realistic lighting and shadows',
      'Optimizing 3D model performance',
      'Cross-device compatibility',
      'Handling various room environments'
    ]
  },
  {
    id: 'project-14',
    title: 'Language Learning Game',
    description: 'An engaging mobile game that teaches new languages through interactive stories and challenges.',
    date: '2024-01-20',
    status: 'Completed',
    location: 'Mobile App',
    categories: ['mobile', 'education', 'gaming'],
    technologies: ['Unity', 'C#', 'Firebase', 'AWS Polly', 'MongoDB', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    githubUrl: '#',
    demoUrl: '#',
    features: [
      'Interactive story-based learning',
      'Speech recognition',
      'Progress tracking',
      'Multiplayer challenges',
      'Cultural insights',
      'Offline mode'
    ],
    challenges: [
      'Creating engaging content',
      'Implementing accurate speech recognition',
      'Balancing gameplay and education',
      'Supporting multiple languages',
      'Optimizing for various device capabilities'
    ]
  }
];


