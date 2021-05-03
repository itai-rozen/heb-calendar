<template>
  <div class="home">
    <Calendar :isLoaded="isLoaded" :onlyAnnualReminders="annuals" :reminders="reminders" :getReminders="getReminders" />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Calendar from '@/components/Calendar.vue'
import ReminderService from './../ReminderService.js'
export default {
  name: 'Home',
  data(){
    return {
      reminders: [],
      annuals: [],
      isLoaded: false
    }
  },
  components: {
    Nav,
    Calendar
  },
  methods: {
    getReminders: function(){
    ReminderService.getReminders()
    .then(data => {
      this.reminders = data.data
      this.annuals = this.getAnnuals()
      console.log('reminders in Home: ',this.reminders)
      console.log('annuals in Home: ',this.annuals)
      this.isLoaded = true
    })
    .catch(err => console.log('error @calendar cpt: ',err))    
    },
    getAnnuals: function(){
    let reminders = this.reminders
    return reminders.filter(reminder => (reminder['isAnnual'] || reminder['isAnnualHeb'] ))
    }
  },
  created: function(){
    this.getReminders()
  }


}
</script>


