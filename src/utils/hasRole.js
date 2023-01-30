const hasRole = (userRole, roles) => {
  if (userRole === null) {
    return false
  } else {
    return roles.some(role => userRole.includes(role))
  }
}

export default hasRole
