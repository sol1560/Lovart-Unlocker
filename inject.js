// Spoof timezone to UTC+8 (Asia/Shanghai)
// Target offset in minutes: -480 (UTC+8)
(function () {
  "use strict";

  const TARGET_OFFSET = -480; // UTC+8
  const TARGET_TZ = "Asia/Shanghai";

  // Save originals
  const OrigDate = Date;
  const origGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  const origGetTime = Date.prototype.getTime;
  const origToString = Date.prototype.toString;
  const origToDateString = Date.prototype.toDateString;
  const origToTimeString = Date.prototype.toTimeString;

  // Helper: get a Date shifted to UTC+8 local values
  function toTarget(date) {
    const utcMs = origGetTime.call(date);
    return new OrigDate(utcMs + (-TARGET_OFFSET) * 60000);
  }

  // getTimezoneOffset
  Date.prototype.getTimezoneOffset = function () {
    return TARGET_OFFSET;
  };

  // Local time getters — return UTC+8 values
  Date.prototype.getFullYear = function () {
    return toTarget(this).getUTCFullYear();
  };
  Date.prototype.getMonth = function () {
    return toTarget(this).getUTCMonth();
  };
  Date.prototype.getDate = function () {
    return toTarget(this).getUTCDate();
  };
  Date.prototype.getDay = function () {
    return toTarget(this).getUTCDay();
  };
  Date.prototype.getHours = function () {
    return toTarget(this).getUTCHours();
  };
  Date.prototype.getMinutes = function () {
    return toTarget(this).getUTCMinutes();
  };
  Date.prototype.getSeconds = function () {
    return toTarget(this).getUTCSeconds();
  };
  Date.prototype.getMilliseconds = function () {
    return toTarget(this).getUTCMilliseconds();
  };

  // Local time setters — adjust for UTC+8 offset
  Date.prototype.setFullYear = function (y, m, d) {
    const t = toTarget(this);
    if (d !== undefined) t.setUTCFullYear(y, m, d);
    else if (m !== undefined) t.setUTCFullYear(y, m);
    else t.setUTCFullYear(y);
    const newUtcMs = t.getTime() - (-TARGET_OFFSET) * 60000;
    this.setTime(newUtcMs);
    return this.getTime();
  };
  Date.prototype.setMonth = function (m, d) {
    const t = toTarget(this);
    if (d !== undefined) t.setUTCMonth(m, d);
    else t.setUTCMonth(m);
    const newUtcMs = t.getTime() - (-TARGET_OFFSET) * 60000;
    this.setTime(newUtcMs);
    return this.getTime();
  };
  Date.prototype.setDate = function (d) {
    const t = toTarget(this);
    t.setUTCDate(d);
    const newUtcMs = t.getTime() - (-TARGET_OFFSET) * 60000;
    this.setTime(newUtcMs);
    return this.getTime();
  };
  Date.prototype.setHours = function (h, m, s, ms) {
    const t = toTarget(this);
    if (ms !== undefined) t.setUTCHours(h, m, s, ms);
    else if (s !== undefined) t.setUTCHours(h, m, s);
    else if (m !== undefined) t.setUTCHours(h, m);
    else t.setUTCHours(h);
    const newUtcMs = t.getTime() - (-TARGET_OFFSET) * 60000;
    this.setTime(newUtcMs);
    return this.getTime();
  };
  Date.prototype.setMinutes = function (m, s, ms) {
    const t = toTarget(this);
    if (ms !== undefined) t.setUTCMinutes(m, s, ms);
    else if (s !== undefined) t.setUTCMinutes(m, s);
    else t.setUTCMinutes(m);
    const newUtcMs = t.getTime() - (-TARGET_OFFSET) * 60000;
    this.setTime(newUtcMs);
    return this.getTime();
  };
  Date.prototype.setSeconds = function (s, ms) {
    const t = toTarget(this);
    if (ms !== undefined) t.setUTCSeconds(s, ms);
    else t.setUTCSeconds(s);
    const newUtcMs = t.getTime() - (-TARGET_OFFSET) * 60000;
    this.setTime(newUtcMs);
    return this.getTime();
  };
  Date.prototype.setMilliseconds = function (ms) {
    const t = toTarget(this);
    t.setUTCMilliseconds(ms);
    const newUtcMs = t.getTime() - (-TARGET_OFFSET) * 60000;
    this.setTime(newUtcMs);
    return this.getTime();
  };

  // toString methods — format with UTC+8 values
  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  Date.prototype.toString = function () {
    const t = toTarget(this);
    return (
      DAYS[t.getUTCDay()] + " " +
      MONTHS[t.getUTCMonth()] + " " +
      pad(t.getUTCDate()) + " " +
      t.getUTCFullYear() + " " +
      pad(t.getUTCHours()) + ":" +
      pad(t.getUTCMinutes()) + ":" +
      pad(t.getUTCSeconds()) + " GMT+0800 (China Standard Time)"
    );
  };

  Date.prototype.toDateString = function () {
    const t = toTarget(this);
    return (
      DAYS[t.getUTCDay()] + " " +
      MONTHS[t.getUTCMonth()] + " " +
      pad(t.getUTCDate()) + " " +
      t.getUTCFullYear()
    );
  };

  Date.prototype.toTimeString = function () {
    const t = toTarget(this);
    return (
      pad(t.getUTCHours()) + ":" +
      pad(t.getUTCMinutes()) + ":" +
      pad(t.getUTCSeconds()) + " GMT+0800 (China Standard Time)"
    );
  };

  Date.prototype.toLocaleString = function (locale, options) {
    const opts = Object.assign({}, options, { timeZone: TARGET_TZ });
    return new Intl.DateTimeFormat(locale || undefined, opts).format(this);
  };

  Date.prototype.toLocaleDateString = function (locale, options) {
    const opts = Object.assign({}, options, {
      timeZone: TARGET_TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    // Preserve any existing date options from caller
    if (options) {
      for (const k of ["year", "month", "day", "weekday", "era"]) {
        if (k in options) opts[k] = options[k];
      }
    }
    return new Intl.DateTimeFormat(locale || undefined, opts).format(this);
  };

  Date.prototype.toLocaleTimeString = function (locale, options) {
    const opts = Object.assign({}, options, {
      timeZone: TARGET_TZ,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    if (options) {
      for (const k of [
        "hour",
        "minute",
        "second",
        "fractionalSecondDigits",
        "hour12",
        "hourCycle",
        "dayPeriod",
        "timeZoneName",
      ]) {
        if (k in options) opts[k] = options[k];
      }
    }
    return new Intl.DateTimeFormat(locale || undefined, opts).format(this);
  };

  // Override Intl.DateTimeFormat to force Asia/Shanghai
  const OrigDateTimeFormat = Intl.DateTimeFormat;

  function PatchedDateTimeFormat(locale, options) {
    const opts = Object.assign({}, options);
    if (!opts.timeZone) {
      opts.timeZone = TARGET_TZ;
    }
    if (new.target) {
      return new OrigDateTimeFormat(locale, opts);
    }
    return OrigDateTimeFormat(locale, opts);
  }

  PatchedDateTimeFormat.prototype = OrigDateTimeFormat.prototype;
  PatchedDateTimeFormat.supportedLocalesOf =
    OrigDateTimeFormat.supportedLocalesOf;

  Object.defineProperty(Intl, "DateTimeFormat", {
    value: PatchedDateTimeFormat,
    writable: true,
    configurable: true,
  });
})();
