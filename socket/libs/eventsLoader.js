const path = require('path')

module.exports = (tenantId, eventType) => {
  if (eventType == 'tenant') {
    const tenantModulePath = path.join(__dirname, '..', 'events', tenantId, 'Tenant')
    const tenantModule = require(tenantModulePath)
    return tenantModule
  } else if (eventType == 'role') {
    const roleModulePath = path.join(__dirname, '..', 'events', tenantId, 'Role')
    return require(roleModulePath)
  } else if (eventType == 'personal') {
    const personalModulePath = path.join(__dirname, '..', 'events', tenantId, 'Personal')
    return require(personalModulePath)
  }
} 