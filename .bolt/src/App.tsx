import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PlanGenerator from './components/PlanGenerator';
import PlanDisplay from './components/PlanDisplay';
import { UserProfile, GeneratedPlan } from './types';
import { generatePersonalizedPlan } from './utils/planGenerator';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'generator' | 'results'>('home');
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetStarted = () => {
    setCurrentView('generator');
    setError(null);
  };

  const handleGeneratePlan = async (profile: UserProfile) => {
    setIsGenerating(true);
    setError(null);
    try {
      const plan = await generatePersonalizedPlan(profile);
      setGeneratedPlan(plan);
      setCurrentView('results');
    } catch (error) {
      console.error('Error generating plan:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setGeneratedPlan(null);
    setError(null);
    setCurrentView('home');
  };

  const handleRetry = () => {
    setError(null);
    setCurrentView('generator');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {currentView === 'home' && (
          <Hero onGetStarted={handleGetStarted} />
        )}
        
        {currentView === 'generator' && (
          <>
            {error && (
              <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Plan Generation Failed
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={handleRetry}
                            className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <PlanGenerator 
                onGenerate={handleGeneratePlan}
                isGenerating={isGenerating}
              />
            </section>
          </>
        )}
        
        {currentView === 'results' && generatedPlan && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <PlanDisplay 
              plan={generatedPlan}
              onStartOver={handleStartOver}
            />
          </section>
        )}
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 FitGenius. Transform your fitness journey with personalized plans.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;