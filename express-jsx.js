const fs = require('fs')

function getKeysFromOptions(options) {
    const { settings, _locals, ...objectKeys } = options
    return Object.keys(objectKeys)
}

function getRenderedContent(content, object) {
    const keys = getKeysFromOptions(object)
    let contentString = content.toString();

    for (let key of keys) {
        contentString = contentString.replace(
            new RegExp(`\{${key}\}`, 'gi'),
            object[key]
        )
    }

    return contentString

}

function expressJsx (filepath, options, callback) {
    fs.readFile(filepath, function(err, content) {
        if(err) {
            return callback(err)
        }

        const rendered = getRenderedContent(content, options)

        return callback(err, rendered)
    })
}

module.exports = expressJsx