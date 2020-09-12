var mysql=require("mysql");
/*module.exports=mysql.createPool({
host:'localhost',
user:'root',
password:'12345',
database:'bank'
});
*/
var options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'bank'
    }
}
module.exports=options;