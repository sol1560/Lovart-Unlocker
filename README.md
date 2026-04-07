# Lovart Unlocker

A Chrome extension that unlocks timezone-gated features (like Seedance 2.0) on [lovart.ai](https://www.lovart.ai/) by spoofing your browser timezone to UTC+8 — no need to change your system settings.

## Why?

Lovart gates access to certain features (e.g. Seedance 2.0) based on the browser's timezone. Their support team confirmed that setting the device timezone to UTC+8 is required to unlock these features — even for paying Pro/Ultimate subscribers.

Rather than changing your system timezone (which affects all applications), this extension spoofs the timezone **only** on lovart.ai, leaving everything else untouched.

## How it works

The extension injects a script into the page context (`MAIN` world) before any page JavaScript runs. It overrides:

- `Date.prototype.getTimezoneOffset()` → returns `-480` (UTC+8)
- `Intl.DateTimeFormat` → defaults to `Asia/Shanghai`
- All local `Date` getters/setters (`getHours`, `getFullYear`, etc.) → compute using UTC+8 offset

## Install

1. Download or clone this repo
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select this folder
5. Visit [lovart.ai](https://www.lovart.ai/) — done

## Verify

Open DevTools console on lovart.ai:

```js
new Date().getTimezoneOffset()                    // -480
Intl.DateTimeFormat().resolvedOptions().timeZone   // "Asia/Shanghai"
```

---

# Lovart Unlocker

一个 Chrome 扩展，通过将浏览器时区伪装为 UTC+8，解锁 [lovart.ai](https://www.lovart.ai/) 上被时区限制的功能（如 Seedance 2.0）——无需更改系统设置。

## 为什么需要这个？

Lovart 根据浏览器时区来限制部分功能的访问（例如 Seedance 2.0）。官方客服确认，即使是 Pro/Ultimate 付费用户，也需要将设备时区设置为 UTC+8 才能使用这些功能。

与其更改系统时区（会影响所有应用），不如用这个扩展 **仅在 lovart.ai 上** 伪装时区，其他网站完全不受影响。

## 原理

扩展在页面 JavaScript 执行之前，向页面上下文（`MAIN` world）注入脚本，覆盖以下 API：

- `Date.prototype.getTimezoneOffset()` → 返回 `-480`（UTC+8）
- `Intl.DateTimeFormat` → 默认使用 `Asia/Shanghai`
- 所有本地时间的 `Date` 方法（`getHours`、`getFullYear` 等）→ 按 UTC+8 偏移计算

## 安装

1. 下载或克隆本仓库
2. 在 Chrome 中打开 `chrome://extensions`
3. 开启右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**，选择本文件夹
5. 访问 [lovart.ai](https://www.lovart.ai/) 即可

## 验证

在 lovart.ai 上打开开发者工具控制台：

```js
new Date().getTimezoneOffset()                    // -480
Intl.DateTimeFormat().resolvedOptions().timeZone   // "Asia/Shanghai"
```
