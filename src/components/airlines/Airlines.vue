<template>

  <div class="airlines-search-container">
    <h4 class="new">New!</h4>
    <div class="airlines-header">
      <font-awesome-icon :icon="['fas', 'plane']" style="color: #d6df23;" />
      <h3>Search airlines for ICAO code</h3>
    </div>

    <autocomplete
          :search="search"
          :debounceTime="500"
          :baseClass="'autocomplete-airlines'"
          :countries="$countries"
          placeholder="Enter an ICAO code or airline name"
          aria-label="Enter an ICAO code or airline name"
          >


          <template #result="{ result, props }">

              <div v-bind="props" class="autocomplete-result" @click="navigateToAirline(result['icao_code'])">

                  <div class="result">
                    <country-flag class="medium-flag" :rounded="true" :country="getCountryId(result['country'])" size='medium'/>
                    <div class="basic-info">
                      <div class='icao-code-result'>{{ result["icao_code"]}}</div>
                      <div class="result-name">{{ result["name"]}}</div>
                    </div>
                    <div class="result-callsign">
                      <span>Callsign</span>
                      <p>{{ result["callsign"]}}</p>
                    </div>
                  </div>

                        
                  <div v-html="result.snippet" />
              </div>

          </template>

        </autocomplete>
  </div>

</template>

<script>


  export default {
    name: 'Airlines',
    methods: {
      search(input) {
        var airlines = this.$airlines
        var result = []
        if (input.length < 1) { return [] }
        airlines.filter(airline => {
            if (airline["name"].toLowerCase().includes(input.toLowerCase()) || airline["icao_code"].toLowerCase().includes(input.toLowerCase()) || airline["country"].toLowerCase().includes(input.toLowerCase()) || airline["callsign"].toLowerCase().includes(input.toLowerCase())) {
                result.push(airline)
            }
        })
        return result
      },
      getCountryId(country) {
        return this.$countries[country]
      },
      navigateToAirline(result) {
        console.log('this is firing');
        this.$router.push({ path: `/airlines/${result}` });
      }
    }
  }



</script>


<style scoped>

.airlines-search-container {
  display: flex;
  width: 90%;
  /* background-color: black; */
  max-width: 800px;
  margin: auto;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 100px;
}

.new {
  background-color: rgba(214, 223, 35, 0.9);
  color: #344956;
  display: flex;
  box-sizing: border-box;
  padding: 2.5px 10px 2.5px 10px;
  border-radius: 2.5px;
  font-weight: 600;
  align-items: center;
  width: max-content;
}

.airlines-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
}

.basic-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.airlines-header h3 {
  color: white;
  margin: 0px 0px 0px 15px;
  font-size: 40px;
  font-weight: 400;
}

svg {
  margin: -5px 0px 0px 0px;
}

::v-deep .medium-flag {
  margin-left: -10px;
}

::v-deep .autocomplete-airlines-input {
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  border: 0;
  font-family: 'Overpass', sans-serif;
  font-size: 20px;
  border-bottom: 1px solid rgba(214, 223, 35, 0.9);
  border-bottom: 1px solid white;
  height: 75px;
  display: flex;
  align-items: center;
  color: white;
}

::v-deep .autocomplete-airlines-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

::v-deep .autocomplete-result {
  padding: 0px;
  border: 0px;
  margin-left: -50px !important;
}

::v-deep .autocomplete-result:hover {
  border: 1px dotted rgba(0, 0, 0, 0) !important;
}

::v-deep .result {
  display: flex;
  flex-direction: column;
  pointer-events: none !important;
}

.icao-code-result {
  display: flex;
  flex-direction: row;
  font-size: 15px;
  letter-spacing: 1px;
  font-weight: 600;
  background-color: #344956;
  color: rgba(214, 223, 35, 0.9);
  align-items: center;
  justify-content: center;
  padding: 2.5px 10px 2.5px 10px;
  margin-right: 20px;
  width: max-content;

}

.result-callsign {
  /* margin-left: 20px; */
  display: flex;
  flex-direction: row;
  font-size: 12.5px;
  align-items: center;
  margin-top: 10px;
  /* margin-left: 75px; */
}

::v-deep .autocomplete-result:hover {
    border: 0px dotted lightgray;
    transition: 0.2s;
}

.result-callsign span {
  background-color: rgba(255, 255, 255, 0);
  /* color: rgba(214, 223, 35, 0.9); */
  /* padding: 2.5px; */
  /* margin-bottom: 2.5px; */
}

.result-callsign p {
  color: rgba(214, 223, 35, 0.9);
  margin: 0px 0px 0px 5px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 1px;
}

@media(max-width: 700px) {
  .airlines-header h3 {
    font-size: 25px;
  }
}

</style>


