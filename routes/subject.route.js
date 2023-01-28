const { ObjectId } = require('bson')
const express = require('express')
const subjectSchema = require('../models/subject.model')
const router =  express.Router()

router.post('/', async (req, res) => {
    try {

        const body = req.body
        const subject = new subjectSchema({
            name: body.name,
            lessons: body.lessons
        })

        await subject.save()

        res.json({
            succss: true,
            message: "Subject saved successfully!"
        })

    } catch(e) {
        res.status(400).json({
            success: false,
            message: "Invalid Inputs"
        })
    }
})

router.get('/', async (req, res) => {
    try {
        
        const results = await subjectSchema.find()

        res.json({
            succss: true,
            body: results
        })

    } catch(e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

module.exports = router