import React from 'react';
import { GymPreferences } from '../types';

interface GymFormProps {
  data: GymPreferences;
  onChange: (data: Partial<GymPreferences>) => void;
}

const GymForm: React.FC<GymFormProps> = ({ data, onChange }) => {
  const handleEquipmentToggle = (equipment: string) => {
    const currentEquipment = data.equipment || [];
    const updatedEquipment = currentEquipment.includes(equipment)
      ? currentEquipment.filter(e => e !== equipment)
      : [...currentEquipment, equipment];
    onChange({ equipment: updatedEquipment });
  };

  const equipmentByCategory = {
    'Cardio': ['Treadmill', 'Elliptical', 'Stationary Bike', 'Rowing Machine'],
    'Free Weights': ['Dumbbells', 'Barbells', 'Kettlebells', 'Weight Plates'],
    'Machines': ['Cable Machine', 'Leg Press', 'Lat Pulldown', 'Chest Press'],
    'Bodyweight': ['Pull-up Bar', 'Dip Station', 'Resistance Bands', 'Exercise Mat']
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Workout Preferences</h3>
        <p className="text-gray-600">Let us know about your workout environment and preferences</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Workout Location</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'home', label: 'Home', emoji: '🏠' },
            { value: 'basic-gym', label: 'Basic Gym', emoji: '🏃' },
            { value: 'full-gym', label: 'Full Gym', emoji: '🏋️' },
            { value: 'outdoor', label: 'Outdoor', emoji: '🌳' }
          ].map((option) => (
            <label key={option.value} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="availability"
                value={option.value}
                checked={data.availability === option.value}
                onChange={(e) => onChange({ availability: e.target.value as GymPreferences['availability'] })}
                className="sr-only"
              />
              <span className="text-2xl mb-2">{option.emoji}</span>
              <span className={`font-medium ${data.availability === option.value ? 'text-emerald-600' : 'text-gray-900'}`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Available Equipment</label>
        <div className="space-y-4">
          {Object.entries(equipmentByCategory).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {items.map((equipment) => (
                  <label key={equipment} className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors text-sm">
                    <input
                      type="checkbox"
                      checked={(data.equipment || []).includes(equipment)}
                      onChange={() => handleEquipmentToggle(equipment)}
                      className="mr-2 text-emerald-600 focus:ring-emerald-500 rounded"
                    />
                    <span className="text-gray-900">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred workout duration: {data.workoutDuration || 45} minutes
        </label>
        <input
          type="range"
          min="15"
          max="120"
          step="15"
          value={data.workoutDuration || 45}
          onChange={(e) => onChange({ workoutDuration: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>15 min</span>
          <span>2 hours</span>
        </div>
      </div>
    </div>
  );
};

export default GymForm;