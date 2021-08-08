<template>

    <div class="main">

        
        
        <autocomplete
            :search="search"
            :baseClass="'autocomplete'"
            :countries="this.$countries"
            placeholder="Enter an ICAO code, city, or airport name..."
            aria-label="Enter an ICAO code, city, or airport name..."
            >


            <template #result="{ result, props }">

                <div v-bind="props" class="autocomplete-result" @click="navigateToAirport(result)">
                    
                    <div class="init-info">
                    <div class="airport icao" v-if="result.icao != ''">
                        {{ result.icao }}
                    </div>
                        <country-flag class="medium-flag" :rounded="true" :country="getCountryId(result.country)" size='medium'/>
                    </div>

                    <div class="airport name">
                        {{ result.name }}
                    </div>
                    <div class="airport city">
                        {{ result.city }}, {{ result.country}}
                    </div>  

                    <div class="airport">
                        
                    </div>                                          
                    <div v-html="result.snippet" />
                </div>

            </template>

        </autocomplete>
            
    </div>




</template>

<script>


export default {
    name: 'Home',
    methods: {
        search(input) {
            var airports = this.$airports
            var result = []
            if (input.length < 1) { return [] }
            airports.filter(airport => {
                if (airport.name.toLowerCase().startsWith(input.toLowerCase()) || airport.icao.toLowerCase().startsWith(input.toLowerCase()) || airport.city.toLowerCase().startsWith(input.toLowerCase())) {
                    result.push(airport)
                }
            })
            return result
        },
        getCountryId(country) {
            return this.$countries[country]
        },
        navigateToAirport(result) {
            this.$router.push({ path: `/${result.icao}` });
        }
    }   
}



</script>


<style scoped>

.main {
    min-height: 80vh;
    width: 100%;
    margin-top: 0px;
    display: flex;
    width: 90%;
    height: 60vh;
    max-width: 1500px;
    margin: auto;
    flex-direction: column;
    /* border: 1px solid white; */
    justify-content: center;
    margin-top: 20px;
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

}




</style>