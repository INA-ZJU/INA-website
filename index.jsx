var React=require("react");
var ReactDOM=require("react-dom");
var style=require("./index.css");

var App=React.createClass({
    render:function(){
        return(
            <div className={style.title}>
                Hello World
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.body
)