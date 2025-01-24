<template>
    <div class="text-gray-800">
        <p>{{ props.block.content || 'Bloc de texte par défaut.' }}</p>
    </div>
</template>
  
<script setup>
  // Props ou slots peuvent être ajoutés ici pour le contenu dynamique.
const props = defineProps({
    block: {
        type: Object,
        required: true,
    },
});
</script>
  