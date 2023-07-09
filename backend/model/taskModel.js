const { DataTypes } = require("sequelize");
const db = require("./index");

const task = db.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: { 
        type: DataTypes.STRING,

    },
   
    date: {

        type: DataTypes.STRING, 
    },
    description:{
        type:DataTypes.STRING,
    },
    time: {

        type: DataTypes.STRING,
    },

   
    // token:{
    //     type:DataTypes.STRING
    // },
    // verifyToken:{
    //     type:DataTypes.STRING
    // }

},

    {
        paranoid: true
    },

    {
        tableName: "Tasks"
    },
    );
         
    



(async () => {
    await db.sync({ force: false });
    console.log('sync here..')
})();

module.exports = task;