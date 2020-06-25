const express = require('express');
const router = express.Router();
const Task = require('../modules/Task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.json({ message: error });
    }

})

//SUBMIT POST

router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const saveTask = await task.save();
        res.json(saveTask);
    } catch (error) {
        res.json({ message: error });

    }
})

//SPEDIFIC POST

router.get('/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        res.json(task);
    } catch (error) {
        res.json({ message: error });
    }
})


//DELETE TASK

router.delete('/:taskId', async (req, res) => {
    try {
        const removeTask = await Task.remove({ _id: req.params.taskId });
        res.json(removeTask);
    } catch (error) {
        res.json({ message: error });
    }
})


// UPDATE TASK

router.patch('/:taskId', async (req, res) => {
    try {
        const updateTask = await Task.updateOne(
            { _id: req.params.taskId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        );
        res.json(updateTask);
    } catch (error) {
        res.json({ message: error });
    }
})

module.exports = router;