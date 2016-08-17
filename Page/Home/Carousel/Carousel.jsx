var React=require("react");
var style=require("./Carousel.css");
var $=require("jquery");

var Carousel=React.createClass({
    getInitialState:function(){
        return {
            itemList:[
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
                "/Page/Home/static/example.png",
            ],
            currActive:1,
            currInfo:"INA纳新"
        }
    },
    componentDidMount:function(){
        var item=$(".item");
        item.eq(0).addClass("slideLeft");
        item.eq(1).addClass("slideActive");
        item.eq(2).addClass("slideRight");
    },
    circleActive:function(target){
        var curr=this.state.currActive;
        var diff=(target-curr)>=0?(target-curr):(curr-target);
        if(target>curr) {
            var cl = setInterval(function(){
                this.slideRight();
                diff--;
                if(!diff) {
                    clearInterval(cl);
                    this.setState({
                        currActive:target
                    })
                }
            }.bind(this),100)
        }
        if(target<curr){
            var cl=setInterval(function(){
                this.slideLeft();
                diff--;
                if(!diff) {
                    clearInterval(cl);
                    this.setState({
                        currActive:target
                    })
                }
            }.bind(this),100)
        }
    },
    slideRight:function(){
        var curr=this.state.currActive,
            item=$(".item"),
            prev=(curr-1)<0?item.length-1:curr-1,
            next=(curr+1)>=item.length?0:curr+1,
            newPic=(curr+2)>=item.length?curr+2-item.length:curr+2;
        this.setState({
            currActive:next
        });
        item.eq(curr).addClass("left");
        item.eq(prev).addClass("left");
        item.eq(next).addClass("left");
        item.eq(newPic).addClass("slideRtShow");
        setTimeout(function(){      //left类在slideRtShow类之后立即增加
            item.eq(newPic).addClass("left");
            item.eq(curr).addClass("slideLeft").removeClass("slideActive left");
            item.eq(next).removeClass("slideRight left").addClass("slideActive");
            item.eq(newPic).removeClass("slideRtShow left").addClass("slideRight");
        },20);
        setTimeout(function(){
            item.eq(prev).removeClass("slideLeft left");
        }.bind(this),600)
    },
    slideLeft:function(){
        var curr=this.state.currActive,
            item=$(".item"),
            next=(curr-1)<0?item.length-1:curr-1,
            prev=(curr+1)>=item.length?0:curr+1,
            newPic=(curr-2)<0?item.length+curr-2:curr-2;
        this.setState({
            currActive:next
        })
        item.eq(curr).addClass("right");
        item.eq(prev).addClass("right");
        item.eq(next).addClass("right");
        item.eq(newPic).addClass("slideLtShow");
        setTimeout(function(){      //right类在slideLtShow类之后立即增加
            item.eq(newPic).addClass("right");
            item.eq(curr).addClass("slideRight").removeClass("slideActive right");
            item.eq(next).removeClass("slideLeft right").addClass("slideActive");
            item.eq(newPic).removeClass("slideLtShow right").addClass("slideLeft");
        },20);
        setTimeout(function(){
            item.eq(prev).removeClass("slideRight right");
        }.bind(this),600)
    },
    render:function(){
        var styles={
            autoHeight: {
                height: this.props.midHeight
            },
            item:{
                marginTop:0.3*this.props.midHeight
            },
            active:{
                transform:"scale(1.5)"
            }
        }
        var circles=[],items=[];
        for(var i=0;i<this.state.itemList.length;i++){
            if(i!=this.state.currActive) circles.push(
                <div
                    key={i}
                    className={style.circle}
                    onClick={this.circleActive.bind(this,i)}
                ></div>
            )
            else circles.push(
                <div
                    key={i}
                    className={style.circle}
                    style={styles.active}
                    onClick={this.circleActive.bind(this,i)}
                ></div>
            );
            items.push(
                <div className="item" style={styles.item} key={i}>
                    <img src={this.state.itemList[i]} />
                </div>
            )
        }
        return(
            <div className={style.carousel} style={styles.autoHeight}>
                <div className={style.itemBox} style={styles.autoHeight}>
                    {items}
                </div>
                <div className={style.pointers}>
                    <div className={style.ltPrt} onClick={this.slideLeft}>
                        <img src="/Page/Home/static/leftPrt.png" />
                    </div>
                    <div className={style.rtPrt} onClick={this.slideRight}>
                        <img src="/Page/Home/static/rightPrt.png" />
                    </div>
                </div>
                <div className={style.info}>
                    <span>
                        <span>{this.state.currInfo}</span>
                        <div className={style.fontShelter}></div>
                    </span>
                </div>
                <div className={style.control}>
                    {circles}
                </div>
            </div>
        )
    }
});

module.exports=Carousel;