import { base } from "$app/paths";
import { derived, get, writable, type Readable, type Stores } from "svelte/store";

export const DEFAULT_MENU_SLIDE_DURATION: number = 800;
export const WAIT_FOR_MENU_SLIDE = DEFAULT_MENU_SLIDE_DURATION - 200;

export const DEFAULT_COLOR_TRANSITION_DURATION = 600

export const screenWidth = writable(0)
export const mobileMode = derived(
  screenWidth,
  $w => {
    return $w < 600
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
  red: 'red',
} as const;
export type Theme = typeof themes[keyof typeof themes]


export const themeMode = writable<Theme>(themes.light)
export const topBarTransitionQuick = writable(false)

export const showJsButtons = writable(false)
export const topNavOutDuration = writable(DEFAULT_MENU_SLIDE_DURATION)

type Lang = 'EN' | 'ES'
export const selectedLang = writable<Lang>('EN')

export const topNavHeight = writable<number>();
export const lastBurgClickEvent = writable<boolean | 'done'>('done')
export const lastTopShelfEvent = writable<TopShelfState | 'done'>('done')

export type SidebarState = { open: boolean, speed: number }
export const burgopen: Readable<SidebarState> = derived<[typeof lastBurgClickEvent, typeof lastTopShelfEvent], SidebarState>(
  [lastBurgClickEvent, lastTopShelfEvent],
  ([$lastBurgClickEvent, $lastTopShelfEvent], set, update) => {
    if ($lastBurgClickEvent != 'done') {
      update((x) => {
        return { open: !x.open, speed: DEFAULT_MENU_SLIDE_DURATION }
      })
      lastBurgClickEvent.set('done')
      return () => { }
    }

    if (
      $lastTopShelfEvent != 'done' &&
      $lastTopShelfEvent != 'none' &&
      get(mobileMode)
    ) {
      update(() => { return { open: false, speed: 0 } })
      return () => { }
    }
    return () => { }
  }
  ,
  { open: false, speed: 0 }
)

export type TopShelfState = 'settings' | 'contact' | 'none'
export type Topnavselect = { sel: TopShelfState, outSpeed?: number }
export var navSelect: Readable<Topnavselect> =
  derived<
    [typeof lastTopShelfEvent, typeof lastBurgClickEvent, typeof mobileMode],
    Topnavselect>
    ([lastTopShelfEvent, lastBurgClickEvent, mobileMode],
      ([$lastTopShelfEvent, $lastBurgClickEvent, $mobileMode], set, update) => {
        if ($lastTopShelfEvent == 'settings') {
          update((x) => {
            if (x.sel == 'none') {
              console.log('yo')
              return { sel: 'settings', outSpeed: 0 }
            }
            if (x.sel == 'contact') {
              return { sel: 'settings', outSpeed: 0 }
            }
            return { sel: 'none', outSpeed: DEFAULT_MENU_SLIDE_DURATION }
          })
          lastTopShelfEvent.set('done')
          return () => { }
        }

        if ($lastTopShelfEvent == 'contact') {
          update((x) => {
            if (x.sel == 'none') {
              return { sel: 'contact', outSpeed: 0 }
            }
            if (x.sel == 'settings') {
              return { sel: 'contact', outSpeed: 0 }
            }
            return { sel: 'none', outSpeed: DEFAULT_MENU_SLIDE_DURATION }
          })
          lastTopShelfEvent.set('done')
          return () => { }
        }

        if ($lastBurgClickEvent == true && get(mobileMode)) {
          console.log('closing shelf because opened side in mobile')
          set({ sel: 'none', outSpeed: 0 })
          return () => { }
        }
        
        if ($mobileMode && get(burgopen).open) {
          console.log('closing shelf because went mobile while side open')
          set({ sel: 'none', outSpeed: 0 })
          return () => { }
        }

        return () => { }
      }, { sel: 'none', outSpeed: 0 })

export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }
export const barColorState: Readable<TopBarColorState> = derived([atTop, burgopen, navSelect], ([$atTop, $burgopen, $navSelect]) => {
  if ($burgopen.open || $navSelect.sel != 'none') {
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
export const burgIconState: Readable<TopBarIconState> = derived([burgopen, barColorState], ([$burgopen, $bcs]) => {
  if ($burgopen.open) {
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



export const splashMarginTop = derived([navSelect, burgopen, mobileMode], ([$navSelect, $burgopen, $mm]) => {
  let lowered = false
  if ($burgopen.open && !$mm) {
    lowered = true
    return { marg: get(topbarheight) + 20, pad: 15 }
  }
  if ($navSelect.sel != 'none') {
    return { marg: get(topbarheight) + 20, pad: 15 }
  }
  return { marg: 3, pad: 65 };
})

export const modBase = base == "" ? "/" : base


export const toggleTheme = () => {
  // topBarTransitionQuick.set(false)
  // topBarTransitionDelayed.set(false);
  if (get(themeMode) == themes.light) {
    themeMode.set(themes.dark);
  } else {
    themeMode.set(themes.light);
  }
}
