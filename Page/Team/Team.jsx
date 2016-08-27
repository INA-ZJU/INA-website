var React=require("react");
var $=require("jquery");
var Header=require("./../../Common/Header/Header");
var Footer=require("./../../Common/Footer/Footer");
var style=require("./Team.css");
var Helmet=require("react-helmet");

var Team=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0
        }
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
                <Helmet
                    title="协会介绍"
                    titleTemplate="%s | 浙江大学互联网协会(INA)"
                />
                <div className={style.infoBox+" infoBox"} style={infoStyle}>
                    <div style={textStyle} className={style.info}>
                        INA,全称浙江大学互联网协会（Internet Association Of Zhejiang University）,是由浙江大学2012级多位进入一线互联网公司工作的毕业生创建的学生社团。INA旨在服务浙大同学,带动浙大互联网求职氛围,聚集并培养浙大互联网领域最优秀的人才,为浙大有志于进入互联网行业发展的同学提供最优秀的学习平台和人际网络。
                        <br />
                        <br />
                        INA下设"产品策划/运营部","战略/VC部","技术部","设计部”四大部门,以互联网行业的主要细分工作领域为指导,着力培养各方向最顶尖的人才。
                        </div>
                    <div className={style.shelter} style={infoStyle}></div>
                </div>
            </div>
        )
    }
});

module.exports=Team;