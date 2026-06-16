import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Simulate real-time bot responses if API key is not configured yet
      const lastUserMessage = messages[messages.length - 1]?.text?.toLowerCase() || "";
      let simulatedReply = "I am running in local offline/simulated mode. To make me answer using live AI, configure the GEMINI_API_KEY in your .env.local file!";

      if (lastUserMessage.includes("hello") || lastUserMessage.includes("hi") || lastUserMessage.includes("hey")) {
        simulatedReply = "Hello! I am Jarobot, Jarosun's AI assistant. To make me respond in real-time, please configure the GEMINI_API_KEY in your .env.local file.";
      } else if (lastUserMessage.includes("service") || lastUserMessage.includes("what do you do") || lastUserMessage.includes("features")) {
        simulatedReply = "We build premium digital experiences: business websites, startup landings, e-commerce stores, custom dashboards, and intelligent chatbots. Let us know if you want to scale!";
      } else if (lastUserMessage.includes("contact") || lastUserMessage.includes("email") || lastUserMessage.includes("reach out")) {
        simulatedReply = "You can contact our team using the form below or email us directly at jarosuntechnologies@gmail.com. We'll get back to you shortly!";
      } else if (lastUserMessage.includes("price") || lastUserMessage.includes("cost") || lastUserMessage.includes("how much")) {
        simulatedReply = "Our pricing is tailored to the project size and complexity. Reach out via our contact section below with your requirements, and we'll provide a custom quote!";
      } else if (lastUserMessage.includes("portfolio") || lastUserMessage.includes("work") || lastUserMessage.includes("projects")) {
        simulatedReply = "We design high-performance sites and products with smooth animations, using modern frameworks. Check out our Work section above or email us to view our full portfolio!";
      }

      // Add a slight delay to simulate a real network request
      await new Promise((resolve) => setTimeout(resolve, 800));

      return NextResponse.json({
        reply: simulatedReply,
        simulated: true,
      });
    }

    // Format history for Google Gemini API
    // Gemini API expects "contents" with "role": "user" or "model", and "parts": [{"text": "..."}]
    const contents = messages.map((m) => {
      // Map bot to model
      const role = m.role === "user" ? "user" : "model";
      return {
        role,
        parts: [{ text: m.text }]
      };
    });

    const systemInstruction = {
      parts: [
        {
          text: "You are Jarobot, the custom AI assistant for Jarosun (a premium digital agency that designs and builds high-performance websites, custom dashboards, and custom chatbot integrations for startups and modern businesses). Keep your responses engaging, professional, and very brief (under 2-3 sentences). Always offer to help the user connect with the team via the contact form or jarosuntechnologies@gmail.com."
        }
      ]
    };

    // Use Gemini 2.5 Flash API endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        systemInstruction,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch response from Gemini AI." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that.";

    return NextResponse.json({
      reply: replyText.trim(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
