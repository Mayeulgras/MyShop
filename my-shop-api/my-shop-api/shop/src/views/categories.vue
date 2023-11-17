

<template>
    <div>
      <header class="headerHome">
        
        <img src="../img/logo.png" alt="" width="50" height="50">
        
        <p>
          <input type="text" name="recherche" id="recherche" placeholder="Rechercher"/>  
        </p>  
        <button><a href="/about">Log in</a></button>  
      </header>
      <div class="conteneur">
      <section class="menuGauche">
        <article class="text">FILTER BY</article>
        <div>
        <select class="deroulant2">
            <option>Categories</option>
            <option>Best match</option>
            <option>Best match</option>
        </select>
        </div>
        <div>Price Range</div>
        <div class="slidecontainer">
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>
        <div class="prix">
            <article>$0</article>
            <article>$10 000+</article>
        </div>
      </section>
       </div>
      <div class="prod">
      <section class="list" v-if="getStatus == 'done'">
        <article class="produit" v-for="categories in getCategories.data['hydra:member']" :key="categories.name">
          <h1 class="info">{{ categories.name }}</h1>
          <button>Purchase</button>
          </article>
      </section>
      </div>
    </div>
</template>

<script>

import { mapActions, mapState } from "pinia";
import { useCategoriesStore } from "../stores/auth";
export default {
data (){
return {
  categories: [],
};
},
mounted() {
this.fetchCategories
},
computed: {
...mapActions(useCategoriesStore, ["fetchCategories"]),
...mapState(useCategoriesStore, ["getCategories", "getStatus"]),

},
method: {

}
};

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
