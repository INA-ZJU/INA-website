var React=require("react");
var style=require("./Form.css");
var $=require("jquery");

var Form=React.createClass({
    getInitialState:function(){
        return {
            midHeight:0,
            eventID: '',
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
                delete:'',
                title:'',
                chosen:[]
            },
            reason: [],
            others:[
                {
                    type:'single-text',
                    title:'爱好',
                    content:''
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
    dataPass: function(value, target, type, index, checkState){
        //index  可选参数 在others类组件中才会用到 表示others数组中的元素下标
        //checkState 可选参数 在others类中的多选 单选 组件才会用到 表示该组件是否选中
        switch (type){
            case 1://baseinfo
                var baseinfo = this.state.baseinfo;
                baseinfo[target] = value;
                this.setState({'baseinfo':baseinfo});
                break;
            case 2://skills
                var element = this.state[target]
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
                </div>
            </div>
        )
    }
});

module.exports=Form;