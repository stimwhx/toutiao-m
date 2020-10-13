<template>
  <div class="article-container">
    <el-card class="filter-card">
      <!--面包屑-->
      <div slot="header" class="clearfix">
      <el-breadcrumb class="breadcrumb-style" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <!-- /面包屑-->
      <!--数据-->
      <el-form
        ref="form"
        :model="form"
        label-width="40px"
        size="mini"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              label="全部"
              :value="null"
            ></el-option>
            <el-option :label= "channelSigle.name"
                       :value= "channelSigle.id"
                       v-for=" (channelSigle, index) in channel"
                       :key = "index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="loading"
            @click="loadArticles(1)"
          >
            查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据-->
    </el-card>
    <el-card class="box-card">
      <div>根据条件搜索到的数据{{ articleTotal }}条</div>
      <!--数据列表-->
      <!--
      1、把要展示的数组列表数据绑定给table组件的data属性
      2、设置表格列el-table-column
      width:表格的宽
      label :列标题
      prop 用来设置要渲染的列表数据字段
      -->
      <el-table
        class="list-table"
        :data="articles"
        stripe
        style="width: 100%"
        size="mini"
        v-loading="loading"
      >
        <el-table-column
          prop="date"
          label="封面"
          >
          <template slot-scope="scope">

            <img
              v-if="scope.row.cover.images[0]"
              :src="scope.row.cover.images[0]"
               alt=""
               class="article-cover"
            >
            <img
              v-else
              class="article-cover"
              src="./article-moren.jpg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
         >
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <!--0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除-->
            <el-tag :type=articleStatus[scope.row.status].type>{{
              articleStatus[scope.row.status].text
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              type="primary"
              icon="el-icon-edit"
              @click="$router.push('/publish?id='+scope.row.id.toString())"
              ></el-button>
            <el-button
              size="mini"
              circle
              type="danger"
              icon="el-icon-delete"
              @click="deleteArticleMethod(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表-->

      <!--数据列表分页-->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="articleTotal"
        :disabled="loading"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :current-page.sync="page"
      >
      </el-pagination>
      <!-- /数据列表分页-->
    </el-card>
  </div>
</template>
<script>
import { getArticle, getArticleChannels, deleteArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'warning' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      articleTotal: 0, // 文章总页数
      pageSize: 20, // 后台设置的是每页10条，我们想每页显示20条，要用到页码的page-size属性，动太绑定这个值
      status: null,
      channel: [],
      channelId: null, // 频道查询
      rangeDate: null, // 日期查询
      loading: true, // 文章加载
      page: 1 // 加载页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.loadChannel()
  },
  mounted () {
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticle(
        {
          page,
          per_page: this.pageSize,
          status: this.status,
          channel_id: this.channelId,
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null
        }
      ).then(res => {
        console.log(res)
        // 请求成功后，我们把总页数给到变量
        this.articles = res.data.data.results
        this.articleTotal = res.data.data.total_count
        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannel () {
      getArticleChannels().then(res => {
        this.channel = res.data.data.channels
      })
    },
    deleteArticleMethod (articleId) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          // console.log(res)
          this.loadArticles(this.page)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table{
  margin-bottom: 20px;
}
.breadcrumb-style{
  margin-bottom: 20px;
}
.article-cover{
  width: 100px;
  background-size: cover;
}
</style>
