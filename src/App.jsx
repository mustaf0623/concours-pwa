import { Routes, Route, Navigate } from 'react-router-dom';
import { useProfile } from './hooks/useProfile';
import Layout from './components/Layout.jsx';
import Landing from './pages/Landing.jsx';
import Onboarding from './pages/Onboarding.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Learn from './pages/Learn.jsx';
import Practice from './pages/Practice.jsx';
import Errors from './pages/Errors.jsx';
import Review from './pages/Review.jsx';
import Defi from './pages/Defi.jsx';
import Concours from './pages/Concours.jsx';
import Oral from './pages/Oral.jsx';
import ProjectPage from './pages/Project.jsx';
import Progression from './pages/Progression.jsx';

export default function App() {
  const { profile, loading, saveProfile } = useProfile();

  if (loading) {
    return <div style={{ padding: 40, fontFamily: 'sans-serif' }}>Chargement…</div>;
  }

  if (!profile) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding onComplete={saveProfile} />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    );
  }

  return (
    <Layout profile={profile}>
      <Routes>
        <Route path="/" element={<Dashboard profile={profile} />} />
        <Route path="/apprendre" element={<Learn />} />
        <Route path="/apprendre/:notionId" element={<Learn />} />
        <Route path="/entrainement" element={<Practice />} />
        <Route path="/erreurs" element={<Errors />} />
        <Route path="/a-revoir" element={<Review />} />
        <Route path="/defi" element={<Defi />} />
        <Route path="/concours" element={<Concours />} />
        <Route path="/oral" element={<Oral />} />
        <Route path="/projet" element={<ProjectPage profile={profile} />} />
        <Route path="/progression" element={<Progression />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
