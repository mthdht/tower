<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <Sidebar @add-section="addSection" @add-component="addComponent"/>
        
        <!-- Main Area -->
        <div class="flex-1 bg-gray-50 p-6 overflow-auto">
            <BlockRenderer @selectSection="selectSection" @selectBlock="selectBlock" @selectComponent="selectComponent" :builder="builder"/>
            <pre>
                {{  builder  }}
            </pre>
        </div>

       <ConfigPanel></ConfigPanel>

    </div>
</template>
  
<script setup>
import Sidebar from './Sidebar.vue';
import BlockRenderer from './BlockRenderer.vue';
import { useBuilder } from './store.js'
import ConfigPanel from './ConfigPanel.vue';

const { builder, addSection, selectSection, selectBlock, selectComponent, addComponent, addBlock, removeBlock } = useBuilder()



</script>
  
<style scoped>
/* Ajoute un style basique pour une meilleure visualisation */
</style>
