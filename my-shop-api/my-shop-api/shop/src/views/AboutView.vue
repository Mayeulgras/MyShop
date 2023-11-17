<template>
  <form @submit.prevent="login">
    <div class="imgcontainer">
    </div>
    <div class="container">
      <label for="uname" id="email"><b>Email</b></label>
      <input type="text" v-model="user.email" placeholder="" name="uname" required>
      <label for="password"><b>Password</b></label>
      <input type="password" v-model="user.password" placeholder="" name="psw" required>
      <button type="submit" @click="login">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
    </div>
    <div class="container" style="background-color:#f1f1f1">
      <button type="button" class="cancelbtn"><a href="/">Cancel</a></button>
      <span class="psw"><a href="/register">register</a></span>
    </div>
  </form>
  
   
  </template>


<script>
import { accountService } from '@/_services';

export default {
  name: 'login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      accountService.login(this.user)
        .then(res => {
          console.log(res);
          // Gérer la réponse de l'API si nécessaire
        })
        .catch(err => console.log(err));

      await fetch('http://localhost/authentication_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.user)
      })
      .then(response => {
        if (response.ok) {
          // Si la réponse a un statut OK (200)
          return response.json(); // Parsez la réponse JSON
        } else {
          // Si la réponse a un statut différent de OK
          console.error(`Erreur lors de la requête. Statut: ${response.status}`);
          // Gérer d'autres cas si nécessaire
          throw new Error('Erreur lors de la requête.');
        }
      })
      .then(data => {
        // La réponse JSON est disponible dans la variable data
        console.log('Token reçu:', data);
        localStorage.setItem('token', data.access_token);
        this.$router.push('/admin');
      })
      .catch(err => {
        console.error(err);

        // Gérer les erreurs, par exemple, rediriger vers la page about en cas d'erreur 401
        if (err.response && err.response.status === 401) {
          this.$router.push('/about');
        }
      });
      // .then(response => {
      //   if (response.ok) {
      //     // Si la réponse a un statut OK (200)
      //     console.log('token')
      //     localStorage.setItem('token', response.status);
      //     this.$router.push('/admin');
      //   } else {
      //     // Si la réponse a un statut différent de OK
      //     console.error(`Erreur lors de la requête. Statut: ${response.status}`);
      //     // Gérer d'autres cas si nécessaire
      //   }
      // })
      // .catch(err => {
      //   console.error(err);

      //   // Gérer les erreurs, par exemple, rediriger vers la page about en cas d'erreur 401
      //   if (err.response && err.response.status === 401) {
      //     this.$router.push('/about');
      //   }
      // });
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     if (data.status == 201) {
    //       console.log("coucou")
    //       localStorage.setItem('token', data.status);
    //       this.$router.push('/admin');
    //   }
    // })
    //   .catch(err => {
    //     console.error(err);

    //     // Gérer les erreurs, par exemple, rediriger vers la page about en cas d'erreur 401
    //     if (err.response && err.response.status === 401) {
    //       this.$router.push('/about');
    //     }
    //   });
    }
  }
};
</script>

<!-- <template>
<form method="post">
  <div class="imgcontainer">
    <img src="img_avatar2.png" alt="Avatar" class="avatar">
  </div>
  <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>
    <button type="submit">Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>
  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn"><a href="/">Cancel</a></button>
    <span class="psw"><a href="/register">register</a></span>
  </div>
</form>

</template> -->

<style>
/* Bordered form */
form {
  border: 3px solid #f1f1f1;
}
/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}
/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}
/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}
/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}
/* Add padding to containers */
.container {
  padding: 16px;
}
/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}
/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
