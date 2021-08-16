<template>
    <div>
        <GmapMap
            :center="{lat:Number(this.latitude), lng:Number(this.longitude)}"
            :zoom="getDefaultZoom()"
             :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false
            }"
            map-type-id="satellite"
            style="width: 100%; height: 400px"
        ></GmapMap>

        <div class="main">

            <div class="header">
                <div class="icao-flag">
                    <h2>{{ icao_code }}</h2>
                    <country-flag :rounded="true" :country="getCountryId(airport_country)" size='small'/>
                </div>
                <h1>{{ airport_name }}</h1>
                <h4>{{ airport_city }}, {{ airport_country }}<span>{{ latitude }}, {{ longitude }}</span></h4>
            </div>

            <div class="runways">

                <div v-for="runway in runways" :key="runway.ident" class="runway" @click="selectRunway(runway.ident)">
                    
                    <p class="ident">{{ runway.ident }}</p>

                        <div v-if="getIls(runway) != null" class="ils">
                            
                            {{ getIls(runway) / 1000000}}

                        </div>

                        <div v-else class="no-ils">
                            No ILS
                        </div>

                        <div class="runway-details" v-if="selected_runway === runway.ident">

                            <Runway :runway="runway" :airport="airport" v-on:close-modal="closeSelectedRunway()" />
            
                        </div>
                    

                </div>

            </div>

        </div>

        <!-- <VueScriptComponent script='<script async="async" data-cfasync="false" src="//upgulpinon.com/1?z=4452721"></script>' /> -->
        
        <!-- <div id="516014418">
            
            <VueScriptComponent script='<script type="text/javascript">try {window._mNHandle.queue.push(function (){window._mNDetails.loadTag("516014418", "970x90", "516014418");});}catch (error) {}</script>'/>
        </div> -->

    </div>


</template>

<script>
import Runway from '@/components/Runway'
import VueScriptComponent from 'vue-script-component'

export default {
    metaInfo() {
        return {
            title: `${this.icao_code} ILS Frequency | ${this.airport_name}`,
            meta: [
                {
                    name: 'description',
                    content: `Find ILS frequency for ${this.icao_code} | Find flight sim information for ${this.icao_code}`,
                    keywords: 'ILS, Flight Sim, frequency, frequencies'
                }
            ],
            htmlAttrs: {
                lang: 'en',
                amp: true
            }
        }
    },
    name: 'Airport',
    components: {
        Runway
        // VueScriptComponent
    },
    data () {
        return {
            airport: [],
            icao_code: '',
            airport_name: '',
            airport_city: '',
            airport_country: '',
            latitude: '',
            longitude: '',
            runways: [],
            selected_runway: ''
        }
    },
    created () {
        this.getAirportInfo();
        // window.document.title = this.$router.currentRoute.params.id;
    },
    mounted() {
        this.getScript();
    },
    methods: {
        getAirportInfo() {
            var airports = this.$airports
            let icao_code = this.$router.currentRoute.params.id;
            this.icao_code = icao_code;
            var result = []
            airports.filter(airport => { 
                if (airport["ICAO"].toLowerCase().startsWith(this.icao_code.toLowerCase())) {
                    result.push(airport)
                    this.airport = airport
                    this.airport_name = airport["Name"]
                    this.airport_city = airport["City"]
                    this.airport_country = airport["Country"]
                    this.latitude = airport["Latitude"]
                    this.longitude = airport["Longitude"]
                    
                }
            })
            this.getAdditionalAirportInfo()
        },
        getAdditionalAirportInfo() {
            var api = `https://api.flightplandatabase.com/nav/airport/${this.icao_code}`
    
            
            
            this.$http.get(api).then((response) => {
                this.runways = response.data.runways
                console.log(response.data)
            })
        },
        selectRunway(ident) {
            this.selected_runway = ident
        },
        getCountryId(country) {
            return this.$countries[country]
        },
        getDefaultZoom() {
            if (this.runways.length > 2) {
                return 14
            } else {
                return 15 
            }
        },
        getIls(runway) {
            var navaids = runway.navaids
            var ils = []
            for (let i = 0; i < navaids.length; i++) {
                if (String(navaids[i].name).includes('ILS')) {
                    ils.push(navaids[i].frequency)
                }
            
            }
            return ils[0]
        },
        closeSelectedRunway() {
            console.log('closing selected runway')
            this.selected_runway = ""
        }
    }
}



</script>


<style scoped>

.main {
    width: 90%;
    max-width: 1500px;
    margin: auto;
    min-height: 80vh;
    margin-bottom: 100px;
}

.header {
    margin-top: 50px;
}

.icao-flag {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
}

.header h2 {
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
    margin: 0px 10px 0px 0px;
    padding: 5px 10px 5px 10px;
}

.header h1 {
    color: white;
    margin: 0px 0px 0px 0px;
}

.header h4 {
    color: white;
    margin: 0px 0px 0px 0px;
}

.header h4 span {
    font-weight: 200;
    margin-left: 10px;
}

.runways {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-top: 50px;
}

.runway {
    width: 25%;
    margin: 0px 0px 250px 0px;
    cursor: pointer;
    position: relative;
    height: 100px;
}

.ident {
    font-size: 20px;
    font-weight: 800;
    margin: 0px 0px 0px 0px;
    color: white;
    border: 1px solid lightgray;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
    width: max-content;
}

.ils {
    color: #D6DF23;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 20px;
    border-bottom: 1px dotted #D6DF23;
    width: max-content;
}

.no-ils {
    color: white;
}

.runway-details {
    /* width: 100%; */
    /* overflow-y: scroll; */
    height: max-content;
    /* height: 100%; */
    position: absolute;
    display: flex;
    /* position: fixed; */
    top: 100px;
    left: 0;
    width: 50%;
    height: 200px;
    /* background-color: #0F4758; */
}

</style>