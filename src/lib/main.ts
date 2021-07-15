import { App, createApp, onUnmounted, ref } from 'vue-demi';
import { createPopper } from '@popperjs/core/lib/popper-lite';
import { Placement } from '@popperjs/core/lib/enums';
import { ShareProps } from './utils';
import { PopTrigger, SocialPlatforms } from '../types/enums';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import offset from '@popperjs/core/lib/modifiers/offset';
import flip from '@popperjs/core/lib/modifiers/flip';
import sharePopup from './share-popup';

export interface SharePopupProps {
  key?: string;
  platforms: SocialPlatforms[];
  meta: ShareProps;
  ref: HTMLElement | null;
  trigger: PopTrigger;
  placement: Placement;
  zIndex?: number;
  popupEl?: HTMLElement;
}

interface SharePopupStore {
  root: App<Element>;
  cleaners: Array<() => void>;
}

const HIDE_DELAY = 100;
const HIDE_CLASS_NAME = 'vue-share-popup--hide';

const store: Record<string, SharePopupStore> = {};

const unmountPopup = (popupStore: SharePopupStore) => {
  popupStore.root && popupStore.root.unmount();
  popupStore.cleaners.forEach((cleaner) => {
    cleaner.call(null);
  });
};

export { SocialPlatforms, PopTrigger };

export const useSharePopup = (props: SharePopupProps) => {
  if (!props.ref) {
    // eslint-disable-next-line no-console
    console.error('Ref in props is null, cannot create share popup.');
    return null;
  }
  // unmount prev instance if existed
  if (props.key) {
    const existed = !!store[props.key];
    if (existed) {
      unmountPopup(store[props.key]);
      delete store[props.key];
    }
  }
  // before mount popup
  const sideEffectCleaners: Array<() => void> = [];
  let popupRoot: App<Element>;
  onUnmounted(() => {
    unmountPopup({
      root: popupRoot,
      cleaners: sideEffectCleaners,
    });
  });
  // mount popup
  const wrapper = document.createElement('div');
  const visibility = ref(false);
  popupRoot = createApp(sharePopup, {
    identifier: props.key,
    socials: props.platforms,
    meta: props.meta,
    zIndex: props.zIndex || 2000,
    visibility,
  });
  const popupIns = popupRoot.mount(wrapper);
  const popupEl = wrapper.children[0] as HTMLElement;
  document.body.appendChild(popupEl);
  // create popper
  const popper = createPopper(props.ref, popupIns.$el, {
    placement: props.placement,
    modifiers: [
      {
        ...preventOverflow,
        options: {
          padding: 12,
        },
      },
      {
        ...flip,
        options: {
          padding: 12,
        },
      },
      {
        ...offset,
        options: {
          offset: [0, 12],
        },
      },
    ],
  });
  const show = () => {
    visibility.value = true;
    popper.update();
  };
  const hide = () => {
    visibility.value = false;
  };
  // setup trigger event listeners
  if (props.trigger === PopTrigger.CLICK) {
    const hideOnClickOutside = (hideEvent: MouseEvent) => {
      const target = hideEvent.target as Node;
      if (popupEl.contains(target)) {
        return;
      }
      hide();
      document.documentElement.removeEventListener('mousedown', hideOnClickOutside);
    };
    if (popupIns.$options.methods.getVisibility()) {
      hide();
      document.documentElement.removeEventListener('mousedown', hideOnClickOutside);
      return;
    }
    const showOnClick = (showEvent: MouseEvent) => {
      document.documentElement.addEventListener('mousedown', hideOnClickOutside);
      show();
      showEvent.stopPropagation();
    };
    // add event listener to target
    props.ref.addEventListener('mousedown', showOnClick);
    // add side effect cleaner
    sideEffectCleaners.push(() => {
      if (props.ref) {
        props.ref.removeEventListener('mousedown', showOnClick);
      }
      document.documentElement.removeEventListener('mousedown', hideOnClickOutside);
    });
  } else if (props.trigger === PopTrigger.HOVER) {
    const elements = [props.ref, popupEl];
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];
    // wrap methods
    let hideTimeout: NodeJS.Timeout | null;
    const enterShow = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      show();
      if (popupEl.classList.contains(HIDE_CLASS_NAME)) {
        popupEl.classList.remove(HIDE_CLASS_NAME);
      }
    };
    const delayHide = () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      hideTimeout = setTimeout(() => {
        if (!popupEl.classList.contains(HIDE_CLASS_NAME)) {
          popupEl.classList.add(HIDE_CLASS_NAME);
          setTimeout(() => {
            hide();
          }, 50);
        }
      }, HIDE_DELAY);
    };
    showEvents.forEach((eventName) => {
      elements.forEach((el) => {
        el.addEventListener(eventName, enterShow);
      });
    });
    hideEvents.forEach((eventName) => {
      elements.forEach((el) => {
        el.addEventListener(eventName, delayHide);
      });
    });
    // add side effect cleaner
    sideEffectCleaners.push(() => {
      if (hideTimeout) {
        // release timer
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      showEvents.forEach((eventName) => {
        if (!props.ref) {
          return;
        }
        // popup has been destroyed, only need to remove listeners on ref
        props.ref.removeEventListener(eventName, enterShow);
        props.ref.removeEventListener(eventName, delayHide);
      });
    });
  }

  if (props.key) {
    store[props.key] = {
      root: popupRoot,
      cleaners: sideEffectCleaners,
    };
  }

  return { root: popupRoot, instance: popupIns, el: popupEl, popper };
};
