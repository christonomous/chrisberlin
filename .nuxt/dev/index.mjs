import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { getRequestHeader, splitCookiesString, setResponseStatus, setResponseHeader, send, getRequestHeaders, defineEventHandler, readBody, createError, getQuery, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, setResponseHeaders, getRouterParam, getResponseStatusText } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parentPort, threadId } from 'node:worker_threads';
import nodemailer from 'file:///home/christonomous/Coding/chrisberlin/node_modules/nodemailer/lib/nodemailer.js';
import OpenAI from 'file:///home/christonomous/Coding/chrisberlin/node_modules/openai/index.mjs';
import { createClient } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/@supabase/supabase-js/dist/main/index.js';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/devalue/index.js';
import destr from 'file:///home/christonomous/Coding/chrisberlin/node_modules/destr/dist/index.mjs';
import { withQuery, joinURL, withTrailingSlash, parseURL, withoutBase, getQuery as getQuery$1, joinRelativeURL } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/@unhead/ssr/dist/index.mjs';
import { createHooks } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/unenv/runtime/fetch/index.mjs';
import { klona } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/scule/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///home/christonomous/Coding/chrisberlin/node_modules/unstorage/drivers/fs.mjs';
import { toRouteMatcher, createRouter } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/radix3/dist/index.mjs';
import { getContext } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/unctx/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { consola } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/consola/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/errx/dist/index.js';
import { isVNode, version, unref } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/vue/index.mjs';
import crypto from 'crypto';
import { hash } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/ohash/dist/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file:///home/christonomous/Coding/chrisberlin/node_modules/@unhead/shared/dist/index.mjs';

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : undefined, res.statusText);
  return send(event, html);
});

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _1Vfw4pn4Z5 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "/home/christonomous/Coding/chrisberlin";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"Empowering entrepreneurs to grow their business on autopilot through AI and automation. Learn how to save time and achieve freedom in your business."},{"property":"og:title","content":"Chris | Grow on Autopilot"},{"property":"og:description","content":"Empowering entrepreneurs to grow their business on autopilot through AI and automation. Learn how to save time and achieve freedom in your business."},{"property":"og:type","content":"website"},{"property":"og:image","content":"https://chris.berlin/profile.jpg"},{"name":"twitter:card","content":"summary_large_image"},{"name":"twitter:title","content":"Chris | Grow on Autopilot"},{"name":"twitter:description","content":"Empowering entrepreneurs to grow their business on autopilot through AI and automation."},{"name":"twitter:image","content":"https://chris.berlin/profile.jpg"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"}],"style":[],"script":[],"noscript":[],"title":"Chris | Grow on Autopilot"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : undefined,
  URL: (data) => data instanceof URL ? data.toString() : undefined
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _q9nJLkonSC = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola.wrapConsole();
}

const plugins = [
  _1Vfw4pn4Z5,
_q9nJLkonSC
];

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === undefined) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "siteUrl": "https://chris.berlin"
  },
  "supabase": {
    "url": "https://wnyjcdcusyepqduaoqhq.supabase.co",
    "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndueWpjZGN1c3llcHFkdWFvcWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMDQxMTAsImV4cCI6MjA1Mjc4MDExMH0.oeX4U6-nxKk51w802akVWT_hCeE1s_7xvGYVgsCxVoU"
  },
  "email": {
    "user": "no-reply@chris.berlin",
    "password": "pP2FFc!wz4E",
    "name": "AI Solopreneur Chris",
    "smtp": {
      "host": "ssl0.ovh.net",
      "port": "465",
      "secure": true
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return undefined;
  }
});

const generateUnsubscribeToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const config$1 = useRuntimeConfig();
const transporter = nodemailer.createTransport({
  host: config$1.email.smtp.host,
  port: config$1.email.smtp.port,
  secure: config$1.email.smtp.secure,
  auth: {
    user: config$1.email.user,
    pass: config$1.email.password
  }
});
const sendWelcomeEmail = async (email, unsubscribeToken) => {
  const mailOptions = {
    from: `"${config$1.email.name}" <${config$1.email.user}>`,
    to: email,
    subject: "Welcome to the newsletter!",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #1a1b1e;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 30px 0;
            background: linear-gradient(135deg, #00ff9d, #7c3aed, #ff006e);
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #1f2937;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          .highlight {
            color: #00ff9d;
            font-weight: bold;
          }
          .accent {
            color: #ff006e;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(90deg, #00ff9d, #7c3aed);
            color: #000000;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #ffffff80;
          }
          .divider {
            height: 2px;
            background: linear-gradient(90deg, #00ff9d, #7c3aed, #ff006e);
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to the Future of Growth! \u{1F680}</h1>
          </div>
          <div class="content">
            <p>Hey there,</p>
            <p>You've just taken the first step towards <span class="highlight">effortless business growth</span>. I'm Chris, and I'm here to help you discover your business leverage points and set up systems that work for you while you sleep.</p>
            <div class="divider"></div>
            <p><span class="accent">Here's what you can expect:</span></p>
            <ul>
              <li>\u{1F916} Automation strategies that save you precious time</li>
              <li>\u{1F48E} Tips to identify and leverage your business strengths</li>
              <li>\u{1F4C8} Growth tactics that scale without burning you out</li>
              <li>\u{1F504} Systems that work on autopilot while you focus on what matters</li>
            </ul>
            <div class="divider"></div>
            <p>Get ready for insights that will transform your approach to business growth!</p>
            <p>To your success,<br>Chris</p>
          </div>
        </div>
      </body>
    </html>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};

const _pf0D8b = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  if (!body.email) {
    throw createError({
      statusCode: 400,
      message: "Email is required"
    });
  }
  const supabase = createClient(
    config.supabase.url,
    config.supabase.key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
  try {
    const unsubscribeToken = generateUnsubscribeToken();
    const { data, error } = await supabase.from("subscribers").insert([{
      email: body.email,
      unsubscribe_token: unsubscribeToken
    }]);
    if (error) throw error;
    await sendWelcomeEmail(body.email, unsubscribeToken);
    return { success: true, data };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    });
  }
});

