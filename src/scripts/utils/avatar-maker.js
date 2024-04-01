import API_ENDPOINT from '../globals/api-endpoint';

const createAvatarWithSeed = (seed) => `<img loading="lazy" src="${API_ENDPOINT.AVATAR(seed)}" alt="${seed} profile"/>`;
export default createAvatarWithSeed;
