<template>
    <div class="settings-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-row>
          <el-col :span="12"><el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
              123
            </el-form-item>
            <el-form-item label="手机">
              456
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form></el-col>
          <!-- offset是设置偏移量的-->
          <el-col :span="4" :offset="2">
            <el-avatar shape="square" :size="100" :fit="cover"
                       src="http://toutiao-img.itheima.net/FpLbeHlwtnMqtBHEtm6bFpZrQ4uW"></el-avatar>
            <p>点击修改头像</p>
          </el-col>
        </el-row>
      </el-card>
    </div>
</template>
<script>
export default {
  name: 'SettingsIndex',
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
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
</style>
