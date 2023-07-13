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
export const topBarTransitionQuick = writable(false)
export const showJsButtons = writable(false)
export const atTop = derived(wscrollY, ($s) => {
  return $s < 35
})

// events
export type ResizeEvent = { width:number, sidebar: SidebarState, contactMenuState: ContactMenuState, settingsMenuState: SettingsMenuState, narrowScreenState:NarrowScreenState } | 'done'
export const resizeEvent = writable<ResizeEvent>('done')
resizeEvent.subscribe(val => {
  if (val != 'done') {
    resizeEvent.set('done')
  }
})
export type BurgerClickEvent = {
  type: 'burg',
  narrowScreenState: NarrowScreenState,
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

export const contactClickEvent = writable<{ contactMenuState: ContactMenuState, settingsMenuState: SettingsMenuState, sideBarState: SidebarState, narrowScreenState: NarrowScreenState } | 'done'>('done')
contactClickEvent.subscribe(val => {
  if (val != 'done') {
    contactClickEvent.set('done')
  }
})

export const settingsClickEvent = writable<{ settingsMenuState: SettingsMenuState, contactMenuState: ContactMenuState, sideBarState: SidebarState, narrowScreenState: NarrowScreenState } | 'done'>('done')
settingsClickEvent.subscribe(val => {
  if (val != 'done') {
    settingsClickEvent.set('done')
  }
})

// event-derived states
export type NarrowScreenState = 'narrow' | 'wide'
export const narrowScreenState:Readable<NarrowScreenState> = derived<[typeof resizeEvent],NarrowScreenState>(
  [resizeEvent],
  ([$resizeEvent], set, update) => {
    if ($resizeEvent != 'done') {
      if ($resizeEvent.width < 600 && $resizeEvent.narrowScreenState == 'wide') {
        console.log('setting mobile mode true because resizeEvent wentMobile')
        set('narrow')
      } else if ($resizeEvent.width >= 600 && $resizeEvent.narrowScreenState == 'narrow') {
        console.log('setting mobile mode false because resizeEvent leftMobile')
        set('wide')
      }
    }
    return () => { }
  },
  'narrow'
)

export type MenuState = 'comingIn' | 'goingOut' | 'fullOpen' | 'fullClosed'
export type SidebarState = { state: MenuState, speed: number }
export const sideBarState: Readable<SidebarState> =
  derived<
    [
      typeof lastBurgClickEvent,
      typeof sidebarAnimationFinishEvent,
      typeof contactClickEvent,
      typeof settingsClickEvent,
    ],
    SidebarState
  >(
    [lastBurgClickEvent, sidebarAnimationFinishEvent, contactClickEvent, settingsClickEvent],
    ([$lastBurgClickEvent, $sidebarAnimationFinishEvent, $contactClickEvent, $settingsClickEvent], set, update) => {
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
          if ($lastBurgClickEvent.sideBarState.state == 'fullOpen') {
            console.log('closing sidebar because burger clicked while sidebar open')
            set({ state: 'goingOut', speed: SIDEBAR_OUT_DURATION })
          }
          if ($lastBurgClickEvent.sideBarState.state == 'fullClosed') {
            console.log('opening sidebar because burger clicked while sidebar closed')
            set({ state: 'comingIn', speed: SIDEBAR_IN_DURATION })
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
          $contactClickEvent.narrowScreenState == 'narrow'
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
          $settingsClickEvent.narrowScreenState == 'narrow'
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
    [typeof contactClickEvent, typeof settingsClickEvent, typeof lastBurgClickEvent, typeof contactMenuAnimationFinishEvent, typeof resizeEvent],
    ContactMenuState>
    ([contactClickEvent, settingsClickEvent, lastBurgClickEvent, contactMenuAnimationFinishEvent, resizeEvent],
      ([$contactClickEvent, $settingsClickEvent, $lastBurgClickEvent, $contactMenuAnimationFinishEvent, $resizeEvent], set, update) => {
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
            set({ menu: 'goingOut', outSpeed: SHELF_OUT_DURATION })
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
          if ($lastBurgClickEvent.sideBarState.state == 'fullClosed' && $lastBurgClickEvent.narrowScreenState == 'narrow' && $lastBurgClickEvent.contactMenuState.menu == 'fullOpen') {
            console.log('closing contact because sidebar opened in mobile')
            set({ menu: "goingOut", outSpeed: 0 })
            return () => { }
          }

        }
        if ($resizeEvent != 'done') {
          if ($resizeEvent.width < 600) {
            if($resizeEvent.narrowScreenState == 'wide'){
              if ($resizeEvent.sidebar.state != 'fullClosed') {
                if ($resizeEvent.contactMenuState.menu == 'fullOpen') {
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
    [typeof settingsClickEvent, typeof contactClickEvent, typeof lastBurgClickEvent, typeof settingsMenuAnimationFinishEvent, typeof resizeEvent],
    SettingsMenuState>
    ([settingsClickEvent, contactClickEvent, lastBurgClickEvent, settingsMenuAnimationFinishEvent, resizeEvent],
      ([$settingsClickEvent, $contactClickEvent, $lastBurgClickEvent, $settingsMenuAnimationFinishEvent, $resizeEvent], set, update) => {
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
            set({ menu: 'goingOut', outSpeed: SHELF_OUT_DURATION })
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
          if ($lastBurgClickEvent.sideBarState.state == 'fullClosed' && $lastBurgClickEvent.narrowScreenState == 'narrow' && $lastBurgClickEvent.settingsMenuState.menu == 'fullOpen') {
            console.log('closing settings because sidebar opened in mobile')
            set({ menu: "goingOut", outSpeed: 0 })
          }

        }
        if ($resizeEvent != 'done') {
          if ($resizeEvent.width < 600) {
            if($resizeEvent.narrowScreenState == 'wide'){ 
              if ($resizeEvent.sidebar.state != 'fullClosed') {
                if ($resizeEvent.settingsMenuState.menu == 'comingIn' || $resizeEvent.settingsMenuState.menu == 'fullOpen') {
                  console.log('closing settings because went mobile while side open')
                  set({ menu: 'goingOut', outSpeed: 0 })
                }
              }
            }
          }
        }

        return () => { }
      }, { menu: 'fullClosed', outSpeed: 0 })


// fully derived state
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
  derived<[typeof sideBarState,typeof topbarColorState],TopBarIconState>(
    [sideBarState, topbarColorState],
    ([$sideBarState, $topbarColorState], set, update) => {
      if ($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') {
        set({ color: 'inset', transition: 'instant' })
        return ()=>{}
      }
      if ($topbarColorState.color == 'blur') {
        set({ color: 'solid', transition: 'slow' })
        return ()=>{}
      }
      set({ color: 'transparent', transition: 'slow' })
      return ()=>{}
    })

export const contactIconState: Readable<TopBarIconState> =
  derived<[typeof contactMenuState, typeof topbarColorState], TopBarIconState>(
    [contactMenuState, topbarColorState],
     ([$contactMenuState, $topbarColorState], set, update) => {
    if ($contactMenuState.menu == 'fullOpen' || $contactMenuState.menu == 'comingIn') {
      set({ color: 'inset', transition: 'instant' })
      return ()=>{}
    }
    if ($topbarColorState.color == 'blur') {
      set({ color: 'solid', transition: 'slow' })
      return ()=>{}
    }
    set({ color: 'transparent', transition: 'slow' })
    return ()=>{}
  })

export const settingsIconState: Readable<TopBarIconState> = 
  derived<[typeof settingsMenuState, typeof topbarColorState],TopBarIconState>(
  [settingsMenuState, topbarColorState],
  ([$settingsMenuState, $bcs],set,update) => {
    if ($settingsMenuState.menu == 'fullOpen' || $settingsMenuState.menu == 'comingIn') {
      set({ color: 'inset', transition: 'instant' })
      return ()=>{}
    }
    if ($bcs.color == 'blur') {
      set({ color: 'solid', transition: 'slow' })
      return ()=>{}
    }
    set({ color: 'transparent', transition: 'slow' })
    return ()=>{}
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
    if (($sideBarState.state == 'fullOpen' || $sideBarState.state == 'comingIn') && !$narrowScreenState) {
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
