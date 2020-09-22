const os = require('os')
const defaultGateway = require('default-gateway')
const url = require('url')

const print = function(options) {

	const result = runningAt(options)

	console.log('   Running at:')
	console.log('   - Local:   \x1b[34m%s\x1b[0m', result.local)
	if (result.network) console.log('   - Network: \x1b[34m%s\x1b[0m', result.network)

}

const getNetworkIp = function(name, family) {

	const interfaces = os.networkInterfaces()
	for (let i = -1; i < 8; i++) {
		const interfaceName = name + (i >= 0 ? i : '') // support 'lo' and 'lo0'
		const items = interfaces[interfaceName]
		if (items) {
			for (let j = 0; j < items.length; j++) {
				const item = items[j]
				if (item.family === family) {
					return item.address
				}
			}
		}
	}
	return

}

const getInterfaceName = function() {

	const result = defaultGateway.v4.sync()
	return result && result.interface

}

const runningAt = function(options) {

	const defaultOptions = {
		port: 3000,
		protocol: 'http',
		host: 'localhost',
		pathname: '/',
		family: 'IPv4',
		interface: getInterfaceName(),
		getNetwork: true
	}

	if (typeof options === 'number') {
		options = Object.assign({}, defaultOptions, { port: options })
	} else {
		options = Object.assign({}, defaultOptions, options)
	}

	const formatUrl = (hostname) =>
		url.format({
			protocol: options.protocol,
			hostname: hostname,
			port: options.port,
			pathname: options.pathname
		})

	const networkIp = options.getNetwork ? getNetworkIp(options.interface, options.family) : undefined

	return {
		ip: networkIp,
		local: formatUrl(options.host),
		network: networkIp !== undefined ? formatUrl(networkIp) : undefined
	}

}

runningAt.print = print
module.exports = runningAt