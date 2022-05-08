export default {
	namespaced: true,
	state: {
		items: [],		
		descr: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..."
	},
	getters: {
		allItems: state => state.items,
		oneItem: state => id => state.items.find(item => item.id === id),
		descrProduct: state => state.descr
	},
	mutations: {
		SET_ITEMS(state, products){
			state.items = products;
		},
		SORT_PRODUCT(state, key){
			switch (key){
				case 'name_asc':
					state.items.sort(sortByTitleAsc);
					break;
				case 'name_desc': 
					state.items.sort(sortByTitleDesc);
					break;
				case 'price_asc':
					state.items.sort(sortByPriceAsc);
					break;
				case 'price_desc': 
					state.items.sort(sortByPriceDesc);
					break;
				default:
					state.items.sort(sortDefault);
			}
		}
	},
	actions: {
		async loadProducts({ commit }){
			fetch('https://faceprog.ru/reactcourseapi/products/all.php')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					commit('SET_ITEMS', data);
				});
		},
		sortProduct({commit}, key){
			commit('SORT_PRODUCT', key);
		}
	}
}

let sortByTitleAsc = function(d1,d2) { return (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 : -1;}
let sortByTitleDesc = function(d1,d2) { return (d1.title.toLowerCase() < d2.title.toLowerCase()) ? 1 : -1;}
let sortByPriceAsc = function(d1, d2){ return (d1.price > d2.price) ? 1 : -1;}
let sortByPriceDesc = function(d1,d2){ return (d1.price < d2.price) ? 1 : -1;}
let sortDefault = function(d1,d2) {return (d1.id > d2.id) ? 1 : -1;}