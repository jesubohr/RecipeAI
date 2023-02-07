<script lang="ts">
  import type { Option } from "./types"
  import { onMount } from "svelte"
  import { XIcon, ArrowDown } from "../icons"

  let self: HTMLElement
  let active = false
  let values: string[] = []
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
        values = [...values, option]
        active = false
      }
    } else {
      values = [...values, option]
      active = false
    }
  }
  function handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Enter") active = true
    if (ev.key === "Escape") active = false
  }

  function handleOpen() {
    active = !active
  }
  function handleBlur(ev: Event) {
    const posibleSelect = (ev.target as HTMLElement).parentElement
    if (posibleSelect !== self) active = false
  }

  $: noSelectedOptions = options.filter((o) => !values.includes(o.value))
  function handleRemove(value: string) {
    values = values.filter((v) => v !== value)
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
  title="Multiple Select"
  aria-required={required}
  bind:this={self}
  data-name={name}
  data-value={values.join(",")}
  aria-label="MultiSelect"
  aria-expanded={active}
  aria-activedescendant={values.join(",")}
  on:keydown={handleKeyDown}
  class="relative flex items-center justify-end py-3 px-4 w-full bg-component border-2 border-primary/50 dark:border-primary/60 rounded-md text-lg text-secondary font-medium focus:outline-none focus:ring-4 ring-primary/60 ring-offset-2 ring-offset-component transition-shadow"
>
  <div
    id="options"
    role="group"
    class:active
    class="absolute top-full inset-x-0 flex flex-col mt-1 max-h-64 bg-component border-2 border-primary/50 rounded-md overflow-y-auto shadow-lg z-10"
  >
    {#each noSelectedOptions as option}
      <div
        role="option"
        aria-selected="true"
        class="py-3 px-4 w-full text-left hover:bg-primary hover:text-white focus:outline-none focus:bg-primary focus:text-white cursor-pointer"
        on:click={() => handleSelected(option.value)}
        on:keydown={(ev) => handleSelected(option.value, ev)}
      >
        {option.label}
      </div>
    {/each}
  </div>
  <div class="grow flex flex-wrap gap-2">
    {#each values as val}
      <span class="flex bg-primary rounded text-white capitalize">
        <span class="grow py-1 px-2">{val}</span>
        <button
          type="button"
          class="bg-component border-2 rounded-r border-primary text-center text-secondary"
          on:click={() => handleRemove(val)}
        >
          <XIcon strokeWidth={2} />
        </button>
      </span>
    {:else}
      <span class="text-secondary/70 font-normal">Select an option</span>
    {/each}
  </div>
  <button
    type="button"
    title="Toggle options"
    aria-label="Toggle options"
    on:click={handleOpen}
    class="text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-opacity-50"
  >
    <ArrowDown {active} />
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
