import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Wifi, WifiOff } from 'lucide-react';
import { PersonalInfo, FitnessGoals, DietPreferences, GymPreferences, UserProfile } from '../types';
import PersonalInfoForm from './PersonalInfoForm';
import GoalsForm from './GoalsForm';
import DietForm from './DietForm';
import GymForm from './GymForm';

interface PlanGeneratorProps {
  onGenerate: (profile: UserProfile) => void;
  isGenerating: boolean;
}

const PlanGenerator: React.FC<PlanGeneratorProps> = ({ onGenerate, isGenerating }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    age: 0,
    weight: 0,
    height: 0,
    gender: 'male',
    activityLevel: 'moderate'
  });
  const [fitnessGoals, setFitnessGoals] = useState<FitnessGoals>({
    primary: 'general-fitness',
    timeline: '3-months',
    workoutFrequency: 3
  });
  const [dietPreferences, setDietPreferences] = useState<DietPreferences>({
    type: 'omnivore',
    cuisine: 'american',
    allergies: [],
    mealsPerDay: 3
  });
  const [gymPreferences, setGymPreferences] = useState<GymPreferences>({
    availability: 'basic-gym',
    equipment: [],
    workoutDuration: 45
  });

  // Check API status on component mount
  React.useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Simple connectivity check
        const response = await fetch('https://api.fitgenius.com/health', { 
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        });
        setApiStatus(response.ok ? 'online' : 'offline');
      } catch {
        setApiStatus('offline');
      }
    };
    
    checkApiStatus();
  }, []);

  const steps = [
    { title: 'Personal Info', component: PersonalInfoForm, data: personalInfo, onChange: setPersonalInfo },
    { title: 'Fitness Goals', component: GoalsForm, data: fitnessGoals, onChange: setFitnessGoals },
    { title: 'Diet Preferences', component: DietForm, data: dietPreferences, onChange: setDietPreferences },
    { title: 'Workout Setup', component: GymForm, data: gymPreferences, onChange: setGymPreferences }
  ];

  const currentStepData = steps[currentStep];
  const Component = currentStepData.component;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return personalInfo.age > 0 && personalInfo.weight > 0 && personalInfo.height > 0 && personalInfo.gender;
      case 1:
        return fitnessGoals.primary && fitnessGoals.timeline && fitnessGoals.workoutFrequency > 0;
      case 2:
        return dietPreferences.type && dietPreferences.cuisine;
      case 3:
        return gymPreferences.availability && gymPreferences.workoutDuration > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = () => {
    const profile: UserProfile = {
      ...personalInfo,
      ...fitnessGoals,
      ...dietPreferences,
      ...gymPreferences
    };
    onGenerate(profile);
  };

  return (
    <div id="generator" className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      {/* API Status Indicator */}
      <div className="mb-6 flex items-center justify-center">
        <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
          apiStatus === 'online' 
            ? 'bg-green-100 text-green-800' 
            : apiStatus === 'offline'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {apiStatus === 'online' ? (
            <>
              <Wifi className="w-4 h-4 mr-2" />
              AI-Powered Generation Active
            </>
          ) : apiStatus === 'offline' ? (
            <>
              <WifiOff className="w-4 h-4 mr-2" />
              Using Smart Fallback System
            </>
          ) : (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Checking API Status...
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                index <= currentStep ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 font-medium ${index <= currentStep ? 'text-emerald-600' : 'text-gray-500'}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? 'bg-emerald-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div className="mb-8">
        <Component
          data={currentStepData.data}
          onChange={(updates: any) => currentStepData.onChange({ ...currentStepData.data, ...updates })}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Previous
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleGenerate}
            disabled={!canProceed() || isGenerating}
            className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${
              canProceed() && !isGenerating
                ? 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate My Plan'
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              canProceed()
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanGenerator;