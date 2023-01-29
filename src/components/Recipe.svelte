<script>
  import Block from "./Block.svelte"
  export let recipe = ""

  const ingredientsRegex = /^((\d\/\d)|\d)\s([\D|\s]|\d{2}\.\d)+/gm
  const instructionsRegex = /(\d\.\s([\w|\s|,|-|\(|\)]+\.))/gm

  $: ingredients = recipe
    .match(ingredientsRegex)
    .map((t) => t.replace("\n", "").replace(/\n.+\n/, ""))
  $: instructions = recipe
    .match(instructionsRegex)
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
