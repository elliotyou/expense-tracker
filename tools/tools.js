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
      case 'isHome':
        output = `<i class="fas fa-home"></i>`
        break
      case 'isTraffic':
        output = `<i class="fas fa-bus"></i>`
        break
      case 'isEntertainment':
        output = `<i class="fas fa-gamepad"></i>`
        break
      case 'isFood':
        output = `<i class="fas fa-hamburger"></i>`
        break
      case 'isOthers':
        output = `<i class="fas fa-file-word"></i>`
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