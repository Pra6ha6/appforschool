import React from 'react';
import { FitnessGoals } from '../types';

interface GoalsFormProps {
  data: FitnessGoals;
  onChange: (data: Partial<FitnessGoals>) => void;
}

const GoalsForm: React.FC<GoalsFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Fitness Goals</h3>
        <p className="text-gray-600">Help us understand what you want to achieve</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Primary Goal</label>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { value: 'weight-loss', label: 'Weight Loss', emoji: '🔥' },
            { value: 'muscle-gain', label: 'Muscle Gain', emoji: '💪' },
            { value: 'endurance', label: 'Endurance', emoji: '🏃' },
            { value: 'strength', label: 'Strength', emoji: '🏋️' },
            { value: 'general-fitness', label: 'General Fitness', emoji: '✨' }
          ].map((option) => (
            <label key={option.value} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="primaryGoal"
                value={option.value}
                checked={data.primary === option.value}
                onChange={(e) => onChange({ primary: e.target.value as FitnessGoals['primary'] })}
                className="mr-3 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="mr-3 text-xl">{option.emoji}</span>
              <span className="font-medium text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Timeline</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: '1-month', label: '1 Month' },
            { value: '3-months', label: '3 Months' },
            { value: '6-months', label: '6 Months' },
            { value: '1-year', label: '1 Year' }
          ].map((option) => (
            <label key={option.value} className="flex items-center justify-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="timeline"
                value={option.value}
                checked={data.timeline === option.value}
                onChange={(e) => onChange({ timeline: e.target.value as FitnessGoals['timeline'] })}
                className="sr-only"
              />
              <span className={`font-medium ${data.timeline === option.value ? 'text-emerald-600' : 'text-gray-900'}`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Workout Frequency (days per week)
        </label>
        <input
          type="range"
          min="1"
          max="7"
          value={data.workoutFrequency || 3}
          onChange={(e) => onChange({ workoutFrequency: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>1 day</span>
          <span className="font-medium text-emerald-600">{data.workoutFrequency || 3} days</span>
          <span>7 days</span>
        </div>
      </div>
    </div>
  );
};

export default GoalsForm;