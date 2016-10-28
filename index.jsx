var React=require("react");
var ReactDOM=require("react-dom");
var routeObj=require("react-router");
var Router=routeObj.Router;
var hashHistory=routeObj.hashHistory;
var Header=require("./Common/Header/Header");
var Footer=require("./Common/Footer/Footer");

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

var rootRoute={
    childRoutes:[{
        path:'/',
        component:App,
        indexRoute:require("./Page/Home"),
        childRoutes:[
            require("./Page/Department"),
            require("./Page/Form"),
            require("./Page/Home"),
            require("./Page/JoinUs"),
            require("./Page/Member"),
            require("./Page/Project"),
            require("./Page/Team"),
            require("./Page/Wish")
        ]
    }]
}

// var Root=React.createClass({
//     render:function(){
//         return(
//             <Router history={hashHistory}>
//                 <Route path="/" component={App}>
//                     <IndexRedirect to="/home" />
//                     <Route path="/home" component={Home} />
//                     <Route path="/team" component={Team} />
//                     <Route path="/department" component={Department} />
//                     <Route path="/member" component={Member} />
//                     <Route path="/project" component={Project}>
//                         <IndexRedirect to="/company" />
//                         <Route path="/company" component={Company} />
//                         <Route path="/works" component={Works} />
//                     </Route>
//                     <Route path="/join" component={Join} />
//                     <Route path="/wish" component={Wish} />
//                     <Route path="/form/:department" component={Form} />
//                 </Route>
//             </Router>
//         )
//     }
// });

var Root=React.createClass({
    render:function(){
        return(
            <Router
                history={hashHistory}
                routes={rootRoute}
            />
        )
    }
})

ReactDOM.render(
    <Root />,
    document.getElementById("app")
)