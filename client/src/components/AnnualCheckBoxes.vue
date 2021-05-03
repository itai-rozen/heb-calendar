<template>
  <div class="checkbox-container">
      <div class="annual-container">
      <label class="label" for="annual">
      <input :checked="isAnnual" class="checkbox" type="checkbox" name="annual" id="annual" @click="emitAnnual('isAnnual')">
          set reminder every year at this date ({{date}})</label>
      </div>
      <div class="annual-container">
      <label class="label" for="annualHeb">
      <input :checked="isAnnualHeb" class="checkbox" type="checkbox" name="annualHeb" id="annualHeb" @click="emitAnnual('isAnnualHeb')">
          set reminder every year at this date ({{hebDate}})</label>
      </div>
  </div>
</template>

<script>
export default {
name:'AnnualCheckBoxes',
props: {
   date: String,
   hebDate: String,
   isAnnual: Boolean,
   isAnnualHeb: Boolean
},

methods: {
    report: function(){
        console.log('annual: ',this.isAnnual)
        console.log('annual heb: ',this.isAnnualHeb)
    },
    emitAnnual: function(bool){
        this[bool] = !this[bool]
        this.$emit('emitAnnual', this.isAnnual)
        this.$emit('emitAnnualHeb', this.isAnnualHeb)
    }
}
}
</script>

<style scoped>
.checkbox-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
.annual-container {
    text-align: left;
    margin-left: 70px;
}
.label {
     font-size: 1rem;
 }


 @media screen and (max-width:830px){
     .annual-container {
         font-size: 0.5em;
     }
     .input-container {
         font-size: 0.5em;
     }
     .label {
         font-size: 0.7rem;
     }
 }

</style>