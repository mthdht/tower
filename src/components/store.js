import { reactive } from "vue";

const builder = reactive({
    sections: [],
    sectionId: 1,
    sectionOrder: 1,
    blockId: 1,
    selectedElement: {section: null, block: null, component: null}
})

export const useBuilder = () => {
    const addSection = (layout) => {
        let section = {
            ...layout, 
            id: builder.sectionId, 
            blocks: createBlocks(layout),
            styles: {
                gap: 12
            }
        }
        builder.sections.push(section)
        builder.selectedElement.section = section
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
        builder.selectedElement.block = blocks[blocks.length - 1]
        
        return blocks
    }

    const addBlock = () => {
        builder.selectedElement.section.columns++
        builder.selectedElement.section.blocks.push({
            id: builder.blockId,
            sectionId: builder.sectionId,
            order: builder.selectedElement.section.blocks.length + 1,
            components: [],
        })
        builder.blockId++
    }
    
    const removeBlock = () => {
        if (!builder.selectedElement.section || builder.selectedElement.section.blocks.length <= 0) return;
        builder.selectedElement.section.columns--
        builder.selectedElement.section.blocks.pop();
        if (!builder.selectedElement.section.blocks.length) {
            builder.selectedElement.section.blocks.push({
                id: builder.blockId,
                sectionId: builder.selectedElement.section.id,
                order: 1,
                components: [],
            })
            builder.selectedElement.section.columns++
            builder.blockId++
        }
    };

    const selectSection = (section) => {
        builder.selectedElement.section = section
        if (builder.selectedElement.block?.sectionId !== section.id) {
            builder.selectedElement.block = section.blocks[section.blocks.length - 1]
        }
    }
    
    const selectBlock = (block) => {
        builder.selectedElement.block = block
        if (builder.selectedElement.component?.blockId !== block.id) {
            builder.selectedElement.component = block.components[block.components.length - 1]
        }
    }

    const selectComponent = (component) => {
        builder.selectedElement.component = component
    }

    const addComponent = (component) => {
        if (!builder.selectedElement.block) {
            console.log('select a block')
            return
        }
        builder.selectedElement.block.components.push({
            ...component,
            blockId: builder.selectedElement.block.id
        })
        builder.selectedElement.component = component
    }

    return { builder, addSection, selectSection, selectBlock, selectComponent, addComponent, addBlock, removeBlock }
}
