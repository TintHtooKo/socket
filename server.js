let express = require('express')
let app = express()
let socket = require('socket.io')

let server = app.listen(9000,()=>{
    console.log("server is running on port 9000");
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

let io = socket(server)
io.on('connection',(socket)=>{
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data)        
    })

    // user typing lote nay tae akhr user is typing so tr ko
    // ko tgi myin sa yar ma lo pal other people pal myin ag
    // socket.broadcast ko use tr
    socket.on('typing',(name)=>{
        socket.broadcast.emit('typing',name)        
    })
    
})