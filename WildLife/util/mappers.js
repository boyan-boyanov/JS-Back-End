function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ mes: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }]
    } else {
        return [{ msg: 'Request err' }];
    }
}

module.exports = mapErrors;