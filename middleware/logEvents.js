const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

const logEvents = async (message, fileName) => {
    const date = format(new Date(), 'yyyy-MM-dd')
    const time = format(new Date(), 'HH:mm:ss')

    //logItem is the string that will be appended to the log file
    const logItem = `${date}\t${time}\t${uuid()} ${message}\n`

    try {
        // create logs folder if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        //
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), logItem)
    }
    catch (error) {
        console.error(error)
    }
}

// logger is a middleware function that logs the request method, origin and url
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestsLog.txt');
    next();
}

module.exports = {
    logEvents,
    logger
}

