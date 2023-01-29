<script lang="ts">
  export let title = ""
  export let type: "button" | "submit" | "reset" = "button"
  export let disabled = false
</script>

<button
  {type}
  {title}
  {disabled}
  class="py-3 px-4 bg-primary/90 hover:bg-primary/20 border border-primary/25 rounded-md text-lg text-white hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-opacity-50 focus-visible:bg-primary/20 focus-visible:text-primary disabled:bg-primary/20 disabled:text-primary/60 disabled:cursor-not-allowed"
>
  <slot />
</button>
