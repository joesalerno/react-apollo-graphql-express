const {User, Role} = require("../models")

const userHasRole = async (user, role) => {
  user = await User.findByIdOrName( user.id ? user.id : user )
  if (!user) throw Error ("User not found")
  role = await Role.findByIdOrName( role.id ? role.id : role )
  if (!role) throw Error ("Role not found")
  return (role.userIds.includes(user.id))
}

module.exports = async (user, roles) => {
    if (!Array.isArray(roles)) return userHasRole(user, roles)
    for (var role of roles) if (await userHasRole(user, role)) return true
    return false
}