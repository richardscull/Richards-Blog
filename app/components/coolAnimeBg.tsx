export default function CoolAnimeBg() {
  return (
    <section className="place-content-center flex my-2 ">
      <video
        autoPlay
        loop
        muted
        width={500}
        src="/videos/front_touhou.mp4"
        className="mx-auto place-content-center shadow-lg shadow-black"
      />
    </section>
  );
}
