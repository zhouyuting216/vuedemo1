<!--

-->
<template>
    <div class="el-select" style="width: 200px;">
        <div class="" style="position: relative;">
            <input type="text" readonly class=""
                   v-model="query"
                   style="width: 100%;"
                   :placeholder="placeholder"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   @click="onClickInput"
            >
        </div>
        <div :class="[{hidden:!visible}]">
            <input type="text" class="" style="width: 100%;"
                   v-model="queryStr"
                   v-if="filterable"
                   placeholder="输入内容搜索选项"
            >
            <div v-if="isEmpty" style="width: 100%;height:50px;color:#C0C4CC;display: flex;align-items: center;justify-content: center;border:1px solid #DCDFE6;">暂无数据</div>
            <ul v-show="!isEmpty" style="width: 100%;height:200px;overflow:auto;margin: 0 auto;border:1px solid #DCDFE6;">
                <li v-for="item in tempOptions"
                    :key="item[optionProp.value]"
                    :label="item[optionProp.label]"
                    :value="item[optionProp.value]"
                    :class="['option',{selected:selectedItems.find(select=>select.value===''+item[optionProp.value])}]"
                    @click.stop="handleOptionSelect">{{item[optionProp.label]}}
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "ZytSelect",
        props: {
            width: {
                type: String,
                default: '200',
            },
            options: {
                type: Array,
            },
            optionProp: {
                type: Object,
                default: function () {
                    return {
                        value: 'value',
                        label: 'label',
                    }
                }
            },
            isMultiple: {
                type: Boolean,
                default: false,
            },
            filterable: Boolean,//可搜索
            remote: Boolean,//可远程搜索
            remoteMethod: Function,//远程搜索调用的方法
        },
        watch: {
            /*query(newV){
                this.placeholder=newV;
            }*/
            queryStr(newV){
                if(this.filterable){
                    if(this.remote){//远程搜索
                        this.remoteMethod(newV);
                    }else{//本地搜索
                        this.tempOptions = this.ownOptions.filter(item=>{
                            return item.name.indexOf(newV)>-1;
                        });
                    }
                }
            },
            options(val) {
                if(this.remote && this.filterable){
                    this.tempOptions = JSON.parse(JSON.stringify(val));
                }else{
                    this.update(val);
                }
            }
        },
        computed:{
            isEmpty(){
                return this.tempOptions.length===0;
            }
        },
        data() {
            return {
                query: '',
                ownOptions: [],//本地搜索 存储全量
                tempOptions: [],//绑定到视图上的变量
                placeholder: '',
                selectedItems: [],
                visible: false,
                queryStr: '',
            }
        },
        mounted() {
            this.update(this.options);
        },
        methods: {
            update(arr) {
                this.ownOptions = JSON.parse(JSON.stringify(arr));
                this.tempOptions = JSON.parse(JSON.stringify(arr));
            },
            handleFocus() {
                // this.visible = true;
            },

            handleBlur() {
                // this.visible = false;
            },
            onClickInput() {
                this.visible = !this.visible;
                // if(this.visible){
                //     this.placeholder = this.query;
                //     this.query = '';
                // }else{
                //     this.query = this.placeholder;
                // }
            },
            handleOptionSelect(option) {
                let curVal = option.target.attributes[2].value;
                if(this.isMultiple){
                    let index = '';
                    let finded = this.selectedItems.some((item, idx) => {
                        if (item.value === curVal) {
                            index = idx;
                            return true;
                        }
                        return false;
                    });

                    if (finded) {
                        this.selectedItems.splice(index, 1);
                    } else {
                        this.selectedItems.push({
                            value: curVal,
                            name: option.target.textContent,
                        });
                    }

                    this.query = this.selectedItems && this.selectedItems.map(item => item.name).join(',');
                }else{
                    this.selectedItems = [];
                    this.selectedItems.push({
                        value: curVal,
                        name: option.target.textContent,
                    });

                    this.query = option.target.textContent;
                    this.visible = false;
                }
                this.$emit('update-selected-data', this.query);
                this.$emit('input', this.selectedItems);
            }
        },
    }
</script>

<style scoped>
    *{box-sizing: border-box;}
    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .hidden {
        display: none;
    }

    .selected {
        color: #409eff;
        font-weight: 700;
    }

    .option:hover {
        background-color: #f5f7fa;
    }

</style>