type AvatarType = {
  username: string;
};

const Avatar = ({ username }: AvatarType) => {
  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={
        "bg-gradient-to-r flex gap-4 items-center justify-center  from-main to-[#299cd5] hover:from-[#299cd5] hover:to-main text-white font-semibold py-3 px-5 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out text-lg"
      }
    >
      {initial}
    </div>
  );
};

export default Avatar;
