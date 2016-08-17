var React=require("react");
var ReactDOM=require("react-dom");
var Header=require("./Common/Header/Header");
var Footer=require("./Common/Footer/Footer");
var Home=require("./Page/Home/Home");

var App=React.createClass({
    render:function(){
        return(
            <div>
                <Header />
                <Home />
                <Footer />
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById("app")
)