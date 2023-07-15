import { base } from "$app/paths";
import { updated } from "$app/stores";
import { derived, writable, type Readable, get } from "svelte/store";

const SIDEBAR_IN_DURATION = 450;
const SIDEBAR_OUT_DURATION = 400;
export const SHELF_IN_DURATION = 700;
const SHELF_OUT_DURATION = 500;
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

// events
export type UiEventKind =
  'resize' |
  'burgerClicked' |
  'contactClicked' |
  'settingsClicked' |
  'sidebarAnimationFinish' |
  'settingsAnimationFinish' |
  'contactAnimationFinish'

export type UIEvent = {
  kind: UiEventKind,
  narrow: NarrowScreenState,
  // topMenuState.contact: topMenuState.contact,
  topMenuState: TopMenuState,
  sidebarState: SidebarState,
  screenWidth: number,
} | { kind: 'start' }

export const uIEvent = writable<UIEvent>({ kind: 'start' })
// uIEvent.subscribe(val => {
//   if (val.kind != 'start') {
//     uIEvent.set({ kind: 'start' })
//   }
// })

// Event-derived states. These can't simply derive from other state
// because they need to know what happened to arrive at the current state
export type NarrowScreenState = 'narrow' | 'wide'
// export const narrowScreenState: Readable<NarrowScreenState> = derived<[typeof uIEvent], NarrowScreenState>(
//   [uIEvent],
//   ([$uIEvent], set, update) => {
//     if ($uIEvent.kind == 'resize') {
//       if ($uIEvent.screenWidth < 600 && $uIEvent.narrowScreenState == 'wide') {
//         console.log('setting mobile mode true because uIEvent wentMobile')
//         set('narrow')
//       } else if ($uIEvent.screenWidth >= 600 && $uIEvent.narrowScreenState == 'narrow') {
//         console.log('setting mobile mode false because uIEvent leftMobile')
//         set('wide')
//       }
//     }
//     return () => { }
//   },
//   'narrow'
// )

export type MenuState = 'comingIn' | 'goingOut' | 'fullOpen' | 'fullClosed'
export type SidebarState = { state: MenuState, speed: number }
export const sideBarState: Readable<SidebarState> = derived<[typeof uIEvent], SidebarState>(
  [uIEvent],
  ([$uIEvent], set, update) => {
    // if ($uIEvent.kind == 'start') {
    //   return () => { }
    // }
    // console.log('recalc sidebar state:')
    // console.log($uIEvent)
    if ($uIEvent.kind == 'sidebarAnimationFinish') {
      set({ state: $uIEvent.sidebarState.state == "comingIn" ? 'fullOpen' : 'fullClosed', speed: 0 })
    } else if ($uIEvent.kind == 'burgerClicked') {
      if (
        ($uIEvent.topMenuState.settings.menu == 'fullOpen' ||
          $uIEvent.topMenuState.settings.menu == 'fullClosed') &&
        ($uIEvent.topMenuState.contact.menu == 'fullOpen' ||
          $uIEvent.topMenuState.contact.menu == 'fullClosed')
      ) {
        if ($uIEvent.sidebarState.state == 'fullOpen') {
          console.log('closing sidebar because burger clicked while sidebar open')
          set({ state: 'goingOut', speed: SIDEBAR_OUT_DURATION })
        }
        if ($uIEvent.sidebarState.state == 'fullClosed') {
          console.log('opening sidebar because burger clicked while sidebar closed')
          set({ state: 'comingIn', speed: SIDEBAR_IN_DURATION })
        }
      }
    } else if ($uIEvent.kind == 'contactClicked') {
      if (
        ($uIEvent.topMenuState.contact.menu == 'fullClosed') &&
        $uIEvent.sidebarState.state == 'fullOpen' &&
        $uIEvent.narrow == 'narrow'
      ) {
        console.log('closing sidebar because top shelf opened in mobile')
        set({ state: 'goingOut', speed: 0 })
      }
    } else if ($uIEvent.kind == 'settingsClicked') {
      // console.log('sidebar react to settings ' + $uIEvent.topMenuState.settings.menu)
      // console.log("sidebar detected settingsclick: ")
      // console.log($uIEvent)
      if (
        ($uIEvent.topMenuState.settings.menu == 'fullClosed') &&
        $uIEvent.sidebarState.state == 'fullOpen' &&
        $uIEvent.narrow == 'narrow'
      ) {
        console.log('closing sidebar because top shelf opened in mobile')
        set({ state: 'goingOut', speed: 0 })
      }
    }
    return () => { }
  },
  { state: 'fullClosed', speed: 0 }
)

