<template>
    <button v-if="inCart(pr.id)" @click="removeProduct(pr.id)" type="button" class="btn btn-icon">
        Удалить из<img src="@/assets/img/icon-cart.svg" alt="удалить" class="btn-icon__img">
    </button>
</template>
<script>
export default {
    
}
</script>