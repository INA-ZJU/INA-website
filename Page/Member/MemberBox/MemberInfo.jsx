var React=require("react");
var style=require("./MemberInfo.css");

var MemberInfo = React.createClass({
  getInitialState: function() {
    return{
      divOnHover:false,
      width:document.body.clientWidth,
      opacity:0
    }
  },

  handleMouseOver:function() {
    this.setState({divOnHover: true});
  },

  handleMouseLeave:function() {
    this.setState({divOnHover: false,opacity:0});
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      this.setState({width:document.body.clientWidth});
      if(this.state.divOnHover){
        if(this.state.opacity<0.8)this.setState({opacity: this.state.opacity+0.05});
      }
      else{
        this.setState({opacity: 0});
      }
    }.bind(this), 25);
  },

  render: function() {
    var width=this.state.width; 
    //按照屏幕宽度为2048来计算高度
    var infoBoxStyle={
      height:width*0.107,
    };
    var moreInfoStyle={
      height:width*0.281,
      opacity:this.state.opacity
    }
    if (!this.state.divOnHover) {
      var moreInfo="moreInfo";
      var moreInfoWords="moreInfoWords";
      var memberName="memberName";
      var memberInfo="memberInfo"
      var memberNameAndInfo="memberNameAndInfo";
      var moreInfo="moreInfo";
      var moreInfoWords="moreInfoWords";
    }
    else{
      var moreInfo="moreInfoOnHover";
      var moreInfoWords="moreInfoWordsOnHover";
      var memberName="memberNameOnHover";
      var memberInfo="memberInfoOnHover"
      var memberNameAndInfo="memberNameAndInfoOnHover";
      var moreInfo="moreInfoOnHover";
      var moreInfoWords="moreInfoWordsOnHover";
    }
    return(
      <div className="memberInfoBox" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <img src="./moreInfo.png" className={moreInfo} style={moreInfoStyle}/>
        <p className={moreInfoWords} style={{opacity:this.state.opacity}}>{this.props.moreInfo}</p>
        <img src={this.props.picUrl} className="memberImg"/>
        <div className={memberNameAndInfo} style={infoBoxStyle}>
          <label className={memberName}>{this.props.memberName}</label><br/>
          <label className={memberInfo}>{this.props.intro}</label>
        </div>
      </div>
      )
   }
});

module.exports=MemberInfo;