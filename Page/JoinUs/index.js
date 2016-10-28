module.exports={
    path:'join',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./JoinUs"))
        })
    }
}