<template>
    <div  @keydown.stop.esc="closeModal" class="wrapper">
        <div class="edit-modal-container">
            <div class="close" @click="closeModal">X</div>
            <textarea class="text-input" ref="text" name="text-edit" id="" cols="60" rows="2" v-model="getText" ></textarea>
            <input type="time" class="time-input" name="time-edit" id="" v-model="getTime"  />
            <AnnualCheckBoxes
            :date="chosenReminder.date"
            :hebDate="chosenReminder.hebDate"
            :isAnnual="isAnnual"
            :isAnnualHeb="isAnnualHeb"
            @emitAnnual="isAnnual = $event"
            @emitAnnualHeb="isAnnualHeb = $event"
            />
            <button tabindex="3" class="edit-btn"  @click="updateReminder" >Save Changes</button>
        </div>
    </div>
</template>

<script>
import ReminderService from './../ReminderService.js'
import AnnualCheckBoxes from './AnnualCheckBoxes.vue'
export default {
name: 'EditReminder',
components: { AnnualCheckBoxes },
props: {
    reminders: Array,
    getReminders: Function,
    hiddenModal:Boolean,
    id: String
},
data(){
    return {
        chosenReminder: '',
        timeEdit:'',
        textEdit: '',
        isAnnual: null,
        isAnnualHeb: null
    }
},
computed: {
    getReminderById: function(){
         return (this.reminders.filter(reminder => reminder._id === this.id))[0]
    },
    getTime: {
        get: function(){ return (this.timeEdit) },
        set: function(timeInput){this.timeEdit = (timeInput !== '')? timeInput : this.timeEdit  }
    },
    getText:{
        get: function(){ return (this.textEdit) },
        set: function(textInput){this.textEdit = (textInput !== '')? textInput : this.textEdit}
    }
},

methods: {
    closeModal: function(){
        this.$emit('hiddenEditModal',true)
    },
    updateReminder: function(){
        // Reminderservice stuff
        let id = this.chosenReminder._id
        let date = this.chosenReminder.date
        let hebDate = this.chosenReminder.hebDate
        let text = this.textEdit
        let time = this.timeEdit
        let isAnnual = this.isAnnual
        let isAnnualHeb = this.isAnnualHeb
        ReminderService.editReminder(id,text,time,date,hebDate,isAnnual,isAnnualHeb)
        .then(res => {
            this.getReminders()
            this.closeModal()
        })
    }
},
mounted: function() {
 this.chosenReminder = this.getReminderById
 this.textEdit = this.chosenReminder.text
 this.timeEdit = this.chosenReminder.time 
 this.isAnnual = this.chosenReminder.isAnnual
 this.isAnnualHeb = this.chosenReminder.isAnnualHeb
 this.$refs.text.focus()
}


}
</script>

<style>

* {
    transition: .3s;
}

*:hover {
    transition: .3s;
}

.edit-modal-container {
position:relative;
height: 50vh;
width: 50vw;
border: 3px solid rgb(0,130,50);
border-radius: 13px;
background-color: white;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
font-size: 2em;
}

.text-input, .time-input {
    margin:   5px;
    padding: 10px;

}
.text-input {
    width: 75%;
    height: 50px;
    font-size: 0.7em;
    padding: 2px;
    text-indent: 2px;
    
}

.time-input {
    height: 30px;
    font-size: 0.7em;
}
.close {
    position: absolute;
    top:0;
    left: 0;
}

.edit-btn {
    border: 4px solid transparent;
    background-color: transparent;
    font-size: 1em;
    cursor: pointer;
    width: 50%;
    padding: 5px;
    border-radius: 13px 13px 13px 0;
    margin: 0 auto;
}

.edit-btn:hover {
    border: 4px solid rgb(0,130,50);
}

@media screen and (max-width:830px){
    .edit-modal-container {
    position:relative;
    height: 70vh;
    width: 70vw;
    border: 2px solid rgb(0,130,50);
    border-radius: 13px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1.2em;
    }
}
</style>