var React=require("react");
var style=require("./Header.css");
var Link=require("react-router").Link;

var Header=React.createClass({
    render:function(){
        return (
            <div className={style.header}>
                <div className={style.logoBox+" fl"}>
                    <img src="/Common/Header/static/logo.png" />
                </div>
                <div className={style.linkBox+" fr"}>
                    <ul>
                        <Link to="/"><li>首页</li></Link>
                        <Link to="/team"><li>团队简介</li></Link>
                        <Link to="/department"><li>部门介绍</li></Link>
                        <Link to="#"><li>核心成员</li></Link>
                        <Link to="/project"><li>成果展示</li></Link>
                        <Link to="#"><li>加入我们</li></Link>
                    </ul>
                </div>
            </div>
        )
    }
})

module.exports=Header;