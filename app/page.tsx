import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="relative bg-cover bg-center min-h-screen flex items-center justify-center">
        <div className="bg-bwhite dark:bg-grey-900">
          <Image
            src="/abshot.png"
            alt="Fitness Image"
            width={1000}
            height={1060}
          />
        </div>

        <div className="container mx-auto flex items-center justify-end bg-opacity-75 h-full">
          {/* Added flex classes */}
          <div className="text-white text-right p-8 w-1/2">
            <h2 className="text-4xl font-bold mb-8">Transform Your Physique</h2>
            <p className="text-xl mb-12">
              With our specialized personal training service, focusing on muscle
              building and effective fat loss for a stronger, leaner you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
