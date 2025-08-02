export default () => {
  const isHidden = ref<Boolean>(false)
  const isSticky = ref<Boolean>(false)
  onMounted(() => {
    let prev = window.scrollY
    window.addEventListener('scroll', () => {
      const current = window.scrollY
      if (current > prev) {
        isHidden.value = true
        isSticky.value = true
      } else {
        isHidden.value = false
        isSticky.value = true
      }
      if (current < 100) {
        isHidden.value = false
        isSticky.value = false
      }
      prev = current
    })
  })
  onUnmounted(() => window.removeEventListener('scroll', () => {}))
  return { isHidden, isSticky }
}