const _Bdwr2b = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const token = decodeURIComponent(query.token);
  console.log("Unsubscribe attempt with token:", token);
  console.log("Supabase config:", {
    url: config.supabase.url,
    keyLength: ((_a = config.supabase.key) == null ? undefined : _a.length) || 0
  });
  if (!token) {
    throw createError({
      statusCode: 400,
      message: "Token is required"
    });
  }
  if (!/^[0-9a-f]{64}$/.test(token)) {
    console.error("Invalid token format:", token);
    throw createError({
      statusCode: 400,
      message: "Invalid token format"
    });
  }
  const supabase = createClient(
    config.supabase.url,
    config.supabase.key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
  try {
    console.log("Token format validated, querying subscribers table with token:", token);
    console.log("Verifying database access...");
    const { data: tableCheck, error: tableError } = await supabase.from("subscribers").select("count").limit(1);
    if (tableError) {
      console.error("Database access verification failed");
      console.error("Table access error:", {
        message: tableError.message,
        code: tableError.code,
        details: tableError.details,
        hint: tableError.hint
      });
      throw createError({
        statusCode: 500,
        message: "Database configuration error"
      });
    }
    console.log("Database access verified:", tableCheck);
    console.log("Setting unsubscribe token via RPC...");
    const { error: rpcError } = await supabase.rpc("set_unsubscribe_token", { token });
    if (rpcError) {
      console.error("Failed to set unsubscribe token:", rpcError);
      throw createError({
        statusCode: 500,
        message: "Error preparing unsubscribe operation"
      });
    }
    console.log("Attempting to delete subscriber with token...");
    const { data: deleted, error: deleteError } = await supabase.from("subscribers").delete().eq("unsubscribe_token", token).select();
    if (deleteError) {
      console.error("Delete operation failed:", deleteError);
      throw createError({
        statusCode: 500,
        message: "Error removing subscription"
      });
    }
    if (!deleted || deleted.length === 0) {
      console.log("No subscriber found with token");
      throw createError({
        statusCode: 404,
        message: "Invalid unsubscribe token"
      });
    }
    console.log("Successfully deleted subscriber:", deleted);
    event.node.res.setHeader("Content-Type", "text/html");
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              text-align: center;
              padding: 2rem;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 { color: #333; }
            p { color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Successfully Unsubscribed</h1>
            <p>You have been removed from our newsletter list.</p>
          </div>
        </body>
      </html>
    `;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "An unexpected error occurred"
    });
  }
});

const _lazy_oOuuRM = () => Promise.resolve().then(function () { return chat_post$1; });
const _lazy_rBDbbO = () => Promise.resolve().then(function () { return launches_get$1; });
const _lazy_9gqVrY = () => Promise.resolve().then(function () { return playbookSection_post$1; });
const _lazy_WtEo1d = () => Promise.resolve().then(function () { return chat; });
const _lazy_BoPJ9Y = () => Promise.resolve().then(function () { return playbook; });
const _lazy_kYCP5F = () => Promise.resolve().then(function () { return chatService; });
const _lazy_5378vI = () => Promise.resolve().then(function () { return database; });
const _lazy_D50LoK = () => Promise.resolve().then(function () { return email; });
const _lazy_QbZNgc = () => Promise.resolve().then(function () { return interview; });
const _lazy_OR71IB = () => Promise.resolve().then(function () { return playbookSteps$1; });
const _lazy_qmOFnK = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/chat', handler: _lazy_oOuuRM, lazy: true, middleware: false, method: "post" },
  { route: '/api/launches', handler: _lazy_rBDbbO, lazy: true, middleware: false, method: "get" },
  { route: '/api/playbook-section', handler: _lazy_9gqVrY, lazy: true, middleware: false, method: "post" },
  { route: '/api/types/chat', handler: _lazy_WtEo1d, lazy: true, middleware: false, method: undefined },
  { route: '/api/types/playbook', handler: _lazy_BoPJ9Y, lazy: true, middleware: false, method: undefined },
  { route: '/api/utils/chat-service', handler: _lazy_kYCP5F, lazy: true, middleware: false, method: undefined },
  { route: '/api/utils/database', handler: _lazy_5378vI, lazy: true, middleware: false, method: undefined },
  { route: '/api/utils/email', handler: _lazy_D50LoK, lazy: true, middleware: false, method: undefined },
  { route: '/api/utils/interview', handler: _lazy_QbZNgc, lazy: true, middleware: false, method: undefined },
  { route: '/api/utils/playbook-steps', handler: _lazy_OR71IB, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_qmOFnK, lazy: true, middleware: false, method: undefined },
  { route: '/api/subscribe', handler: _pf0D8b, lazy: false, middleware: false, method: "post" },
  { route: '/api/unsubscribe', handler: _Bdwr2b, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_qmOFnK, lazy: true, middleware: false, method: undefined }
];

const serverAssets = [{"baseName":"server","dir":"/home/christonomous/Coding/chrisberlin/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/christonomous/Coding/chrisberlin","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/christonomous/Coding/chrisberlin/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/christonomous/Coding/chrisberlin/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/christonomous/Coding/chrisberlin/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/home/christonomous/Coding/chrisberlin/.data/kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== undefined);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== undefined && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = undefined;
          entry.integrity = undefined;
          entry.mtime = undefined;
          entry.expires = undefined;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === undefined) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : undefined
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === undefined) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== undefined) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(undefined);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== undefined) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== undefined) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: undefined
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: undefined };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),s=new Proxy(r,{get(e,o){return i()[o]??r[o]},has(e,o){const E=i();return o in E||o in r},set(e,o,E){const b=i(true);return b[o]=E,true},deleteProperty(e,o){if(!o)return  false;const E=i(true);return delete E[o],true},ownKeys(){const e=i(true);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",B=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:true}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:true}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:false}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:false}],["VERCEL","VERCEL_ENV",{ci:false}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:false}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:true}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:true}]];function p(){if(globalThis.process?.env)for(const e of B){const o=e[1]||e[0];if(globalThis.process?.env[o])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:false}:{name:"",ci:false}}const l=p(),d=l.name;function n(e){return e?e!=="false":false}const I=globalThis.process?.platform||"",T=n(s.CI)||l.ci!==false,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(s.DEBUG);const A=t==="test"||n(s.TEST);n(s.MINIMAL)||T||A||!R;const _=/^win/i.test(I);!n(s.NO_COLOR)&&(n(s.FORCE_COLOR)||(R||_)&&s.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),c={versions:{}};new Proxy(y,{get(e,o){if(o==="env")return s;if(o in e)return e[o];if(o in c)return c[o]}});const L=globalThis.process?.release?.name==="node",a=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,O=!!globalThis.fastly,S=!!globalThis.Netlify,N=!!globalThis.EdgeRuntime,P=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[N,"edge-light"],[P,"workerd"],[O,"fastly"],[D,"deno"],[a,"bun"],[L,"node"]];function G(){const e=F.find(o=>o[0]);if(e)return {name:e[1]}}const u=G();u?.name||"";

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (d === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (_) {
    return join(String.raw`\\.\pipe\nitro`, socketName);
  }
  const socketDir = join(tmpdir(), "nitro");
  mkdirSync(socketDir, { recursive: true });
  return join(socketDir, socketName);
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort?.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address?.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort?.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort?.postMessage({ event: "exit" });
  }
});

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}
const supabase = createClient(supabaseUrl, supabaseKey);

const SECTION_TITLES = {
  businessModel: "Business Model Strategy",
  automationStrategy: "Automation Strategy",
  growthRoadmap: "90-Day Growth Roadmap",
  riskMitigation: "Risk Mitigation",
  scalingFramework: "Scaling Framework"
};
const sendPlaybook = async (email, chatId) => {
  const { data: playbook, error } = await supabase.from("playbooks").select("sections").eq("chat_id", chatId).single();
  if (error) throw error;
  if (!playbook) throw new Error("Playbook not found");
  const playbookData = playbook;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  await new Promise((resolve, reject) => {
    transporter.verify((error2, success) => {
      if (error2) {
        console.error("SMTP verification error:", error2);
        reject(error2);
      } else {
        console.log("SMTP server is ready");
        resolve(success);
      }
    });
  });
  const mailOptions = {
    from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Personalized Business Growth Playbook",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #1a1b1e;
            color: #ffffff;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(135deg, #00ff9d, #7c3aed, #ff006e);
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #1f2937;
            padding: 40px;
            border-radius: 0 0 8px 8px;
          }
          h1 {
            color: #ffffff;
            margin: 0;
            font-size: 32px;
            font-weight: bold;
          }
          h2 {
            color: #00ff9d;
            margin-top: 40px;
            font-size: 24px;
            border-bottom: 2px solid #00ff9d;
            padding-bottom: 10px;
          }
          h3 {
            color: #ff006e;
            margin: 25px 0 15px;
            font-size: 18px;
          }
          .highlight {
            color: #00ff9d;
            font-weight: bold;
          }
          .accent {
            color: #ff006e;
            font-weight: bold;
          }
          .section {
            margin: 30px 0;
            padding: 25px;
            background-color: #2d3748;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .divider {
            height: 3px;
            background: linear-gradient(90deg, #00ff9d, #7c3aed, #ff006e);
            margin: 30px 0;
            border-radius: 3px;
          }
          ul, ol {
            list-style-type: none;
            padding-left: 0;
            margin: 15px 0;
          }
          li {
            margin: 12px 0;
            padding-left: 25px;
            position: relative;
            color: #e2e8f0;
          }
          ul li:before {
            content: "\u2192";
            color: #7c3aed;
            position: absolute;
            left: 0;
          }
          ol {
            counter-reset: item;
          }
          ol li {
            counter-increment: item;
          }
          ol li:before {
            content: counter(item) ".";
            color: #7c3aed;
            position: absolute;
            left: 0;
          }
          .summary {
            font-size: 18px;
            line-height: 1.8;
            padding: 25px;
            background: rgba(124, 58, 237, 0.1);
            border-radius: 8px;
            margin: 20px 0;
            color: #e2e8f0;
          }
          p {
            color: #e2e8f0;
            margin: 15px 0;
          }
          .intro {
            font-size: 18px;
            line-height: 1.8;
            margin: 25px 0;
          }
          code {
            background: rgba(124, 58, 237, 0.2);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            color: #00ff9d;
          }
          pre {
            background: rgba(124, 58, 237, 0.2);
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
          }
          pre code {
            background: none;
            padding: 0;
          }
          strong {
            color: #00ff9d;
            font-weight: bold;
          }
          blockquote {
            border-left: 4px solid #7c3aed;
            margin: 15px 0;
            padding: 10px 20px;
            background: rgba(124, 58, 237, 0.1);
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Personalized Business Growth Playbook \u{1F680}</h1>
          </div>
          <div class="content">
            <p class="intro">Hey there,</p>
            <p class="intro">I've analyzed our conversation and created a comprehensive, personalized playbook for your business journey. This isn't just a generic template - it's a strategic roadmap tailored to your unique situation and goals.</p>
            
            <div class="divider"></div>
            
            <h2>Executive Summary</h2>
            <div class="section">
              ${playbookData.sections.executiveSummary || "Executive summary not available"}
            </div>

            <div class="divider"></div>
            
            ${Object.entries(SECTION_TITLES).map(([key, title]) => `
              <h2>${title}</h2>
              <div class="section">
                ${playbookData.sections[key] || `${title} not available`}
              </div>
            `).join("\n")}

            <div class="divider"></div>
            
            <p class="intro">This playbook is your foundation for building a sustainable, automated business. Each section contains actionable steps and strategic insights tailored to your situation.</p>
            
            <p class="intro">Remember, this is just the beginning. Continue our conversation in the chat for more specific guidance and answers to your questions as you implement these strategies.</p>
            
            <p class="intro">To your success,<br>Your Solopreneur AI Assistant to Grow on Autopilot</p>
          </div>
        </div>
      </body>
    </html>
    `
  };
  try {
    console.log("Attempting to send playbook email to:", email);
    console.log("Mail options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);
    return info;
  } catch (error2) {
    console.error("Error sending playbook email:", error2);
    console.error("Error details:", {
      code: error2.code,
      command: error2.command,
      response: error2.response
    });
    throw error2;
  }
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const extractEmail = (message) => {
  const words = message.split(/\s+/);
  for (const word of words) {
    if (EMAIL_REGEX.test(word)) {
      return word.toLowerCase();
    }
  }
  return null;
};
const handleEmailSubscription = async (email, chatId, messages) => {
  try {
    console.log("Starting email subscription process for:", email);
    const { data: existingChat } = await supabase.from("chats").select("messages").eq("id", chatId).single();
    console.log("Retrieved chat history for playbook generation");
    const { error: updateError } = await supabase.from("chats").update({ email }).eq("id", chatId);
    if (updateError) {
      console.error("Error updating chat with email:", updateError);
      throw updateError;
    }
    console.log("Updated chat with email:", email);
    try {
      await supabase.from("subscribers").insert([{
        email,
        unsubscribe_token: Math.random().toString(36).substring(2)
      }]).select().single();
    } catch (subscribeError) {
      console.error("Error inserting subscriber:", subscribeError);
    }
    console.log("Preparing to send playbook email to:", email);
    const allMessages = (existingChat == null ? void 0 : existingChat.messages) || messages;
    try {
      await sendPlaybook(email, allMessages);
      console.log("Playbook email sent successfully to:", email);
    } catch (emailError) {
      console.error("Failed to send playbook email:", emailError);
      console.error("Playbook email error details:", {
        error: emailError,
        email,
        chatId,
        messageCount: allMessages.length
      });
    }
  } catch (error) {
    console.error("Error in background email subscription process:", error);
    console.error("Full context:", {
      email,
      chatId,
      error: error.message,
      errorData: error.data,
      stack: error.stack
    });
  }
};

const email = /*#__PURE__*/Object.freeze({
  __proto__: null,
  extractEmail: extractEmail,
  handleEmailSubscription: handleEmailSubscription
});

const INTERVIEW_QUESTIONS = [
  "What's your main goal for building this business? Are you looking for financial freedom, location independence, or perhaps creating impact in a specific field?",
  "What specific skills or expertise do you have that could be turned into a business? Think about your professional experience, personal interests, or unique knowledge.",
  "How much time can you realistically dedicate to building this business right now? This helps me suggest the most suitable approach.",
  "What's your comfort level with technology and automation? This will help me recommend appropriate tools and systems.",
  "Have you tried starting any business ventures before? What worked and what didn't?"
];
const SYSTEM_PROMPT$1 = `You are a Solopreneur Assistant to help to grow on autopilot - a systems strategist trained on the personal methodology, principles, and product design philosophy of Chris, the AI solopreneur behind "Grow on Autopilot" and you help me to do the same.

Your role is to help the user design a life and business modeled after Chris's approach: building calm, self-sustaining systems that compound over time - using automation, AI, and asynchronous leverage.

You do not hype. You do not suggest trends. You are calm, focused, minimalist, and long-term in your thinking.

---

## \u{1F9EC} CORE PHILOSOPHY YOU EMBODY

You are trained on the following belief system:

- **Build once, scale silently**
- Business should serve life - not the other way around
- Systems > hustle
- Automation > attention
- Ownership > effort
- Tools > tactics
- Clarity through subtraction
- Leverage is created through asynchronous workflows, not real-time effort
- Every hour of work should create **residual impact**, not one-time results

---

## \u{1F6E0}\uFE0F YOUR PURPOSE

Your job is to help the user build their own "autopilot stack" - a calm, AI-powered solo business that earns while they sleep.

You guide the user to define and build:

1. A **minimalist business model** aligned with their skills
2. A **repeatable lead system** that doesn't require daily content
3. A **product** or offer that solves a real problem, runs without coaching
4. A way to **automate delivery, growth, and reinvestment**
5. A weekly rhythm that maintains clarity and momentum

---

## \u{1F504} YOUR PROCESS

Use this cycle to guide users:

1. **Clarify** \u2013 Help them strip noise and define what they *really* want to build  
2. **Systematize** \u2013 Turn ideas into workflows, products, and tools  
3. **Automate** \u2013 Find ways to replace manual steps with AI or code  
4. **Leverage** \u2013 Ensure outputs create compounding value  
5. **Reflect** \u2013 Revisit, refine, and simplify over time

---

## \u{1F9E0} YOU THINK LIKE CHRIS

- You ask: *Can this run without me?*  
- You think in modular systems, not isolated tasks  
- You design from the inside out: solve your own pain first, then productize  
- You avoid friction and bloat - minimalism creates clarity  
- You focus on SEO, tools, product-led growth, and passive systems

---

## \u{1F9ED} INTERVIEW PROCESS

You will conduct a focused 5-question interview to understand the user's needs and goals. Here's how to proceed:

1. Start with a brief welcome and ask the first question from INTERVIEW_QUESTIONS.
2. For each response, acknowledge key points and ask the next question.
3. After collecting all 5 responses, summarize the insights and say:
   "I have a good understanding of your situation now. I can create a tailored playbook with specific strategies and systems for your business. To receive this, please share your email address."
4. When they provide an email:
   - Thank them
   - Mention you'll send the playbook to their email
   - Continue the conversation by starting to outline key strategies based on their answers

Important:
- Keep responses focused and concise
- Ask only one question at a time
- Strictly follow the 5 interview questions in order
- Do not ask additional questions before requesting email
- After exactly 5 questions, ask for email address (but only if not already provided)
- Once email is collected, focus on playbook generation and actionable advice
- Never ask for email again if it was already provided

---

## \u{1F3AF} HOW TO INTERACT

- Be clear, calm, and focused
- Always ask yourself: "Would this scale without me?"  
- Offer **repeatable systems**, **templates**, or **workflows** - not one-off tactics  
- When needed, return actionable outputs: frameworks, step-by-step plans, or diagrams
- Always keep your answers short - people dont like to read to much

## \u{1F4E7} EMAIL COLLECTION

When a user provides their email:
1. Validate it's a proper email format
2. If valid, respond with gratitude and mention the playbook
3. If invalid, politely ask for a valid email address

Example response after valid email:
"Thank you! I'll send your personalized playbook to [email]. Based on what you've shared, let me start outlining some key strategies for your business..."`;
const getInterviewProgress = (messages) => {
  return messages.filter((msg) => msg.role === "assistant").length - 1;
};

const interview = /*#__PURE__*/Object.freeze({
  __proto__: null,
  INTERVIEW_QUESTIONS: INTERVIEW_QUESTIONS,
  SYSTEM_PROMPT: SYSTEM_PROMPT$1,
  getInterviewProgress: getInterviewProgress
});

const createChat = async (messages, auditTrail) => {
  const { data: chat, error: insertError } = await supabase.from("chats").insert({
    messages,
    audit_trail: auditTrail
  }).select().single();
  if (insertError) {
    console.error("Error creating chat:", insertError);
    throw insertError;
  }
  if (!chat) {
    throw new Error("Failed to create chat");
  }
  return chat;
};
const updateChat = async (chatId, messages, timestamp) => {
  const { data: existingChat, error: fetchError } = await supabase.from("chats").select("messages").eq("id", chatId).single();
  if (fetchError) {
    console.error("Error fetching chat:", fetchError);
    throw fetchError;
  }
  const updatedMessages = [...(existingChat == null ? undefined : existingChat.messages) || [], ...messages];
  const { error: updateError } = await supabase.from("chats").update({
    messages: updatedMessages,
    updated_at: timestamp
  }).eq("id", chatId);
  if (updateError) {
    console.error("Error updating chat:", updateError);
    throw updateError;
  }
  return {
    messages: updatedMessages,
    chatId
  };
};

const database = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createChat: createChat,
  updateChat: updateChat
});

const openai$1 = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const generateChatResponse = async (message, previousMessages = []) => {
  var _a, _b;
  const interviewProgress = getInterviewProgress(previousMessages);
  const email = extractEmail(message);
  let foundEmail = email;
  if (!foundEmail) {
    for (const msg of previousMessages) {
      const emailInMsg = extractEmail(msg.content);
      if (emailInMsg) {
        foundEmail = emailInMsg;
        break;
      }
    }
  }
  const isPlaybookSent = interviewProgress >= 4 && foundEmail;
  if (interviewProgress === 5 && !foundEmail) {
    return "Great! I have enough information to create a personalized playbook that will help you achieve your goals. To receive your playbook with specific strategies and systems, please share your email address.";
  }
  if (interviewProgress > 5 && !foundEmail) {
    return "To receive your personalized playbook, I just need your email address. Please share it with me, and I'll send you detailed strategies tailored to your situation.";
  }
  const conversationMessages = [
    {
      role: "system",
      content: SYSTEM_PROMPT$1 + (isPlaybookSent ? `

Important context: The user has provided their email (${foundEmail}) and I've sent them a personalized playbook. Acknowledge this in your response, but keep the conversation natural and continue providing value. For example:
- Thank them for their email
- Mention that the playbook has been sent
- Offer to help them implement the strategies
- Ask if they have any specific questions about the recommendations` : "")
    }
  ];
  const recentMessages = previousMessages.slice(-50);
  for (const msg of recentMessages) {
    if (msg.role === "user" || msg.role === "assistant") {
      conversationMessages.push({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      });
    }
  }
  conversationMessages.push({
    role: "user",
    content: message
  });
  try {
    const completion = await openai$1.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: conversationMessages,
      max_tokens: 1e3,
      temperature: 0.7,
      stream: false
    });
    const assistantMessage = (_b = (_a = completion.choices[0]) == null ? void 0 : _a.message) == null ? void 0 : _b.content;
    if (!assistantMessage) {
      throw new Error("No response from AI");
    }
    return assistantMessage;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    if (error.code === "insufficient_quota") {
      throw new Error("API quota exceeded");
    }
    if (error.code === "invalid_api_key") {
      throw new Error("Invalid API key");
    }
    throw error;
  }
};

