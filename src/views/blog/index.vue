<template>
  <div>
    <MyNav v-show="!navBarFixed" class="animated fadeIn"></MyNav>
    <MyNav :class="{navBarFixed:navBarFixed}" v-show="navBarFixed"></MyNav>
    <transition name="el-backtop-transition" enter-active-class="animated fadeInRight">
      <el-backtop></el-backtop>
    </transition>
    <div class="m-padded-tb-big m-container-small">
      <div class="ui container">
        <div class="ui segment top attached">
          <div class="eleven wide column">
            <div class="ui horizontal link list">
              <div class="item">
                <img :src="articleDetail.authorAvatar" alt class="ui avatar image" />
                <div class="content">
                  <el-button type="text">{{articleDetail.authorNickname}}</el-button>
                </div>
              </div>
              <div class="item">
                <i class="calendar alternate outline icon"></i>
                {{articleDetail.createTime}}
              </div>
              <div class="item">
                <i class="eye icon"></i>
                {{articleDetail.visits}}
              </div>
            </div>
          </div>
        </div>
        <div class="ui attached segment">
          <img :src="articleDetail.thumbnail" alt class="ui fluid rounded image" />
        </div>
        <div class="ui segment attached padded">
          <div class="ui right aligned basic segment">
            <div class="ui label orange basic">原创</div>
          </div>
          <h2 class="ui center aligned header">{{articleDetail.title}}</h2>
          <div id="content" class="m-padded-lr-responsive m-padded-tb-large">
            <!-- <h3>Hello,world!</h3> -->
            <article v-html="articleDetail.htmlContent" class="markdown-body"></article>
          </div>
          <!-- 标签 -->
          <div class="m-padded-lr-responsive">
            <div
              class="ui tag label m-margin-lr-big"
              :class="[
            {'red':index%10===0},
            {'orange':index%10===1},
            {'yellow':index%10===2},
            {'olive':index%10===3},
            {'green':index%10===4},
            {'teal':index%10===5},
            {'blue':index%10===6},
            {'violet':index%10===7},
            {'purple':index%10===8},
            {'pink':index%10===9},]"
              v-for="(item,index) in articleDetail.tags"
              :key="index"
            >{{item.tagName}}</div>
          </div>
          <!-- 赞赏 -->
          <div class="ui segment basic center aligned">
            <button id="payButton" class="ui orange circular button inverted">赞赏</button>
          </div>
          <div class="ui payQR flowing popup transition hidden">
            <div class="ui orange basic label">
              <span>没钱续服务器了</span>
              <br />
              <div class="ui images" style="font-size: inherit !important;">
                <div class="image">
                  <img
                    src="../../assets/支付宝.jpg"
                    alt
                    class="ui rounded bordered image"
                    style="width: 120px;"
                  />
                  <div>支付宝</div>
                </div>
                <div class="image">
                  <img
                    src="../../assets/wepay.jpg"
                    alt
                    class="ui rounded bordered image"
                    style="width: 120px;"
                  />
                  <div>微信</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ui attached positive message">
          <div class="ui middle aligned grid">
            <div class="eleven wide column">
              <ul class="list">
                <li>作者：{{articleDetail.authorNickname}}</li>
                <li>时间：{{articleDetail.createTime}}</li>
                <li>版权声明：{{articleDetail.authorNickname}}</li>
                <li>转载请注明出处</li>
              </ul>
            </div>
            <div class="five wide column">
              <img
                src="../../assets/wechat.png"
                alt
                class="ui rounded bordered image right floated"
                style="width:110px"
              />
            </div>
          </div>
        </div>
        <div class="ui bottom attached segment">
          <!-- 留言区域列表 -->
          <div class="ui teal segment">
            <div class="ui threaded comments">
              <h3 class="ui dividing header">评论</h3>
              <span
                v-if="comment.length === 0 && !articleDetail.disableComment"
                class="m-opacity-large"
              >还没有人评论哦...</span>
              <span v-else-if="articleDetail.disableComment" class="m-opacity-large">该文章已禁用评论</span>
              <div v-if="!articleDetail.disableComment">
                <div class="comment" v-for="(item,index) in comment" :key="index">
                  <a class="avatar">
                    <img src="https://picsum.photos/id/1003/100/100" />
                  </a>
                  <div class="content">
                    <a class="author" :class="{'identity':item.isAuthor}">{{item.name}}<span v-if="item.isAuthor">（作者）</span></a>
                    <div class="metadata">
                      <span class="date">{{item.createTime}}</span>
                    </div>
                    <div class="text">
                      <p>{{item.content}}</p>
                    </div>
                    <div class="actions">
                      <el-button
                        type="text"
                        class="reply"
                        @click="handleReply(item.id,item.name)"
                        size="mini"
                      >回复</el-button>
                    </div>
                  </div>
                  <div class="comments" v-if="item.leaf.length > 0">
                    <div class="comment" v-for="(leaf,leafIndex) in item.leaf" :key="leafIndex">
                      <a class="avatar">
                        <img src="https://picsum.photos/id/1003/100/100" />
                      </a>
                      <div class="content">
                        <a class="author" :class="{'identity':leaf.isAuthor}">{{leaf.name}}<span v-if="leaf.isAuthor">（作者）</span></a>
                        <span style="color:#4169E1">@</span>
                        <a class="author" :class="{'identity':leaf.ifParentAuthor}">{{leaf.parentName}}<span v-if="leaf.ifParentAuthor">（作者）</span></a>
                        <div class="metadata">
                          <span class="date">{{leaf.createTime}}</span>
                        </div>
                        <div class="text">{{leaf.content}}</div>
                        <div class="actions">
                          <el-button
                            type="text"
                            class="reply"
                            @click="handleReply(leaf.id,leaf.name)"
                            size="mini"
                          >回复</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!articleDetail.disableComment">
            <div class="ui form">
              <div class="field">
                <textarea name="content" :placeholder="placeholder" v-model="commentParams.content"></textarea>
              </div>
              <div class="fields">
                <div class="field m-mobile-wide m-margin-bottom-small">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="text" placeholder="姓名" v-model="commentParams.name" />
                  </div>
                </div>
                <div class="field m-mobile-wide m-margin-bottom-small">
                  <div class="ui left icon input">
                    <i class="mail icon"></i>
                    <input type="text" placeholder="邮箱" v-model="commentParams.email" />
                  </div>
                </div>
                <div class="field m-mobile-wide m-margin-bottom-small">
                  <button class="ui teal button m-mobile-wide" @click="postComment">
                    <i class="edit icon"></i>评论
                  </button>
                  <button
                    class="ui orange button m-mobile-wide"
                    v-if="!isRoot"
                    @click="handleCancel"
                  >取消</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="私密文章验证" :visible.sync="dialogVisible" :append-to-body="true" center>
      <el-form :model="authAuthorForm" :rules="rule" ref="authAuthorForm">
        <el-form-item style="width:70%;margin:auto" prop="authToken">
          <!-- <el-row>
            <el-col :span="19" style="margin-right:10px">
              <el-input
                v-model="authAuthorForm.authToken"
                prefix-icon="el-icon-key"
                placeholder="请输入邮箱验证令牌"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button
                :disabled="buttonDisable"
                :class="{codeGeting:isGetting}"
                type="primary"
                @click="sendMessage"
                :loading="verifyCodeLoading"
              >{{getCode}}</el-button>
            </el-col>
          </el-row>-->
          <el-input
            v-model="authAuthorForm.authToken"
            prefix-icon="el-icon-key"
            placeholder="请输入邮箱验证令牌"
          >
           <el-button
                slot="append"
                :disabled="buttonDisable"
                :class="{codeGeting:isGetting}"
                type="primary"
                @click="sendMessage"
                :loading="verifyCodeLoading"
              >{{getCode}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item style="width:70%;margin:40px auto">
          <el-row>
            <el-col>
              <el-button
                type="primary"
                style="width:100%"
                @click="authAuthor('authAuthorForm')"
                :loading="authLoading"
              >验证</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyNav from "../../components/Nav";
import MyFooter from "../../components/Footer";
import articleApi from "../../api/article";
import commentApi from "../../api/comment";
import mailApi from "../../api/mail";
export default {
  components: {
    MyNav,
    MyFooter
  },
  data() {
    return {
      accessKey: null,
      articleId: 0,
      articleDetail: {},
      navBarFixed: false,
      comment: [],
      isRoot: true,
      parentId: 0,
      commentParams: {
        articleId: 0,
        name: null,
        email: "",
        content: ""
      },
      placeholder: "请输入评论内容...",
      dialogVisible: false,
      authAuthorForm: {
        authToken: null
      },
      getCode: "发送验证码",
      buttonDisable: false,
      isGetting: false,
      count: 60,
      rule: {
        authToken: [
          { required: true, message: "请输入令牌", trigger: "change" }
        ]
      },
      verifyCodeLoading: false,
      authLoading: false
    };
  },
  created() {
    // if(this.$route.query.accessKey){
    //   this.accessKey = this.$route.query.accessKey
    // }
    if (sessionStorage.getItem("accessKey")) {
      this.accessKey = sessionStorage.getItem("accessKey");
    }
    this.articleId = this.$route.params.id;
    this.commentParams.articleId = this.$route.params.id;
    this.getArticleDetail(this.articleId, this.accessKey);
    this.getComment(this.articleId, this.accessKey);
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
    window.addEventListener("copy", this.copyAdvice);
  },
  methods: {
    getArticleDetail(id, accessKey) {
      articleApi
        .getById(id, accessKey)
        .then(({ data }) => {
          // console.log(data.data);
          this.articleDetail = data.data;
          document.title = "博客详情-"+this.articleDetail.title
        })
        .catch(err => {
          console.log(err);
          if (err.response.data.code === 401) {
            this.dialogVisible = true;
          }
        });
    },
    sendMessage() {
      this.verifyCodeLoading = true;
      this.getVerifyCode();
      mailApi
        .sendMail(this.articleId)
        .then(response => {
          this.$message.success("验证令牌已发往作者邮箱");
        })
        .finally(() => {
          this.verifyCodeLoading = false;
        });
    },
    getVerifyCode() {
      let countDown = setInterval(() => {
        if (this.count < 1) {
          this.isGetting = false;
          this.buttonDisable = false;
          this.getCode = "发送验证码";
          this.count = 60;
          clearInterval(countDown);
        } else {
          this.isGetting = true;
          this.buttonDisable = true;
          this.getCode = this.count-- + "s后重发";
        }
      }, 1000);
    },
    authAuthor(authAuthorForm) {
      this.$refs[authAuthorForm].validate(valid => {
        if (valid) {
          this.authLoading = true;
          articleApi
            .authAuthor(this.articleId, this.authAuthorForm.authToken)
            .then(response => {
              this.$message.success("验证成功");
              let accessKey = response.data.data;
              sessionStorage.setItem("accessKey", accessKey);
              this.accessKey = accessKey
              this.getArticleDetail(this.articleId, accessKey);
              this.getComment(this.articleId, accessKey);
              this.dialogVisible = false;
            })
            .finally(() => {
              this.authLoading = false;
            });
        } else {
          return false;
        }
      });
    },
    getComment(id, accessKey) {
      commentApi.listComment(id, accessKey).then(({ data }) => {
        // console.log(data);
        this.comment = data.data;
      });
    },
    postComment() {
      if (this.commentParams.content === "") {
        this.$message.error("请输入评论内容");
        return;
      }
      if (this.commentParams.email === "") {
        this.$message.error("请输入邮箱");
        return;
      }
      if (this.commentParams.name === "") {
        this.commentParams.name = null;
      }
      commentApi
        .postComment(this.commentParams, this.isRoot, this.parentId)
        .then(({ data }) => {
          // console.log(data)
        })
        .finally(() => {
          this.commentParams.name = null;
          this.commentParams.email = "";
          this.commentParams.content = "";
          this.handleCancel();
          this.getComment(this.articleId, this.accessKey);
        });
    },
    handleReply(parentId, parentName) {
      // console.log(parentId)
      this.parentId = parentId;
      this.isRoot = false;
      this.placeholder = `回复 ${parentName}:`;
    },
    handleCancel() {
      (this.parentId = 0), (this.isRoot = true);
      this.placeholder = "请输入评论内容...";
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
    copyAdvice(event) {
      let clipboardData = event.clipboardData || window.clipboardData;
      // console.log(clipboardData);
      let text = window.getSelection().toString();
      // 如果 未复制或者未剪切，直接 return
      if (!clipboardData) return;
      // console.log(window.getSelection().toString());
      if (text) {
        if (text.length <= 64) {
          return;
        }
        event.preventDefault();
        clipboardData.setData(
          "text/plain",
          text +
            "\n" +
            "—————————————————\n" +
            "版权声明\n" +
            "本文章是【" +
            this.articleDetail.authorNickname +
            "】的原创文章\n" +
            "转载请注明出处：" +
            window.location.href +
            "\n—————————————————\n"
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.codeGeting {
  background: #cdcdcd;
  border-color: #cdcdcd;
}
.identity{
  color:#8A2BE2 !important;
}
</style>