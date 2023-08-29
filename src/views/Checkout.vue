<template>
    
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32" style="margin-top: 100px;">
        <div class="px-4 pt-8">
            <p class="text-xl font-medium">Order Summary</p>
            <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div v-for="cart in getKeranjang" key="cart.id" class="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        src="https://i.pinimg.com/564x/b0/80/6e/b0806e214ad519140afc96cc069df9e5.jpg"
                        alt="" />
                    <div class="flex w-full flex-col px-4 py-4">
                        <span class="font-semibold">{{ cart.name }}</span>
                        <span class="float-right text-gray-400">{{ cart.qty }} pcs</span>
                        <p class="text-lg font-bold">Rp.{{ cart.regular_price * cart.qty }}</p>
                    </div>
                </div>
            </div>

            <p class="mt-8 text-lg font-medium">Delivery Option</p>
            <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input class="peer hidden" id="radio_1" type="radio" value="standard" v-model="deliveryType" />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_1">
                        <img class="w-14 object-contain"
                            src="data:image/png;base64,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"
                            alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">JNE - Standard</span>
                            <p class="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                        </div>
                    </label>
                </div>
                <div class="relative">
                    <input class="peer hidden" id="radio_2" type="radio" value="express" v-model="deliveryType" />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_2">
                        <img class="w-14 object-contain"
                            src="data:image/png;base64,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"
                            alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">J&T - Express</span>
                            <p class="text-slate-500 text-sm leading-6">Delivery: 1-2 Days</p>
                        </div>
                    </label>
                </div>
            </form>

            <p class="mt-8 text-lg font-medium">Shipping Methods</p>

            <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input class="peer hidden" id="radio_3" type="radio" value="cash_on_delivery" v-model="paymentType" />
                    <span
                        class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label
                        class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                        for="radio_3">
                        <img class="w-14 object-contain"
                            src="data:image/png;base64,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"
                            alt="" />
                        <div class="ml-5 mt-4">
                            <span class="mt-2 font-semibold">Cash On Delivery</span>
                            <!-- <p class="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p> -->
                        </div>
                    </label>
                </div>

            </form>

        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium">Payment Details</p>
            <p class="text-gray-400">Complete your order by providing your payment details.</p>
            <div class="">
              
                

               

                <!-- Total -->
                <div class="mt-6 border-t border-b py-2">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Subtotal</p>
                        <p class="font-semibold text-gray-900">Rp. {{ subTotal() }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Shipping</p>
                        <p class="font-semibold text-gray-900">Rp. {{ shipping() }}</p>
                    </div>
                </div>
                <div class="mt-6 flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Total</p>
                    <p class="text-2xl font-semibold text-gray-900">Rp {{ totalHarga() }}</p>
                </div>
            </div>
            <router-link to="/success">
            <!-- <router-link></router--link> -->
            <button @click="performCheckout"
                class="mt-4 mb-8 w-full rounded-md  px-6 py-3 font-medium text-white" style="background-color: #5588A3;">Done</button>
            </router-link>
        </div>
    </div>
    <footer class="bg-white">
        <div class="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div>
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6" style="margin-top: -20px;">
                        <a href="/" class="flex items-center">
                            <img class="h-12 object-cover" style="height: 30px;" src="../assets/img/bm.PNG"
                                alt="Store Logo">
                            <h3 class="text-2xl font-medium " style="color: black;">
                                &nbsp; BEMIRA
                            </h3>

                        </a>
                    </div>

                    <p class="mt-4 max-w-xs text-gray-500">
                        BemiraShop is one of the online buying and selling sites in Indonesia which has the goal of making it easier for every community in Indonesia.
                    </p>

                    <ul class="mt-8 flex gap-6">
                        <li>
                            <a href="/" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:opacity-75">
                                <span class="sr-only">Facebook</span>

                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="/" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:opacity-75">
                                <span class="sr-only">Instagram</span>

                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="/" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:opacity-75">
                                <span class="sr-only">Twitter</span>

                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="/" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:opacity-75">
                                <span class="sr-only">GitHub</span>

                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a href="/" rel="noreferrer" target="_blank" class="text-gray-700 transition hover:opacity-75">
                                <span class="sr-only">Dribbble</span>

                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                    <div>
                        <p class="font-medium text-gray-900">BemiraShop</p>

                        <ul class="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Intellectual Property Rights
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Blog
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Blogging Partners
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Review
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p class="font-medium text-gray-900">Categories</p>

                        <ul class="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Categories 1
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Categories 2
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Categories 3
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p class="font-medium text-gray-900">Helpful Links</p>

                        <ul class="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Contact
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    FAQs
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Live Chat
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p class="font-medium text-gray-900">Help and Guide</p>

                        <ul class="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Accessibility
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    BemiraShop Care
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Terms and Conditions
                                </a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-700 transition hover:opacity-75">
                                    Privacy Policy
                                </a>
                            </li>


                        </ul>
                    </div>
                </div>
            </div>

            <p class="text-xs text-gray-500">
                &copy; 2023. BemiraShop. All rights reserved.
            </p>
        </div>
    </footer>
</template>

<script>
let ongkir = 7000;




import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            paymentType: '',
            deliveryType: '',
        };
    },
    computed: {
        ...mapGetters('keranjang', ['getKeranjang']),
        ...mapState('keranjang',['order'])

    },
    methods: {
        ...mapActions('keranjang', ['fetchKeranjang']),
        ...mapActions('product', ['fetchProduk']),
        ...mapActions('product', ['fetchProduk']),
        ...mapActions('keranjang', ['getUserAddress']),
        // total price
        subTotal() {
            this.total = this.getKeranjang.reduce((acc, produk) => {
                return acc + parseFloat(produk.regular_price * produk.qty);
            }, 0);
            return this.total.toFixed(2);
        },
        totalHarga() {

            this.total = this.getKeranjang.reduce((acc, product) => {
                return acc + parseFloat(product.regular_price * product.qty) + ongkir;

            }, 0);

            return this.total.toFixed(2);

        },
        shipping() {

            this.total = this.getKeranjang.reduce((acc, product) => {
                return acc + parseFloat(product.min_qty * 7000);

            }, 0);

            return this.total.toFixed(2);

        },

        async performCheckout() {
            // Collect the product IDs to be checked out
            const cartItemIds = this.getKeranjang.map(product => product.cart_id);
            // Get user address
            const userAddressResponse = await this.$store.dispatch('keranjang/getUserAddress');
            const userAddressId = userAddressResponse.data[0].id;

            const checkoutPayload = {
                shippingAddress: userAddressId,
                billingAddress: userAddressId,
                paymentType: this.paymentType,
                deliveryType: this.deliveryType,
                cart_item_ids: cartItemIds
            };

            // Call the checkout action with the collected IDs and user address
            // await this.$store.dispatch('keranjang/checkoutCart', checkoutPayload);
            // console.log(this.order)
            // this.$router.push(`/success/${this.order.order_code}`);
        }
    },
    beforeMount() {
        this.fetchProduk();
    },

    mounted() {
        this.fetchKeranjang();
    },
}
</script>