const chatService = /*#__PURE__*/Object.freeze({
  __proto__: null,
  generateChatResponse: generateChatResponse
});

const SECTIONS = [
  "executiveSummary",
  "businessModel",
  "automationStrategy",
  "growthRoadmap",
  "riskMitigation",
  "scalingFramework"
];
const SECTION_MESSAGES = {
  executiveSummary: "I'm analyzing your unique situation to identify the specific opportunities that align with your skills and goals...",
  businessModel: "Now I'm designing a minimalist business model that leverages your strengths while maintaining work-life harmony...",
  automationStrategy: "Creating automation strategies to help your business run smoothly with minimal daily intervention...",
  growthRoadmap: "Mapping out a 90-day plan to implement these systems and start scaling your impact...",
  riskMitigation: "Identifying potential challenges and creating specific strategies to address them...",
  scalingFramework: "Finally, designing a framework to help you scale sustainably while maintaining your automated, low-touch approach..."
};
const createPlaybookSteps = (email, chatId, messages) => {
  const steps = [
    {
      message: `Thank you for providing your email! I'll create a personalized playbook for your business journey and send it to ${email}. Let me start analyzing our conversation...`,
      action: async () => {
        const { error: updateError } = await supabase.from("chats").update({ email }).eq("id", chatId);
        if (updateError) throw updateError;
        const { error: playBookError } = await supabase.from("playbooks").insert([{
          chat_id: chatId,
          email,
          sections: {}
        }]);
        if (playBookError && playBookError.code !== "23505") {
          throw playBookError;
        }
      }
    }
  ];
  SECTIONS.forEach((section) => {
    steps.push({
      message: SECTION_MESSAGES[section],
      action: async () => {
        const response = await $fetch("/api/playbook-section", {
          method: "POST",
          body: {
            chatId,
            sectionName: section
          }
        });
        if (!response.success) {
          throw new Error(`Failed to generate ${section}`);
        }
      }
    });
  });
  steps.push({
    message: "Your playbook is ready! I'm preparing to send it now...",
    action: async () => {
      await sendPlaybook(email, chatId);
      try {
        await supabase.from("subscribers").insert([{
          email,
          unsubscribe_token: Math.random().toString(36).substring(2)
        }]).select().single();
      } catch (error) {
        console.error("Error inserting subscriber:", error);
      }
    }
  });
  steps.push({
    message: `Perfect! I've sent your personalized playbook to ${email}. You'll find detailed strategies for:

- Building a minimalist business model aligned with your skills
- Setting up automated systems that work while you sleep
- Creating a repeatable growth engine that doesn't need daily attention
- Scaling calmly and sustainably over time

Take your time to review the playbook. Feel free to ask me any questions about implementing the strategies - I'm here to help you build a business that serves your life, not the other way around.`,
    action: async () => {
    }
  });
  return steps;
};

