import {createRouter , createWebHistory} from  'vue-router'
import Home from '../components/maincomponent/home.vue'
import Product from '../components/maincomponent/product.vue'
import Contact from '@/components/maincomponent/contact.vue'
import Productdetails from '@/components/maincomponent/productdetails.vue'
import Cart from '@/components/maincomponent/cart.vue'
import Login from '@/components/maincomponent/login.vue'

const routes =[
    
        { 
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/products',
            component: Product
        },
        {
            path: '/contact',
            component: Contact
        },
        {
            path: '/product/:id', 
            component: Productdetails,
            props: true 
        },
        {
            path: '/cart', 
            component: Cart 
        } 
]
const router = createRouter({
    routes:routes,
    history:createWebHistory()
});
export default router;