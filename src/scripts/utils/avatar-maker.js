
const createAvatarWithSeed = async (seed) => {
  const { createAvatar } = await import('@dicebear/core');
  const { notionists } = await import('@dicebear/notionists');

  const avatar = createAvatar(notionists, {
    seed,
    radius: 50,
  });

  return avatar.toString();
};

export default createAvatarWithSeed;
