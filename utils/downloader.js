export const downloadData = (data, filename) => {
  const a = document.createElement('a')
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
  a.setAttribute('download', filename)
  a.click()
}
