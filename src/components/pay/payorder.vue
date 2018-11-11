<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderData.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderData.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderData.area}}{{orderData.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderData.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderData.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderData.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <!-- <dzh-qrcode></dzh-qrcode> -->
                                <!-- <dzh-qrcode url="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3593279141,723921390&fm=200&gp=0.jpg" :img_url='img_url'></dzh-qrcode> -->
                                <img id="imgLogo" src="../../statics/site/images/alipay.png" hidden>
                                <div id="container">
                                    <canvas width="400" height="400"></canvas>
                                </div>
                            </div>
                            <!-- img_url='http://img3.imgtn.bdimg.com/it/u=1890139028,94467391&fm=26&gp=0.jpg' -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入二维码插件
// import DZHQRcode from "dzh-qrcode";
import "../../statics/site/jquery_plugins/qrcode/jqueryqr.js";
import "../../statics/site/jquery_plugins/qrcode/qrcode.js";
export default {
  //   components: {
  //     "dzh-qrcode": DZHQRcode
  //   },
  data() {
    return {
      orderData: {},
      timeInter: -1
    };
  },
  created() {
      clearInterval(this.timeInter)
    this.getorderData()
    this.task()
  },
  mounted() {
    // 初始化二维码插件
    //图片logo
  this.timeInter = setTimeout(() => {
      $("#container").erweima({
        mode: 4,
        mSize: 20,
        image: $("#imgLogo")[0],
        text: `http://47.106.148.205:8899/site/validate/pay/alipay/${
          this.$route.query.orderid
        }`
      });
    }, 200);
  },
  beforeDestroy(){
      clearInterval(this.timeInter)
  },
  methods: {
       // 轮询
    task(){
        // 隔一段时间发送一次请求,询问支付状态
        setInterval(()=>{
           this.getorderData()
        },3000)
    },
    getorderData() {
      this.$axios
        .get(`site/validate/order/getorder/${this.$route.query.orderid}`)
        .then(response => {
            // /如果状态为2,表示已支付,则跳转到支付成功页面
            if(response.data.message[0].status==2){
                this.$router.push({path:'/paySuccess'})
                return
            }
          this.orderData = response.data.message[0];
        });
    },
   
  }
};
</script>