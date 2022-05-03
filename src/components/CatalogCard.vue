<template>
    <div class="col-12">
        <div class="row">
            <div class="mb-3 mt-3" :class="getClassCol" v-for="pr in products" :key="pr.id">
                <div class="catalog__card card-body" :class="{'card-body_list': isList}">
                    <app-router-product class="card-body__link" :idProduct="pr.id">
                        <img src="@/assets/img/card-img.png" :alt="pr.title" class="card-body__img img-fluid">
                        <h3 v-if="!isList" class="card-body__name">{{ pr.title }}</h3>
                    </app-router-product>
                    <div :class="isList ? 'card-body__right' : 'card-body__bottom'">
                        <template v-if="isList">
                            <h3  class="card-body__name">{{ pr.title }}</h3>
                            <div class="card-body__descr">
                                {{descr}}
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                            </div>
                        </template>    
                        <div class="card-body__price">Цена: {{ pr.price }}  ₽</div>
                        <div class="card-body__action">
                            <app-my-btn @click="productBtnAction(pr.id)" :myclass="'btn-icon btn-icon_list'">
								{{productBtnLabel(pr.id)}} <img src="@/assets/img/icon-cart.svg" alt="cart" class="btn-icon__img">
							</app-my-btn>
                        </div>
                    </div>
                </div>
            </div>	
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import AppMyBtn from '@/components/ui/MyBtn';
import AppRouterProduct from '../components/RouterProduct.vue';
export default {
    components: {AppMyBtn, AppRouterProduct},
    props: {
        view: {type: String, required: true},
        products: {type: Array, required: true},
        descr: {type: String}
    },
    computed: {
        ...mapGetters('cart', [ 'inCart' ]),
        isList(){
            return this.view == 'list' ? true : false;
        },
        getClassCol(){
            return this.isList ? 'col-12': 'col-6 col-md-4 col-lg-3';
        }
    },
    methods: {
        ...mapActions('cart', [ 'addProduct', 'removeProduct' ]),
        productBtnAction(id){
            this.inCart(id) ? this.removeProduct(id) : this.addProduct(id)
        },
        productBtnLabel(id){
            return this.inCart(id) ? 'Удалить из' : 'Добавить в';
        }
    }
}
</script>