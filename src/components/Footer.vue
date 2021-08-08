<template>

    <div class="footer">
        <p>Not to be used for real aviation</p>
        <a href="https://flightplandatabase.com">Using data from the Flight Plan Database</a>
        <p>Made by Liam Zanyk McLean</p>
    </div>




</template>


<script>

export default {
    name: 'Footer'
}




</script>

<style scoped>

.footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: lightgray;
    font-size: 12.5px;
    flex-direction: column;
    align-items: center;
}

.footer a {
    color: lightgray;
    text-transform: none;
}


</style>