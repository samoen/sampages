import { base } from "$app/paths";
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

type UiEventKey = 'fresh' | 'burgclick' | 'contactClick' | 'settingsClick' | 'reachedTop' | 'menuOut' | 'scrolled' | 'wentMobile'
type UiEvent = { e: UiEventKey }
export const lastEvent = writable<UiEvent>({ e: 'fresh' })


export const burgopen: Readable<boolean> = derived<typeof lastEvent, boolean>(lastEvent, ($le, set, update) => {
  if ($le.e == 'burgclick') {
    update((x) => { return !x })
    return () => { }
  }

  if ($le.e == 'contactClick' || $le.e == 'settingsClick') {
    if (get(mobileMode)) {
      set(false)
      return () => { }
    }
  }
  return () => { }
}, false)


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

export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }
export const barColorState: Readable<TopBarColorState> = derived([atTop, burgopen, navSelect], ([$atTop, $burgopen, $navSelect]) => {
  if ($burgopen || $navSelect.sel != 'none') {
    return { color: 'solid', speed: 'instant' } satisfies TopBarColorState
  }
  if ($atTop) {
    return { color: 'transparent', speed: 'slow' } satisfies TopBarColorState
  }
  return { color: 'blur', speed: 'slow' } satisfies TopBarColorState
}, { color: 'transparent', speed: 'instant' } as TopBarColorState)

export type TopBarIconColor = 'solid' | 'transparent' | 'inset'
export type TransitionSpeed = 'instant' | 'slow'
export type TopBarIconState = { color: TopBarIconColor, transition: TransitionSpeed }
export const burgIconState: Readable<TopBarIconState> = derived([burgopen, barColorState], ([$bo, $bcs]) => {
  if ($bo) {
    return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
  }
  if ($bcs.color == 'blur') {
    return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
  }
  return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
})
export const contactIconState: Readable<TopBarIconState> = derived([navSelect, barColorState], ([$ns, $bcs]) => {
  if ($ns.sel == 'contact') {
    return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
  }
  if ($bcs.color == 'blur') {
    return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
  }
  return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
})
export const settingsIconState: Readable<TopBarIconState> = derived([navSelect, barColorState], ([$ns, $bcs]) => {
  if ($ns.sel == 'settings') {
    return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
  }
  if ($bcs.color == 'blur') {
    return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
  }
  return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
})


type Lang = 'EN' | 'ES'
export const selectedLang = writable<Lang>('EN')

export const lowerSplashTopMargin = derived([navSelect, burgopen, mobileMode], ([$ns, $bo, $mm]) => {
  if ($bo && !$mm) {
    return true
  }
  if ($ns.sel != 'none') {
    return true
  }
  return false
  // return {pad:65, marg:3}
})
export const topNavHeight = writable<number>();
export const mainPadding = derived([topNavHeight, navSelect], ([$tnh, $ns]) => {
  if ($tnh > 0) {
    return $tnh + Math.min($tnh, 10)
  }
  // if($ns.sel != "none"){
  // }
  return 0
}, 0)

export const modBase = base == "" ? "/" : base

mobileMode.subscribe((val) => {
  if (val) {
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
  lastEvent.set({ e: 'burgclick' })
}