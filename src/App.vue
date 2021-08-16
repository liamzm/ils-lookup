<template>
  <div id="app">
    <Navbar />
    <div id="516014418">
        <VueScriptComponent script='<script type="text/javascript">
            try {
                window._mNHandle.queue.push(function (){
                    window._mNDetails.loadTag("516014418", "970x90", "516014418");
                });
            }
            catch (error) {}
        </script>' />
    </div>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VueScriptComponent from 'vue-script-component'

export default {
  name: 'App',
    metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    // title: 'Find ILS Frequency',
    // all titles will be injected into this template
    titleTemplate: '%s | Find ILS Frequency'
  },
  components: {
    Navbar,
    Footer,
    VueScriptComponent
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
