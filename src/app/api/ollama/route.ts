import { NextResponse } from "next/server";
import { Ollama } from "ollama";

export const runtime = "nodejs";

const MAX_PROMPT_LENGTH = 2_000;

function getUpstreamStatus(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "status_code" in error &&
    typeof error.status_code === "number" &&
    error.status_code >= 400 &&
    error.status_code <= 599
  ) {
    return error.status_code;
  }

  return 502;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "La solicitud no es válida." }, { status: 400 });
  }

  const requestData =
    typeof body === "object" && body !== null
      ? (body as { prompt?: unknown; temperature?: unknown })
      : {};
  const prompt = requestData.prompt;
  const temperature = requestData.temperature ?? 0;

  if (typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json({ error: "Escribí una pregunta." }, { status: 400 });
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `La pregunta no puede superar ${MAX_PROMPT_LENGTH} caracteres.` },
      { status: 400 },
    );
  }

  if (
    typeof temperature !== "number" ||
    !Number.isFinite(temperature) ||
    temperature < 0 ||
    temperature > 2
  ) {
    return NextResponse.json(
      { error: "temperature debe ser un número entre 0 y 2." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OLLAMA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta configurar OLLAMA_API_KEY para usar Ollama Cloud." },
      { status: 500 },
    );
  }

  try {
    const ollama = new Ollama({
      host: "https://ollama.com",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          signal: AbortSignal.timeout(60_000),
        }),
    });

    const response = await ollama.chat({
      model: process.env.OLLAMA_MODEL ?? "gpt-oss:20b",
      messages: [
        {
          role: "system",
          content: "Eres un asistente útil y respondes en español.",
        },
        { role: "user", content: prompt.trim() },
      ],
      stream: false,
      think: false,
      options: { temperature },
    });

    return NextResponse.json({
      answer: response.message.content || "El modelo no devolvió contenido.",
    });
  } catch (error) {
    const isTimeout =
      error instanceof DOMException && error.name === "TimeoutError";
    const status = isTimeout ? 504 : getUpstreamStatus(error);

    return NextResponse.json(
      {
        error:
          isTimeout
            ? "Ollama tardó más de 60 segundos en responder."
            : error instanceof Error
            ? error.message
            : "No se pudo conectar con Ollama Cloud.",
        upstreamStatus: status === 502 ? undefined : status,
      },
      { status },
    );
  }
}
