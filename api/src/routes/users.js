const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get users by role
router.get('/:role', (req, res) => {
  const { role } = req.params;
  User.find({ role })
    .then(users => res.json(users))
    .catch(
      error => res.status(500).json({ message: error.message })
    )
})

// Get all Instructors
router.get('/instructors', async (req, res) => {
  try {
    const users = await User.find({ role: "instructor" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
    res.json(students)
  }
  catch (error) {
    res.status(500).json({ message: error })
  }
})


// Get one user
router.get('/:id', (req, res) => {
  const { id } = req.params;

  user = User.findById(id).then(user => {
    if (!user) {
      return res.status(404).json({ message: 'Cannot find user' });
    } else res.json(user);
  })
    .catch(
      error => res.status(500).json({ message: error.message })
    )
});

// Create one user
router.post('/', async (req, res) => {

  const { email, first_name, last_name, password, is_super_admin, role, avatar } = req.body;
  const user = new User({
    email,
    first_name,
    last_name,
    password,
    is_super_admin,
    role,
    avatar
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update one user
router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { email, first_name, last_name, password, is_super_admin, role, avatar } = req.body;
  let update = {}
  if (email) {
    update = { ...update, email }
  }
  if (first_name) {
    update = { ...update, first_name }
  }
  if (last_name) {
    update = { ...update, last_name }
  }
  if (password) {
    update = { ...update, password }
  }
  if (is_super_admin) {
    update = { ...update, is_super_admin }
  }
  if (role) {
    update = { ...update, role }
  }
  if (avatar) {
    update = { ...update, avatar }
  }

  User.findOneAndUpdate(id, update, { new: true }).then(user => {
    res.json(user)
  })
    .catch(error => {
      res.status(400).json({ message: error.message });
    })
});

//Ban one user
router.patch('/ban/:id', (req, res) => {
  const { id } = req.params;
  User.findOneAndUpdate(id, { role: 'banned' }, { new: true }).then(user => {
    res.json(user)
  })
    .catch(error => {
      res.status(400).json({ message: error.message });
    })
});

// Delete one user
router.delete('/:id', (req, res) => {
  const { id } = req.params
  User.findById(id).then(user => {
    user.remove();
    res.json({ message: 'User has been deleted' });
  }).catch(error => {
    res.status(500).json({ message: error.message });
  })
});




module.exports = router;
