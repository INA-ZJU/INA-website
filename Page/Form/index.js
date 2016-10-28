module.exports={
    path:'form/:department',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Form"))
        })
    }
}