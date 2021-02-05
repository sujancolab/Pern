const Pool=require("pg").Pool;

const pool=new Pool({
    user:"postgres",
    password:"sujan",
    host:"localhost",
    database:"salesdb",
    port:5432
});
module.exports=pool;