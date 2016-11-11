var React=require("react");
var style=require("./Works.css");
var Circle=require("./Circle/Circle").Circle;
var LeftEndCircle=require("./Circle/Circle").LeftEndCircle;
var RightEndCircle=require("./Circle/Circle").RightEndCircle;
var ActiveCircle=require("./Circle/Circle").ActiveCircle;
var Helmet=require("react-helmet");
var Tags=require("./../Tags/Tags");

var Works=React.createClass({
    getInitialState:function(){
        return {
            slideList:[],
            currActive:0,
            isSlide:0,   //检测是否正在轮播
            interval:null
        }
    },
    contextTypes:{
        midHeight:React.PropTypes.number
    },
    componentDidMount:function(){
        $.ajax({
            url:"http://114.215.144.43/Backend/ina.php?target=project",
            type:"GET",
            dataType:"jsonp",
            jsonp:'callback',
            jsonpCallback:"successCallback",
            success:function(res){
                if(res.code==0){
                    this.setState({
                        slideList:res.proList
                    });
                    $(".works .item").eq(0).addClass("active");
                    this.autoChange();
                }
                else alert("获取项目列表失败!");

            }.bind(this),
            error:function(){
                alert("请检查网络配置!")
            }
        })
    },
    componentWillUnmount:function(){
        clearInterval(this.state.interval);
        $(".works .item").removeProp("class").addClass("item");
    },
    autoChange:function(){
        var interval=setInterval(function(){
            var curr=this.state.currActive;
            var next=(curr+1)>=this.state.slideList.length?0:curr+1;
            this.changePro(next);
        }.bind(this),8000);
        this.setState({
            interval:interval
        })
    },
    changePro:function(target){
        if(this.state.isSlide) return;
        var oldPos=this.state.currActive;
        if(target==oldPos) return;
        this.setState({
            currActive:target,
            isSlide:1
        });
        var item=$(".works .item"),direction,pos;
        if(target>oldPos){
            direction="left";
            pos="next";
        }
        if(target<oldPos){
            direction="right";
            pos="prev";
        }
        item.eq(target).addClass(pos);
        setTimeout(function(){
            item.eq(target).addClass(direction);
        },20);
        item.eq(oldPos).addClass(direction);
        setTimeout(function(){
            item.eq(target).removeClass(pos+" "+direction).addClass("active");
            item.eq(oldPos).removeClass("active "+direction);
            this.setState({
                isSlide:0
            })
        }.bind(this),500);
    },
    render:function(){
        var workStyle={
            height:0.8*this.context.midHeight,
            marginTop:0.15*this.context.midHeight
        };
        var slideStyle={
            height:0.8*this.context.midHeight
        };
        var controlStyle={
            top:0.7*this.context.midHeight
        };
        var circles=[],slides=[];
        for(var i=0;i<this.state.slideList.length;i++){
            if(i<this.state.currActive)
                circles.push(<LeftEndCircle
                    key={i}
                    onClick={this.changePro.bind(this,i)}
                />);
            else if(i==this.state.currActive)
                circles.push(<ActiveCircle
                    key={i}
                    onClick={this.changePro.bind(this,i)}
                />);
            else circles.push(<RightEndCircle
                    key={i}
                    onClick={this.changePro.bind(this,i)}
                />);

            var item=this.state.slideList[i];
            slides.push(
                <div className="item" key={i}>
                    <Helmet
                        title="优秀项目"
                        titleTemplate="%s | 浙江大学互联网协会(INA)"
                    />
                    <div className={style.infoBox}>
                        <div className={style.img}>
                            <img src={item.picUrl} />
                        </div>
                        <div className={style.intro}>
                            <div className={style.dsec}>
                                <div className={style.title}>
                                    {item.projectName}
                                </div>
                                <div className={style.text}>
                                    {item.description}
                                </div>
                            </div>
                            <div className={style.shelter}></div>
                        </div>
                        <div className="cl"></div>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <Tags pagename="works" />
                <div className={style.works+" works"} style={workStyle}>
                    <div className={style.slideBox} style={slideStyle}>
                        {slides}
                    </div>
                    <div className={style.control} style={controlStyle}>
                        {circles}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports=Works;