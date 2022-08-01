const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  slug: {
    type:String,
    unique: true,
    slug: "title",
  },
  content: {
    type: Object,
    default: {},
  },
  author: {
    type: String,
    default: 'admin'
  }
})

module.exports = mongoose.model('page', pageSchema)