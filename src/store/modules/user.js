// 引入登录|退出登录|获取用户信息
import { login, logout, getInfo } from "@/api/user";
// 获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from "@/utils/auth";
// 重置理由
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from "@/router";
import router from "@/router";
import cloneDeep from 'lodash/cloneDeep'


// 箭头函数
const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    // 存储用户信息
    name: "",
    avatar: "",
    // 服务器返回菜单信息 【数组里面是字符串】
    routes: [],
    buttons: [],
    roles: [],
    // 对比之后【项目中已有的异步路由：与服务器返回的标记信息进行对比最终展示】
    resultAsyncRoutes: [],
    // 全部路由
    resultAllRputes: [],
  };
};

const state = getDefaultState();

// 唯一修改state的地方
const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name;
    // 用户头像
    state.avatar = userInfo.avatar;
    // 菜单权限标记
    state.routes = userInfo.routes;
    // 按钮群贤标记
    state.buttons = userInfo.buttons;
    // 角色
    state.roles = userInfo.roles;
  },
  // 计算出的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    // 保存当前用户的异步路由
    state.resultAsyncRoutes = asyncRoutes;
    // 计算当前用户需要展示的所有路由
    state.resultAllRputes = constantRoutes.concat(
      state.resultAsyncRoutes,
      anyRoutes
    );
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRputes);
  },
};
// 定义一个函数：两个数组对比显示异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // 过滤当前用户
  return asyncRoutes.filter((item) => {
    // 数组中没有元素返回索引值为-1，如果有这个元素返回的一定不是-1
    if (routes.indexOf(item.name) != -1) {
      // 递归:可能有2,3,4,5级路由
      if (item.children && item.children.lenght) {
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true;
    }
  });
};

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // 解构用户名和密码
    const { username, password } = userInfo;
    let result = await login({
      username: username.trim(),
      password: password,
    });
    console.log(result);
    // mock数据code为2000
    if (result.code == 20000) {
      commit("SET_TOKEN", result.data.token);
      // vue存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          // 返回数据包含name ,avatar,routes[不同用户展示那些菜单标记],roles[用户角色]，buttons[按钮的信息,权限限用的标记]
          const { data } = response;

          // vuex存储用户全部信息
          commit("SET_USERINFO", data);
          commit(
            "SET_RESULTASYNCROUTES",
            computedAsyncRoutes(cloneDeep(asyncRoutes), data.routes)
          );
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
