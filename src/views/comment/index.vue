<template>
    <div class="comment-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
          <el-table
            :data="articles"
            style="width: 100%"
            size="mini"
            stripe
            class="table-list"
          >
            <el-table-column
              prop="title"
              label="标题"
            >
            </el-table-column>
            <el-table-column
              prop="total_comment_count"
              label="总评论数"
              >
            </el-table-column>
            <el-table-column
              prop="fans_comment_count"
              label="粉丝评论数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="评论状态">
              <template slot-scope="scope">
                {{ scope.row.comment_status ? '正常' : '关闭'}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.comment_status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="onCommentStatus(scope.row)"
                  :disabled="scope.row.statusDisabled"
                >
                </el-switch>
              </template>

            </el-table-column>
          </el-table>
        <!--
        current-page: 控制页码高亮
        page-size： 控制每页显示几条数据，这两个要写。.sync才能实时绑定。
        -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          background
        >
        </el-pagination>
      </el-card>
    </div>
</template>
<script>
import { getArticle } from '@/api/article'
import { updateCommentStatus } from '@/api/comment'
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [],
      currentPage4: 4,
      pageSize: 10,
      totalCount: 0,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
  },
  mounted () {
  },
  methods: {
    handleSizeChange () {
      this.loadArticles(1)
    },
    handleCurrentChange (page) {
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      // 我们在第三页改变页码显示的条数时，页码回到第一页。
      this.page = page
      getArticle({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        const reslut = res.data.data.results
        reslut.forEach(commentStatus => {
          commentStatus.statusDisabled = false
        })
        this.articles = reslut
        this.totalCount = res.data.data.total_count
        console.log(this.articles)
      })
    },
    onCommentStatus (article) {
      // 这个方法，我们要求把一行的数据传过来。因为请求要id,和status。我们要从这一行拿
      // 提交是否可以评论的状态请求。article就是一个变量名字
      article.statusDisabled = true
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        article.statusDisabled = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启成功' : '关闭成功'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.table-list {
  margin-bottom: 40px;
}
</style>
