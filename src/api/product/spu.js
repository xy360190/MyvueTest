
import request from '@/utils/request';

// 获取spu列表数据接口   GET /admin/product/{page}/{limit}  category3Id
export const reqSpuList = (page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})


// 获取spu信息接口     GET /admin/product/getSpuById/{spuId}
export const reqSpu =(spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

// 获取品牌信息     GET /admin/product/baseTrademark/getTrademarkList
export const  reqTradeMarkList =() =>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

// 获取spu图片接口    GET /admin/product/spuImageList/{spuId}
export const  reqSpuImageList =(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取平台全部销售属性    GET /admin/product/baseSaleAttrList

export const  reqBaseSaleAtteList=()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})

//  保存             POST /admin/product/saveSpuInfo


// 修改|添加         POST /admin/product/updateSpuInfo
export const reqAddOrUpdateSpu=(spuInfo)=>{
    // 携带id---修改spu
    if(spuInfo.id){
        return request({url:`/admin/product/updateSpuInfo`,method:'post',data:spuInfo});
    }else{
        // 携带参数不带id   添加spu
        return request({url:`/admin/product/saveSpuInfo`,method:'post',data:spuInfo});
    }
}

// 删除        DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu =(spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'});




// 获取图片接口    GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList2 =(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});
  
//  获取销售属性的数据                         GET /admin/product/spuSaleAttrList/{spuId}
  
export const reqSpuSaleAttrList =(spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'});

 //  虎丘平台属性的数据          GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}

 export const reqAttrInfoList =(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});

 //   添加sku                     POST /admin/product/saveSkuInfo
 export const reqAddSku =(skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})

 // 获取sku列表数据接口         GET /admin/product/findBySpuId/{spuId}

 export const reqSkuList = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}}`,method:'get'})