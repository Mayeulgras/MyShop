<template>
 <div>
          <header class="headerHome">
            
            <img src="../img/logo.png" alt="" width="50" height="50">
            
            <p>
              <input type="text" name="recherche" id="recherche" onKeyUp="rechercheMAJ()" autocomplete="off" placeholder="Rechercher"/>  
            </p>  
            <button><a href="/about">Log in</a></button> 
            <button><a href="/categories">categories</a></button>  

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
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDAyMzk3OTksImV4cCI6MTcwMDI0MzM5OSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Im1heWV1bC5ncmFzQGVwaXRlY2guZGlnaXRhbCJ9.MiGWtLoUcvQ7ke_JmWo0Ad0icSA9twRzpPZawi52HtRvk6YnU6_0Vbeb_R4JZF0-Hxj9_SDIH5Qc0SOyN_NRoj9UatPSLKD87eEsEhzAWP0P-L3f-YQPgJO_57ejUTNAGsHyst1sqx1nMRcFX6nEDkfFu0Pm4X27k1dsD-jl4tuBtMd-PuXbxtURaTEe7M7UqMGIno8VGiA6r_Y10F2aV3YS1MkIofB4YPtP5ra2TwwlFPioc2XJQ0ba8ehKEn6ZmQrSsqj4QplOT7XEtRnEAeR-ElG5LNoXqN3Ibjgz-qcHVxyiTQCjYVJSLcbZOUR77oiTlZAab1GStFPiOrgUEw';
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
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDAyMzk3OTksImV4cCI6MTcwMDI0MzM5OSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Im1heWV1bC5ncmFzQGVwaXRlY2guZGlnaXRhbCJ9.MiGWtLoUcvQ7ke_JmWo0Ad0icSA9twRzpPZawi52HtRvk6YnU6_0Vbeb_R4JZF0-Hxj9_SDIH5Qc0SOyN_NRoj9UatPSLKD87eEsEhzAWP0P-L3f-YQPgJO_57ejUTNAGsHyst1sqx1nMRcFX6nEDkfFu0Pm4X27k1dsD-jl4tuBtMd-PuXbxtURaTEe7M7UqMGIno8VGiA6r_Y10F2aV3YS1MkIofB4YPtP5ra2TwwlFPioc2XJQ0ba8ehKEn6ZmQrSsqj4QplOT7XEtRnEAeR-ElG5LNoXqN3Ibjgz-qcHVxyiTQCjYVJSLcbZOUR77oiTlZAab1GStFPiOrgUEw'; // Remplacez par votre token d'authentification
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

      editProduct(product) {
        // Pré-remplir le formulaire avec les détails du produit sélectionné
        document.getElementById('Name').value = product.name;
        document.getElementById('Description').value = product.description;
        document.getElementById('Price').value = product.price;
        document.getElementById('Categories').value = product.categories.join(', ');

        // Enregistrez l'ID du produit actuellement édité
        // this.editingProductId = product.id;

        // Vous pouvez également ajouter une logique pour afficher/modifier l'interface utilisate
      }
    }
  }
  
;
</script>



<style scoped>
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