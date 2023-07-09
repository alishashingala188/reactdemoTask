module.exports={
    //connection 

    HOST : "localhost",
    USER : "root",
    PASSWORD :"",
    DB : "demotask",
    dialect :"mysql",
    pool:{
        mix :5,
        min:0,
        acquire :30000,
        idel : 10000
    }
}