var React=require("react");
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
                <div className={style.container} style={conStyle}>
                    <Tags />
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports=Project;
