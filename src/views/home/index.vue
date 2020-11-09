<template>
  <div>
    <MyNav :activeItem="1" v-show="!navBarFixed"></MyNav>
    <MyNav
      :activeItem="1"
      :class="{navBarFixed:navBarFixed}"
      v-show="navBarFixed"
    ></MyNav>
    <transition name="el-backtop-transition" enter-active-class="animated fadeInRight">
      <el-backtop></el-backtop>
    </transition>
    <!-- 内容 -->
    <div class="m-padded-tb-big m-container">
      <div class="ui container">
        <div class="ui stackable grid">
          <!-- 左边博客列表 -->
          <div class="eleven wide column">
            <!-- header -->
            <div class="ui top attached segment">
              <div class="ui middle aligned two column grid">
                <div class="column">
                  <h3 class="ui teal header">博客</h3>
                </div>
                <div class="right aligned column">
                  共
                  <h2 class="ui orange header m-inline-block m-text-thin">{{total}}</h2>篇
                </div>
              </div>
            </div>
            <!-- content -->
            <div class="ui attached segment">
              <div
                class="ui vertical padded segment m-padded-tb-large"
                v-for="(item,index) in articlePreview"
                :key="index"
              >
                <div class="ui mobile reversed stackable grid">
                  <div class="eleven wide column">
                    <router-link
                      :to="{name:'blog',params:{id:item.id}}"
                      class="ui header"
                    >{{item.title}}</router-link>
                    <br />
                    <br />
                    <p class="m-text">{{item.summary}}...</p>
                    <div class="ui stackable grid">
                      <div class="eleven wide column">
                        <div class="ui mini horizontal link list">
                          <div class="item">
                            <img :src="item.authorAvatar" alt class="ui avatar image" />
                            <div class="content">
                              <router-link to type="text">{{item.authorNickname}}</router-link>
                            </div>
                          </div>
                          <div class="item">
                            <i class="calendar alternate outline icon"></i>
                            {{item.createTime}}
                          </div>
                          <div class="item">
                            <i class="eye icon"></i>
                            {{item.visits?item.visits:0}}
                          </div>
                        </div>
                      </div>
                      <div class="right aligned five wide column">
                        <button
                          class="ui teal basic label button m-padded-tiny m-text-thin"
                          v-for="(tag,tagIndex) in item.tags.slice(0,1)"
                          :key="tagIndex"
                        >{{tag.tagName}}</button>
                      </div>
                    </div>
                  </div>

                  <div class="five wide column">
                    <router-link :to="{name:'blog',params:{id:item.id}}">
                      <el-image
                        :src="item.thumbnail"
                        fit="contain"
                        class="ui rounded image m-image-small"
                        lazy
                      />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- footer -->
            <div class="ui bottom attached segment">
              <div class="ui middle aligned two column grid">
                <div class="column">
                  <button
                    class="ui teal basic mini button"
                    :class="{disabled:preDisabled}"
                    @click="handlePageChange(-1)"
                  >上一页</button>
                </div>
                <div class="right aligned column">
                  <button
                    class="ui teal basic mini button"
                    :class="{disabled:nextDisabled}"
                    @click="handlePageChange(1)"
                  >下一页</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 右边卡片 -->
          <div class="five wide column">
            <!-- 分类 -->
            <div class="ui segments">
              <div class="ui secondary segment inverted purple">
                <div class="ui two column grid">
                  <div class="column">
                    <i class="idea icon"></i>分类
                  </div>
                  <div class="right aligned column">
                    <router-link to="/types" class="m-white m-text-thin">
                      more
                      <i class="angle double right icon"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="ui teal segment">
                <div class="ui fluid vertical menu">
                  <a
                    class="item"
                    v-for="(item,index) in types.slice(0,6)"
                    :key="index"
                    @click="gotoType(item.id)"
                  >
                    {{item.categoryName}}
                    <div class="ui teal left pointing label">13</div>
                  </a>
                </div>
              </div>
            </div>

            <!-- 标签 -->
            <div class="ui segments m-margin-top-large">
              <div class="ui secondary segment inverted blue">
                <div class="ui two column grid">
                  <div class="column">
                    <i class="tags icon"></i>标签
                  </div>
                  <div class="right aligned column">
                    <router-link to="/tags" class="m-white m-text-thin">
                      more
                      <i class="angle double right icon"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="ui teal segment">
                <a
                  class="ui basic teal left pointing label m-margin-tb-tiny"
                  v-for="(item,index) in tags.slice(0,8)"
                  :key="index"
                  @click="gotoTag(item.id)"
                >
                  {{item.tagName}}
                  <div class="detail">15</div>
                </a>
              </div>
            </div>
            <!-- 最新推荐 -->
            <div class="ui segments m-margin-top-large">
              <div class="ui secondary inverted pink segment">
                <i class="bookmark icon"></i>最新推荐
              </div>
              <div class="ui segment">
                <div class="ui fluid vertical menu">
                  <a href="#" target="_blank" class="item">Spring Boot 实战</a>
                  <a href="#" target="_blank" class="item">Spring Boot 实战</a>
                  <a href="#" target="_blank" class="item">Spring Boot 实战</a>
                  <a href="#" target="_blank" class="item">Spring Boot 实战</a>
                  <a href="#" target="_blank" class="item">Spring Boot 实战</a>
                  <a href="#" target="_blank" class="item">Spring Boot 实战</a>
                </div>
              </div>
            </div>
            <!-- 二维码 -->
            <h4
              class="ui horizontal divider hearder m-text-thin m-margin-top-large"
              style="color:#E0FFFF"
            >扫码关注我</h4>
            <div class="ui centered card" style="width: 11em;">
              <img src="../../assets/wechat.png" alt class="ui rounded image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from "../../components/Footer";
