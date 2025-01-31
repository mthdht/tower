<template>
     <!-- Panneau de configuration -->
     <div v-if="configPanel.showPanels" class="w-96 bg-white shadow-md p-2 overflow-auto">
            <h2 class="text-lg font-bold mb-4">Configuration</h2>
            <div class="config-tabs grid grid-cols-3 gap-2 mb-8">
                <button @click="configPanel.panel = 'section'">section</button>
                <button @click="configPanel.panel = 'block'">block</button>
                <button @click="configPanel.panel = 'component'">component</button>
            </div>

            <div class="section-tab space-y-4" v-show="configPanel.panel == 'section'">
                <p v-show="!builder.selectedElement.section">
                    please select a section or create one !
                </p>

                <div v-if="builder.selectedElement.section" class="space-y-8">
                    <!-- Layout of section eg. number of columns and gap between-->
                    <div class="layout-config border">

                        <h3 class="font-semibold text-xl flex justify-between cursor-pointer bg-slate-100 p-4" @click="configPanel.section.showLayout = !configPanel.section.showLayout">
                            Layout 
                            <span class="">+</span>
                        </h3>
                        
                        <div class="space-y-4 p-4" v-show="configPanel.section.showLayout">
                            <div class="columns-config flex gap-2 items-center justify-between">
                                <label class="font-semibold">Columns: </label>

                                <div class="flex justify-center gap-4 items-center">
                                    <button class="size-8 p-2 border flex justify-center items-center" 
                                    @click="removeBlock" 
                                    :disabled="builder.selectedElement.section.blocks.length <= 1">-</button>
                                    
                                    <div class="flex justify-center border p-2 size-10">{{  builder.selectedElement.section.columns }}</div>
                                    
                                    <button class="size-8 p-2 border flex justify-center items-center" @click="addBlock">+</button>
                                </div>
                            </div>

                            <div class="gap-config flex gap-2 items-center justify-between">
                                <label class="font-semibold">Gap: </label>
                                <div class="flex justify-center gap-4 items-center">
                                    <button class="size-8 p-2 border flex justify-center items-center" 
                                        @click="builder.selectedElement.section.styles.gap--" 
                                        :disabled="builder.selectedElement.section.styles.gap <= 0">-</button>
                                    
                                    <input type="text" 
                                        name="columns" 
                                        id="section-columns" 
                                        v-model="builder.selectedElement.section.styles.gap"
                                        class="size-10 p-2 border">
                                    
                                    <button class="size-8 p-2 border flex justify-center items-center" 
                                        @click="builder.selectedElement.section.styles.gap++" >+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="colors-config border">
                        <h3 class="font-semibold text-xl flex justify-between cursor-pointer p-4 bg-slate-100" @click="configPanel.section.showColors = !configPanel.section.showColors">
                            Colors 
                            <span class="">+</span>
                        </h3>

                        <div class="space-y-4 p-4" v-show="configPanel.section.showColors">
                            <div class="gap-config flex gap-2 items-center justify-between">
                                <label for="bg-color" class="block">Background Color: </label>
                                <input type="color" v-model="builder.selectedElement.section.styles.backgroundColor" id="bg-color" class="h-10 p-px border rounded"/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="box-config border">
                        <h3 class="font-semibold text-xl flex justify-between cursor-pointer p-4 bg-slate-100" @click="configPanel.section.showBoxModel = !configPanel.section.showBoxModel">
                            Box model 
                            <span class="">+</span>
                        </h3>

                        <div class="p-4" v-show="configPanel.section.showBoxModel">
                            <div class="grid grid-cols-2 gap-x-2 gap-y-8">
                                <div class="space-y-2 width-config">
                                    <label class="block font-semibold">Width:</label>
                                    <div class="relative overflow-hidden rounded">
                                        <input type="text" 
                                            v-model="builder.selectedElement.section.styles.width.value" 
                                            id="width" 
                                            class="w-full p-2 border disabled:bg-slate-200 disabled:text-slate-300" 
                                            placeholder="e.g. 20"
                                            :disabled="builder.selectedElement.section.styles.width.unit == 'auto'"/>

                                        <select class="absolute right-0 top-0 h-[42px] bg-slate-300 w-15 justify-center focus-visible:outline-0" v-model="builder.selectedElement.section.styles.width.unit">
                                            <option :value="unit" 
                                                v-for="unit in configPanel.units" 
                                                class="flex justify-center">{{unit}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="space-y-2 height-config">
                                    <label class="block font-semibold">height:</label>
                                    <div class="relative overflow-hidden rounded">
                                        <input type="text" 
                                            v-model="builder.selectedElement.section.styles.height.value" 
                                            id="padding" 
                                            class="w-full p-2 border disabled:bg-slate-200 disabled:text-slate-300" 
                                            placeholder="e.g. 20"
                                            :disabled="builder.selectedElement.section.styles.height.unit == 'auto'"/>
                                        <select class="absolute right-0 top-0 h-full bg-slate-300 w-15 justify-center focus-visible:outline-0" v-model="builder.selectedElement.section.styles.height.unit">
                                            <option :value="unit" 
                                                v-for="unit in configPanel.units" 
                                                class="flex justify-center">{{unit}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="space-y-2 col-span-2 padding-config">
                                    <div class="label flex justify-between">
                                        <label class="font-semibold">Padding:</label>
                                        <div class="switch relative w-10 h-5 inline-block">
                                            <span class="-ml-8">All: </span> 
                                            <input type="checkbox"
                                                class="opacity-0 w-0 h-0 peer"
                                                v-model="builder.selectedElement.section.styles.padding.linked">
                                            
                                            <span class="slider round absolute cursor-pointer inset-0 bg-slate-300 transition-transform duration-500 rounded-full peer-checked:bg-sky-500"
                                                @click="builder.selectedElement.section.styles.padding.linked = !builder.selectedElement.section.styles.padding.linked"></span>
                                        </div>
                                    </div>

                                    <div class="space-y-2" v-show="builder.selectedElement.section.styles.padding.linked">
                                        <input type="text" v-model="builder.selectedElement.section.styles.padding.all" id="padding" class="w-full p-2 border rounded" placeholder="e.g. 20"/>
                                    </div>

                                    <div class="grid grid-cols-2 gap-2" v-show="!builder.selectedElement.section.styles.padding.linked">
                                        <div class="space-y-2">
                                            <label class="block">Top:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.padding.top" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Bottom:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.padding.bottom" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Left:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.padding.left" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Right:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.padding.right" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-2 col-span-2 margin-config">
                                    <div class="label flex justify-between">
                                        <label class="font-semibold">margin:</label>
                                        <div class="switch relative w-10 h-5 inline-block">
                                            <span class="-ml-8">All: </span> 
                                            <input type="checkbox"
                                                class="opacity-0 w-0 h-0 peer"
                                                v-model="builder.selectedElement.section.styles.margin.linked">
                                            
                                            <span class="slider round absolute cursor-pointer inset-0 bg-slate-300 transition-transform duration-500 rounded-full peer-checked:bg-sky-500"
                                                @click="builder.selectedElement.section.styles.margin.linked = !builder.selectedElement.section.styles.margin.linked"></span>
                                        </div>
                                    </div>

                                    <div class="space-y-2" v-show="builder.selectedElement.section.styles.margin.linked">
                                        <input type="text" v-model="builder.selectedElement.section.styles.margin.all" id="margin" class="w-full p-2 border rounded" placeholder="e.g. 20"/>
                                    </div>

                                    <div class="grid grid-cols-2 gap-2" v-show="!builder.selectedElement.section.styles.margin.linked">
                                        <div class="space-y-2">
                                            <label class="block">Top:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.margin.top" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Bottom:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.margin.bottom" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Left:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.margin.left" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Right:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.margin.right" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-2 col-span-2 border-config">
                                    <div class="label flex justify-between">
                                        <label class="font-semibold">Border:</label>
                                        <div class="switch relative w-10 h-5 inline-block">
                                            <span class="-ml-8">All: </span> 
                                            <input type="checkbox"
                                                class="opacity-0 w-0 h-0 peer"
                                                v-model="builder.selectedElement.section.styles.border.linked">
                                            
                                            <span class="slider round absolute cursor-pointer inset-0 bg-slate-300 transition-transform duration-500 rounded-full peer-checked:bg-sky-500"
                                                @click="builder.selectedElement.section.styles.border.linked = !builder.selectedElement.section.styles.border.linked"></span>
                                        </div>
                                    </div>

                                    <div class="space-y-2" v-show="builder.selectedElement.section.styles.border.linked">
                                        <input type="text" v-model="builder.selectedElement.section.styles.border.all" id="margin" class="w-full p-2 border rounded" placeholder="e.g. 20"/>
                                    </div>

                                    <div class="grid grid-cols-2 gap-2" v-show="!builder.selectedElement.section.styles.border.linked">
                                        <div class="space-y-2">
                                            <label class="block">Top:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.border.top" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Bottom:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.border.bottom" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Left:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.border.left" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="block">Right:</label>
                                            <input type="text" v-model="builder.selectedElement.section.styles.border.right" id="margin" class="w-full p-2 border rounded" placeholder="e.g."/>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label class="block font-semibold">border color:</label>
                                    <input type="color" v-model="builder.selectedElement.section.styles.border.color" class="h-10 w-full border rounded"/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> 

                <pre>{{ builder.selectedElement }}</pre>
            </div>

            <div class="block-tab space-y-4" v-show="configPanel.panel == 'block'">
                <h3>block config</h3>

                <p v-show="!builder.selectedElement.block">
                    please select a block or create one !
                </p>

                <pre>{{ builder.selectedElement.block }}</pre>
            </div>

            <div class="component-tab space-y-4" v-show="configPanel.panel == 'component'">
                <h3>component config</h3>

                <p v-show="!builder.selectedElement.component">
                    please select a component or create one !
                </p>

                <pre>{{ builder.selectedElement.component }}</pre>
            </div>
        </div>
</template>

<script setup>
import { reactive } from 'vue';

import { useBuilder } from './store.js';

const { builder, removeBlock, addBlock } = useBuilder()

const configPanel = reactive({
    showPanels: true,
    panel: 'section',
    units: ['px', '%', 'auto','em', 'rem', 'ch', 'vw', 'vh', 'cm', 'mm', 'in', 'pt', 'pc', 'vmin', 'vmax'],
    section: {
        showLayout: true,
        showColors: false,
        showBoxModel: false,
    },
    
})
</script>

<style>
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider:before {
  transform: translateX(16px);
}</style>