var React=require("react");
var style=require("./Company.css");
var RotateBlock=require("./RotateBlock");

var Company=React.createClass({
    getInitialState:function(){
        return {
            company:{
                youdao:{
                    img:"/Page/Project/static/youdao-1.png",
                    name:"有道"
                },
                MS:{
                    img:"/Page/Project/static/MS-1-2.png",
                    name:"摩根士丹利"
                },
                qunar:{
                    img:"/Page/Project/static/qunar-2.png",
                    name:"去哪儿"
                },
                chuangxingc:{
                    img:"/Page/Project/static/chuangxingc-2-2.png",
                    name:"创新工场"
                },
                alibaba:{
                    img:"/Page/Project/static/alibaba-3.png",
                    name:"阿里巴巴"
                },
                goldman:{
                    img:"/Page/Project/static/goldman-3-2.png",
                    name:"高盛"
                },
                netease:{
                    img:"/Page/Project/static/netease-4.png",
                    name:"网易"
                },
                chuxin:{
                    img:"/Page/Project/static/chuxin-4-2.png",
                    name:"初心资本"
                },
                sina:{
                    img:"/Page/Project/static/sina-5.png",
                    name:"新浪"
                },
                yunqi:{
                    img:"/Page/Project/static/yunqi-5-2.png",
                    name:"云启创投"
                },
                tencent:{
                    img:"/Page/Project/static/tencent-6.png",
                    name:"腾讯"
                },
                wacai:{
                    img:"/Page/Project/static/wacai-6-2.png",
                    name:"挖财"
                },
                //liebao:{
                //    img:"/Page/Project/static/liebao-7.png",
                //    name:"猎豹"
                //}
            }
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
        var prevKey;
        for(var key in companies){
            var order;
            switch(i/2){
                case 0:order="one";break;
                case 1:order="two";break;
                case 2:order="three";break;
                case 3:order="four";break;
                case 4:order="five";break;
                case 5:order="six";break;
                case 6:order="sevent";break;
            }
            if(i%2)
                rotateBlocks.push(
                    <RotateBlock
                        style={blockStyle[order]}
                        front={companies[prevKey]}
                        back={companies[key]}
                    />
                );
            else prevKey=key;
            i++;
        };
        return(
            <div className={style.wall} style={wallStyle}>
                <img src="/Page/Project/static/companyWall.png" />
                <div className={style.logoBox}>
                    {rotateBlocks}
                </div>
            </div>
        )
    }
});

module.exports=Company;