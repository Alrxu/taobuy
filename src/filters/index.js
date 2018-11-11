
import Vue from 'vue'
import moment from 'moment'

Vue.filter('datefmt',(input,operation='YYYY-MM-DD')=>{
    return moment(input).format(operation)
})