<template>
<div class="container">

<router-link :to="{name: 'SingleDate', params:{date,getReminders, hebDate,time,weekDay, reminders,annuals,checkAnnualLoazi,checkAnnualHeb,getDateObj,getHebDateObj}}"  >
    <div class="day-container">
        <p class="monthday">{{returnMonthDay(date)}}</p>
        <p>{{hebDate}}</p>
        <p >{{time}}</p>
        <div class="reminder" v-if="isReminder"></div>
        <div class="annual" v-if="isAnnual">🕯</div>

    </div>
</router-link>
</div>

</template>

<script>

const Day = {
    name: 'Day',
    props: {
        date: String,
        hebDate: String,
        isReminder: Boolean,
        isAnnual: Boolean,
        time: String,
        weekDay: Number,
        reminders: Array,
        annuals: Array,
        checkAnnualHeb: Function,
        checkAnnualLoazi: Function,
        getDateObj: Function,
        getHebDateObj: Function,
        getReminders: Function
        
    },
    methods : {
        returnMonthDay: function(currDate) {
            return new Date(currDate).getDate()
        }

    
    }
}
export default Day
</script>

<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces&display=swap');

      
    .day-container {
       margin: 1px 1px 10px 12px;
        /* margin: 0; */
        box-shadow: 1px 1px black;
        border: 1px solid black;
        border-radius: 13px 13px 13px 0px;
        height: 150px;
         font-size: 1.1em; 
        position: relative;
        display: block;
        overflow: hidden;
        box-sizing: border-box;
        background-color: white;
        -webkit-font-smoothing: subpixel-antialiased;
        cursor: pointer;
        transition: .3s;
        -webkit-font-smoothing: antialiased;
    }
    

.day-container:hover {
        transition: .3s;
        -webkit-font-smoothing: subpixel-antialiased;
        transform: translateZ(0) perspective(1px) scale(1.1);
        box-shadow: 3px 3px rgba(0, 0, 0, 0.3);
        z-index: 1;
}
.day-container:hover .annual {
    animation: blinkingText 1s ease-in-out;
}
    .monthday {
        font-family: 'Fraunces';
        margin-top: 1px;
        margin-bottom: 0;
    }
    .reminder {
        background-color: rgb(224, 90, 90);
        width: 20px;
        height: 20px;
        bottom: 0;
        position: absolute;
        margin: -10px;
        transform: rotate(45deg);
    }
    .reminder:after {
        content: '';
    }

     .annual {
         position: absolute;
         top: 0;
         left: 0;
         width: 20px;
         font-size: 1.4em;
         color:  rgb(240, 176, 38);
    }
    a {
        text-decoration: none;
        color: black;
    }

@keyframes blinkingText{
    0%{     opacity:1;    }
    30%{    opacity:0.9; }
    40%{    opacity:0.8; }
    49%{    opacity:0.7; }
    60%{    opacity:0; }
    70%{    opacity:0.3; }
    80%{    opacity:0.5;  }
    90%{    opacity:0.8;  }
    100%{   opacity:1;    }
}

@media only screen and (max-width:830px){
    .day-container {
        font-size: 0.8em;
        height: 100px;
        margin: 15px 2px;
    }

    .annual {
        font-size: 1em;
    }
}
         


</style>