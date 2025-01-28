<template>
    <p :style="styles">{{ props.component.content || 'Bloc de texte par défaut.' }}</p>
</template>
  
<script setup>
import { computed } from 'vue';
  // Props ou slots peuvent être ajoutés ici pour le contenu dynamique.
const props = defineProps({
    component: {
        type: Object,
        required: true,
    },
});

const styles = computed(() => {
    return {
        fontSize: props.component.style.fontSize || '16px',
        color: props.component.style.color || 'black',
    };
})
</script>
  