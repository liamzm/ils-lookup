<template>

  <div class="airline-container">
    <country-flag class="medium-flag" :rounded="true" :country="getCountryId(airline.country)" size='medium'/>
    <h1>{{ airline.name }}</h1>
    <p>ICAO code: <span>{{ airline.icao_code }}</span></p>
    <p>Callsign: <span>{{ airline.callsign }}</span></p>

    <div class="coming-soon">
      <i>Coming soon: Fleet & destination info</i>
    </div>
  </div>


</template>

<script>

export default {
  name: 'Airline',
  data () {
    return {
      airline: {}
    }
  },
  created() {
    this.getAirline();
    this.scrollToTop();
  },
  methods: {
    getAirline() {
      let airlineIcaoCode = this.$router.currentRoute.params.airline;
      let airlines = this.$airlines;
      let result = []
      airlines.filter(airline => { 
        if (airline["icao_code"].toLowerCase().startsWith(airlineIcaoCode.toLowerCase())) {
          result.push(airline)
        }
      })
      this.airline = result[0]
    },
    getCountryId(country) {
      return this.$countries[country]
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
  }
}





</script>

<style scoped>

.airline-container {
  width: 90%;
  margin: auto;
  margin-top: 100px;
  min-height: 90vh;
  color: white;
}

::v-deep .medium-flag {
  margin-left: -10px;
}

p span {
  font-weight: 600;
  letter-spacing: 1px;
  color: rgba(214, 223, 35, 0.9);
}

.coming-soon {
  margin-top: 100px;
}


</style>