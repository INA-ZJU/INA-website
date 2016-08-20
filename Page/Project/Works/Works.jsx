var React=require("react");
var style=require("./Works.css");
var Circle=require("./Circle/Circle").Circle;
var LeftEndCircle=require("./Circle/Circle").LeftEndCircle;
var RightEndCircle=require("./Circle/Circle").RightEndCircle;
var ActiveCircle=require("./Circle/Circle").ActiveCircle;
var $=require("jquery");

var Works=React.createClass({
    getInitialState:function(){
        return {
            slideList:[
                {
                    img:"/Page/Project/static/showPic.png",
                    title:"聚课盒子",
                    text:"返回值一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。" +
                    "返回的数组中的字串不包括 separator 自身。但是，如果 " +
                    "separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的" +
                    "文本）。提示和注释注释：如果把空字符串 () 用作 separator，那么 stri" +
                    "ngObject 中的每个字符之间都会被分割。注释：String.split() 执行的操作与 A" +
                    "rray.join 执行的操作是相反的。"
                },
                {
                    img:"/Page/Project/static/showPic.png",
                    title:"聚课fffff盒子",
                    text:"返回值一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。" +
                    "返回的数组中的字串不包括 separator 自身。但是，如果 " +
                    "separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的" +
                    "文本）。提示和注释注释：如果把空字符串 () 用作 separator，那么 stri" +
                    "ngObject 中的每个字符之间都会被分割。注释：String.split() 执行的操作与 A" +
                    "rray.join 执行的操作是相反的。"
                },
                {
                    img:"/Page/Project/static/showPic.png",
                    title:"sdfsdfds",
                    text:"返回值一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。" +
                    "返回的数组中的字串不包括 separator 自身。但是，如果 "
                },
                {
                    img:"/Page/Project/static/showPic.png",
                    title:"聚课盒子",
                    text:"返回值一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。" +
                    "返回的数组中的字串不包括 separator 自身。但是，如果 " +
                    "separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的" +
                    "文本）。提示和注释注释：如果把空字符串 () 用作 separator，那么 stri" +
                    "ngObject 中的每个字符之间都会被分割。注释：String.split() 执行的操作与 A" +
                    "rray.join 执行的操作是相反的。"
                },
            ],
            currActive:0,
            isSlide:0   //检测是否正在轮播
        }
    },
    contextTypes:{
        midHeight:React.PropTypes.number
    },
    componentDidMount:function(){
        $(".item").eq(0).addClass("active");
    },
    changePro:function(target){
        if(this.state.isSlide) return;
        var oldPos=this.state.currActive;
        this.setState({
            currActive:target,
            isSlide:1
        });
        var item=$(".item"),direction,pos;
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
                    <div className={style.infoBox}>
                        <div className={style.img}>
                            <img src={item.img} />
                        </div>
                        <div className={style.intro}>
                            <div className={style.dsec}>
                                <div className={style.title}>
                                    {item.title}
                                </div>
                                <div className={style.text}>
                                    {item.text}
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
            <div className={style.works+" works"} style={workStyle}>
                <div className={style.slideBox} style={slideStyle}>
                    {slides}
                </div>
                <div className={style.control} style={controlStyle}>
                    {circles}
                </div>
            </div>
        )
    }
});

module.exports=Works;