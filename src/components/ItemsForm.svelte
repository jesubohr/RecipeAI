<script lang="ts">
  export let onSubmit = (event: Event) => {}
</script>

<form
class="flex flex-col gap-2.5 mt-4"
on:submit|preventDefault={onSubmit}
>
<label for="ingredients" class="text-3xl text-primary font-bold">Ingredients</label>
<div class="flex gap-2">
  <input
    type="text"
    id="ingredients"
    name="ingredients"
    placeholder="Enter ingredients here..."
    class="py-3 px-4 w-full border border-primary/25 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-opacity-50 placeholder:font-normal placeholder:text-primary placeholder:opacity-60"
  />
  <slot />
</div>
</form>
