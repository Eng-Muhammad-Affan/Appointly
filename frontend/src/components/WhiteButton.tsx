import { Link } from "react-router-dom";

interface WhiteButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  link: string;
  text: string;
  width?: string;
  py?: string;
  textSize?: string;
  children?: React.ReactNode;
}

const WhiteButton = ({
  link,
  text,
  width = "w-auto",
  py = "py-2",
  textSize = "text-base",
  children,
  ...props
}: WhiteButtonProps) => {
  return (
    <Link
      to={link}
      className={`dark:bg-whiteSecondary bg-blackPrimary ${width} ${py} ${textSize} dark:hover:bg-white hover:bg-gray-800 duration-200 flex items-center justify-center gap-x-2`}
      {...props}
    >
      {children}
      <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
        {text}
      </span>
    </Link>
  );
};

export default WhiteButton