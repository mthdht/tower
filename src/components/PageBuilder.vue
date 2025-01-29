<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <Sidebar @add-section="addSection" @add-component="addComponent"/>
        
        <!-- Main Area -->
        <div class="flex-1 bg-gray-50 p-6">
            <BlockRenderer @selectSection="selectSection" @selectBlock="selectBlock" @selectComponent="selectComponent" :builder="builder"/>
            <pre>
                {{  builder  }}
            </pre>
        </div>

        <!-- Panneau de configuration -->
        <div v-if="builder.selectedElement" class="w-64 bg-white shadow-md p-4">
            <h2 class="text-lg font-bold mb-4">Configuration</h2>
            <div class="config-tabs grid grid-cols-3 gap-2 mb-8">
                <button @click="configPanelToShow = 'section'">section</button>
                <button @click="configPanelToShow = 'block'">block</button>
                <button @click="configPanelToShow = 'component'">component</button>
            </div>

            <div class="section-tab space-y-4" v-show="configPanelToShow == 'section'">
                <h3>section config</h3>

                <p v-show="!builder.selectedElement.section">
                    please select a section or create one !
                </p>

                <div v-if="builder.selectedElement.section">
                    
                    <div class="mb-4">
                        <label for="layout" class="block">Layout (columns)</label>
                        <div class="flex justify-center gap-4 items-center">
                            <button class="size-8 p-2 border flex justify-center items-center" 
                                @click="removeBlock" 
                                :disabled="builder.selectedElement.section.blocks.length <= 1">-</button>

                            <div class="flex justify-center border p-2 size-10">{{  builder.selectedElement.section.columns }}</div>
                            
                            <button class="size-8 p-2 border flex justify-center items-center" @click="addBlock">+</button>
                        </div>
                    </div>

                     
                    <div class="mb-4">
                        <label for="bg-color" class="block">Background Color</label>
                        <input type="color" v-model="builder.selectedElement.section.styles.bgColor" id="bg-color" class="w-full p-2 border rounded"/>
                    </div>

                     
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <div>
                            <label for="padding" class="block">Padding</label>
                            <input type="text" v-model="builder.selectedElement.section.styles.padding" id="padding" class="w-full p-2 border rounded" placeholder="e.g. 20"/>
                        </div>
                        <div>
                            <label for="margin" class="block">Margin</label>
                            <input type="text" v-model="builder.selectedElement.section.styles.margin" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                        </div>
                    </div>
                </div> 

                <pre>{{ builder.selectedElement }}</pre>
            </div>

            <div class="block-tab space-y-4" v-show="configPanelToShow == 'block'">
                <h3>block config</h3>

                <p v-show="!builder.selectedElement.block">
                    please select a block or create one !
                </p>

                <pre>{{ builder.selectedElement.block }}</pre>
            </div>

            <div class="component-tab space-y-4" v-show="configPanelToShow == 'component'">
                <h3>component config</h3>

                <p v-show="!builder.selectedElement.component">
                    please select a component or create one !
                </p>

                <pre>{{ builder.selectedElement.component }}</pre>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
import BlockRenderer from './BlockRenderer.vue';
import { useBuilder } from './store.js'

const { builder, addSection, selectSection, selectBlock, selectComponent, addComponent, addBlock, removeBlock } = useBuilder()

const configPanelToShow = ref('section')

</script>
  
<style scoped>
/* Ajoute un style basique pour une meilleure visualisation */
</style>
