const { Sequlize,DataTypes } = require("sequelize");
const db = require("./index");

const Users = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: { 
        type: DataTypes.STRING,

    },
   
    lastName: { 
        type: DataTypes.STRING,

    },
    
    contact_no: {
        type: DataTypes.STRING,
        limit: 9
    },
    address: {

        type: DataTypes.STRING,
    },
    email: {

        type: DataTypes.STRING,
        limit: [25, "email cannot be greater than 25 characters"],


    },
    password: {

        type: DataTypes.STRING,
        limit: [16, "password cannot be greater than 16 characters"],

    },
    cpassword: {

        type: DataTypes.STRING,
        limit: [16, "password cannot be greater than 16 characters"],

    },

    

    token:{
        type:DataTypes.STRING
    },
    verifyToken:{
        type:DataTypes.STRING
    }

},

    {
        paranoid: true
    },

    {
        tableName: "users"
    },
    );
         
    



(async () => {
    await db.sync({ force: false });
    console.log('sync here..')
})();

module.exports = Users;