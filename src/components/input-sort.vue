<template>
    <div>
        <input type="text"
               @input="handleInput"
               :placeholder="placeholder"
               :class="['input_box',{err:invalid}]"/>
        <div v-if="invalid" style="color: red;">{{msgInvalid}}</div>
    </div>
</template>

<script>
    export default {
        name: "input-sort",
        props:{
            value:[String,Number],
            way:{
                type:String,
                default: 'zhengshu'
            },
            invalid:{
                type:Boolean,
                default: false
            },
            placeholder:String,
            msgInvalid:String,
        },
        methods:{
            handleInput(event){
                this.$emit('input',event.target.value);
                console.log(this.$attrs);
            }

        },
        created() {
            // console.log('created',this.$attrs);
        }
    }
</script>

<style scoped>
    .input_box{
        border:1px solid #DCDFE6;
        width: 100%;
    }
    .err{
        border:1px solid red!important;
    }
    .err:focus{
        outline: red;
    }
</style>