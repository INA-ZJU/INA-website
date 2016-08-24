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
      else if(this.state.opacity!=0){
        this.setState({opacity: 0});
      }
    }.bind(this), 25);
  },
  componentWillUnmount:function(){
    clearInterval(this.timer);
  }
  ,
  render: function() {
    var height=window.innerHeight-250;
    //按照屏幕高度为窗口高度-header footer的高度和上下留空来计算其它高度
    var moreInfoStyle={
      height:height*0.682,
      opacity:this.state.opacity
    }
    var infoBoxStyle={
      height:height*0.25,
    };
    var boxStyle={
      height:height,
      width:height*0.545,
      marginLeft:0,
      marginRight:height*0.0966,
    }
    var imgStyle={
      height:height*0.75
    }
    if (!this.state.divOnHover) {
      return(
        <div className={style.memberInfoBox} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}
         style={boxStyle}>
          <img src="/Page/Member/static/moreInfo.png" className={style.moreInfo} style={moreInfoStyle}/>
          <p className={style.moreInfoWords} style={{opacity:this.state.opacity}}>{this.props.moreInfo}</p>
          <img src={this.props.picUrl} className={style.memberImg} style={imgStyle}/>
          <div className={style.memberNameAndInfo} style={infoBoxStyle}>
            <label className={style.memberName}>{this.props.memberName}</label><br/>
            <label className={style.memberInfo}>{this.props.intro}</label>
          </div>
        </div>
        )
    }
    else{
      return(
        <div className={style.memberInfoBox} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}
          style={boxStyle}>
          <img src="/Page/Member/static/moreInfo.png" className={style.moreInfoOnHover} style={moreInfoStyle}/>
          <p className={style.moreInfoWordsOnHover} style={{opacity:this.state.opacity}}>{this.props.moreInfo}</p>
          <img src={this.props.picUrl} className={style.memberImg} style={imgStyle}/>
          <div className={style.memberNameAndInfoOnHover} style={infoBoxStyle}>
            <label className={style.memberNameOnHover}>{this.props.memberName}</label><br/>
            <label className={style.memberInfoOnHover}>{this.props.intro}</label>
          </div>
        </div>
        )
    }
   }
});

module.exports=MemberInfo;