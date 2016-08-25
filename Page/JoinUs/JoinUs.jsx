var React=require("react");
var style=require("./JoinUs.css");
var $=require("jquery");

var JoinUs=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0
        }
    },
    componentDidMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        });
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

        return (
            <div className={style.container} style={conStyle}>
                <div className={style.frame}>
                    <img src="/Page/JoinUs/static/button.png" className={style.button} onClick={function(){window.location.href="#/wish"}}/>
                </div>
            </div>
        )
    }
});

module.exports=JoinUs;