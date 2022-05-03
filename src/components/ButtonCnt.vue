<template>
	<button @click="editCnt(product.id, product.cnt)" type="button" class="btn-cnt" :disabled="disabled">
        <slot></slot>   
    </button>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    props: {
        product: {type: Object, required: true},
        plus: {type: Boolean}
    },
    computed:{
        cnt(){
            return this.product.cnt;
        },
        rest(){
            return this.product.rest;
        },
        disabled(){
            return this.plus ? this.cnt == this.rest : this.cnt == 1;
        }
    },
    methods:{
        ...mapActions('cart', ['setCnt']),
        editCnt(id, cnt){
            if(this.plus){
                this.setCnt({id: id, cnt: cnt + 1});   
            }
            else{
                this.setCnt({id: id, cnt: cnt - 1});   
            }
        }
    }
}
</script>