<script>
  import { useId } from "../../hooks"
  export let label = ""
  export let subLabel = ""
  const id = useId()
</script>

<div class="flex flex-col gap-2 w-full">
  <label for={id} class="text-2xl text-secondary font-semibold capitalize"
  >
    {label}
    <span class="text-sm">{subLabel}</span>
  </label>
  <slot id={id}></slot>
</div>
