export const getWrColor = (wr: number) => {
  if (wr >= 60) return '#a855f7'
  if (wr >= 54) return '#2dd4bf'
  if (wr >= 49) return '#22c55e'
  if (wr >= 46) return '#eab308'
  return '#ef4444'
}

export const getWn8Color = (wn8: number) => {
  if (wn8 >= 2900) return '#a855f7'
  if (wn8 >= 2000) return '#2dd4bf'
  if (wn8 >= 1600) return '#22c55e'
  if (wn8 >= 900)  return '#eab308'
  return '#ef4444'
}

export const toRoman = (num: number) => {
  const roman: Record<number, string> = { 10: 'X', 9: 'IX', 8: 'VIII', 7: 'VII', 6: 'VI', 5: 'V', 4: 'IV', 3: 'III', 2: 'II', 1: 'I' }
  return roman[num] || num.toString()
}

export const formatNumber = (num: number) => {
  return num.toLocaleString()
}
