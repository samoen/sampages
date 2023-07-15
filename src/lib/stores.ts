import { base } from "$app/paths";
import { updated } from "$app/stores";
import { derived, writable, type Readable, get } from "svelte/store";

export const SIDEBAR_IN_DURATION = 450;
export const SIDEBAR_OUT_DURATION = 400;
export const SHELF_IN_DURATION = 700;
export const SHELF_OUT_DURATION = 500;
export const DEFAULT_COLOR_TRANSITION_DURATION = 600
export const themes = {
  light: 'light',
  dark: 'dark',
  red: 'red',
} as const;
export type Theme = typeof themes[keyof typeof themes]
export const themeMode = writable<Theme>(themes.light)
type Lang = 'EN' | 'ES'
export const selectedLang = writable<Lang>('EN')
export const modBase = base == "" ? "/" : base


// ui binded state
export const sidebarwidth = writable(0)
export const topbarheight = writable(0)
export const contactHeight = writable<number>(0);
export const settingsHeight = writable<number>(0);
export const wscrollY = writable(0)
export const atTop = derived(wscrollY, ($s) => {
  return $s < 35
})
export const screenWidth = writable(0)
export const narrow: Readable<NarrowScreenState> = derived<[typeof screenWidth], NarrowScreenState>([screenWidth], ([$sw], set, update) => {
  // console.log('recalc swt: ' + $sw)
  if ($sw < 600) {
    set('narrow')
  } else {
    set('wide')
  }
  return () => { }
}, 'narrow')



// misc
export const showJsButtons = writable(false)
export type NarrowScreenState = 'narrow' | 'wide'
export type MenuState = 'comingIn' | 'goingOut' | 'fullOpen' | 'fullClosed'

export const sideBarState = writable<MenuState>('fullClosed')
export const contactMenuState = writable<MenuState>('fullClosed')
export const settingsMenuState = writable<MenuState>('fullClosed')
export const sideBarSpeed = writable(0)
export const contactMenuSpeed = writable(0)
export const settingsMenuSpeed = writable(0)

export const shelfLeft: Readable<number> = derived([narrow, sideBarState, sidebarwidth],
  ([$narrow, $sideBarState, $sidebarWidth], set, update) => {
    // console.log('recalc shelf left: ')
    // console.log($sideBarState)
    if ($narrow == 'narrow') {
      set(3)
      return () => { }
    }
    set($sidebarWidth + 3)
    return () => { }
  })

export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }
export const topbarColorState: Readable<TopBarColorState> = derived(
  [atTop, sideBarState, contactMenuState, settingsMenuState],
  ([$atTop, $sideBarState, $contactMenuState, $settingsMenuState]) => {
    if ($sideBarState == 'fullOpen' ||
      $sideBarState == 'comingIn' ||
      $sideBarState == 'goingOut' ||
      $contactMenuState == 'fullOpen' ||
      $contactMenuState == 'comingIn' ||
      $contactMenuState == 'goingOut' ||
      $settingsMenuState == 'fullOpen' ||
      $settingsMenuState == 'goingOut' ||
      $settingsMenuState == 'comingIn'
    ) {
      return { color: 'solid', speed: 'instant' } satisfies TopBarColorState
    }
    if ($atTop && $sideBarState == 'fullClosed') {
      return { color: 'transparent', speed: 'slow' } satisfies TopBarColorState
    }
    return { color: 'blur', speed: 'slow' } satisfies TopBarColorState
  }, { color: 'transparent', speed: 'instant' } as TopBarColorState)

export type TopBarIconColor = 'solid' | 'transparent' | 'inset'
export type TransitionSpeed = 'instant' | 'slow'
export type TopBarIconState = { color: TopBarIconColor, transition: TransitionSpeed }
export const burgIconState: Readable<TopBarIconState> =
  derived<[typeof sideBarState, typeof topbarColorState], TopBarIconState>(
    [sideBarState, topbarColorState],
    ([$sideBarState, $topbarColorState], set, update) => {
      if ($sideBarState == 'fullOpen' || $sideBarState == 'comingIn') {
        set({ color: 'inset', transition: 'instant' })
        return () => { }
      }
      if ($topbarColorState.color == 'blur') {
        set({ color: 'solid', transition: 'slow' })
        return () => { }
      }
      set({ color: 'transparent', transition: 'slow' })
      return () => { }
    })

export const contactIconState: Readable<TopBarIconState> =
  derived<[typeof contactMenuState, typeof topbarColorState], TopBarIconState>(
    [contactMenuState, topbarColorState],
    ([$contactMenuState, $topbarColorState], set, update) => {
      if ($contactMenuState == 'fullOpen' || $contactMenuState == 'comingIn') {
        set({ color: 'inset', transition: 'instant' })
        return () => { }
      }
      if ($topbarColorState.color == 'blur') {
        set({ color: 'solid', transition: 'slow' })
        return () => { }
      }
      set({ color: 'transparent', transition: 'slow' })
      return () => { }
    })

export const settingsIconState: Readable<TopBarIconState> =
  derived<[typeof settingsMenuState, typeof topbarColorState], TopBarIconState>(
    [settingsMenuState, topbarColorState],
    ([$settingsMenuState, $topbarColorState], set, update) => {
      if ($settingsMenuState == 'fullOpen' || $settingsMenuState == 'comingIn') {
        set({ color: 'inset', transition: 'instant' })
        return () => { }
      }
      if ($topbarColorState.color == 'blur') {
        set({ color: 'solid', transition: 'slow' })
        return () => { }
      }
      set({ color: 'transparent', transition: 'slow' })
      return () => { }
    })

export const shadowState: Readable<boolean> = derived([sideBarState, narrow], ([$sideBarState, $narrow], set, update) => {
  if ($sideBarState == 'fullOpen' || $sideBarState == 'comingIn') {
    if ($narrow == 'narrow') {
      set(true)
      return () => { }
    }
  }
  set(false)
  return () => { }
})

export const splashMarginTop = derived(
  [contactMenuState, settingsMenuState, sideBarState, narrow, topbarheight],
  ([$contactMenuState, $settingsMenuState, $sideBarState, $narrow, $topbarheight]) => {
    if (($sideBarState == 'fullOpen' || $sideBarState == 'comingIn') && $narrow != 'narrow') {
      return { marg: $topbarheight + 20, pad: 15 }
    }
    if (
      $contactMenuState == 'fullOpen' ||
      $contactMenuState == 'comingIn' ||
      $settingsMenuState == 'fullOpen' ||
      $settingsMenuState == 'comingIn'

    ) {
      return { marg: $topbarheight + 20, pad: 15 }
    }
    return { marg: 3, pad: 65 };
  })
