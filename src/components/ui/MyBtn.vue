<template>
	<button :type="type" class="btn" :class="myclass">
       <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        myclass: {type: String},
        type: {type: String, default: 'button'}
    }
}
</script>