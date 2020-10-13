<template>
  <div class="publis-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="articles" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articles.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="articles.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articles.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="articles.channel_id" placeholder="请选择活动区域">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">{{this.$route.query.id ? '修改' : '发布'}}</el-button>
          <el-button @click="onPublish(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>
<script>
import { getArticleChannels, publisArticle, getArticleMethod, updateArticle } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: {
        title: '', // 文章名称
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null
      },
      channels: [] // 这是频道数组
    }
  },
  computed: {},
  watch: {},
  created () {
    // 创建这一页时，我们就去加载频道
    this.loadChannel()
    // 要判断是不是有id,有id的话就是要编辑这个
    if (this.$route.query.id) {
      // 有这个id就加载这个id的文章
      this.loadArticle()
    }
  },
  mounted () {
  },
  methods: {
    loadChannel () {
      // 在这里去调用加载频道的方法
      getArticleChannels().then(res => {
        // 在这里给channel数组值,然后把数值绑在频道上
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      // 我们去判断有没有这个id,如果有说明我们是点击文章内容中的编辑按钮来的
      if (this.$route.query.id) {
        updateArticle(this.$route.query.id, this.articles, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '修改'}` + '成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        publisArticle(this.articles, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}` + '成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    },
    loadArticle () {
      getArticleMethod(this.$route.query.id).then(res => {
        this.articles = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