function aMenuIsAnimating(uIEvent: UIEvent) {
  if (uIEvent.kind != 'start') {
    if (
      uIEvent.topMenuState.contact.menu == 'comingIn'
      || uIEvent.topMenuState.contact.menu == 'goingOut'
      || uIEvent.topMenuState.settings.menu == 'comingIn'
      || uIEvent.topMenuState.settings.menu == 'goingOut'
      || uIEvent.sidebarState.state == 'comingIn'
      || uIEvent.sidebarState.state == 'goingOut'
    ) {
      return true
    }
  }
  return false
}

export type TopShelfState = {
  menu: MenuState,
  outSpeed: number,
  left: number
}
export type TopMenuState = {
  settings: TopShelfState
  contact: TopShelfState
}

export const topMenuState: Readable<TopMenuState> =
  derived<
    [typeof uIEvent,
      // typeof narrow
      // , typeof sideBarState
      // typeof sidebarwidth
    ],
    TopMenuState>
    ([uIEvent,
      // , narrow
      // , sideBarState
      // sidebarwidth
    ],
      ([
        $uIEvent,
        // , $narrow
        // , $sidebarState
        // $sidebarWidth
      ], set, update) => {
        // console.log('recalc topmenu state')
        if ($uIEvent.kind == 'start') {
          return () => { }
        }
        if (
          aMenuIsAnimating($uIEvent)
          && (
            $uIEvent.kind == 'settingsClicked'
            || $uIEvent.kind == 'contactClicked'
            || $uIEvent.kind == 'burgerClicked'
          )
        ) {
          return () => { }
        }
        let updated = structuredClone($uIEvent.topMenuState)
        if ($uIEvent.kind == 'resize') {
          // update(v => {
          // let val = structuredClone(v)
          // console.log('topmenu nonevent ')
          if ($uIEvent.narrow == 'narrow') {
            if ($uIEvent.sidebarState.state != 'fullClosed') {
              if (
                $uIEvent.topMenuState.settings.menu == 'comingIn'
                || $uIEvent.topMenuState.settings.menu == 'fullOpen'
              ) {
                console.log('closing settings because went mobile while side open')
                updated.settings.menu = 'goingOut'
                updated.settings.outSpeed = 0
                return set(updated)
              }
              if (
                $uIEvent.topMenuState.contact.menu == 'comingIn'
                || $uIEvent.topMenuState.contact.menu == 'fullOpen'
              ) {
                console.log('closing contact because went mobile while side open')
                updated.contact.menu = 'goingOut'
                updated.contact.outSpeed = 0
                return set(updated)
              }
            }
          }
          // return val
          // })
          return () => { }
        }
        if ($uIEvent.kind == 'settingsAnimationFinish') {
          if ($uIEvent.topMenuState.settings.menu == "comingIn") {
            updated.settings.menu = 'fullOpen'
            set(updated)
            return () => { }
          }
          if ($uIEvent.topMenuState.settings.menu == "goingOut") {
            updated.settings.menu = 'fullClosed'
            set(updated)
            return () => { }
          }
        }
        if ($uIEvent.kind == 'contactAnimationFinish') {
          if ($uIEvent.topMenuState.contact.menu == "comingIn") {
            updated.contact.menu = 'fullOpen'
            set(updated)
            return () => { }
          }
          if ($uIEvent.topMenuState.contact.menu == "goingOut") {
            updated.contact.menu = 'fullClosed'
            set(updated)
            return () => { }
          }
        }

        if ($uIEvent.kind == 'settingsClicked') {
          // console.log('topmenu react to settings ' + $uIEvent.topMenuState.settings.menu)
          if (
            $uIEvent.topMenuState.settings.menu == 'fullClosed'
          ) {
            updated.settings.menu = 'comingIn'
            if ($uIEvent.topMenuState.contact.menu == 'fullOpen') {
              updated.contact.outSpeed = 0
              updated.contact.menu = 'goingOut'
            }
            set(updated)
            return () => { }
          }
          if (
            $uIEvent.topMenuState.settings.menu == 'fullOpen'
          ) {
            updated.settings.menu = 'goingOut'
            updated.settings.outSpeed = SHELF_OUT_DURATION
            set(updated)
            return () => { }
          }
        }
        if ($uIEvent.kind == 'contactClicked') {
          if (
            $uIEvent.topMenuState.contact.menu == 'fullClosed'
          ) {
            updated.contact.menu = 'comingIn'
            if ($uIEvent.topMenuState.settings.menu == 'fullOpen') {
              updated.settings.outSpeed = 0
              updated.settings.menu = 'goingOut'
            }
            set(updated)
            return () => { }
          }
          if (
            $uIEvent.topMenuState.contact.menu == 'fullOpen'
          ) {
            updated.contact.menu = 'goingOut'
            updated.contact.outSpeed = SHELF_OUT_DURATION
            set(updated)
            return () => { }
          }
        }

        if ($uIEvent.kind == 'burgerClicked') {
          if (
            $uIEvent.sidebarState.state == 'fullClosed'
            && $uIEvent.narrow == 'narrow'
          ) {
            if (
              $uIEvent.topMenuState.settings.menu == 'fullOpen'
            ) {
              console.log('closing settings because sidebar opened in mobile')
              updated.settings.outSpeed = 0
              updated.settings.menu = 'goingOut'
              set(updated)
            }
            if (
              $uIEvent.topMenuState.contact.menu == 'fullOpen'
            ) {
              console.log('closing contact because sidebar opened in mobile')
              updated.contact.outSpeed = 0
              updated.contact.menu = 'goingOut'
              set(updated)
            }
            return () => { }
          }

        }

        return () => { }
      }, { settings: { menu: 'fullClosed', outSpeed: 0, left: 3 }, contact: { menu: 'fullClosed', outSpeed: 0, left: 3 } })


