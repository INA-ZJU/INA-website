var React=require("react");
var style=require("./Footer.css");
var $=require("jquery");

var Footer=React.createClass({
    componentDidMount:function() {
        var xOffset = 10;
        var yOffset = 30;
        // console.log($('#wechatLink').offset().left)
        $("a.wechat").hover(function(e){
            this.t = this.title;
            this.title = "";
            var c = (this.t != "")?"<br/>" + this.t:"";
            $("body").append("<div id='wechat'><img src='"+ this.rel +"' alt='url preview' />"+ c +"</div>");
            $("#wechat")
                .css({
                    'width':'120px',
                    'height':'120px',
                    'position':'absolute',
                    'left':$('#wechatLink').offset().left+$('#wechatLink').width()/2-60,
                    'top':$('#wechatLink').offset().top-130,
                    'z-index':'900'
                })
                .fadeIn("slow");
        },
        function(){
            this.title = this.t;
            $("#wechat").remove();
        });
    },
    render:function(){
        return(
            <div className={style.footer}>
                <ul className={style.topBar}>
                    <li>浙江大学互联网协会 Internet Association Of Zhejiang University</li>
                    <li>联系我们：ZJUINA@163.com</li>
                    <li>微信公众平台：<a id="wechatLink" className="wechat" href="http://open.weixin.qq.com/qr/code/?username=ZJU_INA"
                     rel="/Common/Footer/static/wechat_img.jpg">ZJU_INA</a></li>
                </ul>
                <div className="cl"></div>
                <div className={style.copyright}>Copyright©2016 ZJUINA.All rights reserved.</div>
            </div>
        )
    }
})

module.exports=Footer;