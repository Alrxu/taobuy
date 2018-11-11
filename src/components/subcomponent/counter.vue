<template>
    <div>
        <div class='inputnum' @click='subtraction'>-</div>
        <div class='inputnum middle'>{{shopCount}}</div>
        <div class='inputnum' @click='addition'>+</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                shopId:'',
                shopCount: ''
            }
        },
        props: [
            'goodsId', 'goodsCount'
        ],
        created(){
            // 把父组件传过来的数据,在该组件保存一份
            this.shopId = this.goodsId
            this.shopCount = this.goodsCount
        },
        methods:{
            subtraction(){
                //减
                if(this.shopCount ==1){
                    return
                }
                this.shopCount--
                this.upthing()
            },
            addition(){
                //加
                this.shopCount++
                this.upthing()
            },
            upthing(){
                //  让点击加和点击减都调用这个方法,都自定义一个事件,将载荷传递过去
                this.$emit('myEvent',{
                    goodsId: this.shopId,
                    goodsCount: this.shopCount
                })
            }
            
        }
    }
</script>

<style scoped>
    .inputnum{
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        float: left;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
    .middle {
        margin: 0 2px;
    }
</style>

