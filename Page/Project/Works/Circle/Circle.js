var React=require("react");
var style=require("./Circle.css");

var LeftEndCircle=React.createClass({
    render:function(){
        return (
            <div className={style.circle} onClick={this.props.onClick}>
                <div className={style.ltline}></div>
            </div>
        )
    }
});

var RightEndCircle=React.createClass({
    render:function(){
        return(
            <div className={style.circle} onClick={this.props.onClick}>
                <div className={style.rtline}></div>
            </div>
        )
    }
})

var Circle=React.createClass({
    render:function(){
        return (
            <div
                className={style.circle}
                onClick={this.props.onClick}
            ></div>
        )
    }
});

var ActiveCircle=React.createClass({
    render:function(){
        return (
            <div className={style.activeCircle} onClick={this.props.onClick}>
                <div className={style.bigCircle}>
                    <div className={style.smCircle}></div>
                </div>
            </div>
        )
    }
})

module.exports={
    LeftEndCircle:LeftEndCircle,
    RightEndCircle:RightEndCircle,
    Circle:Circle,
    ActiveCircle:ActiveCircle
};