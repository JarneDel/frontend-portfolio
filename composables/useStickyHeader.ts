export default () => {
  const isHidden = ref<Boolean>(false)
  const isSticky = ref<Boolean>(false)
  onMounted(() => {
    let prev = window.scrollY
    window.addEventListener('scroll', () => {
      const current = window.scrollY
      if (current > prev) {
        console.log('current', current, 'hiding header')
        isHidden.value = true
        isSticky.value = true
      } else {
        console.log('current', current, 'showing header')
        isHidden.value = false
        isSticky.value = true
      }
      if (current < 100) {
        console.log('current', current, 'showing header')
        isHidden.value = false
        isSticky.value = false
      }
      prev = current
    })
  })
  onUnmounted(() => window.removeEventListener('scroll', () => {}))
  return { isHidden, isSticky }
}
