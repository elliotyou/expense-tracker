const categories = require('../config/parameters').categories

const isDateString = (dateString) => {
  return /^\d{4}-\d\d-\d\d$/.test(dateString)
}

module.exports = {
  validator: (req, res, next) => {
    const record = req.body
    record._id = req.params.id || ''
    const errors = []

    // console.log('into middleware/validator.js...record', record)

    if (!record.name || !record.date || !record.category || !record.amount) {
      errors.push({ message: '名稱、日期、分類、金額 為必填欄位' })
    }
    if (record.name.trim() === '') {
      errors.push({ message: '請輸入有效的名稱' })
    }
    if (record.category && !categories.includes(record.category)) {
      errors.push({ message: '類別需由既由清單中選擇' })
    }
    if (isNaN(record.amount) || record.amount < 0) {
      errors.push({ message: '金額需為大於0的數字' })
    }
    if (!isDateString(record.date)) {
      errors.push({ message: '日期請由日曆中選取' })
    }

    res.locals.errors = errors
    res.locals.record = record

    // console.log('into middleware/validator.js...errors', errors)
    // console.log('into middleware/validator.js...recordObject', recordObject)
    next()
  }
}