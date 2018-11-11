// 定义一个对象名 存放vuex中放进来的数据的对象名为GOODS
// 封装一个函数,取出本地存储的数据,如果本地中没有就创建,如果有就返回一个对象形式的数据
const getLocalData = () => {
    return (JSON.parse(localStorage.getItem('GOODS')) || {})
}

// 求总数
const getTotal = () => {
    // 取出本地存储中的数据
    const goodsData = getLocalData()
    let totalCount = 0
    //  遍历GOODS对象,将数据累加
    for (var key in goodsData) {
        totalCount += goodsData[key]
    }
    return totalCount
}
// 增加
const addGoodsLocal = goods => {
    // 取出本地存储中的数据
    const goodsData = getLocalData()
    // 判断 如果本地中的GOODS数据中有当前的id商品的数量,那么就数量累加
    // 否则就存进去
    if (goodsData[goods.goodsId]) {
        goodsData[goods.goodsId] += goods.count
    } else {
        goodsData[goods.goodsId] = goods.count
    }

    // 将最后的结果存进本地
    localStorage.setItem('GOODS', JSON.stringify(goodsData))
    return getTotal()
}

// 修改
const updateLocal = goods => {
    // 取出本地存储中的数据
    const goodsData = getLocalData()
    // 修改本地存储中的相应商品的数量
    goodsData[goods.goodsId] = goods.goodsCount
    // 将最后的结果存进本地
    localStorage.setItem('GOODS', JSON.stringify(goodsData))
    return getTotal()
}

//删除
const deleteLocal = goodsId => {
    // 取出本地存储中的数据
    const goodsData = getLocalData()
    delete goodsData[goodsId]
    // 将最后的结果存进本地
    localStorage.setItem('GOODS', JSON.stringify(goodsData))
    return getTotal()
}

// 按需导出
export {
    addGoodsLocal,
    getTotal,
    getLocalData,
    updateLocal,
    deleteLocal
}