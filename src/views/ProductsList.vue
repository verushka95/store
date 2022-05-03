<template>
	<div class="catalog">
		<h1 class="catalog__title title">Смартфоны</h1>
		<div class="row">
			<div class="col-12">
				<div class="catalog__action">
					<div class="catalog__select-view select-view">
						<app-select-view :view="'list'" :curview="viewList" :img="'list-icon.svg'" @selectView="changeView($event)" />
						<app-select-view :view="'grid'" :curview="viewList" :img="'grid-icon.svg'" @selectView="changeView($event)" />
					</div>
					<div class="catalog__sort sort">
						<div class="sort__title">Сортировка:</div>
						<select name="sort" class="sort__select" v-model="sortSelect">
							<option :value="item.value" v-for="item in sort" :key="item.id">{{ item.label}}</option>
						</select>
					</div>
				</div>
			</div>
			<app-catalog-card :view="viewList" :products="productList" :descr="descrProduct" />
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import AppSelectView from '@/components/SelectView';
import AppMyBtn from '@/components/ui/MyBtn';
import AppCatalogCard from '@/components/CatalogCard.vue';
export default {
	components: { AppSelectView, AppMyBtn, AppCatalogCard },
	data(){
		return {
			viewList: 'grid',
			sort: [
				{id: 0, label: 'По умолчанию', value: ''},
				{id: 1, label: 'По названию: А - Я', value: 'name_asc'},
				{id: 2, label: 'По названию: Я - А', value: 'name_desc'},
				{id: 3, label: 'По цене: сначала дешевле', value: 'price_asc'},
				{id: 4, label: 'По цене: сначала дороже', value: 'price_desc'},
			],
			sortSelect: ''
		}
	},
	computed: {
		...mapGetters('products', { productList: 'allItems', descrProduct: 'descrProduct' }),
	},
	methods: {
		...mapActions('products', ['sortProduct']),
		changeView(view){
			this.viewList = view
		}
	},
	watch:{
		sortSelect(newSortSelect){
			this.sortProduct(newSortSelect);
		}
	}
}

</script>