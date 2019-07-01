const ActiveDirectory = require('activedirectory2');

const config = {
    // url: 'ldap://embraport.net',
    // baseDN: 'dc=embraport,dc=net',
    // username: 'speedsoft@embraport.net',
    // password: 'Sp33dqu@18'
    url: 'ldap://ldap.forumsys.com',
    baseDN: 'dc=example,dc=com',
    username: '',
    password: ''
}

module.exports = new ActiveDirectory(config);