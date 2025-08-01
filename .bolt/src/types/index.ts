export interface PersonalInfo {
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
}

export interface FitnessGoals {
  primary: 'weight-loss' | 'muscle-gain' | 'endurance' | 'strength' | 'general-fitness';
  timeline: '1-month' | '3-months' | '6-months' | '1-year';
  workoutFrequency: number;
}

export interface DietPreferences {
  type: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo';
  cuisine: 'american' | 'mediterranean' | 'asian' | 'indian' | 'mexican' | 'italian';
  allergies: string[];
  mealsPerDay: number;
}

export interface GymPreferences {
  availability: 'home' | 'basic-gym' | 'full-gym' | 'outdoor';
  equipment: string[];
  workoutDuration: number;
}

export interface UserProfile extends PersonalInfo, FitnessGoals, DietPreferences, GymPreferences {}

export interface MealPlan {
  day: string;
  meals: {
    name: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    instructions: string[];
  }[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface WorkoutPlan {
  day: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'rest';
  exercises: {
    name: string;
    sets: number;
    reps: string;
    weight?: string;
    duration?: number;
    instructions: string;
    muscleGroups: string[];
  }[];
  estimatedDuration: number;
}

export interface GeneratedPlan {
  mealPlans: MealPlan[];
  workoutPlans: WorkoutPlan[];
  recommendations: string[];
}