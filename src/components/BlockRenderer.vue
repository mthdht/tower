<template>
    <div>
      <button @click="console.log(props.builder)">log builder</button>

      <div
        v-for="(section) in props.builder.sections"
        :key="section.id"
        class="section border border-gray-300 rounded p-4 mb-4 grid"
        @click="$emit('selectSection', section)"
        :style="`grid-template-columns: repeat(${section.columns}, 1fr);`"
        :class="{'border-sky-500': section == props.builder.selectedElement.section}"
      >
        section: {{  section.id }}
        <div class="block border"
          :key="block.id"
          :class="{'border-emerald-500': block == props.builder.selectedElement.block}"
          v-for="(block) in section.blocks"
          @click="$emit('selectBlock', block)">
          <p v-show="!block.components.length">
            block : {{ block.id }}
          </p>

          <component v-for="(component, index) in block.components" :key="index" :is="getComponent(component)" :component="component"></component>
        </div>
      
      </div>
    </div>
</template>
  
<script setup>
import TextBlock from './TextBlock.vue'

const props = defineProps({
    builder: Object
});   

const getComponent = (component) => {
  const components = {
    'text': TextBlock
  }
  return components[component.type]
}


</script>
  