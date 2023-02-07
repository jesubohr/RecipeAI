<script lang="ts">
  export let values: string[] = []
  export let onSubmit = (data: Record<string, string>) => {}

  const getByDataName = (name: string) => document.querySelector(`[data-name=${name}]`) as HTMLElement
  
  function handleSubmit(event: Event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const data = values.reduce((acc, value) => {
      const entry = formData.get(value) as string ?? getByDataName(value)?.dataset.value ?? ""
      acc[value] = entry
      return acc
    }, {} as Record<string, string>)
    onSubmit(data)
  }
</script>

<form class="flex flex-col gap-6 mt-4" on:submit|preventDefault={handleSubmit}>
  <slot />
</form>
