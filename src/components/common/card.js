"use client";

const Card = ({ icon, title, description }) => {
  return (
    <div className="flex items-center justify-center flex-col p-4 shadow bg-white rounded-lg w-[31%] h-[220px]">
      <span className="rounded-full p-4 bg-(--color-accent)">{icon}</span>
      <h3 className="text-[1.4rem] font-semibold w-[80%] text-center leading-7 my-5">{title}</h3>
      <p className="text-[.9rem] text-center">{description}</p>
    </div>
  );
};

export default Card;
