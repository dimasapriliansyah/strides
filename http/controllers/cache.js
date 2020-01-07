const path = require('path')

exports.getTestRoute = (req, res, next) => {
  res.send("OK")
}

exports.flushTenantId = (req, res, next) => {
  const tenantId = req.params.tenantId
  const eventType = req.params.eventType
  const module = path.join(__dirname, '..', '..', 'socket', 'events', tenantId, eventType)
  delete require.cache[require.resolve(module)]
  res.send("OK")
}