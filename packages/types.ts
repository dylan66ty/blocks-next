import type { AppContext, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

// vue 的公共 props
export type PublicProps<T, U = {}> = Readonly<T> & U
