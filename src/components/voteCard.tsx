import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { header } from "~/styles/fonts";

type Props = {
  imgUrl: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
  name?: string;
  faculty?: string;
  clicked: boolean;
  rank?: number | null; // rank number to display (1, 2, 3...) for IRV
  disabled?: boolean;
  isKotakKosong?: boolean;
};

const VoteCard = (props: Props) => {
  return (
    <div
      onClick={props.disabled ? undefined : props.onClick}
      className={`relative ${
        props.clicked ? "scale-105 border-[#3A71F0]" : "border-transparent"
      } ${props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} flex w-full max-w-[500px] flex-col items-center justify-between rounded-lg border-[3px] md:border-[5px] p-2 sm:p-3 md:p-4 duration-200 ${!props.disabled ? "hover:scale-105 hover:border-[#3A71F0]" : ""}`}
      style={{ backgroundColor: props.bgColor }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={props.imgUrl}
          alt={props.imgUrl}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="my-2 sm:my-3 md:my-6 flex flex-col items-center justify-center text-center">
        <p
          className={`${header.variable} text-sm sm:text-lg md:text-2xl font-bold xl:mb-0`}
          style={{ color: props.textColor }}
        >
          {props.name ? props.name : ""}
        </p>
        <p
          className={`${header.variable} text-xs sm:text-base md:text-2xl xl:mb-0`}
          style={{ color: props.textColor }}
        >
          {props.faculty ? props.faculty : ""}
        </p>
      </div>
      {props.clicked && (
        <div className="absolute bottom-0 left-1/2 flex aspect-square -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#3A71F0] p-1.5 sm:p-2 text-white">
          {props.rank != null ? (
            <span className="text-sm sm:text-lg font-bold">{props.rank}</span>
          ) : (
            <FaCheck className="text-sm sm:text-base" />
          )}
        </div>
      )}
    </div>
  );
};

export default VoteCard;
