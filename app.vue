<script setup lang="ts">
const msg = ref("まだ")
const onButtonClick = (label: string, event: Event) => {
  const target = event.target as HTMLButtonElement
  const text = target.innerText
  msg.value = `${label}と${text}`
}
</script>

<template>
  <p>{{ msg }}</p>
  <button @click="onButtonClick('Hello', $event)">こんにちは</button>
</template>