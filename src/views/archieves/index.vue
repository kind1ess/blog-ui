<template>
  <div>
    <MyNav :activeItem="4" v-show="!navBarFixed"></MyNav>
    <MyNav
      :activeItem="4"
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
        <div class="ui top attached segment padded">
          <div class="ui middle aligned two column grid">
            <div class="column">
              <h3 class="ui teal header">归档</h3>
            </div>
            <div class="right aligned column">
              共
              <h2 class="ui orange header m-inline-block m-text-thin">{{total}}</h2>篇博客
            </div>
          </div>
        </div>
        <div class="ui header aligned" v-for="(item,index) in archives" :key="index">
          <h2 class="ui header center aligned" style="color:#E0FFFF">{{item.year}}</h2>
          <div class="ui fluid vertical menu">
            <router-link
              :to="{name:'blog',params:{id:articleItem.id}}"
              class="item"
              v-for="(articleItem,articleIndex) in item.archiveVoList"
              :key="articleIndex"
            >
              <div class="row">
                <div class="ui middle aligned two column grid">
                  <div class="column">
                    <i class="mini teal icon circle"></i>
                    {{articleItem.title}}
                  </div>
                  <div class="right aligned column m-text-thin m-opacity-tiny">
                    <i class="calendar alternate outline icon"></i>
                    {{articleItem.strDate}}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="ui middle aligned two column grid">
                  <div class="column"></div>
                  <div class="right aligned column">
                    <span>
                      <i class="ui icon tag"></i>
                      <span
                        class="ui tag label m-margin-tb-tiny mini m-margin-lr-huge"
                        v-for="(tagItem,tagIndex) in articleItem.tags.slice(0,4)"
                        :key="tagIndex"
                        :class="[
            {'red':tagIndex%10===0},
            {'orange':tagIndex%10===1},
            {'yellow':tagIndex%10===2},
            {'olive':tagIndex%10===3},
            {'green':tagIndex%10===4}]"
                      >{{tagItem.tagName}}</span>
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
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
import archiveApi from "../../api/archive";
export default {
  components: {
    MyNav,
    MyFooter
  },
  data() {
    return {
      navBarFixed: false,
      archives: [],
      total:0
    };
  },
  created() {
    this.listAll();
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
    listAll() {
      archiveApi.listAll().then(({ data }) => {
        this.archives = data.data;
        this.archives.forEach(element => {
          this.total += element.archiveVoList.length
        });
      });
    }
  }
};
</script>

<style scoped>
</style>