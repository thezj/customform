<template>
    <div v-if='fielddata != null'>
        {{fielddata}}
        <el-form :model="fielddata" label-width="80px" ref="Form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="名称" prop="name" :rules="{required: true, message: '名称不能为空', trigger: 'blur'}">
                        <el-input v-model="fielddata.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否展示">
                        <el-switch v-model="fielddata.exhibit"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="必填">
                        <el-switch v-model="fielddata.required"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="只读">
                        <el-switch v-model="fielddata.disable"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="宽度">
                        <el-input-number v-model="fielddata.width" :min="1" :max="100"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否换行">
                        <el-switch v-model="fielddata.newLine"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click='$emit("cancel")'>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    // {
    //     //是否展示
    //     exhibit: true,
    //     //名称
    //     name: '测试字段1',
    //     //输入类型
    //     type: 'input',
    //     //只读
    //     disable: false,
    //     //必填
    //     required: true,
    //     //宽度
    //     width: 50,
    //     //是否换行
    //     newLine: false,
    // }

    export default {
        props: {
            dialogvisible: {
                type: Boolean,
                default: true
            },
            isEdit: {
                type: Boolean,
                default: true
            },
            fielddata: {
                type: Object,
                default () {
                    return null
                }
            }
        },
        data() {
            return {}
        },
        created() {
            if (!this.isEdit) {
                //初始化数据
                this.$emit('update:fielddata', {
                    //是否展示
                    exhibit: true,
                    //名称
                    name: '',
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
                })
            }
        },
        methods: {
            onSubmit() {
                this.$refs['Form'].validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            this.$emit('confirm')
                        } else {
                            this.$emit('newfield')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>