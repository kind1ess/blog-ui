<template>
  <div>
    <MyNav :activeItem="3" v-show="!navBarFixed"></MyNav>
    <MyNav
      :activeItem="3"
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
              <h3 class="ui teal header">标签</h3>
            </div>
            <div class="right aligned column">
              共
              <h2 class="ui orange header m-inline-block m-text-thin">{{tags.length}}</h2>个
            </div>
          </div>
        </div>
        <div class="ui segment attached m-padded-tb-large">
          <button
            class="ui tag label button m-margin-tb-small m-margin-lr-big"
            v-for="(item,index) in tags"
            :key="index"
            :class="{'teal':item.id === activeTag}"
            @click="listAllArticlesPageBy(item.id)"
          >
            {{item.tagName}}
            <div class="detail">15</div>
          </button>
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
import articleTagsApi from "../../api/articleTags";
export default {
  components: {
    MyNav,
    MyFooter
  },
  data() {
    return {
      navBarFixed: false,
      tags: [],
      activeTag: 0,
      articlePreview: [],
      page: 1,
      size: 8,
      totalPages: 0
    };
  },
  created() {
    this.getAllTags();
  },
  mounted() {
    // $(".menu.toggle").click(function() {
    //   $(".m-item").toggleClass("m-mobile-hide");
    // });

    $("#payButton").popup({
      popup: $(".payQR.popup"),
      // on:'click',
      position: "top center"
    });
    window.addEventListener("scroll", this.watchScroll);
  },
  beforeDestroy(){
    window.sessionStorage.removeItem('defaultTag')
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
    getAllTags() {
      let defaultTag = + window.sessionStorage.getItem('defaultTag')
      articleTagsApi.listAllTags().then(({ data }) => {
        // console.log(data);
        this.tags = data.data;
        if (defaultTag) {
          this.listAllArticlesPageBy(defaultTag);
        }else{
          this.listAllArticlesPageBy(this.tags[0].id);
        }
      });
    },
    listAllArticlesPageBy(tagId) {
      this.activeTag = tagId;
      window.sessionStorage.setItem('defaultTag',tagId)
      articleTagsApi
        .listAllArticlesPageBy(tagId, this.page, this.size)
        .then(({ data }) => {
          // console.log(data)
          this.articlePreview = data.data.records;
          // console.log(this.articlePreview);
          this.totalPages = data.data.pages;
        });
    },
    handlePageChange(page) {
      this.page += page;
      this.listAllArticlesPageBy(this.activeTag);
    }
  }
};
</script>

<style scoped>
</style>