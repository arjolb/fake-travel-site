const path=require('path');
module.exports={
    entry: './app/assets/scripts/App.js',
    output:{
        path: path.resolve(__dirname,'app/scripts'),
        filename: "App.js"
    },
    module:
    {
        rules:
        [
            {
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                      }
                },
                test: /\.js$/,
                exclude:/node_modules/
            }
            ]
        }
};