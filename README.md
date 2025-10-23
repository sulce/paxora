# LearnHub - E-Learning Platform MVP

A beautiful, intuitive, and investor-ready frontend MVP for an e-learning platform built with React, TypeScript, TailwindCSS, and Framer Motion.

## 🎯 Project Overview

LearnHub is a modern e-learning platform that demonstrates how students can browse, learn, and track progress, while instructors can upload and organize courses. The platform features elegant animations, clean layouts, and multilingual support, all running on mock data to simulate a fully functional learning experience.

## ✨ Features

### 🎓 Student Experience
- **Landing Page** - Hero section with compelling call-to-action
- **Dashboard** - Personalized learning hub with course recommendations
- **Course Detail Pages** - Comprehensive course information and curriculum
- **Lesson Player** - Video player with transcript and downloadable resources
- **Progress Tracking** - Visual progress indicators throughout the learning journey

### 👨‍🏫 Instructor Experience
- **Instructor Dashboard** - Course management and analytics overview
- **Course Upload** - Mock interface for creating and managing courses
- **Performance Metrics** - Revenue and engagement analytics

### 🌍 Multilingual Support
- **i18n Integration** - Full internationalization with react-i18next
- **Language Switcher** - Support for English, French, and Spanish
- **Localized Content** - All UI elements translated for global accessibility

### 🎨 Design & UX
- **Modern Aesthetic** - Inspired by Notion + Skillshare + Duolingo
- **Responsive Design** - Mobile-first approach with perfect tablet/desktop scaling
- **Smooth Animations** - Framer Motion for delightful user interactions
- **Clean Typography** - Inter font for optimal readability

## 🛠 Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Styling**: TailwindCSS for utility-first CSS
- **Animations**: Framer Motion for smooth transitions
- **Routing**: React Router DOM for seamless navigation
- **Internationalization**: react-i18next for multilingual support
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (compatible with Node 18.20.7+)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to see the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar/         # Navigation bar with user menu
│   ├── Footer/         # Site footer with links
│   ├── CourseCard/     # Course display component
│   ├── ProgressBar/    # Progress visualization
│   └── LanguageSwitcher/ # Language selection dropdown
├── pages/              # Main application pages
│   ├── Landing/        # Homepage with hero section
│   ├── Login/          # Authentication interface
│   ├── Dashboard/      # Student learning dashboard
│   ├── CourseDetail/   # Individual course pages
│   ├── LessonPlayer/   # Video lesson interface
│   └── InstructorDashboard/ # Teacher management panel
├── data/               # Mock JSON data
│   ├── courses.json    # Course catalog data
│   ├── lessons.json    # Lesson content data
│   └── users.json      # User profile data
├── i18n/               # Internationalization setup
│   └── index.ts        # Language configuration
└── App.tsx             # Main application component
```

## 🎭 Demo Navigation

### For Students:
1. **Landing Page** → Click "Start Learning" or "Sign Up"
2. **Login/Signup** → Use any email/password (mock authentication)
3. **Dashboard** → View enrolled courses and recommendations
4. **Course Detail** → Click any course card to see full details
5. **Lesson Player** → Click "Start Course" to begin learning

### For Instructors:
1. Navigate to `/instructor` to see instructor dashboard
2. Click "Upload New Course" to see course creation interface
3. View course management and analytics mockups

### Language Testing:
- Use the language switcher in the navbar
- Switch between English, French, and Spanish
- All UI elements will update to the selected language

## 🎨 Design System

### Colors
- **Primary**: Teal (#14b8a6) - Trust and professionalism
- **Secondary**: Blue (#3b82f6) - Knowledge and depth
- **Accent**: Gray (#6b7280) - Balance and sophistication
- **Background**: Light grays and whites for clarity

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading sizes and weights
- **Readability**: Optimized line heights and spacing

### Components
- **Rounded Corners**: 2xl (16px) for main containers, lg (8px) for buttons
- **Shadows**: Subtle drop shadows for depth
- **Spacing**: Consistent padding and margins using Tailwind scale

## 📱 Responsive Behavior

- **Mobile First**: Designed for mobile devices first
- **Tablet Optimized**: Perfect scaling for tablet screens
- **Desktop Enhanced**: Additional features for larger screens
- **Touch Friendly**: All interactive elements sized for touch input

## 🔧 Customization

### Adding New Languages
1. Edit `src/i18n/index.ts`
2. Add new language object to `resources`
3. Update language selector in `LanguageSwitcher.tsx`

### Modifying Mock Data
1. Edit JSON files in `src/data/`
2. Update TypeScript interfaces if adding new fields
3. Restart development server to see changes

### Styling Changes
1. Modify TailwindCSS classes in components
2. Update `tailwind.config.cjs` for theme changes
3. Add custom CSS in component files if needed

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Connect repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables: None required for mock data

### Deploy to Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Node version: 18+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Notion, Skillshare, Duolingo
- **Icons**: Lucide React icon library
- **Images**: Unsplash for course thumbnails and avatars
- **Fonts**: Google Fonts (Inter)

---

**Note**: This is a frontend MVP designed for demonstration purposes. It uses mock data and simulated interactions. For a production deployment, you would need to integrate with a backend API for authentication, course management, and user progress tracking.

## 🔮 Next Steps for Production

1. **Backend Integration**
   - User authentication system
   - Course management API
   - Progress tracking database
   - Video hosting solution

2. **Enhanced Features**
   - Real video player with HLS/DASH support
   - Quiz and assessment system
   - Certificate generation
   - Payment processing

3. **Performance Optimization**
   - Lazy loading for course content
   - Image optimization
   - Bundle splitting
   - CDN integration

4. **Security**
   - JWT token management
   - Content protection
   - User data encryption
   - CORS configuration
