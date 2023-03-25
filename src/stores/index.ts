import { createPinia } from 'pinia'
import persisted from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(persisted)

export * from './user'
export default store
