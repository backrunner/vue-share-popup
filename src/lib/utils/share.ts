import { inject } from 'vue-demi';
import { SocialPlatforms } from '../../types/enums';

interface ShareProps {
  url: string;
  title: string;
  desc?: string;
  image?: string;
}

const getShareUrl: Record<SocialPlatforms, (props: ShareProps) => string> = {
  [SocialPlatforms.QZONE]: (props) => {
    const { title, url, image, desc } = props;
    let shareUrl = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=${encodeURIComponent(
      title,
    )}&url=${url}`;
    image && (shareUrl += `&pics=${image}`);
    desc && (shareUrl += `&desc=${desc}`);
    return shareUrl;
  },
  [SocialPlatforms.WEIBO]: (props) => {
    const { title, url, image } = props;
    let shareUrl = `http://v.t.sina.com.cn/share/share.php?title=${encodeURIComponent(
      title,
    )}&url=${url}`;
    image && (shareUrl += `&pic=${image}`);
    return shareUrl;
  },
  [SocialPlatforms.WECHAT]: () => {
    return '';
  },
  [SocialPlatforms.TWITTER]: (props) => {
    const { title, url } = props;
    return `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
  },
};

const openShare = (platform: SocialPlatforms, props: ShareProps) => {
  const shareUrl = getShareUrl[platform](props);
  if (shareUrl) {
    window.open(shareUrl, '_blank');
  }
};

const useOpenShare = (platform: SocialPlatforms) => {
  const shareProps: ShareProps | undefined = inject('shareProps');
  const handleClick = () => {
    if (shareProps) {
      openShare(platform, shareProps);
    } else {
      // eslint-disable-next-line no-console
      console.error('Share props is empty, cannot continue.');
    }
  };
  return handleClick;
};

export { ShareProps, useOpenShare };
