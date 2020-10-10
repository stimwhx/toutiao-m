<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
      <app-aside
        class="aside_memu"
        :is-collapse = "isCollapse"
      />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="mige" :src=user.photo alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!-- 如果组件不能响应原生事件上。我们就在事件后面加一个.native -->
            <el-dropdown-item
              @click.native="onLogout"
            >退出</el-dropdown-item>
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
      user: {},
      // 控制侧边工具栏的展开与收起
      isCollapse: false
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
    },
    onLogout () {
      this.$confirm('退出登录, 是否继续?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出要把本地的用户存储删除
        window.localStorage.removeItem('user')
        // 删除后，我们跳转回登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
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
  border-bottom-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main{
  // background-color: bisque;
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
