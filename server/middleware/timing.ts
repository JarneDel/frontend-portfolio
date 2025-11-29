export default defineEventHandler(event => {
  const start = performance.now()

  event.node.res.on('finish', () => {
    const duration = performance.now() - start

    const timeStr = `${duration.toFixed(0)}ms`
    let color = '\x1b[36m' // Cyan
    if (duration > 100) color = '\x1b[32m' // Green
    if (duration > 500) color = '\x1b[33m' // Yellow
    if (duration > 1000) color = '\x1b[31m' // Red
    const reset = '\x1b[0m'

    if (event.path.startsWith('/api/')) {
      console.log(
        `${color}[API] ${event.method} ${event.path} took ${timeStr}${reset}`,
      )
    }
  })
})
