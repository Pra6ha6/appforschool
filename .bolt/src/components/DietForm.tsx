import React from 'react';
import { DietPreferences } from '../types';

interface DietFormProps {
  data: DietPreferences;
  onChange: (data: Partial<DietPreferences>) => void;
}

const DietForm: React.FC<DietFormProps> = ({ data, onChange }) => {
  const handleAllergyToggle = (allergy: string) => {
    const currentAllergies = data.allergies || [];
    const updatedAllergies = currentAllergies.includes(allergy)
      ? currentAllergies.filter(a => a !== allergy)
      : [...currentAllergies, allergy];
    onChange({ allergies: updatedAllergies });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Diet Preferences</h3>
        <p className="text-gray-600">Tell us about your dietary preferences and restrictions</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Diet Type</label>
          <select
            value={data.type || ''}
            onChange={(e) => onChange({ type: e.target.value as DietPreferences['type'] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select diet type</option>
            <option value="omnivore">Omnivore</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="keto">Ketogenic</option>
            <option value="paleo">Paleo</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Cuisine Preference</label>
          <select
            value={data.cuisine || ''}
            onChange={(e) => onChange({ cuisine: e.target.value as DietPreferences['cuisine'] })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select cuisine</option>
            <option value="american">American</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="asian">Asian</option>
            <option value="indian">Indian</option>
            <option value="mexican">Mexican</option>
            <option value="italian">Italian</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Common Allergies/Restrictions</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Nuts', 'Dairy', 'Gluten', 'Eggs', 'Soy', 'Shellfish',
            'Fish', 'Seeds', 'Lactose'
          ].map((allergy) => (
            <label key={allergy} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={(data.allergies || []).includes(allergy)}
                onChange={() => handleAllergyToggle(allergy)}
                className="mr-3 text-emerald-600 focus:ring-emerald-500 rounded"
              />
              <span className="text-gray-900">{allergy}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meals per day: {data.mealsPerDay || 3}
        </label>
        <input
          type="range"
          min="2"
          max="6"
          value={data.mealsPerDay || 3}
          onChange={(e) => onChange({ mealsPerDay: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>2 meals</span>
          <span>6 meals</span>
        </div>
      </div>
    </div>
  );
};

export default DietForm;