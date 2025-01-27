import { reactive, ref } from "vue";

export const builder = reactive({
    sections: [],
    sectionId: 1,
    sectionOrder: 1,
    blockId: 1,
    currentSection: ref(),
    currentBlock: ref()
})

