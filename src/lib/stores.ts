import { derived, get, writable } from "svelte/store"

export const DEFAULT_MENU_SLIDE_DURATION = 500;
export const WAIT_FOR_MENU_SLIDE = DEFAULT_MENU_SLIDE_DURATION - 200;

export const DEFAULT_COLOR_TRANSITION_DURATION = 600

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
export const toptransdelay = writable(0)
export const toptransduration = writable(0)
export const showJsButtons = writable(false)
export const topNavOutDuration = writable(DEFAULT_MENU_SLIDE_DURATION)

type TBarColorState = 'transparent' | 'solid'
export const barColorState = writable<TBarColorState>('transparent')

export const barcolor = derived(barColorState,($s =>{
  if($s == "transparent"){
    return 'transparent'
  }else{
    return 'var(--colorsecondary)'
  }
}))
export const barbordercolor = derived(barColorState,($s =>{
  if($s == "transparent"){
    return 'transparent'
  }else{
    return 'var(--colorshadow)'
  }
}))

type TbarIconState = 'brutal' | 'transparent'
export const barIconColorState = derived(barColorState,$s=>{
  if($s == "transparent"){
    return 'brutal'
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
  toptransduration.set(DEFAULT_COLOR_TRANSITION_DURATION)
  toptransdelay.set(0)
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
  navSelect.set(navnext)
  // barcolor.set(toptransparentnext)
  // barbordercolor.set(barbordcolnext)
  barColorState.set(topbarcolorstatenext)
  toptransduration.set(toptrandurNext)
  toptransdelay.set(topTransDelayNext)
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
  
  // let toptransparentnext = get(barcolor)
  // let barbordcolnext = get(barbordercolor)
  let barcolorstatenext = get(barColorState)
  if (get(navSelect) == 'none') {
    barcolorstatenext = 'solid'
    // toptransparentnext = DEFAULT_BAR_COLOR
    // barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(navSelect) != 'none' && !get(atTop)) {
    barcolorstatenext = 'solid'
    // toptransparentnext = DEFAULT_BAR_COLOR
    // barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(navSelect) != 'none' && !get(burgopen) && get(atTop)) {
    barcolorstatenext = 'transparent'
    // toptransparentnext = 'transparent'
    // barbordcolnext = 'transparent'
  }

  let ttdelaynext = get(toptransdelay)
  let ttdurnext = get(toptransduration)
  if(get(navSelect) != 'settings'){
    ttdurnext = 0
    ttdelaynext = 0
  }else{
    ttdurnext = DEFAULT_COLOR_TRANSITION_DURATION
    ttdelaynext = WAIT_FOR_MENU_SLIDE
  }
 
  burgopen.set(burgnext)
  navSelect.set(navNext)
  barColorState.set(barcolorstatenext)
  // barcolor.set(toptransparentnext)
  // barbordercolor.set(barbordcolnext)
  toptransdelay.set(ttdelaynext)
  toptransduration.set(ttdurnext)
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
  
  // let toptransparentnext = get(barcolor)
  // let barbordcolnext = get(barbordercolor)
  let barcolorstatenext = get(barColorState)
  if (get(navSelect) == 'none') {
    barcolorstatenext = 'solid'
    // toptransparentnext = DEFAULT_BAR_COLOR
    // barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(navSelect) != 'none' && !get(atTop)) {
    barcolorstatenext = 'solid'
    // toptransparentnext = DEFAULT_BAR_COLOR
    // barbordcolnext = DEFAULT_BAR_BORDER_COLOR
  } else if (get(navSelect) != 'none' && !get(burgopen) && get(atTop)) {
    barcolorstatenext = 'transparent'
    // toptransparentnext = 'transparent'
    // barbordcolnext = 'transparent'
  }

  let ttdelaynext = get(toptransdelay)
  let ttdurnext = get(toptransduration)
  if(get(navSelect) == 'none'){
    ttdurnext = 0
    ttdelaynext = 0
  }else{
    ttdurnext = DEFAULT_COLOR_TRANSITION_DURATION
    ttdelaynext = WAIT_FOR_MENU_SLIDE
  }
 
  burgopen.set(burgnext)
  navSelect.set(navNext)
  barColorState.set(barcolorstatenext)
  // barcolor.set(toptransparentnext)
  // barbordercolor.set(barbordcolnext)
  toptransdelay.set(ttdelaynext)
  toptransduration.set(ttdurnext)
}
