const test = require('ava')
const runningAt = require('../src')

test.serial('only localhost', async (t) => {
	const result = runningAt({ getNetwork: false })
	t.is(result.local, 'http://localhost:3000/')
})

test.serial('specify only port as parameter', async (t) => {
	const result = runningAt(4000)
	t.is(result.local, 'http://localhost:4000/')
})

test.serial('none existing network interface', async (t) => {
	const result = runningAt({ interface: 'noneExistingNetworkInterface' })
	t.is(result.network, undefined)
	t.is(result.ip, undefined)
})

test.serial('custom pathname', async (t) => {
	const result = runningAt({ pathname: '/test' })
	t.is(result.local, 'http://localhost:3000/test')
})

test.serial('ipv6', async (t) => {
	const result = runningAt({ family: 'IPv6' })
	t.is(result.local, 'http://localhost:3000/')
})

test.serial('dont print network', async (t) => {
	runningAt.print({ getNetwork: false })
	t.pass()
})

test.serial('print', async (t) => {
	runningAt.print()
	t.pass()
})