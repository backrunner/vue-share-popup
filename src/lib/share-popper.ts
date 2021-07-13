import { defineComponent, PropType, h } from 'vue-demi';
import { SocialPlatforms } from '../types/enums';
import platforms from './platforms';

const NAME = 'VueSharePopper';

export default defineComponent({
  name: NAME,
  props: {
    socials: {
      type: Array as PropType<SocialPlatforms[]>,
      required: true,
    },
  },
  setup(props) {
    // generate childs by "socials" prop
    const children = props.socials.map((social) => {
      return h(platforms[social]);
    });
    return () =>
      h(
        'div',
        {
          class: 'vue-share-popup',
        },
        children,
      );
  },
});
