<template>
  <div class="publis-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        ref="publish-form"
        :model="articles"
        :rules="fromRules"
        label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="articles.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
            v-model="articles.content"
            :extensions="extensions"
            lang="zh"
            height="350"
            placeholder="请输入内容"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articles.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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
import { uploadImage } from '@/api/image'
import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem, // 要用下边的这两个就要有这个，这个是不在编辑栏上展示的。
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  Image,
  TextColor,
  HorizontalRule
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
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
      channels: [], // 这是频道数组
      extensions: [
        new Doc(),
        new Text(),
        // 这个tiptap这个编辑器的图片功能提供了一个返回URL的功能
        new Image(
          {
            // 自定义图片的上传
            uploadRequest (file) {
              const fd = new FormData()
              fd.append('image', file) // 注意往fd对象里添加的file名字一定要和接口要求的一样
              return uploadImage(fd).then(res => { // 这里的fd就是formdata对象
                return res.data.data.url
              })
            }
          }
        ),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new TextColor(),
        new HorizontalRule()
      ],
      fromRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value === '<p></p>') {
                callback(new Error('请输入内容'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
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
      this.$refs['publish-form'].validate(valid => {
        // 如果是false那就是难失败了，我们取返回。就直接return，不让表单提交。
        if (!valid) {
          return false
        } else {
          // 我们去判断有没有这个id,如果有说明我们是点击文章内容中的编辑按钮来的
          if (this.$route.query.id) {
            updateArticle(this.$route.query.id, this.articles, draft).then(res => {
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
        }
      })
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
