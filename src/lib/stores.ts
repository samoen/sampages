import { derived, writable } from "svelte/store"

export const screenWidth = writable(0)
export const mobileMode = derived(
  screenWidth,
  $screenWidth => {
    if($screenWidth > 400) {
      return false
    }else{
      return true
    }
  }
)