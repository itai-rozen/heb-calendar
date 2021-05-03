import axios from 'axios'
const url = 'api/reminders/'

class ReminderService  {
    static getReminders(){
        console.log('entered getReminders')
        return axios.get(url)
    }

    static postReminder(text,time,date,hebDate,isAnnual,isAnnualHeb){
        return axios.post(url, {
            text,time,date,hebDate,isAnnual,isAnnualHeb
        })
    }

    static deleteReminder(id){
        return axios.delete(`${url}${id}`)
    }

    static editReminder(id, text,time,date,hebDate,isAnnual,isAnnualHeb){
        console.log('entered editReminder')
        return axios.patch(`${url}${id}`, {
            text,
            time,
            date,
            hebDate,
            isAnnual,
            isAnnualHeb
        })
        .catch(err => console.log('patch error: ', err) )        
    }
}


export default ReminderService