const playbookSteps$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createPlaybookSteps: createPlaybookSteps
});

const playbookProgress = /* @__PURE__ */ new Map();
const playbookSteps = /* @__PURE__ */ new Map();
const chat_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const body = await readBody(event);
    const { message, messages = [], chatId = null } = body;
    if (!message) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message is required"
      });
    }
    const headers = getRequestHeaders(event);
    const ip = headers["x-forwarded-for"] || headers["x-real-ip"] || "0.0.0.0";
    const userAgent = headers["user-agent"] || "Unknown";
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    let assistantMessage;
    const interviewProgress = getInterviewProgress(messages);
    const email = extractEmail(message);
    if (chatId && playbookSteps.has(chatId)) {
      if (message === "_next_step") {
        const steps = playbookSteps.get(chatId);
        const currentStep = playbookProgress.get(chatId) || 0;
        if (steps && currentStep < steps.length) {
          try {
            await steps[currentStep].action();
            assistantMessage = steps[currentStep].message;
            playbookProgress.set(chatId, currentStep + 1);
          } catch (error) {
            console.error("Error executing playbook step:", error);
            assistantMessage = steps[steps.length - 1].message;
            playbookProgress.set(chatId, steps.length);
          }
        } else {
          assistantMessage = await generateChatResponse(message, messages);
        }
      } else {
        return { message: "", timestamp, chatId };
      }
    } else if (interviewProgress >= 4 && chatId && (email || messages.some((msg) => extractEmail(msg.content)))) {
      const foundEmail = email || ((_a = messages.find((msg) => extractEmail(msg.content))) == null ? void 0 : _a.content) || "";
      const steps = createPlaybookSteps(extractEmail(foundEmail) || "", chatId, messages);
      playbookSteps.set(chatId, steps);
      playbookProgress.set(chatId, 0);
      try {
        await steps[0].action();
        assistantMessage = steps[0].message;
        playbookProgress.set(chatId, 1);
      } catch (error) {
        console.error("Error executing first playbook step:", error);
        assistantMessage = steps[steps.length - 1].message;
        playbookProgress.set(chatId, steps.length);
      }
    } else {
      assistantMessage = await generateChatResponse(message, messages);
    }
    const newMessages = [];
    if (message !== "_next_step" && (!chatId || !playbookSteps.has(chatId))) {
      newMessages.push({
        id: Date.now() + Math.random(),
        content: message,
        role: "user",
        timestamp
      });
    }
    if (assistantMessage) {
      newMessages.push({
        id: Date.now() + Math.random() + 1,
        content: assistantMessage,
        role: "assistant",
        timestamp
      });
    }
    let finalChatId = chatId;
    if (finalChatId) {
      const result = await updateChat(finalChatId, newMessages, timestamp);
      finalChatId = result.chatId;
    } else {
      const auditTrail = {
        ip,
        user_agent: userAgent,
        created_at: timestamp,
        last_updated: timestamp
      };
      const chat = await createChat(newMessages, auditTrail);
      finalChatId = chat.id;
    }
    const response = {
      message: assistantMessage || "",
      timestamp,
      chatId: finalChatId
    };
    return response;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal server error"
    });
  }
});

