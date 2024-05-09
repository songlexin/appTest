<template>
  <!-- @keyup="unLockLogin(true)" -->
  <div :class="{ unLockLogin: true }" class="lockscreen" @mousedown.stop @contextmenu.prevent>
    <div class="login-box">
      <Avatar :size="128">
        <template #icon>
          <user-outlined />
        </template>
      </Avatar>
      <div class="username">{{ state.loginForm.username }}</div>
      <a-input-search
        v-model:value="state.loginForm.password"
        type="password"
        autofocus
        placeholder="请输入登录密码"
        size="large"
        @search="onLogin"
      >
        <template #enterButton>
          <LoadingOutlined v-if="state.loginLoading" />
          <arrow-right-outlined v-else />
        </template>
      </a-input-search>
      <a style="margin-top: 10px" @click="nav2login">重新登录</a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { LoadingOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
  import { useRouter, useRoute } from 'vue-router';
  import { Avatar, message } from 'ant-design-vue';
  import { useLockscreenStore } from './../../../store/modules/lockscreen';
  import { useUserStore } from './../../../store/modules/user';
  import { LOGIN_NAME } from './../../../router/constant';
  import { getImageCaptcha } from './../../../api/login';
  import AES from './../../../utils/aes.js';
  import SHA256 from './../../../utils/sha256';
  import { LOCK_TIME } from '@/enums/cacheEnum';
  import { Storage } from '@/utils/Storage';
  import { WEAK_PASS } from '@/enums/cacheEnum';

  const lockscreenStore = useLockscreenStore();
  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const state = reactive({
    isShowLogin: false,
    loginLoading: false, // 正在登录
    loginForm: {
      username: userStore.userInfo.userLoginCode,
      password: '',
      // verifyCode: '',
      captchaId: '',
    },
  });
  // 获取验证码
  const setCaptcha = async () => {
    const { uuId, imageBase64 } = await getImageCaptcha();
    state.captcha = imageBase64;
    state.loginForm.captchaId = uuId;
  };
  setCaptcha();
  // 解锁登录
  const emits = defineEmits(['beginTimer']);
  // 登录
  const onLogin = async () => {
    if (state.loginForm.password.trim() == '') return message.warn('请填写密码');
    // const params = { ...state.loginForm };
    const { username, password } = state.loginForm;
    state.loginLoading = true;
    const regex =
      /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z._~!@#$^&*]+$)(?![a-z0-9]+$)(?![a-z._~!@#$^&*]+$)(?![0-9._~!@#$^&*]+$)[a-zA-Z0-9._~!@#$^&*]{8,16}$/;
    const test = regex.test(password); //false 为弱密码
    Storage.set(WEAK_PASS, test);
    try {
      const res = SHA256(username + state.loginForm.password);
      const params: API.LoginParams = {
        username: state.loginForm.username,
        passwd: AES.encrypt(
          state.loginForm.captchaId,
          state.loginForm.captchaId.substring(0, 16),
          res,
        ),
        verifyCodeId: state.loginForm.captchaId,
        // verifyCode: null,
      };
      await userStore.login(params).finally(() => {
        // state.loading = false;
        message.destroy();
      });
      message.success({
        content: '登录成功！',
        style: {
          marginTop: '50px',
        },
      });
      lockscreenStore.setLock(false);
      if (!Storage.get(LOCK_TIME)) {
        Storage.set(LOCK_TIME, 60 * 60);
      }
      // if (Storage.get(LOCK_TIME) === null) {
      //   // 缓存失效了刷新
      //   Storage.refresh(LOCK_TIME);
      // }
      lockscreenStore.setLockTime();
      // 开启计时器
      emits('beginTimer');
    } catch (error: any) {
      message.error(`${error.message}`);
      // Modal.error({
      //   title: () => '提示',
      //   content: () => error.message,
      // });
    }
    state.loginLoading = false;
  };

  const nav2login = () => {
    lockscreenStore.setLock(false);
    lockscreenStore.setLockTime();
    router.replace({
      name: LOGIN_NAME,
      query: {
        redirect: route.fullPath,
      },
    });
  };
</script>

<style lang="less">
  .wrapClass {
    z-index: 10002;
  }
</style>

<style lang="less" scoped>
  .lockscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    overflow: hidden;
    color: white;
    background: #000;

    &.unLockLogin {
      background-color: rgba(25, 28, 34, 0.78);
      backdrop-filter: blur(7px);
    }

    .login-box {
      position: absolute;
      top: 45%;
      left: 50%;
      display: flex;
      transform: translate(-50%, -50%);
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > * {
        margin-bottom: 14px;
      }

      .username {
        font-size: 30px;
      }
    }

    .lock-box {
      position: absolute;
      top: 12vh;
      left: 50%;
      font-size: 34px;
      transform: translateX(-50%);

      .tips {
        color: white;
        cursor: text;
      }

      .lock {
        display: flex;
        justify-content: center;

        .lock-icon {
          cursor: pointer;

          .anticon-unlock {
            display: none;
          }

          &:hover .anticon-unlock {
            display: initial;
          }

          &:hover .anticon-lock {
            display: none;
          }
        }
      }
    }

    .local-time {
      position: absolute;
      bottom: 60px;
      left: 60px;
      font-family: helvetica;

      .time {
        font-size: 70px;
      }

      .date {
        font-size: 40px;
      }
    }

    .computer-status {
      position: absolute;
      right: 60px;
      bottom: 60px;
      font-size: 24px;

      > * {
        margin-left: 14px;
      }

      .network {
        position: relative;

        &.offline::before {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 10;
          width: 2px;
          height: 28px;
          background-color: red;
          content: '';
          transform: translate(-50%, -50%) rotate(45deg);
        }
      }
    }
  }
</style>
