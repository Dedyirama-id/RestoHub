import { createAvatar } from '@dicebear/core';
import { notionists } from '@dicebear/collection';

const createAvatarWithSeed = (seed) => {
  const avatar = createAvatar(notionists, {
    seed,
    radius: 50,
  });
  return avatar.toString();
};

export default createAvatarWithSeed;
