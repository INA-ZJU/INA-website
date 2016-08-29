var React=require("react");
var style=require("./Animation.css");
var Link=require("react-router").Link;
var $=require("jquery");

var Animation = React.createClass({
    getInitialState:function() {
        return {
            load:0
        };
    },
    gressBarGo:function () {
      var counter=0;
      this.timer = setInterval(function () {
        if (this.state.load == 3 && counter < 5) {
          counter=counter+1;
        }
        else{
          this.setState({load:this.state.load+1});
        }
        if (this.state.load==9) {
          clearInterval(this.timer);
        }
      }.bind(this),500);
    },
    componentDidMount:function() {
        //页面加载完成后执行
        window.onload=function(){
          clearInterval(this.timer);
          var counter=0;
          this.timer = setInterval(function () {
            if (this.state.load == 7 && counter < 3) {
              counter=counter+1;
            }
            else{
              this.setState({load:this.state.load+1});
            }
            if (this.state.load==10) {
              $('.gressTip').html("资料读取完毕，准备好侵入INA了吗！").css('color','green');
              setTimeout(function(){
                clearInterval(this.timer2);
                $('.AnimationBox').fadeOut(2000);
              }.bind(this),2000)
              clearInterval(this.timer);
            }
          }.bind(this),300);
        }.bind(this);
        //背景图滚动
        var scrollLength=$('.bkgScroll').height()-document.body.clientWidth;
        this.timer2=setInterval(function(){
          if(scrollLength >= 1){
            scrollLength=scrollLength-1;
          }
          else{
            scrollLength=$('.bkgScroll').height()-document.body.clientWidth;
          }
          $('.bkgScrollBox').scrollTop(scrollLength);
        }.bind(this),1);
    },
    render() {
      var windowWidth=document.body.clientWidth;
      var windowHeight=document.body.clientHeight;
      // console.log(windowWidth+' '+windowHeight)
      var width=windowHeight*816/612;
      var marginLeft=(windowWidth-width)/2;
      var bkgHeight=windowWidth*8259/2048;
      var bkgStyle={
        width:windowWidth,
        height:bkgHeight
      }
      var bkgBoxStyle={
        width:windowWidth,
        height:windowHeight
      }
      var fixedStyle={
        height:windowHeight,
        width:windowHeight*2048/1536,
        marginLeft:marginLeft
      }
      var position=Array();
      var marginTop=windowHeight*0.668;
      var gressBarSize=width*0.056;
      for (var i = 0; i < 10; i++) {
        position[i]=marginLeft+width*0.229+gressBarSize*i*0.93;
      }
      var gressBar=position.map(function(item,i){
        var gressBarStyle={
          marginTop:marginTop,
          marginLeft:item,
          width:gressBarSize,
          height:gressBarSize,
          opacity:i < this.state.load?1:0
        }
        return(
          <div className={style.gressBar} key={i}>
            <img src="/Common/Animation/static/进度条.png" style={gressBarStyle}/>
          </div>
          );
      }.bind(this));
      return (
          <div className={style.boxDiv+" AnimationBox"}>
            <div style={bkgBoxStyle} className={style.bkgBox+" bkgScrollBox"}>
              <img src="/Common/Animation/static/bkg.jpg" style={bkgStyle} className={style.bkgImg+" bkgScroll"}/>
            </div>
            <div className={style.gressBox}>
              <img src="/Common/Animation/static/fixed.png" style={fixedStyle} 
              className={style.fixedImg} onLoad={this.gressBarGo}/>
              {gressBar}
            </div>
            <div className={style.gressTip+" gressTip"} style={{marginTop:windowHeight*0.78}}>正在侵入INA系统内部，即将获取最高机密...</div>
          </div>
      );
    }
});

module.exports = Animation;
