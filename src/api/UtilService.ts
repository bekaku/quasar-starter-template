import { useAxios } from '@/composables/useAxios';
import type { AppVersionDto, OgMeta } from '@/types/models';
export default () => {
  const { callAxios } = useAxios();

  const getOgMeta = async (link: string): Promise<OgMeta | null> => {
    // return await callAxios<OgMeta>({
    //   API: `/api/public/getOgMeta?url=${link}`,
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle({
          domain: 'youtube.com',
          url: link,
          title: 'WONDERS OF PLANET EARTH | Most Magnificent Places | Travel Documentary 4K',
          desc: 'Embark on a 90-minute cinematic voyage to Earth\'s most breathtaking and uncharted destinations. This visual odyssey transports you to the farthest corners of the globe, where nature\'s artistry surpasses the imagination, revealing landscapes and phenomena that defy belief. From mystical formations sculpted over millennia to ancient wonders where human history intertwines with geological marvels, witness landscapes plucked from fantasy, narrated with captivating detail and insight.',
          image: 'https://i.ytimg.com/vi/-IkEMMKSqcw/maxresdefault.jpg',
          imageAlt: '',
        })
      }, 500);
    })
  };
  const getAppVersion = async (): Promise<AppVersionDto | null> => {
    // return await callAxios<AppVersionDto>({
    //   API: '/api/public/appVersion',
    //   method: 'GET',
    // });
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(null)
      }, 500);
    })
  };

  return {
    getOgMeta,
    getAppVersion,
  };
};
