import { base } from "$app/paths";
import { derived, get, writable, type Readable } from "svelte/store";

export const DEFAULT_MENU_SLIDE_DURATION: number = 800;
export const WAIT_FOR_MENU_SLIDE = DEFAULT_MENU_SLIDE_DURATION - 200;
export const DEFAULT_COLOR_TRANSITION_DURATION = 600

export const screenWidth = writable(0)

export type MobileEvent = { type: 'wentMobile' | 'leftMobile', sidebar: SidebarState } | { type: 'done' }
export const mobileEvent = writable<MobileEvent>({ type: 'wentMobile', sidebar: { open: false, speed: 0 } })
mobileEvent.subscribe(val => {
  if (val.type != 'done') {
    console.log('mobile event done')
    mobileEvent.set({ type: 'done' })
  }
})

export const mobileMode = derived(
  [mobileEvent],
  ([$mobileEvent], set, update) => {
    if ($mobileEvent.type == 'wentMobile') {
      console.log('setting mobile mode true because mobileEvent wentMobile')
      set(true)
    } else if ($mobileEvent.type == 'leftMobile') {
      console.log('setting mobile mode false because mobileEvent leftMobile')
      set(false)
    }
    return () => { }
  },
  true
)

// export const croute = writable('/')
export const sidebarwidth = writable(0)
export const topbarheight = writable(0)
export const wscrollY = writable(0)
export const atTop = derived(wscrollY, ($s) => {
  return $s < 35
})
export type ScrollEvent = { type: 'scrolled', mobileMode: boolean, sidebar: SidebarState } | 'done'
export const scrollEvent = writable<ScrollEvent>('done')
scrollEvent.subscribe((val) => {
  if (val != 'done') {
    // console.log('scroll event done')
    scrollEvent.set('done')
  }
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
export type BurgerClickEvent = { type: 'open' | 'close', mobileMode: boolean } | 'done'
export const lastBurgClickEvent = writable<BurgerClickEvent>('done')
export const lastTopShelfEvent = writable<{ type: 'opensettings' | 'opencontact' | 'close', old: Topnavselect, mobileMode: boolean } | 'done'>('done')
lastTopShelfEvent.subscribe(val => {
  if (val != 'done') {
    lastTopShelfEvent.set('done')
  }
})

export type SidebarState = { open: boolean, speed: number }
export const sideBarState: Readable<SidebarState> =
  derived<
    [typeof lastBurgClickEvent,
      typeof lastTopShelfEvent,
      typeof scrollEvent,
    ],
    SidebarState
  >(
    [lastBurgClickEvent, lastTopShelfEvent, scrollEvent],
    ([$lastBurgClickEvent, $lastTopShelfEvent, $scrollEvent], set, update) => {
      if ($lastBurgClickEvent != 'done') {
        update((x) => {
          if (x.open) {
            console.log('closing sidebar because burger clicked while sidebar open')
            return { open: false, speed: DEFAULT_MENU_SLIDE_DURATION }
          } else {
            console.log('opening sidebar because burger clicked while sidebar closed')
            return { open: true, speed: DEFAULT_MENU_SLIDE_DURATION }
          }
        })
        lastBurgClickEvent.set('done')
        return () => { }
      }

      if (
        $lastTopShelfEvent != 'done' &&
        $lastTopShelfEvent.type != 'close' &&
        $lastTopShelfEvent.mobileMode
      ) {
        console.log('closing sidebar because top shelf opened in mobile')
        update(() => { return { open: false, speed: 0 } })
        return () => { }
      }
      // if ($scrollEvent != 'done') {
        // if ($scrollEvent.type == 'scrolled' && get(sideBarState).open && $scrollEvent.mobileMode) {
          // console.log('closing sidebar because scrolled while mobile')
          // set({ open: false, speed: DEFAULT_MENU_SLIDE_DURATION })
        // }
      // }
      return () => { }
    }
    ,
    { open: false, speed: 0 }
  )

export type TopShelfState = 'settings' | 'contact' | 'none'
export type Topnavselect = { sel: TopShelfState, outSpeed?: number }
export var navSelect: Readable<Topnavselect> =
  derived<
    [typeof lastTopShelfEvent, typeof lastBurgClickEvent, typeof mobileEvent],
    Topnavselect>
    ([lastTopShelfEvent, lastBurgClickEvent, mobileEvent],
      ([$lastTopShelfEvent, $lastBurgClickEvent, $mobileEvent], set, update) => {
        if ($lastTopShelfEvent != 'done') {
          if ($lastTopShelfEvent.type == 'opensettings') {
            set({ sel: 'settings', outSpeed: 0 })
          } else if ($lastTopShelfEvent.type == 'opencontact') {
            set({ sel: 'contact', outSpeed: 0 })
          } else if ($lastTopShelfEvent.type == 'close') {
            set({ sel: 'none', outSpeed: DEFAULT_MENU_SLIDE_DURATION })
          }

          return () => { }

        }

        if ($lastBurgClickEvent != 'done') {
          if ($lastBurgClickEvent.type == 'open' && $lastBurgClickEvent.mobileMode) {
            console.log('closing shelf because opened side in mobile')
            set({ sel: 'none', outSpeed: 0 })
            return () => { }
          }

        }

        if ($mobileEvent.type == 'wentMobile' && $mobileEvent.sidebar.open) {
          console.log('closing shelf because went mobile while side open')
          set({ sel: 'none', outSpeed: 0 })
          return () => { }
        }

        return () => { }
      }, { sel: 'none', outSpeed: 0 })

export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }
export const barColorState: Readable<TopBarColorState> = derived(
  [atTop, sideBarState, navSelect],
  ([$atTop, $sideBarState, $navSelect]) => {
    if ($sideBarState.open || $navSelect.sel != 'none') {
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
export const burgIconState: Readable<TopBarIconState> =
  derived(
    [sideBarState, barColorState],
    ([$sideBarState, $bcs]) => {
      if ($sideBarState.open) {
        return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
      }
      if ($bcs.color == 'blur') {
        return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
      }
      return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
    })
export const contactIconState: Readable<TopBarIconState> =
  derived([navSelect, barColorState], ([$ns, $bcs]) => {
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

export const shadowState: Readable<boolean> =
  derived(
    [mobileEvent, lastBurgClickEvent, scrollEvent, lastTopShelfEvent],
    ([$mobileEvent, $lastBurgClickEvent, $scrollEvent, $lastTopShelfEvent], set
    ) => {
      if ($lastBurgClickEvent != 'done') {
        if ($lastBurgClickEvent.type == 'open' && $lastBurgClickEvent.mobileMode) {
          console.log('showing shadow because sidebar opened in mobile')
          set(true)
          return () => { }
        }
        if ($lastBurgClickEvent.type == 'close' && $lastBurgClickEvent.mobileMode) {
          console.log('removing shadow because sidebar closed in mobile')
          set(false)
          return () => { }
        }
      }
      if ($lastTopShelfEvent != 'done') {
        if ($lastTopShelfEvent.type == 'opencontact' || $lastTopShelfEvent.type == 'opensettings') {
          if ($lastTopShelfEvent.mobileMode) {
            console.log('removing shadow because opened top shelf while mobile')
            set(false)
          }
        }
      }
      // if ($scrollEvent != 'done') {
      //   if ($scrollEvent.type == 'scrolled' && $scrollEvent.mobileMode && $scrollEvent.sidebar.open) {
      //     console.log('removing shadow because scrolled while sidebar open in mobile')
      //     set(false)
      //     return () => { }
      //   }
      // }
      if ($mobileEvent.type == 'wentMobile' && $mobileEvent.sidebar?.open) {
        console.log('showing shadow because went mobile while sidebar open')
        set(true)
        return () => { }
      }
      if ($mobileEvent.type == 'leftMobile' && $mobileEvent.sidebar?.open) {
        console.log('removing shadow because left mobile while sidebar open')
        set(false)
        return () => { }
      }
      return () => { }
    }, false)

export const splashMarginTop = derived(
  [navSelect, sideBarState, mobileMode],
  ([$navSelect, $sideBarState, $mobileMode]) => {
    if ($sideBarState.open && !$mobileMode) {
      return { marg: get(topbarheight) + 20, pad: 15 }
    }
    if ($navSelect.sel != 'none') {
      return { marg: get(topbarheight) + 20, pad: 15 }
    }
    return { marg: 3, pad: 65 };
  })

export const modBase = base == "" ? "/" : base