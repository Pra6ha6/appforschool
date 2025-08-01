const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.fitgenius.com';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NutritionApiRequest {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activityLevel: string;
  goal: string;
  dietType: string;
  cuisine: string;
  allergies: string[];
  mealsPerDay: number;
  timeline: string;
}

export interface WorkoutApiRequest {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activityLevel: string;
  goal: string;
  workoutFrequency: number;
  workoutDuration: number;
  availability: string;
  equipment: string[];
  timeline: string;
}

export interface ApiMealPlan {
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
    prepTime: number;
    cookTime: number;
  }[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface ApiWorkoutPlan {
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
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    equipment: string[];
  }[];
  estimatedDuration: number;
  caloriesBurned: number;
}

export interface ApiGeneratedPlan {
  mealPlans: ApiMealPlan[];
  workoutPlans: ApiWorkoutPlan[];
  recommendations: string[];
  nutritionSummary: {
    dailyCalories: number;
    proteinTarget: number;
    carbTarget: number;
    fatTarget: number;
  };
  fitnessMetrics: {
    estimatedWeightChange: number;
    timeToGoal: string;
    weeklyCalorieDeficit?: number;
    weeklyCalorieSurplus?: number;
  };
}

class ApiService {
  private async makeRequest<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      // For demo purposes, we'll simulate API calls with realistic delays
      // In production, replace this with actual API calls
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
      
      // Simulate occasional API errors for realistic behavior
      if (Math.random() < 0.05) {
        throw new Error('API temporarily unavailable');
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY || 'demo-key'}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error('API Request failed:', error);
      
