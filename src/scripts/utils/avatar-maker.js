import * as notionists from '@dicebear/notionists';

const { createAvatar } = await import('@dicebear/core');

const createAvatarWithSeed = (seed) => {
  const avatar = createAvatar(notionists, {
    seed,
    radius: 50,
  });

  return avatar.toString();
};

export default createAvatarWithSeed;
