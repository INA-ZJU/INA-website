module.exports={
    path:'member',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Member"))
        })
    }
}