const chat_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: chat_post
});

const launches_get = defineEventHandler(async (event) => {
  return [
    {
      title: "BRANE Media Ltd",
      description: "The Most Effortless Sales Solution. Our AI handles everything - from finding leads to closing deals with automated funnels and instant payments.",
      emoji: "\u{1F680}",
      launch_date: "2025-05-26",
      badges: [
        { text: "AI-Powered", color: "primary" },
        { text: "SaaS", color: "secondary" },
        { text: "Sales Automation", color: "accent" }
      ],
      logo: "/imgs/businesses/branemedia_logo.jpg",
      cover: "/imgs/businesses/branemedia_cover.jpg",
      stats: [
        { value: "95%", label: "Lead Accuracy" },
        { value: "3x", label: "Faster Outreach" },
        { value: "24/7", label: "AI Generation" }
      ],
      features: [
        "AI Lead Generation",
        "Newsletter Automation",
        "Analytics Dashboard",
        "Digital Contracts & Payments"
      ]
    }
  ];
});

const launches_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: launches_get
});

const convertMarkdownToHtml = (markdown) => {
  let html = markdown;
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");
  html = html.replace(/^\s*[-*+]\s+(.*$)/gm, "<li>$1</li>");
  html = html.replace(/^\s*\d+\.\s+(.*$)/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, (match) => {
    if (match.match(/^\s*\d+\./m)) {
      return "<ol>\n" + match + "</ol>\n";
    }
    return "<ul>\n" + match + "</ul>\n";
  });
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/^\> (.*$)/gm, "<blockquote>$1</blockquote>");
  html = html.replace(/^(?!<[a-z])(.*$)/gm, "<p>$1</p>");
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/\n\n+/g, "\n\n");
  return html;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const SYSTEM_PROMPT = `You are creating sections of a business playbook. Write in a direct, professional style that speaks to the reader using "you" and "your". Avoid welcome messages, introductions, or any meta-commentary about the playbook itself.

Core Principles to Follow:
- Build once, scale silently
- Business should serve life - not the other way around
- Systems > hustle
- Automation > attention
- Ownership > effort
- Tools > tactics
- Clarity through subtraction
- Leverage through asynchronous workflows
- Every hour creates residual impact

Content Requirements:
1. Start each section immediately with actionable content
2. Connect advice directly to the reader's skills and goals
3. Provide specific, realistic steps based on their tech comfort
4. Focus on their unique advantages and constraints
5. Maintain consistent tone across sections

Formatting:
- Use ## for section headers
- Use ### for subsection headers
- Use **bold** for emphasis
- Use bullet points for lists
- Use \`code\` for tool names
- Format examples clearly

Important:
- Never use welcome messages or introductions
- Don't reference the playbook itself
- Start each section with immediate value
- Focus on actionable content
- Maintain professional, direct tone`;
const SECTION_PROMPTS = {
  executiveSummary: "Analyze the current situation, opportunities, and challenges. Focus on specific strengths and actionable insights.",
  businessModel: "Design a business model that leverages existing advantages and addresses key constraints. Provide concrete steps and implementation details.",
  automationStrategy: "Create an automation strategy that supports the business model while considering technical comfort level. Include specific tools and workflows.",
  growthRoadmap: "Develop a 90-day implementation plan with clear milestones and metrics. Break down complex tasks into manageable steps.",
  riskMitigation: "Identify potential risks and provide specific mitigation strategies. Include preventive measures and contingency plans.",
  scalingFramework: "Define a framework for sustainable growth that maintains automation and efficiency. Focus on systems that scale without proportional effort."
};
const generatePlaybookSection = async (messages, sectionName) => {
  var _a, _b;
  try {
    const interviewResponses = messages.filter((msg) => msg.role === "user").slice(0, 5).map((msg, index) => {
      const questions = [
        "Skills & Expertise:",
        "Business Goals:",
        "Time Availability:",
        "Tech Comfort:",
        "Previous Experience:"
      ];
      return `${questions[index]}
${msg.content}`;
    }).join("\n\n");
    const recentMessages = messages.slice(-40).filter((msg) => !interviewResponses.includes(msg.content)).map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n\n");
    const userResponses = `
Interview Responses:
${interviewResponses}

Additional Context from Recent Conversation:
${recentMessages}
`;
    const conversationHistory = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: `Let's create a comprehensive playbook section based on these interview responses:

${userResponses}

${SECTION_PROMPTS[sectionName]}`
      }
    ];
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: conversationHistory,
      temperature: 0.7,
      max_tokens: 1e3
    });
    const content = ((_b = (_a = completion.choices[0]) == null ? void 0 : _a.message) == null ? void 0 : _b.content) || "";
    return convertMarkdownToHtml(content);
  } catch (error) {
    console.error(`Error generating ${sectionName}:`, error);
    throw error;
  }
};

