var React=require("react");
var style=require("./Home.css");
var Carousel=require("./Carousel/Carousel");
var Helmet=require("react-helmet");

var Home=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0
        }
    },
    componentDidMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        })
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
                <Helmet
                    title="首页"
                    titleTemplate="%s | 浙江大学互联网协会(INA)"
                    />
                <div className={style.shelter} style={conStyle}></div>
                <Carousel midHeight={this.state.midHeight}/>
            </div>
        )
    }
});

module.exports=Home;