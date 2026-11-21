import { getAllPostsMeta } from "../../../lib/posts";
import BlogList from "../../../components/BlogList";
import PageHeader from "../../../components/ui/PageHeader";

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string }>;
}) {
  const { category, tag } = await searchParams;
  const posts = getAllPostsMeta();

  return (
    <main className="relative min-h-screen px-5 pb-16 pt-32 sm:px-8">

      <div className="mx-auto max-w-4xl">
        <PageHeader eyebrow="Training log" title="Blog," accent="mis apuntes.">
          Mis notas en el camino a aprender conceptos nuevos. Hoy estoy en la
          ruta de <span className="mark font-semibold text-ink">Learn to Cloud</span>, pero también escribo sobre
          otras cosas que me parezcan interesantes.
        </PageHeader>

        <BlogList
          key={`${category ?? ""}|${tag ?? ""}`}
          posts={posts}
          initialCategory={category}
          initialTag={tag}
        />
      </div>
    </main>
  );
}
