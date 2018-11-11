<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section" v-if="goodDetail.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodDetail.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodDetail.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodDetail.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodDetail.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodDetail.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodDetail.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="goodDetail.goodsinfo.stock_quantity" label="描述文字">
                                                </el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                    库存
                                                    <em id="commodityStockNum">{{goodDetail.goodsinfo.stock_quantity}}</em>件
                                                </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref='addCart' @click='addCart' class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click='isShowComment=false' :class="isShowComment?'':'selected'" href="javascript:;">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click='isShowComment=true' :class="isShowComment?'selected':''" href="javascript:;">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isShowComment" class="tab-content entry" style="display: block;">
                                <div style='padding: 5px' v-html='goodDetail.goodsinfo.content'></div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show='isShowComment' class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref='textareaCtnt' id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click='submitComment'>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if='commentList.length===0' style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for='item in commentList' :key='item.id'>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | datefmt}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in goodDetail.hotgoodslist' :key='item.id'>
                                        <router-link :to="'/goodsinfo/'+item.id">
                                            <div class="img-box">
                                                <a href="#/site/goodsinfo/90" class="">
                                                    <img :src="item.img_url">
                                                </a>
                                            </div>
                                            <div class="txt-box">
                                                <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                                <span>{{item.add_time | datefmt}}</span>
                                            </div>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show='isShow' v-if='goodDetail.imglist' class='animateCart' ref='animateCart'>
                <img :src='goodDetail.imglist[0].original_path' />
            </div>
        </transition>
    </div>
</template>

<script>
    import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'
    import {
        Affix
    } from 'iview';
    export default {
        components: {
            Affix
        },
        data() {
            return {
                goodDetail: {},
                buyCount: 1,
                isShowComment: false,
                commentList: [],
                pageIndex: 1,
                pageSize: 5,
                total: 0,
                isShow: false,
                addCartBtn: null,
                shopCart: null
            }
        },
        created() {
            this.getGoodsDetail(),
                this.getCommentList()
        },
        updated() {
            // 右边点击商品的时候要更新图册
            $('#magnifier1').imgzoon({
                magnifier: '#magnifier1'
            })
        },
        watch: {
            $route() {
                // 监听$route 值一改变就调用商品详情请求方法
                this.getGoodsDetail()
            }
        },
        methods: {
            getGoodsDetail() {
                const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
                this.$axios.get(url).then(response => {
                    this.goodDetail = response.data.message
                })
                setTimeout(() => {
                    // 在页面模板渲染出来之后,获取到加入购物车按钮的offset值
                    this.addCartBtn = $(this.$refs.addCart).offset()
                    // 获取到购物车的offset值
                    this.shopCart = $('#shoppingCartCount').offset()
                    console.log(this.shopCart)
                    // 设置商品动画图片的起始位置
                    $(this.$refs.animateCart).css({
                        top: this.addCartBtn.top,
                        left: this.addCartBtn.left
                    })
                }, 2000)
            },
            getCommentList() {
                const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
                this.$axios.get(url).then(response => {
                    this.total = response.data.totalcount
                    this.commentList = response.data.message
                })
            },
            //  分页 改变页容量
            handleSizeChange(pageSize) {
                // 分页改变了 把数据中的分页改变,并且把当前页码初始化为1,再重新渲染评论列表
                this.pageSize = pageSize
                this.pageIndex = 1
                this.getCommentList()
            },
            // 改变页码
            handleCurrentChange(pageIndex) {
                this.pageIndex = pageIndex
                this.getCommentList()
            },
            //  点击提交发布评论
            submitComment() {
                const commentData = $(this.$refs.textareaCtnt).val()
                //  如果评论为空,则提示
                if (commentData.trim().length === 0) {
                    this.$message({
                        message: '评论不能为空!!!',
                        type: 'warning'
                    });
                } else {
                    const url = `site/validate/comment/post/goods/${this.$route.params.goodsId}`
                    this.$axios.post(url, {
                        commenttxt: commentData
                    }).then(response => {
                        if (response.data.status == 0) {
                            this.$message({
                                message: '评论成功!!!',
                                type: 'success'
                            });
                            // 重新渲染评论列表
                            this.pageIndex = 1
                            this.getCommentList()
                            // 清空输入文本框
                            $(this.$refs.textareaCtnt).val('')
                        } else {
                            this.$message({
                                message: '评论发布失败!!!',
                                type: 'warning'
                            });
                        }
                    })
                }
            },
            addCart() {
                // 点击加入购物车按钮 显示商品动画图片
                this.isShow = true
                // 准备载荷
                const goods = {
                    goodsId: this.$route.params.goodsId,
                    count: this.buyCount
                }
                // 将载荷提交到仓库,通过 store.commit方法触发状态变更：
                this.$store.commit('addGoods',goods)

            },
            beforeEnter: function(el) {
                // 设置动画元素的起始位置
                el.style.top = this.addCartBtn.top + 'px';
                el.style.left = this.addCartBtn.left + 'px';
                el.style.transform = 'scale(1.0)'
            },
            enter: function(el, done) {
                // 设置过渡时间
                el.style.transition = 'all 1s'
                // 强制刷新
                el.offsetHeight
                // 设置最终状态
                el.style.top = this.shopCart.top + "px"
                el.style.left = this.shopCart.left + "px"
                el.style.transform = 'scale(0.3)'
                done()
            },
            afterEnter: function(el) {
                // 动画完了之后,图片隐藏
                this.isShow = false
            },
        }
    }
</script>

<style>
    @import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
    .animateCart {
        width: 60px;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .animateCart img {
        width: 100%;
        height: 100%;
    }
</style>