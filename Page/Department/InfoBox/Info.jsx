var React=require("react");
var style=require("./InfoBox.css");

var Info=React.createClass({
    render:function(){
        var infoStyle={
            height:0.65*this.props.midHeight
        };
        var introStyle={
            height:0.45*this.props.midHeight
        };
        return(
            <div className={this.props.className}>
                <div className={style.img} style={infoStyle}>
                    <img src={this.props.img} />
                </div>
                <div className={style.info}>
                    <div className={style.block}></div>
                    <div className={style.intro} style={introStyle}>
                        {this.props.intro}
                    </div>
                    <div className={style.shelter} style={infoStyle}></div>
                </div>
                <div className="cl"></div>
            </div>
        )
    }
})
module.exports=Info;