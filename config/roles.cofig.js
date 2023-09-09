const ROLES_LIST ={
    'SuperAdmin':parseInt(process.env.SUPER_ADMIN_ROLE_ID),
    'Admin':parseInt(process.env.ADMIN_ROLE_ID),
    'User':parseInt(process.env.USER_ROLE_ID),
}


module.exports = ROLES_LIST;