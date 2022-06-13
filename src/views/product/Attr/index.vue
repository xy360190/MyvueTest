<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isshowTable"  ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isshowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 20px 0px"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column label="属性名称" prop="attrName" width="150">
          </el-table-column>
          <el-table-column label="属性值列表" prop="" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updatedAttr(row)"
              ></el-button>
               <el-popconfirm :title="`确定删除${row.attrName}?`" @onConfirm="deleteAttrValue2($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                >
                 </el-button>
              </el-popconfirm>
                          
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性| 修改属性结构 -->
      <div v-show="!isshowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isshowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称" width="width" prop="">
            <template slot-scope="{ row, $index }">
              <!-- // 结构 input和span进行切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width" prop="">
            <template slot-scope="{ row, $index }">
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                >
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isshowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isshowTable: true,
      // 手机新增属性|修改属性值使用的
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值，因为属性值可以有多个所以是数组，每个属性值都是个对象
        ],
        categoryId: 0, // 三级分类的id
        categoryLevel: 3, // 服务器需要去区分几级id
      },
    };
  },
  // 自定义事件的回调
  methods: {
    getCategoryId({ categoryId, level }) {
      // 区分三级分类相应的id，以及父组件进行存储
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
        this.getAtterList();
      }
    },
    // 获取平台属性数据
    async getAtterList() {
      // 获取分类id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrLisst(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值回调
    addAttrValue() {
      // 向属性值的数组里面添加元素
      // attrId 是你相应的属性id,目前而言添加属性的操作，还没有相应的属性id，带给服务器为undefined
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        // 给每一个属性值添加一个标记flag，用户切换查看模式跟编辑模式，每个属性值可以控制自身变化
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮回调
    addAttr() {
      this.isshowTable = false;
      // 清除数据
      // 收集三级分类id
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 修改属性
    updatedAttr(row) {
      this.isshowTable = false;
      // 将选中赋值给attrInfo
      // 数据结构中存在对象里面套数组，数组里面有对象，所以使用深拷贝
      // this.attrInfo ={...row}
      this.attrInfo = cloneDeep(row);
      // 修改属性时。将相应的属性值元素添加上flag标记
      this.attrInfo.attrValueList.forEach((item) => {
        // flag不是响应式数据，视图不会跟着变化，所以使用$set 方法
        this.$set(item, "flag", false);
      });
    },
    // 失去焦点，切换查看模式，展示span

    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请输入正常属性值");
        return;
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some(item => {
        // 需要将row从数组里面判断的时候去除
        // row是最新新增的属性值[数组的最后一项元素]
        // 判断的时候，需要把已有的数组当中新增的这个属性值去掉
        if (row!== item) { 
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      // row 形参是用户添加最新的属性值
      // row.flag = false; 编辑模式变为查看模式input消失显示span
      row.flag = false;
    },
    // 点击span时回调
    toEdit(row, index) {
      row.flag = true;
      // 获取input节点，实现自动聚焦
      // 点击span时切换为input变为编辑模式，对于浏览器而言，页面重绘与重拍耗时间
      // $nextTick,当节点渲染完毕，会执行一次
      this.$nextTick(() => {
        // 获取input表单元素实现聚焦
        this.$refs[index].focus();
      });
    },
    // 气泡确认框回调
    deleteAttrValue(index){
      // 删除
      this.attrInfo.attrValueList.splice(index,1)
      alert(11)
    },
    // 删除主页面属性列表
     deleteAttrValue2(index){
      this.attrList.splice(index,1)
    },
    // 保存按钮  添加属性或者修改属性
    async addOrUpdateAttr(){
      //整理参数：添加属性值为空不提交，   不能出现flag字段
     this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        // 过滤掉属性值不是空的
        if(item.valueName!=''){
          // 删除掉flag属性
          delete item.flag;
          return true;
        }
      })
      try{
          // 发请求
       await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
       this.isshowTable = true;
       this.$message({type:'success',message:'保存成功'})
       this.getAtterList();

      } catch(error){

      }
    

    }
  },
};
</script>

<style scoped>
</style>
