import Image from "next/image";

export default function Card({ children, title, image }) {
  const imageUrl = `/img/${image}`;
  return (
    <div className="bg-brand-4 text-slate-50 shadow-lg rounded-lg p-5">
      {image ? (
        <div className="flex flex-between gap-4 font-superstar text-3xl">
          <div>
            <Image alt={image} src={imageUrl} width={40} height={40} />
          </div>
          <div>{title}</div>
        </div>
      ) : (
        <div className="justify-center font-superstar text-3xl">
          <div>{title}</div>
        </div>
      )}

      <div className="z-10">{children}</div>
    </div>
  );
}
