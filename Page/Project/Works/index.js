module.exports={
    path:'works',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require('./Works'))
        })
    }
}