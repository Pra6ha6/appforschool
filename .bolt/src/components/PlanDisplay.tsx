import React, { useState } from 'react';
import { Calendar, Clock, Target, Utensils, Dumbbell, ChevronDown, ChevronUp, Zap, TrendingUp } from 'lucide-react';
import { GeneratedPlan } from '../types';

interface PlanDisplayProps {
  plan: GeneratedPlan;
  onStartOver: () => void;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onStartOver }) => {
  const [activeTab, setActiveTab] = useState<'diet' | 'workout'>('diet');
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const toggleDay = (day: string) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl p-8">
        <h2 className="text-4xl font-bold mb-4">Your Personalized Fitness Plan</h2>
        <p className="text-xl opacity-90">
          A comprehensive plan designed specifically for your goals and preferences
        </p>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Target className="mr-3 h-6 w-6 text-emerald-600" />
          Key Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {plan.recommendations.map((rec, index) => (
            <div key={index} className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4">
              <p className="text-gray-800">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('diet')}
            className={`flex-1 py-4 px-6 text-lg font-medium transition-colors ${
              activeTab === 'diet'
                ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Utensils className="inline mr-2 h-5 w-5" />
            Diet Plan
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-4 px-6 text-lg font-medium transition-colors ${
              activeTab === 'workout'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Dumbbell className="inline mr-2 h-5 w-5" />
            Workout Plan
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'diet' ? (
            <div className="space-y-6">
              {plan.mealPlans.map((dayPlan) => (
                <div key={dayPlan.day} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleDay(dayPlan.day)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{dayPlan.day}</h3>
                      <p className="text-sm text-gray-600">
                        {dayPlan.totalCalories} calories | P: {dayPlan.macros.protein}g | C: {dayPlan.macros.carbs}g | F: {dayPlan.macros.fat}g
                      </p>
                    </div>
                    {expandedDays.has(dayPlan.day) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedDays.has(dayPlan.day) && (
                    <div className="border-t border-gray-200 p-4 space-y-4">
                      {dayPlan.meals.map((meal, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 capitalize">{meal.type}</h4>
                            <span className="text-sm text-gray-600">{meal.calories} cal</span>
                          </div>
                          <h5 className="font-medium text-gray-800 mb-2">{meal.name}</h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="text-sm font-medium text-gray-700 mb-1">Ingredients:</h6>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {meal.ingredients.map((ingredient, i) => (
                                  <li key={i}>• {ingredient}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="text-sm font-medium text-gray-700 mb-1">Instructions:</h6>
                              <ol className="text-sm text-gray-600 space-y-1">
                                {meal.instructions.map((instruction, i) => (
                                  <li key={i}>{i + 1}. {instruction}</li>
                                ))}
                              </ol>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                            {(meal as any).prepTime && (
                              <span className="ml-2">
                                <Clock className="inline w-3 h-3 mr-1" />
                                Prep: {(meal as any).prepTime}min
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {plan.workoutPlans.map((dayPlan) => (
                <div key={dayPlan.day} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleDay(dayPlan.day)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{dayPlan.day}</h3>
                      <p className="text-sm text-gray-600">
                        <span className="capitalize">{dayPlan.type}</span> • {dayPlan.estimatedDuration} min
                      </p>
                    </div>
                    {expandedDays.has(dayPlan.day) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedDays.has(dayPlan.day) && (
                    <div className="border-t border-gray-200 p-4">
                      {dayPlan.type === 'rest' ? (
                        <div className="text-center py-8 text-gray-600">
                          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-lg">Rest Day</p>
                          <p className="text-sm">Take this day to recover and prepare for your next workout</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {dayPlan.exercises.map((exercise, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                                <div className="text-sm text-gray-600">
                                  {exercise.sets && `${exercise.sets} sets`}
                                  {exercise.reps && ` × ${exercise.reps}`}
                                  {exercise.weight && ` @ ${exercise.weight}`}
                                  {exercise.duration && `${exercise.duration} min`}
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{exercise.instructions}</p>
                              <div className="flex flex-wrap gap-2">
                                {exercise.muscleGroups.map((muscle, i) => (
                                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                              {(exercise as any).difficulty && (
                                <div className="mt-2 flex items-center text-xs text-gray-500">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Difficulty: {(exercise as any).difficulty}
                                  {(exercise as any).equipment && (exercise as any).equipment.length > 0 && (
                                    <span className="ml-2">
                                      <Zap className="inline w-3 h-3 mr-1" />
                                      Equipment: {(exercise as any).equipment.join(', ')}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onStartOver}
          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Create New Plan
        </button>
      </div>
    </div>
  );
};

export default PlanDisplay;