<template>
    <div class="text-gray-800">
        <p>{{ props.component.content || 'Bloc de texte par défaut.' }}</p>
    </div>
</template>
  
<script setup>
  // Props ou slots peuvent être ajoutés ici pour le contenu dynamique.
const props = defineProps({
    component: {
        type: Object,
        required: true,
    },
});
</script>
  