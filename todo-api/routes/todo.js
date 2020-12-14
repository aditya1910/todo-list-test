var express = require('express');
const router = express.Router();
const mongoUtil = require('../mongoUtil');
const { ObjectId } = require('mongodb')

const collectionName = 'toDo'

router.post('/', function (req, res) {
  const { userId = '', todo = '', parentTaskId = '' } = req.body
  const db = mongoUtil.getDb()
  console.log(userId, todo);
  if (!userId || !todo) {
    console.log('Invalid input');
    return res.status(400).send({ status: false, msg: 'Invalid input' })
  }

  // insert query
  const insertObj = { userId, todo, status: 'ACTIVE' }

  if (parentTaskId) {
    insertObj['parentTaskId'] = ObjectId(parentTaskId)
  }

  db.collection(collectionName).insertOne(insertObj, (error, result) => {
    if (error) {
      return res.status(500).send({ status: false, msg: 'Internal server error' })
    }

    return res.status(201).send({ status: true, _id: result.insertedId })
  })

});

router.get('/:todoId', function (req, res) {
  const { todoId } = req.params
  const db = mongoUtil.getDb()
  try {
    console.log(JSON.stringify({ $or: [{ _id: ObjectId(todoId) }, { parentTaskId: ObjectId(todoId) }] }));
    db.collection(collectionName).find({ $or: [{ _id: ObjectId(todoId) }, { parentTaskId: ObjectId(todoId) }] }).toArray((error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ status: false, msg: 'Internal server error' })
      }
      return res.status(200).send({ status: true, result })

    })
  } catch (error) {
    return res.status(500).send({ status: false, msg: 'Internal server error' })
  }

});


router.delete('/:todoId', function (req, res, next) {
  const { todoId } = req.params
  const db = mongoUtil.getDb()
  try {
    db.collection(collectionName).deleteMany({ $or: [{ _id: ObjectId(todoId) }, { parentTaskId: ObjectId(todoId) }] }, (error, result) => {
      if (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error' })
      }
      return res.status(200).send({ status: true, deleteCount: result.deletedCount })
    })
  } catch (error) {
    return res.status(500).send({ status: false, msg: 'Internal server error' })
  }
});


router.delete('/subTask/:id', function (req, res, next) {
  const todoId = req.params.id
  const db = mongoUtil.getDb()
  try {
    db.collection(collectionName).deleteOne({ parentTaskId: ObjectId(todoId) }, (error, result) => {
      if (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error' })
      }
      return res.status(200).send({ status: true, deleteCount: result.deletedCount })
    })
  } catch (error) {
    return res.status(500).send({ status: false, msg: 'Internal server error' })
  }

});


router.get('/allToDo/userId/:userId', function (req, res, next) {
  const { userId } = req.params
  const db = mongoUtil.getDb()
  const findObj = { userId }
  try {
    db.collection(collectionName).find(findObj).toArray((error, result) => {
      if (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error' })
      }
      return res.status(200).send({ status: true, result })
    })
  } catch (error) {
    return res.status(500).send({ status: false, msg: 'Internal server error' })
  }
});



router.get('/allToDo/userId/:userId/status/:status', function (req, res, next) {
  const { userId, status } = req.params
  const db = mongoUtil.getDb()
  const findObj = { userId }
  if (status) {
    findObj['status'] = status
  }
  try {
    db.collection(collectionName).find(findObj).toArray((error, result) => {
      if (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error' })
      }
      return res.status(200).send({ status: true, result })
    })
  } catch (error) {
    return res.status(500).send({ status: false, msg: 'Internal server error' })
  }
});


router.put('/:todoId/status/:status', function (req, res, next) {
  const { todoId, status = '' } = req.params
  const db = mongoUtil.getDb()
  if (!status) {
    return res.status(400).send({ status: false, sg: 'incorrect input' })
  }
  try {
    db.collection(collectionName).updateOne({ _id: ObjectId(todoId) }, { $set: { status } }, (error, result) => {
      if (error) {
        return res.status(500).send({ status: false, msg: 'Internal server error' })
      }
      return res.status(200).send({ status: true, updateCount: result.modifiedCount })
    })
  } catch (error) {
    return res.status(500).send({ status: false, msg: 'Internal server error' })
  }
});




module.exports = router;
