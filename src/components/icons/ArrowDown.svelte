<script>
  export let active = false
</script>

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
