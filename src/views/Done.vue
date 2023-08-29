<template>
    <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8" style="margin-top: 100px;">

  <div class="overflow-y-hidden rounded-lg border">
    <div class="overflow-x-auto" v-for="cart in getKeranjang" key="cart.id">
      <table class="w-full">
        <thead>
          <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th class="px-5 py-3"></th>
            
            <th class="px-5 py-3">Product</th>
            <th class="px-5 py-3">Quantity</th>
            <th class="px-5 py-3">Unit Price</th>
            <th class="px-5 py-3">Total</th>
          </tr>
        </thead>
        <tbody class="text-gray-500">
          <tr>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap"></p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap"><img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cc0a35b0-b3b8-427c-bf2c-334e0c4beeca/sb-logo-skate-t-shirt-LBBxZV.png" alt=""></p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">{{ cart.qty }}</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">{{ cart.regular_price }}</p>
            </td>

            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap">{{ cart.regular_price * cart.qty}}</p>
            </td>
          </tr>
          <tr>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap"></p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap">2</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Author</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Active</span>
            </td>
          </tr>
          <tr>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap"></p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap">Administrator</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Editor</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span class="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">Suspended</span>
            </td>
          </tr>
          <tr>
            <td class="bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap"></p>
            </td>
            <td class="bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap">Administrator</p>
            </td>
            <td class="bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Administrator</p>
            </td>
            <td class="bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td class="bg-white px-5 py-5 text-sm">
              <span class="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Inactive</span>
            </td>
          </tr>
          <tr>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap"></p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap">Administrator</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Editor</p>
            </td>
            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p class="whitespace-no-wrap">Sep 28, 2022</p>
            </td>

            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span class="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">Suspended</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
      <span class="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
      <div class="mt-2 inline-flex sm:mt-0">
        <button class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
        <button class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
      </div>
    </div>
  </div>
</div>

</template>


<script>
let ongkir = 7000;




import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            paymentType: '',
            deliveryType: '',
        };
    },
    computed: {
        ...mapGetters('keranjang', ['getKeranjang']),

    },
    methods: {
        ...mapActions('keranjang', ['fetchKeranjang']),
        ...mapActions('produk', ['fetchProduk']),
        ...mapActions('produk', ['fetchProduk']),
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

       
    },
    beforeMount() {
        this.fetchProduk();
    },

    mounted() {
        this.fetchKeranjang();
    },
}
</script>