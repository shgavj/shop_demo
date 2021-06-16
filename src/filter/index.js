import Vue from 'vue'
// import moment from 'moment'  //插件打包完之后太大了，所以改用date-fns
import format from 'date-fns/format'

Vue.filter('date-format', function (value, formatStr='yyyy-MM-dd HH:mm:ss'){
    return format(value, formatStr);
})
