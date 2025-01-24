<template>
    <button class="bg-slate-200 py-2 px-4 rounded hover:bg-slate-300">
        {{ props.block.labelText || 'Bouton' }}
    </button>
</template>
  
<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});
</script>
  