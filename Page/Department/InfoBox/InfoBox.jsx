var React=require("react");
var style=require("./InfoBox.css");
var $=require("jquery");
var Info=require("./Info");

var InfoBox=React.createClass({
    getInitialState:function(){
        return{
            infoList:[
                {
                    img:"/Page/Department/static/test.png",
                    intro:"杨奕辉：首页、团队简介、部门介绍、成果展示。" +
                    "吴昊潜：报名页面开发。王皓波：后端开发、" +
                    "核心成员前端开发。5、	工期安排：（暂定）" +
                    "杨奕辉：8.15~8.20 静态页面开发。8.20~8.22 前后端整合" +
                    "吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "皓波：8.15~8.21 后端开发与API文档编写。8",
                },
                {
                    img:"/Page/Department/static/departBackground.png",
                    intro:"杨奕辉：首页、团队简介、部门介绍、成果展示。" +
                    "吴昊潜：报名页面开发。王皓波：后端开发、" +
                    "核心成员前端开发。5、	工期安排：（暂定）" +
                    "杨奕辉：8.15~8.20 静态页面开发。8.20~8.22 前后端整合" +
                    "吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "皓波：8.15~8.21 后端开发与API文档编写。8吴昊" +
                    "潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "皓波：8.15~8.21 后端开发与API文档编写。8吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "皓波：8.15~8.21 后端开发与API文档编写。8"
                },
                {
                    img:"/Page/Department/static/test.png",
                    intro:"杨奕辉：首页、团队简介、部门介绍、成果展示。" +
                    "吴昊潜：报名页面开发。王皓波：后端开发、" +
                    "吴昊潜：报名页面开发。王皓波：后端开发、" +
                    "核心成员前端开发。5、	工期安排：（暂定）" +
                    "核心成员前端开发。5、	工期安排：（暂定）" +
                    "核心成员前端开发。5、	工期安排：（暂定）" +
                    "杨奕辉：8.15~8.20 静态页面开发。8.20~8.22 前后端整合" +
                    "吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "皓波：8.15~8.21 后端开发与API文档编写。8",
                },
                {
                    img:"/Page/Department/static/departBackground.png",
                    intro:"杨奕辉：首页、团队简介、部门介绍、成果展示。" +
                    "吴昊潜：报名页面开发。王皓波：后端开发、" +
                    "核心成员前端开发。5、	工期安排：（暂定）" +
                    "杨奕辉：8.15~8.20 静态页面开发。8.20~8.22 前后端整合" +
                    "吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "吴昊潜：8.15~8.23 报名页面开发。尽可能提前完成" +
                    "皓波：8.15~8.21 后端开发与API文档编写。8",
                }
            ]
        }
    },
    render:function(){
        var infoBoxStyle={
            height:0.65*this.props.midHeight,
            marginTop:0.23*this.props.midHeight
        };
        var infoList=this.state.infoList.map(function(item,i){
            if(i==this.props.currActive) return(
                <Info
                    className="box active"
                    key={i}
                    midHeight={this.props.midHeight}
                    img={item.img}
                    intro={item.intro}
                />
            )
            else return(
                <Info
                    className="box"
                    key={i}
                    midHeight={this.props.midHeight}
                    img={item.img}
                    intro={item.intro}
                />
            )
        }.bind(this))
        return(
            <div className={style.infoBox+" infoBox"} style={infoBoxStyle}>
                {infoList}
            </div>
        )
    }
})

module.exports=InfoBox;