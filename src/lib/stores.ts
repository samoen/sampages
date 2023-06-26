import { derived, get, writable, type Readable } from "svelte/store"

export const DEFAULT_MENU_SLIDE_DURATION = 800;
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
export const atTop = derived(wscrollY, ($s) => {
  return $s < 35
})

export const themes = {
  light: 'light',
  dark: 'dark',
} as const;
type Theme = typeof themes[keyof typeof themes]


export const themeMode = writable<Theme>(themes.light)
// export const topBarTransitionDelayed = writable(false)
export const topBarTransitionQuick = writable(false)

export const showJsButtons = writable(false)
export const topNavOutDuration = writable(DEFAULT_MENU_SLIDE_DURATION)

type UiEventKey = 'fresh' | 'layoutMounted' | 'burgclick' | 'contactClick' | 'settingsClick' | 'reachedTop' | 'menuOut' | 'scrolled' | 'wentMobile'
type UiEvent = { e: UiEventKey }
export const lastEvent = writable<UiEvent>({ e: 'fresh' })

export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }

export const barColorState: Readable<TopBarColorState> = derived([lastEvent], ([$le]) => {

  if (get(atTop) && noMenusOpen() && $le.e == 'scrolled') {
    return { color: 'transparent', speed: 'slow' } satisfies TopBarColorState
  }
  if (get(atTop) && noMenusOpen() && $le.e == 'menuOut') {
    return { color: 'transparent', speed: 'slow' } satisfies TopBarColorState
  }
  if (!get(atTop) && noMenusOpen() && $le.e == 'menuOut') {
    return { color: 'blur', speed: 'slow' } satisfies TopBarColorState
  }
  if ($le.e == 'burgclick' || $le.e == 'settingsClick' || $le.e == 'contactClick') {
    return { color: 'solid', speed: 'instant' } satisfies TopBarColorState
  }

  if (!get(atTop) && noMenusOpen() && $le.e == 'scrolled') {
    return { color: 'blur', speed: 'slow' } satisfies TopBarColorState
  }
  if (!noMenusOpen()) {
    return { color: 'solid', speed: 'instant' } satisfies TopBarColorState
  }
  return get(barColorState)
})


export const burgopen: Readable<boolean> = derived<typeof lastEvent, boolean>(lastEvent, ($le) => {
  if ($le.e == 'layoutMounted') {
    return false
  }
  if ($le.e == 'burgclick' && !get(burgopen)) {
    return true
  }
  if ($le.e == 'burgclick' && get(burgopen)) {
    return false
  }
  if (get(mobileMode)) {
    if ($le.e == 'contactClick' || $le.e == 'settingsClick') {
      return false
    }
  }
  return get(burgopen)
})

function noMenusOpen() {
  return !get(burgopen) && get(navSelect).sel == 'none'
}

export type TopBarIconColor = 'solid' | 'transparent' | 'inset'
export type TransitionSpeed = 'instant' | 'slow'
export type TopBarIconState = { color: TopBarIconColor, transition: TransitionSpeed }

type Topnavselect = { sel: 'settings' | 'contact' | 'none', outSpeed: number }
export const navSelect: Readable<Topnavselect> = derived([lastEvent, mobileMode, burgopen], ([$le, $mm, $bo]) => {
  if ($mm && $bo) {
    return { sel: 'none', outSpeed: DEFAULT_MENU_SLIDE_DURATION } as Topnavselect
  }

  if ($le.e == 'settingsClick') {
    if (get(navSelect).sel == 'none') {
      return { sel: 'settings', outSpeed: 0 } as Topnavselect
    } else if (get(navSelect).sel == 'contact') {
      return { sel: 'settings', outSpeed: 0 } as Topnavselect
    } else if (get(navSelect).sel == 'settings') {
      return { sel: 'none', outSpeed: DEFAULT_MENU_SLIDE_DURATION } as Topnavselect
    }
  }

  if ($le.e == 'contactClick') {
    if (get(navSelect).sel == 'none') {
      return { sel: 'contact', outSpeed: DEFAULT_MENU_SLIDE_DURATION } as Topnavselect
    } else if (get(navSelect).sel == 'settings') {
      return { sel: 'contact', outSpeed: 0 } as Topnavselect
    } else if (get(navSelect).sel == 'contact') {
      return { sel: 'none', outSpeed: DEFAULT_MENU_SLIDE_DURATION } as Topnavselect
    }
  }

  if (get(navSelect)) {
    return get(navSelect)
  } else {
    return { sel: 'none', outSpeed: DEFAULT_MENU_SLIDE_DURATION } as Topnavselect
  }
})
function computeTopBarIconState(ev: UiEventKey) {
  if (ev == 'scrolled') {
    if (!get(atTop) && noMenusOpen()) {
      return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
    }
    if (get(atTop) && noMenusOpen()) {
      return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
    }
  }
  if (ev == 'menuOut') {
    if (!get(atTop) && noMenusOpen()) {
      return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
    }
    if (get(atTop) && noMenusOpen()) {
      return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
    }
  }
  return null
}

export const burgIconState: Readable<TopBarIconState> = derived([lastEvent, burgopen, barColorState], ([$le, $bo, $bcs]) => {
  let next = computeTopBarIconState($le.e);
  if (next) {
    return next
  }
  if ($bo) {
    return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
  }
  if ($le.e == 'burgclick') {
    if (!$bo) {
      return { color: 'transparent', transition: 'instant' } satisfies TopBarIconState
    }
  }
  if ($bcs.color == 'solid') {
    return { color: 'transparent', transition: 'instant' } satisfies TopBarIconState
  }
  return get(burgIconState)
})
export const contactIconState: Readable<TopBarIconState> = derived([lastEvent, navSelect, barColorState], ([$le, $ns, $bcs]) => {
  let next = computeTopBarIconState($le.e);
  if (next) {
    return next
  }
  if ($ns.sel == 'contact') {
    return { color: 'inset', transition: 'instant' } as TopBarIconState
  }
  if ($bcs.color == 'solid') {
    return { color: 'transparent', transition: 'instant' } as TopBarIconState
  }
  return get(contactIconState)
})
export const settingsIconState: Readable<TopBarIconState> = derived([lastEvent, navSelect, barColorState], ([$le, $ns, $bcs]) => {
  let next = computeTopBarIconState($le.e);
  if (next) {
    return next
  }
  if ($ns.sel == 'settings') {
    return { color: 'inset', transition: 'instant' } as TopBarIconState
  }
  if ($bcs.color == 'solid') {
    return { color: 'transparent', transition: 'instant' } as TopBarIconState
  }
  return get(settingsIconState)
})


type Lang = 'EN' | 'ES'
export const selectedLang = writable<Lang>('EN')

export const splashTopMargin = derived([navSelect, burgopen, mobileMode],([$ns, $bo, $mm])=>{
  if($bo || $ns.sel != 'none'){
      if(!$mm){
          return true
      }
  }
  return false
})

mobileMode.subscribe((val) => {
  if(val){
    lastEvent.set({ e: 'wentMobile' })
  }
})

wscrollY.subscribe((value) => {
  lastEvent.set({ e: 'scrolled' })
})

export const toggleTheme = () => {
  topBarTransitionQuick.set(false)
  // topBarTransitionDelayed.set(false);
  if (get(themeMode) == themes.light) {
    themeMode.set(themes.dark);
  } else {
    themeMode.set(themes.light);
  }
}

export const toggleSidebar = () => {
  console.log('toggling sidebar')

  lastEvent.set({ e: 'burgclick' })
}