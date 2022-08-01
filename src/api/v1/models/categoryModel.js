const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
mongoose.Types.ObjectId.isValid('microsoft123');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    parentId: {
      type: String,
      default: '62e17427d5b99a1f2db150e9',
      ref: 'category'
    }
  },
  { timestamps: true, collection: "categories" }
);
categorySchema.index({name: 'text'});


const _Category = mongoose.model("category", categorySchema)


module.exports = _Category
/*
{
  data: {
    categories: [
     { name: 'category 1',
      slug: 'category-1',
      parent: undefined,
      children: [
        {name: 'category 2'},

      ]},
      { name: 'category 2',
      slug: 'category-2',
      parent: {name: 'category 1'},
      children: []
    }
    ]
  }
}

*/
