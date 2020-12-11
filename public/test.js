export default {
    fun(Vue){
        // console.log(factory);//输出结果：factory
        Vue.prototype.$factory = factory;
    }
};
let factory = 'factory';