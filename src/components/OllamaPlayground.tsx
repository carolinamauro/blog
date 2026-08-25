"use client";
import { FormEvent, useState } from "react";

export default function OllamaPlayground() {
  const [prompt, setPrompt] = useState(
    "Dame un nombre original para una heladería. Respondé solo con el nombre.",
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanPrompt = prompt.trim();
    if (!cleanPrompt || isLoading) return;

    setIsLoading(true);
    setAnswers([]);
    setError("");

    try {
      async function runAttempt() {
        const response = await fetch("/api/ollama", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: cleanPrompt, temperature }),
          signal: AbortSignal.timeout(65_000),
        });
        const data = (await response.json()) as {
          answer?: string;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error ?? "No se pudo consultar Ollama.");
        }

        return data.answer ?? "El modelo no devolvió contenido.";
      }

      const results = await Promise.all([
        runAttempt(),
        runAttempt(),
        runAttempt(),
      ]);
      setAnswers(results);
    } catch (requestError) {
      setError(
        requestError instanceof DOMException && requestError.name === "TimeoutError"
          ? "La consulta tardó demasiado. Probá nuevamente."
          : requestError instanceof Error
          ? requestError.message
          : "Ocurrió un error inesperado.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="not-prose my-8 rounded-2xl border border-cyan-400/20 bg-black/50 p-5"
    >
      <label
        htmlFor="ollama-prompt"
        className="mb-2 block text-sm font-semibold text-cyan-200"
      >
        Probá el mismo prompt tres veces
      </label>
      <textarea
        id="ollama-prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        maxLength={2_000}
        rows={4}
        className="w-full resize-y rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/60"
        placeholder="Escribí tu pregunta..."
      />
      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="mb-2 flex items-center justify-between gap-4">
          <label
            htmlFor="ollama-temperature"
            className="text-sm font-semibold text-zinc-200"
          >
            Temperature
          </label>
          <output
            htmlFor="ollama-temperature"
            className="min-w-12 rounded-md bg-cyan-400/10 px-2 py-1 text-center font-mono text-sm font-bold text-cyan-200"
          >
            {temperature.toFixed(1)}
          </output>
        </div>
        <input
          id="ollama-temperature"
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={(event) => {
            setTemperature(Number(event.target.value));
            setAnswers([]);
          }}
          disabled={isLoading}
          className="w-full accent-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="mt-1 flex justify-between text-xs text-zinc-500">
          <span>0 · más estable</span>
          <span>2 · más creativo</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <span className="text-xs text-zinc-500">{prompt.length}/2000</span>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Ejecutando..." : "Ejecutar 3 intentos"}
        </button>
      </div>

      {answers.length > 0 && (
        <div
          aria-live="polite"
          className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-zinc-200"
        >
          <p className="mb-2 font-semibold text-cyan-200">
            temperature = {temperature.toFixed(1)}
          </p>
          <ol className="m-0 list-none space-y-1 p-0">
            {answers.map((answer, index) => (
              <li key={`${index}-${answer}`}>
                intento {index + 1}: {answer}
              </li>
            ))}
          </ol>
        </div>
      )}
      {error && (
        <p aria-live="polite" className="mt-4 text-sm text-rose-300">
          {error}
        </p>
      )}
    </form>
  );
}
