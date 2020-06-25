const mongooes = require('mongoose');

const TaskSchema = mongooes.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

module.exports = mongooes.model('tasks', TaskSchema);