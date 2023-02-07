<script lang="ts">
  import { useId } from "../../hooks"
  export let id = useId()
  export let name = ""
  export let type = "text"
  export let required = false
  export let placeholder = ""
  export let maxValue = 9999
  export let minValue = 0
</script>

<input
  {id}
  {type}
  {name}
  {placeholder}
  {required}
  min="{minValue}"
  max="{maxValue}"
  class="py-3 px-4 w-full bg-component border-2 border-primary/50 dark:border-primary/60 rounded-md text-lg focus:outline-none focus:ring-4 ring-primary/60 ring-offset-2 ring-offset-component placeholder:font-normal placeholder:text-secondary placeholder:opacity-60 dark:placeholder:opacity-80 transition-shadow"
/>
