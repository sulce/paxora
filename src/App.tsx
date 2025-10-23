import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import LessonPlayer from './pages/LessonPlayer';
import InstructorDashboard from './pages/InstructorDashboard';
import './i18n';

// Mock user data
const mockStudentUser = {
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
  role: 'student' as const
};

const mockInstructorUser = {
  name: 'Paxora Consulting',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b6e15f?w=100&h=100&fit=crop&crop=face',
  role: 'instructor' as const
};

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<typeof mockStudentUser | typeof mockInstructorUser>(mockStudentUser);
  const location = useLocation();

  // For demo purposes, we'll simulate login and user roles based on routes
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.includes('/dashboard') || currentPath.includes('/course') || currentPath.includes('/lesson') || currentPath.includes('/instructor')) {
      setIsLoggedIn(true);

      // Set user role based on route
      if (currentPath.includes('/instructor')) {
        setUser(mockInstructorUser);
      } else {
        setUser(mockStudentUser);
      }
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} user={isLoggedIn ? user : undefined} />

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="/instructor" element={<InstructorDashboard />} />

          {/* Fallback route */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
