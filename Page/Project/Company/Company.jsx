var React=require("react");
var style=require("./Company.css");
var RotateBlock=require("./RotateBlock/RotateBlock");
var Helmet=require("react-helmet");
var Tags=require("./../Tags/Tags");

var Company=React.createClass({
    getInitialState:function(){
        return {
            company:[
                {
                    img:"/Page/Project/static/youdao-1.png",
                    name:"有道"
                },
                {
                    img:"/Page/Project/static/MS-1-2.png",
                    name:"摩根士丹利"
                },
                {
                    img:"/Page/Project/static/1.png",
                    name:"360"
                },
                {
                    img:"/Page/Project/static/11.png",
                    name:"宝洁"
                },
                {
                    img:"/Page/Project/static/qunar-2.png",
                    name:"去哪儿"
                },
                {
                    img:"/Page/Project/static/chuangxingc-2-2.png",
                    name:"创新工场"
                },
                {
                    img:"/Page/Project/static/2.png",
                    name:"触宝"
                },
                {
                    img:"/Page/Project/static/22.png",
                    name:"大疆"
                },
                {
                    img:"/Page/Project/static/alibaba-3.png",
                    name:"阿里巴巴"
                },
                {
                    img:"/Page/Project/static/goldman-3-2.png",
                    name:"高盛"
                },
                {
                    img:"/Page/Project/static/33.png",
                    name:"华为"
                },
                {
                    img:"/Page/Project/static/3.png",
                    name:"滴滴出行"
                },
                {
                    img:"/Page/Project/static/netease-4.png",
                    name:"网易"
                },
                {
                    img:"/Page/Project/static/chuxin-4-2.jpg",
                    name:"初心资本"
                },
                {
                    img:"/Page/Project/static/4.png",
                    name:"金山"
                },
                {
                    img:"/Page/Project/static/44.png",
                    name:"京东"
                },
                {
                    img:"/Page/Project/static/sina-5.jpg",
                    name:"新浪"
                },
                {
                    img:"/Page/Project/static/yunqi-5-2.jpg",
                    name:"云启创投"
                },
                {
                   img:"/Page/Project/static/5.png",
                   name:"蘑菇街"
                },
                {
                    img:"/Page/Project/static/55.png",
                    name:"麒麟会"
                },
                {
                    img:"/Page/Project/static/tencent-6.jpg",
                    name:"腾讯"
                },
                {
                    img:"/Page/Project/static/wacai-6-2.jpg",
                    name:"挖财"
                },
                {
                    img:"/Page/Project/static/66.png",
                    name:"百度"
                },
                {
                    img:"/Page/Project/static/6.png",
                    name:"微策略"
                },
                {
                   img:"/Page/Project/static/liebao-7.png",
                   name:"猎豹"
                },
                {
                    img:"/Page/Project/static/linkedIn-7-2.png",
                    name:"领英"
                },
                {
                    img:"/Page/Project/static/77.png",
                    name:"大众点评"
                },
                {
                    img:"/Page/Project/static/7.png",
                    name:"搜狐"
                }
            ]
        }
    },
    contextTypes:{
        midHeight:React.PropTypes.number
    },
    render:function(){
        var wallStyle={
            marginTop:0.18*this.context.midHeight
        };
        var blockStyle={
            one:{
                marginLeft:"25%"
            },
            two:{
                marginLeft:"75%"
            },
            three:{
                marginTop:"12.5%"
            },
            four:{
                marginLeft:"62.5%",
                marginTop:"12.5%"
            },
            five:{
                marginLeft:"12.5%",
                marginTop:"25%"
            },
            six:{
                marginLeft:"37.5%",
                marginTop:"25%"
            },
            seven:{
                marginLeft:"87.5%",
                marginTop:"25%"
            }
        };

        var rotateBlocks=[],i=0,companies=this.state.company;
        for(var key in companies){
            var order;
            switch(i/4){
                case 0:order="one";break;
                case 1:order="two";break;
                case 2:order="three";break;
                case 3:order="four";break;
                case 4:order="five";break;
                case 5:order="six";break;
                case 6:order="seven";break;
            }
            if(i%4===3)
                rotateBlocks.push(
                    <RotateBlock
                        style={blockStyle[order]}
                        front={companies[i-3]}
                        back={companies[i-2]}
                        three={companies[i-1]}
                        four={companies[i]}
                    />
                );
            i++;
        }
        return(
            <div>
                <Tags pagename="company" />
                <div className={style.wall} style={wallStyle}>
                    <Helmet
                        title="成员去向"
                        titleTemplate="%s | 浙江大学互联网协会(INA)"
                    />
                    <img src="/Page/Project/static/companyWall.png" />
                    <div className={style.logoBox}>
                        {rotateBlocks}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports=Company;