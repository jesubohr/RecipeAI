type MealType = "breakfast" | "lunch" | "dinner" | "dessert" | "snack" | "drink" | "appetizer" | "salad" | "sauce" | "soup" | "beverage" | "marinade" | "fingerfood" | "spread"

type Cuisine = "african" | "chinese" | "japanese" | "korean" | "vietnamese" | "thai" | "indian" | "british" | "irish" | "french" | "italian" | "mexican" | "spanish" | "middle eastern" | "jewish" | "american" | "cajun" | "southern" | "greek" | "german" | "nordic" | "eastern european" | "caribbean" | "latin american"

type Diet = "pescetarian" | "lacto vegetarian" | "ovo vegetarian" | "vegan" | "vegetarian" | "paleo" | "primal" | "whole30" | "normal"

type Intolerance = "dairy" | "egg" | "gluten" | "grain" | "peanut" | "seafood" | "sesame" | "shellfish" | "soy" | "sulfite" | "tree nut" | "wheat"

export type RecipeOptions = {
  ingredients: string[]
  mealType: MealType
  cuisine: Cuisine
  diet: Diet
  intolerances: string[]
  excludeIngredients: string[]
  maxCalories: number
  prepTime: number
  servings: number
}
