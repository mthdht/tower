<template>
    <button class="bg-slate-200 py-2 px-4 rounded hover:bg-slate-300">
        {{ props.specs.labelText || 'Bouton' }}
    </button>
</template>
  
<script setup>
const props = defineProps({
  specs: {
    type: Object,
    required: true,
  },
});
</script>
  