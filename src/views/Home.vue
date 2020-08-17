<template>
    <div class="home">
        <!--    <img alt="Vue logo" src="../assets/logo.png">-->
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <input-sort
                v-model="valnum"
                class="outclass"
                :way="'xiaoshu'"
                sort-way="asc"
                :invalid="invalid"
                :msg-invalid="errMsg"
                placeholder="输入要排序的数组，用逗号/空格分隔"
                style="width: 300px;"
        ></input-sort>
        <button @click="sortArr('asc')" type="button" class="el-button el-button--primary asc-btn"><span>升序</span>
        </button>
        <button @click="sortArr('desc')" type="button" class="el-button el-button--primary desc-btn"><span>降序</span>
        </button>
        <div class="sort-box">{{sortNum}}</div>

        <div v-if="selectedData" style="height: 22px;margin-top: 30px;">{{selectedData}}</div>
        <div v-if="!selectedData" style="height: 22px;"></div>
        <zyt-select
                v-model="selectedVal"
                :options="options"
                :optionProp="optionProp"
                :is-multiple="false"
                width="200"
                @update-selected-data="updateSelectedData"
        ></zyt-select>

    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import InputSort from "../components/input-sort";
    import ZytSelect from "../components/select";
    import test from "../../public/test";
    import Vue from 'vue';
    import https from "https";

    export default {
        name: 'Home',
        components: {
            ZytSelect,
            InputSort,
            HelloWorld
        },
        watch:{
            selectedVal(newV){
                this.options = this.tempOptions.filter(item=>{
                    return item.name.indexOf(newV)>-1;
                });

                if(this.options.length===0){
                    this.options.push({id:0,name:'无匹配的数据'});
                }
            }
        },
        data() {
            // const https=require(https);
            return {
                valnum: '',
                sortNum: '',
                errMsg: '',
                arr: [],
                selectedVal: '',
                selectedData:'',
                optionProp: {
                    value: 'id',
                    label: 'name',
                },
                tempOptions:[],
                options: [{
                    id: '选项1',
                    name: '黄金糕'
                }, {
                    id: '选项2',
                    name: '双拼'
                }],

            }
        },
        computed: {
            invalid() {
                test.fun(Vue);
                let arr = this.valnum.split(/[ ,，]/);
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                // this.sortNum='';
                // eslint-disable-next-line no-useless-escape
                let reg = new RegExp(/^(\-)?\d+(\.\d{1,2})?$/);
                let flag = false;
                arr = arr.filter((item) => {
                    if (item || item == 0) return item;
                });
                if (arr.length < 3) {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.errMsg = '至少输入3个数字再排序呀';
                    return true;
                }
                if (arr.length > 30) {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.errMsg = '最多输入30个数字哦';
                    return true;
                }
                for (let item of arr) {
                    if (!reg.test(item)) {
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.errMsg = '请输入数字(小数最多保留2位小数)';
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    return true;
                }
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.arr = arr;
                return false;
            }
        },
        mounted() {
            this.getData();

        },
        methods: {
            sortArr(way) {
                if (!this.invalid) {
                    if (way === 'asc') {
                        this.sortNum = this.arr.sort((a, b) => {
                            return parseInt(a) - parseInt(b);
                        }).join(',');
                    }
                    if (way === 'desc') {
                        this.sortNum = this.arr.sort(function (a, b) {
                            return parseInt(b) - parseInt(a);
                        }).join(',');
                    }
                }
            },
            getData() {
                https.get('examples/data/asset/data/aqi-beijing.json', (res) => {
                    // console.log('statusCode:', res.statusCode);
                    // console.log('headers:', res.headers);
                    // console.log(res)
                    res.on('data', (d) => {
                        // console.log('d=',d);
                        this.options=[];
                        for (let i = 0; i < 50; i++) {
                            this.options.push({id:i,name:`${i}-${d[i]}`});
                        }
                        this.tempOptions=JSON.parse(JSON.stringify(this.options));
                    });

                }).on('error', (e) => {
                    console.error(e);
                });
            },
            updateSelectedData(selectedData){
                this.selectedData=selectedData;
            }
        },
    }
</script>
