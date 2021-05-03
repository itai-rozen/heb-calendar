<template>
    <div class="day-detail-container " :class="hiddenAddModal ? '':'darken'" >
        <div class="date-info">
                <div class="date-param ">{{getDate(detailDate)}}</div>
                <div class="date-param ">{{detailHebDate}}</div>
        </div> 
        <div class="reminder-list">
            <div v-if="isReminders">
                <ul v-for="(reminder,i) of this.filteredReminders" :key="i+'rour'">
                    <li class="reminder-list-item"> 
                        <div class="list-item-container">
                            <div class="buttons">
                        <button @click="openEditModal(reminder._id)">&#128393;</button>
                        <button @click="deleteReminder(reminder._id)">&#x2326;</button>
                            </div>
                        <div class="reminder-time" v-if="reminder.time">{{reminder.time}}</div>
                        <div class="reminder-time" v-else> </div>
                        <div class="reminder-text">  {{reminder.text}}</div>&nbsp;
                        <div class="reminder-annual" v-if="reminder.isAnnual || reminder.isAnnualHeb">🕯</div>
                        <div class="reminder-annual" v-else> </div>
                        </div>
                    </li>
                </ul>
                <ul v-for="(annual,i) of this.filteredAnnuals" :key="i+'annual'">
                    <li class="reminder-list-item"> 
                        <div class="annual list-item-container">
                            <div class="buttons">
                        <button @click="openEditModal(annual._id)">&#128393;</button>
                        <button @click="deleteReminder(annual._id)" disabled>&#x2326;</button>
                            </div>
                        <div class="reminder-time" v-if="annual.time">{{annual.time}}</div>
                        <div class="reminder-time" v-else> </div>
                        <div class="reminder-text">  {{annual.text}}</div>&nbsp;
                        <div class="reminder-annual" >🕯</div>
                        </div>
                    </li>
                </ul>

            </div>
            <div v-else>
            </div>
        </div>
            <button class="add-modal-btn" @click="hiddenAddModal = !hiddenAddModal" 
                                          :disabled="!hiddenLoading || !hiddenAddModal">
                Add Reminder +
            </button>
        <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >
        <AddReminder 
        v-if="!hiddenAddModal"
        :date="detailDate"
        :hebDate="detailHebDate"
        :addReminder="addReminder"
        @hiddenAddModal="hiddenAddModal = $event"
         />
        </transition>
        <div v-if="isReminders">
        <transition
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
        >    
        <EditReminder  
            v-if="!hiddenEditModal"
            :id="chosenId"
            :hiddenModal="hiddenEditModal"
            :reminders="reminders"  
            :getReminders="getReminders"              
            @hiddenEditModal="hiddenEditModal = $event"
        />
        </transition>
        </div>


        <div class="loading " v-if="!hiddenLoading">
            <Loader />
        </div>
    </div>

</template>

<script>
import AddReminder from './AddReminder.vue'
import EditReminder from './EditReminder.vue'
import Loader from './Loader.vue'
import ReminderService from './../ReminderService.js'
const DayDetailes =  {
    components: {
        AddReminder,
        EditReminder,
        Loader
        },
    data(){
        return {
            chosenId : null,
            params: this.$route.params,
            detailDate: this.$route.params.date,
            detailHebDate: this.$route.params.hebDate,
            reminders: this.$route.params.reminders,
            checkLoazi: this.$route.params.checkAnnualLoazi,
            checkIvri:this.$route.params.checkAnnualHeb,
            getDayObj: this.$route.params.getDayteObj,
            getHebDayObj: this.$route.params.getHebDateObj,
            annuals: this.$route.params.annuals,
            getHomeReminders: this.$route.params.getReminders,
            hiddenAddModal: true,
            hiddenEditModal: true,
            hiddenLoading: true,
        }
    },
    computed: {
        filteredReminders: function(){
            if (this.isReminders) return this.reminders.filter(reminder => reminder.date === this.params.date)
            // return this.mockreminders
        },
        isReminders: function(){
            return this.reminders
        },
        isAnnuals: function(){ 
            return this.annuals
        },

        filteredAnnuals: function(){
            if (this.isAnnuals){
                return this.annuals.filter(annual => {
                    let isAnnual = this.checkLoazi(new Date(annual.date),new Date(this.detailDate))
                    let isAnnualHeb = this.checkIvri(annual.hebDate,this.detailHebDate)
                    if (isAnnualHeb || isAnnual) {
                        return annual
                        }
                })
            }
        },
        isLoading: function(){
            return this.hiddenLoading
        }
    },
    methods: {
        getDate: function(item){
            let returnedString 
            if (item === this.params.date) returnedString = new Date(item).toLocaleDateString()
            else if (item !== this.params.hebDate ||
                     item !== this.params.time) return
            else returnedString = item
            return returnedString 
        },

        getReminders: function(){
        ReminderService.getReminders()
        .then(data => {
            this.hiddenLoading = true
            this.reminders =  data.data
            console.log('reminders on getReminders: ',this.reminders)
        })
        .catch(err => console.log('error @DayDetails: ',err))
            this.hiddenLoading = false
        },

        toggleAddModal: function(){
            this.hiddenAddModal = !this.hiddenAddModal
            if (!this.hiddenAddModal){
                    this.$nextTick(() => {
                    this.$refs.text.focus()
                });
            }
        },

        openEditModal: function(id){
            if (!this.hiddenEditModal) return
            this.chosenId = id
            this.hiddenEditModal = false
        },

        closeEditModal: function(){
            this.hiddenEditModal = true
        },

        addReminder: function(text,time,date,hebDate,isAnnual,isAnnualHeb){
            if (text === '') return
            this.hiddenLoading = false
            ReminderService.postReminder(
                text,
                time,
                date,
                hebDate,
                isAnnual,
                isAnnualHeb
            )
            .then(res => {
                this.clearInputs()
                this.toggleAddModal()
                this.getReminders()

            })
        },

        clearInputs: function(){
            this.reminderText = ''
            this.reminderTime = null
            this.hiddenModal = true
        },
        deleteReminder(id){
            this.hiddenLoading = false
            ReminderService.deleteReminder(id)
            .then(res => {this.getReminders()})
            
        },
        emitReminders(){
            this.$emit('emitReminders',reminders)
        }
    },
    destroyed(){
        this.getHomeReminders()
    }


    
    
    
}
export default DayDetailes
</script>

