import { derived, get, writable } from "svelte/store"

export const MENU_SLIDE_DURATION = 500;
export const WAIT_FOR_MENU_SLIDE = MENU_SLIDE_DURATION - 200;
export const DEFAULT_BAR_COLOR = 'var(--colorprimary)'
export const DEFAULT_BAR_BORDER_COLOR = 'var(--colorshadow)'
export const DEFAULT_COLOR_TRANSITION_DURATION = 600
export const TOP_BAR_HEIGHT = '3rem'

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

// export const croute = writable('/')
export const sidebarwidth = writable(0)
export const topbarheight = writable(0)
export const wscrollY = writable(0)
export const atTop = derived(wscrollY,($s)=>{
  return $s < 60
})

export const themes = {
  light:'light',
  dark:'dark',  
} as const;
type Theme = typeof themes[keyof typeof themes]


export const themeMode = writable<Theme>(themes.light)
export const burgopen = writable(false)
export const topnavopen = writable(false)
export const topnavshouldslideaway = writable(false)
export const toptransdelay = writable(0)
export const toptransduration = writable(0)
export const barcolor = writable(DEFAULT_BAR_COLOR);
export const barbordercolor = writable(DEFAULT_BAR_BORDER_COLOR);
export const showShadow = writable(false)


mobileMode.subscribe((val) => {
    if (get(mobileMode) && get(burgopen) && get(topnavopen)) {
      topnavopen.set(false)
    }
})

wscrollY.subscribe((value) => {
  console.log('scrolled!')
  let toptransparentnext = get(barcolor)
  let barbordcolnext = get(barbordercolor)
   if(get(atTop) && !get(topnavopen) && !get(burgopen)) {
    toptransparentnext = 'transparent'
    barbordcolnext = 'transparent'
  }else if(!get(atTop) && !get(topnavopen) && !get(burgopen)){
    toptransparentnext = DEFAULT_BAR_COLOR
    barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  }
  
  // let noColTransNext = get(toptransduration)
  // noColTransNext = 0
  barcolor.set(toptransparentnext)
  barbordercolor.set(barbordcolnext)
  // transparentTopBar.set(toptransparentnext)
  toptransduration.set(499)
  toptransdelay.set(0)
  // nocolortransition.set(noColTransNext)
})

export const toggleTheme = () =>{
  toptransduration.set(DEFAULT_COLOR_TRANSITION_DURATION);
  toptransdelay.set(0);
  if (get(themeMode) == themes.light) {
      themeMode.set(themes.dark);
  } else {
      themeMode.set(themes.light);
  }
}

export const toggleSidebar = () => {
  console.log('toggling sidebar')
  let burgnext = !get(burgopen)

  let navnext = get(topnavopen)
  if (!get(burgopen) && get(mobileMode) && get(topnavopen)) {
    navnext = false
  }

  let toptransparentnext = get(barcolor)
  let barbordcolnext = get(barbordercolor)
  if (!get(burgopen)) {
    toptransparentnext = DEFAULT_BAR_COLOR
    barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(burgopen) && !get(atTop)) {
    toptransparentnext = DEFAULT_BAR_COLOR
    barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(burgopen) && !get(topnavopen) && get(atTop)) {
    toptransparentnext = 'transparent'
    barbordcolnext = 'transparent'
  }

  let toptrandurNext = get(toptransduration)
  if(!get(burgopen)){
    toptrandurNext = 0
  }else{
    toptrandurNext = DEFAULT_COLOR_TRANSITION_DURATION
  }

  let topTransDelayNext = get(toptransdelay)
  if(get(burgopen)){
    topTransDelayNext = WAIT_FOR_MENU_SLIDE
  }else{
    topTransDelayNext = 0
  }

  burgopen.set(burgnext)
  topnavopen.set(navnext)
  barcolor.set(toptransparentnext)
  barbordercolor.set(barbordcolnext)
  toptransduration.set(toptrandurNext)
  toptransdelay.set(topTransDelayNext)
}
export const toggleTopNav = () => {
  let navnext = !get(topnavopen)

  let burgnext = get(burgopen)
  if (!get(topnavopen) && get(mobileMode) && get(burgopen)) {
    burgnext = false
  }
  
  let toptransparentnext = get(barcolor)
  let barbordcolnext = get(barbordercolor)
  if (!get(topnavopen)) {
    toptransparentnext = DEFAULT_BAR_COLOR
    barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(topnavopen) && !get(atTop)) {
    toptransparentnext = DEFAULT_BAR_COLOR
    barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(topnavopen) && !get(burgopen) && get(atTop)) {
    toptransparentnext = 'transparent'
    barbordcolnext = 'transparent'
  }

  let ttdelaynext = get(toptransdelay)
  let ttdurnext = get(toptransduration)
  if(!get(topnavopen)){
    ttdurnext = 0
    ttdelaynext = 0
  }else{
    ttdurnext = DEFAULT_COLOR_TRANSITION_DURATION
    ttdelaynext = WAIT_FOR_MENU_SLIDE
  }
 
  burgopen.set(burgnext)
  topnavopen.set(navnext)
  barcolor.set(toptransparentnext)
  barbordercolor.set(barbordcolnext)
  toptransdelay.set(ttdelaynext)
  toptransduration.set(ttdurnext)
}
