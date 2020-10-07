<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="200px"
    >
      <app-aside class="aside_memu"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i class="el-icon-s-fold"></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="mige" :src=user.photo alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="iconfont icongerenzhongxin">个人中心</el-dropdown-item>
            <el-dropdown-item class="iconfont iconSettingscontroloptions">设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!--子路邮出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from './components/aside'
import { gerUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    // 登录成功后，在布局的头中个人中心要用来用户的信息 我们在登录成功后。获取用户的资料
    this.loadUserProfile()
  },
  mounted () {
  },
  methods: {
    loadUserProfile () {
      gerUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: aqua;
}
.aside_memu {
  height: 100%;
}
.header{
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main{
  background-color: bisque;
}
.avatar-wrap{
  display: flex;
  align-items: center;
  .mige{
    width: 40px;
    height: 40px;
    border-radius:50%;
  }
}
</style>
