// import {a} from "./a"

// import {b} from "./b"
// import pic from "./img/shanghai.png"
// import "./index.css"
// import axios from "axios"


// axios.get('/api/info')
// .then(res => {
//     console.log(res)
// })


// if (module.hot) {
//     module.hot.accept("./a", () => {
//     document.body.removeChild(document.getElementById("number"));
//     a();
//     });
// }






// a()
// b()
// var img = new Image()
// img.src = pic
// var el = document.querySelector("#root")
// el.append(img)
// console.log(pic)

// function sg() { 
//     console.log("你好帅哥！！")
//  }

//  sg()

import "./other.css"
// import {b} from "./b"
// import {a} from "./a"
// b()
// a()
// var btn = document.createElement('button')
// btn.innerHTML = "新增"
// document.body.appendChild(btn)

// btn.onclick = function(){
//     var div = document.createElement('div')
//     div.innerHTML = "nihao"
//     document.body.bappendChild(div)
// }
// if(module.hot){
//     module.hot.accept('./a', () => {
//         console.log('123')
//     })
// }
// js文件更新了，页面没有反应，所以要用module.hot进行处理不会对页面进行更新
// HMR对css文件支持比较好，对js就不行了，所以需要用module.hot处理



// Es6  babel

let obj = 'ad'
    const WEBAPI = require('apifm-webapi')
    WEBAPI.init('gooking')
    WEBAPI.banners().then(res => {
    // 输出请求结果
    console.log(res)
    }).catch(err => {
    console.error(err)
    }).finally(() => {
    console.log('request complete!')
    })