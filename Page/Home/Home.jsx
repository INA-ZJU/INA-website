var React=require("react");
var $=require("jquery");
var style=require("./Home.css");
var Carousel=require("./Carousel/Carousel");

var Home=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0
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
        }.bind(this))
    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };
        return(
            <div className={style.container} style={conStyle}>
                <div className={style.shelter} style={conStyle}></div>
                <Carousel midHeight={this.state.midHeight}/>
            </div>
        )
    }
});

module.exports=Home;