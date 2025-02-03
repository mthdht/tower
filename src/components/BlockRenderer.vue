<template>
    <div>
      <button @click="console.log(props.builder)">log builder</button>

      <div
        v-for="(section) in props.builder.sections"
        :key="section.id"
        class="section border border-gray-300 rounded mb-4 grid hover:ring-1 hover:ring-emerald-500"
        @click="$emit('selectSection', section)"
        :style="sectionStyles(section)"
        :class="{
          'ring ring-sky-500': section == props.builder.selectedElement.section,
          ' mx-auto': section.styles.container
        }"
      >
        <div class="block border"
          :key="block.id"
          :class="{'border-emerald-500': block == props.builder.selectedElement.block}"
          v-for="(block) in section.blocks"
          @click="$emit('selectBlock', block)">
          <p v-show="!block.components.length" class="text-center">
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
  return {
    gridTemplateColumns: `repeat(${section.columns}, 1fr)`,
    backgroundColor: section.styles.backgroundColor,
    paddingTop: section.styles.padding.linked ? section.styles.padding.all + 'px' : section.styles.padding.top + 'px',
    paddingBottom: section.styles.padding.linked ? section.styles.padding.all + 'px' : section.styles.padding.bottom + 'px',
    paddingLeft: section.styles.padding.linked ? section.styles.padding.all + 'px' : section.styles.padding.left + 'px',
    paddingRight: section.styles.padding.linked ? section.styles.padding.all + 'px' : section.styles.padding.right + 'px',
    marginTop: section.styles.margin.linked ? section.styles.margin.all + 'px' : section.styles.margin.top + 'px',
    marginBottom: section.styles.margin.linked ? section.styles.margin.all + 'px' : section.styles.margin.bottom + 'px',
    marginLeft: section.styles.margin.linked ? section.styles.margin.all + 'px' : section.styles.margin.left + 'px',
    marginRight: section.styles.margin.linked ? section.styles.margin.all + 'px' : section.styles.margin.right + 'px',
    gap: section.styles.gap + 'px',
    borderWidth: `${section.styles.border.width}px`,
    borderStyle: section.styles.border.style,
    borderColor: section.styles.border.color,
    borderTopWidth: section.styles.border.linked ? section.styles.border.all + 'px' : section.styles.border.top + 'px',
    borderBottomWidth: section.styles.border.linked ? section.styles.border.all + 'px' : section.styles.border.bottom + 'px',
    borderLeftWidth: section.styles.border.linked ? section.styles.border.all + 'px' : section.styles.border.left + 'px',
    borderRightWidth: section.styles.border.linked ? section.styles.border.all + 'px' : section.styles.border.right + 'px',
    width: section.styles.width.unit == 'auto' ? section.styles.width.unit : section.styles.width.value + section.styles.width.unit,
    height: section.styles.height.unit == 'auto' ? section.styles.height.unit : section.styles.height.value + section.styles.height.unit
  }
}

</script>
  