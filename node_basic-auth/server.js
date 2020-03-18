const http = require('http')
const auth = require('basic-auth')
const compare = require('tsscmp')

const server = http.createServer(function (req, res) {
    const credentials = auth(req)

    if (!credentials || !check(credentials.name, credentials.pass)) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
    } else {
        res.end('Access granted').end();
    }
})

function check (name, pass) {
    let valid = true

    valid = compare(name, 'admin') && valid
    valid = compare(pass, 'admin') && valid

    return valid
}

server.listen(8000)