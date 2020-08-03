<template>
  <div class="hello">
    <input type="text" v-model="numStr" placeholder="输入要排序的数组，用逗号/空格分隔" :class="['input_box',{err:cannot2}]"/>
    <div v-if="cannot2" style="color: red;">{{errMsg}}</div>
    <button @click="sortArr('asc')" type="button" class="el-button el-button--primary asc-btn"><span>升序</span></button>
    <button @click="sortArr('desc')"  type="button" class="el-button el-button--primary desc-btn"><span>降序</span></button>
    <div class="sort-box">{{sortNum}}</div>
  </div>
</template>

<script>
export default {
  name: 'Sort2',
  props: {

  },
  computed:{
    cannot2(){
      let arr = this.numStr.split(/[ ,，]/);
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
  data(){
    return{
      numStr:'',
      sortNum:'',
      errMsg:'',
      cannot:false,
      arr:[],
    }
  },
  methods:{
    sortArr(way){
      if(!this.cannot2){
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .input_box{
    border:1px solid #409eff;
    width: 100%;
  }
  .sort-box{
    margin: 20px 0;
  }
  .err{
    border:1px solid red!important;
  }
  .err:focus{
    outline: red;
  }
  .asc-btn{
    margin-right: 10px!important;
  }
  .asc-btn:active{
    border-color: #409eff;
    background: #409eff;
    color: white;
  }
  .desc-btn:active{
    border-color: #409eff;
    background: #409eff;
    color: white;
  }
  .el-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

</style>
