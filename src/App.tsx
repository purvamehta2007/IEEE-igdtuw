import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { FloatingParticles } from './components/ui/FloatingParticles';
import { Navigation } from './components/Navigation';
import { Home } from './components/home/Home';
import { EventsHub } from './components/events/EventsHub';
import { RecruitmentHub } from './components/recruitment/RecruitmentHub';
import { PastEventsGallery } from './components/gallery/PastEventsGallery';
import { MembershipSection } from './components/membership/MembershipSection';
import { FeedbackSystem } from './components/feedback/FeedbackSystem';
import { SocialLinksHub } from './components/social/SocialLinksHub';
import { Leaderboard } from './components/gamification/Leaderboard';
import { Dashboard } from './components/dashboard/Dashboard';
import { AIAssistant } from './components/ai/AIAssistant';
import { TechFeed } from './features/techFeed';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'techfeed':
        return <TechFeed />;
      case 'events':
        return <EventsHub />;
      case 'recruitment':
        return <RecruitmentHub />;
      case 'gallery':
        return <PastEventsGallery />;
      case 'membership':
        return <MembershipSection />;
      case 'feedback':
        return <FeedbackSystem />;
      case 'social':
        return <SocialLinksHub />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <FloatingParticles />
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <div className="relative z-10 ml-0 lg:ml-20 pt-8">
        {renderView()}
      </div>
      <AIAssistant />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
