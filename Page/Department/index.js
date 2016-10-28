module.exports={
    path:'department',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Department"))
        })
    }
}