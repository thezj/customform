<template>
    <div>
        <div>
            <h3>表单模板</h3>
            <div>
                <el-button type="primary" v-for='form in formPatterns' @click='copyform(form)' :key='form.name'> {{form.name}}</el-button>
            </div>
        </div>
        <div v-if='editingform != null'>
            <h3>编辑表单</h3>
            <el-input v-model='editingform.name'>

            </el-input>
            <el-table :data="editingform.fields">
                <el-table-column label="显示" prop='exhibit'>
                    <template slot-scope="scope">
                        <span>{{ scope.row.exhibit }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop='name'>
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
        <div>
            <h3>预览表单</h3>
        </div>

        <!-- 编辑字段弹出框 -->
        <el-dialog title="编辑字段" :modal-append-to-body='false' :visible.sync="dialogVisible" width="30%" :close-on-click-modal='false'
            :close-on-press-escape='false'>
            <div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑字段弹出框 -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //编辑字段弹出框
                dialogVisible: false,

                //正在编辑的表单
                editingform: null,
                //正在编辑字段
                editingfield: null,
                //表单模板
                formPatterns: [{
                    name: '测试表单',
                    fields: [{
                        //是否展示
                        exhibit: true,
                        //名称
                        name: '测试字段1',
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
                }]
            }
        },
        methods: {
            //拷贝表单模板
            copyform(form) {
                this.editingform = _.cloneDeep(form)
            }
        }
    }
</script>