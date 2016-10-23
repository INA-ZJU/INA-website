var React=require("react");
var style=require("./Tags.css");
var Link=require("react-router").Link;
var hashHistory=require("react-router").hashHistory;

var Tag=React.createClass({
    render:function(){
        return(
            <Link to={this.props.to}>
                <div
                    className={style.tag}
                    style={this.props.font}
                >
                    {this.props.children}
                    <div className={style.block} style={this.props.block}></div>
                </div>
            </Link>
        )
    }
});



var Tags=React.createClass({
    getInitialState:function(){
        return {
            currActive:this.props.pagename=="company"?0:1,
            tags:['成员去向','优秀项目']
        }
    },
    contextTypes:{
        midHeight:React.PropTypes.number
    },
    render:function(){
        var tags=this.state.tags.map(function(item,i){
            var tagStyle={
                font:{
                    color:i==this.state.currActive?"#f5cd37":"#747373"
                },
                block:{
                    borderColor:i==this.state.currActive?"#f5cd37":"#747373",
                    backgroundColor:i==this.state.currActive?"#f5cd37":"transparent"
                }
            };
            var to=i?"/works":"/company";
            return (
                <Tag
                    key={i}
                    font={tagStyle.font}
                    block={tagStyle.block}
                    to={to}
                >
                    {item}
                </Tag>
            )
        }.bind(this));
        var tagBox={
            marginTop:0.05*this.context.midHeight
        }
        return(
            <div className={style.tagBox} style={tagBox}>
                {tags}
            </div>
        )
    }
});

module.exports=Tags;