import { derived, get, writable } from "svelte/store"

export const screenWidth = writable(0)
export const mobileMode = derived(
  screenWidth,
  $w => {
    if ($w > 400) {
      return false
    } else {
      return true
    }
  }
)

export const croute = writable('/')
export const wscrollY = writable(0)
export const atTop = derived(wscrollY,($s)=>{
  return $s < 60
})
export const burgopen = writable(false)
export const topnavopen = writable(false)
export const transparentTopBar = writable(true)
export const nocolortransition = writable(true)
export const topnavshouldslideaway = writable(false)

mobileMode.subscribe((val) => {
    if (get(mobileMode) && get(burgopen) && get(topnavopen)) {
      topnavopen.set(false)
    }
})

wscrollY.subscribe((value) => {
  
  let toptransparentnext: boolean = get(transparentTopBar)
   if(get(atTop) && !get(topnavopen) && !get(burgopen)) {
    toptransparentnext = true
  }else if(!get(atTop) && !get(topnavopen) && !get(burgopen)){
    toptransparentnext = false
  }
  
  let noColTransNext = get(nocolortransition)
  noColTransNext = false
  
  transparentTopBar.set(toptransparentnext)
  nocolortransition.set(noColTransNext)
})

export const toggleSidebar = () => {
  let burgnext = !get(burgopen)

  let navnext = get(topnavopen)
  if (!get(burgopen) && get(mobileMode) && get(topnavopen)) {
    navnext = false
  }

  let toptransparentnext: boolean = get(transparentTopBar)
  if (!get(burgopen)) {
    toptransparentnext = false
  } else if (get(burgopen) && !get(atTop)) {
    toptransparentnext = false
  } else if (get(burgopen) && !get(topnavopen) && get(atTop)) {
    toptransparentnext = true
  }

  burgopen.set(burgnext)
  topnavopen.set(navnext)
  transparentTopBar.set(toptransparentnext)
  nocolortransition.set(false)
}
export const toggleTopNav = () => {
  let navnext = !get(topnavopen)

  let burgnext = get(burgopen)
  if (!get(topnavopen) && get(mobileMode) && get(burgopen)) {
    burgnext = false
  }
  
  let toptransparentnext = get(transparentTopBar)
  if (!get(topnavopen)) {
    toptransparentnext = false
  } else if (get(topnavopen) && !get(atTop)) {
    toptransparentnext = false
  } else if (get(topnavopen) && !get(burgopen) && get(atTop)) {
    toptransparentnext = true
  }

  let noColTransNext = get(nocolortransition)
  noColTransNext = true

  let navslidenext = get(topnavshouldslideaway)
  if(!get(atTop) || get(burgopen)){
    navslidenext = true
  }else{
    navslidenext = false
  }
  
  burgopen.set(burgnext)
  topnavopen.set(navnext)
  transparentTopBar.set(toptransparentnext)
  topnavshouldslideaway.set(navslidenext)
  nocolortransition.set(noColTransNext)
}

// export const transparentTopBar = derived(
//   [wscrollY, topnavopen, burgopen],([$s, $t, $b])=>{
//     return $s < 70 && !$t && !$b
//   }
// )

