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
        <el-row :gutter="20">
          <!--这里的xs sm md lg别忘了前边加一个：要不会报错-->
          <el-col
            :xs="12"
            :sm="6"
            :md="6"
            :lg="4"
            v-for = "(img,index) in images"
            :key="index"
          >
            <el-image
              style="height: 100px"
              :src="img.url"
              fit="cover"
            >
            </el-image>
          </el-col>
        </el-row>
        <!--/图片列表-->
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
import { getImages } from '@/api/image'
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
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(false)
  },
  mounted () {
  },
  methods: {
    loadImages (collect = false) {
      getImages({
        collect
      }).then(res => {
        console.log(res)
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    },
    onUpLoadSuccess () {
      this.dialogUploadVisible = false
      this.loadImages(false)
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
</style>
