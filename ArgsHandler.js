const _args = process.argv.slice(2)
const _devMode = _args.indexOf('dev') > -1

const ArgsHandler = {
    isDevMode: _devMode
}

module.exports = ArgsHandler
