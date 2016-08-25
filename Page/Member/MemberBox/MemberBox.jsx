var React=require("react");
var style=require("./MemberInfo.css");
var $=require("jquery");
var MemberInfo=require("./MemberInfo");

var MemberBox = React.createClass({
  render: function() {
    var left=(window.innerWidth-(window.innerHeight-250)*1.83)/2;
    var boxStyle={
        height:0.65*this.props.midHeight,
        width:window.innerWidth-left,
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