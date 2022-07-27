

<template>

    <div class="nav">
        <div class="logo" @click="goHome()">
            <img src="../assets/icon.svg" />
            <h1>ILS LOOKUP</h1>
        </div>

        <div class="search" @click="goHome()">
            Search
        </div>
    </div>

</template>

<script>

export default {
    name: 'Navbar',
    methods: {
        goHome() {
            this.$router.push({ path: `/` });
        },
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

.nav {
    width: 90%;
    display: flex;
    flex-direction: row;
    margin: auto;
    max-width: 1500px;
    justify-content: space-between;
    align-items: center;
}

.logo {
    width: max-content;
    display: flex;
    align-items: center;
    color: white;
    box-sizing: border-box;
    padding: 20px 0px 20px 0px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 2px;
    font-size: 8px;
    color: #D6DF23;
    cursor: pointer;
}

.search {
    color: white;
    font-weight: 400;
    cursor: pointer;
}

.logo img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
}

::v-deep .autocomplete-input {
    height: 30px;
    font-size: 12.5px;
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
    font-size: 12.5px;
    color: #344956;
    margin: 20px 0px 20px 0px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 10px;
    width: max-content;
    align-items: center;
    padding: 5px;
    max-width: 200px;
    background-color: rgba(255, 255, 255, 0.7);
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
    font-size: 10px;
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


::v-deep .autocomplete-result {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
}

::v-deep .init-info {
    margin-bottom: 20px;
}

@media(max-width: 700px) {
    .nav {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 20px;
    }

    ::v-deep .autocomplete-input {
        width: 100%;
    }

}


</style>