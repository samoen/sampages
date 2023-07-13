import { base } from "$app/paths";
import { derived, writable, type Readable } from "svelte/store";

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
export const screenWidth = writable(0)
export const sidebarwidth = writable(0)
export const topbarheight = writable(0)
export const wscrollY = writable(0)
export const contactHeight = writable<number>(0);
export const settingsHeight = writable<number>(0);

// misc
export const showJsButtons = writable(false)
export const atTop = derived(wscrollY, ($s) => {
  return $s < 35
})

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
  narrowScreenState: NarrowScreenState,
  contactMenuState: ContactMenuState,
  settingsMenuState: SettingsMenuState,
  sidebarState: SidebarState,
  screenWidth: number,
} | { kind: 'start' }

export const uIEvent = writable<UIEvent>({ kind: 'start' })

// event-derived states
export type NarrowScreenState = 'narrow' | 'wide'
export const narrowScreenState: Readable<NarrowScreenState> = derived<[typeof uIEvent], NarrowScreenState>(
  [uIEvent],
  ([$uIEvent], set, update) => {
    if ($uIEvent.kind == 'resize') {
      if ($uIEvent.screenWidth < 600 && $uIEvent.narrowScreenState == 'wide') {
        console.log('setting mobile mode true because uIEvent wentMobile')
        set('narrow')
      } else if ($uIEvent.screenWidth >= 600 && $uIEvent.narrowScreenState == 'narrow') {
        console.log('setting mobile mode false because uIEvent leftMobile')
        set('wide')
      }
    }
    return () => { }
  },
  'narrow'
)

export type MenuState = 'comingIn' | 'goingOut' | 'fullOpen' | 'fullClosed'
export type SidebarState = { state: MenuState, speed: number }
export const sideBarState: Readable<SidebarState> = derived<[typeof uIEvent], SidebarState>(
  [uIEvent],
  ([$uIEvent], set, update) => {
    if ($uIEvent.kind == 'sidebarAnimationFinish') {
      set({ state: $uIEvent.sidebarState.state == "comingIn" ? 'fullOpen' : 'fullClosed', speed: 0 })
    } else if ($uIEvent.kind == 'burgerClicked') {
      if (
        ($uIEvent.settingsMenuState.menu == 'fullOpen' ||
          $uIEvent.settingsMenuState.menu == 'fullClosed') &&
        ($uIEvent.contactMenuState.menu == 'fullOpen' ||
          $uIEvent.contactMenuState.menu == 'fullClosed')
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
        ($uIEvent.contactMenuState.menu == 'fullClosed') &&
        $uIEvent.sidebarState.state == 'fullOpen' &&
        $uIEvent.narrowScreenState == 'narrow'
      ) {
        console.log('closing sidebar because top shelf opened in mobile')
        set({ state: 'goingOut', speed: 0 })
      }
    } else if ($uIEvent.kind == 'settingsClicked') {
      if (
        ($uIEvent.settingsMenuState.menu == 'fullClosed') &&
        $uIEvent.sidebarState.state == 'fullOpen' &&
        $uIEvent.narrowScreenState == 'narrow'
      ) {
        console.log('closing sidebar because top shelf opened in mobile')
        set({ state: 'goingOut', speed: 0 })
      }
    }
    return () => { }
  },
  { state: 'fullClosed', speed: 0 }
)

export type ContactMenuState = { menu: MenuState, outSpeed?: number }
export const contactMenuState: Readable<ContactMenuState> =
  derived<
    [typeof uIEvent],
    ContactMenuState>
    ([uIEvent],
      ([$uIEvent], set, update) => {
        if ($uIEvent.kind == 'contactAnimationFinish') {
          if ($uIEvent.contactMenuState.menu == "comingIn") {
            set({ menu: 'fullOpen', outSpeed: 0 })
          } else if ($uIEvent.contactMenuState.menu == "goingOut") {
            set({ menu: 'fullClosed', outSpeed: 0 })
          }
        }else if ($uIEvent.kind == 'contactClicked') {
          if ($uIEvent.contactMenuState.menu == 'fullClosed') {
            if (
              ($uIEvent.sidebarState.state == 'fullOpen' ||
                $uIEvent.sidebarState.state == 'fullClosed') &&
              ($uIEvent.settingsMenuState.menu == 'fullOpen' ||
                $uIEvent.settingsMenuState.menu == 'fullClosed')) {
              set({ menu: 'comingIn', outSpeed: 0 })
            }
          } else if ($uIEvent.contactMenuState.menu == 'fullOpen') {
            set({ menu: 'goingOut', outSpeed: SHELF_OUT_DURATION })
          }
          return () => { }
        }else if ($uIEvent.kind == 'settingsClicked') {
          if ($uIEvent.settingsMenuState.menu == 'fullClosed') {
            if ($uIEvent.contactMenuState.menu == 'fullOpen') {
              set({ menu: 'goingOut', outSpeed: 0 })
            }
          }
        }else if ($uIEvent.kind == 'burgerClicked') {
          if ($uIEvent.sidebarState.state == 'fullClosed' && $uIEvent.narrowScreenState == 'narrow' && $uIEvent.contactMenuState.menu == 'fullOpen') {
            console.log('closing contact because sidebar opened in mobile')
            set({ menu: "goingOut", outSpeed: 0 })
          }

        }else if ($uIEvent.kind == 'resize') {
          if ($uIEvent.screenWidth < 600) {
            if ($uIEvent.narrowScreenState == 'wide') {
              if ($uIEvent.sidebarState.state != 'fullClosed') {
                if ($uIEvent.contactMenuState.menu == 'fullOpen') {
                  set({ menu: 'goingOut', outSpeed: 0 })
                  console.log('closing contact because went mobile while side open')
                  return () => { }
                }
              }
            }
          }
        }

        return () => { }
      }, { menu: 'fullClosed', outSpeed: 0 })

