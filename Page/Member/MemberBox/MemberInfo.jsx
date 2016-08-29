var React=require('react');
var style=require("./MemberInfo.css");
var $=require("jquery");

var MemberInfo = React.createClass({
  getInitialState: function() {
    return{
      divOnHover:false,
      opacity:0,
      currActive:-1,
      flag:true
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
      //以下是鼠标覆盖时间的动画
      if(this.state.divOnHover){
        if(this.state.opacity< 0.8)this.setState({opacity: this.state.opacity+0.05});
      }
      else if(this.state.opacity!=0){
        this.setState({opacity: 0});
      }
      //以下是切换Tag的动画效果
      // if (this.state.currActive!=this.props.currActive){
      //   this.setState({currActive: this.props.currActive,flag:true});
      //   $('.'+style.memberInfoBox).removeClass(style.tansition);
      // }
      // else{
      //   // if(this.state.opacity< 1)this.setState({opacity: this.state.opacity+0.01,flag:false});
      //   $('.'+style.memberInfoBox).addClass(style.tansition);
      // }
    }.bind(this), 25);
  },

  componentWillUnmount:function(){
    clearInterval(this.timer);
  }
  ,
  render: function() {
    var height=document.body.clientHeight-250;
    if (document.body.clientWidth*0.33<=height) {
      height=document.body.clientWidth*0.33;
    }
    var width=height*0.545;
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
      width:width,
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