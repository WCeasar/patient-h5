import 'vue-router'

declare module 'vue-router' {
  // 拓展
  interface RouteMeta {
    title?: string
  }
}
