import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        story: {},
        stories: [],
        pdf: Buffer
    },
    mutations: {
        set_story(state, story) {
            state.story = story
        },
        set_stories(state, stories) {
            state.stories = stories
        },
        set_pdf(state, pdf) {
            state.pdf = pdf
        }
    },
    actions: {
        async fetch_pdf({ commit }, url) {
            try {
                const { data } = await apiCall({
                    method: "GET",
                    route: `/stories/pdf?url=${url}`
                })
                return data
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async fetch_stories({ commit }) {
            try {
                const { data } = await apiCall({
                    method: "GET",
                    route: `/stories`,
                })
                commit("set_stories", data)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async fetch_story({ commit }, story_id) {
            commit("set_story", {})
            try {
                const { data } = await apiCall({
                    method: "GET",
                    route: `/stories/${story_id}`,
                })
                console.log({ id: data.id, title: data.title, file: new Buffer.from(data.hex, "hex") })
                commit("set_story", { id: data.id, title: data.title, file: new Buffer.from(data.hex, "hex") })
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async delete_story({ commit }, story_id) {
            try {
                await apiCall({
                    method: "DELETE",
                    route: `/stories/${story_id}`
                })
                commit("set_story", {})
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async create_story({ commit }, params) {
            try {
                const { data } = await apiCall({
                    method: 'POST',
                    route: `/stories?title=${params.title}`,
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    },
                    body: params.pdf,
                    isBuffer: true
                })
                commit("set_story", { id: data })
                return data
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {},
}

// function formDataToBuffer(formData) {
//     let dataBuffer = new Buffer(0)
//     let boundary = formData.getBoundary()
//     for(let i = 0, len = formData._streams.length; i < len; i++) {

//         if(typeof formData._streams[i] !== 'function') {

//             dataBuffer = this.bufferWrite(dataBuffer, formData._streams[i])

//             // The item have 2 more "-" in the boundary. No clue why
//             // rfc7578 specifies (4.1): "The boundary is supplied as a "boundary"
//             //    parameter to the multipart/form-data type.  As noted in Section 5.1
//             //    of [RFC2046], the boundary delimiter MUST NOT appear inside any of
//             //    the encapsulated parts, and it is often necessary to enclose the
//             //    "boundary" parameter values in quotes in the Content-Type header
//             //    field."
//             // This means, that we can use the boundary as unique value, indicating that
//             // we do NOT need to add a break (\r\n). These are added by data-form package.
//             //
//             // As seen in this example (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST#Example)
//             // the boundary is preceded by 2x "-". If thus --Boundary exists, do not add the break.
//             if(typeof formData._streams[i] !== 'string' || formData._streams[i].substring(2, boundary.length + 2) !== boundary) {
//                 dataBuffer = bufferWrite(dataBuffer, "\r\n")
//             }
//         }
//     }

//     // Close the request
//     dataBuffer = bufferWrite(dataBuffer, '--' + boundary + '--')

//     return dataBuffer
// }


// function bufferWrite(buffer, data) {

//     let addBuffer
//     if(typeof data === 'string') {
//         addBuffer = Buffer.from(data)
//     } else if(typeof data === 'object' && Buffer.isBuffer(data)) {
//         addBuffer = data
//     }

//     return Buffer.concat([buffer, addBuffer])
// }