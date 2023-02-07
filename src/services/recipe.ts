import type { RecipeOptions } from "./types"
export const DEFAULT_RECIPE_OPTIONS: RecipeOptions = {
  ingredients: [],
  mealType: "breakfast",
  cuisine: "latin american",
  diet: "normal",
  intolerances: [],
  excludeIngredients: [],
  maxCalories: 3000,
  prepTime: 60,
  servings: 1
}

export const MealType = [
  "breakfast",
  "lunch",
  "dinner",
  "dessert",
  "snack",
  "drink",
  "appetizer",
  "salad",
  "sauce",
  "soup",
  "beverage",
  "marinade",
  "fingerfood",
  "spread"
]
export const Cuisine = [
  "caribbean",
  "african",
  "chinese",
  "japanese",
  "korean",
  "vietnamese",
  "thai",
  "indian",
  "british",
  "irish",
  "french",
  "italian",
  "mexican",
  "spanish",
  "latin american",
  "middle eastern",
  "eastern european",
  "jewish",
  "american",
  "cajun",
  "southern",
  "greek",
  "german",
  "nordic",
]
export const Diet = [
  "normal",
  "pescetarian",
  "lacto vegetarian",
  "ovo vegetarian",
  "vegan",
  "vegetarian",
  "paleo",
  "primal",
  "whole30",
]
export const Intolerance = [
  "dairy",
  "egg",
  "gluten",
  "grain",
  "peanut",
  "seafood",
  "sesame",
  "shellfish",
  "soy",
  "sulfite",
  "tree nut",
  "wheat"
]

export function getRecipePrompt(options: RecipeOptions) {
  const {
    ingredients,
    mealType,
    cuisine,
    diet,
    intolerances,
    excludeIngredients,
    maxCalories,
    prepTime,
    servings
  } = options

  const hasIntolerances = intolerances.length > 0
  const hasExcludeIngredients = excludeIngredients.length > 0

  const prompt = [
    `Write a full recipe with detailed ingredients and instructions that includes, as minimum, the following ingredients:\n${ingredients
      .map((ingd) => `- ${ingd}`)
      .join("\n")}\n`,
    `The meal type is ${mealType}.`,
    `The cuisine is ${cuisine}.`,
    `The diet is ${diet}.`,
    `${
      hasIntolerances ? `The intolerances are ${intolerances.join(", ")}.` : ""
    }`,
    `${
      hasExcludeIngredients
        ? `The excluded ingredients are ${excludeIngredients.join(", ")}.`
        : ""
    }`,
    `The maximum calories are ${maxCalories}.`,
    `The maximum preparation time are ${prepTime} minutes.`,
    `The number of servings are ${servings}.`
  ]
    .filter(Boolean)
    .join(" ")

  return prompt
}
