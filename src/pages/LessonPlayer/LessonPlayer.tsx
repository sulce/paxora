import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  SkipBack, 
  SkipForward,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  ArrowLeft
} from 'lucide-react';
import ProgressBar from '../../components/ProgressBar';
import lessonsData from '../../data/lessons.json';
import coursesData from '../../data/courses.json';

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

const LessonPlayer: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showResources, setShowResources] = useState(false);

  useEffect(() => {
    if (lessonId) {
      const foundLesson = lessonsData.find(l => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
        setDuration(300); // Mock duration (5 minutes)
      }
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const course = coursesData.find(c => c.id === lesson.courseId);
  const courseLessons = lessonsData.filter(l => l.courseId === lesson.courseId).sort((a, b) => a.order - b.order);
  const currentLessonIndex = courseLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = courseLessons[currentLessonIndex + 1];
  const prevLesson = courseLessons[currentLessonIndex - 1];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMarkCompleted = () => {
    // Mock completion logic
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${lesson.courseId}`);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      navigate(`/lesson/${prevLesson.id}`);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(`/course/${lesson.courseId}`)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Course</span>
              </button>
              
              <div className="text-center">
                <h1 className="text-lg font-semibold">{lesson.title}</h1>
                <p className="text-gray-400 text-sm">{course?.title}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">
                  {currentLessonIndex + 1} of {courseLessons.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 h-[calc(100vh-80px)]">
          {/* Video Player */}
          <div className="lg:col-span-2 bg-black flex flex-col">
            <div className="flex-1 flex items-center justify-center relative">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Play Button Overlay */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handlePlayPause}
              >
                <div className="bg-black bg-opacity-50 rounded-full p-6">
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white" />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Video Controls */}
            <div className="bg-gray-800 p-4">
              <div className="mb-4">
                <ProgressBar 
                  progress={progress} 
                  showPercentage={false} 
                  color="teal" 
                  size="sm"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrevLesson}
                    disabled={!prevLesson}
                    className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handlePlayPause}
                    className="p-3 bg-teal-600 rounded-full hover:bg-teal-700"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleNextLesson}
                    disabled={!nextLesson}
                    className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  
                  <div className="text-sm text-gray-300">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {lesson.duration}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20"
                    />
                  </div>
                  
                  <button className="p-2 rounded-lg hover:bg-gray-700">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-gray-800 border-l border-gray-700 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{lesson.title}</h2>
              <p className="text-gray-300 mb-6">{lesson.description}</p>
              
              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMarkCompleted}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{t('lesson.completed')}</span>
                </motion.button>
                
                {nextLesson && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextLesson}
                    className="w-full border border-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    {t('lesson.next')}
                  </motion.button>
                )}
              </div>

              {/* Transcript Section */}
              <div className="mb-8">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center justify-between w-full py-3 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">{t('lesson.transcript')}</span>
                  </div>
                  {showTranscript ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                
                {showTranscript && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 p-4 bg-gray-700 rounded-lg"
                  >
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {lesson.transcript}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Resources Section */}
              <div>
                <button
                  onClick={() => setShowResources(!showResources)}
                  className="flex items-center justify-between w-full py-3 px-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span className="font-medium">{t('lesson.resources')}</span>
                  </div>
                  {showResources ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                
                {showResources && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 space-y-2"
                  >
                    {lesson.resources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-teal-400" />
                          <span className="text-sm">{resource.title}</span>
                        </div>
                        <Download className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LessonPlayer;