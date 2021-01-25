const express = require('express');
const lecture = require('../models/lecture');
const router = express.Router();
const Lecture = require('../models/lecture');

// Get all lectures;
router.get('/', async (req, res) => {
    try {
        const lectures = await Lecture.find();
        res.json(lectures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create one lecture;
router.post('/', async (req, res) => {
    const { title, description, video } = req.body;
    const lecture = new Lecture({
        title,
        description,
        video
    });

    try {
        const newLecture = await lecture.save();
        res.json(newLecture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update one lecture
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, video } = req.body;
    let update = {};
    if (title) {
        update = { ...update, title }
    };
    if (description) {
        update = { ...update, description }
    };
    if (video) {
        update = { ...update, video }
    };

    Lecture.findOneAndUpdate(id, update, { new: true }).then(lecture => {
        res.json(lecture);
    })
        .catch(error => {
            res.status(400).json({ message: error.message });
        })
});

// Delete one lecture
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Lecture.findById(id).then(lecture => {
        lecture.remove();
        res.json({ message: 'Lecture has been deleted' });
    }).catch(error => {
        res.status(500).json({ message: error.message });
    })
});

module.exports = router;