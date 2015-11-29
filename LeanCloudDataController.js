var AV = require('leanengine');
var JoinInfo = AV.Object.extend("JoinInfo"); 
 
exports.saveJoinInfo = function(name,phone,num){

    var item = new JoinInfo();
    item.set("UserName",name);
    item.set("Phone",phone);
    item.set("Num",Number(num));

    item.save();

};