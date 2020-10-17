<template>
    <div class="image-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>素材管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="action-head">
          <el-radio-group v-model="collect"
                          size="mini"
                          @change="onCollectChange"
          >
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button size="mini"
                     type="success"
                     @click = "dialogUploadVisible = true"
          >上传素材</el-button>
        </div>
        <!--图片列表-->
        <el-row
          :gutter="10"
        >
          <!--这里的xs sm md lg别忘了前边加一个：要不会报错-->
          <el-col
            :xs="12"
            :sm="6"
            :md="6"
            :lg="4"
            v-for = "(img,index) in images"
            :key="index"
            class="image-item"
          >
            <el-image
              style="height: 100px"
              :src="img.url"
              fit="cover"
            >
            </el-image>
            <div class="action-image">
              <el-button
                type="warning"
                :icon="img.is_collected ? 'el-icon-star-off' : 'el-icon-star-on'"
                circle
                size="mini"
                @click="onCollectImage(img)"
                :loading = img.loading
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                :loading="img.loading"
                @click="onDeleteImage(img)"
              ></el-button>
            </div>
          </el-col>
        </el-row>
        <!--/图片列表-->
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalpage"
          :current-page.sync="page"
          :page-size="pagesize"
          @current-change="onChangeYema"
          :hide-on-single-page="hideonsinglepage"
        >
        </el-pagination>
        <!--/分页-->
      </el-card>
      <el-dialog
        title="上传素材"
        :visible.sync="dialogUploadVisible"
        :append-to-body="true"
        >
        <!--
        upload 本来就是有上传的功能，我们只要配置好了就可以了
        请示方法：默认就是POST
        请求头：headers，这个里走的是原生的，也就是element自己的，没有走配置好的请求。我们要单独获取一下子。在data里去设置
        请示路径：配置action，注意这里必须是完整路径
        请示体：name这个属性设置，和接口里的名字一样。
        -->
        <el-upload
          class="upload-demo"
          drag
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="uploadHeaders"
          name="image"
          multiple
          :show-file-list="false"
          :on-success="onUpLoadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
    </div>
</template>
<script>
import {
  getImages,
  collectImage,
  deleteImage
} from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      radio1: '全部',
      images: [], // 存放后端返回的图片数组
      collect: false, // 这个是点击收藏和全部按钮会变的值
      dialogUploadVisible: false, // 这个是控制点击上传素材按钮弹框展示不展示的。false为不展示，ture为展示
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      page: 1,
      totalpage: 0,
      pagesize: 5,
      hideonsinglepage: false // 当只有一页时，不展示页码。也判断了，当只有一页，总图片为0时，不展示页码。
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  mounted () {
  },
  methods: {
    loadImages (page = 1) {
      // 重制页码，防止数据和页码不对应
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pagesize
      }).then(res => {
        console.log(res)
        const result = res.data.data.results
        result.forEach(img => {
          // result返回的对象，每一个没有loading的状态，我们手动给每一个返回的数组对象加一个loading变量
          img.loading = false
        })
        this.totalpage = res.data.data.total_count
        this.images = result
        // 当只有一页时，不展示页码。也判断了，当只有一页，总图片为0时，不展示页码。
        if (res.data.data.results.length === 0) {
          this.hideonsinglepage = true
        }
      })
    },
    onCollectChange () {
      this.loadImages(1)
    },
    onUpLoadSuccess () {
      this.dialogUploadVisible = false
      // 因为你上传是不一定在第一页，我们要保证我们在那一页就在那一页上。所以。我们这里是this.page
      this.loadImages(this.page)
      // 上传成功后，不一定在我们这一页上显示。因为显示图片的顺序是后台给我们的。所以我们给一个提示
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onCollectImage (img) {
      // 图片收藏
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        img.loading = false
      })
    },
    onDeleteImage (img) {
      // 这里接收的是一个对象，我们取这个对象的id给请求，取这个loading状态给这个按钮
      img.loading = true
      // 删除素材
      deleteImage(img.id).then(res => {
      // 删除成功后，把loading取消，重新加载页面
        img.loading = false
        this.loadImages(this.page)
      })
    },
    onChangeYema (page) {
      this.loadImages(page)
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.action-image {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
.image-item {
  position: relative;
}
</style>
