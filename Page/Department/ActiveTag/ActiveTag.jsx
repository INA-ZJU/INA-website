var React=require("react");
var style=require("./ActiveTag.css");

var ActiveTag=React.createClass({
    render:function(){
        return(
            <div className={style.activeTag}>
                {this.props.children}
                <div className={style.pointer}></div>
            </div>
        )
    }
})

module.exports=ActiveTag;