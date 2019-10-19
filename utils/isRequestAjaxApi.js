function isRequestAjaxApi (req) {
    return !req.accepts("html") || req.xhr
}

module.exports = isRequestAjaxApi