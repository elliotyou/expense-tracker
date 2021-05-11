const tools = {
  generateTodayString() {
    const d = new Date()
    const month = (d.getMonth() + 1).toString()
    const day = (d.getDate()).toString()
    const year = d.getFullYear()

    const outputMonth = month.length < 2 ? '0' + month : month
    const outputDay = day.length < 2 ? '0' + day : day

    return [year, outputMonth, outputDay].join('-');
  },

  generateCategoryObject(categoryString) {
    return {
      isHome: categoryString === 'isHome',
      isTraffic: categoryString === 'isTraffic',
      isEntertainment: categoryString === 'isEntertainment',
      isFood: categoryString === 'isFood',
      isOthers: categoryString === 'isOthers'
    }
  }
}

module.exports = tools