import { derived, get, writable } from "svelte/store"

export const DEFAULT_MENU_SLIDE_DURATION = 500;
export const WAIT_FOR_MENU_SLIDE = DEFAULT_MENU_SLIDE_DURATION - 200;

export const DEFAULT_COLOR_TRANSITION_DURATION = 600

export const screenWidth = writable(0)
export const mobileMode = derived(
  screenWidth,
  $w => {
    if ($w > 500) {
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
  return $s < 35
})

export const themes = {
  light:'light',
  dark:'dark',  
} as const;
type Theme = typeof themes[keyof typeof themes]


export const themeMode = writable<Theme>(themes.light)
export const burgopen = writable(false)
export const topBarTransitionDelayed = writable(false)
export const topBarTransitionQuick = writable(false)

export const showJsButtons = writable(false)
export const topNavOutDuration = writable(DEFAULT_MENU_SLIDE_DURATION)

type TBarColorState = 'transparent' | 'solid'
export const barColorState = writable<TBarColorState>('transparent')

// type TbarIconState = 'brutal' | 'transparent'
export const barIconColorState = derived<typeof barColorState, TBarColorState>(barColorState,$s=>{
  if($s == "transparent"){
    return 'solid'
  }else{
    return 'transparent'
  }
})

type Topnavselect = 'settings' | 'contact' | 'none'
export const navSelect = writable<Topnavselect>('none')

type Lang = 'EN' | 'ES'
export const selectedLang = writable<Lang>('EN')


mobileMode.subscribe((val) => {
    if (get(mobileMode) && get(burgopen) && get(navSelect) != 'none') {
      navSelect.set('none')
    }
})

wscrollY.subscribe((value) => {
  console.log('scrolled!')
   if(get(atTop) && get(navSelect) == 'none' && !get(burgopen)) {
    barColorState.set('transparent')
  }else if(!get(atTop) || get(navSelect) != 'none' || get(burgopen)){
    barColorState.set('solid')
  }
  topBarTransitionQuick.set(false)
  topBarTransitionDelayed.set(false)
})

export const toggleTheme = () =>{
  topBarTransitionQuick.set(false)
  topBarTransitionDelayed.set(false);
  if (get(themeMode) == themes.light) {
      themeMode.set(themes.dark);
  } else {
      themeMode.set(themes.light);
  }
}

export const toggleSidebar = () => {
  console.log('toggling sidebar')
  let burgnext = !get(burgopen)

  let navnext = get(navSelect)
  if (!get(burgopen) && get(mobileMode) && get(navSelect) != 'none') {
    navnext = 'none'
    topNavOutDuration.set(DEFAULT_MENU_SLIDE_DURATION)
  }

  let topbarcolorstatenext = get(barColorState)
  if (!get(burgopen)) {
    topbarcolorstatenext = 'solid'
  } else if (get(burgopen) && !get(atTop)) {
    topbarcolorstatenext = 'solid'
  } else if (get(burgopen) && get(navSelect) == 'none' && get(atTop)) {
    topbarcolorstatenext = 'transparent'
  }

  if(!get(burgopen)){
    topBarTransitionQuick.set(true)
  }else{
    topBarTransitionQuick.set(false)
  }

  let topTransDelayNext = get(topBarTransitionDelayed)
  if(get(burgopen)){
    topTransDelayNext = true
  }else{
    topTransDelayNext = false
  }

  burgopen.set(burgnext)
  navSelect.set(navnext)
  barColorState.set(topbarcolorstatenext)
  // toptransduration.set(toptrandurNext)
  topBarTransitionDelayed.set(topTransDelayNext)
}
export const toggleSettings = () => {
  let navNext = get(navSelect)
  if(get(navSelect) == 'settings'){
    navNext = 'none'
    topNavOutDuration.set(DEFAULT_MENU_SLIDE_DURATION)
  }else if(get(navSelect) == 'contact'){
    navNext = 'settings'
    topNavOutDuration.set(0)
  }else if(get(navSelect) == 'none'){
    navNext = 'settings'
  }

  let burgnext = get(burgopen)
  if (get(navSelect) == 'none' && get(mobileMode) && get(burgopen)) {
    burgnext = false
  }
  
  let barcolorstatenext = get(barColorState)
  if (get(navSelect) != 'settings') {
    barcolorstatenext = 'solid'
  } else if (get(navSelect) == 'settings' && !get(burgopen) && get(atTop)) {
    barcolorstatenext = 'transparent'
  }

  let ttdelaynext = get(topBarTransitionDelayed)
  let ttdurnext = get(topBarTransitionQuick)
  if(get(navSelect) != 'settings'){
    ttdurnext = true
    ttdelaynext = false
  }else{
    ttdurnext = false
    ttdelaynext = true
  }
 
  burgopen.set(burgnext)
  navSelect.set(navNext)
  barColorState.set(barcolorstatenext)
  topBarTransitionDelayed.set(ttdelaynext)
  topBarTransitionQuick.set(ttdurnext)
}

export const toggleContact = () => {
  let navNext = get(navSelect)
  if(get(navSelect) == 'contact'){
    navNext = 'none'
    topNavOutDuration.set(DEFAULT_MENU_SLIDE_DURATION)
  }else if(get(navSelect) == 'settings'){
    navNext = 'contact'
    topNavOutDuration.set(0)
  }else if(get(navSelect) == 'none'){
    navNext = 'contact'
  }


  let burgnext = get(burgopen)
  if (get(navSelect) == 'none' && get(mobileMode) && get(burgopen)) {
    burgnext = false
  }
  
  let barcolorstatenext = get(barColorState)
  if (get(navSelect) != 'contact') {
    barcolorstatenext = 'solid'
  } else if (get(navSelect) == 'contact' && !get(burgopen) && get(atTop)) {
    barcolorstatenext = 'transparent'
  }
  // if (get(navSelect) == 'none') {
  //   barcolorstatenext = 'solid'
  // } else if (get(navSelect) != 'none' && !get(atTop)) {
  //   barcolorstatenext = 'solid'
  // } else if (get(navSelect) != 'none' && !get(burgopen) && get(atTop)) {
  //   barcolorstatenext = 'transparent'
  // }

  let ttdelaynext = get(topBarTransitionDelayed)
  let ttdurnext = get(topBarTransitionQuick)
  if(get(navSelect) == 'none'){
    ttdurnext = true
    ttdelaynext = false
  }else{
    ttdurnext = false
    ttdelaynext = true
  }
 
  burgopen.set(burgnext)
  navSelect.set(navNext)
  barColorState.set(barcolorstatenext)
  topBarTransitionDelayed.set(ttdelaynext)
  topBarTransitionQuick.set(ttdurnext)
}
