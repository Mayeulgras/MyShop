import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      products: [],
      status: "init"
    }
  },
  getters: {
    getProducts: state => state.products,
    getStatus: state => state.status
  },
  actions: {


    async fetchProducts(){
      this.status = "fetching"
      this.products = await axios ({url : "http://localhost/api/products", method: "get"})
      this.status = "done"
    }


  }
})
// export const deleteProducts = 
