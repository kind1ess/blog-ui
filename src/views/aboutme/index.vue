<template>
  <div>
    <MyNav :activeItem="5" v-show="!navBarFixed" class="animated fadeIn"></MyNav>
    <MyNav :activeItem="5" :class="{navBarFixed:navBarFixed}" v-show="navBarFixed"></MyNav>
    <transition 
      name="el-backtop-transition"
      enter-active-class="animated fadeInRight"
      >
        <el-backtop></el-backtop>
      </transition>
    <div class="m-padded-tb-big m-container">
      <div class="ui container">
        <div class="ui stackable grid">
          <div class="ui eleven wide column">
            <!-- 图片 -->
            <div class="ui segment">
              <img src="https://picsum.photos/id/1003/800/600" alt class="ui rounded image" />
            </div>
          </div>
          <div class="ui five wide column">
            <!-- 说明 -->
            <div class="ui top attached segment inverted teal">
              <div class="ui header">关于我</div>
            </div>
            <div class="ui attached segment">
              <p class="m-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repellendus
                iusto minus
                quidem
                perspiciatis ab quas eum nostrum deserunt ullam ad ipsum, culpa nemo! Quaerat eos id cum
                ducimus
                sequi.
              </p>
            </div>
            <div class="ui attached segment">
              <div class="ui label purple">编程</div>
              <div class="ui label pink">宅</div>
            </div>
            <div class="ui attached segment">
              <div class="ui label blue m-margin-tb-tiny">Java</div>
              <div class="ui label blue m-margin-tb-tiny">Vue</div>
              <div class="ui label blue m-margin-tb-tiny">JavaScript</div>
              <div class="ui label blue m-margin-tb-tiny">MySQL</div>
            </div>
            <div class="ui bottom attached segment">
              <a
                href="https://github.com/kind1ess"
                target="_blank"
                class="ui _github circular black icon button"
                data-content="https://github.com/kind1ess"
                data-position="top center"
              >
                <i class="ui icon github"></i>
              </a>
              <button class="ui circular green icon button wechat">
                <i class="ui icon wechat"></i>
              </button>
              <button
                class="ui qq circular blue icon button"
                data-content="2411347677"
                data-position="top center"
              >
                <i class="ui icon qq"></i>
              </button>
              <a
                href="https://space.bilibili.com/485670082"
                target="_blank"
                class="ui circular _bili pink icon button"
                data-content="https://space.bilibili.com/485670082"
                data-position="top center"
              >
                <i class="ui icon iconfont icon-bilibili-fill"></i>
              </a>
            </div>
            <div class="ui wechat-qr flowing popup transition hidden">
              <img
                src="../../assets/wechat.png"
                alt
                class="ui rounded image"
                style="width: 100px;"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyNav from '../../components/Nav'
import MyFooter from '../../components/Footer'
export default {
  components: {
    MyNav,
    MyFooter
  },
  data(){
    return{
      navBarFixed:false
    }
  },
  mounted() {
    // $(".menu.toggle").click(function() {
    //   $(".m-item").toggleClass("m-mobile-hide");
    // });

    $(".qq").popup();

    $(".wechat").popup({
      popup: $(".wechat-qr.popup"),
      // on:'click',
      position: "top center"
    });

    $("._github").popup();

    $("._bili").popup();
    window.addEventListener("scroll", this.watchScroll);
  },
  methods:{
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 120) {
        this.navBarFixed = true;
      } else if(scrollTop < 70) {
        this.navBarFixed = false;
      }
    }
  }
};
</script>

<style>
</style>