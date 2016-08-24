var React=require("react");
var style=require("./Wish.css");
var $=require("jquery");

var Wish=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0
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
    hover: function(target){

    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };

        return (
            <div className={style.container} style={conStyle}>
                <table className={style.content}>
                    <caption className={style.title}>请选择你的志愿部门</caption>
                    <tbody>
                        <tr>
                            <td ref="td1" className={style.td}>
                                <img src="/Page/Wish/static/choice-vc.png" className={style.choice} onMouseMove={function(){this.hover("td1")}.bind(this)}/>
                            </td>
                            <td ref="td2" className={style.td}>
                                <img src="/Page/Wish/static/choice-pmer.png" className={style.choice} onMouseMove={function(){this.hover("td2")}.bind(this)}/>
                            </td>
                            <td ref="td3" className={style.td}>
                                <img src="/Page/Wish/static/choice-tech.png" className={style.choice} onMouseMove={function(){this.hover("td3")}.bind(this)}/>
                            </td>
                            <td ref="td4" className={style.td}>
                                <img src="/Page/Wish/static/choice-design.png" className={style.choice} onMouseMove={function(){this.hover("td4")}.bind(this)}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div ref="cover" className={style.cover}></div>
            </div>
        )
    }
});

module.exports=Wish;