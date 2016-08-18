var React=require("react");
var style=require("./Header.css");

var Header=React.createClass({
    render:function(){
        return (
            <div className={style.header}>
                <div className={style.logoBox+" fl"}>
                    <img src="/Common/Header/static/logo.png" />
                </div>
                <div className={style.linkBox+" fr"}>
                    <ul>
                        <a href="/index.html"><li>首页</li></a>
                        <a href="/Page/Team/Team.html"><li>团队简介</li></a>
                        <a href="/Page/Department/Department.html"><li>部门介绍</li></a>
                        <a href="#"><li>核心成员</li></a>
                        <a href="/Page/Project/Project.html"><li>成果展示</li></a>
                        <a href="#"><li>加入我们</li></a>
                    </ul>
                </div>
            </div>
        )
    }
})

module.exports=Header;