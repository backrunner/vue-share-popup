import { defineComponent, PropType, Ref, provide } from 'vue-demi';
import { ShareProps } from './utils';
import { SocialPlatformComp } from './platforms';
import h from './utils/h-demi';
import styleInject from './utils/styleInject';
import styles from './styles/main.less?inline';

styleInject(styles);

const NAME = 'VueSharePopper';

export default defineComponent({
  name: NAME,
  props: {
    identifier: {
      type: String,
    },
    platforms: {
      type: Array as PropType<SocialPlatformComp[]>,
      required: true,
    },
    meta: {
      type: Object as PropType<ShareProps>,
      required: true,
    },
    zIndex: {
      type: Number,
      required: true,
    },
    visibility: {
      type: Object as PropType<Ref<Boolean>>,
      required: true,
    },
  },
  setup(props: any) {
    // provide
    provide('shareProps', props.meta);
    // generate childs by "platforms" prop
    const children = props.platforms.map((comp: SocialPlatformComp) => {
      return h(comp);
    });
    return () =>
      h(
        'div',
        {
          class: 'vue-share-popup',
          style: {
            display: props.visibility.value ? null : 'none',
            'z-index': props.zIndex,
          },
          ...(props.identifier
            ? {
                domProps: {
                  id: `vue-share-popup_${props.identifier}`,
                },
              }
            : null),
        },
        children,
      );
  },
});
