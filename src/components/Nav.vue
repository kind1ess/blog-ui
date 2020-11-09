<template>
  <div>
    <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small animated fadeInDown">
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <router-link to="/">
            <h2 class="ui pink header item m-font">Kindless</h2>
          </router-link>
          <router-link to="/" class="m-item item m-mobile-hide" :class="{'active':activeItem===1}">
            <i class="mini home icon"></i>&nbsp;&nbsp;&nbsp;首页
          </router-link>
          <router-link
            to="/types"
            class="m-item item m-mobile-hide"
            :class="{'active':activeItem===2}"
          >
            <i class="mini idea icon"></i>&nbsp;&nbsp;&nbsp;分类
          </router-link>
          <router-link
            to="/tags"
            class="m-item item m-mobile-hide"
            :class="{'active':activeItem===3}"
          >
            <i class="mini tags icon"></i>&nbsp;&nbsp;&nbsp;标签
          </router-link>
          <router-link
            to="/archieves"
            class="m-item item m-mobile-hide"
            :class="{'active':activeItem===4}"
          >
            <i class="mini clone icon"></i>&nbsp;&nbsp;&nbsp;归档
          </router-link>
          <router-link
            to="/aboutme"
            class="m-item item m-mobile-hide"
            :class="{'active':activeItem===5}"
          >
            <i class="mini info icon"></i>&nbsp;&nbsp;&nbsp;关于我
          </router-link>
          <div class="m-item right item m-mobile-hide">
            <div class="ui icon inverted transparent input">
              <input type="text" placeholder="Search" />
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <button
        class="ui menu toggle black icon button m-top-right m-mobile-show"
        @click="handleClick"
      >
        <i class="sidebar icon"></i>
      </button>
    </nav>
    <div class="drawer-parent">
      <el-drawer
      class="m-modify"
      direction="ltr"
      :visible.sync="drawerVisible"
      :append-to-body="true"
      :show-close="false"
      :modal-append-to-body="true"
    >
      <div class="ui menu stackable inverted">
        <router-link to="/" class="item" :class="{'active':activeItem===1}" style="padding:20px">
          <i class="mini home icon"></i>&nbsp;&nbsp;&nbsp;首页
        </router-link>
        <router-link
          to="/types"
          class="item"
          :class="{'active':activeItem===2}"
          style="padding:20px"
        >
          <i class="mini idea icon"></i>&nbsp;&nbsp;&nbsp;分类
        </router-link>
        <router-link
          to="/tags"
          class="item"
          :class="{'active':activeItem===3}"
          style="padding:20px"
        >
          <i class="mini tags icon"></i>&nbsp;&nbsp;&nbsp;标签
        </router-link>
        <router-link
          to="/archieves"
          class="item"
          :class="{'active':activeItem===4}"
          style="padding:20px"
        >
          <i class="mini clone icon"></i>&nbsp;&nbsp;&nbsp;归档
        </router-link>
        <router-link
          to="/aboutme"
          class="item"
          :class="{'active':activeItem===5}"
          style="padding:20px"
        >
          <i class="mini info icon"></i>&nbsp;&nbsp;&nbsp;关于我
        </router-link>
        <div class="m-item right item" style="padding:20px">
          <div class="ui icon inverted transparent input">
            <input type="text" placeholder="Search" />
            <i class="search link icon"></i>
          </div>
        </div>
      </div>
    </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activeItem"],
  data() {
    return {
      drawerVisible: false
    };
  },
  methods: {
    handleClick() {
      this.drawerVisible = true;
    }
  }
};
</script>

<style lang="less">
.m-modify {
  .el-drawer__container {
    // z-index: 20000 !important;
    .el-drawer {
      position: fixed;
      background-color: rgb(27, 28, 29);
    }
  }
}
</style>