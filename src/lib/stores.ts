import { base } from "$app/paths";
import { derived, get, writable, type Readable } from "svelte/store";

export const DEFAULT_MENU_SLIDE_DURATION: number = 400;
export const WAIT_FOR_MENU_SLIDE = DEFAULT_MENU_SLIDE_DURATION - 200;
export const DEFAULT_COLOR_TRANSITION_DURATION = 600

export const screenWidth = writable(0)

export type MobileEvent = { type: 'wentMobile' | 'leftMobile', sidebar: SidebarState } | 'done'
export const mobileEvent = writable<MobileEvent>('done')
mobileEvent.subscribe(val => {
  if (val != 'done') {
    mobileEvent.set('done')
  }
})

export const mobileMode = derived(
  [mobileEvent],
  ([$mobileEvent], set, update) => {
    if ($mobileEvent != 'done') {
      if ($mobileEvent.type == 'wentMobile') {
        console.log('setting mobile mode true because mobileEvent wentMobile')
        set(true)
      } else if ($mobileEvent.type == 'leftMobile') {
        console.log('setting mobile mode false because mobileEvent leftMobile')
        set(false)
      }
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

export const contactHeight = writable<number>(0);
export const settingsHeight = writable<number>(0);
export type BurgerClickEvent = {
  type: 'burg',
  mobileMode: boolean,
  contactMenuState: ContactMenuState,
  settingsMenuState: SettingsMenuState,
  sideBarState: SidebarState,
} | 'done'
export const lastBurgClickEvent = writable<BurgerClickEvent>('done')
lastBurgClickEvent.subscribe(val => {
  if (val != 'done') {
    lastBurgClickEvent.set('done')
  }
})
export const sidebarAnimationFinishEvent = writable<{ sidebarState: SidebarState } | 'done'>('done')
sidebarAnimationFinishEvent.subscribe(val => {
  if (val != 'done') {
    sidebarAnimationFinishEvent.set('done')
  }
})

export const contactMenuAnimationFinishEvent = writable<{ contactMenuState: ContactMenuState } | 'done'>('done')
contactMenuAnimationFinishEvent.subscribe(val => {
  if (val != 'done') {
    contactMenuAnimationFinishEvent.set('done')
  }
})
export const settingsMenuAnimationFinishEvent = writable<{ settingsMenuState: SettingsMenuState } | 'done'>('done')
settingsMenuAnimationFinishEvent.subscribe(val => {
  if (val != 'done') {
    settingsMenuAnimationFinishEvent.set('done')
  }
})

export const contactClickEvent = writable<{ contactMenuState: ContactMenuState, settingsMenuState: SettingsMenuState, sideBarState: SidebarState, mobileMode: boolean } | 'done'>('done')
contactClickEvent.subscribe(val => {
  if (val != 'done') {
    contactClickEvent.set('done')
  }
})
export const settingsClickEvent = writable<{ settingsMenuState: SettingsMenuState, contactMenuState: ContactMenuState, sideBarState: SidebarState, mobileMode: boolean } | 'done'>('done')
settingsClickEvent.subscribe(val => {
  if (val != 'done') {
    settingsClickEvent.set('done')
  }
})

export type MenuState = 'comingIn' | 'goingOut' | 'fullOpen' | 'fullClosed'
export type SidebarState = { state: MenuState, speed: number }

export const sideBarState: Readable<SidebarState> =
  derived<
    [
      typeof lastBurgClickEvent,
      typeof sidebarAnimationFinishEvent,
      typeof contactClickEvent,
      typeof settingsClickEvent,
      typeof scrollEvent,
    ],
    SidebarState
  >(
    [lastBurgClickEvent, sidebarAnimationFinishEvent, contactClickEvent, settingsClickEvent, scrollEvent],
    ([$lastBurgClickEvent, $sidebarAnimationFinishEvent, $contactClickEvent, $settingsClickEvent, $scrollEvent], set, update) => {
      if ($sidebarAnimationFinishEvent != 'done') {
        set({ state: $sidebarAnimationFinishEvent.sidebarState.state == "comingIn" ? 'fullOpen' : 'fullClosed', speed: 0 })
        return () => { }
      }
      if ($lastBurgClickEvent != 'done') {
        if (
          ($lastBurgClickEvent.settingsMenuState.menu == 'fullOpen' ||
            $lastBurgClickEvent.settingsMenuState.menu == 'fullClosed') &&
          ($lastBurgClickEvent.contactMenuState.menu == 'fullOpen' ||
            $lastBurgClickEvent.contactMenuState.menu == 'fullClosed')
        ) {
          console.log('burglick and top ready')
          if ($lastBurgClickEvent.sideBarState.state == 'fullOpen') {
            console.log('closing sidebar because burger clicked while sidebar open')
            set({ state: 'goingOut', speed: DEFAULT_MENU_SLIDE_DURATION })
          }
          if ($lastBurgClickEvent.sideBarState.state == 'fullClosed') {
            console.log('opening sidebar because burger clicked while sidebar closed')
            set({ state: 'comingIn', speed: DEFAULT_MENU_SLIDE_DURATION })
          }
        }
        // lastBurgClickEvent.set('animating')
        // return () => { }
      }
      if (
        $contactClickEvent != 'done'
      ) {
        if (
          ($contactClickEvent.contactMenuState.menu == 'fullClosed') &&
          $contactClickEvent.sideBarState.state == 'fullOpen' &&
          $contactClickEvent.mobileMode
        ) {
          console.log('closing sidebar because top shelf opened in mobile')
          set({ state: 'goingOut', speed: 0 })
          return () => { }
        }
      }
      if (
        $settingsClickEvent != 'done'
      ) {
        if (
          ($settingsClickEvent.settingsMenuState.menu == 'fullClosed') &&
          $settingsClickEvent.sideBarState.state == 'fullOpen' &&
          $settingsClickEvent.mobileMode
        ) {
          console.log('closing sidebar because top shelf opened in mobile')
          set({ state: 'goingOut', speed: 0 })
          return () => { }
        }
      }
      return () => { }
    }
    ,
    { state: 'fullClosed', speed: 0 }
  )

export type ContactMenuState = { menu: MenuState, outSpeed?: number }
export const contactMenuState: Readable<ContactMenuState> =
  derived<
    [typeof contactClickEvent, typeof settingsClickEvent, typeof lastBurgClickEvent, typeof contactMenuAnimationFinishEvent, typeof mobileEvent],
    ContactMenuState>
    ([contactClickEvent, settingsClickEvent, lastBurgClickEvent, contactMenuAnimationFinishEvent, mobileEvent],
      ([$contactClickEvent, $settingsClickEvent, $lastBurgClickEvent, $contactMenuAnimationFinishEvent, $mobileEvent], set, update) => {
        if ($contactMenuAnimationFinishEvent != 'done') {
          if ($contactMenuAnimationFinishEvent.contactMenuState.menu == "comingIn") {
            set({ menu: 'fullOpen', outSpeed: 0 })
          } else if ($contactMenuAnimationFinishEvent.contactMenuState.menu == "goingOut") {
            set({ menu: 'fullClosed', outSpeed: 0 })
          }
          return () => { }
        }

        if ($contactClickEvent != 'done') {
          if ($contactClickEvent.contactMenuState.menu == 'fullClosed') {
            if (
              ($contactClickEvent.sideBarState.state == 'fullOpen' ||
                $contactClickEvent.sideBarState.state == 'fullClosed') &&
              ($contactClickEvent.settingsMenuState.menu == 'fullOpen' ||
                $contactClickEvent.settingsMenuState.menu == 'fullClosed')) {
              set({ menu: 'comingIn', outSpeed: 0 })
            }
          } else if ($contactClickEvent.contactMenuState.menu == 'fullOpen') {
            set({ menu: 'goingOut', outSpeed: DEFAULT_MENU_SLIDE_DURATION })
          }
          return () => { }
        }

        if ($settingsClickEvent != 'done') {
          if ($settingsClickEvent.settingsMenuState.menu == 'fullClosed') {
            if ($settingsClickEvent.contactMenuState.menu == 'fullOpen') {
              set({ menu: 'goingOut', outSpeed: 0 })
            }
          }
        }

        if ($lastBurgClickEvent != 'done') {
          if ($lastBurgClickEvent.sideBarState.state == 'fullClosed' && $lastBurgClickEvent.mobileMode && $lastBurgClickEvent.contactMenuState.menu == 'fullOpen') {
            console.log('closing contact because sidebar opened in mobile')
            set({ menu: "goingOut", outSpeed: 0 })
            return () => { }
          }

        }
        if ($mobileEvent != 'done') {
          if ($mobileEvent.type == 'wentMobile' && $mobileEvent.sidebar.state == 'fullOpen') {
            console.log('closing shelf because went mobile while side open')
            set({ menu: 'goingOut', outSpeed: 0 })
            return () => { }
          }
        }

        return () => { }
      }, { menu: 'fullClosed', outSpeed: 0 })

export type SettingsMenuState = { menu: MenuState, outSpeed?: number }

export const settingsMenuState: Readable<SettingsMenuState> =
  derived<
    [typeof settingsClickEvent, typeof contactClickEvent, typeof lastBurgClickEvent, typeof settingsMenuAnimationFinishEvent, typeof mobileEvent],
    SettingsMenuState>
    ([settingsClickEvent, contactClickEvent, lastBurgClickEvent, settingsMenuAnimationFinishEvent, mobileEvent],
      ([$settingsClickEvent, $contactClickEvent, $lastBurgClickEvent, $settingsMenuAnimationFinishEvent, $mobileEvent], set, update) => {
        if ($settingsMenuAnimationFinishEvent != 'done') {
          if ($settingsMenuAnimationFinishEvent.settingsMenuState.menu == "comingIn") {
            set({ menu: 'fullOpen', outSpeed: 0 })
          } else if ($settingsMenuAnimationFinishEvent.settingsMenuState.menu == "goingOut") {
            set({ menu: 'fullClosed', outSpeed: 0 })
          }
          return () => { }
        }

        if ($settingsClickEvent != 'done') {
          if ($settingsClickEvent.settingsMenuState.menu == 'fullClosed') {
            if (
              ($settingsClickEvent.sideBarState.state == 'fullOpen' ||
                $settingsClickEvent.sideBarState.state == 'fullClosed') &&
              ($settingsClickEvent.contactMenuState.menu == 'fullOpen' ||
                $settingsClickEvent.contactMenuState.menu == 'fullClosed')) {
              set({ menu: 'comingIn', outSpeed: 0 })
            }
          } else if ($settingsClickEvent.settingsMenuState.menu == 'fullOpen') {
            set({ menu: 'goingOut', outSpeed: DEFAULT_MENU_SLIDE_DURATION })
          }
          return () => { }
        }

        if ($contactClickEvent != 'done') {
          if ($contactClickEvent.contactMenuState.menu == 'fullClosed') {
            if ($contactClickEvent.settingsMenuState.menu == 'fullOpen') {
              set({ menu: 'goingOut', outSpeed: 0 })
            }
          }
        }


        if ($lastBurgClickEvent != 'done') {
          if ($lastBurgClickEvent.sideBarState.state == 'fullClosed' && $lastBurgClickEvent.mobileMode && $lastBurgClickEvent.settingsMenuState.menu == 'fullOpen') {
            console.log('closing settings because sidebar opened in mobile')
            set({ menu: "goingOut", outSpeed: 0 })
            return () => { }
          }

        }
        if ($mobileEvent != 'done') {
          if ($mobileEvent.type == 'wentMobile' && $mobileEvent.sidebar.state == 'fullOpen') {
            console.log('closing shelf because went mobile while side open')
            set({ menu: 'goingOut', outSpeed: 0 })
            return () => { }
          }
        }

        return () => { }
      }, { menu: 'fullClosed', outSpeed: 0 })

export type TopBarColorState = { color: 'transparent' | 'solid' | 'blur', speed: 'instant' | 'slow' }
export const barColorState: Readable<TopBarColorState> = derived(
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
  derived(
    [sideBarState, barColorState],
    ([$sideBarState, $bcs]) => {
      if ($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') {
        return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
      }
      if ($bcs.color == 'blur') {
        return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
      }
      return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
    })

export const contactIconState: Readable<TopBarIconState> =
  derived([contactMenuState, barColorState], ([$contactMenuState, $bcs]) => {
    if ($contactMenuState.menu == 'fullOpen' || $contactMenuState.menu == 'comingIn') {
      return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
    }
    if ($bcs.color == 'blur') {
      return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
    }
    return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
  })

export const settingsIconState: Readable<TopBarIconState> = derived([settingsMenuState, barColorState],
  ([$settingsMenuState, $bcs]) => {
    if ($settingsMenuState.menu == 'fullOpen' || $settingsMenuState.menu == 'comingIn') {
      return { color: 'inset', transition: 'instant' } satisfies TopBarIconState
    }
    if ($bcs.color == 'blur') {
      return { color: 'solid', transition: 'slow' } satisfies TopBarIconState
    }
    return { color: 'transparent', transition: 'slow' } satisfies TopBarIconState
  })

export const shadowState: Readable<boolean> = derived([sideBarState, mobileMode], ([$sideBarState, $mobileMode], set, update) => {
  if ($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') {
    if ($mobileMode) {
      set(true)
      return () => { }
    }
  }
  set(false)
  return () => { }
})

export const splashMarginTop = derived(
  [contactMenuState, settingsMenuState, sideBarState, mobileMode],
  ([$contactMenuState, $settingsMenuState, $sideBarState, $mobileMode]) => {
    if (($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') && !$mobileMode) {
      return { marg: get(topbarheight) + 20, pad: 15 }
    }
    console.log($contactMenuState)
    if (
      $contactMenuState.menu == 'fullOpen' ||
      $contactMenuState.menu == 'comingIn' ||
      $settingsMenuState.menu == 'fullOpen' ||
      $settingsMenuState.menu == 'comingIn'

    ) {
      console.log('yes ' + get(topbarheight))
      return { marg: get(topbarheight) + 20, pad: 15 }
    }
    return { marg: 3, pad: 65 };
  })

export const modBase = base == "" ? "/" : base