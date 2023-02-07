<script lang="ts">
  import type { Option } from "./types"
  import { onMount } from "svelte"

  let self: HTMLElement
  let active = false
  export let value = ""
  export let id = ""
  export let name = ""
  export let required = false
  export let options: Option[] = []

  function handleSelected(
    option: string,
    ev: KeyboardEvent | Event | null = null
  ) {
    if (ev instanceof KeyboardEvent) {
      if (ev?.key === "Enter") {
        value = option
        active = false
      }
    } else {
      value = option
      active = false
    }
  }

  function handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Enter") active = true
    if (ev.key === "Escape") active = false
  }

  function handleSelect() {
    active = !active
  }
  function handleBlur(ev: Event) {
    const posibleSelect = (ev.target as HTMLElement).parentElement
    if (posibleSelect !== self) active = false
  }

  onMount(() => {
    document.addEventListener("click", handleBlur)
    return () => {
      document.removeEventListener("click", handleBlur)
    }
  })
</script>

<div
  {id}
  tabindex="0"
  role="listbox"
  title="Select"
  aria-required={required}
  bind:this={self}
  data-name={name}
  data-value={value}
  aria-label="Select"
  aria-expanded={active}
  aria-activedescendant={value}
  on:keydown={handleKeyDown}
  class="relative flex items-center justify-end py-3 px-4 w-full bg-component border-2 border-primary/50 dark:border-primary/60 rounded-md text-lg text-secondary font-medium focus:outline-none focus:ring-4 ring-primary/60 ring-offset-2 ring-offset-component transition-shadow"
>
  <div
    id="options"
    role="group"
    class:active
    class="absolute top-full inset-x-0 flex flex-col mt-1 max-h-64 bg-component border-2 border-primary/50 rounded-md overflow-y-auto shadow-lg z-10"
  >
    {#each options as option}
      <div
        role="option"
        aria-selected="true"
        class="py-3 px-4 w-full text-left hover:bg-primary hover:text-white focus:outline-none focus:bg-primary focus:text-white cursor-pointer {value === option.value ? 'bg-primary text-white': ''}"
        on:click={() => handleSelected(option.value)}
        on:keydown={(ev) => handleSelected(option.value, ev)}
      >
        {option.label}
      </div>
    {/each}
  </div>
  <div class="flex-1 capitalize {value === '' ? 'opacity-50' : ''}">
    {value || "--Select--"}
  </div>
  <button
    type="button"
    title="Toggle options"
    aria-label="Toggle options"
    on:click={handleSelect}
    class="text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-opacity-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-6 h-6 pointer-events-none {active
        ? 'transform rotate-180'
        : ''} transition-transform"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
</div>

<style>
  #options {
    opacity: 0;
    height: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-in-out, height 0.25s ease-in-out;
  }
  #options.active {
    opacity: 1;
    height: auto;
    pointer-events: auto;
  }
</style>
