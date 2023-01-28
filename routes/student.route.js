const { ObjectId } = require('bson')
const express = require('express')
const studentSchema =  require('../models/student.model')
const router =  express.Router()

router.post('/', async (req, res) => {
    try {
        const body = req.body
        const student = new studentSchema({
            name: body.name,
            age: body.age,
            mobile: body.mobile
        })

        await student.save()

        res.json({
            success: true,
            message: "Success!"
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
        
        const students = await studentSchema.find()

        res.json({
            success: true,
            body: students
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: "Invalid Inputs"
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        
        const id = req.params.id

        const student = await studentSchema.findById(id)

        res.json({
            success: true,
            body: student
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: "Invalid Inputs"
        })
    }
})

router.get('/mobile/:mobile', async (req, res) => {
    try {
        
        const mobile = req.params.mobile

        const student = await studentSchema.findOne({mobile: mobile})

        res.json({
            success: true,
            body: student
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: "Invalid Inputs"
        })
    }
})

router.put('/', async (req, res) => {
    try {
        
        const body = req.body

        const student = await studentSchema.updateOne({_id: ObjectId(body.id)}, {$set: {age: body.age}})

        res.json({
            success: true,
            message: "Updated successfully!"
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: "Invalid Inputs"
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        
        const id = req.params.id

        const student = await studentSchema.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Deleted successfully!"
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: "Invalid Inputs"
        })
    }
})

module.exports = router