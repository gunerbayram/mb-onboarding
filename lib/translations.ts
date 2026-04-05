export type Lang = "tr" | "en";

export const t = {
  // NavBar
  hi: { tr: "Merhaba,", en: "Hi," },
  logout: { tr: "Çıkış Yap", en: "Log Out" },
  adminPanel: { tr: "Admin Paneli", en: "Admin Panel" },

  // Login
  loginTitle: { tr: "Giriş Yap", en: "Sign In" },
  loginSubtitle: {
    tr: "Devam etmek için kullanıcı adı ve şifreni gir.",
    en: "Enter your username and password to continue.",
  },
  usernameLabel: { tr: "Kullanıcı Adı", en: "Username" },
  passwordLabel: { tr: "Şifre", en: "Password" },
  loginButton: { tr: "Giriş Yap", en: "Sign In" },
  signingIn: { tr: "Giriş yapılıyor...", en: "Signing in..." },
  loginError: {
    tr: "Kullanıcı adı veya şifre hatalı.",
    en: "Incorrect username or password.",
  },

  // UserSetup (kept for compatibility)
  welcomeAboard: { tr: "Hoş geldin!", en: "Welcome aboard" },
  setupSubtitle: {
    tr: "Yaratıcı Stratejist oryantasyonuna başlamak için bilgilerini gir.",
    en: "Enter your details to start your Creative Strategist onboarding.",
  },
  fullName: { tr: "Ad Soyad", en: "Full Name" },
  workEmail: { tr: "İş E-postası", en: "Work Email" },
  startLearning: { tr: "Öğrenmeye başla", en: "Start learning" },
  settingUp: { tr: "Ayarlanıyor...", en: "Setting up..." },
  setupError: {
    tr: "Bir sorun oluştu. Lütfen tekrar dene.",
    en: "Something went wrong. Please try again.",
  },

  // Home
  welcomeBack: { tr: "Tekrar hoş geldin,", en: "Welcome back," },
  homeTitle: { tr: "Yaratıcı Stratejist Oryantasyonu", en: "Creative Strategist Onboarding" },
  homeSubtitle: {
    tr: "Yaratıcı Stratejist rolü için yapılandırılmış öğrenme yolun.",
    en: "Your structured learning path for the Creative Strategist role.",
  },
  overallProgress: { tr: "Genel ilerleme", en: "Overall progress" },
  lessonsCount: { tr: "ders", en: "lessons" },
  percentComplete: { tr: "% tamamlandı", en: "% complete" },
  andQuiz: { tr: "ders + quiz", en: "lessons + quiz" },
  oneLesson: { tr: "ders + quiz", en: "lesson + quiz" },
  completedBadge: { tr: "Tamamlandı", en: "Completed" },

  // Learn (chapters list)
  learningPath: { tr: "Öğrenme Yolu", en: "Learning Path" },
  learningPathSubtitle: {
    tr: "Yaratıcı Stratejist — tüm bölümler",
    en: "Creative Strategist — all chapters",
  },
  quizLabel: { tr: "Quiz", en: "Quiz" },
  allChapters: { tr: "Tüm bölümler", en: "All chapters" },

  // Chapter page
  chapterLabel: { tr: "Bölüm", en: "Chapter" },
  takeTheQuiz: { tr: "Quizi çöz", en: "Take the quiz" },
  upNext: { tr: "Sıradaki", en: "Up next" },

  // Lesson page
  lessonLabel: { tr: "Ders", en: "Lesson" },
  markAsComplete: { tr: "Tamamlandı olarak işaretle", en: "Mark as complete" },
  saving: { tr: "Kaydediliyor...", en: "Saving..." },
  lessonCompleted: { tr: "Tamamlandı", en: "Completed" },
  previous: { tr: "Önceki", en: "Previous" },
  next: { tr: "Sonraki", en: "Next" },
  takeQuiz: { tr: "Quizi çöz", en: "Take quiz" },
  backToChapter: { tr: "Bölüme dön", en: "Back to chapter" },
  chapterOverview: { tr: "Bölüm özeti", en: "Chapter overview" },
  lessonNotFound: { tr: "Ders bulunamadı.", en: "Lesson not found." },
  translateToTurkish: { tr: "Türkçeye Çevir", en: "Translate to Turkish" },
  translating: { tr: "Çevriliyor...", en: "Translating..." },
  showOriginal: { tr: "Orijinali Göster", en: "Show Original" },
  chapters: { tr: "Bölümler", en: "Chapters" },

  // Quiz
  questionsLabel: { tr: "soru", en: "questions" },
  submitAnswers: { tr: "Cevapları gönder", en: "Submit answers" },
  submitting: { tr: "Gönderiliyor...", en: "Submitting..." },
  quizPassed: { tr: "Harika iş! Geçtin.", en: "Great work! You passed." },
  quizFailed: {
    tr: "Devam et — dersi tekrar oku ve yeniden dene.",
    en: "Keep it up — review the lesson and try again.",
  },
  nextChapter: { tr: "Sonraki bölüm", en: "Next chapter" },

  // Admin panel
  adminSubtitle: {
    tr: "Çalışanları yönet ve yeni çalışanlar ekle.",
    en: "Manage employees and add new ones.",
  },
  addEmployee: { tr: "Çalışan Ekle", en: "Add Employee" },
  employeeName: { tr: "Ad Soyad", en: "Name" },
  roleLabel: { tr: "Rol", en: "Role" },
  languageLabel: { tr: "Platform Dili", en: "Platform Language" },
  addedOn: { tr: "Eklenme Tarihi", en: "Added On" },
  noEmployees: { tr: "Henüz çalışan eklenmemiş.", en: "No employees added yet." },

  // Add employee form
  addEmployeeTitle: { tr: "Yeni Çalışan Ekle", en: "Add New Employee" },
  addEmployeeButton: { tr: "Çalışanı Ekle", en: "Add Employee" },
  turkish: { tr: "Türkçe", en: "Turkish" },
  english: { tr: "İngilizce", en: "English" },
  cancel: { tr: "İptal", en: "Cancel" },
} as const;

export type TranslationKey = keyof typeof t;

export function tx(key: TranslationKey, lang: Lang): string {
  return t[key][lang];
}
