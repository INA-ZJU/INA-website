module.exports={
    path:'home',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Home"))
        })
    }
}