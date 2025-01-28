import { reactive, ref } from "vue";

export const useBuilder = () => {
    const builder = reactive({
        sections: [],
        sectionId: 1,
        sectionOrder: 1,
        blockId: 1,
        selectedElement: {section: null, block: null}
    })

    const addSection = (layout) => {
        let section = {
            ...layout, 
            id: builder.sectionId, 
            blocks: createBlocks(layout)
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
    
    const selectSection = (section) => {
        builder.selectedElement.section = section
        if (builder.selectedElement.block.sectionId !== section.id) {
            builder.selectedElement.block = section.blocks[section.blocks.length - 1]
        }
    }
    
    const selectBlock = (block) => {
        builder.selectedElement.block = block
    }

    return { builder, addSection, selectSection, selectBlock}
}
