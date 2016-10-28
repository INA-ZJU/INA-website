var React=require("react");
var style=require("./../Company.css");

var RotateBlock=React.createClass({
    getInitialState:function(){
        return {
            frontName:this.props.front.name,
            backName:this.props.back.name,
            isFront:true,
            currName:this.props.front.name
        }
    },
    componentDidMount:function(){
        setInterval(function(){
            var isFront=this.state.isFront;
            this.setState({
                currName:!isFront?this.state.frontName:this.state.backName,
                isFront:!isFront
            })
        }.bind(this),8000)
    },
    render:function(){
        return (
            <div className={style.rotateBox} style={this.props.style}>
                <div className={style.front}>
                    <img src={this.props.front.img} />
                </div>
                <div className={style.back}>
                    <img src={this.props.back.img} />
                </div>
                <div className={style.tag}>
                    <div className={style.name}>{this.state.currName}</div>
                    <div className={style.shelter}></div>
                </div>
            </div>
        )
    }
})

module.exports=RotateBlock;