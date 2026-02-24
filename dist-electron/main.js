import yr, { app as _t, ipcMain as Bt, shell as Xm, BrowserWindow as Sd, dialog as Km } from "electron";
import { createRequire as Ad } from "node:module";
import { fileURLToPath as Jm } from "node:url";
import ye from "node:path";
import le from "node:fs";
import Re from "fs";
import Td from "constants";
import Ye from "stream";
import Je from "util";
import Cd from "assert";
import ne from "path";
import Ea from "child_process";
import zn from "events";
import Wn from "crypto";
import Rd from "tty";
import _a from "os";
import Kt from "url";
import ba from "zlib";
import Qm from "http";
import Zm from "node:https";
import el from "buffer";
import ex from "string_decoder";
var ie = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Od(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function tx(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Pd = {}, wr = {}, je = {};
je.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, a) => i != null ? n(i) : r(a)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
je.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var Ft = Td, rx = process.cwd, Ki = null, nx = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return Ki || (Ki = rx.call(process)), Ki;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var vc = process.chdir;
  process.chdir = function(e) {
    Ki = null, vc.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, vc);
}
var ix = ax;
function ax(e) {
  Ft.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(u, d, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(u, d, h, m) {
    m && process.nextTick(m);
  }, e.lchownSync = function() {
  }), nx === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(u) {
    function d(h, m, w) {
      var x = Date.now(), b = 0;
      u(h, m, function g(v) {
        if (v && (v.code === "EACCES" || v.code === "EPERM" || v.code === "EBUSY") && Date.now() - x < 6e4) {
          setTimeout(function() {
            e.stat(m, function(O, D) {
              O && O.code === "ENOENT" ? u(h, m, g) : w(v);
            });
          }, b), b < 100 && (b += 10);
          return;
        }
        w && w(v);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(d, u), d;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(u) {
    function d(h, m, w, x, b, g) {
      var v;
      if (g && typeof g == "function") {
        var O = 0;
        v = function(D, B, F) {
          if (D && D.code === "EAGAIN" && O < 10)
            return O++, u.call(e, h, m, w, x, b, v);
          g.apply(this, arguments);
        };
      }
      return u.call(e, h, m, w, x, b, v);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(d, u), d;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(u) {
    return function(d, h, m, w, x) {
      for (var b = 0; ; )
        try {
          return u.call(e, d, h, m, w, x);
        } catch (g) {
          if (g.code === "EAGAIN" && b < 10) {
            b++;
            continue;
          }
          throw g;
        }
    };
  }(e.readSync);
  function t(u) {
    u.lchmod = function(d, h, m) {
      u.open(
        d,
        Ft.O_WRONLY | Ft.O_SYMLINK,
        h,
        function(w, x) {
          if (w) {
            m && m(w);
            return;
          }
          u.fchmod(x, h, function(b) {
            u.close(x, function(g) {
              m && m(b || g);
            });
          });
        }
      );
    }, u.lchmodSync = function(d, h) {
      var m = u.openSync(d, Ft.O_WRONLY | Ft.O_SYMLINK, h), w = !0, x;
      try {
        x = u.fchmodSync(m, h), w = !1;
      } finally {
        if (w)
          try {
            u.closeSync(m);
          } catch {
          }
        else
          u.closeSync(m);
      }
      return x;
    };
  }
  function r(u) {
    Ft.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function(d, h, m, w) {
      u.open(d, Ft.O_SYMLINK, function(x, b) {
        if (x) {
          w && w(x);
          return;
        }
        u.futimes(b, h, m, function(g) {
          u.close(b, function(v) {
            w && w(g || v);
          });
        });
      });
    }, u.lutimesSync = function(d, h, m) {
      var w = u.openSync(d, Ft.O_SYMLINK), x, b = !0;
      try {
        x = u.futimesSync(w, h, m), b = !1;
      } finally {
        if (b)
          try {
            u.closeSync(w);
          } catch {
          }
        else
          u.closeSync(w);
      }
      return x;
    }) : u.futimes && (u.lutimes = function(d, h, m, w) {
      w && process.nextTick(w);
    }, u.lutimesSync = function() {
    });
  }
  function n(u) {
    return u && function(d, h, m) {
      return u.call(e, d, h, function(w) {
        p(w) && (w = null), m && m.apply(this, arguments);
      });
    };
  }
  function i(u) {
    return u && function(d, h) {
      try {
        return u.call(e, d, h);
      } catch (m) {
        if (!p(m)) throw m;
      }
    };
  }
  function a(u) {
    return u && function(d, h, m, w) {
      return u.call(e, d, h, m, function(x) {
        p(x) && (x = null), w && w.apply(this, arguments);
      });
    };
  }
  function o(u) {
    return u && function(d, h, m) {
      try {
        return u.call(e, d, h, m);
      } catch (w) {
        if (!p(w)) throw w;
      }
    };
  }
  function s(u) {
    return u && function(d, h, m) {
      typeof h == "function" && (m = h, h = null);
      function w(x, b) {
        b && (b.uid < 0 && (b.uid += 4294967296), b.gid < 0 && (b.gid += 4294967296)), m && m.apply(this, arguments);
      }
      return h ? u.call(e, d, h, w) : u.call(e, d, w);
    };
  }
  function l(u) {
    return u && function(d, h) {
      var m = h ? u.call(e, d, h) : u.call(e, d);
      return m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)), m;
    };
  }
  function p(u) {
    if (!u || u.code === "ENOSYS")
      return !0;
    var d = !process.getuid || process.getuid() !== 0;
    return !!(d && (u.code === "EINVAL" || u.code === "EPERM"));
  }
}
var wc = Ye.Stream, ox = sx;
function sx(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    wc.call(this);
    var a = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), s = 0, l = o.length; s < l; s++) {
      var p = o[s];
      this[p] = i[p];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        a._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(u, d) {
      if (u) {
        a.emit("error", u), a.readable = !1;
        return;
      }
      a.fd = d, a.emit("open", d), a._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    wc.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
      var l = a[o];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var lx = ux, cx = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function ux(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: cx(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var fe = Re, fx = ix, dx = ox, hx = lx, Ti = Je, Oe, oa;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Oe = Symbol.for("graceful-fs.queue"), oa = Symbol.for("graceful-fs.previous")) : (Oe = "___graceful-fs.queue", oa = "___graceful-fs.previous");
function px() {
}
function Dd(e, t) {
  Object.defineProperty(e, Oe, {
    get: function() {
      return t;
    }
  });
}
var pr = px;
Ti.debuglog ? pr = Ti.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (pr = function() {
  var e = Ti.format.apply(Ti, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!fe[Oe]) {
  var mx = ie[Oe] || [];
  Dd(fe, mx), fe.close = function(e) {
    function t(r, n) {
      return e.call(fe, r, function(i) {
        i || Ec(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, oa, {
      value: e
    }), t;
  }(fe.close), fe.closeSync = function(e) {
    function t(r) {
      e.apply(fe, arguments), Ec();
    }
    return Object.defineProperty(t, oa, {
      value: e
    }), t;
  }(fe.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    pr(fe[Oe]), Cd.equal(fe[Oe].length, 0);
  });
}
ie[Oe] || Dd(ie, fe[Oe]);
var Pe = tl(hx(fe));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fe.__patched && (Pe = tl(fe), fe.__patched = !0);
function tl(e) {
  fx(e), e.gracefulify = tl, e.createReadStream = B, e.createWriteStream = F;
  var t = e.readFile;
  e.readFile = r;
  function r(E, U, q) {
    return typeof U == "function" && (q = U, U = null), G(E, U, q);
    function G(J, N, P, k) {
      return t(J, N, function(_) {
        _ && (_.code === "EMFILE" || _.code === "ENFILE") ? Rr([G, [J, N, P], _, k || Date.now(), Date.now()]) : typeof P == "function" && P.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(E, U, q, G) {
    return typeof q == "function" && (G = q, q = null), J(E, U, q, G);
    function J(N, P, k, _, A) {
      return n(N, P, k, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Rr([J, [N, P, k, _], R, A || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = o);
  function o(E, U, q, G) {
    return typeof q == "function" && (G = q, q = null), J(E, U, q, G);
    function J(N, P, k, _, A) {
      return a(N, P, k, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Rr([J, [N, P, k, _], R, A || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(E, U, q, G) {
    return typeof q == "function" && (G = q, q = 0), J(E, U, q, G);
    function J(N, P, k, _, A) {
      return s(N, P, k, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Rr([J, [N, P, k, _], R, A || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
      });
    }
  }
  var p = e.readdir;
  e.readdir = d;
  var u = /^v[0-5]\./;
  function d(E, U, q) {
    typeof U == "function" && (q = U, U = null);
    var G = u.test(process.version) ? function(P, k, _, A) {
      return p(P, J(
        P,
        k,
        _,
        A
      ));
    } : function(P, k, _, A) {
      return p(P, k, J(
        P,
        k,
        _,
        A
      ));
    };
    return G(E, U, q);
    function J(N, P, k, _) {
      return function(A, R) {
        A && (A.code === "EMFILE" || A.code === "ENFILE") ? Rr([
          G,
          [N, P, k],
          A,
          _ || Date.now(),
          Date.now()
        ]) : (R && R.sort && R.sort(), typeof k == "function" && k.call(this, A, R));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = dx(e);
    g = h.ReadStream, O = h.WriteStream;
  }
  var m = e.ReadStream;
  m && (g.prototype = Object.create(m.prototype), g.prototype.open = v);
  var w = e.WriteStream;
  w && (O.prototype = Object.create(w.prototype), O.prototype.open = D), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return g;
    },
    set: function(E) {
      g = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return O;
    },
    set: function(E) {
      O = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var x = g;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return x;
    },
    set: function(E) {
      x = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var b = O;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return b;
    },
    set: function(E) {
      b = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function g(E, U) {
    return this instanceof g ? (m.apply(this, arguments), this) : g.apply(Object.create(g.prototype), arguments);
  }
  function v() {
    var E = this;
    Y(E.path, E.flags, E.mode, function(U, q) {
      U ? (E.autoClose && E.destroy(), E.emit("error", U)) : (E.fd = q, E.emit("open", q), E.read());
    });
  }
  function O(E, U) {
    return this instanceof O ? (w.apply(this, arguments), this) : O.apply(Object.create(O.prototype), arguments);
  }
  function D() {
    var E = this;
    Y(E.path, E.flags, E.mode, function(U, q) {
      U ? (E.destroy(), E.emit("error", U)) : (E.fd = q, E.emit("open", q));
    });
  }
  function B(E, U) {
    return new e.ReadStream(E, U);
  }
  function F(E, U) {
    return new e.WriteStream(E, U);
  }
  var L = e.open;
  e.open = Y;
  function Y(E, U, q, G) {
    return typeof q == "function" && (G = q, q = null), J(E, U, q, G);
    function J(N, P, k, _, A) {
      return L(N, P, k, function(R, I) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? Rr([J, [N, P, k, _], R, A || Date.now(), Date.now()]) : typeof _ == "function" && _.apply(this, arguments);
      });
    }
  }
  return e;
}
function Rr(e) {
  pr("ENQUEUE", e[0].name, e[1]), fe[Oe].push(e), rl();
}
var Ci;
function Ec() {
  for (var e = Date.now(), t = 0; t < fe[Oe].length; ++t)
    fe[Oe][t].length > 2 && (fe[Oe][t][3] = e, fe[Oe][t][4] = e);
  rl();
}
function rl() {
  if (clearTimeout(Ci), Ci = void 0, fe[Oe].length !== 0) {
    var e = fe[Oe].shift(), t = e[0], r = e[1], n = e[2], i = e[3], a = e[4];
    if (i === void 0)
      pr("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      pr("TIMEOUT", t.name, r);
      var o = r.pop();
      typeof o == "function" && o.call(null, n);
    } else {
      var s = Date.now() - a, l = Math.max(a - i, 1), p = Math.min(l * 1.2, 100);
      s >= p ? (pr("RETRY", t.name, r), t.apply(null, r.concat([i]))) : fe[Oe].push(e);
    }
    Ci === void 0 && (Ci = setTimeout(rl, 0));
  }
}
const xx = /* @__PURE__ */ Od(Pe);
(function(e) {
  const t = je.fromCallback, r = Pe, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, a) {
    return typeof a == "function" ? r.exists(i, a) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, a, o, s, l, p) {
    return typeof p == "function" ? r.read(i, a, o, s, l, p) : new Promise((u, d) => {
      r.read(i, a, o, s, l, (h, m, w) => {
        if (h) return d(h);
        u({ bytesRead: m, buffer: w });
      });
    });
  }, e.write = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, a, ...o) : new Promise((s, l) => {
      r.write(i, a, ...o, (p, u, d) => {
        if (p) return l(p);
        s({ bytesWritten: u, buffer: d });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, a, ...o) : new Promise((s, l) => {
      r.writev(i, a, ...o, (p, u, d) => {
        if (p) return l(p);
        s({ bytesWritten: u, buffers: d });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(wr);
var nl = {}, Id = {};
const gx = ne;
Id.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(gx.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const Fd = wr, { checkPath: Nd } = Id, $d = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
nl.makeDir = async (e, t) => (Nd(e), Fd.mkdir(e, {
  mode: $d(t),
  recursive: !0
}));
nl.makeDirSync = (e, t) => (Nd(e), Fd.mkdirSync(e, {
  mode: $d(t),
  recursive: !0
}));
const yx = je.fromPromise, { makeDir: vx, makeDirSync: mo } = nl, xo = yx(vx);
var mt = {
  mkdirs: xo,
  mkdirsSync: mo,
  // alias
  mkdirp: xo,
  mkdirpSync: mo,
  ensureDir: xo,
  ensureDirSync: mo
};
const wx = je.fromPromise, Ld = wr;
function Ex(e) {
  return Ld.access(e).then(() => !0).catch(() => !1);
}
var Er = {
  pathExists: wx(Ex),
  pathExistsSync: Ld.existsSync
};
const Gr = Pe;
function _x(e, t, r, n) {
  Gr.open(e, "r+", (i, a) => {
    if (i) return n(i);
    Gr.futimes(a, t, r, (o) => {
      Gr.close(a, (s) => {
        n && n(o || s);
      });
    });
  });
}
function bx(e, t, r) {
  const n = Gr.openSync(e, "r+");
  return Gr.futimesSync(n, t, r), Gr.closeSync(n);
}
var Ud = {
  utimesMillis: _x,
  utimesMillisSync: bx
};
const Jr = wr, be = ne, Sx = Je;
function Ax(e, t, r) {
  const n = r.dereference ? (i) => Jr.stat(i, { bigint: !0 }) : (i) => Jr.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, a]) => ({ srcStat: i, destStat: a }));
}
function Tx(e, t, r) {
  let n;
  const i = r.dereference ? (o) => Jr.statSync(o, { bigint: !0 }) : (o) => Jr.lstatSync(o, { bigint: !0 }), a = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: a, destStat: null };
    throw o;
  }
  return { srcStat: a, destStat: n };
}
function Cx(e, t, r, n, i) {
  Sx.callbackify(Ax)(e, t, n, (a, o) => {
    if (a) return i(a);
    const { srcStat: s, destStat: l } = o;
    if (l) {
      if (Vn(s, l)) {
        const p = be.basename(e), u = be.basename(t);
        return r === "move" && p !== u && p.toLowerCase() === u.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && il(e, t) ? i(new Error(Sa(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function Rx(e, t, r, n) {
  const { srcStat: i, destStat: a } = Tx(e, t, n);
  if (a) {
    if (Vn(i, a)) {
      const o = be.basename(e), s = be.basename(t);
      if (r === "move" && o !== s && o.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && il(e, t))
    throw new Error(Sa(e, t, r));
  return { srcStat: i, destStat: a };
}
function kd(e, t, r, n, i) {
  const a = be.resolve(be.dirname(e)), o = be.resolve(be.dirname(r));
  if (o === a || o === be.parse(o).root) return i();
  Jr.stat(o, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Vn(t, l) ? i(new Error(Sa(e, r, n))) : kd(e, t, o, n, i));
}
function Bd(e, t, r, n) {
  const i = be.resolve(be.dirname(e)), a = be.resolve(be.dirname(r));
  if (a === i || a === be.parse(a).root) return;
  let o;
  try {
    o = Jr.statSync(a, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Vn(t, o))
    throw new Error(Sa(e, r, n));
  return Bd(e, t, a, n);
}
function Vn(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function il(e, t) {
  const r = be.resolve(e).split(be.sep).filter((i) => i), n = be.resolve(t).split(be.sep).filter((i) => i);
  return r.reduce((i, a, o) => i && n[o] === a, !0);
}
function Sa(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var nn = {
  checkPaths: Cx,
  checkPathsSync: Rx,
  checkParentPaths: kd,
  checkParentPathsSync: Bd,
  isSrcSubdir: il,
  areIdentical: Vn
};
const Ge = Pe, Cn = ne, Ox = mt.mkdirs, Px = Er.pathExists, Dx = Ud.utimesMillis, Rn = nn;
function Ix(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Rn.checkPaths(e, t, "copy", r, (i, a) => {
    if (i) return n(i);
    const { srcStat: o, destStat: s } = a;
    Rn.checkParentPaths(e, o, t, "copy", (l) => l ? n(l) : r.filter ? Md(_c, s, e, t, r, n) : _c(s, e, t, r, n));
  });
}
function _c(e, t, r, n, i) {
  const a = Cn.dirname(r);
  Px(a, (o, s) => {
    if (o) return i(o);
    if (s) return sa(e, t, r, n, i);
    Ox(a, (l) => l ? i(l) : sa(e, t, r, n, i));
  });
}
function Md(e, t, r, n, i, a) {
  Promise.resolve(i.filter(r, n)).then((o) => o ? e(t, r, n, i, a) : a(), (o) => a(o));
}
function Fx(e, t, r, n, i) {
  return n.filter ? Md(sa, e, t, r, n, i) : sa(e, t, r, n, i);
}
function sa(e, t, r, n, i) {
  (n.dereference ? Ge.stat : Ge.lstat)(t, (o, s) => o ? i(o) : s.isDirectory() ? Mx(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? Nx(s, e, t, r, n, i) : s.isSymbolicLink() ? Hx(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Nx(e, t, r, n, i, a) {
  return t ? $x(e, r, n, i, a) : jd(e, r, n, i, a);
}
function $x(e, t, r, n, i) {
  if (n.overwrite)
    Ge.unlink(r, (a) => a ? i(a) : jd(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function jd(e, t, r, n, i) {
  Ge.copyFile(t, r, (a) => a ? i(a) : n.preserveTimestamps ? Lx(e.mode, t, r, i) : Aa(r, e.mode, i));
}
function Lx(e, t, r, n) {
  return Ux(e) ? kx(r, e, (i) => i ? n(i) : bc(e, t, r, n)) : bc(e, t, r, n);
}
function Ux(e) {
  return (e & 128) === 0;
}
function kx(e, t, r) {
  return Aa(e, t | 128, r);
}
function bc(e, t, r, n) {
  Bx(t, r, (i) => i ? n(i) : Aa(r, e, n));
}
function Aa(e, t, r) {
  return Ge.chmod(e, t, r);
}
function Bx(e, t, r) {
  Ge.stat(e, (n, i) => n ? r(n) : Dx(t, i.atime, i.mtime, r));
}
function Mx(e, t, r, n, i, a) {
  return t ? qd(r, n, i, a) : jx(e.mode, r, n, i, a);
}
function jx(e, t, r, n, i) {
  Ge.mkdir(r, (a) => {
    if (a) return i(a);
    qd(t, r, n, (o) => o ? i(o) : Aa(r, e, i));
  });
}
function qd(e, t, r, n) {
  Ge.readdir(e, (i, a) => i ? n(i) : Hd(a, e, t, r, n));
}
function Hd(e, t, r, n, i) {
  const a = e.pop();
  return a ? qx(e, a, t, r, n, i) : i();
}
function qx(e, t, r, n, i, a) {
  const o = Cn.join(r, t), s = Cn.join(n, t);
  Rn.checkPaths(o, s, "copy", i, (l, p) => {
    if (l) return a(l);
    const { destStat: u } = p;
    Fx(u, o, s, i, (d) => d ? a(d) : Hd(e, r, n, i, a));
  });
}
function Hx(e, t, r, n, i) {
  Ge.readlink(t, (a, o) => {
    if (a) return i(a);
    if (n.dereference && (o = Cn.resolve(process.cwd(), o)), e)
      Ge.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Ge.symlink(o, r, i) : i(s) : (n.dereference && (l = Cn.resolve(process.cwd(), l)), Rn.isSrcSubdir(o, l) ? i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Rn.isSrcSubdir(l, o) ? i(new Error(`Cannot overwrite '${l}' with '${o}'.`)) : Gx(o, r, i)));
    else
      return Ge.symlink(o, r, i);
  });
}
function Gx(e, t, r) {
  Ge.unlink(t, (n) => n ? r(n) : Ge.symlink(e, t, r));
}
var zx = Ix;
const Fe = Pe, On = ne, Wx = mt.mkdirsSync, Vx = Ud.utimesMillisSync, Pn = nn;
function Yx(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Pn.checkPathsSync(e, t, "copy", r);
  return Pn.checkParentPathsSync(e, n, t, "copy"), Xx(i, e, t, r);
}
function Xx(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = On.dirname(r);
  return Fe.existsSync(i) || Wx(i), Gd(e, t, r, n);
}
function Kx(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Gd(e, t, r, n);
}
function Gd(e, t, r, n) {
  const a = (n.dereference ? Fe.statSync : Fe.lstatSync)(t);
  if (a.isDirectory()) return ng(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return Jx(a, e, t, r, n);
  if (a.isSymbolicLink()) return og(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Jx(e, t, r, n, i) {
  return t ? Qx(e, r, n, i) : zd(e, r, n, i);
}
function Qx(e, t, r, n) {
  if (n.overwrite)
    return Fe.unlinkSync(r), zd(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function zd(e, t, r, n) {
  return Fe.copyFileSync(t, r), n.preserveTimestamps && Zx(e.mode, t, r), al(r, e.mode);
}
function Zx(e, t, r) {
  return eg(e) && tg(r, e), rg(t, r);
}
function eg(e) {
  return (e & 128) === 0;
}
function tg(e, t) {
  return al(e, t | 128);
}
function al(e, t) {
  return Fe.chmodSync(e, t);
}
function rg(e, t) {
  const r = Fe.statSync(e);
  return Vx(t, r.atime, r.mtime);
}
function ng(e, t, r, n, i) {
  return t ? Wd(r, n, i) : ig(e.mode, r, n, i);
}
function ig(e, t, r, n) {
  return Fe.mkdirSync(r), Wd(t, r, n), al(r, e);
}
function Wd(e, t, r) {
  Fe.readdirSync(e).forEach((n) => ag(n, e, t, r));
}
function ag(e, t, r, n) {
  const i = On.join(t, e), a = On.join(r, e), { destStat: o } = Pn.checkPathsSync(i, a, "copy", n);
  return Kx(o, i, a, n);
}
function og(e, t, r, n) {
  let i = Fe.readlinkSync(t);
  if (n.dereference && (i = On.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = Fe.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return Fe.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (a = On.resolve(process.cwd(), a)), Pn.isSrcSubdir(i, a))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
    if (Fe.statSync(r).isDirectory() && Pn.isSrcSubdir(a, i))
      throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
    return sg(i, r);
  } else
    return Fe.symlinkSync(i, r);
}
function sg(e, t) {
  return Fe.unlinkSync(t), Fe.symlinkSync(e, t);
}
var lg = Yx;
const cg = je.fromCallback;
var ol = {
  copy: cg(zx),
  copySync: lg
};
const Sc = Pe, Vd = ne, ae = Cd, Dn = process.platform === "win32";
function Yd(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Sc[r], r = r + "Sync", e[r] = e[r] || Sc[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function sl(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), ae(e, "rimraf: missing path"), ae.strictEqual(typeof e, "string", "rimraf: path should be a string"), ae.strictEqual(typeof r, "function", "rimraf: callback function required"), ae(t, "rimraf: invalid options argument provided"), ae.strictEqual(typeof t, "object", "rimraf: options should be object"), Yd(t), Ac(e, t, function i(a) {
    if (a) {
      if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const o = n * 100;
        return setTimeout(() => Ac(e, t, i), o);
      }
      a.code === "ENOENT" && (a = null);
    }
    r(a);
  });
}
function Ac(e, t, r) {
  ae(e), ae(t), ae(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Dn)
      return Tc(e, t, n, r);
    if (i && i.isDirectory())
      return Ji(e, t, n, r);
    t.unlink(e, (a) => {
      if (a) {
        if (a.code === "ENOENT")
          return r(null);
        if (a.code === "EPERM")
          return Dn ? Tc(e, t, a, r) : Ji(e, t, a, r);
        if (a.code === "EISDIR")
          return Ji(e, t, a, r);
      }
      return r(a);
    });
  });
}
function Tc(e, t, r, n) {
  ae(e), ae(t), ae(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (a, o) => {
      a ? n(a.code === "ENOENT" ? null : r) : o.isDirectory() ? Ji(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Cc(e, t, r) {
  let n;
  ae(e), ae(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? Qi(e, t, r) : t.unlinkSync(e);
}
function Ji(e, t, r, n) {
  ae(e), ae(t), ae(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? ug(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function ug(e, t, r) {
  ae(e), ae(t), ae(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let a = i.length, o;
    if (a === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      sl(Vd.join(e, s), t, (l) => {
        if (!o) {
          if (l) return r(o = l);
          --a === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function Xd(e, t) {
  let r;
  t = t || {}, Yd(t), ae(e, "rimraf: missing path"), ae.strictEqual(typeof e, "string", "rimraf: path should be a string"), ae(t, "rimraf: missing options"), ae.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Dn && Cc(e, t, n);
  }
  try {
    r && r.isDirectory() ? Qi(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Dn ? Cc(e, t, n) : Qi(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    Qi(e, t, n);
  }
}
function Qi(e, t, r) {
  ae(e), ae(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      fg(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function fg(e, t) {
  if (ae(e), ae(t), t.readdirSync(e).forEach((r) => Xd(Vd.join(e, r), t)), Dn) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var dg = sl;
sl.sync = Xd;
const la = Pe, hg = je.fromCallback, Kd = dg;
function pg(e, t) {
  if (la.rm) return la.rm(e, { recursive: !0, force: !0 }, t);
  Kd(e, t);
}
function mg(e) {
  if (la.rmSync) return la.rmSync(e, { recursive: !0, force: !0 });
  Kd.sync(e);
}
var Ta = {
  remove: hg(pg),
  removeSync: mg
};
const xg = je.fromPromise, Jd = wr, Qd = ne, Zd = mt, e0 = Ta, Rc = xg(async function(t) {
  let r;
  try {
    r = await Jd.readdir(t);
  } catch {
    return Zd.mkdirs(t);
  }
  return Promise.all(r.map((n) => e0.remove(Qd.join(t, n))));
});
function Oc(e) {
  let t;
  try {
    t = Jd.readdirSync(e);
  } catch {
    return Zd.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Qd.join(e, r), e0.removeSync(r);
  });
}
var gg = {
  emptyDirSync: Oc,
  emptydirSync: Oc,
  emptyDir: Rc,
  emptydir: Rc
};
const yg = je.fromCallback, t0 = ne, Mt = Pe, r0 = mt;
function vg(e, t) {
  function r() {
    Mt.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  Mt.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const a = t0.dirname(e);
    Mt.stat(a, (o, s) => {
      if (o)
        return o.code === "ENOENT" ? r0.mkdirs(a, (l) => {
          if (l) return t(l);
          r();
        }) : t(o);
      s.isDirectory() ? r() : Mt.readdir(a, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function wg(e) {
  let t;
  try {
    t = Mt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = t0.dirname(e);
  try {
    Mt.statSync(r).isDirectory() || Mt.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") r0.mkdirsSync(r);
    else throw n;
  }
  Mt.writeFileSync(e, "");
}
var Eg = {
  createFile: yg(vg),
  createFileSync: wg
};
const _g = je.fromCallback, n0 = ne, kt = Pe, i0 = mt, bg = Er.pathExists, { areIdentical: a0 } = nn;
function Sg(e, t, r) {
  function n(i, a) {
    kt.link(i, a, (o) => {
      if (o) return r(o);
      r(null);
    });
  }
  kt.lstat(t, (i, a) => {
    kt.lstat(e, (o, s) => {
      if (o)
        return o.message = o.message.replace("lstat", "ensureLink"), r(o);
      if (a && a0(s, a)) return r(null);
      const l = n0.dirname(t);
      bg(l, (p, u) => {
        if (p) return r(p);
        if (u) return n(e, t);
        i0.mkdirs(l, (d) => {
          if (d) return r(d);
          n(e, t);
        });
      });
    });
  });
}
function Ag(e, t) {
  let r;
  try {
    r = kt.lstatSync(t);
  } catch {
  }
  try {
    const a = kt.lstatSync(e);
    if (r && a0(a, r)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const n = n0.dirname(t);
  return kt.existsSync(n) || i0.mkdirsSync(n), kt.linkSync(e, t);
}
var Tg = {
  createLink: _g(Sg),
  createLinkSync: Ag
};
const jt = ne, bn = Pe, Cg = Er.pathExists;
function Rg(e, t, r) {
  if (jt.isAbsolute(e))
    return bn.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = jt.dirname(t), i = jt.join(n, e);
    return Cg(i, (a, o) => a ? r(a) : o ? r(null, {
      toCwd: i,
      toDst: e
    }) : bn.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: jt.relative(n, e)
    })));
  }
}
function Og(e, t) {
  let r;
  if (jt.isAbsolute(e)) {
    if (r = bn.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = jt.dirname(t), i = jt.join(n, e);
    if (r = bn.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = bn.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: jt.relative(n, e)
    };
  }
}
var Pg = {
  symlinkPaths: Rg,
  symlinkPathsSync: Og
};
const o0 = Pe;
function Dg(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  o0.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function Ig(e, t) {
  let r;
  if (t) return t;
  try {
    r = o0.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var Fg = {
  symlinkType: Dg,
  symlinkTypeSync: Ig
};
const Ng = je.fromCallback, s0 = ne, it = wr, l0 = mt, $g = l0.mkdirs, Lg = l0.mkdirsSync, c0 = Pg, Ug = c0.symlinkPaths, kg = c0.symlinkPathsSync, u0 = Fg, Bg = u0.symlinkType, Mg = u0.symlinkTypeSync, jg = Er.pathExists, { areIdentical: f0 } = nn;
function qg(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, it.lstat(t, (i, a) => {
    !i && a.isSymbolicLink() ? Promise.all([
      it.stat(e),
      it.stat(t)
    ]).then(([o, s]) => {
      if (f0(o, s)) return n(null);
      Pc(e, t, r, n);
    }) : Pc(e, t, r, n);
  });
}
function Pc(e, t, r, n) {
  Ug(e, t, (i, a) => {
    if (i) return n(i);
    e = a.toDst, Bg(a.toCwd, r, (o, s) => {
      if (o) return n(o);
      const l = s0.dirname(t);
      jg(l, (p, u) => {
        if (p) return n(p);
        if (u) return it.symlink(e, t, s, n);
        $g(l, (d) => {
          if (d) return n(d);
          it.symlink(e, t, s, n);
        });
      });
    });
  });
}
function Hg(e, t, r) {
  let n;
  try {
    n = it.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = it.statSync(e), l = it.statSync(t);
    if (f0(s, l)) return;
  }
  const i = kg(e, t);
  e = i.toDst, r = Mg(i.toCwd, r);
  const a = s0.dirname(t);
  return it.existsSync(a) || Lg(a), it.symlinkSync(e, t, r);
}
var Gg = {
  createSymlink: Ng(qg),
  createSymlinkSync: Hg
};
const { createFile: Dc, createFileSync: Ic } = Eg, { createLink: Fc, createLinkSync: Nc } = Tg, { createSymlink: $c, createSymlinkSync: Lc } = Gg;
var zg = {
  // file
  createFile: Dc,
  createFileSync: Ic,
  ensureFile: Dc,
  ensureFileSync: Ic,
  // link
  createLink: Fc,
  createLinkSync: Nc,
  ensureLink: Fc,
  ensureLinkSync: Nc,
  // symlink
  createSymlink: $c,
  createSymlinkSync: Lc,
  ensureSymlink: $c,
  ensureSymlinkSync: Lc
};
function Wg(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const a = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + a;
}
function Vg(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ll = { stringify: Wg, stripBom: Vg };
let Qr;
try {
  Qr = Pe;
} catch {
  Qr = Re;
}
const Ca = je, { stringify: d0, stripBom: h0 } = ll;
async function Yg(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Qr, n = "throws" in t ? t.throws : !0;
  let i = await Ca.fromCallback(r.readFile)(e, t);
  i = h0(i);
  let a;
  try {
    a = JSON.parse(i, t ? t.reviver : null);
  } catch (o) {
    if (n)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
  return a;
}
const Xg = Ca.fromPromise(Yg);
function Kg(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Qr, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = h0(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Jg(e, t, r = {}) {
  const n = r.fs || Qr, i = d0(t, r);
  await Ca.fromCallback(n.writeFile)(e, i, r);
}
const Qg = Ca.fromPromise(Jg);
function Zg(e, t, r = {}) {
  const n = r.fs || Qr, i = d0(t, r);
  return n.writeFileSync(e, i, r);
}
var ey = {
  readFile: Xg,
  readFileSync: Kg,
  writeFile: Qg,
  writeFileSync: Zg
};
const Ri = ey;
var ty = {
  // jsonfile exports
  readJson: Ri.readFile,
  readJsonSync: Ri.readFileSync,
  writeJson: Ri.writeFile,
  writeJsonSync: Ri.writeFileSync
};
const ry = je.fromCallback, Sn = Pe, p0 = ne, m0 = mt, ny = Er.pathExists;
function iy(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = p0.dirname(e);
  ny(i, (a, o) => {
    if (a) return n(a);
    if (o) return Sn.writeFile(e, t, r, n);
    m0.mkdirs(i, (s) => {
      if (s) return n(s);
      Sn.writeFile(e, t, r, n);
    });
  });
}
function ay(e, ...t) {
  const r = p0.dirname(e);
  if (Sn.existsSync(r))
    return Sn.writeFileSync(e, ...t);
  m0.mkdirsSync(r), Sn.writeFileSync(e, ...t);
}
var cl = {
  outputFile: ry(iy),
  outputFileSync: ay
};
const { stringify: oy } = ll, { outputFile: sy } = cl;
async function ly(e, t, r = {}) {
  const n = oy(t, r);
  await sy(e, n, r);
}
var cy = ly;
const { stringify: uy } = ll, { outputFileSync: fy } = cl;
function dy(e, t, r) {
  const n = uy(t, r);
  fy(e, n, r);
}
var hy = dy;
const py = je.fromPromise, Be = ty;
Be.outputJson = py(cy);
Be.outputJsonSync = hy;
Be.outputJSON = Be.outputJson;
Be.outputJSONSync = Be.outputJsonSync;
Be.writeJSON = Be.writeJson;
Be.writeJSONSync = Be.writeJsonSync;
Be.readJSON = Be.readJson;
Be.readJSONSync = Be.readJsonSync;
var my = Be;
const xy = Pe, Ps = ne, gy = ol.copy, x0 = Ta.remove, yy = mt.mkdirp, vy = Er.pathExists, Uc = nn;
function wy(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Uc.checkPaths(e, t, "move", r, (a, o) => {
    if (a) return n(a);
    const { srcStat: s, isChangingCase: l = !1 } = o;
    Uc.checkParentPaths(e, s, t, "move", (p) => {
      if (p) return n(p);
      if (Ey(t)) return kc(e, t, i, l, n);
      yy(Ps.dirname(t), (u) => u ? n(u) : kc(e, t, i, l, n));
    });
  });
}
function Ey(e) {
  const t = Ps.dirname(e);
  return Ps.parse(t).root === t;
}
function kc(e, t, r, n, i) {
  if (n) return go(e, t, r, i);
  if (r)
    return x0(t, (a) => a ? i(a) : go(e, t, r, i));
  vy(t, (a, o) => a ? i(a) : o ? i(new Error("dest already exists.")) : go(e, t, r, i));
}
function go(e, t, r, n) {
  xy.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : _y(e, t, r, n) : n());
}
function _y(e, t, r, n) {
  gy(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (a) => a ? n(a) : x0(e, n));
}
var by = wy;
const g0 = Pe, Ds = ne, Sy = ol.copySync, y0 = Ta.removeSync, Ay = mt.mkdirpSync, Bc = nn;
function Ty(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = Bc.checkPathsSync(e, t, "move", r);
  return Bc.checkParentPathsSync(e, i, t, "move"), Cy(t) || Ay(Ds.dirname(t)), Ry(e, t, n, a);
}
function Cy(e) {
  const t = Ds.dirname(e);
  return Ds.parse(t).root === t;
}
function Ry(e, t, r, n) {
  if (n) return yo(e, t, r);
  if (r)
    return y0(t), yo(e, t, r);
  if (g0.existsSync(t)) throw new Error("dest already exists.");
  return yo(e, t, r);
}
function yo(e, t, r) {
  try {
    g0.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Oy(e, t, r);
  }
}
function Oy(e, t, r) {
  return Sy(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), y0(e);
}
var Py = Ty;
const Dy = je.fromCallback;
var Iy = {
  move: Dy(by),
  moveSync: Py
}, Jt = {
  // Export promiseified graceful-fs:
  ...wr,
  // Export extra methods:
  ...ol,
  ...gg,
  ...zg,
  ...my,
  ...mt,
  ...Iy,
  ...cl,
  ...Er,
  ...Ta
}, _r = {}, Gt = {}, we = {}, zt = {};
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.CancellationError = zt.CancellationToken = void 0;
const Fy = zn;
class Ny extends Fy.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Is());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, a) => {
      let o = null;
      if (n = () => {
        try {
          o != null && (o(), o = null);
        } finally {
          a(new Is());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, a, (s) => {
        o = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
zt.CancellationToken = Ny;
class Is extends Error {
  constructor() {
    super("cancelled");
  }
}
zt.CancellationError = Is;
var an = {};
Object.defineProperty(an, "__esModule", { value: !0 });
an.newError = $y;
function $y(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var ke = {}, Fs = { exports: {} }, Oi = { exports: {} }, vo, Mc;
function Ly() {
  if (Mc) return vo;
  Mc = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, a = n * 365.25;
  vo = function(u, d) {
    d = d || {};
    var h = typeof u;
    if (h === "string" && u.length > 0)
      return o(u);
    if (h === "number" && isFinite(u))
      return d.long ? l(u) : s(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function o(u) {
    if (u = String(u), !(u.length > 100)) {
      var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (d) {
        var h = parseFloat(d[1]), m = (d[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * a;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function s(u) {
    var d = Math.abs(u);
    return d >= n ? Math.round(u / n) + "d" : d >= r ? Math.round(u / r) + "h" : d >= t ? Math.round(u / t) + "m" : d >= e ? Math.round(u / e) + "s" : u + "ms";
  }
  function l(u) {
    var d = Math.abs(u);
    return d >= n ? p(u, d, n, "day") : d >= r ? p(u, d, r, "hour") : d >= t ? p(u, d, t, "minute") : d >= e ? p(u, d, e, "second") : u + " ms";
  }
  function p(u, d, h, m) {
    var w = d >= h * 1.5;
    return Math.round(u / h) + " " + m + (w ? "s" : "");
  }
  return vo;
}
var wo, jc;
function v0() {
  if (jc) return wo;
  jc = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = p, n.disable = s, n.enable = a, n.enabled = l, n.humanize = Ly(), n.destroy = u, Object.keys(t).forEach((d) => {
      n[d] = t[d];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(d) {
      let h = 0;
      for (let m = 0; m < d.length; m++)
        h = (h << 5) - h + d.charCodeAt(m), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(d) {
      let h, m = null, w, x;
      function b(...g) {
        if (!b.enabled)
          return;
        const v = b, O = Number(/* @__PURE__ */ new Date()), D = O - (h || O);
        v.diff = D, v.prev = h, v.curr = O, h = O, g[0] = n.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
        let B = 0;
        g[0] = g[0].replace(/%([a-zA-Z%])/g, (L, Y) => {
          if (L === "%%")
            return "%";
          B++;
          const E = n.formatters[Y];
          if (typeof E == "function") {
            const U = g[B];
            L = E.call(v, U), g.splice(B, 1), B--;
          }
          return L;
        }), n.formatArgs.call(v, g), (v.log || n.log).apply(v, g);
      }
      return b.namespace = d, b.useColors = n.useColors(), b.color = n.selectColor(d), b.extend = i, b.destroy = n.destroy, Object.defineProperty(b, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (w !== n.namespaces && (w = n.namespaces, x = n.enabled(d)), x),
        set: (g) => {
          m = g;
        }
      }), typeof n.init == "function" && n.init(b), b;
    }
    function i(d, h) {
      const m = n(this.namespace + (typeof h > "u" ? ":" : h) + d);
      return m.log = this.log, m;
    }
    function a(d) {
      n.save(d), n.namespaces = d, n.names = [], n.skips = [];
      const h = (typeof d == "string" ? d : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const m of h)
        m[0] === "-" ? n.skips.push(m.slice(1)) : n.names.push(m);
    }
    function o(d, h) {
      let m = 0, w = 0, x = -1, b = 0;
      for (; m < d.length; )
        if (w < h.length && (h[w] === d[m] || h[w] === "*"))
          h[w] === "*" ? (x = w, b = m, w++) : (m++, w++);
        else if (x !== -1)
          w = x + 1, b++, m = b;
        else
          return !1;
      for (; w < h.length && h[w] === "*"; )
        w++;
      return w === h.length;
    }
    function s() {
      const d = [
        ...n.names,
        ...n.skips.map((h) => "-" + h)
      ].join(",");
      return n.enable(""), d;
    }
    function l(d) {
      for (const h of n.skips)
        if (o(d, h))
          return !1;
      for (const h of n.names)
        if (o(d, h))
          return !0;
      return !1;
    }
    function p(d) {
      return d instanceof Error ? d.stack || d.message : d;
    }
    function u() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return wo = e, wo;
}
var qc;
function Uy() {
  return qc || (qc = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = a, t.useColors = r, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const p = "color: " + this.color;
      l.splice(1, 0, p, "color: inherit");
      let u = 0, d = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (u++, h === "%c" && (d = u));
      }), l.splice(d, 0, p);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function a() {
      let l;
      try {
        l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = v0()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (p) {
        return "[UnexpectedJSONParseError]: " + p.message;
      }
    };
  }(Oi, Oi.exports)), Oi.exports;
}
var Pi = { exports: {} }, Eo, Hc;
function ky() {
  return Hc || (Hc = 1, Eo = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Eo;
}
var _o, Gc;
function By() {
  if (Gc) return _o;
  Gc = 1;
  const e = _a, t = Rd, r = ky(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function a(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function o(l, p) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !p && i === void 0)
      return 0;
    const u = i || 0;
    if (n.TERM === "dumb")
      return u;
    if (process.platform === "win32") {
      const d = e.release().split(".");
      return Number(d[0]) >= 10 && Number(d[2]) >= 10586 ? Number(d[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((d) => d in n) || n.CI_NAME === "codeship" ? 1 : u;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const d = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return d >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : u;
  }
  function s(l) {
    const p = o(l, l && l.isTTY);
    return a(p);
  }
  return _o = {
    supportsColor: s,
    stdout: a(o(!0, t.isatty(1))),
    stderr: a(o(!0, t.isatty(2)))
  }, _o;
}
var zc;
function My() {
  return zc || (zc = 1, function(e, t) {
    const r = Rd, n = Je;
    t.init = u, t.log = s, t.formatArgs = a, t.save = l, t.load = p, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = By();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, m) => {
      const w = m.substring(6).toLowerCase().replace(/_([a-z])/g, (b, g) => g.toUpperCase());
      let x = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(x) ? x = !0 : /^(no|off|false|disabled)$/i.test(x) ? x = !1 : x === "null" ? x = null : x = Number(x), h[w] = x, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function a(h) {
      const { namespace: m, useColors: w } = this;
      if (w) {
        const x = this.color, b = "\x1B[3" + (x < 8 ? x : "8;5;" + x), g = `  ${b};1m${m} \x1B[0m`;
        h[0] = g + h[0].split(`
`).join(`
` + g), h.push(b + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = o() + m + " " + h[0];
    }
    function o() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function p() {
      return process.env.DEBUG;
    }
    function u(h) {
      h.inspectOpts = {};
      const m = Object.keys(t.inspectOpts);
      for (let w = 0; w < m.length; w++)
        h.inspectOpts[m[w]] = t.inspectOpts[m[w]];
    }
    e.exports = v0()(t);
    const { formatters: d } = e.exports;
    d.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, d.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(Pi, Pi.exports)), Pi.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Fs.exports = Uy() : Fs.exports = My();
var jy = Fs.exports, Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.ProgressCallbackTransform = void 0;
const qy = Ye;
class Hy extends qy.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
Yn.ProgressCallbackTransform = Hy;
Object.defineProperty(ke, "__esModule", { value: !0 });
ke.DigestTransform = ke.HttpExecutor = ke.HttpError = void 0;
ke.createHttpError = $s;
ke.parseJson = Jy;
ke.configureRequestOptionsFromUrl = E0;
ke.configureRequestUrl = fl;
ke.safeGetHeader = zr;
ke.configureRequestOptions = ca;
ke.safeStringifyJson = ua;
const Gy = Wn, zy = jy, Wy = Re, Vy = Ye, Ns = Kt, Yy = zt, Wc = an, Xy = Yn, lr = (0, zy.default)("electron-builder");
function $s(e, t = null) {
  return new ul(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + ua(e.headers), t);
}
const Ky = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class ul extends Error {
  constructor(t, r = `HTTP error: ${Ky.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
ke.HttpError = ul;
function Jy(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class kr {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Yy.CancellationToken(), n) {
    ca(t);
    const i = n == null ? void 0 : JSON.stringify(n), a = i ? Buffer.from(i) : void 0;
    if (a != null) {
      lr(i);
      const { headers: o, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": a.length,
          ...o
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (o) => o.end(a));
  }
  doApiRequest(t, r, n, i = 0) {
    return lr.enabled && lr(`Request: ${ua(t)}`), r.createPromise((a, o, s) => {
      const l = this.createRequest(t, (p) => {
        try {
          this.handleResponse(p, t, r, a, o, i, n);
        } catch (u) {
          o(u);
        }
      });
      this.addErrorAndTimeoutHandlers(l, o, t.timeout), this.addRedirectHandlers(l, t, o, i, (p) => {
        this.doApiRequest(p, r, n, i).then(a).catch(o);
      }), n(l, o), s(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, a) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, a, o, s) {
    var l;
    if (lr.enabled && lr(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${ua(r)}`), t.statusCode === 404) {
      a($s(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const p = (l = t.statusCode) !== null && l !== void 0 ? l : 0, u = p >= 300 && p < 400, d = zr(t, "location");
    if (u && d != null) {
      if (o > this.maxRedirects) {
        a(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(kr.prepareRedirectUrlOptions(d, r), n, s, o).then(i).catch(a);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", a), t.on("data", (m) => h += m), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const m = zr(t, "content-type"), w = m != null && (Array.isArray(m) ? m.find((x) => x.includes("json")) != null : m.includes("json"));
          a($s(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${w ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (m) {
        a(m);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, a) => {
      const o = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      fl(t, s), ca(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: a,
        callback: (l) => {
          l == null ? n(Buffer.concat(o)) : i(l);
        },
        responseHandler: (l, p) => {
          let u = 0;
          l.on("data", (d) => {
            if (u += d.length, u > 524288e3) {
              p(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            o.push(d);
          }), l.on("end", () => {
            p(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (a) => {
      if (a.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${a.statusCode}: ${a.statusMessage}`));
        return;
      }
      a.on("error", r.callback);
      const o = zr(a, "location");
      if (o != null) {
        n < this.maxRedirects ? this.doDownload(kr.prepareRedirectUrlOptions(o, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Zy(r, a) : r.responseHandler(a, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (a) => {
      this.doDownload(a, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = E0(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const a = kr.reconstructOriginalUrl(r), o = w0(t, r);
      kr.isCrossOriginRedirect(a, o) && (lr.enabled && lr(`Given the cross-origin redirect (from ${a.host} to ${o.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return n;
  }
  static reconstructOriginalUrl(t) {
    const r = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const n = t.hostname, i = t.port ? `:${t.port}` : "", a = t.path || "/";
    return new Ns.URL(`${r}//${n}${i}${a}`);
  }
  static isCrossOriginRedirect(t, r) {
    if (t.hostname.toLowerCase() !== r.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && r.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(r.port))
      return !1;
    if (t.protocol !== r.protocol)
      return !0;
    const n = t.port, i = r.port;
    return n !== i;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof ul && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
ke.HttpExecutor = kr;
function w0(e, t) {
  try {
    return new Ns.URL(e);
  } catch {
    const r = t.hostname, n = t.protocol || "https:", i = t.port ? `:${t.port}` : "", a = `${n}//${r}${i}`;
    return new Ns.URL(e, a);
  }
}
function E0(e, t) {
  const r = ca(t), n = w0(e, t);
  return fl(n, r), r;
}
function fl(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ls extends Vy.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Gy.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Wc.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Wc.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
ke.DigestTransform = Ls;
function Qy(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function zr(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Zy(e, t) {
  if (!Qy(zr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const o = zr(t, "content-length");
    o != null && r.push(new Xy.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Ls(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Ls(e.options.sha2, "sha256", "hex"));
  const i = (0, Wy.createWriteStream)(e.destination);
  r.push(i);
  let a = t;
  for (const o of r)
    o.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), a = a.pipe(o);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function ca(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function ua(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Ra = {};
Object.defineProperty(Ra, "__esModule", { value: !0 });
Ra.MemoLazy = void 0;
class ev {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && _0(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Ra.MemoLazy = ev;
function _0(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), a = Object.keys(t);
    return i.length === a.length && i.every((o) => _0(e[o], t[o]));
  }
  return e === t;
}
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.githubUrl = tv;
Xn.githubTagPrefix = rv;
Xn.getS3LikeProviderBaseUrl = nv;
function tv(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function rv(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function nv(e) {
  const t = e.provider;
  if (t === "s3")
    return iv(e);
  if (t === "spaces")
    return av(e);
  throw new Error(`Not supported provider: ${t}`);
}
function iv(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return b0(t, e.path);
}
function b0(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function av(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return b0(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var dl = {};
Object.defineProperty(dl, "__esModule", { value: !0 });
dl.retry = S0;
const ov = zt;
async function S0(e, t) {
  var r;
  const { retries: n, interval: i, backoff: a = 0, attempt: o = 0, shouldRetry: s, cancellationToken: l = new ov.CancellationToken() } = t;
  try {
    return await e();
  } catch (p) {
    if (await Promise.resolve((r = s == null ? void 0 : s(p)) !== null && r !== void 0 ? r : !0) && n > 0 && !l.cancelled)
      return await new Promise((u) => setTimeout(u, i + a * o)), await S0(e, { ...t, retries: n - 1, attempt: o + 1 });
    throw p;
  }
}
var hl = {};
Object.defineProperty(hl, "__esModule", { value: !0 });
hl.parseDn = sv;
function sv(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const a = /* @__PURE__ */ new Map();
  for (let o = 0; o <= e.length; o++) {
    if (o === e.length) {
      r !== null && a.set(r, n);
      break;
    }
    const s = e[o];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        o++;
        const l = parseInt(e.slice(o, o + 2), 16);
        Number.isNaN(l) ? n += e[o] : (o++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && a.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (o > i) {
        let l = o;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        o = i - 1;
        continue;
      }
    }
    n += s;
  }
  return a;
}
var Zr = {};
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.nil = Zr.UUID = void 0;
const A0 = Wn, T0 = an, lv = "options.name must be either a string or a Buffer", Vc = (0, A0.randomBytes)(16);
Vc[0] = Vc[0] | 1;
const Zi = {}, re = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Zi[t] = e, re[e] = t;
}
class vr {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = vr.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return cv(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = uv(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Zi[t[14] + t[15]] & 240) >> 4,
        variant: Yc((Zi[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: Yc((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, T0.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = Zi[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Zr.UUID = vr;
vr.OID = vr.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Yc(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var An;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(An || (An = {}));
function cv(e, t, r, n, i = An.ASCII) {
  const a = (0, A0.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, T0.newError)(lv, "ERR_INVALID_UUID_NAME");
  a.update(n), a.update(e);
  const s = a.digest();
  let l;
  switch (i) {
    case An.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = s;
      break;
    case An.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = new vr(s);
      break;
    default:
      l = re[s[0]] + re[s[1]] + re[s[2]] + re[s[3]] + "-" + re[s[4]] + re[s[5]] + "-" + re[s[6] & 15 | r] + re[s[7]] + "-" + re[s[8] & 63 | 128] + re[s[9]] + "-" + re[s[10]] + re[s[11]] + re[s[12]] + re[s[13]] + re[s[14]] + re[s[15]];
      break;
  }
  return l;
}
function uv(e) {
  return re[e[0]] + re[e[1]] + re[e[2]] + re[e[3]] + "-" + re[e[4]] + re[e[5]] + "-" + re[e[6]] + re[e[7]] + "-" + re[e[8]] + re[e[9]] + "-" + re[e[10]] + re[e[11]] + re[e[12]] + re[e[13]] + re[e[14]] + re[e[15]];
}
Zr.nil = new vr("00000000-0000-0000-0000-000000000000");
var Kn = {}, C0 = {};
(function(e) {
  (function(t) {
    t.parser = function(f, c) {
      return new n(f, c);
    }, t.SAXParser = n, t.SAXStream = u, t.createStream = p, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(f, c) {
      if (!(this instanceof n))
        return new n(f, c);
      var T = this;
      a(T), T.q = T.c = "", T.bufferCheckPosition = t.MAX_BUFFER_LENGTH, T.opt = c || {}, T.opt.lowercase = T.opt.lowercase || T.opt.lowercasetags, T.looseCase = T.opt.lowercase ? "toLowerCase" : "toUpperCase", T.tags = [], T.closed = T.closedRoot = T.sawRoot = !1, T.tag = T.error = null, T.strict = !!f, T.noscript = !!(f || T.opt.noscript), T.state = E.BEGIN, T.strictEntities = T.opt.strictEntities, T.ENTITIES = T.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), T.attribList = [], T.opt.xmlns && (T.ns = Object.create(x)), T.opt.unquotedAttributeValues === void 0 && (T.opt.unquotedAttributeValues = !f), T.trackPosition = T.opt.position !== !1, T.trackPosition && (T.position = T.line = T.column = 0), q(T, "onready");
    }
    Object.create || (Object.create = function(f) {
      function c() {
      }
      c.prototype = f;
      var T = new c();
      return T;
    }), Object.keys || (Object.keys = function(f) {
      var c = [];
      for (var T in f) f.hasOwnProperty(T) && c.push(T);
      return c;
    });
    function i(f) {
      for (var c = Math.max(t.MAX_BUFFER_LENGTH, 10), T = 0, S = 0, W = r.length; S < W; S++) {
        var H = f[r[S]].length;
        if (H > c)
          switch (r[S]) {
            case "textNode":
              J(f);
              break;
            case "cdata":
              G(f, "oncdata", f.cdata), f.cdata = "";
              break;
            case "script":
              G(f, "onscript", f.script), f.script = "";
              break;
            default:
              P(f, "Max buffer length exceeded: " + r[S]);
          }
        T = Math.max(T, H);
      }
      var X = t.MAX_BUFFER_LENGTH - T;
      f.bufferCheckPosition = X + f.position;
    }
    function a(f) {
      for (var c = 0, T = r.length; c < T; c++)
        f[r[c]] = "";
    }
    function o(f) {
      J(f), f.cdata !== "" && (G(f, "oncdata", f.cdata), f.cdata = ""), f.script !== "" && (G(f, "onscript", f.script), f.script = "");
    }
    n.prototype = {
      end: function() {
        k(this);
      },
      write: ce,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        o(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(f) {
      return f !== "error" && f !== "end";
    });
    function p(f, c) {
      return new u(f, c);
    }
    function u(f, c) {
      if (!(this instanceof u))
        return new u(f, c);
      s.apply(this), this._parser = new n(f, c), this.writable = !0, this.readable = !0;
      var T = this;
      this._parser.onend = function() {
        T.emit("end");
      }, this._parser.onerror = function(S) {
        T.emit("error", S), T._parser.error = null;
      }, this._decoder = null, l.forEach(function(S) {
        Object.defineProperty(T, "on" + S, {
          get: function() {
            return T._parser["on" + S];
          },
          set: function(W) {
            if (!W)
              return T.removeAllListeners(S), T._parser["on" + S] = W, W;
            T.on(S, W);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    u.prototype = Object.create(s.prototype, {
      constructor: {
        value: u
      }
    }), u.prototype.write = function(f) {
      return typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(f) && (this._decoder || (this._decoder = new TextDecoder("utf8")), f = this._decoder.decode(f, { stream: !0 })), this._parser.write(f.toString()), this.emit("data", f), !0;
    }, u.prototype.end = function(f) {
      if (f && f.length && this.write(f), this._decoder) {
        var c = this._decoder.decode();
        c && (this._parser.write(c), this.emit("data", c));
      }
      return this._parser.end(), !0;
    }, u.prototype.on = function(f, c) {
      var T = this;
      return !T._parser["on" + f] && l.indexOf(f) !== -1 && (T._parser["on" + f] = function() {
        var S = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        S.splice(0, 0, f), T.emit.apply(T, S);
      }), s.prototype.on.call(T, f, c);
    };
    var d = "[CDATA[", h = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", w = "http://www.w3.org/2000/xmlns/", x = { xml: m, xmlns: w }, b = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, v = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, O = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function D(f) {
      return f === " " || f === `
` || f === "\r" || f === "	";
    }
    function B(f) {
      return f === '"' || f === "'";
    }
    function F(f) {
      return f === ">" || D(f);
    }
    function L(f, c) {
      return f.test(c);
    }
    function Y(f, c) {
      return !L(f, c);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(f) {
      var c = t.ENTITIES[f], T = typeof c == "number" ? String.fromCharCode(c) : c;
      t.ENTITIES[f] = T;
    });
    for (var U in t.STATE)
      t.STATE[t.STATE[U]] = U;
    E = t.STATE;
    function q(f, c, T) {
      f[c] && f[c](T);
    }
    function G(f, c, T) {
      f.textNode && J(f), q(f, c, T);
    }
    function J(f) {
      f.textNode = N(f.opt, f.textNode), f.textNode && q(f, "ontext", f.textNode), f.textNode = "";
    }
    function N(f, c) {
      return f.trim && (c = c.trim()), f.normalize && (c = c.replace(/\s+/g, " ")), c;
    }
    function P(f, c) {
      return J(f), f.trackPosition && (c += `
Line: ` + f.line + `
Column: ` + f.column + `
Char: ` + f.c), c = new Error(c), f.error = c, q(f, "onerror", c), f;
    }
    function k(f) {
      return f.sawRoot && !f.closedRoot && _(f, "Unclosed root tag"), f.state !== E.BEGIN && f.state !== E.BEGIN_WHITESPACE && f.state !== E.TEXT && P(f, "Unexpected end"), J(f), f.c = "", f.closed = !0, q(f, "onend"), n.call(f, f.strict, f.opt), f;
    }
    function _(f, c) {
      if (typeof f != "object" || !(f instanceof n))
        throw new Error("bad call to strictFail");
      f.strict && P(f, c);
    }
    function A(f) {
      f.strict || (f.tagName = f.tagName[f.looseCase]());
      var c = f.tags[f.tags.length - 1] || f, T = f.tag = { name: f.tagName, attributes: {} };
      f.opt.xmlns && (T.ns = c.ns), f.attribList.length = 0, G(f, "onopentagstart", T);
    }
    function R(f, c) {
      var T = f.indexOf(":"), S = T < 0 ? ["", f] : f.split(":"), W = S[0], H = S[1];
      return c && f === "xmlns" && (W = "xmlns", H = ""), { prefix: W, local: H };
    }
    function I(f) {
      if (f.strict || (f.attribName = f.attribName[f.looseCase]()), f.attribList.indexOf(f.attribName) !== -1 || f.tag.attributes.hasOwnProperty(f.attribName)) {
        f.attribName = f.attribValue = "";
        return;
      }
      if (f.opt.xmlns) {
        var c = R(f.attribName, !0), T = c.prefix, S = c.local;
        if (T === "xmlns")
          if (S === "xml" && f.attribValue !== m)
            _(
              f,
              "xml: prefix must be bound to " + m + `
Actual: ` + f.attribValue
            );
          else if (S === "xmlns" && f.attribValue !== w)
            _(
              f,
              "xmlns: prefix must be bound to " + w + `
Actual: ` + f.attribValue
            );
          else {
            var W = f.tag, H = f.tags[f.tags.length - 1] || f;
            W.ns === H.ns && (W.ns = Object.create(H.ns)), W.ns[S] = f.attribValue;
          }
        f.attribList.push([f.attribName, f.attribValue]);
      } else
        f.tag.attributes[f.attribName] = f.attribValue, G(f, "onattribute", {
          name: f.attribName,
          value: f.attribValue
        });
      f.attribName = f.attribValue = "";
    }
    function j(f, c) {
      if (f.opt.xmlns) {
        var T = f.tag, S = R(f.tagName);
        T.prefix = S.prefix, T.local = S.local, T.uri = T.ns[S.prefix] || "", T.prefix && !T.uri && (_(
          f,
          "Unbound namespace prefix: " + JSON.stringify(f.tagName)
        ), T.uri = S.prefix);
        var W = f.tags[f.tags.length - 1] || f;
        T.ns && W.ns !== T.ns && Object.keys(T.ns).forEach(function(Rt) {
          G(f, "onopennamespace", {
            prefix: Rt,
            uri: T.ns[Rt]
          });
        });
        for (var H = 0, X = f.attribList.length; H < X; H++) {
          var de = f.attribList[H], xe = de[0], Qe = de[1], me = R(xe, !0), $e = me.prefix, Tr = me.local, Ct = $e === "" ? "" : T.ns[$e] || "", gt = {
            name: xe,
            value: Qe,
            prefix: $e,
            local: Tr,
            uri: Ct
          };
          $e && $e !== "xmlns" && !Ct && (_(
            f,
            "Unbound namespace prefix: " + JSON.stringify($e)
          ), gt.uri = $e), f.tag.attributes[xe] = gt, G(f, "onattribute", gt);
        }
        f.attribList.length = 0;
      }
      f.tag.isSelfClosing = !!c, f.sawRoot = !0, f.tags.push(f.tag), G(f, "onopentag", f.tag), c || (!f.noscript && f.tagName.toLowerCase() === "script" ? f.state = E.SCRIPT : f.state = E.TEXT, f.tag = null, f.tagName = ""), f.attribName = f.attribValue = "", f.attribList.length = 0;
    }
    function M(f) {
      if (!f.tagName) {
        _(f, "Weird empty close tag."), f.textNode += "</>", f.state = E.TEXT;
        return;
      }
      if (f.script) {
        if (f.tagName !== "script") {
          f.script += "</" + f.tagName + ">", f.tagName = "", f.state = E.SCRIPT;
          return;
        }
        G(f, "onscript", f.script), f.script = "";
      }
      var c = f.tags.length, T = f.tagName;
      f.strict || (T = T[f.looseCase]());
      for (var S = T; c--; ) {
        var W = f.tags[c];
        if (W.name !== S)
          _(f, "Unexpected close tag");
        else
          break;
      }
      if (c < 0) {
        _(f, "Unmatched closing tag: " + f.tagName), f.textNode += "</" + f.tagName + ">", f.state = E.TEXT;
        return;
      }
      f.tagName = T;
      for (var H = f.tags.length; H-- > c; ) {
        var X = f.tag = f.tags.pop();
        f.tagName = f.tag.name, G(f, "onclosetag", f.tagName);
        var de = {};
        for (var xe in X.ns)
          de[xe] = X.ns[xe];
        var Qe = f.tags[f.tags.length - 1] || f;
        f.opt.xmlns && X.ns !== Qe.ns && Object.keys(X.ns).forEach(function(me) {
          var $e = X.ns[me];
          G(f, "onclosenamespace", { prefix: me, uri: $e });
        });
      }
      c === 0 && (f.closedRoot = !0), f.tagName = f.attribValue = f.attribName = "", f.attribList.length = 0, f.state = E.TEXT;
    }
    function Q(f) {
      var c = f.entity, T = c.toLowerCase(), S, W = "";
      return f.ENTITIES[c] ? f.ENTITIES[c] : f.ENTITIES[T] ? f.ENTITIES[T] : (c = T, c.charAt(0) === "#" && (c.charAt(1) === "x" ? (c = c.slice(2), S = parseInt(c, 16), W = S.toString(16)) : (c = c.slice(1), S = parseInt(c, 10), W = S.toString(10))), c = c.replace(/^0+/, ""), isNaN(S) || W.toLowerCase() !== c || S < 0 || S > 1114111 ? (_(f, "Invalid character entity"), "&" + f.entity + ";") : String.fromCodePoint(S));
    }
    function te(f, c) {
      c === "<" ? (f.state = E.OPEN_WAKA, f.startTagPosition = f.position) : D(c) || (_(f, "Non-whitespace before first tag."), f.textNode = c, f.state = E.TEXT);
    }
    function V(f, c) {
      var T = "";
      return c < f.length && (T = f.charAt(c)), T;
    }
    function ce(f) {
      var c = this;
      if (this.error)
        throw this.error;
      if (c.closed)
        return P(
          c,
          "Cannot write after close. Assign an onready handler."
        );
      if (f === null)
        return k(c);
      typeof f == "object" && (f = f.toString());
      for (var T = 0, S = ""; S = V(f, T++), c.c = S, !!S; )
        switch (c.trackPosition && (c.position++, S === `
` ? (c.line++, c.column = 0) : c.column++), c.state) {
          case E.BEGIN:
            if (c.state = E.BEGIN_WHITESPACE, S === "\uFEFF")
              continue;
            te(c, S);
            continue;
          case E.BEGIN_WHITESPACE:
            te(c, S);
            continue;
          case E.TEXT:
            if (c.sawRoot && !c.closedRoot) {
              for (var H = T - 1; S && S !== "<" && S !== "&"; )
                S = V(f, T++), S && c.trackPosition && (c.position++, S === `
` ? (c.line++, c.column = 0) : c.column++);
              c.textNode += f.substring(H, T - 1);
            }
            S === "<" && !(c.sawRoot && c.closedRoot && !c.strict) ? (c.state = E.OPEN_WAKA, c.startTagPosition = c.position) : (!D(S) && (!c.sawRoot || c.closedRoot) && _(c, "Text data outside of root node."), S === "&" ? c.state = E.TEXT_ENTITY : c.textNode += S);
            continue;
          case E.SCRIPT:
            S === "<" ? c.state = E.SCRIPT_ENDING : c.script += S;
            continue;
          case E.SCRIPT_ENDING:
            S === "/" ? c.state = E.CLOSE_TAG : (c.script += "<" + S, c.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (S === "!")
              c.state = E.SGML_DECL, c.sgmlDecl = "";
            else if (!D(S)) if (L(b, S))
              c.state = E.OPEN_TAG, c.tagName = S;
            else if (S === "/")
              c.state = E.CLOSE_TAG, c.tagName = "";
            else if (S === "?")
              c.state = E.PROC_INST, c.procInstName = c.procInstBody = "";
            else {
              if (_(c, "Unencoded <"), c.startTagPosition + 1 < c.position) {
                var W = c.position - c.startTagPosition;
                S = new Array(W).join(" ") + S;
              }
              c.textNode += "<" + S, c.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (c.sgmlDecl + S === "--") {
              c.state = E.COMMENT, c.comment = "", c.sgmlDecl = "";
              continue;
            }
            c.doctype && c.doctype !== !0 && c.sgmlDecl ? (c.state = E.DOCTYPE_DTD, c.doctype += "<!" + c.sgmlDecl + S, c.sgmlDecl = "") : (c.sgmlDecl + S).toUpperCase() === d ? (G(c, "onopencdata"), c.state = E.CDATA, c.sgmlDecl = "", c.cdata = "") : (c.sgmlDecl + S).toUpperCase() === h ? (c.state = E.DOCTYPE, (c.doctype || c.sawRoot) && _(
              c,
              "Inappropriately located doctype declaration"
            ), c.doctype = "", c.sgmlDecl = "") : S === ">" ? (G(c, "onsgmldeclaration", c.sgmlDecl), c.sgmlDecl = "", c.state = E.TEXT) : (B(S) && (c.state = E.SGML_DECL_QUOTED), c.sgmlDecl += S);
            continue;
          case E.SGML_DECL_QUOTED:
            S === c.q && (c.state = E.SGML_DECL, c.q = ""), c.sgmlDecl += S;
            continue;
          case E.DOCTYPE:
            S === ">" ? (c.state = E.TEXT, G(c, "ondoctype", c.doctype), c.doctype = !0) : (c.doctype += S, S === "[" ? c.state = E.DOCTYPE_DTD : B(S) && (c.state = E.DOCTYPE_QUOTED, c.q = S));
            continue;
          case E.DOCTYPE_QUOTED:
            c.doctype += S, S === c.q && (c.q = "", c.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            S === "]" ? (c.doctype += S, c.state = E.DOCTYPE) : S === "<" ? (c.state = E.OPEN_WAKA, c.startTagPosition = c.position) : B(S) ? (c.doctype += S, c.state = E.DOCTYPE_DTD_QUOTED, c.q = S) : c.doctype += S;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            c.doctype += S, S === c.q && (c.state = E.DOCTYPE_DTD, c.q = "");
            continue;
          case E.COMMENT:
            S === "-" ? c.state = E.COMMENT_ENDING : c.comment += S;
            continue;
          case E.COMMENT_ENDING:
            S === "-" ? (c.state = E.COMMENT_ENDED, c.comment = N(c.opt, c.comment), c.comment && G(c, "oncomment", c.comment), c.comment = "") : (c.comment += "-" + S, c.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            S !== ">" ? (_(c, "Malformed comment"), c.comment += "--" + S, c.state = E.COMMENT) : c.doctype && c.doctype !== !0 ? c.state = E.DOCTYPE_DTD : c.state = E.TEXT;
            continue;
          case E.CDATA:
            for (var H = T - 1; S && S !== "]"; )
              S = V(f, T++), S && c.trackPosition && (c.position++, S === `
` ? (c.line++, c.column = 0) : c.column++);
            c.cdata += f.substring(H, T - 1), S === "]" && (c.state = E.CDATA_ENDING);
            continue;
          case E.CDATA_ENDING:
            S === "]" ? c.state = E.CDATA_ENDING_2 : (c.cdata += "]" + S, c.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            S === ">" ? (c.cdata && G(c, "oncdata", c.cdata), G(c, "onclosecdata"), c.cdata = "", c.state = E.TEXT) : S === "]" ? c.cdata += "]" : (c.cdata += "]]" + S, c.state = E.CDATA);
            continue;
          case E.PROC_INST:
            S === "?" ? c.state = E.PROC_INST_ENDING : D(S) ? c.state = E.PROC_INST_BODY : c.procInstName += S;
            continue;
          case E.PROC_INST_BODY:
            if (!c.procInstBody && D(S))
              continue;
            S === "?" ? c.state = E.PROC_INST_ENDING : c.procInstBody += S;
            continue;
          case E.PROC_INST_ENDING:
            S === ">" ? (G(c, "onprocessinginstruction", {
              name: c.procInstName,
              body: c.procInstBody
            }), c.procInstName = c.procInstBody = "", c.state = E.TEXT) : (c.procInstBody += "?" + S, c.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            L(g, S) ? c.tagName += S : (A(c), S === ">" ? j(c) : S === "/" ? c.state = E.OPEN_TAG_SLASH : (D(S) || _(c, "Invalid character in tag name"), c.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            S === ">" ? (j(c, !0), M(c)) : (_(
              c,
              "Forward-slash in opening tag not followed by >"
            ), c.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (D(S))
              continue;
            S === ">" ? j(c) : S === "/" ? c.state = E.OPEN_TAG_SLASH : L(b, S) ? (c.attribName = S, c.attribValue = "", c.state = E.ATTRIB_NAME) : _(c, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            S === "=" ? c.state = E.ATTRIB_VALUE : S === ">" ? (_(c, "Attribute without value"), c.attribValue = c.attribName, I(c), j(c)) : D(S) ? c.state = E.ATTRIB_NAME_SAW_WHITE : L(g, S) ? c.attribName += S : _(c, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (S === "=")
              c.state = E.ATTRIB_VALUE;
            else {
              if (D(S))
                continue;
              _(c, "Attribute without value"), c.tag.attributes[c.attribName] = "", c.attribValue = "", G(c, "onattribute", {
                name: c.attribName,
                value: ""
              }), c.attribName = "", S === ">" ? j(c) : L(b, S) ? (c.attribName = S, c.state = E.ATTRIB_NAME) : (_(c, "Invalid attribute name"), c.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (D(S))
              continue;
            B(S) ? (c.q = S, c.state = E.ATTRIB_VALUE_QUOTED) : (c.opt.unquotedAttributeValues || P(c, "Unquoted attribute value"), c.state = E.ATTRIB_VALUE_UNQUOTED, c.attribValue = S);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (S !== c.q) {
              S === "&" ? c.state = E.ATTRIB_VALUE_ENTITY_Q : c.attribValue += S;
              continue;
            }
            I(c), c.q = "", c.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            D(S) ? c.state = E.ATTRIB : S === ">" ? j(c) : S === "/" ? c.state = E.OPEN_TAG_SLASH : L(b, S) ? (_(c, "No whitespace between attributes"), c.attribName = S, c.attribValue = "", c.state = E.ATTRIB_NAME) : _(c, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!F(S)) {
              S === "&" ? c.state = E.ATTRIB_VALUE_ENTITY_U : c.attribValue += S;
              continue;
            }
            I(c), S === ">" ? j(c) : c.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (c.tagName)
              S === ">" ? M(c) : L(g, S) ? c.tagName += S : c.script ? (c.script += "</" + c.tagName + S, c.tagName = "", c.state = E.SCRIPT) : (D(S) || _(c, "Invalid tagname in closing tag"), c.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (D(S))
                continue;
              Y(b, S) ? c.script ? (c.script += "</" + S, c.state = E.SCRIPT) : _(c, "Invalid tagname in closing tag.") : c.tagName = S;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (D(S))
              continue;
            S === ">" ? M(c) : _(c, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var X, de;
            switch (c.state) {
              case E.TEXT_ENTITY:
                X = E.TEXT, de = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                X = E.ATTRIB_VALUE_QUOTED, de = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                X = E.ATTRIB_VALUE_UNQUOTED, de = "attribValue";
                break;
            }
            if (S === ";") {
              var xe = Q(c);
              c.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(xe) ? (c.entity = "", c.state = X, c.write(xe)) : (c[de] += xe, c.entity = "", c.state = X);
            } else L(c.entity.length ? O : v, S) ? c.entity += S : (_(c, "Invalid character in entity name"), c[de] += "&" + c.entity + S, c.entity = "", c.state = X);
            continue;
          default:
            throw new Error(c, "Unknown state: " + c.state);
        }
      return c.position >= c.bufferCheckPosition && i(c), c;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var f = String.fromCharCode, c = Math.floor, T = function() {
        var S = 16384, W = [], H, X, de = -1, xe = arguments.length;
        if (!xe)
          return "";
        for (var Qe = ""; ++de < xe; ) {
          var me = Number(arguments[de]);
          if (!isFinite(me) || // `NaN`, `+Infinity`, or `-Infinity`
          me < 0 || // not a valid Unicode code point
          me > 1114111 || // not a valid Unicode code point
          c(me) !== me)
            throw RangeError("Invalid code point: " + me);
          me <= 65535 ? W.push(me) : (me -= 65536, H = (me >> 10) + 55296, X = me % 1024 + 56320, W.push(H, X)), (de + 1 === xe || W.length > S) && (Qe += f.apply(null, W), W.length = 0);
        }
        return Qe;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: T,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = T;
    }();
  })(e);
})(C0);
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.XElement = void 0;
Kn.parseXml = pv;
const fv = C0, Di = an;
class R0 {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Di.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!hv(t))
      throw (0, Di.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, Di.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, Di.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (Xc(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => Xc(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Kn.XElement = R0;
const dv = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function hv(e) {
  return dv.test(e);
}
function Xc(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function pv(e) {
  let t = null;
  const r = fv.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const a = new R0(i.name);
    if (a.attributes = i.attributes, t === null)
      t = a;
    else {
      const o = n[n.length - 1];
      o.elements == null && (o.elements = []), o.elements.push(a);
    }
    n.push(a);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const a = n[n.length - 1];
    a.value = i, a.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = d;
  var t = zt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = an;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = ke;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Ra;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var a = Yn;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var o = Xn;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return o.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return o.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return o.githubTagPrefix;
  } });
  var s = dl;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var l = hl;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var p = Zr;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return p.UUID;
  } });
  var u = Kn;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return u.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return u.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function d(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(we);
var De = {}, pl = {}, at = {};
function O0(e) {
  return typeof e > "u" || e === null;
}
function mv(e) {
  return typeof e == "object" && e !== null;
}
function xv(e) {
  return Array.isArray(e) ? e : O0(e) ? [] : [e];
}
function gv(e, t) {
  var r, n, i, a;
  if (t)
    for (a = Object.keys(t), r = 0, n = a.length; r < n; r += 1)
      i = a[r], e[i] = t[i];
  return e;
}
function yv(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function vv(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
at.isNothing = O0;
at.isObject = mv;
at.toArray = xv;
at.repeat = yv;
at.isNegativeZero = vv;
at.extend = gv;
function P0(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function In(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = P0(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
In.prototype = Object.create(Error.prototype);
In.prototype.constructor = In;
In.prototype.toString = function(t) {
  return this.name + ": " + P0(this, t);
};
var Jn = In, En = at;
function bo(e, t, r, n, i) {
  var a = "", o = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (a = " ... ", t = n - s + a.length), r - n > s && (o = " ...", r = n + s - o.length), {
    str: a + e.slice(t, r).replace(/\t/g, "→") + o,
    pos: n - t + a.length
    // relative position
  };
}
function So(e, t) {
  return En.repeat(" ", t - e.length) + e;
}
function wv(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], a, o = -1; a = r.exec(e.buffer); )
    i.push(a.index), n.push(a.index + a[0].length), e.position <= a.index && o < 0 && (o = n.length - 2);
  o < 0 && (o = n.length - 1);
  var s = "", l, p, u = Math.min(e.line + t.linesAfter, i.length).toString().length, d = t.maxLength - (t.indent + u + 3);
  for (l = 1; l <= t.linesBefore && !(o - l < 0); l++)
    p = bo(
      e.buffer,
      n[o - l],
      i[o - l],
      e.position - (n[o] - n[o - l]),
      d
    ), s = En.repeat(" ", t.indent) + So((e.line - l + 1).toString(), u) + " | " + p.str + `
` + s;
  for (p = bo(e.buffer, n[o], i[o], e.position, d), s += En.repeat(" ", t.indent) + So((e.line + 1).toString(), u) + " | " + p.str + `
`, s += En.repeat("-", t.indent + u + 3 + p.pos) + `^
`, l = 1; l <= t.linesAfter && !(o + l >= i.length); l++)
    p = bo(
      e.buffer,
      n[o + l],
      i[o + l],
      e.position - (n[o] - n[o + l]),
      d
    ), s += En.repeat(" ", t.indent) + So((e.line + l + 1).toString(), u) + " | " + p.str + `
`;
  return s.replace(/\n$/, "");
}
var Ev = wv, Kc = Jn, _v = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], bv = [
  "scalar",
  "sequence",
  "mapping"
];
function Sv(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Av(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (_v.indexOf(r) === -1)
      throw new Kc('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = Sv(t.styleAliases || null), bv.indexOf(this.kind) === -1)
    throw new Kc('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var qe = Av, pn = Jn, Ao = qe;
function Jc(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(a, o) {
      a.tag === n.tag && a.kind === n.kind && a.multi === n.multi && (i = o);
    }), r[i] = n;
  }), r;
}
function Tv() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Us(e) {
  return this.extend(e);
}
Us.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof Ao)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new pn("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(a) {
    if (!(a instanceof Ao))
      throw new pn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (a.loadKind && a.loadKind !== "scalar")
      throw new pn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (a.multi)
      throw new pn("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(a) {
    if (!(a instanceof Ao))
      throw new pn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Us.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Jc(i, "implicit"), i.compiledExplicit = Jc(i, "explicit"), i.compiledTypeMap = Tv(i.compiledImplicit, i.compiledExplicit), i;
};
var D0 = Us, Cv = qe, I0 = new Cv("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Rv = qe, F0 = new Rv("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Ov = qe, N0 = new Ov("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Pv = D0, $0 = new Pv({
  explicit: [
    I0,
    F0,
    N0
  ]
}), Dv = qe;
function Iv(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Fv() {
  return null;
}
function Nv(e) {
  return e === null;
}
var L0 = new Dv("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Iv,
  construct: Fv,
  predicate: Nv,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), $v = qe;
function Lv(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Uv(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function kv(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var U0 = new $v("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Lv,
  construct: Uv,
  predicate: kv,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), Bv = at, Mv = qe;
function jv(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function qv(e) {
  return 48 <= e && e <= 55;
}
function Hv(e) {
  return 48 <= e && e <= 57;
}
function Gv(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!jv(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!qv(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!Hv(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function zv(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function Wv(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Bv.isNegativeZero(e);
}
var k0 = new Mv("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Gv,
  construct: zv,
  predicate: Wv,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), B0 = at, Vv = qe, Yv = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Xv(e) {
  return !(e === null || !Yv.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Kv(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var Jv = /^[-+]?[0-9]+e/;
function Qv(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (B0.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Jv.test(r) ? r.replace("e", ".e") : r;
}
function Zv(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || B0.isNegativeZero(e));
}
var M0 = new Vv("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Xv,
  construct: Kv,
  predicate: Zv,
  represent: Qv,
  defaultStyle: "lowercase"
}), j0 = $0.extend({
  implicit: [
    L0,
    U0,
    k0,
    M0
  ]
}), q0 = j0, ew = qe, H0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), G0 = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function tw(e) {
  return e === null ? !1 : H0.exec(e) !== null || G0.exec(e) !== null;
}
function rw(e) {
  var t, r, n, i, a, o, s, l = 0, p = null, u, d, h;
  if (t = H0.exec(e), t === null && (t = G0.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (a = +t[4], o = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (u = +t[10], d = +(t[11] || 0), p = (u * 60 + d) * 6e4, t[9] === "-" && (p = -p)), h = new Date(Date.UTC(r, n, i, a, o, s, l)), p && h.setTime(h.getTime() - p), h;
}
function nw(e) {
  return e.toISOString();
}
var z0 = new ew("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: tw,
  construct: rw,
  instanceOf: Date,
  represent: nw
}), iw = qe;
function aw(e) {
  return e === "<<" || e === null;
}
var W0 = new iw("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: aw
}), ow = qe, ml = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function sw(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, a = ml;
  for (r = 0; r < i; r++)
    if (t = a.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function lw(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, a = ml, o = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | a.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : r === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : r === 12 && s.push(o >> 4 & 255), new Uint8Array(s);
}
function cw(e) {
  var t = "", r = 0, n, i, a = e.length, o = ml;
  for (n = 0; n < a; n++)
    n % 3 === 0 && n && (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]), r = (r << 8) + e[n];
  return i = a % 3, i === 0 ? (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]) : i === 2 ? (t += o[r >> 10 & 63], t += o[r >> 4 & 63], t += o[r << 2 & 63], t += o[64]) : i === 1 && (t += o[r >> 2 & 63], t += o[r << 4 & 63], t += o[64], t += o[64]), t;
}
function uw(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var V0 = new ow("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: sw,
  construct: lw,
  predicate: uw,
  represent: cw
}), fw = qe, dw = Object.prototype.hasOwnProperty, hw = Object.prototype.toString;
function pw(e) {
  if (e === null) return !0;
  var t = [], r, n, i, a, o, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], o = !1, hw.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (dw.call(i, a))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function mw(e) {
  return e !== null ? e : [];
}
var Y0 = new fw("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: pw,
  construct: mw
}), xw = qe, gw = Object.prototype.toString;
function yw(e) {
  if (e === null) return !0;
  var t, r, n, i, a, o = e;
  for (a = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
    if (n = o[t], gw.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    a[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function vw(e) {
  if (e === null) return [];
  var t, r, n, i, a, o = e;
  for (a = new Array(o.length), t = 0, r = o.length; t < r; t += 1)
    n = o[t], i = Object.keys(n), a[t] = [i[0], n[i[0]]];
  return a;
}
var X0 = new xw("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: yw,
  construct: vw
}), ww = qe, Ew = Object.prototype.hasOwnProperty;
function _w(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (Ew.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function bw(e) {
  return e !== null ? e : {};
}
var K0 = new ww("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: _w,
  construct: bw
}), xl = q0.extend({
  implicit: [
    z0,
    W0
  ],
  explicit: [
    V0,
    Y0,
    X0,
    K0
  ]
}), fr = at, J0 = Jn, Sw = Ev, Aw = xl, Wt = Object.prototype.hasOwnProperty, fa = 1, Q0 = 2, Z0 = 3, da = 4, To = 1, Tw = 2, Qc = 3, Cw = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Rw = /[\x85\u2028\u2029]/, Ow = /[,\[\]\{\}]/, eh = /^(?:!|!!|![a-z\-]+!)$/i, th = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Zc(e) {
  return Object.prototype.toString.call(e);
}
function dt(e) {
  return e === 10 || e === 13;
}
function mr(e) {
  return e === 9 || e === 32;
}
function ze(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Br(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Pw(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function Dw(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Iw(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function eu(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Fw(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function rh(e, t, r) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: r
  }) : e[t] = r;
}
var nh = new Array(256), ih = new Array(256);
for (var Or = 0; Or < 256; Or++)
  nh[Or] = eu(Or) ? 1 : 0, ih[Or] = eu(Or);
function Nw(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Aw, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function ah(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = Sw(r), new J0(t, r);
}
function K(e, t) {
  throw ah(e, t);
}
function ha(e, t) {
  e.onWarning && e.onWarning.call(null, ah(e, t));
}
var tu = {
  YAML: function(t, r, n) {
    var i, a, o;
    t.version !== null && K(t, "duplication of %YAML directive"), n.length !== 1 && K(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && K(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), o = parseInt(i[2], 10), a !== 1 && K(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && ha(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, a;
    n.length !== 2 && K(t, "TAG directive accepts exactly two arguments"), i = n[0], a = n[1], eh.test(i) || K(t, "ill-formed tag handle (first argument) of the TAG directive"), Wt.call(t.tagMap, i) && K(t, 'there is a previously declared suffix for "' + i + '" tag handle'), th.test(a) || K(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      a = decodeURIComponent(a);
    } catch {
      K(t, "tag prefix is malformed: " + a);
    }
    t.tagMap[i] = a;
  }
};
function qt(e, t, r, n) {
  var i, a, o, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, a = s.length; i < a; i += 1)
        o = s.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || K(e, "expected valid JSON character");
    else Cw.test(s) && K(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function ru(e, t, r, n) {
  var i, a, o, s;
  for (fr.isObject(r) || K(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), o = 0, s = i.length; o < s; o += 1)
    a = i[o], Wt.call(t, a) || (rh(t, a, r[a]), n[a] = !0);
}
function Mr(e, t, r, n, i, a, o, s, l) {
  var p, u;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), p = 0, u = i.length; p < u; p += 1)
      Array.isArray(i[p]) && K(e, "nested arrays are not supported inside keys"), typeof i == "object" && Zc(i[p]) === "[object Object]" && (i[p] = "[object Object]");
  if (typeof i == "object" && Zc(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (p = 0, u = a.length; p < u; p += 1)
        ru(e, t, a[p], r);
    else
      ru(e, t, a, r);
  else
    !e.json && !Wt.call(r, i) && Wt.call(t, i) && (e.line = o || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, K(e, "duplicated mapping key")), rh(t, i, a), delete r[i];
  return t;
}
function gl(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : K(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function ge(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; mr(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (dt(i))
      for (gl(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && ha(e, "deficient indentation"), n;
}
function Oa(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || ze(r)));
}
function yl(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += fr.repeat(`
`, t - 1));
}
function $w(e, t, r) {
  var n, i, a, o, s, l, p, u, d = e.kind, h = e.result, m;
  if (m = e.input.charCodeAt(e.position), ze(m) || Br(m) || m === 35 || m === 38 || m === 42 || m === 33 || m === 124 || m === 62 || m === 39 || m === 34 || m === 37 || m === 64 || m === 96 || (m === 63 || m === 45) && (i = e.input.charCodeAt(e.position + 1), ze(i) || r && Br(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = o = e.position, s = !1; m !== 0; ) {
    if (m === 58) {
      if (i = e.input.charCodeAt(e.position + 1), ze(i) || r && Br(i))
        break;
    } else if (m === 35) {
      if (n = e.input.charCodeAt(e.position - 1), ze(n))
        break;
    } else {
      if (e.position === e.lineStart && Oa(e) || r && Br(m))
        break;
      if (dt(m))
        if (l = e.line, p = e.lineStart, u = e.lineIndent, ge(e, !1, -1), e.lineIndent >= t) {
          s = !0, m = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = l, e.lineStart = p, e.lineIndent = u;
          break;
        }
    }
    s && (qt(e, a, o, !1), yl(e, e.line - l), a = o = e.position, s = !1), mr(m) || (o = e.position + 1), m = e.input.charCodeAt(++e.position);
  }
  return qt(e, a, o, !1), e.result ? !0 : (e.kind = d, e.result = h, !1);
}
function Lw(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (qt(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else dt(r) ? (qt(e, n, i, !0), yl(e, ge(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Oa(e) ? K(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  K(e, "unexpected end of the stream within a single quoted scalar");
}
function Uw(e, t) {
  var r, n, i, a, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return qt(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (qt(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), dt(s))
        ge(e, !1, t);
      else if (s < 256 && nh[s])
        e.result += ih[s], e.position++;
      else if ((o = Dw(s)) > 0) {
        for (i = o, a = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (o = Pw(s)) >= 0 ? a = (a << 4) + o : K(e, "expected hexadecimal character");
        e.result += Fw(a), e.position++;
      } else
        K(e, "unknown escape sequence");
      r = n = e.position;
    } else dt(s) ? (qt(e, r, n, !0), yl(e, ge(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Oa(e) ? K(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  K(e, "unexpected end of the stream within a double quoted scalar");
}
function kw(e, t) {
  var r = !0, n, i, a, o = e.tag, s, l = e.anchor, p, u, d, h, m, w = /* @__PURE__ */ Object.create(null), x, b, g, v;
  if (v = e.input.charCodeAt(e.position), v === 91)
    u = 93, m = !1, s = [];
  else if (v === 123)
    u = 125, m = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), v = e.input.charCodeAt(++e.position); v !== 0; ) {
    if (ge(e, !0, t), v = e.input.charCodeAt(e.position), v === u)
      return e.position++, e.tag = o, e.anchor = l, e.kind = m ? "mapping" : "sequence", e.result = s, !0;
    r ? v === 44 && K(e, "expected the node content, but found ','") : K(e, "missed comma between flow collection entries"), b = x = g = null, d = h = !1, v === 63 && (p = e.input.charCodeAt(e.position + 1), ze(p) && (d = h = !0, e.position++, ge(e, !0, t))), n = e.line, i = e.lineStart, a = e.position, en(e, t, fa, !1, !0), b = e.tag, x = e.result, ge(e, !0, t), v = e.input.charCodeAt(e.position), (h || e.line === n) && v === 58 && (d = !0, v = e.input.charCodeAt(++e.position), ge(e, !0, t), en(e, t, fa, !1, !0), g = e.result), m ? Mr(e, s, w, b, x, g, n, i, a) : d ? s.push(Mr(e, null, w, b, x, g, n, i, a)) : s.push(x), ge(e, !0, t), v = e.input.charCodeAt(e.position), v === 44 ? (r = !0, v = e.input.charCodeAt(++e.position)) : r = !1;
  }
  K(e, "unexpected end of the stream within a flow collection");
}
function Bw(e, t) {
  var r, n, i = To, a = !1, o = !1, s = t, l = 0, p = !1, u, d;
  if (d = e.input.charCodeAt(e.position), d === 124)
    n = !1;
  else if (d === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; d !== 0; )
    if (d = e.input.charCodeAt(++e.position), d === 43 || d === 45)
      To === i ? i = d === 43 ? Qc : Tw : K(e, "repeat of a chomping mode identifier");
    else if ((u = Iw(d)) >= 0)
      u === 0 ? K(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? K(e, "repeat of an indentation width identifier") : (s = t + u - 1, o = !0);
    else
      break;
  if (mr(d)) {
    do
      d = e.input.charCodeAt(++e.position);
    while (mr(d));
    if (d === 35)
      do
        d = e.input.charCodeAt(++e.position);
      while (!dt(d) && d !== 0);
  }
  for (; d !== 0; ) {
    for (gl(e), e.lineIndent = 0, d = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && d === 32; )
      e.lineIndent++, d = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), dt(d)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === Qc ? e.result += fr.repeat(`
`, a ? 1 + l : l) : i === To && a && (e.result += `
`);
      break;
    }
    for (n ? mr(d) ? (p = !0, e.result += fr.repeat(`
`, a ? 1 + l : l)) : p ? (p = !1, e.result += fr.repeat(`
`, l + 1)) : l === 0 ? a && (e.result += " ") : e.result += fr.repeat(`
`, l) : e.result += fr.repeat(`
`, a ? 1 + l : l), a = !0, o = !0, l = 0, r = e.position; !dt(d) && d !== 0; )
      d = e.input.charCodeAt(++e.position);
    qt(e, r, e.position, !1);
  }
  return !0;
}
function nu(e, t) {
  var r, n = e.tag, i = e.anchor, a = [], o, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, K(e, "tab characters must not be used in indentation")), !(l !== 45 || (o = e.input.charCodeAt(e.position + 1), !ze(o)))); ) {
    if (s = !0, e.position++, ge(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, en(e, t, Z0, !1, !0), a.push(e.result), ge(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      K(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function Mw(e, t, r) {
  var n, i, a, o, s, l, p = e.tag, u = e.anchor, d = {}, h = /* @__PURE__ */ Object.create(null), m = null, w = null, x = null, b = !1, g = !1, v;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = d), v = e.input.charCodeAt(e.position); v !== 0; ) {
    if (!b && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, K(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), a = e.line, (v === 63 || v === 58) && ze(n))
      v === 63 ? (b && (Mr(e, d, h, m, w, null, o, s, l), m = w = x = null), g = !0, b = !0, i = !0) : b ? (b = !1, i = !0) : K(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, v = n;
    else {
      if (o = e.line, s = e.lineStart, l = e.position, !en(e, r, Q0, !1, !0))
        break;
      if (e.line === a) {
        for (v = e.input.charCodeAt(e.position); mr(v); )
          v = e.input.charCodeAt(++e.position);
        if (v === 58)
          v = e.input.charCodeAt(++e.position), ze(v) || K(e, "a whitespace character is expected after the key-value separator within a block mapping"), b && (Mr(e, d, h, m, w, null, o, s, l), m = w = x = null), g = !0, b = !1, i = !1, m = e.tag, w = e.result;
        else if (g)
          K(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = p, e.anchor = u, !0;
      } else if (g)
        K(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = p, e.anchor = u, !0;
    }
    if ((e.line === a || e.lineIndent > t) && (b && (o = e.line, s = e.lineStart, l = e.position), en(e, t, da, !0, i) && (b ? w = e.result : x = e.result), b || (Mr(e, d, h, m, w, x, o, s, l), m = w = x = null), ge(e, !0, -1), v = e.input.charCodeAt(e.position)), (e.line === a || e.lineIndent > t) && v !== 0)
      K(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return b && Mr(e, d, h, m, w, null, o, s, l), g && (e.tag = p, e.anchor = u, e.kind = "mapping", e.result = d), g;
}
function jw(e) {
  var t, r = !1, n = !1, i, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && K(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : K(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !ze(o); )
      o === 33 && (n ? K(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), eh.test(i) || K(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), Ow.test(a) && K(e, "tag suffix cannot contain flow indicator characters");
  }
  a && !th.test(a) && K(e, "tag name cannot contain such characters: " + a);
  try {
    a = decodeURIComponent(a);
  } catch {
    K(e, "tag name is malformed: " + a);
  }
  return r ? e.tag = a : Wt.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : K(e, 'undeclared tag handle "' + i + '"'), !0;
}
function qw(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && K(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !ze(r) && !Br(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && K(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function Hw(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !ze(n) && !Br(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && K(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Wt.call(e.anchorMap, r) || K(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], ge(e, !0, -1), !0;
}
function en(e, t, r, n, i) {
  var a, o, s, l = 1, p = !1, u = !1, d, h, m, w, x, b;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = o = s = da === r || Z0 === r, n && ge(e, !0, -1) && (p = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; jw(e) || qw(e); )
      ge(e, !0, -1) ? (p = !0, s = a, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = p || i), (l === 1 || da === r) && (fa === r || Q0 === r ? x = t : x = t + 1, b = e.position - e.lineStart, l === 1 ? s && (nu(e, b) || Mw(e, b, x)) || kw(e, x) ? u = !0 : (o && Bw(e, x) || Lw(e, x) || Uw(e, x) ? u = !0 : Hw(e) ? (u = !0, (e.tag !== null || e.anchor !== null) && K(e, "alias node should not have any properties")) : $w(e, x, fa === r) && (u = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (u = s && nu(e, b))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && K(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), d = 0, h = e.implicitTypes.length; d < h; d += 1)
      if (w = e.implicitTypes[d], w.resolve(e.result)) {
        e.result = w.construct(e.result), e.tag = w.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Wt.call(e.typeMap[e.kind || "fallback"], e.tag))
      w = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (w = null, m = e.typeMap.multi[e.kind || "fallback"], d = 0, h = m.length; d < h; d += 1)
        if (e.tag.slice(0, m[d].tag.length) === m[d].tag) {
          w = m[d];
          break;
        }
    w || K(e, "unknown tag !<" + e.tag + ">"), e.result !== null && w.kind !== e.kind && K(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + w.kind + '", not "' + e.kind + '"'), w.resolve(e.result, e.tag) ? (e.result = w.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : K(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || u;
}
function Gw(e) {
  var t = e.position, r, n, i, a = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (ge(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (a = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !ze(o); )
      o = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && K(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; mr(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !dt(o));
        break;
      }
      if (dt(o)) break;
      for (r = e.position; o !== 0 && !ze(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    o !== 0 && gl(e), Wt.call(tu, n) ? tu[n](e, n, i) : ha(e, 'unknown document directive "' + n + '"');
  }
  if (ge(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ge(e, !0, -1)) : a && K(e, "directives end mark is expected"), en(e, e.lineIndent - 1, da, !1, !0), ge(e, !0, -1), e.checkLineBreaks && Rw.test(e.input.slice(t, e.position)) && ha(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Oa(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ge(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    K(e, "end of the stream or a document separator is expected");
  else
    return;
}
function oh(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new Nw(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, K(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    Gw(r);
  return r.documents;
}
function zw(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = oh(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, a = n.length; i < a; i += 1)
    t(n[i]);
}
function Ww(e, t) {
  var r = oh(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new J0("expected a single document in the stream, but found more");
  }
}
pl.loadAll = zw;
pl.load = Ww;
var sh = {}, Pa = at, Qn = Jn, Vw = xl, lh = Object.prototype.toString, ch = Object.prototype.hasOwnProperty, vl = 65279, Yw = 9, Fn = 10, Xw = 13, Kw = 32, Jw = 33, Qw = 34, ks = 35, Zw = 37, e1 = 38, t1 = 39, r1 = 42, uh = 44, n1 = 45, pa = 58, i1 = 61, a1 = 62, o1 = 63, s1 = 64, fh = 91, dh = 93, l1 = 96, hh = 123, c1 = 124, ph = 125, Ne = {};
Ne[0] = "\\0";
Ne[7] = "\\a";
Ne[8] = "\\b";
Ne[9] = "\\t";
Ne[10] = "\\n";
Ne[11] = "\\v";
Ne[12] = "\\f";
Ne[13] = "\\r";
Ne[27] = "\\e";
Ne[34] = '\\"';
Ne[92] = "\\\\";
Ne[133] = "\\N";
Ne[160] = "\\_";
Ne[8232] = "\\L";
Ne[8233] = "\\P";
var u1 = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], f1 = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function d1(e, t) {
  var r, n, i, a, o, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, a = n.length; i < a; i += 1)
    o = n[i], s = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), l = e.compiledTypeMap.fallback[o], l && ch.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[o] = s;
  return r;
}
function h1(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Qn("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Pa.repeat("0", n - t.length) + t;
}
var p1 = 1, Nn = 2;
function m1(e) {
  this.schema = e.schema || Vw, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Pa.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = d1(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Nn : p1, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function iu(e, t) {
  for (var r = Pa.repeat(" ", t), n = 0, i = -1, a = "", o, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (o = e.slice(n), n = s) : (o = e.slice(n, i + 1), n = i + 1), o.length && o !== `
` && (a += r), a += o;
  return a;
}
function Bs(e, t) {
  return `
` + Pa.repeat(" ", e.indent * t);
}
function x1(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function ma(e) {
  return e === Kw || e === Yw;
}
function $n(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== vl || 65536 <= e && e <= 1114111;
}
function au(e) {
  return $n(e) && e !== vl && e !== Xw && e !== Fn;
}
function ou(e, t, r) {
  var n = au(e), i = n && !ma(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== uh && e !== fh && e !== dh && e !== hh && e !== ph) && e !== ks && !(t === pa && !i) || au(t) && !ma(t) && e === ks || t === pa && i
  );
}
function g1(e) {
  return $n(e) && e !== vl && !ma(e) && e !== n1 && e !== o1 && e !== pa && e !== uh && e !== fh && e !== dh && e !== hh && e !== ph && e !== ks && e !== e1 && e !== r1 && e !== Jw && e !== c1 && e !== i1 && e !== a1 && e !== t1 && e !== Qw && e !== Zw && e !== s1 && e !== l1;
}
function y1(e) {
  return !ma(e) && e !== pa;
}
function _n(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function mh(e) {
  var t = /^\n* /;
  return t.test(e);
}
var xh = 1, Ms = 2, gh = 3, yh = 4, $r = 5;
function v1(e, t, r, n, i, a, o, s) {
  var l, p = 0, u = null, d = !1, h = !1, m = n !== -1, w = -1, x = g1(_n(e, 0)) && y1(_n(e, e.length - 1));
  if (t || o)
    for (l = 0; l < e.length; p >= 65536 ? l += 2 : l++) {
      if (p = _n(e, l), !$n(p))
        return $r;
      x = x && ou(p, u, s), u = p;
    }
  else {
    for (l = 0; l < e.length; p >= 65536 ? l += 2 : l++) {
      if (p = _n(e, l), p === Fn)
        d = !0, m && (h = h || // Foldable line = too long, and not more-indented.
        l - w - 1 > n && e[w + 1] !== " ", w = l);
      else if (!$n(p))
        return $r;
      x = x && ou(p, u, s), u = p;
    }
    h = h || m && l - w - 1 > n && e[w + 1] !== " ";
  }
  return !d && !h ? x && !o && !i(e) ? xh : a === Nn ? $r : Ms : r > 9 && mh(e) ? $r : o ? a === Nn ? $r : Ms : h ? yh : gh;
}
function w1(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Nn ? '""' : "''";
    if (!e.noCompatMode && (u1.indexOf(t) !== -1 || f1.test(t)))
      return e.quotingType === Nn ? '"' + t + '"' : "'" + t + "'";
    var a = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(p) {
      return x1(e, p);
    }
    switch (v1(
      t,
      s,
      e.indent,
      o,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case xh:
        return t;
      case Ms:
        return "'" + t.replace(/'/g, "''") + "'";
      case gh:
        return "|" + su(t, e.indent) + lu(iu(t, a));
      case yh:
        return ">" + su(t, e.indent) + lu(iu(E1(t, o), a));
      case $r:
        return '"' + _1(t) + '"';
      default:
        throw new Qn("impossible error: invalid scalar style");
    }
  }();
}
function su(e, t) {
  var r = mh(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : n ? "" : "-";
  return r + a + `
`;
}
function lu(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function E1(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var p = e.indexOf(`
`);
    return p = p !== -1 ? p : e.length, r.lastIndex = p, cu(e.slice(0, p), t);
  }(), i = e[0] === `
` || e[0] === " ", a, o; o = r.exec(e); ) {
    var s = o[1], l = o[2];
    a = l[0] === " ", n += s + (!i && !a && l !== "" ? `
` : "") + cu(l, t), i = a;
  }
  return n;
}
function cu(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, a, o = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (a = o > i ? o : s, l += `
` + e.slice(i, a), i = a + 1), o = s;
  return l += `
`, e.length - i > t && o > i ? l += e.slice(i, o) + `
` + e.slice(o + 1) : l += e.slice(i), l.slice(1);
}
function _1(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = _n(e, i), n = Ne[r], !n && $n(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || h1(r);
  return t;
}
function b1(e, t, r) {
  var n = "", i = e.tag, a, o, s;
  for (a = 0, o = r.length; a < o; a += 1)
    s = r[a], e.replacer && (s = e.replacer.call(r, String(a), s)), (bt(e, t, s, !1, !1) || typeof s > "u" && bt(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function uu(e, t, r, n) {
  var i = "", a = e.tag, o, s, l;
  for (o = 0, s = r.length; o < s; o += 1)
    l = r[o], e.replacer && (l = e.replacer.call(r, String(o), l)), (bt(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && bt(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Bs(e, t)), e.dump && Fn === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function S1(e, t, r) {
  var n = "", i = e.tag, a = Object.keys(r), o, s, l, p, u;
  for (o = 0, s = a.length; o < s; o += 1)
    u = "", n !== "" && (u += ", "), e.condenseFlow && (u += '"'), l = a[o], p = r[l], e.replacer && (p = e.replacer.call(r, l, p)), bt(e, t, l, !1, !1) && (e.dump.length > 1024 && (u += "? "), u += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), bt(e, t, p, !1, !1) && (u += e.dump, n += u));
  e.tag = i, e.dump = "{" + n + "}";
}
function A1(e, t, r, n) {
  var i = "", a = e.tag, o = Object.keys(r), s, l, p, u, d, h;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Qn("sortKeys must be a boolean or a function");
  for (s = 0, l = o.length; s < l; s += 1)
    h = "", (!n || i !== "") && (h += Bs(e, t)), p = o[s], u = r[p], e.replacer && (u = e.replacer.call(r, p, u)), bt(e, t + 1, p, !0, !0, !0) && (d = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, d && (e.dump && Fn === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, d && (h += Bs(e, t)), bt(e, t + 1, u, !0, d) && (e.dump && Fn === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = a, e.dump = i || "{}";
}
function fu(e, t, r) {
  var n, i, a, o, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, a = 0, o = i.length; a < o; a += 1)
    if (s = i[a], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, lh.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (ch.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new Qn("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function bt(e, t, r, n, i, a, o) {
  e.tag = null, e.dump = r, fu(e, r, !1) || fu(e, r, !0);
  var s = lh.call(e.dump), l = n, p;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var u = s === "[object Object]" || s === "[object Array]", d, h;
  if (u && (d = e.duplicates.indexOf(r), h = d !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[d])
    e.dump = "*ref_" + d;
  else {
    if (u && h && !e.usedDuplicates[d] && (e.usedDuplicates[d] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (A1(e, t, e.dump, i), h && (e.dump = "&ref_" + d + e.dump)) : (S1(e, t, e.dump), h && (e.dump = "&ref_" + d + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !o && t > 0 ? uu(e, t - 1, e.dump, i) : uu(e, t, e.dump, i), h && (e.dump = "&ref_" + d + e.dump)) : (b1(e, t, e.dump), h && (e.dump = "&ref_" + d + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && w1(e, e.dump, t, a, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Qn("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (p = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? p = "!" + p : p.slice(0, 18) === "tag:yaml.org,2002:" ? p = "!!" + p.slice(18) : p = "!<" + p + ">", e.dump = p + " " + e.dump);
  }
  return !0;
}
function T1(e, t) {
  var r = [], n = [], i, a;
  for (js(e, r, n), i = 0, a = n.length; i < a; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(a);
}
function js(e, t, r) {
  var n, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        js(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, a = n.length; i < a; i += 1)
        js(e[n[i]], t, r);
}
function C1(e, t) {
  t = t || {};
  var r = new m1(t);
  r.noRefs || T1(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), bt(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
sh.dump = C1;
var vh = pl, R1 = sh;
function wl(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
De.Type = qe;
De.Schema = D0;
De.FAILSAFE_SCHEMA = $0;
De.JSON_SCHEMA = j0;
De.CORE_SCHEMA = q0;
De.DEFAULT_SCHEMA = xl;
De.load = vh.load;
De.loadAll = vh.loadAll;
De.dump = R1.dump;
De.YAMLException = Jn;
De.types = {
  binary: V0,
  float: M0,
  map: N0,
  null: L0,
  pairs: X0,
  set: K0,
  timestamp: z0,
  bool: U0,
  int: k0,
  merge: W0,
  omap: Y0,
  seq: F0,
  str: I0
};
De.safeLoad = wl("safeLoad", "load");
De.safeLoadAll = wl("safeLoadAll", "loadAll");
De.safeDump = wl("safeDump", "dump");
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
Da.Lazy = void 0;
class O1 {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Da.Lazy = O1;
var qs = { exports: {} };
const P1 = "2.0.0", wh = 256, D1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, I1 = 16, F1 = wh - 6, N1 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ia = {
  MAX_LENGTH: wh,
  MAX_SAFE_COMPONENT_LENGTH: I1,
  MAX_SAFE_BUILD_LENGTH: F1,
  MAX_SAFE_INTEGER: D1,
  RELEASE_TYPES: N1,
  SEMVER_SPEC_VERSION: P1,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const $1 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Fa = $1;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Ia, a = Fa;
  t = e.exports = {};
  const o = t.re = [], s = t.safeRe = [], l = t.src = [], p = t.safeSrc = [], u = t.t = {};
  let d = 0;
  const h = "[a-zA-Z0-9-]", m = [
    ["\\s", 1],
    ["\\d", i],
    [h, n]
  ], w = (b) => {
    for (const [g, v] of m)
      b = b.split(`${g}*`).join(`${g}{0,${v}}`).split(`${g}+`).join(`${g}{1,${v}}`);
    return b;
  }, x = (b, g, v) => {
    const O = w(g), D = d++;
    a(b, D, g), u[b] = D, l[D] = g, p[D] = O, o[D] = new RegExp(g, v ? "g" : void 0), s[D] = new RegExp(O, v ? "g" : void 0);
  };
  x("NUMERICIDENTIFIER", "0|[1-9]\\d*"), x("NUMERICIDENTIFIERLOOSE", "\\d+"), x("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), x("MAINVERSION", `(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})\\.(${l[u.NUMERICIDENTIFIER]})`), x("MAINVERSIONLOOSE", `(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})\\.(${l[u.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASEIDENTIFIER", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIER]})`), x("PRERELEASEIDENTIFIERLOOSE", `(?:${l[u.NONNUMERICIDENTIFIER]}|${l[u.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASE", `(?:-(${l[u.PRERELEASEIDENTIFIER]}(?:\\.${l[u.PRERELEASEIDENTIFIER]})*))`), x("PRERELEASELOOSE", `(?:-?(${l[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[u.PRERELEASEIDENTIFIERLOOSE]})*))`), x("BUILDIDENTIFIER", `${h}+`), x("BUILD", `(?:\\+(${l[u.BUILDIDENTIFIER]}(?:\\.${l[u.BUILDIDENTIFIER]})*))`), x("FULLPLAIN", `v?${l[u.MAINVERSION]}${l[u.PRERELEASE]}?${l[u.BUILD]}?`), x("FULL", `^${l[u.FULLPLAIN]}$`), x("LOOSEPLAIN", `[v=\\s]*${l[u.MAINVERSIONLOOSE]}${l[u.PRERELEASELOOSE]}?${l[u.BUILD]}?`), x("LOOSE", `^${l[u.LOOSEPLAIN]}$`), x("GTLT", "((?:<|>)?=?)"), x("XRANGEIDENTIFIERLOOSE", `${l[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), x("XRANGEIDENTIFIER", `${l[u.NUMERICIDENTIFIER]}|x|X|\\*`), x("XRANGEPLAIN", `[v=\\s]*(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:\\.(${l[u.XRANGEIDENTIFIER]})(?:${l[u.PRERELEASE]})?${l[u.BUILD]}?)?)?`), x("XRANGEPLAINLOOSE", `[v=\\s]*(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[u.XRANGEIDENTIFIERLOOSE]})(?:${l[u.PRERELEASELOOSE]})?${l[u.BUILD]}?)?)?`), x("XRANGE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAIN]}$`), x("XRANGELOOSE", `^${l[u.GTLT]}\\s*${l[u.XRANGEPLAINLOOSE]}$`), x("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), x("COERCE", `${l[u.COERCEPLAIN]}(?:$|[^\\d])`), x("COERCEFULL", l[u.COERCEPLAIN] + `(?:${l[u.PRERELEASE]})?(?:${l[u.BUILD]})?(?:$|[^\\d])`), x("COERCERTL", l[u.COERCE], !0), x("COERCERTLFULL", l[u.COERCEFULL], !0), x("LONETILDE", "(?:~>?)"), x("TILDETRIM", `(\\s*)${l[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", x("TILDE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAIN]}$`), x("TILDELOOSE", `^${l[u.LONETILDE]}${l[u.XRANGEPLAINLOOSE]}$`), x("LONECARET", "(?:\\^)"), x("CARETTRIM", `(\\s*)${l[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", x("CARET", `^${l[u.LONECARET]}${l[u.XRANGEPLAIN]}$`), x("CARETLOOSE", `^${l[u.LONECARET]}${l[u.XRANGEPLAINLOOSE]}$`), x("COMPARATORLOOSE", `^${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]})$|^$`), x("COMPARATOR", `^${l[u.GTLT]}\\s*(${l[u.FULLPLAIN]})$|^$`), x("COMPARATORTRIM", `(\\s*)${l[u.GTLT]}\\s*(${l[u.LOOSEPLAIN]}|${l[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", x("HYPHENRANGE", `^\\s*(${l[u.XRANGEPLAIN]})\\s+-\\s+(${l[u.XRANGEPLAIN]})\\s*$`), x("HYPHENRANGELOOSE", `^\\s*(${l[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[u.XRANGEPLAINLOOSE]})\\s*$`), x("STAR", "(<|>)?=?\\s*\\*"), x("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), x("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(qs, qs.exports);
var Zn = qs.exports;
const L1 = Object.freeze({ loose: !0 }), U1 = Object.freeze({}), k1 = (e) => e ? typeof e != "object" ? L1 : e : U1;
var El = k1;
const du = /^[0-9]+$/, Eh = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = du.test(e), n = du.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, B1 = (e, t) => Eh(t, e);
var _h = {
  compareIdentifiers: Eh,
  rcompareIdentifiers: B1
};
const Ii = Fa, { MAX_LENGTH: hu, MAX_SAFE_INTEGER: Fi } = Ia, { safeRe: Ni, t: $i } = Zn, M1 = El, { compareIdentifiers: Co } = _h;
let j1 = class ut {
  constructor(t, r) {
    if (r = M1(r), t instanceof ut) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > hu)
      throw new TypeError(
        `version is longer than ${hu} characters`
      );
    Ii("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Ni[$i.LOOSE] : Ni[$i.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Fi || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Fi || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Fi || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const a = +i;
        if (a >= 0 && a < Fi)
          return a;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Ii("SemVer.compare", this.version, this.options, t), !(t instanceof ut)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ut(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ut || (t = new ut(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ut || (t = new ut(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (Ii("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Co(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof ut || (t = new ut(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (Ii("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Co(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? Ni[$i.PRERELEASELOOSE] : Ni[$i.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let a = [r, i];
          n === !1 && (a = [r]), Co(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var He = j1;
const pu = He, q1 = (e, t, r = !1) => {
  if (e instanceof pu)
    return e;
  try {
    return new pu(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var on = q1;
const H1 = on, G1 = (e, t) => {
  const r = H1(e, t);
  return r ? r.version : null;
};
var z1 = G1;
const W1 = on, V1 = (e, t) => {
  const r = W1(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var Y1 = V1;
const mu = He, X1 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new mu(
      e instanceof mu ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var K1 = X1;
const xu = on, J1 = (e, t) => {
  const r = xu(e, null, !0), n = xu(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const a = i > 0, o = a ? r : n, s = a ? n : r, l = !!o.prerelease.length;
  if (!!s.prerelease.length && !l) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(o) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const u = l ? "pre" : "";
  return r.major !== n.major ? u + "major" : r.minor !== n.minor ? u + "minor" : r.patch !== n.patch ? u + "patch" : "prerelease";
};
var Q1 = J1;
const Z1 = He, eE = (e, t) => new Z1(e, t).major;
var tE = eE;
const rE = He, nE = (e, t) => new rE(e, t).minor;
var iE = nE;
const aE = He, oE = (e, t) => new aE(e, t).patch;
var sE = oE;
const lE = on, cE = (e, t) => {
  const r = lE(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var uE = cE;
const gu = He, fE = (e, t, r) => new gu(e, r).compare(new gu(t, r));
var ot = fE;
const dE = ot, hE = (e, t, r) => dE(t, e, r);
var pE = hE;
const mE = ot, xE = (e, t) => mE(e, t, !0);
var gE = xE;
const yu = He, yE = (e, t, r) => {
  const n = new yu(e, r), i = new yu(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var _l = yE;
const vE = _l, wE = (e, t) => e.sort((r, n) => vE(r, n, t));
var EE = wE;
const _E = _l, bE = (e, t) => e.sort((r, n) => _E(n, r, t));
var SE = bE;
const AE = ot, TE = (e, t, r) => AE(e, t, r) > 0;
var Na = TE;
const CE = ot, RE = (e, t, r) => CE(e, t, r) < 0;
var bl = RE;
const OE = ot, PE = (e, t, r) => OE(e, t, r) === 0;
var bh = PE;
const DE = ot, IE = (e, t, r) => DE(e, t, r) !== 0;
var Sh = IE;
const FE = ot, NE = (e, t, r) => FE(e, t, r) >= 0;
var Sl = NE;
const $E = ot, LE = (e, t, r) => $E(e, t, r) <= 0;
var Al = LE;
const UE = bh, kE = Sh, BE = Na, ME = Sl, jE = bl, qE = Al, HE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return UE(e, r, n);
    case "!=":
      return kE(e, r, n);
    case ">":
      return BE(e, r, n);
    case ">=":
      return ME(e, r, n);
    case "<":
      return jE(e, r, n);
    case "<=":
      return qE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Ah = HE;
const GE = He, zE = on, { safeRe: Li, t: Ui } = Zn, WE = (e, t) => {
  if (e instanceof GE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Li[Ui.COERCEFULL] : Li[Ui.COERCE]);
  else {
    const l = t.includePrerelease ? Li[Ui.COERCERTLFULL] : Li[Ui.COERCERTL];
    let p;
    for (; (p = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || p.index + p[0].length !== r.index + r[0].length) && (r = p), l.lastIndex = p.index + p[1].length + p[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return zE(`${n}.${i}.${a}${o}${s}`, t);
};
var VE = WE;
class YE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var XE = YE, Ro, vu;
function st() {
  if (vu) return Ro;
  vu = 1;
  const e = /\s+/g;
  class t {
    constructor(P, k) {
      if (k = i(k), P instanceof t)
        return P.loose === !!k.loose && P.includePrerelease === !!k.includePrerelease ? P : new t(P.raw, k);
      if (P instanceof a)
        return this.raw = P.value, this.set = [[P]], this.formatted = void 0, this;
      if (this.options = k, this.loose = !!k.loose, this.includePrerelease = !!k.includePrerelease, this.raw = P.trim().replace(e, " "), this.set = this.raw.split("||").map((_) => this.parseRange(_.trim())).filter((_) => _.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const _ = this.set[0];
        if (this.set = this.set.filter((A) => !x(A[0])), this.set.length === 0)
          this.set = [_];
        else if (this.set.length > 1) {
          for (const A of this.set)
            if (A.length === 1 && b(A[0])) {
              this.set = [A];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let P = 0; P < this.set.length; P++) {
          P > 0 && (this.formatted += "||");
          const k = this.set[P];
          for (let _ = 0; _ < k.length; _++)
            _ > 0 && (this.formatted += " "), this.formatted += k[_].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(P) {
      const _ = ((this.options.includePrerelease && m) | (this.options.loose && w)) + ":" + P, A = n.get(_);
      if (A)
        return A;
      const R = this.options.loose, I = R ? l[p.HYPHENRANGELOOSE] : l[p.HYPHENRANGE];
      P = P.replace(I, G(this.options.includePrerelease)), o("hyphen replace", P), P = P.replace(l[p.COMPARATORTRIM], u), o("comparator trim", P), P = P.replace(l[p.TILDETRIM], d), o("tilde trim", P), P = P.replace(l[p.CARETTRIM], h), o("caret trim", P);
      let j = P.split(" ").map((V) => v(V, this.options)).join(" ").split(/\s+/).map((V) => q(V, this.options));
      R && (j = j.filter((V) => (o("loose invalid filter", V, this.options), !!V.match(l[p.COMPARATORLOOSE])))), o("range list", j);
      const M = /* @__PURE__ */ new Map(), Q = j.map((V) => new a(V, this.options));
      for (const V of Q) {
        if (x(V))
          return [V];
        M.set(V.value, V);
      }
      M.size > 1 && M.has("") && M.delete("");
      const te = [...M.values()];
      return n.set(_, te), te;
    }
    intersects(P, k) {
      if (!(P instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((_) => g(_, k) && P.set.some((A) => g(A, k) && _.every((R) => A.every((I) => R.intersects(I, k)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(P) {
      if (!P)
        return !1;
      if (typeof P == "string")
        try {
          P = new s(P, this.options);
        } catch {
          return !1;
        }
      for (let k = 0; k < this.set.length; k++)
        if (J(this.set[k], P, this.options))
          return !0;
      return !1;
    }
  }
  Ro = t;
  const r = XE, n = new r(), i = El, a = $a(), o = Fa, s = He, {
    safeRe: l,
    t: p,
    comparatorTrimReplace: u,
    tildeTrimReplace: d,
    caretTrimReplace: h
  } = Zn, { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: w } = Ia, x = (N) => N.value === "<0.0.0-0", b = (N) => N.value === "", g = (N, P) => {
    let k = !0;
    const _ = N.slice();
    let A = _.pop();
    for (; k && _.length; )
      k = _.every((R) => A.intersects(R, P)), A = _.pop();
    return k;
  }, v = (N, P) => (N = N.replace(l[p.BUILD], ""), o("comp", N, P), N = F(N, P), o("caret", N), N = D(N, P), o("tildes", N), N = Y(N, P), o("xrange", N), N = U(N, P), o("stars", N), N), O = (N) => !N || N.toLowerCase() === "x" || N === "*", D = (N, P) => N.trim().split(/\s+/).map((k) => B(k, P)).join(" "), B = (N, P) => {
    const k = P.loose ? l[p.TILDELOOSE] : l[p.TILDE];
    return N.replace(k, (_, A, R, I, j) => {
      o("tilde", N, _, A, R, I, j);
      let M;
      return O(A) ? M = "" : O(R) ? M = `>=${A}.0.0 <${+A + 1}.0.0-0` : O(I) ? M = `>=${A}.${R}.0 <${A}.${+R + 1}.0-0` : j ? (o("replaceTilde pr", j), M = `>=${A}.${R}.${I}-${j} <${A}.${+R + 1}.0-0`) : M = `>=${A}.${R}.${I} <${A}.${+R + 1}.0-0`, o("tilde return", M), M;
    });
  }, F = (N, P) => N.trim().split(/\s+/).map((k) => L(k, P)).join(" "), L = (N, P) => {
    o("caret", N, P);
    const k = P.loose ? l[p.CARETLOOSE] : l[p.CARET], _ = P.includePrerelease ? "-0" : "";
    return N.replace(k, (A, R, I, j, M) => {
      o("caret", N, A, R, I, j, M);
      let Q;
      return O(R) ? Q = "" : O(I) ? Q = `>=${R}.0.0${_} <${+R + 1}.0.0-0` : O(j) ? R === "0" ? Q = `>=${R}.${I}.0${_} <${R}.${+I + 1}.0-0` : Q = `>=${R}.${I}.0${_} <${+R + 1}.0.0-0` : M ? (o("replaceCaret pr", M), R === "0" ? I === "0" ? Q = `>=${R}.${I}.${j}-${M} <${R}.${I}.${+j + 1}-0` : Q = `>=${R}.${I}.${j}-${M} <${R}.${+I + 1}.0-0` : Q = `>=${R}.${I}.${j}-${M} <${+R + 1}.0.0-0`) : (o("no pr"), R === "0" ? I === "0" ? Q = `>=${R}.${I}.${j}${_} <${R}.${I}.${+j + 1}-0` : Q = `>=${R}.${I}.${j}${_} <${R}.${+I + 1}.0-0` : Q = `>=${R}.${I}.${j} <${+R + 1}.0.0-0`), o("caret return", Q), Q;
    });
  }, Y = (N, P) => (o("replaceXRanges", N, P), N.split(/\s+/).map((k) => E(k, P)).join(" ")), E = (N, P) => {
    N = N.trim();
    const k = P.loose ? l[p.XRANGELOOSE] : l[p.XRANGE];
    return N.replace(k, (_, A, R, I, j, M) => {
      o("xRange", N, _, A, R, I, j, M);
      const Q = O(R), te = Q || O(I), V = te || O(j), ce = V;
      return A === "=" && ce && (A = ""), M = P.includePrerelease ? "-0" : "", Q ? A === ">" || A === "<" ? _ = "<0.0.0-0" : _ = "*" : A && ce ? (te && (I = 0), j = 0, A === ">" ? (A = ">=", te ? (R = +R + 1, I = 0, j = 0) : (I = +I + 1, j = 0)) : A === "<=" && (A = "<", te ? R = +R + 1 : I = +I + 1), A === "<" && (M = "-0"), _ = `${A + R}.${I}.${j}${M}`) : te ? _ = `>=${R}.0.0${M} <${+R + 1}.0.0-0` : V && (_ = `>=${R}.${I}.0${M} <${R}.${+I + 1}.0-0`), o("xRange return", _), _;
    });
  }, U = (N, P) => (o("replaceStars", N, P), N.trim().replace(l[p.STAR], "")), q = (N, P) => (o("replaceGTE0", N, P), N.trim().replace(l[P.includePrerelease ? p.GTE0PRE : p.GTE0], "")), G = (N) => (P, k, _, A, R, I, j, M, Q, te, V, ce) => (O(_) ? k = "" : O(A) ? k = `>=${_}.0.0${N ? "-0" : ""}` : O(R) ? k = `>=${_}.${A}.0${N ? "-0" : ""}` : I ? k = `>=${k}` : k = `>=${k}${N ? "-0" : ""}`, O(Q) ? M = "" : O(te) ? M = `<${+Q + 1}.0.0-0` : O(V) ? M = `<${Q}.${+te + 1}.0-0` : ce ? M = `<=${Q}.${te}.${V}-${ce}` : N ? M = `<${Q}.${te}.${+V + 1}-0` : M = `<=${M}`, `${k} ${M}`.trim()), J = (N, P, k) => {
    for (let _ = 0; _ < N.length; _++)
      if (!N[_].test(P))
        return !1;
    if (P.prerelease.length && !k.includePrerelease) {
      for (let _ = 0; _ < N.length; _++)
        if (o(N[_].semver), N[_].semver !== a.ANY && N[_].semver.prerelease.length > 0) {
          const A = N[_].semver;
          if (A.major === P.major && A.minor === P.minor && A.patch === P.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ro;
}
var Oo, wu;
function $a() {
  if (wu) return Oo;
  wu = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, d) {
      if (d = r(d), u instanceof t) {
        if (u.loose === !!d.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), o("comparator", u, d), this.options = d, this.loose = !!d.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(u) {
      const d = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = u.match(d);
      if (!h)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new s(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (o("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new s(u, this.options);
        } catch {
          return !1;
        }
      return a(u, this.operator, this.semver, this.options);
    }
    intersects(u, d) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(u.value, d).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new l(this.value, d).test(u.semver) : (d = r(d), d.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !d.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || a(this.semver, "<", u.semver, d) && this.operator.startsWith(">") && u.operator.startsWith("<") || a(this.semver, ">", u.semver, d) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  Oo = t;
  const r = El, { safeRe: n, t: i } = Zn, a = Ah, o = Fa, s = He, l = st();
  return Oo;
}
const KE = st(), JE = (e, t, r) => {
  try {
    t = new KE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var La = JE;
const QE = st(), ZE = (e, t) => new QE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var e_ = ZE;
const t_ = He, r_ = st(), n_ = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new r_(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || i.compare(o) === -1) && (n = o, i = new t_(n, r));
  }), n;
};
var i_ = n_;
const a_ = He, o_ = st(), s_ = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new o_(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || i.compare(o) === 1) && (n = o, i = new a_(n, r));
  }), n;
};
var l_ = s_;
const Po = He, c_ = st(), Eu = Na, u_ = (e, t) => {
  e = new c_(e, t);
  let r = new Po("0.0.0");
  if (e.test(r) || (r = new Po("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let a = null;
    i.forEach((o) => {
      const s = new Po(o.semver.version);
      switch (o.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!a || Eu(s, a)) && (a = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || Eu(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var f_ = u_;
const d_ = st(), h_ = (e, t) => {
  try {
    return new d_(e, t).range || "*";
  } catch {
    return null;
  }
};
var p_ = h_;
const m_ = He, Th = $a(), { ANY: x_ } = Th, g_ = st(), y_ = La, _u = Na, bu = bl, v_ = Al, w_ = Sl, E_ = (e, t, r, n) => {
  e = new m_(e, n), t = new g_(t, n);
  let i, a, o, s, l;
  switch (r) {
    case ">":
      i = _u, a = v_, o = bu, s = ">", l = ">=";
      break;
    case "<":
      i = bu, a = w_, o = _u, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (y_(e, t, n))
    return !1;
  for (let p = 0; p < t.set.length; ++p) {
    const u = t.set[p];
    let d = null, h = null;
    if (u.forEach((m) => {
      m.semver === x_ && (m = new Th(">=0.0.0")), d = d || m, h = h || m, i(m.semver, d.semver, n) ? d = m : o(m.semver, h.semver, n) && (h = m);
    }), d.operator === s || d.operator === l || (!h.operator || h.operator === s) && a(e, h.semver))
      return !1;
    if (h.operator === l && o(e, h.semver))
      return !1;
  }
  return !0;
};
var Tl = E_;
const __ = Tl, b_ = (e, t, r) => __(e, t, ">", r);
var S_ = b_;
const A_ = Tl, T_ = (e, t, r) => A_(e, t, "<", r);
var C_ = T_;
const Su = st(), R_ = (e, t, r) => (e = new Su(e, r), t = new Su(t, r), e.intersects(t, r));
var O_ = R_;
const P_ = La, D_ = ot;
var I_ = (e, t, r) => {
  const n = [];
  let i = null, a = null;
  const o = e.sort((u, d) => D_(u, d, r));
  for (const u of o)
    P_(u, t, r) ? (a = u, i || (i = u)) : (a && n.push([i, a]), a = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [u, d] of n)
    u === d ? s.push(u) : !d && u === o[0] ? s.push("*") : d ? u === o[0] ? s.push(`<=${d}`) : s.push(`${u} - ${d}`) : s.push(`>=${u}`);
  const l = s.join(" || "), p = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < p.length ? l : t;
};
const Au = st(), Cl = $a(), { ANY: Do } = Cl, mn = La, Rl = ot, F_ = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Au(e, r), t = new Au(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const a of t.set) {
      const o = $_(i, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, N_ = [new Cl(">=0.0.0-0")], Tu = [new Cl(">=0.0.0")], $_ = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Do) {
    if (t.length === 1 && t[0].semver === Do)
      return !0;
    r.includePrerelease ? e = N_ : e = Tu;
  }
  if (t.length === 1 && t[0].semver === Do) {
    if (r.includePrerelease)
      return !0;
    t = Tu;
  }
  const n = /* @__PURE__ */ new Set();
  let i, a;
  for (const m of e)
    m.operator === ">" || m.operator === ">=" ? i = Cu(i, m, r) : m.operator === "<" || m.operator === "<=" ? a = Ru(a, m, r) : n.add(m.semver);
  if (n.size > 1)
    return null;
  let o;
  if (i && a) {
    if (o = Rl(i.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (i.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const m of n) {
    if (i && !mn(m, String(i), r) || a && !mn(m, String(a), r))
      return null;
    for (const w of t)
      if (!mn(m, String(w), r))
        return !1;
    return !0;
  }
  let s, l, p, u, d = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  d && d.prerelease.length === 1 && a.operator === "<" && d.prerelease[0] === 0 && (d = !1);
  for (const m of t) {
    if (u = u || m.operator === ">" || m.operator === ">=", p = p || m.operator === "<" || m.operator === "<=", i) {
      if (h && m.semver.prerelease && m.semver.prerelease.length && m.semver.major === h.major && m.semver.minor === h.minor && m.semver.patch === h.patch && (h = !1), m.operator === ">" || m.operator === ">=") {
        if (s = Cu(i, m, r), s === m && s !== i)
          return !1;
      } else if (i.operator === ">=" && !mn(i.semver, String(m), r))
        return !1;
    }
    if (a) {
      if (d && m.semver.prerelease && m.semver.prerelease.length && m.semver.major === d.major && m.semver.minor === d.minor && m.semver.patch === d.patch && (d = !1), m.operator === "<" || m.operator === "<=") {
        if (l = Ru(a, m, r), l === m && l !== a)
          return !1;
      } else if (a.operator === "<=" && !mn(a.semver, String(m), r))
        return !1;
    }
    if (!m.operator && (a || i) && o !== 0)
      return !1;
  }
  return !(i && p && !a && o !== 0 || a && u && !i && o !== 0 || h || d);
}, Cu = (e, t, r) => {
  if (!e)
    return t;
  const n = Rl(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Ru = (e, t, r) => {
  if (!e)
    return t;
  const n = Rl(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var L_ = F_;
const Io = Zn, Ou = Ia, U_ = He, Pu = _h, k_ = on, B_ = z1, M_ = Y1, j_ = K1, q_ = Q1, H_ = tE, G_ = iE, z_ = sE, W_ = uE, V_ = ot, Y_ = pE, X_ = gE, K_ = _l, J_ = EE, Q_ = SE, Z_ = Na, eb = bl, tb = bh, rb = Sh, nb = Sl, ib = Al, ab = Ah, ob = VE, sb = $a(), lb = st(), cb = La, ub = e_, fb = i_, db = l_, hb = f_, pb = p_, mb = Tl, xb = S_, gb = C_, yb = O_, vb = I_, wb = L_;
var Ch = {
  parse: k_,
  valid: B_,
  clean: M_,
  inc: j_,
  diff: q_,
  major: H_,
  minor: G_,
  patch: z_,
  prerelease: W_,
  compare: V_,
  rcompare: Y_,
  compareLoose: X_,
  compareBuild: K_,
  sort: J_,
  rsort: Q_,
  gt: Z_,
  lt: eb,
  eq: tb,
  neq: rb,
  gte: nb,
  lte: ib,
  cmp: ab,
  coerce: ob,
  Comparator: sb,
  Range: lb,
  satisfies: cb,
  toComparators: ub,
  maxSatisfying: fb,
  minSatisfying: db,
  minVersion: hb,
  validRange: pb,
  outside: mb,
  gtr: xb,
  ltr: gb,
  intersects: yb,
  simplifyRange: vb,
  subset: wb,
  SemVer: U_,
  re: Io.re,
  src: Io.src,
  tokens: Io.t,
  SEMVER_SPEC_VERSION: Ou.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ou.RELEASE_TYPES,
  compareIdentifiers: Pu.compareIdentifiers,
  rcompareIdentifiers: Pu.rcompareIdentifiers
}, ei = {}, xa = { exports: {} };
xa.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, a = 2, o = 9007199254740991, s = "[object Arguments]", l = "[object Array]", p = "[object AsyncFunction]", u = "[object Boolean]", d = "[object Date]", h = "[object Error]", m = "[object Function]", w = "[object GeneratorFunction]", x = "[object Map]", b = "[object Number]", g = "[object Null]", v = "[object Object]", O = "[object Promise]", D = "[object Proxy]", B = "[object RegExp]", F = "[object Set]", L = "[object String]", Y = "[object Symbol]", E = "[object Undefined]", U = "[object WeakMap]", q = "[object ArrayBuffer]", G = "[object DataView]", J = "[object Float32Array]", N = "[object Float64Array]", P = "[object Int8Array]", k = "[object Int16Array]", _ = "[object Int32Array]", A = "[object Uint8Array]", R = "[object Uint8ClampedArray]", I = "[object Uint16Array]", j = "[object Uint32Array]", M = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, te = /^(?:0|[1-9]\d*)$/, V = {};
  V[J] = V[N] = V[P] = V[k] = V[_] = V[A] = V[R] = V[I] = V[j] = !0, V[s] = V[l] = V[q] = V[u] = V[G] = V[d] = V[h] = V[m] = V[x] = V[b] = V[v] = V[B] = V[F] = V[L] = V[U] = !1;
  var ce = typeof ie == "object" && ie && ie.Object === Object && ie, f = typeof self == "object" && self && self.Object === Object && self, c = ce || f || Function("return this")(), T = t && !t.nodeType && t, S = T && !0 && e && !e.nodeType && e, W = S && S.exports === T, H = W && ce.process, X = function() {
    try {
      return H && H.binding && H.binding("util");
    } catch {
    }
  }(), de = X && X.isTypedArray;
  function xe(y, C) {
    for (var $ = -1, z = y == null ? 0 : y.length, oe = 0, Z = []; ++$ < z; ) {
      var he = y[$];
      C(he, $, y) && (Z[oe++] = he);
    }
    return Z;
  }
  function Qe(y, C) {
    for (var $ = -1, z = C.length, oe = y.length; ++$ < z; )
      y[oe + $] = C[$];
    return y;
  }
  function me(y, C) {
    for (var $ = -1, z = y == null ? 0 : y.length; ++$ < z; )
      if (C(y[$], $, y))
        return !0;
    return !1;
  }
  function $e(y, C) {
    for (var $ = -1, z = Array(y); ++$ < y; )
      z[$] = C($);
    return z;
  }
  function Tr(y) {
    return function(C) {
      return y(C);
    };
  }
  function Ct(y, C) {
    return y.has(C);
  }
  function gt(y, C) {
    return y == null ? void 0 : y[C];
  }
  function Rt(y) {
    var C = -1, $ = Array(y.size);
    return y.forEach(function(z, oe) {
      $[++C] = [oe, z];
    }), $;
  }
  function tr(y, C) {
    return function($) {
      return y(C($));
    };
  }
  function Ot(y) {
    var C = -1, $ = Array(y.size);
    return y.forEach(function(z) {
      $[++C] = z;
    }), $;
  }
  var rr = Array.prototype, Kp = Function.prototype, yi = Object.prototype, so = c["__core-js_shared__"], tc = Kp.toString, ct = yi.hasOwnProperty, rc = function() {
    var y = /[^.]+$/.exec(so && so.keys && so.keys.IE_PROTO || "");
    return y ? "Symbol(src)_1." + y : "";
  }(), nc = yi.toString, Jp = RegExp(
    "^" + tc.call(ct).replace(M, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ic = W ? c.Buffer : void 0, vi = c.Symbol, ac = c.Uint8Array, oc = yi.propertyIsEnumerable, Qp = rr.splice, nr = vi ? vi.toStringTag : void 0, sc = Object.getOwnPropertySymbols, Zp = ic ? ic.isBuffer : void 0, em = tr(Object.keys, Object), lo = Cr(c, "DataView"), un = Cr(c, "Map"), co = Cr(c, "Promise"), uo = Cr(c, "Set"), fo = Cr(c, "WeakMap"), fn = Cr(Object, "create"), tm = or(lo), rm = or(un), nm = or(co), im = or(uo), am = or(fo), lc = vi ? vi.prototype : void 0, ho = lc ? lc.valueOf : void 0;
  function ir(y) {
    var C = -1, $ = y == null ? 0 : y.length;
    for (this.clear(); ++C < $; ) {
      var z = y[C];
      this.set(z[0], z[1]);
    }
  }
  function om() {
    this.__data__ = fn ? fn(null) : {}, this.size = 0;
  }
  function sm(y) {
    var C = this.has(y) && delete this.__data__[y];
    return this.size -= C ? 1 : 0, C;
  }
  function lm(y) {
    var C = this.__data__;
    if (fn) {
      var $ = C[y];
      return $ === n ? void 0 : $;
    }
    return ct.call(C, y) ? C[y] : void 0;
  }
  function cm(y) {
    var C = this.__data__;
    return fn ? C[y] !== void 0 : ct.call(C, y);
  }
  function um(y, C) {
    var $ = this.__data__;
    return this.size += this.has(y) ? 0 : 1, $[y] = fn && C === void 0 ? n : C, this;
  }
  ir.prototype.clear = om, ir.prototype.delete = sm, ir.prototype.get = lm, ir.prototype.has = cm, ir.prototype.set = um;
  function yt(y) {
    var C = -1, $ = y == null ? 0 : y.length;
    for (this.clear(); ++C < $; ) {
      var z = y[C];
      this.set(z[0], z[1]);
    }
  }
  function fm() {
    this.__data__ = [], this.size = 0;
  }
  function dm(y) {
    var C = this.__data__, $ = Ei(C, y);
    if ($ < 0)
      return !1;
    var z = C.length - 1;
    return $ == z ? C.pop() : Qp.call(C, $, 1), --this.size, !0;
  }
  function hm(y) {
    var C = this.__data__, $ = Ei(C, y);
    return $ < 0 ? void 0 : C[$][1];
  }
  function pm(y) {
    return Ei(this.__data__, y) > -1;
  }
  function mm(y, C) {
    var $ = this.__data__, z = Ei($, y);
    return z < 0 ? (++this.size, $.push([y, C])) : $[z][1] = C, this;
  }
  yt.prototype.clear = fm, yt.prototype.delete = dm, yt.prototype.get = hm, yt.prototype.has = pm, yt.prototype.set = mm;
  function ar(y) {
    var C = -1, $ = y == null ? 0 : y.length;
    for (this.clear(); ++C < $; ) {
      var z = y[C];
      this.set(z[0], z[1]);
    }
  }
  function xm() {
    this.size = 0, this.__data__ = {
      hash: new ir(),
      map: new (un || yt)(),
      string: new ir()
    };
  }
  function gm(y) {
    var C = _i(this, y).delete(y);
    return this.size -= C ? 1 : 0, C;
  }
  function ym(y) {
    return _i(this, y).get(y);
  }
  function vm(y) {
    return _i(this, y).has(y);
  }
  function wm(y, C) {
    var $ = _i(this, y), z = $.size;
    return $.set(y, C), this.size += $.size == z ? 0 : 1, this;
  }
  ar.prototype.clear = xm, ar.prototype.delete = gm, ar.prototype.get = ym, ar.prototype.has = vm, ar.prototype.set = wm;
  function wi(y) {
    var C = -1, $ = y == null ? 0 : y.length;
    for (this.__data__ = new ar(); ++C < $; )
      this.add(y[C]);
  }
  function Em(y) {
    return this.__data__.set(y, n), this;
  }
  function _m(y) {
    return this.__data__.has(y);
  }
  wi.prototype.add = wi.prototype.push = Em, wi.prototype.has = _m;
  function Pt(y) {
    var C = this.__data__ = new yt(y);
    this.size = C.size;
  }
  function bm() {
    this.__data__ = new yt(), this.size = 0;
  }
  function Sm(y) {
    var C = this.__data__, $ = C.delete(y);
    return this.size = C.size, $;
  }
  function Am(y) {
    return this.__data__.get(y);
  }
  function Tm(y) {
    return this.__data__.has(y);
  }
  function Cm(y, C) {
    var $ = this.__data__;
    if ($ instanceof yt) {
      var z = $.__data__;
      if (!un || z.length < r - 1)
        return z.push([y, C]), this.size = ++$.size, this;
      $ = this.__data__ = new ar(z);
    }
    return $.set(y, C), this.size = $.size, this;
  }
  Pt.prototype.clear = bm, Pt.prototype.delete = Sm, Pt.prototype.get = Am, Pt.prototype.has = Tm, Pt.prototype.set = Cm;
  function Rm(y, C) {
    var $ = bi(y), z = !$ && Hm(y), oe = !$ && !z && po(y), Z = !$ && !z && !oe && gc(y), he = $ || z || oe || Z, Ee = he ? $e(y.length, String) : [], Se = Ee.length;
    for (var ue in y)
      ct.call(y, ue) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ue == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      oe && (ue == "offset" || ue == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      Z && (ue == "buffer" || ue == "byteLength" || ue == "byteOffset") || // Skip index properties.
      km(ue, Se))) && Ee.push(ue);
    return Ee;
  }
  function Ei(y, C) {
    for (var $ = y.length; $--; )
      if (hc(y[$][0], C))
        return $;
    return -1;
  }
  function Om(y, C, $) {
    var z = C(y);
    return bi(y) ? z : Qe(z, $(y));
  }
  function dn(y) {
    return y == null ? y === void 0 ? E : g : nr && nr in Object(y) ? Lm(y) : qm(y);
  }
  function cc(y) {
    return hn(y) && dn(y) == s;
  }
  function uc(y, C, $, z, oe) {
    return y === C ? !0 : y == null || C == null || !hn(y) && !hn(C) ? y !== y && C !== C : Pm(y, C, $, z, uc, oe);
  }
  function Pm(y, C, $, z, oe, Z) {
    var he = bi(y), Ee = bi(C), Se = he ? l : Dt(y), ue = Ee ? l : Dt(C);
    Se = Se == s ? v : Se, ue = ue == s ? v : ue;
    var We = Se == v, Ze = ue == v, Ie = Se == ue;
    if (Ie && po(y)) {
      if (!po(C))
        return !1;
      he = !0, We = !1;
    }
    if (Ie && !We)
      return Z || (Z = new Pt()), he || gc(y) ? fc(y, C, $, z, oe, Z) : Nm(y, C, Se, $, z, oe, Z);
    if (!($ & i)) {
      var Xe = We && ct.call(y, "__wrapped__"), Ke = Ze && ct.call(C, "__wrapped__");
      if (Xe || Ke) {
        var It = Xe ? y.value() : y, vt = Ke ? C.value() : C;
        return Z || (Z = new Pt()), oe(It, vt, $, z, Z);
      }
    }
    return Ie ? (Z || (Z = new Pt()), $m(y, C, $, z, oe, Z)) : !1;
  }
  function Dm(y) {
    if (!xc(y) || Mm(y))
      return !1;
    var C = pc(y) ? Jp : Q;
    return C.test(or(y));
  }
  function Im(y) {
    return hn(y) && mc(y.length) && !!V[dn(y)];
  }
  function Fm(y) {
    if (!jm(y))
      return em(y);
    var C = [];
    for (var $ in Object(y))
      ct.call(y, $) && $ != "constructor" && C.push($);
    return C;
  }
  function fc(y, C, $, z, oe, Z) {
    var he = $ & i, Ee = y.length, Se = C.length;
    if (Ee != Se && !(he && Se > Ee))
      return !1;
    var ue = Z.get(y);
    if (ue && Z.get(C))
      return ue == C;
    var We = -1, Ze = !0, Ie = $ & a ? new wi() : void 0;
    for (Z.set(y, C), Z.set(C, y); ++We < Ee; ) {
      var Xe = y[We], Ke = C[We];
      if (z)
        var It = he ? z(Ke, Xe, We, C, y, Z) : z(Xe, Ke, We, y, C, Z);
      if (It !== void 0) {
        if (It)
          continue;
        Ze = !1;
        break;
      }
      if (Ie) {
        if (!me(C, function(vt, sr) {
          if (!Ct(Ie, sr) && (Xe === vt || oe(Xe, vt, $, z, Z)))
            return Ie.push(sr);
        })) {
          Ze = !1;
          break;
        }
      } else if (!(Xe === Ke || oe(Xe, Ke, $, z, Z))) {
        Ze = !1;
        break;
      }
    }
    return Z.delete(y), Z.delete(C), Ze;
  }
  function Nm(y, C, $, z, oe, Z, he) {
    switch ($) {
      case G:
        if (y.byteLength != C.byteLength || y.byteOffset != C.byteOffset)
          return !1;
        y = y.buffer, C = C.buffer;
      case q:
        return !(y.byteLength != C.byteLength || !Z(new ac(y), new ac(C)));
      case u:
      case d:
      case b:
        return hc(+y, +C);
      case h:
        return y.name == C.name && y.message == C.message;
      case B:
      case L:
        return y == C + "";
      case x:
        var Ee = Rt;
      case F:
        var Se = z & i;
        if (Ee || (Ee = Ot), y.size != C.size && !Se)
          return !1;
        var ue = he.get(y);
        if (ue)
          return ue == C;
        z |= a, he.set(y, C);
        var We = fc(Ee(y), Ee(C), z, oe, Z, he);
        return he.delete(y), We;
      case Y:
        if (ho)
          return ho.call(y) == ho.call(C);
    }
    return !1;
  }
  function $m(y, C, $, z, oe, Z) {
    var he = $ & i, Ee = dc(y), Se = Ee.length, ue = dc(C), We = ue.length;
    if (Se != We && !he)
      return !1;
    for (var Ze = Se; Ze--; ) {
      var Ie = Ee[Ze];
      if (!(he ? Ie in C : ct.call(C, Ie)))
        return !1;
    }
    var Xe = Z.get(y);
    if (Xe && Z.get(C))
      return Xe == C;
    var Ke = !0;
    Z.set(y, C), Z.set(C, y);
    for (var It = he; ++Ze < Se; ) {
      Ie = Ee[Ze];
      var vt = y[Ie], sr = C[Ie];
      if (z)
        var yc = he ? z(sr, vt, Ie, C, y, Z) : z(vt, sr, Ie, y, C, Z);
      if (!(yc === void 0 ? vt === sr || oe(vt, sr, $, z, Z) : yc)) {
        Ke = !1;
        break;
      }
      It || (It = Ie == "constructor");
    }
    if (Ke && !It) {
      var Si = y.constructor, Ai = C.constructor;
      Si != Ai && "constructor" in y && "constructor" in C && !(typeof Si == "function" && Si instanceof Si && typeof Ai == "function" && Ai instanceof Ai) && (Ke = !1);
    }
    return Z.delete(y), Z.delete(C), Ke;
  }
  function dc(y) {
    return Om(y, Wm, Um);
  }
  function _i(y, C) {
    var $ = y.__data__;
    return Bm(C) ? $[typeof C == "string" ? "string" : "hash"] : $.map;
  }
  function Cr(y, C) {
    var $ = gt(y, C);
    return Dm($) ? $ : void 0;
  }
  function Lm(y) {
    var C = ct.call(y, nr), $ = y[nr];
    try {
      y[nr] = void 0;
      var z = !0;
    } catch {
    }
    var oe = nc.call(y);
    return z && (C ? y[nr] = $ : delete y[nr]), oe;
  }
  var Um = sc ? function(y) {
    return y == null ? [] : (y = Object(y), xe(sc(y), function(C) {
      return oc.call(y, C);
    }));
  } : Vm, Dt = dn;
  (lo && Dt(new lo(new ArrayBuffer(1))) != G || un && Dt(new un()) != x || co && Dt(co.resolve()) != O || uo && Dt(new uo()) != F || fo && Dt(new fo()) != U) && (Dt = function(y) {
    var C = dn(y), $ = C == v ? y.constructor : void 0, z = $ ? or($) : "";
    if (z)
      switch (z) {
        case tm:
          return G;
        case rm:
          return x;
        case nm:
          return O;
        case im:
          return F;
        case am:
          return U;
      }
    return C;
  });
  function km(y, C) {
    return C = C ?? o, !!C && (typeof y == "number" || te.test(y)) && y > -1 && y % 1 == 0 && y < C;
  }
  function Bm(y) {
    var C = typeof y;
    return C == "string" || C == "number" || C == "symbol" || C == "boolean" ? y !== "__proto__" : y === null;
  }
  function Mm(y) {
    return !!rc && rc in y;
  }
  function jm(y) {
    var C = y && y.constructor, $ = typeof C == "function" && C.prototype || yi;
    return y === $;
  }
  function qm(y) {
    return nc.call(y);
  }
  function or(y) {
    if (y != null) {
      try {
        return tc.call(y);
      } catch {
      }
      try {
        return y + "";
      } catch {
      }
    }
    return "";
  }
  function hc(y, C) {
    return y === C || y !== y && C !== C;
  }
  var Hm = cc(/* @__PURE__ */ function() {
    return arguments;
  }()) ? cc : function(y) {
    return hn(y) && ct.call(y, "callee") && !oc.call(y, "callee");
  }, bi = Array.isArray;
  function Gm(y) {
    return y != null && mc(y.length) && !pc(y);
  }
  var po = Zp || Ym;
  function zm(y, C) {
    return uc(y, C);
  }
  function pc(y) {
    if (!xc(y))
      return !1;
    var C = dn(y);
    return C == m || C == w || C == p || C == D;
  }
  function mc(y) {
    return typeof y == "number" && y > -1 && y % 1 == 0 && y <= o;
  }
  function xc(y) {
    var C = typeof y;
    return y != null && (C == "object" || C == "function");
  }
  function hn(y) {
    return y != null && typeof y == "object";
  }
  var gc = de ? Tr(de) : Im;
  function Wm(y) {
    return Gm(y) ? Rm(y) : Fm(y);
  }
  function Vm() {
    return [];
  }
  function Ym() {
    return !1;
  }
  e.exports = zm;
})(xa, xa.exports);
var Eb = xa.exports;
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.DownloadedUpdateHelper = void 0;
ei.createTempUpdateFile = Tb;
const _b = Wn, bb = Re, Du = Eb, cr = Jt, Tn = ne;
class Sb {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Tn.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Du(this.versionInfo, r) && Du(this.fileInfo.info, n.info) && await (0, cr.pathExists)(t) ? t : null;
    const a = await this.getValidCachedUpdateFile(n, i);
    return a === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = a, a);
  }
  async setDownloadedFile(t, r, n, i, a, o) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: a,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, o && await (0, cr.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, cr.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, cr.pathExists)(n))
      return null;
    let a;
    try {
      a = await (0, cr.readJson)(n);
    } catch (p) {
      let u = "No cached update info available";
      return p.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), u += ` (error on read: ${p.message})`), r.info(u), null;
    }
    if (!((a == null ? void 0 : a.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== a.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${a.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = Tn.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, cr.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const l = await Ab(s);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, s);
  }
  getUpdateInfoFile() {
    return Tn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
ei.DownloadedUpdateHelper = Sb;
function Ab(e, t = "sha512", r = "base64", n) {
  return new Promise((i, a) => {
    const o = (0, _b.createHash)(t);
    o.on("error", a).setEncoding(r), (0, bb.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", a).on("end", () => {
      o.end(), i(o.read());
    }).pipe(o, { end: !1 });
  });
}
async function Tb(e, t, r) {
  let n = 0, i = Tn.join(t, e);
  for (let a = 0; a < 3; a++)
    try {
      return await (0, cr.unlink)(i), i;
    } catch (o) {
      if (o.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${o}`), i = Tn.join(t, `${n++}-${e}`);
    }
  return i;
}
var Ua = {}, Ol = {};
Object.defineProperty(Ol, "__esModule", { value: !0 });
Ol.getAppCacheDir = Rb;
const Fo = ne, Cb = _a;
function Rb() {
  const e = (0, Cb.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Fo.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Fo.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Fo.join(e, ".cache"), t;
}
Object.defineProperty(Ua, "__esModule", { value: !0 });
Ua.ElectronAppAdapter = void 0;
const Iu = ne, Ob = Ol;
class Pb {
  constructor(t = yr.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Iu.join(process.resourcesPath, "app-update.yml") : Iu.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, Ob.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
Ua.ElectronAppAdapter = Pb;
var Rh = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = we;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return yr.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(a) {
      super(), this.proxyLoginCallback = a, this.cachedSession = null;
    }
    async download(a, o, s) {
      return await s.cancellationToken.createPromise((l, p, u) => {
        const d = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(a, d), (0, t.configureRequestOptions)(d), this.doDownload(d, {
          destination: o,
          options: s,
          onCancel: u,
          callback: (h) => {
            h == null ? l(o) : p(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(a, o) {
      a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = yr.net.request({
        ...a,
        session: this.cachedSession
      });
      return s.on("response", o), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(a, o, s, l, p) {
      a.on("redirect", (u, d, h) => {
        a.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : p(t.HttpExecutor.prepareRedirectUrlOptions(h, o));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(Rh);
var ti = {}, lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.newBaseUrl = Db;
lt.newUrlFromBase = Ib;
lt.getChannelFilename = Fb;
const Oh = Kt;
function Db(e) {
  const t = new Oh.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Ib(e, t, r = !1) {
  const n = new Oh.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function Fb(e) {
  return `${e}.yml`;
}
var ve = {}, Nb = "[object Symbol]", Ph = /[\\^$.*+?()[\]{}|]/g, $b = RegExp(Ph.source), Lb = typeof ie == "object" && ie && ie.Object === Object && ie, Ub = typeof self == "object" && self && self.Object === Object && self, kb = Lb || Ub || Function("return this")(), Bb = Object.prototype, Mb = Bb.toString, Fu = kb.Symbol, Nu = Fu ? Fu.prototype : void 0, $u = Nu ? Nu.toString : void 0;
function jb(e) {
  if (typeof e == "string")
    return e;
  if (Hb(e))
    return $u ? $u.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function qb(e) {
  return !!e && typeof e == "object";
}
function Hb(e) {
  return typeof e == "symbol" || qb(e) && Mb.call(e) == Nb;
}
function Gb(e) {
  return e == null ? "" : jb(e);
}
function zb(e) {
  return e = Gb(e), e && $b.test(e) ? e.replace(Ph, "\\$&") : e;
}
var Dh = zb;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.Provider = void 0;
ve.findFile = Kb;
ve.parseUpdateInfo = Jb;
ve.getFileList = Ih;
ve.resolveFiles = Qb;
const Vt = we, Wb = De, Vb = Kt, ga = lt, Yb = Dh;
class Xb {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, r, n, i = null) {
    const a = (0, ga.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, ga.newUrlFromBase)(`${t.pathname.replace(new RegExp(Yb(n), "g"), r)}.blockmap`, i ? new Vb.URL(i) : t), a];
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, Vt.configureRequestUrl)(t, n), n;
  }
}
ve.Provider = Xb;
function Kb(e, t, r) {
  var n;
  if (e.length === 0)
    throw (0, Vt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((o) => o.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), a = (n = i.find((o) => [o.url.pathname, o.info.url].some((s) => s.includes(process.arch)))) !== null && n !== void 0 ? n : i.shift();
  return a || (r == null ? e[0] : e.find((o) => !r.some((s) => o.url.pathname.toLowerCase().endsWith(`.${s.toLowerCase()}`))));
}
function Jb(e, t, r) {
  if (e == null)
    throw (0, Vt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, Wb.load)(e);
  } catch (i) {
    throw (0, Vt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function Ih(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, Vt.newError)(`No files provided: ${(0, Vt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function Qb(e, t, r = (n) => n) {
  const i = Ih(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, Vt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Vt.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, ga.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), a = e.packages, o = a == null ? null : a[process.arch] || a.ia32;
  return o != null && (i[0].packageInfo = {
    ...o,
    path: (0, ga.newUrlFromBase)(r(o.path), t).href
  }), i;
}
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.GenericProvider = void 0;
const Lu = we, No = lt, $o = ve;
class Zb extends $o.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, No.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, No.getChannelFilename)(this.channel), r = (0, No.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, $o.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Lu.HttpError && i.statusCode === 404)
          throw (0, Lu.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((a, o) => {
            try {
              setTimeout(a, 1e3 * n);
            } catch (s) {
              o(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, $o.resolveFiles)(t, this.baseUrl);
  }
}
ti.GenericProvider = Zb;
var ka = {}, Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
Ba.BitbucketProvider = void 0;
const Uu = we, Lo = lt, Uo = ve;
class eS extends Uo.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: a } = t;
    this.baseUrl = (0, Lo.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Uu.CancellationToken(), r = (0, Lo.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Lo.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Uo.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Uu.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Uo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
Ba.BitbucketProvider = eS;
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.GitHubProvider = Yt.BaseGitHubProvider = void 0;
Yt.computeReleaseNotes = Nh;
const wt = we, dr = Ch, tS = Kt, jr = lt, Hs = ve, ko = /\/tag\/([^/]+)$/;
class Fh extends Hs.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, jr.newBaseUrl)((0, wt.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, jr.newBaseUrl)((0, wt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Yt.BaseGitHubProvider = Fh;
class rS extends Fh {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, a;
    const o = new wt.CancellationToken(), s = await this.httpRequest((0, jr.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, o), l = (0, wt.parseXml)(s);
    let p = l.element("entry", !1, "No published versions on GitHub"), u = null;
    try {
      if (this.updater.allowPrerelease) {
        const b = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = dr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (b === null)
          u = ko.exec(p.element("link").attribute("href"))[1];
        else
          for (const g of l.getElements("entry")) {
            const v = ko.exec(g.element("link").attribute("href"));
            if (v === null)
              continue;
            const O = v[1], D = ((n = dr.prerelease(O)) === null || n === void 0 ? void 0 : n[0]) || null, B = !b || ["alpha", "beta"].includes(b), F = D !== null && !["alpha", "beta"].includes(String(D));
            if (B && !F && !(b === "beta" && D === "alpha")) {
              u = O;
              break;
            }
            if (D && D === b) {
              u = O;
              break;
            }
          }
      } else {
        u = await this.getLatestTagName(o);
        for (const b of l.getElements("entry"))
          if (ko.exec(b.element("link").attribute("href"))[1] === u) {
            p = b;
            break;
          }
      }
    } catch (b) {
      throw (0, wt.newError)(`Cannot parse releases feed: ${b.stack || b.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (u == null)
      throw (0, wt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let d, h = "", m = "";
    const w = async (b) => {
      h = (0, jr.getChannelFilename)(b), m = (0, jr.newUrlFromBase)(this.getBaseDownloadPath(String(u), h), this.baseUrl);
      const g = this.createRequestOptions(m);
      try {
        return await this.executor.request(g, o);
      } catch (v) {
        throw v instanceof wt.HttpError && v.statusCode === 404 ? (0, wt.newError)(`Cannot find ${h} in the latest release artifacts (${m}): ${v.stack || v.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : v;
      }
    };
    try {
      let b = this.channel;
      this.updater.allowPrerelease && (!((i = dr.prerelease(u)) === null || i === void 0) && i[0]) && (b = this.getCustomChannelName(String((a = dr.prerelease(u)) === null || a === void 0 ? void 0 : a[0]))), d = await w(b);
    } catch (b) {
      if (this.updater.allowPrerelease)
        d = await w(this.getDefaultChannelName());
      else
        throw b;
    }
    const x = (0, Hs.parseUpdateInfo)(d, h, m);
    return x.releaseName == null && (x.releaseName = p.elementValueOrEmpty("title")), x.releaseNotes == null && (x.releaseNotes = Nh(this.updater.currentVersion, this.updater.fullChangelog, l, p)), {
      tag: u,
      ...x
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, jr.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new tS.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, wt.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Hs.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Yt.GitHubProvider = rS;
function ku(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function Nh(e, t, r, n) {
  if (!t)
    return ku(n);
  const i = [];
  for (const a of r.getElements("entry")) {
    const o = /\/tag\/v?([^/]+)$/.exec(a.element("link").attribute("href"))[1];
    dr.valid(o) && dr.lt(e, o) && i.push({
      version: o,
      note: ku(a)
    });
  }
  return i.sort((a, o) => dr.rcompare(a.version, o.version));
}
var Ma = {};
Object.defineProperty(Ma, "__esModule", { value: !0 });
Ma.GitLabProvider = void 0;
const Le = we, Bo = Kt, nS = Dh, ki = lt, Mo = ve;
class iS extends Mo.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(t) {
    return t.replace(/ |_/g, "-");
  }
  constructor(t, r, n) {
    super({
      ...n,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = r, this.cachedLatestVersion = null;
    const a = t.host || "gitlab.com";
    this.baseApiUrl = (0, ki.newBaseUrl)(`https://${a}/api/v4`);
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new Le.CancellationToken(), r = (0, ki.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let n;
    try {
      const h = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, m = await this.httpRequest(r, h, t);
      if (!m)
        throw (0, Le.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      n = JSON.parse(m);
    } catch (h) {
      throw (0, Le.newError)(`Unable to find latest release on GitLab (${r}): ${h.stack || h.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = n.tag_name;
    let a = null, o = "", s = null;
    const l = async (h) => {
      o = (0, ki.getChannelFilename)(h);
      const m = n.assets.links.find((x) => x.name === o);
      if (!m)
        throw (0, Le.newError)(`Cannot find ${o} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      s = new Bo.URL(m.direct_asset_url);
      const w = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const x = await this.httpRequest(s, w, t);
        if (!x)
          throw (0, Le.newError)(`Empty response from ${s}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return x;
      } catch (x) {
        throw x instanceof Le.HttpError && x.statusCode === 404 ? (0, Le.newError)(`Cannot find ${o} in the latest release artifacts (${s}): ${x.stack || x.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : x;
      }
    };
    try {
      a = await l(this.channel);
    } catch (h) {
      if (this.channel !== this.getDefaultChannelName())
        a = await l(this.getDefaultChannelName());
      else
        throw h;
    }
    if (!a)
      throw (0, Le.newError)(`Unable to parse channel data from ${o}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const p = (0, Mo.parseUpdateInfo)(a, o, s);
    p.releaseName == null && (p.releaseName = n.name), p.releaseNotes == null && (p.releaseNotes = n.description || null);
    const u = /* @__PURE__ */ new Map();
    for (const h of n.assets.links)
      u.set(this.normalizeFilename(h.name), h.direct_asset_url);
    const d = {
      tag: i,
      assets: u,
      ...p
    };
    return this.cachedLatestVersion = d, d;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of t.links)
      r.set(this.normalizeFilename(n.name), n.direct_asset_url);
    return r;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, r) {
    const n = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
    for (const i of n) {
      const a = t.get(i);
      if (a)
        return new Bo.URL(a);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const r = new Le.CancellationToken(), n = [`v${t}`, t];
    for (const i of n) {
      const a = (0, ki.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const o = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, s = await this.httpRequest(a, o, r);
        if (s)
          return JSON.parse(s);
      } catch (o) {
        if (o instanceof Le.HttpError && o.statusCode === 404)
          continue;
        throw (0, Le.newError)(`Unable to find release ${i} on GitLab (${a}): ${o.stack || o.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Le.newError)(`Unable to find release with version ${t} (tried: ${n.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const r = {};
    return t != null && (t.startsWith("Bearer") ? r.authorization = t : r["PRIVATE-TOKEN"] = t), r;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const r = await this.fetchReleaseInfoByVersion(t);
    return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, r, n) {
    let i = null, a = null;
    const o = await this.getVersionInfoForBlockMap(r);
    o && (i = this.findBlockMapInAssets(o, n));
    const s = await this.getVersionInfoForBlockMap(t);
    if (s) {
      const l = n.replace(new RegExp(nS(r), "g"), t);
      a = this.findBlockMapInAssets(s, l);
    }
    return [a, i];
  }
  async getBlockMapFiles(t, r, n, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const a = t.pathname.split("/").pop() || "", [o, s] = await this.findBlockMapUrlsFromAssets(r, n, a);
      if (!s)
        throw (0, Le.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!o)
        throw (0, Le.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [o, s];
    } else
      return super.getBlockMapFiles(t, r, n, i);
  }
  resolveFiles(t) {
    return (0, Mo.getFileList)(t).map((r) => {
      const i = [
        r.url,
        // Original filename
        this.normalizeFilename(r.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((o) => t.assets.has(o)), a = i ? t.assets.get(i) : void 0;
      if (!a)
        throw (0, Le.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Bo.URL(a),
        info: r
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
Ma.GitLabProvider = iS;
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
ja.KeygenProvider = void 0;
const Bu = we, jo = lt, qo = ve;
class aS extends qo.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, jo.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Bu.CancellationToken(), r = (0, jo.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, jo.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, qo.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Bu.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, qo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
ja.KeygenProvider = aS;
var qa = {};
Object.defineProperty(qa, "__esModule", { value: !0 });
qa.PrivateGitHubProvider = void 0;
const Pr = we, oS = De, sS = ne, Mu = Kt, ju = lt, lS = Yt, cS = ve;
class uS extends lS.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Pr.CancellationToken(), r = (0, ju.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Pr.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const a = new Mu.URL(i.url);
    let o;
    try {
      o = (0, oS.load)(await this.httpRequest(a, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Pr.HttpError && s.statusCode === 404 ? (0, Pr.newError)(`Cannot find ${r} in the latest release artifacts (${a}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return o.assets = n.assets, o;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, ju.newUrlFromBase)(n, this.baseUrl);
    try {
      const a = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? a.find((o) => o.prerelease) || a[0] : a;
    } catch (a) {
      throw (0, Pr.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, cS.getFileList)(t).map((r) => {
      const n = sS.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((a) => a != null && a.name === n);
      if (i == null)
        throw (0, Pr.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Mu.URL(i.url),
        info: r
      };
    });
  }
}
qa.PrivateGitHubProvider = uS;
Object.defineProperty(ka, "__esModule", { value: !0 });
ka.isUrlProbablySupportMultiRangeRequests = $h;
ka.createClient = xS;
const Bi = we, fS = Ba, qu = ti, dS = Yt, hS = Ma, pS = ja, mS = qa;
function $h(e) {
  return !e.includes("s3.amazonaws.com");
}
function xS(e, t, r) {
  if (typeof e == "string")
    throw (0, Bi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, a = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return a == null ? new dS.GitHubProvider(i, t, r) : new mS.PrivateGitHubProvider(i, t, a, r);
    }
    case "bitbucket":
      return new fS.BitbucketProvider(e, t, r);
    case "gitlab":
      return new hS.GitLabProvider(e, t, r);
    case "keygen":
      return new pS.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new qu.GenericProvider({
        provider: "generic",
        url: (0, Bi.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new qu.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && $h(i.url)
      });
    }
    case "custom": {
      const i = e, a = i.updateProvider;
      if (!a)
        throw (0, Bi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new a(i, t, r);
    }
    default:
      throw (0, Bi.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Ha = {}, ri = {}, sn = {}, br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.OperationKind = void 0;
br.computeOperations = gS;
var hr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(hr || (br.OperationKind = hr = {}));
function gS(e, t, r) {
  const n = Gu(e.files), i = Gu(t.files);
  let a = null;
  const o = t.files[0], s = [], l = o.name, p = n.get(l);
  if (p == null)
    throw new Error(`no file ${l} in old blockmap`);
  const u = i.get(l);
  let d = 0;
  const { checksumToOffset: h, checksumToOldSize: m } = vS(n.get(l), p.offset, r);
  let w = o.offset;
  for (let x = 0; x < u.checksums.length; w += u.sizes[x], x++) {
    const b = u.sizes[x], g = u.checksums[x];
    let v = h.get(g);
    v != null && m.get(g) !== b && (r.warn(`Checksum ("${g}") matches, but size differs (old: ${m.get(g)}, new: ${b})`), v = void 0), v === void 0 ? (d++, a != null && a.kind === hr.DOWNLOAD && a.end === w ? a.end += b : (a = {
      kind: hr.DOWNLOAD,
      start: w,
      end: w + b
      // oldBlocks: null,
    }, Hu(a, s, g, x))) : a != null && a.kind === hr.COPY && a.end === v ? a.end += b : (a = {
      kind: hr.COPY,
      start: v,
      end: v + b
      // oldBlocks: [checksum]
    }, Hu(a, s, g, x));
  }
  return d > 0 && r.info(`File${o.name === "file" ? "" : " " + o.name} has ${d} changed blocks`), s;
}
const yS = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Hu(e, t, r, n) {
  if (yS && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const a = [i.start, i.end, e.start, e.end].reduce((o, s) => o < s ? o : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${hr[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - a} until ${i.end - a} and ${e.start - a} until ${e.end - a}`);
    }
  }
  t.push(e);
}
function vS(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let a = t;
  for (let o = 0; o < e.checksums.length; o++) {
    const s = e.checksums[o], l = e.sizes[o], p = i.get(s);
    if (p === void 0)
      n.set(s, a), i.set(s, l);
    else if (r.debug != null) {
      const u = p === l ? "(same size)" : `(size: ${p}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${u}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    a += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function Gu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.DataSplitter = void 0;
sn.copyData = Lh;
const Mi = we, wS = Re, ES = Ye, _S = br, zu = Buffer.from(`\r
\r
`);
var Ut;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Ut || (Ut = {}));
function Lh(e, t, r, n, i) {
  const a = (0, wS.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  a.on("error", n), a.once("end", i), a.pipe(t, {
    end: !1
  });
}
class bS extends ES.Writable {
  constructor(t, r, n, i, a, o, s, l) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = a, this.finishHandler = o, this.grandTotalBytes = s, this.onProgress = l, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = Ut.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(() => {
      if (this.onProgress) {
        const i = Date.now();
        (i >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (i - this.start) / 1e3 && (this.nextUpdate = i + 1e3, this.onProgress({
          total: this.grandTotalBytes,
          delta: this.delta,
          transferred: this.transferred,
          percent: this.transferred / this.grandTotalBytes * 100,
          bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
        }), this.delta = 0);
      }
      n();
    }).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Mi.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === Ut.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = Ut.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Ut.BODY)
          this.readState = Ut.INIT;
        else {
          this.partIndex++;
          let o = this.partIndexToTaskIndex.get(this.partIndex);
          if (o == null)
            if (this.isFinished)
              o = this.options.end;
            else
              throw (0, Mi.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < o)
            await this.copyExistingData(s, o);
          else if (s > o)
            throw (0, Mi.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = Ut.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, a = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, a), this.remainingPartDataCount = n - (a - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const a = () => {
        if (t === r) {
          n();
          return;
        }
        const o = this.options.tasks[t];
        if (o.kind !== _S.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Lh(o, this.out, this.options.oldFileFd, i, () => {
          t++, a();
        });
      };
      a();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(zu, r);
    if (n !== -1)
      return n + zu.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Mi.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r, this.transferred += n - r, this.delta += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((a, o) => {
      i.on("error", o), i.once("drain", () => {
        i.removeListener("error", o), a();
      });
    });
  }
}
sn.DataSplitter = bS;
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
Ga.executeTasksUsingMultipleRangeRequests = SS;
Ga.checkIsRangesSupported = zs;
const Gs = we, Wu = sn, Vu = br;
function SS(e, t, r, n, i) {
  const a = (o) => {
    if (o >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = o + 1e3;
    AS(e, {
      tasks: t,
      start: o,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => a(s), i);
  };
  return a;
}
function AS(e, t, r, n, i) {
  let a = "bytes=", o = 0, s = 0;
  const l = /* @__PURE__ */ new Map(), p = [];
  for (let h = t.start; h < t.end; h++) {
    const m = t.tasks[h];
    m.kind === Vu.OperationKind.DOWNLOAD && (a += `${m.start}-${m.end - 1}, `, l.set(o, h), o++, p.push(m.end - m.start), s += m.end - m.start);
  }
  if (o <= 1) {
    const h = (m) => {
      if (m >= t.end) {
        n();
        return;
      }
      const w = t.tasks[m++];
      if (w.kind === Vu.OperationKind.COPY)
        (0, Wu.copyData)(w, r, t.oldFileFd, i, () => h(m));
      else {
        const x = e.createRequestOptions();
        x.headers.Range = `bytes=${w.start}-${w.end - 1}`;
        const b = e.httpExecutor.createRequest(x, (g) => {
          g.on("error", i), zs(g, i) && (g.pipe(r, {
            end: !1
          }), g.once("end", () => h(m)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(b, i), b.end();
      }
    };
    h(t.start);
    return;
  }
  const u = e.createRequestOptions();
  u.headers.Range = a.substring(0, a.length - 2);
  const d = e.httpExecutor.createRequest(u, (h) => {
    if (!zs(h, i))
      return;
    const m = (0, Gs.safeGetHeader)(h, "content-type"), w = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(m);
    if (w == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${m}"`));
      return;
    }
    const x = new Wu.DataSplitter(r, t, l, w[1] || w[2], p, n, s, e.options.onProgress);
    x.on("error", i), h.pipe(x), h.on("end", () => {
      setTimeout(() => {
        d.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(d, i), d.end();
}
function zs(e, t) {
  if (e.statusCode >= 400)
    return t((0, Gs.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Gs.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
za.ProgressDifferentialDownloadCallbackTransform = void 0;
const TS = Ye;
var qr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(qr || (qr = {}));
class CS extends TS.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = qr.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == qr.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = qr.COPY;
  }
  beginRangeDownload() {
    this.operationType = qr.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
za.ProgressDifferentialDownloadCallbackTransform = CS;
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.DifferentialDownloader = void 0;
const xn = we, Ho = Jt, RS = Re, OS = sn, PS = Kt, ji = br, Yu = Ga, DS = za;
class IS {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, xn.configureRequestUrl)(this.options.newUrl, t), (0, xn.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, ji.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let a = 0, o = 0;
    for (const l of i) {
      const p = l.end - l.start;
      l.kind === ji.OperationKind.DOWNLOAD ? a += p : o += p;
    }
    const s = this.blockAwareFileInfo.size;
    if (a + o + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${a}, copySize: ${o}, newSize: ${s}`);
    return n.info(`Full: ${Xu(s)}, To download: ${Xu(a)} (${Math.round(a / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, Ho.close)(i.descriptor).catch((a) => {
      this.logger.error(`cannot close file "${i.path}": ${a}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((a) => {
      try {
        this.logger.error(`cannot close files: ${a}`);
      } catch (o) {
        try {
          console.error(o);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, Ho.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, Ho.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const a = (0, RS.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((o, s) => {
      const l = [];
      let p;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const g = [];
        let v = 0;
        for (const D of t)
          D.kind === ji.OperationKind.DOWNLOAD && (g.push(D.end - D.start), v += D.end - D.start);
        const O = {
          expectedByteCounts: g,
          grandTotal: v
        };
        p = new DS.ProgressDifferentialDownloadCallbackTransform(O, this.options.cancellationToken, this.options.onProgress), l.push(p);
      }
      const u = new xn.DigestTransform(this.blockAwareFileInfo.sha512);
      u.isValidateOnEnd = !1, l.push(u), a.on("finish", () => {
        a.close(() => {
          r.splice(1, 1);
          try {
            u.validate();
          } catch (g) {
            s(g);
            return;
          }
          o(void 0);
        });
      }), l.push(a);
      let d = null;
      for (const g of l)
        g.on("error", s), d == null ? d = g : d = d.pipe(g);
      const h = l[0];
      let m;
      if (this.options.isUseMultipleRangeRequest) {
        m = (0, Yu.executeTasksUsingMultipleRangeRequests)(this, t, h, n, s), m(0);
        return;
      }
      let w = 0, x = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const b = this.createRequestOptions();
      b.redirect = "manual", m = (g) => {
        var v, O;
        if (g >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const D = t[g++];
        if (D.kind === ji.OperationKind.COPY) {
          p && p.beginFileCopy(), (0, OS.copyData)(D, h, n, s, () => m(g));
          return;
        }
        const B = `bytes=${D.start}-${D.end - 1}`;
        b.headers.range = B, (O = (v = this.logger) === null || v === void 0 ? void 0 : v.debug) === null || O === void 0 || O.call(v, `download range: ${B}`), p && p.beginRangeDownload();
        const F = this.httpExecutor.createRequest(b, (L) => {
          L.on("error", s), L.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), L.statusCode >= 400 && s((0, xn.createHttpError)(L)), L.pipe(h, {
            end: !1
          }), L.once("end", () => {
            p && p.endRangeDownload(), ++w === 100 ? (w = 0, setTimeout(() => m(g), 1e3)) : m(g);
          });
        });
        F.on("redirect", (L, Y, E) => {
          this.logger.info(`Redirect to ${FS(E)}`), x = E, (0, xn.configureRequestUrl)(new PS.URL(x), b), F.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(F, s), F.end();
      }, m(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let a = 0;
    if (await this.request(i, (o) => {
      o.copy(n, a), a += o.length;
    }), a !== n.length)
      throw new Error(`Received data length ${a} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const a = this.httpExecutor.createRequest(t, (o) => {
        (0, Yu.checkIsRangesSupported)(o, i) && (o.on("error", i), o.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), o.on("data", r), o.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(a, i), a.end();
    });
  }
}
ri.DifferentialDownloader = IS;
function Xu(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function FS(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Ha, "__esModule", { value: !0 });
Ha.GenericDifferentialDownloader = void 0;
const NS = ri;
class $S extends NS.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
Ha.GenericDifferentialDownloader = $S;
var Qt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = we;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(a) {
      this.emitter = a;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(a) {
      n(this.emitter, "login", a);
    }
    progress(a) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, a);
    }
    updateDownloaded(a) {
      n(this.emitter, e.UPDATE_DOWNLOADED, a);
    }
    updateCancelled(a) {
      n(this.emitter, "update-cancelled", a);
    }
  }
  e.UpdaterSignal = r;
  function n(i, a, o) {
    i.on(a, o);
  }
})(Qt);
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.NoOpLogger = Gt.AppUpdater = void 0;
const Ue = we, LS = Wn, US = _a, kS = zn, et = Jt, BS = De, Go = Da, tt = ne, ur = Ch, Ku = ei, MS = Ua, Ju = Rh, jS = ti, zo = ka, Wo = ba, qS = Ha, Dr = Qt;
class Pl extends kS.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, Ue.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, Ue.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, Ju.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Uh();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Go.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(t) {
    t && (this._isUserWithinRollout = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Dr.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (a) => this.checkIfUpdateSupported(a), this._isUserWithinRollout = (a) => this.isStagingMatch(a), this.clientPromise = null, this.stagingUserIdPromise = new Go.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Go.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (a) => {
      this._logger.error(`Error: ${a.stack || a.message}`);
    }), r == null ? (this.app = new MS.ElectronAppAdapter(), this.httpExecutor = new Ju.ElectronHttpExecutor((a, o) => this.emit("login", a, o))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, ur.parse)(n);
    if (i == null)
      throw (0, Ue.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = HS(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new jS.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, zo.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, zo.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = Pl.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new yr.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, o = Ue.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${o}, user id: ${i}`), o < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, ur.parse)(t.version);
    if (r == null)
      throw (0, Ue.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, ur.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const a = (0, ur.gt)(r, n), o = (0, ur.lt)(r, n);
    return a ? !0 : this.allowDowngrade && o;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, US.release)();
    if (r)
      try {
        if ((0, ur.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, zo.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new Ue.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, Ue.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new Ue.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, Ue.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof Ue.CancellationError))
        try {
          this.dispatchError(i);
        } catch (a) {
          this._logger.warn(`Cannot dispatch error event: ${a.stack || a}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Dr.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, BS.load)(await (0, et.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = tt.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, et.readFile)(t, "utf-8");
      if (Ue.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = Ue.UUID.v5((0, LS.randomBytes)(4096), Ue.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, et.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = tt.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new Ku.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(Dr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (v) => this.emit(Dr.DOWNLOAD_PROGRESS, v));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, a = i.version, o = r.packageInfo;
    function s() {
      const v = decodeURIComponent(t.fileInfo.url.pathname);
      return v.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? tt.basename(v) : t.fileInfo.info.url;
    }
    const l = await this.getOrCreateDownloadHelper(), p = l.cacheDirForPendingUpdate;
    await (0, et.mkdir)(p, { recursive: !0 });
    const u = s();
    let d = tt.join(p, u);
    const h = o == null ? null : tt.join(p, `package-${a}${tt.extname(o.path) || ".7z"}`), m = async (v) => {
      await l.setDownloadedFile(d, h, i, r, u, v), await t.done({
        ...i,
        downloadedFile: d
      });
      const O = tt.join(p, "current.blockmap");
      return await (0, et.pathExists)(O) && await (0, et.copyFile)(O, tt.join(l.cacheDir, "current.blockmap")), h == null ? [d] : [d, h];
    }, w = this._logger, x = await l.validateDownloadedPath(d, i, r, w);
    if (x != null)
      return d = x, await m(!1);
    const b = async () => (await l.clear().catch(() => {
    }), await (0, et.unlink)(d).catch(() => {
    })), g = await (0, Ku.createTempUpdateFile)(`temp-${u}`, p, w);
    try {
      await t.task(g, n, h, b), await (0, Ue.retry)(() => (0, et.rename)(g, d), {
        retries: 60,
        interval: 500,
        shouldRetry: (v) => v instanceof Error && /^EBUSY:/.test(v.message) ? !0 : (w.warn(`Cannot rename temp file to final file: ${v.message || v.stack}`), !1)
      });
    } catch (v) {
      throw await b(), v instanceof Ue.CancellationError && (w.info("cancelled"), this.emit("update-cancelled", i)), v;
    }
    return w.info(`New version ${a} has been downloaded to ${d}`), await m(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, a) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const o = r.updateInfoAndProvider.provider, s = await o.getBlockMapFiles(t.url, this.app.version, r.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
      const l = async (w) => {
        const x = await this.httpExecutor.downloadToBuffer(w, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (x == null || x.length === 0)
          throw new Error(`Blockmap "${w.href}" is empty`);
        try {
          return JSON.parse((0, Wo.gunzipSync)(x).toString());
        } catch (b) {
          throw new Error(`Cannot parse blockmap "${w.href}", error: ${b}`);
        }
      }, p = {
        newUrl: t.url,
        oldFile: tt.join(this.downloadedUpdateHelper.cacheDir, a),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: o.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(Dr.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (w) => this.emit(Dr.DOWNLOAD_PROGRESS, w));
      const u = async (w, x) => {
        const b = tt.join(x, "current.blockmap");
        await (0, et.outputFile)(b, (0, Wo.gzipSync)(JSON.stringify(w)));
      }, d = async (w) => {
        const x = tt.join(w, "current.blockmap");
        try {
          if (await (0, et.pathExists)(x))
            return JSON.parse((0, Wo.gunzipSync)(await (0, et.readFile)(x)).toString());
        } catch (b) {
          this._logger.warn(`Cannot parse blockmap "${x}", error: ${b}`);
        }
        return null;
      }, h = await l(s[1]);
      await u(h, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let m = await d(this.downloadedUpdateHelper.cacheDir);
      return m == null && (m = await l(s[0])), await new qS.GenericDifferentialDownloader(t.info, this.httpExecutor, p).download(m, h), !1;
    } catch (o) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), this._testOnlyOptions != null)
        throw o;
      return !0;
    }
  }
}
Gt.AppUpdater = Pl;
function HS(e) {
  const t = (0, ur.prerelease)(e);
  return t != null && t.length > 0;
}
class Uh {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
Gt.NoOpLogger = Uh;
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.BaseUpdater = void 0;
const Qu = Ea, GS = Gt;
class zS extends GS.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      yr.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, a = n == null ? null : n.downloadedFileInfo;
    if (i == null || a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: a.isAdminRightsRequired
      });
    } catch (o) {
      return this.dispatchError(o), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, Qu.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: o, stdout: s, stderr: l } = i;
    if (a != null)
      throw this._logger.error(l), a;
    if (o != null && o !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${o}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((a, o) => {
      try {
        const s = { stdio: i, env: n, detached: !0 }, l = (0, Qu.spawn)(t, r, s);
        l.on("error", (p) => {
          o(p);
        }), l.unref(), l.pid !== void 0 && a(!0);
      } catch (s) {
        o(s);
      }
    });
  }
}
_r.BaseUpdater = zS;
var Ln = {}, ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Ir = Jt, WS = ri, VS = ba;
class YS extends WS.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = kh(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await XS(this.options.oldFile), i);
  }
}
ni.FileWithEmbeddedBlockMapDifferentialDownloader = YS;
function kh(e) {
  return JSON.parse((0, VS.inflateRawSync)(e).toString());
}
async function XS(e) {
  const t = await (0, Ir.open)(e, "r");
  try {
    const r = (await (0, Ir.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Ir.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Ir.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Ir.close)(t), kh(i);
  } catch (r) {
    throw await (0, Ir.close)(t), r;
  }
}
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.AppImageUpdater = void 0;
const Zu = we, ef = Ea, KS = Jt, JS = Re, gn = ne, QS = _r, ZS = ni, eA = ve, tf = Qt;
class tA extends QS.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, eA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        const o = process.env.APPIMAGE;
        if (o == null)
          throw (0, Zu.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, o, i, r, t)) && await this.httpExecutor.download(n.url, i, a), await (0, KS.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, a) {
    try {
      const o = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: a.requestHeaders,
        cancellationToken: a.cancellationToken
      };
      return this.listenerCount(tf.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(tf.DOWNLOAD_PROGRESS, s)), await new ZS.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, o).download(), !1;
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, Zu.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, JS.unlinkSync)(r);
    let n;
    const i = gn.basename(r), a = this.installerPath;
    if (a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    gn.basename(a) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = gn.join(gn.dirname(r), gn.basename(a)), (0, ef.execFileSync)("mv", ["-f", a, n]), n !== r && this.emit("appimage-filename-updated", n);
    const o = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], o) : (o.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, ef.execFileSync)(n, [], { env: o })), !0;
  }
}
Ln.AppImageUpdater = tA;
var Un = {}, ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.LinuxUpdater = void 0;
const rA = _r;
class nA extends rA.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var t;
    return ((t = process.getuid) === null || t === void 0 ? void 0 : t.call(process)) === 0;
  }
  /**
   * Sanitizies the installer path for using with command line tools.
   */
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: r } = this.app, n = `"${r} would like to update"`, i = this.sudoWithArgs(n);
    this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
    let a = '"';
    return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (a = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${a}/bin/bash`, "-c", `'${t.join(" ")}'${a}`]);
  }
  sudoWithArgs(t) {
    const r = this.determineSudoCommand(), n = [r];
    return /kdesudo/i.test(r) ? (n.push("--comment", t), n.push("-c")) : /gksudo/i.test(r) ? n.push("--message", t) : /pkexec/i.test(r) && n.push("--disable-internal-agent"), n;
  }
  hasCommand(t) {
    try {
      return this.spawnSyncLog("command", ["-v", t]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const t = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const r of t)
      if (this.hasCommand(r))
        return r;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(t) {
    var r;
    const n = (r = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || r === void 0 ? void 0 : r.trim();
    if (n)
      return n;
    for (const i of t)
      if (this.hasCommand(i))
        return i;
    return this._logger.warn(`No package manager found in the list: ${t.join(", ")}. Defaulting to the first one: ${t[0]}`), t[0];
  }
}
ln.LinuxUpdater = nA;
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.DebUpdater = void 0;
const iA = ve, rf = Qt, aA = ln;
class Dl extends aA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, iA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(rf.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(rf.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const n = ["dpkg", "apt"], i = this.detectPackageManager(n);
    try {
      Dl.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    var a;
    if (t === "dpkg")
      try {
        n(["dpkg", "-i", r]);
      } catch (o) {
        i.warn((a = o.message) !== null && a !== void 0 ? a : o), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), n(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), n([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        r
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
Un.DebUpdater = Dl;
var kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
kn.PacmanUpdater = void 0;
const nf = Qt, oA = ve, sA = ln;
class Il extends sA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, oA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(nf.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(nf.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      Il.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (n) {
      return this.dispatchError(n), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n) {
    var i;
    try {
      r(["pacman", "-U", "--noconfirm", t]);
    } catch (a) {
      n.warn((i = a.message) !== null && i !== void 0 ? i : a), n.warn("pacman installation failed, attempting to update package database and retry");
      try {
        r(["pacman", "-Sy", "--noconfirm"]), r(["pacman", "-U", "--noconfirm", t]);
      } catch (o) {
        throw n.error("Retry after pacman -Sy failed"), o;
      }
    }
  }
}
kn.PacmanUpdater = Il;
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.RpmUpdater = void 0;
const af = Qt, lA = ve, cA = ln;
class Fl extends cA.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, lA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(af.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(af.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(n);
    try {
      Fl.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    if (t === "zypper")
      return n(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", r]);
    if (t === "dnf")
      return n(["dnf", "install", "--nogpgcheck", "-y", r]);
    if (t === "yum")
      return n(["yum", "install", "--nogpgcheck", "-y", r]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), n(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", r]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
Bn.RpmUpdater = Fl;
var Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.MacUpdater = void 0;
const of = we, Vo = Jt, uA = Re, sf = ne, fA = Qm, dA = Gt, hA = ve, lf = Ea, cf = Wn;
class pA extends dA.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = yr.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let a = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), a = (0, lf.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${a})`);
    } catch (d) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${d}`);
    }
    let o = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const h = (0, lf.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${h}`), o = o || h;
    } catch (d) {
      n.warn(`uname shell command to check for arm64 failed: ${d}`);
    }
    o = o || process.arch === "arm64" || a;
    const s = (d) => {
      var h;
      return d.url.pathname.includes("arm64") || ((h = d.info.url) === null || h === void 0 ? void 0 : h.includes("arm64"));
    };
    o && r.some(s) ? r = r.filter((d) => o === s(d)) : r = r.filter((d) => !s(d));
    const l = (0, hA.findFile)(r, "zip", ["pkg", "dmg"]);
    if (l == null)
      throw (0, of.newError)(`ZIP file not provided: ${(0, of.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const p = t.updateInfoAndProvider.provider, u = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: l,
      downloadUpdateOptions: t,
      task: async (d, h) => {
        const m = sf.join(this.downloadedUpdateHelper.cacheDir, u), w = () => (0, Vo.pathExistsSync)(m) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let x = !0;
        w() && (x = await this.differentialDownloadInstaller(l, t, d, p, u)), x && await this.httpExecutor.download(l.url, d, h);
      },
      done: async (d) => {
        if (!t.disableDifferentialDownload)
          try {
            const h = sf.join(this.downloadedUpdateHelper.cacheDir, u);
            await (0, Vo.copyFile)(d.downloadedFile, h);
          } catch (h) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${h.message}`);
          }
        return this.updateDownloaded(l, d);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, a = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Vo.stat)(i)).size, o = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, fA.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      o.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const l = (p) => {
      const u = p.address();
      return typeof u == "string" ? u : `http://127.0.0.1:${u == null ? void 0 : u.port}`;
    };
    return await new Promise((p, u) => {
      const d = (0, cf.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${d}`, "ascii"), m = `/${(0, cf.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (w, x) => {
        const b = w.url;
        if (o.info(`${b} requested`), b === "/") {
          if (!w.headers.authorization || w.headers.authorization.indexOf("Basic ") === -1) {
            x.statusCode = 401, x.statusMessage = "Invalid Authentication Credentials", x.end(), o.warn("No authenthication info");
            return;
          }
          const O = w.headers.authorization.split(" ")[1], D = Buffer.from(O, "base64").toString("ascii"), [B, F] = D.split(":");
          if (B !== "autoupdater" || F !== d) {
            x.statusCode = 401, x.statusMessage = "Invalid Authentication Credentials", x.end(), o.warn("Invalid authenthication credentials");
            return;
          }
          const L = Buffer.from(`{ "url": "${l(this.server)}${m}" }`);
          x.writeHead(200, { "Content-Type": "application/json", "Content-Length": L.length }), x.end(L);
          return;
        }
        if (!b.startsWith(m)) {
          o.warn(`${b} requested, but not supported`), x.writeHead(404), x.end();
          return;
        }
        o.info(`${m} requested by Squirrel.Mac, pipe ${i}`);
        let g = !1;
        x.on("finish", () => {
          g || (this.nativeUpdater.removeListener("error", u), p([]));
        });
        const v = (0, uA.createReadStream)(i);
        v.on("error", (O) => {
          try {
            x.end();
          } catch (D) {
            o.warn(`cannot end response: ${D}`);
          }
          g = !0, this.nativeUpdater.removeListener("error", u), u(new Error(`Cannot pipe "${i}": ${O}`));
        }), x.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": a
        }), v.pipe(x);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", u), this.nativeUpdater.checkForUpdates()) : p([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Mn.MacUpdater = pA;
var jn = {}, Nl = {};
Object.defineProperty(Nl, "__esModule", { value: !0 });
Nl.verifySignature = xA;
const uf = we, Bh = Ea, mA = _a, ff = ne;
function Mh(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function xA(e, t, r) {
  return new Promise((n, i) => {
    const a = t.replace(/'/g, "''");
    r.info(`Verifying signature ${a}`), (0, Bh.execFile)(...Mh(`"Get-AuthenticodeSignature -LiteralPath '${a}' | ConvertTo-Json -Compress"`, 20 * 1e3), (o, s, l) => {
      var p;
      try {
        if (o != null || l) {
          Yo(r, o, l, i), n(null);
          return;
        }
        const u = gA(s);
        if (u.Status === 0) {
          try {
            const w = ff.normalize(u.Path), x = ff.normalize(t);
            if (r.info(`LiteralPath: ${w}. Update Path: ${x}`), w !== x) {
              Yo(r, new Error(`LiteralPath of ${w} is different than ${x}`), l, i), n(null);
              return;
            }
          } catch (w) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(p = w.message) !== null && p !== void 0 ? p : w.stack}`);
          }
          const h = (0, uf.parseDn)(u.SignerCertificate.Subject);
          let m = !1;
          for (const w of e) {
            const x = (0, uf.parseDn)(w);
            if (x.size ? m = Array.from(x.keys()).every((g) => x.get(g) === h.get(g)) : w === h.get("CN") && (r.warn(`Signature validated using only CN ${w}. Please add your full Distinguished Name (DN) to publisherNames configuration`), m = !0), m) {
              n(null);
              return;
            }
          }
        }
        const d = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(u, (h, m) => h === "RawData" ? void 0 : m, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${d}`), n(d);
      } catch (u) {
        Yo(r, u, null, i), n(null);
        return;
      }
    });
  });
}
function gA(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Yo(e, t, r, n) {
  if (yA()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Bh.execFileSync)(...Mh("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function yA() {
  const e = mA.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(jn, "__esModule", { value: !0 });
jn.NsisUpdater = void 0;
const qi = we, df = ne, vA = _r, wA = ni, hf = Qt, EA = ve, _A = Jt, bA = Nl, pf = Kt;
class SA extends vA.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, bA.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, EA.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, a, o, s) => {
        const l = n.packageInfo, p = l != null && o != null;
        if (p && t.disableWebInstaller)
          throw (0, qi.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !p && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (p || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, qi.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, a);
        const u = await this.verifySignature(i);
        if (u != null)
          throw await s(), (0, qi.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${u}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (p && await this.differentialDownloadWebPackage(t, l, o, r))
          try {
            await this.httpExecutor.download(new pf.URL(l.path), o, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (d) {
            try {
              await (0, _A.unlink)(o);
            } catch {
            }
            throw d;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const a = () => {
      this.spawnLog(df.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((o) => this.dispatchError(o));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), a(), !0) : (this.spawnLog(r, n).catch((o) => {
      const s = o.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${o.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? a() : s === "ENOENT" ? yr.shell.openPath(r).catch((l) => this.dispatchError(l)) : this.dispatchError(o);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const a = {
        newUrl: new pf.URL(r.path),
        oldFile: df.join(this.downloadedUpdateHelper.cacheDir, qi.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(hf.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(hf.DOWNLOAD_PROGRESS, o)), await new wA.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, a).download();
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "win32";
    }
    return !1;
  }
}
jn.NsisUpdater = SA;
(function(e) {
  var t = ie && ie.__createBinding || (Object.create ? function(b, g, v, O) {
    O === void 0 && (O = v);
    var D = Object.getOwnPropertyDescriptor(g, v);
    (!D || ("get" in D ? !g.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return g[v];
    } }), Object.defineProperty(b, O, D);
  } : function(b, g, v, O) {
    O === void 0 && (O = v), b[O] = g[v];
  }), r = ie && ie.__exportStar || function(b, g) {
    for (var v in b) v !== "default" && !Object.prototype.hasOwnProperty.call(g, v) && t(g, b, v);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = Jt, i = ne;
  var a = _r;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return a.BaseUpdater;
  } });
  var o = Gt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return o.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return o.NoOpLogger;
  } });
  var s = ve;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
  } });
  var l = Ln;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var p = Un;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return p.DebUpdater;
  } });
  var u = kn;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return u.PacmanUpdater;
  } });
  var d = Bn;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return d.RpmUpdater;
  } });
  var h = Mn;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var m = jn;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return m.NsisUpdater;
  } }), r(Qt, e);
  let w;
  function x() {
    if (process.platform === "win32")
      w = new jn.NsisUpdater();
    else if (process.platform === "darwin")
      w = new Mn.MacUpdater();
    else {
      w = new Ln.AppImageUpdater();
      try {
        const b = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(b))
          return w;
        switch ((0, n.readFileSync)(b).toString().trim()) {
          case "deb":
            w = new Un.DebUpdater();
            break;
          case "rpm":
            w = new Bn.RpmUpdater();
            break;
          case "pacman":
            w = new kn.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (b) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", b.message);
      }
    }
    return w;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => w || x()
  });
})(Pd);
ye.join(_t.getPath("appData"), ".hard-monitoring");
const AA = (e, t) => {
  const r = ye.join(t, "versions", e), n = ye.join(r, `${e}.json`);
  return le.existsSync(n);
}, TA = (e) => {
  le.existsSync(e) || le.mkdirSync(e, { recursive: !0 });
};
var jh = (e) => {
  const t = new Uint8Array(e);
  if (!(t && t.length > 1))
    return null;
  const r = (n, i) => {
    i = Object.assign({
      offset: 0
    }, i);
    for (let a = 0; a < n.length; a++)
      if (n[a] !== t[a + i.offset])
        return !1;
    return !0;
  };
  if (r([255, 216, 255]))
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  if (r([137, 80, 78, 71, 13, 10, 26, 10]))
    return {
      ext: "png",
      mime: "image/png"
    };
  if (r([71, 73, 70]))
    return {
      ext: "gif",
      mime: "image/gif"
    };
  if (r([87, 69, 66, 80], { offset: 8 }))
    return {
      ext: "webp",
      mime: "image/webp"
    };
  if (r([70, 76, 73, 70]))
    return {
      ext: "flif",
      mime: "image/flif"
    };
  if ((r([73, 73, 42, 0]) || r([77, 77, 0, 42])) && r([67, 82], { offset: 8 }))
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  if (r([73, 73, 42, 0]) || r([77, 77, 0, 42]))
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  if (r([66, 77]))
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  if (r([73, 73, 188]))
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  if (r([56, 66, 80, 83]))
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  if (r([80, 75, 3, 4]) && r([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 }))
    return {
      ext: "epub",
      mime: "application/epub+zip"
    };
  if (r([80, 75, 3, 4]) && r([77, 69, 84, 65, 45, 73, 78, 70, 47, 109, 111, 122, 105, 108, 108, 97, 46, 114, 115, 97], { offset: 30 }))
    return {
      ext: "xpi",
      mime: "application/x-xpinstall"
    };
  if (r([80, 75]) && (t[2] === 3 || t[2] === 5 || t[2] === 7) && (t[3] === 4 || t[3] === 6 || t[3] === 8))
    return {
      ext: "zip",
      mime: "application/zip"
    };
  if (r([117, 115, 116, 97, 114], { offset: 257 }))
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  if (r([82, 97, 114, 33, 26, 7]) && (t[6] === 0 || t[6] === 1))
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  if (r([31, 139, 8]))
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  if (r([66, 90, 104]))
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  if (r([55, 122, 188, 175, 39, 28]))
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  if (r([120, 1]))
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  if (r([0, 0, 0]) && (t[3] === 24 || t[3] === 32) && r([102, 116, 121, 112], { offset: 4 }) || r([51, 103, 112, 53]) || r([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50]) && r([109, 112, 52, 49, 109, 112, 52, 50, 105, 115, 111, 109], { offset: 16 }) || r([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109]) || r([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50, 0, 0, 0, 0]))
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  if (r([0, 0, 0, 28, 102, 116, 121, 112, 77, 52, 86]))
    return {
      ext: "m4v",
      mime: "video/x-m4v"
    };
  if (r([77, 84, 104, 100]))
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  if (r([26, 69, 223, 163])) {
    const n = t.subarray(4, 4100), i = n.findIndex((a, o, s) => s[o] === 66 && s[o + 1] === 130);
    if (i >= 0) {
      const a = i + 3, o = (s) => Array.from(s).every((l, p) => n[a + p] === l.charCodeAt(0));
      if (o("matroska"))
        return {
          ext: "mkv",
          mime: "video/x-matroska"
        };
      if (o("webm"))
        return {
          ext: "webm",
          mime: "video/webm"
        };
    }
  }
  return r([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || r([102, 114, 101, 101], { offset: 4 }) || r([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || r([109, 100, 97, 116], { offset: 4 }) || // MJPEG
  r([119, 105, 100, 101], { offset: 4 }) ? {
    ext: "mov",
    mime: "video/quicktime"
  } : r([82, 73, 70, 70]) && r([65, 86, 73], { offset: 8 }) ? {
    ext: "avi",
    mime: "video/x-msvideo"
  } : r([48, 38, 178, 117, 142, 102, 207, 17, 166, 217]) ? {
    ext: "wmv",
    mime: "video/x-ms-wmv"
  } : r([0, 0, 1, 186]) ? {
    ext: "mpg",
    mime: "video/mpeg"
  } : r([73, 68, 51]) || r([255, 251]) ? {
    ext: "mp3",
    mime: "audio/mpeg"
  } : r([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || r([77, 52, 65, 32]) ? {
    ext: "m4a",
    mime: "audio/m4a"
  } : r([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 }) ? {
    ext: "opus",
    mime: "audio/opus"
  } : r([79, 103, 103, 83]) ? {
    ext: "ogg",
    mime: "audio/ogg"
  } : r([102, 76, 97, 67]) ? {
    ext: "flac",
    mime: "audio/x-flac"
  } : r([82, 73, 70, 70]) && r([87, 65, 86, 69], { offset: 8 }) ? {
    ext: "wav",
    mime: "audio/x-wav"
  } : r([35, 33, 65, 77, 82, 10]) ? {
    ext: "amr",
    mime: "audio/amr"
  } : r([37, 80, 68, 70]) ? {
    ext: "pdf",
    mime: "application/pdf"
  } : r([77, 90]) ? {
    ext: "exe",
    mime: "application/x-msdownload"
  } : (t[0] === 67 || t[0] === 70) && r([87, 83], { offset: 1 }) ? {
    ext: "swf",
    mime: "application/x-shockwave-flash"
  } : r([123, 92, 114, 116, 102]) ? {
    ext: "rtf",
    mime: "application/rtf"
  } : r([0, 97, 115, 109]) ? {
    ext: "wasm",
    mime: "application/wasm"
  } : r([119, 79, 70, 70]) && (r([0, 1, 0, 0], { offset: 4 }) || r([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff",
    mime: "font/woff"
  } : r([119, 79, 70, 50]) && (r([0, 1, 0, 0], { offset: 4 }) || r([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff2",
    mime: "font/woff2"
  } : r([76, 80], { offset: 34 }) && (r([0, 0, 1], { offset: 8 }) || r([1, 0, 2], { offset: 8 }) || r([2, 0, 2], { offset: 8 })) ? {
    ext: "eot",
    mime: "application/octet-stream"
  } : r([0, 1, 0, 0, 0]) ? {
    ext: "ttf",
    mime: "font/ttf"
  } : r([79, 84, 84, 79, 0]) ? {
    ext: "otf",
    mime: "font/otf"
  } : r([0, 0, 1, 0]) ? {
    ext: "ico",
    mime: "image/x-icon"
  } : r([70, 76, 86, 1]) ? {
    ext: "flv",
    mime: "video/x-flv"
  } : r([37, 33]) ? {
    ext: "ps",
    mime: "application/postscript"
  } : r([253, 55, 122, 88, 90, 0]) ? {
    ext: "xz",
    mime: "application/x-xz"
  } : r([83, 81, 76, 105]) ? {
    ext: "sqlite",
    mime: "application/x-sqlite3"
  } : r([78, 69, 83, 26]) ? {
    ext: "nes",
    mime: "application/x-nintendo-nes-rom"
  } : r([67, 114, 50, 52]) ? {
    ext: "crx",
    mime: "application/x-google-chrome-extension"
  } : r([77, 83, 67, 70]) || r([73, 83, 99, 40]) ? {
    ext: "cab",
    mime: "application/vnd.ms-cab-compressed"
  } : r([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121]) ? {
    ext: "deb",
    mime: "application/x-deb"
  } : r([33, 60, 97, 114, 99, 104, 62]) ? {
    ext: "ar",
    mime: "application/x-unix-archive"
  } : r([237, 171, 238, 219]) ? {
    ext: "rpm",
    mime: "application/x-rpm"
  } : r([31, 160]) || r([31, 157]) ? {
    ext: "Z",
    mime: "application/x-compress"
  } : r([76, 90, 73, 80]) ? {
    ext: "lz",
    mime: "application/x-lzip"
  } : r([208, 207, 17, 224, 161, 177, 26, 225]) ? {
    ext: "msi",
    mime: "application/x-msi"
  } : r([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2]) ? {
    ext: "mxf",
    mime: "application/mxf"
  } : r([71], { offset: 4 }) && (r([71], { offset: 192 }) || r([71], { offset: 196 })) ? {
    ext: "mts",
    mime: "video/mp2t"
  } : r([66, 76, 69, 78, 68, 69, 82]) ? {
    ext: "blend",
    mime: "application/x-blender"
  } : r([66, 80, 71, 251]) ? {
    ext: "bpg",
    mime: "image/bpg"
  } : null;
}, qh = { exports: {} }, Et = qh.exports = function(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
};
Et.writable = function(e) {
  return Et(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
};
Et.readable = function(e) {
  return Et(e) && e.readable !== !1 && typeof e._read == "function" && typeof e._readableState == "object";
};
Et.duplex = function(e) {
  return Et.writable(e) && Et.readable(e);
};
Et.transform = function(e) {
  return Et.duplex(e) && typeof e._transform == "function" && typeof e._transformState == "object";
};
var $l = qh.exports, Ll = {}, Ws = { exports: {} }, Hi = { exports: {} }, mf;
function Wa() {
  if (mf) return Hi.exports;
  mf = 1, typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? Hi.exports = { nextTick: e } : Hi.exports = process;
  function e(t, r, n, i) {
    if (typeof t != "function")
      throw new TypeError('"callback" argument must be a function');
    var a = arguments.length, o, s;
    switch (a) {
      case 0:
      case 1:
        return process.nextTick(t);
      case 2:
        return process.nextTick(function() {
          t.call(null, r);
        });
      case 3:
        return process.nextTick(function() {
          t.call(null, r, n);
        });
      case 4:
        return process.nextTick(function() {
          t.call(null, r, n, i);
        });
      default:
        for (o = new Array(a - 1), s = 0; s < o.length; )
          o[s++] = arguments[s];
        return process.nextTick(function() {
          t.apply(null, o);
        });
    }
  }
  return Hi.exports;
}
var Xo, xf;
function CA() {
  if (xf) return Xo;
  xf = 1;
  var e = {}.toString;
  return Xo = Array.isArray || function(t) {
    return e.call(t) == "[object Array]";
  }, Xo;
}
var Ko, gf;
function Hh() {
  return gf || (gf = 1, Ko = Ye), Ko;
}
var Vs = { exports: {} };
(function(e, t) {
  var r = el, n = r.Buffer;
  function i(o, s) {
    for (var l in o)
      s[l] = o[l];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = r : (i(r, t), t.Buffer = a);
  function a(o, s, l) {
    return n(o, s, l);
  }
  i(n, a), a.from = function(o, s, l) {
    if (typeof o == "number")
      throw new TypeError("Argument must not be a number");
    return n(o, s, l);
  }, a.alloc = function(o, s, l) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    var p = n(o);
    return s !== void 0 ? typeof l == "string" ? p.fill(s, l) : p.fill(s) : p.fill(0), p;
  }, a.allocUnsafe = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return n(o);
  }, a.allocUnsafeSlow = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return r.SlowBuffer(o);
  };
})(Vs, Vs.exports);
var ii = Vs.exports, Ae = {}, yf;
function ai() {
  if (yf) return Ae;
  yf = 1;
  function e(x) {
    return Array.isArray ? Array.isArray(x) : w(x) === "[object Array]";
  }
  Ae.isArray = e;
  function t(x) {
    return typeof x == "boolean";
  }
  Ae.isBoolean = t;
  function r(x) {
    return x === null;
  }
  Ae.isNull = r;
  function n(x) {
    return x == null;
  }
  Ae.isNullOrUndefined = n;
  function i(x) {
    return typeof x == "number";
  }
  Ae.isNumber = i;
  function a(x) {
    return typeof x == "string";
  }
  Ae.isString = a;
  function o(x) {
    return typeof x == "symbol";
  }
  Ae.isSymbol = o;
  function s(x) {
    return x === void 0;
  }
  Ae.isUndefined = s;
  function l(x) {
    return w(x) === "[object RegExp]";
  }
  Ae.isRegExp = l;
  function p(x) {
    return typeof x == "object" && x !== null;
  }
  Ae.isObject = p;
  function u(x) {
    return w(x) === "[object Date]";
  }
  Ae.isDate = u;
  function d(x) {
    return w(x) === "[object Error]" || x instanceof Error;
  }
  Ae.isError = d;
  function h(x) {
    return typeof x == "function";
  }
  Ae.isFunction = h;
  function m(x) {
    return x === null || typeof x == "boolean" || typeof x == "number" || typeof x == "string" || typeof x == "symbol" || // ES6 symbol
    typeof x > "u";
  }
  Ae.isPrimitive = m, Ae.isBuffer = Buffer.isBuffer;
  function w(x) {
    return Object.prototype.toString.call(x);
  }
  return Ae;
}
var Gi = { exports: {} }, zi = { exports: {} }, vf;
function RA() {
  return vf || (vf = 1, typeof Object.create == "function" ? zi.exports = function(t, r) {
    r && (t.super_ = r, t.prototype = Object.create(r.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : zi.exports = function(t, r) {
    if (r) {
      t.super_ = r;
      var n = function() {
      };
      n.prototype = r.prototype, t.prototype = new n(), t.prototype.constructor = t;
    }
  }), zi.exports;
}
var wf;
function oi() {
  if (wf) return Gi.exports;
  wf = 1;
  try {
    var e = require("util");
    if (typeof e.inherits != "function") throw "";
    Gi.exports = e.inherits;
  } catch {
    Gi.exports = RA();
  }
  return Gi.exports;
}
var Jo = { exports: {} }, Ef;
function OA() {
  return Ef || (Ef = 1, function(e) {
    function t(a, o) {
      if (!(a instanceof o))
        throw new TypeError("Cannot call a class as a function");
    }
    var r = ii.Buffer, n = Je;
    function i(a, o, s) {
      a.copy(o, s);
    }
    e.exports = function() {
      function a() {
        t(this, a), this.head = null, this.tail = null, this.length = 0;
      }
      return a.prototype.push = function(s) {
        var l = { data: s, next: null };
        this.length > 0 ? this.tail.next = l : this.head = l, this.tail = l, ++this.length;
      }, a.prototype.unshift = function(s) {
        var l = { data: s, next: this.head };
        this.length === 0 && (this.tail = l), this.head = l, ++this.length;
      }, a.prototype.shift = function() {
        if (this.length !== 0) {
          var s = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, s;
        }
      }, a.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, a.prototype.join = function(s) {
        if (this.length === 0) return "";
        for (var l = this.head, p = "" + l.data; l = l.next; )
          p += s + l.data;
        return p;
      }, a.prototype.concat = function(s) {
        if (this.length === 0) return r.alloc(0);
        for (var l = r.allocUnsafe(s >>> 0), p = this.head, u = 0; p; )
          i(p.data, l, u), u += p.data.length, p = p.next;
        return l;
      }, a;
    }(), n && n.inspect && n.inspect.custom && (e.exports.prototype[n.inspect.custom] = function() {
      var a = n.inspect({ length: this.length });
      return this.constructor.name + " " + a;
    });
  }(Jo)), Jo.exports;
}
var Qo, _f;
function Gh() {
  if (_f) return Qo;
  _f = 1;
  var e = Wa();
  function t(i, a) {
    var o = this, s = this._readableState && this._readableState.destroyed, l = this._writableState && this._writableState.destroyed;
    return s || l ? (a ? a(i) : i && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(n, this, i)) : e.nextTick(n, this, i)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(i || null, function(p) {
      !a && p ? o._writableState ? o._writableState.errorEmitted || (o._writableState.errorEmitted = !0, e.nextTick(n, o, p)) : e.nextTick(n, o, p) : a && a(p);
    }), this);
  }
  function r() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function n(i, a) {
    i.emit("error", a);
  }
  return Qo = {
    destroy: t,
    undestroy: r
  }, Qo;
}
var Zo, bf;
function PA() {
  return bf || (bf = 1, Zo = Je.deprecate), Zo;
}
var es, Sf;
function zh() {
  if (Sf) return es;
  Sf = 1;
  var e = Wa();
  es = x;
  function t(_) {
    var A = this;
    this.next = null, this.entry = null, this.finish = function() {
      k(A, _);
    };
  }
  var r = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : e.nextTick, n;
  x.WritableState = m;
  var i = Object.create(ai());
  i.inherits = oi();
  var a = {
    deprecate: PA()
  }, o = Hh(), s = ii.Buffer, l = (typeof ie < "u" ? ie : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function p(_) {
    return s.from(_);
  }
  function u(_) {
    return s.isBuffer(_) || _ instanceof l;
  }
  var d = Gh();
  i.inherits(x, o);
  function h() {
  }
  function m(_, A) {
    n = n || tn(), _ = _ || {};
    var R = A instanceof n;
    this.objectMode = !!_.objectMode, R && (this.objectMode = this.objectMode || !!_.writableObjectMode);
    var I = _.highWaterMark, j = _.writableHighWaterMark, M = this.objectMode ? 16 : 16 * 1024;
    I || I === 0 ? this.highWaterMark = I : R && (j || j === 0) ? this.highWaterMark = j : this.highWaterMark = M, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var Q = _.decodeStrings === !1;
    this.decodeStrings = !Q, this.defaultEncoding = _.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(te) {
      L(A, te);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  m.prototype.getBuffer = function() {
    for (var A = this.bufferedRequest, R = []; A; )
      R.push(A), A = A.next;
    return R;
  }, function() {
    try {
      Object.defineProperty(m.prototype, "buffer", {
        get: a.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var w;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (w = Function.prototype[Symbol.hasInstance], Object.defineProperty(x, Symbol.hasInstance, {
    value: function(_) {
      return w.call(this, _) ? !0 : this !== x ? !1 : _ && _._writableState instanceof m;
    }
  })) : w = function(_) {
    return _ instanceof this;
  };
  function x(_) {
    if (n = n || tn(), !w.call(x, this) && !(this instanceof n))
      return new x(_);
    this._writableState = new m(_, this), this.writable = !0, _ && (typeof _.write == "function" && (this._write = _.write), typeof _.writev == "function" && (this._writev = _.writev), typeof _.destroy == "function" && (this._destroy = _.destroy), typeof _.final == "function" && (this._final = _.final)), o.call(this);
  }
  x.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function b(_, A) {
    var R = new Error("write after end");
    _.emit("error", R), e.nextTick(A, R);
  }
  function g(_, A, R, I) {
    var j = !0, M = !1;
    return R === null ? M = new TypeError("May not write null values to stream") : typeof R != "string" && R !== void 0 && !A.objectMode && (M = new TypeError("Invalid non-string/buffer chunk")), M && (_.emit("error", M), e.nextTick(I, M), j = !1), j;
  }
  x.prototype.write = function(_, A, R) {
    var I = this._writableState, j = !1, M = !I.objectMode && u(_);
    return M && !s.isBuffer(_) && (_ = p(_)), typeof A == "function" && (R = A, A = null), M ? A = "buffer" : A || (A = I.defaultEncoding), typeof R != "function" && (R = h), I.ended ? b(this, R) : (M || g(this, I, _, R)) && (I.pendingcb++, j = O(this, I, M, _, A, R)), j;
  }, x.prototype.cork = function() {
    var _ = this._writableState;
    _.corked++;
  }, x.prototype.uncork = function() {
    var _ = this._writableState;
    _.corked && (_.corked--, !_.writing && !_.corked && !_.bufferProcessing && _.bufferedRequest && U(this, _));
  }, x.prototype.setDefaultEncoding = function(A) {
    if (typeof A == "string" && (A = A.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((A + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + A);
    return this._writableState.defaultEncoding = A, this;
  };
  function v(_, A, R) {
    return !_.objectMode && _.decodeStrings !== !1 && typeof A == "string" && (A = s.from(A, R)), A;
  }
  Object.defineProperty(x.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function O(_, A, R, I, j, M) {
    if (!R) {
      var Q = v(A, I, j);
      I !== Q && (R = !0, j = "buffer", I = Q);
    }
    var te = A.objectMode ? 1 : I.length;
    A.length += te;
    var V = A.length < A.highWaterMark;
    if (V || (A.needDrain = !0), A.writing || A.corked) {
      var ce = A.lastBufferedRequest;
      A.lastBufferedRequest = {
        chunk: I,
        encoding: j,
        isBuf: R,
        callback: M,
        next: null
      }, ce ? ce.next = A.lastBufferedRequest : A.bufferedRequest = A.lastBufferedRequest, A.bufferedRequestCount += 1;
    } else
      D(_, A, !1, te, I, j, M);
    return V;
  }
  function D(_, A, R, I, j, M, Q) {
    A.writelen = I, A.writecb = Q, A.writing = !0, A.sync = !0, R ? _._writev(j, A.onwrite) : _._write(j, M, A.onwrite), A.sync = !1;
  }
  function B(_, A, R, I, j) {
    --A.pendingcb, R ? (e.nextTick(j, I), e.nextTick(N, _, A), _._writableState.errorEmitted = !0, _.emit("error", I)) : (j(I), _._writableState.errorEmitted = !0, _.emit("error", I), N(_, A));
  }
  function F(_) {
    _.writing = !1, _.writecb = null, _.length -= _.writelen, _.writelen = 0;
  }
  function L(_, A) {
    var R = _._writableState, I = R.sync, j = R.writecb;
    if (F(R), A) B(_, R, I, A, j);
    else {
      var M = q(R);
      !M && !R.corked && !R.bufferProcessing && R.bufferedRequest && U(_, R), I ? r(Y, _, R, M, j) : Y(_, R, M, j);
    }
  }
  function Y(_, A, R, I) {
    R || E(_, A), A.pendingcb--, I(), N(_, A);
  }
  function E(_, A) {
    A.length === 0 && A.needDrain && (A.needDrain = !1, _.emit("drain"));
  }
  function U(_, A) {
    A.bufferProcessing = !0;
    var R = A.bufferedRequest;
    if (_._writev && R && R.next) {
      var I = A.bufferedRequestCount, j = new Array(I), M = A.corkedRequestsFree;
      M.entry = R;
      for (var Q = 0, te = !0; R; )
        j[Q] = R, R.isBuf || (te = !1), R = R.next, Q += 1;
      j.allBuffers = te, D(_, A, !0, A.length, j, "", M.finish), A.pendingcb++, A.lastBufferedRequest = null, M.next ? (A.corkedRequestsFree = M.next, M.next = null) : A.corkedRequestsFree = new t(A), A.bufferedRequestCount = 0;
    } else {
      for (; R; ) {
        var V = R.chunk, ce = R.encoding, f = R.callback, c = A.objectMode ? 1 : V.length;
        if (D(_, A, !1, c, V, ce, f), R = R.next, A.bufferedRequestCount--, A.writing)
          break;
      }
      R === null && (A.lastBufferedRequest = null);
    }
    A.bufferedRequest = R, A.bufferProcessing = !1;
  }
  x.prototype._write = function(_, A, R) {
    R(new Error("_write() is not implemented"));
  }, x.prototype._writev = null, x.prototype.end = function(_, A, R) {
    var I = this._writableState;
    typeof _ == "function" ? (R = _, _ = null, A = null) : typeof A == "function" && (R = A, A = null), _ != null && this.write(_, A), I.corked && (I.corked = 1, this.uncork()), I.ending || P(this, I, R);
  };
  function q(_) {
    return _.ending && _.length === 0 && _.bufferedRequest === null && !_.finished && !_.writing;
  }
  function G(_, A) {
    _._final(function(R) {
      A.pendingcb--, R && _.emit("error", R), A.prefinished = !0, _.emit("prefinish"), N(_, A);
    });
  }
  function J(_, A) {
    !A.prefinished && !A.finalCalled && (typeof _._final == "function" ? (A.pendingcb++, A.finalCalled = !0, e.nextTick(G, _, A)) : (A.prefinished = !0, _.emit("prefinish")));
  }
  function N(_, A) {
    var R = q(A);
    return R && (J(_, A), A.pendingcb === 0 && (A.finished = !0, _.emit("finish"))), R;
  }
  function P(_, A, R) {
    A.ending = !0, N(_, A), R && (A.finished ? e.nextTick(R) : _.once("finish", R)), A.ended = !0, _.writable = !1;
  }
  function k(_, A, R) {
    var I = _.entry;
    for (_.entry = null; I; ) {
      var j = I.callback;
      A.pendingcb--, j(R), I = I.next;
    }
    A.corkedRequestsFree.next = _;
  }
  return Object.defineProperty(x.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(_) {
      this._writableState && (this._writableState.destroyed = _);
    }
  }), x.prototype.destroy = d.destroy, x.prototype._undestroy = d.undestroy, x.prototype._destroy = function(_, A) {
    this.end(), A(_);
  }, es;
}
var ts, Af;
function tn() {
  if (Af) return ts;
  Af = 1;
  var e = Wa(), t = Object.keys || function(d) {
    var h = [];
    for (var m in d)
      h.push(m);
    return h;
  };
  ts = l;
  var r = Object.create(ai());
  r.inherits = oi();
  var n = Wh(), i = zh();
  r.inherits(l, n);
  for (var a = t(i.prototype), o = 0; o < a.length; o++) {
    var s = a[o];
    l.prototype[s] || (l.prototype[s] = i.prototype[s]);
  }
  function l(d) {
    if (!(this instanceof l)) return new l(d);
    n.call(this, d), i.call(this, d), d && d.readable === !1 && (this.readable = !1), d && d.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, d && d.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", p);
  }
  Object.defineProperty(l.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function p() {
    this.allowHalfOpen || this._writableState.ended || e.nextTick(u, this);
  }
  function u(d) {
    d.end();
  }
  return Object.defineProperty(l.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(d) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = d, this._writableState.destroyed = d);
    }
  }), l.prototype._destroy = function(d, h) {
    this.push(null), this.end(), e.nextTick(h, d);
  }, ts;
}
var rs = {}, Tf;
function Cf() {
  if (Tf) return rs;
  Tf = 1;
  var e = ii.Buffer, t = e.isEncoding || function(g) {
    switch (g = "" + g, g && g.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function r(g) {
    if (!g) return "utf8";
    for (var v; ; )
      switch (g) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return g;
        default:
          if (v) return;
          g = ("" + g).toLowerCase(), v = !0;
      }
  }
  function n(g) {
    var v = r(g);
    if (typeof v != "string" && (e.isEncoding === t || !t(g))) throw new Error("Unknown encoding: " + g);
    return v || g;
  }
  rs.StringDecoder = i;
  function i(g) {
    this.encoding = n(g);
    var v;
    switch (this.encoding) {
      case "utf16le":
        this.text = d, this.end = h, v = 4;
        break;
      case "utf8":
        this.fillLast = l, v = 4;
        break;
      case "base64":
        this.text = m, this.end = w, v = 3;
        break;
      default:
        this.write = x, this.end = b;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = e.allocUnsafe(v);
  }
  i.prototype.write = function(g) {
    if (g.length === 0) return "";
    var v, O;
    if (this.lastNeed) {
      if (v = this.fillLast(g), v === void 0) return "";
      O = this.lastNeed, this.lastNeed = 0;
    } else
      O = 0;
    return O < g.length ? v ? v + this.text(g, O) : this.text(g, O) : v || "";
  }, i.prototype.end = u, i.prototype.text = p, i.prototype.fillLast = function(g) {
    if (this.lastNeed <= g.length)
      return g.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    g.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, g.length), this.lastNeed -= g.length;
  };
  function a(g) {
    return g <= 127 ? 0 : g >> 5 === 6 ? 2 : g >> 4 === 14 ? 3 : g >> 3 === 30 ? 4 : g >> 6 === 2 ? -1 : -2;
  }
  function o(g, v, O) {
    var D = v.length - 1;
    if (D < O) return 0;
    var B = a(v[D]);
    return B >= 0 ? (B > 0 && (g.lastNeed = B - 1), B) : --D < O || B === -2 ? 0 : (B = a(v[D]), B >= 0 ? (B > 0 && (g.lastNeed = B - 2), B) : --D < O || B === -2 ? 0 : (B = a(v[D]), B >= 0 ? (B > 0 && (B === 2 ? B = 0 : g.lastNeed = B - 3), B) : 0));
  }
  function s(g, v, O) {
    if ((v[0] & 192) !== 128)
      return g.lastNeed = 0, "�";
    if (g.lastNeed > 1 && v.length > 1) {
      if ((v[1] & 192) !== 128)
        return g.lastNeed = 1, "�";
      if (g.lastNeed > 2 && v.length > 2 && (v[2] & 192) !== 128)
        return g.lastNeed = 2, "�";
    }
  }
  function l(g) {
    var v = this.lastTotal - this.lastNeed, O = s(this, g);
    if (O !== void 0) return O;
    if (this.lastNeed <= g.length)
      return g.copy(this.lastChar, v, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    g.copy(this.lastChar, v, 0, g.length), this.lastNeed -= g.length;
  }
  function p(g, v) {
    var O = o(this, g, v);
    if (!this.lastNeed) return g.toString("utf8", v);
    this.lastTotal = O;
    var D = g.length - (O - this.lastNeed);
    return g.copy(this.lastChar, 0, D), g.toString("utf8", v, D);
  }
  function u(g) {
    var v = g && g.length ? this.write(g) : "";
    return this.lastNeed ? v + "�" : v;
  }
  function d(g, v) {
    if ((g.length - v) % 2 === 0) {
      var O = g.toString("utf16le", v);
      if (O) {
        var D = O.charCodeAt(O.length - 1);
        if (D >= 55296 && D <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = g[g.length - 2], this.lastChar[1] = g[g.length - 1], O.slice(0, -1);
      }
      return O;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = g[g.length - 1], g.toString("utf16le", v, g.length - 1);
  }
  function h(g) {
    var v = g && g.length ? this.write(g) : "";
    if (this.lastNeed) {
      var O = this.lastTotal - this.lastNeed;
      return v + this.lastChar.toString("utf16le", 0, O);
    }
    return v;
  }
  function m(g, v) {
    var O = (g.length - v) % 3;
    return O === 0 ? g.toString("base64", v) : (this.lastNeed = 3 - O, this.lastTotal = 3, O === 1 ? this.lastChar[0] = g[g.length - 1] : (this.lastChar[0] = g[g.length - 2], this.lastChar[1] = g[g.length - 1]), g.toString("base64", v, g.length - O));
  }
  function w(g) {
    var v = g && g.length ? this.write(g) : "";
    return this.lastNeed ? v + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : v;
  }
  function x(g) {
    return g.toString(this.encoding);
  }
  function b(g) {
    return g && g.length ? this.write(g) : "";
  }
  return rs;
}
var ns, Rf;
function Wh() {
  if (Rf) return ns;
  Rf = 1;
  var e = Wa();
  ns = v;
  var t = CA(), r;
  v.ReadableState = g, zn.EventEmitter;
  var n = function(f, c) {
    return f.listeners(c).length;
  }, i = Hh(), a = ii.Buffer, o = (typeof ie < "u" ? ie : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(f) {
    return a.from(f);
  }
  function l(f) {
    return a.isBuffer(f) || f instanceof o;
  }
  var p = Object.create(ai());
  p.inherits = oi();
  var u = Je, d = void 0;
  u && u.debuglog ? d = u.debuglog("stream") : d = function() {
  };
  var h = OA(), m = Gh(), w;
  p.inherits(v, i);
  var x = ["error", "close", "destroy", "pause", "resume"];
  function b(f, c, T) {
    if (typeof f.prependListener == "function") return f.prependListener(c, T);
    !f._events || !f._events[c] ? f.on(c, T) : t(f._events[c]) ? f._events[c].unshift(T) : f._events[c] = [T, f._events[c]];
  }
  function g(f, c) {
    r = r || tn(), f = f || {};
    var T = c instanceof r;
    this.objectMode = !!f.objectMode, T && (this.objectMode = this.objectMode || !!f.readableObjectMode);
    var S = f.highWaterMark, W = f.readableHighWaterMark, H = this.objectMode ? 16 : 16 * 1024;
    S || S === 0 ? this.highWaterMark = S : T && (W || W === 0) ? this.highWaterMark = W : this.highWaterMark = H, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new h(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = f.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, f.encoding && (w || (w = Cf().StringDecoder), this.decoder = new w(f.encoding), this.encoding = f.encoding);
  }
  function v(f) {
    if (r = r || tn(), !(this instanceof v)) return new v(f);
    this._readableState = new g(f, this), this.readable = !0, f && (typeof f.read == "function" && (this._read = f.read), typeof f.destroy == "function" && (this._destroy = f.destroy)), i.call(this);
  }
  Object.defineProperty(v.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(f) {
      this._readableState && (this._readableState.destroyed = f);
    }
  }), v.prototype.destroy = m.destroy, v.prototype._undestroy = m.undestroy, v.prototype._destroy = function(f, c) {
    this.push(null), c(f);
  }, v.prototype.push = function(f, c) {
    var T = this._readableState, S;
    return T.objectMode ? S = !0 : typeof f == "string" && (c = c || T.defaultEncoding, c !== T.encoding && (f = a.from(f, c), c = ""), S = !0), O(this, f, c, !1, S);
  }, v.prototype.unshift = function(f) {
    return O(this, f, null, !0, !1);
  };
  function O(f, c, T, S, W) {
    var H = f._readableState;
    if (c === null)
      H.reading = !1, U(f, H);
    else {
      var X;
      W || (X = B(H, c)), X ? f.emit("error", X) : H.objectMode || c && c.length > 0 ? (typeof c != "string" && !H.objectMode && Object.getPrototypeOf(c) !== a.prototype && (c = s(c)), S ? H.endEmitted ? f.emit("error", new Error("stream.unshift() after end event")) : D(f, H, c, !0) : H.ended ? f.emit("error", new Error("stream.push() after EOF")) : (H.reading = !1, H.decoder && !T ? (c = H.decoder.write(c), H.objectMode || c.length !== 0 ? D(f, H, c, !1) : J(f, H)) : D(f, H, c, !1))) : S || (H.reading = !1);
    }
    return F(H);
  }
  function D(f, c, T, S) {
    c.flowing && c.length === 0 && !c.sync ? (f.emit("data", T), f.read(0)) : (c.length += c.objectMode ? 1 : T.length, S ? c.buffer.unshift(T) : c.buffer.push(T), c.needReadable && q(f)), J(f, c);
  }
  function B(f, c) {
    var T;
    return !l(c) && typeof c != "string" && c !== void 0 && !f.objectMode && (T = new TypeError("Invalid non-string/buffer chunk")), T;
  }
  function F(f) {
    return !f.ended && (f.needReadable || f.length < f.highWaterMark || f.length === 0);
  }
  v.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, v.prototype.setEncoding = function(f) {
    return w || (w = Cf().StringDecoder), this._readableState.decoder = new w(f), this._readableState.encoding = f, this;
  };
  var L = 8388608;
  function Y(f) {
    return f >= L ? f = L : (f--, f |= f >>> 1, f |= f >>> 2, f |= f >>> 4, f |= f >>> 8, f |= f >>> 16, f++), f;
  }
  function E(f, c) {
    return f <= 0 || c.length === 0 && c.ended ? 0 : c.objectMode ? 1 : f !== f ? c.flowing && c.length ? c.buffer.head.data.length : c.length : (f > c.highWaterMark && (c.highWaterMark = Y(f)), f <= c.length ? f : c.ended ? c.length : (c.needReadable = !0, 0));
  }
  v.prototype.read = function(f) {
    d("read", f), f = parseInt(f, 10);
    var c = this._readableState, T = f;
    if (f !== 0 && (c.emittedReadable = !1), f === 0 && c.needReadable && (c.length >= c.highWaterMark || c.ended))
      return d("read: emitReadable", c.length, c.ended), c.length === 0 && c.ended ? te(this) : q(this), null;
    if (f = E(f, c), f === 0 && c.ended)
      return c.length === 0 && te(this), null;
    var S = c.needReadable;
    d("need readable", S), (c.length === 0 || c.length - f < c.highWaterMark) && (S = !0, d("length less than watermark", S)), c.ended || c.reading ? (S = !1, d("reading or ended", S)) : S && (d("do read"), c.reading = !0, c.sync = !0, c.length === 0 && (c.needReadable = !0), this._read(c.highWaterMark), c.sync = !1, c.reading || (f = E(T, c)));
    var W;
    return f > 0 ? W = I(f, c) : W = null, W === null ? (c.needReadable = !0, f = 0) : c.length -= f, c.length === 0 && (c.ended || (c.needReadable = !0), T !== f && c.ended && te(this)), W !== null && this.emit("data", W), W;
  };
  function U(f, c) {
    if (!c.ended) {
      if (c.decoder) {
        var T = c.decoder.end();
        T && T.length && (c.buffer.push(T), c.length += c.objectMode ? 1 : T.length);
      }
      c.ended = !0, q(f);
    }
  }
  function q(f) {
    var c = f._readableState;
    c.needReadable = !1, c.emittedReadable || (d("emitReadable", c.flowing), c.emittedReadable = !0, c.sync ? e.nextTick(G, f) : G(f));
  }
  function G(f) {
    d("emit readable"), f.emit("readable"), R(f);
  }
  function J(f, c) {
    c.readingMore || (c.readingMore = !0, e.nextTick(N, f, c));
  }
  function N(f, c) {
    for (var T = c.length; !c.reading && !c.flowing && !c.ended && c.length < c.highWaterMark && (d("maybeReadMore read 0"), f.read(0), T !== c.length); )
      T = c.length;
    c.readingMore = !1;
  }
  v.prototype._read = function(f) {
    this.emit("error", new Error("_read() is not implemented"));
  }, v.prototype.pipe = function(f, c) {
    var T = this, S = this._readableState;
    switch (S.pipesCount) {
      case 0:
        S.pipes = f;
        break;
      case 1:
        S.pipes = [S.pipes, f];
        break;
      default:
        S.pipes.push(f);
        break;
    }
    S.pipesCount += 1, d("pipe count=%d opts=%j", S.pipesCount, c);
    var W = (!c || c.end !== !1) && f !== process.stdout && f !== process.stderr, H = W ? de : tr;
    S.endEmitted ? e.nextTick(H) : T.once("end", H), f.on("unpipe", X);
    function X(Ot, rr) {
      d("onunpipe"), Ot === T && rr && rr.hasUnpiped === !1 && (rr.hasUnpiped = !0, me());
    }
    function de() {
      d("onend"), f.end();
    }
    var xe = P(T);
    f.on("drain", xe);
    var Qe = !1;
    function me() {
      d("cleanup"), f.removeListener("close", gt), f.removeListener("finish", Rt), f.removeListener("drain", xe), f.removeListener("error", Ct), f.removeListener("unpipe", X), T.removeListener("end", de), T.removeListener("end", tr), T.removeListener("data", Tr), Qe = !0, S.awaitDrain && (!f._writableState || f._writableState.needDrain) && xe();
    }
    var $e = !1;
    T.on("data", Tr);
    function Tr(Ot) {
      d("ondata"), $e = !1;
      var rr = f.write(Ot);
      rr === !1 && !$e && ((S.pipesCount === 1 && S.pipes === f || S.pipesCount > 1 && ce(S.pipes, f) !== -1) && !Qe && (d("false write response, pause", S.awaitDrain), S.awaitDrain++, $e = !0), T.pause());
    }
    function Ct(Ot) {
      d("onerror", Ot), tr(), f.removeListener("error", Ct), n(f, "error") === 0 && f.emit("error", Ot);
    }
    b(f, "error", Ct);
    function gt() {
      f.removeListener("finish", Rt), tr();
    }
    f.once("close", gt);
    function Rt() {
      d("onfinish"), f.removeListener("close", gt), tr();
    }
    f.once("finish", Rt);
    function tr() {
      d("unpipe"), T.unpipe(f);
    }
    return f.emit("pipe", T), S.flowing || (d("pipe resume"), T.resume()), f;
  };
  function P(f) {
    return function() {
      var c = f._readableState;
      d("pipeOnDrain", c.awaitDrain), c.awaitDrain && c.awaitDrain--, c.awaitDrain === 0 && n(f, "data") && (c.flowing = !0, R(f));
    };
  }
  v.prototype.unpipe = function(f) {
    var c = this._readableState, T = { hasUnpiped: !1 };
    if (c.pipesCount === 0) return this;
    if (c.pipesCount === 1)
      return f && f !== c.pipes ? this : (f || (f = c.pipes), c.pipes = null, c.pipesCount = 0, c.flowing = !1, f && f.emit("unpipe", this, T), this);
    if (!f) {
      var S = c.pipes, W = c.pipesCount;
      c.pipes = null, c.pipesCount = 0, c.flowing = !1;
      for (var H = 0; H < W; H++)
        S[H].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var X = ce(c.pipes, f);
    return X === -1 ? this : (c.pipes.splice(X, 1), c.pipesCount -= 1, c.pipesCount === 1 && (c.pipes = c.pipes[0]), f.emit("unpipe", this, T), this);
  }, v.prototype.on = function(f, c) {
    var T = i.prototype.on.call(this, f, c);
    if (f === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (f === "readable") {
      var S = this._readableState;
      !S.endEmitted && !S.readableListening && (S.readableListening = S.needReadable = !0, S.emittedReadable = !1, S.reading ? S.length && q(this) : e.nextTick(k, this));
    }
    return T;
  }, v.prototype.addListener = v.prototype.on;
  function k(f) {
    d("readable nexttick read 0"), f.read(0);
  }
  v.prototype.resume = function() {
    var f = this._readableState;
    return f.flowing || (d("resume"), f.flowing = !0, _(this, f)), this;
  };
  function _(f, c) {
    c.resumeScheduled || (c.resumeScheduled = !0, e.nextTick(A, f, c));
  }
  function A(f, c) {
    c.reading || (d("resume read 0"), f.read(0)), c.resumeScheduled = !1, c.awaitDrain = 0, f.emit("resume"), R(f), c.flowing && !c.reading && f.read(0);
  }
  v.prototype.pause = function() {
    return d("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (d("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function R(f) {
    var c = f._readableState;
    for (d("flow", c.flowing); c.flowing && f.read() !== null; )
      ;
  }
  v.prototype.wrap = function(f) {
    var c = this, T = this._readableState, S = !1;
    f.on("end", function() {
      if (d("wrapped end"), T.decoder && !T.ended) {
        var X = T.decoder.end();
        X && X.length && c.push(X);
      }
      c.push(null);
    }), f.on("data", function(X) {
      if (d("wrapped data"), T.decoder && (X = T.decoder.write(X)), !(T.objectMode && X == null) && !(!T.objectMode && (!X || !X.length))) {
        var de = c.push(X);
        de || (S = !0, f.pause());
      }
    });
    for (var W in f)
      this[W] === void 0 && typeof f[W] == "function" && (this[W] = /* @__PURE__ */ function(X) {
        return function() {
          return f[X].apply(f, arguments);
        };
      }(W));
    for (var H = 0; H < x.length; H++)
      f.on(x[H], this.emit.bind(this, x[H]));
    return this._read = function(X) {
      d("wrapped _read", X), S && (S = !1, f.resume());
    }, this;
  }, Object.defineProperty(v.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), v._fromList = I;
  function I(f, c) {
    if (c.length === 0) return null;
    var T;
    return c.objectMode ? T = c.buffer.shift() : !f || f >= c.length ? (c.decoder ? T = c.buffer.join("") : c.buffer.length === 1 ? T = c.buffer.head.data : T = c.buffer.concat(c.length), c.buffer.clear()) : T = j(f, c.buffer, c.decoder), T;
  }
  function j(f, c, T) {
    var S;
    return f < c.head.data.length ? (S = c.head.data.slice(0, f), c.head.data = c.head.data.slice(f)) : f === c.head.data.length ? S = c.shift() : S = T ? M(f, c) : Q(f, c), S;
  }
  function M(f, c) {
    var T = c.head, S = 1, W = T.data;
    for (f -= W.length; T = T.next; ) {
      var H = T.data, X = f > H.length ? H.length : f;
      if (X === H.length ? W += H : W += H.slice(0, f), f -= X, f === 0) {
        X === H.length ? (++S, T.next ? c.head = T.next : c.head = c.tail = null) : (c.head = T, T.data = H.slice(X));
        break;
      }
      ++S;
    }
    return c.length -= S, W;
  }
  function Q(f, c) {
    var T = a.allocUnsafe(f), S = c.head, W = 1;
    for (S.data.copy(T), f -= S.data.length; S = S.next; ) {
      var H = S.data, X = f > H.length ? H.length : f;
      if (H.copy(T, T.length - f, 0, X), f -= X, f === 0) {
        X === H.length ? (++W, S.next ? c.head = S.next : c.head = c.tail = null) : (c.head = S, S.data = H.slice(X));
        break;
      }
      ++W;
    }
    return c.length -= W, T;
  }
  function te(f) {
    var c = f._readableState;
    if (c.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    c.endEmitted || (c.ended = !0, e.nextTick(V, c, f));
  }
  function V(f, c) {
    !f.endEmitted && f.length === 0 && (f.endEmitted = !0, c.readable = !1, c.emit("end"));
  }
  function ce(f, c) {
    for (var T = 0, S = f.length; T < S; T++)
      if (f[T] === c) return T;
    return -1;
  }
  return ns;
}
var is, Of;
function Vh() {
  if (Of) return is;
  Of = 1, is = n;
  var e = tn(), t = Object.create(ai());
  t.inherits = oi(), t.inherits(n, e);
  function r(o, s) {
    var l = this._transformState;
    l.transforming = !1;
    var p = l.writecb;
    if (!p)
      return this.emit("error", new Error("write callback called multiple times"));
    l.writechunk = null, l.writecb = null, s != null && this.push(s), p(o);
    var u = this._readableState;
    u.reading = !1, (u.needReadable || u.length < u.highWaterMark) && this._read(u.highWaterMark);
  }
  function n(o) {
    if (!(this instanceof n)) return new n(o);
    e.call(this, o), this._transformState = {
      afterTransform: r.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, o && (typeof o.transform == "function" && (this._transform = o.transform), typeof o.flush == "function" && (this._flush = o.flush)), this.on("prefinish", i);
  }
  function i() {
    var o = this;
    typeof this._flush == "function" ? this._flush(function(s, l) {
      a(o, s, l);
    }) : a(this, null, null);
  }
  n.prototype.push = function(o, s) {
    return this._transformState.needTransform = !1, e.prototype.push.call(this, o, s);
  }, n.prototype._transform = function(o, s, l) {
    throw new Error("_transform() is not implemented");
  }, n.prototype._write = function(o, s, l) {
    var p = this._transformState;
    if (p.writecb = l, p.writechunk = o, p.writeencoding = s, !p.transforming) {
      var u = this._readableState;
      (p.needTransform || u.needReadable || u.length < u.highWaterMark) && this._read(u.highWaterMark);
    }
  }, n.prototype._read = function(o) {
    var s = this._transformState;
    s.writechunk !== null && s.writecb && !s.transforming ? (s.transforming = !0, this._transform(s.writechunk, s.writeencoding, s.afterTransform)) : s.needTransform = !0;
  }, n.prototype._destroy = function(o, s) {
    var l = this;
    e.prototype._destroy.call(this, o, function(p) {
      s(p), l.emit("close");
    });
  };
  function a(o, s, l) {
    if (s) return o.emit("error", s);
    if (l != null && o.push(l), o._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (o._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return o.push(null);
  }
  return is;
}
var as, Pf;
function DA() {
  if (Pf) return as;
  Pf = 1, as = r;
  var e = Vh(), t = Object.create(ai());
  t.inherits = oi(), t.inherits(r, e);
  function r(n) {
    if (!(this instanceof r)) return new r(n);
    e.call(this, n);
  }
  return r.prototype._transform = function(n, i, a) {
    a(null, n);
  }, as;
}
(function(e, t) {
  var r = Ye;
  process.env.READABLE_STREAM === "disable" && r ? (e.exports = r, t = e.exports = r.Readable, t.Readable = r.Readable, t.Writable = r.Writable, t.Duplex = r.Duplex, t.Transform = r.Transform, t.PassThrough = r.PassThrough, t.Stream = r) : (t = e.exports = Wh(), t.Stream = r || t, t.Readable = t, t.Writable = zh(), t.Duplex = tn(), t.Transform = Vh(), t.PassThrough = DA());
})(Ws, Ws.exports);
var si = Ws.exports, IA = si.Duplex, Ul = IA, FA = Je, Hr = ii.Buffer;
function pe(e) {
  if (!(this instanceof pe))
    return new pe(e);
  if (this._bufs = [], this.length = 0, typeof e == "function") {
    this._callback = e;
    var t = (function(n) {
      this._callback && (this._callback(n), this._callback = null);
    }).bind(this);
    this.on("pipe", function(n) {
      n.on("error", t);
    }), this.on("unpipe", function(n) {
      n.removeListener("error", t);
    });
  } else
    this.append(e);
  Ul.call(this);
}
FA.inherits(pe, Ul);
pe.prototype._offset = function(t) {
  var r = 0, n = 0, i;
  if (t === 0) return [0, 0];
  for (; n < this._bufs.length; n++) {
    if (i = r + this._bufs[n].length, t < i || n == this._bufs.length - 1)
      return [n, t - r];
    r = i;
  }
};
pe.prototype.append = function(t) {
  var r = 0;
  if (Hr.isBuffer(t))
    this._appendBuffer(t);
  else if (Array.isArray(t))
    for (; r < t.length; r++)
      this.append(t[r]);
  else if (t instanceof pe)
    for (; r < t._bufs.length; r++)
      this.append(t._bufs[r]);
  else t != null && (typeof t == "number" && (t = t.toString()), this._appendBuffer(Hr.from(t)));
  return this;
};
pe.prototype._appendBuffer = function(t) {
  this._bufs.push(t), this.length += t.length;
};
pe.prototype._write = function(t, r, n) {
  this._appendBuffer(t), typeof n == "function" && n();
};
pe.prototype._read = function(t) {
  if (!this.length)
    return this.push(null);
  t = Math.min(t, this.length), this.push(this.slice(0, t)), this.consume(t);
};
pe.prototype.end = function(t) {
  Ul.prototype.end.call(this, t), this._callback && (this._callback(null, this.slice()), this._callback = null);
};
pe.prototype.get = function(t) {
  return this.slice(t, t + 1)[0];
};
pe.prototype.slice = function(t, r) {
  return typeof t == "number" && t < 0 && (t += this.length), typeof r == "number" && r < 0 && (r += this.length), this.copy(null, 0, t, r);
};
pe.prototype.copy = function(t, r, n, i) {
  if ((typeof n != "number" || n < 0) && (n = 0), (typeof i != "number" || i > this.length) && (i = this.length), n >= this.length || i <= 0)
    return t || Hr.alloc(0);
  var a = !!t, o = this._offset(n), s = i - n, l = s, p = a && r || 0, u = o[1], d, h;
  if (n === 0 && i == this.length) {
    if (!a)
      return this._bufs.length === 1 ? this._bufs[0] : Hr.concat(this._bufs, this.length);
    for (h = 0; h < this._bufs.length; h++)
      this._bufs[h].copy(t, p), p += this._bufs[h].length;
    return t;
  }
  if (l <= this._bufs[o[0]].length - u)
    return a ? this._bufs[o[0]].copy(t, r, u, u + l) : this._bufs[o[0]].slice(u, u + l);
  for (a || (t = Hr.allocUnsafe(s)), h = o[0]; h < this._bufs.length; h++) {
    if (d = this._bufs[h].length - u, l > d)
      this._bufs[h].copy(t, p, u), p += d;
    else {
      this._bufs[h].copy(t, p, u, u + l), p += d;
      break;
    }
    l -= d, u && (u = 0);
  }
  return t.length > p ? t.slice(0, p) : t;
};
pe.prototype.shallowSlice = function(t, r) {
  t = t || 0, r = r || this.length, t < 0 && (t += this.length), r < 0 && (r += this.length);
  var n = this._offset(t), i = this._offset(r), a = this._bufs.slice(n[0], i[0] + 1);
  return i[1] == 0 ? a.pop() : a[a.length - 1] = a[a.length - 1].slice(0, i[1]), n[1] != 0 && (a[0] = a[0].slice(n[1])), new pe(a);
};
pe.prototype.toString = function(t, r, n) {
  return this.slice(r, n).toString(t);
};
pe.prototype.consume = function(t) {
  if (t = Math.trunc(t), Number.isNaN(t) || t <= 0) return this;
  for (; this._bufs.length; )
    if (t >= this._bufs[0].length)
      t -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift();
    else {
      this._bufs[0] = this._bufs[0].slice(t), this.length -= t;
      break;
    }
  return this;
};
pe.prototype.duplicate = function() {
  for (var t = 0, r = new pe(); t < this._bufs.length; t++)
    r.append(this._bufs[t]);
  return r;
};
pe.prototype.destroy = function() {
  this._bufs.length = 0, this.length = 0, this.push(null);
};
(function() {
  var e = {
    readDoubleBE: 8,
    readDoubleLE: 8,
    readFloatBE: 4,
    readFloatLE: 4,
    readInt32BE: 4,
    readInt32LE: 4,
    readUInt32BE: 4,
    readUInt32LE: 4,
    readInt16BE: 2,
    readInt16LE: 2,
    readUInt16BE: 2,
    readUInt16LE: 2,
    readInt8: 1,
    readUInt8: 1
  };
  for (var t in e)
    (function(r) {
      pe.prototype[r] = function(n) {
        return this.slice(n, n + e[r])[r](0);
      };
    })(t);
})();
var NA = pe, $A = UA, LA = Object.prototype.hasOwnProperty;
function UA() {
  for (var e = {}, t = 0; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r)
      LA.call(r, n) && (e[n] = r[n]);
  }
  return e;
}
var Sr = {}, Ys = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(e, t) {
  var r = el, n = r.Buffer;
  function i(o, s) {
    for (var l in o)
      s[l] = o[l];
  }
  n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = r : (i(r, t), t.Buffer = a);
  function a(o, s, l) {
    return n(o, s, l);
  }
  a.prototype = Object.create(n.prototype), i(n, a), a.from = function(o, s, l) {
    if (typeof o == "number")
      throw new TypeError("Argument must not be a number");
    return n(o, s, l);
  }, a.alloc = function(o, s, l) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    var p = n(o);
    return s !== void 0 ? typeof l == "string" ? p.fill(s, l) : p.fill(s) : p.fill(0), p;
  }, a.allocUnsafe = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return n(o);
  }, a.allocUnsafeSlow = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return r.SlowBuffer(o);
  };
})(Ys, Ys.exports);
var kA = Ys.exports, BA = {}.toString, MA = Array.isArray || function(e) {
  return BA.call(e) == "[object Array]";
}, li = TypeError, Yh = Object, jA = Error, qA = EvalError, HA = RangeError, GA = ReferenceError, Xh = SyntaxError, zA = URIError, WA = Math.abs, VA = Math.floor, YA = Math.max, XA = Math.min, KA = Math.pow, JA = Math.round, QA = Number.isNaN || function(t) {
  return t !== t;
}, ZA = QA, e2 = function(t) {
  return ZA(t) || t === 0 ? t : t < 0 ? -1 : 1;
}, t2 = Object.getOwnPropertyDescriptor, ea = t2;
if (ea)
  try {
    ea([], "length");
  } catch {
    ea = null;
  }
var ci = ea, ta = Object.defineProperty || !1;
if (ta)
  try {
    ta({}, "a", { value: 1 });
  } catch {
    ta = !1;
  }
var Va = ta, os, Df;
function Kh() {
  return Df || (Df = 1, os = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, r = Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
      return !1;
    var i = 42;
    t[r] = i;
    for (var a in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(t);
    if (o.length !== 1 || o[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(t, r)
      );
      if (s.value !== i || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), os;
}
var ss, If;
function r2() {
  if (If) return ss;
  If = 1;
  var e = typeof Symbol < "u" && Symbol, t = Kh();
  return ss = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, ss;
}
var ls, Ff;
function Jh() {
  return Ff || (Ff = 1, ls = typeof Reflect < "u" && Reflect.getPrototypeOf || null), ls;
}
var cs, Nf;
function Qh() {
  if (Nf) return cs;
  Nf = 1;
  var e = Yh;
  return cs = e.getPrototypeOf || null, cs;
}
var n2 = "Function.prototype.bind called on incompatible ", i2 = Object.prototype.toString, a2 = Math.max, o2 = "[object Function]", $f = function(t, r) {
  for (var n = [], i = 0; i < t.length; i += 1)
    n[i] = t[i];
  for (var a = 0; a < r.length; a += 1)
    n[a + t.length] = r[a];
  return n;
}, s2 = function(t, r) {
  for (var n = [], i = r, a = 0; i < t.length; i += 1, a += 1)
    n[a] = t[i];
  return n;
}, l2 = function(e, t) {
  for (var r = "", n = 0; n < e.length; n += 1)
    r += e[n], n + 1 < e.length && (r += t);
  return r;
}, c2 = function(t) {
  var r = this;
  if (typeof r != "function" || i2.apply(r) !== o2)
    throw new TypeError(n2 + r);
  for (var n = s2(arguments, 1), i, a = function() {
    if (this instanceof i) {
      var u = r.apply(
        this,
        $f(n, arguments)
      );
      return Object(u) === u ? u : this;
    }
    return r.apply(
      t,
      $f(n, arguments)
    );
  }, o = a2(0, r.length - n.length), s = [], l = 0; l < o; l++)
    s[l] = "$" + l;
  if (i = Function("binder", "return function (" + l2(s, ",") + "){ return binder.apply(this,arguments); }")(a), r.prototype) {
    var p = function() {
    };
    p.prototype = r.prototype, i.prototype = new p(), p.prototype = null;
  }
  return i;
}, u2 = c2, ui = Function.prototype.bind || u2, kl = Function.prototype.call, us, Lf;
function Bl() {
  return Lf || (Lf = 1, us = Function.prototype.apply), us;
}
var f2 = typeof Reflect < "u" && Reflect && Reflect.apply, d2 = ui, h2 = Bl(), p2 = kl, m2 = f2, Zh = m2 || d2.call(p2, h2), x2 = ui, g2 = li, y2 = kl, v2 = Zh, Ml = function(t) {
  if (t.length < 1 || typeof t[0] != "function")
    throw new g2("a function is required");
  return v2(x2, y2, t);
}, fs, Uf;
function w2() {
  if (Uf) return fs;
  Uf = 1;
  var e = Ml, t = ci, r;
  try {
    r = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var n = !!r && t && t(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), i = Object, a = i.getPrototypeOf;
  return fs = n && typeof n.get == "function" ? e([n.get]) : typeof a == "function" ? (
    /** @type {import('./get')} */
    function(s) {
      return a(s == null ? s : i(s));
    }
  ) : !1, fs;
}
var ds, kf;
function ep() {
  if (kf) return ds;
  kf = 1;
  var e = Jh(), t = Qh(), r = w2();
  return ds = e ? function(i) {
    return e(i);
  } : t ? function(i) {
    if (!i || typeof i != "object" && typeof i != "function")
      throw new TypeError("getProto: not an object");
    return t(i);
  } : r ? function(i) {
    return r(i);
  } : null, ds;
}
var hs, Bf;
function E2() {
  if (Bf) return hs;
  Bf = 1;
  var e = Function.prototype.call, t = Object.prototype.hasOwnProperty, r = ui;
  return hs = r.call(e, t), hs;
}
var ee, _2 = Yh, b2 = jA, S2 = qA, A2 = HA, T2 = GA, rn = Xh, Wr = li, C2 = zA, R2 = WA, O2 = VA, P2 = YA, D2 = XA, I2 = KA, F2 = JA, N2 = e2, tp = Function, ps = function(e) {
  try {
    return tp('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, qn = ci, $2 = Va, ms = function() {
  throw new Wr();
}, L2 = qn ? function() {
  try {
    return arguments.callee, ms;
  } catch {
    try {
      return qn(arguments, "callee").get;
    } catch {
      return ms;
    }
  }
}() : ms, Fr = r2()(), _e = ep(), U2 = Qh(), k2 = Jh(), rp = Bl(), fi = kl, Lr = {}, B2 = typeof Uint8Array > "u" || !_e ? ee : _e(Uint8Array), xr = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? ee : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? ee : ArrayBuffer,
  "%ArrayIteratorPrototype%": Fr && _e ? _e([][Symbol.iterator]()) : ee,
  "%AsyncFromSyncIteratorPrototype%": ee,
  "%AsyncFunction%": Lr,
  "%AsyncGenerator%": Lr,
  "%AsyncGeneratorFunction%": Lr,
  "%AsyncIteratorPrototype%": Lr,
  "%Atomics%": typeof Atomics > "u" ? ee : Atomics,
  "%BigInt%": typeof BigInt > "u" ? ee : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? ee : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? ee : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? ee : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": b2,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": S2,
  "%Float16Array%": typeof Float16Array > "u" ? ee : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? ee : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? ee : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? ee : FinalizationRegistry,
  "%Function%": tp,
  "%GeneratorFunction%": Lr,
  "%Int8Array%": typeof Int8Array > "u" ? ee : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? ee : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? ee : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Fr && _e ? _e(_e([][Symbol.iterator]())) : ee,
  "%JSON%": typeof JSON == "object" ? JSON : ee,
  "%Map%": typeof Map > "u" ? ee : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Fr || !_e ? ee : _e((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": _2,
  "%Object.getOwnPropertyDescriptor%": qn,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? ee : Promise,
  "%Proxy%": typeof Proxy > "u" ? ee : Proxy,
  "%RangeError%": A2,
  "%ReferenceError%": T2,
  "%Reflect%": typeof Reflect > "u" ? ee : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? ee : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Fr || !_e ? ee : _e((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? ee : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Fr && _e ? _e(""[Symbol.iterator]()) : ee,
  "%Symbol%": Fr ? Symbol : ee,
  "%SyntaxError%": rn,
  "%ThrowTypeError%": L2,
  "%TypedArray%": B2,
  "%TypeError%": Wr,
  "%Uint8Array%": typeof Uint8Array > "u" ? ee : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? ee : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? ee : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? ee : Uint32Array,
  "%URIError%": C2,
  "%WeakMap%": typeof WeakMap > "u" ? ee : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? ee : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? ee : WeakSet,
  "%Function.prototype.call%": fi,
  "%Function.prototype.apply%": rp,
  "%Object.defineProperty%": $2,
  "%Object.getPrototypeOf%": U2,
  "%Math.abs%": R2,
  "%Math.floor%": O2,
  "%Math.max%": P2,
  "%Math.min%": D2,
  "%Math.pow%": I2,
  "%Math.round%": F2,
  "%Math.sign%": N2,
  "%Reflect.getPrototypeOf%": k2
};
if (_e)
  try {
    null.error;
  } catch (e) {
    var M2 = _e(_e(e));
    xr["%Error.prototype%"] = M2;
  }
var j2 = function e(t) {
  var r;
  if (t === "%AsyncFunction%")
    r = ps("async function () {}");
  else if (t === "%GeneratorFunction%")
    r = ps("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    r = ps("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var i = e("%AsyncGenerator%");
    i && _e && (r = _e(i.prototype));
  }
  return xr[t] = r, r;
}, Mf = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, di = ui, ya = E2(), q2 = di.call(fi, Array.prototype.concat), H2 = di.call(rp, Array.prototype.splice), jf = di.call(fi, String.prototype.replace), va = di.call(fi, String.prototype.slice), G2 = di.call(fi, RegExp.prototype.exec), z2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, W2 = /\\(\\)?/g, V2 = function(t) {
  var r = va(t, 0, 1), n = va(t, -1);
  if (r === "%" && n !== "%")
    throw new rn("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new rn("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return jf(t, z2, function(a, o, s, l) {
    i[i.length] = s ? jf(l, W2, "$1") : o || a;
  }), i;
}, Y2 = function(t, r) {
  var n = t, i;
  if (ya(Mf, n) && (i = Mf[n], n = "%" + i[0] + "%"), ya(xr, n)) {
    var a = xr[n];
    if (a === Lr && (a = j2(n)), typeof a > "u" && !r)
      throw new Wr("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: n,
      value: a
    };
  }
  throw new rn("intrinsic " + t + " does not exist!");
}, np = function(t, r) {
  if (typeof t != "string" || t.length === 0)
    throw new Wr("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new Wr('"allowMissing" argument must be a boolean');
  if (G2(/^%?[^%]*%?$/, t) === null)
    throw new rn("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = V2(t), i = n.length > 0 ? n[0] : "", a = Y2("%" + i + "%", r), o = a.name, s = a.value, l = !1, p = a.alias;
  p && (i = p[0], H2(n, q2([0, 1], p)));
  for (var u = 1, d = !0; u < n.length; u += 1) {
    var h = n[u], m = va(h, 0, 1), w = va(h, -1);
    if ((m === '"' || m === "'" || m === "`" || w === '"' || w === "'" || w === "`") && m !== w)
      throw new rn("property names with quotes must have matching quotes");
    if ((h === "constructor" || !d) && (l = !0), i += "." + h, o = "%" + i + "%", ya(xr, o))
      s = xr[o];
    else if (s != null) {
      if (!(h in s)) {
        if (!r)
          throw new Wr("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (qn && u + 1 >= n.length) {
        var x = qn(s, h);
        d = !!x, d && "get" in x && !("originalValue" in x.get) ? s = x.get : s = s[h];
      } else
        d = ya(s, h), s = s[h];
      d && !l && (xr[o] = s);
    }
  }
  return s;
}, ip = np, ap = Ml, X2 = ap([ip("%String.prototype.indexOf%")]), op = function(t, r) {
  var n = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    ip(t, !!r)
  );
  return typeof n == "function" && X2(t, ".prototype.") > -1 ? ap(
    /** @type {const} */
    [n]
  ) : n;
}, xs, qf;
function K2() {
  if (qf) return xs;
  qf = 1;
  var e = Function.prototype.toString, t = typeof Reflect == "object" && Reflect !== null && Reflect.apply, r, n;
  if (typeof t == "function" && typeof Object.defineProperty == "function")
    try {
      r = Object.defineProperty({}, "length", {
        get: function() {
          throw n;
        }
      }), n = {}, t(function() {
        throw 42;
      }, null, r);
    } catch (v) {
      v !== n && (t = null);
    }
  else
    t = null;
  var i = /^\s*class\b/, a = function(O) {
    try {
      var D = e.call(O);
      return i.test(D);
    } catch {
      return !1;
    }
  }, o = function(O) {
    try {
      return a(O) ? !1 : (e.call(O), !0);
    } catch {
      return !1;
    }
  }, s = Object.prototype.toString, l = "[object Object]", p = "[object Function]", u = "[object GeneratorFunction]", d = "[object HTMLAllCollection]", h = "[object HTML document.all class]", m = "[object HTMLCollection]", w = typeof Symbol == "function" && !!Symbol.toStringTag, x = !(0 in [,]), b = function() {
    return !1;
  };
  if (typeof document == "object") {
    var g = document.all;
    s.call(g) === s.call(document.all) && (b = function(O) {
      if ((x || !O) && (typeof O > "u" || typeof O == "object"))
        try {
          var D = s.call(O);
          return (D === d || D === h || D === m || D === l) && O("") == null;
        } catch {
        }
      return !1;
    });
  }
  return xs = t ? function(O) {
    if (b(O))
      return !0;
    if (!O || typeof O != "function" && typeof O != "object")
      return !1;
    try {
      t(O, null, r);
    } catch (D) {
      if (D !== n)
        return !1;
    }
    return !a(O) && o(O);
  } : function(O) {
    if (b(O))
      return !0;
    if (!O || typeof O != "function" && typeof O != "object")
      return !1;
    if (w)
      return o(O);
    if (a(O))
      return !1;
    var D = s.call(O);
    return D !== p && D !== u && !/^\[object HTML/.test(D) ? !1 : o(O);
  }, xs;
}
var gs, Hf;
function J2() {
  if (Hf) return gs;
  Hf = 1;
  var e = K2(), t = Object.prototype.toString, r = Object.prototype.hasOwnProperty, n = function(l, p, u) {
    for (var d = 0, h = l.length; d < h; d++)
      r.call(l, d) && (u == null ? p(l[d], d, l) : p.call(u, l[d], d, l));
  }, i = function(l, p, u) {
    for (var d = 0, h = l.length; d < h; d++)
      u == null ? p(l.charAt(d), d, l) : p.call(u, l.charAt(d), d, l);
  }, a = function(l, p, u) {
    for (var d in l)
      r.call(l, d) && (u == null ? p(l[d], d, l) : p.call(u, l[d], d, l));
  };
  function o(s) {
    return t.call(s) === "[object Array]";
  }
  return gs = function(l, p, u) {
    if (!e(p))
      throw new TypeError("iterator must be a function");
    var d;
    arguments.length >= 3 && (d = u), o(l) ? n(l, p, d) : typeof l == "string" ? i(l, p, d) : a(l, p, d);
  }, gs;
}
var ys, Gf;
function Q2() {
  return Gf || (Gf = 1, ys = [
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), ys;
}
var vs, zf;
function Z2() {
  if (zf) return vs;
  zf = 1;
  var e = Q2(), t = typeof globalThis > "u" ? ie : globalThis;
  return vs = function() {
    for (var n = [], i = 0; i < e.length; i++)
      typeof t[e[i]] == "function" && (n[n.length] = e[i]);
    return n;
  }, vs;
}
var ws = { exports: {} }, Es, Wf;
function eT() {
  if (Wf) return Es;
  Wf = 1;
  var e = Va, t = Xh, r = li, n = ci;
  return Es = function(a, o, s) {
    if (!a || typeof a != "object" && typeof a != "function")
      throw new r("`obj` must be an object or a function`");
    if (typeof o != "string" && typeof o != "symbol")
      throw new r("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new r("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new r("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new r("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new r("`loose`, if provided, must be a boolean");
    var l = arguments.length > 3 ? arguments[3] : null, p = arguments.length > 4 ? arguments[4] : null, u = arguments.length > 5 ? arguments[5] : null, d = arguments.length > 6 ? arguments[6] : !1, h = !!n && n(a, o);
    if (e)
      e(a, o, {
        configurable: u === null && h ? h.configurable : !u,
        enumerable: l === null && h ? h.enumerable : !l,
        value: s,
        writable: p === null && h ? h.writable : !p
      });
    else if (d || !l && !p && !u)
      a[o] = s;
    else
      throw new t("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, Es;
}
var _s, Vf;
function tT() {
  if (Vf) return _s;
  Vf = 1;
  var e = Va, t = function() {
    return !!e;
  };
  return t.hasArrayLengthDefineBug = function() {
    if (!e)
      return null;
    try {
      return e([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, _s = t, _s;
}
var bs, Yf;
function rT() {
  if (Yf) return bs;
  Yf = 1;
  var e = np, t = eT(), r = tT()(), n = ci, i = li, a = e("%Math.floor%");
  return bs = function(s, l) {
    if (typeof s != "function")
      throw new i("`fn` is not a function");
    if (typeof l != "number" || l < 0 || l > 4294967295 || a(l) !== l)
      throw new i("`length` must be a positive 32-bit integer");
    var p = arguments.length > 2 && !!arguments[2], u = !0, d = !0;
    if ("length" in s && n) {
      var h = n(s, "length");
      h && !h.configurable && (u = !1), h && !h.writable && (d = !1);
    }
    return (u || d || !p) && (r ? t(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      l,
      !0,
      !0
    ) : t(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      l
    )), s;
  }, bs;
}
var Ss, Xf;
function nT() {
  if (Xf) return Ss;
  Xf = 1;
  var e = ui, t = Bl(), r = Zh;
  return Ss = function() {
    return r(e, t, arguments);
  }, Ss;
}
var Kf;
function iT() {
  return Kf || (Kf = 1, function(e) {
    var t = rT(), r = Va, n = Ml, i = nT();
    e.exports = function(o) {
      var s = n(arguments), l = o.length - (arguments.length - 1);
      return t(
        s,
        1 + (l > 0 ? l : 0),
        !0
      );
    }, r ? r(e.exports, "apply", { value: i }) : e.exports.apply = i;
  }(ws)), ws.exports;
}
var As, Jf;
function aT() {
  if (Jf) return As;
  Jf = 1;
  var e = Kh();
  return As = function() {
    return e() && !!Symbol.toStringTag;
  }, As;
}
var Ts, Qf;
function oT() {
  if (Qf) return Ts;
  Qf = 1;
  var e = J2(), t = Z2(), r = iT(), n = op, i = ci, a = ep(), o = n("Object.prototype.toString"), s = aT()(), l = typeof globalThis > "u" ? ie : globalThis, p = t(), u = n("String.prototype.slice"), d = n("Array.prototype.indexOf", !0) || function(b, g) {
    for (var v = 0; v < b.length; v += 1)
      if (b[v] === g)
        return v;
    return -1;
  }, h = { __proto__: null };
  s && i && a ? e(p, function(x) {
    var b = new l[x]();
    if (Symbol.toStringTag in b && a) {
      var g = a(b), v = i(g, Symbol.toStringTag);
      if (!v && g) {
        var O = a(g);
        v = i(O, Symbol.toStringTag);
      }
      if (v && v.get) {
        var D = r(v.get);
        h[
          /** @type {`$${import('.').TypedArrayName}`} */
          "$" + x
        ] = D;
      }
    }
  }) : e(p, function(x) {
    var b = new l[x](), g = b.slice || b.set;
    if (g) {
      var v = (
        /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
        // @ts-expect-error TODO FIXME
        r(g)
      );
      h[
        /** @type {`$${import('.').TypedArrayName}`} */
        "$" + x
      ] = v;
    }
  });
  var m = function(b) {
    var g = !1;
    return e(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      h,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(v, O) {
        if (!g)
          try {
            "$" + v(b) === O && (g = /** @type {import('.').TypedArrayName} */
            u(O, 1));
          } catch {
          }
      }
    ), g;
  }, w = function(b) {
    var g = !1;
    return e(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      h,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(v, O) {
        if (!g)
          try {
            v(b), g = /** @type {import('.').TypedArrayName} */
            u(O, 1);
          } catch {
          }
      }
    ), g;
  };
  return Ts = function(b) {
    if (!b || typeof b != "object")
      return !1;
    if (!s) {
      var g = u(o(b), 8, -1);
      return d(p, g) > -1 ? g : g !== "Object" ? !1 : w(b);
    }
    return i ? m(b) : null;
  }, Ts;
}
var Cs, Zf;
function sT() {
  if (Zf) return Cs;
  Zf = 1;
  var e = oT();
  return Cs = function(r) {
    return !!e(r);
  }, Cs;
}
var lT = li, cT = op, uT = cT("TypedArray.prototype.buffer", !0), fT = sT(), dT = uT || function(t) {
  if (!fT(t))
    throw new lT("Not a Typed Array");
  return t.buffer;
}, nt = kA.Buffer, hT = MA, pT = dT, mT = ArrayBuffer.isView || function(t) {
  try {
    return pT(t), !0;
  } catch {
    return !1;
  }
}, xT = typeof Uint8Array < "u", sp = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", gT = sp && (nt.prototype instanceof Uint8Array || nt.TYPED_ARRAY_SUPPORT), lp = function(t, r) {
  if (nt.isBuffer(t))
    return t.constructor && !("isBuffer" in t) ? nt.from(t) : t;
  if (typeof t == "string")
    return nt.from(t, r);
  if (sp && mT(t)) {
    if (t.byteLength === 0)
      return nt.alloc(0);
    if (gT) {
      var n = nt.from(t.buffer, t.byteOffset, t.byteLength);
      if (n.byteLength === t.byteLength)
        return n;
    }
    var i = t instanceof Uint8Array ? t : new Uint8Array(t.buffer, t.byteOffset, t.byteLength), a = nt.from(i);
    if (a.length === t.byteLength)
      return a;
  }
  if (xT && t instanceof Uint8Array)
    return nt.from(t);
  var o = hT(t);
  if (o)
    for (var s = 0; s < t.length; s += 1) {
      var l = t[s];
      if (typeof l != "number" || l < 0 || l > 255 || ~~l !== l)
        throw new RangeError("Array items must be numbers in the range 0-255.");
    }
  if (o || nt.isBuffer(t) && t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t))
    return nt.from(t);
  throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
}, yT = function() {
  try {
    if (!Buffer.isEncoding("latin1"))
      return !1;
    var e = Buffer.alloc ? Buffer.alloc(4) : new Buffer(4);
    return e.fill("ab", "ucs2"), e.toString("hex") === "61006200";
  } catch {
    return !1;
  }
}();
function vT(e) {
  return e.length === 1 && e.charCodeAt(0) < 256;
}
function Wi(e, t, r, n) {
  if (r < 0 || n > e.length)
    throw new RangeError("Out of range index");
  return r = r >>> 0, n = n === void 0 ? e.length : n >>> 0, n > r && e.fill(t, r, n), e;
}
function wT(e, t, r, n) {
  if (r < 0 || n > e.length)
    throw new RangeError("Out of range index");
  if (n <= r)
    return e;
  r = r >>> 0, n = n === void 0 ? e.length : n >>> 0;
  for (var i = r, a = t.length; i <= n - a; )
    t.copy(e, i), i += a;
  return i !== n && t.copy(e, i, 0, n - i), e;
}
function ET(e, t, r, n, i) {
  if (yT)
    return e.fill(t, r, n, i);
  if (typeof t == "number")
    return Wi(e, t, r, n);
  if (typeof t == "string") {
    if (typeof r == "string" ? (i = r, r = 0, n = e.length) : typeof n == "string" && (i = n, n = e.length), i !== void 0 && typeof i != "string")
      throw new TypeError("encoding must be a string");
    if (i === "latin1" && (i = "binary"), typeof i == "string" && !Buffer.isEncoding(i))
      throw new TypeError("Unknown encoding: " + i);
    if (t === "")
      return Wi(e, 0, r, n);
    if (vT(t))
      return Wi(e, t.charCodeAt(0), r, n);
    t = new Buffer(t, i);
  }
  return Buffer.isBuffer(t) ? wT(e, t, r, n) : Wi(e, 0, r, n);
}
var _T = ET;
function bT(e) {
  if (typeof e != "number")
    throw new TypeError('"size" argument must be a number');
  if (e < 0)
    throw new RangeError('"size" argument must not be negative');
  return Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e);
}
var ST = bT, ed = _T, AT = ST, cp = function(t, r, n) {
  if (typeof t != "number")
    throw new TypeError('"size" argument must be a number');
  if (t < 0)
    throw new RangeError('"size" argument must not be negative');
  if (Buffer.alloc)
    return Buffer.alloc(t, r, n);
  var i = AT(t);
  return t === 0 ? i : r === void 0 ? ed(i, 0) : (typeof n != "string" && (n = void 0), ed(i, r, n));
}, TT = lp, CT = cp, RT = "0000000000000000000", OT = "7777777777777777777", up = 48, PT = "ustar\x0000", DT = parseInt("7777", 8), IT = function(e, t, r) {
  return typeof e != "number" ? r : (e = ~~e, e >= t ? t : e >= 0 || (e += t, e >= 0) ? e : 0);
}, FT = function(e) {
  switch (e) {
    case 0:
      return "file";
    case 1:
      return "link";
    case 2:
      return "symlink";
    case 3:
      return "character-device";
    case 4:
      return "block-device";
    case 5:
      return "directory";
    case 6:
      return "fifo";
    case 7:
      return "contiguous-file";
    case 72:
      return "pax-header";
    case 55:
      return "pax-global-header";
    case 27:
      return "gnu-long-link-path";
    case 28:
    case 30:
      return "gnu-long-path";
  }
  return null;
}, NT = function(e) {
  switch (e) {
    case "file":
      return 0;
    case "link":
      return 1;
    case "symlink":
      return 2;
    case "character-device":
      return 3;
    case "block-device":
      return 4;
    case "directory":
      return 5;
    case "fifo":
      return 6;
    case "contiguous-file":
      return 7;
    case "pax-header":
      return 72;
  }
  return 0;
}, fp = function(e, t, r, n) {
  for (; r < n; r++)
    if (e[r] === t) return r;
  return n;
}, dp = function(e) {
  for (var t = 256, r = 0; r < 148; r++) t += e[r];
  for (var n = 156; n < 512; n++) t += e[n];
  return t;
}, Nt = function(e, t) {
  return e = e.toString(8), e.length > t ? OT.slice(0, t) + " " : RT.slice(0, t - e.length) + e + " ";
};
function $T(e) {
  var t;
  if (e[0] === 128) t = !0;
  else if (e[0] === 255) t = !1;
  else return null;
  for (var r = [], n = e.length - 1; n > 0; n--) {
    var i = e[n];
    t ? r.push(i) : r.push(255 - i);
  }
  var a = 0, o = r.length;
  for (n = 0; n < o; n++)
    a += r[n] * Math.pow(256, n);
  return t ? a : -1 * a;
}
var $t = function(e, t, r) {
  if (e = e.slice(t, t + r), t = 0, e[t] & 128)
    return $T(e);
  for (; t < e.length && e[t] === 32; ) t++;
  for (var n = IT(fp(e, 32, t, e.length), e.length, e.length); t < n && e[t] === 0; ) t++;
  return n === t ? 0 : parseInt(e.slice(t, n).toString(), 8);
}, Ur = function(e, t, r, n) {
  return e.slice(t, fp(e, 0, t, t + r)).toString(n);
}, Rs = function(e) {
  var t = Buffer.byteLength(e), r = Math.floor(Math.log(t) / Math.log(10)) + 1;
  return t + r >= Math.pow(10, r) && r++, t + r + e;
};
Sr.decodeLongPath = function(e, t) {
  return Ur(e, 0, e.length, t);
};
Sr.encodePax = function(e) {
  var t = "";
  e.name && (t += Rs(" path=" + e.name + `
`)), e.linkname && (t += Rs(" linkpath=" + e.linkname + `
`));
  var r = e.pax;
  if (r)
    for (var n in r)
      t += Rs(" " + n + "=" + r[n] + `
`);
  return TT(t);
};
Sr.decodePax = function(e) {
  for (var t = {}; e.length; ) {
    for (var r = 0; r < e.length && e[r] !== 32; ) r++;
    var n = parseInt(e.slice(0, r).toString(), 10);
    if (!n) return t;
    var i = e.slice(r + 1, n - 1).toString(), a = i.indexOf("=");
    if (a === -1) return t;
    t[i.slice(0, a)] = i.slice(a + 1), e = e.slice(n);
  }
  return t;
};
Sr.encode = function(e) {
  var t = CT(512), r = e.name, n = "";
  if (e.typeflag === 5 && r[r.length - 1] !== "/" && (r += "/"), Buffer.byteLength(r) !== r.length) return null;
  for (; Buffer.byteLength(r) > 100; ) {
    var i = r.indexOf("/");
    if (i === -1) return null;
    n += n ? "/" + r.slice(0, i) : r.slice(0, i), r = r.slice(i + 1);
  }
  return Buffer.byteLength(r) > 100 || Buffer.byteLength(n) > 155 || e.linkname && Buffer.byteLength(e.linkname) > 100 ? null : (t.write(r), t.write(Nt(e.mode & DT, 6), 100), t.write(Nt(e.uid, 6), 108), t.write(Nt(e.gid, 6), 116), t.write(Nt(e.size, 11), 124), t.write(Nt(e.mtime.getTime() / 1e3 | 0, 11), 136), t[156] = up + NT(e.type), e.linkname && t.write(e.linkname, 157), t.write(PT, 257), e.uname && t.write(e.uname, 265), e.gname && t.write(e.gname, 297), t.write(Nt(e.devmajor || 0, 6), 329), t.write(Nt(e.devminor || 0, 6), 337), n && t.write(n, 345), t.write(Nt(dp(t), 6), 148), t);
};
Sr.decode = function(e, t) {
  var r = e[156] === 0 ? 0 : e[156] - up, n = Ur(e, 0, 100, t), i = $t(e, 100, 8), a = $t(e, 108, 8), o = $t(e, 116, 8), s = $t(e, 124, 12), l = $t(e, 136, 12), p = FT(r), u = e[157] === 0 ? null : Ur(e, 157, 100, t), d = Ur(e, 265, 32), h = Ur(e, 297, 32), m = $t(e, 329, 8), w = $t(e, 337, 8);
  e[345] && (n = Ur(e, 345, 155, t) + "/" + n), r === 0 && n && n[n.length - 1] === "/" && (r = 5);
  var x = dp(e);
  if (x === 8 * 32) return null;
  if (x !== $t(e, 148, 8)) throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
  return {
    name: n,
    mode: i,
    uid: a,
    gid: o,
    size: s,
    mtime: new Date(1e3 * l),
    type: p,
    linkname: u,
    uname: d,
    gname: h,
    devmajor: m,
    devminor: w
  };
};
var hp = Je, LT = NA, UT = $A, yn = Sr, pp = si.Writable, mp = si.PassThrough, xp = function() {
}, td = function(e) {
  return e &= 511, e && 512 - e;
}, kT = function(e, t) {
  var r = new Ya(e, t);
  return r.end(), r;
}, BT = function(e, t) {
  return t.path && (e.name = t.path), t.linkpath && (e.linkname = t.linkpath), t.size && (e.size = parseInt(t.size, 10)), e.pax = t, e;
}, Ya = function(e, t) {
  this._parent = e, this.offset = t, mp.call(this);
};
hp.inherits(Ya, mp);
Ya.prototype.destroy = function(e) {
  this._parent.destroy(e);
};
var St = function(e) {
  if (!(this instanceof St)) return new St(e);
  pp.call(this, e), e = e || {}, this._offset = 0, this._buffer = LT(), this._missing = 0, this._partial = !1, this._onparse = xp, this._header = null, this._stream = null, this._overflow = null, this._cb = null, this._locked = !1, this._destroyed = !1, this._pax = null, this._paxGlobal = null, this._gnuLongPath = null, this._gnuLongLinkPath = null;
  var t = this, r = t._buffer, n = function() {
    t._continue();
  }, i = function(h) {
    if (t._locked = !1, h) return t.destroy(h);
    t._stream || n();
  }, a = function() {
    t._stream = null;
    var h = td(t._header.size);
    h ? t._parse(h, o) : t._parse(512, d), t._locked || n();
  }, o = function() {
    t._buffer.consume(td(t._header.size)), t._parse(512, d), n();
  }, s = function() {
    var h = t._header.size;
    t._paxGlobal = yn.decodePax(r.slice(0, h)), r.consume(h), a();
  }, l = function() {
    var h = t._header.size;
    t._pax = yn.decodePax(r.slice(0, h)), t._paxGlobal && (t._pax = UT(t._paxGlobal, t._pax)), r.consume(h), a();
  }, p = function() {
    var h = t._header.size;
    this._gnuLongPath = yn.decodeLongPath(r.slice(0, h), e.filenameEncoding), r.consume(h), a();
  }, u = function() {
    var h = t._header.size;
    this._gnuLongLinkPath = yn.decodeLongPath(r.slice(0, h), e.filenameEncoding), r.consume(h), a();
  }, d = function() {
    var h = t._offset, m;
    try {
      m = t._header = yn.decode(r.slice(0, 512), e.filenameEncoding);
    } catch (w) {
      t.emit("error", w);
    }
    if (r.consume(512), !m) {
      t._parse(512, d), n();
      return;
    }
    if (m.type === "gnu-long-path") {
      t._parse(m.size, p), n();
      return;
    }
    if (m.type === "gnu-long-link-path") {
      t._parse(m.size, u), n();
      return;
    }
    if (m.type === "pax-global-header") {
      t._parse(m.size, s), n();
      return;
    }
    if (m.type === "pax-header") {
      t._parse(m.size, l), n();
      return;
    }
    if (t._gnuLongPath && (m.name = t._gnuLongPath, t._gnuLongPath = null), t._gnuLongLinkPath && (m.linkname = t._gnuLongLinkPath, t._gnuLongLinkPath = null), t._pax && (t._header = m = BT(m, t._pax), t._pax = null), t._locked = !0, !m.size || m.type === "directory") {
      t._parse(512, d), t.emit("entry", m, kT(t, h), i);
      return;
    }
    t._stream = new Ya(t, h), t.emit("entry", m, t._stream, i), t._parse(m.size, a), n();
  };
  this._onheader = d, this._parse(512, d);
};
hp.inherits(St, pp);
St.prototype.destroy = function(e) {
  this._destroyed || (this._destroyed = !0, e && this.emit("error", e), this.emit("close"), this._stream && this._stream.emit("close"));
};
St.prototype._parse = function(e, t) {
  this._destroyed || (this._offset += e, this._missing = e, t === this._onheader && (this._partial = !1), this._onparse = t);
};
St.prototype._continue = function() {
  if (!this._destroyed) {
    var e = this._cb;
    this._cb = xp, this._overflow ? this._write(this._overflow, void 0, e) : e();
  }
};
St.prototype._write = function(e, t, r) {
  if (!this._destroyed) {
    var n = this._stream, i = this._buffer, a = this._missing;
    if (e.length && (this._partial = !0), e.length < a)
      return this._missing -= e.length, this._overflow = null, n ? n.write(e, r) : (i.append(e), r());
    this._cb = r, this._missing = 0;
    var o = null;
    e.length > a && (o = e.slice(a), e = e.slice(0, a)), n ? n.end(e) : i.append(e), this._overflow = o, this._onparse();
  }
};
St.prototype._final = function(e) {
  if (this._partial) return this.destroy(new Error("Unexpected end of data"));
  e();
};
var MT = St, jT = Re.constants || Td, jl = { exports: {} }, qT = gp;
function gp(e, t) {
  if (e && t) return gp(e)(t);
  if (typeof e != "function")
    throw new TypeError("need wrapper function");
  return Object.keys(e).forEach(function(n) {
    r[n] = e[n];
  }), r;
  function r() {
    for (var n = new Array(arguments.length), i = 0; i < n.length; i++)
      n[i] = arguments[i];
    var a = e.apply(this, n), o = n[n.length - 1];
    return typeof a == "function" && a !== o && Object.keys(o).forEach(function(s) {
      a[s] = o[s];
    }), a;
  }
}
var yp = qT;
jl.exports = yp(ra);
jl.exports.strict = yp(vp);
ra.proto = ra(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return ra(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return vp(this);
    },
    configurable: !0
  });
});
function ra(e) {
  var t = function() {
    return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
  };
  return t.called = !1, t;
}
function vp(e) {
  var t = function() {
    if (t.called)
      throw new Error(t.onceError);
    return t.called = !0, t.value = e.apply(this, arguments);
  }, r = e.name || "Function wrapped with `once`";
  return t.onceError = r + " shouldn't be called more than once", t.called = !1, t;
}
var HT = jl.exports, GT = HT, zT = function() {
}, WT = ie.Bare ? queueMicrotask : process.nextTick.bind(process), VT = function(e) {
  return e.setHeader && typeof e.abort == "function";
}, YT = function(e) {
  return e.stdio && Array.isArray(e.stdio) && e.stdio.length === 3;
}, wp = function(e, t, r) {
  if (typeof t == "function") return wp(e, null, t);
  t || (t = {}), r = GT(r || zT);
  var n = e._writableState, i = e._readableState, a = t.readable || t.readable !== !1 && e.readable, o = t.writable || t.writable !== !1 && e.writable, s = !1, l = function() {
    e.writable || p();
  }, p = function() {
    o = !1, a || r.call(e);
  }, u = function() {
    a = !1, o || r.call(e);
  }, d = function(b) {
    r.call(e, b ? new Error("exited with error code: " + b) : null);
  }, h = function(b) {
    r.call(e, b);
  }, m = function() {
    WT(w);
  }, w = function() {
    if (!s) {
      if (a && !(i && i.ended && !i.destroyed)) return r.call(e, new Error("premature close"));
      if (o && !(n && n.ended && !n.destroyed)) return r.call(e, new Error("premature close"));
    }
  }, x = function() {
    e.req.on("finish", p);
  };
  return VT(e) ? (e.on("complete", p), e.on("abort", m), e.req ? x() : e.on("request", x)) : o && !n && (e.on("end", l), e.on("close", l)), YT(e) && e.on("exit", d), e.on("end", u), e.on("finish", p), t.error !== !1 && e.on("error", h), e.on("close", m), function() {
    s = !0, e.removeListener("complete", p), e.removeListener("abort", m), e.removeListener("request", x), e.req && e.req.removeListener("finish", p), e.removeListener("end", l), e.removeListener("close", l), e.removeListener("finish", p), e.removeListener("exit", d), e.removeListener("end", u), e.removeListener("error", h), e.removeListener("close", m);
  };
}, XT = wp, Nr = jT, rd = XT, Xa = Je, KT = cp, JT = lp, Ep = si.Readable, cn = si.Writable, QT = ex.StringDecoder, na = Sr, ZT = parseInt("755", 8), eC = parseInt("644", 8), _p = KT(1024), ql = function() {
}, Xs = function(e, t) {
  t &= 511, t && e.push(_p.slice(0, 512 - t));
};
function tC(e) {
  switch (e & Nr.S_IFMT) {
    case Nr.S_IFBLK:
      return "block-device";
    case Nr.S_IFCHR:
      return "character-device";
    case Nr.S_IFDIR:
      return "directory";
    case Nr.S_IFIFO:
      return "fifo";
    case Nr.S_IFLNK:
      return "symlink";
  }
  return "file";
}
var Ka = function(e) {
  cn.call(this), this.written = 0, this._to = e, this._destroyed = !1;
};
Xa.inherits(Ka, cn);
Ka.prototype._write = function(e, t, r) {
  if (this.written += e.length, this._to.push(e)) return r();
  this._to._drain = r;
};
Ka.prototype.destroy = function() {
  this._destroyed || (this._destroyed = !0, this.emit("close"));
};
var Ja = function() {
  cn.call(this), this.linkname = "", this._decoder = new QT("utf-8"), this._destroyed = !1;
};
Xa.inherits(Ja, cn);
Ja.prototype._write = function(e, t, r) {
  this.linkname += this._decoder.write(e), r();
};
Ja.prototype.destroy = function() {
  this._destroyed || (this._destroyed = !0, this.emit("close"));
};
var Hn = function() {
  cn.call(this), this._destroyed = !1;
};
Xa.inherits(Hn, cn);
Hn.prototype._write = function(e, t, r) {
  r(new Error("No body allowed for this entry"));
};
Hn.prototype.destroy = function() {
  this._destroyed || (this._destroyed = !0, this.emit("close"));
};
var pt = function(e) {
  if (!(this instanceof pt)) return new pt(e);
  Ep.call(this, e), this._drain = ql, this._finalized = !1, this._finalizing = !1, this._destroyed = !1, this._stream = null;
};
Xa.inherits(pt, Ep);
pt.prototype.entry = function(e, t, r) {
  if (this._stream) throw new Error("already piping an entry");
  if (!(this._finalized || this._destroyed)) {
    typeof t == "function" && (r = t, t = null), r || (r = ql);
    var n = this;
    if ((!e.size || e.type === "symlink") && (e.size = 0), e.type || (e.type = tC(e.mode)), e.mode || (e.mode = e.type === "directory" ? ZT : eC), e.uid || (e.uid = 0), e.gid || (e.gid = 0), e.mtime || (e.mtime = /* @__PURE__ */ new Date()), typeof t == "string" && (t = JT(t)), Buffer.isBuffer(t))
      return e.size = t.length, this._encode(e), this.push(t), Xs(n, e.size), process.nextTick(r), new Hn();
    if (e.type === "symlink" && !e.linkname) {
      var i = new Ja();
      return rd(i, function(o) {
        if (o)
          return n.destroy(), r(o);
        e.linkname = i.linkname, n._encode(e), r();
      }), i;
    }
    if (this._encode(e), e.type !== "file" && e.type !== "contiguous-file")
      return process.nextTick(r), new Hn();
    var a = new Ka(this);
    return this._stream = a, rd(a, function(o) {
      if (n._stream = null, o)
        return n.destroy(), r(o);
      if (a.written !== e.size)
        return n.destroy(), r(new Error("size mismatch"));
      Xs(n, e.size), n._finalizing && n.finalize(), r();
    }), a;
  }
};
pt.prototype.finalize = function() {
  if (this._stream) {
    this._finalizing = !0;
    return;
  }
  this._finalized || (this._finalized = !0, this.push(_p), this.push(null));
};
pt.prototype.destroy = function(e) {
  this._destroyed || (this._destroyed = !0, e && this.emit("error", e), this.emit("close"), this._stream && this._stream.destroy && this._stream.destroy());
};
pt.prototype._encode = function(e) {
  if (!e.pax) {
    var t = na.encode(e);
    if (t) {
      this.push(t);
      return;
    }
  }
  this._encodePax(e);
};
pt.prototype._encodePax = function(e) {
  var t = na.encodePax({
    name: e.name,
    linkname: e.linkname,
    pax: e.pax
  }), r = {
    name: "PaxHeader",
    mode: e.mode,
    uid: e.uid,
    gid: e.gid,
    size: t.length,
    mtime: e.mtime,
    type: "pax-header",
    linkname: e.linkname && "PaxHeader",
    uname: e.uname,
    gname: e.gname,
    devmajor: e.devmajor,
    devminor: e.devminor
  };
  this.push(na.encode(r)), this.push(t), Xs(this, t.length), r.size = e.size, r.type = e.type, this.push(na.encode(r));
};
pt.prototype._read = function(e) {
  var t = this._drain;
  this._drain = ql, t();
};
var rC = pt;
Ll.extract = MT;
Ll.pack = rC;
const nd = jh, nC = $l, iC = Ll;
var Hl = () => (e) => {
  if (!Buffer.isBuffer(e) && !nC(e))
    return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof e}`));
  if (Buffer.isBuffer(e) && (!nd(e) || nd(e).ext !== "tar"))
    return Promise.resolve([]);
  const t = iC.extract(), r = [];
  t.on("entry", (i, a, o) => {
    const s = [];
    a.on("data", (l) => s.push(l)), a.on("end", () => {
      const l = {
        data: Buffer.concat(s),
        mode: i.mode,
        mtime: i.mtime,
        path: i.name,
        type: i.type
      };
      (i.type === "symlink" || i.type === "link") && (l.linkname = i.linkname), r.push(l), o();
    });
  });
  const n = new Promise((i, a) => {
    Buffer.isBuffer(e) || e.on("error", a), t.on("finish", () => i(r)), t.on("error", a);
  });
  return t.then = n.then.bind(n), t.catch = n.catch.bind(n), Buffer.isBuffer(e) ? t.end(e) : e.pipe(t), t;
};
const Vr = (e) => Array.from(e).map((t) => t.charCodeAt(0)), aC = Vr("META-INF/mozilla.rsa"), oC = Vr("[Content_Types].xml"), sC = Vr("_rels/.rels");
var lC = (e) => {
  const t = new Uint8Array(e);
  if (!(t && t.length > 1))
    return null;
  const r = (n, i) => {
    i = Object.assign({
      offset: 0
    }, i);
    for (let a = 0; a < n.length; a++)
      if (i.mask) {
        if (n[a] !== (i.mask[a] & t[a + i.offset]))
          return !1;
      } else if (n[a] !== t[a + i.offset])
        return !1;
    return !0;
  };
  if (r([255, 216, 255]))
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  if (r([137, 80, 78, 71, 13, 10, 26, 10]))
    return {
      ext: "png",
      mime: "image/png"
    };
  if (r([71, 73, 70]))
    return {
      ext: "gif",
      mime: "image/gif"
    };
  if (r([87, 69, 66, 80], { offset: 8 }))
    return {
      ext: "webp",
      mime: "image/webp"
    };
  if (r([70, 76, 73, 70]))
    return {
      ext: "flif",
      mime: "image/flif"
    };
  if ((r([73, 73, 42, 0]) || r([77, 77, 0, 42])) && r([67, 82], { offset: 8 }))
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  if (r([73, 73, 42, 0]) || r([77, 77, 0, 42]))
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  if (r([66, 77]))
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  if (r([73, 73, 188]))
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  if (r([56, 66, 80, 83]))
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  if (r([80, 75, 3, 4])) {
    if (r([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 }))
      return {
        ext: "epub",
        mime: "application/epub+zip"
      };
    if (r(aC, { offset: 30 }))
      return {
        ext: "xpi",
        mime: "application/x-xpinstall"
      };
    if (r(oC, { offset: 30 }) || r(sC, { offset: 30 })) {
      const n = t.subarray(4, 2004), i = (o) => o.findIndex((s, l, p) => p[l] === 80 && p[l + 1] === 75 && p[l + 2] === 3 && p[l + 3] === 4), a = i(n);
      if (a !== -1) {
        const o = t.subarray(a + 8, a + 8 + 1e3), s = i(o);
        if (s !== -1) {
          const l = 8 + a + s + 30;
          if (r(Vr("word/"), { offset: l }))
            return {
              ext: "docx",
              mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            };
          if (r(Vr("ppt/"), { offset: l }))
            return {
              ext: "pptx",
              mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            };
          if (r(Vr("xl/"), { offset: l }))
            return {
              ext: "xlsx",
              mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
        }
      }
    }
  }
  if (r([80, 75]) && (t[2] === 3 || t[2] === 5 || t[2] === 7) && (t[3] === 4 || t[3] === 6 || t[3] === 8))
    return {
      ext: "zip",
      mime: "application/zip"
    };
  if (r([117, 115, 116, 97, 114], { offset: 257 }))
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  if (r([82, 97, 114, 33, 26, 7]) && (t[6] === 0 || t[6] === 1))
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  if (r([31, 139, 8]))
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  if (r([66, 90, 104]))
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  if (r([55, 122, 188, 175, 39, 28]))
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  if (r([120, 1]))
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  if (r([51, 103, 112, 53]) || // 3gp5
  r([0, 0, 0]) && r([102, 116, 121, 112], { offset: 4 }) && (r([109, 112, 52, 49], { offset: 8 }) || // MP41
  r([109, 112, 52, 50], { offset: 8 }) || // MP42
  r([105, 115, 111, 109], { offset: 8 }) || // ISOM
  r([105, 115, 111, 50], { offset: 8 }) || // ISO2
  r([109, 109, 112, 52], { offset: 8 }) || // MMP4
  r([77, 52, 86], { offset: 8 }) || // M4V
  r([100, 97, 115, 104], { offset: 8 })))
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  if (r([77, 84, 104, 100]))
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  if (r([26, 69, 223, 163])) {
    const n = t.subarray(4, 4100), i = n.findIndex((a, o, s) => s[o] === 66 && s[o + 1] === 130);
    if (i !== -1) {
      const a = i + 3, o = (s) => Array.from(s).every((l, p) => n[a + p] === l.charCodeAt(0));
      if (o("matroska"))
        return {
          ext: "mkv",
          mime: "video/x-matroska"
        };
      if (o("webm"))
        return {
          ext: "webm",
          mime: "video/webm"
        };
    }
  }
  if (r([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || r([102, 114, 101, 101], { offset: 4 }) || r([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || r([109, 100, 97, 116], { offset: 4 }) || // MJPEG
  r([119, 105, 100, 101], { offset: 4 }))
    return {
      ext: "mov",
      mime: "video/quicktime"
    };
  if (r([82, 73, 70, 70]) && r([65, 86, 73], { offset: 8 }))
    return {
      ext: "avi",
      mime: "video/x-msvideo"
    };
  if (r([48, 38, 178, 117, 142, 102, 207, 17, 166, 217]))
    return {
      ext: "wmv",
      mime: "video/x-ms-wmv"
    };
  if (r([0, 0, 1, 186]))
    return {
      ext: "mpg",
      mime: "video/mpeg"
    };
  for (let n = 0; n < 2 && n < t.length - 16; n++)
    if (r([73, 68, 51], { offset: n }) || // ID3 header
    r([255, 226], { offset: n, mask: [255, 226] }))
      return {
        ext: "mp3",
        mime: "audio/mpeg"
      };
  return r([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || r([77, 52, 65, 32]) ? {
    ext: "m4a",
    mime: "audio/m4a"
  } : r([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 }) ? {
    ext: "opus",
    mime: "audio/opus"
  } : r([79, 103, 103, 83]) ? {
    ext: "ogg",
    mime: "audio/ogg"
  } : r([102, 76, 97, 67]) ? {
    ext: "flac",
    mime: "audio/x-flac"
  } : r([82, 73, 70, 70]) && r([87, 65, 86, 69], { offset: 8 }) ? {
    ext: "wav",
    mime: "audio/x-wav"
  } : r([35, 33, 65, 77, 82, 10]) ? {
    ext: "amr",
    mime: "audio/amr"
  } : r([37, 80, 68, 70]) ? {
    ext: "pdf",
    mime: "application/pdf"
  } : r([77, 90]) ? {
    ext: "exe",
    mime: "application/x-msdownload"
  } : (t[0] === 67 || t[0] === 70) && r([87, 83], { offset: 1 }) ? {
    ext: "swf",
    mime: "application/x-shockwave-flash"
  } : r([123, 92, 114, 116, 102]) ? {
    ext: "rtf",
    mime: "application/rtf"
  } : r([0, 97, 115, 109]) ? {
    ext: "wasm",
    mime: "application/wasm"
  } : r([119, 79, 70, 70]) && (r([0, 1, 0, 0], { offset: 4 }) || r([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff",
    mime: "font/woff"
  } : r([119, 79, 70, 50]) && (r([0, 1, 0, 0], { offset: 4 }) || r([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff2",
    mime: "font/woff2"
  } : r([76, 80], { offset: 34 }) && (r([0, 0, 1], { offset: 8 }) || r([1, 0, 2], { offset: 8 }) || r([2, 0, 2], { offset: 8 })) ? {
    ext: "eot",
    mime: "application/octet-stream"
  } : r([0, 1, 0, 0, 0]) ? {
    ext: "ttf",
    mime: "font/ttf"
  } : r([79, 84, 84, 79, 0]) ? {
    ext: "otf",
    mime: "font/otf"
  } : r([0, 0, 1, 0]) ? {
    ext: "ico",
    mime: "image/x-icon"
  } : r([70, 76, 86, 1]) ? {
    ext: "flv",
    mime: "video/x-flv"
  } : r([37, 33]) ? {
    ext: "ps",
    mime: "application/postscript"
  } : r([253, 55, 122, 88, 90, 0]) ? {
    ext: "xz",
    mime: "application/x-xz"
  } : r([83, 81, 76, 105]) ? {
    ext: "sqlite",
    mime: "application/x-sqlite3"
  } : r([78, 69, 83, 26]) ? {
    ext: "nes",
    mime: "application/x-nintendo-nes-rom"
  } : r([67, 114, 50, 52]) ? {
    ext: "crx",
    mime: "application/x-google-chrome-extension"
  } : r([77, 83, 67, 70]) || r([73, 83, 99, 40]) ? {
    ext: "cab",
    mime: "application/vnd.ms-cab-compressed"
  } : r([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121]) ? {
    ext: "deb",
    mime: "application/x-deb"
  } : r([33, 60, 97, 114, 99, 104, 62]) ? {
    ext: "ar",
    mime: "application/x-unix-archive"
  } : r([237, 171, 238, 219]) ? {
    ext: "rpm",
    mime: "application/x-rpm"
  } : r([31, 160]) || r([31, 157]) ? {
    ext: "Z",
    mime: "application/x-compress"
  } : r([76, 90, 73, 80]) ? {
    ext: "lz",
    mime: "application/x-lzip"
  } : r([208, 207, 17, 224, 161, 177, 26, 225]) ? {
    ext: "msi",
    mime: "application/x-msi"
  } : r([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2]) ? {
    ext: "mxf",
    mime: "application/mxf"
  } : r([71], { offset: 4 }) && (r([71], { offset: 192 }) || r([71], { offset: 196 })) ? {
    ext: "mts",
    mime: "video/mp2t"
  } : r([66, 76, 69, 78, 68, 69, 82]) ? {
    ext: "blend",
    mime: "application/x-blender"
  } : r([66, 80, 71, 251]) ? {
    ext: "bpg",
    mime: "image/bpg"
  } : null;
}, id = [0, 1, 3, 7, 15, 31, 63, 127, 255], hi = function(e) {
  this.stream = e, this.bitOffset = 0, this.curByte = 0, this.hasByte = !1;
};
hi.prototype._ensureByte = function() {
  this.hasByte || (this.curByte = this.stream.readByte(), this.hasByte = !0);
};
hi.prototype.read = function(e) {
  for (var t = 0; e > 0; ) {
    this._ensureByte();
    var r = 8 - this.bitOffset;
    if (e >= r)
      t <<= r, t |= id[r] & this.curByte, this.hasByte = !1, this.bitOffset = 0, e -= r;
    else {
      t <<= e;
      var n = r - e;
      t |= (this.curByte & id[e] << n) >> n, this.bitOffset += e, e = 0;
    }
  }
  return t;
};
hi.prototype.seek = function(e) {
  var t = e % 8, r = (e - t) / 8;
  this.bitOffset = t, this.stream.seek(r), this.hasByte = !1;
};
hi.prototype.pi = function() {
  var e = new Buffer(6), t;
  for (t = 0; t < e.length; t++)
    e[t] = this.read(8);
  return e.toString("hex");
};
var cC = hi, Ar = function() {
};
Ar.prototype.readByte = function() {
  throw new Error("abstract method readByte() not implemented");
};
Ar.prototype.read = function(e, t, r) {
  for (var n = 0; n < r; ) {
    var i = this.readByte();
    if (i < 0)
      return n === 0 ? -1 : n;
    e[t++] = i, n++;
  }
  return n;
};
Ar.prototype.seek = function(e) {
  throw new Error("abstract method seek() not implemented");
};
Ar.prototype.writeByte = function(e) {
  throw new Error("abstract method readByte() not implemented");
};
Ar.prototype.write = function(e, t, r) {
  var n;
  for (n = 0; n < r; n++)
    this.writeByte(e[t++]);
  return r;
};
Ar.prototype.flush = function() {
};
var uC = Ar, fC = function() {
  var e = new Uint32Array([
    0,
    79764919,
    159529838,
    222504665,
    319059676,
    398814059,
    445009330,
    507990021,
    638119352,
    583659535,
    797628118,
    726387553,
    890018660,
    835552979,
    1015980042,
    944750013,
    1276238704,
    1221641927,
    1167319070,
    1095957929,
    1595256236,
    1540665371,
    1452775106,
    1381403509,
    1780037320,
    1859660671,
    1671105958,
    1733955601,
    2031960084,
    2111593891,
    1889500026,
    1952343757,
    2552477408,
    2632100695,
    2443283854,
    2506133561,
    2334638140,
    2414271883,
    2191915858,
    2254759653,
    3190512472,
    3135915759,
    3081330742,
    3009969537,
    2905550212,
    2850959411,
    2762807018,
    2691435357,
    3560074640,
    3505614887,
    3719321342,
    3648080713,
    3342211916,
    3287746299,
    3467911202,
    3396681109,
    4063920168,
    4143685023,
    4223187782,
    4286162673,
    3779000052,
    3858754371,
    3904687514,
    3967668269,
    881225847,
    809987520,
    1023691545,
    969234094,
    662832811,
    591600412,
    771767749,
    717299826,
    311336399,
    374308984,
    453813921,
    533576470,
    25881363,
    88864420,
    134795389,
    214552010,
    2023205639,
    2086057648,
    1897238633,
    1976864222,
    1804852699,
    1867694188,
    1645340341,
    1724971778,
    1587496639,
    1516133128,
    1461550545,
    1406951526,
    1302016099,
    1230646740,
    1142491917,
    1087903418,
    2896545431,
    2825181984,
    2770861561,
    2716262478,
    3215044683,
    3143675388,
    3055782693,
    3001194130,
    2326604591,
    2389456536,
    2200899649,
    2280525302,
    2578013683,
    2640855108,
    2418763421,
    2498394922,
    3769900519,
    3832873040,
    3912640137,
    3992402750,
    4088425275,
    4151408268,
    4197601365,
    4277358050,
    3334271071,
    3263032808,
    3476998961,
    3422541446,
    3585640067,
    3514407732,
    3694837229,
    3640369242,
    1762451694,
    1842216281,
    1619975040,
    1682949687,
    2047383090,
    2127137669,
    1938468188,
    2001449195,
    1325665622,
    1271206113,
    1183200824,
    1111960463,
    1543535498,
    1489069629,
    1434599652,
    1363369299,
    622672798,
    568075817,
    748617968,
    677256519,
    907627842,
    853037301,
    1067152940,
    995781531,
    51762726,
    131386257,
    177728840,
    240578815,
    269590778,
    349224269,
    429104020,
    491947555,
    4046411278,
    4126034873,
    4172115296,
    4234965207,
    3794477266,
    3874110821,
    3953728444,
    4016571915,
    3609705398,
    3555108353,
    3735388376,
    3664026991,
    3290680682,
    3236090077,
    3449943556,
    3378572211,
    3174993278,
    3120533705,
    3032266256,
    2961025959,
    2923101090,
    2868635157,
    2813903052,
    2742672763,
    2604032198,
    2683796849,
    2461293480,
    2524268063,
    2284983834,
    2364738477,
    2175806836,
    2238787779,
    1569362073,
    1498123566,
    1409854455,
    1355396672,
    1317987909,
    1246755826,
    1192025387,
    1137557660,
    2072149281,
    2135122070,
    1912620623,
    1992383480,
    1753615357,
    1816598090,
    1627664531,
    1707420964,
    295390185,
    358241886,
    404320391,
    483945776,
    43990325,
    106832002,
    186451547,
    266083308,
    932423249,
    861060070,
    1041341759,
    986742920,
    613929101,
    542559546,
    756411363,
    701822548,
    3316196985,
    3244833742,
    3425377559,
    3370778784,
    3601682597,
    3530312978,
    3744426955,
    3689838204,
    3819031489,
    3881883254,
    3928223919,
    4007849240,
    4037393693,
    4100235434,
    4180117107,
    4259748804,
    2310601993,
    2373574846,
    2151335527,
    2231098320,
    2596047829,
    2659030626,
    2470359227,
    2550115596,
    2947551409,
    2876312838,
    2788305887,
    2733848168,
    3165939309,
    3094707162,
    3040238851,
    2985771188
  ]), t = function() {
    var r = 4294967295;
    this.getCRC = function() {
      return ~r >>> 0;
    }, this.updateCRC = function(n) {
      r = r << 8 ^ e[(r >>> 24 ^ n) & 255];
    }, this.updateCRCRun = function(n, i) {
      for (; i-- > 0; )
        r = r << 8 ^ e[(r >>> 24 ^ n) & 255];
    };
  };
  return t;
}();
const dC = "1.0.6", hC = "MIT", pC = {
  version: dC,
  license: hC
};
var mC = cC, Gn = uC, bp = fC, Sp = pC, Vi = 20, ad = 258, od = 0, xC = 1, gC = 2, yC = 6, vC = 50, wC = "314159265359", EC = "177245385090", sd = function(e, t) {
  var r = e[t], n;
  for (n = t; n > 0; n--)
    e[n] = e[n - 1];
  return e[0] = r, r;
}, se = {
  OK: 0,
  LAST_BLOCK: -1,
  NOT_BZIP_DATA: -2,
  UNEXPECTED_INPUT_EOF: -3,
  UNEXPECTED_OUTPUT_EOF: -4,
  DATA_ERROR: -5,
  OUT_OF_MEMORY: -6,
  OBSOLETE_INPUT: -7,
  END_OF_BLOCK: -8
}, Zt = {};
Zt[se.LAST_BLOCK] = "Bad file checksum";
Zt[se.NOT_BZIP_DATA] = "Not bzip data";
Zt[se.UNEXPECTED_INPUT_EOF] = "Unexpected input EOF";
Zt[se.UNEXPECTED_OUTPUT_EOF] = "Unexpected output EOF";
Zt[se.DATA_ERROR] = "Data error";
Zt[se.OUT_OF_MEMORY] = "Out of memory";
Zt[se.OBSOLETE_INPUT] = "Obsolete (pre 0.9.5) bzip format not supported.";
var Ce = function(e, t) {
  var r = Zt[e] || "unknown error";
  t && (r += ": " + t);
  var n = new TypeError(r);
  throw n.errorCode = e, n;
}, Me = function(e, t) {
  this.writePos = this.writeCurrent = this.writeCount = 0, this._start_bunzip(e, t);
};
Me.prototype._init_block = function() {
  var e = this._get_next_block();
  return e ? (this.blockCRC = new bp(), !0) : (this.writeCount = -1, !1);
};
Me.prototype._start_bunzip = function(e, t) {
  var r = new Buffer(4);
  (e.read(r, 0, 4) !== 4 || String.fromCharCode(r[0], r[1], r[2]) !== "BZh") && Ce(se.NOT_BZIP_DATA, "bad magic");
  var n = r[3] - 48;
  (n < 1 || n > 9) && Ce(se.NOT_BZIP_DATA, "level out of range"), this.reader = new mC(e), this.dbufSize = 1e5 * n, this.nextoutput = 0, this.outputStream = t, this.streamCRC = 0;
};
Me.prototype._get_next_block = function() {
  var e, t, r, n = this.reader, i = n.pi();
  if (i === EC)
    return !1;
  i !== wC && Ce(se.NOT_BZIP_DATA), this.targetBlockCRC = n.read(32) >>> 0, this.streamCRC = (this.targetBlockCRC ^ (this.streamCRC << 1 | this.streamCRC >>> 31)) >>> 0, n.read(1) && Ce(se.OBSOLETE_INPUT);
  var a = n.read(24);
  a > this.dbufSize && Ce(se.DATA_ERROR, "initial position out of bounds");
  var o = n.read(16), s = new Buffer(256), l = 0;
  for (e = 0; e < 16; e++)
    if (o & 1 << 15 - e) {
      var p = e * 16;
      for (r = n.read(16), t = 0; t < 16; t++)
        r & 1 << 15 - t && (s[l++] = p + t);
    }
  var u = n.read(3);
  (u < gC || u > yC) && Ce(se.DATA_ERROR);
  var d = n.read(15);
  d === 0 && Ce(se.DATA_ERROR);
  var h = new Buffer(256);
  for (e = 0; e < u; e++)
    h[e] = e;
  var m = new Buffer(d);
  for (e = 0; e < d; e++) {
    for (t = 0; n.read(1); t++)
      t >= u && Ce(se.DATA_ERROR);
    m[e] = sd(h, t);
  }
  var w = l + 2, x = [], b;
  for (t = 0; t < u; t++) {
    var g = new Buffer(w), v = new Uint16Array(Vi + 1);
    for (o = n.read(5), e = 0; e < w; e++) {
      for (; (o < 1 || o > Vi) && Ce(se.DATA_ERROR), !!n.read(1); )
        n.read(1) ? o-- : o++;
      g[e] = o;
    }
    var O, D;
    for (O = D = g[0], e = 1; e < w; e++)
      g[e] > D ? D = g[e] : g[e] < O && (O = g[e]);
    b = {}, x.push(b), b.permute = new Uint16Array(ad), b.limit = new Uint32Array(Vi + 2), b.base = new Uint32Array(Vi + 1), b.minLen = O, b.maxLen = D;
    var B = 0;
    for (e = O; e <= D; e++)
      for (v[e] = b.limit[e] = 0, o = 0; o < w; o++)
        g[o] === e && (b.permute[B++] = o);
    for (e = 0; e < w; e++)
      v[g[e]]++;
    for (B = o = 0, e = O; e < D; e++)
      B += v[e], b.limit[e] = B - 1, B <<= 1, o += v[e], b.base[e + 1] = B - o;
    b.limit[D + 1] = Number.MAX_VALUE, b.limit[D] = B + v[D] - 1, b.base[O] = 0;
  }
  var F = new Uint32Array(256);
  for (e = 0; e < 256; e++)
    h[e] = e;
  var L = 0, Y = 0, E = 0, U, q = this.dbuf = new Uint32Array(this.dbufSize);
  for (w = 0; ; ) {
    for (w-- || (w = vC - 1, E >= d && Ce(se.DATA_ERROR), b = x[m[E++]]), e = b.minLen, t = n.read(e); e > b.maxLen && Ce(se.DATA_ERROR), !(t <= b.limit[e]); e++)
      t = t << 1 | n.read(1);
    t -= b.base[e], (t < 0 || t >= ad) && Ce(se.DATA_ERROR);
    var G = b.permute[t];
    if (G === od || G === xC) {
      L || (L = 1, o = 0), G === od ? o += L : o += 2 * L, L <<= 1;
      continue;
    }
    if (L)
      for (L = 0, Y + o > this.dbufSize && Ce(se.DATA_ERROR), U = s[h[0]], F[U] += o; o--; )
        q[Y++] = U;
    if (G > l)
      break;
    Y >= this.dbufSize && Ce(se.DATA_ERROR), e = G - 1, U = sd(h, e), U = s[U], F[U]++, q[Y++] = U;
  }
  for ((a < 0 || a >= Y) && Ce(se.DATA_ERROR), t = 0, e = 0; e < 256; e++)
    r = t + F[e], F[e] = t, t = r;
  for (e = 0; e < Y; e++)
    U = q[e] & 255, q[F[U]] |= e << 8, F[U]++;
  var J = 0, N = 0, P = 0;
  return Y && (J = q[a], N = J & 255, J >>= 8, P = -1), this.writePos = J, this.writeCurrent = N, this.writeCount = Y, this.writeRun = P, !0;
};
Me.prototype._read_bunzip = function(e, t) {
  var r, n, i;
  if (this.writeCount < 0)
    return 0;
  var a = this.dbuf, o = this.writePos, s = this.writeCurrent, l = this.writeCount;
  this.outputsize;
  for (var p = this.writeRun; l; ) {
    for (l--, n = s, o = a[o], s = o & 255, o >>= 8, p++ === 3 ? (r = s, i = n, s = -1) : (r = 1, i = s), this.blockCRC.updateCRCRun(i, r); r--; )
      this.outputStream.writeByte(i), this.nextoutput++;
    s != n && (p = 0);
  }
  return this.writeCount = l, this.blockCRC.getCRC() !== this.targetBlockCRC && Ce(se.DATA_ERROR, "Bad block CRC (got " + this.blockCRC.getCRC().toString(16) + " expected " + this.targetBlockCRC.toString(16) + ")"), this.nextoutput;
};
var Gl = function(e) {
  if ("readByte" in e)
    return e;
  var t = new Gn();
  return t.pos = 0, t.readByte = function() {
    return e[this.pos++];
  }, t.seek = function(r) {
    this.pos = r;
  }, t.eof = function() {
    return this.pos >= e.length;
  }, t;
}, Ap = function(e) {
  var t = new Gn(), r = !0;
  if (e)
    if (typeof e == "number")
      t.buffer = new Buffer(e), r = !1;
    else {
      if ("writeByte" in e)
        return e;
      t.buffer = e, r = !1;
    }
  else
    t.buffer = new Buffer(16384);
  return t.pos = 0, t.writeByte = function(n) {
    if (r && this.pos >= this.buffer.length) {
      var i = new Buffer(this.buffer.length * 2);
      this.buffer.copy(i), this.buffer = i;
    }
    this.buffer[this.pos++] = n;
  }, t.getBuffer = function() {
    if (this.pos !== this.buffer.length) {
      if (!r)
        throw new TypeError("outputsize does not match decoded input");
      var n = new Buffer(this.pos);
      this.buffer.copy(n, 0, 0, this.pos), this.buffer = n;
    }
    return this.buffer;
  }, t._coerced = !0, t;
};
Me.Err = se;
Me.decode = function(e, t, r) {
  for (var n = Gl(e), i = Ap(t), a = new Me(n, i); !("eof" in n && n.eof()); )
    if (a._init_block())
      a._read_bunzip();
    else {
      var o = a.reader.read(32) >>> 0;
      if (o !== a.streamCRC && Ce(se.DATA_ERROR, "Bad stream CRC (got " + a.streamCRC.toString(16) + " expected " + o.toString(16) + ")"), r && "eof" in n && !n.eof())
        a._start_bunzip(n, i);
      else break;
    }
  if ("getBuffer" in i)
    return i.getBuffer();
};
Me.decodeBlock = function(e, t, r) {
  var n = Gl(e), i = Ap(r), a = new Me(n, i);
  a.reader.seek(t);
  var o = a._get_next_block();
  if (o && (a.blockCRC = new bp(), a.writeCopies = 0, a._read_bunzip()), "getBuffer" in i)
    return i.getBuffer();
};
Me.table = function(e, t, r) {
  var n = new Gn();
  n.delegate = Gl(e), n.pos = 0, n.readByte = function() {
    return this.pos++, this.delegate.readByte();
  }, n.delegate.eof && (n.eof = n.delegate.eof.bind(n.delegate));
  var i = new Gn();
  i.pos = 0, i.writeByte = function() {
    this.pos++;
  };
  for (var a = new Me(n, i), o = a.dbufSize; !("eof" in n && n.eof()); ) {
    var s = n.pos * 8 + a.reader.bitOffset;
    if (a.reader.hasByte && (s -= 8), a._init_block()) {
      var l = i.pos;
      a._read_bunzip(), t(s, i.pos - l);
    } else if (a.reader.read(32), r && "eof" in n && !n.eof())
      a._start_bunzip(n, i), console.assert(
        a.dbufSize === o,
        "shouldn't change block size within multistream file"
      );
    else break;
  }
};
Me.Stream = Gn;
Me.version = Sp.version;
Me.license = Sp.license;
var _C = Me, Tp = { exports: {} };
(function(e, t) {
  var r = Ye;
  e.exports = n, n.through = n;
  function n(i, a, o) {
    i = i || function(w) {
      this.queue(w);
    }, a = a || function() {
      this.queue(null);
    };
    var s = !1, l = !1, p = [], u = !1, d = new r();
    d.readable = d.writable = !0, d.paused = !1, d.autoDestroy = !(o && o.autoDestroy === !1), d.write = function(w) {
      return i.call(this, w), !d.paused;
    };
    function h() {
      for (; p.length && !d.paused; ) {
        var w = p.shift();
        if (w === null)
          return d.emit("end");
        d.emit("data", w);
      }
    }
    d.queue = d.push = function(w) {
      return u || (w === null && (u = !0), p.push(w), h()), d;
    }, d.on("end", function() {
      d.readable = !1, !d.writable && d.autoDestroy && process.nextTick(function() {
        d.destroy();
      });
    });
    function m() {
      d.writable = !1, a.call(d), !d.readable && d.autoDestroy && d.destroy();
    }
    return d.end = function(w) {
      if (!s)
        return s = !0, arguments.length && d.write(w), m(), d;
    }, d.destroy = function() {
      if (!l)
        return l = !0, s = !0, p.length = 0, d.writable = d.readable = !1, d.emit("close"), d;
    }, d.pause = function() {
      if (!d.paused)
        return d.paused = !0, d;
    }, d.resume = function() {
      return d.paused && (d.paused = !1, d.emit("resume")), h(), d.paused || d.emit("drain"), d;
    }, d;
  }
})(Tp);
var bC = Tp.exports;
function zl(e) {
  this.name = "Bzip2Error", this.message = e, this.stack = new Error().stack;
}
zl.prototype = new Error();
var Te = {
  Error: function(e) {
    throw new zl(e);
  }
}, ft = {};
ft.Bzip2Error = zl;
ft.crcTable = [
  0,
  79764919,
  159529838,
  222504665,
  319059676,
  398814059,
  445009330,
  507990021,
  638119352,
  583659535,
  797628118,
  726387553,
  890018660,
  835552979,
  1015980042,
  944750013,
  1276238704,
  1221641927,
  1167319070,
  1095957929,
  1595256236,
  1540665371,
  1452775106,
  1381403509,
  1780037320,
  1859660671,
  1671105958,
  1733955601,
  2031960084,
  2111593891,
  1889500026,
  1952343757,
  2552477408,
  2632100695,
  2443283854,
  2506133561,
  2334638140,
  2414271883,
  2191915858,
  2254759653,
  3190512472,
  3135915759,
  3081330742,
  3009969537,
  2905550212,
  2850959411,
  2762807018,
  2691435357,
  3560074640,
  3505614887,
  3719321342,
  3648080713,
  3342211916,
  3287746299,
  3467911202,
  3396681109,
  4063920168,
  4143685023,
  4223187782,
  4286162673,
  3779000052,
  3858754371,
  3904687514,
  3967668269,
  881225847,
  809987520,
  1023691545,
  969234094,
  662832811,
  591600412,
  771767749,
  717299826,
  311336399,
  374308984,
  453813921,
  533576470,
  25881363,
  88864420,
  134795389,
  214552010,
  2023205639,
  2086057648,
  1897238633,
  1976864222,
  1804852699,
  1867694188,
  1645340341,
  1724971778,
  1587496639,
  1516133128,
  1461550545,
  1406951526,
  1302016099,
  1230646740,
  1142491917,
  1087903418,
  2896545431,
  2825181984,
  2770861561,
  2716262478,
  3215044683,
  3143675388,
  3055782693,
  3001194130,
  2326604591,
  2389456536,
  2200899649,
  2280525302,
  2578013683,
  2640855108,
  2418763421,
  2498394922,
  3769900519,
  3832873040,
  3912640137,
  3992402750,
  4088425275,
  4151408268,
  4197601365,
  4277358050,
  3334271071,
  3263032808,
  3476998961,
  3422541446,
  3585640067,
  3514407732,
  3694837229,
  3640369242,
  1762451694,
  1842216281,
  1619975040,
  1682949687,
  2047383090,
  2127137669,
  1938468188,
  2001449195,
  1325665622,
  1271206113,
  1183200824,
  1111960463,
  1543535498,
  1489069629,
  1434599652,
  1363369299,
  622672798,
  568075817,
  748617968,
  677256519,
  907627842,
  853037301,
  1067152940,
  995781531,
  51762726,
  131386257,
  177728840,
  240578815,
  269590778,
  349224269,
  429104020,
  491947555,
  4046411278,
  4126034873,
  4172115296,
  4234965207,
  3794477266,
  3874110821,
  3953728444,
  4016571915,
  3609705398,
  3555108353,
  3735388376,
  3664026991,
  3290680682,
  3236090077,
  3449943556,
  3378572211,
  3174993278,
  3120533705,
  3032266256,
  2961025959,
  2923101090,
  2868635157,
  2813903052,
  2742672763,
  2604032198,
  2683796849,
  2461293480,
  2524268063,
  2284983834,
  2364738477,
  2175806836,
  2238787779,
  1569362073,
  1498123566,
  1409854455,
  1355396672,
  1317987909,
  1246755826,
  1192025387,
  1137557660,
  2072149281,
  2135122070,
  1912620623,
  1992383480,
  1753615357,
  1816598090,
  1627664531,
  1707420964,
  295390185,
  358241886,
  404320391,
  483945776,
  43990325,
  106832002,
  186451547,
  266083308,
  932423249,
  861060070,
  1041341759,
  986742920,
  613929101,
  542559546,
  756411363,
  701822548,
  3316196985,
  3244833742,
  3425377559,
  3370778784,
  3601682597,
  3530312978,
  3744426955,
  3689838204,
  3819031489,
  3881883254,
  3928223919,
  4007849240,
  4037393693,
  4100235434,
  4180117107,
  4259748804,
  2310601993,
  2373574846,
  2151335527,
  2231098320,
  2596047829,
  2659030626,
  2470359227,
  2550115596,
  2947551409,
  2876312838,
  2788305887,
  2733848168,
  3165939309,
  3094707162,
  3040238851,
  2985771188
];
ft.array = function(e) {
  var t = 0, r = 0, n = [0, 1, 3, 7, 15, 31, 63, 127, 255];
  return function(i) {
    for (var a = 0; i > 0; ) {
      var o = 8 - t;
      i >= o ? (a <<= o, a |= n[o] & e[r++], t = 0, i -= o) : (a <<= i, a |= (e[r] & n[i] << 8 - i - t) >> 8 - i - t, t += i, i = 0);
    }
    return a;
  };
};
ft.simple = function(e, t) {
  var r = ft.array(e), n = ft.header(r), i = !1, a = 1e5 * n, o = new Int32Array(a);
  do
    i = ft.decompress(r, t, o, a);
  while (!i);
};
ft.header = function(e) {
  this.byteCount = new Int32Array(256), this.symToByte = new Uint8Array(256), this.mtfSymbol = new Int32Array(256), this.selectors = new Uint8Array(32768), e(8 * 3) != 4348520 && Te.Error("No magic number found");
  var t = e(8) - 48;
  return (t < 1 || t > 9) && Te.Error("Not a BZIP archive"), t;
};
ft.decompress = function(e, t, r, n, i) {
  for (var a = 20, o = 258, s = 0, l = 1, p = 50, u = -1, d = "", h = 0; h < 6; h++) d += e(8).toString(16);
  if (d == "177245385090") {
    var m = e(32) | 0;
    return m !== i && Te.Error("Error in bzip2: crc32 do not match"), e(null), null;
  }
  d != "314159265359" && Te.Error("eek not valid bzip data");
  var w = e(32) | 0;
  e(1) && Te.Error("unsupported obsolete version");
  var x = e(24);
  x > n && Te.Error("Initial position larger than buffer size");
  var b = e(16), g = 0;
  for (h = 0; h < 16; h++)
    if (b & 1 << 15 - h) {
      var v = e(16);
      for (I = 0; I < 16; I++)
        v & 1 << 15 - I && (this.symToByte[g++] = 16 * h + I);
    }
  var O = e(3);
  (O < 2 || O > 6) && Te.Error("another error");
  var D = e(15);
  D == 0 && Te.Error("meh");
  for (var h = 0; h < O; h++) this.mtfSymbol[h] = h;
  for (var h = 0; h < D; h++) {
    for (var I = 0; e(1); I++) I >= O && Te.Error("whoops another error");
    for (var B = this.mtfSymbol[I], v = I - 1; v >= 0; v--)
      this.mtfSymbol[v + 1] = this.mtfSymbol[v];
    this.mtfSymbol[0] = B, this.selectors[h] = B;
  }
  for (var _ = g + 2, F = [], L = new Uint8Array(o), Y = new Uint16Array(a + 1), E, I = 0; I < O; I++) {
    b = e(5);
    for (var h = 0; h < _; h++) {
      for (; (b < 1 || b > a) && Te.Error("I gave up a while ago on writing error messages"), !!e(1); )
        e(1) ? b-- : b++;
      L[h] = b;
    }
    var U, q;
    U = q = L[0];
    for (var h = 1; h < _; h++)
      L[h] > q ? q = L[h] : L[h] < U && (U = L[h]);
    E = F[I] = {}, E.permute = new Int32Array(o), E.limit = new Int32Array(a + 1), E.base = new Int32Array(a + 1), E.minLen = U, E.maxLen = q;
    for (var G = E.base, J = E.limit, N = 0, h = U; h <= q; h++)
      for (var b = 0; b < _; b++)
        L[b] == h && (E.permute[N++] = b);
    for (h = U; h <= q; h++) Y[h] = J[h] = 0;
    for (h = 0; h < _; h++) Y[L[h]]++;
    for (N = b = 0, h = U; h < q; h++)
      N += Y[h], J[h] = N - 1, N <<= 1, G[h + 1] = N - (b += Y[h]);
    J[q] = N + Y[q] - 1, G[U] = 0;
  }
  for (var h = 0; h < 256; h++)
    this.mtfSymbol[h] = h, this.byteCount[h] = 0;
  var P, k, _, A;
  for (P = k = _ = A = 0; ; ) {
    for (_-- || (_ = p - 1, A >= D && Te.Error("meow i'm a kitty, that's an error"), E = F[this.selectors[A++]], G = E.base, J = E.limit), h = E.minLen, I = e(h); h > E.maxLen && Te.Error("rawr i'm a dinosaur"), !(I <= J[h]); )
      h++, I = I << 1 | e(1);
    I -= G[h], (I < 0 || I >= o) && Te.Error("moo i'm a cow");
    var R = E.permute[I];
    if (R == s || R == l) {
      P || (P = 1, b = 0), R == s ? b += P : b += 2 * P, P <<= 1;
      continue;
    }
    if (P)
      for (P = 0, k + b > n && Te.Error("Boom."), B = this.symToByte[this.mtfSymbol[0]], this.byteCount[B] += b; b--; ) r[k++] = B;
    if (R > g) break;
    k >= n && Te.Error("I can't think of anything. Error"), h = R - 1, B = this.mtfSymbol[h];
    for (var v = h - 1; v >= 0; v--)
      this.mtfSymbol[v + 1] = this.mtfSymbol[v];
    this.mtfSymbol[0] = B, B = this.symToByte[B], this.byteCount[B]++, r[k++] = B;
  }
  (x < 0 || x >= k) && Te.Error("I'm a monkey and I'm throwing something at someone, namely you");
  for (var I = 0, h = 0; h < 256; h++)
    v = I + this.byteCount[h], this.byteCount[h] = I, I = v;
  for (var h = 0; h < k; h++)
    B = r[h] & 255, r[this.byteCount[B]] |= h << 8, this.byteCount[B]++;
  var j = 0, M = 0, Q = 0;
  k && (j = r[x], M = j & 255, j >>= 8, Q = -1), k = k;
  for (var te, V, ce; k; ) {
    for (k--, V = M, j = r[j], M = j & 255, j >>= 8, Q++ == 3 ? (te = M, ce = V, M = -1) : (te = 1, ce = M); te--; )
      u = (u << 8 ^ this.crcTable[(u >> 24 ^ ce) & 255]) & 4294967295, t(ce);
    M != V && (Q = 0);
  }
  return u = (u ^ -1) >>> 0, (u | 0) != (w | 0) && Te.Error("Error in bzip2: crc32 do not match"), i = (u ^ (i << 1 | i >>> 31)) & 4294967295, i;
};
var SC = ft, ld = [0, 1, 3, 7, 15, 31, 63, 127, 255], AC = function(t) {
  var r = 0, n = 0, i = t(), a = function(o) {
    if (o === null && r != 0) {
      r = 0, n++;
      return;
    }
    for (var s = 0; o > 0; ) {
      n >= i.length && (n = 0, i = t());
      var l = 8 - r;
      r === 0 && o > 0 && a.bytesRead++, o >= l ? (s <<= l, s |= ld[l] & i[n++], r = 0, o -= l) : (s <<= o, s |= (i[n] & ld[o] << 8 - o - r) >> 8 - o - r, r += o, o = 0);
    }
    return s;
  };
  return a.bytesRead = 0, a;
}, TC = bC, cd = SC, CC = AC, RC = OC;
function OC() {
  var e = [], t = 0, r = 0, n = !1, i = null, a = null;
  function o(p) {
    if (r) {
      var u = 1e5 * r, d = new Int32Array(u), h = [], m = function(w) {
        h.push(w);
      };
      return a = cd.decompress(i, m, d, u, a), a === null ? (r = 0, !1) : (p(Buffer.from(h)), !0);
    } else
      return r = cd.header(i), a = 0, !0;
  }
  var s = 0;
  function l(p) {
    if (!n)
      try {
        return o(function(u) {
          p.queue(u), u !== null && (s += u.length);
        });
      } catch (u) {
        return p.emit("error", u), n = !0, !1;
      }
  }
  return TC(
    function(u) {
      for (e.push(u), t += u.length, i === null && (i = CC(function() {
        return e.shift();
      })); !n && t - i.bytesRead + 1 >= (25e3 + 1e5 * r || 4); )
        l(this);
    },
    function(u) {
      for (; !n && i && t > i.bytesRead; )
        l(this);
      n || (a !== null && this.emit("error", new Error("input stream ended prematurely")), this.queue(null));
    }
  );
}
const ud = Hl, fd = lC, PC = $l, DC = _C, IC = RC;
var FC = () => (e) => !Buffer.isBuffer(e) && !PC(e) ? Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof e}`)) : Buffer.isBuffer(e) && (!fd(e) || fd(e).ext !== "bz2") ? Promise.resolve([]) : Buffer.isBuffer(e) ? ud()(DC.decode(e)) : ud()(e.pipe(IC()));
const NC = ba, $C = Hl, dd = jh, LC = $l;
var UC = () => (e) => {
  if (!Buffer.isBuffer(e) && !LC(e))
    return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof e}`));
  if (Buffer.isBuffer(e) && (!dd(e) || dd(e).ext !== "gz"))
    return Promise.resolve([]);
  const t = NC.createGunzip(), r = $C()(t);
  return Buffer.isBuffer(e) ? t.end(e) : e.pipe(t), r;
}, kC = function(e) {
  return e && e.length > 1 ? e[0] === 255 && e[1] === 216 && e[2] === 255 ? {
    ext: "jpg",
    mime: "image/jpeg"
  } : e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 ? {
    ext: "png",
    mime: "image/png"
  } : e[0] === 71 && e[1] === 73 && e[2] === 70 ? {
    ext: "gif",
    mime: "image/gif"
  } : e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80 ? {
    ext: "webp",
    mime: "image/webp"
  } : e[0] === 70 && e[1] === 76 && e[2] === 73 && e[3] === 70 ? {
    ext: "flif",
    mime: "image/flif"
  } : (e[0] === 73 && e[1] === 73 && e[2] === 42 && e[3] === 0 || e[0] === 77 && e[1] === 77 && e[2] === 0 && e[3] === 42) && e[8] === 67 && e[9] === 82 ? {
    ext: "cr2",
    mime: "image/x-canon-cr2"
  } : e[0] === 73 && e[1] === 73 && e[2] === 42 && e[3] === 0 || e[0] === 77 && e[1] === 77 && e[2] === 0 && e[3] === 42 ? {
    ext: "tif",
    mime: "image/tiff"
  } : e[0] === 66 && e[1] === 77 ? {
    ext: "bmp",
    mime: "image/bmp"
  } : e[0] === 73 && e[1] === 73 && e[2] === 188 ? {
    ext: "jxr",
    mime: "image/vnd.ms-photo"
  } : e[0] === 56 && e[1] === 66 && e[2] === 80 && e[3] === 83 ? {
    ext: "psd",
    mime: "image/vnd.adobe.photoshop"
  } : e[0] === 80 && e[1] === 75 && e[2] === 3 && e[3] === 4 && e[30] === 109 && e[31] === 105 && e[32] === 109 && e[33] === 101 && e[34] === 116 && e[35] === 121 && e[36] === 112 && e[37] === 101 && e[38] === 97 && e[39] === 112 && e[40] === 112 && e[41] === 108 && e[42] === 105 && e[43] === 99 && e[44] === 97 && e[45] === 116 && e[46] === 105 && e[47] === 111 && e[48] === 110 && e[49] === 47 && e[50] === 101 && e[51] === 112 && e[52] === 117 && e[53] === 98 && e[54] === 43 && e[55] === 122 && e[56] === 105 && e[57] === 112 ? {
    ext: "epub",
    mime: "application/epub+zip"
  } : e[0] === 80 && e[1] === 75 && e[2] === 3 && e[3] === 4 && e[30] === 77 && e[31] === 69 && e[32] === 84 && e[33] === 65 && e[34] === 45 && e[35] === 73 && e[36] === 78 && e[37] === 70 && e[38] === 47 && e[39] === 109 && e[40] === 111 && e[41] === 122 && e[42] === 105 && e[43] === 108 && e[44] === 108 && e[45] === 97 && e[46] === 46 && e[47] === 114 && e[48] === 115 && e[49] === 97 ? {
    ext: "xpi",
    mime: "application/x-xpinstall"
  } : e[0] === 80 && e[1] === 75 && (e[2] === 3 || e[2] === 5 || e[2] === 7) && (e[3] === 4 || e[3] === 6 || e[3] === 8) ? {
    ext: "zip",
    mime: "application/zip"
  } : e[257] === 117 && e[258] === 115 && e[259] === 116 && e[260] === 97 && e[261] === 114 ? {
    ext: "tar",
    mime: "application/x-tar"
  } : e[0] === 82 && e[1] === 97 && e[2] === 114 && e[3] === 33 && e[4] === 26 && e[5] === 7 && (e[6] === 0 || e[6] === 1) ? {
    ext: "rar",
    mime: "application/x-rar-compressed"
  } : e[0] === 31 && e[1] === 139 && e[2] === 8 ? {
    ext: "gz",
    mime: "application/gzip"
  } : e[0] === 66 && e[1] === 90 && e[2] === 104 ? {
    ext: "bz2",
    mime: "application/x-bzip2"
  } : e[0] === 55 && e[1] === 122 && e[2] === 188 && e[3] === 175 && e[4] === 39 && e[5] === 28 ? {
    ext: "7z",
    mime: "application/x-7z-compressed"
  } : e[0] === 120 && e[1] === 1 ? {
    ext: "dmg",
    mime: "application/x-apple-diskimage"
  } : e[0] === 0 && e[1] === 0 && e[2] === 0 && (e[3] === 24 || e[3] === 32) && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 || e[0] === 51 && e[1] === 103 && e[2] === 112 && e[3] === 53 || e[0] === 0 && e[1] === 0 && e[2] === 0 && e[3] === 28 && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 && e[8] === 109 && e[9] === 112 && e[10] === 52 && e[11] === 50 && e[16] === 109 && e[17] === 112 && e[18] === 52 && e[19] === 49 && e[20] === 109 && e[21] === 112 && e[22] === 52 && e[23] === 50 && e[24] === 105 && e[25] === 115 && e[26] === 111 && e[27] === 109 || e[0] === 0 && e[1] === 0 && e[2] === 0 && e[3] === 28 && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 && e[8] === 105 && e[9] === 115 && e[10] === 111 && e[11] === 109 || e[0] === 0 && e[1] === 0 && e[2] === 0 && e[3] === 28 && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 && e[8] === 109 && e[9] === 112 && e[10] === 52 && e[11] === 50 && e[12] === 0 && e[13] === 0 && e[14] === 0 && e[15] === 0 ? {
    ext: "mp4",
    mime: "video/mp4"
  } : e[0] === 0 && e[1] === 0 && e[2] === 0 && e[3] === 28 && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 && e[8] === 77 && e[9] === 52 && e[10] === 86 ? {
    ext: "m4v",
    mime: "video/x-m4v"
  } : e[0] === 77 && e[1] === 84 && e[2] === 104 && e[3] === 100 ? {
    ext: "mid",
    mime: "audio/midi"
  } : e[31] === 109 && e[32] === 97 && e[33] === 116 && e[34] === 114 && e[35] === 111 && e[36] === 115 && e[37] === 107 && e[38] === 97 ? {
    ext: "mkv",
    mime: "video/x-matroska"
  } : e[0] === 26 && e[1] === 69 && e[2] === 223 && e[3] === 163 ? {
    ext: "webm",
    mime: "video/webm"
  } : e[0] === 0 && e[1] === 0 && e[2] === 0 && e[3] === 20 && e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 ? {
    ext: "mov",
    mime: "video/quicktime"
  } : e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 65 && e[9] === 86 && e[10] === 73 ? {
    ext: "avi",
    mime: "video/x-msvideo"
  } : e[0] === 48 && e[1] === 38 && e[2] === 178 && e[3] === 117 && e[4] === 142 && e[5] === 102 && e[6] === 207 && e[7] === 17 && e[8] === 166 && e[9] === 217 ? {
    ext: "wmv",
    mime: "video/x-ms-wmv"
  } : e[0] === 0 && e[1] === 0 && e[2] === 1 && e[3].toString(16)[0] === "b" ? {
    ext: "mpg",
    mime: "video/mpeg"
  } : e[0] === 73 && e[1] === 68 && e[2] === 51 || e[0] === 255 && e[1] === 251 ? {
    ext: "mp3",
    mime: "audio/mpeg"
  } : e[4] === 102 && e[5] === 116 && e[6] === 121 && e[7] === 112 && e[8] === 77 && e[9] === 52 && e[10] === 65 || e[0] === 77 && e[1] === 52 && e[2] === 65 && e[3] === 32 ? {
    ext: "m4a",
    mime: "audio/m4a"
  } : e[28] === 79 && e[29] === 112 && e[30] === 117 && e[31] === 115 && e[32] === 72 && e[33] === 101 && e[34] === 97 && e[35] === 100 ? {
    ext: "opus",
    mime: "audio/opus"
  } : e[0] === 79 && e[1] === 103 && e[2] === 103 && e[3] === 83 ? {
    ext: "ogg",
    mime: "audio/ogg"
  } : e[0] === 102 && e[1] === 76 && e[2] === 97 && e[3] === 67 ? {
    ext: "flac",
    mime: "audio/x-flac"
  } : e[0] === 82 && e[1] === 73 && e[2] === 70 && e[3] === 70 && e[8] === 87 && e[9] === 65 && e[10] === 86 && e[11] === 69 ? {
    ext: "wav",
    mime: "audio/x-wav"
  } : e[0] === 35 && e[1] === 33 && e[2] === 65 && e[3] === 77 && e[4] === 82 && e[5] === 10 ? {
    ext: "amr",
    mime: "audio/amr"
  } : e[0] === 37 && e[1] === 80 && e[2] === 68 && e[3] === 70 ? {
    ext: "pdf",
    mime: "application/pdf"
  } : e[0] === 77 && e[1] === 90 ? {
    ext: "exe",
    mime: "application/x-msdownload"
  } : (e[0] === 67 || e[0] === 70) && e[1] === 87 && e[2] === 83 ? {
    ext: "swf",
    mime: "application/x-shockwave-flash"
  } : e[0] === 123 && e[1] === 92 && e[2] === 114 && e[3] === 116 && e[4] === 102 ? {
    ext: "rtf",
    mime: "application/rtf"
  } : e[0] === 119 && e[1] === 79 && e[2] === 70 && e[3] === 70 && (e[4] === 0 && e[5] === 1 && e[6] === 0 && e[7] === 0 || e[4] === 79 && e[5] === 84 && e[6] === 84 && e[7] === 79) ? {
    ext: "woff",
    mime: "application/font-woff"
  } : e[0] === 119 && e[1] === 79 && e[2] === 70 && e[3] === 50 && (e[4] === 0 && e[5] === 1 && e[6] === 0 && e[7] === 0 || e[4] === 79 && e[5] === 84 && e[6] === 84 && e[7] === 79) ? {
    ext: "woff2",
    mime: "application/font-woff"
  } : e[34] === 76 && e[35] === 80 && (e[8] === 0 && e[9] === 0 && e[10] === 1 || e[8] === 1 && e[9] === 0 && e[10] === 2 || e[8] === 2 && e[9] === 0 && e[10] === 2) ? {
    ext: "eot",
    mime: "application/octet-stream"
  } : e[0] === 0 && e[1] === 1 && e[2] === 0 && e[3] === 0 && e[4] === 0 ? {
    ext: "ttf",
    mime: "application/font-sfnt"
  } : e[0] === 79 && e[1] === 84 && e[2] === 84 && e[3] === 79 && e[4] === 0 ? {
    ext: "otf",
    mime: "application/font-sfnt"
  } : e[0] === 0 && e[1] === 0 && e[2] === 1 && e[3] === 0 ? {
    ext: "ico",
    mime: "image/x-icon"
  } : e[0] === 70 && e[1] === 76 && e[2] === 86 && e[3] === 1 ? {
    ext: "flv",
    mime: "video/x-flv"
  } : e[0] === 37 && e[1] === 33 ? {
    ext: "ps",
    mime: "application/postscript"
  } : e[0] === 253 && e[1] === 55 && e[2] === 122 && e[3] === 88 && e[4] === 90 && e[5] === 0 ? {
    ext: "xz",
    mime: "application/x-xz"
  } : e[0] === 83 && e[1] === 81 && e[2] === 76 && e[3] === 105 ? {
    ext: "sqlite",
    mime: "application/x-sqlite3"
  } : e[0] === 78 && e[1] === 69 && e[2] === 83 && e[3] === 26 ? {
    ext: "nes",
    mime: "application/x-nintendo-nes-rom"
  } : e[0] === 67 && e[1] === 114 && e[2] === 50 && e[3] === 52 ? {
    ext: "crx",
    mime: "application/x-google-chrome-extension"
  } : e[0] === 77 && e[1] === 83 && e[2] === 67 && e[3] === 70 || e[0] === 73 && e[1] === 83 && e[2] === 99 && e[3] === 40 ? {
    ext: "cab",
    mime: "application/vnd.ms-cab-compressed"
  } : e[0] === 33 && e[1] === 60 && e[2] === 97 && e[3] === 114 && e[4] === 99 && e[5] === 104 && e[6] === 62 && e[7] === 10 && e[8] === 100 && e[9] === 101 && e[10] === 98 && e[11] === 105 && e[12] === 97 && e[13] === 110 && e[14] === 45 && e[15] === 98 && e[16] === 105 && e[17] === 110 && e[18] === 97 && e[19] === 114 && e[20] === 121 ? {
    ext: "deb",
    mime: "application/x-deb"
  } : e[0] === 33 && e[1] === 60 && e[2] === 97 && e[3] === 114 && e[4] === 99 && e[5] === 104 && e[6] === 62 ? {
    ext: "ar",
    mime: "application/x-unix-archive"
  } : e[0] === 237 && e[1] === 171 && e[2] === 238 && e[3] === 219 ? {
    ext: "rpm",
    mime: "application/x-rpm"
  } : e[0] === 31 && e[1] === 160 || e[0] === 31 && e[1] === 157 ? {
    ext: "Z",
    mime: "application/x-compress"
  } : e[0] === 76 && e[1] === 90 && e[2] === 73 && e[3] === 80 ? {
    ext: "lz",
    mime: "application/x-lzip"
  } : e[0] === 208 && e[1] === 207 && e[2] === 17 && e[3] === 224 && e[4] === 161 && e[5] === 177 && e[6] === 26 && e[7] === 225 ? {
    ext: "msi",
    mime: "application/x-msi"
  } : null : null;
}, Qa = { exports: {} }, Os, hd;
function BC() {
  if (hd) return Os;
  hd = 1;
  var e = "pending", t = "settled", r = "fulfilled", n = "rejected", i = function() {
  }, a = typeof ie < "u" && typeof ie.process < "u" && typeof ie.process.emit == "function", o = typeof setImmediate > "u" ? setTimeout : setImmediate, s = [], l;
  function p() {
    for (var F = 0; F < s.length; F++)
      s[F][0](s[F][1]);
    s = [], l = !1;
  }
  function u(F, L) {
    s.push([F, L]), l || (l = !0, o(p, 0));
  }
  function d(F, L) {
    function Y(U) {
      w(L, U);
    }
    function E(U) {
      b(L, U);
    }
    try {
      F(Y, E);
    } catch (U) {
      E(U);
    }
  }
  function h(F) {
    var L = F.owner, Y = L._state, E = L._data, U = F[Y], q = F.then;
    if (typeof U == "function") {
      Y = r;
      try {
        E = U(E);
      } catch (G) {
        b(q, G);
      }
    }
    m(q, E) || (Y === r && w(q, E), Y === n && b(q, E));
  }
  function m(F, L) {
    var Y;
    try {
      if (F === L)
        throw new TypeError("A promises callback cannot return that same promise.");
      if (L && (typeof L == "function" || typeof L == "object")) {
        var E = L.then;
        if (typeof E == "function")
          return E.call(L, function(U) {
            Y || (Y = !0, L === U ? x(F, U) : w(F, U));
          }, function(U) {
            Y || (Y = !0, b(F, U));
          }), !0;
      }
    } catch (U) {
      return Y || b(F, U), !0;
    }
    return !1;
  }
  function w(F, L) {
    (F === L || !m(F, L)) && x(F, L);
  }
  function x(F, L) {
    F._state === e && (F._state = t, F._data = L, u(v, F));
  }
  function b(F, L) {
    F._state === e && (F._state = t, F._data = L, u(O, F));
  }
  function g(F) {
    F._then = F._then.forEach(h);
  }
  function v(F) {
    F._state = r, g(F);
  }
  function O(F) {
    F._state = n, g(F), !F._handled && a && ie.process.emit("unhandledRejection", F._data, F);
  }
  function D(F) {
    ie.process.emit("rejectionHandled", F);
  }
  function B(F) {
    if (typeof F != "function")
      throw new TypeError("Promise resolver " + F + " is not a function");
    if (!(this instanceof B))
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    this._then = [], d(F, this);
  }
  return B.prototype = {
    constructor: B,
    _state: e,
    _then: null,
    _data: void 0,
    _handled: !1,
    then: function(F, L) {
      var Y = {
        owner: this,
        then: new this.constructor(i),
        fulfilled: F,
        rejected: L
      };
      return (L || F) && !this._handled && (this._handled = !0, this._state === n && a && u(D, this)), this._state === r || this._state === n ? u(h, Y) : this._then.push(Y), Y.then;
    },
    catch: function(F) {
      return this.then(null, F);
    }
  }, B.all = function(F) {
    if (!Array.isArray(F))
      throw new TypeError("You must pass an array to Promise.all().");
    return new B(function(L, Y) {
      var E = [], U = 0;
      function q(N) {
        return U++, function(P) {
          E[N] = P, --U || L(E);
        };
      }
      for (var G = 0, J; G < F.length; G++)
        J = F[G], J && typeof J.then == "function" ? J.then(q(G), Y) : E[G] = J;
      U || L(E);
    });
  }, B.race = function(F) {
    if (!Array.isArray(F))
      throw new TypeError("You must pass an array to Promise.race().");
    return new B(function(L, Y) {
      for (var E = 0, U; E < F.length; E++)
        U = F[E], U && typeof U.then == "function" ? U.then(L, Y) : L(U);
    });
  }, B.resolve = function(F) {
    return F && typeof F == "object" && F.constructor === B ? F : new B(function(L) {
      L(F);
    });
  }, B.reject = function(F) {
    return new B(function(L, Y) {
      Y(F);
    });
  }, Os = B, Os;
}
var MC = typeof Promise == "function" ? Promise : BC();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var pd = Object.getOwnPropertySymbols, jC = Object.prototype.hasOwnProperty, qC = Object.prototype.propertyIsEnumerable;
function HC(e) {
  if (e == null)
    throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(e);
}
function GC() {
  try {
    if (!Object.assign)
      return !1;
    var e = new String("abc");
    if (e[5] = "de", Object.getOwnPropertyNames(e)[0] === "5")
      return !1;
    for (var t = {}, r = 0; r < 10; r++)
      t["_" + String.fromCharCode(r)] = r;
    var n = Object.getOwnPropertyNames(t).map(function(a) {
      return t[a];
    });
    if (n.join("") !== "0123456789")
      return !1;
    var i = {};
    return "abcdefghijklmnopqrst".split("").forEach(function(a) {
      i[a] = a;
    }), Object.keys(Object.assign({}, i)).join("") === "abcdefghijklmnopqrst";
  } catch {
    return !1;
  }
}
var Cp = GC() ? Object.assign : function(e, t) {
  for (var r, n = HC(e), i, a = 1; a < arguments.length; a++) {
    r = Object(arguments[a]);
    for (var o in r)
      jC.call(r, o) && (n[o] = r[o]);
    if (pd) {
      i = pd(r);
      for (var s = 0; s < i.length; s++)
        qC.call(r, i[s]) && (n[i[s]] = r[i[s]]);
    }
  }
  return n;
}, zC = Ye.PassThrough, WC = Cp, VC = function(e) {
  e = WC({}, e);
  var t = e.array, r = e.encoding, n = r === "buffer", i = !1;
  t ? i = !(r || n) : r = r || "utf8", n && (r = null);
  var a = 0, o = [], s = new zC({ objectMode: i });
  return r && s.setEncoding(r), s.on("data", function(l) {
    o.push(l), i ? a = o.length : a += l.length;
  }), s.getBufferedValue = function() {
    return t ? o : n ? Buffer.concat(o, a) : o.join("");
  }, s.getBufferedLength = function() {
    return a;
  }, s;
}, md = MC, Wl = Cp, YC = VC;
function Vl(e, t) {
  if (!e)
    return md.reject(new Error("Expected a stream"));
  t = Wl({ maxBuffer: 1 / 0 }, t);
  var r = t.maxBuffer, n, i, a = new md(function(o, s) {
    n = YC(t), e.once("error", l), e.pipe(n), n.on("data", function() {
      n.getBufferedLength() > r && s(new Error("maxBuffer exceeded"));
    }), n.once("error", l), n.on("end", o), i = function() {
      e.unpipe && e.unpipe(n);
    };
    function l(p) {
      p && (p.bufferedData = n.getBufferedValue()), s(p);
    }
  });
  return a.then(i, i), a.then(function() {
    return n.getBufferedValue();
  });
}
Qa.exports = Vl;
Qa.exports.buffer = function(e, t) {
  return Vl(e, Wl({}, t, { encoding: "buffer" }));
};
Qa.exports.array = function(e, t) {
  return Vl(e, Wl({}, t, { array: !0 }));
};
var XC = Qa.exports, Rp = { exports: {} }, xd = function(e, t, r) {
  return function() {
    for (var n = this, i = new Array(arguments.length), a = 0; a < arguments.length; a++)
      i[a] = arguments[a];
    return new t(function(o, s) {
      i.push(function(l, p) {
        if (l)
          s(l);
        else if (r.multiArgs) {
          for (var u = new Array(arguments.length - 1), d = 1; d < arguments.length; d++)
            u[d - 1] = arguments[d];
          o(u);
        } else
          o(p);
      }), e.apply(n, i);
    });
  };
}, gd = Rp.exports = function(e, t, r) {
  typeof t != "function" && (r = t, t = Promise), r = r || {}, r.exclude = r.exclude || [/.+Sync$/];
  var n = function(a) {
    var o = function(s) {
      return typeof s == "string" ? a === s : s.test(a);
    };
    return r.include ? r.include.some(o) : !r.exclude.some(o);
  }, i = typeof e == "function" ? function() {
    return r.excludeMain ? e.apply(this, arguments) : xd(e, t, r).apply(this, arguments);
  } : {};
  return Object.keys(e).reduce(function(a, o) {
    var s = e[o];
    return a[o] = typeof s == "function" && n(o) ? xd(s, t, r) : s, a;
  }, i);
};
gd.all = gd;
var Op = Rp.exports, xt = {}, pi = {}, KC = Za;
function Za() {
  this.pending = 0, this.max = 1 / 0, this.listeners = [], this.waiting = [], this.error = null;
}
Za.prototype.go = function(e) {
  this.pending < this.max ? Dp(this, e) : this.waiting.push(e);
};
Za.prototype.wait = function(e) {
  this.pending === 0 ? e(this.error) : this.listeners.push(e);
};
Za.prototype.hold = function() {
  return Pp(this);
};
function Pp(e) {
  e.pending += 1;
  var t = !1;
  return r;
  function r(i) {
    if (t) throw new Error("callback called twice");
    if (t = !0, e.error = e.error || i, e.pending -= 1, e.waiting.length > 0 && e.pending < e.max)
      Dp(e, e.waiting.shift());
    else if (e.pending === 0) {
      var a = e.listeners;
      e.listeners = [], a.forEach(n);
    }
  }
  function n(i) {
    i(e.error);
  }
}
function Dp(e, t) {
  t(Pp(e));
}
var mi = Re, eo = Je, Yl = Ye, Ip = Yl.Readable, Xl = Yl.Writable, JC = Yl.PassThrough, QC = KC, to = zn.EventEmitter;
pi.createFromBuffer = ZC;
pi.createFromFd = e6;
pi.BufferSlicer = Tt;
pi.FdSlicer = At;
eo.inherits(At, to);
function At(e, t) {
  t = t || {}, to.call(this), this.fd = e, this.pend = new QC(), this.pend.max = 1, this.refCount = 0, this.autoClose = !!t.autoClose;
}
At.prototype.read = function(e, t, r, n, i) {
  var a = this;
  a.pend.go(function(o) {
    mi.read(a.fd, e, t, r, n, function(s, l, p) {
      o(), i(s, l, p);
    });
  });
};
At.prototype.write = function(e, t, r, n, i) {
  var a = this;
  a.pend.go(function(o) {
    mi.write(a.fd, e, t, r, n, function(s, l, p) {
      o(), i(s, l, p);
    });
  });
};
At.prototype.createReadStream = function(e) {
  return new ro(this, e);
};
At.prototype.createWriteStream = function(e) {
  return new no(this, e);
};
At.prototype.ref = function() {
  this.refCount += 1;
};
At.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.autoClose && mi.close(e.fd, t);
  function t(r) {
    r ? e.emit("error", r) : e.emit("close");
  }
};
eo.inherits(ro, Ip);
function ro(e, t) {
  t = t || {}, Ip.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end, this.pos = this.start, this.destroyed = !1;
}
ro.prototype._read = function(e) {
  var t = this;
  if (!t.destroyed) {
    var r = Math.min(t._readableState.highWaterMark, e);
    if (t.endOffset != null && (r = Math.min(r, t.endOffset - t.pos)), r <= 0) {
      t.destroyed = !0, t.push(null), t.context.unref();
      return;
    }
    t.context.pend.go(function(n) {
      if (t.destroyed) return n();
      var i = new Buffer(r);
      mi.read(t.context.fd, i, 0, r, t.pos, function(a, o) {
        a ? t.destroy(a) : o === 0 ? (t.destroyed = !0, t.push(null), t.context.unref()) : (t.pos += o, t.push(i.slice(0, o))), n();
      });
    });
  }
};
ro.prototype.destroy = function(e) {
  this.destroyed || (e = e || new Error("stream destroyed"), this.destroyed = !0, this.emit("error", e), this.context.unref());
};
eo.inherits(no, Xl);
function no(e, t) {
  t = t || {}, Xl.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end == null ? 1 / 0 : +t.end, this.bytesWritten = 0, this.pos = this.start, this.destroyed = !1, this.on("finish", this.destroy.bind(this));
}
no.prototype._write = function(e, t, r) {
  var n = this;
  if (!n.destroyed) {
    if (n.pos + e.length > n.endOffset) {
      var i = new Error("maximum file length exceeded");
      i.code = "ETOOBIG", n.destroy(), r(i);
      return;
    }
    n.context.pend.go(function(a) {
      if (n.destroyed) return a();
      mi.write(n.context.fd, e, 0, e.length, n.pos, function(o, s) {
        o ? (n.destroy(), a(), r(o)) : (n.bytesWritten += s, n.pos += s, n.emit("progress"), a(), r());
      });
    });
  }
};
no.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.context.unref());
};
eo.inherits(Tt, to);
function Tt(e, t) {
  to.call(this), t = t || {}, this.refCount = 0, this.buffer = e, this.maxChunkSize = t.maxChunkSize || Number.MAX_SAFE_INTEGER;
}
Tt.prototype.read = function(e, t, r, n, i) {
  var a = n + r, o = a - this.buffer.length, s = o > 0 ? o : r;
  this.buffer.copy(e, t, n, a), setImmediate(function() {
    i(null, s);
  });
};
Tt.prototype.write = function(e, t, r, n, i) {
  e.copy(this.buffer, n, t, t + r), setImmediate(function() {
    i(null, r, e);
  });
};
Tt.prototype.createReadStream = function(e) {
  e = e || {};
  var t = new JC(e);
  t.destroyed = !1, t.start = e.start || 0, t.endOffset = e.end, t.pos = t.endOffset || this.buffer.length;
  for (var r = this.buffer.slice(t.start, t.pos), n = 0; ; ) {
    var i = n + this.maxChunkSize;
    if (i >= r.length) {
      n < r.length && t.write(r.slice(n, r.length));
      break;
    }
    t.write(r.slice(n, i)), n = i;
  }
  return t.end(), t.destroy = function() {
    t.destroyed = !0;
  }, t;
};
Tt.prototype.createWriteStream = function(e) {
  var t = this;
  e = e || {};
  var r = new Xl(e);
  return r.start = e.start || 0, r.endOffset = e.end == null ? this.buffer.length : +e.end, r.bytesWritten = 0, r.pos = r.start, r.destroyed = !1, r._write = function(n, i, a) {
    if (!r.destroyed) {
      var o = r.pos + n.length;
      if (o > r.endOffset) {
        var s = new Error("maximum file length exceeded");
        s.code = "ETOOBIG", r.destroyed = !0, a(s);
        return;
      }
      n.copy(t.buffer, r.pos, 0, n.length), r.bytesWritten += n.length, r.pos = o, r.emit("progress"), a();
    }
  }, r.destroy = function() {
    r.destroyed = !0;
  }, r;
};
Tt.prototype.ref = function() {
  this.refCount += 1;
};
Tt.prototype.unref = function() {
  if (this.refCount -= 1, this.refCount < 0)
    throw new Error("invalid unref");
};
function ZC(e, t) {
  return new Tt(e, t);
}
function e6(e, t) {
  return new At(e, t);
}
var Lt = el.Buffer, Ks = [
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
];
typeof Int32Array < "u" && (Ks = new Int32Array(Ks));
function Fp(e) {
  if (Lt.isBuffer(e))
    return e;
  var t = typeof Lt.alloc == "function" && typeof Lt.from == "function";
  if (typeof e == "number")
    return t ? Lt.alloc(e) : new Lt(e);
  if (typeof e == "string")
    return t ? Lt.from(e) : new Lt(e);
  throw new Error("input must be buffer, number, or string, received " + typeof e);
}
function t6(e) {
  var t = Fp(4);
  return t.writeInt32BE(e, 0), t;
}
function Kl(e, t) {
  e = Fp(e), Lt.isBuffer(t) && (t = t.readUInt32BE(0));
  for (var r = ~~t ^ -1, n = 0; n < e.length; n++)
    r = Ks[(r ^ e[n]) & 255] ^ r >>> 8;
  return r ^ -1;
}
function Jl() {
  return t6(Kl.apply(null, arguments));
}
Jl.signed = function() {
  return Kl.apply(null, arguments);
};
Jl.unsigned = function() {
  return Kl.apply(null, arguments) >>> 0;
};
var r6 = Jl, Js = Re, n6 = ba, Np = pi, i6 = r6, io = Je, ao = zn.EventEmitter, $p = Ye.Transform, Ql = Ye.PassThrough, a6 = Ye.Writable;
xt.open = o6;
xt.fromFd = Lp;
xt.fromBuffer = s6;
xt.fromRandomAccessReader = Zl;
xt.dosDateTimeToDate = kp;
xt.validateFileName = Bp;
xt.ZipFile = Xt;
xt.Entry = xi;
xt.RandomAccessReader = er;
function o6(e, t, r) {
  typeof t == "function" && (r = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !0), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), r == null && (r = wa), Js.open(e, "r", function(n, i) {
    if (n) return r(n);
    Lp(i, t, function(a, o) {
      a && Js.close(i, wa), r(a, o);
    });
  });
}
function Lp(e, t, r) {
  typeof t == "function" && (r = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !1), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), r == null && (r = wa), Js.fstat(e, function(n, i) {
    if (n) return r(n);
    var a = Np.createFromFd(e, { autoClose: !0 });
    Zl(a, i.size, t, r);
  });
}
function s6(e, t, r) {
  typeof t == "function" && (r = t, t = null), t == null && (t = {}), t.autoClose = !1, t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1);
  var n = Np.createFromBuffer(e, { maxChunkSize: 65536 });
  Zl(n, e.length, t, r);
}
function Zl(e, t, r, n) {
  typeof r == "function" && (n = r, r = null), r == null && (r = {}), r.autoClose == null && (r.autoClose = !0), r.lazyEntries == null && (r.lazyEntries = !1), r.decodeStrings == null && (r.decodeStrings = !0);
  var i = !!r.decodeStrings;
  if (r.validateEntrySizes == null && (r.validateEntrySizes = !0), r.strictFileNames == null && (r.strictFileNames = !1), n == null && (n = wa), typeof t != "number") throw new Error("expected totalSize parameter to be a number");
  if (t > Number.MAX_SAFE_INTEGER)
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  e.ref();
  var a = 22, o = 65535, s = Math.min(a + o, t), l = ht(s), p = t - l.length;
  Yr(e, l, 0, s, p, function(u) {
    if (u) return n(u);
    for (var d = s - a; d >= 0; d -= 1)
      if (l.readUInt32LE(d) === 101010256) {
        var h = l.slice(d), m = h.readUInt16LE(4);
        if (m !== 0)
          return n(new Error("multi-disk zip files are not supported: found disk number: " + m));
        var w = h.readUInt16LE(10), x = h.readUInt32LE(16), b = h.readUInt16LE(20), g = h.length - a;
        if (b !== g)
          return n(new Error("invalid comment length. expected: " + g + ". found: " + b));
        var v = i ? ia(h, 22, h.length, !1) : h.slice(22);
        if (!(w === 65535 || x === 4294967295))
          return n(null, new Xt(e, x, t, w, v, r.autoClose, r.lazyEntries, i, r.validateEntrySizes, r.strictFileNames));
        var O = ht(20), D = p + d - O.length;
        Yr(e, O, 0, O.length, D, function(B) {
          if (B) return n(B);
          if (O.readUInt32LE(0) !== 117853008)
            return n(new Error("invalid zip64 end of central directory locator signature"));
          var F = Xr(O, 8), L = ht(56);
          Yr(e, L, 0, L.length, F, function(Y) {
            return Y ? n(Y) : L.readUInt32LE(0) !== 101075792 ? n(new Error("invalid zip64 end of central directory record signature")) : (w = Xr(L, 32), x = Xr(L, 48), n(null, new Xt(e, x, t, w, v, r.autoClose, r.lazyEntries, i, r.validateEntrySizes, r.strictFileNames)));
          });
        });
        return;
      }
    n(new Error("end of central directory record signature not found"));
  });
}
io.inherits(Xt, ao);
function Xt(e, t, r, n, i, a, o, s, l, p) {
  var u = this;
  ao.call(u), u.reader = e, u.reader.on("error", function(d) {
    Up(u, d);
  }), u.reader.once("close", function() {
    u.emit("close");
  }), u.readEntryCursor = t, u.fileSize = r, u.entryCount = n, u.comment = i, u.entriesRead = 0, u.autoClose = !!a, u.lazyEntries = !!o, u.decodeStrings = !!s, u.validateEntrySizes = !!l, u.strictFileNames = !!p, u.isOpen = !0, u.emittedError = !1, u.lazyEntries || u._readEntry();
}
Xt.prototype.close = function() {
  this.isOpen && (this.isOpen = !1, this.reader.unref());
};
function rt(e, t) {
  e.autoClose && e.close(), Up(e, t);
}
function Up(e, t) {
  e.emittedError || (e.emittedError = !0, e.emit("error", t));
}
Xt.prototype.readEntry = function() {
  if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
Xt.prototype._readEntry = function() {
  var e = this;
  if (e.entryCount === e.entriesRead) {
    setImmediate(function() {
      e.autoClose && e.close(), !e.emittedError && e.emit("end");
    });
    return;
  }
  if (!e.emittedError) {
    var t = ht(46);
    Yr(e.reader, t, 0, t.length, e.readEntryCursor, function(r) {
      if (r) return rt(e, r);
      if (!e.emittedError) {
        var n = new xi(), i = t.readUInt32LE(0);
        if (i !== 33639248) return rt(e, new Error("invalid central directory file header signature: 0x" + i.toString(16)));
        if (n.versionMadeBy = t.readUInt16LE(4), n.versionNeededToExtract = t.readUInt16LE(6), n.generalPurposeBitFlag = t.readUInt16LE(8), n.compressionMethod = t.readUInt16LE(10), n.lastModFileTime = t.readUInt16LE(12), n.lastModFileDate = t.readUInt16LE(14), n.crc32 = t.readUInt32LE(16), n.compressedSize = t.readUInt32LE(20), n.uncompressedSize = t.readUInt32LE(24), n.fileNameLength = t.readUInt16LE(28), n.extraFieldLength = t.readUInt16LE(30), n.fileCommentLength = t.readUInt16LE(32), n.internalFileAttributes = t.readUInt16LE(36), n.externalFileAttributes = t.readUInt32LE(38), n.relativeOffsetOfLocalHeader = t.readUInt32LE(42), n.generalPurposeBitFlag & 64) return rt(e, new Error("strong encryption is not supported"));
        e.readEntryCursor += 46, t = ht(n.fileNameLength + n.extraFieldLength + n.fileCommentLength), Yr(e.reader, t, 0, t.length, e.readEntryCursor, function(a) {
          if (a) return rt(e, a);
          if (!e.emittedError) {
            var o = (n.generalPurposeBitFlag & 2048) !== 0;
            n.fileName = e.decodeStrings ? ia(t, 0, n.fileNameLength, o) : t.slice(0, n.fileNameLength);
            var s = n.fileNameLength + n.extraFieldLength, l = t.slice(n.fileNameLength, s);
            n.extraFields = [];
            for (var p = 0; p < l.length - 3; ) {
              var u = l.readUInt16LE(p + 0), d = l.readUInt16LE(p + 2), h = p + 4, m = h + d;
              if (m > l.length) return rt(e, new Error("extra field length exceeds extra field buffer size"));
              var w = ht(d);
              l.copy(w, 0, h, m), n.extraFields.push({
                id: u,
                data: w
              }), p = m;
            }
            if (n.fileComment = e.decodeStrings ? ia(t, s, s + n.fileCommentLength, o) : t.slice(s, s + n.fileCommentLength), n.comment = n.fileComment, e.readEntryCursor += t.length, e.entriesRead += 1, n.uncompressedSize === 4294967295 || n.compressedSize === 4294967295 || n.relativeOffsetOfLocalHeader === 4294967295) {
              for (var x = null, p = 0; p < n.extraFields.length; p++) {
                var b = n.extraFields[p];
                if (b.id === 1) {
                  x = b.data;
                  break;
                }
              }
              if (x == null)
                return rt(e, new Error("expected zip64 extended information extra field"));
              var g = 0;
              if (n.uncompressedSize === 4294967295) {
                if (g + 8 > x.length)
                  return rt(e, new Error("zip64 extended information extra field does not include uncompressed size"));
                n.uncompressedSize = Xr(x, g), g += 8;
              }
              if (n.compressedSize === 4294967295) {
                if (g + 8 > x.length)
                  return rt(e, new Error("zip64 extended information extra field does not include compressed size"));
                n.compressedSize = Xr(x, g), g += 8;
              }
              if (n.relativeOffsetOfLocalHeader === 4294967295) {
                if (g + 8 > x.length)
                  return rt(e, new Error("zip64 extended information extra field does not include relative header offset"));
                n.relativeOffsetOfLocalHeader = Xr(x, g), g += 8;
              }
            }
            if (e.decodeStrings)
              for (var p = 0; p < n.extraFields.length; p++) {
                var b = n.extraFields[p];
                if (b.id === 28789) {
                  if (b.data.length < 6 || b.data.readUInt8(0) !== 1)
                    continue;
                  var v = b.data.readUInt32LE(1);
                  if (i6.unsigned(t.slice(0, n.fileNameLength)) !== v)
                    continue;
                  n.fileName = ia(b.data, 5, b.data.length, !0);
                  break;
                }
              }
            if (e.validateEntrySizes && n.compressionMethod === 0) {
              var O = n.uncompressedSize;
              if (n.isEncrypted() && (O += 12), n.compressedSize !== O) {
                var D = "compressed/uncompressed size mismatch for stored file: " + n.compressedSize + " != " + n.uncompressedSize;
                return rt(e, new Error(D));
              }
            }
            if (e.decodeStrings) {
              e.strictFileNames || (n.fileName = n.fileName.replace(/\\/g, "/"));
              var B = Bp(n.fileName, e.validateFileNameOptions);
              if (B != null) return rt(e, new Error(B));
            }
            e.emit("entry", n), e.lazyEntries || e._readEntry();
          }
        });
      }
    });
  }
};
Xt.prototype.openReadStream = function(e, t, r) {
  var n = this, i = 0, a = e.compressedSize;
  if (r == null)
    r = t, t = {};
  else {
    if (t.decrypt != null) {
      if (!e.isEncrypted())
        throw new Error("options.decrypt can only be specified for encrypted entries");
      if (t.decrypt !== !1) throw new Error("invalid options.decrypt value: " + t.decrypt);
      if (e.isCompressed() && t.decompress !== !1)
        throw new Error("entry is encrypted and compressed, and options.decompress !== false");
    }
    if (t.decompress != null) {
      if (!e.isCompressed())
        throw new Error("options.decompress can only be specified for compressed entries");
      if (!(t.decompress === !1 || t.decompress === !0))
        throw new Error("invalid options.decompress value: " + t.decompress);
    }
    if (t.start != null || t.end != null) {
      if (e.isCompressed() && t.decompress !== !1)
        throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
      if (e.isEncrypted() && t.decrypt !== !1)
        throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
    }
    if (t.start != null) {
      if (i = t.start, i < 0) throw new Error("options.start < 0");
      if (i > e.compressedSize) throw new Error("options.start > entry.compressedSize");
    }
    if (t.end != null) {
      if (a = t.end, a < 0) throw new Error("options.end < 0");
      if (a > e.compressedSize) throw new Error("options.end > entry.compressedSize");
      if (a < i) throw new Error("options.end < options.start");
    }
  }
  if (!n.isOpen) return r(new Error("closed"));
  if (e.isEncrypted() && t.decrypt !== !1)
    return r(new Error("entry is encrypted, and options.decrypt !== false"));
  n.reader.ref();
  var o = ht(30);
  Yr(n.reader, o, 0, o.length, e.relativeOffsetOfLocalHeader, function(s) {
    try {
      if (s) return r(s);
      var l = o.readUInt32LE(0);
      if (l !== 67324752)
        return r(new Error("invalid local file header signature: 0x" + l.toString(16)));
      var p = o.readUInt16LE(26), u = o.readUInt16LE(28), d = e.relativeOffsetOfLocalHeader + o.length + p + u, h;
      if (e.compressionMethod === 0)
        h = !1;
      else if (e.compressionMethod === 8)
        h = t.decompress != null ? t.decompress : !0;
      else
        return r(new Error("unsupported compression method: " + e.compressionMethod));
      var m = d, w = m + e.compressedSize;
      if (e.compressedSize !== 0 && w > n.fileSize)
        return r(new Error("file data overflows file bounds: " + m + " + " + e.compressedSize + " > " + n.fileSize));
      var x = n.reader.createReadStream({
        start: m + i,
        end: m + a
      }), b = x;
      if (h) {
        var g = !1, v = n6.createInflateRaw();
        x.on("error", function(O) {
          setImmediate(function() {
            g || v.emit("error", O);
          });
        }), x.pipe(v), n.validateEntrySizes ? (b = new gi(e.uncompressedSize), v.on("error", function(O) {
          setImmediate(function() {
            g || b.emit("error", O);
          });
        }), v.pipe(b)) : b = v, b.destroy = function() {
          g = !0, v !== b && v.unpipe(b), x.unpipe(v), x.destroy();
        };
      }
      r(null, b);
    } finally {
      n.reader.unref();
    }
  });
};
function xi() {
}
xi.prototype.getLastModDate = function() {
  return kp(this.lastModFileDate, this.lastModFileTime);
};
xi.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 1) !== 0;
};
xi.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};
function kp(e, t) {
  var r = e & 31, n = (e >> 5 & 15) - 1, i = (e >> 9 & 127) + 1980, a = 0, o = (t & 31) * 2, s = t >> 5 & 63, l = t >> 11 & 31;
  return new Date(i, n, r, l, s, o, a);
}
function Bp(e) {
  return e.indexOf("\\") !== -1 ? "invalid characters in fileName: " + e : /^[a-zA-Z]:/.test(e) || /^\//.test(e) ? "absolute path: " + e : e.split("/").indexOf("..") !== -1 ? "invalid relative path: " + e : null;
}
function Yr(e, t, r, n, i, a) {
  if (n === 0)
    return setImmediate(function() {
      a(null, ht(0));
    });
  e.read(t, r, n, i, function(o, s) {
    if (o) return a(o);
    if (s < n)
      return a(new Error("unexpected EOF"));
    a();
  });
}
io.inherits(gi, $p);
function gi(e) {
  $p.call(this), this.actualByteCount = 0, this.expectedByteCount = e;
}
gi.prototype._transform = function(e, t, r) {
  if (this.actualByteCount += e.length, this.actualByteCount > this.expectedByteCount) {
    var n = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return r(new Error(n));
  }
  r(null, e);
};
gi.prototype._flush = function(e) {
  if (this.actualByteCount < this.expectedByteCount) {
    var t = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return e(new Error(t));
  }
  e();
};
io.inherits(er, ao);
function er() {
  ao.call(this), this.refCount = 0;
}
er.prototype.ref = function() {
  this.refCount += 1;
};
er.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.close(t);
  function t(r) {
    if (r) return e.emit("error", r);
    e.emit("close");
  }
};
er.prototype.createReadStream = function(e) {
  var t = e.start, r = e.end;
  if (t === r) {
    var n = new Ql();
    return setImmediate(function() {
      n.end();
    }), n;
  }
  var i = this._readStreamForRange(t, r), a = !1, o = new oo(this);
  i.on("error", function(l) {
    setImmediate(function() {
      a || o.emit("error", l);
    });
  }), o.destroy = function() {
    i.unpipe(o), o.unref(), i.destroy();
  };
  var s = new gi(r - t);
  return o.on("error", function(l) {
    setImmediate(function() {
      a || s.emit("error", l);
    });
  }), s.destroy = function() {
    a = !0, o.unpipe(s), o.destroy();
  }, i.pipe(o).pipe(s);
};
er.prototype._readStreamForRange = function(e, t) {
  throw new Error("not implemented");
};
er.prototype.read = function(e, t, r, n, i) {
  var a = this.createReadStream({ start: n, end: n + r }), o = new a6(), s = 0;
  o._write = function(l, p, u) {
    l.copy(e, t + s, 0, l.length), s += l.length, u();
  }, o.on("finish", i), a.on("error", function(l) {
    i(l);
  }), a.pipe(o);
};
er.prototype.close = function(e) {
  setImmediate(e);
};
io.inherits(oo, Ql);
function oo(e) {
  Ql.call(this), this.context = e, this.context.ref(), this.unreffedYet = !1;
}
oo.prototype._flush = function(e) {
  this.unref(), e();
};
oo.prototype.unref = function(e) {
  this.unreffedYet || (this.unreffedYet = !0, this.context.unref());
};
var l6 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
function ia(e, t, r, n) {
  if (n)
    return e.toString("utf8", t, r);
  for (var i = "", a = t; a < r; a++)
    i += l6[e[a]];
  return i;
}
function Xr(e, t) {
  var r = e.readUInt32LE(t), n = e.readUInt32LE(t + 4);
  return n * 4294967296 + r;
}
var ht;
typeof Buffer.allocUnsafe == "function" ? ht = function(e) {
  return Buffer.allocUnsafe(e);
} : ht = function(e) {
  return new Buffer(e);
};
function wa(e) {
  if (e) throw e;
}
const yd = kC, c6 = XC, Mp = Op, u6 = xt, f6 = (e, t) => {
  const a = e.versionMadeBy >> 8;
  return (t & 61440) === 40960 ? "symlink" : (t & 61440) === 16384 || a === 0 && e.externalFileAttributes === 16 ? "directory" : "file";
}, d6 = (e, t) => {
  const r = {
    mode: e.externalFileAttributes >> 16 & 65535,
    mtime: e.getLastModDate(),
    path: e.fileName
  };
  return r.type = f6(e, r.mode), r.mode === 0 && r.type === "directory" && (r.mode = 493), r.mode === 0 && (r.mode = 420), Mp(t.openReadStream.bind(t))(e).then(c6.buffer).then((n) => (r.data = n, r.type === "symlink" && (r.linkname = n.toString()), r)).catch((n) => {
    throw t.close(), n;
  });
}, h6 = (e) => new Promise((t, r) => {
  const n = [];
  e.readEntry(), e.on("entry", (i) => {
    d6(i, e).catch(r).then((a) => {
      n.push(a), e.readEntry();
    });
  }), e.on("error", r), e.on("end", () => t(n));
});
var p6 = () => (e) => Buffer.isBuffer(e) ? !yd(e) || yd(e).ext !== "zip" ? Promise.resolve([]) : Mp(u6.fromBuffer)(e, { lazyEntries: !0 }).then(h6) : Promise.reject(new TypeError(`Expected a Buffer, got ${typeof e}`)), ec = { exports: {} };
const vd = (e, t) => function() {
  const r = t.promiseModule, n = new Array(arguments.length);
  for (let i = 0; i < arguments.length; i++)
    n[i] = arguments[i];
  return new r((i, a) => {
    t.errorFirst ? n.push(function(o, s) {
      if (t.multiArgs) {
        const l = new Array(arguments.length - 1);
        for (let p = 1; p < arguments.length; p++)
          l[p - 1] = arguments[p];
        o ? (l.unshift(o), a(l)) : i(l);
      } else o ? a(o) : i(s);
    }) : n.push(function(o) {
      if (t.multiArgs) {
        const s = new Array(arguments.length - 1);
        for (let l = 0; l < arguments.length; l++)
          s[l] = arguments[l];
        i(s);
      } else
        i(o);
    }), e.apply(this, n);
  });
};
var m6 = (e, t) => {
  t = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise
  }, t);
  const r = (i) => {
    const a = (o) => typeof o == "string" ? i === o : o.test(i);
    return t.include ? t.include.some(a) : !t.exclude.some(a);
  };
  let n;
  typeof e == "function" ? n = function() {
    return t.excludeMain ? e.apply(this, arguments) : vd(e, t).apply(this, arguments);
  } : n = Object.create(Object.getPrototypeOf(e));
  for (const i in e) {
    const a = e[i];
    n[i] = typeof a == "function" && r(i) ? vd(a, t) : a;
  }
  return n;
};
const x6 = Re, gr = ne, wd = m6, jp = {
  mode: 511 & ~process.umask(),
  fs: x6
}, qp = (e) => {
  if (process.platform === "win32" && /[<>:"|?*]/.test(e.replace(gr.parse(e).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${e}`);
    throw r.code = "EINVAL", r;
  }
};
ec.exports = (e, t) => Promise.resolve().then(() => {
  qp(e), t = Object.assign({}, jp, t);
  const r = wd(t.fs.mkdir), n = wd(t.fs.stat), i = (a) => r(a, t.mode).then(() => a).catch((o) => {
    if (o.code === "ENOENT") {
      if (o.message.includes("null bytes") || gr.dirname(a) === a)
        throw o;
      return i(gr.dirname(a)).then(() => i(a));
    }
    return n(a).then((s) => s.isDirectory() ? a : Promise.reject()).catch(() => {
      throw o;
    });
  });
  return i(gr.resolve(e));
});
ec.exports.sync = (e, t) => {
  qp(e), t = Object.assign({}, jp, t);
  const r = (n) => {
    try {
      t.fs.mkdirSync(n, t.mode);
    } catch (i) {
      if (i.code === "ENOENT") {
        if (i.message.includes("null bytes") || gr.dirname(n) === n)
          throw i;
        return r(gr.dirname(n)), r(n);
      }
      try {
        if (!t.fs.statSync(n).isDirectory())
          throw new Error("The path is not a directory");
      } catch {
        throw i;
      }
    }
    return n;
  };
  return r(gr.resolve(e));
};
var g6 = ec.exports;
/*!
 * is-natural-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-natural-number.js
*/
function y6(e, t) {
  if (t) {
    if (typeof t != "object")
      throw new TypeError(
        String(t) + " is not an object. Expected an object that has boolean `includeZero` property."
      );
    if ("includeZero" in t) {
      if (typeof t.includeZero != "boolean")
        throw new TypeError(
          String(t.includeZero) + " is neither true nor false. `includeZero` option must be a Boolean value."
        );
      if (t.includeZero && e === 0)
        return !0;
    }
  }
  return Number.isSafeInteger(e) && e >= 1;
}
const v6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: y6
}, Symbol.toStringTag, { value: "Module" })), w6 = /* @__PURE__ */ tx(v6);
/*!
 * strip-dirs | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/node-strip-dirs
*/
const vn = ne, wn = Je, E6 = w6;
var _6 = function(t, r, n) {
  if (typeof t != "string")
    throw new TypeError(
      wn.inspect(t) + " is not a string. First argument to strip-dirs must be a path string."
    );
  if (vn.posix.isAbsolute(t) || vn.win32.isAbsolute(t))
    throw new Error(`${t} is an absolute path. strip-dirs requires a relative path.`);
  if (!E6(r, { includeZero: !0 }))
    throw new Error(
      "The Second argument of strip-dirs must be a natural number or 0, but received " + wn.inspect(r) + "."
    );
  if (n) {
    if (typeof n != "object")
      throw new TypeError(
        wn.inspect(n) + " is not an object. Expected an object with a boolean `disallowOverflow` property."
      );
    if (Array.isArray(n))
      throw new TypeError(
        wn.inspect(n) + " is an array. Expected an object with a boolean `disallowOverflow` property."
      );
    if ("disallowOverflow" in n && typeof n.disallowOverflow != "boolean")
      throw new TypeError(
        wn.inspect(n.disallowOverflow) + " is neither true nor false. `disallowOverflow` option must be a Boolean value."
      );
  } else
    n = { disallowOverflow: !1 };
  const i = vn.normalize(t).split(vn.sep);
  if (i.length > 1 && i[0] === "." && i.shift(), r > i.length - 1) {
    if (n.disallowOverflow)
      throw new RangeError("Cannot strip more directories than there are.");
    r = i.length - 1;
  }
  return vn.join.apply(null, i.slice(r));
};
const aa = ne, b6 = Pe, S6 = Hl, A6 = FC, T6 = UC, C6 = p6, Qs = g6, R6 = Op, O6 = _6, Ve = R6(b6), P6 = (e, t) => t.plugins.length === 0 ? Promise.resolve([]) : Promise.all(t.plugins.map((r) => r(e, t))).then((r) => r.reduce((n, i) => n.concat(i))), Zs = (e, t) => Ve.realpath(e).catch((r) => {
  const n = aa.dirname(e);
  return Zs(n, t);
}).then((r) => {
  if (r.indexOf(t) !== 0)
    throw new Error("Refusing to create a directory outside the output path.");
  return Qs(e).then(Ve.realpath);
}), D6 = (e, t) => Ve.readlink(e).catch((r) => null).then((r) => {
  if (r)
    throw new Error("Refusing to write into a symlink");
  return t;
}), I6 = (e, t, r) => P6(e, r).then((n) => (r.strip > 0 && (n = n.map((i) => (i.path = O6(i.path, r.strip), i)).filter((i) => i.path !== ".")), typeof r.filter == "function" && (n = n.filter(r.filter)), typeof r.map == "function" && (n = n.map(r.map)), t ? Promise.all(n.map((i) => {
  const a = aa.join(t, i.path), o = i.mode & ~process.umask(), s = /* @__PURE__ */ new Date();
  return i.type === "directory" ? Qs(t).then((l) => Ve.realpath(l)).then((l) => Zs(a, l)).then(() => Ve.utimes(a, s, i.mtime)).then(() => i) : Qs(t).then((l) => Ve.realpath(l)).then((l) => Zs(aa.dirname(a), l).then(() => l)).then((l) => i.type === "file" ? D6(a, l) : l).then((l) => Ve.realpath(aa.dirname(a)).then((p) => {
    if (p.indexOf(l) !== 0)
      throw new Error("Refusing to write outside output directory: " + p);
  })).then(() => i.type === "link" || i.type === "symlink" && process.platform === "win32" ? Ve.link(i.linkname, a) : i.type === "symlink" ? Ve.symlink(i.linkname, a) : Ve.writeFile(a, i.data, { mode: o })).then(() => i.type === "file" && Ve.utimes(a, s, i.mtime)).then(() => i);
})) : n));
var F6 = (e, t, r) => typeof e != "string" && !Buffer.isBuffer(e) ? Promise.reject(new TypeError("Input file required")) : (typeof t == "object" && (r = t, t = null), r = Object.assign({ plugins: [
  S6(),
  A6(),
  T6(),
  C6()
] }, r), (typeof e == "string" ? Ve.readFile(e) : Promise.resolve(e)).then((i) => I6(i, t, r)));
const N6 = /* @__PURE__ */ Od(F6);
function Hp(e) {
  var n;
  const t = (n = e.match(/(\d+\.\d+)/)) == null ? void 0 : n[0], r = parseFloat(t || "1.21");
  return r >= 1.2 ? 21 : r >= 1.17 ? 17 : 8;
}
const Ed = (e, t) => {
  const r = ye.join(t, "runtime", `java-${e}`), n = process.platform === "win32" ? "java.exe" : "java", i = (a) => {
    if (!le.existsSync(a)) return null;
    const o = le.readdirSync(a);
    for (const s of o) {
      const l = ye.join(a, s);
      if (le.statSync(l).isDirectory()) {
        const p = i(l);
        if (p) return p;
      } else if (s.toLowerCase() === n && a.toLowerCase().endsWith("bin"))
        return l;
    }
    return null;
  };
  return i(r);
}, Gp = async (e, t, r) => {
  let n = Ed(e, r);
  if (n) return n;
  let i = "";
  e === "21" ? i = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.zip" : e === "17" ? i = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jdk_x64_windows_hotspot_17.0.10_7.zip" : i = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u402-b06/OpenJDK8U-jdk_x64_windows_hotspot_8u402b06.zip";
  const a = ye.join(r, "runtime", `java-${e}`), o = ye.join(r, `temp_java_${e}.zip`);
  le.existsSync(ye.join(r, "runtime")) || le.mkdirSync(ye.join(r, "runtime"), { recursive: !0 }), t.send("launch-status", `Загрузка Java ${e}...`), await zp(i, o, t, `Java ${e}`), t.send("launch-status", "Распаковка Java..."), le.existsSync(a) && le.rmSync(a, { recursive: !0, force: !0 }), le.mkdirSync(a, { recursive: !0 }), await N6(o, a), le.existsSync(o) && le.unlinkSync(o);
  const s = Ed(e, r);
  if (!s) throw new Error(`Не удалось найти java.exe после распаковки Java ${e}`);
  return s;
};
function zp(e, t, r, n = "Загрузка...") {
  return new Promise((i, a) => {
    const o = le.createWriteStream(t);
    Zm.get(e, {
      headers: { "User-Agent": "Mozilla/5.0" }
    }, (l) => {
      if ([301, 302, 307, 308].includes(l.statusCode || 0))
        return o.close(), zp(l.headers.location, t, r, n).then(i).catch(a);
      if (l.statusCode !== 200)
        return o.close(), a(new Error(`Ошибка сервера: ${l.statusCode}`));
      const p = parseInt(l.headers["content-length"] || "0", 10);
      let u = 0;
      l.on("data", (d) => {
        if (u += d.length, p > 0) {
          const h = Math.round(u / p * 100);
          r.send("download-progress", {
            type: "installer",
            task: n,
            percent: h,
            current: (u / (1024 * 1024)).toFixed(1),
            total: (p / (1024 * 1024)).toFixed(1)
          });
        }
      }), l.pipe(o), o.on("finish", () => {
        o.close(() => i());
      });
    }).on("error", (l) => {
      o.close(), le.existsSync(t) && le.unlinkSync(t), a(l);
    });
  });
}
const $6 = Ad(import.meta.url), L6 = $6("minecraft-launcher-core"), U6 = L6.Client, Wp = (e, t) => {
  const r = new U6();
  return console.log(`[Launcher] Инициализация запуска. Режим: ${t ? "Vanilla" : "Custom Build"}`), r.on("debug", (n) => {
    console.log(`[MCLC Debug]: ${n}`);
  }), r.on("progress", (n) => {
    const i = n.task, a = n.total, o = Math.round(i / a * 100);
    e.send("download-progress", {
      percent: isNaN(o) ? 0 : o,
      current: i.toString(),
      total: a.toString(),
      type: n.type,
      // Можно прокинуть флаг на фронт, если там нужна разная анимация
      isVanilla: t
    });
  }), r.on("download-status", (n) => {
    console.log(`[Download]: ${n.type} -> ${n.name}`);
    const a = {
      assets: "Загрузка ресурсов",
      libraries: t ? "Загрузка библиотек" : "Загрузка зависимостей сборки",
      jar: "Загрузка ядра игры",
      natives: "Настройка системы"
    }[n.type] || `Загрузка ${n.type}...`;
    e.send("launch-status", a);
  }), r.on("data", (n) => {
    const i = n.toString("utf-8");
    console.log(`[MC LOGS]: ${i.trim()}`), (i.includes("Setting user:") || i.includes("Sound engine started")) && (e.send("launch-status", "Игра запущена"), e.send("download-progress", null));
  }), r.on("close", (n) => {
    console.log(`[GAME] Выход с кодом: ${n}`);
    const i = n === 0 ? "Готов к игре" : "Игра завершилась с ошибкой";
    e.send("launch-status", i), e.send("download-progress", null), e.send("game-closed", n);
  }), r;
}, k6 = [
  {
    id: "fabric-latest-1.21.11",
    name: "Fabric 1.21.11",
    type: "custom",
    gameVersion: "1.21.11",
    loaderVersion: "0.18.4"
  },
  {
    id: "1.21.11",
    type: "release"
  },
  {
    id: "1.21.10",
    type: "release"
  },
  {
    id: "1.21.10",
    name: "Fabric 1.21.10",
    type: "custom",
    gameVersion: "1.21.10",
    loaderVersion: "0.18.4"
  },
  {
    id: "1.21.9",
    type: "release"
  },
  {
    id: "1.21.8",
    type: "release"
  },
  {
    id: "1.21.7",
    type: "release"
  },
  {
    id: "1.21.6",
    type: "release"
  },
  {
    id: "1.21.5",
    type: "release"
  },
  {
    id: "1.21.4",
    type: "release"
  },
  {
    id: "1.21.3",
    type: "release"
  },
  {
    id: "1.21.2",
    type: "release"
  },
  {
    id: "1.21.1",
    type: "release"
  },
  {
    id: "fabric-latest-1.21.1",
    name: "Fabric 1.21.1",
    type: "custom",
    gameVersion: "1.21.1",
    jsonName: "1.21.1",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.20.6",
    type: "release"
  },
  {
    id: "fabric-latest-1.20.4",
    name: "Fabric 1.20.4",
    type: "custom",
    gameVersion: "1.20.4",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.20.5",
    type: "release"
  },
  {
    id: "1.20.4",
    type: "release"
  },
  {
    id: "fabric-latest-1.20.4",
    name: "Fabric 1.20.4",
    type: "custom",
    gameVersion: "1.20.4",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.20.3",
    type: "release"
  },
  {
    id: "1.20.2",
    type: "release"
  },
  {
    id: "1.20.1",
    type: "release"
  },
  {
    id: "fabric-latest-1.20.1",
    name: "Fabric 1.20.1",
    type: "custom",
    gameVersion: "1.20.1",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.20",
    type: "release"
  },
  {
    id: "1.19.4",
    type: "release"
  },
  {
    id: "fabric-latest-1.19.4",
    name: "Fabric 1.19.4",
    type: "custom",
    gameVersion: "1.19.4",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.19.3",
    type: "release"
  },
  {
    id: "1.19.2",
    type: "release"
  },
  {
    id: "fabric-latest-1.19.2",
    name: "Fabric 1.19.2",
    type: "custom",
    gameVersion: "1.19.2",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.19.1",
    type: "release"
  },
  {
    id: "1.19",
    type: "release"
  },
  {
    id: "1.18.2",
    type: "release"
  },
  {
    id: "fabric-latest-1.18.2",
    name: "Fabric 1.18.2",
    type: "custom",
    gameVersion: "1.18.2",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.18.1",
    type: "release"
  },
  {
    id: "1.18",
    type: "release"
  },
  {
    id: "1.17.1",
    type: "release"
  },
  {
    id: "1.17",
    type: "release"
  },
  {
    id: "1.16.5",
    type: "release"
  },
  {
    id: "fabric-latest-1.16.5",
    name: "Fabric 1.16.5",
    type: "custom",
    gameVersion: "1.16.5",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.16.4",
    type: "release"
  },
  {
    id: "1.16.3",
    type: "release"
  },
  {
    id: "1.16.2",
    type: "release"
  },
  {
    id: "1.16.1",
    type: "release"
  },
  {
    id: "1.16",
    type: "release"
  },
  {
    id: "1.15.2",
    type: "release"
  },
  {
    id: "1.14.4",
    type: "release"
  },
  {
    id: "1.13.2",
    type: "release"
  },
  {
    id: "1.12.2",
    type: "release"
  },
  {
    id: "fabric-latest-1.12.2",
    name: "Fabric 1.12.2",
    type: "custom",
    gameVersion: "1.12.2",
    loaderVersion: "0.16.9"
  },
  {
    id: "1.11.2",
    type: "release"
  },
  {
    id: "1.10.2",
    type: "release"
  },
  {
    id: "1.9.4",
    type: "release"
  },
  {
    id: "1.8.9",
    type: "release"
  },
  {
    id: "1.7.10",
    type: "release"
  },
  {
    id: "1.7.9",
    type: "release"
  },
  {
    id: "1.7.8",
    type: "release"
  },
  {
    id: "1.7.7",
    type: "release"
  },
  {
    id: "1.7.6",
    type: "release"
  },
  {
    id: "1.7.5",
    type: "release"
  },
  {
    id: "1.7.4",
    type: "release"
  },
  {
    id: "1.7.3",
    type: "release"
  },
  {
    id: "1.7.2",
    type: "release"
  },
  {
    id: "1.6.4",
    type: "release"
  },
  {
    id: "1.6.3",
    type: "release"
  },
  {
    id: "1.6.2",
    type: "release"
  },
  {
    id: "1.6.1",
    type: "release"
  },
  {
    id: "1.5.2",
    type: "release"
  },
  {
    id: "1.5.1",
    type: "release"
  },
  {
    id: "1.4.7",
    type: "release"
  },
  {
    id: "1.4.6",
    type: "release"
  },
  {
    id: "1.4.5",
    type: "release"
  },
  {
    id: "1.4.4",
    type: "release"
  },
  {
    id: "1.4.2",
    type: "release"
  },
  {
    id: "1.3.2",
    type: "release"
  },
  {
    id: "1.3.1",
    type: "release"
  },
  {
    id: "1.2.5",
    type: "release"
  },
  {
    id: "1.2.4",
    type: "release"
  },
  {
    id: "1.2.3",
    type: "release"
  },
  {
    id: "1.2.2",
    type: "release"
  },
  {
    id: "1.2.1",
    type: "release"
  },
  {
    id: "1.1",
    type: "release"
  },
  {
    id: "1.0",
    type: "release"
  }
], Vp = {
  versions: k6
}, Yi = ne.join(_t.getPath("userData"), "launcher-config.json"), B6 = ne.join(_t.getPath("appData"), ".hard-monitoring"), Xi = {
  ram: 4,
  gamePath: B6,
  lastNickname: "",
  lastVersion: ""
}, Ht = {
  load() {
    if (!Re.existsSync(Yi))
      return this.save(Xi), Xi;
    try {
      const e = Re.readFileSync(Yi, "utf-8");
      return { ...Xi, ...JSON.parse(e) };
    } catch {
      return Xi;
    }
  },
  save(e) {
    const t = ne.dirname(Yi);
    Re.existsSync(t) || Re.mkdirSync(t, { recursive: !0 }), Re.writeFileSync(Yi, JSON.stringify(e, null, 2));
  }
};
xx.gracefulify(le);
const M6 = Ad(import.meta.url), Yp = ye.dirname(Jm(import.meta.url));
process.env.APP_ROOT = ye.join(Yp, "..");
const _d = process.env.VITE_DEV_SERVER_URL, j6 = ye.join(process.env.APP_ROOT, "dist");
let Kr = null;
function Xp(e) {
  const r = M6("crypto").createHash("md5").update(e).digest("hex"), n = [
    r.substring(0, 8),
    r.substring(8, 12),
    r.substring(12, 16),
    r.substring(16, 20),
    r.substring(20, 32)
  ].join("-");
  return {
    access_token: "0",
    client_token: n,
    uuid: n,
    name: e,
    user_properties: {},
    // Пустой Partial<any> объект вместо строки
    meta: {
      type: "mojang",
      // Обязательное литеральное поле
      demo: !1
    }
  };
}
function q6(e) {
  const t = e.match(/(\d+\.\d+\.?\d*)$/);
  return t ? t[0] : e;
}
async function H6(e, t) {
  const r = `https://meta.fabricmc.net/v2/versions/loader/${e}/${t}/profile/json`, n = await fetch(r);
  if (!n.ok) throw new Error(`Не удалось получить профиль Fabric для ${e}`);
  return await n.json();
}
async function G6(e, t, r, n) {
  const i = Ht.load(), a = q6(e), o = await Gp(
    Hp(a).toString(),
    r,
    i.gamePath
  ), s = {
    authorization: Xp(t),
    root: i.gamePath,
    // Используем динамический путь
    javaPath: o,
    version: { number: a, type: "release" },
    memory: { min: "1G", max: `${i.ram}G` },
    // МЕТОД 1: Стандартный
    quickPlay: void 0,
    // МЕТОД 2: Прямая вставка в аргументы
    args: []
  };
  s.overrides = {
    assetIndex: a,
    customArgs: s.args
  };
  const l = ye.join(i.gamePath, "versions", a), p = ye.join(l, `${a}.jar`), u = le.existsSync(p);
  await Wp(r, !u).launch(s);
}
async function z6(e, t, r) {
  const { id: n, gameVersion: i, loaderVersion: a } = e, o = Ht.load(), s = ye.join(o.gamePath, "versions", n), l = ye.join(s, `${n}.json`);
  if (!le.existsSync(l)) {
    console.log("[Launcher] Профиль не найден, скачиваем...");
    const w = await H6(i, a);
    w.id = n, le.existsSync(s) || le.mkdirSync(s, { recursive: !0 }), le.writeFileSync(l, JSON.stringify(w, null, 2));
  }
  const p = await Gp(
    Hp(i).toString(),
    r,
    o.gamePath
  ), u = {
    authorization: Xp(t),
    root: o.gamePath,
    // Путь установки игры
    javaPath: p,
    version: {
      number: i,
      custom: n,
      type: "release"
    },
    overrides: {
      detached: !0,
      extraArgs: ["--versionType", "release"]
    },
    skipAsync: !0,
    memory: {
      min: "1G",
      max: `${o.ram}G`
    }
  }, d = ye.join(s, `${n}.jar`), h = le.existsSync(d);
  console.log(`[Launcher] ${h ? "Быстрый запуск" : "Первый запуск с проверкой"}`), await Wp(r, !h).launch(u);
}
Bt.on("launch-game", async (e, { version: t, nickname: r }) => {
  const n = e.sender, i = Ht.load();
  TA(i.gamePath);
  try {
    const a = Vp.versions.find((o) => o.id === t);
    if (!a)
      throw new Error(`Версия ${t} не найдена в манифесте!`);
    if (a.type === "custom")
      await z6(a, r, n);
    else {
      const o = a.gameVersion || a.id;
      await G6(o, r, n);
    }
  } catch (a) {
    console.error("[Launch Error]", a), n.send("launch-error", a.message), n.send("game-closed");
  }
});
function bd() {
  Kr = new Sd({
    width: 1e3,
    height: 650,
    frame: !1,
    transparent: !0,
    webPreferences: {
      preload: ye.join(Yp, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), _d ? Kr.loadURL(_d) : Kr.loadFile(ye.join(j6, "index.html"));
}
Bt.handle("get-versions", async () => {
  const t = Ht.load().gamePath;
  return Vp.versions.map((r) => ({
    ...r,
    displayName: r.name || r.id,
    isDownloaded: AA(r.id, t)
  }));
});
Bt.on("window-control", (e, t) => {
  t === "minimize" && (Kr == null || Kr.minimize()), t === "close" && _t.quit();
});
Bt.on("open-game-folder", () => {
  const e = Ht.load();
  le.existsSync(e.gamePath) || le.mkdirSync(e.gamePath, { recursive: !0 }), Xm.openPath(e.gamePath);
});
function W6() {
  Bt.handle("get-settings", async () => Ht.load()), Bt.handle("save-settings", async (e, t) => {
    try {
      return Ht.save(t), { success: !0 };
    } catch (r) {
      return console.error("Save error:", r), { success: !1 };
    }
  }), Bt.handle("select-directory", async () => {
    const { canceled: e, filePaths: t } = await Km.showOpenDialog({
      properties: ["openDirectory", "createDirectory"],
      title: "Выберите папку для установки игры",
      buttonLabel: "Выбрать папку"
    });
    return e ? null : t[0];
  }), Bt.handle("get-default-settings", async () => {
    const e = {
      ram: 4,
      gamePath: ye.join(_t.getPath("appData"), ".hard-monitoring")
    };
    return Ht.save(e), e;
  });
}
_t.whenReady().then(() => {
  W6(), bd(), Pd.autoUpdater.checkForUpdatesAndNotify(), _t.on("activate", () => {
    Sd.getAllWindows().length === 0 && bd();
  });
});
_t.on("window-all-closed", () => {
  process.platform !== "darwin" && _t.quit();
});
export {
  j6 as RENDERER_DIST,
  _d as VITE_DEV_SERVER_URL,
  W6 as setupSettingsHandlers
};
