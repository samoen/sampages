import { derived, get, writable } from "svelte/store"



export const screenWidth = writable(0)
export const mobileMode = derived(
  screenWidth,
  $w => {
    if($w > 400) {
      return false
    }else{
      return true
    }
  }
)

export const croute = writable('/')
export const wscrollY = writable(0)
export const burgopen = writable(false)
export const topnavopen = writable(false)
export const transparentTopBar = writable(true)
export const nocolortransition = writable(true)
export const topnavshouldslideaway = writable(false)

mobileMode.subscribe((val)=>{
  if(val){
    if(get(burgopen) && get(topnavopen)){
      topnavopen.set(false)
    }
  }
})

wscrollY.subscribe((value)=>{
  handleTopBarTransparency(false)
})

function handleTopBarTransparency(instant:boolean){
  nocolortransition.set(instant)
  if(get(wscrollY) > 70 || get(topnavopen) || get(burgopen)){
    transparentTopBar.set(false)
  }else{
    transparentTopBar.set(true)
  }
}

function atTopOrMenuOpen(){
  return get(wscrollY) > 70 || get(topnavopen) || get(burgopen)
}


export const openTopNav = ()=>{
  if(get(mobileMode)){
    burgopen.set(false)
  }
  topnavopen.set(true)
}

export const openSidebar = ()=>{
  if(get(mobileMode)){
    topnavopen.set(false)
  }
  burgopen.set(true)
}

export const toggleSidebar = ()=>{
  if(get(burgopen)){
    burgopen.set(false)
  }else{
    openSidebar()
  }
  handleTopBarTransparency(false)
}
export const toggleTopNav = ()=>{
    if(get(topnavopen)){
      topnavopen.set(false)
    }else{
      openTopNav()
    }
  topnavshouldslideaway.set(atTopOrMenuOpen())
  handleTopBarTransparency(true)
}

// export const transparentTopBar = derived(
//   [wscrollY, topnavopen, burgopen],([$s, $t, $b])=>{
//     return $s < 70 && !$t && !$b
//   }
// )

