const express  = require('express')
const cors = require('cors')

const app= express()

var corOptions={
    origin :'*'
}  
//middle

app.use(cors(corOptions))
    
app.use(express.json())

app.use(express.urlencoded({extended:true}))

//routers
const router =require('./route/userRouter')
app.use('/api/user',router);

const Trouter =require('./route/taskRouter')
app.use('/api/task',Trouter);



//testing api

app.get('/',(req,res)=>{
        res.json({message :"hello from api"})
})

//port

const PORT = process.env.PORT || 4000

//server

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

