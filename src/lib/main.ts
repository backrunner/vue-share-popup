import { createApp } from 'vue-demi';
import { createPopper } from '@popperjs/core/lib/popper-lite';
import { Placement } from '@popperjs/core/lib/enums';
import { ShareProps } from './utils';
import { PopTrigger, SocialPlatforms } from '../types/enums';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import offset from '@popperjs/core/lib/modifiers/offset';
import flip from '@popperjs/core/lib/modifiers/flip';
import sharePopup, { visibility as popupVisibility } from './share-popup';

interface SharePopupProps {
  platforms: SocialPlatforms[];
  meta: ShareProps;
  target: HTMLElement;
  trigger: PopTrigger;
  placement: Placement;
  zIndex?: number;
}

const HIDE_DELAY = 100;
const HIDE_CLASS_NAME = 'vue-share-popup--hide';

export const useSharePopup = (props: SharePopupProps) => {
  // create mountTarget
  const wrapper = document.createElement('div');
  // mount popup
  const popupInstance = createApp(sharePopup, {
    socials: props.platforms,
    meta: props.meta,
    zIndex: props.zIndex || 2000,
  }).mount(wrapper);
  const popupEl: Element = wrapper.children[0];
  document.body.appendChild(popupEl);
  // create popper
  const popper = createPopper(props.target, popupInstance.$el, {
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
    popupVisibility.value = true;
    popper.update();
  };
  const hide = () => {
    popupVisibility.value = false;
  };
  // setup trigger event listeners
  if (props.trigger === PopTrigger.CLICK) {
    const showOnClick = (showEvent: MouseEvent) => {
      const hideOnClickOutside = (hideEvent: MouseEvent) => {
        const target = hideEvent.target as Node;
        if (popupEl.contains(target)) {
          return;
        }
        hide();
        document.documentElement.removeEventListener('mousedown', hideOnClickOutside);
      };
      if (popupVisibility.value) {
        hide();
        document.documentElement.removeEventListener('mousedown', hideOnClickOutside);
        return;
      }
      document.documentElement.addEventListener('mousedown', hideOnClickOutside);
      show();
      showEvent.stopPropagation();
    };
    // add event listener to target
    props.target.addEventListener('mousedown', showOnClick);
  } else if (props.trigger === PopTrigger.HOVER) {
    const elements = [props.target, popupEl];
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];
    // wrap methods
    let hideTimeout: number | null;
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
  }

  return { instance: popupInstance, el: popupEl };
};