import MyNav from "../../components/Nav";
import tagsApi from "../../api/tags";
import typesApi from "../../api/types";
import articleCategoryApi from "../../api/articleCategory";
import articleApi from "../../api/article";
export default {
  components: {
    MyFooter,
    MyNav
  },
  data() {
    return {
      tags: [],
      types: [],
      articlePreview: [],
      page: 1,
      size: 8,
      totalPages: 0,
      total: 0,
      navBarFixed: false
    };
  },
  created() {
    this.getTags();
    this.getTypes();
    this.getArticle();
  },
  computed: {
    preDisabled() {
      return this.page === 1;
    },
    nextDisabled() {
      return this.page === this.totalPages;
    }
  },
  methods: {
    getTags() {
      tagsApi.listAll().then(({ data }) => {
        // console.log(data);
        this.tags = data.data;
      });
    },
    getTypes() {
      articleCategoryApi.listAllCategory().then(({ data }) => {

        this.types = data.data;
      });
    },
    getArticle() {
      articleApi.pageBy(this.page, this.size).then(({ data }) => {
        // console.log(data.data);
        this.articlePreview = data.data.records;
        this.totalPages = data.data.pages;
        this.total = data.data.total;
      });
    },
    gotoDetail() {
      this.$message.info("123");
    },
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 120) {
        this.navBarFixed = true;
      } else if (scrollTop < 70) {
        this.navBarFixed = false;
      }
    },
    handlePageChange(change) {
      this.page += change;
      window.scrollTo(0, 0);
      this.getArticle();
      // this.$router.go(0)
    },
    gotoType(id) {
      window.sessionStorage.setItem('defaultCategory',id)
      this.$router.push({path:'/types'})
    },
    gotoTag(id){
      window.sessionStorage.setItem('defaultTag',id)
      this.$router.push({path:'/tags'})
    }
  },
  mounted() {
    window.addEventListener("scroll", this.watchScroll);
  }
};
</script>

<style lang='less' scoped>
</style>