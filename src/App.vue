<template>
	<div @click.self="toggleModal">
		<header class="header">
			<div class="container">
				<div class="row">
					<div class="col-5 col-md-6">
						<div class="header__logo">
							<router-link :to="{name: 'catalog'}">
								<img src="./assets/img/logo.svg" alt="logo">
							</router-link>
						</div>
					</div>
					<div class="col-7 col-md-6">
						<div class="header__cart-info cart-info" @click="toggleModal">
							<div class="cart-info__count">
								В корзине: {{ numberProducts }}
							</div>
							<div class="cart-info__total">
								Итого: {{totalPrice}}
							</div>
						</div>
						<div class="header__cart-modal cart-modal" v-show="showModal">
							<div v-if="numberProducts" class="cart-modal__info">
								<div class="cart-modal__products">
									<div class="cart-modal__product" v-for="pr in itemsDetailed" :key="pr.id">
										<img src="./assets/img/product.png" alt="product">
										<div class="cart-modal__info-product">
											<div class="cart-modal__title">
												{{pr.title}}
											</div>
											<div class="cart-modal__price">
												<span class="cart-modal__label">
													Цена:
												</span>
												<span class="cart-modal__value">
													{{pr.price}}
												</span>
											</div>
											<div class="cart-modal__quantity">
												<span class="cart-modal__label">
													Кол-во:
												</span>
												<span class="cart-modal__value">
													<app-button-cnt :product="pr" :plus = "false">-</app-button-cnt>
													<span class="cart-modal__count">
														{{pr.cnt}}
													</span>
													<app-button-cnt :product="pr" :plus = "true">+</app-button-cnt>
												</span>
											</div>
										</div>
									</div>
								</div>
								<div class="cart-modal__total">
									Итого: {{totalPrice}}
								</div>
								<div class="cart-modal__actions">
									<app-my-btn @click="followLink('cart')" :myclass="'cart-modal__btn'">Перейти в корзину</app-my-btn>
									<app-my-btn @click="followLink('checkout')" :myclass="'cart-modal__btn'">Оформить заказ</app-my-btn>
								</div>
							</div>
							<div v-else class="cart-modal__info">
								Ваша корзина пуста!
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<main class="main">
			<section>
				<div class="container">
					<div class="row">
						<div class="col-12">
							<router-view />
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
	import AppButtonCnt from './components/ButtonCnt.vue';
	import AppMyBtn from './components/ui/MyBtn.vue';
	import {mapGetters} from 'vuex';
	export default {
		components: {AppButtonCnt, AppMyBtn},
		data: () => ({
			showModal: false
		}),
		computed: {
			...mapGetters('cart', ['totalPrice', 'numberProducts', 'itemsDetailed']),
		},
		methods: {
			toggleModal(){
				this.showModal = !this.showModal;
			},
			followLink(link){
				this.$router.push({
					name: link
				});
				this.showModal = false;
			}
		},
		watch:{
			'$route.path'() {
				this.showModal = false;
			}
		}
	}
</script>