import { getCookie, getRequestURL, sendRedirect, setHeaders } from 'h3'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  console.log('Age gate middleware triggered for URL:', url.pathname)
  
  // Only target our specific path
  if (url.pathname === '/docs/ongeval') {
    
    // 1. Requirement: Not Indexable
    setHeaders(event, {
      'X-Robots-Tag': 'noindex, nofollow',
    })

    // 2. Requirement: Age Check
    const isVerified = getCookie(event, 'age-verified')
    if (isVerified !== 'true') {
      return sendRedirect(event, '/health', 302)
    }

    // 3. Action: Redirect to Notion
    const NOTION_URL = 'https://wearenumble.notion.site/Ongeval-2eb0d86c56b08088af49c89767259797'
    return sendRedirect(event, NOTION_URL, 302)
  }
})