<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <Sidebar @add-section="addSection" @add-component="addComponent"/>
        
        <!-- Main Area -->
        <div class="flex-1 bg-gray-50 p-6">
            <BlockRenderer @selectSection="selectSection" @selectBlock="selectBlock" :builder="builder"/>
            <pre>
                {{  builder  }}
            </pre>
        </div>

        <!-- Panneau de configuration -->
        <div v-if="builder.selectedElement" class="w-64 bg-white shadow-md p-4">
            <h2 class="text-lg font-bold mb-4">Configuration</h2>
            <pre>

                {{  builder.selectedElement }}
            </pre>
        </div>

    </div>
</template>
  
<script setup>
import Sidebar from './Sidebar.vue';
import BlockRenderer from './BlockRenderer.vue';
import { useBuilder } from './store.js'

const { builder, addSection, selectSection, selectBlock, addComponent } = useBuilder()

</script>
  
<style scoped>
/* Ajoute un style basique pour une meilleure visualisation */
</style>
