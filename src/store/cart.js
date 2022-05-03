const BASEURL = 'https://faceprog.ru/reactcourseapi/cart/';

export default {
	namespaced: true,
	state: {
		items: [],
		token: null
	},
	getters: {
		inCart: state => id => state.items.some(item => item.id == id),
		numberProducts: state => state.items.length,
		itemsDetailed: (state, getters, rootState, rootGetters) => {
			return state.items.map(item => {
				let product = rootGetters['products/oneItem'](item.id);
				return { ...product, cnt: item.cnt };
			})
		},
		totalPrice: (state, getters) => getters.itemsDetailed.reduce((t, i) => t + i.price * i.cnt, 0),
	},
	mutations: {
		LOAD_CART(state, {cart, token}){
			state.items = cart;
			state.token = token;
		},
		ADD_PRODUCT(state, id){
			state.items.push({ id, cnt: 1 });
		},
		EDIT_CNT(state, {id, cnt}){
			let item = state.items.find(item => item.id == id);
			item.cnt = cnt;
		},
		REMOVE_PRODUCT(state, id){
			state.items = state.items.filter(item => item.id != id);
		},
		CLEAR_CART(state){
			state.items = [];
		}
	},
	actions: {
		async loadCart({commit}){
			let oldToken = localStorage.getItem('CART__TOKEN');
			let response = await fetch(`${BASEURL}load.php?token=${oldToken}`);		
			let { cart, token, needUpdate } = await response.json();
			
			if(needUpdate){
				localStorage.setItem('CART__TOKEN', token);
			}
			commit('LOAD_CART', { cart, token });
			
		},
		async addProduct({ commit, getters, state}, id){
			if(!getters.inCart(id)){
				let response = await fetch(`${BASEURL}add.php?token=${state.token}&id=${id}`);
				let res = await response.json();
				if(res){
					commit('ADD_PRODUCT', id);
				}

			}
		},
		async removeProduct({ commit, getters, state }, id){
			if(getters.inCart(id)){
				let response = await fetch(`${BASEURL}remove.php?token=${state.token}&id=${id}`);
				let res = await response.json();
				if(res){
					commit('REMOVE_PRODUCT', id);
				}
			}
		},
		async setCnt ({commit, getters, state}, {id, cnt}){
			if(getters.inCart(id)){
				let response = await fetch(`${BASEURL}change.php?token=${state.token}&id=${id}&cnt=${cnt}`);
				let res = await response.json();
				if(res){
					commit('EDIT_CNT', {id, cnt: cnt});
				}

			}
		},
		async clearCart({commit, state}){
			let response = await fetch(`${BASEURL}clean.php?token=${state.token}`);
			let res = await response.json();
			if(res){
				commit('CLEAR_CART');
			}
		}
	}
}
