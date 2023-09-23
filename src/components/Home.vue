<template>

  <div>

    <img class="overlay" src="@/assets/a380.jpg" />

    <div class="container">

      <OpenSourceRefer />

      <div class="main">

        <h1>Find ILS frequencies & more </h1>
        <h2>Enter airport name, ICAO code, or city name to search</h2>
        <autocomplete
            :search="search"
            :debounceTime="500"
            :baseClass="'autocomplete'"
            :countries="this.$countries"
            placeholder="Enter an ICAO code, city, or airport name..."
            aria-label="Enter an ICAO code, city, or airport name..."
            >


            <template #result="{ result, props }">

                <div v-bind="props" class="autocomplete-result" @click="navigateToAirport(result['ICAO'])">
                    
                    <div class="init-info">
                    <div class="airport icao" v-if="result.icao != ''">
                        {{ result["ICAO"] }}
                    </div>
                        <country-flag class="medium-flag" :rounded="true" :country="getCountryId(result['Country'])" size='medium'/>
                    </div>

                    <div class="airport name">
                        {{ result["Name"] }}
                    </div>
                    <div class="airport city">
                        {{ result["City"] }}, {{ result["Country"] }}
                    </div>  

                          
                    <div v-html="result.snippet" />
                </div>

            </template>

        </autocomplete>
              
      </div>

    </div>

    <div class="container">

      <Airlines />

    </div>

</div>


</template>

<script>
import OpenSourceRefer from '@/components/miscellaneous/OpenSourceRefer.vue'
import Airlines from '@/components/airlines/Airlines.vue'

export default {
    metaInfo: {
      title: 'ILS Lookup | Find ILS Frequency | Flight Sim Tool',
      titleTemplate: null,
      meta: [
          {
              name: 'description',
              content: 'Quickly find ILS frequency and other runway information for flight simulator. Includes all the airports in the world!',
              keywords: 'ILS, Flight Sim, frequency, frequencies'
          }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    },
    name: 'Home',
    components: {
      OpenSourceRefer,
      Airlines
    },
    methods: {
      search(input) {
          var airports = this.$airports
          var result = []
          if (input.length < 1) { return [] }
          airports.filter(airport => {
              if (airport["Name"].toLowerCase().includes(input.toLowerCase()) || airport["ICAO"].toLowerCase().includes(input.toLowerCase()) || airport["City"].toLowerCase().includes(input.toLowerCase())) {
                  result.push(airport)
              }
          })
          return result
      },
      getCountryId(country) {
          return this.$countries[country]
      },
      navigateToAirport(result) {
          this.$router.push({ path: `/${result}` });
      }
    }   
}



</script>


<style scoped>

.container {
    position: relative;
    width: 100%;
    /* height: 80vh; */
    /* height: 1000px; */
    overflow: hidden;
    /* height: 100%; */
    background-color: rgba(15, 70, 88, 0.8);
    z-index: 2;
    min-height: 700px;
}

.overlay {
    position: absolute;
    width: 100%;
    z-index: 1;
    height: 700px;
    object-fit: cover;
}

.main {
    min-height: 80vh;
    width: 100%;
    margin-top: 0px;
    display: flex;
    width: 90%;
    height: 80vh;
    max-width: 1500px;
    margin: auto;
    flex-direction: column;
    /* background-color: #0F4758; */
    position: relative;
    z-index: 3;
    /* border: 1px solid white; */
    justify-content: center;
    margin-top: 20px;
}

.main h1 {
    color: white;
    margin: 0px 0px 10px 0px;
}

.main h2 {
    color: white;
    margin: 0px 0px 10px 0px;
    font-weight: 200;
}

::v-deep .autocomplete-input {
    height: 100px;
    width: 100%;
    font-size: 50px;
    font-family: 'Overpass', sans-serif;
    font-weight: 200;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid lightgray;
    background-color: #344956;
    color: white;
    align-self: center;
}

::v-deep .autocomplete-result {
    width: 100%;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    font-size: 30px;
    color: white;
    margin: 20px 0px 20px 0px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 10px;
    width: max-content;
    align-items: center;
    padding: 5px;
}

::v-deep .autocomplete-result:hover {
    border: 1px dotted lightgray;
    transition: 0.2s;
}

::v-deep .autocomplete-result-list {
    padding-inline-start: 0px;
}

::v-deep .airport {
    margin-right: 10px;
    display: flex;
    align-items: center;
}

::v-deep .icao {
    background-color: #344956;
    color: white;
    text-transform: uppercase;
    font-weight: 800;
    box-sizing: border-box;
    padding: 10px;
    border-radius:10px;
    color: #D6DF23;
    letter-spacing: 1px;
    width: max-content;
}

::v-deep .name {
    font-weight: 600;
}

::v-deep .city {
    font-weight: 200;
}

::v-deep .init-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
}
/* .flag {
    width: 400px !important;
} */
@media(max-width: 700px) {
    .container {
        height: 800px;
    }
    .overlay {
        height: 800px;
    }

    ::v-deep .autocomplete-input {
        font-size: 20px;
        height: 100px;
    }

    ::v-deep .autocomplete-result {
        font-size: 20px;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px;
    }

    ::v-deep .init-info {
        margin-bottom: 20px;
    }

    /* ::v-deep .medium-flag {
        display: none;
    } */
    .main h1 {
        font-size: 20px;
    }

    .main h2 {
        font-size: 15px;
    }
}




</style>