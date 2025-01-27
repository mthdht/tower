<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <Sidebar @add-block="addBlock" @add-section="addSection"/>
        
        <!-- Main Area -->
        <div class="flex-1 bg-gray-50 p-6">
            <BlockRenderer @select-block="selectBlock"/>
            <pre>

                {{  builder  }}
            </pre>
        </div>

        <!-- Panneau de configuration -->
        <div v-if="selectedBlock" class="w-64 bg-white shadow-md p-4">
            <h2 class="text-lg font-bold mb-4">Configuration</h2>
            <div v-if="selectedBlock.type === 'text'">
                <label class="block mb-2">Texte :</label>
                <input
                type="text"
                v-model="selectedBlock.content"
                class="w-full border rounded p-2"
                />
            </div>
            <div v-if="selectedBlock.type === 'image'">
                <label class="block mb-2">Image URL :</label>
                <input
                type="text"
                v-model="selectedBlock.src"
                class="w-full border rounded p-2"
                />
            </div>
            <div v-if="selectedBlock.type === 'button'">
                <label class="block mb-2">Label du bouton :</label>
                <input
                type="text"
                v-model="selectedBlock.labelText"
                class="w-full border rounded p-2"
                />
            </div>
            <div v-if="selectedBlock.type === 'card'">
                <label class="block mb-2">Image URL :</label>
                <input
                    type="text"
                    v-model="selectedBlock.imageSrc"
                    class="w-full border rounded p-2 mb-4"
                />

                <label class="block mb-2">Titre :</label>
                <input
                    type="text"
                    v-model="selectedBlock.title"
                    class="w-full border rounded p-2 mb-4"
                />

                <label class="block mb-2">Description :</label>
                <textarea
                    v-model="selectedBlock.description"
                    class="w-full border rounded p-2"
                ></textarea>
            </div>

            <div v-if="selectedBlock.type === 'columns'">
                <label class="block mb-2">Nombre de colonnes :</label>
                <input
                    type="number"
                    v-model="selectedBlock.columnCount"
                    class="w-full border rounded p-2 mb-4"
                    min="1"
                    max="6"
                />
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { ref} from 'vue';
import Sidebar from './Sidebar.vue';
import BlockRenderer from './BlockRenderer.vue';
import { builder } from './store.js'

const selectedBlock = ref(null);

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


</script>
  
<style scoped>
/* Ajoute un style basique pour une meilleure visualisation */
</style>
