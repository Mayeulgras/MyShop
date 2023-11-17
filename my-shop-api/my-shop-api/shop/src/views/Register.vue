<template>
    <form>
      <div class="container">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>
        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="" name="email" id="email" required>
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="" name="psw" id="password" required>
        <label for="psw-repeat"><b>fullName</b></label>
        <input type="text" placeholder="" name="psw-repeat" id="fullName" required>
        <hr>
        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
        <button type="submit" class="registerbtn" v-on:click ="registUser">Register</button>
      </div>
      <div class="container signin">
        <p><a href="/about">Sign in</a></p>
      </div>
    </form>
</template>


<script>
import Axios from 'axios'

export default {
    methods: {
      registUser() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const fullname = document.getElementById('fullName').value;
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDAyMzk3OTksImV4cCI6MTcwMDI0MzM5OSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Im1heWV1bC5ncmFzQGVwaXRlY2guZGlnaXRhbCJ9.MiGWtLoUcvQ7ke_JmWo0Ad0icSA9twRzpPZawi52HtRvk6YnU6_0Vbeb_R4JZF0-Hxj9_SDIH5Qc0SOyN_NRoj9UatPSLKD87eEsEhzAWP0P-L3f-YQPgJO_57ejUTNAGsHyst1sqx1nMRcFX6nEDkfFu0Pm4X27k1dsD-jl4tuBtMd-PuXbxtURaTEe7M7UqMGIno8VGiA6r_Y10F2aV3YS1MkIofB4YPtP5ra2TwwlFPioc2XJQ0ba8ehKEn6ZmQrSsqj4QplOT7XEtRnEAeR-ElG5LNoXqN3Ibjgz-qcHVxyiTQCjYVJSLcbZOUR77oiTlZAab1GStFPiOrgUEw';
   
        Axios.post('http://localhost/api/users', {
          email: email,
          password: password,
          fullName: fullname
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          // Gérer la réponse de l'API si nécessaire
        })
        .catch(error => {
          // Gérer l'erreur de l'API si nécessaire
        });
      }
      
    }
  }
</script>

<!-- <template>
<form>
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="" name="email" id="email" required>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="" name="psw" id="password" required>
    <label for="psw-repeat"><b>fullName</b></label>
    <input type="text" placeholder="" name="psw-repeat" id="fullName" required>
    <hr>
    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
    <button type="submit" class="registerbtn" v-on:click ="registUser">Register</button>
  </div>
  <div class="container signin">
    <p><a href="/about">Sign in</a></p>
  </div>
</form>
</template> -->



<style>
* {box-sizing: border-box}
/* Add padding to containers */
.container {
  padding: 16px;
}
/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}
/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
/* Set a style for the submit/register button */
.registerbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}
.registerbtn:hover {
  opacity:1;
}
/* Add a blue text color to links */
a {
  color: dodgerblue;
}
/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>


