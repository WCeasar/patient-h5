import CpNavBar from '@/components/cp-nav-bar/index.vue'
import CpIcon from '@/components/cp-icon/index.vue'

declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}
