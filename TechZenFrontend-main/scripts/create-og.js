import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = process.cwd();
const logoPath = path.join(rootDir, "TechZenFrontend-main", "public", "TechZenLogo-white.png");
const logoBase64 = fs.readFileSync(logoPath).toString("base64");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      width: 1200px;
      height: 630px;
      background: #050811;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      overflow: hidden;
      color: #ffffff;
      position: relative;
    }
    .glow-1 {
      position: absolute;
      top: -100px;
      right: -80px;
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.32) 0%, rgba(2, 132, 199, 0) 70%);
      filter: blur(40px);
    }
    .glow-2 {
      position: absolute;
      bottom: -120px;
      left: -80px;
      width: 680px;
      height: 680px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(79, 70, 229, 0) 70%);
      filter: blur(50px);
    }
    .grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 44px 44px;
      mask-image: radial-gradient(circle at 60% 40%, black 45%, transparent 80%);
      -webkit-mask-image: radial-gradient(circle at 60% 40%, black 45%, transparent 80%);
    }
    .frame {
      position: absolute;
      inset: 24px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 28px;
      background: rgba(10, 16, 32, 0.78);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 46px 56px;
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo-img {
      height: 62px;
      object-fit: contain;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 9px 20px;
      border-radius: 9999px;
      background: rgba(14, 165, 233, 0.14);
      border: 1px solid rgba(56, 189, 248, 0.45);
      color: #38bdf8;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .badge-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 12px #38bdf8;
    }
    .main-content {
      margin-top: 10px;
    }
    .headline {
      font-size: 50px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.025em;
      color: #ffffff;
      margin-bottom: 16px;
    }
    .headline-accent {
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 55%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subheadline {
      font-size: 21px;
      line-height: 1.5;
      color: #94a3b8;
      max-width: 860px;
    }
    .chips {
      display: flex;
      gap: 12px;
      margin-top: 22px;
    }
    .chip {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      color: #cbd5e1;
      font-size: 14px;
      font-weight: 600;
    }
    .bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .url-text {
      color: #94a3b8;
      font-size: 19px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .url-highlight {
      color: #38bdf8;
      font-weight: 700;
    }
    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 15px 30px;
      background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
      color: #ffffff;
      font-size: 17px;
      font-weight: 800;
      letter-spacing: 0.01em;
      border-radius: 14px;
      box-shadow: 0 12px 28px -6px rgba(2, 132, 199, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.25);
    }
    .cta-arrow {
      font-size: 20px;
      font-weight: 800;
    }
  </style>
</head>
<body>
  <div class="glow-1"></div>
  <div class="glow-2"></div>
  <div class="grid"></div>

  <div class="frame">
    <div class="top-bar">
      <img src="data:image/png;base64,${logoBase64}" alt="TechZen" class="logo-img" />
      <div class="badge">
        <span class="badge-dot"></span>
        Enterprise IT Solutions &amp; Academy
      </div>
    </div>

    <div class="main-content">
      <h1 class="headline">
        Enterprise Software Engineering &amp; <br />
        <span class="headline-accent">Intelligent Cloud Architecture.</span>
      </h1>
      <p class="subheadline">
        Bespoke web applications, cloud infrastructure, AI solutions, and hands-on IT training academy driving measurable business growth.
      </p>

      <div class="chips">
        <span class="chip">Custom Software</span>
        <span class="chip">Cloud &amp; DevOps</span>
        <span class="chip">MERN Stack</span>
        <span class="chip">AI Solutions</span>
        <span class="chip">Industry Training</span>
      </div>
    </div>

    <div class="bottom-bar">
      <span class="url-text">www.<span class="url-highlight">techzen-it.com</span></span>
      <div class="cta-btn">
        <span>Explore Solutions &amp; Courses</span>
        <span class="cta-arrow">&rarr;</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const tempHtmlPath = path.join(rootDir, "TechZenFrontend-main", "scripts", "og-rendered.html");
fs.writeFileSync(tempHtmlPath, html, "utf8");

const outPngPath = path.join(rootDir, "TechZenFrontend-main", "public", "og-image.png");
const edgeExe = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const cmd = `powershell -Command "Start-Process -FilePath '${edgeExe}' -ArgumentList '--headless=new', '--screenshot=${outPngPath}', '--window-size=1200,630', '--hide-scrollbars', 'file:///${tempHtmlPath.replace(/\\\\/g, "/")}' -Wait"`;

console.log("Executing screenshot command...");
execSync(cmd, { stdio: "inherit" });
console.log("Screenshot successfully captured to:", outPngPath);
