import qzone from './qzone';
import twitter from './twitter';
import wechat from './wechat';
import weibo from './weibo';
import douban from './douban';

export { qzone, twitter, wechat, weibo, douban };

export type SocialPlatformComp = typeof qzone;
