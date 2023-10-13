import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('/abshot.png')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto text-white text-right p-8 w-1/2 bg-opacity-75">
          {" "}
          {/* Added background opacity */}
          <h2 className="text-4xl font-bold mb-8">Transform Your Physique</h2>
          <p className="text-xl mb-12">
            With our specialized personal training service, focusing on muscle
            building and effective fat loss for a stronger, leaner you.
          </p>
        </div>
      </section>
    </div>
  );
}
