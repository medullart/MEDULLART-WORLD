function qt(e) {
  try {
    if (e == null || typeof e == "string" || typeof e == "number" || typeof e == "boolean")
      return e;
    if (e instanceof Error)
      return {
        name: e.name,
        message: e.message,
        stack: e.stack
      };
    if (e instanceof Element)
      return {
        __type: "Element",
        tagName: e.tagName,
        className: e.className,
        id: e.id
      };
    const t = /* @__PURE__ */ new WeakSet(), n = (o, r = 0) => {
      if (r > 3) return "[Max Depth]";
      if (o == null || typeof o != "object") return o;
      if (t.has(o))
        return "[Circular]";
      if (t.add(o), Array.isArray(o))
        return o.map((i) => n(i, r + 1));
      const s = {};
      for (const [i, c] of Object.entries(o))
        s[i] = n(c, r + 1);
      return s;
    };
    return n(e);
  } catch {
    return "[Serialization Error]";
  }
}
function Yt(e) {
  return JSON.stringify(e).length <= 5120 ? e : e.map((o) => {
    const r = JSON.stringify(o);
    return r.length > 1e3 ? `[Truncated: ${r.substring(0, 1e3)}...]` : o;
  });
}
function Kt(e) {
  window.parent && window.parent !== window && window.parent.postMessage(e, "https://sticklight.com");
}
function Xt() {
  const e = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  ["log", "warn", "error", "info", "debug"].forEach((n) => {
    console[n] = (...o) => {
      e[n](...o);
      try {
        const r = o.map(qt), s = Yt(r), i = {
          timestamp: Date.now(),
          level: n,
          args: s
        };
        Kt({
          type: "CONSOLE_LOG",
          data: i
        });
      } catch {
      }
    };
  });
  const t = window.fetch;
  window.fetch = async (...n) => {
    const o = (r) => typeof r == "string" ? r : r instanceof Request ? r.url : r instanceof URL ? r.toString() : "unknown";
    try {
      const r = await t(...n);
      if (!r.ok) {
        const s = o(n[0]);
        console.error(`HTTP ${r.status} ${r.statusText}:`, s, {
          status: r.status,
          statusText: r.statusText,
          url: r.url
        });
      }
      return r;
    } catch (r) {
      const s = o(n[0]);
      throw console.error("Network error:", s, r), r;
    }
  };
}
Xt();
function g(e, t, n) {
  function o(c, u) {
    if (c._zod || Object.defineProperty(c, "_zod", {
      value: {
        def: u,
        constr: i,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), c._zod.traits.has(e))
      return;
    c._zod.traits.add(e), t(c, u);
    const l = i.prototype, a = Object.keys(l);
    for (let f = 0; f < a.length; f++) {
      const h = a[f];
      h in c || (c[h] = l[h].bind(c));
    }
  }
  const r = n?.Parent ?? Object;
  class s extends r {
  }
  Object.defineProperty(s, "name", { value: e });
  function i(c) {
    var u;
    const l = n?.Parent ? new s() : this;
    o(l, c), (u = l._zod).deferred ?? (u.deferred = []);
    for (const a of l._zod.deferred)
      a();
    return l;
  }
  return Object.defineProperty(i, "init", { value: o }), Object.defineProperty(i, Symbol.hasInstance, {
    value: (c) => n?.Parent && c instanceof n.Parent ? !0 : c?._zod?.traits?.has(e)
  }), Object.defineProperty(i, "name", { value: e }), i;
}
class ee extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
const Gt = {};
function X(e) {
  return Gt;
}
function Jt(e) {
  const t = Object.values(e).filter((o) => typeof o == "number");
  return Object.entries(e).filter(([o, r]) => t.indexOf(+o) === -1).map(([o, r]) => r);
}
function Qt(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function en(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function De(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
const nt = Symbol("evaluating");
function z(e, t, n) {
  let o;
  Object.defineProperty(e, t, {
    get() {
      if (o !== nt)
        return o === void 0 && (o = nt, o = n()), o;
    },
    set(r) {
      Object.defineProperty(e, t, {
        value: r
        // configurable: true,
      });
    },
    configurable: !0
  });
}
const Ot = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function ze(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Rt(e) {
  if (ze(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const n = t.prototype;
  return !(ze(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function tn(e) {
  return Rt(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const nn = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function $e(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function on(e, t, n) {
  const o = new e._zod.constr(t ?? e._zod.def);
  return (!t || n?.parent) && (o._zod.parent = e), o;
}
function Z(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function rn(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
function Q(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0)
      return !0;
  return !1;
}
function q(e, t) {
  return t.map((n) => {
    var o;
    return (o = n).path ?? (o.path = []), n.path.unshift(e), n;
  });
}
function ie(e) {
  return typeof e == "string" ? e : e?.message;
}
function G(e, t, n) {
  const o = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const r = ie(e.inst?._zod.def?.error?.(e)) ?? ie(t?.error?.(e)) ?? ie(n.customError?.(e)) ?? ie(n.localeError?.(e)) ?? "Invalid input";
    o.message = r;
  }
  return delete o.inst, delete o.continue, t?.reportInput || delete o.input, o;
}
function sn(...e) {
  const [t, n, o] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: o
  } : { ...t };
}
const Tt = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, Qt, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, cn = g("$ZodError", Tt), pe = g("$ZodError", Tt, { Parent: Error }), un = (e) => (t, n, o, r) => {
  const s = o ? Object.assign(o, { async: !1 }) : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, s);
  if (i instanceof Promise)
    throw new ee();
  if (i.issues.length) {
    const c = new (r?.Err ?? e)(i.issues.map((u) => G(u, s, X())));
    throw Ot(c, r?.callee), c;
  }
  return i.value;
}, ln = /* @__PURE__ */ un(pe), an = (e) => async (t, n, o, r) => {
  const s = o ? Object.assign(o, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, s);
  if (i instanceof Promise && (i = await i), i.issues.length) {
    const c = new (r?.Err ?? e)(i.issues.map((u) => G(u, s, X())));
    throw Ot(c, r?.callee), c;
  }
  return i.value;
}, fn = /* @__PURE__ */ an(pe), dn = (e) => (t, n, o) => {
  const r = o ? { ...o, async: !1 } : { async: !1 }, s = t._zod.run({ value: n, issues: [] }, r);
  if (s instanceof Promise)
    throw new ee();
  return s.issues.length ? {
    success: !1,
    error: new (e ?? cn)(s.issues.map((i) => G(i, r, X())))
  } : { success: !0, data: s.value };
}, At = /* @__PURE__ */ dn(pe), hn = (e) => async (t, n, o) => {
  const r = o ? Object.assign(o, { async: !0 }) : { async: !0 };
  let s = t._zod.run({ value: n, issues: [] }, r);
  return s instanceof Promise && (s = await s), s.issues.length ? {
    success: !1,
    error: new e(s.issues.map((i) => G(i, r, X())))
  } : { success: !0, data: s.value };
}, zt = /* @__PURE__ */ hn(pe), pn = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, mn = /^-?\d+(?:\.\d+)?/, gn = /^(?:true|false)$/i, yn = /* @__PURE__ */ g("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), vn = {
  major: 4,
  minor: 1,
  patch: 13
}, R = /* @__PURE__ */ g("$ZodType", (e, t) => {
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = vn;
  const o = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && o.unshift(e);
  for (const r of o)
    for (const s of r._zod.onattach)
      s(e);
  if (o.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const r = (i, c, u) => {
      let l = Q(i), a;
      for (const f of c) {
        if (f._zod.def.when) {
          if (!f._zod.def.when(i))
            continue;
        } else if (l)
          continue;
        const h = i.issues.length, d = f._zod.check(i);
        if (d instanceof Promise && u?.async === !1)
          throw new ee();
        if (a || d instanceof Promise)
          a = (a ?? Promise.resolve()).then(async () => {
            await d, i.issues.length !== h && (l || (l = Q(i, h)));
          });
        else {
          if (i.issues.length === h)
            continue;
          l || (l = Q(i, h));
        }
      }
      return a ? a.then(() => i) : i;
    }, s = (i, c, u) => {
      if (Q(i))
        return i.aborted = !0, i;
      const l = r(c, o, u);
      if (l instanceof Promise) {
        if (u.async === !1)
          throw new ee();
        return l.then((a) => e._zod.parse(a, u));
      }
      return e._zod.parse(l, u);
    };
    e._zod.run = (i, c) => {
      if (c.skipChecks)
        return e._zod.parse(i, c);
      if (c.direction === "backward") {
        const l = e._zod.parse({ value: i.value, issues: [] }, { ...c, skipChecks: !0 });
        return l instanceof Promise ? l.then((a) => s(a, i, c)) : s(l, i, c);
      }
      const u = e._zod.parse(i, c);
      if (u instanceof Promise) {
        if (c.async === !1)
          throw new ee();
        return u.then((l) => r(l, o, c));
      }
      return r(u, o, c);
    };
  }
  e["~standard"] = {
    validate: (r) => {
      try {
        const s = At(e, r);
        return s.success ? { value: s.data } : { issues: s.error?.issues };
      } catch {
        return zt(e, r).then((i) => i.success ? { value: i.data } : { issues: i.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), wn = /* @__PURE__ */ g("$ZodString", (e, t) => {
  R.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? pn(e._zod.bag), e._zod.parse = (n, o) => {
    if (t.coerce)
      try {
        n.value = String(n.value);
      } catch {
      }
    return typeof n.value == "string" || n.issues.push({
      expected: "string",
      code: "invalid_type",
      input: n.value,
      inst: e
    }), n;
  };
}), bn = /* @__PURE__ */ g("$ZodNumber", (e, t) => {
  R.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? mn, e._zod.parse = (n, o) => {
    if (t.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const r = n.value;
    if (typeof r == "number" && !Number.isNaN(r) && Number.isFinite(r))
      return n;
    const s = typeof r == "number" ? Number.isNaN(r) ? "NaN" : Number.isFinite(r) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: r,
      inst: e,
      ...s ? { received: s } : {}
    }), n;
  };
}), _n = /* @__PURE__ */ g("$ZodBoolean", (e, t) => {
  R.init(e, t), e._zod.pattern = gn, e._zod.parse = (n, o) => {
    if (t.coerce)
      try {
        n.value = !!n.value;
      } catch {
      }
    const r = n.value;
    return typeof r == "boolean" || n.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: r,
      inst: e
    }), n;
  };
}), En = /* @__PURE__ */ g("$ZodUnknown", (e, t) => {
  R.init(e, t), e._zod.parse = (n) => n;
});
function ot(e, t, n) {
  e.issues.length && t.issues.push(...q(n, e.issues)), t.value[n] = e.value;
}
const Sn = /* @__PURE__ */ g("$ZodArray", (e, t) => {
  R.init(e, t), e._zod.parse = (n, o) => {
    const r = n.value;
    if (!Array.isArray(r))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: r,
        inst: e
      }), n;
    n.value = Array(r.length);
    const s = [];
    for (let i = 0; i < r.length; i++) {
      const c = r[i], u = t.element._zod.run({
        value: c,
        issues: []
      }, o);
      u instanceof Promise ? s.push(u.then((l) => ot(l, n, i))) : ot(u, n, i);
    }
    return s.length ? Promise.all(s).then(() => n) : n;
  };
});
function ue(e, t, n, o) {
  e.issues.length && t.issues.push(...q(n, e.issues)), e.value === void 0 ? n in o && (t.value[n] = void 0) : t.value[n] = e.value;
}
function xn(e) {
  const t = Object.keys(e.shape);
  for (const o of t)
    if (!e.shape?.[o]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${o}": expected a Zod schema`);
  const n = rn(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n)
  };
}
function On(e, t, n, o, r, s) {
  const i = [], c = r.keySet, u = r.catchall._zod, l = u.def.type;
  for (const a in t) {
    if (c.has(a))
      continue;
    if (l === "never") {
      i.push(a);
      continue;
    }
    const f = u.run({ value: t[a], issues: [] }, o);
    f instanceof Promise ? e.push(f.then((h) => ue(h, n, a, t))) : ue(f, n, a, t);
  }
  return i.length && n.issues.push({
    code: "unrecognized_keys",
    keys: i,
    input: t,
    inst: s
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const Rn = /* @__PURE__ */ g("$ZodObject", (e, t) => {
  if (R.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const c = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const u = { ...c };
        return Object.defineProperty(t, "shape", {
          value: u
        }), u;
      }
    });
  }
  const o = en(() => xn(t));
  z(e._zod, "propValues", () => {
    const c = t.shape, u = {};
    for (const l in c) {
      const a = c[l]._zod;
      if (a.values) {
        u[l] ?? (u[l] = /* @__PURE__ */ new Set());
        for (const f of a.values)
          u[l].add(f);
      }
    }
    return u;
  });
  const r = ze, s = t.catchall;
  let i;
  e._zod.parse = (c, u) => {
    i ?? (i = o.value);
    const l = c.value;
    if (!r(l))
      return c.issues.push({
        expected: "object",
        code: "invalid_type",
        input: l,
        inst: e
      }), c;
    c.value = {};
    const a = [], f = i.shape;
    for (const h of i.keys) {
      const p = f[h]._zod.run({ value: l[h], issues: [] }, u);
      p instanceof Promise ? a.push(p.then((m) => ue(m, c, h, l))) : ue(p, c, h, l);
    }
    return s ? On(a, l, c, u, o.value, e) : a.length ? Promise.all(a).then(() => c) : c;
  };
});
function rt(e, t, n, o) {
  for (const s of e)
    if (s.issues.length === 0)
      return t.value = s.value, t;
  const r = e.filter((s) => !Q(s));
  return r.length === 1 ? (t.value = r[0].value, r[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((s) => s.issues.map((i) => G(i, o, X())))
  }), t);
}
const Tn = /* @__PURE__ */ g("$ZodUnion", (e, t) => {
  R.init(e, t), z(e._zod, "optin", () => t.options.some((r) => r._zod.optin === "optional") ? "optional" : void 0), z(e._zod, "optout", () => t.options.some((r) => r._zod.optout === "optional") ? "optional" : void 0), z(e._zod, "values", () => {
    if (t.options.every((r) => r._zod.values))
      return new Set(t.options.flatMap((r) => Array.from(r._zod.values)));
  }), z(e._zod, "pattern", () => {
    if (t.options.every((r) => r._zod.pattern)) {
      const r = t.options.map((s) => s._zod.pattern);
      return new RegExp(`^(${r.map((s) => De(s.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, o = t.options[0]._zod.run;
  e._zod.parse = (r, s) => {
    if (n)
      return o(r, s);
    let i = !1;
    const c = [];
    for (const u of t.options) {
      const l = u._zod.run({
        value: r.value,
        issues: []
      }, s);
      if (l instanceof Promise)
        c.push(l), i = !0;
      else {
        if (l.issues.length === 0)
          return l;
        c.push(l);
      }
    }
    return i ? Promise.all(c).then((u) => rt(u, r, e, s)) : rt(c, r, e, s);
  };
}), An = /* @__PURE__ */ g("$ZodRecord", (e, t) => {
  R.init(e, t), e._zod.parse = (n, o) => {
    const r = n.value;
    if (!Rt(r))
      return n.issues.push({
        expected: "record",
        code: "invalid_type",
        input: r,
        inst: e
      }), n;
    const s = [], i = t.keyType._zod.values;
    if (i) {
      n.value = {};
      const c = /* @__PURE__ */ new Set();
      for (const l of i)
        if (typeof l == "string" || typeof l == "number" || typeof l == "symbol") {
          c.add(typeof l == "number" ? l.toString() : l);
          const a = t.valueType._zod.run({ value: r[l], issues: [] }, o);
          a instanceof Promise ? s.push(a.then((f) => {
            f.issues.length && n.issues.push(...q(l, f.issues)), n.value[l] = f.value;
          })) : (a.issues.length && n.issues.push(...q(l, a.issues)), n.value[l] = a.value);
        }
      let u;
      for (const l in r)
        c.has(l) || (u = u ?? [], u.push(l));
      u && u.length > 0 && n.issues.push({
        code: "unrecognized_keys",
        input: r,
        inst: e,
        keys: u
      });
    } else {
      n.value = {};
      for (const c of Reflect.ownKeys(r)) {
        if (c === "__proto__")
          continue;
        const u = t.keyType._zod.run({ value: c, issues: [] }, o);
        if (u instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (u.issues.length) {
          n.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: u.issues.map((a) => G(a, o, X())),
            input: c,
            path: [c],
            inst: e
          }), n.value[u.value] = u.value;
          continue;
        }
        const l = t.valueType._zod.run({ value: r[c], issues: [] }, o);
        l instanceof Promise ? s.push(l.then((a) => {
          a.issues.length && n.issues.push(...q(c, a.issues)), n.value[u.value] = a.value;
        })) : (l.issues.length && n.issues.push(...q(c, l.issues)), n.value[u.value] = l.value);
      }
    }
    return s.length ? Promise.all(s).then(() => n) : n;
  };
}), zn = /* @__PURE__ */ g("$ZodEnum", (e, t) => {
  R.init(e, t);
  const n = Jt(t.entries), o = new Set(n);
  e._zod.values = o, e._zod.pattern = new RegExp(`^(${n.filter((r) => nn.has(typeof r)).map((r) => typeof r == "string" ? $e(r) : r.toString()).join("|")})$`), e._zod.parse = (r, s) => {
    const i = r.value;
    return o.has(i) || r.issues.push({
      code: "invalid_value",
      values: n,
      input: i,
      inst: e
    }), r;
  };
}), $n = /* @__PURE__ */ g("$ZodLiteral", (e, t) => {
  if (R.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const n = new Set(t.values);
  e._zod.values = n, e._zod.pattern = new RegExp(`^(${t.values.map((o) => typeof o == "string" ? $e(o) : o ? $e(o.toString()) : String(o)).join("|")})$`), e._zod.parse = (o, r) => {
    const s = o.value;
    return n.has(s) || o.issues.push({
      code: "invalid_value",
      values: t.values,
      input: s,
      inst: e
    }), o;
  };
});
function it(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const Cn = /* @__PURE__ */ g("$ZodOptional", (e, t) => {
  R.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", z(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), z(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${De(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, o) => {
    if (t.innerType._zod.optin === "optional") {
      const r = t.innerType._zod.run(n, o);
      return r instanceof Promise ? r.then((s) => it(s, n.value)) : it(r, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, o);
  };
}), Ln = /* @__PURE__ */ g("$ZodNullable", (e, t) => {
  R.init(e, t), z(e._zod, "optin", () => t.innerType._zod.optin), z(e._zod, "optout", () => t.innerType._zod.optout), z(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${De(n.source)}|null)$`) : void 0;
  }), z(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, o) => n.value === null ? n : t.innerType._zod.run(n, o);
}), kn = /* @__PURE__ */ g("$ZodDefault", (e, t) => {
  R.init(e, t), e._zod.optin = "optional", z(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, o) => {
    if (o.direction === "backward")
      return t.innerType._zod.run(n, o);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const r = t.innerType._zod.run(n, o);
    return r instanceof Promise ? r.then((s) => st(s, t)) : st(r, t);
  };
});
function st(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const Dn = /* @__PURE__ */ g("$ZodCustom", (e, t) => {
  yn.init(e, t), R.init(e, t), e._zod.parse = (n, o) => n, e._zod.check = (n) => {
    const o = n.value, r = t.fn(o);
    if (r instanceof Promise)
      return r.then((s) => ct(s, n, o, e));
    ct(r, n, o, e);
  };
});
function ct(e, t, n, o) {
  if (!e) {
    const r = {
      code: "custom",
      input: n,
      inst: o,
      // incorporates params.error into issue reporting
      path: [...o._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !o._zod.def.abort
      // params: inst._zod.def.params,
    };
    o._zod.def.params && (r.params = o._zod.def.params), t.issues.push(sn(r));
  }
}
var ut;
class Nn {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...n) {
    const o = n[0];
    if (this._map.set(t, o), o && typeof o == "object" && "id" in o) {
      if (this._idmap.has(o.id))
        throw new Error(`ID ${o.id} already exists in the registry`);
      this._idmap.set(o.id, t);
    }
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const n = this._map.get(t);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(t), this;
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const o = { ...this.get(n) ?? {} };
      delete o.id;
      const r = { ...o, ...this._map.get(t) };
      return Object.keys(r).length ? r : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function Pn() {
  return new Nn();
}
(ut = globalThis).__zod_globalRegistry ?? (ut.__zod_globalRegistry = Pn());
function Mn(e, t) {
  return new e({
    type: "string",
    ...Z(t)
  });
}
function In(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...Z(t)
  });
}
function Zn(e, t) {
  return new e({
    type: "boolean",
    ...Z(t)
  });
}
function jn(e) {
  return new e({
    type: "unknown"
  });
}
function Bn(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...Z(n)
  });
}
const T = /* @__PURE__ */ g("ZodMiniType", (e, t) => {
  if (!e._zod)
    throw new Error("Uninitialized schema in ZodMiniType.");
  R.init(e, t), e.def = t, e.type = t.type, e.parse = (n, o) => ln(e, n, o, { callee: e.parse }), e.safeParse = (n, o) => At(e, n, o), e.parseAsync = async (n, o) => fn(e, n, o, { callee: e.parseAsync }), e.safeParseAsync = async (n, o) => zt(e, n, o), e.check = (...n) => e.clone(
    {
      ...t,
      checks: [
        ...t.checks ?? [],
        ...n.map((o) => typeof o == "function" ? { _zod: { check: o, def: { check: "custom" }, onattach: [] } } : o)
      ]
    }
    // { parent: true }
  ), e.clone = (n, o) => on(e, n, o), e.brand = () => e, e.register = ((n, o) => (n.add(e, o), e));
}), Vn = /* @__PURE__ */ g("ZodMiniString", (e, t) => {
  wn.init(e, t), T.init(e, t);
});
function w(e) {
  return Mn(Vn, e);
}
const Wn = /* @__PURE__ */ g("ZodMiniNumber", (e, t) => {
  bn.init(e, t), T.init(e, t);
});
function I(e) {
  return In(Wn, e);
}
const Fn = /* @__PURE__ */ g("ZodMiniBoolean", (e, t) => {
  _n.init(e, t), T.init(e, t);
});
function Ne(e) {
  return Zn(Fn, e);
}
const Un = /* @__PURE__ */ g("ZodMiniUnknown", (e, t) => {
  En.init(e, t), T.init(e, t);
});
function Hn() {
  return jn(Un);
}
const qn = /* @__PURE__ */ g("ZodMiniArray", (e, t) => {
  Sn.init(e, t), T.init(e, t);
});
function me(e, t) {
  return new qn({
    type: "array",
    element: e,
    ...Z(t)
  });
}
const Yn = /* @__PURE__ */ g("ZodMiniObject", (e, t) => {
  Rn.init(e, t), T.init(e, t), z(e, "shape", () => t.shape);
});
function b(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...Z(t)
  };
  return new Yn(n);
}
const Kn = /* @__PURE__ */ g("ZodMiniUnion", (e, t) => {
  Tn.init(e, t), T.init(e, t);
});
function Pe(e, t) {
  return new Kn({
    type: "union",
    options: e,
    ...Z(t)
  });
}
const Xn = /* @__PURE__ */ g("ZodMiniRecord", (e, t) => {
  An.init(e, t), T.init(e, t);
});
function ge(e, t, n) {
  return new Xn({
    type: "record",
    keyType: e,
    valueType: t,
    ...Z(n)
  });
}
const Gn = /* @__PURE__ */ g("ZodMiniEnum", (e, t) => {
  zn.init(e, t), T.init(e, t), e.options = Object.values(t.entries);
});
function $t(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((o) => [o, o])) : e;
  return new Gn({
    type: "enum",
    entries: n,
    ...Z(t)
  });
}
const Jn = /* @__PURE__ */ g("ZodMiniLiteral", (e, t) => {
  $n.init(e, t), T.init(e, t);
});
function V(e, t) {
  return new Jn({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...Z(t)
  });
}
const Qn = /* @__PURE__ */ g("ZodMiniOptional", (e, t) => {
  Cn.init(e, t), T.init(e, t);
});
function k(e) {
  return new Qn({
    type: "optional",
    innerType: e
  });
}
const eo = /* @__PURE__ */ g("ZodMiniNullable", (e, t) => {
  Ln.init(e, t), T.init(e, t);
});
function A(e) {
  return new eo({
    type: "nullable",
    innerType: e
  });
}
function Se(e) {
  return k(A(e));
}
const to = /* @__PURE__ */ g("ZodMiniDefault", (e, t) => {
  kn.init(e, t), T.init(e, t);
});
function xe(e, t) {
  return new to({
    type: "default",
    innerType: e,
    get defaultValue() {
      return tn(t);
    }
  });
}
const no = /* @__PURE__ */ g("ZodMiniCustom", (e, t) => {
  Dn.init(e, t), T.init(e, t);
});
function oo(e, t = {}) {
  return Bn(no, e, t);
}
const ro = (e) => (t, n, o) => {
  const r = o.subscribe;
  return o.subscribe = ((i, c, u) => {
    let l = i;
    if (c) {
      const a = u?.equalityFn || Object.is;
      let f = i(o.getState());
      l = (h) => {
        const d = i(h);
        if (!a(f, d)) {
          const p = f;
          c(f = d, p);
        }
      }, u?.fireImmediately && c(f, f);
    }
    return r(l);
  }), e(t, n, o);
}, io = ro, so = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), o = (l, a) => {
    const f = typeof l == "function" ? l(t) : l;
    if (!Object.is(f, t)) {
      const h = t;
      t = a ?? (typeof f != "object" || f === null) ? f : Object.assign({}, t, f), n.forEach((d) => d(t, h));
    }
  }, r = () => t, c = { setState: o, getState: r, getInitialState: () => u, subscribe: (l) => (n.add(l), () => n.delete(l)) }, u = t = e(o, r, c);
  return c;
}, co = ((e) => so);
function uo({ origin: e, log: t }) {
  return ({ type: n, schema: o, handler: r, signal: s }) => {
    t(`Listening to message: ${n}`), window.addEventListener(
      "message",
      (i) => {
        if (i.data.type !== n)
          return;
        if (i.origin !== e && e !== "*")
          throw t("Invalid origin", { messageOrigin: i.origin, expectedOrigin: e }), new Error(`Invalid origin: "${i.origin}"`);
        const c = o.parse(i.data);
        t("Received message", c), r(c);
      },
      { signal: s }
    );
  };
}
function lo(e, t) {
  return (n, ...o) => {
  };
}
function ao({ origin: e, getTarget: t, log: n }) {
  return (o) => {
    const r = t();
    if (!r) {
      n("Invalid target, cannot send message", o, { origin: e, target: r });
      return;
    }
    n("Sending message", o, { origin: e, target: r }), r.postMessage(o, e);
  };
}
function Me(e) {
  const { id: t, schema: n, initialState: o } = e, r = `ELEMENTOR_VIBE/${t}/HANDSHAKE`, s = `ELEMENTOR_VIBE/${t}/REQUEST_STATE`, i = `ELEMENTOR_VIBE/${t}/UPDATE`, c = b({
    type: V(r),
    direction: Pe([V("request"), V("response")])
  }), u = b({
    type: V(s)
  }), l = b({
    type: V(i),
    state: n,
    initial: k(Ne())
    // If true, this is the initial state update
  });
  return ({ origin: a, getTarget: f, name: h }) => {
    const d = co()(io(() => ({ ...o }))), p = lo(), m = uo({ origin: a, log: p }), v = ao({ origin: a, log: p, getTarget: f });
    p("Creating store");
    let y = !1;
    return {
      ...d,
      startSyncing: ({ initiator: _ = !1, onSuccess: E } = {}) => {
        if (y)
          throw new Error("Store is already syncing, cannot start synchronization");
        y = !0, p("Starting store synchronization");
        const S = new AbortController();
        let x = !1, O = !1;
        m({
          type: r,
          schema: c,
          signal: S.signal,
          handler: ({ direction: L }) => {
            x = !0, L === "request" && v({
              type: r,
              direction: "response"
            }), L === "response" && v({ type: s });
          }
        }), m({
          type: s,
          schema: u,
          signal: S.signal,
          handler: () => {
            x && v({ type: i, state: d.getState(), initial: !0 });
          }
        }), m({
          type: i,
          schema: l,
          signal: S.signal,
          handler: (L) => {
            if (x) {
              O = !0;
              try {
                d.setState(L.state), L.initial && E?.();
              } finally {
                O = !1;
              }
            }
          }
        });
        const P = d.subscribe((L) => {
          O || !x || v({ type: i, state: L });
        });
        return _ || v({
          type: r,
          direction: "request"
        }), () => {
          if (!y)
            throw new Error("Store is not syncing, cannot stop synchronization");
          y = !1, p("Stopping store synchronization"), P(), S.abort();
        };
      }
    };
  };
}
function fo(e) {
  return Object.keys(e);
}
const ho = ["http", "https"];
function po(e) {
  const t = e.trim().toLowerCase().match(/^([a-z][a-z0-9+.-]*):/);
  if (!t)
    return !0;
  const n = t[1].toLowerCase();
  return ho.includes(n);
}
const Ie = b({
  filePath: w(),
  line: k(I()),
  column: k(I()),
  id: w()
}), Ct = {
  src: k(w().check(oo(po, { message: "Invalid src scheme" }))),
  alt: k(w())
}, Lt = b({
  classes: me(w()),
  inlineStyles: ge(w(), w()),
  text: w(),
  attributes: b(Ct)
}), mo = b({
  classes: A(me(w())),
  inlineStyles: A(ge(w(), w())),
  text: A(w()),
  attributes: A(b(Ct))
}), kt = fo(Lt.shape.attributes.shape), go = b({
  enabled: Ne(),
  count: I()
}), yo = b({
  source: Ie,
  tagName: w(),
  values: Lt,
  loop: go
}), vo = b({
  source: Ie,
  values: mo
}), wo = b({
  type: V("DELETE_ELEMENT"),
  source: Ie
}), bo = Pe([vo, wo]), _o = ge(w(), bo), Eo = b({
  enabled: Ne(),
  selected: A(yo),
  modified: _o,
  hovered: xe(Se(w()), null),
  tree: xe(Se(Hn()), null),
  treeRefreshRequestedAt: xe(Se(I()), null)
}), So = Me({
  id: "EDITOR",
  schema: Eo,
  initialState: {
    enabled: !1,
    selected: null,
    modified: {},
    hovered: null,
    tree: null,
    treeRefreshRequestedAt: null
  }
});
function lt(e) {
  return "type" in e && e.type === "DELETE_ELEMENT";
}
const Oe = b({
  id: w(),
  index: k(I())
}), xo = b({
  path: w(),
  line: k(I()),
  column: k(I())
}), Oo = b({
  id: w(),
  index: k(I()),
  tag: w(),
  source: k(xo)
}), Ro = b({
  mode: $t(["preview", "edit"]),
  elements: b({
    data: ge(w(), Oo),
    selected: me(Oe),
    hovered: A(Oe),
    highlighted: A(Oe)
  })
}), To = Me({
  id: "PREVIEW_MODE",
  schema: Ro,
  initialState: {
    mode: "preview",
    elements: {
      data: {},
      selected: [],
      hovered: null,
      highlighted: null
    }
  }
}), Ao = b({
  /**
   * Status of the sandbox iframe:
   * - `idle`: Initial state, iframe not yet started loading
   * - `loading`: Iframe is loading content
   * - `ready`: DOM is ready (DOMContentLoaded)
   * - `complete`: Loaded and ready to use
   */
  status: $t(["idle", "loading", "ready", "complete"]),
  path: A(w()),
  errors: me(
    Pe([
      b({
        type: V("error"),
        message: w(),
        filename: w(),
        lineno: A(I()),
        colno: A(I()),
        stack: A(w()),
        name: A(w())
      }),
      b({
        type: V("unhandled-rejection"),
        message: w()
      })
    ])
  )
}), zo = Me({
  id: "SANDBOX_STATE",
  schema: Ao,
  initialState: {
    status: "idle",
    path: null,
    errors: []
  }
});
function Ze(e) {
  let t = $o(e);
  for (; t; ) {
    if (t._debugSource?.fileName)
      return {
        filePath: t._debugSource.fileName,
        line: t._debugSource.lineNumber,
        column: t._debugSource.columnNumber
      };
    t = t.return ?? null;
  }
  return null;
}
function $o(e) {
  return Object.entries(e).find(([n]) => n.startsWith("__reactFiber") || n.startsWith("__reactInternalInstance"))?.[1] || null;
}
const Co = "ev-id", Lo = "evId";
function W(e) {
  return document.querySelectorAll(`[data-${Co}="${e}"]`);
}
function oe(e) {
  return e.dataset[Lo] ?? null;
}
function Dt(e) {
  let t = e;
  for (; t && !oe(t); )
    t = t?.parentElement;
  return t;
}
function Ce(e) {
  const t = Dt(e.target);
  if (!t)
    return null;
  const n = oe(t);
  return n ? { id: n, index: ko(t), element: t } : null;
}
function je(e, t) {
  return W(e)[t ?? 0] ?? null;
}
function ko(e) {
  const t = oe(e);
  if (!t)
    return;
  const n = W(t);
  if (n.length <= 1)
    return;
  const o = Array.from(n).indexOf(e);
  return o >= 0 ? o : void 0;
}
const le = "ev-hover", ae = "ev-selected", Do = "ev-id", No = 5e3;
function Re() {
  document.querySelectorAll(`[data-${le}]`).forEach((e) => {
    e.removeAttribute(`data-${le}`);
  });
}
function at(e) {
  W(e).forEach((t) => {
    t.setAttribute(`data-${le}`, "");
  });
}
function Po() {
  document.querySelectorAll(`[data-${ae}]`).forEach((e) => {
    e.removeAttribute(`data-${ae}`);
  });
}
function Mo(e) {
  W(e).forEach((t) => {
    t.setAttribute(`data-${ae}`, "");
  });
}
function ft(e) {
  document.body.style.cursor = e;
}
function dt(e) {
  return new Promise((t) => {
    const n = () => e.querySelector(`[data-${Do}]`) !== null;
    if (n()) {
      t();
      return;
    }
    const o = () => {
      clearTimeout(s), r.disconnect(), t();
    }, r = new MutationObserver(() => {
      n() && o();
    });
    r.observe(e, { childList: !0, subtree: !0 });
    const s = setTimeout(o, No);
  });
}
function Io() {
  const e = document.createElement("style");
  e.textContent = `
		[data-${le}] {
			outline: 1px solid #7C3AED !important;
			outline-offset: 1px !important;
		}

		[data-${ae}] {
			outline: 2px solid #7C3AED !important;
			outline-offset: 2px !important;
			position: relative;
		}

		/* Pending DELETE_ELEMENT in manual edit — keep nodes in the DOM for undo; source removal on save. Structure tree omits these nodes (see buildElementTree). */
		[data-ev-pending-deletion] {
			display: none !important;
		}
	`, document.head.appendChild(e);
}
function Be(e) {
  return (typeof e.className == "string" ? e.className : e.getAttribute("class") ?? "").split(" ").filter(Boolean);
}
(() => {
  const e = So({
    origin: "https://sticklight.com",
    getTarget: () => window.parent,
    name: "Preview"
  });
  e.startSyncing({
    onSuccess: async () => {
      await dt(document.body), ht(e.getState().modified);
    }
  });
  let t = null;
  e.subscribe(
    (n) => n.enabled,
    (n) => {
      t?.abort(), t = null, n && (t = new AbortController(), ft("crosshair"), document.addEventListener("click", (o) => Bo(e)(o), { signal: t?.signal, capture: !0 }), document.addEventListener(
        "mouseover",
        (o) => {
          const r = oe(o.target);
          r && at(r);
        },
        { signal: t?.signal, capture: !0 }
      ), document.addEventListener("mouseout", () => Re(), { signal: t?.signal, capture: !0 })), n || (ft(""), Re());
    }
  ), e.subscribe(
    (n) => n.selected,
    (n) => {
      Po(), n && Mo(n.source.id);
    }
  ), e.subscribe(
    (n) => n.hovered,
    (n) => {
      Re(), n && at(n);
    }
  ), e.subscribe(
    (n) => n.modified,
    (n) => ht(n)
  ), e.subscribe(
    (n) => n.treeRefreshRequestedAt,
    async (n) => {
      if (n == null)
        return;
      await dt(document.body), document.querySelectorAll("[data-ev-id]").length > 0 ? e.setState({ tree: Zo(), treeRefreshRequestedAt: null }) : e.setState({ treeRefreshRequestedAt: null });
    }
  ), Io();
})();
const ce = "data-ev-pending-deletion";
function ht(e) {
  const t = /* @__PURE__ */ new Set();
  document.querySelectorAll(`[${ce}]`).forEach((n) => {
    const o = n.dataset.evId;
    if (!o)
      return;
    const r = e[o];
    (!r || !lt(r)) && t.add(o);
  }), t.forEach((n) => {
    W(n).forEach((o) => {
      o.removeAttribute(ce);
    });
  }), Object.entries(e).forEach(([n, o]) => {
    if (lt(o)) {
      W(n).forEach((r) => {
        r.setAttribute(ce, "");
      });
      return;
    }
    W(n).forEach((r) => {
      if (o.values.classes !== null && (r.className = o.values.classes.join(" ")), o.values.text !== null && (r.textContent = o.values.text), o.values.attributes !== null) {
        const s = o.values.attributes;
        kt.forEach((i) => {
          const c = s[i];
          c !== void 0 ? r.setAttribute(i, c) : r.removeAttribute(i);
        });
      }
      o.values.inlineStyles !== null && (r.style.cssText = "", Object.entries(o.values.inlineStyles).forEach(([s, i]) => {
        r.style.setProperty(s.replace(/([A-Z])/g, "-$1").toLowerCase(), i);
      }));
    });
  });
}
function Zo() {
  const t = Array.from(document.querySelectorAll("[data-ev-id]")).filter((c) => !c.closest(`[${ce}]`)), n = /* @__PURE__ */ new Set(), o = t.filter((c) => {
    const u = c.dataset.evId;
    return !u || n.has(u) ? !1 : (n.add(u), !0);
  }), r = /* @__PURE__ */ new Map();
  for (const c of t) {
    const u = c.dataset.evId;
    u && r.set(u, (r.get(u) ?? 0) + 1);
  }
  const s = /* @__PURE__ */ new Map();
  for (const c of o) {
    const u = c.dataset.evId;
    if (!u) continue;
    const l = Ze(c), a = r.get(u) ?? 1, f = Array.from(c.childNodes).find((m) => m.nodeType === Node.TEXT_NODE && m.textContent?.trim()), h = f && f.textContent?.trim() || "", d = {};
    for (const m of Array.from(c.style)) {
      const v = c.style.getPropertyValue(m);
      v && (d[m] = v);
    }
    const p = {
      id: u,
      tagName: c.tagName.toLowerCase(),
      label: jo(c),
      classes: Be(c),
      text: h,
      inlineStyles: d,
      attributes: {
        src: c.getAttribute("src") ?? void 0,
        alt: c.getAttribute("alt") ?? void 0
      },
      filePath: l?.filePath || "",
      line: l?.line,
      column: l?.column,
      isRepeated: a > 1,
      repeatCount: a,
      children: []
    };
    s.set(u, p);
  }
  const i = [];
  for (const c of o) {
    const u = c.dataset.evId;
    if (!u) continue;
    const l = s.get(u);
    if (!l) continue;
    let a = c.parentElement, f = null;
    for (; a; ) {
      const h = a.dataset.evId;
      if (h && s.has(h)) {
        f = s.get(h) ?? null;
        break;
      }
      a = a.parentElement;
    }
    f ? f.children.push(l) : i.push(l);
  }
  return i;
}
function jo(e) {
  const t = e.tagName.toLowerCase(), n = Be(e).slice(0, 2).join(".");
  return n ? `${t}.${n}` : t;
}
function Bo(e) {
  return (t) => {
    t.preventDefault(), t.stopPropagation();
    const n = Dt(t.target);
    if (!n)
      return;
    const o = oe(n);
    if (!o)
      return;
    const r = Ze(n), s = W(o);
    r?.filePath && e.setState({
      selected: {
        tagName: n.tagName.toLowerCase(),
        source: {
          id: o,
          filePath: r.filePath,
          line: r.line,
          column: r.column
        },
        values: {
          classes: Be(n),
          text: n.textContent?.trim() ?? "",
          inlineStyles: Object.entries(n.style).reduce(
            (i, [c, u]) => (u && (i[c] = u), i),
            {}
          ),
          attributes: kt.reduce(
            (i, c) => {
              const u = n.getAttribute(c);
              return u && (i[c] = u), i;
            },
            {}
          )
        },
        loop: {
          enabled: s.length > 1,
          count: s.length
        }
      }
    });
  };
}
function Vo(e, t) {
  let n = null;
  function o() {
    n && (clearTimeout(n), n = null);
  }
  t?.addEventListener("abort", o);
  function r(s) {
    o(), n = setTimeout(() => {
      n = null, s();
    }, e);
  }
  return { schedule: r, cancel: o };
}
const Wo = 35;
function Fo(e, t) {
  const { schedule: n } = Vo(Wo, t);
  document.addEventListener(
    "mouseover",
    (o) => {
      const r = Ce(o);
      r && n(() => {
        e.setState((s) => ({
          ...s,
          elements: {
            ...s.elements,
            hovered: { id: r.id, index: r.index }
          }
        }));
      });
    },
    { signal: t, capture: !0 }
  ), document.addEventListener(
    "mouseout",
    (o) => {
      Ce(o) && n(() => {
        e.setState((s) => ({
          ...s,
          elements: { ...s.elements, hovered: null }
        }));
      });
    },
    { signal: t, capture: !0 }
  );
}
function fe(e, t) {
  return e.id === t.id && e.index === t.index;
}
function Uo(e) {
  return e.index === void 0 ? e.id : `${e.id}::${e.index}`;
}
function Ho(e, t, n) {
  return n ? e.some((r) => fe(r, t)) ? e.filter((r) => !fe(r, t)) : [...e, t] : [t];
}
function qo(e, t, n) {
  const o = Ze(n), r = {
    id: t.id,
    index: t.index,
    tag: n.tagName.toLowerCase(),
    source: o?.filePath ? {
      path: o.filePath,
      line: o.line,
      column: o.column
    } : void 0
  };
  return { ...e, [Uo(t)]: r };
}
function Yo(e, t, n) {
  return !e || !fe(e, n) || t.some((r) => fe(r, n)) ? e : null;
}
function Ko(e) {
  e.setState((t) => ({
    ...t,
    elements: { ...t.elements, selected: [] }
  }));
}
function Xo(e, t) {
  document.addEventListener(
    "click",
    (n) => {
      const o = Ce(n);
      if (!o)
        return;
      n.preventDefault(), n.stopPropagation();
      const r = { id: o.id, index: o.index };
      e.setState((s) => {
        const i = Ho(s.elements.selected, r, n.shiftKey), c = qo(s.elements.data, r, o.element), u = Yo(s.elements.hovered, i, r);
        return { ...s, elements: { ...s.elements, selected: i, data: c, hovered: u } };
      });
    },
    { signal: t, capture: !0 }
  ), document.addEventListener(
    "keydown",
    (n) => {
      n.key === "Escape" && e.getState().elements.selected.length !== 0 && (n.preventDefault(), n.stopPropagation(), Ko(e));
    },
    { signal: t, capture: !0 }
  );
}
function Go(e) {
  let t = null;
  e.subscribe(
    (n) => n.mode,
    (n) => {
      t?.abort(), t = new AbortController();
      const o = t.signal;
      if (n !== "edit") {
        e.setState((r) => ({
          ...r,
          elements: { data: {}, selected: [], hovered: null, highlighted: null }
        }));
        return;
      }
      Fo(e, o), Xo(e, o);
    }
  );
}
const pt = "ev-edit-mode-style", Jo = `
body {
	user-select: none;
	-webkit-user-select: none;
}

* {
	scroll-behavior: auto !important;
	cursor: crosshair !important;
	outline: none !important;
}

*:focus,
*:focus-visible,
*:focus-within,
*:active {
	outline: none !important;
}
`;
function Qo() {
  const e = document.getElementById(pt);
  if (e)
    return e;
  const t = document.createElement("style");
  return t.id = pt, document.head.appendChild(t), t;
}
function er(e) {
  e.subscribe(
    (t) => t.mode,
    (t) => {
      const n = Qo();
      n.textContent = t === "edit" ? Jo : "";
    }
  );
}
function tr(e) {
  e.subscribe(
    (t) => t.elements.highlighted,
    (t) => {
      if (!t)
        return;
      const n = je(t.id, t.index);
      n && n.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  );
}
const Ve = {
  overlaysRoot: "99997",
  selectionOverlay: "99998",
  hoverOverlay: "99999"
}, mt = "ev-preview-overlays-root", nr = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  pointerEvents: "none",
  contain: "strict",
  zIndex: Ve.overlaysRoot
}, or = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "max-content",
  pointerEvents: "none",
  borderRadius: "2px",
  backgroundColor: "transparent",
  display: "block"
};
function We() {
  const e = document.getElementById(mt);
  if (e)
    return e;
  const t = document.createElement("div");
  return t.id = mt, Object.assign(t.style, nr), document.body.appendChild(t), t;
}
function Nt({ styles: e, attrs: t } = {}) {
  const n = document.createElement("div");
  if (Object.assign(n.style, or, e), t)
    for (const [o, r] of Object.entries(t))
      n.setAttribute(o, r);
  return We().appendChild(n), n;
}
function Pt(e) {
  const t = Object.entries(e).map(([n, o]) => `[${n}="${CSS.escape(o)}"]`).join("");
  return t ? We().querySelector(t) : null;
}
function rr(e) {
  return Array.from(We().querySelectorAll(`[${e}]`));
}
const te = Math.min, C = Math.max, de = Math.round, se = Math.floor, M = (e) => ({
  x: e,
  y: e
});
function Fe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ue(e) {
  return e.split("-")[0];
}
function He(e) {
  return e.split("-")[1];
}
function ir(e) {
  return e === "x" ? "y" : "x";
}
function sr(e) {
  return e === "y" ? "height" : "width";
}
function ye(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function cr(e) {
  return ir(ye(e));
}
function ur(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function lr(e) {
  return typeof e != "number" ? ur(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function he(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n
  };
}
function gt(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = ye(t), i = cr(t), c = sr(i), u = Ue(t), l = s === "y", a = o.x + o.width / 2 - r.width / 2, f = o.y + o.height / 2 - r.height / 2, h = o[c] / 2 - r[c] / 2;
  let d;
  switch (u) {
    case "top":
      d = {
        x: a,
        y: o.y - r.height
      };
      break;
    case "bottom":
      d = {
        x: a,
        y: o.y + o.height
      };
      break;
    case "right":
      d = {
        x: o.x + o.width,
        y: f
      };
      break;
    case "left":
      d = {
        x: o.x - r.width,
        y: f
      };
      break;
    default:
      d = {
        x: o.x,
        y: o.y
      };
  }
  switch (He(t)) {
    case "start":
      d[i] -= h * (n && l ? -1 : 1);
      break;
    case "end":
      d[i] += h * (n && l ? -1 : 1);
      break;
  }
  return d;
}
async function ar(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: s,
    rects: i,
    elements: c,
    strategy: u
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: a = "viewport",
    elementContext: f = "floating",
    altBoundary: h = !1,
    padding: d = 0
  } = Fe(t, e), p = lr(d), v = c[h ? f === "floating" ? "reference" : "floating" : f], y = he(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(v))) == null || n ? v : v.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(c.floating)),
    boundary: l,
    rootBoundary: a,
    strategy: u
  })), _ = f === "floating" ? {
    x: o,
    y: r,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, E = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c.floating)), S = await (s.isElement == null ? void 0 : s.isElement(E)) ? await (s.getScale == null ? void 0 : s.getScale(E)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = he(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: _,
    offsetParent: E,
    strategy: u
  }) : _);
  return {
    top: (y.top - x.top + p.top) / S.y,
    bottom: (x.bottom - y.bottom + p.bottom) / S.y,
    left: (y.left - x.left + p.left) / S.x,
    right: (x.right - y.right + p.right) / S.x
  };
}
const fr = 50, dr = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: i
  } = n, c = i.detectOverflow ? i : {
    ...i,
    detectOverflow: ar
  }, u = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let l = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: a,
    y: f
  } = gt(l, o, u), h = o, d = 0;
  const p = {};
  for (let m = 0; m < s.length; m++) {
    const v = s[m];
    if (!v)
      continue;
    const {
      name: y,
      fn: _
    } = v, {
      x: E,
      y: S,
      data: x,
      reset: O
    } = await _({
      x: a,
      y: f,
      initialPlacement: o,
      placement: h,
      strategy: r,
      middlewareData: p,
      rects: l,
      platform: c,
      elements: {
        reference: e,
        floating: t
      }
    });
    a = E ?? a, f = S ?? f, p[y] = {
      ...p[y],
      ...x
    }, O && d < fr && (d++, typeof O == "object" && (O.placement && (h = O.placement), O.rects && (l = O.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : O.rects), {
      x: a,
      y: f
    } = gt(l, h, u)), m = -1);
  }
  return {
    x: a,
    y: f,
    placement: h,
    strategy: r,
    middlewareData: p
  };
}, hr = /* @__PURE__ */ new Set(["left", "top"]);
async function pr(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), i = Ue(n), c = He(n), u = ye(n) === "y", l = hr.has(i) ? -1 : 1, a = s && u ? -1 : 1, f = Fe(t, e);
  let {
    mainAxis: h,
    crossAxis: d,
    alignmentAxis: p
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return c && typeof p == "number" && (d = c === "end" ? p * -1 : p), u ? {
    x: d * a,
    y: h * l
  } : {
    x: h * l,
    y: d * a
  };
}
const mr = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: s,
        placement: i,
        middlewareData: c
      } = t, u = await pr(t, e);
      return i === ((n = c.offset) == null ? void 0 : n.placement) && (o = c.arrow) != null && o.alignmentOffset ? {} : {
        x: r + u.x,
        y: s + u.y,
        data: {
          ...u,
          placement: i
        }
      };
    }
  };
}, gr = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: s,
        platform: i,
        elements: c
      } = t, {
        apply: u = () => {
        },
        ...l
      } = Fe(e, t), a = await i.detectOverflow(t, l), f = Ue(r), h = He(r), d = ye(r) === "y", {
        width: p,
        height: m
      } = s.floating;
      let v, y;
      f === "top" || f === "bottom" ? (v = f, y = h === (await (i.isRTL == null ? void 0 : i.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (y = f, v = h === "end" ? "top" : "bottom");
      const _ = m - a.top - a.bottom, E = p - a.left - a.right, S = te(m - a[v], _), x = te(p - a[y], E), O = !t.middlewareData.shift;
      let P = S, L = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (L = E), (o = t.middlewareData.shift) != null && o.enabled.y && (P = _), O && !h) {
        const Je = C(a.left, 0), Qe = C(a.right, 0), et = C(a.top, 0), tt = C(a.bottom, 0);
        d ? L = p - 2 * (Je !== 0 || Qe !== 0 ? Je + Qe : C(a.left, a.right)) : P = m - 2 * (et !== 0 || tt !== 0 ? et + tt : C(a.top, a.bottom));
      }
      await u({
        ...t,
        availableWidth: L,
        availableHeight: P
      });
      const Ge = await i.getDimensions(c.floating);
      return p !== Ge.width || m !== Ge.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ve() {
  return typeof window < "u";
}
function J(e) {
  return Mt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function $(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function j(e) {
  var t;
  return (t = (Mt(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Mt(e) {
  return ve() ? e instanceof Node || e instanceof $(e).Node : !1;
}
function D(e) {
  return ve() ? e instanceof Element || e instanceof $(e).Element : !1;
}
function B(e) {
  return ve() ? e instanceof HTMLElement || e instanceof $(e).HTMLElement : !1;
}
function yt(e) {
  return !ve() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof $(e).ShadowRoot;
}
function re(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = N(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function yr(e) {
  return /^(table|td|th)$/.test(J(e));
}
function we(e) {
  try {
    if (e.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const vr = /transform|translate|scale|rotate|perspective|filter/, wr = /paint|layout|strict|content/, U = (e) => !!e && e !== "none";
let Te;
function qe(e) {
  const t = D(e) ? N(e) : e;
  return U(t.transform) || U(t.translate) || U(t.scale) || U(t.rotate) || U(t.perspective) || !Ye() && (U(t.backdropFilter) || U(t.filter)) || vr.test(t.willChange || "") || wr.test(t.contain || "");
}
function br(e) {
  let t = F(e);
  for (; B(t) && !K(t); ) {
    if (qe(t))
      return t;
    if (we(t))
      return null;
    t = F(t);
  }
  return null;
}
function Ye() {
  return Te == null && (Te = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Te;
}
function K(e) {
  return /^(html|body|#document)$/.test(J(e));
}
function N(e) {
  return $(e).getComputedStyle(e);
}
function be(e) {
  return D(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function F(e) {
  if (J(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    yt(e) && e.host || // Fallback.
    j(e)
  );
  return yt(t) ? t.host : t;
}
function It(e) {
  const t = F(e);
  return K(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : B(t) && re(t) ? t : It(t);
}
function ne(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = It(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), i = $(r);
  if (s) {
    const c = Le(i);
    return t.concat(i, i.visualViewport || [], re(r) ? r : [], c && n ? ne(c) : []);
  } else
    return t.concat(r, ne(r, [], n));
}
function Le(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Zt(e) {
  const t = N(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = B(e), s = r ? e.offsetWidth : n, i = r ? e.offsetHeight : o, c = de(n) !== s || de(o) !== i;
  return c && (n = s, o = i), {
    width: n,
    height: o,
    $: c
  };
}
function Ke(e) {
  return D(e) ? e : e.contextElement;
}
function Y(e) {
  const t = Ke(e);
  if (!B(t))
    return M(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = Zt(t);
  let i = (s ? de(n.width) : n.width) / o, c = (s ? de(n.height) : n.height) / r;
  return (!i || !Number.isFinite(i)) && (i = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: i,
    y: c
  };
}
const _r = /* @__PURE__ */ M(0);
function jt(e) {
  const t = $(e);
  return !Ye() || !t.visualViewport ? _r : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Er(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== $(e) ? !1 : t;
}
function H(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = Ke(e);
  let i = M(1);
  t && (o ? D(o) && (i = Y(o)) : i = Y(e));
  const c = Er(s, n, o) ? jt(s) : M(0);
  let u = (r.left + c.x) / i.x, l = (r.top + c.y) / i.y, a = r.width / i.x, f = r.height / i.y;
  if (s) {
    const h = $(s), d = o && D(o) ? $(o) : o;
    let p = h, m = Le(p);
    for (; m && o && d !== p; ) {
      const v = Y(m), y = m.getBoundingClientRect(), _ = N(m), E = y.left + (m.clientLeft + parseFloat(_.paddingLeft)) * v.x, S = y.top + (m.clientTop + parseFloat(_.paddingTop)) * v.y;
      u *= v.x, l *= v.y, a *= v.x, f *= v.y, u += E, l += S, p = $(m), m = Le(p);
    }
  }
  return he({
    width: a,
    height: f,
    x: u,
    y: l
  });
}
function _e(e, t) {
  const n = be(e).scrollLeft;
  return t ? t.left + n : H(j(e)).left + n;
}
function Bt(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - _e(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function Sr(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", i = j(o), c = t ? we(t.floating) : !1;
  if (o === i || c && s)
    return n;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = M(1);
  const a = M(0), f = B(o);
  if ((f || !f && !s) && ((J(o) !== "body" || re(i)) && (u = be(o)), f)) {
    const d = H(o);
    l = Y(o), a.x = d.x + o.clientLeft, a.y = d.y + o.clientTop;
  }
  const h = i && !f && !s ? Bt(i, u) : M(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - u.scrollLeft * l.x + a.x + h.x,
    y: n.y * l.y - u.scrollTop * l.y + a.y + h.y
  };
}
function xr(e) {
  return Array.from(e.getClientRects());
}
function Or(e) {
  const t = j(e), n = be(e), o = e.ownerDocument.body, r = C(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = C(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let i = -n.scrollLeft + _e(e);
  const c = -n.scrollTop;
  return N(o).direction === "rtl" && (i += C(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: i,
    y: c
  };
}
const vt = 25;
function Rr(e, t) {
  const n = $(e), o = j(e), r = n.visualViewport;
  let s = o.clientWidth, i = o.clientHeight, c = 0, u = 0;
  if (r) {
    s = r.width, i = r.height;
    const a = Ye();
    (!a || a && t === "fixed") && (c = r.offsetLeft, u = r.offsetTop);
  }
  const l = _e(o);
  if (l <= 0) {
    const a = o.ownerDocument, f = a.body, h = getComputedStyle(f), d = a.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, p = Math.abs(o.clientWidth - f.clientWidth - d);
    p <= vt && (s -= p);
  } else l <= vt && (s += l);
  return {
    width: s,
    height: i,
    x: c,
    y: u
  };
}
function Tr(e, t) {
  const n = H(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = B(e) ? Y(e) : M(1), i = e.clientWidth * s.x, c = e.clientHeight * s.y, u = r * s.x, l = o * s.y;
  return {
    width: i,
    height: c,
    x: u,
    y: l
  };
}
function wt(e, t, n) {
  let o;
  if (t === "viewport")
    o = Rr(e, n);
  else if (t === "document")
    o = Or(j(e));
  else if (D(t))
    o = Tr(t, n);
  else {
    const r = jt(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return he(o);
}
function Vt(e, t) {
  const n = F(e);
  return n === t || !D(n) || K(n) ? !1 : N(n).position === "fixed" || Vt(n, t);
}
function Ar(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = ne(e, [], !1).filter((c) => D(c) && J(c) !== "body"), r = null;
  const s = N(e).position === "fixed";
  let i = s ? F(e) : e;
  for (; D(i) && !K(i); ) {
    const c = N(i), u = qe(i);
    !u && c.position === "fixed" && (r = null), (s ? !u && !r : !u && c.position === "static" && !!r && (r.position === "absolute" || r.position === "fixed") || re(i) && !u && Vt(e, i)) ? o = o.filter((a) => a !== i) : r = c, i = F(i);
  }
  return t.set(e, o), o;
}
function zr(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const i = [...n === "clippingAncestors" ? we(t) ? [] : Ar(t, this._c) : [].concat(n), o], c = wt(t, i[0], r);
  let u = c.top, l = c.right, a = c.bottom, f = c.left;
  for (let h = 1; h < i.length; h++) {
    const d = wt(t, i[h], r);
    u = C(d.top, u), l = te(d.right, l), a = te(d.bottom, a), f = C(d.left, f);
  }
  return {
    width: l - f,
    height: a - u,
    x: f,
    y: u
  };
}
function $r(e) {
  const {
    width: t,
    height: n
  } = Zt(e);
  return {
    width: t,
    height: n
  };
}
function Cr(e, t, n) {
  const o = B(t), r = j(t), s = n === "fixed", i = H(e, !0, s, t);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = M(0);
  function l() {
    u.x = _e(r);
  }
  if (o || !o && !s)
    if ((J(t) !== "body" || re(r)) && (c = be(t)), o) {
      const d = H(t, !0, s, t);
      u.x = d.x + t.clientLeft, u.y = d.y + t.clientTop;
    } else r && l();
  s && !o && r && l();
  const a = r && !o && !s ? Bt(r, c) : M(0), f = i.left + c.scrollLeft - u.x - a.x, h = i.top + c.scrollTop - u.y - a.y;
  return {
    x: f,
    y: h,
    width: i.width,
    height: i.height
  };
}
function Ae(e) {
  return N(e).position === "static";
}
function bt(e, t) {
  if (!B(e) || N(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return j(e) === n && (n = n.ownerDocument.body), n;
}
function Wt(e, t) {
  const n = $(e);
  if (we(e))
    return n;
  if (!B(e)) {
    let r = F(e);
    for (; r && !K(r); ) {
      if (D(r) && !Ae(r))
        return r;
      r = F(r);
    }
    return n;
  }
  let o = bt(e, t);
  for (; o && yr(o) && Ae(o); )
    o = bt(o, t);
  return o && K(o) && Ae(o) && !qe(o) ? n : o || br(e) || n;
}
const Lr = async function(e) {
  const t = this.getOffsetParent || Wt, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: Cr(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function kr(e) {
  return N(e).direction === "rtl";
}
const Dr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Sr,
  getDocumentElement: j,
  getClippingRect: zr,
  getOffsetParent: Wt,
  getElementRects: Lr,
  getClientRects: xr,
  getDimensions: $r,
  getScale: Y,
  isElement: D,
  isRTL: kr
};
function Ft(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Nr(e, t) {
  let n = null, o;
  const r = j(e);
  function s() {
    var c;
    clearTimeout(o), (c = n) == null || c.disconnect(), n = null;
  }
  function i(c, u) {
    c === void 0 && (c = !1), u === void 0 && (u = 1), s();
    const l = e.getBoundingClientRect(), {
      left: a,
      top: f,
      width: h,
      height: d
    } = l;
    if (c || t(), !h || !d)
      return;
    const p = se(f), m = se(r.clientWidth - (a + h)), v = se(r.clientHeight - (f + d)), y = se(a), E = {
      rootMargin: -p + "px " + -m + "px " + -v + "px " + -y + "px",
      threshold: C(0, te(1, u)) || 1
    };
    let S = !0;
    function x(O) {
      const P = O[0].intersectionRatio;
      if (P !== u) {
        if (!S)
          return i();
        P ? i(!1, P) : o = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      P === 1 && !Ft(l, e.getBoundingClientRect()) && i(), S = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...E,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, E);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function Pr(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = o, l = Ke(e), a = r || s ? [...l ? ne(l) : [], ...t ? ne(t) : []] : [];
  a.forEach((y) => {
    r && y.addEventListener("scroll", n, {
      passive: !0
    }), s && y.addEventListener("resize", n);
  });
  const f = l && c ? Nr(l, n) : null;
  let h = -1, d = null;
  i && (d = new ResizeObserver((y) => {
    let [_] = y;
    _ && _.target === l && d && t && (d.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var E;
      (E = d) == null || E.observe(t);
    })), n();
  }), l && !u && d.observe(l), t && d.observe(t));
  let p, m = u ? H(e) : null;
  u && v();
  function v() {
    const y = H(e);
    m && !Ft(m, y) && n(), m = y, p = requestAnimationFrame(v);
  }
  return n(), () => {
    var y;
    a.forEach((_) => {
      r && _.removeEventListener("scroll", n), s && _.removeEventListener("resize", n);
    }), f?.(), (y = d) == null || y.disconnect(), d = null, u && cancelAnimationFrame(p);
  };
}
const Mr = mr, Ir = gr, Zr = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Dr,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return dr(e, t, {
    ...r,
    platform: s
  });
};
function Ut(e, t) {
  return Pr(
    t,
    e,
    () => {
      Zr(t, e, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Mr(({ rects: n }) => -n.reference.height),
          Ir({
            apply({ rects: n }) {
              Object.assign(e.style, {
                width: `${n.reference.width}px`,
                height: `${n.reference.height}px`
              });
            }
          })
        ]
      }).then(({ x: n, y: o }) => {
        Object.assign(e.style, {
          left: `${n}px`,
          top: `${o}px`
        });
      });
    },
    { elementResize: !1 }
  );
}
const _t = "ev-hover-overlay", jr = "#7C3AED", Br = "rgba(124, 58, 237, 0.06)", Vr = 1.5;
function Wr() {
  const e = Pt({ id: _t });
  return e || Nt({
    styles: {
      border: `${Vr}px solid ${jr}`,
      backgroundColor: Br,
      zIndex: Ve.hoverOverlay,
      display: "none"
    },
    attrs: { id: _t }
  });
}
function Fr(e) {
  let t = null;
  e.subscribe(
    (n) => n.elements.hovered,
    (n) => {
      t?.(), t = null;
      const o = Wr();
      if (!n) {
        o.style.display = "none";
        return;
      }
      const r = je(n.id, n.index);
      if (!r) {
        o.style.display = "none";
        return;
      }
      o.style.display = "block", t = Ut(o, r);
    }
  );
}
const Ee = "data-ev-selection-id", Xe = "data-ev-selection-index", Ur = "#7C3AED", Hr = 2, ke = /* @__PURE__ */ new WeakMap();
function Ht(e, t) {
  return `${e}::${t}`;
}
function qr(e) {
  return Ht(e.id, String(e.index ?? ""));
}
function Yr(e) {
  return Ht(e.getAttribute(Ee) ?? "", e.getAttribute(Xe) ?? "");
}
function Kr(e) {
  ke.get(e)?.(), ke.delete(e), e.remove();
}
function Xr(e) {
  for (const t of rr(Ee))
    e.has(Yr(t)) || Kr(t);
}
function Gr(e, t) {
  const n = Nt({
    styles: {
      border: `${Hr}px solid ${Ur}`,
      zIndex: Ve.selectionOverlay
    },
    attrs: {
      [Ee]: e.id,
      [Xe]: String(e.index ?? "")
    }
  });
  ke.set(n, Ut(n, t));
}
function Jr(e) {
  for (const t of e) {
    if (Pt({
      [Ee]: t.id,
      [Xe]: String(t.index ?? "")
    }))
      continue;
    const o = je(t.id, t.index);
    o && Gr(t, o);
  }
}
function Qr(e) {
  e.subscribe(
    (t) => t.elements.selected,
    (t) => {
      const n = new Set(t.map(qr));
      Xr(n), Jr(t);
    }
  );
}
function ei(e) {
  er(e), Fr(e), Qr(e), tr(e);
}
(() => {
  const e = To({
    name: "Preview",
    origin: "https://sticklight.com",
    getTarget: () => window.parent
  });
  e.startSyncing(), Go(e), ei(e);
})();
(() => {
  const e = zo({
    name: "Preview",
    origin: "https://sticklight.com",
    getTarget: () => window.parent
  });
  e.startSyncing({
    onSuccess: () => {
      e.setState({
        path: window.location.pathname,
        status: Et(),
        errors: []
      });
    }
  }), document.addEventListener("readystatechange", () => {
    e.setState({ status: Et() });
  }), window.addEventListener("beforeunload", () => {
    e.setState({ status: "loading", errors: [] });
  });
  const t = history.pushState.bind(history);
  history.pushState = function(...o) {
    t(...o), e.setState({ path: window.location.pathname });
  };
  const n = history.replaceState.bind(history);
  history.replaceState = function(...o) {
    n(...o), e.setState({ path: window.location.pathname });
  }, window.addEventListener("popstate", () => {
    e.setState({ path: window.location.pathname });
  }), window.addEventListener("error", (o) => {
    const r = xt(window.location.href), s = xt(o.filename);
    if (!r || !s || s.hostname !== r.hostname)
      return;
    const i = {
      type: "error",
      message: o.message,
      filename: s.pathname,
      lineno: o.lineno || null,
      colno: o.colno || null,
      stack: o.error?.stack ?? null,
      name: o.error?.name ?? null
    };
    St(e, i);
  }), window.addEventListener("unhandledrejection", (o) => {
    const r = {
      type: "unhandled-rejection",
      message: String(o.reason)
    };
    St(e, r);
  });
})();
function Et() {
  return document.readyState === "loading" ? "loading" : document.readyState === "interactive" ? "ready" : "complete";
}
function St(e, t) {
  const n = [...e.getState().errors, t];
  e.setState({ errors: n.slice(-50) });
}
function xt(e) {
  try {
    return new URL(e);
  } catch {
    return null;
  }
}
