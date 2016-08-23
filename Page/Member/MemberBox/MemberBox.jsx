var React=require("react");
var style=require("./MemberInfo.css");
var $=require("jquery");
var MemberInfo=require("./MemberInfo");

var MemberBox = React.createClass({
  getInitialState: function() {
    return {
      memberList:[
        {
          memberName: '皓波',
          picUrl: '/Page/Member/static/member.png',
          intro:"INA官网开发技术组",
          moreInfo:"浙大计算机系"
        },
        {
          memberName: '奕辉',
          picUrl: '/Page/Member/static/member.png',
          intro:"INA官网开发技术组",
          moreInfo:"浙大软件工程系"
        },
        {
          memberName: '昊潜',
          picUrl: '/Page/Member/static/member.png',
          intro:"INA官网开发技术组",
          moreInfo:"浙大计算机系+ITP"
        }
      ]
    };
  },

  render: function() {
    var left=(window.innerWidth-(window.innerHeight-250)*1.83)/2;
    var boxStyle={
        height:0.65*this.props.midHeight,
        width:window.innerWidth-left,
        'padding-left':left
    };
    var memberList=this.state.memberList.map(function(item,i){
      return(
          <MemberInfo 
            intro={item.intro} 
            memberName={item.memberName}
            picUrl={item.picUrl}
            moreInfo={item.moreInfo}
            key={i}
          />
        );
    }.bind(this));
    return (
      <div className={style.memberListBox} style={boxStyle}>
        {memberList}
      </div>
    );
  }
});

module.exports=MemberBox;