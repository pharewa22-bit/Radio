/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LiveOnAirHeader } from './components/LiveOnAirHeader';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { LiveSimulatorView } from './components/LiveSimulatorView';
import { ScriptLabView } from './components/ScriptLabView';
import { OnAirTableView } from './components/OnAirTableView';
import { QuizView } from './components/QuizView';
import { ReferencesAndContactModal } from './components/ReferencesAndContactModal';
import { 
  DETAILED_KNOWLEDGE_MODULES, 
  INITIAL_RUNDOWN, 
  RundownItem 
} from './data/studioData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [quizBestScore, setQuizBestScore] = useState<number | null>(null);
  const [onAirState, setOnAirState] = useState<'on_air' | 'standby' | 'rehearsal' | 'off'>('on_air');
  const [currentShowTitle, setCurrentShowTitle] = useState<string>('SoundCraft Music Hits: เพลงฮิตติดกระแส');
  const [activeDj, setActiveDj] = useState<string>('ดีเจ แพรรี่');
  
  // Day / Night Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Sidebar Open / Closed Toggle State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // References & Developer Contact Modal
  const [isReferencesModalOpen, setIsReferencesModalOpen] = useState<boolean>(false);

  // Knowledge Base progress tracking
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([
    'diff-radio-podcast',
    'radio-9-types',
  ]);
  
  // Shared Script between Script Lab and Simulator
  const [currentScript, setCurrentScript] = useState<string>('');
  
  // Broadcast Rundown Table
  const [rundown, setRundown] = useState<RundownItem[]>(INITIAL_RUNDOWN);

  // Sync dark class on HTML root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Compute Learning Progress %
  const totalLessonsCount = DETAILED_KNOWLEDGE_MODULES.length;
  const completedLessonsCount = completedLessonIds.length;
  const baseProgress = Math.round((completedLessonsCount / totalLessonsCount) * 55);
  const scriptBonus = currentScript && currentScript.trim().length > 30 ? 15 : 0;
  const quizBonus = quizBestScore !== null ? Math.round((quizBestScore / 100) * 30) : 0;
  const learningProgress = Math.min(100, baseProgress + scriptBonus + quizBonus);

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
    }
  };

  const handleSendToLiveSimulator = (script: string) => {
    setCurrentScript(script);
    setCurrentTab('live_simulator');
  };

  return (
    <div className={`min-h-screen flex flex-col font-['Prompt',sans-serif] transition-colors duration-200 ${
      isDarkMode ? 'bg-[#090b10] text-zinc-100' : 'bg-zinc-100 text-zinc-800'
    }`}>
      {/* 1. Top On-Air Header with Illuminated Neon Sign, Day/Night Toggle & Studio Clock */}
      <LiveOnAirHeader
        onAirState={onAirState}
        setOnAirState={setOnAirState}
        currentShowTitle={currentShowTitle}
        setCurrentShowTitle={setCurrentShowTitle}
        activeDj={activeDj}
        setActiveDj={setActiveDj}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenReferences={() => setIsReferencesModalOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* 2. Main 2-Section Studio Layout */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        {/* Left Section: Sidebar with 4 Main Curriculum Modules + Dashboard + Quiz */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          learningProgress={learningProgress}
          completedLessonsCount={completedLessonsCount}
          totalLessonsCount={totalLessonsCount}
          onOpenReferences={() => setIsReferencesModalOpen(true)}
          isDarkMode={isDarkMode}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Center Section: Dynamic Dashboard / Studio Modules */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative transition-colors ${
          isDarkMode ? 'bg-[#0a0c12]' : 'bg-zinc-50'
        }`}>
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardView
                onSelectTab={setCurrentTab}
                learningProgress={learningProgress}
                completedLessonsCount={completedLessonsCount}
                totalLessonsCount={totalLessonsCount}
                onAirState={onAirState}
                quizBestScore={quizBestScore}
              />
            )}

            {currentTab === 'knowledge' && (
              <KnowledgeBaseView
                completedLessonIds={completedLessonIds}
                onCompleteLesson={handleCompleteLesson}
                isDarkMode={isDarkMode}
                onOpenReferences={() => setIsReferencesModalOpen(true)}
                onNavigateToQuiz={() => setCurrentTab('quiz')}
              />
            )}

            {currentTab === 'live_simulator' && (
              <LiveSimulatorView
                onAirState={onAirState}
                setOnAirState={setOnAirState}
                currentShowTitle={currentShowTitle}
              />
            )}

            {currentTab === 'script_lab' && (
              <ScriptLabView
                currentScript={currentScript}
                setCurrentScript={setCurrentScript}
                onSendToAiReview={handleSendToLiveSimulator}
                rundown={rundown}
              />
            )}

            {currentTab === 'onair_table' && (
              <OnAirTableView
                rundown={rundown}
                setRundown={setRundown}
                currentShowTitle={currentShowTitle}
                setCurrentShowTitle={setCurrentShowTitle}
                setActiveDj={setActiveDj}
                setOnAirState={setOnAirState}
              />
            )}

            {currentTab === 'quiz' && (
              <QuizView
                isDarkMode={isDarkMode}
                activeDj={activeDj}
                onNavigateToKnowledge={() => setCurrentTab('knowledge')}
                onSelectTab={setCurrentTab}
                onQuizCompleted={(scorePercent) => {
                  setQuizBestScore((prev) => (prev === null ? scorePercent : Math.max(prev, scorePercent)));
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* References & Developer Contact Modal */}
      <ReferencesAndContactModal
        isOpen={isReferencesModalOpen}
        onClose={() => setIsReferencesModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
