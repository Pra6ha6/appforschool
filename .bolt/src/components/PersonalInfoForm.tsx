import React from 'react';
import { PersonalInfo } from '../types';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h3>
        <p className="text-gray-600">We need some basic information to create your personalized plan</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            min="13"
            max="100"
            value={data.age || ''}
            onChange={(e) => onChange({ age: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter your age"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={data.gender || ''}
            onChange={(e) => onChange({ gender: e.target.value as PersonalInfo['gender'] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            min="30"
            max="300"
            step="0.1"
            value={data.weight || ''}
            onChange={(e) => onChange({ weight: parseFloat(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter your weight"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
          <input
            type="number"
            min="120"
            max="250"
            value={data.height || ''}
            onChange={(e) => onChange({ height: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter your height"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
        <div className="space-y-3">
          {[
            { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
            { value: 'light', label: 'Light', desc: 'Light exercise 1-3 days/week' },
            { value: 'moderate', label: 'Moderate', desc: 'Moderate exercise 3-5 days/week' },
            { value: 'active', label: 'Active', desc: 'Hard exercise 6-7 days/week' },
            { value: 'very-active', label: 'Very Active', desc: 'Physical job + exercise' }
          ].map((option) => (
            <label key={option.value} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="activityLevel"
                value={option.value}
                checked={data.activityLevel === option.value}
                onChange={(e) => onChange({ activityLevel: e.target.value as PersonalInfo['activityLevel'] })}
                className="mr-3 text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;