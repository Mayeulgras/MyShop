<template>
 <div>
          <header class="headerHome">
            
            <img src="../img/logo.png" alt="" width="50" height="50">
            
            <p>
              <input type="text" name="recherche" id="recherche" onKeyUp="rechercheMAJ()" autocomplete="off" placeholder="Rechercher"/>  
            </p>  
            <button><a href="/about">Log in</a></button>  
          </header>
          <div class="prod">
          <section class="list" v-if="getStatus == 'done'">
            <article class="produit" v-for="products in getProducts.data['hydra:member']" :key="products.name">
              <h1 class="info">{{ products.name }}</h1>
              <h1 class="info">{{ products.description }}</h1>
              <h1 class="info">{{ products.price + ' $'}}</h1>
              <h1 class="info">{{ products.categories}}</h1>
              <button>Edit</button>
              <button @click="deleteProduct(products.id)">Delete</button>

            </article>
          </section>
          </div>
          <form @submit.prevent="">
      <div class="container">
        <hr>
        <label for="email"><b>Name</b></label>
        <input type="text" placeholder="" name="email" id="Name" required>
        <label for="psw"><b>Description</b></label>
        <input type="text" placeholder="" name="psw" id="Description" required>
        <label for="psw-repeat"><b>price</b></label>
        <input type="text" placeholder="" name="psw-repeat" id="Price" required>
        <label for="psw-repeat"><b>Categories</b></label>
        <input type="text" placeholder="" name="psw-repeat" id="Categories" required>
        <hr>
        <button type="submit" class="registerbtn" @click ="registProducts">Post product</button>
      </div>
    </form>
        </div>
</template>



<script>

import { mapActions, mapState } from "pinia";
import { useProductsStore } from "../stores/counter";
import Axios from 'axios'
export default {
  data (){
    return {
      products: [],
    };
    
  },
  mounted() {
    this.fetchProducts
  },
  computed: {
    ...mapActions(useProductsStore, ["fetchProducts"]),
    ...mapState(useProductsStore, ["getProducts", "getStatus"])
  },
  methods: {
    registProducts() {
        const Name = document.getElementById('Name').value;
        const Description = document.getElementById('Description').value;
        const Price = parseFloat(document.getElementById('Price').value);
        const Categories = document.getElementById('Categories').value.split(',').map(category => category.trim());
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDAyMDg5MzgsImV4cCI6MTcwMDIxMjUzOCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Im1heWV1bC5ncmFzQGVwaXRlY2guZGlnaXRhbCJ9.tiLcf6qUJJah_fwlzYbgana_5p4kSksMZcvouJb6GqOSj6BW5J3R-vgVo9ds6D7yqQYMdQyc0aiVutJcqN0_HMuThIyQqAFM5-ff8GkoLuLk1nI746IKJvczgJ4OeViY_ZuficBof2Fn7oiI0gRMWZPDntrulCa1gMiv3tMgkP6fn20y84fmrGXGctfgTRwGIhMtu9Da_SHMnMJdN8-aYYc4OM7uyd2_0crU-WbmmrGbTzhAxIY-GEInIDIcr1QpHwEk2cKUOjWF4CHtAmk5d1RKNvauyLB0JwVfoa3NM8r2AqtQeKhMuCWW54ypzUkdHpKwVpuWhVuotR3ceQN1Og';
        console.log({
            name: Name,
            description: Description,
            price: Price,
            categories: Categories
          });
        Axios.post('http://localhost/api/products', {
          name: Name,
          description: Description,
          price: Price,
          categories: Categories
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          // Gérer la réponse de l'API si nécessaire
          console.log('Produit ajouté avec succès', response.data);
        })
        .catch(error => {
          // Gérer l'erreur de l'API si nécessaire
          console.error('Erreur lors de l\'ajout du produit', error.message, error.response.data);
        });
      },
      deleteProduct(id) {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDAyMDg5MzgsImV4cCI6MTcwMDIxMjUzOCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Im1heWV1bC5ncmFzQGVwaXRlY2guZGlnaXRhbCJ9.tiLcf6qUJJah_fwlzYbgana_5p4kSksMZcvouJb6GqOSj6BW5J3R-vgVo9ds6D7yqQYMdQyc0aiVutJcqN0_HMuThIyQqAFM5-ff8GkoLuLk1nI746IKJvczgJ4OeViY_ZuficBof2Fn7oiI0gRMWZPDntrulCa1gMiv3tMgkP6fn20y84fmrGXGctfgTRwGIhMtu9Da_SHMnMJdN8-aYYc4OM7uyd2_0crU-WbmmrGbTzhAxIY-GEInIDIcr1QpHwEk2cKUOjWF4CHtAmk5d1RKNvauyLB0JwVfoa3NM8r2AqtQeKhMuCWW54ypzUkdHpKwVpuWhVuotR3ceQN1Og'; // Remplacez par votre token d'authentification
        fetch(`http://localhost/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log('Produit supprimé avec succès');
          // Gérer la réponse de l'API si nécessaire
        })
        .catch(error => {
          console.error('Erreur lors de la suppression du produit', error);
          // Gérer l'erreur de l'API si nécessaire
        });
      },
    }
  }
  
;
</script>



<style>
/* .conteneur {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 50px;
    border-color:white;
} */
body{
  background-color: white;
  color:black;
  display: flex;
}

.info{
  padding: 1%;
  width: 200px;
  border:1px solid black;
}
.list{

}
.produit{
  display: flex;
  flex-direction: row;
}
.conteneur {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;

}

.prod{
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 5%;
  margin-left: 5%;

}

.headerHome{
  display: flex;
  justify-content: space-around;
}

.menuGauche{
  margin-top: 10%;
  margin-left: 5%;
  display: flex;
  align-items: start;
  flex-direction: column;
}

.conteneur {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 50px;

}
  .text{
    
  }
  .deroulant2 {
    display: block;
    border-bottom: 2px solid #d3d3d3;
    /* width: 100%; */
    margin-bottom: 15%;
    padding-bottom: 2%;
}
</style>