export type SettingsMenuState = { menu: MenuState, outSpeed?: number }

export const settingsMenuState: Readable<SettingsMenuState> =
  derived<
    [typeof uIEvent],
    SettingsMenuState>
    ([uIEvent],
      ([$uIEvent], set, update) => {
        if ($uIEvent.kind == 'settingsAnimationFinish') {
          if ($uIEvent.settingsMenuState.menu == "comingIn") {
            set({ menu: 'fullOpen', outSpeed: 0 })
          } else if ($uIEvent.settingsMenuState.menu == "goingOut") {
            set({ menu: 'fullClosed', outSpeed: 0 })
          }
          return () => { }
        }else if ($uIEvent.kind == 'settingsClicked') {
          if ($uIEvent.settingsMenuState.menu == 'fullClosed') {
            if (
              ($uIEvent.sidebarState.state == 'fullOpen' ||
                $uIEvent.sidebarState.state == 'fullClosed') &&
              ($uIEvent.contactMenuState.menu == 'fullOpen' ||
                $uIEvent.contactMenuState.menu == 'fullClosed')) {
              set({ menu: 'comingIn', outSpeed: 0 })
            }
          } else if ($uIEvent.settingsMenuState.menu == 'fullOpen') {
            set({ menu: 'goingOut', outSpeed: SHELF_OUT_DURATION })
          }
          return () => { }
        }else if ($uIEvent.kind == 'contactClicked') {
          if ($uIEvent.contactMenuState.menu == 'fullClosed') {
            if ($uIEvent.settingsMenuState.menu == 'fullOpen') {
              set({ menu: 'goingOut', outSpeed: 0 })
            }
          }
        }else if ($uIEvent.kind == 'burgerClicked') {
          if ($uIEvent.sidebarState.state == 'fullClosed' && $uIEvent.narrowScreenState == 'narrow' && $uIEvent.settingsMenuState.menu == 'fullOpen') {
            console.log('closing settings because sidebar opened in mobile')
            set({ menu: "goingOut", outSpeed: 0 })
          }

        } else if ($uIEvent.kind == 'resize') {
          if ($uIEvent.screenWidth < 600) {
            if ($uIEvent.narrowScreenState == 'wide') {
              if ($uIEvent.sidebarState.state != 'fullClosed') {
                if ($uIEvent.settingsMenuState.menu == 'comingIn' || $uIEvent.settingsMenuState.menu == 'fullOpen') {
                  console.log('closing settings because went mobile while side open')
                  set({ menu: 'goingOut', outSpeed: 0 })
                }
              }
            }
          }
        }

        return () => { }
      }, { menu: 'fullClosed', outSpeed: 0 })


// State derived from event-derived states.
export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }
export const topbarColorState: Readable<TopBarColorState> = derived(
  [atTop, sideBarState, contactMenuState, settingsMenuState],
  ([$atTop, $sideBarState, $contactMenuState, $settingsMenuState]) => {
    if ($sideBarState.state == 'fullOpen' ||
      $sideBarState.state == 'comingIn' ||
      $sideBarState.state == 'goingOut' ||
      $contactMenuState.menu == 'fullOpen' ||
      $contactMenuState.menu == 'comingIn' ||
      $contactMenuState.menu == 'goingOut' ||
      $settingsMenuState.menu == 'fullOpen' ||
      $settingsMenuState.menu == 'goingOut' ||
      $settingsMenuState.menu == 'comingIn'
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
  derived<[typeof contactMenuState, typeof topbarColorState], TopBarIconState>(
    [contactMenuState, topbarColorState],
    ([$contactMenuState, $topbarColorState], set, update) => {
      if ($contactMenuState.menu == 'fullOpen' || $contactMenuState.menu == 'comingIn') {
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
      if ($settingsMenuState.menu == 'fullOpen' || $settingsMenuState.menu == 'comingIn') {
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

export const shadowState: Readable<boolean> = derived([sideBarState, narrowScreenState], ([$sideBarState, $narrowScreenState], set, update) => {
  if ($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') {
    if ($narrowScreenState == 'narrow') {
      console.log('shadow true')
      set(true)
      return () => { }
    }
  }
  console.log('shadow true')
  set(false)
  return () => { }
})

export const splashMarginTop = derived(
  [contactMenuState, settingsMenuState, sideBarState, narrowScreenState, topbarheight],
  ([$contactMenuState, $settingsMenuState, $sideBarState, $narrowScreenState, $topbarheight]) => {
    if (($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') && $narrowScreenState != 'narrow') {
      return { marg: $topbarheight + 20, pad: 15 }
    }
    if (
      $contactMenuState.menu == 'fullOpen' ||
      $contactMenuState.menu == 'comingIn' ||
      $settingsMenuState.menu == 'fullOpen' ||
      $settingsMenuState.menu == 'comingIn'

    ) {
      return { marg: $topbarheight + 20, pad: 15 }
    }
    return { marg: 3, pad: 65 };
  })
