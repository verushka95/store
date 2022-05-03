import { createRouter, createWebHistory } from 'vue-router'

import AppProductsList from '@/views/ProductsList';
import AppProduct from '@/views/Product';
import AppCart from '@/views/Cart';
import AppCheckout from '@/views/Checkout';
import AppE404 from '@/views/E404';
import AppSuccess from '@/views/Success';

const routes = [
	{
		name: 'catalog',
		path: '/',
		component: AppProductsList
	},
	{
		name: 'cart',
		path: '/cart',
		component: AppCart
	},
	{
		name: 'checkout',
		path: '/order',
		component: AppCheckout
	},
	{
		name: 'product',
		path: '/product/:id',
		component: AppProduct
	},
	{
		name: 'success',
		path: '/success',
		component: AppSuccess
	},
	{
		path: '/:any', // .*
		name: '404',
		component: AppE404
	}
];

export default createRouter({
	routes,
	history: createWebHistory()
});
