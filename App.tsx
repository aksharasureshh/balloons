
import React, { useState } from 'react';
import { Section } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Gallery from './components/Gallery';
import ArchBuilder from './components/ArchBuilder';
import FAQ from './components/FAQ';
import AdminPortal from './components/AdminPortal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home onNavigate={setActiveSection} />;
      case 'gallery':
        return <Gallery />;
      case 'builder':
        return <ArchBuilder />;
      case 'faq':
        return <FAQ />;
      case 'admin':
        return <AdminPortal />;
      default:
        return <Home onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-rose-200">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={setActiveSection} />
    </div>
  );
};

export default App;
