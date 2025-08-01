import { UserProfile, GeneratedPlan } from '../types';
import { apiService, NutritionApiRequest, WorkoutApiRequest } from '../services/api';

export const generatePersonalizedPlan = async (profile: UserProfile): Promise<GeneratedPlan> => {
  try {
    // Prepare API requests
    const nutritionRequest: NutritionApiRequest = {
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
      gender: profile.gender,
      activityLevel: profile.activityLevel,
      goal: profile.primary,
      dietType: profile.type,
      cuisine: profile.cuisine,
      allergies: profile.allergies,
      mealsPerDay: profile.mealsPerDay,
      timeline: profile.timeline
    };

    const workoutRequest: WorkoutApiRequest = {
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
      gender: profile.gender,
      activityLevel: profile.activityLevel,
      goal: profile.primary,
      workoutFrequency: profile.workoutFrequency,
      workoutDuration: profile.workoutDuration,
      availability: profile.availability,
      equipment: profile.equipment,
      timeline: profile.timeline
    };

    // Call API service
    const response = await apiService.generateCompletePlan(nutritionRequest, workoutRequest);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to generate plan');
    }

    // Convert API response to our internal format
    return {
      mealPlans: response.data.mealPlans.map(plan => ({
        day: plan.day,
        meals: plan.meals,
        totalCalories: plan.totalCalories,
        macros: plan.macros
      })),
      workoutPlans: response.data.workoutPlans.map(plan => ({
        day: plan.day,
        type: plan.type,
        exercises: plan.exercises,
        estimatedDuration: plan.estimatedDuration
      })),
      recommendations: response.data.recommendations
    };
  } catch (error) {
    console.error('Error generating personalized plan:', error);
    throw new Error('Unable to generate your personalized plan. Please try again.');
  }
};

// Legacy functions kept for backward compatibility
export const calculateBMR = (profile: { weight: number; height: number; age: number; gender: string }): number => {
  const { weight, height, age, gender } = profile;
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  return gender === 'male' ? bmr + 5 : bmr - 161;
};

export const getActivityMultiplier = (activityLevel: string): number => {
  const multipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };
  return multipliers[activityLevel as keyof typeof multipliers] || 1.55;
};