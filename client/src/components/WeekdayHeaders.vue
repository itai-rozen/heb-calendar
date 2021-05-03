<template>
<div  class="headers">
    <div v-for="day in days" :key="day">
        {{'\''+day}}
    </div>
</div>
</template>

<script>
const WeekdayHeaders = {
    data(){
        return {
            days : [
                'א','ב','ג','ד','ה','ו','ש'
            ]
        }
    }
}
export default WeekdayHeaders 
</script>

<style scoped>
    @font-face {
        src: url( './../../public/YiddishkeitAlefAlefAlef-Bold.woff');
        font-family: 'yidd';
    }

    * {
        cursor: context-menu;
    }

    div {
        margin: 15px;
        font-family: 'yidd';
        font-size: 1.5em;
    }

    .headers {
           display: grid;
    grid-template-columns: repeat(7, 1fr);
    }

        @media only screen and (max-width:830px){
        div {
            font-size: 1em;
            margin: 10px;
        }
    }

</style>