export default async (req) => {
  if (req.method !== "POST") {
    return Response.json(
      { error: "POST request required" },
      { status: 405 }
    );
  }

  try {
    const apiKey = process.env.MAGIC_HOUR_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "API key is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const duration = Number(body.duration || 3);

if (![3, 5, 10, 15].includes(duration)) {
  return Response.json(
    { error: "Invalid video duration." },
    { status: 400 }
  );
}

    if (!prompt || prompt.length > 2000) {
      return Response.json(
        { error: "Enter a prompt (maximum 2000 characters)." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.magichour.ai/v1/text-to-video",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "ETHIOPIA AI VIDEO",
          end_seconds: 3,
          aspect_ratio: "16:9",
          resolution: "480p",
          model: "ltx-2.5",
          audio: false,
          style: {
            prompt: prompt
          }
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: "Magic Hour request failed.", details: result },
        { status: response.status }
      );
    }

    return Response.json({
      success: true,
      id: result.id,
      credits_charged: result.credits_charged,
      message: "Video generation started."
    });

  } catch (error) {
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
};
