import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.courses': 'Courses',
      'nav.dashboard': 'Dashboard',
      'nav.login': 'Login',
      'nav.signup': 'Sign Up',
      'nav.logout': 'Logout',
      'nav.instructor': 'Instructor',

      // Landing Page
      'landing.hero.title': 'Learn Anything, Anywhere',
      'landing.hero.subtitle': 'Master new skills with expert instructors in your preferred language',
      'landing.hero.cta': 'Start Learning',
      'landing.features.title': 'Why Choose Our Platform?',
      'landing.features.anywhere': 'Learn Anywhere',
      'landing.features.anywhere.desc': 'Access courses on any device, anytime',
      'landing.features.language': 'In Your Language',
      'landing.features.language.desc': 'Content available in multiple languages',
      'landing.features.expert': 'Expert Instructors',
      'landing.features.expert.desc': 'Learn from industry professionals',

      // Auth
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.signin.title': 'Welcome Back',
      'auth.signin.subtitle': 'Sign in to continue your learning journey',
      'auth.signup.title': 'Join Our Platform',
      'auth.signup.subtitle': 'Start your learning adventure today',
      'auth.google': 'Continue with Google',
      'auth.facebook': 'Continue with Facebook',

      // Dashboard
      'dashboard.welcome': 'Welcome back!',
      'dashboard.continue': 'Continue Watching',
      'dashboard.recommended': 'Recommended for You',
      'dashboard.mycourses': 'My Courses',
      'dashboard.progress': 'Progress',

      // Course
      'course.start': 'Start Course',
      'course.continue': 'Continue',
      'course.lessons': 'Lessons',
      'course.instructor': 'Instructor',
      'course.duration': 'Duration',
      'course.students': 'Students',

      // Lesson
      'lesson.completed': 'Mark as Completed',
      'lesson.next': 'Next Lesson',
      'lesson.transcript': 'Transcript',
      'lesson.resources': 'Resources',

      // Instructor
      'instructor.dashboard': 'Instructor Dashboard',
      'instructor.upload': 'Upload New Course',
      'instructor.title': 'Course Title',
      'instructor.description': 'Description',
      'instructor.video': 'Upload Video',
      'instructor.save': 'Save Course',
      'instructor.mycourses': 'My Courses',

      // Common
      'common.search': 'Search courses...',
      'common.filter': 'Filter',
      'common.loading': 'Loading...',
      'common.error': 'Something went wrong',
    }
  },
  fr: {
    translation: {
      // Navigation
      'nav.courses': 'Cours',
      'nav.dashboard': 'Tableau de bord',
      'nav.login': 'Connexion',
      'nav.signup': 'S\'inscrire',
      'nav.logout': 'Déconnexion',
      'nav.instructor': 'Instructeur',

      // Landing Page
      'landing.hero.title': 'Apprenez Tout, Partout',
      'landing.hero.subtitle': 'Maîtrisez de nouvelles compétences avec des instructeurs experts dans votre langue préférée',
      'landing.hero.cta': 'Commencer à Apprendre',
      'landing.features.title': 'Pourquoi Choisir Notre Plateforme?',
      'landing.features.anywhere': 'Apprenez Partout',
      'landing.features.anywhere.desc': 'Accédez aux cours sur n\'importe quel appareil, à tout moment',
      'landing.features.language': 'Dans Votre Langue',
      'landing.features.language.desc': 'Contenu disponible en plusieurs langues',
      'landing.features.expert': 'Instructeurs Experts',
      'landing.features.expert.desc': 'Apprenez auprès de professionnels de l\'industrie',

      // Auth
      'auth.email': 'Email',
      'auth.password': 'Mot de passe',
      'auth.login': 'Connexion',
      'auth.signup': 'S\'inscrire',
      'auth.signin.title': 'Bon Retour',
      'auth.signin.subtitle': 'Connectez-vous pour continuer votre parcours d\'apprentissage',
      'auth.signup.title': 'Rejoignez Notre Plateforme',
      'auth.signup.subtitle': 'Commencez votre aventure d\'apprentissage aujourd\'hui',
      'auth.google': 'Continuer avec Google',
      'auth.facebook': 'Continuer avec Facebook',

      // Dashboard
      'dashboard.welcome': 'Bon retour!',
      'dashboard.continue': 'Continuer à Regarder',
      'dashboard.recommended': 'Recommandé pour Vous',
      'dashboard.mycourses': 'Mes Cours',
      'dashboard.progress': 'Progrès',

      // Course
      'course.start': 'Commencer le Cours',
      'course.continue': 'Continuer',
      'course.lessons': 'Leçons',
      'course.instructor': 'Instructeur',
      'course.duration': 'Durée',
      'course.students': 'Étudiants',

      // Lesson
      'lesson.completed': 'Marquer comme Terminé',
      'lesson.next': 'Leçon Suivante',
      'lesson.transcript': 'Transcription',
      'lesson.resources': 'Ressources',

      // Instructor
      'instructor.dashboard': 'Tableau de Bord Instructeur',
      'instructor.upload': 'Télécharger un Nouveau Cours',
      'instructor.title': 'Titre du Cours',
      'instructor.description': 'Description',
      'instructor.video': 'Télécharger une Vidéo',
      'instructor.save': 'Sauvegarder le Cours',
      'instructor.mycourses': 'Mes Cours',

      // Common
      'common.search': 'Rechercher des cours...',
      'common.filter': 'Filtrer',
      'common.loading': 'Chargement...',
      'common.error': 'Quelque chose s\'est mal passé',
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.courses': 'Cursos',
      'nav.dashboard': 'Panel',
      'nav.login': 'Iniciar Sesión',
      'nav.signup': 'Registrarse',
      'nav.logout': 'Cerrar Sesión',
      'nav.instructor': 'Instructor',

      // Landing Page
      'landing.hero.title': 'Aprende Todo, En Cualquier Lugar',
      'landing.hero.subtitle': 'Domina nuevas habilidades con instructores expertos en tu idioma preferido',
      'landing.hero.cta': 'Comenzar a Aprender',
      'landing.features.title': '¿Por Qué Elegir Nuestra Plataforma?',
      'landing.features.anywhere': 'Aprende En Cualquier Lugar',
      'landing.features.anywhere.desc': 'Accede a cursos en cualquier dispositivo, en cualquier momento',
      'landing.features.language': 'En Tu Idioma',
      'landing.features.language.desc': 'Contenido disponible en múltiples idiomas',
      'landing.features.expert': 'Instructores Expertos',
      'landing.features.expert.desc': 'Aprende de profesionales de la industria',

      // Auth
      'auth.email': 'Correo Electrónico',
      'auth.password': 'Contraseña',
      'auth.login': 'Iniciar Sesión',
      'auth.signup': 'Registrarse',
      'auth.signin.title': 'Bienvenido de Vuelta',
      'auth.signin.subtitle': 'Inicia sesión para continuar tu viaje de aprendizaje',
      'auth.signup.title': 'Únete a Nuestra Plataforma',
      'auth.signup.subtitle': 'Comienza tu aventura de aprendizaje hoy',
      'auth.google': 'Continuar con Google',
      'auth.facebook': 'Continuar con Facebook',

      // Dashboard
      'dashboard.welcome': '¡Bienvenido de vuelta!',
      'dashboard.continue': 'Continuar Viendo',
      'dashboard.recommended': 'Recomendado para Ti',
      'dashboard.mycourses': 'Mis Cursos',
      'dashboard.progress': 'Progreso',

      // Course
      'course.start': 'Comenzar Curso',
      'course.continue': 'Continuar',
      'course.lessons': 'Lecciones',
      'course.instructor': 'Instructor',
      'course.duration': 'Duración',
      'course.students': 'Estudiantes',

      // Lesson
      'lesson.completed': 'Marcar como Completado',
      'lesson.next': 'Siguiente Lección',
      'lesson.transcript': 'Transcripción',
      'lesson.resources': 'Recursos',

      // Instructor
      'instructor.dashboard': 'Panel de Instructor',
      'instructor.upload': 'Subir Nuevo Curso',
      'instructor.title': 'Título del Curso',
      'instructor.description': 'Descripción',
      'instructor.video': 'Subir Video',
      'instructor.save': 'Guardar Curso',
      'instructor.mycourses': 'Mis Cursos',

      // Common
      'common.search': 'Buscar cursos...',
      'common.filter': 'Filtrar',
      'common.loading': 'Cargando...',
      'common.error': 'Algo salió mal',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;