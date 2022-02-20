const success = (res, data) => {
    res.json({data: data})
}

const error = (res, error, status) => {
    res.status(status).json({data: {error: error}})
}

module.exports = {
    success,
    error
}