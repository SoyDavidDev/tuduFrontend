<template>
    <div class="image">
    <img
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :class="type"
        :style="radius"
        :attrs="attrs"
    >
    <source
        v-for="(source, index) in sources"
        :key="index"
        :srcset="source.srcset"
        :media="source.media"
        :type="source.type"
    >
    </div>
</template>

<script>
export default {
    name: 'BasicImage',
    props: {
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: 'auto'
        },
        height: {
            type: [String, Number],
            default: 'auto'
        },
        sources: {
            type: Array,
            default: () => []
        },
        attrs: {
            type: Object,
            default: () => {}
        },
        type: {
            type: String,
            default: 'image'
        },
        radius: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="sass" src="@/assets/sass/pages/about/_how-we-work.sass" scoped>
</style>