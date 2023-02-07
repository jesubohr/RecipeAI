<script lang="ts">
  import type { RecipeOptions } from "../services/types"
  import { useOptionList } from "../hooks"
  import { generateRecipe } from "../services/cohere"
  import {
    DEFAULT_RECIPE_OPTIONS,
    MealType,
    Cuisine,
    Diet,
    Intolerance
  } from "../services/recipe"

  import { LoadIcon } from "./icons"
  import Recipe from "./Recipe.svelte"
  import Button from "./Button.svelte"
  import { Select, Form, Input, FormField, MultiSelect } from "./Form"

  let recipePromise: Promise<string> | null = null
  let recipeText = ""

  const mealTypes = useOptionList(MealType)
  const cuisines = useOptionList(Cuisine)
  const diets = useOptionList(Diet)
  const intolerances = useOptionList(Intolerance)

  async function handleData(data: Record<string, string>) {
    const ingredients = data["ingredients"]
    const mealType = data["mealType"] as RecipeOptions["mealType"]
    const cuisine = data["cuisine"] as RecipeOptions["cuisine"]
    const diet = data["diet"] as RecipeOptions["diet"]
    const intolerances = data["intolerances"]
    const excludeIngredients = data["excludeIngredients"]
    const maxCalories = Number(data["maxCalories"])
    const prepTime = Number(data["prepTime"])
    const servings = Number(data["servings"])

    const ingredientsList = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient.length > 0)

    const intolerancesList = intolerances
      .split(",")
      .map((intolerance) => intolerance.trim())
      .filter((intolerance) => intolerance.length > 0)

    const excludeIngredientsList = excludeIngredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient.length > 0)


    const recipeOptions: RecipeOptions = {
      ingredients: ingredientsList || DEFAULT_RECIPE_OPTIONS.ingredients,
      mealType: mealType || DEFAULT_RECIPE_OPTIONS.mealType,
      cuisine: cuisine || DEFAULT_RECIPE_OPTIONS.cuisine,
      diet: diet || DEFAULT_RECIPE_OPTIONS.diet,
      intolerances: intolerancesList || DEFAULT_RECIPE_OPTIONS.intolerances,
      excludeIngredients:
        excludeIngredientsList || DEFAULT_RECIPE_OPTIONS.excludeIngredients,
      maxCalories: maxCalories || DEFAULT_RECIPE_OPTIONS.maxCalories,
      prepTime: prepTime || DEFAULT_RECIPE_OPTIONS.prepTime,
      servings: servings || DEFAULT_RECIPE_OPTIONS.servings
    }

    recipePromise = generateRecipe(recipeOptions)
    recipeText = await recipePromise
    recipePromise = null
  }
</script>

<Form
  onSubmit={handleData}
  values={[
    "ingredients",
    "mealType",
    "cuisine",
    "diet",
    "intolerances",
    "excludeIngredients",
    "maxCalories",
    "prepTime",
    "servings"
  ]}
>
  <FormField label="Ingredients" let:id>
    <Input {id} name="ingredients" placeholder="e.g. bread, ham, cheese" required />
  </FormField>

  <div class="flex flex-wrap sm:flex-nowrap gap-3">
    <FormField label="Meal Type" let:id>
      <Select
        {id}
        name="mealType"
        options={mealTypes}
        value={mealTypes[0].value}
      />
    </FormField>
    <FormField label="Cuisine" let:id>
      <Select
        {id}
        name="cuisine"
        options={cuisines}
        value={cuisines[0].value}
      />
    </FormField>
  </div>

  <div class="flex flex-wrap sm:flex-nowrap gap-3">
    <FormField label="Diet" let:id>
      <Select {id} name="diet" options={diets} value={diets[0].value} />
    </FormField>
    <FormField label="Intolerances" let:id>
      <MultiSelect {id} name="intolerances" options={intolerances} />
    </FormField>
  </div>

  <div class="flex flex-wrap sm:flex-nowrap gap-3">
    <FormField label="Exclude Ingredients" let:id>
      <Input {id} name="excludeIngredients" placeholder="e.g. spicy sauce, mustard" />
    </FormField>
    <FormField label="Max Calories" let:id>
      <Input
        {id}
        type="number"
        name="maxCalories"
        placeholder="3000 calories"
        maxValue={10000}
      />
    </FormField>
  </div>

  <div class="flex flex-wrap sm:flex-nowrap gap-3">
    <FormField label="Preparation Time" subLabel="(minutes)" let:id>
      <Input
        {id}
        type="number"
        name="prepTime"
        placeholder="60 minutes"
        minValue={10}
        maxValue={480}
      />
    </FormField>
    <FormField label="Servings" let:id>
      <Input
        {id}
        type="number"
        name="servings"
        placeholder="1"
        minValue={1}
        maxValue={30}
      />
    </FormField>
  </div>

  {#if recipePromise instanceof Promise}
    {#await recipePromise}
      <Button
        type="submit"
        title="Loading Recipe"
        className="w-fit self-center"
        disabled
      >
        <LoadIcon />
        <span class="text-xl font-medium leading-none">Loading</span>
      </Button>
    {/await}
  {:else}
    <Button type="submit" title="Generate Recipe" className="w-fit self-center">
      <span class="text-xl font-medium leading-none">Generate Recipe</span>
    </Button>
  {/if}
</Form>

{#if recipeText.length > 0}
  <Recipe recipe={recipeText} />
{/if}
