const {Products} = require('../model/products');

class ProductsService {
    async getAllProducts(){
        return Products.findAll();
    }
    async getOneById(id){
        return Products.findAll({
            where:{id:id}
        });
    }
    async updateById(id,data){
        return Products.update(
            data, 
            {
            where: {id: id}
            }
        )
    }
    async createProduct(product){
        return Products.create(product);
    }
    async deleteProduct(id){
        return Products.destroy({
            where: {
                 id:id
            }
        })
    }
}

module.exports = new ProductsService();