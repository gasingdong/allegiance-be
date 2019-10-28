const express = require('express')
const router = express.Router()
const PrivateInvitees = require('../models/private_group_request')
const validation = require('../middleware/dataValidation')
const { groupSchema } = require("../schemas");
const Users = require('../models/users')

router
.route('/group/:group_id/')
.post(async (req, res) => {
try {
    const { group_id }  = req.params;
    const { userId } = req.body
    console.log('group_id', group_id)
    console.log('userId', userId)
    const users = await PrivateInvitees.privateInvitation(userId, group_id);
    res.status(200).json(users);
} catch (err) {
    res.status(500).json({ err })
    console.log('err:',err)
}
})

module.exports = router;