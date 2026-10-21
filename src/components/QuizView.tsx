import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Timer,
  RotateCcw,
  FileText,
  ChevronRight,
  ChevronLeft,
  Download,
  Printer,
  Bookmark,
  Sparkles,
  Sliders,
  Volume2,
  VolumeX,
  BookOpen,
  Layers,
  Radio,
  FileCheck,
  Info,
  Trophy,
  GraduationCap,
  Play,
  ArrowRight,
  Check,
  Zap,
  Clock,
  Send
} from 'lucide-react';
import {
  ALL_QUIZ_QUESTIONS,
  QUIZ_CATEGORIES,
  QuizQuestion,
  QuizResultSummary,
  evaluateQuizResult,
} from '../data/quizData';
import { studioAudio } from '../utils/audioEngine';
import { TabType } from './Sidebar';

interface QuizViewProps {
  isDarkMode: boolean;
  activeDj: string;
  onNavigateToKnowledge: () => void;
  onSelectTab?: (tab: TabType) => void;
  onQuizCompleted?: (scorePercent: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  isDarkMode,
  activeDj,
  onNavigateToKnowledge,
  onSelectTab,
  onQuizCompleted,
}) => {
  // Navigation & Step State: 'intro' | 'in_progress' | 'result'
  const [quizState, setQuizState] = useState<'intro' | 'in_progress' | 'result'>('intro');

  // Configuration Settings
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [questionCountMode, setQuestionCountMode] = useState<'all' | '15' | '5'>('15');
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(true);
  const [isSoundFxEnabled, setIsSoundFxEnabled] = useState<boolean>(true);
  const [showInstantExplanation, setShowInstantExplanation] = useState<boolean>(false);

  // Active Test Runtime State
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});
  const [flaggedMap, setFlaggedMap] = useState<{ [qId: string]: boolean }>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  // Result & Review State
  const [resultSummary, setResultSummary] = useState<QuizResultSummary | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [studentName, setStudentName] = useState<string>(activeDj || 'นิสิต / ผู้จัดรายการฝึกหัด');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isExportCopied, setIsExportCopied] = useState<boolean>(false);

  // Sync active DJ name if student name wasn't manually edited
  useEffect(() => {
    if (activeDj && studentName === 'นิสิต / ผู้จัดรายการฝึกหัด') {
      setStudentName(activeDj);
    }
  }, [activeDj]);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (quizState === 'in_progress' && isTimerEnabled && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizState, isTimerEnabled, secondsRemaining]);

  const handleTimeExpired = () => {
    setIsTimeUp(true);
    if (isSoundFxEnabled) {
      studioAudio.playCountdownTone(true);
    }
    handleSubmitExam();
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Prepare & Start Exam
  const handleStartExam = (catId = selectedCategoryId, countMode = questionCountMode) => {
    let pool = [...ALL_QUIZ_QUESTIONS];

    if (catId !== 'all') {
      pool = pool.filter((q) => q.category === catId);
    }

    // Shuffle pool for authentic assessment
    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    let selected: QuizQuestion[] = [];
    if (countMode === '5') {
      selected = shuffled.slice(0, Math.min(5, shuffled.length));
    } else if (countMode === '15') {
      selected = shuffled.slice(0, Math.min(15, shuffled.length));
    } else {
      selected = shuffled;
    }

    // Set timer based on question count: 1 minute per question
    const totalSeconds = selected.length * 60;

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedMap({});
    setSecondsRemaining(totalSeconds);
    setIsTimeUp(false);
    setResultSummary(null);
    setQuizState('in_progress');

    if (isSoundFxEnabled) {
      studioAudio.playJingle();
    }
  };

  // Select Option
  const handleSelectOption = (optionId: string) => {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));

    if (isSoundFxEnabled) {
      if (optionId === currentQ.correctOptionId) {
        studioAudio.playCountdownTone(false);
      }
    }
  };

  // Toggle Question Flag
  const handleToggleFlag = (qId: string) => {
    setFlaggedMap((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Submit Exam
  const handleSubmitExam = () => {
    const summary = evaluateQuizResult(userAnswers, activeQuestions);
    setResultSummary(summary);
    setQuizState('result');

    if (isSoundFxEnabled) {
      if (summary.scorePercentage >= 75) {
        studioAudio.playApplause();
      } else {
        studioAudio.playNewsStinger();
      }
    }

    if (onQuizCompleted) {
      onQuizCompleted(summary.scorePercentage);
    }
  };

  // Current Question
  const currentQ = activeQuestions[currentIndex];
  const isAnswered = currentQ ? Boolean(userAnswers[currentQ.id]) : false;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = activeQuestions.length > 0
    ? Math.round((answeredCount / activeQuestions.length) * 100)
    : 0;

  // Review List Filtered
  const filteredReviewQuestions = useMemo(() => {
    if (!resultSummary) return [];
    return activeQuestions.filter((q) => {
      const userChoice = userAnswers[q.id];
      const isCorrect = userChoice === q.correctOptionId;
      if (reviewFilter === 'correct') return isCorrect;
      if (reviewFilter === 'incorrect') return !isCorrect;
      return true;
    });
  }, [resultSummary, activeQuestions, userAnswers, reviewFilter]);

  // Export JSON
  const handleExportJSON = () => {
    if (!resultSummary) return;
    const exportData = {
      app: 'SoundCraft Studio - Knowledge Assessment System',
      studentName,
      certificateId: resultSummary.certificateId,
      completedAt: resultSummary.completedAt,
      score: {
        totalQuestions: resultSummary.totalQuestions,
        correctCount: resultSummary.correctCount,
        percentage: `${resultSummary.scorePercentage}%`,
        gradeTitle: resultSummary.gradeTitle,
        passed: resultSummary.passed,
      },
      categoryBreakdown: resultSummary.categoryScores,
      answers: activeQuestions.map((q) => ({
        id: q.id,
        category: q.categoryName,
        question: q.question,
        userAnswer: userAnswers[q.id] || 'UNANSWERED',
        correctAnswer: q.correctOptionId,
        isCorrect: userAnswers[q.id] === q.correctOptionId,
        explanation: q.explanation,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SoundCraft-QuizResult-${studentName.replace(/\s+/g, '_')}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print Certificate / Window Print
  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* ============================================================== */}
      {/* 1. INTRO & SELECTION SCREEN                                     */}
      {/* ============================================================== */}
      {quizState === 'intro' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-br from-[#121622] via-[#0f131c] to-[#0a0c12] border-zinc-800 shadow-xl' 
              : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <GraduationCap className="w-3.5 h-3.5" />
                  ระบบประเมินผลการเรียนรู้มาตรฐานวิทยุกระจายเสียง (SoundCraft Knowledge Exam)
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  แบบทดสอบวัดความรู้และทักษะการผลิตสื่อเสียง
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  ทดสอบความรู้รอบด้านตามหลักสูตรนิเทศศาสตร์: ความแตกต่างระหว่างวิทยุสดกับ Podcast, 
                  รูปแบบรายการ 9 ประเภท, สูตรสปอต 30 วินาที, หลัก 6T 3H, โครงสร้างบทมาตรฐาน 4 ส่วน และคำสั่งเทคนิคเสียงสากล (FI, FO, FU)
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 20 ข้อสอบมาตรฐานอ้างอิงวิชาการ
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" /> มีระบบออก E-Certificate พร้อมรหัสรับรอง
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-500" /> มีเฉลยวิเคราะห์เชิงลึกทุกข้อ
                  </span>
                </div>
              </div>

              {/* Quick Start Card */}
              <div className={`p-5 rounded-xl border flex flex-col justify-between items-center text-center w-full md:w-64 shrink-0 ${
                isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-orange-500/20 mb-3">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm">ข้อสอบฉบับสมบูรณ์</h4>
                <p className="text-xs text-zinc-400 mt-1 mb-4">
                  15 ข้อคละหมวด • เวลา 15 นาที • เกณฑ์ผ่าน 60%
                </p>
                <button
                  onClick={() => handleStartExam('all', '15')}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-bold rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  เริ่มทดสอบทันที
                </button>
              </div>
            </div>
          </div>

          {/* Exam Mode Settings & Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Selector (Left 2 Columns) */}
            <div className={`lg:col-span-2 p-6 rounded-2xl border ${
              isDarkMode ? 'bg-[#0f131c] border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Layers className="w-5 h-5 text-orange-500" />
                  เลือกหมวดหมู่ที่ต้องการทดสอบ
                </h3>
                <span className="text-xs text-zinc-400">เลือก 1 หมวด หรือทำข้อสอบรวม</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {QUIZ_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategoryId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-200 relative group ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-orange-500/10 border-orange-500/60 shadow-md shadow-orange-500/10'
                            : 'bg-orange-50 border-orange-400 shadow-sm'
                          : isDarkMode
                            ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                            : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-sm text-zinc-100 dark:text-zinc-100 light:text-zinc-800 group-hover:text-orange-500 transition-colors">
                          <span className={isDarkMode ? 'text-zinc-100' : 'text-zinc-800'}>{cat.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected 
                            ? 'bg-orange-500 text-zinc-950 font-bold' 
                            : isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-200 text-zinc-600'
                        }`}>
                          {cat.questionCount} ข้อ
                        </span>
                      </div>
                      <p className={`text-xs mt-2 line-clamp-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {cat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exam Options & Start Controls (Right 1 Column) */}
            <div className={`p-6 rounded-2xl border space-y-5 ${
              isDarkMode ? 'bg-[#0f131c] border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <h3 className="font-bold text-base flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-500" />
                ตั้งค่ารูปแบบการทดสอบ
              </h3>

              {/* Number of questions */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  จำนวนข้อสอบ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '5', label: 'ด่วน (5 ข้อ)' },
                    { id: '15', label: 'มาตรฐาน (15 ข้อ)' },
                    { id: 'all', label: 'ทั้งหมด (20 ข้อ)' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setQuestionCountMode(mode.id as any)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        questionCountMode === mode.id
                          ? 'bg-orange-500 text-zinc-950 border-orange-500 font-bold shadow-sm'
                          : isDarkMode
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  ชื่อผู้เข้าสอบ (สำหรับ E-Certificate)
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="กรอกชื่อ-นามสกุล หรือนามแฝงดีเจ"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-zinc-900/90 border-zinc-800 text-zinc-100 focus:border-orange-500'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-orange-500'
                  }`}
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-orange-400" />
                    เปิดระบบจับเวลา (1 นาที / ข้อ)
                  </span>
                  <input
                    type="checkbox"
                    checked={isTimerEnabled}
                    onChange={(e) => setIsTimerEnabled(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="flex items-center gap-2">
                    {isSoundFxEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
                    เสียงเอฟเฟกต์บรรยากาศห้องสอบ
                  </span>
                  <input
                    type="checkbox"
                    checked={isSoundFxEnabled}
                    onChange={(e) => setIsSoundFxEnabled(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between text-xs cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    แสดงเฉลยทันทีหลังเลือกข้อ (โหมดฝึกซ้อม)
                  </span>
                  <input
                    type="checkbox"
                    checked={showInstantExplanation}
                    onChange={(e) => setShowInstantExplanation(e.target.checked)}
                    className="w-4 h-4 accent-orange-500 rounded"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => handleStartExam()}
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  เริ่มทำแบบทดสอบตามที่เลือก
                </button>

                <button
                  onClick={onNavigateToKnowledge}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                      : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  กลับไปทบทวนในคลังความรู้ก่อน
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. IN-PROGRESS QUIZ SCREEN                                      */}
      {/* ============================================================== */}
      {quizState === 'in_progress' && currentQ && (
        <div className="space-y-6">
          {/* Top Status & Timer Bar */}
          <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#0f131c] border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 font-bold text-sm flex items-center justify-center font-mono">
                {currentIndex + 1}
              </span>
              <div>
                <div className="text-xs text-zinc-400 font-medium">
                  ข้อที่ {currentIndex + 1} จาก {activeQuestions.length} ข้อ
                </div>
                <div className="text-sm font-bold text-orange-400">
                  {currentQ.categoryName}
                </div>
              </div>
            </div>

            {/* Answered Counter & Progress Bar */}
            <div className="hidden sm:flex items-center gap-3 w-48">
              <div className="w-full bg-zinc-700/30 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-400 shrink-0">
                {answeredCount}/{activeQuestions.length}
              </span>
            </div>

            {/* Controls: Timer & Flag */}
            <div className="flex items-center gap-2">
              {isTimerEnabled && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-xs border ${
                  secondsRemaining < 60
                    ? 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse'
                    : isDarkMode
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                }`}>
                  <Timer className="w-3.5 h-3.5" />
                  <span>{formatTime(secondsRemaining)}</span>
                </div>
              )}

              <button
                onClick={() => handleToggleFlag(currentQ.id)}
                className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                  flaggedMap[currentQ.id]
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : isDarkMode
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900'
                }`}
                title="ทำเครื่องหมายติดดาวข้อนี้ไว้ทบทวนก่อนส่ง"
              >
                <Bookmark className={`w-3.5 h-3.5 ${flaggedMap[currentQ.id] ? 'fill-current' : ''}`} />
                <span className="hidden md:inline">ทบทวนภายหลัง</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('คุณต้องการยกเลิกและออกจากแบบทดสอบหรือไม่? ข้อมูลคำตอบปัจจุบันจะถูกรีเซ็ต')) {
                    setQuizState('intro');
                  }
                }}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  isDarkMode ? 'text-zinc-400 hover:text-red-400' : 'text-zinc-500 hover:text-red-600'
                }`}
                title="ยกเลิกการทดสอบ"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Box Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
            isDarkMode ? 'bg-[#0f131c] border-zinc-800 shadow-xl' : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            {/* Scenario Box (if available) */}
            {currentQ.scenario && (
              <div className={`mb-5 p-4 rounded-xl border flex items-start gap-3 ${
                isDarkMode 
                  ? 'bg-blue-950/20 border-blue-800/40 text-blue-200' 
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}>
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <span className="font-bold block mb-0.5">สถานการณ์จำลองในห้องส่ง:</span>
                  {currentQ.scenario}
                </div>
              </div>
            )}

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold leading-relaxed mb-6">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option) => {
                const isSelected = userAnswers[currentQ.id] === option.id;
                const isCorrect = option.id === currentQ.correctOptionId;
                const showFeedback = showInstantExplanation && isAnswered;

                let optionClass = isDarkMode
                  ? 'bg-zinc-900/60 border-zinc-800/90 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-100';

                if (isSelected) {
                  optionClass = isDarkMode
                    ? 'bg-orange-500/15 border-orange-500 text-white shadow-md shadow-orange-500/10'
                    : 'bg-orange-50 border-orange-500 text-zinc-900 shadow-sm';
                }

                if (showFeedback) {
                  if (isCorrect) {
                    optionClass = isDarkMode
                      ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-500 text-emerald-900';
                  } else if (isSelected && !isCorrect) {
                    optionClass = isDarkMode
                      ? 'bg-red-950/30 border-red-500 text-red-200'
                      : 'bg-red-50 border-red-500 text-red-900';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer ${optionClass}`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 font-mono transition-colors ${
                      isSelected
                        ? 'bg-orange-500 text-zinc-950 shadow-sm'
                        : isDarkMode
                          ? 'bg-zinc-800 text-zinc-300'
                          : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      {option.id}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed pt-0.5">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Explanation Box (if enabled) */}
            {showInstantExplanation && isAnswered && (
              <div className={`mt-6 p-4 rounded-xl border animate-fadeIn ${
                userAnswers[currentQ.id] === currentQ.correctOptionId
                  ? isDarkMode
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : isDarkMode
                    ? 'bg-red-950/20 border-red-800/40 text-red-300'
                    : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {userAnswers[currentQ.id] === currentQ.correctOptionId ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ตอบถูกต้อง! (คำตอบคือ {currentQ.correctOptionId})
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      ยังไม่ถูกต้อง (คำตอบที่ถูกต้องคือ {currentQ.correctOptionId})
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed mt-1">
                  {currentQ.explanation}
                </p>
                <div className="text-[11px] text-zinc-400 mt-2 font-mono">
                  อ้างอิง: {currentQ.referenceSource}
                </div>
              </div>
            )}
          </div>

          {/* Question Navigator Grid */}
          <div className={`p-4 rounded-2xl border ${
            isDarkMode ? 'bg-[#0f131c] border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
              <span className="font-semibold">กระดานคิวข้อสอบ (Question Navigator)</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> ตอบแล้ว
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> ติดดาว
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" /> ยังไม่ตอบ
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2">
              {activeQuestions.map((q, idx) => {
                const isCur = idx === currentIndex;
                const isAns = Boolean(userAnswers[q.id]);
                const isFlag = Boolean(flaggedMap[q.id]);

                let btnClass = isDarkMode
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:border-zinc-300';

                if (isAns) {
                  btnClass = isDarkMode
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                    : 'bg-orange-100 text-orange-800 border-orange-300 font-bold';
                }

                if (isFlag) {
                  btnClass = 'bg-amber-500/20 text-amber-400 border-amber-500/50';
                }

                if (isCur) {
                  btnClass = 'ring-2 ring-orange-500 bg-orange-500 text-zinc-950 font-black border-transparent shadow-md shadow-orange-500/20';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono font-semibold transition-all relative flex items-center justify-center cursor-pointer ${btnClass}`}
                  >
                    {idx + 1}
                    {isFlag && !isCur && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-zinc-800 text-zinc-600'
                  : isDarkMode
                    ? 'border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              ข้อก่อนหน้า
            </button>

            <div className="flex items-center gap-3">
              {currentIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                  className="py-2.5 px-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center gap-2 cursor-pointer"
                >
                  ข้อถัดไป
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="py-2.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  ส่งคำตอบเพื่อตรวจข้อสอบ ({answeredCount}/{activeQuestions.length})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. RESULT & REVIEW SCREEN                                       */}
      {/* ============================================================== */}
      {quizState === 'result' && resultSummary && (
        <div className="space-y-6">
          {/* Main Score & Certificate Header */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
            isDarkMode ? 'bg-[#0f131c] border-zinc-800 shadow-xl' : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Score Gauge Circle */}
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      className={isDarkMode ? 'text-zinc-800' : 'text-zinc-200'}
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * resultSummary.scorePercentage) / 100}
                      strokeLinecap="round"
                      className={
                        resultSummary.scorePercentage >= 75
                          ? 'text-emerald-500'
                          : resultSummary.scorePercentage >= 60
                            ? 'text-amber-500'
                            : 'text-red-500'
                      }
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black font-mono">
                      {resultSummary.scorePercentage}%
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">
                      {resultSummary.correctCount}/{resultSummary.totalQuestions} ข้อ
                    </span>
                  </div>
                </div>

                <div className="space-y-2 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    <Trophy className="w-3.5 h-3.5" />
                    ผลการประเมินทักษะ: {resultSummary.gradeTitle}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {resultSummary.passed ? 'ยินดีด้วย! คุณผ่านเกณฑ์การประเมิน' : 'พยายามอีกนิด! ใกล้ถึงเกณฑ์มาตรฐานแล้ว'}
                  </h2>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {resultSummary.gradeDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-center">
                <button
                  onClick={() => handleStartExam(selectedCategoryId, questionCountMode)}
                  className="py-2.5 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  ทำข้อสอบใหม่อีกครั้ง
                </button>
                <button
                  onClick={handleExportJSON}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-2 ${
                    isDarkMode
                      ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                      : 'border-zinc-300 bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Export JSON
                </button>
                <button
                  onClick={handlePrintCertificate}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-2 ${
                    isDarkMode
                      ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
                      : 'border-zinc-300 bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                  }`}
                >
                  <Printer className="w-4 h-4" />
                  พิมพ์ผลสอบ
                </button>
              </div>
            </div>
          </div>

          {/* E-Certificate Card (Official Appearance) */}
          <div className={`p-6 sm:p-10 rounded-2xl border relative overflow-hidden transition-all ${
            isDarkMode 
              ? 'bg-gradient-to-b from-[#141824] to-[#0c0e14] border-amber-500/30 shadow-2xl' 
              : 'bg-gradient-to-b from-amber-50/50 to-white border-amber-300 shadow-lg'
          }`}>
            {/* Watermark / Decorative corners */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative text-center max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-orange-500/20">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-semibold">
                  SOUNDCRAFT STUDIO • DIGITAL BROADCASTING ACADEMY
                </p>
                <h3 className="text-xl sm:text-2xl font-black font-['Chakra_Petch',sans-serif] mt-1">
                  CERTIFICATE OF ACHIEVEMENT
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  ใบรับรองผลการประเมินทักษะการจัดรายการวิทยุและเขียนบทสื่อเสียงดิจิทัล
                </p>
              </div>

              <div className="py-2">
                <p className="text-xs text-zinc-400">ขอมอบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า</p>
                {isEditingName ? (
                  <div className="inline-flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className={`px-3 py-1 text-base font-bold text-center rounded-lg border ${
                        isDarkMode ? 'bg-zinc-900 border-orange-500 text-white' : 'bg-white border-orange-500 text-zinc-900'
                      }`}
                      autoFocus
                    />
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="px-3 py-1 bg-orange-500 text-zinc-950 text-xs font-bold rounded-lg"
                    >
                      บันทึก
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setIsEditingName(true)}
                    className="group inline-flex items-center gap-2 mt-1 cursor-pointer"
                    title="คลิกเพื่อแก้ไขชื่อ"
                  >
                    <span className="text-xl sm:text-2xl font-black text-orange-500 border-b border-dashed border-orange-500/50 pb-0.5">
                      {studentName}
                    </span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300">
                      (แก้ไขชื่อ)
                    </span>
                  </div>
                )}
                <p className={`text-xs mt-2 max-w-lg mx-auto ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  ได้ผ่านการทดสอบวัดความรู้เชิงทฤษฎีและปฏิบัติการจัดรายการวิทยุตามมาตรฐานนิเทศศาสตร์
                  ด้วยคะแนน <span className="font-bold text-orange-400">{resultSummary.scorePercentage}%</span> ({resultSummary.correctCount}/{resultSummary.totalQuestions} ข้อ)
                  ระดับ: <span className="font-bold text-amber-400">{resultSummary.gradeTitle}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 font-mono gap-2">
                <span>วันที่ออกใบรับรอง: {resultSummary.completedAt}</span>
                <span className="px-2.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300">
                  ID: {resultSummary.certificateId}
                </span>
                <span>ผู้กำกับดูแล: SoundCraft Media Lab</span>
              </div>
            </div>
          </div>

          {/* Category Breakdown Cards */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? 'bg-[#0f131c] border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-500" />
              การวิเคราะห์คะแนนแยกตามหมวดหมู่ (Category Performance Breakdown)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {resultSummary.categoryScores.map((cat) => (
                <div
                  key={cat.category}
                  className={`p-3.5 rounded-xl border ${
                    isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-zinc-300 truncate">{cat.categoryName}</span>
                    <span className="font-mono font-bold text-orange-400">{cat.percentage}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        cat.percentage >= 75
                          ? 'bg-emerald-500'
                          : cat.percentage >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1.5 flex justify-between">
                    <span>ทำถูก {cat.correct} จาก {cat.total} ข้อ</span>
                    <span>{cat.percentage >= 75 ? 'ผ่านเกณฑ์ดีเยี่ยม' : cat.percentage >= 50 ? 'ผ่านเกณฑ์' : 'ควรทบทวน'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question-by-Question Review with Explanations */}
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#0f131c] border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-zinc-800">
              <div>
                <h4 className="font-bold text-base flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-500" />
                  เฉลยละเอียดและคำอธิบายเชิงวิชาการ (Detailed Review & Explanations)
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  ศึกษาทฤษฎีและเหตุผลเบื้องหลังของแต่ละข้อเพื่อพัฒนาทักษะการปฏิบัติงานในห้องส่ง
                </p>
              </div>

              {/* Review Filter */}
              <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    reviewFilter === 'all' ? 'bg-orange-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ทั้งหมด ({activeQuestions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    reviewFilter === 'incorrect' ? 'bg-red-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  เฉพาะข้อที่ผิด ({resultSummary.totalQuestions - resultSummary.correctCount})
                </button>
                <button
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    reviewFilter === 'correct' ? 'bg-emerald-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  เฉพาะข้อที่ถูก ({resultSummary.correctCount})
                </button>
              </div>
            </div>

            {/* List of reviewed questions */}
            <div className="space-y-4 pt-2">
              {filteredReviewQuestions.map((q, idx) => {
                const userChoiceId = userAnswers[q.id];
                const isCorrect = userChoiceId === q.correctOptionId;
                const correctOption = q.options.find((o) => o.id === q.correctOptionId);
                const userOption = q.options.find((o) => o.id === userChoiceId);

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isCorrect
                        ? isDarkMode
                          ? 'bg-zinc-900/40 border-zinc-800'
                          : 'bg-zinc-50 border-zinc-200'
                        : isDarkMode
                          ? 'bg-red-950/10 border-red-900/30'
                          : 'bg-red-50/50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isCorrect 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {isCorrect ? 'ถูกต้อง' : 'ยังไม่ถูกต้อง'}
                          </span>
                          <span className="text-xs text-orange-400 font-medium">
                            {q.categoryName}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm sm:text-base pt-1">
                          {q.question}
                        </h5>
                      </div>
                    </div>

                    {/* Choices summary */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className={`p-2.5 rounded-lg border ${
                        isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }`}>
                        <span className="font-bold block text-[10px] uppercase text-zinc-400">
                          คำตอบของคุณ:
                        </span>
                        {userChoiceId ? `${userChoiceId}. ${userOption?.text}` : 'ไม่ได้ตอบ'}
                      </div>

                      <div className="p-2.5 rounded-lg border bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                        <span className="font-bold block text-[10px] uppercase text-emerald-400">
                          เฉลยที่ถูกต้อง:
                        </span>
                        {q.correctOptionId}. {correctOption?.text}
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                      isDarkMode ? 'bg-zinc-950/60 text-zinc-300' : 'bg-white text-zinc-700 border border-zinc-200'
                    }`}>
                      <span className="font-bold text-amber-400 block mb-0.5">
                        คำอธิบายเชิงวิชาการ (Academic Rationale):
                      </span>
                      {q.explanation}
                      <div className="text-[10px] text-zinc-500 mt-2 font-mono">
                        ที่มา: {q.referenceSource}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
