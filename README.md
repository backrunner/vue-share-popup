# vue-share-popup

This is an useful tool about social network sharing based on Vue and popper.js, you can easily create a social share popup in your project.

This project is inspired by [need-more-share2](https://github.com/revir/need-more-share2).

## Screenshot

![Screenshot](https://github.com/backrunner/vue-share-popup/blob/main/assets/screenshot.png?raw=true)

## Usage

I've used `vue-demi` to support both Vue 2 and Vue 3, if you're using Vue 2, please make sure you're using Vue 2.7.

Then you need to install this package:

```bash
npm install vue-share-popup
# or
yarn add vue-share-popup
# or
pnpm install vue-share-popup
```

The project finally exported an API called `useSharePopup`, you can use it to create a popup in your project, see more details in the reference section.

If you want to join our developement and make this project further, note that we're using `pnpm` in this project, please be sure you've installed it globally.

## Examples

In `src/demo`, we provide some examples which shows how to use this package.

For someone who want to use this package outside Vue, you should take a look at `src/demo/demo.html` (The bundle version build already packed a Vue 3 to run the popup).

Here's a basic example when you import this package by ESM:

```js
import { useSharePopup } from 'vue-share-popup';
import { qzone, weibo } from 'vue-share-popup/platform';

const share = ref(null); // bind to an element in template

useSharePopup({
  key: 'share',
  platforms: [qzone, weibo],
  meta: {
    title: 'vue-share-button',
    url: 'https://pwp.app',
  },
  ref: share.value,
  trigger: 'hover',
  placement: 'bottom',
});
```

## Reference

### useSharePopup

`useSharePopup (props: SharePopupProps) => void`

Create a social share popup.

### SharePopupProps

#### key

`key`: `string` (Optional)

If `useSharePopup` was called multiple times with a same key, method will check if there's an existed popup, if so, method will unmount it first to avoid redundant.

#### platforms

`platforms`: `SocialPlatformComp[]`

The platforms you want to display in the share popup, buttons will be displayed in the same order as your configured.

The `SocialPlatformComp` can be imported from `vue-share-popup/platforms`, supported names contains `qzone`, `wechat`, `weibo`, `douban`, `twitter`.

#### meta

`meta`: `ShareProps`

Metadata of the current page used for social sharing, see `ShareProps` part for more details.

#### ref

`ref`: `HTMLElement`

An HTML element used as a popup trigger and position reference.

#### trigger

`trigger`: `'hover' | 'click'`

Determine how the popup will be triggered.

#### placement

`placement`: `string`

Available values:

'auto'
| 'auto-start'
| 'auto-end'
| 'top'
| 'top-start'
| 'top-end'
| 'bottom'
| 'bottom-start'
| 'bottom-end'
| 'right'
| 'right-start'
| 'right-end'
| 'left'
| 'left-start'
| 'left-end'

Determine where should the popup layer be placed to the reference.

IMPORTANT: This property is provided by `@popperjs/core`, we used `preventOverflow` and `flip` modifiers when creating the popper, so in some cases your `placement` may seems not work properly, it's normal.

#### zIndex

`zIndex`: `number` (Optional)

If set, it will be the `z-index` style for the popup.

### ShareProps

Metainfo of the page that will be shared.

The metadata required varies for different social platforms, on some platforms, some metadata will not be used for sharing.

#### url

`url`: `string`

The URL of the page that will be shared.

#### title

`title`: `string`

The title of the page that will be shared.

#### desc

`desc`: `string` (Optional)

The description (or summary) of the page that will be shared.

#### image

`image`: `string` (Optional)

An image URL for sharing.

#### options

Options for share popup, see `SharePopupOptions` part for more details.

### SharePopupOptions

Options for share popup.

#### wechatSharePage

If you want to add `wechat` to the `platforms` array in the `SharePopupProps`, you need set this property neccessarily.

The value should be a URL, it will determine the page which will guide user to share something in wechat.

Example: `https://YOUR_SHARE_PAGE/index.html?url={url}&title={title}`

If you don't want to develope a wechat share page, you can take a look at this project:

[wechat-share-page](https://github.com/pwp-app/wechat-share-page)

## License

MIT
