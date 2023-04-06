<template>
    <iframe
        id="pdf"
        :style="'width: 100%; height: calc(100vh - 114px )'"
    />
</template>


<script>
import { PDFDocument } from 'pdf-lib'
import { mapState } from "vuex"

export default {
    name: 'PDFViewer',
    computed: {
        ...mapState("stories", {
            story: (state) => state.story,
            pdf: (state) => state.pdf,
        }),
    },
    async mounted() {
        const pdfArray = new Buffer.from(this.story.file)
        const pdf = new Uint8Array (pdfArray)
        const pdfDoc = await PDFDocument.load(pdf, { updateFieldAppearances: false })
        pdfDoc.setTitle(this.story.title || 'Story')
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
        document.getElementById('pdf').src = pdfDataUri
    },
    methods: {
    }
}
</script>