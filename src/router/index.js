import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue"; 
import Cart from "../views/Cart.vue"; 
import Checkout from "../views/Checkout.vue";
import Contact from "../views/Contact.vue";
import Brand from "../views/Brand.vue"; 
import Category from "../views/Category.vue"; 
import Produk from "../views/Produk.vue";
import SingleProduk from "../views/SingleProduk.vue";
import Profile from "../views/Profile.vue";
import Success from "../views/Success.vue";
import FooterComponent from "../views/FooterComponent.vue";



function cekToken(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("token")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "FooterComponent",
    component: FooterComponent,
  },

  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    beforeEnter: cekToken,

  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/brand",
    name: "Brand",
    component: Brand,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/produk",
    name: "Produk",
    component: Produk,
  },
  {
    path: "/produk/:id",
    name: "SingleProduk",
    component: SingleProduk,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: cekToken,
    
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
  {
    path: "/success/:order_code",
    name: "SuccessOrderCode",
    component: Success,
    props: true
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;