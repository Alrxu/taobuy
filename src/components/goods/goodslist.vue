<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodData.catelist" :key='item.id'>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for='subitem in item.subcates' :key='subitem.id'>
                                                    {{subitem.title}}&nbsp;
                                                </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                    <a href="/goods/40.html">{{item.title}}</a>
                                                </dt>
                                            <dd>
                                                <a v-for='subitem in item.subcates' :key='subitem.id' href="/goods/43.html">{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <ul class="slides">
                                    <el-carousel :interval="5000" arrow="always" height='341px'>
                                        <el-carousel-item v-for="item in goodData.sliderlist" :key="item.id">
                                            <a href="/goods.html">
                                                <img style="width: 100%;height:100%;" :src="item.img_url" draggable="false">
                                            </a>
                                        </el-carousel-item>
                                    </el-carousel>
                                </ul>
                                <ol class="flex-control-nav flex-control-paging">
                                    <li>
                                        <a class="">1</a>
                                    </li>
                                    <li>
                                        <a class="flex-active">2</a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for='(item,index) in goodData.toplist' :key='item.id'>
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | datefmt}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for='item in goodList' :key='item.level1cateid'>
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for='subitem in item.level2catelist' :key='subitem.subcateid'>{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                            <i>+</i>
                        </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for='subitem in item.datas' :key='subitem.artID'>
                            <router-link :to="'/goodsinfo/'+subitem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.stock_quantity}}</strong>
                                        <span>市场价：
                                                <s>{{subitem.market_price}}</s>
                                            </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                goodData: {},
                goodList: []
            }
        },
        created() {
            this.getGoodsData(),
                this.getGoodsList()
        },
        methods: {
            getGoodsData() {
                const url = `site/goods/gettopdata/goods`
                this.$axios.get(url).then(response => {
                    this.goodData = response.data.message
                })
            },
            getGoodsList() {
                const url = `site/goods/getgoodsgroup`
                this.$axios.get(url).then(response => {
                    this.goodList = response.data.message
                })
            }
        }
    }
</script>

<style scoped>
    .el-carousel__item {
        width: 100%;
        height: 100%;
    }
</style>