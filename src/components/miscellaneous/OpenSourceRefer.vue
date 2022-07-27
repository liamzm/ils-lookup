<template>


  <div id="open-source-refer" @click="goToGithub()">

    <p>This project is open source!</p>

    <div class="contribute">Contribute</div>

  </div>






</template>


<script>

export default {
  name: "OpenSourceRefer",
  methods: {
    goToGithub() {
      window.open("https://github.com/liamzm/ils-lookup", '_blank');
    }
  }
}




</script>

<style scoped>

#open-source-refer {
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: white;
  /* border-bottom: 1px solid gray; */
}

.contribute {
  background-color: rgba(214, 223, 35, 0.9);
  color: #344956;
  display: flex;
  margin-left: 10px;
  box-sizing: border-box;
  padding: 2.5px 10px 2.5px 10px;
  border-radius: 2.5px;
  font-weight: 600;
  align-items: center;
}


</style>