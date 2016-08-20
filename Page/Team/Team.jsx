var React=require("react");
var $=require("jquery");
var Header=require("./../../Common/Header/Header");
var Footer=require("./../../Common/Footer/Footer");
var style=require("./Team.css");

var Team=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0
        }
    },
    componentWillMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        })
    },
    componentDidMount:function(){
        $(window).resize(function(){
            var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
            this.setState({
                midHeight:midHeight-135
            })
        }.bind(this));
        setTimeout(function(){
            $(".infoBox").addClass("active");
        },300)
    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };
        var infoStyle={
            height:0.93*this.state.midHeight,
            marginTop:0.018*this.state.midHeight
        }
        var textStyle={
            height:0.88*this.state.midHeight
        }
        return(
            <div className={style.container} style={conStyle}>
                <div className={style.infoBox+" infoBox"} style={infoStyle}>
                    <div style={textStyle} className={style.info}>
                        INA,全称浙江大学互联网协会（Internet Association Of Zhejiang University）,是由浙江大学2012级多位进入一线互联网公司工作的毕业生创建的学生社团。INA旨在服务浙大同学,带动浙大互联网求职氛围,聚集并培养浙大互联网领域最优秀的人才,为浙大有志于进入互联网行业发展的同学提供最优秀的学习平台和人际网络。
                        <br />
                        <br />
                        INA下设"产品策划/运营部","战略/VC部","技术部","设计部”四大部门,以互联网行业的主要细分工作领域为指导,着力培养各方向最顶尖的人才。
                        <br />
                        <br />
                        产品策划/运营部：<br />
                        这个世界上并不是人人都可以做产品经理,也不是每一个人都能成为Growth Hacker,我们希望遇到这样的你：拥有对互联网极度的热爱,超一流的逻辑思维能力,超清晰的语言表达能力,超强悍的快速学习能力,以及能动手尽量不哔哔的一流执行力。
                        <br />
                        <br />
                        战略/VC部：<br />
                        这个世界上只有一小群人能站在浪潮之巅,也只有一小群人能实现自己的梦想,但这并不妨碍我们试着去描绘未来,在商业世界中感受时代的心跳。我们希望能遇到这样的你：乐于探索新鲜事物,善于分析总结推演,热爱交流沟通分享,能够长期自我驱动。
                        <br />
                        <br />
                        技术部：<br />
                        INA技术部希望与最GEEK的你一起研究最新各个技术领域的深度前景与创业前景。我们希望你是技术怪咖,和我们一起快乐的玩耍。INA技术部有本科期间无数次担任创业公司iOS主程的全栈,也有醉心于越狱插件的完全自给自足的GNU/ers,更有浙大AAA安全领域的大牛一起带你飞美帝blackhat。来到这里,与最懂你的人,一路前行！
                    </div>
                    <div className={style.shelter} style={infoStyle}></div>
                </div>
            </div>
        )
    }
});

module.exports=Team;