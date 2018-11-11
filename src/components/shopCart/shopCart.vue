<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for='(item,index) in shopList' :key='item.id'>
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelect">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <div data-v-2be32b7a="">
                                            <inputcounter :goodsId='item.id' :goodsCount='item.buycount' @myEvent='updataTotal'>
                                            </inputcounter>
                                        </div>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price*item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a @click='deleteGoods(index)'>删除</a>
                                    </td>
                                </tr>
                                <tr v-if='shopList.length===0'>
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click='continueShop'>继续购物</button>
                            <button class="submit" @click='accountsTotal'>立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入
    import {
        getLocalData
    } from '../../common/localStorage.js'
    // 导入子组件
    import inputcounter from '../subcomponent/counter.vue'
    export default {
        data() {
            return {
                shopList: [],
                // isSelect: true
            }
        },
        created() {
            this.getShopCartData()
        },
        components: {
            inputcounter
        },
        computed: {
            getTotalCount() {
                let totalcount = 0
                // 累加商品数量
                this.shopList.forEach(item => {
                    if (item.isSelect == true) {
                        totalcount += item.buycount
                    }
                })
                return totalcount
            },
            getTotalAmount() {
                let totalamount = 0
                this.shopList.forEach(item => {
                    if (item.isSelect == true) {
                        totalamount += item.buycount * item.sell_price
                    }
                })
                return totalamount
            }
        },
        methods: {
            getShopCartData() {
                const LocalData = getLocalData()
                const keys = Object.keys(LocalData)
                if (keys.length == 0) {
                    return false
                }
                const url = `site/comment/getshopcargoods/${keys.join(',')} `
                this.$axios.get(url).then(response => {
                    response.data.message.forEach(item => {
                        item.buycount = LocalData[item.id]
                        item.isSelect = true
                    })
                    this.shopList = response.data.message
                })
            },
            updataTotal(changeGood) {
                // 遍历axios请求回来的数据,修改相应id的商品数量
                // 将子组件传递过来的商品id和商品数量 给shopList 触发计算属性重新计算
                this.shopList.forEach(item => {
                    if (item.id == changeGood.goodsId) {
                        item.buycount = changeGood.goodsCount
                    }
                })
                this.$store.commit('updataGoods', changeGood)
            },
            deleteGoods(index) {
                this.$confirm('确定要删除该商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 点击确定
                    this.$store.commit('deleteGoods', this.shopList[index].id)
                    //删除shopList
                    this.shopList.splice(index, 1)
                }).catch(() => {});
            },
            continueShop() {
                this.$router.push({
                    path: '/continuebuy'
                })
            },
            accountsTotal() {
                // 点击立即结算,拿到被选中的商品信息
                const ids = []
                this.shopList.forEach(item => {
                    if (item.isSelect) {
                        ids.push(item.id)
                    }
                })
                if (ids.length == 0) {
                    this.$message({
                        showClose: true,
                        message: '至少要有一件商品!!!',
                        type: 'warning'
                    });
                } else {
                    this.$router.push({ path:`/acntTotal`,query: { ids: ids.join(',') }})
                }
            }
        }
    }
</script>

