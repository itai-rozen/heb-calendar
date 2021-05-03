
<template>
  <div class="inputs-container" >
    <div class="img-container">
    <img  @click="toggleDate = !toggleDate" class="calendar-img" src="./../../public/calendar.png" alt="" srcset="">
    </div>
    <transition
    enter-active-class="animate__animated animate__fadeInLeftBig animate__faster"
    leave-active-class="animate__animated animate__fadeOutLeftBig"    
    >
    <div class="inputs" v-if="toggleDate">

      <div class="skipper" @click="skipMonth(-1)">&lt;&lt;</div>
        <select name="months" class="dropdown" v-model="getCurrMonth" 
        @change="emitAndFetchDates(month, year)"
         >
          <option
        class="dropdown-content"
        v-for="(month, index) in months"
        :key="index + month"
        :value="index"
        :selected="getCurrMonth"
            >
            {{ month }}
          </option>
        </select>
      <div class="skipper" @click="skipMonth(1)">&gt;&gt;</div>

       <div class="year-input-container">
        <input class="year-input" type="number" id="year" name="year" min="0" v-model="getCurrYear" />
         <div class="skippers-container">
          <div class="increment" @click="skipYear(1)">&#x21E7;</div>
          <div class="decrement" @click="skipYear(-1)">&#x21E9;</div>
         </div>
       </div>

        <div class="btn-container">
          <button class="btn" @click="emitAndFetchDates(month, year)">submit</button>
        </div>


    </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: "CalendarInputs",
  data() {
    return {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      toggleDate: true
    };
  },
  props: {
    fetchDates: Function,
    months: Array
  },
  methods: {
      emitAndFetchDates : function(month,year){
          

          this.$emit('emitMonth', month)
          this.$emit('emitYear',year)
          this.$emit('emitCptChange', false)
          this.fetchDates(month,year)
      },

      skipMonth: function(sign){
        if (sign < 0){
          if (this.month === 0){
            this.month = 11
            this.year--
          } else this.month--
        } else {
          if (this.month === 11){
            this.month = 0
            this.year++
          } else this.month++
        }
        this.emitAndFetchDates(this.month,this.year)
      },
      skipYear: function(num){
        this.year += num
        this.emitAndFetchDates(this.month,this.year)
      }
  },
  computed: {
    getCurrMonth: {
      get: function(){     
          return  this.month
      },
      set: function(monthInput){
          this.month = monthInput
      }
    },
    getCurrYear: {
        get:  function (){
            return  this.year
        },
        set: function(yearInput){
            this.year = +yearInput
        }
    },
  }


  
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Rancho&display=swap');
* {
    font-size: 1.2em;
    font-family: 'Rancho',sans-serif;
}
.inputs-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position:relative;
  height: 50px;
}
.img-container {
  position: absolute;
  margin-left: -20px;
  border-left: 0;
  justify-self: flex-start;
  padding-left:50px;
  left: 5px;
  background-color: white;
  z-index: 1;
  cursor: pointer;

}

.calendar-img {
  height: 50px;
  width: auto;
  display: inline-block;
  background-color: transparent;
 
}

.inputs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 4px solid #42b983 ;
  border-bottom-right-radius: 13px;
  border-bottom-left-radius: 10px;
  border-collapse: collapse;
}

.dropdown {
  appearance: none;
  border: none; 
  padding: 0 15px;
  cursor: pointer;
  transition: .3s;
}

.dropdown:hover {
  color: rgb(0,150,130);
  transition: .3s;
}

.dropdown:hover .dropdown-content{
  color: black;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {

    display: none;
}
 .dropdown-content {
  width: inherit;
  color: black;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  font-size: 0.95em;
  /* padding: 12px 16px; */
}


*:focus {
  outline-style: none;
}
.year-input-container {
  appearance: none;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-left: 4px solid #42b983;
}

.year-input {
  text-align: center;
  border: none;
  transition: .3s;
}

.skippers-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.6em;
  /* padding-right: 15px;   */
  padding: 5px 15px
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
}


.btn {
  background-color: transparent;
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
  border-bottom: 0px;
  border-radius: 20px 0px 20px 0px;
  padding: 0px 10px;
  margin: 0;
  /* cursor: pointer; */
}
.btn-container:hover {
  background-color: rgba(0, 200, 90, 0.2);
  transition: .3s;
}

.skipper {
  margin: 0 10px;
  letter-spacing: 2px;
  cursor: pointer;
  font-weight: 400;
  transition: .3s;
}

.skipper:hover {
  font-weight: 700;
  transition: .3s;
}
.border-bottom {
  border-bottom: 4px solid #42b983;
}

.animate__animated.animate__fadeInLeftBig {
  left: 20px;
}

  .inputs-container {
    height:40px ;
  }
  .inputs {
    font-size: 0.8em;
  }

</style>