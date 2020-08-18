<!--

-->
<template>
    <div class="el-select">
        <div class="el-select__tags" style="width: 100%; max-width: 208px;">
            <span>
                <span class="el-tag el-tag--info el-tag--small el-tag--light">
                    <span class="el-select__tags-text">label:Alabama</span>
                </span>
                <span class="el-tag el-tag--info el-tag--small el-tag--light">
                    <span class="el-select__tags-text">label:Alabama</span>
                </span>
                <span class="el-tag el-tag--info el-tag--small el-tag--light">
                    <span class="el-select__tags-text">label:Alabama</span>
                </span>
            </span>
            <input type="text" class="el-select__input" style="flex-grow: 1; width: 0.0961538%; max-width: 198px;"
                   v-model="queryStr"
                   @click="onClickInput"
            >
        </div>
        <div class="el-input el-input--suffix">
            <input tabindex="-1" type="text" readonly="readonly" class="el-input__inner"
                   v-model="query"
                   style="height: 62px;width: 200px;"
                   :placeholder="placeholder"
                   @focus="handleFocus"
                   @blur="handleBlur"
            >
<!--            <span class="el-input__suffix">-->
<!--                <span class="el-input__suffix-inner">-->
<!--                    <i class="el-select__caret el-input__icon el-icon-"></i>-->
<!--                </span>-->
<!--            </span>-->
        </div>

<!--        <input-->
<!--                v-model="query"-->
<!--                style="width: 200px"-->
<!--                :placeholder="placeholder"-->
<!--                @focus="handleFocus"-->
<!--                @blur="handleBlur"-->
<!--                @click="onClickInput"-->
<!--        >-->
        <ul :class="[{hidden:!visible}]"
            style="width: 200px;height:200px;overflow:auto;margin: 0 auto;border:1px solid #DCDFE6;">
            <li v-for="item in options"
                :key="item[optionProp.value]"
                :label="item[optionProp.label]"
                :value="item[optionProp.value]"
                :class="['option',{selected:selectedItems.find(select=>select.value===item[optionProp.value])}]"
                @click.stop="handleOptionSelect">{{item[optionProp.label]}}
            </li>
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
                        label: 'label',
                    }
                }
            },
            isMultiple: {
                type: Boolean,
                default: false,
            },
            width: {
                type: String,
                default: '200',
            }
        },
        watch: {
            /*query(newV){
                this.placeholder=newV;
            }*/
        },
        data() {
            return {
                query: '',
                placeholder: '',
                selectedItems: [],
                visible: false,
                queryStr: '',
            }
        },
        methods: {
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
                let curVal = Number(option.target.attributes[2].value);
                if (this.selectedItems.length === 0) {
                    this.selectedItems.push({
                        value: curVal,
                        name: option.target.textContent,
                    });
                } else {
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
                }
                if (this.isMultiple) {
                    this.query = this.selectedItems && this.selectedItems.map(item => item.name).join(',');
                } else {
                    this.query = option.target.textContent;
                    // this.$emit('input', this.query+'，');
                    this.visible = false;
                }
                this.$emit('update-selected-data', this.query);
                this.$emit('input', this.selectedItems);
            }
        },
    }
</script>

<style scoped>
    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .el-select__tags {
        position: absolute;
        line-height: normal;
        white-space: normal;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .el-select .el-select__tags>span {
        display: contents;
    }
    .el-tag.el-tag--info {
        background-color: #f4f4f5;
        border-color: #e9e9eb;
        color: #909399;
    }
    .el-select .el-tag {
        box-sizing: border-box;
        border-color: transparent;
        margin: 2px 0 2px 6px;
        background-color: #f0f2f5;
    }
    .el-tag--small {
        height: 24px;
        padding: 0 8px;
        line-height: 22px;
    }
    .el-tag {
        background-color: #ecf5ff;
        display: inline-block;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409eff;
        border: 1px solid #d9ecff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
    }
    .el-select__input {
        border: none;
        outline: none;
        padding: 0;
        margin-left: 15px;
        color: #666;
        font-size: 14px;
        appearance: none;
        height: 28px;
        background-color: transparent;
    }

    input {
        cursor: pointer;
    }
    button, input, select, textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
    }
    .el-select {
        display: inline-block;
        position: relative;
        width: 240px;
    }

    .el-input--suffix .el-input__inner {
        padding-right: 30px;
    }

    .el-select .el-input__inner {
        cursor: pointer;
        padding-right: 35px;
    }
    .el-input__inner {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
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