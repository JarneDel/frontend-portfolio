
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const name = query.name as string

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Map name is required',
    })
  }

  const imageUrl = `https://tomato.gg/maps/${name}.webp`

  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: 'Failed to fetch map image',
      })
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    setHeader(event, 'Content-Type', 'image/webp')
    setHeader(event, 'Cache-Control', 'public, max-age=86400') // Cache for 1 day

    return buffer
  } catch (error) {
    console.error('Map Proxy Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