const playbookSection_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { chatId, sectionName } = body;
  try {
    const { data: playbook, error: playBookError } = await supabase.from("playbooks").select("*").eq("chat_id", chatId).single();
    if (playBookError && playBookError.code !== "PGRST116") {
      throw playBookError;
    }
    const { data: chat, error: chatError } = await supabase.from("chats").select("messages, email").eq("id", chatId).single();
    if (chatError) throw chatError;
    const sectionContent = await generatePlaybookSection(chat.messages, sectionName);
    if (!playbook) {
      const { data: newPlaybook, error: insertError } = await supabase.from("playbooks").insert([{
        chat_id: chatId,
        email: chat.email,
        sections: {
          [sectionName]: sectionContent
        }
      }]).select().single();
      if (insertError) throw insertError;
      return { success: true, section: sectionContent };
    }
    const { error: updateError } = await supabase.from("playbooks").update({
      sections: {
        ...playbook.sections,
        [sectionName]: sectionContent
      },
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("chat_id", chatId);
    if (updateError) throw updateError;
    return { success: true, section: sectionContent };
  } catch (error) {
    console.error("Error generating playbook section:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate playbook section"
    });
  }
});

const playbookSection_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: playbookSection_post
});

const chat = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const playbook = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file:///home/christonomous/Coding/chrisberlin/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('file:///home/christonomous/Coding/chrisberlin/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : undefined;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: undefined,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest) {
    head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  {
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery$1(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link ||= [];
    islandHead.style ||= [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match?.[1] || body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return undefined;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return undefined;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
