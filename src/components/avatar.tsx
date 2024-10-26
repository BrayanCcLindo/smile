type AvatarType = {
  username: string;
  size: "sm" | "md" | "lg" | "xl" | "2xl"; // Updated to a union type
};

const Avatar = ({
  username,
  size = "md" // 'sm', 'md', 'lg', 'xl'
}: AvatarType) => {
  const initial = username ? username.charAt(0).toUpperCase() : "?";

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-24 h-24 text-5xl"
  };

  return (
    <div
      className={`
        flex items-center justify-center 
        rounded-full 
        font-bold text-white bg-main text-lg
        ${sizeClasses[size]} 
      `}
    >
      {initial}
    </div>
  );
};

export default Avatar;
