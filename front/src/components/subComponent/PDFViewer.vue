<template>
    <iframe
        id="pdf"
        :style="'width: 100%; height: calc(100vh - 114px )'"
    ></iframe>
</template>


<script>
import { PDFDocument } from 'pdf-lib'
import { mapState, mapActions, mapMutations } from "vuex"

export default {
    name: 'PDFViewer',
    components: {
    },
    props: {
    },
    computed: {
        ...mapState("stories", {
            story: (state) => state.story,
            pdf: (state) => state.pdf,
        }),
    },
    data () {
        return {
        }
    },
    async mounted() {
        const pdfArray = new Buffer.from(this.story.file)
        console.log(pdfArray)
        const pdf = new Uint8Array (pdfArray)
        console.log(pdf)
        const pdfDoc = await PDFDocument.load(pdf, { updateFieldAppearances: false })
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
        document.getElementById('pdf').src = pdfDataUri
    },
    methods: {
    }
}
</script>