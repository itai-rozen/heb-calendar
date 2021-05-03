<template>
  <div class="container">
    <ul class="headers list">
      <li @click="sortByCategory('date',signs.date)"  class="header-item"><span :class="(signs.date)? 'arrow-up':'arrow-down'">ᐃ</span> תאריך לועזי</li>
      <li @click="sortByCategory('date',signs.date)" class="header-item">תאריך עברי</li>
      <li @click="sortByCategory('text',signs.text)" class="header-item "><span :class="(signs.text)? 'arrow-up':'arrow-down'">ᐃ</span> תזכורת</li>
      <li @click="sortByCategory('time',signs.time)" class="header-item"><span :class="(signs.time)? 'arrow-up':'arrow-down'">ᐃ</span> שעה</li>
      <li>?בכל שנה</li>
    </ul>
    <ul class="list" v-for="reminder in reminders" :key="reminder._id">
      <li>{{reminder.date}}</li>
      <li>{{reminder.hebDate}}</li>
      <li>{{reminder.text}}</li>
      <li>{{reminder.time}}</li>
      <li>{{getAnnualType(reminder)}}</li>
    </ul>
    <div v-if="!hiddenLoading">
    <Loader  />
    </div>
  </div>
</template>

<script>
import ReminderService from './../ReminderService.js'
import Loader from './../components/Loader.vue'
export default {
  name: 'Reminders',
  components:{ Loader },
  data(){
    return {
      reminders: [],
      hiddenLoading: false,
      signs: {
        date: false,
        hebDate: false,
        time: false,
        text: false,
        annual: false
      }
}
  },
  methods:{
    getAnnualType: function(reminder){
      let output = ''
      if (reminder.isAnnual && !reminder.isAnnualHeb) output = 'לועזית'
      if (!reminder.isAnnual && reminder.isAnnualHeb) output = 'עברית'
      if (reminder.isAnnual && reminder.isAnnualHeb) output = 'עברית ולועזית'
      return output
      
    },
    sortByCategory: function(category,sign){
      this.reminders.sort(this.compare(category,sign))
      this.signs[category] = !this.signs[category]
      for (let booli in this.signs){
        if (booli !== category) this.signs[booli] = false
      }
},
    compare: function(prop,sign){
      if (sign){
        return function(a,b){
          return (a[prop] > b[prop])? 1 : -1
        }
      } else {
        return function(a,b){
          return (a[prop] > b[prop])? -1 : 1
        }
      }
    }
  },


  mounted: function(){
    console.log('hi created')
      ReminderService.getReminders()
    .then(data => {
      this.hiddenLoading = true
        this.reminders = data.data
      console.log('reminders in Reminders component: ',this.reminders)
    })
    .catch(err => console.log('error @Reminders cpt: ',err))
    this.hiddenLoading = false
  }
}
</script>

<style scoped>
* {
  transition: .3s;
}
*:hover {
  transition: .3s;
}
.container { 
  width: 100%;
  margin: 0;
}
.list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: left;
}

.header-item{
  border-bottom: 3px solid transparent;
}

.header-item:hover {
  border-bottom: 3px solid rgb(0,130,50);
  border-bottom-right-radius: 13px;
}

.header-item:hover span {
  color: rgb(0,130,50);
}

li {
    width: 25vw;
    font-size: 1.5em;
    line-height: 1.5em;
    margin: 10px 0;
    padding-right: 10px;
    margin-right: 10px;
    cursor: default;
}

.header-item {
  cursor: pointer;
}

.hebDate { 
  cursor: unset;
}
li span {
  display: inline-block;
}
.arrow-up {
  transform: rotate(180deg);
}

@media screen and (max-width:830px){
  li {
    font-size: 0.9em;
  }
  .list  > * {
    margin: 5px;
  }

}

@media screen and (max-width: 420px){
   li {
     font-size: 0.6em;
   }
   .list {
     margin: 1px;
     padding: 1px;
   }
   .list > * {
     margin: 1px;
   }
}

</style>
