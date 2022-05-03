<template>
    <div class="select-view__icon" :class="setActiveClass" @click="selectView(view)">
        <img :src="getImageSrc" :alt="img">
    </div>
</template>
<script>
export default {
    props: {
        view: {type: String, required: true},
        curview: {type: String, required: true},
        img: {type: String, required: true}
    },
    computed: {
        setActiveClass(){
            return this.curview == this.view ? 'select-view__icon_active' : ''
        },
        getImageSrc() {
            const file = this.img.toLowerCase();
            return require(`@/assets/img/${file}`);
        }
    },
    methods: {
        selectView(view){
            this.$emit('selectView', view);
		}
    }
}
</script>