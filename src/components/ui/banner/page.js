import Image from "next/image";

const Banner = () => {
  return (
    <div className="banner relative flex p-10 px-20 bg-linear-to-br from-[#5d80f1] to-indigo-50 mt-10">
      <div className="banner-left w-1/2">
        <h1 className="text-[3vw] font-bold block leading-12 w-[80%]">
          Make you Bus Pass Easily Online
        </h1>
        <p className="my-5 w-1/2">
          Save time and travel smart with our digital transport platform
        </p>
        <div className="buttons flex gap-5 items-center">
          <button className="rounded-lg px-4 py-2 bg-(--color-accent) text-(--color-primary) font-semibold cursor-pointer">
            Apply for Pass
          </button>
          <button className="rounded-lg px-4 py-2 bg-(--color-primary) text-white font-normal cursor-pointer">
            Check Pass Status
          </button>
        </div>
      </div>
      <div className="banner-right w-1/2">
        <div className="image absolute -top-20">
          <Image
            src="/images/YellowBusLeftSide.svg"
            alt="image"
            width={100}
            height={100}
            className="w-[35vw]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
