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
            allList:[[]],
            initList:[[]],
            count:[0,0,0,0,0],
            isClick:0
        }
    },
    slideRight:function(e){
        var event=e||window.event;
        if(event && event.type=="click"){
            if(this.state.isClick) return;
            else this.setState({
                isClick:1
            })
        }
        if (this.state.count[this.state.currActive]+3>=this.state.allList[this.state.currActive].length) return;
        
        var count=this.state.count;
        count[this.state.currActive]+=3;
        var i=count[this.state.currActive];
        if (i+3>this.state.allList[this.state.currActive].length) {
            i-=3-this.state.allList[this.state.currActive].length%3;
        }
        var memberList=this.state.memberList;
        var allList=this.state.allList;
        memberList[this.state.currActive]=[allList[this.state.currActive][i],allList[this.state.currActive][i+1],allList[this.state.currActive][i+2]];
        this.setState({isClick:0,count:count,memberList:memberList})
    },
    slideLeft:function(e){
        var event=e||window.event;
        if(event && event.type=="click"){
            if(this.state.isClick) return;
            else this.setState({
                isClick:1
            })
        }
        if (this.state.count[this.state.currActive]==0) return;
        var count=this.state.count;
        count[this.state.currActive]-=3;
        var i=count[this.state.currActive];
        var memberList=this.state.memberList;
        var allList=this.state.allList;
        memberList[this.state.currActive]=[allList[this.state.currActive][i],allList[this.state.currActive][i+1],allList[this.state.currActive][i+2]];
        this.setState({isClick:0,count:count,memberList:memberList})
    },
    componentWillMount:function(){
        $.ajax({
            url:"http://114.215.144.43/Backend/ina.php?target=member",
            type:"GET",
            dataType:"jsonp",
            jsonp:"callback",
            jsonpCallback:"successCallback",
            success:function(res){
                if(res.code==0) {
                    var all=res.memberList;
                    var allList=new Array();
                    var initList=new Array();
                    for (var i = 0; i < 5; i++) {
                        allList[i]=new Array();
                        initList[i]=new Array();
                    }
                    for (var i = 0 ; i < all.length; i++) {
                        allList[all[i].department].push(all[i]);
                    }
                    for (var i = 0; i < 5; i++) {
                        for(var j = 0; j < 3; j++){
                            if(allList[i][j]!=undefined)initList[i][j]=allList[i][j];
                        }
                    }
                    this.setState({
                        memberList:initList,
                        initList:initList,
                        allList:allList});
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
        // this.autoChange();
    },
    updateActive:function(i){
        this.setState({
            memberList:this.state.initList,
            currActive:i,
            count:[0,0,0,0,0]
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
                <div className={style.pointers}>
                    <div className={style.ltPrt} onClick={this.slideLeft}>
                        <img src="/Page/Home/static/leftPrt.png" />
                    </div>
                    <div className={style.rtPrt} onClick={this.slideRight}>
                        <img src="/Page/Home/static/rightPrt.png" />
                    </div>
                </div>
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
