<template>
<div class="container">
      <div  class="days-container" v-if="isdetailedDates">
        <div v-for="num in getFirstWeekDay" :key="num">
            <div> </div>
        </div>
      <Day
        class="day"
        
        v-for="(date, i) in detailedDates"
        :isReminder="isReminders(date.date)"
        :isAnnual="isAnnuals(date.date,date.hebrew)"
        :reminders="reminders"
        :annuals="annuals"
        :checkAnnualLoazi="checkAnnualLoazi"
        :checkAnnualHeb="checkAnnualHeb"
        :getDateObj="getDateObj"
        :getHebDateObj="getHebDateObj"
        :key="i + 'date'"
        :date="date.date"
        :hebDate="date.hebrew"
        :time="date.time"
        :getReminders="getReminders"
        
      />
    </div>
    <div v-else>no dates available for the month\year provided :(</div>
</div>
</template>

<script>
import Day from './Day.vue'
export default {
name: 'Days',
components: {
    Day
},
props: {
    detailedDates: Array,
    reminders: Array,
    annuals:Array,
    getReminders:Function
},
data(){
  return {

  }
},
computed: {
    isdetailedDates: function () {
    return this.detailedDates;
        },
    getFirstWeekDay: function(){ 
        return this.detailedDates[0].weekDay
    }
},
methods: {
    isReminders: function(date){
      let reminders = this.reminders
      return reminders.some(reminder => reminder.date === date)
    },
    isAnnuals: function(detailDate,detailDateHeb){
      let annuals = this.annuals
      let isAnnual = false
      let isAnnualHeb = false
      
      let filteredAnnuals = annuals.filter(annual => {
        if (annual.isAnnual){
          isAnnual = this.checkAnnualLoazi(new Date(annual.date),new Date(detailDate))
        }
        if (annual.isAnnualHeb){
          isAnnualHeb = this.checkAnnualHeb(annual.hebDate, detailDateHeb)
        }
        if (isAnnual || isAnnualHeb ) return annual
      })
        return filteredAnnuals.length > 0
},
    checkAnnualLoazi: function(aDate,dDate){
      let dObj = this.getDateObj(dDate)
      let aObj = this.getDateObj(aDate)
      return (dObj.day === aObj.day &&
              dObj.month === aObj.month &&
              dObj.year !== aObj.year
              )
},
    checkAnnualHeb: function(aDate,dDate){
      let aObj = this.getHebDateObj(aDate)
      // console.log('annual object hebrew date: ',aObj)
      let dObj = this.getHebDateObj(dDate)
      // console.log('detailDate object hebrew date: ',dObj)
      let sameDay = aObj.day === dObj.day
      let sameYear = aObj.year === dObj.year
      let sameMonth;
      if (aObj.isPreg && dObj.isPreg){
        sameMonth = (aObj.pregMonth === dObj.pregMonth)
      } else if(!aObj.isPreg && dObj.isPreg){
        sameMonth = (dObj.month === aObj.month &&
                     dObj.pregMonth === 'ב׳')
      } else if(aObj.isPreg && !dObj.isPreg){
        sameMonth = (dObj.month === aObj.month)
      } else if (!aObj.isPreg && !dObj.isPreg){
        sameMonth = (aObj.month === dObj.month)
      }
        return (sameDay && sameMonth && !sameYear)
    },
    getHebDateObj(hebDate){
      let hebDateArr = hebDate.split(' ')
      let isPreg = this.checkPreg(hebDateArr)
      return {
        day: hebDateArr[0],
        month: hebDateArr[1],
        isPreg: isPreg,
        pregMonth: (isPreg)? hebDateArr[2] : '',
        year: (isPreg)? hebDateArr[3] : hebDateArr[2]
      }
///   
///  
    },
    getDateObj: function(date){
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    },
    checkPreg: function(arr){
      return (arr[2] === 'ב׳' || arr[2] === 'א׳')
    }, 
    getHebYearIdx: function(){}
},


}
</script>

<style scoped>
* {
  box-sizing: border-box;
}


.days-container {
    text-align: center;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 98vw;
    box-sizing: border-box;
  }



  
</style>