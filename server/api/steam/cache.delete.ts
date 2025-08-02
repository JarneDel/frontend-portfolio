export default defineEventHandler(async (event) => {
  try {
    await useStorage('cache').removeItem('steam-data')
    
    return {
      success: true,
      message: 'Steam cache cleared successfully'
    }
  } catch (error) {
    console.error('Cache clear error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to clear Steam cache'
    })
  }
})
