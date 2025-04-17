const express = require('express')

const app = express()

app.get('/api/info', (req, res) => {
    res.json({
        name: 'wang',
        age: '12',
        msg: '你好'
    })
})
app.listen(9001,() => {
    console.log("端口号901")
})