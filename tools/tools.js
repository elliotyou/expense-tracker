const tools = {
  // generateTodayString() {
  //   const d = new Date()

  //   const month = (d.getMonth() + 1).toString()
  //   const day = (d.getDate()).toString()
  //   const year = d.getFullYear()

  //   const outputMonth = month.length < 2 ? '0' + month : month
  //   const outputDay = day.length < 2 ? '0' + day : day

  //   return [year, outputMonth, outputDay].join('-');
  // },
  convertToDateString(date) {
    const month = (date.getMonth() + 1).toString()
    const day = (date.getDate()).toString()
    const year = date.getFullYear()

    const outputMonth = month.length < 2 ? '0' + month : month
    const outputDay = day.length < 2 ? '0' + day : day

    return [year, outputMonth, outputDay].join('-');
  },
  // generateCategoryObject(categoryString) {
  //   return {
  //     isHome: categoryString === 'isHome',
  //     isTraffic: categoryString === 'isTraffic',
  //     isEntertainment: categoryString === 'isEntertainment',
  //     isFood: categoryString === 'isFood',
  //     isOthers: categoryString === 'isOthers'
  //   }
  // },

  generateOneIconCode(categoryString) {
    let output = ''
    switch (categoryString) {
      case '家居物業':
        output = `<i class="fas fa-home"></i>`
        break
      case '交通出行':
        output = `<i class="fas fa-shuttle-van"></i>`
        break
      case '休閒娛樂':
        output = `<i class="fas fa-grin-beam"></i>`
        break
      case '餐飲食品':
        output = `<i class="fas fa-utensils"></i>`
        break
      case '其他':
        output = `<i class="fas fa-pen"></i>`
        break
    }
    return output
  },

  generateIconCodes(records) {
    records.forEach(record => {
      record['categoryIconCode'] = this.generateOneIconCode(record.category)
    })
  },

  sumAmount(records) {
    let sum = 0
    records.forEach(record => {
      sum += record.amount
    })
    return sum
  }
}

module.exports = tools