<script lang="ts">
  import Block from "./Block.svelte"
  export let recipe = ""

  function getTextBetween(text: string, from: string, to: string = "") {
    const fromIndex = text.indexOf(from)
    const toIndex = to !== "" ? text.indexOf(to) : text.length
    return text.substring(fromIndex + from.length, toIndex)
  }

  $: ingredients = getTextBetween(recipe, "Ingredients", "Instructions")
    .split("\n")
    .filter((t) => t !== "")

  $: instructions = getTextBetween(recipe, "Instructions")
    .split("\n")
    .filter((t) => t !== "")
    .map((t) => t.replace(/\d\.\s/, ""))
</script>

<figure class="flex flex-col gap-2.5 mt-4">
  <figcaption class="text-3xl text-primary font-bold">Recipe</figcaption>
  <Block>
    <h3><strong>Ingredients:</strong></h3>
    <ul>
      {#each ingredients as ingredient}
        <li>{ingredient}</li>
      {/each}
    </ul>
    <h3><strong>Instructions:</strong></h3>
    <ol>
      {#each instructions as instruction}
        <li>{instruction}</li>
      {/each}
    </ol>
  </Block>
</figure>
