<!--

-->
<template>
    <div :style="{width: '100%'}">
        <input
            v-model="query"
            style="width: 200px"
            :placeholder="placeholder"
            @focus="handleFocus"
            @blur="handleBlur"
            @click="onClickInput"
        >
        <ul :class="[{hidden:!visible}]" style="width: 200px;height:200px;overflow:auto;margin: 0 auto;border:1px solid #DCDFE6;">
            <li v-for="item in options"
                :key="item[optionProp.value]"
                :label="item[optionProp.label]"
                :value="item[optionProp.value]"
                :class="['option',{selected:selectedItems.find(select=>select.value===item[optionProp.value])}]"
                @click.stop="handleOptionSelect">{{item[optionProp.label]}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ZytSelect",
        props: {
            options: {
                type: Array,
            },
            optionProp: {
                type: Object,
                default: function () {
                    return {
                        value: 'value',
                        label:'label',
                    }
                }
            },
            isMultiple:{
                type:Boolean,
                default:false,
            },
            width:{
                type:String,
                default:'200',
            }
        },
        watch:{
            /*query(newV){
                this.placeholder=newV;
            }*/
        },
        data(){
          return{
              query:'',
              placeholder:'',
              selectedItems:[],
              visible:false,

          }
        },
        methods:{
            handleFocus() {
                // this.visible = true;
            },

            handleBlur() {
                // this.visible = false;
            },
            onClickInput(){
                this.visible=!this.visible;
                // if(this.visible){
                //     this.placeholder = this.query;
                //     this.query = '';
                // }else{
                //     this.query = this.placeholder;
                // }
            },
            handleOptionSelect(option){
                let curVal=Number(option.target.attributes[2].value);
                if(this.selectedItems.length===0){
                    this.selectedItems.push({
                        value:curVal,
                        name:option.target.textContent,
                    });
                }else{
                    let index='';
                    let finded=this.selectedItems.some((item,idx)=>{
                        if(item.value===curVal){
                            index=idx;
                            return true;
                        }
                        return false;
                    });
                    if(finded){
                        this.selectedItems.splice(index,1);
                    }else{
                        this.selectedItems.push({
                            value:curVal,
                            name:option.target.textContent,
                        });
                    }
                }
                if(this.isMultiple){
                    this.query = this.selectedItems && this.selectedItems.map(item=>item.name).join(',');
                }else{
                    this.query =option.target.textContent;
                    // this.$emit('input', this.query+'，');
                    this.visible = false;
                }
                this.$emit('update-selected-data',this.query);
                this.$emit('input',this.selectedItems);
            }
        },
    }
</script>

<style scoped>
    ul,li{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .hidden{
        display: none;
    }
    .selected {
        color: #409eff;
        font-weight: 700;
    }
    .option:hover{
        background-color: #f5f7fa;
    }
</style>