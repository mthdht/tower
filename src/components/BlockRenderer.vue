<template>
    <div>
      <button @click="console.log(props.builder)">log builder</button>

      <div
        v-for="(section) in props.builder.sections"
        :key="section.id"
        class="section border border-gray-300 rounded mb-4 grid"
        @click="$emit('selectSection', section)"
        :style="sectionStyles(section)"
        :class="{'ring ring-sky-500': section == props.builder.selectedElement.section}"
      >
        <div class="block border"
          :key="block.id"
          :class="{'border-emerald-500': block == props.builder.selectedElement.block}"
          v-for="(block) in section.blocks"
          @click="$emit('selectBlock', block)">
          <p v-show="!block.components.length">
            block : {{ block.id }}
          </p>

          <component v-for="(component, index) in block.components" 
            :key="index" :is="getComponent(component)" 
            :component="component"
            @click="$emit('selectComponent', component)"
          ></component>
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

const sectionStyles = (section) => {
  console.log(section.styles.width)
  return {
    gridTemplateColumns: `repeat(${section.columns}, 1fr)`,
    backgroundColor: section.styles.backgroundColor,
    padding: section.styles.padding + 'px',
    margin: section.styles.margin + 'px',
    gap: section.styles.gap + 'px',
    borderWidth: `${section.styles.border.width}px`,
    borderStyle: section.styles.border.style,
    borderColor: section.styles.border.color,
    width: section.styles.height.unit == 'auto' ? section.styles.width.unit : section.styles.width.value + section.styles.width.unit,
    height: section.styles.height.unit == 'auto' ? section.styles.height.unit : section.styles.height.value + section.styles.height.unit
  }
}

</script>
  