var React=require("react");
var style=require("./Header.css");
var Link=require("react-router").Link;

var Header=React.createClass({
    getInitialState:function(){
        return {
            linkList:[
                {
                    url:"/home",
                    text:"首页"
                },
                {
                    url:"/team",
                    text:"协会介绍"
                },
                {
                    url:"/department",
                    text:"部门介绍"
                },
                {
                    url:"/member",
                    text:"核心成员"
                },
                {
                    url:"/project",
                    text:"成果展示"
                },
                {
                    url:"/join",
                    text:"加入我们"
                }
            ],
            currPage:"/home"
        }  
    },
    updateCurrPate:function(){
        var page="/"+location.hash.split(/\/|\?/)[1];
        if(page!=this.state.currPage)
            this.setState({
                currPage:page
            })
    },
    componentDidMount:function(){
        this.updateCurrPate();
        window.onhashchange=function(){
            this.updateCurrPate();
        }.bind(this)
    },
    render:function(){
        var active={
            borderColor:"white"
        }
        var links=this.state.linkList.map(function(item,key){
            if(item.url==this.state.currPage)
                return (
                    <Link key={key} to={item.url} style={active}><li>{item.text}</li></Link>
                )
            else return (
                <Link key={key} to={item.url}><li>{item.text}</li></Link>
            )
        }.bind(this))
        return (
            <div className={style.header}>
                <div className={style.logoBox+" fl"}>
                    <img src="/Common/Header/static/logo.png" />
                </div>
                <div className={style.linkBox+" fr"}>
                    <ul>
                        {links}
                    </ul>
                </div>
            </div>
        )
    }
})

module.exports=Header;