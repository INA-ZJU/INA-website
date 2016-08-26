var React=require("react");
var ReactDOM=require("react-dom");
var routeObj=require("react-router");
var Router=routeObj.Router;
var Route=routeObj.Route;
var hashHistory=routeObj.hashHistory;
var IndexRedirect=routeObj.IndexRedirect;
var Header=require("./Common/Header/Header");
var Footer=require("./Common/Footer/Footer");
var Home=require("./Page/Home/Home");
var Team=require("./Page/Team/Team");
var Department=require("./Page/Department/Department");
var Project=require("./Page/Project/Project");
var Company=require("./Page/Project/Company/Company");
var Works=require("./Page/Project/Works/Works");
var Member=require("./Page/Member/Member");
var Join=require("./Page/JoinUS/JoinUS");
var Wish=require("./Page/Wish/Wish");
var Form=require("./Page/Form/Form");

var App=React.createClass({
    render:function(){
        return(
            <div>
                <Header />
                    {this.props.children}
                <Footer />
            </div>
        )
    }
});

var Root=React.createClass({
    render:function(){
        return(
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRedirect to="/home" />
                    <Route path="/home" component={Home} />
                    <Route path="/team" component={Team} />
                    <Route path="/department" component={Department} />
                    <Route path="/member" component={Member} />
                    <Route path="/project" component={Project}>
                        <IndexRedirect to="/company" />
                        <Route path="/company" component={Company} />
                        <Route path="/works" component={Works} />
                    </Route>
                    <Route path="/join" component={Join} />
                    <Route path="/wish" component={Wish} />
                    <Route path="/form/:department" component={Form} />
                </Route>
            </Router>
        )
    }
});

ReactDOM.render(
    <Root />,
    document.getElementById("app")
)