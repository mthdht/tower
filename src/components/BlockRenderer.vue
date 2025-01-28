<template>
    <div>
      <button @click="console.log(props.builder)">log builder</button>
      <div
        v-for="(section, index) in props.builder.sections"
        :key="section.id"
        class="section border border-gray-300 rounded p-4 mb-4 grid"
        @click="$emit('selectSection', section)"
        :style="`grid-template-columns: repeat(${section.columns}, 1fr);`"
        :class="{'border-sky-500': section == props.builder.selectedElement.section}"
      >

        <div class="block border"
          :key="block.id"
          :class="{'border-emerald-500': block == props.builder.selectedElement.block}"
          v-for="(block, index) in section.blocks"
          @click="$emit('selectBlock', block)">
          block : {{ block.id }}
        </div>
      
      </div>
    </div>
</template>
  
<script setup>

const props = defineProps({
    builder: Object
});   


</script>
  