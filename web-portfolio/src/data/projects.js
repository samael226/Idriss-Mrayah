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
  // Add more projects as needed
];