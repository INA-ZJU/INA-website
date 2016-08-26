var React=require("react");
var style=require("./Form.css");
var $=require("jquery");

var Form=React.createClass({
    getInitialState:function(){
        var choice = ['战略/VC部', '产品运营部', '技术部', '设计部'];
        var index = this.props.params.department;
        var chosen = choice[index];
        return {
            midHeight:0,
            eventID: '14',
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
                address:''
            },
            skills: {
                delete:false,
                title:'技能',
                chosen:['']
            },
            introduction: {
                delete:'',
                title: '',
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
                    title:'请简单描述你最常用或者最喜欢的一个App，说说它最吸引你的地方在哪里，有什么不足。如果你是该产品的产品经理，会如何改进?',
                    content:''
                },
                {
                    type:'multi-choose',
                    title:'面试时间',
                    chosen:[]
                }
            ],
            remark:''
        }
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
    },
    submit: function(){
        $.ajax({
            url: "form/submit",
            contentType: 'application/jsonp',
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
                console.log(data);
                switch(data.code){
                    case 0:
                        window.location.href = '/#/person/info';
                        break;
                    default:
                        console.log(data.msg);
                        break;
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("ajax请求发起失败");
            }.bind(this)
        });
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
                this.setState({[target]:element});
                break;
            case 3://text
                this.setState({[target]:value});
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
                this.setState({[target]:array});
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
                <div className={style.frame}>
                    <div className={style.head}>INA秋季纳新报名表</div>
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
                                            <input type="checkbox" name="skills" className={style.checkbox}
                                                   onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('PS', 'skills', 2, null, checked)}.bind(this)}/>PS
                                        </td>
                                        <td>
                                            <input type="checkbox" name="skills" className={style.checkbox}
                                                   onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('摄影', 'skills', 2, null, checked)}.bind(this)}/>摄影
                                        </td>
                                        <td>
                                            <input type="checkbox" name="skills" className={style.checkbox}
                                                   onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('代码', 'skills', 2, null, checked)}.bind(this)}/>代码
                                        </td>
                                        <td>
                                            <input type="checkbox" name="skills" className={style.checkbox}
                                                   onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('视频', 'skills', 2, null, checked)}.bind(this)}/>视频
                                        </td>
                                        <td>
                                            <input type="text" name="skills" className={style.input} placeholder="其他 留空则无"
                                                   onBlur={function(event){(event.target.value)?this.dataPass(event.target.value, 'skills', 2 , null, -1):null}.bind(this)}/>
                                        </td>

                                    </tr></tbody></table>
                                </td>
                            </tr>
                            <tr className={style.areaTr}>
                                <td className={style.label}><small>*</small> 个人经历</td>
                                <td>
                                    <textarea className={style.area}  defaultValue={this.state.baseinfo.schoolID}
                                           onBlur={function(event){this.dataPass(event.target.value, 'introduction', 3)}.bind(this)}/>
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
                            <tbody>
                                <tr className={style.areaTr}>
                                    <td>
                                        <div className={style.label}>1.你认为自己最与众不同的特征是什么？请举一个例子。</div>
                                        <textarea className={style.area}
                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 1, null)}.bind(this)}/>
                                    </td>
                                </tr>
                                <tr className={style.areaTr}>
                                    <td>
                                        <div className={style.label}>2.你为什么想加入{this.state.wish.chosen[0]}？</div>
                                        <textarea className={style.area}
                                                  onBlur={function(event){this.dataPass(event.target.value, 'reason', 5, 0, null)}.bind(this)}/>
                                    </td>
                                </tr>
                                <tr className={style.areaTr}>
                                    <td>
                                        <div className={style.label}>3.请简单描述你最常用或者最喜欢的一个App，说说它最吸引你的地方在哪里，有什么不足。如果你是该产品的产品经理，会如何改进?</div>
                                        <textarea className={style.area}
                                                  onBlur={function(event){this.dataPass(event.target.value, 'null', 4, 2, null)}.bind(this)}/>
                                    </td>
                                </tr>
                            </tbody>
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
                                    <input type="checkbox" name="time" className={style.checkbox}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周六上午', null, 4, 3, checked)}.bind(this)}/>周六上午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周六下午', null, 4, 3, checked)}.bind(this)}/>周六下午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周六晚上', null, 4, 3, checked)}.bind(this)}/>周六晚上
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周日上午', null, 4, 3, checked)}.bind(this)}/>周日上午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周日下午', null, 4, 3, checked)}.bind(this)}/>周日下午
                                </td>
                                <td>
                                    <input type="checkbox" name="time" className={style.checkbox}
                                           onClick={function(event){var checked = (event.target.checked)?1:0; this.dataPass('周日晚上', null, 4, 3, checked)}.bind(this)}/>周日晚上
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.button} onClick={null}>提交</div>
                </div>
            </div>
        )
    }
});

module.exports=Form;