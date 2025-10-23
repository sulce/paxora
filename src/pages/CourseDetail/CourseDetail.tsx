import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award,
  ChevronRight,
  Check,
  Lock
} from 'lucide-react';
import ProgressBar from '../../components/ProgressBar';
import coursesData from '../../data/courses.json';
import lessonsData from '../../data/lessons.json';

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

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  transcript: string;
  resources: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  completed: boolean;
  order: number;
}

const CourseDetail: React.FC = () => {
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (courseId) {
      const foundCourse = coursesData.find(c => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        const courseLessons = lessonsData.filter(l => l.courseId === courseId);
        setLessons(courseLessons.sort((a, b) => a.order - b.order));
      }
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const totalLessons = lessons.length;
  const courseProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handleStartCourse = () => {
    if (lessons.length > 0) {
      navigate(`/lesson/${lessons[0].id}`);
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    navigate(`/lesson/${lesson.id}`);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {course.title}
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  {course.description}
                </p>

                <div className="flex items-center space-x-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-gray-300">({course.studentsCount.toLocaleString()} students)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-300" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-gray-300" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <p className="font-semibold text-lg">{course.instructor.name}</p>
                    <p className="text-gray-300">{t('course.instructor')}</p>
                  </div>
                </div>

                {course.enrolled && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Your Progress</span>
                      <span>{Math.round(courseProgress)}%</span>
                    </div>
                    <ProgressBar progress={courseProgress} showPercentage={false} color="teal" />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartCourse}
                    className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>{course.enrolled ? t('course.continue') : t('course.start')}</span>
                  </motion.button>
                  
                  {!course.enrolled && (
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-bold mb-2">${course.price}</div>
                      <div className="text-gray-300">One-time payment</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <motion.img
                  variants={itemVariants}
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full rounded-2xl shadow-2xl"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={handleStartCourse}
                >
                  <div className="bg-white bg-opacity-90 rounded-full p-6">
                    <Play className="w-12 h-12 text-teal-600" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* About */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Course</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {course.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                      <ul className="space-y-2">
                        {course.tags.map((tag, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="w-5 h-5 text-teal-600" />
                            <span className="text-gray-600">Master {tag} concepts</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Basic computer knowledge</li>
                        <li>• Willingness to learn</li>
                        <li>• No prior experience required</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Curriculum */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Course Curriculum
                    </h2>
                    <span className="text-gray-600">
                      {totalLessons} lessons • {course.duration}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <motion.div
                        key={lesson.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className={`border border-gray-200 rounded-xl p-4 cursor-pointer transition-colors ${
                          lesson.completed ? 'bg-teal-50 border-teal-200' : ''
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.completed 
                                ? 'bg-teal-600 text-white' 
                                : course.enrolled 
                                  ? 'bg-gray-200 text-gray-600'
                                  : 'bg-gray-100 text-gray-400'
                            }`}>
                              {lesson.completed ? (
                                <Check className="w-4 h-4" />
                              ) : course.enrolled ? (
                                <Play className="w-4 h-4" />
                              ) : (
                                <Lock className="w-4 h-4" />
                              )}
                            </div>
                            
                            <div>
                              <h3 className={`font-medium ${
                                lesson.completed 
                                  ? 'text-teal-900' 
                                  : course.enrolled 
                                    ? 'text-gray-900'
                                    : 'text-gray-500'
                              }`}>
                                {lesson.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                              {lesson.duration}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Instructor */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {t('course.instructor')}
                  </h3>
                  
                  <div className="text-center mb-6">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    />
                    <h4 className="font-semibold text-lg text-gray-900">
                      {course.instructor.name}
                    </h4>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {course.instructor.bio}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-teal-600">
                        {course.rating}
                      </div>
                      <div className="text-gray-600 text-sm">Rating</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">
                        {course.studentsCount.toLocaleString()}
                      </div>
                      <div className="text-gray-600 text-sm">Students</div>
                    </div>
                  </div>
                </motion.div>

                {/* Course Features */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Course Features
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">{course.duration} total</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">{course.lessonsCount} lessons</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">{course.studentsCount.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">Certificate of completion</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default CourseDetail;