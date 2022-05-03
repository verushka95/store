<template>
	<div class="cart">
		<h1 class="cart__title title">Оформление заказа</h1>
		<template v-if="hasProducts">
			<div class="cart__info">
				<div class="cart__table-wrapper">
					<table class="cart__product-table product-table table">
						<thead class="product-table__thead">
							<tr class="product-table__tr">
								<td v-for="td in tdHead" :key="td.id" class="product-table__td" :class="td.class">{{ td.value }}</td>
							</tr>
						</thead>
						<tbody class="product-table__body">
							<tr v-for="pr in products" :key="pr.id" class="product-table__tr">
								<td class="product-table__td">
									<app-my-btn @click="removeProduct(pr.id)" :myclass="'product-table__remove'">&times;</app-my-btn>
								</td>
								<td class="product-table__td product-table__td_img">
									<app-router-product :idProduct="pr.id"><img src="@/assets/img/product.png" alt="product"></app-router-product>
								</td>
								<td class="product-table__td product-table__td_bold">
									<app-router-product :idProduct="pr.id">{{ pr.title }}</app-router-product>
								</td>
								<td class="product-table__td">{{ pr.price }}</td>
								<td class="product-table__td">
									<div class="product-table__cnt">
										<app-button-cnt :product="pr" :plus = "false">-</app-button-cnt>
										<span class="product-table__cnt-val">{{ pr.cnt }} </span>
										<app-button-cnt :product="pr" :plus = "true">+</app-button-cnt>
									</div>
								</td>
								<td class="product-table__td">{{ pr.price * pr.cnt }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="cart__total">
					Сумма заказа: {{totalPrice}}
				</div>
				<router-link class="cart__btn btn" :to="{ name: 'checkout' }">
					Оформить заказ
				</router-link>
			</div>
		</template>
		<template v-else>
			<div class="cart__info">В корзине нет товаров</div>
		</template>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex';
	import AppButtonCnt from '../components/ButtonCnt.vue';
	import AppMyBtn from '../components/ui/MyBtn.vue';
	import AppRouterProduct from '../components/RouterProduct.vue';
	export default {
		components: { AppButtonCnt, AppMyBtn, AppRouterProduct },
		data(){
			return {
				tdHead: [
					{id: 0,value:'',class:''},
					{id: 1, value:'',class:'product-table__td_thead-img'},
					{id: 2,value: 'Товар', class: ''},
					{id: 3,value: 'Цена', class: ''},
					{id: 4,value: 'Количество', class: ''},
					{id: 5,value: 'Итого', class: ''}
				]
			}
		},
		computed: {
			...mapGetters('cart', { products: 'itemsDetailed', totalPrice: 'totalPrice'}),
			hasProducts(){
				return this.products.length>0 ? true : false;
			}
		},
		methods: {
			...mapActions('cart', [ 'removeProduct', 'setCnt']),
		}
	}
</script>