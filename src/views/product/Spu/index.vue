<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 已经是全局组件了 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene !== 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部分页器 -->
      <div v-show="scene == 0">
        <!-- spu；列表结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 20px 0px"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            label="序号"
            width="80"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column
            label="spu名称"
            width="width"
            prop="spuName"
          ></el-table-column>
          <el-table-column
            label="spu描述"
            width="width"
            prop="description"
          ></el-table-column>
          <el-table-column label="操作" width="width" prop="">
            <template slot-scope="{ row, $index }">
              <hin-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hin-button>
              <hin-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改sku"
                @click="updateSpu(row)"
              ></hin-button>
              <hin-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前sku全部列表"
                @click="handler(row)"
              ></hin-button>

              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hin-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  title="删除sku"
                ></hin-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :total="total"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          layout="prev,pager, next,jumper,->,sizes,total"
        ></el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
    <!-- table展示sku -->
    <el-table :data="skuList" style="widtn:100%" border v-loading="loading">
      <el-table-column label="名称" prop="skuName" width=""></el-table-column>
      <el-table-column label="价格" prop="price" width=""></el-table-column>
      <el-table-column label="重量" prop="weight" width=""></el-table-column>
      <el-table-column label="默认图片" width="">
        <template slot-scope="{row,$index}"> 
          <img :src="row.skuDefaultImg" style="widtn:100px;height:100px">
        </template>
      </el-table-column>

    </el-table>
</el-dialog>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      show: true,
      page: 1,
      limit: 3,
      records: [], // spu列表数据
      total: 0,
      scene: 0, // 0 代表展示spu列表 1 添加|修改spu内容 2添加sku
      dialogTableVisible:false, // 对话框
      spu:{},
      skuList:[],
      loading: true
    };
  },
  // 注册子组件
  components: {
    SpuForm,
    SkuForm,
  },
  methods: {
    //   // 点击分页
    //   handleCurrentChange(page){
    //       this.page=page;
    //       this.getSpuList();

    //   },
    // 三级联动自定义事件，把子组件的响应id传给父组件
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表第三级id有了
        this.category3Id = categoryId;
        // 发请求获取平台属性属性
        this.getSpuList();
      }
    },
    // 获取SPU列表数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 分页器某页展示条数发生变化
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      this.getSpuList();
    },
    // 添加spu按钮回调
    addSpu() {
      // 切换场景为1
      this.scene = 1;
      // 通知子组件spuForm发请求--两个接口
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改某一个spu
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件SpuForm子组件的方法
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件回调（SpuForm)
    changeScene({ scene, flag }) {
      // flag区分保存按钮是添加还是修改
      this.scene = scene;
      // 子组件通知父组件切换场景
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // skuform通知父组件修改场景
    changeScenes(scene) {
      this.scene = scene;
    },
    // 删除spu的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 添加sku按钮回调
    addSku(row) {
      // 切换场景2
      console.log(row);
      this.scene = 2;
      // 辅助间调佣子组件的方法，让子组件发请求---三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // 查看sku的按钮回调
   async handler(spu){
      this.dialogTableVisible =true;
      // 保存spu信息
      this.spu = spu;
      console.log(spu,555);
      // 获取sku
    let result = await this.$API.spu.reqSkuList(spu.id);
    console.log(result);
    if(result.code==200){
      this.skuList = result.data;
      this.loading =false

    }

    },
    // 关闭对话框
    close(done){
      this.loading =true;
      // 清除sku列表数据
      this.skuList =[];
      done();

    }
  },
};
</script>

<style scoped>
</style>