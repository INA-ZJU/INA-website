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
          picUrl: './member.png',
          intro:"INA官网开发技术组",
          moreInfo:"浙大计算机系"
        },
        {
          memberName: '奕辉',
          picUrl: './member.png',
          intro:"INA官网开发技术组",
          moreInfo:"浙大软件工程系"
        },
        {
          memberName: '昊潜',
          picUrl: './member.png',
          intro:"INA官网开发技术组",
          moreInfo:"浙大计算机系+ITP"
        }
      ]
    };
  },

  render: function() {
    var boxStyle={
        height:0.65*this.props.midHeight,
        marginTop:0.23*this.props.midHeight
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
      <div className="memberListBox" style={boxStyle}>
        {memberList}
      </div>
    );
  }
});