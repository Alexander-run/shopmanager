const Sequelize = require('sequelize')
const config =require('../config/dbInfo')

const sequelize= new Sequelize(config.database,config.username,config.password,{
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    pool: {   //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000
  },
});

const Products = sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
    },
    price:{
        type:Sequelize.INTEGER,
    },
    quantity:{
        type:Sequelize.INTEGER,
        default:10
    },
    onSale:{
        type:Sequelize.BOOLEAN,
        default:false
    },
    content:{
        type:Sequelize.TEXT,
    },
    coverImg:{
        type:Sequelize.STRING,
    },
},{timestamps:false});
Products.sync({alter:true});
module.exports = {Products,};