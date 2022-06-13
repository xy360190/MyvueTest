// 平台属性管理模块请求文件

import request from '@/utils/request';

// 获取一级分类接口  GET /admin/product/getCategory1

export const reqCategory1List = ()=>request({url:'/admin/product/getCategory1',method:'get'});

// 获取二级级分类接口  GET /admin/product/getCategory2/{category1Id}

export const reqCategory2List = (category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'});

// 获取三级级分类接口  GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

 // 获取平台属性   GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}

 export const reqAttrLisst =(category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加属性值接口   POST /admin/product/saveAttrInfo

export const reqAddOrUpdateAttr = (data)=>request({url:'/admin/product/saveAttrInfo',method:'post',data})