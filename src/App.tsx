import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { AssistantPage } from './pages/AssistantPage';
import { RecommenderPage } from './pages/RecommenderPage';
import { StandardsPage } from './pages/StandardsPage';
import { StandardDetailPage } from './pages/StandardDetailPage';
import { CertificationPage } from './pages/CertificationPage';
import { LaboratoriesPage } from './pages/LaboratoriesPage';
import { HallmarkingPage } from './pages/HallmarkingPage';
import { ConsumerPage } from './pages/ConsumerPage';
import { LearningPage } from './pages/LearningPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AdminKnowledgePage } from './pages/AdminKnowledgePage';
import { AdminRetrievalPage } from './pages/AdminRetrievalPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Landing & Auth Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/auth" element={<AuthPage mode="login" />} />

              {/* Authenticated Protected Feature Routes */}
              <Route path="/assistant" element={<ProtectedRoute><AssistantPage /></ProtectedRoute>} />
              <Route path="/recommend" element={<ProtectedRoute><RecommenderPage /></ProtectedRoute>} />
              <Route path="/standards" element={<ProtectedRoute><StandardsPage /></ProtectedRoute>} />
              <Route path="/standards/:id" element={<ProtectedRoute><StandardDetailPage /></ProtectedRoute>} />
              <Route path="/certification" element={<ProtectedRoute><CertificationPage /></ProtectedRoute>} />
              <Route path="/laboratories" element={<ProtectedRoute><LaboratoriesPage /></ProtectedRoute>} />
              <Route path="/hallmarking" element={<ProtectedRoute><HallmarkingPage /></ProtectedRoute>} />
              <Route path="/consumer" element={<ProtectedRoute><ConsumerPage /></ProtectedRoute>} />
              <Route path="/learning" element={<ProtectedRoute><LearningPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
              <Route path="/admin/knowledge" element={<ProtectedRoute><AdminKnowledgePage /></ProtectedRoute>} />
              <Route path="/admin/retrieval" element={<ProtectedRoute><AdminRetrievalPage /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
