import { defineComponent, isVue2, isVue3 } from 'vue-demi';
import { SocialPlatforms } from '../../types/enums';
import { useOpenShare } from '../utils';
import h from '../utils/h-demi';

export default defineComponent({
  setup() {
    const handleClick = useOpenShare(SocialPlatforms.DOUBAN);
    return () =>
      h(
        'div',
        {
          class: 'vue-share-popup__item',
          style: 'background-color: #2e963d',
          on: {
            click: handleClick,
          },
          ...(isVue2
            ? {
                domProps: {
                  innerHTML:
                    '<svg viewBox="0 0 24 24"><path d="M16.314 19.138h4.065a.62.62 0 0 1 .621.62v.621a.62.62 0 0 1-.62.621H3.62a.62.62 0 0 1-.62-.62v-.621a.62.62 0 0 1 .62-.621h3.754l-.96-3.104h2.19a.62.62 0 0 1 .59.425l.892 2.679H13.6l1.225-4.035H5.172a.62.62 0 0 1-.62-.62V7.345a.62.62 0 0 1 .62-.62h13.656a.62.62 0 0 1 .62.62v7.138a.62.62 0 0 1-.62.62h-1.289l-1.225 4.035zM3.931 3h16.138a.62.62 0 0 1 .62.62v.621a.62.62 0 0 1-.62.621H3.931a.62.62 0 0 1-.62-.62V3.62A.62.62 0 0 1 3.93 3zM7.19 8.586a.155.155 0 0 0-.156.155v4.035c0 .086.07.155.156.155h9.62c.086 0 .156-.07.156-.155V8.74a.155.155 0 0 0-.156-.155H7.19z" fill="currentColor"></path></svg>',
                },
              }
            : null),
        },
        isVue3
          ? [
              h(
                'svg',
                {
                  viewBox: '0 0 24 24',
                },
                [
                  h('path', {
                    d: 'M16.314 19.138h4.065a.62.62 0 0 1 .621.62v.621a.62.62 0 0 1-.62.621H3.62a.62.62 0 0 1-.62-.62v-.621a.62.62 0 0 1 .62-.621h3.754l-.96-3.104h2.19a.62.62 0 0 1 .59.425l.892 2.679H13.6l1.225-4.035H5.172a.62.62 0 0 1-.62-.62V7.345a.62.62 0 0 1 .62-.62h13.656a.62.62 0 0 1 .62.62v7.138a.62.62 0 0 1-.62.62h-1.289l-1.225 4.035zM3.931 3h16.138a.62.62 0 0 1 .62.62v.621a.62.62 0 0 1-.62.621H3.931a.62.62 0 0 1-.62-.62V3.62A.62.62 0 0 1 3.93 3zM7.19 8.586a.155.155 0 0 0-.156.155v4.035c0 .086.07.155.156.155h9.62c.086 0 .156-.07.156-.155V8.74a.155.155 0 0 0-.156-.155H7.19z',
                    fill: 'currentColor',
                  }),
                ],
              ),
            ]
          : [],
      );
  },
});
