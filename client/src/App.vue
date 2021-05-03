<template>
  <div id="app">
    <div id="nav">
      <ul class="nav">
        <!-- <li><router-link to="/">לוח שנה</router-link></li> -->
        <li><router-link :to="{name:'Home'}">לוח שנה</router-link></li>
        <li><router-link :to="{name: 'Shabat'}">שבתות</router-link></li>
        <li><router-link :to="{name: 'Reminders'}">כל התזכורות</router-link></li>
      </ul>
        </div>
      <keep-alive exclude="SingleDate,Day">
      <router-view />
      </keep-alive>
    </div>
</template>

<script>
import SingleDate from './views/SingleDate.vue'
import Day from './components/Day.vue'
export default {
  components: { SingleDate,Day},
  name: 'App'
}
</script>
<style  >
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap');

.nav {
    font-family: 'Amatic SC', cursive;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
li {
    list-style: none;
    font-size: 2em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

body {
    margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
}



#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: unset;

}



#nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: unset;
}
</style>
