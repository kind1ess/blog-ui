<template>
  <div>
    <MyNav :activeItem="2" v-show="!navBarFixed"></MyNav>
    <MyNav
      :activeItem="2"
      :class="{navBarFixed:navBarFixed}"
      v-show="navBarFixed"
      class="animated fadeIn"
    ></MyNav>
    <transition name="el-backtop-transition" enter-active-class="animated fadeInRight">
      <el-backtop></el-backtop>
    </transition>
    <div class="m-padded-tb-big m-container-small">
      <div class="ui container">
        <!-- header -->
        <div class="ui top attached segment">
          <div class="ui middle aligned two column grid">
            <div class="column">
              <h3 class="ui teal header">分类</h3>
            </div>
            <div class="right aligned column">
              共
              <h2 class="ui orange header m-inline-block m-text-thin">{{categories.length}}</h2>个
            </div>
          </div>
        </div>
        <div class="ui segment attached m-padded-tb-large">
          <div
            class="ui labeled button m-margin-tb-tiny m-margin-lr-large"
            v-for="(item,index) in categories"
            :key="index"
          >
            <button
              class="ui basic button"
              :class="{'teal':item.id === activeCategory}"
              @click="getAllArticlesBy(item.id)"
            >{{item.categoryName}}</button>
            <div class="ui basic label" :class="{'teal':item.id === activeCategory}">24</div>
          </div>
        </div>

        <div class="ui teal top attached segment">
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
                <p class="m-text">{{item.summary}}</p>
                <div class="ui stackable grid">
                  <div class="eleven wide column">
                    <div class="ui mini horizontal link list">
                      <div class="item">
                        <img :src="item.authorAvatar" alt class="ui avatar image" />
                        <div class="content">
                          <router-link to class="header">{{item.authorNickname}}</router-link>
                        </div>
                      </div>
                      <div class="item">
                        <i class="calendar alternate outline icon"></i>
                        {{item.createTime}}
                      </div>
                      <div class="item">
                        <i class="eye icon"></i>
                        {{item.visits}}
                      </div>
                    </div>
                  </div>
                  <div class="right aligned five wide column">
                    <button
                      class="ui teal basic label m-padded-tiny m-text-thin"
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
                    class="ui rounded image m-image-big"
                    fit="contain"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="ui bottom attached segment">
          <div class="ui middle aligned two column grid">
            <div class="column">
              <button
                class="ui teal basic mini button"
                :class="{'disabled':page === 1}"
                @click="handlePageChange(-1)"
              >上一页</button>
            </div>
            <div class="right aligned column">
              <button
                class="ui teal basic mini button"
                :class="{'disabled':page === totalPages}"
                @click="handlePageChange(1)"
              >下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyNav from "../../components/Nav";
import MyFooter from "../../components/Footer";
import articleCategoryApi from "../../api/articleCategory";
export default {
  components: {
    MyNav,
    MyFooter
  },
  data() {
    return {
      navBarFixed: false,
      categories: [],
      activeCategory: 0,
      articlePreview: [],
      page: 1,
      size: 8,
      totalPages: 0
    };
  },
  created() {
    this.getAllCategories();
  },
  mounted() {
    // $(".menu.toggle").click(function() {
    //   $(".m-item").toggleClass("m-mobile-hide");
    // });
    window.addEventListener("scroll", this.watchScroll);
  },
  methods: {
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
    getAllCategories() {
      let defaultCategory = + window.sessionStorage.getItem('defaultCategory')
      articleCategoryApi.listAllCategory().then(({ data }) => {
        this.categories = data.data;
        if (defaultCategory) {
         this.getAllArticlesBy(defaultCategory); 
        } else{
          this.getAllArticlesBy(this.categories[0].id);
        }
      });
    },
    getAllArticlesBy(categoryId) {
      this.activeCategory = categoryId;
      window.sessionStorage.setItem('defaultCategory',categoryId)
      articleCategoryApi
        .selectArticlePageBy(this.activeCategory, this.page, this.size)
        .then(({ data }) => {
          this.articlePreview = data.data.records;
          this.totalPages = data.data.pages;
        });
    },
    handlePageChange(page) {
      this.page += page;
      this.getAllArticlesBy(this.activeCategory);
    }
  },
  beforeDestroy(){
    window.sessionStorage.removeItem('defaultCategory')
  }
};
</script>

<style>
</style>