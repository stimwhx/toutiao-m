<template>
  <div class="login-container">
    <!--
    1、要给el-form 组件绑定 model为表单数据对象，这个表单数据对像，就是定义的提交数据的对象，在data里定义的user就是我们要提交的表示数据对象
     2、给el-form 组件的rules属性配置验证规则
     3、给要验证的表单项 el-form-item 绑定 prop属性 属性要指定提交表单对象的变量名称
     点击登录调用表单验证
     1、给el-form 添加ref属性
     2、在方法里，通过$refs向父组件传值。调用这个refs的validate方法。这个方法返回两个值，一个是验证成没成功。另一个是错误信息。
     -->
    <el-form
      class="login-from"
      ref="login-form"
      :model="user"
      :rules="formRules"

    >
      <div class="login-head"></div>
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已同意</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 这里是按需要引入，{s1,s2}
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 这是判断协议复选框
      },
      // checked: false, // 这是协议复选框
      loginLoading: false, // 这是登录加载
      // 表单的验证
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确手机号格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码格式' }
        ],
        agree: [
          // rule 是你的组件信息，value是你有没有成功的结果，true,false . callback是你成功也调用，callback(),
          // 不成功调用callback(new error("报错信息"))
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意协议'))
              }
            },
            trigger: 'change'
          }
        ]
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
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user
      this.$refs['login-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.login()
      })
    },
    login () {
      // 开启登录中的loading....
      this.loginLoading = true
      // 验证通过提交登录
      login(this.user).then(res => {
        console.log(res)
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        // 登录成功关闭loading也有禁多次点击的作用
        this.loginLoading = false
        // 把登录成功的数据存储在本地，可以通过控制能的Application标签下的 Local Strorage看到。
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push('/')
      }).catch(err => {
        this.$message.error('手机号或验证码出错了')
        // 登录失败关闭loading也有禁多次点击的作用
        this.loginLoading = false
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-head{
    width: 300px;
    height: 57px;
    background: url("./logo_index.png") no-repeat;
    margin-bottom: 30px;
    background-color: #fff;
  }
  .login-from {
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
    .login-btn{
      width: 100%;
    }
  }
}
</style>
