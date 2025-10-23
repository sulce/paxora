import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Award,
  Play,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import CourseCard from '../../components/CourseCard';
import ProgressBar from '../../components/ProgressBar';
import coursesData from '../../data/courses.json';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  duration: string;
  studentsCount: number;
  rating: number;
  price: number;
  category: string;
  level: string;
  progress?: number;
  lessonsCount: number;
  enrolled?: boolean;
  tags: string[];
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [courses] = useState<Course[]>(coursesData);
  const [searchTerm, setSearchTerm] = useState('');

  const enrolledCourses = courses.filter(course => course.enrolled);
  const continueCourses = enrolledCourses.filter(course => course.progress && course.progress > 0 && course.progress < 100);
  const recommendedCourses = courses.filter(course => !course.enrolled);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const handleCourseClick = (course: Course) => {
    navigate(`/course/${course.id}`);
  };

  const stats = [
    {
      title: 'Courses Enrolled',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Hours Learned',
      value: '24.5',
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      title: 'Certificates',
      value: '3',
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg. Progress',
      value: `${Math.round(enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length) || 0}%`,
      icon: TrendingUp,
      color: 'bg-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('dashboard.welcome')}
                </h1>
                <p className="text-gray-600">
                  Continue your learning journey and explore new courses
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={t('common.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>{t('common.filter')}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.title}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Continue Watching */}
          {continueCourses.length > 0 && (
            <motion.section variants={itemVariants} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('dashboard.continue')}
                </h2>
                <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {continueCourses.slice(0, 3).map((course) => (
                  <motion.div
                    key={course.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-full p-3">
                          <Play className="w-6 h-6 text-teal-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700 font-medium">
                          {course.instructor.name}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {t('dashboard.progress')}
                          </span>
                          <span className="text-sm text-gray-600">
                            {course.progress}%
                          </span>
                        </div>
                        <ProgressBar progress={course.progress || 0} showPercentage={false} size="sm" />
                      </div>
                      <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                        {t('course.continue')}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* My Courses */}
          <motion.section variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('dashboard.mycourses')}
              </h2>
              <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium">
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.slice(0, 3).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => handleCourseClick(course)}
                />
              ))}
            </div>
          </motion.section>

          {/* Recommended Courses */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('dashboard.recommended')}
              </h2>
              <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium">
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.slice(0, 6).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => handleCourseClick(course)}
                />
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;