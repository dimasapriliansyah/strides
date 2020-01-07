const express = require('express')
const router = express.Router();

const { getTestRoute, flushTenantId } = require('../controllers/cache')

router.get('/test', getTestRoute)

router.get('/flush/:tenantId/:eventType', flushTenantId)

module.exports = router