const ProductsService = require('../services/services');

module.exports = {
    findAllProduct:async(ctx,next) =>{
        let data = await ProductsService.getAllProducts();
        ctx.body={
            // totalCount:data.length,
            products:data
        }
    },
    findOneById:async(ctx)=>{
        let id = ctx.params.id;
        let data = await ProductsService.getOneById(id)
        ctx.body= data
    },
    addProduct:async(ctx,next)=>{
        let product = ctx.request.body
        await ProductsService.createProduct(product);
        ctx.body={
            status:0,
            msg:'添加成功'
        }
    },
    updateProduct:async(ctx)=>{
        let id =ctx.params.id
        let data = ctx.request.body
        await ProductsService.updateById(id,data)
        ctx.body={
            status:0,
            msg:'修改成功'
        }
    },
    deleteProduct:async(ctx,next)=>{
        let id = ctx.params.id
        await ProductsService.deleteProduct(id)
        ctx.body={
            status:0,
            msg:'删除成功'
        }
    }
}