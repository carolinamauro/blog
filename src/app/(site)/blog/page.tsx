import { getAllPostsMeta } from "../../../lib/posts";
import BlogList from "../../../components/BlogList";

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="relative z-10 min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      {/* Nebula blobs */}
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ top: "-5rem", left: "-5rem", width: "28rem", height: "28rem", background: "radial-gradient(closest-side, rgba(6,182,212,0.18), transparent 78%)", animationDelay: "0s" }}
      />
      <div
        className="nebula-blob animate-nebula -z-10"
        style={{ top: "10rem", right: "-2rem", width: "32rem", height: "32rem", background: "radial-gradient(closest-side, rgba(236,72,153,0.13), transparent 78%)", animationDelay: "3s" }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="animate-fade-in-up mb-10">
          <h1 className="text-shimmer text-4xl font-extrabold tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-zinc-300">
            Mis notas en el camino a aprender conceptos nuevos. Hoy estoy en la
            ruta de{" "}
            <span className="font-semibold text-cyan-300">Learn to Cloud</span>
            , pero también escribo sobre otras cosas que me parezcan
            interesantes.
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
