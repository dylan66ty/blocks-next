// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BnButton: typeof import('blocks-next')['BnButton'];
  }
}

export {};
