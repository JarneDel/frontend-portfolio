export default () => {
  const viewportWidth = ref<Number>(0)
  const viewportHeight = ref<Number>(0)

  const update = () => {
    viewportHeight.value = window.innerHeight
    viewportWidth.value = window.innerWidth
  }
  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })
  onUnmounted(() => window.removeEventListener('resize', update))

  return { viewportWidth, viewportHeight }
}
