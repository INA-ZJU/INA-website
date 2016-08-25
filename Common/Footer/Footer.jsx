var React=require("react");
var style=require("./Footer.css");

var Footer=React.createClass({
    render:function(){
        return(
            <div className={style.footer}>
                <ul className={style.topBar}>
                    <li>浙江大学互联网协会 Internet Association Of Zhejiang University</li>
                    <li>联系我们：ZJUINA@163.com</li>
                    <li>微信公众平台：ZJU_INA</li>
                </ul>
                <div className="cl"></div>
                <div className={style.copyright}>Copyright©2016 ZJUINA.All rights reserved.</div>
            </div>
        )
    }
})

module.exports=Footer;