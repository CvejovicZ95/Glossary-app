import mongoose from 'mongoose'

const glossarySchema = new mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Glossary = mongoose.model('Glossary', glossarySchema)

export { Glossary }
