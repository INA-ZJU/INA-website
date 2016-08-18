var React=require("react");
var ReactDOM=require("react-dom");
var routeObj=require("react-router");
var Router=routeObj.Router;
var Route=routeObj.Route;
var Link=routeObj.Link;
var hashHistory=routeObj.hashHistory;
var IndexRedirect=routeObj.IndexRedirect;
var Header=require("./../../Common/Header/Header");
var Footer=require("./../../Common/Footer/Footer");
var style=require("./Project.css");
var $=require("jquery");
var Tags=require("./Tags/Tags");
var Company=require("./Company/Company");
var Works=require("./Works/Works");

var Project=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0
        }
    },
    childContextTypes:{
        midHeight:React.PropTypes.number
    },
    getChildContext:function(){
        return {
            midHeight:this.state.midHeight
        }
    },
    componentWillMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        })
    },
    componentDidMount:function(){
        $(window).resize(function(){
            var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
            this.setState({
                midHeight:midHeight-135
            })
        }.bind(this));
    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };
        return(
            <div>
                <Header />
                <div className={style.container} style={conStyle}>
                    <Tags />
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
});

var App=React.createClass({
    render:function(){
        return(
            <Router history={hashHistory}>
                <Route path="/" component={Project}>
                    <IndexRedirect to="/company"/>
                    <Route path="/company" component={Company} />
                    <Route path="/works" component={Works} />
                </Route>
            </Router>
        )
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("app")
);