import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, Clock, Users, Play } from 'lucide-react';
import ProgressBar from '../ProgressBar';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
  };
  duration: string;
  studentsCount: number;
  rating: number;
  price: number;
  category: string;
  level: string;
  progress?: number;
  enrolled?: boolean;
}

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onClick
}) => {
  const { t } = useTranslation();

  const cardVariants = {
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
          variants={imageVariants}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-full p-3 shadow-lg"
          >
            <Play className="w-6 h-6 text-teal-600" />
          </motion.div>
        </div>
        {course.enrolled && (
          <div className="absolute top-3 left-3 bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {t('dashboard.mycourses')}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {course.description}
            </p>
          </div>
        </div>

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

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>

        {course.enrolled && typeof course.progress === 'number' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {t('dashboard.progress')}
              </span>
            </div>
            <ProgressBar progress={course.progress} size="sm" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${course.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              course.enrolled
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
            }`}
          >
            {course.enrolled ? t('course.continue') : t('course.start')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;