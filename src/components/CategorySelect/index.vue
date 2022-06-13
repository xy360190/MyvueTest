<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="hander1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="hander2"
          :disabled="show"

        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="hander3"
          :disabled="show"

        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "CategorySelect",
  props: ["show"],
  data() {
    return {
      // 一级分类数据
      list1: [],
      list2: [],
      list3: [],
      // 手机相应的一，二，三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  // 组件挂载完毕，向服务器发送请求，获取一级相应数据
  mounted() {
    this.getCategory1List();
  },
  methods: {
    // 获取一级分数数据方法 不携带参数
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    // 一级分类select事件回调 当一级分类的option发生变化的时候获取相应二级分类数据
    async hander1() {
      // 当一级分类发生变化清除数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      // 解构出一级分类的id
      const { category1Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      // 通过一级分类id获取二级分类的数据
      let result = await this.$API.attr.reqCategory2List(category1Id);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    // 二级分类select事件回调 当二级分类的option发生变化的时候获取相应三级分类数据
    async hander2() {
      // 清除数据
      this.list3 = [];
      this.cForm.category3Id = "";

      // 解构出一级分类的id
      const { category2Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });

      // 通过二级分类id获取三级级分类的数据
      let result = await this.$API.attr.reqCategory3List(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    // 三级分类回调
    hander3() {
      // 获取三级分类id
      const { category3Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>

<style>
</style>