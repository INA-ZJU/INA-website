var React=require("react");
var style=require("./../Company.css");

var RotateBlock=React.createClass({
    getInitialState:function(){
        return {
            count:0,
            frontImg:this.props.front.img,
            backImg:this.props.back.img,
            isFront:true,
            currName:this.props.front.name
        }
    },
    componentDidMount:function(){
        setInterval(function(){
            this.state.count=(this.state.count+1)%4;
            var isFront=this.state.isFront;
            var name;
            switch(this.state.count){
                case 0:name=this.props.front.name;break;
                case 1:name=this.props.back.name;break;
                case 2:name=this.props.three.name;break;
                case 3:name=this.props.four.name;break;
            }
            if(this.state.count===1)
                this.setState({
                    currName:name,
                    frontImg:this.props.three.img,
                });
            else if(this.state.count===2){
                this.setState({
                    currName:name,
                    backImg:this.props.four.img,
                });
            }
            else if(this.state.count===3){
                this.setState({
                    currName:name,
                    frontImg:this.props.front.img,
                });
            }
            else{
                this.setState({
                    currName:name,
                    backImg:this.props.back.img,
                });
            }
        }.bind(this),3000);
    },
    render:function(){
        return (
            <div className={style.rotateBox} style={this.props.style}>
                <div className={style.front}>
                    <img src={this.state.frontImg} />
                </div>
                <div className={style.back}>
                    <img src={this.state.backImg} />
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