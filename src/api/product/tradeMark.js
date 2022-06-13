// 这个模块主要获取的是品牌挂简历的数据模块
import request from '@/utils/request';

// 获取品牌列表接口
// GET /admin/product/baseTrademark/{page}/{limit}

export const reqTradeMarkList = (page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});

// 新增品牌： POST /admin/product/baseTrademark/save 携带参数：品牌名称，-品牌logo
// 修改品牌 PUT /admin/product/baseTrademark/update 携带三个参数 ：id  品牌名称，-品牌logo
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    // 如果携带id---修改
    if(tradeMark.id){
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        // 新增品牌
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark});
    }
}

// 删除品牌 DELETE /admin/product/baseTrademark/remove/{id}

export const reqDeleteTradeMark = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})