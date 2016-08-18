var webpack=require("webpack");
module.exports={
    entry: {
        './Page/Home/build/index':'./index.jsx',
        './Page/Team/build/Team':'./Page/Team/Team.jsx',
        './Page/Department/build/Department':'./Page/Department/Department.jsx',
        './Page/Project/build/Project':'./Page/Project/Project.jsx'
    },
    output:{
        filename:'[name].bundle.js'
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
        new webpack.NoErrorsPlugin()
    ]
}