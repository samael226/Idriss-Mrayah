# My Portfolio

This is my personal portfolio website built with React, Vite, and Three.js.

## 🚀 Deployment

This project is set up for deployment on [Render](https://render.com/).

### Prerequisites

- A GitHub account
- A Render account (you can sign up with GitHub)
- Node.js 18.18.0 or later

### Deploying to Render

1. Push your code to a GitHub repository
2. Sign in to your [Render](https://dashboard.render.com/) account
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the deployment:
   - **Name**: Choose a name for your service
   - **Region**: Select the region closest to your audience
   - **Branch**: Select your main branch (usually `main` or `master`)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**: Add any required environment variables
6. Click "Create Web Service"

Your site will be live at `https://your-service-name.onrender.com` after deployment completes.

## 🛠 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

- React 19
- Vite
- Three.js
- Framer Motion
- React Router DOM
