<template>
    <div  @keydown.stop.esc="emitClose" class="wrapper">

          <div class="add-modal-container">
            <div @click="emitClose" class="close">X</div>
            <div class="input-container">
            <p>Content</p> 
            <textarea class="text-input" ref="text" name="text" id="" cols="60" rows="2" v-model="reminderText"></textarea>
            </div>
            <div class="input-container">
             <p> Time (optional)</p>
            <input class="time-input" type="time" name="time" id="" v-model="reminderTime">
            </div>
            <AnnualCheckBoxes 
            :date="date" 
            :hebDate="hebDate" 
            :isAnnual="false"
            :isAnnualHeb="false"
            @emitAnnual="isAnnual = $event"
            @emitAnnualHeb="isAnnualHeb = $event"
            />
            <button class="add-btn"  @click="addReminder(reminderText,reminderTime,date,hebDate,isAnnual,isAnnualHeb)">Add</button>
        </div>
    </div>

</template>

<script>
import AnnualCheckBoxes from './AnnualCheckBoxes.vue'
const AddReminder = {
    props: {
        date: String,
        hebDate: String,
        addReminder: Function
    },
    components: { AnnualCheckBoxes },
    data(){
        return {
            reminderText: '',
            reminderTime: '',
            isAnnual: false,
            isAnnualHeb: false
        }
    },
    methods: {
        emitClose: function(){
             this.$emit('hiddenAddModal',true)
        }
    },
    mounted: function() {
        this.$refs.text.focus()
    }
} 
export default  AddReminder


</script>

<style >

* {
    transition: .3s;
}

*:hover {
    transition: .3s;
}

.wrapper {
position: absolute;
top: 0;
left: 0;
height: 100vh;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0.5);
transition: .3s;
}

.add-modal-container {
position: relative;
height: 50vh;
width: 50vw;
border: 3px solid rgb(0,130,50);
border-radius: 13px;
background-color: white;
display: flex;
flex-direction: column;
justify-content: space-around;
font-size: 1.6em;
}
.close {
    position: absolute;
    cursor: pointer;
}
.text-input, .time-input {
    margin:  auto 0;
    padding: 0;
}
.text-input {
    width: 75%;
    height: 50px;
    font-size: 0.7em;
    padding: 2px;
    border-radius: 13px 13px 13px 0;
    text-indent: 2px;
    
}

.text-input:focus {
    border: 2px solid rgb(0,130,50);
}

*:focus {
  outline-style: none;
}

.time-input {
    height: 30px;
    font-size: 0.7em;
    border: 2px solid transparent;
    cursor: pointer;

}

.time-input:focus {
    border: 2px solid rgb(0,130,50);
    border-radius: 13px 13px 13px 0;

}

p {
    margin-top: 10px;
    margin-bottom: 2px;
}

.add-btn {
    border: none;
    margin: 3px auto;
    cursor: pointer;
    background-color: transparent;
    font-size: 1.1em;
    width: 50%;
    border: 4px solid transparent;
}

.add-btn:hover {
    border: 4px solid rgb(0,130,50);
    border-radius: 13px 13px 13px 0;
}

@media screen and (max-width:830px){
    .add-modal-container {
        font-size: .8em;
        height: 70vh;
        width: 70vw;
        justify-content: space-between;
    }
    * {
        margin: 0;
    }

    * > * {
        margin: 0;
    }

    .time-input {
        margin: 0;
    }
}

</style>