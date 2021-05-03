<template>
  <div class="calendar">
    <CalendarInputs
       :months="months"
       :fetchDates="fetchDates"
       @emitMonth="monthName = $event"
       @emitYear="year = $event"
       @emitCptChange="cptChanged = $event"
       />

    <WeekdayHeaders class="days-container header"  />
  <transition
  enter-active-class="animate__animated animate__fadeIn"
  leave-active-class="animate__animated animate__fadeOut"
  >
  
    <Days
      class="days-container"
      v-if="isChanged"
      :getReminders="getReminders"
      :detailedDates="detailedDates"
      :reminders="reminders"
      :annuals="currMonthAnnuals" 
    />
  </transition>
  <div class="loader" v-if="!getIsReminders">
    <Loader />
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Days from './Days.vue'
import WeekdayHeaders from './WeekdayHeaders.vue'
import CalendarInputs from './CalendarInputs.vue'
import Loader from './Loader.vue'
const Calendar = {
  components: {
    CalendarInputs,
    Loader,
    WeekdayHeaders,
    Days
  },
  props: {
    reminders: Array,
    onlyAnnualReminders: Array,
    getReminders: Function,
    isLoaded: Boolean
  },
  data() {
    return {
      cptChanged: true,
      month: "",
      monthName: "",
      year: "",
      hiddenLoading:false,
      index: null,
      currMonthAnnuals: [],
      detailedDates: null,
      months: [
        "January","February","March","April","May","June","July","August","September",
        "October","November","December"
      ],
      // reminders: []
    };
  },   
  computed: {
    isChanged: function(){ return this.cptChanged },
    getIsReminders: function(){ return this.isLoaded},
  },

  methods: {
    fetchDates: function (month, year) {
      const jlmId = "281184";
      axios
        .get(
          `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=${year}&month=${month+1}&ss=on&mf=on&c=on&b=40&d=on&geo=geoname&geonameid=${jlmId}&m=0&s=on`
        )
        .then((response) => {
          this.detailedDates = response.data.items;
          return this.detailedDates
        })
        .then(data => {
          this.hiddenLoading = true
            this.detailedDates = this.mergeDetails(data)
            this.month = month
            this.monthName = this.months[month]
            this.year = year
        })
        .catch(err => console.log('err @calendar: ',err))
        this.hiddenLoading = false
    },
    isReminders: function(date){
      let reminders = this.reminders
      return reminders.some(reminder => reminder.date === date)
    },
    checkPregYear: function(hebrewArr){
     return (hebrewArr[2] === 'א׳' || hebrewArr[2] === 'ב׳')
    },
    getCurrHebMonths: function(){
      let currDates= this.detailedDates
      let mappedCurrHebMonths = currDates.map(date => date.hebrew.split(' ')[1])
      let currHebMonths = mappedCurrHebMonths.filter(onlyUnique)
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
      return currHebMonths
    },
    getCurrMonthAnnuals: function(month,year){
      let annuals = this.onlyAnnualReminders
      let currMonthAnnuals = []
      annuals.forEach(annual => {
        if (annual.isAnnual){
          let annualMonth = new Date(annual.date).getMonth()
          if (annualMonth === month){
           currMonthAnnuals.push(annual)
          }
        }
        if (annual.isAnnualHeb){
            let annualHebArr = annual.hebDate.split(' ')
            let annualHebMonth = annualHebArr[1]
            let currHebMonths = this.getCurrHebMonths()
            if (currHebMonths.indexOf(annualHebMonth) !== -1){
              currMonthAnnuals.push(annual)
            } 
        } 
      })
      return currMonthAnnuals
    },



    mergeDetails: function(details) {
        let merged = []
        let currMonthDay = 0
        details.forEach((detail) => {
            let date = detail.date
            let monthDay = new Date(date).getDate()
            let weekDay = new Date(date).getUTCDay()
            if (monthDay !== currMonthDay){
                merged.push(detail)
                currMonthDay = monthDay
            } else {
                if (detail.category === 'candles') merged[monthDay-1].time = new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                merged[monthDay-1].hebrew += (detail.hebrew === 'הדלקת נרות')? '' : `\n${detail.hebrew}`
            }
                merged[monthDay-1].weekDay = weekDay

        })
        return merged        
    }
  },
  watch: {
    cptChanged: function(){

      setTimeout(() => {
        this.cptChanged = true
        this.currMonthAnnuals =  this.getCurrMonthAnnuals(this.month,this.year)
        console.log('all annuals! ',this.onlyAnnualReminders)
        console.log('changed!')
      }, 500)
    },
     reminders: function(){
       console.log('reminders changed!')
       this.currMonthAnnuals = this.getCurrMonthAnnuals(this.month,this.year)       
     },
     isLoaded: function(){
       console.log('isLoaded changed!')
     },
     hiddenLoading: function(){
       console.log('hiddenLoading changed!')
     }

  },


  mounted: function () {
    this.month = (this.month === '')? new Date().getMonth(): this.month
    this.monthName = this.months[this.month]
    this.year = (this.year === '')?  new Date().getFullYear() : this.year
    this.currMonthAnnuals =  this.getCurrMonthAnnuals(this.month,this.year)
    this.fetchDates(this.month,this.year)
  }
};
export default Calendar;
</script>


<style scoped>
.calendar {
  position: relative;
}

.header {
    font-size: 2em;
}

.calendar {
  margin: 0;
}

.hidden {
  display: none;
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



</style>