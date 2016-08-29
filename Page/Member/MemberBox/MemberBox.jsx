var React=require("react");
var style=require("./MemberInfo.css");
var $=require("jquery");
var MemberInfo=require("./MemberInfo");
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var MemberBox = React.createClass({
  render: function(){
    var height=document.body.clientHeight-250;
    if (document.body.clientWidth*0.33<=height) {
      height=document.body.clientWidth*0.33;
    }
    var left=(document.body.clientWidth-height*2.035)/2;
    var boxStyle={
        height:0.65*this.props.midHeight,
        width:document.body.clientWidth-left,
        paddingLeft:left
    };
    var memberList=this.props.memberList.map(function(item,i){
      if (this.props.currActive==item.department) {
        return(
            <MemberInfo 
              intro={item.description} 
              memberName={item.memberName}
              picUrl={item.protraitUrl}
              moreInfo={item.info}
              key={i}
              currActive={this.props.currActive}
            />
          );
      }
      else{
        return(
          <MemberInfo 
            intro={item.description} 
            memberName={item.memberName}
            picUrl={item.protraitUrl}
            moreInfo={item.info}
            key={i}
            style={{display:none}}
            currActive={this.props.currActive}
          />
        );
      }
    }.bind(this));
    return (
      <div className={style.memberListBox} style={boxStyle}>
        {memberList}
      </div>
    );
  }
});
module.exports=MemberBox;