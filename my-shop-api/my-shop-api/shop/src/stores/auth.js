import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCategoriesStore = defineStore('categories', {
  state: () => {
    return {
      categories: [],
      status: "init"
    }
  },
  getters: {
    getCategories: state => state.categories,
    getStatus: state => state.status
  },
  actions: {


    async fetchProducts(){
      this.status = "fetching"
      this.categories = await axios ({url : "http://localhost/api/categories", method: "get"})
      this.status = "done"
    }


  }
})
// export