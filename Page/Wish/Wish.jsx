var React=require("react");
var style=require("./Wish.css");
var $=require("jquery");
var Helmet=require("react-helmet");
var Link=require("react-router").Link;

var Wish=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0,
            hover: 0
        }
    },
    componentDidMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        });
        $(window).resize(function(){
            var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
            this.setState({
                midHeight:midHeight-135
            })
        }.bind(this))
    },
    hover: function(targetNum, event){
        var target = event.target;
        this.setState({hover:targetNum});

        $('#cover').fadeIn(500);
    },
    mouseOut: function(){
        this.setState({hover:0});
        $('#cover').fadeOut(500);
    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };

        var tdStyle = {
            zIndex:100,
            position: 'relative'
        };

        return (
            <div className={style.container} style={conStyle}>
                <Helmet
                    title="意向部门"
                    titleTemplate="%s | 浙江大学互联网协会(INA)"
                />
                <table className={style.content}>
                    <caption className={style.title}>请选择你的志愿部门</caption>
                    <tbody>
                        <tr>
                            <td style={(this.state.hover==1)?tdStyle:null} className={style.td}>
                                <Link to="/form/0"><img src="/Page/Wish/static/choice-vc.png" className={style.choice}
                                     onMouseMove={function(event){this.hover(1, event)}.bind(this)} onMouseOut={this.mouseOut}/></Link>
                                <big className={style.text}>战略/VC部</big>
                            </td>
                            <td style={(this.state.hover==2)?tdStyle:null} className={style.td}>
                                <Link to="/form/1"><img src="/Page/Wish/static/choice-pmer.png" className={style.choice}
                                     onMouseMove={function(event){this.hover(2, event)}.bind(this)} onMouseOut={this.mouseOut}/></Link>
                                <big className={style.text}>产品运营部</big>
                            </td>
                            <td style={(this.state.hover==3)?tdStyle:null} className={style.td}>
                                <Link to="/form/2"><img src="/Page/Wish/static/choice-tech.png" className={style.choice}
                                     onMouseMove={function(event){this.hover(3, event)}.bind(this)} onMouseOut={this.mouseOut}/>
                                <big className={style.text}>技术部</big></Link>
                            </td>
                            <td style={(this.state.hover==4)?tdStyle:null} className={style.td}>
                                <Link to="/form/3"><img src="/Page/Wish/static/choice-design.png" className={style.choice}
                                     onMouseMove={function(event){this.hover(4, event)}.bind(this)} onMouseOut={this.mouseOut}/>
                                <big className={style.text}>设计部</big></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="cover" className={style.cover}></div>
            </div>
        )
    }
});

module.exports=Wish;