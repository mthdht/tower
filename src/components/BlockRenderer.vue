<template>
    <div>
      <div
        v-for="(block, index) in props.blocks"
        :key="block.id"
        class="border border-gray-300 rounded p-4 mb-4"
        @click="$emit('select-block', block)"
      >
        <component :is="getBlockComponent(block.type)" :block="block" />
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
    blocks: {
        type: Array,
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
  