module.exports={
    path:'wish',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Wish"))
        })
    }
}