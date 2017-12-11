<template>
    <div>


        <!-- 表单模板列表 -->
        <div class="blockcss" style="height: 80px">
            <h3>表单模板</h3>
            <div>
                <el-button type="text" v-for='(form,index) in formPatterns' @click='copyform(form,index)' :key='form.name'> {{form.name}}</el-button>
            </div>
        </div>


        <!-- 编辑表单字段列表 -->
        <div v-if='editingform != null' class="blockcss">
            <h3>编辑表单</h3>
            <el-input v-model='editingform.name' style="width:400px;">
                <div slot='prepend'>表单名称：</div>
            </el-input>
            </el-input>
            <el-table :data="editingform.fields">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column label="名称" prop='name'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型" prop='type'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.type }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="显示" prop='exhibit'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.exhibit }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="只读" prop='disable'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.disable }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="必填" prop='required'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.required }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="宽度" prop='width'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.width }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="换行" prop='newLine'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.newLine }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="编辑" prop='newLine'>
                    <template slot-scope="scope">
                        <div style="font-size: 20px;">
                            <i class="fa fa-trash"></i>
                            <i class="fa fa-edit" @click='editfield(scope.row,scope.$index)'></i>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click='editingformaddfield'>新增字段</el-button>
            <el-button type="primary" @click='confirmform'>提交表单</el-button>
        </div>

        <!-- 编辑表单预览 -->
        <div class="blockcss" v-if='editingform != null'>
            <h3>预览表单</h3>
            <div>{{editingform.name}}</div>
            <div style="border: 2px solid gray; padding: 20px;">

                <el-form :model="dynamicform" label-width="80px" ref="dynamicForm">
                    <el-row>
                        <template v-for='field in editingform.fields' v-if='field.exhibit'>
                            <!-- 根据输入类型动态生成 -->
                            <div v-if='field.newLine' style="float: none;clear: both;"></div>
                            <el-col :span="parseInt((field.width/100)*24)">
                                <el-form-item :label="field.name" :prop="field.name" :rules="{required:field.required, message: field.name+'不能为空', trigger: 'blur'}">
                                    <template v-if='field.type == "input"'>
                                        <!-- 普通输入框 -->
                                        <el-input v-model="dynamicform[field.name]" :disabled='field.disable'></el-input>
                                    </template>
                                    <template v-if='field.type == "inputnumber"'>
                                        <!-- 数字输入框 -->
                                        <el-input-number v-model="dynamicform[field.name]" :disabled='field.disable' :min="field.min" :max="field.max"></el-input-number>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </template>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="dynamicFormSubmit">确定</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>

        <!-- 编辑字段弹出框 -->
        <el-dialog title="编辑字段" :modal-append-to-body='false' :visible.sync="dialogVisible" width="70%" :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div v-if='editingfield != null'>
                <el-form label-width="80px">
                    <el-form-item label="字段类型">
                        <el-select v-model="editingfield.type" placeholder="">
                            <el-option label="普通输入框" value="input" />
                            <el-option label="数字输入框" value="inputnumber" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <component :is="componentsolve(editingfield.type)" :isEdit='isfieldcomEdit' :fielddata.sync='editingfield' @cancel='dialogVisible = false'
                    @newfield='addNewField' @confirm='confirmfield'></component>
            </div>
        </el-dialog>
        <!-- 编辑字段弹出框 -->

    </div>
</template>
<script>
    import fieldinputnormal from './fieldinputnormal.vue'
    import fieldinputnumber from './fieldinputnumber.vue'
    export default {

        components: {
            fieldinputnormal,
            fieldinputnumber
        },
        data() {
            return {
                isfieldcomEdit: false,
                //刷新编辑字段组件
                refreshfieldcom: 0,
                //编辑字段弹出框
                dialogVisible: false,
                //正在编辑的表单
                editingform: null,
                editingformindex: null,
                //正在编辑字段
                editingfield: null,
                editingfieldindex: null,
                //表单模板
                formPatterns: [{
                    name: '测试表单1',
                    fields: [{
                        //是否展示
                        exhibit: true,
                        //名称
                        name: '测试字段',
                        //输入类型
                        type: 'input',
                        //只读
                        disable: false,
                        //必填
                        required: true,
                        //宽度
                        width: 50,
                        //是否换行
                        newLine: false,
                    }]
                }, {
                    name: '测试表单222',
                    fields: [{
                        //是否展示
                        exhibit: true,
                        //名称
                        name: '测试字段',
                        //输入类型
                        type: 'input',
                        //只读
                        disable: false,
                        //必填
                        required: true,
                        //宽度
                        width: 50,
                        //是否换行
                        newLine: false,
                    }]
                }],
                //根据表单模板生成的表单数据
                dynamicform: null
            }
        },
        watch: {
            editingform: {
                deep: true,
                handler(val, oldval) {
                    if (val == null) return
                    let temp = {}
                    this.editingform.fields.map(i => {
                        if (i.exhibit) {
                            temp[i.name] = ''
                        }
                    })
                    this.dynamicform = temp
                }
            }
        },
        mounted(){
            window.vmindex = this
        },
        methods: {
            //当前编辑表单增加字段
            editingformaddfield() {
                this.editingfield = {
                    type: 'input'
                }
                this.dialogVisible = true
                this.isfieldcomEdit = false
            },
            //动态表单提交
            dynamicFormSubmit() {
                this.$refs['dynamicForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.dynamicform)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //确认表单编辑
            confirmform() {
                let temp = _.cloneDeep(this.formPatterns)
                temp[this.editingformindex] = _.cloneDeep(this.editingform)
                this.formPatterns = temp
                this.editingform = null
            },
            //确认字段编辑
            confirmfield() {
                let temp = _.cloneDeep(this.editingform)
                temp.fields[this.editingfieldindex] = _.cloneDeep(this.editingfield)
                this.editingform = temp
                this.dialogVisible = false
            },
            //新增字段
            addNewField() {
                let temp = _.cloneDeep(this.editingform)
                temp.fields.push(_.cloneDeep(this.editingfield))
                this.editingform = temp
                this.dialogVisible = false
            },
            //解析字段编辑组件
            componentsolve(type) {
                switch (type) {
                    case 'input':
                        return 'fieldinputnormal'
                        break;
                    case 'inputnumber':
                        return 'fieldinputnumber'
                        break;
                }
            },
            //编辑字段
            editfield(field, index) {
                this.editingfield = _.cloneDeep(field)
                this.editingfieldindex = index
                this.dialogVisible = true
                this.isfieldcomEdit = true
            },
            //拷贝表单模板
            copyform(form, index) {
                this.editingformindex = index
                this.editingform = _.cloneDeep(form)
            }
        }
    }
</script>