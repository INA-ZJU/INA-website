var React=require("react");
var style=require("./Company.css");

var Company=React.createClass({
    contextTypes:{
        midHeight:React.PropTypes.number
    },
    render:function(){
        var wallStyle={
            marginTop:0.2*this.context.midHeight
        }
        return(
            <div className={style.wall} style={wallStyle}>
                <img src="/Page/Project/static/companyWall.png" />
            </div>
        )
    }
});

module.exports=Company;