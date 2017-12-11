// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import '../../src/partelementui'
import index from "../../src/pages/home/index.vue"
import '../../src/style/main.less'

// 这里是一些 Jasmine 2.0 的测试，你也可以使用你喜欢的任何断言库或测试工具。

describe('index', () => {

    // 评估原始组件选项中的函数的结果
    it('sets the correct default data', () => {
        const defaultData = index.data()
        expect(defaultData.formPatterns.length).toBe(2)
    })


})