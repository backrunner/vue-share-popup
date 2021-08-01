import { defineComponent, PropType, Ref, provide } from 'vue-demi';
import h from './utils/h-demi';
import { SocialPlatforms } from '../types/enums';
import { ShareProps } from './utils';
import platforms from './platforms';
import styleInject from './utils/styleInject';
import styles from './styles/main.less';

styleInject(styles);

const NAME = 'VueSharePopper';

export default defineComponent({
  name: NAME,
  props: {
    identifier: {
      type: String,
    },
    socials: {
      type: Array as PropType<SocialPlatforms[]>,
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
    // generate childs by "socials" prop
    const children = props.socials.map((social: SocialPlatforms) => {
      return h(platforms[social]);
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