// State derived from event-derived states.

export const shelfLeft: Readable<number> = derived([narrow, sideBarState, sidebarwidth],
  ([$narrow, $sideBarState, $sidebarWidth], set, update) => {
    // console.log('recalc shelf left: ')
    // console.log($sideBarState)
    if ($narrow == 'narrow' && $sideBarState.state == "goingOut") {
      set(3)
      return () => { }
    }
    set($sidebarWidth + 3)
    return () => { }
  })

export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }
export const topbarColorState: Readable<TopBarColorState> = derived(
  [atTop, sideBarState, topMenuState],
  ([$atTop, $sideBarState, $topMenuState]) => {
    if ($sideBarState.state == 'fullOpen' ||
      $sideBarState.state == 'comingIn' ||
      $sideBarState.state == 'goingOut' ||
      $topMenuState.contact.menu == 'fullOpen' ||
      $topMenuState.contact.menu == 'comingIn' ||
      $topMenuState.contact.menu == 'goingOut' ||
      $topMenuState.settings.menu == 'fullOpen' ||
      $topMenuState.settings.menu == 'goingOut' ||
      $topMenuState.settings.menu == 'comingIn'
    ) {
      return { color: 'solid', speed: 'instant' } satisfies TopBarColorState
    }
    if ($atTop && $sideBarState.state == 'fullClosed') {
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
      if ($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') {
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
  derived<[typeof topMenuState, typeof topbarColorState], TopBarIconState>(
    [topMenuState, topbarColorState],
    ([$topMenuState, $topbarColorState], set, update) => {
      if ($topMenuState.contact.menu == 'fullOpen' || $topMenuState.contact.menu == 'comingIn') {
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
  derived<[typeof topMenuState, typeof topbarColorState], TopBarIconState>(
    [topMenuState, topbarColorState],
    ([$settingsMenuState, $topbarColorState], set, update) => {
      if ($settingsMenuState.settings.menu == 'fullOpen' || $settingsMenuState.settings.menu == 'comingIn') {
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
  if ($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') {
    if ($narrow == 'narrow') {
      set(true)
      return () => { }
    }
  }
  set(false)
  return () => { }
})

export const splashMarginTop = derived(
  [topMenuState, sideBarState, narrow, topbarheight],
  ([$topMenuState, $sideBarState, $narrow, $topbarheight]) => {
    if (($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') && $narrow != 'narrow') {
      return { marg: $topbarheight + 20, pad: 15 }
    }
    if (
      $topMenuState.contact.menu == 'fullOpen' ||
      $topMenuState.contact.menu == 'comingIn' ||
      $topMenuState.settings.menu == 'fullOpen' ||
      $topMenuState.settings.menu == 'comingIn'

    ) {
      return { marg: $topbarheight + 20, pad: 15 }
    }
    return { marg: 3, pad: 65 };
  })
