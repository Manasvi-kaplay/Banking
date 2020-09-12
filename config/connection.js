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
        host: 'db4free.net',
        port:3306,
        user: 'manasvi',
        password: '100Scholars',
        database: 'banking100'
    }
}
module.exports=options;