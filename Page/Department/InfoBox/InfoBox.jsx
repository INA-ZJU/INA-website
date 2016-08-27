var React=require("react");
var style=require("./InfoBox.css");
var $=require("jquery");
var Info=require("./Info");

var InfoBox=React.createClass({
    getInitialState:function(){
        return{
            infoList:[
                {
                    img:"/Page/Department/static/strategy.jpg",
                    intro:"这个世界上只有一小群人能站在浪潮之巅，也只有一小群人能实现自己的梦想，" +
                    "但这并不妨碍我们试着去描绘未来，在商业世界中感受时代的心跳。" +
                    "我们希望能遇到这样的你：乐于探索新鲜事物，善于分析总结推演，" +
                    "热爱交流沟通分享，能够长期自我驱动。"
                },
                {
                    img:"/Page/Department/static/product.jpg",
                    intro:"这个世界上并不是人人都可以做产品经理，" +
                    "也不是每一个人都能成为Growth Hacker，我们希望遇到这样的你：" +
                    "拥有对互联网极度的热爱，超一流的逻辑思维能力，超清晰的语言表达能力，" +
                    "超强悍的快速学习能力，以及能动手尽量不哔哔的一流执行力。"
                },
                {
                    img:"/Page/Department/static/tech.jpg",
                    intro:"INA技术部希望与最GEEK的你一起研究最新各个技术领域的深度前景与创业前景。" +
                    "我们希望你是技术怪咖，和我们一起快乐的玩耍。" +
                    "INA技术部有本科期间无数次担任创业公司iOS主程的全栈，也有醉心于越狱插件的完全自给自足的GNU/ers，" +
                    "更有浙大AAA安全领域的大牛一起带你飞美帝blackhat。" +
                    "来到这里，与最懂你的人，一路前行！"
                },
                {
                    img:"/Page/Department/static/design.jpg",
                    intro:"在这里，我们探索互联网时尚潮流，以设计为媒触动每一个人的情感。" +
                    "我们希望遇见这样的你：热爱设计，注重细节，善于沟通，" +
                    "关注设计的发展趋势以及一切美好事物，有独特的审美品位与创造力，" +
                    "掌握基本的软件操作技能。让我们携手同行，绘梦未来！"
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