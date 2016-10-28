var React=require("react");
var style=require("./Member.css");
var Header=require("./../../Common/Header/Header");
var Footer=require("./../../Common/Footer/Footer");
var MemberBox=require("./MemberBox/MemberBox");
var ActiveTag=require("../Department/ActiveTag/ActiveTag");
var Helmet=require("react-helmet");

var Member=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0,
            tagList:["主席团","战略/VC部","产品/运营部","技术部","设计部"],
            currActive:0,    //当前显示部门的key值，
            memberList:[[]],
        }
    },
    autoChange:function(){
        setInterval(function(){
            var curr=this.state.currActive;
            var next=(curr+1)>=4?0:curr+1;
            this.setState({
                currActive:next
            })
        }.bind(this),10000)
    },
    componentWillMount:function(){
        $.ajax({
            url:"http://114.215.144.43/ina.php?target=member",
            type:"GET",
            dataType:"jsonp",
            jsonp:"callback",
            jsonpCallback:"success_jsonpCallback",
            success:function(res){
                if(res.code==0) {
                    memberList=res.memberList;
                    var currActiveMember=new Array();
                    for (var i = 0; i < 5; i++) {
                        currActiveMember[i]=new Array();
                    }
                    for (var i = memberList.length - 1; i >= 0; i--) {
                        currActiveMember[memberList[i].department].push(memberList[i]);
                    }
                    this.setState({memberList:currActiveMember});
                }
                else alert("获取成员信息失败!");
            }.bind(this),
            error:function(err){
                alert("请检查网络配置!");
            }
        });
    },
    componentDidMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        })
        $(window).resize(function(){
            var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
            this.setState({
                midHeight:midHeight-135
            })
        }.bind(this));
        this.autoChange();
    },
    updateActive:function(i){
        this.setState({
            currActive:i
        })
    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };
        var tags=this.state.tagList.map(function(item,i){
            if(i==this.state.currActive) return(
                <ActiveTag key={i}>{item}</ActiveTag>
            );
            else return(
                <div
                    key={i}
                    className={style.tag}
                    onClick={this.updateActive.bind(this,i)}
                >
                    {item}
                </div>
            );
        }.bind(this));
        return (
            <div className={style.container} style={conStyle}>
                <Helmet
                    title="核心成员"
                    titleTemplate="%s | 浙江大学互联网协会(INA)"
                />
                <div className={style.tagBox}>
                    {tags}
                </div>
                <MemberBox
                    midHeight={this.state.midHeight}
                    currActive={this.state.currActive}
                    memberList={this.state.memberList[this.state.currActive]}
                />
            </div>
        )
    }
});

module.exports=Member;
