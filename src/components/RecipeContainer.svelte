<script lang="ts">
  import { generateRecipe } from "../services/cohere"
  import Recipe from "./Recipe.svelte"
  import Button from "./Button.svelte"
  import PlusIcon from "./PlusIcon.svelte"
  import LoadIcon from "./LoadIcon.svelte"
  import ItemsForm from "./ItemsForm.svelte"

  let recipePromise: Promise<string> | null = null
  let recipeText = ""
  async function handleSubmit(event: Event) {
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const ingredients = formData.get("ingredients") as string
    const ingredientsList = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient.length > 0)

    recipePromise = generateRecipe(ingredientsList)
    recipeText = await recipePromise
    recipePromise = null
  }
</script>

<ItemsForm onSubmit={handleSubmit}>
  {#if recipePromise instanceof Promise}
    {#await recipePromise}
      <Button type="submit" title="Loading Recipe" disabled>
        <LoadIcon />
      </Button>
    {/await}
  {:else}
    <Button type="submit" title="Generate Recipe">
      <PlusIcon />
    </Button>
  {/if}
</ItemsForm>

{#if recipeText.length > 0}
  <Recipe recipe={recipeText} />
{/if}
