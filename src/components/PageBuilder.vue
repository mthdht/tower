<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <Sidebar @add-section="addSection"/>
        
        <!-- Main Area -->
        <div class="flex-1 bg-gray-50 p-6">
            <BlockRenderer @selectSection="selectSection" @selectBlock="selectBlock"/>
            <pre>
                {{  builder  }}
            </pre>
        </div>

        <!-- Panneau de configuration -->
        <div v-if="selectedElement" class="w-64 bg-white shadow-md p-4">
            <h2 class="text-lg font-bold mb-4">Configuration</h2>
            {{  selectedElement }}
        </div>

    </div>
</template>
  
<script setup>
import { ref} from 'vue';
import Sidebar from './Sidebar.vue';
import BlockRenderer from './BlockRenderer.vue';
import { builder } from './store.js'

const selectedElement = ref({section: null, block: null});

//ajoute une section
const addSection = (layout) => {
    let section = {
        ...layout, 
        id: builder.sectionId, 
        blocks: createBlocks(layout)
    }
    builder.sections.push(section)
    builder.currentSection = section
    builder.sectionId++
    builder.sectionOrder++
}

const createBlocks = (layout) => {
    const blocks = []
    let order = 1
    for (let index = 0; index < layout.columns; index++) {
        blocks.push({
            id: builder.blockId,
            sectionId: builder.sectionId,
            order: order,
            components: [],
        })
        order++
        builder.blockId++
    }
    builder.currentBlock = blocks[0]

    return blocks
}

const selectSection = (section) => {
    selectedElement.value.section = section
    builder.currentSection = section
    if (builder.currentBlock.sectionId !== section.id) {
        builder.currentBlock = section.blocks[0]
    }
}

const selectBlock = (block) => {
    selectedElement.value.block = block
    builder.currentBlock = block
}



</script>
  
<style scoped>
/* Ajoute un style basique pour une meilleure visualisation */
</style>
