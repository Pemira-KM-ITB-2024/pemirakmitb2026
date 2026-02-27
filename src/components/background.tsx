import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface BgProps extends HTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
}

const Bg = ({ className, backgroundImage="/bg-pemira26.png", ...props }: BgProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 bg-[url('/bg-pemira26.png')] bg-[length:100%_auto] bg-top bg-no-repeaat",
        className
      )}
      
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      {...props}
    ></div>
  );
};

export default Bg;
