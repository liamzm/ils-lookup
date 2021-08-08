

<template>

    <div class="runway-info">

        <!-- <h2>{{ airport.icao }}</h2>
        <h3>{{ runway.ident }}</h3> -->

        <!-- {{ runway }} -->
        
        <div class="runway-container"  :style="{ 'transform' : `rotate(${runway.bearing - 180}deg)` }">
            <img class="ils" src="@/assets/ils.svg" />
            <div class="runway" :style="{ 'height' : getRunwayLength() }"></div>
        
        </div>

        <div class="quick-info">
            <p>Length: {{ parseFloat(runway.length).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} ft.</p>
            <p>Course: {{ runway.bearing.toFixed(0) }}°</p>
            <p>Elevation: {{ parseFloat(runway.navaids[0].elevation).toFixed(0) }} ft.</p>
        </div>
        



    </div>



</template>


<script>
export default {
    name: "Runway",
    props: ['runway', 'airport'],
    methods: {
        getRunwayLength() {
            return (this.runway.length / 200) + 'px'
        },
        closeThis() {
            console.log('closing')
            this.$emit('close-modal')
        }
    }
}
</script>


<style scoped>

.runway-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* max-width: 1000px; */
    margin: auto;
    align-items: center;
    color: white;
    /* border: 1px dotted lightgray; */
    
}

.runway-info h2 {
    background-color: #344956;
    color: white;
    text-transform: uppercase;
    font-weight: 800;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    color: #D6DF23;
    letter-spacing: 1px;
    width: max-content;
    margin: 20px 10px 0px 0px;
    padding: 5px 10px 5px 10px;
}

.runway-info h3 {
    margin-bottom: 0px;
}

.runway-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px dotted lightgray; */
    margin-bottom: 0px;
}

.runway {
    /* height: 5px; */
    border: 1px solid white;
    width: 5px;
    height: 100px;
}

.ils {
    width: 20%;
}

.quick-info {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.quick-info p {
    margin: 0px 5px 5px 0px;
    width: max-content;
}

.close {
    font-size: 10px;
    border: 1px solid white;
    border-radius: 3px;
    padding: 2.5px;
    cursor: pointer;
}

</style>