<style scoped>

* {
    transition: .3s;
}

*:hover {
    transition: .3s;
}

 .day-detail-container{
    border: 2px solid black;
    height: 80vh;
    width: 100vw;
}
.date-info {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;

}
.date-param {
    text-align: right;
    margin: 15px;
    font-size: 1.4em;
    
}
.edit-modal-container {
    position: absolute;
    z-index: 3;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 2px solid black;
    text-align: left;
}
.add-modal-container {
    margin: 0 auto;
    width: 80vw;
}
.close{
    color: red;
}
.hidden {
    display: none;
}
.annual {
    background: linear-gradient( 270deg, rgba(240, 176, 38, 0.4), white ) ;
    border-radius: 13px;
}
.reminder-list-item {
    background-color: yellow;
    height: auto;
    /* width: 100vw; */
}
.list-item-container {
    width: 100%;
    text-align: right;
    float: right;
    text-shadow: 1px 1px transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 10px;
    height: 1em;
    line-height: 1em;
    border-bottom: 5px solid transparent;
} 
.reminder-text, .reminder-time {
    font-size: 0.6em;
}
.reminder-text {
    width: 600px;
    margin-right: 15px;
}

.reminder-time {
    width: auto;
}
.buttons {
    opacity: 0;
}

.buttons > button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 0.7em;
    line-height: 1em;
    border-right: 3px solid transparent; 
    border-top: 3px solid transparent;
}

.list-item-container:hover {
    border-bottom: 2px solid rgb(0,150,30);
    text-shadow: 1px 1px black;
    border-bottom-left-radius: 12px;
    border-block-end-width: 5px;
}

.list-item-container:hover .buttons{
    opacity: 1;
}

.buttons > button:hover {
    border-right: 3px solid rgb(0,150,30); 
    border-top: 3px solid rgb(0,150,30);
    background-color: rgb(0,150,30);
    color: rgb(255,255,255);
    border-top-left-radius: 13px;
}

.add-modal-btn {
    border: none;
    display: block;
    position: absolute;
    bottom:10%;
    float: left;
    margin: 15px;
    cursor: pointer;
    background-color: white;
    padding: 15px;
    border-radius: 14px;
    border: 4px solid rgb(0,150,30);
    font-size: 1.2em;
}

.add-modal-btn:hover {
    background-color: rgb(0,150,30);
    color: white;
}
@media screen and (max-width:830px){
    .date-param {
        font-size: 1em;
    }

    .add-modal-btn {
        font-size: 0.8em;
        margin: 0 5px ;
    }

    .list-item-container {
    margin: 0px;
    margin-right: 2px;
    font-size: 0.8em;
    line-height: 0.8em;
    border-bottom: 3px solid transparent;
    } 

.buttons > button {
    font-size: 0.5em;
    border-right: 2px solid transparent; 
    border-top: 2px solid transparent;
}
.reminder-text {
    width: 400px;
    margin-right: 15px;
}
}

@media screen and (max-width: 420px){
    .list-item-container {
        justify-content: space-evenly;
        font-size: 0.6em;
    }
}





</style>