import axios from "axios";

const keranjang = {
  namespaced: true,
  state: {
    keranjang: [],
    address: [],
    order:{}
  },

  getters: {
    getKeranjang: (state) => state.keranjang,
    getAddress: (state) => state.address,
    getOrder: (state)=> state.order,
  },
  actions: {
    async fetchKeranjang({ commit }) {
      try {
        // const token = localStorage.getItem('token');
        const dataKeranjang = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/carts",
          {
            temp_user_id: null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(dataKeranjang.data.cart_items.data);
        commit("SET_KERANJANG", dataKeranjang.data.cart_items.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async addKeranjang({ commit }, productId) {
      try {
        const response = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/carts/add",
          {
            variation_id: productId,
            qty: 1,
            temp_user_id: null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("ADD_KERANJANG", response.data);
        console.log(response.data);
        alert('Successfully Added To Cart!')
      } catch (error) {
        console.log(error);
      } finally {
        const dataKeranjang = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/carts",
          {
            temp_user_id: null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(dataKeranjang.data.cart_items.data);
        commit("SET_KERANJANG", dataKeranjang.data.cart_items.data);
      }
    },

    async deleteKeranjang({ commit, dispatch }, cartId) {
      try {
        const response = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/carts/destroy",
          {
            cart_id: cartId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response.data.message);
        alert("Successfully Cleared Cart!")
        dispatch("fetchKeranjang");
      } catch (error) {
        alert("error removing item from cart");
        console.log(error);
      }
    },
    async editqty({ commit, dispatch }, data) {
      try {
        const response = axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/carts/change-quantity",
          {
            cart_id: data.cart_id,
            type: data.type,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        alert("Api Addcart Eror");
      } finally {
        const dataKeranjang = await axios.post(
          "https://ecommerce.olipiskandar.com/api/v1/carts",
          {
            temp_user_id: null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(dataKeranjang.data.cart_items.data);
        commit("SET_KERANJANG", dataKeranjang.data.cart_items.data);
      }
    },
    async getUserInfo({ state }) {
      try {
        const response = await axios.get(
          "https://ecommerce.olipiskandar.com/api/v1/user/info",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        return response.data.user;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async getUserAddress({ commit, state }) {
      try {
        const response = await axios.get(
          "https://ecommerce.olipiskandar.com/api/v1/user/addresses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        commit("SET_ADDRESS", response.data.data[0]);
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async checkoutCart(
      { commit, dispatch },
      {
        shippingAddress,
        billingAddress,
        paymentType,
        deliveryType,
        cart_item_ids,
      }
    ) {
      try {
        const response = await axios.post(
          `https://ecommerce.olipiskandar.com/api/v1/checkout/order/store`,
          {
            shipping_address_id: shippingAddress,
            billing_address_id: billingAddress,
            payment_type: paymentType,
            delivery_type: deliveryType,
            cart_item_ids: cart_item_ids,
            transactionId: null,
            receipt: null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        commit("SET_ORDER", response.data);
        dispatch("fetchKeranjang");
      } catch (error) {
        alert("Error");
        console.log(error);
      }
    },
  
    async getUserOrder({ commit, dispatch },
      {
        shippingAddress,
        billingAddress,
        paymentType,
        deliveryType,
        cart_item_ids,
      }
    ) {
      try {
        const response = await axios.get(
          `https://ecommerce.olipiskandar.com/api/v1/user/orders`,
          {
            shipping_address_id: shippingAddress,
            billing_address_id: billingAddress,
            payment_type: paymentType,
            delivery_type: deliveryType,
            cart_item_ids: cart_item_ids,
            transactionId: null,
            receipt: null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        console.log(response.data);
        dispatch("fetchKeranjang");
      } catch (error) {
        alert("Error");
        console.log(error);
      }
    },
  },

  mutations: {
    SET_KERANJANG(state, keranjang) {
      state.keranjang = keranjang;
    },
    SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
  },
};

export default keranjang;