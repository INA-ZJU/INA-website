var webpack=require("webpack");
module.exports={
    entry: {
        index:'./index.jsx'
    },
    output:{
        path:'./build',
        publicPath:'./build/',
        filename:'[name].bundle.js',
        chunkFilename:'[id].[chunkhash:5].chunk.js'
    },
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                loader:'babel',
                exclude:/node_modules/,
                query:{
                    presets:['react']
                }
            },
            {
                test:/\.css$/,
                loader:"style-loader!css-loader?modules"
            },
            {
                test:/\.(png|jpg|svg|gif|eot|woff|ttf)$/,
                loader:'url-loader?limit=8192'
            }
        ]
    },
    resolve:{
        extensions:['','.js','.jsx']
    },
    plugins:[
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify("production")
            }
        })
    ]
}