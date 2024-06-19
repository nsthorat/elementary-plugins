// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  var __postNativeMessage__: (type: string, data?: any) => void;
  var __receiveStateChange__: (state: string) => void;
  var __receiveError__: (error: string) => void;
}

export {};
