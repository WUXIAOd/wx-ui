import Vue from 'vue'
import Button from './button/button'
import Icon from './icon'
import ButtonGroup from './button/button-group'
import Input from './input'
import Row from './grid/row'
import Col from './grid/col'
import Layout from './layout/layout'
import Content from './layout/content'
import Header from './layout/header'
import Sider from './layout/sider'
import Footer from './layout/footer'
import Toast from './toast'
import plugin from './plugin'
import Tabs from './tabs/tabs'
import TabsHead from './tabs/tabs-head'
import TabsBody from './tabs/tabs-body'
import TabsItem from './tabs/tabs-item'
import TabsPane from './tabs/tabs-pane'
import Popover from './Popover'
import Collapse from './collapse/collapse'
import CollapseItem from './collapse/collapse-item'
import chai from 'chai'
import spies from 'chai-spies'

Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)

Vue.component('g-popover', Popover)
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)
Vue.use(plugin)
Vue.component('g-button', Button)
Vue.component( 'g-icon', Icon)
Vue.component( 'g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component( 'g-row', Row)
Vue.component('g-col',Col)
Vue.component('g-header',Header)
Vue.component('g-layout',Layout)
Vue.component('g-content',Content)
Vue.component('g-sider',Sider)
Vue.component('g-footer',Footer)
Vue.component('g-toast',Toast)

new Vue({
    el: '#app',
    data: {
        selectedTab: ['2'],
    },
    created() {
    },
    methods:{
        showToast1(){
            this.showToast('top')
        },
        showToast2(){
            this.showToast('middle')
        },
        showToast3(){
            this.showToast('bottom')
        },
        showToast(position){
            this.$toast(`测试文字 ${parseInt(Math.random() * 100)}`,{
                enableHtml: false,
                position,
                autoClose: 3,
                closeButton:{
                    text: '关闭',
                    callback () {
                        console.log('测试完毕')
                    }
                },
            })
        },
    }
})


chai.use(spies)
const expect = chai.expect

try{
    // 单元测试

    {
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings'
            }
        })
        vm.$mount()
        let useElement = vm.$el.querySelector('use')
        expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')
        vm.$el.remove()
        vm.$destroy()
    }
    {
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                loading: true
            }
        })
        vm.$mount()
        let useElement = vm.$el.querySelector('use')
        expect(useElement.getAttribute('xlink:href')).to.equal('#i-loading')
        vm.$el.remove()
        vm.$destroy()
    }
    {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings'
            }
        })
        vm.$mount(div)
        let svg = vm.$el.querySelector('svg')
        let {order} = window.getComputedStyle(svg)
        expect(order).to.equal('1')
        vm.$el.remove()
        vm.$destroy()
    }
    {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                iconPosition: 'right'
            }
        })
        vm.$mount(div)
        let svg = vm.$el.querySelector('svg')
        let {order} = window.getComputedStyle(svg)
        expect(order).to.equal('2')
        vm.$el.remove()
        vm.$destroy()
    }
    {
        // mock
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings'
            }
        })
        vm.$mount()
        let spy = chai.spy(function(){});
        vm.$on('click',spy)
        // 期望这个函数被执行
        let button = vm.$el
        button.click()
        expect(spy).to.have.been.called()
    }
} catch (error) {
    window.errors = [error]
} finally {
    window.errors && window.errors.forEach((error)=>{
        console.log(error.message)
    })
}

