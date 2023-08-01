const playgroundUrl = (import.meta as any).env.DEV ? 'http://localhost:5173/play/' : 'https://onu.zyob.top/play/'

function utoa(data: string) {
  return btoa(unescape(encodeURIComponent(data)))
}

const MAIN_FILE_NAME = 'App.vue'

export const usePlayground = (source: string) => {
  const code = decodeURIComponent(source)
  const originCode = {
    [MAIN_FILE_NAME]: code,
  }

  const encoded = utoa(JSON.stringify(originCode))
  const link = `${playgroundUrl}#${encoded}`
  return {
    encoded,
    link,
  }
}
