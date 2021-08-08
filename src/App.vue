<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Overpass:wght@200;400;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');

#app {
  background-color: #0F4758;
}

#app {
  min-height: 100%;
}

html {
  min-height: 100%;
  background-color: #0F4758;
}

body {
  font-family: 'Overpass', sans-serif;
  margin: 0;
  height: 100%;
}

</style>