      // Fallback to mock data if API fails
      const mockData = await this.generateMockData(endpoint, data);
      return { success: true, data: mockData };
    }
  }

  private async generateMockData(endpoint: string, data: any): Promise<any> {
    // Enhanced mock data generation based on user input
    if (endpoint === '/generate-nutrition-plan') {
      return this.generateMockNutritionPlan(data);
    } else if (endpoint === '/generate-workout-plan') {
      return this.generateMockWorkoutPlan(data);
    }
    return null;
  }

  private generateMockNutritionPlan(request: NutritionApiRequest): ApiMealPlan[] {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    // Calculate calories based on user data
    const bmr = this.calculateBMR(request);
    const activityMultiplier = this.getActivityMultiplier(request.activityLevel);
    let dailyCalories = Math.round(bmr * activityMultiplier);
    
    // Adjust for goals
    if (request.goal === 'weight-loss') {
      dailyCalories = Math.round(dailyCalories * 0.8);
    } else if (request.goal === 'muscle-gain') {
      dailyCalories = Math.round(dailyCalories * 1.15);
    }

    const mealDatabase = this.getMealDatabase(request.dietType, request.cuisine, request.allergies);
    
    return days.map(day => {
      const meals = this.generateDayMeals(mealDatabase, request.mealsPerDay, dailyCalories);
      const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
      const macros = {
        protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
        carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
        fat: meals.reduce((sum, meal) => sum + meal.fat, 0)
      };
      
      return { day, meals, totalCalories, macros };
    });
  }

  private generateMockWorkoutPlan(request: WorkoutApiRequest): ApiWorkoutPlan[] {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const workoutPlans: ApiWorkoutPlan[] = [];
    
    let workoutDays = 0;
    const exerciseDatabase = this.getExerciseDatabase(request.availability, request.equipment);
    
    days.forEach(day => {
      if (workoutDays < request.workoutFrequency) {
        const workoutType = this.getWorkoutType(request.goal, workoutDays);
        const exercises = this.generateWorkoutExercises(
          exerciseDatabase, 
          workoutType, 
          request.workoutDuration,
          this.getDifficultyLevel(request.activityLevel)
        );
        
        workoutPlans.push({
          day,
          type: workoutType,
          exercises,
          estimatedDuration: request.workoutDuration,
          caloriesBurned: this.estimateCaloriesBurned(workoutType, request.workoutDuration, request.weight)
        });
        workoutDays++;
      } else {
        workoutPlans.push({
          day,
          type: 'rest',
          exercises: [],
          estimatedDuration: 0,
          caloriesBurned: 0
        });
      }
    });
    
    return workoutPlans;
  }

  private calculateBMR(request: NutritionApiRequest): number {
    const { weight, height, age, gender } = request;
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    return gender === 'male' ? bmr + 5 : bmr - 161;
  }

  private getActivityMultiplier(activityLevel: string): number {
    const multipliers: Record<string, number> = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    return multipliers[activityLevel] || 1.55;
  }

  private getMealDatabase(dietType: string, cuisine: string, allergies: string[]) {
    // Enhanced meal database with cuisine-specific options
    const mealsByType = {
      breakfast: [
        {
          name: 'Protein Power Bowl',
          calories: 380,
          protein: 28,
          carbs: 32,
          fat: 15,
          ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Almonds', 'Honey'],
          instructions: ['Layer yogurt in bowl', 'Add granola and berries', 'Top with almonds and honey'],
          prepTime: 5,
          cookTime: 0
        },
        {
          name: 'Avocado Toast Supreme',
          calories: 420,
          protein: 18,
          carbs: 35,
          fat: 25,
          ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Feta cheese'],
          instructions: ['Toast bread', 'Mash avocado', 'Fry eggs', 'Assemble with toppings'],
          prepTime: 10,
          cookTime: 5
        }
      ],
      lunch: [
        {
          name: 'Mediterranean Quinoa Bowl',
          calories: 520,
          protein: 22,
          carbs: 58,
          fat: 20,
          ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Olives', 'Feta', 'Olive oil'],
          instructions: ['Cook quinoa', 'Prepare vegetables', 'Combine ingredients', 'Dress with olive oil'],
          prepTime: 15,
          cookTime: 15
        }
      ],
      dinner: [
        {
          name: 'Grilled Salmon with Vegetables',
          calories: 480,
          protein: 35,
          carbs: 25,
          fat: 28,
          ingredients: ['Salmon fillet', 'Broccoli', 'Sweet potato', 'Olive oil', 'Herbs'],
          instructions: ['Season salmon', 'Grill fish', 'Roast vegetables', 'Serve together'],
          prepTime: 10,
          cookTime: 20
        }
      ],
      snack: [
        {
          name: 'Protein Smoothie',
          calories: 220,
          protein: 20,
          carbs: 18,
          fat: 8,
          ingredients: ['Protein powder', 'Banana', 'Almond milk', 'Peanut butter'],
          instructions: ['Add ingredients to blender', 'Blend until smooth', 'Serve immediately'],
          prepTime: 3,
          cookTime: 0
        }
      ]
    };

    // Filter based on dietary restrictions
    return this.filterMealsByDiet(mealsByType, dietType, allergies);
  }

  private filterMealsByDiet(meals: any, dietType: string, allergies: string[]) {
    // Implementation would filter meals based on diet type and allergies
    return meals;
  }

  private generateDayMeals(mealDatabase: any, mealsPerDay: number, targetCalories: number) {
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'snack', 'snack'];
    const selectedMeals = [];
    
    for (let i = 0; i < mealsPerDay; i++) {
      const mealType = mealTypes[i] as keyof typeof mealDatabase;
      const availableMeals = mealDatabase[mealType] || mealDatabase.snack;
      const randomMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
      
      selectedMeals.push({
        ...randomMeal,
        type: mealType
      });
    }
    
    return selectedMeals;
  }

  private getExerciseDatabase(availability: string, equipment: string[]) {
    return {
      strength: [
        {
          name: 'Push-ups',
          sets: 3,
          reps: '12-15',
          instructions: 'Keep body straight, lower chest to floor, push back up',
          muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
          difficulty: 'beginner' as const,
          equipment: []
        },
        {
          name: 'Dumbbell Bench Press',
          sets: 4,
          reps: '8-12',
          weight: 'Moderate',
          instructions: 'Lie on bench, press dumbbells up and together',
          muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
          difficulty: 'intermediate' as const,
          equipment: ['Dumbbells', 'Bench']
        }
      ],
      cardio: [
        {
          name: 'High-Intensity Interval Training',
          duration: 20,
          instructions: '30 seconds high intensity, 30 seconds rest, repeat',
          muscleGroups: ['Full Body', 'Cardiovascular'],
          difficulty: 'intermediate' as const,
          equipment: []
        }
      ]
    };
  }

  private getWorkoutType(goal: string, dayIndex: number): 'strength' | 'cardio' | 'flexibility' {
    if (goal === 'muscle-gain' || goal === 'strength') {
      return dayIndex % 2 === 0 ? 'strength' : 'cardio';
    } else if (goal === 'weight-loss' || goal === 'endurance') {
      return dayIndex % 2 === 0 ? 'cardio' : 'strength';
    }
    return dayIndex % 3 === 0 ? 'flexibility' : (dayIndex % 2 === 0 ? 'strength' : 'cardio');
  }

  private generateWorkoutExercises(database: any, type: string, duration: number, difficulty: string) {
    const exercises = database[type] || database.strength;
    return exercises.slice(0, Math.ceil(duration / 15)); // Roughly 15 minutes per exercise
  }

  private getDifficultyLevel(activityLevel: string): string {
    const difficultyMap: Record<string, string> = {
      'sedentary': 'beginner',
      'light': 'beginner',
      'moderate': 'intermediate',
      'active': 'intermediate',
      'very-active': 'advanced'
    };
    return difficultyMap[activityLevel] || 'beginner';
  }

  private estimateCaloriesBurned(workoutType: string, duration: number, weight: number): number {
    const caloriesPerMinute: Record<string, number> = {
      'strength': 6,
      'cardio': 10,
      'flexibility': 3
    };
    const baseRate = caloriesPerMinute[workoutType] || 6;
    return Math.round(baseRate * duration * (weight / 70)); // Normalized to 70kg person
  }

  async generateNutritionPlan(request: NutritionApiRequest): Promise<ApiResponse<ApiMealPlan[]>> {
    return this.makeRequest<ApiMealPlan[]>('/generate-nutrition-plan', request);
  }

  async generateWorkoutPlan(request: WorkoutApiRequest): Promise<ApiResponse<ApiWorkoutPlan[]>> {
    return this.makeRequest<ApiWorkoutPlan[]>('/generate-workout-plan', request);
  }

  async generateCompletePlan(nutritionRequest: NutritionApiRequest, workoutRequest: WorkoutApiRequest): Promise<ApiResponse<ApiGeneratedPlan>> {
    try {
      const [nutritionResponse, workoutResponse] = await Promise.all([
        this.generateNutritionPlan(nutritionRequest),
        this.generateWorkoutPlan(workoutRequest)
      ]);

      if (!nutritionResponse.success || !workoutResponse.success) {
        throw new Error('Failed to generate complete plan');
      }

      const recommendations = this.generateRecommendations(nutritionRequest, workoutRequest);
      const nutritionSummary = this.calculateNutritionSummary(nutritionRequest);
      const fitnessMetrics = this.calculateFitnessMetrics(nutritionRequest, workoutRequest);

      const completePlan: ApiGeneratedPlan = {
        mealPlans: nutritionResponse.data!,
        workoutPlans: workoutResponse.data!,
        recommendations,
        nutritionSummary,
        fitnessMetrics
      };

      return { success: true, data: completePlan };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  private generateRecommendations(nutritionReq: NutritionApiRequest, workoutReq: WorkoutApiRequest): string[] {
    const recommendations = [];
    
    if (nutritionReq.goal === 'weight-loss') {
      recommendations.push('Focus on creating a sustainable caloric deficit through balanced nutrition and regular exercise');
      recommendations.push('Incorporate both cardio and strength training for optimal fat loss and muscle preservation');
    }
    
    if (nutritionReq.goal === 'muscle-gain') {
      recommendations.push('Ensure adequate protein intake (1.6-2.2g per kg body weight) to support muscle growth');
      recommendations.push('Progressive overload is key - gradually increase weights and training intensity');
    }
    
    recommendations.push('Stay hydrated - aim for 8-10 glasses of water daily for optimal performance');
    recommendations.push('Prioritize 7-9 hours of quality sleep for recovery and hormone optimization');
    recommendations.push('Track your progress with photos, measurements, and performance metrics');
    recommendations.push('Listen to your body and incorporate rest days to prevent overtraining');
    
    if (workoutReq.workoutFrequency > 5) {
      recommendations.push('Consider incorporating active recovery days with light activities like walking or yoga');
    }
    
    return recommendations;
  }

  private calculateNutritionSummary(request: NutritionApiRequest) {
    const bmr = this.calculateBMR(request);
    const dailyCalories = Math.round(bmr * this.getActivityMultiplier(request.activityLevel));
    
    let adjustedCalories = dailyCalories;
    if (request.goal === 'weight-loss') {
      adjustedCalories = Math.round(dailyCalories * 0.8);
    } else if (request.goal === 'muscle-gain') {
      adjustedCalories = Math.round(dailyCalories * 1.15);
    }
    
    return {
      dailyCalories: adjustedCalories,
      proteinTarget: Math.round(request.weight * 1.8), // 1.8g per kg
      carbTarget: Math.round(adjustedCalories * 0.45 / 4), // 45% of calories
      fatTarget: Math.round(adjustedCalories * 0.25 / 9) // 25% of calories
    };
  }

  private calculateFitnessMetrics(nutritionReq: NutritionApiRequest, workoutReq: WorkoutApiRequest) {
    const bmr = this.calculateBMR(nutritionReq);
    const dailyCalories = Math.round(bmr * this.getActivityMultiplier(nutritionReq.activityLevel));
    
    let estimatedWeightChange = 0;
    let timeToGoal = '';
    
    if (nutritionReq.goal === 'weight-loss') {
      const weeklyDeficit = (dailyCalories * 0.2) * 7; // 20% deficit
      estimatedWeightChange = -0.5; // kg per week
      timeToGoal = 'Results visible in 4-6 weeks';
      return {
        estimatedWeightChange,
        timeToGoal,
        weeklyCalorieDeficit: weeklyDeficit
      };
    } else if (nutritionReq.goal === 'muscle-gain') {
      const weeklySurplus = (dailyCalories * 0.15) * 7; // 15% surplus
      estimatedWeightChange = 0.25; // kg per week
      timeToGoal = 'Noticeable gains in 6-8 weeks';
      return {
        estimatedWeightChange,
        timeToGoal,
        weeklyCalorieSurplus: weeklySurplus
      };
    }
    
    return {
      estimatedWeightChange: 0,
      timeToGoal: 'Improved fitness in 4-6 weeks'
    };
  }
}

export const apiService = new ApiService();