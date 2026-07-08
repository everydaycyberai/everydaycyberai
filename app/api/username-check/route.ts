import { NextRequest, NextResponse } from "next/server";

type PlatformResult = { platform: string; available: boolean | null; url: string };

async function checkGitHub(username: string): Promise<PlatformResult> {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: { "User-Agent": "EverydayCyberAI-UsernameChecker" },
    });
    return { platform: "GitHub", available: res.status === 404, url: `https://github.com/${username}` };
  } catch {
    return { platform: "GitHub", available: null, url: `https://github.com/${username}` };
  }
}

async function checkInstagram(username: string): Promise<PlatformResult> {
  try {
    const res = await fetch(`https://www.instagram.com/${encodeURIComponent(username)}/`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; EverydayCyberAI/1.0)" },
      redirect: "manual",
    });
    // Instagram returns 404 for genuinely free usernames; anything else likely means taken/blocked
    return { platform: "Instagram", available: res.status === 404, url: `https://instagram.com/${username}` };
  } catch {
    return { platform: "Instagram", available: null, url: `https://instagram.com/${username}` };
  }
}

async function checkYouTube(username: string): Promise<PlatformResult> {
  try {
    const res = await fetch(`https://www.youtube.com/@${encodeURIComponent(username)}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; EverydayCyberAI/1.0)" },
      redirect: "manual",
    });
    return { platform: "YouTube", available: res.status === 404, url: `https://youtube.com/@${username}` };
  } catch {
    return { platform: "YouTube", available: null, url: `https://youtube.com/@${username}` };
  }
}

async function checkX(username: string): Promise<PlatformResult> {
  try {
    const res = await fetch(`https://x.com/${encodeURIComponent(username)}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; EverydayCyberAI/1.0)" },
      redirect: "manual",
    });
    return { platform: "X (Twitter)", available: res.status === 404, url: `https://x.com/${username}` };
  } catch {
    return { platform: "X (Twitter)", available: null, url: `https://x.com/${username}` };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (!username || typeof username !== "string" || username.length < 2) {
      return NextResponse.json({ error: "Enter a valid username" }, { status: 400 });
    }

    const clean = username.trim().replace(/^@/, "");
    const results = await Promise.all([
      checkGitHub(clean),
      checkInstagram(clean),
      checkYouTube(clean),
      checkX(clean),
    ]);

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Username check error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
