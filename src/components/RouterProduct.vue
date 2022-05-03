<template>
    <router-link :to="{ name: 'product', params: { id: idProduct }}">
        <slot></slot>
    </router-link>
</template>
<script>
export default {
    props: ['idProduct']
}
</script>