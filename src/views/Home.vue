<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input-sort
      v-model="valnum"
      v-bind="$attrs"
      way="xiaoshu"
      sort-way="asc"
      :invalid="invalid"
      :msg-invalid="errMsg"
      placeholder="输入要排序的数组，用逗号/空格分隔"
      style="width: 300px;"
    ></input-sort>
    <button @click="sortArr('asc')" type="button" class="el-button el-button--primary asc-btn"><span>升序</span></button>
    <button @click="sortArr('desc')"  type="button" class="el-button el-button--primary desc-btn"><span>降序</span></button>
    <div class="sort-box">{{sortNum}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import InputSort from "../components/input-sort";

export default {
  name: 'Home',
  components: {
    InputSort,
    HelloWorld
  },
  data(){
    return{
      valnum:'',
      sortNum:'',
      errMsg:'',
      arr:[],
    }
  },
  computed: {
    invalid(){
      let arr = this.valnum.split(/[ ,，]/);
      console.log(this.$attrs.maxlength,this.$attrs);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // this.sortNum='';
      // eslint-disable-next-line no-useless-escape
      let reg = new RegExp(/^(\-)?\d+(\.\d{1,2})?$/);
      let flag=false;
      arr = arr.filter((item)=>{
        if(item||item==0) return item;
      });
      if(arr.length<3){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.errMsg = '至少输入3个数字再排序呀';
        return true;
      }
      if(arr.length>30){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.errMsg = '最多输入30个数字哦';
        return true;
      }
      for (let item of arr){
        if(!reg.test(item)){
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.errMsg = '请输入数字(小数最多保留2位小数)';
          flag=true;
          break;
        }
      }
      if(flag){
        return true;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.arr=arr;
      return false;
    }
  },
  methods: {
    sortArr(way){
      if(!this.invalid){
        if(way==='asc'){
          this.sortNum = this.arr.sort((a,b)=>{return parseInt(a)-parseInt(b);}).join(',');
        }
        if(way==='desc'){
          this.sortNum = this.arr.sort(function(a,b){return parseInt(b)-parseInt(a);}).join(',');
        }
      }
    }
  }
}
</script>
