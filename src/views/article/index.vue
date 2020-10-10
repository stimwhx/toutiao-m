<template>
  <div class="article-container">
    <el-card class="filter-card">
      <!--面包屑-->
      <el-breadcrumb class="breadcrumb-style" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- /面包屑-->
      <!--数据-->
      <el-form
        ref="form"
        :model="form"
        label-width="40px"
        size="mini"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据-->
    </el-card>
    <el-card class="box-card">
      <div>根据条件搜索到的数据4187条</div>
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
      >
        <el-table-column
          prop="date"
          label="封面"
          >
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
            <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template>
            <el-button
              size="mini"
              circle
              type="primary"
              icon="el-icon-edit"
              ></el-button>
            <el-button
              size="mini"
              circle
              type="danger"
              icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表-->

      <!--数据列表分页-->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="1000">
      </el-pagination>
      <!-- /数据列表分页-->
    </el-card>
  </div>
</template>
<script>
import { getArticle } from '@/api/article'
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
      articles: [] // 文章数据列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles () {
      getArticle().then(res => {
        this.articles = res.data.data.results
        console.log(this.articles)
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
</style>
