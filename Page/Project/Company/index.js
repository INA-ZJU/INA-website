module.exports={
    path:'company',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Company"))
        })
    }
}