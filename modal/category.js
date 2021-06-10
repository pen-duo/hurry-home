import Http from "../utils/http"
import regeneratorRuntime from "../lib/runtime/runtime"

class Category {
  static async getCategoryList() {
    return await Http.request({
      url: "v1/category",
    })
  }
  static async getCategoryListWithAll() {
    const categoryList = await Category.getCategoryList()
    categoryList.unshift({
      name: "全部",
      id: 0
    })
    return categoryList
  }
}



export default Category