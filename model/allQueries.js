var con=require("../config/connection")
var knex=require("knex")(con);

module.exports.findwhere=function(table_name,obj){
    return knex.from(table_name).select("*").where({'utype':obj.utype,'unm':obj.unm})
}
module.exports.findCustomer=function(table_name){
    return knex.from(table_name).select("*").where({'utype':'c'})
}
module.exports.getTransactions=function(table_name,obj){
    return knex.from(table_name).select("*").where({'uid':obj.uid})
}
module.exports.insert=function(table_name,obj){
    return knex(table_name).insert(obj,'*')
}
module.exports.update=function(table_name,where,set){
   return knex(table_name).where(where).increment(set,'*')
}
module.exports.modify=function(table_name,where,set){
    return knex(table_name).where(where).decrement(set,'*')
 }