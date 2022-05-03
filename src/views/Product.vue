<template >
	<div v-if="hasProduct" class="product">
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-5">
					<div class="product__left">
						<img src="@/assets/img/card-img.png" :alt="product.title" class="product__img">
					</div>
				</div>
				<div class="col-12 col-md-7">
					<div class="product__right">
						<h1 class="product__title title">{{ product.title }}</h1>
						<div class="product__price">
							Цена: {{ product.price }}
						</div>
						<div class="product__content">
							{{descrProduct}}
						</div>
						<div class="product__action">
							<app-my-btn @click="productBtnAction(product.id)" :myclass="'product__btn'">
								{{productBtnLabel}}
							</app-my-btn>
							<router-link class="product__btn btn" :to="{name: 'cart'}">Перейти в корзину</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
	<div v-else>
		<app-404/>
	</div>
</template>

<script>
	import App404 from './E404';
	import AppMyBtn from '../components/ui/MyBtn.vue'
	import {mapGetters, mapActions} from 'vuex';
	export default {
		components: { App404, AppMyBtn },
		computed: {
			...mapGetters('cart', ['inCart']),
			...mapGetters('products', ['oneItem', 'descrProduct']),
			hasProduct(){
				return this.product !== undefined
			},
			id(){
				return parseInt(this.$route.params.id);
			},
			product(){
				return this.oneItem(this.id);
			},
			productBtnLabel(){
				return this.inCart(this.id) ? 'Удалить из корзины' : 'Добавить в корзину'
			}
		},
		methods: {
			...mapActions('cart', [ 'addProduct', 'removeProduct']),
			productBtnAction(id){
				this.inCart(id) ? this.removeProduct(id) : this.addProduct(id)
			}
		}
	}
</script>