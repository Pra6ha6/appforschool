import React from 'react';
import { ArrowRight, Target, Utensils, Dumbbell } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your Personal
            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fitness Coach
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get personalized diet plans and workout routines tailored specifically to your goals, 
            preferences, and lifestyle. Transform your fitness journey with AI-powered recommendations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Target className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
              <p className="text-gray-600">Customized plans based on your specific fitness goals and timeline</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Utensils className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nutrition Plans</h3>
              <p className="text-gray-600">Delicious meal plans that match your dietary preferences and restrictions</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Dumbbell className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Workouts</h3>
              <p className="text-gray-600">Equipment-based routines that fit your schedule and fitness level</p>
            </div>
          </div>
          
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Generate My Plan
            <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;