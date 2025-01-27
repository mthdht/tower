<template>
    <div>
      <div
        v-for="(section, index) in props.build.sections"
        :key="section.type"
        class="border border-gray-300 rounded p-4 mb-4"
        @click="$emit('select-section', section)"
      >
      {{  section.type }}
      </div>
    </div>
</template>
  
<script setup>
import TextBlock from './TextBlock.vue';
import ButtonBlock from './ButtonBlock.vue';
import ImageBlock from './ImageBlock.vue'
import CardBlock from './CardBlock.vue';
import ColumnBlock  from './ColumnBlock.vue'
  
const props = defineProps({
    build: {
        type: Object,
        required: true,
    },
});   

// Fonction de mapping
const getBlockComponent = (type) => {
  const components = {
    text: TextBlock,
    button: ButtonBlock,
    image: ImageBlock,
    card: CardBlock,
    columns: ColumnBlock
  };
  return components[type] || null;
};
</script>
  