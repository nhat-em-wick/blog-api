const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
  content: {
    type: Object,
    default: {},
  },
  title: {
    type: String,
    require: [true, 'Title is require']
  },
  categories: {
    type: Array,
    default: [],
    ref: 'category'
  },
  thumbnail: {
    type: String,
    require: [true, 'Thumbnail is require']
  },
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  author: {
    type: String,
    default: 'admin'
  }
}, {timestamps: true, collection: 'posts'})


postSchema.index({title: 'text'});


module.exports = mongoose.model('post', postSchema)