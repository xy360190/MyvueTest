<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <el-input placeholder="spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述 ">
        <el-input
          type="textarea"
          rows="4"
          placeholder="spu描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <!-- 上传图片， action 图片上传地址 -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect, index) in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttrList"
          >添加销售属性</el-button
        >
        <!-- 展示的是当前spu属于自己的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名"
            prop="saleAttrName"
            width="width"
          ></el-table-column>

          <el-table-column label="属性值名称列表" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <!-- @close="handleClose(tag)" -->

              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                 @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                 @blur="handleInputConfirm(row)"
                 
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>

          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // spu初始化时四个空对象，在修改spu时会像服务器发请求 返回spu信息{对象}，在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
      // 添加 spu
      spu: {
        // 三级分类id
        category3Id: 0,
        // 描述
        description: "",
        spuName: "",
        // 平台id
        tmId: '',
        // 收集spu图片信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, // 存储spu信息属性
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], // 存储图片信息
      saleAttrList: [], // 销售属性的数(项目全部的销售属性)
      attrIdAndAttrName: "", // 收集未选择属性id
    };
  },
  methods: {

     // 初始化SpuForm数据
    async initSpuData(spu) {
      // 获取spu信息接口
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // // 获取spu图片接口
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        // 由于照片墙显示图片的数据需要数组，数组里面的元素需要有name和url字段
        // 需要把服务器返回的数据进行修改
        listArr.forEach((item) => {
          (item.name = item.imgName), (item.url = item.imgurl);
        });
        // 把整理好的数据赋值给
        this.spuImageList = listArr;
      }
      // 获取平台全部销售属性  一共三个
      let saleResult = await this.$API.spu.reqBaseSaleAtteList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 照片墙删除
    handleRemove(file, fileList) {
      // file：代表是删除哪一张图片
      // fileList:照片删除后剩余的其它照片
      // 对于已有的图片【照片墙中显示的图片，有name,url字段】必要属性
      // 对于服务器，不需要name，url字段，对于有的图片数据在提交服务器时，需要处理
      this.spuImageList = fileList;
    },

    // 照片墙预览回调
    handlePictureCardPreview(file) {
      // 将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 对话框显示
      this.dialogVisible = true;
    },
    // 照片上传成功回调
    handSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.spuImageList = fileList;
    },
    // 添加新的销售属性信息
    addSaleAttrList() {
      // 格式有问题进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      // 像spu对象的spuSaleAttrList添加新的销售属性
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      //
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 添加之后清空option框数据
      this.attrIdAndAttrName = '';

    },
    // tag添加按钮
    addSaleAttrValue(row){
      // 点击添加按钮 button变input，通过inputVisible属性控制
      this.$set(row,'inputVisible',true);
      this.$set(row,'inputValue','')
    },
    // 失去焦点事件
    handleInputConfirm(row){
      // 解构出销售属性当中收集数据
      const { baseSaleAttrId,inputValue} =row;
      // 属性值不能为空
      if(inputValue.trim()==''){
        this.$message('属性不能为空')
        return;
      }
      // 属性值不能重复   这个some和every方法都可以使用
      // let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue);
      let result = row.spuSaleAttrValueList.some(item=>item.saleAttrValueName==inputValue);
      //  if(!result) return;
      if(result){
        this.$message('不能重复')
        return;
      }

      // 新增的销售属性值
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue};
      // 新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false

    },
    // 保存按钮的回调
    async addOrUpdateSpu(){
      // 整理参数照片墙的数据    图片：imgName,imgUrl
    this.spu.spuImageList =  this.spuImageList.map((item)=>{
        return {
          imgName:item.name,
          imgUrl:(item.response&&item.response.data)||item.url
        }
      });
      // 发请求
         let result=  await this.$API.spu.reqAddOrUpdateSpu(this.spu);
     // 提示
     if(result.code==200){
       this.$message({type:'success',message:'保存成功'});
       // 通知父组件回到场景0
       this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'});
     }
     // 清除数据
      Object.assign(this._data,this.$options.data());
    },
    // 点击添加spu按钮时，发送函数
   async  addSpuData(category3Id){
     // 收集三级分类id
     this.spu.category3Id = category3Id;

     
       // 获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      };
        // 获取平台全部销售属性  一共三个
      let saleResult = await this.$API.spu.reqBaseSaleAtteList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 取消按钮
    cancel(){
     this.$emit('changeScene', {scene:0,flag:''});
     // 清理数据
     Object.assign(this._data,this.$options.data());
    },
    
  },
  computed: {
    // 计算出还未选择的销售属性
    unSelectSaleAttr() {
      // 整个平台的销售属性是三个：颜色，尺寸，版本 ---- saleAttrList
      // 当前spu拥有属于自己的销售属性spu.spuSaleAttrList ---颜色
      // 数组过滤，已有数组中过滤出用户需要的元素并返回一个新数组
      let result = this.saleAttrList.filter((item) => {
        // every数组方法，会返回一个布尔值
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>