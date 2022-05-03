<template>
	<div v-if="!isEmpty" class="checkout">
		<h1 class="checkout__title title">Оформление заказа</h1>
		<form class="checkout__order order" @submit.prevent="submitForm">
			<div class="order__info form-group">
				<app-input :myclass="'order__input'" :typeField="'text'" v-model="fields.name" :placeholder="'Ваше имя'" :required="true"  />
				<app-input :myclass="'order__input'" :typeField="'email'" v-model="fields.email" :placeholder="'Ваш email'" :required="true"  />
				<app-input :myclass="'order__input'" :typeField="'tel'" v-model="fields.phone" :placeholder="'Ваш телефон'" :required="true"  />
			</div>
			<div class="order__info order__info_bottom">
				<div class="order__pay">
					<div class="order__title">Способ оплаты</div>
					<app-radio-btn class="order__radio" :id="'payment-1'" :label="'Наличные (в офисе)'" :name="'payment'" :valueInput="'Наличные'" v-model="fields.payment"/>
					<app-radio-btn class="order__radio" :id="'payment-2'" :label="'Пластиковая карта (в офисе)'" :name="'payment'" :valueInput="'Карта'" v-model="fields.payment"/>
					<app-radio-btn class="order__radio" :id="'payment-3'" :label="'Безналичный расчет'" :name="'payment'" :valueInput="'Безналичные'" v-model="fields.payment"/>
				</div>
				<div class="order__delivery">
					<div class="order__title">Способ доставки</div>
					<app-radio-btn class="order__radio" :id="'delivery-1'" :label="'Самовывоз'" :name="'delivery'" :valueInput="'Самовывоз'" v-model="fields.delivery"/>
					<app-radio-btn class="order__radio" :id="'delivery-2'" :label="'Курьером по СПб - в пределах КАД'" :name="'delivery'" :valueInput="'Курьером'" v-model="fields.delivery"/>
					<app-radio-btn class="order__radio" :id="'delivery-3'" :label="'Доставка почтой России в регионы РФ'" :name="'delivery'" :valueInput="'Доставка'" v-model="fields.delivery"/>
				</div>
			</div>
			<div class="order__progress progress">
				<div class="order__pr-bar progress-bar" :style="progressStyle"></div>
			</div>
			<app-my-btn :myclass="'order__submit'" :type="'submit'" :disabled="isDisabled" @click.prevent="sendOrder">
				Отправить
			</app-my-btn>	
		</form>	
	</div>
	<div v-else class="checkout">
		Для оформления заказа сначала добавьте товары в корзине, перейти в <router-link :to="{ name: 'catalog' }">каталог</router-link>
	</div>
</template>

<script>
	import AppInput from '@/components/ui/MyInput.vue';
	import AppRadioBtn from '@/components/ui/MyRadioBtn.vue';
	import AppMyBtn from '@/components/ui/MyBtn.vue';
	import {mapGetters, mapActions} from 'vuex';
	export default {
		components: { AppInput, AppRadioBtn, AppMyBtn },
		data(){
			return {
				fields: {
					name: '',
					email: '',
					phone: '',
					payment: '',
					delivery: ''
				},
				pattern: {
					name: /^[A-ZА-Я]{2,30}$/i,
					email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
					phone: /^[0-9+]{5,14}$/,
					payment: /.+/,
					delivery: /.+/
				}
			}
		},
		computed: {
			lengthFields(){
				return Object.keys(this.fields).length;
			},
			lengthFilledFields(){
				let arrFields = Object.keys(this.fields);
				arrFields = arrFields.filter((item) => {
					if(this.validField(item)){
						return item
					}
				});
				return arrFields.length;
			},
			progress(){
				return  this.lengthFilledFields / this.lengthFields * 100;
			},
			progressStyle(){
				return 'width:' + this.progress + '%';
			},
			...mapGetters('cart', ['numberProducts']),
			isEmpty(){
				return this.numberProducts == 0;
			},
			isDisabled(){
				return this.lengthFilledFields < 5
			}
		},
		methods: {
			...mapActions('cart', ['clearCart']),
			validField(field){
				return this.pattern[field].test(this.fields[field]);
			},
			sendOrder(){
				this.$router.push({
					name: 'success'
				});
				this.clearCart();
			}
		}
	}
</script>