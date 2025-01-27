<template>
    <div>
      <div
        v-for="(section, index) in builder.sections"
        :key="section.id"
        class="section border border-gray-300 rounded p-4 mb-4 grid"
        @click="$emit('selectSection', section)"
        :style="`grid-template-columns: repeat(${section.columns}, 1fr);`"
        :class="{'border-sky-500': section == builder.currentSection}"
      >

        <div class="block border border-red-300"
          :key="block.id"
          :class="{'border-emerald-500': block == builder.currentBlock}"
          v-for="(block, index) in section.blocks"
          @click.self="$emit('selectBlock', block)">
          block : {{ block.id }}
        </div>
      
      </div>
    </div>
</template>
  
<script setup>
import { computed } from 'vue';
import { builder } from './store.js'

const props = defineProps({
    
});   


</script>
  