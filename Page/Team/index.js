module.exports={
    path:'team',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Team"))
        })
    }
}