const express = require('express');
const router = express.Router();
const Recording = require('../models/Recording');
const { query } = require('express');


//Return all matching recordings
router.get('/', async (req, res) => {
    const pageLimit = (!req.query.limit) ? 10 : parseInt(req.query.limit)
    currentPage = (!req.query.page) ? 1 : parseInt(req.query.page)


    try {
        const query = (req.query)
        delete query.limit;
        delete query.page;
        const totalRecords = await Recording.count(query)
        console.log(totalRecords)
        const totalPages = Math.ceil(totalRecords / pageLimit)
        currentPage = currentPage > totalPages ? totalPages : currentPage;
        console.log(currentPage)
        const recordings = await Recording.find(query)
            .limit(pageLimit)
            .skip(pageLimit * (currentPage - 1));
        console.log(typeof(recordings))
        res.json({
            recordings: recordings,
            totalRecords: totalRecords,
            recordsPerPage: pageLimit,
            page: currentPage,
            totalPages: totalPages,
        },
        )
    } catch (error) {
        if(error.codeName=='BadValue' && error.code==2){
            res.json({message: 'No matching results were found'})
        }
        res.json({ message: error })
    }
});

//Add a New recording
router.post('/', async (req, res) => {
    const recording = new Recording({
        name: req.body.name,
        toNo: req.body.toNo,
        fromNo: req.body.fromNo,
        duration: req.body.duration,
        userId: req.body.userId,
        timeStamp: req.body.timeStamp,

    })
    try {
        const savedPost = await recording.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err })
    }
});

//DELETE a Recording
router.delete('/:id', async (req,res) => {
    try {
        const removedRecording = await Recording.remove({_id: req.params.id});

        res.json(removedRecording);
    } catch (error) {
        res.json({ message: error })
    }
   
});

//Update a recording
router.patch('/:id', async (req,res)=>{
    try {
       const updatedRecording = await Recording.updateOne(
            {_id: req.params.id}, 
            {$set: {robocallIndicator: req.body.robocallIndicator}
       });
       res.json(updatedRecording);
        
    } catch (error) {
        
    }
})

module.exports = router;