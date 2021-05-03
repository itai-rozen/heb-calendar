<template>
<div>
    <div class="year-input-container">
        <input class="year-input" type="number" id="year" name="year" min="0" v-model="getCurrYear" />
         <div class="skippers-container">
          <div class="increment" @click="skipYear(1)">&#x21E7;</div>
          <div class="decrement" @click="skipYear(-1)">&#x21E9;</div>
         </div>
        <div class="btn-container">
          <button class="btn" @click="getYearShabatot(getCurrYear)">submit</button>
        </div>
    </div>

  <ul class="list headers">
      <li class="item header"> תאריך לועזי</li>
      <li class="item header">תאריך עברי</li>
      <li class="item header">כניסת שבת</li>
      <li class="item header">יציאת שבת</li>
      <li class="item header">פרשה</li>
  </ul>
  <ul class="list items" v-for="(value,idx) in shabats" :key="idx">
        <li class="list-item item"> {{value.knisaDateEng}}</li>
        <li class="list-item item"> {{value.knisaDateHeb}}</li>
        <li class="list-item item"> {{value.knisaTime}}</li>
        <li class="list-item item"> {{value.yetsiaTime}}</li>
        <li class="list-item item"> {{value.parasha}}</li>
  </ul>
    <div class="loader" v-if="!hiddenLoading">
        <Loader />
    </div>

</div>
</template>

<script>
import axios from 'axios'
import Loader from './Loader.vue'
export default {
name: 'Shabatot',
components: {Loader},
data(){
    return {
        year: new Date().getFullYear(),
        hiddenLoading: true,
        dates: [],
        weekends: [],
        onlyHebDates: [],
        hebDateObjs: [],
        shabats: []
    }
    
},
computed: {
        getCurrYear: {
        get:  function (){
            return  this.year
        },
        set: function(yearInput){
            this.year = +yearInput
        }
    },
},
methods: {
    getYearShabatot: function(year){
            axios
    .get(`https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=${year}&ss=off&mf=on&c=on&b=40&d=on&geo=geoname&geonameid=281184&m=0&M=on&s=on`)
    .then(res => {
        this.dates = res.data.items
        this.weekends = this.getWeekends()
        this.onlyHebDates = this.getHebDates()
        this.hebDateObjs = this.onlyHebDates.map(hebDate => this.getDetailsFromDate(hebDate.date))
        this.shabats = this.getShabatot()
        this.hiddenLoading = true

        })
    .catch(err => console.log(err))
        this.hiddenLoading = false

    },
    getWeekends: function(){
        return this.dates.filter(date =>  new Date(date.date).getUTCDay() === 5 ||
                                          new Date(date.date).getUTCDay() === 6)
    },
    skipYear: function(num){
        this.year += num
        this.getYearShabatot(this.year)
    },
    getShabatot: function(){
        let shabatot = []
        let shabat = {}
        this.hebDateObjs.forEach(objArr => {
            objArr.forEach(obj => {
                let weekDay = this.getWeekDay(obj.date)

                if (obj.category === 'hebdate'){
                    if (weekDay === 5){
                        shabat.knisaDateEng = `${new Date(obj.date).getDate()}/${new Date(obj.date).getMonth()+1} `
                        shabat.knisaDateHeb = obj.hebrew
                    } else {
                        shabat.yetsiaDateEng = obj.date
                        shabat.yetsiaDateHeb = obj.hebrew
                    }
                }
                if (obj.category === 'candles'){
                    shabat.knisaTime = new Date(obj.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                }
                if (obj.category === 'parashat' || obj.category === 'holiday') shabat.parasha = obj.hebrew
                
                if (obj.category === 'havdalah'){
                    shabat.yetsiaTime = new Date(obj.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                } 
            })
            if (shabat.knisaDateEng && shabat.yetsiaDateEng){
                shabatot.push(shabat)
                shabat = {}
            }
        })
        return shabatot
    },
    getHebDates: function(){
        return this.weekends.filter(date => date.category === 'hebdate')
    },
    getDetailsFromDate: function(date){
        return this.dates.filter(day => {
            let dateObj = day.date
            let year = new Date(dateObj).getFullYear()
            let month = new Date(dateObj).getMonth()
            let monthDay = new Date(dateObj).getDate()
             return new Date(year,month,monthDay).setHours(0,0,0,0) === new Date(date).setHours(0,0,0,0)
        })
    },
    getWeekDay: function(date){
        return new Date(date).getUTCDay()
    }
},
mounted : function() {
    this.getYearShabatot(this.year)

} 
}

</script>



<style scoped>
*  {
    transition: .3s;
    font-family: 'Rancho',sans-serif;
}
*:hover {
    transition: .3s;
}
*:focus {
  outline-style: none;
}
.year-input-container {
  appearance: none;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-left: 4px solid #42b983;
  font-size: 1.5em;
}

.year-input {
  font-size: 1.5em;
  text-align: center;
  width: auto;
  padding:0;
  margin: 0;
  width: 100px;
  border: 1px solid transparent;
  border-radius: 0px 20px 0px 20px ;
  transition: .3s;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
    display: none;
}
.skippers-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* font-size: 0.6em; */
  /* padding-right: 15px;   */
  padding: 0px 15px
}

.skippers-container > * {
  transition: .3s;
  cursor: pointer;
}
.skippers-container > *:hover{
  font-weight: bold;
  transition: .3s;
}
.year-input:focus {
  outline-style: none;
  color: rgb(0,150,130);

}

.year-input:hover {
  color: rgb(0,150,130);
  transition: .3s;
  border: 1px solid rgba(0,150,130,0.5);
  border-radius: 0px 20px 0px 20px ;
}


.btn {
  background-color: transparent;
  font-size: 1.4em;
  line-height: 50px;
  border:0;

  cursor: pointer;

}
.btn:focus {
  outline-style: none;
}
.btn-container {
  transition: .3s;
  line-height: 50px;
  border: 4px solid #42b983;
  border-bottom: 4px solid #42b983;
  border-radius: 20px 0px 20px 0px;
  padding: 0px 10px;
  margin: 0;
  /* cursor: pointer; */
}
.btn-container:hover {
  background-color: rgba(0, 200, 90, 0.2);
  transition: .3s;
}

.headers {
    font-size: 1.3em;
}
.list {
    text-align: right;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    cursor:default;
}

ul.list.items {
    border-bottom: 1px solid black;
}

.item {
    width: 19%;
    font-size: 1.5em;
    margin: 0 10px;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 830px){
    .year-input-container {
        font-size: 1em;
    }
    .item {
        font-size: 0.9em;
    }
}


</style>