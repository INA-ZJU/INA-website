var React=require("react");
var style=require("./Form.css");
var Helmet=require("react-helmet");

var Form=React.createClass({
    getInitialState:function(){
        var choice = ['战略/VC部', '产品运营部', '技术部', '设计部'];
        var index = this.props.params.department;
        var chosen = choice[index];
        var cache=JSON.parse(localStorage.getItem("formCache"));
        return cache || {
            midHeight:0,
            eventID: 48,
            writetime: '',
            browserinfo: '',
            baseinfo:{
                name:'',
                sex: '男',
                origin:'',
                nation:'',
                schoolID:'',
                politicalStatus:'',
                telnumber:'',
                telshort:'',
                email:'',
                qq:'',
                major:'',
                birth:'',
                address:'',
                img:'',
                grade:''
            },
            skills: {
                delete:false,
                title:'技能',
                chosen:['']
            },
            introduction: {
                delete:false,
                title: '个人简历',
                content: ''
            },
            wish: {
                delete:false,
                title:'选择部门',
                chosen:[chosen]
            },
            reason: [''],
            others:[
                {
                    type:'single-text',
                    title:'爱好',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'你认为自己最与众不同的特征是什么？请举一个例子。',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'你平时会从哪些渠道获取泛TMT行业的信息？请对这些渠道进行点评（可从覆盖领域、更新速度、文章质量等维度入手），并举一个例子，说明你是如何通过综合各个渠道的信息，对自己感兴趣的某一领域形成了较为深入的了解的。',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'说说你对BAT三年后各自状况的预测，并阐述原因。届时是否会有其他互联网公司崛起，改变BAT三极分立的局面？如果有，请列举，并说明理由；如果没有，请说明如何才有可能打破这一局面。',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'请简要概括下全球几大互联网巨头（BAT、FLAG）的发展史（每家不超过100字），并分别用一句话总结他们成功的关键原因。按照这种逻辑，你觉得现在哪一家未上市公司有可能成为下一个BAT、FLAG级别的巨头？',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'你认为目前直播产品面临的困境是什么？需要通过什么样的产品或运营手段摆脱困境？',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'同样作为即时通讯社交产品，你认为易信为什么没能获得像微信一样的成功？易信最大的优势和最失败的地方分别是什么？',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'阿里巴巴“双十一”为什么能取得如此大的成功？如果你是2017年天猫“双十一”的策划总监，你会做出哪些改变？',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'IBM Watson Health入华，你觉得在技术层面上有什么可以帮助其更好适应中国市场的？',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'你是怎么看待自己的职业发展规划的，INA能给你带来什么？',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'你觉得机器有可能学会自己给自己编程吗？如果机器学会了自己给自己编程，那程序员还有什么工作可做？',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'请在报名表最后上传作品集，并简单介绍一下最满意的一件作品。',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'请你选择一个你最喜欢的app或者网站，谈谈它的设计亮点。',
                    content:''
                },
                {
                    type:'multi-text',
                    title:'请在设计层面对我们的官网提出你的修改意见。',
                    content:''
                },
                {
                    type:'multi-choose',
                    title:'面试时间',
                    chosen:[]
                },
                {
                    type:'file',
                    title:'个人简历',
                    url:''
                },
                {
                    type:'file',
                    title:'相关作品',
                    url:''
                }
            ],
            remark:''
        };

    },
    componentDidMount:function(){
        var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
        this.setState({
            midHeight:midHeight-135
        });
        $(window).resize(function(){
            var midHeight=document.body.clientHeight||document.documentElement.clientHeight;
            this.setState({
                midHeight:midHeight-135
            })
        }.bind(this))

        //七牛文件上传 照片
        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: 'photo',
            uptoken_url: 'http://182.254.157.172/uptoken',
            domain: 'http://ocsdd1fl7.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
            max_file_size: '10mb',           //最大文件体积限制
            flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
            max_retries: 3,                   //上传失败最大重试次数
            dragdrop: true,                   //开启可拖曳上传
            chunk_size: '4mb',                //分块上传时，每片的体积
            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            unique_names: true,              //自动生成key
            init: {
                'BeforeUpload': function(up, file) {
                    $('#loading').fadeIn();
                    $(document).on('click', '#cancel', function(){
                        this.stop();
                        $('#loading').fadeOut();
                        $(document).off('click', '#cancel');
                    }.bind(this));

                },
                'UploadProgress': function(up, file) {
                    $('#loadingPercentage').text('已上传 '+file.percent+'%');
                    $('#loadingSpeed').text(file.speed/1000+'kb/s');
                },
                'FileUploaded': function(up, file, info) {
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key;
                    var baseinfo = this.state.baseinfo;
                    baseinfo.img = sourceLink;
                    this.setState({baseinfo:baseinfo});

                    //上传提示消失 相关事件解绑
                    $('#loading').fadeOut();
                    $(document).off('click', '#cancel');
                }.bind(this),
                'Error': function(up, err, errTip) {
                    //上传提示消失 相关事件解绑
                    $('#loading').fadeOut();
                    $(document).off('click', '#cancel');

                    //上传出错时,处理相关的事情
                    if(err.code== -600){//文件大小过大
                        var limit = up.getOption('max_file_size');
                        alert('上传文件大小不得超过'+limit);
                    }
                    else {
                        alert('上传出错，请重试\n'+errTip);
                    }
                }.bind(this)
            }
        });

        //七牛文件上传 其他组件
        var others = this.state.others;
        for(var i=0; i<others.length; i++){
            var other = others[i];
            if(other.type=='file'){
                Qiniu.uploader({
                    index: i,
                    runtimes: 'html5,flash,html4',
                    browse_button: 'file'+i,
                    uptoken_url: 'http://182.254.157.172/uptoken',
                    domain: 'http://ocsdd1fl7.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
                    get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                    max_file_size: '100mb',           //最大文件体积限制
                    flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                    max_retries: 3,                   //上传失败最大重试次数
                    dragdrop: true,                   //开启可拖曳上传
                    chunk_size: '4mb',                //分块上传时，每片的体积
                    auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    unique_names: true,              //自动生成key
                    multi_selection: false,         //一次只允许一个文件上传
                    init: {
                        'BeforeUpload': function(up, file) {
                            $('#loading').fadeIn();
                            $(document).on('click', '#cancel', function(){
                                this.stop();
                                $('#loading').fadeOut();
                                $(document).off('click', '#cancel');
                            }.bind(this));
                        },
                        'UploadProgress': function(up, file) {
                            $('#loadingPercentage').text('已上传 '+file.percent+'%');
                            $('#loadingSpeed').text(file.speed/1000+'kb/s');
                        },
                        'FileUploaded': function(up, file, info) {
                            var domain = up.getOption('domain');
                            var i = up.getOption('index');
                            var res = $.parseJSON(info);
                            others[i].url = domain + res.key;
                            this.setState({others:others});
                            var target = this.refs['file'+i];
                            $(target).text(file.name);

                            //上传提示消失 相关事件解绑
                            $('#loading').fadeOut();
                            $(document).off('click', '#cancel');
                        }.bind(this),
                        'Error': function(up, err, errTip) {

                            //上传提示消失 相关事件解绑
                            $('#loading').fadeOut();
                            $(document).off('click', '#cancel');

                            //上传出错时,处理相关的事情
                            if(err.code== -600){//文件大小过大
                                var limit = up.getOption('max_file_size');
                                alert('上传文件大小不得超过'+limit);
                            }
                            else {
                                alert('上传出错，请重试\n'+errTip);
                            }

                        }.bind(this)
                    }
                });
            }
        }
    },
    saveForm:function(){
        var cache=JSON.stringify(this.state);
        localStorage.setItem("formCache",cache);
        alert('已成功保存!');
    },
    deleteForm:function(){
        localStorage.clear();
        window.location.href = '/#/wish';
        alert('已成功删除!');
    },
    submit: function(){
        var basei=this.state.baseinfo;
        var missInfor=[];
        if(basei.name===''){
            missInfor.push("姓名");
        }
        if(basei.schoolID===''){
            missInfor.push("学号");
        }
        if(basei.major===''){
            missInfor.push("专业");
        }
        if(basei.grade===''){
            missInfor.push("年级");
        }
        if(basei.telnumber===''){
            missInfor.push("电话");
        }
        if(basei.email===''){
            missInfor.push("邮箱");
        }
        if(this.state.others[14].chosen.length===0){
            missInfor.push("面试时间");
        }
        if(missInfor.length===0){
            $.ajax({
            url: "http://182.254.157.172/form/submit",
            //url: "http://localhost:3000/form/submit",
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify({
                eventID: this.state.eventID,
                writetime: this.state.writetime,
                browserinfo: this.state.browserinfo,
                baseinfo: this.state.baseinfo,
                skills: this.state.skills,
                introduction: this.state.introduction,
                wish: this.state.wish,
                reason: this.state.reason,
                others: this.state.others,
                remark: this.state.remark
            }),
            success: function(data) {
                switch(data.code){
                    case 0:
                        alert("报名表提交成功!");
                        break;
                    default:
                        alert(data.msg);
                        break;
                }
            }.bind(this),
            error: function(xhr, status, err) {
                alert("请检查网络配置!");
            }.bind(this)
            });
        }else{
            alert('您还没有填写 '+missInfor.toString());
        }

    },
    dataPass: function(value, target, type, index, checkState){
        //index  可选参数 在others类组件中才会用到 表示others数组中的元素下标
        //checkState 可选参数 在others类中的多选 单选 组件才会用到 表示该组件是否选中
        //target 是state里对应的数据项名称 在others类组件中用不到这个参数
        switch (type){
            case 1://baseinfo
                var baseinfo = this.state.baseinfo;
                baseinfo[target] = value;
                this.setState({'baseinfo':baseinfo});
                break;
            case 2://skills
                var element = this.state[target];
                var chosen = element.chosen;
                if(checkState == 1)//checked
                {
                    if(chosen.indexOf(value)<0)
                        chosen.push(value);
                }
                else if(checkState == 0)//unchecked
                {
                    chosen.splice(chosen.indexOf(value),1);
                }
                else if(checkState == -1)//check other
                {
                    chosen[0] = value;
                }
                element.chosen = chosen;
                var obj={};
                obj[target]=element;
                this.setState(obj);
                break;
            case 3://text
                var obj={};
                obj[target]=value;
                this.setState(obj);
                break;
            case 4://others
                var others = this.state.others;
                var element = others[index];
                switch(element.type){
                    case 'single-text' :
                        element['content'] = value;
                        break;
                    case 'multi-text' :
                        element['content'] = value;
                        break;
                    case 'multi-choose' :
                        var chosen = element.chosen;
                        if(checkState == 1)//checked
                        {
                            if(chosen.indexOf(value)<0)
                            {
                                chosen.push(value);
                            }
                        }
                        else if(checkState == 0)//unchecked
                        {
                            chosen.splice(chosen.indexOf(value),1);
                        }
                        else if(checkState == -1)//check other
                        {
                            chosen[0] = value;
                        }
                        element['chosen'] = chosen;
                        break;
                    case 'single-choose': //单选暂不实现可自填的功能
                        var chosen = element.chosen;
                        if(checkState == 1)
                        {
                            chosen = value;
                        }
                        element['chosen'] = chosen;
                        break;
                    case 'file' :
                        element['url'] = value;
                        break;
                    default:
                        element = {};
                }
                others[index] = element;
                this.setState({others:others});
                break;
            case 5://array 比如reason
                var array = this.state[target];
                array[index] = value;
                var obj={};
                obj[target]=array;
                this.setState(obj);
                break;
        }
    },
    check: function(checked, value){
        //value=1代表男 -1代表女
        if(!checked){
            value = -value;
        }
        var sex = (value>0)?'男':'女';
        var baseinfo = this.state.baseinfo;
        baseinfo['sex'] = sex;
        this.setState({'baseinfo':baseinfo});
    },
    render:function(){
        var conStyle={
            height:this.state.midHeight
        };

        return (
            <div className={style.container} style={conStyle}>
                <Helmet
                    title={this.state.wish.chosen}
                    titleTemplate="报名表 | %s"
                />
                <div className={style.frame}>
                    <div id="loading">
                        <div className="cssload-container">
                            <div className="cssload-shaft1"></div>
                            <div className="cssload-shaft2"></div>
                            <div className="cssload-shaft3"></div>
                            <div className="cssload-shaft4"></div>
                            <div className="cssload-shaft5"></div>
                            <div className="cssload-shaft6"></div>
                            <div className="cssload-shaft7"></div>
                            <div className="cssload-shaft8"></div>
                            <div className="cssload-shaft9"></div>
                            <div className="cssload-shaft10"></div>
                        </div>
                        <div className="loading-text" id="loadingPercentage"></div>
                        <div className="loading-text" id="loadingSpeed"></div>
                        <div className="loading-button" id="cancel">取消上传</div>
                    </div>
                    <div className={style.head}>INA秋季纳新报名表--{this.state.wish.chosen}</div>
                    <div className={style.content}>
                        <div className={style.title}>
                            <img className={style.titleImg} src="/Page/Form/static/baseinfo.png" alt="基本信息"/>
                            <big className={style.titleText}>基本信息</big>
                        </div>
                        <table className={style.baseinfo}>
                            <tbody>
                                <tr>
                                    <td className={style.label}><small>*</small> 姓名　</td>
                                    <td>
                                        <input type="text" className={style.input}  defaultValue={this.state.baseinfo.name}
                                               onBlur={function(event){this.dataPass(event.target.value, 'name', 1)}.bind(this)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.label}><small>*</small> 性别　</td>
                                    <td>
                                        <table className={style.sex}><tbody>
                                            {(this.state.baseinfo.sex=='男')?
                                                <tr>
                                                    <td>
                                                        <input type="radio" name="sex" className={style.radio} defaultChecked
                                                               onClick={function(event){this.check(event.target.checked, 1)}.bind(this)}/>男
                                                    </td>
                                                    <td>
                                                        <input type="radio" name="sex" className={style.radio}
                                                               onClick={function(event){this.check(event.target.checked, -1)}.bind(this)}/>女
                                                    </td>
                                                </tr>
                                                :
                                                <tr>
                                                    <td>
                                                        <input type="radio" name="sex" className={style.radio}
                                                               onClick={function(event){this.check(event.target.checked, 1)}.bind(this)}/>男
                                                    </td>
                                                    <td>
                                                        <input type="radio" name="sex" className={style.radio} defaultChecked
                                                               onClick={function(event){this.check(event.target.checked, -1)}.bind(this)}/>女
                                                    </td>
                                                </tr>
                                            }
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.label}><small>*</small> 学号　</td>
                                    <td>
                                        <input type="text" className={style.input}  defaultValue={this.state.baseinfo.schoolID}
                                               onBlur={function(event){this.dataPass(event.target.value, 'schoolID', 1)}.bind(this)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.label}><small>*</small> 专业　</td>
                                    <td>
                                        <input type="text" className={style.input}  defaultValue={this.state.baseinfo.major}
                                               onBlur={function(event){this.dataPass(event.target.value, 'major', 1)}.bind(this)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.label}><small>*</small> 年级　</td>
                                    <td>
                                        <input type="text" className={style.input}  defaultValue={this.state.baseinfo.grade}
                                               onBlur={function(event){this.dataPass(event.target.value, 'grade', 1)}.bind(this)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.label}><small>*</small> 手机号</td>
                                    <td>
                                        <input type="text" className={style.input}  defaultValue={this.state.baseinfo.telnumber}
                                               onBlur={function(event){this.dataPass(event.target.value, 'telnumber', 1)}.bind(this)}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.label}><small>*</small> 邮箱</td>
                                    <td>
                                        <input type="text" className={style.input}  defaultValue={this.state.baseinfo.email}
                                               onBlur={function(event){this.dataPass(event.target.value, 'email', 1)}.bind(this)}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={style.photoUp}>
                            <div className={style.img}>
                                <img src={(this.state.baseinfo.img)?this.state.baseinfo.img:"/Page/Form/static/photo.png"} alt="照片"/>
                            </div>
                            <div className={style.aUp} id="photo">上传照片</div>
                            <div className={style.text}>照片大小50kb以内，支持jpg、png、bmp等格式</div>
                        </div>
                    </div>
                    <div className={style.content}>
                        <div className={style.title}>
                            <img className={style.titleImg} src="/Page/Form/static/introduction.png" alt="个性介绍"/>
                            <big className={style.titleText}>个性介绍</big>
                        </div>
                        <table className={style.introduction}>
                            <tbody>
                            <tr>
                                <td className={style.label}><small>*</small> 爱好　　</td>
                                <td>
                                    <input type="text" className={style.input}  defaultValue={this.state.others[0].content}
                                           onBlur={function(event){this.dataPass(event.target.value, '', 4, 0)}.bind(this)}/>
                                </td>
                            </tr>
                            <tr>
                                <td className={style.label}><small>*</small> 技能　　</td>
                                <td>
                                    <table className={style.skills}><tbody><tr>
                                        <td>
                                            <input type="checkbox" name="skills" className={style.checkbox} {...((this.state.skills.chosen.indexOf("PS")>-1)?{checked:"checked"}:{})}
                                                    onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('PS', 'skills', 2, null, checked)}.bind(this)}/>PS
                                        </td>
                                        <td>
                                            <input type="checkbox" name="skills" className={style.checkbox} {...((this.state.skills.chosen.indexOf("摄影")>-1)?{checked:"checked"}:{})}
                                                   onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('摄影', 'skills', 2, null, checked)}.bind(this)}/>摄影
                                        </td>
                                        <td>
                                            <input type="checkbox" name="skills" className={style.checkbox} {...((this.state.skills.chosen.indexOf("代码")>-1)?{checked:"checked"}:{})}
                                                   onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('代码', 'skills', 2, null, checked)}.bind(this)}/>代码
                                        </td>
                                        <td>
                                            <input type="checkbox" name="skills" className={style.checkbox} {...((this.state.skills.chosen.indexOf("视频")>-1)?{checked:"checked"}:{})}
                                                   onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('视频', 'skills', 2, null, checked)}.bind(this)}/>视频
                                        </td>
                                        <td>
                                            <input type="text" name="skills" className={style.input} placeholder="其他 留空则无" defaultValue={this.state.skills.chosen[0]}
                                                   onBlur={function(event){(event.target.value)?this.dataPass(event.target.value, 'skills', 2 , null, -1):null}.bind(this)}/>
                                        </td>

                                    </tr></tbody></table>
                                </td>
                            </tr>
                            <tr className={style.areaTr}>
                                <td className={style.label}><small>*</small> 个人经历</td>
                                <td>
                                    <textarea className={style.area}  defaultValue={this.state.introduction.content}
                                           onBlur={function(event){this.dataPass({delete:false,title:'个人经历',content:event.target.value}, 'introduction', 3)}.bind(this)}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.content}>
                        <div className={style.title}>
                            <img className={style.titleImg} src="/Page/Form/static/others.png" alt="其他问题"/>
                            <big className={style.titleText}>其他问题</big>
                        </div>
                        <table className={style.others}>
                            {
                                function(){
                                    switch (this.state.wish.chosen[0]){
                                        case "战略/VC部":
                                            return(
                                                <tbody>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>1.你认为自己最与众不同的特征是什么？请举一个例子。</div>
                                                        <textarea className={style.area} defaultValue={this.state.others[1].content}
                                                            onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 1, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>2.你为什么想加入{this.state.wish.chosen[0]}？</div>
                                                        <textarea className={style.area} defaultValue={this.state.reason}
                                                            onBlur={function(event){this.dataPass(event.target.value, 'reason', 5, 0, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>3.你平时会从哪些渠道获取泛TMT行业的信息？请对这些渠道进行点评（可从覆盖领域、更新速度、文章质量等维度入手），并举一个例子，说明你是如何通过综合各个渠道的信息，对自己感兴趣的某一领域形成了较为深入的了解的。 </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[2].content}
                                                            onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 2, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>4.说说你对BAT三年后各自状况的预测，并阐述原因。届时是否会有其他互联网公司崛起，改变BAT三极分立的局面？如果有，请列举，并说明理由；如果没有，请说明如何才有可能打破这一局面。  </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[3].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 3, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>5.请简要概括下全球几大互联网巨头（BAT、FLAG）的发展史（每家不超过100字），并分别用一句话总结他们成功的关键原因。按照这种逻辑，你觉得现在哪一家未上市公司有可能成为下一个BAT、FLAG级别的巨头？  </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[4].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 4, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            );
                                            break;
                                        case "产品运营部":
                                            return(
                                                <tbody>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>1.你认为自己最与众不同的特征是什么？请举一个例子。</div>
                                                        <textarea className={style.area} defaultValue={this.state.others[1].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 1, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>2.你为什么想加入{this.state.wish.chosen[0]}？</div>
                                                        <textarea className={style.area} defaultValue={this.state.reason}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'reason', 5, 0, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>3.你认为目前直播产品面临的困境是什么？需要通过什么样的产品或运营手段摆脱困境？ </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[5].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 5, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>4.同样作为即时通讯社交产品，你认为易信为什么没能获得像微信一样的成功？易信最大的优势和最失败的地方分别是什么？ </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[6].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 6, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>5.阿里巴巴“双十一”为什么能取得如此大的成功？如果你是2017年天猫“双十一”的策划总监，你会做出哪些改变？ </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[7].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 7, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            );
                                            break;
                                        case "技术部":
                                            return(
                                                <tbody>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>1.你认为自己最与众不同的特征是什么？请举一个例子。</div>
                                                        <textarea className={style.area} defaultValue={this.state.others[1].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 1, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>2.你为什么想加入{this.state.wish.chosen[0]}？</div>
                                                        <textarea className={style.area} defaultValue={this.state.reason}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'reason', 5, 0, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>3.IBM Watson Health入华，你觉得在技术层面上有什么可以帮助其更好适应中国市场的？ </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[8].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 8, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>4.你是怎么看待自己的职业发展规划的，INA能给你带来什么？ </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[9].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 9, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>5.你觉得机器有可能学会自己给自己编程吗？如果机器学会了自己给自己编程，那程序员还有什么工作可做？ </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[10].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 10, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            );
                                            break;
                                        case "设计部":
                                            return(
                                                <tbody>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>1.你认为自己最与众不同的特征是什么？请举一个例子。</div>
                                                        <textarea className={style.area} defaultValue={this.state.others[1].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 1, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>2.你为什么想加入{this.state.wish.chosen[0]}？</div>
                                                        <textarea className={style.area} defaultValue={this.state.reason}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'reason', 5, 0, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>3.请在报名表最后上传作品集，并简单介绍一下最满意的一件作品。 </div>
                                                        <textarea className={style.area} defaultValue={this.state.others[11].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 11, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>4.请你选择一个你最喜欢的app或者网站，谈谈它的设计亮点。</div>
                                                        <textarea className={style.area} defaultValue={this.state.others[12].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 12, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                <tr className={style.areaTr}>
                                                    <td>
                                                        <div className={style.label}>5.请在设计层面对我们的官网提出你的修改意见。</div>
                                                        <textarea className={style.area} defaultValue={this.state.others[13].content}
                                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 13, null)}.bind(this)}/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            );
                                            break;
                                        default:
                                            return(null);
                                    }
                                }.bind(this)()
                            }

                        </table>
                    </div>
                    <div className={style.content}>
                        <div className={style.title}>
                            <img className={style.titleImg} src="/Page/Form/static/time.png" alt="面试时间"/>
                            <big className={style.titleText}>面试时间</big>
                        </div>
                        <table className={style.introduction}>
                            <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox} {...((this.state.others[14].chosen.indexOf("周六上午")>-1)?{checked:"checked"}:{})}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周六上午', null, 4, 14, checked)}.bind(this)}/>周六上午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox} {...((this.state.others[14].chosen.indexOf("周六下午")>-1)?{checked:"checked"}:{})}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周六下午', null, 4, 14, checked)}.bind(this)}/>周六下午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox} {...((this.state.others[14].chosen.indexOf("周六晚上")>-1)?{checked:"checked"}:{})}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周六晚上', null, 4, 14, checked)}.bind(this)}/>周六晚上
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox} {...((this.state.others[14].chosen.indexOf("周日上午")>-1)?{checked:"checked"}:{})}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周日上午', null, 4, 14, checked)}.bind(this)}/>周日上午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox} {...((this.state.others[14].chosen.indexOf("周日下午")>-1)?{checked:"checked"}:{})}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周日下午', null, 4, 14, checked)}.bind(this)}/>周日下午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox} {...((this.state.others[14].chosen.indexOf("周日晚上")>-1)?{checked:"checked"}:{})}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周日晚上', null, 4, 14, checked)}.bind(this)}/>周日晚上
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.content}>
                        <div className={style.title}>
                            <img className={style.titleImg} src="/Page/Form/static/files.png" alt="面试时间"/>
                            <big className={style.titleText}>附件上传</big>
                        </div>
                        <table className={style.files}>
                            <tbody>
                            <tr>
                                <td className={style.label}>
                                    个人简历
                                </td>
                                <td>
                                    <div ref="file15" className={style.filename}>您还未上传任何文件</div>
                                    <div id="file15" className={style.fileButton}>上传</div>
                                </td>
                            </tr>
                            <tr>
                                <td className={style.label}>
                                    相关作品
                                </td>
                                <td>
                                    <div ref="file16" className={style.filename}>您还未上传任何文件</div>
                                    <div id="file16"  className={style.fileButton}>上传</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.btnBox}>
                        <button className={style.saveBtn} onClick={this.saveForm}>保存</button>
                        <button className={style.saveBtn} onClick={this.deleteForm}>删除缓存</button>
                        <button className={style.submitBtn} onClick={this.submit}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports=Form;