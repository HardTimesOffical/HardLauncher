import Nn, { app as _i, ipcMain as Cr, BrowserWindow as Am, shell as Tm } from "electron";
import { createRequire as Cg } from "node:module";
import { fileURLToPath as Og } from "node:url";
import xe from "node:path";
import ne from "node:fs";
import Pg from "node:https";
import ce from "path";
import at from "fs";
import Rm from "constants";
import le, { Readable as Fg } from "stream";
import Fe from "util";
import ul from "assert";
import Si, { EventEmitter as Dg } from "events";
import pl from "buffer";
import kg from "string_decoder";
import lt from "zlib";
import { exec as Ig } from "node:child_process";
import { promisify as Ng } from "node:util";
import uo from "http";
import fl from "https";
import ut from "url";
import jn from "crypto";
import Cm from "http2";
import Om from "tty";
import po from "os";
import fo from "child_process";
var ue = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function $g(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var Vt = Rm, Lg = process.cwd, ka = null, Ug = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return ka || (ka = Lg.call(process)), ka;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Ku = process.chdir;
  process.chdir = function(e) {
    ka = null, Ku.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ku);
}
var Bg = jg;
function jg(e) {
  Vt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, d, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), Ug === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(d, h, v) {
      var x = Date.now(), g = 0;
      l(d, h, function y(b) {
        if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - x < 6e4) {
          setTimeout(function() {
            e.stat(h, function(T, D) {
              T && T.code === "ENOENT" ? l(d, h, y) : v(b);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        v && v(b);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(d, h, v, x, g, y) {
      var b;
      if (y && typeof y == "function") {
        var T = 0;
        b = function(D, U, k) {
          if (D && D.code === "EAGAIN" && T < 10)
            return T++, l.call(e, d, h, v, x, g, b);
          y.apply(this, arguments);
        };
      }
      return l.call(e, d, h, v, x, g, b);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, d, h, v, x) {
      for (var g = 0; ; )
        try {
          return l.call(e, u, d, h, v, x);
        } catch (y) {
          if (y.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw y;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, d, h) {
      l.open(
        u,
        Vt.O_WRONLY | Vt.O_SYMLINK,
        d,
        function(v, x) {
          if (v) {
            h && h(v);
            return;
          }
          l.fchmod(x, d, function(g) {
            l.close(x, function(y) {
              h && h(g || y);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, d) {
      var h = l.openSync(u, Vt.O_WRONLY | Vt.O_SYMLINK, d), v = !0, x;
      try {
        x = l.fchmodSync(h, d), v = !1;
      } finally {
        if (v)
          try {
            l.closeSync(h);
          } catch {
          }
        else
          l.closeSync(h);
      }
      return x;
    };
  }
  function n(l) {
    Vt.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, d, h, v) {
      l.open(u, Vt.O_SYMLINK, function(x, g) {
        if (x) {
          v && v(x);
          return;
        }
        l.futimes(g, d, h, function(y) {
          l.close(g, function(b) {
            v && v(y || b);
          });
        });
      });
    }, l.lutimesSync = function(u, d, h) {
      var v = l.openSync(u, Vt.O_SYMLINK), x, g = !0;
      try {
        x = l.futimesSync(v, d, h), g = !1;
      } finally {
        if (g)
          try {
            l.closeSync(v);
          } catch {
          }
        else
          l.closeSync(v);
      }
      return x;
    }) : l.futimes && (l.lutimes = function(u, d, h, v) {
      v && process.nextTick(v);
    }, l.lutimesSync = function() {
    });
  }
  function r(l) {
    return l && function(u, d, h) {
      return l.call(e, u, d, function(v) {
        f(v) && (v = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, d) {
      try {
        return l.call(e, u, d);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function a(l) {
    return l && function(u, d, h, v) {
      return l.call(e, u, d, h, function(x) {
        f(x) && (x = null), v && v.apply(this, arguments);
      });
    };
  }
  function o(l) {
    return l && function(u, d, h) {
      try {
        return l.call(e, u, d, h);
      } catch (v) {
        if (!f(v)) throw v;
      }
    };
  }
  function s(l) {
    return l && function(u, d, h) {
      typeof d == "function" && (h = d, d = null);
      function v(x, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return d ? l.call(e, u, d, v) : l.call(e, u, v);
    };
  }
  function c(l) {
    return l && function(u, d) {
      var h = d ? l.call(e, u, d) : l.call(e, u);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function f(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ju = le.Stream, Mg = qg;
function qg(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    Ju.call(this);
    var a = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), s = 0, c = o.length; s < c; s++) {
      var f = o[s];
      this[f] = i[f];
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
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        a.emit("error", l), a.readable = !1;
        return;
      }
      a.fd = u, a.emit("open", u), a._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    Ju.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
      var c = a[o];
      this[c] = i[c];
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
var zg = Gg, Hg = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Gg(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Hg(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var he = at, Wg = Bg, Vg = Mg, Yg = zg, la = Fe, Le, Wa;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Le = Symbol.for("graceful-fs.queue"), Wa = Symbol.for("graceful-fs.previous")) : (Le = "___graceful-fs.queue", Wa = "___graceful-fs.previous");
function Xg() {
}
function Pm(e, t) {
  Object.defineProperty(e, Le, {
    get: function() {
      return t;
    }
  });
}
var On = Xg;
la.debuglog ? On = la.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (On = function() {
  var e = la.format.apply(la, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!he[Le]) {
  var Kg = ue[Le] || [];
  Pm(he, Kg), he.close = function(e) {
    function t(n, r) {
      return e.call(he, n, function(i) {
        i || Qu(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Wa, {
      value: e
    }), t;
  }(he.close), he.closeSync = function(e) {
    function t(n) {
      e.apply(he, arguments), Qu();
    }
    return Object.defineProperty(t, Wa, {
      value: e
    }), t;
  }(he.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    On(he[Le]), ul.equal(he[Le].length, 0);
  });
}
ue[Le] || Pm(ue, he[Le]);
var qe = ml(Yg(he));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !he.__patched && (qe = ml(he), he.__patched = !0);
function ml(e) {
  Wg(e), e.gracefulify = ml, e.createReadStream = U, e.createWriteStream = k;
  var t = e.readFile;
  e.readFile = n;
  function n(S, M, H) {
    return typeof M == "function" && (H = M, M = null), z(S, M, H);
    function z(J, L, N, B) {
      return t(J, L, function(w) {
        w && (w.code === "EMFILE" || w.code === "ENFILE") ? Xn([z, [J, L, N], w, B || Date.now(), Date.now()]) : typeof N == "function" && N.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(S, M, H, z) {
    return typeof H == "function" && (z = H, H = null), J(S, M, H, z);
    function J(L, N, B, w, A) {
      return r(L, N, B, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? Xn([J, [L, N, B, w], C, A || Date.now(), Date.now()]) : typeof w == "function" && w.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = o);
  function o(S, M, H, z) {
    return typeof H == "function" && (z = H, H = null), J(S, M, H, z);
    function J(L, N, B, w, A) {
      return a(L, N, B, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? Xn([J, [L, N, B, w], C, A || Date.now(), Date.now()]) : typeof w == "function" && w.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = c);
  function c(S, M, H, z) {
    return typeof H == "function" && (z = H, H = 0), J(S, M, H, z);
    function J(L, N, B, w, A) {
      return s(L, N, B, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? Xn([J, [L, N, B, w], C, A || Date.now(), Date.now()]) : typeof w == "function" && w.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(S, M, H) {
    typeof M == "function" && (H = M, M = null);
    var z = l.test(process.version) ? function(N, B, w, A) {
      return f(N, J(
        N,
        B,
        w,
        A
      ));
    } : function(N, B, w, A) {
      return f(N, B, J(
        N,
        B,
        w,
        A
      ));
    };
    return z(S, M, H);
    function J(L, N, B, w) {
      return function(A, C) {
        A && (A.code === "EMFILE" || A.code === "ENFILE") ? Xn([
          z,
          [L, N, B],
          A,
          w || Date.now(),
          Date.now()
        ]) : (C && C.sort && C.sort(), typeof B == "function" && B.call(this, A, C));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = Vg(e);
    y = d.ReadStream, T = d.WriteStream;
  }
  var h = e.ReadStream;
  h && (y.prototype = Object.create(h.prototype), y.prototype.open = b);
  var v = e.WriteStream;
  v && (T.prototype = Object.create(v.prototype), T.prototype.open = D), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return y;
    },
    set: function(S) {
      y = S;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return T;
    },
    set: function(S) {
      T = S;
    },
    enumerable: !0,
    configurable: !0
  });
  var x = y;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return x;
    },
    set: function(S) {
      x = S;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = T;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(S) {
      g = S;
    },
    enumerable: !0,
    configurable: !0
  });
  function y(S, M) {
    return this instanceof y ? (h.apply(this, arguments), this) : y.apply(Object.create(y.prototype), arguments);
  }
  function b() {
    var S = this;
    G(S.path, S.flags, S.mode, function(M, H) {
      M ? (S.autoClose && S.destroy(), S.emit("error", M)) : (S.fd = H, S.emit("open", H), S.read());
    });
  }
  function T(S, M) {
    return this instanceof T ? (v.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function D() {
    var S = this;
    G(S.path, S.flags, S.mode, function(M, H) {
      M ? (S.destroy(), S.emit("error", M)) : (S.fd = H, S.emit("open", H));
    });
  }
  function U(S, M) {
    return new e.ReadStream(S, M);
  }
  function k(S, M) {
    return new e.WriteStream(S, M);
  }
  var $ = e.open;
  e.open = G;
  function G(S, M, H, z) {
    return typeof H == "function" && (z = H, H = null), J(S, M, H, z);
    function J(L, N, B, w, A) {
      return $(L, N, B, function(C, F) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? Xn([J, [L, N, B, w], C, A || Date.now(), Date.now()]) : typeof w == "function" && w.apply(this, arguments);
      });
    }
  }
  return e;
}
function Xn(e) {
  On("ENQUEUE", e[0].name, e[1]), he[Le].push(e), hl();
}
var ua;
function Qu() {
  for (var e = Date.now(), t = 0; t < he[Le].length; ++t)
    he[Le][t].length > 2 && (he[Le][t][3] = e, he[Le][t][4] = e);
  hl();
}
function hl() {
  if (clearTimeout(ua), ua = void 0, he[Le].length !== 0) {
    var e = he[Le].shift(), t = e[0], n = e[1], r = e[2], i = e[3], a = e[4];
    if (i === void 0)
      On("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      On("TIMEOUT", t.name, n);
      var o = n.pop();
      typeof o == "function" && o.call(null, r);
    } else {
      var s = Date.now() - a, c = Math.max(a - i, 1), f = Math.min(c * 1.2, 100);
      s >= f ? (On("RETRY", t.name, n), t.apply(null, n.concat([i]))) : he[Le].push(e);
    }
    ua === void 0 && (ua = setTimeout(hl, 0));
  }
}
var Fm = (e) => {
  const t = new Uint8Array(e);
  if (!(t && t.length > 1))
    return null;
  const n = (r, i) => {
    i = Object.assign({
      offset: 0
    }, i);
    for (let a = 0; a < r.length; a++)
      if (r[a] !== t[a + i.offset])
        return !1;
    return !0;
  };
  if (n([255, 216, 255]))
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  if (n([137, 80, 78, 71, 13, 10, 26, 10]))
    return {
      ext: "png",
      mime: "image/png"
    };
  if (n([71, 73, 70]))
    return {
      ext: "gif",
      mime: "image/gif"
    };
  if (n([87, 69, 66, 80], { offset: 8 }))
    return {
      ext: "webp",
      mime: "image/webp"
    };
  if (n([70, 76, 73, 70]))
    return {
      ext: "flif",
      mime: "image/flif"
    };
  if ((n([73, 73, 42, 0]) || n([77, 77, 0, 42])) && n([67, 82], { offset: 8 }))
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  if (n([73, 73, 42, 0]) || n([77, 77, 0, 42]))
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  if (n([66, 77]))
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  if (n([73, 73, 188]))
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  if (n([56, 66, 80, 83]))
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  if (n([80, 75, 3, 4]) && n([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 }))
    return {
      ext: "epub",
      mime: "application/epub+zip"
    };
  if (n([80, 75, 3, 4]) && n([77, 69, 84, 65, 45, 73, 78, 70, 47, 109, 111, 122, 105, 108, 108, 97, 46, 114, 115, 97], { offset: 30 }))
    return {
      ext: "xpi",
      mime: "application/x-xpinstall"
    };
  if (n([80, 75]) && (t[2] === 3 || t[2] === 5 || t[2] === 7) && (t[3] === 4 || t[3] === 6 || t[3] === 8))
    return {
      ext: "zip",
      mime: "application/zip"
    };
  if (n([117, 115, 116, 97, 114], { offset: 257 }))
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  if (n([82, 97, 114, 33, 26, 7]) && (t[6] === 0 || t[6] === 1))
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  if (n([31, 139, 8]))
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  if (n([66, 90, 104]))
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  if (n([55, 122, 188, 175, 39, 28]))
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  if (n([120, 1]))
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  if (n([0, 0, 0]) && (t[3] === 24 || t[3] === 32) && n([102, 116, 121, 112], { offset: 4 }) || n([51, 103, 112, 53]) || n([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50]) && n([109, 112, 52, 49, 109, 112, 52, 50, 105, 115, 111, 109], { offset: 16 }) || n([0, 0, 0, 28, 102, 116, 121, 112, 105, 115, 111, 109]) || n([0, 0, 0, 28, 102, 116, 121, 112, 109, 112, 52, 50, 0, 0, 0, 0]))
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  if (n([0, 0, 0, 28, 102, 116, 121, 112, 77, 52, 86]))
    return {
      ext: "m4v",
      mime: "video/x-m4v"
    };
  if (n([77, 84, 104, 100]))
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  if (n([26, 69, 223, 163])) {
    const r = t.subarray(4, 4100), i = r.findIndex((a, o, s) => s[o] === 66 && s[o + 1] === 130);
    if (i >= 0) {
      const a = i + 3, o = (s) => Array.from(s).every((c, f) => r[a + f] === c.charCodeAt(0));
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
  return n([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || n([102, 114, 101, 101], { offset: 4 }) || n([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || n([109, 100, 97, 116], { offset: 4 }) || // MJPEG
  n([119, 105, 100, 101], { offset: 4 }) ? {
    ext: "mov",
    mime: "video/quicktime"
  } : n([82, 73, 70, 70]) && n([65, 86, 73], { offset: 8 }) ? {
    ext: "avi",
    mime: "video/x-msvideo"
  } : n([48, 38, 178, 117, 142, 102, 207, 17, 166, 217]) ? {
    ext: "wmv",
    mime: "video/x-ms-wmv"
  } : n([0, 0, 1, 186]) ? {
    ext: "mpg",
    mime: "video/mpeg"
  } : n([73, 68, 51]) || n([255, 251]) ? {
    ext: "mp3",
    mime: "audio/mpeg"
  } : n([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || n([77, 52, 65, 32]) ? {
    ext: "m4a",
    mime: "audio/m4a"
  } : n([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 }) ? {
    ext: "opus",
    mime: "audio/opus"
  } : n([79, 103, 103, 83]) ? {
    ext: "ogg",
    mime: "audio/ogg"
  } : n([102, 76, 97, 67]) ? {
    ext: "flac",
    mime: "audio/x-flac"
  } : n([82, 73, 70, 70]) && n([87, 65, 86, 69], { offset: 8 }) ? {
    ext: "wav",
    mime: "audio/x-wav"
  } : n([35, 33, 65, 77, 82, 10]) ? {
    ext: "amr",
    mime: "audio/amr"
  } : n([37, 80, 68, 70]) ? {
    ext: "pdf",
    mime: "application/pdf"
  } : n([77, 90]) ? {
    ext: "exe",
    mime: "application/x-msdownload"
  } : (t[0] === 67 || t[0] === 70) && n([87, 83], { offset: 1 }) ? {
    ext: "swf",
    mime: "application/x-shockwave-flash"
  } : n([123, 92, 114, 116, 102]) ? {
    ext: "rtf",
    mime: "application/rtf"
  } : n([0, 97, 115, 109]) ? {
    ext: "wasm",
    mime: "application/wasm"
  } : n([119, 79, 70, 70]) && (n([0, 1, 0, 0], { offset: 4 }) || n([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff",
    mime: "font/woff"
  } : n([119, 79, 70, 50]) && (n([0, 1, 0, 0], { offset: 4 }) || n([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff2",
    mime: "font/woff2"
  } : n([76, 80], { offset: 34 }) && (n([0, 0, 1], { offset: 8 }) || n([1, 0, 2], { offset: 8 }) || n([2, 0, 2], { offset: 8 })) ? {
    ext: "eot",
    mime: "application/octet-stream"
  } : n([0, 1, 0, 0, 0]) ? {
    ext: "ttf",
    mime: "font/ttf"
  } : n([79, 84, 84, 79, 0]) ? {
    ext: "otf",
    mime: "font/otf"
  } : n([0, 0, 1, 0]) ? {
    ext: "ico",
    mime: "image/x-icon"
  } : n([70, 76, 86, 1]) ? {
    ext: "flv",
    mime: "video/x-flv"
  } : n([37, 33]) ? {
    ext: "ps",
    mime: "application/postscript"
  } : n([253, 55, 122, 88, 90, 0]) ? {
    ext: "xz",
    mime: "application/x-xz"
  } : n([83, 81, 76, 105]) ? {
    ext: "sqlite",
    mime: "application/x-sqlite3"
  } : n([78, 69, 83, 26]) ? {
    ext: "nes",
    mime: "application/x-nintendo-nes-rom"
  } : n([67, 114, 50, 52]) ? {
    ext: "crx",
    mime: "application/x-google-chrome-extension"
  } : n([77, 83, 67, 70]) || n([73, 83, 99, 40]) ? {
    ext: "cab",
    mime: "application/vnd.ms-cab-compressed"
  } : n([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121]) ? {
    ext: "deb",
    mime: "application/x-deb"
  } : n([33, 60, 97, 114, 99, 104, 62]) ? {
    ext: "ar",
    mime: "application/x-unix-archive"
  } : n([237, 171, 238, 219]) ? {
    ext: "rpm",
    mime: "application/x-rpm"
  } : n([31, 160]) || n([31, 157]) ? {
    ext: "Z",
    mime: "application/x-compress"
  } : n([76, 90, 73, 80]) ? {
    ext: "lz",
    mime: "application/x-lzip"
  } : n([208, 207, 17, 224, 161, 177, 26, 225]) ? {
    ext: "msi",
    mime: "application/x-msi"
  } : n([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2]) ? {
    ext: "mxf",
    mime: "application/mxf"
  } : n([71], { offset: 4 }) && (n([71], { offset: 192 }) || n([71], { offset: 196 })) ? {
    ext: "mts",
    mime: "video/mp2t"
  } : n([66, 76, 69, 78, 68, 69, 82]) ? {
    ext: "blend",
    mime: "application/x-blender"
  } : n([66, 80, 71, 251]) ? {
    ext: "bpg",
    mime: "image/bpg"
  } : null;
}, Dm = { exports: {} }, $t = Dm.exports = function(e) {
  return e !== null && typeof e == "object" && typeof e.pipe == "function";
};
$t.writable = function(e) {
  return $t(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
};
$t.readable = function(e) {
  return $t(e) && e.readable !== !1 && typeof e._read == "function" && typeof e._readableState == "object";
};
$t.duplex = function(e) {
  return $t.writable(e) && $t.readable(e);
};
$t.transform = function(e) {
  return $t.duplex(e) && typeof e._transform == "function" && typeof e._transformState == "object";
};
var xl = Dm.exports, vl = {}, Dc = { exports: {} }, pa = { exports: {} }, Zu;
function mo() {
  if (Zu) return pa.exports;
  Zu = 1, typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? pa.exports = { nextTick: e } : pa.exports = process;
  function e(t, n, r, i) {
    if (typeof t != "function")
      throw new TypeError('"callback" argument must be a function');
    var a = arguments.length, o, s;
    switch (a) {
      case 0:
      case 1:
        return process.nextTick(t);
      case 2:
        return process.nextTick(function() {
          t.call(null, n);
        });
      case 3:
        return process.nextTick(function() {
          t.call(null, n, r);
        });
      case 4:
        return process.nextTick(function() {
          t.call(null, n, r, i);
        });
      default:
        for (o = new Array(a - 1), s = 0; s < o.length; )
          o[s++] = arguments[s];
        return process.nextTick(function() {
          t.apply(null, o);
        });
    }
  }
  return pa.exports;
}
var ps, ep;
function Jg() {
  if (ep) return ps;
  ep = 1;
  var e = {}.toString;
  return ps = Array.isArray || function(t) {
    return e.call(t) == "[object Array]";
  }, ps;
}
var fs, tp;
function km() {
  return tp || (tp = 1, fs = le), fs;
}
var kc = { exports: {} };
(function(e, t) {
  var n = pl, r = n.Buffer;
  function i(o, s) {
    for (var c in o)
      s[c] = o[c];
  }
  r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = n : (i(n, t), t.Buffer = a);
  function a(o, s, c) {
    return r(o, s, c);
  }
  i(r, a), a.from = function(o, s, c) {
    if (typeof o == "number")
      throw new TypeError("Argument must not be a number");
    return r(o, s, c);
  }, a.alloc = function(o, s, c) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    var f = r(o);
    return s !== void 0 ? typeof c == "string" ? f.fill(s, c) : f.fill(s) : f.fill(0), f;
  }, a.allocUnsafe = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return r(o);
  }, a.allocUnsafeSlow = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return n.SlowBuffer(o);
  };
})(kc, kc.exports);
var Ai = kc.exports, ke = {}, np;
function Ti() {
  if (np) return ke;
  np = 1;
  function e(x) {
    return Array.isArray ? Array.isArray(x) : v(x) === "[object Array]";
  }
  ke.isArray = e;
  function t(x) {
    return typeof x == "boolean";
  }
  ke.isBoolean = t;
  function n(x) {
    return x === null;
  }
  ke.isNull = n;
  function r(x) {
    return x == null;
  }
  ke.isNullOrUndefined = r;
  function i(x) {
    return typeof x == "number";
  }
  ke.isNumber = i;
  function a(x) {
    return typeof x == "string";
  }
  ke.isString = a;
  function o(x) {
    return typeof x == "symbol";
  }
  ke.isSymbol = o;
  function s(x) {
    return x === void 0;
  }
  ke.isUndefined = s;
  function c(x) {
    return v(x) === "[object RegExp]";
  }
  ke.isRegExp = c;
  function f(x) {
    return typeof x == "object" && x !== null;
  }
  ke.isObject = f;
  function l(x) {
    return v(x) === "[object Date]";
  }
  ke.isDate = l;
  function u(x) {
    return v(x) === "[object Error]" || x instanceof Error;
  }
  ke.isError = u;
  function d(x) {
    return typeof x == "function";
  }
  ke.isFunction = d;
  function h(x) {
    return x === null || typeof x == "boolean" || typeof x == "number" || typeof x == "string" || typeof x == "symbol" || // ES6 symbol
    typeof x > "u";
  }
  ke.isPrimitive = h, ke.isBuffer = Buffer.isBuffer;
  function v(x) {
    return Object.prototype.toString.call(x);
  }
  return ke;
}
var fa = { exports: {} }, da = { exports: {} }, rp;
function Qg() {
  return rp || (rp = 1, typeof Object.create == "function" ? da.exports = function(t, n) {
    n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : da.exports = function(t, n) {
    if (n) {
      t.super_ = n;
      var r = function() {
      };
      r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
    }
  }), da.exports;
}
var ip;
function Ri() {
  if (ip) return fa.exports;
  ip = 1;
  try {
    var e = require("util");
    if (typeof e.inherits != "function") throw "";
    fa.exports = e.inherits;
  } catch {
    fa.exports = Qg();
  }
  return fa.exports;
}
var ds = { exports: {} }, ap;
function Zg() {
  return ap || (ap = 1, function(e) {
    function t(a, o) {
      if (!(a instanceof o))
        throw new TypeError("Cannot call a class as a function");
    }
    var n = Ai.Buffer, r = Fe;
    function i(a, o, s) {
      a.copy(o, s);
    }
    e.exports = function() {
      function a() {
        t(this, a), this.head = null, this.tail = null, this.length = 0;
      }
      return a.prototype.push = function(s) {
        var c = { data: s, next: null };
        this.length > 0 ? this.tail.next = c : this.head = c, this.tail = c, ++this.length;
      }, a.prototype.unshift = function(s) {
        var c = { data: s, next: this.head };
        this.length === 0 && (this.tail = c), this.head = c, ++this.length;
      }, a.prototype.shift = function() {
        if (this.length !== 0) {
          var s = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, s;
        }
      }, a.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, a.prototype.join = function(s) {
        if (this.length === 0) return "";
        for (var c = this.head, f = "" + c.data; c = c.next; )
          f += s + c.data;
        return f;
      }, a.prototype.concat = function(s) {
        if (this.length === 0) return n.alloc(0);
        for (var c = n.allocUnsafe(s >>> 0), f = this.head, l = 0; f; )
          i(f.data, c, l), l += f.data.length, f = f.next;
        return c;
      }, a;
    }(), r && r.inspect && r.inspect.custom && (e.exports.prototype[r.inspect.custom] = function() {
      var a = r.inspect({ length: this.length });
      return this.constructor.name + " " + a;
    });
  }(ds)), ds.exports;
}
var ms, op;
function Im() {
  if (op) return ms;
  op = 1;
  var e = mo();
  function t(i, a) {
    var o = this, s = this._readableState && this._readableState.destroyed, c = this._writableState && this._writableState.destroyed;
    return s || c ? (a ? a(i) : i && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(r, this, i)) : e.nextTick(r, this, i)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(i || null, function(f) {
      !a && f ? o._writableState ? o._writableState.errorEmitted || (o._writableState.errorEmitted = !0, e.nextTick(r, o, f)) : e.nextTick(r, o, f) : a && a(f);
    }), this);
  }
  function n() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function r(i, a) {
    i.emit("error", a);
  }
  return ms = {
    destroy: t,
    undestroy: n
  }, ms;
}
var hs, sp;
function ey() {
  return sp || (sp = 1, hs = Fe.deprecate), hs;
}
var xs, cp;
function Nm() {
  if (cp) return xs;
  cp = 1;
  var e = mo();
  xs = x;
  function t(w) {
    var A = this;
    this.next = null, this.entry = null, this.finish = function() {
      B(A, w);
    };
  }
  var n = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : e.nextTick, r;
  x.WritableState = h;
  var i = Object.create(Ti());
  i.inherits = Ri();
  var a = {
    deprecate: ey()
  }, o = km(), s = Ai.Buffer, c = (typeof ue < "u" ? ue : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function f(w) {
    return s.from(w);
  }
  function l(w) {
    return s.isBuffer(w) || w instanceof c;
  }
  var u = Im();
  i.inherits(x, o);
  function d() {
  }
  function h(w, A) {
    r = r || yr(), w = w || {};
    var C = A instanceof r;
    this.objectMode = !!w.objectMode, C && (this.objectMode = this.objectMode || !!w.writableObjectMode);
    var F = w.highWaterMark, I = w.writableHighWaterMark, j = this.objectMode ? 16 : 16 * 1024;
    F || F === 0 ? this.highWaterMark = F : C && (I || I === 0) ? this.highWaterMark = I : this.highWaterMark = j, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var Z = w.decodeStrings === !1;
    this.decodeStrings = !Z, this.defaultEncoding = w.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ee) {
      $(A, ee);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  h.prototype.getBuffer = function() {
    for (var A = this.bufferedRequest, C = []; A; )
      C.push(A), A = A.next;
    return C;
  }, function() {
    try {
      Object.defineProperty(h.prototype, "buffer", {
        get: a.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var v;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (v = Function.prototype[Symbol.hasInstance], Object.defineProperty(x, Symbol.hasInstance, {
    value: function(w) {
      return v.call(this, w) ? !0 : this !== x ? !1 : w && w._writableState instanceof h;
    }
  })) : v = function(w) {
    return w instanceof this;
  };
  function x(w) {
    if (r = r || yr(), !v.call(x, this) && !(this instanceof r))
      return new x(w);
    this._writableState = new h(w, this), this.writable = !0, w && (typeof w.write == "function" && (this._write = w.write), typeof w.writev == "function" && (this._writev = w.writev), typeof w.destroy == "function" && (this._destroy = w.destroy), typeof w.final == "function" && (this._final = w.final)), o.call(this);
  }
  x.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function g(w, A) {
    var C = new Error("write after end");
    w.emit("error", C), e.nextTick(A, C);
  }
  function y(w, A, C, F) {
    var I = !0, j = !1;
    return C === null ? j = new TypeError("May not write null values to stream") : typeof C != "string" && C !== void 0 && !A.objectMode && (j = new TypeError("Invalid non-string/buffer chunk")), j && (w.emit("error", j), e.nextTick(F, j), I = !1), I;
  }
  x.prototype.write = function(w, A, C) {
    var F = this._writableState, I = !1, j = !F.objectMode && l(w);
    return j && !s.isBuffer(w) && (w = f(w)), typeof A == "function" && (C = A, A = null), j ? A = "buffer" : A || (A = F.defaultEncoding), typeof C != "function" && (C = d), F.ended ? g(this, C) : (j || y(this, F, w, C)) && (F.pendingcb++, I = T(this, F, j, w, A, C)), I;
  }, x.prototype.cork = function() {
    var w = this._writableState;
    w.corked++;
  }, x.prototype.uncork = function() {
    var w = this._writableState;
    w.corked && (w.corked--, !w.writing && !w.corked && !w.bufferProcessing && w.bufferedRequest && M(this, w));
  }, x.prototype.setDefaultEncoding = function(A) {
    if (typeof A == "string" && (A = A.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((A + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + A);
    return this._writableState.defaultEncoding = A, this;
  };
  function b(w, A, C) {
    return !w.objectMode && w.decodeStrings !== !1 && typeof A == "string" && (A = s.from(A, C)), A;
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
  function T(w, A, C, F, I, j) {
    if (!C) {
      var Z = b(A, F, I);
      F !== Z && (C = !0, I = "buffer", F = Z);
    }
    var ee = A.objectMode ? 1 : F.length;
    A.length += ee;
    var V = A.length < A.highWaterMark;
    if (V || (A.needDrain = !0), A.writing || A.corked) {
      var se = A.lastBufferedRequest;
      A.lastBufferedRequest = {
        chunk: F,
        encoding: I,
        isBuf: C,
        callback: j,
        next: null
      }, se ? se.next = A.lastBufferedRequest : A.bufferedRequest = A.lastBufferedRequest, A.bufferedRequestCount += 1;
    } else
      D(w, A, !1, ee, F, I, j);
    return V;
  }
  function D(w, A, C, F, I, j, Z) {
    A.writelen = F, A.writecb = Z, A.writing = !0, A.sync = !0, C ? w._writev(I, A.onwrite) : w._write(I, j, A.onwrite), A.sync = !1;
  }
  function U(w, A, C, F, I) {
    --A.pendingcb, C ? (e.nextTick(I, F), e.nextTick(L, w, A), w._writableState.errorEmitted = !0, w.emit("error", F)) : (I(F), w._writableState.errorEmitted = !0, w.emit("error", F), L(w, A));
  }
  function k(w) {
    w.writing = !1, w.writecb = null, w.length -= w.writelen, w.writelen = 0;
  }
  function $(w, A) {
    var C = w._writableState, F = C.sync, I = C.writecb;
    if (k(C), A) U(w, C, F, A, I);
    else {
      var j = H(C);
      !j && !C.corked && !C.bufferProcessing && C.bufferedRequest && M(w, C), F ? n(G, w, C, j, I) : G(w, C, j, I);
    }
  }
  function G(w, A, C, F) {
    C || S(w, A), A.pendingcb--, F(), L(w, A);
  }
  function S(w, A) {
    A.length === 0 && A.needDrain && (A.needDrain = !1, w.emit("drain"));
  }
  function M(w, A) {
    A.bufferProcessing = !0;
    var C = A.bufferedRequest;
    if (w._writev && C && C.next) {
      var F = A.bufferedRequestCount, I = new Array(F), j = A.corkedRequestsFree;
      j.entry = C;
      for (var Z = 0, ee = !0; C; )
        I[Z] = C, C.isBuf || (ee = !1), C = C.next, Z += 1;
      I.allBuffers = ee, D(w, A, !0, A.length, I, "", j.finish), A.pendingcb++, A.lastBufferedRequest = null, j.next ? (A.corkedRequestsFree = j.next, j.next = null) : A.corkedRequestsFree = new t(A), A.bufferedRequestCount = 0;
    } else {
      for (; C; ) {
        var V = C.chunk, se = C.encoding, m = C.callback, p = A.objectMode ? 1 : V.length;
        if (D(w, A, !1, p, V, se, m), C = C.next, A.bufferedRequestCount--, A.writing)
          break;
      }
      C === null && (A.lastBufferedRequest = null);
    }
    A.bufferedRequest = C, A.bufferProcessing = !1;
  }
  x.prototype._write = function(w, A, C) {
    C(new Error("_write() is not implemented"));
  }, x.prototype._writev = null, x.prototype.end = function(w, A, C) {
    var F = this._writableState;
    typeof w == "function" ? (C = w, w = null, A = null) : typeof A == "function" && (C = A, A = null), w != null && this.write(w, A), F.corked && (F.corked = 1, this.uncork()), F.ending || N(this, F, C);
  };
  function H(w) {
    return w.ending && w.length === 0 && w.bufferedRequest === null && !w.finished && !w.writing;
  }
  function z(w, A) {
    w._final(function(C) {
      A.pendingcb--, C && w.emit("error", C), A.prefinished = !0, w.emit("prefinish"), L(w, A);
    });
  }
  function J(w, A) {
    !A.prefinished && !A.finalCalled && (typeof w._final == "function" ? (A.pendingcb++, A.finalCalled = !0, e.nextTick(z, w, A)) : (A.prefinished = !0, w.emit("prefinish")));
  }
  function L(w, A) {
    var C = H(A);
    return C && (J(w, A), A.pendingcb === 0 && (A.finished = !0, w.emit("finish"))), C;
  }
  function N(w, A, C) {
    A.ending = !0, L(w, A), C && (A.finished ? e.nextTick(C) : w.once("finish", C)), A.ended = !0, w.writable = !1;
  }
  function B(w, A, C) {
    var F = w.entry;
    for (w.entry = null; F; ) {
      var I = F.callback;
      A.pendingcb--, I(C), F = F.next;
    }
    A.corkedRequestsFree.next = w;
  }
  return Object.defineProperty(x.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(w) {
      this._writableState && (this._writableState.destroyed = w);
    }
  }), x.prototype.destroy = u.destroy, x.prototype._undestroy = u.undestroy, x.prototype._destroy = function(w, A) {
    this.end(), A(w);
  }, xs;
}
var vs, lp;
function yr() {
  if (lp) return vs;
  lp = 1;
  var e = mo(), t = Object.keys || function(u) {
    var d = [];
    for (var h in u)
      d.push(h);
    return d;
  };
  vs = c;
  var n = Object.create(Ti());
  n.inherits = Ri();
  var r = $m(), i = Nm();
  n.inherits(c, r);
  for (var a = t(i.prototype), o = 0; o < a.length; o++) {
    var s = a[o];
    c.prototype[s] || (c.prototype[s] = i.prototype[s]);
  }
  function c(u) {
    if (!(this instanceof c)) return new c(u);
    r.call(this, u), i.call(this, u), u && u.readable === !1 && (this.readable = !1), u && u.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, u && u.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", f);
  }
  Object.defineProperty(c.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function f() {
    this.allowHalfOpen || this._writableState.ended || e.nextTick(l, this);
  }
  function l(u) {
    u.end();
  }
  return Object.defineProperty(c.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(u) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = u, this._writableState.destroyed = u);
    }
  }), c.prototype._destroy = function(u, d) {
    this.push(null), this.end(), e.nextTick(d, u);
  }, vs;
}
var gs = {}, up;
function pp() {
  if (up) return gs;
  up = 1;
  var e = Ai.Buffer, t = e.isEncoding || function(y) {
    switch (y = "" + y, y && y.toLowerCase()) {
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
  function n(y) {
    if (!y) return "utf8";
    for (var b; ; )
      switch (y) {
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
          return y;
        default:
          if (b) return;
          y = ("" + y).toLowerCase(), b = !0;
      }
  }
  function r(y) {
    var b = n(y);
    if (typeof b != "string" && (e.isEncoding === t || !t(y))) throw new Error("Unknown encoding: " + y);
    return b || y;
  }
  gs.StringDecoder = i;
  function i(y) {
    this.encoding = r(y);
    var b;
    switch (this.encoding) {
      case "utf16le":
        this.text = u, this.end = d, b = 4;
        break;
      case "utf8":
        this.fillLast = c, b = 4;
        break;
      case "base64":
        this.text = h, this.end = v, b = 3;
        break;
      default:
        this.write = x, this.end = g;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = e.allocUnsafe(b);
  }
  i.prototype.write = function(y) {
    if (y.length === 0) return "";
    var b, T;
    if (this.lastNeed) {
      if (b = this.fillLast(y), b === void 0) return "";
      T = this.lastNeed, this.lastNeed = 0;
    } else
      T = 0;
    return T < y.length ? b ? b + this.text(y, T) : this.text(y, T) : b || "";
  }, i.prototype.end = l, i.prototype.text = f, i.prototype.fillLast = function(y) {
    if (this.lastNeed <= y.length)
      return y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, y.length), this.lastNeed -= y.length;
  };
  function a(y) {
    return y <= 127 ? 0 : y >> 5 === 6 ? 2 : y >> 4 === 14 ? 3 : y >> 3 === 30 ? 4 : y >> 6 === 2 ? -1 : -2;
  }
  function o(y, b, T) {
    var D = b.length - 1;
    if (D < T) return 0;
    var U = a(b[D]);
    return U >= 0 ? (U > 0 && (y.lastNeed = U - 1), U) : --D < T || U === -2 ? 0 : (U = a(b[D]), U >= 0 ? (U > 0 && (y.lastNeed = U - 2), U) : --D < T || U === -2 ? 0 : (U = a(b[D]), U >= 0 ? (U > 0 && (U === 2 ? U = 0 : y.lastNeed = U - 3), U) : 0));
  }
  function s(y, b, T) {
    if ((b[0] & 192) !== 128)
      return y.lastNeed = 0, "�";
    if (y.lastNeed > 1 && b.length > 1) {
      if ((b[1] & 192) !== 128)
        return y.lastNeed = 1, "�";
      if (y.lastNeed > 2 && b.length > 2 && (b[2] & 192) !== 128)
        return y.lastNeed = 2, "�";
    }
  }
  function c(y) {
    var b = this.lastTotal - this.lastNeed, T = s(this, y);
    if (T !== void 0) return T;
    if (this.lastNeed <= y.length)
      return y.copy(this.lastChar, b, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    y.copy(this.lastChar, b, 0, y.length), this.lastNeed -= y.length;
  }
  function f(y, b) {
    var T = o(this, y, b);
    if (!this.lastNeed) return y.toString("utf8", b);
    this.lastTotal = T;
    var D = y.length - (T - this.lastNeed);
    return y.copy(this.lastChar, 0, D), y.toString("utf8", b, D);
  }
  function l(y) {
    var b = y && y.length ? this.write(y) : "";
    return this.lastNeed ? b + "�" : b;
  }
  function u(y, b) {
    if ((y.length - b) % 2 === 0) {
      var T = y.toString("utf16le", b);
      if (T) {
        var D = T.charCodeAt(T.length - 1);
        if (D >= 55296 && D <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1], T.slice(0, -1);
      }
      return T;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = y[y.length - 1], y.toString("utf16le", b, y.length - 1);
  }
  function d(y) {
    var b = y && y.length ? this.write(y) : "";
    if (this.lastNeed) {
      var T = this.lastTotal - this.lastNeed;
      return b + this.lastChar.toString("utf16le", 0, T);
    }
    return b;
  }
  function h(y, b) {
    var T = (y.length - b) % 3;
    return T === 0 ? y.toString("base64", b) : (this.lastNeed = 3 - T, this.lastTotal = 3, T === 1 ? this.lastChar[0] = y[y.length - 1] : (this.lastChar[0] = y[y.length - 2], this.lastChar[1] = y[y.length - 1]), y.toString("base64", b, y.length - T));
  }
  function v(y) {
    var b = y && y.length ? this.write(y) : "";
    return this.lastNeed ? b + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : b;
  }
  function x(y) {
    return y.toString(this.encoding);
  }
  function g(y) {
    return y && y.length ? this.write(y) : "";
  }
  return gs;
}
var ys, fp;
function $m() {
  if (fp) return ys;
  fp = 1;
  var e = mo();
  ys = b;
  var t = Jg(), n;
  b.ReadableState = y, Si.EventEmitter;
  var r = function(m, p) {
    return m.listeners(p).length;
  }, i = km(), a = Ai.Buffer, o = (typeof ue < "u" ? ue : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(m) {
    return a.from(m);
  }
  function c(m) {
    return a.isBuffer(m) || m instanceof o;
  }
  var f = Object.create(Ti());
  f.inherits = Ri();
  var l = Fe, u = void 0;
  l && l.debuglog ? u = l.debuglog("stream") : u = function() {
  };
  var d = Zg(), h = Im(), v;
  f.inherits(b, i);
  var x = ["error", "close", "destroy", "pause", "resume"];
  function g(m, p, R) {
    if (typeof m.prependListener == "function") return m.prependListener(p, R);
    !m._events || !m._events[p] ? m.on(p, R) : t(m._events[p]) ? m._events[p].unshift(R) : m._events[p] = [R, m._events[p]];
  }
  function y(m, p) {
    n = n || yr(), m = m || {};
    var R = p instanceof n;
    this.objectMode = !!m.objectMode, R && (this.objectMode = this.objectMode || !!m.readableObjectMode);
    var _ = m.highWaterMark, K = m.readableHighWaterMark, Y = this.objectMode ? 16 : 16 * 1024;
    _ || _ === 0 ? this.highWaterMark = _ : R && (K || K === 0) ? this.highWaterMark = K : this.highWaterMark = Y, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new d(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = m.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, m.encoding && (v || (v = pp().StringDecoder), this.decoder = new v(m.encoding), this.encoding = m.encoding);
  }
  function b(m) {
    if (n = n || yr(), !(this instanceof b)) return new b(m);
    this._readableState = new y(m, this), this.readable = !0, m && (typeof m.read == "function" && (this._read = m.read), typeof m.destroy == "function" && (this._destroy = m.destroy)), i.call(this);
  }
  Object.defineProperty(b.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(m) {
      this._readableState && (this._readableState.destroyed = m);
    }
  }), b.prototype.destroy = h.destroy, b.prototype._undestroy = h.undestroy, b.prototype._destroy = function(m, p) {
    this.push(null), p(m);
  }, b.prototype.push = function(m, p) {
    var R = this._readableState, _;
    return R.objectMode ? _ = !0 : typeof m == "string" && (p = p || R.defaultEncoding, p !== R.encoding && (m = a.from(m, p), p = ""), _ = !0), T(this, m, p, !1, _);
  }, b.prototype.unshift = function(m) {
    return T(this, m, null, !0, !1);
  };
  function T(m, p, R, _, K) {
    var Y = m._readableState;
    if (p === null)
      Y.reading = !1, M(m, Y);
    else {
      var Q;
      K || (Q = U(Y, p)), Q ? m.emit("error", Q) : Y.objectMode || p && p.length > 0 ? (typeof p != "string" && !Y.objectMode && Object.getPrototypeOf(p) !== a.prototype && (p = s(p)), _ ? Y.endEmitted ? m.emit("error", new Error("stream.unshift() after end event")) : D(m, Y, p, !0) : Y.ended ? m.emit("error", new Error("stream.push() after EOF")) : (Y.reading = !1, Y.decoder && !R ? (p = Y.decoder.write(p), Y.objectMode || p.length !== 0 ? D(m, Y, p, !1) : J(m, Y)) : D(m, Y, p, !1))) : _ || (Y.reading = !1);
    }
    return k(Y);
  }
  function D(m, p, R, _) {
    p.flowing && p.length === 0 && !p.sync ? (m.emit("data", R), m.read(0)) : (p.length += p.objectMode ? 1 : R.length, _ ? p.buffer.unshift(R) : p.buffer.push(R), p.needReadable && H(m)), J(m, p);
  }
  function U(m, p) {
    var R;
    return !c(p) && typeof p != "string" && p !== void 0 && !m.objectMode && (R = new TypeError("Invalid non-string/buffer chunk")), R;
  }
  function k(m) {
    return !m.ended && (m.needReadable || m.length < m.highWaterMark || m.length === 0);
  }
  b.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, b.prototype.setEncoding = function(m) {
    return v || (v = pp().StringDecoder), this._readableState.decoder = new v(m), this._readableState.encoding = m, this;
  };
  var $ = 8388608;
  function G(m) {
    return m >= $ ? m = $ : (m--, m |= m >>> 1, m |= m >>> 2, m |= m >>> 4, m |= m >>> 8, m |= m >>> 16, m++), m;
  }
  function S(m, p) {
    return m <= 0 || p.length === 0 && p.ended ? 0 : p.objectMode ? 1 : m !== m ? p.flowing && p.length ? p.buffer.head.data.length : p.length : (m > p.highWaterMark && (p.highWaterMark = G(m)), m <= p.length ? m : p.ended ? p.length : (p.needReadable = !0, 0));
  }
  b.prototype.read = function(m) {
    u("read", m), m = parseInt(m, 10);
    var p = this._readableState, R = m;
    if (m !== 0 && (p.emittedReadable = !1), m === 0 && p.needReadable && (p.length >= p.highWaterMark || p.ended))
      return u("read: emitReadable", p.length, p.ended), p.length === 0 && p.ended ? ee(this) : H(this), null;
    if (m = S(m, p), m === 0 && p.ended)
      return p.length === 0 && ee(this), null;
    var _ = p.needReadable;
    u("need readable", _), (p.length === 0 || p.length - m < p.highWaterMark) && (_ = !0, u("length less than watermark", _)), p.ended || p.reading ? (_ = !1, u("reading or ended", _)) : _ && (u("do read"), p.reading = !0, p.sync = !0, p.length === 0 && (p.needReadable = !0), this._read(p.highWaterMark), p.sync = !1, p.reading || (m = S(R, p)));
    var K;
    return m > 0 ? K = F(m, p) : K = null, K === null ? (p.needReadable = !0, m = 0) : p.length -= m, p.length === 0 && (p.ended || (p.needReadable = !0), R !== m && p.ended && ee(this)), K !== null && this.emit("data", K), K;
  };
  function M(m, p) {
    if (!p.ended) {
      if (p.decoder) {
        var R = p.decoder.end();
        R && R.length && (p.buffer.push(R), p.length += p.objectMode ? 1 : R.length);
      }
      p.ended = !0, H(m);
    }
  }
  function H(m) {
    var p = m._readableState;
    p.needReadable = !1, p.emittedReadable || (u("emitReadable", p.flowing), p.emittedReadable = !0, p.sync ? e.nextTick(z, m) : z(m));
  }
  function z(m) {
    u("emit readable"), m.emit("readable"), C(m);
  }
  function J(m, p) {
    p.readingMore || (p.readingMore = !0, e.nextTick(L, m, p));
  }
  function L(m, p) {
    for (var R = p.length; !p.reading && !p.flowing && !p.ended && p.length < p.highWaterMark && (u("maybeReadMore read 0"), m.read(0), R !== p.length); )
      R = p.length;
    p.readingMore = !1;
  }
  b.prototype._read = function(m) {
    this.emit("error", new Error("_read() is not implemented"));
  }, b.prototype.pipe = function(m, p) {
    var R = this, _ = this._readableState;
    switch (_.pipesCount) {
      case 0:
        _.pipes = m;
        break;
      case 1:
        _.pipes = [_.pipes, m];
        break;
      default:
        _.pipes.push(m);
        break;
    }
    _.pipesCount += 1, u("pipe count=%d opts=%j", _.pipesCount, p);
    var K = (!p || p.end !== !1) && m !== process.stdout && m !== process.stderr, Y = K ? ve : mn;
    _.endEmitted ? e.nextTick(Y) : R.once("end", Y), m.on("unpipe", Q);
    function Q(zt, hn) {
      u("onunpipe"), zt === R && hn && hn.hasUnpiped === !1 && (hn.hasUnpiped = !0, Ee());
    }
    function ve() {
      u("onend"), m.end();
    }
    var Se = N(R);
    m.on("drain", Se);
    var pt = !1;
    function Ee() {
      u("cleanup"), m.removeListener("close", Dt), m.removeListener("finish", qt), m.removeListener("drain", Se), m.removeListener("error", Mt), m.removeListener("unpipe", Q), R.removeListener("end", ve), R.removeListener("end", mn), R.removeListener("data", Vn), pt = !0, _.awaitDrain && (!m._writableState || m._writableState.needDrain) && Se();
    }
    var He = !1;
    R.on("data", Vn);
    function Vn(zt) {
      u("ondata"), He = !1;
      var hn = m.write(zt);
      hn === !1 && !He && ((_.pipesCount === 1 && _.pipes === m || _.pipesCount > 1 && se(_.pipes, m) !== -1) && !pt && (u("false write response, pause", _.awaitDrain), _.awaitDrain++, He = !0), R.pause());
    }
    function Mt(zt) {
      u("onerror", zt), mn(), m.removeListener("error", Mt), r(m, "error") === 0 && m.emit("error", zt);
    }
    g(m, "error", Mt);
    function Dt() {
      m.removeListener("finish", qt), mn();
    }
    m.once("close", Dt);
    function qt() {
      u("onfinish"), m.removeListener("close", Dt), mn();
    }
    m.once("finish", qt);
    function mn() {
      u("unpipe"), R.unpipe(m);
    }
    return m.emit("pipe", R), _.flowing || (u("pipe resume"), R.resume()), m;
  };
  function N(m) {
    return function() {
      var p = m._readableState;
      u("pipeOnDrain", p.awaitDrain), p.awaitDrain && p.awaitDrain--, p.awaitDrain === 0 && r(m, "data") && (p.flowing = !0, C(m));
    };
  }
  b.prototype.unpipe = function(m) {
    var p = this._readableState, R = { hasUnpiped: !1 };
    if (p.pipesCount === 0) return this;
    if (p.pipesCount === 1)
      return m && m !== p.pipes ? this : (m || (m = p.pipes), p.pipes = null, p.pipesCount = 0, p.flowing = !1, m && m.emit("unpipe", this, R), this);
    if (!m) {
      var _ = p.pipes, K = p.pipesCount;
      p.pipes = null, p.pipesCount = 0, p.flowing = !1;
      for (var Y = 0; Y < K; Y++)
        _[Y].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var Q = se(p.pipes, m);
    return Q === -1 ? this : (p.pipes.splice(Q, 1), p.pipesCount -= 1, p.pipesCount === 1 && (p.pipes = p.pipes[0]), m.emit("unpipe", this, R), this);
  }, b.prototype.on = function(m, p) {
    var R = i.prototype.on.call(this, m, p);
    if (m === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (m === "readable") {
      var _ = this._readableState;
      !_.endEmitted && !_.readableListening && (_.readableListening = _.needReadable = !0, _.emittedReadable = !1, _.reading ? _.length && H(this) : e.nextTick(B, this));
    }
    return R;
  }, b.prototype.addListener = b.prototype.on;
  function B(m) {
    u("readable nexttick read 0"), m.read(0);
  }
  b.prototype.resume = function() {
    var m = this._readableState;
    return m.flowing || (u("resume"), m.flowing = !0, w(this, m)), this;
  };
  function w(m, p) {
    p.resumeScheduled || (p.resumeScheduled = !0, e.nextTick(A, m, p));
  }
  function A(m, p) {
    p.reading || (u("resume read 0"), m.read(0)), p.resumeScheduled = !1, p.awaitDrain = 0, m.emit("resume"), C(m), p.flowing && !p.reading && m.read(0);
  }
  b.prototype.pause = function() {
    return u("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (u("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function C(m) {
    var p = m._readableState;
    for (u("flow", p.flowing); p.flowing && m.read() !== null; )
      ;
  }
  b.prototype.wrap = function(m) {
    var p = this, R = this._readableState, _ = !1;
    m.on("end", function() {
      if (u("wrapped end"), R.decoder && !R.ended) {
        var Q = R.decoder.end();
        Q && Q.length && p.push(Q);
      }
      p.push(null);
    }), m.on("data", function(Q) {
      if (u("wrapped data"), R.decoder && (Q = R.decoder.write(Q)), !(R.objectMode && Q == null) && !(!R.objectMode && (!Q || !Q.length))) {
        var ve = p.push(Q);
        ve || (_ = !0, m.pause());
      }
    });
    for (var K in m)
      this[K] === void 0 && typeof m[K] == "function" && (this[K] = /* @__PURE__ */ function(Q) {
        return function() {
          return m[Q].apply(m, arguments);
        };
      }(K));
    for (var Y = 0; Y < x.length; Y++)
      m.on(x[Y], this.emit.bind(this, x[Y]));
    return this._read = function(Q) {
      u("wrapped _read", Q), _ && (_ = !1, m.resume());
    }, this;
  }, Object.defineProperty(b.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), b._fromList = F;
  function F(m, p) {
    if (p.length === 0) return null;
    var R;
    return p.objectMode ? R = p.buffer.shift() : !m || m >= p.length ? (p.decoder ? R = p.buffer.join("") : p.buffer.length === 1 ? R = p.buffer.head.data : R = p.buffer.concat(p.length), p.buffer.clear()) : R = I(m, p.buffer, p.decoder), R;
  }
  function I(m, p, R) {
    var _;
    return m < p.head.data.length ? (_ = p.head.data.slice(0, m), p.head.data = p.head.data.slice(m)) : m === p.head.data.length ? _ = p.shift() : _ = R ? j(m, p) : Z(m, p), _;
  }
  function j(m, p) {
    var R = p.head, _ = 1, K = R.data;
    for (m -= K.length; R = R.next; ) {
      var Y = R.data, Q = m > Y.length ? Y.length : m;
      if (Q === Y.length ? K += Y : K += Y.slice(0, m), m -= Q, m === 0) {
        Q === Y.length ? (++_, R.next ? p.head = R.next : p.head = p.tail = null) : (p.head = R, R.data = Y.slice(Q));
        break;
      }
      ++_;
    }
    return p.length -= _, K;
  }
  function Z(m, p) {
    var R = a.allocUnsafe(m), _ = p.head, K = 1;
    for (_.data.copy(R), m -= _.data.length; _ = _.next; ) {
      var Y = _.data, Q = m > Y.length ? Y.length : m;
      if (Y.copy(R, R.length - m, 0, Q), m -= Q, m === 0) {
        Q === Y.length ? (++K, _.next ? p.head = _.next : p.head = p.tail = null) : (p.head = _, _.data = Y.slice(Q));
        break;
      }
      ++K;
    }
    return p.length -= K, R;
  }
  function ee(m) {
    var p = m._readableState;
    if (p.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    p.endEmitted || (p.ended = !0, e.nextTick(V, p, m));
  }
  function V(m, p) {
    !m.endEmitted && m.length === 0 && (m.endEmitted = !0, p.readable = !1, p.emit("end"));
  }
  function se(m, p) {
    for (var R = 0, _ = m.length; R < _; R++)
      if (m[R] === p) return R;
    return -1;
  }
  return ys;
}
var bs, dp;
function Lm() {
  if (dp) return bs;
  dp = 1, bs = r;
  var e = yr(), t = Object.create(Ti());
  t.inherits = Ri(), t.inherits(r, e);
  function n(o, s) {
    var c = this._transformState;
    c.transforming = !1;
    var f = c.writecb;
    if (!f)
      return this.emit("error", new Error("write callback called multiple times"));
    c.writechunk = null, c.writecb = null, s != null && this.push(s), f(o);
    var l = this._readableState;
    l.reading = !1, (l.needReadable || l.length < l.highWaterMark) && this._read(l.highWaterMark);
  }
  function r(o) {
    if (!(this instanceof r)) return new r(o);
    e.call(this, o), this._transformState = {
      afterTransform: n.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, o && (typeof o.transform == "function" && (this._transform = o.transform), typeof o.flush == "function" && (this._flush = o.flush)), this.on("prefinish", i);
  }
  function i() {
    var o = this;
    typeof this._flush == "function" ? this._flush(function(s, c) {
      a(o, s, c);
    }) : a(this, null, null);
  }
  r.prototype.push = function(o, s) {
    return this._transformState.needTransform = !1, e.prototype.push.call(this, o, s);
  }, r.prototype._transform = function(o, s, c) {
    throw new Error("_transform() is not implemented");
  }, r.prototype._write = function(o, s, c) {
    var f = this._transformState;
    if (f.writecb = c, f.writechunk = o, f.writeencoding = s, !f.transforming) {
      var l = this._readableState;
      (f.needTransform || l.needReadable || l.length < l.highWaterMark) && this._read(l.highWaterMark);
    }
  }, r.prototype._read = function(o) {
    var s = this._transformState;
    s.writechunk !== null && s.writecb && !s.transforming ? (s.transforming = !0, this._transform(s.writechunk, s.writeencoding, s.afterTransform)) : s.needTransform = !0;
  }, r.prototype._destroy = function(o, s) {
    var c = this;
    e.prototype._destroy.call(this, o, function(f) {
      s(f), c.emit("close");
    });
  };
  function a(o, s, c) {
    if (s) return o.emit("error", s);
    if (c != null && o.push(c), o._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (o._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return o.push(null);
  }
  return bs;
}
var ws, mp;
function ty() {
  if (mp) return ws;
  mp = 1, ws = n;
  var e = Lm(), t = Object.create(Ti());
  t.inherits = Ri(), t.inherits(n, e);
  function n(r) {
    if (!(this instanceof n)) return new n(r);
    e.call(this, r);
  }
  return n.prototype._transform = function(r, i, a) {
    a(null, r);
  }, ws;
}
(function(e, t) {
  var n = le;
  process.env.READABLE_STREAM === "disable" && n ? (e.exports = n, t = e.exports = n.Readable, t.Readable = n.Readable, t.Writable = n.Writable, t.Duplex = n.Duplex, t.Transform = n.Transform, t.PassThrough = n.PassThrough, t.Stream = n) : (t = e.exports = $m(), t.Stream = n || t, t.Readable = t, t.Writable = Nm(), t.Duplex = yr(), t.Transform = Lm(), t.PassThrough = ty());
})(Dc, Dc.exports);
var Ci = Dc.exports, ny = Ci.Duplex, gl = ny, ry = Fe, ar = Ai.Buffer;
function be(e) {
  if (!(this instanceof be))
    return new be(e);
  if (this._bufs = [], this.length = 0, typeof e == "function") {
    this._callback = e;
    var t = (function(r) {
      this._callback && (this._callback(r), this._callback = null);
    }).bind(this);
    this.on("pipe", function(r) {
      r.on("error", t);
    }), this.on("unpipe", function(r) {
      r.removeListener("error", t);
    });
  } else
    this.append(e);
  gl.call(this);
}
ry.inherits(be, gl);
be.prototype._offset = function(t) {
  var n = 0, r = 0, i;
  if (t === 0) return [0, 0];
  for (; r < this._bufs.length; r++) {
    if (i = n + this._bufs[r].length, t < i || r == this._bufs.length - 1)
      return [r, t - n];
    n = i;
  }
};
be.prototype.append = function(t) {
  var n = 0;
  if (ar.isBuffer(t))
    this._appendBuffer(t);
  else if (Array.isArray(t))
    for (; n < t.length; n++)
      this.append(t[n]);
  else if (t instanceof be)
    for (; n < t._bufs.length; n++)
      this.append(t._bufs[n]);
  else t != null && (typeof t == "number" && (t = t.toString()), this._appendBuffer(ar.from(t)));
  return this;
};
be.prototype._appendBuffer = function(t) {
  this._bufs.push(t), this.length += t.length;
};
be.prototype._write = function(t, n, r) {
  this._appendBuffer(t), typeof r == "function" && r();
};
be.prototype._read = function(t) {
  if (!this.length)
    return this.push(null);
  t = Math.min(t, this.length), this.push(this.slice(0, t)), this.consume(t);
};
be.prototype.end = function(t) {
  gl.prototype.end.call(this, t), this._callback && (this._callback(null, this.slice()), this._callback = null);
};
be.prototype.get = function(t) {
  return this.slice(t, t + 1)[0];
};
be.prototype.slice = function(t, n) {
  return typeof t == "number" && t < 0 && (t += this.length), typeof n == "number" && n < 0 && (n += this.length), this.copy(null, 0, t, n);
};
be.prototype.copy = function(t, n, r, i) {
  if ((typeof r != "number" || r < 0) && (r = 0), (typeof i != "number" || i > this.length) && (i = this.length), r >= this.length || i <= 0)
    return t || ar.alloc(0);
  var a = !!t, o = this._offset(r), s = i - r, c = s, f = a && n || 0, l = o[1], u, d;
  if (r === 0 && i == this.length) {
    if (!a)
      return this._bufs.length === 1 ? this._bufs[0] : ar.concat(this._bufs, this.length);
    for (d = 0; d < this._bufs.length; d++)
      this._bufs[d].copy(t, f), f += this._bufs[d].length;
    return t;
  }
  if (c <= this._bufs[o[0]].length - l)
    return a ? this._bufs[o[0]].copy(t, n, l, l + c) : this._bufs[o[0]].slice(l, l + c);
  for (a || (t = ar.allocUnsafe(s)), d = o[0]; d < this._bufs.length; d++) {
    if (u = this._bufs[d].length - l, c > u)
      this._bufs[d].copy(t, f, l), f += u;
    else {
      this._bufs[d].copy(t, f, l, l + c), f += u;
      break;
    }
    c -= u, l && (l = 0);
  }
  return t.length > f ? t.slice(0, f) : t;
};
be.prototype.shallowSlice = function(t, n) {
  t = t || 0, n = n || this.length, t < 0 && (t += this.length), n < 0 && (n += this.length);
  var r = this._offset(t), i = this._offset(n), a = this._bufs.slice(r[0], i[0] + 1);
  return i[1] == 0 ? a.pop() : a[a.length - 1] = a[a.length - 1].slice(0, i[1]), r[1] != 0 && (a[0] = a[0].slice(r[1])), new be(a);
};
be.prototype.toString = function(t, n, r) {
  return this.slice(n, r).toString(t);
};
be.prototype.consume = function(t) {
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
be.prototype.duplicate = function() {
  for (var t = 0, n = new be(); t < this._bufs.length; t++)
    n.append(this._bufs[t]);
  return n;
};
be.prototype.destroy = function() {
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
    (function(n) {
      be.prototype[n] = function(r) {
        return this.slice(r, r + e[n])[n](0);
      };
    })(t);
})();
var iy = be, ay = sy, oy = Object.prototype.hasOwnProperty;
function sy() {
  for (var e = {}, t = 0; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n)
      oy.call(n, r) && (e[r] = n[r]);
  }
  return e;
}
var Mn = {}, Ic = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
(function(e, t) {
  var n = pl, r = n.Buffer;
  function i(o, s) {
    for (var c in o)
      s[c] = o[c];
  }
  r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = n : (i(n, t), t.Buffer = a);
  function a(o, s, c) {
    return r(o, s, c);
  }
  a.prototype = Object.create(r.prototype), i(r, a), a.from = function(o, s, c) {
    if (typeof o == "number")
      throw new TypeError("Argument must not be a number");
    return r(o, s, c);
  }, a.alloc = function(o, s, c) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    var f = r(o);
    return s !== void 0 ? typeof c == "string" ? f.fill(s, c) : f.fill(s) : f.fill(0), f;
  }, a.allocUnsafe = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return r(o);
  }, a.allocUnsafeSlow = function(o) {
    if (typeof o != "number")
      throw new TypeError("Argument must be a number");
    return n.SlowBuffer(o);
  };
})(Ic, Ic.exports);
var cy = Ic.exports, ly = {}.toString, uy = Array.isArray || function(e) {
  return ly.call(e) == "[object Array]";
}, Or = TypeError, Um = Object, py = Error, fy = EvalError, dy = RangeError, my = ReferenceError, Bm = SyntaxError, hy = URIError, xy = Math.abs, vy = Math.floor, gy = Math.max, yy = Math.min, by = Math.pow, wy = Math.round, Ey = Number.isNaN || function(t) {
  return t !== t;
}, _y = Ey, Sy = function(t) {
  return _y(t) || t === 0 ? t : t < 0 ? -1 : 1;
}, Ay = Object.getOwnPropertyDescriptor, Ia = Ay;
if (Ia)
  try {
    Ia([], "length");
  } catch {
    Ia = null;
  }
var Oi = Ia, Na = Object.defineProperty || !1;
if (Na)
  try {
    Na({}, "a", { value: 1 });
  } catch {
    Na = !1;
  }
var ho = Na, Es, hp;
function jm() {
  return hp || (hp = 1, Es = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, n = Symbol("test"), r = Object(n);
    if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(r) !== "[object Symbol]")
      return !1;
    var i = 42;
    t[n] = i;
    for (var a in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(t);
    if (o.length !== 1 || o[0] !== n || !Object.prototype.propertyIsEnumerable.call(t, n))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(t, n)
      );
      if (s.value !== i || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }), Es;
}
var _s, xp;
function Ty() {
  if (xp) return _s;
  xp = 1;
  var e = typeof Symbol < "u" && Symbol, t = jm();
  return _s = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, _s;
}
var Ss, vp;
function Mm() {
  return vp || (vp = 1, Ss = typeof Reflect < "u" && Reflect.getPrototypeOf || null), Ss;
}
var As, gp;
function qm() {
  if (gp) return As;
  gp = 1;
  var e = Um;
  return As = e.getPrototypeOf || null, As;
}
var Ry = "Function.prototype.bind called on incompatible ", Cy = Object.prototype.toString, Oy = Math.max, Py = "[object Function]", yp = function(t, n) {
  for (var r = [], i = 0; i < t.length; i += 1)
    r[i] = t[i];
  for (var a = 0; a < n.length; a += 1)
    r[a + t.length] = n[a];
  return r;
}, Fy = function(t, n) {
  for (var r = [], i = n, a = 0; i < t.length; i += 1, a += 1)
    r[a] = t[i];
  return r;
}, Dy = function(e, t) {
  for (var n = "", r = 0; r < e.length; r += 1)
    n += e[r], r + 1 < e.length && (n += t);
  return n;
}, ky = function(t) {
  var n = this;
  if (typeof n != "function" || Cy.apply(n) !== Py)
    throw new TypeError(Ry + n);
  for (var r = Fy(arguments, 1), i, a = function() {
    if (this instanceof i) {
      var l = n.apply(
        this,
        yp(r, arguments)
      );
      return Object(l) === l ? l : this;
    }
    return n.apply(
      t,
      yp(r, arguments)
    );
  }, o = Oy(0, n.length - r.length), s = [], c = 0; c < o; c++)
    s[c] = "$" + c;
  if (i = Function("binder", "return function (" + Dy(s, ",") + "){ return binder.apply(this,arguments); }")(a), n.prototype) {
    var f = function() {
    };
    f.prototype = n.prototype, i.prototype = new f(), f.prototype = null;
  }
  return i;
}, Iy = ky, Pi = Function.prototype.bind || Iy, yl = Function.prototype.call, bl = Function.prototype.apply, Ny = typeof Reflect < "u" && Reflect && Reflect.apply, $y = Pi, Ly = bl, Uy = yl, By = Ny, zm = By || $y.call(Uy, Ly), jy = Pi, My = Or, qy = yl, zy = zm, wl = function(t) {
  if (t.length < 1 || typeof t[0] != "function")
    throw new My("a function is required");
  return zy(jy, qy, t);
}, Ts, bp;
function Hy() {
  if (bp) return Ts;
  bp = 1;
  var e = wl, t = Oi, n;
  try {
    n = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (o) {
    if (!o || typeof o != "object" || !("code" in o) || o.code !== "ERR_PROTO_ACCESS")
      throw o;
  }
  var r = !!n && t && t(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), i = Object, a = i.getPrototypeOf;
  return Ts = r && typeof r.get == "function" ? e([r.get]) : typeof a == "function" ? (
    /** @type {import('./get')} */
    function(s) {
      return a(s == null ? s : i(s));
    }
  ) : !1, Ts;
}
var Rs, wp;
function Hm() {
  if (wp) return Rs;
  wp = 1;
  var e = Mm(), t = qm(), n = Hy();
  return Rs = e ? function(i) {
    return e(i);
  } : t ? function(i) {
    if (!i || typeof i != "object" && typeof i != "function")
      throw new TypeError("getProto: not an object");
    return t(i);
  } : n ? function(i) {
    return n(i);
  } : null, Rs;
}
var Gy = Function.prototype.call, Wy = Object.prototype.hasOwnProperty, Vy = Pi, El = Vy.call(Gy, Wy), ie, Yy = Um, Xy = py, Ky = fy, Jy = dy, Qy = my, br = Bm, dr = Or, Zy = hy, eb = xy, tb = vy, nb = gy, rb = yy, ib = by, ab = wy, ob = Sy, Gm = Function, Cs = function(e) {
  try {
    return Gm('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, ri = Oi, sb = ho, Os = function() {
  throw new dr();
}, cb = ri ? function() {
  try {
    return arguments.callee, Os;
  } catch {
    try {
      return ri(arguments, "callee").get;
    } catch {
      return Os;
    }
  }
}() : Os, Kn = Ty()(), Oe = Hm(), lb = qm(), ub = Mm(), Wm = bl, Fi = yl, nr = {}, pb = typeof Uint8Array > "u" || !Oe ? ie : Oe(Uint8Array), Pn = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? ie : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? ie : ArrayBuffer,
  "%ArrayIteratorPrototype%": Kn && Oe ? Oe([][Symbol.iterator]()) : ie,
  "%AsyncFromSyncIteratorPrototype%": ie,
  "%AsyncFunction%": nr,
  "%AsyncGenerator%": nr,
  "%AsyncGeneratorFunction%": nr,
  "%AsyncIteratorPrototype%": nr,
  "%Atomics%": typeof Atomics > "u" ? ie : Atomics,
  "%BigInt%": typeof BigInt > "u" ? ie : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? ie : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? ie : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? ie : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Xy,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Ky,
  "%Float16Array%": typeof Float16Array > "u" ? ie : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? ie : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? ie : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? ie : FinalizationRegistry,
  "%Function%": Gm,
  "%GeneratorFunction%": nr,
  "%Int8Array%": typeof Int8Array > "u" ? ie : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? ie : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? ie : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Kn && Oe ? Oe(Oe([][Symbol.iterator]())) : ie,
  "%JSON%": typeof JSON == "object" ? JSON : ie,
  "%Map%": typeof Map > "u" ? ie : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Kn || !Oe ? ie : Oe((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Yy,
  "%Object.getOwnPropertyDescriptor%": ri,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? ie : Promise,
  "%Proxy%": typeof Proxy > "u" ? ie : Proxy,
  "%RangeError%": Jy,
  "%ReferenceError%": Qy,
  "%Reflect%": typeof Reflect > "u" ? ie : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? ie : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Kn || !Oe ? ie : Oe((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? ie : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Kn && Oe ? Oe(""[Symbol.iterator]()) : ie,
  "%Symbol%": Kn ? Symbol : ie,
  "%SyntaxError%": br,
  "%ThrowTypeError%": cb,
  "%TypedArray%": pb,
  "%TypeError%": dr,
  "%Uint8Array%": typeof Uint8Array > "u" ? ie : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? ie : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? ie : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? ie : Uint32Array,
  "%URIError%": Zy,
  "%WeakMap%": typeof WeakMap > "u" ? ie : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? ie : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? ie : WeakSet,
  "%Function.prototype.call%": Fi,
  "%Function.prototype.apply%": Wm,
  "%Object.defineProperty%": sb,
  "%Object.getPrototypeOf%": lb,
  "%Math.abs%": eb,
  "%Math.floor%": tb,
  "%Math.max%": nb,
  "%Math.min%": rb,
  "%Math.pow%": ib,
  "%Math.round%": ab,
  "%Math.sign%": ob,
  "%Reflect.getPrototypeOf%": ub
};
if (Oe)
  try {
    null.error;
  } catch (e) {
    var fb = Oe(Oe(e));
    Pn["%Error.prototype%"] = fb;
  }
var db = function e(t) {
  var n;
  if (t === "%AsyncFunction%")
    n = Cs("async function () {}");
  else if (t === "%GeneratorFunction%")
    n = Cs("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    n = Cs("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var r = e("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var i = e("%AsyncGenerator%");
    i && Oe && (n = Oe(i.prototype));
  }
  return Pn[t] = n, n;
}, Ep = {
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
}, Di = Pi, Va = El, mb = Di.call(Fi, Array.prototype.concat), hb = Di.call(Wm, Array.prototype.splice), _p = Di.call(Fi, String.prototype.replace), Ya = Di.call(Fi, String.prototype.slice), xb = Di.call(Fi, RegExp.prototype.exec), vb = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, gb = /\\(\\)?/g, yb = function(t) {
  var n = Ya(t, 0, 1), r = Ya(t, -1);
  if (n === "%" && r !== "%")
    throw new br("invalid intrinsic syntax, expected closing `%`");
  if (r === "%" && n !== "%")
    throw new br("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return _p(t, vb, function(a, o, s, c) {
    i[i.length] = s ? _p(c, gb, "$1") : o || a;
  }), i;
}, bb = function(t, n) {
  var r = t, i;
  if (Va(Ep, r) && (i = Ep[r], r = "%" + i[0] + "%"), Va(Pn, r)) {
    var a = Pn[r];
    if (a === nr && (a = db(r)), typeof a > "u" && !n)
      throw new dr("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: r,
      value: a
    };
  }
  throw new br("intrinsic " + t + " does not exist!");
}, _l = function(t, n) {
  if (typeof t != "string" || t.length === 0)
    throw new dr("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new dr('"allowMissing" argument must be a boolean');
  if (xb(/^%?[^%]*%?$/, t) === null)
    throw new br("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = yb(t), i = r.length > 0 ? r[0] : "", a = bb("%" + i + "%", n), o = a.name, s = a.value, c = !1, f = a.alias;
  f && (i = f[0], hb(r, mb([0, 1], f)));
  for (var l = 1, u = !0; l < r.length; l += 1) {
    var d = r[l], h = Ya(d, 0, 1), v = Ya(d, -1);
    if ((h === '"' || h === "'" || h === "`" || v === '"' || v === "'" || v === "`") && h !== v)
      throw new br("property names with quotes must have matching quotes");
    if ((d === "constructor" || !u) && (c = !0), i += "." + d, o = "%" + i + "%", Va(Pn, o))
      s = Pn[o];
    else if (s != null) {
      if (!(d in s)) {
        if (!n)
          throw new dr("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (ri && l + 1 >= r.length) {
        var x = ri(s, d);
        u = !!x, u && "get" in x && !("originalValue" in x.get) ? s = x.get : s = s[d];
      } else
        u = Va(s, d), s = s[d];
      u && !c && (Pn[o] = s);
    }
  }
  return s;
}, Vm = _l, Ym = wl, wb = Ym([Vm("%String.prototype.indexOf%")]), Xm = function(t, n) {
  var r = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    Vm(t, !!n)
  );
  return typeof r == "function" && wb(t, ".prototype.") > -1 ? Ym(
    /** @type {const} */
    [r]
  ) : r;
}, Ps, Sp;
function Eb() {
  if (Sp) return Ps;
  Sp = 1;
  var e = Function.prototype.toString, t = typeof Reflect == "object" && Reflect !== null && Reflect.apply, n, r;
  if (typeof t == "function" && typeof Object.defineProperty == "function")
    try {
      n = Object.defineProperty({}, "length", {
        get: function() {
          throw r;
        }
      }), r = {}, t(function() {
        throw 42;
      }, null, n);
    } catch (b) {
      b !== r && (t = null);
    }
  else
    t = null;
  var i = /^\s*class\b/, a = function(T) {
    try {
      var D = e.call(T);
      return i.test(D);
    } catch {
      return !1;
    }
  }, o = function(T) {
    try {
      return a(T) ? !1 : (e.call(T), !0);
    } catch {
      return !1;
    }
  }, s = Object.prototype.toString, c = "[object Object]", f = "[object Function]", l = "[object GeneratorFunction]", u = "[object HTMLAllCollection]", d = "[object HTML document.all class]", h = "[object HTMLCollection]", v = typeof Symbol == "function" && !!Symbol.toStringTag, x = !(0 in [,]), g = function() {
    return !1;
  };
  if (typeof document == "object") {
    var y = document.all;
    s.call(y) === s.call(document.all) && (g = function(T) {
      if ((x || !T) && (typeof T > "u" || typeof T == "object"))
        try {
          var D = s.call(T);
          return (D === u || D === d || D === h || D === c) && T("") == null;
        } catch {
        }
      return !1;
    });
  }
  return Ps = t ? function(T) {
    if (g(T))
      return !0;
    if (!T || typeof T != "function" && typeof T != "object")
      return !1;
    try {
      t(T, null, n);
    } catch (D) {
      if (D !== r)
        return !1;
    }
    return !a(T) && o(T);
  } : function(T) {
    if (g(T))
      return !0;
    if (!T || typeof T != "function" && typeof T != "object")
      return !1;
    if (v)
      return o(T);
    if (a(T))
      return !1;
    var D = s.call(T);
    return D !== f && D !== l && !/^\[object HTML/.test(D) ? !1 : o(T);
  }, Ps;
}
var Fs, Ap;
function _b() {
  if (Ap) return Fs;
  Ap = 1;
  var e = Eb(), t = Object.prototype.toString, n = Object.prototype.hasOwnProperty, r = function(c, f, l) {
    for (var u = 0, d = c.length; u < d; u++)
      n.call(c, u) && (l == null ? f(c[u], u, c) : f.call(l, c[u], u, c));
  }, i = function(c, f, l) {
    for (var u = 0, d = c.length; u < d; u++)
      l == null ? f(c.charAt(u), u, c) : f.call(l, c.charAt(u), u, c);
  }, a = function(c, f, l) {
    for (var u in c)
      n.call(c, u) && (l == null ? f(c[u], u, c) : f.call(l, c[u], u, c));
  };
  function o(s) {
    return t.call(s) === "[object Array]";
  }
  return Fs = function(c, f, l) {
    if (!e(f))
      throw new TypeError("iterator must be a function");
    var u;
    arguments.length >= 3 && (u = l), o(c) ? r(c, f, u) : typeof c == "string" ? i(c, f, u) : a(c, f, u);
  }, Fs;
}
var Ds, Tp;
function Sb() {
  return Tp || (Tp = 1, Ds = [
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
  ]), Ds;
}
var ks, Rp;
function Ab() {
  if (Rp) return ks;
  Rp = 1;
  var e = Sb(), t = typeof globalThis > "u" ? ue : globalThis;
  return ks = function() {
    for (var r = [], i = 0; i < e.length; i++)
      typeof t[e[i]] == "function" && (r[r.length] = e[i]);
    return r;
  }, ks;
}
var Is = { exports: {} }, Ns, Cp;
function Tb() {
  if (Cp) return Ns;
  Cp = 1;
  var e = ho, t = Bm, n = Or, r = Oi;
  return Ns = function(a, o, s) {
    if (!a || typeof a != "object" && typeof a != "function")
      throw new n("`obj` must be an object or a function`");
    if (typeof o != "string" && typeof o != "symbol")
      throw new n("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new n("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new n("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new n("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new n("`loose`, if provided, must be a boolean");
    var c = arguments.length > 3 ? arguments[3] : null, f = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] : null, u = arguments.length > 6 ? arguments[6] : !1, d = !!r && r(a, o);
    if (e)
      e(a, o, {
        configurable: l === null && d ? d.configurable : !l,
        enumerable: c === null && d ? d.enumerable : !c,
        value: s,
        writable: f === null && d ? d.writable : !f
      });
    else if (u || !c && !f && !l)
      a[o] = s;
    else
      throw new t("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, Ns;
}
var $s, Op;
function Rb() {
  if (Op) return $s;
  Op = 1;
  var e = ho, t = function() {
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
  }, $s = t, $s;
}
var Ls, Pp;
function Cb() {
  if (Pp) return Ls;
  Pp = 1;
  var e = _l, t = Tb(), n = Rb()(), r = Oi, i = Or, a = e("%Math.floor%");
  return Ls = function(s, c) {
    if (typeof s != "function")
      throw new i("`fn` is not a function");
    if (typeof c != "number" || c < 0 || c > 4294967295 || a(c) !== c)
      throw new i("`length` must be a positive 32-bit integer");
    var f = arguments.length > 2 && !!arguments[2], l = !0, u = !0;
    if ("length" in s && r) {
      var d = r(s, "length");
      d && !d.configurable && (l = !1), d && !d.writable && (u = !1);
    }
    return (l || u || !f) && (n ? t(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      c,
      !0,
      !0
    ) : t(
      /** @type {Parameters<define>[0]} */
      s,
      "length",
      c
    )), s;
  }, Ls;
}
var Us, Fp;
function Ob() {
  if (Fp) return Us;
  Fp = 1;
  var e = Pi, t = bl, n = zm;
  return Us = function() {
    return n(e, t, arguments);
  }, Us;
}
var Dp;
function Pb() {
  return Dp || (Dp = 1, function(e) {
    var t = Cb(), n = ho, r = wl, i = Ob();
    e.exports = function(o) {
      var s = r(arguments), c = o.length - (arguments.length - 1);
      return t(
        s,
        1 + (c > 0 ? c : 0),
        !0
      );
    }, n ? n(e.exports, "apply", { value: i }) : e.exports.apply = i;
  }(Is)), Is.exports;
}
var Bs, kp;
function Km() {
  if (kp) return Bs;
  kp = 1;
  var e = jm();
  return Bs = function() {
    return e() && !!Symbol.toStringTag;
  }, Bs;
}
var js, Ip;
function Fb() {
  if (Ip) return js;
  Ip = 1;
  var e = _b(), t = Ab(), n = Pb(), r = Xm, i = Oi, a = Hm(), o = r("Object.prototype.toString"), s = Km()(), c = typeof globalThis > "u" ? ue : globalThis, f = t(), l = r("String.prototype.slice"), u = r("Array.prototype.indexOf", !0) || function(g, y) {
    for (var b = 0; b < g.length; b += 1)
      if (g[b] === y)
        return b;
    return -1;
  }, d = { __proto__: null };
  s && i && a ? e(f, function(x) {
    var g = new c[x]();
    if (Symbol.toStringTag in g && a) {
      var y = a(g), b = i(y, Symbol.toStringTag);
      if (!b && y) {
        var T = a(y);
        b = i(T, Symbol.toStringTag);
      }
      if (b && b.get) {
        var D = n(b.get);
        d[
          /** @type {`$${import('.').TypedArrayName}`} */
          "$" + x
        ] = D;
      }
    }
  }) : e(f, function(x) {
    var g = new c[x](), y = g.slice || g.set;
    if (y) {
      var b = (
        /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
        // @ts-expect-error TODO FIXME
        n(y)
      );
      d[
        /** @type {`$${import('.').TypedArrayName}`} */
        "$" + x
      ] = b;
    }
  });
  var h = function(g) {
    var y = !1;
    return e(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      d,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(b, T) {
        if (!y)
          try {
            "$" + b(g) === T && (y = /** @type {import('.').TypedArrayName} */
            l(T, 1));
          } catch {
          }
      }
    ), y;
  }, v = function(g) {
    var y = !1;
    return e(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      d,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(b, T) {
        if (!y)
          try {
            b(g), y = /** @type {import('.').TypedArrayName} */
            l(T, 1);
          } catch {
          }
      }
    ), y;
  };
  return js = function(g) {
    if (!g || typeof g != "object")
      return !1;
    if (!s) {
      var y = l(o(g), 8, -1);
      return u(f, y) > -1 ? y : y !== "Object" ? !1 : v(g);
    }
    return i ? h(g) : null;
  }, js;
}
var Ms, Np;
function Db() {
  if (Np) return Ms;
  Np = 1;
  var e = Fb();
  return Ms = function(n) {
    return !!e(n);
  }, Ms;
}
var kb = Or, Ib = Xm, Nb = Ib("TypedArray.prototype.buffer", !0), $b = Db(), Lb = Nb || function(t) {
  if (!$b(t))
    throw new kb("Not a Typed Array");
  return t.buffer;
}, xt = cy.Buffer, Ub = uy, Bb = Lb, jb = ArrayBuffer.isView || function(t) {
  try {
    return Bb(t), !0;
  } catch {
    return !1;
  }
}, Mb = typeof Uint8Array < "u", Jm = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", qb = Jm && (xt.prototype instanceof Uint8Array || xt.TYPED_ARRAY_SUPPORT), Qm = function(t, n) {
  if (xt.isBuffer(t))
    return t.constructor && !("isBuffer" in t) ? xt.from(t) : t;
  if (typeof t == "string")
    return xt.from(t, n);
  if (Jm && jb(t)) {
    if (t.byteLength === 0)
      return xt.alloc(0);
    if (qb) {
      var r = xt.from(t.buffer, t.byteOffset, t.byteLength);
      if (r.byteLength === t.byteLength)
        return r;
    }
    var i = t instanceof Uint8Array ? t : new Uint8Array(t.buffer, t.byteOffset, t.byteLength), a = xt.from(i);
    if (a.length === t.byteLength)
      return a;
  }
  if (Mb && t instanceof Uint8Array)
    return xt.from(t);
  var o = Ub(t);
  if (o)
    for (var s = 0; s < t.length; s += 1) {
      var c = t[s];
      if (typeof c != "number" || c < 0 || c > 255 || ~~c !== c)
        throw new RangeError("Array items must be numbers in the range 0-255.");
    }
  if (o || xt.isBuffer(t) && t.constructor && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t))
    return xt.from(t);
  throw new TypeError('The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.');
}, zb = function() {
  try {
    if (!Buffer.isEncoding("latin1"))
      return !1;
    var e = Buffer.alloc ? Buffer.alloc(4) : new Buffer(4);
    return e.fill("ab", "ucs2"), e.toString("hex") === "61006200";
  } catch {
    return !1;
  }
}();
function Hb(e) {
  return e.length === 1 && e.charCodeAt(0) < 256;
}
function ma(e, t, n, r) {
  if (n < 0 || r > e.length)
    throw new RangeError("Out of range index");
  return n = n >>> 0, r = r === void 0 ? e.length : r >>> 0, r > n && e.fill(t, n, r), e;
}
function Gb(e, t, n, r) {
  if (n < 0 || r > e.length)
    throw new RangeError("Out of range index");
  if (r <= n)
    return e;
  n = n >>> 0, r = r === void 0 ? e.length : r >>> 0;
  for (var i = n, a = t.length; i <= r - a; )
    t.copy(e, i), i += a;
  return i !== r && t.copy(e, i, 0, r - i), e;
}
function Wb(e, t, n, r, i) {
  if (zb)
    return e.fill(t, n, r, i);
  if (typeof t == "number")
    return ma(e, t, n, r);
  if (typeof t == "string") {
    if (typeof n == "string" ? (i = n, n = 0, r = e.length) : typeof r == "string" && (i = r, r = e.length), i !== void 0 && typeof i != "string")
      throw new TypeError("encoding must be a string");
    if (i === "latin1" && (i = "binary"), typeof i == "string" && !Buffer.isEncoding(i))
      throw new TypeError("Unknown encoding: " + i);
    if (t === "")
      return ma(e, 0, n, r);
    if (Hb(t))
      return ma(e, t.charCodeAt(0), n, r);
    t = new Buffer(t, i);
  }
  return Buffer.isBuffer(t) ? Gb(e, t, n, r) : ma(e, 0, n, r);
}
var Vb = Wb;
function Yb(e) {
  if (typeof e != "number")
    throw new TypeError('"size" argument must be a number');
  if (e < 0)
    throw new RangeError('"size" argument must not be negative');
  return Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e);
}
var Xb = Yb, $p = Vb, Kb = Xb, Zm = function(t, n, r) {
  if (typeof t != "number")
    throw new TypeError('"size" argument must be a number');
  if (t < 0)
    throw new RangeError('"size" argument must not be negative');
  if (Buffer.alloc)
    return Buffer.alloc(t, n, r);
  var i = Kb(t);
  return t === 0 ? i : n === void 0 ? $p(i, 0) : (typeof r != "string" && (r = void 0), $p(i, n, r));
}, Jb = Qm, Qb = Zm, Zb = "0000000000000000000", ew = "7777777777777777777", eh = 48, tw = "ustar\x0000", nw = parseInt("7777", 8), rw = function(e, t, n) {
  return typeof e != "number" ? n : (e = ~~e, e >= t ? t : e >= 0 || (e += t, e >= 0) ? e : 0);
}, iw = function(e) {
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
}, aw = function(e) {
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
}, th = function(e, t, n, r) {
  for (; n < r; n++)
    if (e[n] === t) return n;
  return r;
}, nh = function(e) {
  for (var t = 256, n = 0; n < 148; n++) t += e[n];
  for (var r = 156; r < 512; r++) t += e[r];
  return t;
}, Yt = function(e, t) {
  return e = e.toString(8), e.length > t ? ew.slice(0, t) + " " : Zb.slice(0, t - e.length) + e + " ";
};
function ow(e) {
  var t;
  if (e[0] === 128) t = !0;
  else if (e[0] === 255) t = !1;
  else return null;
  for (var n = [], r = e.length - 1; r > 0; r--) {
    var i = e[r];
    t ? n.push(i) : n.push(255 - i);
  }
  var a = 0, o = n.length;
  for (r = 0; r < o; r++)
    a += n[r] * Math.pow(256, r);
  return t ? a : -1 * a;
}
var Xt = function(e, t, n) {
  if (e = e.slice(t, t + n), t = 0, e[t] & 128)
    return ow(e);
  for (; t < e.length && e[t] === 32; ) t++;
  for (var r = rw(th(e, 32, t, e.length), e.length, e.length); t < r && e[t] === 0; ) t++;
  return r === t ? 0 : parseInt(e.slice(t, r).toString(), 8);
}, rr = function(e, t, n, r) {
  return e.slice(t, th(e, 0, t, t + n)).toString(r);
}, qs = function(e) {
  var t = Buffer.byteLength(e), n = Math.floor(Math.log(t) / Math.log(10)) + 1;
  return t + n >= Math.pow(10, n) && n++, t + n + e;
};
Mn.decodeLongPath = function(e, t) {
  return rr(e, 0, e.length, t);
};
Mn.encodePax = function(e) {
  var t = "";
  e.name && (t += qs(" path=" + e.name + `
`)), e.linkname && (t += qs(" linkpath=" + e.linkname + `
`));
  var n = e.pax;
  if (n)
    for (var r in n)
      t += qs(" " + r + "=" + n[r] + `
`);
  return Jb(t);
};
Mn.decodePax = function(e) {
  for (var t = {}; e.length; ) {
    for (var n = 0; n < e.length && e[n] !== 32; ) n++;
    var r = parseInt(e.slice(0, n).toString(), 10);
    if (!r) return t;
    var i = e.slice(n + 1, r - 1).toString(), a = i.indexOf("=");
    if (a === -1) return t;
    t[i.slice(0, a)] = i.slice(a + 1), e = e.slice(r);
  }
  return t;
};
Mn.encode = function(e) {
  var t = Qb(512), n = e.name, r = "";
  if (e.typeflag === 5 && n[n.length - 1] !== "/" && (n += "/"), Buffer.byteLength(n) !== n.length) return null;
  for (; Buffer.byteLength(n) > 100; ) {
    var i = n.indexOf("/");
    if (i === -1) return null;
    r += r ? "/" + n.slice(0, i) : n.slice(0, i), n = n.slice(i + 1);
  }
  return Buffer.byteLength(n) > 100 || Buffer.byteLength(r) > 155 || e.linkname && Buffer.byteLength(e.linkname) > 100 ? null : (t.write(n), t.write(Yt(e.mode & nw, 6), 100), t.write(Yt(e.uid, 6), 108), t.write(Yt(e.gid, 6), 116), t.write(Yt(e.size, 11), 124), t.write(Yt(e.mtime.getTime() / 1e3 | 0, 11), 136), t[156] = eh + aw(e.type), e.linkname && t.write(e.linkname, 157), t.write(tw, 257), e.uname && t.write(e.uname, 265), e.gname && t.write(e.gname, 297), t.write(Yt(e.devmajor || 0, 6), 329), t.write(Yt(e.devminor || 0, 6), 337), r && t.write(r, 345), t.write(Yt(nh(t), 6), 148), t);
};
Mn.decode = function(e, t) {
  var n = e[156] === 0 ? 0 : e[156] - eh, r = rr(e, 0, 100, t), i = Xt(e, 100, 8), a = Xt(e, 108, 8), o = Xt(e, 116, 8), s = Xt(e, 124, 12), c = Xt(e, 136, 12), f = iw(n), l = e[157] === 0 ? null : rr(e, 157, 100, t), u = rr(e, 265, 32), d = rr(e, 297, 32), h = Xt(e, 329, 8), v = Xt(e, 337, 8);
  e[345] && (r = rr(e, 345, 155, t) + "/" + r), n === 0 && r && r[r.length - 1] === "/" && (n = 5);
  var x = nh(e);
  if (x === 8 * 32) return null;
  if (x !== Xt(e, 148, 8)) throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
  return {
    name: r,
    mode: i,
    uid: a,
    gid: o,
    size: s,
    mtime: new Date(1e3 * c),
    type: f,
    linkname: l,
    uname: u,
    gname: d,
    devmajor: h,
    devminor: v
  };
};
var rh = Fe, sw = iy, cw = ay, Mr = Mn, ih = Ci.Writable, ah = Ci.PassThrough, oh = function() {
}, Lp = function(e) {
  return e &= 511, e && 512 - e;
}, lw = function(e, t) {
  var n = new xo(e, t);
  return n.end(), n;
}, uw = function(e, t) {
  return t.path && (e.name = t.path), t.linkpath && (e.linkname = t.linkpath), t.size && (e.size = parseInt(t.size, 10)), e.pax = t, e;
}, xo = function(e, t) {
  this._parent = e, this.offset = t, ah.call(this);
};
rh.inherits(xo, ah);
xo.prototype.destroy = function(e) {
  this._parent.destroy(e);
};
var Lt = function(e) {
  if (!(this instanceof Lt)) return new Lt(e);
  ih.call(this, e), e = e || {}, this._offset = 0, this._buffer = sw(), this._missing = 0, this._partial = !1, this._onparse = oh, this._header = null, this._stream = null, this._overflow = null, this._cb = null, this._locked = !1, this._destroyed = !1, this._pax = null, this._paxGlobal = null, this._gnuLongPath = null, this._gnuLongLinkPath = null;
  var t = this, n = t._buffer, r = function() {
    t._continue();
  }, i = function(d) {
    if (t._locked = !1, d) return t.destroy(d);
    t._stream || r();
  }, a = function() {
    t._stream = null;
    var d = Lp(t._header.size);
    d ? t._parse(d, o) : t._parse(512, u), t._locked || r();
  }, o = function() {
    t._buffer.consume(Lp(t._header.size)), t._parse(512, u), r();
  }, s = function() {
    var d = t._header.size;
    t._paxGlobal = Mr.decodePax(n.slice(0, d)), n.consume(d), a();
  }, c = function() {
    var d = t._header.size;
    t._pax = Mr.decodePax(n.slice(0, d)), t._paxGlobal && (t._pax = cw(t._paxGlobal, t._pax)), n.consume(d), a();
  }, f = function() {
    var d = t._header.size;
    this._gnuLongPath = Mr.decodeLongPath(n.slice(0, d), e.filenameEncoding), n.consume(d), a();
  }, l = function() {
    var d = t._header.size;
    this._gnuLongLinkPath = Mr.decodeLongPath(n.slice(0, d), e.filenameEncoding), n.consume(d), a();
  }, u = function() {
    var d = t._offset, h;
    try {
      h = t._header = Mr.decode(n.slice(0, 512), e.filenameEncoding);
    } catch (v) {
      t.emit("error", v);
    }
    if (n.consume(512), !h) {
      t._parse(512, u), r();
      return;
    }
    if (h.type === "gnu-long-path") {
      t._parse(h.size, f), r();
      return;
    }
    if (h.type === "gnu-long-link-path") {
      t._parse(h.size, l), r();
      return;
    }
    if (h.type === "pax-global-header") {
      t._parse(h.size, s), r();
      return;
    }
    if (h.type === "pax-header") {
      t._parse(h.size, c), r();
      return;
    }
    if (t._gnuLongPath && (h.name = t._gnuLongPath, t._gnuLongPath = null), t._gnuLongLinkPath && (h.linkname = t._gnuLongLinkPath, t._gnuLongLinkPath = null), t._pax && (t._header = h = uw(h, t._pax), t._pax = null), t._locked = !0, !h.size || h.type === "directory") {
      t._parse(512, u), t.emit("entry", h, lw(t, d), i);
      return;
    }
    t._stream = new xo(t, d), t.emit("entry", h, t._stream, i), t._parse(h.size, a), r();
  };
  this._onheader = u, this._parse(512, u);
};
rh.inherits(Lt, ih);
Lt.prototype.destroy = function(e) {
  this._destroyed || (this._destroyed = !0, e && this.emit("error", e), this.emit("close"), this._stream && this._stream.emit("close"));
};
Lt.prototype._parse = function(e, t) {
  this._destroyed || (this._offset += e, this._missing = e, t === this._onheader && (this._partial = !1), this._onparse = t);
};
Lt.prototype._continue = function() {
  if (!this._destroyed) {
    var e = this._cb;
    this._cb = oh, this._overflow ? this._write(this._overflow, void 0, e) : e();
  }
};
Lt.prototype._write = function(e, t, n) {
  if (!this._destroyed) {
    var r = this._stream, i = this._buffer, a = this._missing;
    if (e.length && (this._partial = !0), e.length < a)
      return this._missing -= e.length, this._overflow = null, r ? r.write(e, n) : (i.append(e), n());
    this._cb = n, this._missing = 0;
    var o = null;
    e.length > a && (o = e.slice(a), e = e.slice(0, a)), r ? r.end(e) : i.append(e), this._overflow = o, this._onparse();
  }
};
Lt.prototype._final = function(e) {
  if (this._partial) return this.destroy(new Error("Unexpected end of data"));
  e();
};
var pw = Lt, fw = at.constants || Rm, Sl = { exports: {} }, dw = sh;
function sh(e, t) {
  if (e && t) return sh(e)(t);
  if (typeof e != "function")
    throw new TypeError("need wrapper function");
  return Object.keys(e).forEach(function(r) {
    n[r] = e[r];
  }), n;
  function n() {
    for (var r = new Array(arguments.length), i = 0; i < r.length; i++)
      r[i] = arguments[i];
    var a = e.apply(this, r), o = r[r.length - 1];
    return typeof a == "function" && a !== o && Object.keys(o).forEach(function(s) {
      a[s] = o[s];
    }), a;
  }
}
var ch = dw;
Sl.exports = ch($a);
Sl.exports.strict = ch(lh);
$a.proto = $a(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return $a(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return lh(this);
    },
    configurable: !0
  });
});
function $a(e) {
  var t = function() {
    return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
  };
  return t.called = !1, t;
}
function lh(e) {
  var t = function() {
    if (t.called)
      throw new Error(t.onceError);
    return t.called = !0, t.value = e.apply(this, arguments);
  }, n = e.name || "Function wrapped with `once`";
  return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
}
var mw = Sl.exports, hw = mw, xw = function() {
}, vw = ue.Bare ? queueMicrotask : process.nextTick.bind(process), gw = function(e) {
  return e.setHeader && typeof e.abort == "function";
}, yw = function(e) {
  return e.stdio && Array.isArray(e.stdio) && e.stdio.length === 3;
}, uh = function(e, t, n) {
  if (typeof t == "function") return uh(e, null, t);
  t || (t = {}), n = hw(n || xw);
  var r = e._writableState, i = e._readableState, a = t.readable || t.readable !== !1 && e.readable, o = t.writable || t.writable !== !1 && e.writable, s = !1, c = function() {
    e.writable || f();
  }, f = function() {
    o = !1, a || n.call(e);
  }, l = function() {
    a = !1, o || n.call(e);
  }, u = function(g) {
    n.call(e, g ? new Error("exited with error code: " + g) : null);
  }, d = function(g) {
    n.call(e, g);
  }, h = function() {
    vw(v);
  }, v = function() {
    if (!s) {
      if (a && !(i && i.ended && !i.destroyed)) return n.call(e, new Error("premature close"));
      if (o && !(r && r.ended && !r.destroyed)) return n.call(e, new Error("premature close"));
    }
  }, x = function() {
    e.req.on("finish", f);
  };
  return gw(e) ? (e.on("complete", f), e.on("abort", h), e.req ? x() : e.on("request", x)) : o && !r && (e.on("end", c), e.on("close", c)), yw(e) && e.on("exit", u), e.on("end", l), e.on("finish", f), t.error !== !1 && e.on("error", d), e.on("close", h), function() {
    s = !0, e.removeListener("complete", f), e.removeListener("abort", h), e.removeListener("request", x), e.req && e.req.removeListener("finish", f), e.removeListener("end", c), e.removeListener("close", c), e.removeListener("finish", f), e.removeListener("exit", u), e.removeListener("end", l), e.removeListener("error", d), e.removeListener("close", h);
  };
}, bw = uh, Jn = fw, Up = bw, vo = Fe, ww = Zm, Ew = Qm, ph = Ci.Readable, Pr = Ci.Writable, _w = kg.StringDecoder, La = Mn, Sw = parseInt("755", 8), Aw = parseInt("644", 8), fh = ww(1024), Al = function() {
}, Nc = function(e, t) {
  t &= 511, t && e.push(fh.slice(0, 512 - t));
};
function Tw(e) {
  switch (e & Jn.S_IFMT) {
    case Jn.S_IFBLK:
      return "block-device";
    case Jn.S_IFCHR:
      return "character-device";
    case Jn.S_IFDIR:
      return "directory";
    case Jn.S_IFIFO:
      return "fifo";
    case Jn.S_IFLNK:
      return "symlink";
  }
  return "file";
}
var go = function(e) {
  Pr.call(this), this.written = 0, this._to = e, this._destroyed = !1;
};
vo.inherits(go, Pr);
go.prototype._write = function(e, t, n) {
  if (this.written += e.length, this._to.push(e)) return n();
  this._to._drain = n;
};
go.prototype.destroy = function() {
  this._destroyed || (this._destroyed = !0, this.emit("close"));
};
var yo = function() {
  Pr.call(this), this.linkname = "", this._decoder = new _w("utf-8"), this._destroyed = !1;
};
vo.inherits(yo, Pr);
yo.prototype._write = function(e, t, n) {
  this.linkname += this._decoder.write(e), n();
};
yo.prototype.destroy = function() {
  this._destroyed || (this._destroyed = !0, this.emit("close"));
};
var ii = function() {
  Pr.call(this), this._destroyed = !1;
};
vo.inherits(ii, Pr);
ii.prototype._write = function(e, t, n) {
  n(new Error("No body allowed for this entry"));
};
ii.prototype.destroy = function() {
  this._destroyed || (this._destroyed = !0, this.emit("close"));
};
var Ot = function(e) {
  if (!(this instanceof Ot)) return new Ot(e);
  ph.call(this, e), this._drain = Al, this._finalized = !1, this._finalizing = !1, this._destroyed = !1, this._stream = null;
};
vo.inherits(Ot, ph);
Ot.prototype.entry = function(e, t, n) {
  if (this._stream) throw new Error("already piping an entry");
  if (!(this._finalized || this._destroyed)) {
    typeof t == "function" && (n = t, t = null), n || (n = Al);
    var r = this;
    if ((!e.size || e.type === "symlink") && (e.size = 0), e.type || (e.type = Tw(e.mode)), e.mode || (e.mode = e.type === "directory" ? Sw : Aw), e.uid || (e.uid = 0), e.gid || (e.gid = 0), e.mtime || (e.mtime = /* @__PURE__ */ new Date()), typeof t == "string" && (t = Ew(t)), Buffer.isBuffer(t))
      return e.size = t.length, this._encode(e), this.push(t), Nc(r, e.size), process.nextTick(n), new ii();
    if (e.type === "symlink" && !e.linkname) {
      var i = new yo();
      return Up(i, function(o) {
        if (o)
          return r.destroy(), n(o);
        e.linkname = i.linkname, r._encode(e), n();
      }), i;
    }
    if (this._encode(e), e.type !== "file" && e.type !== "contiguous-file")
      return process.nextTick(n), new ii();
    var a = new go(this);
    return this._stream = a, Up(a, function(o) {
      if (r._stream = null, o)
        return r.destroy(), n(o);
      if (a.written !== e.size)
        return r.destroy(), n(new Error("size mismatch"));
      Nc(r, e.size), r._finalizing && r.finalize(), n();
    }), a;
  }
};
Ot.prototype.finalize = function() {
  if (this._stream) {
    this._finalizing = !0;
    return;
  }
  this._finalized || (this._finalized = !0, this.push(fh), this.push(null));
};
Ot.prototype.destroy = function(e) {
  this._destroyed || (this._destroyed = !0, e && this.emit("error", e), this.emit("close"), this._stream && this._stream.destroy && this._stream.destroy());
};
Ot.prototype._encode = function(e) {
  if (!e.pax) {
    var t = La.encode(e);
    if (t) {
      this.push(t);
      return;
    }
  }
  this._encodePax(e);
};
Ot.prototype._encodePax = function(e) {
  var t = La.encodePax({
    name: e.name,
    linkname: e.linkname,
    pax: e.pax
  }), n = {
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
  this.push(La.encode(n)), this.push(t), Nc(this, t.length), n.size = e.size, n.type = e.type, this.push(La.encode(n));
};
Ot.prototype._read = function(e) {
  var t = this._drain;
  this._drain = Al, t();
};
var Rw = Ot;
vl.extract = pw;
vl.pack = Rw;
const Bp = Fm, Cw = xl, Ow = vl;
var Tl = () => (e) => {
  if (!Buffer.isBuffer(e) && !Cw(e))
    return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof e}`));
  if (Buffer.isBuffer(e) && (!Bp(e) || Bp(e).ext !== "tar"))
    return Promise.resolve([]);
  const t = Ow.extract(), n = [];
  t.on("entry", (i, a, o) => {
    const s = [];
    a.on("data", (c) => s.push(c)), a.on("end", () => {
      const c = {
        data: Buffer.concat(s),
        mode: i.mode,
        mtime: i.mtime,
        path: i.name,
        type: i.type
      };
      (i.type === "symlink" || i.type === "link") && (c.linkname = i.linkname), n.push(c), o();
    });
  });
  const r = new Promise((i, a) => {
    Buffer.isBuffer(e) || e.on("error", a), t.on("finish", () => i(n)), t.on("error", a);
  });
  return t.then = r.then.bind(r), t.catch = r.catch.bind(r), Buffer.isBuffer(e) ? t.end(e) : e.pipe(t), t;
};
const mr = (e) => Array.from(e).map((t) => t.charCodeAt(0)), Pw = mr("META-INF/mozilla.rsa"), Fw = mr("[Content_Types].xml"), Dw = mr("_rels/.rels");
var kw = (e) => {
  const t = new Uint8Array(e);
  if (!(t && t.length > 1))
    return null;
  const n = (r, i) => {
    i = Object.assign({
      offset: 0
    }, i);
    for (let a = 0; a < r.length; a++)
      if (i.mask) {
        if (r[a] !== (i.mask[a] & t[a + i.offset]))
          return !1;
      } else if (r[a] !== t[a + i.offset])
        return !1;
    return !0;
  };
  if (n([255, 216, 255]))
    return {
      ext: "jpg",
      mime: "image/jpeg"
    };
  if (n([137, 80, 78, 71, 13, 10, 26, 10]))
    return {
      ext: "png",
      mime: "image/png"
    };
  if (n([71, 73, 70]))
    return {
      ext: "gif",
      mime: "image/gif"
    };
  if (n([87, 69, 66, 80], { offset: 8 }))
    return {
      ext: "webp",
      mime: "image/webp"
    };
  if (n([70, 76, 73, 70]))
    return {
      ext: "flif",
      mime: "image/flif"
    };
  if ((n([73, 73, 42, 0]) || n([77, 77, 0, 42])) && n([67, 82], { offset: 8 }))
    return {
      ext: "cr2",
      mime: "image/x-canon-cr2"
    };
  if (n([73, 73, 42, 0]) || n([77, 77, 0, 42]))
    return {
      ext: "tif",
      mime: "image/tiff"
    };
  if (n([66, 77]))
    return {
      ext: "bmp",
      mime: "image/bmp"
    };
  if (n([73, 73, 188]))
    return {
      ext: "jxr",
      mime: "image/vnd.ms-photo"
    };
  if (n([56, 66, 80, 83]))
    return {
      ext: "psd",
      mime: "image/vnd.adobe.photoshop"
    };
  if (n([80, 75, 3, 4])) {
    if (n([109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112, 117, 98, 43, 122, 105, 112], { offset: 30 }))
      return {
        ext: "epub",
        mime: "application/epub+zip"
      };
    if (n(Pw, { offset: 30 }))
      return {
        ext: "xpi",
        mime: "application/x-xpinstall"
      };
    if (n(Fw, { offset: 30 }) || n(Dw, { offset: 30 })) {
      const r = t.subarray(4, 2004), i = (o) => o.findIndex((s, c, f) => f[c] === 80 && f[c + 1] === 75 && f[c + 2] === 3 && f[c + 3] === 4), a = i(r);
      if (a !== -1) {
        const o = t.subarray(a + 8, a + 8 + 1e3), s = i(o);
        if (s !== -1) {
          const c = 8 + a + s + 30;
          if (n(mr("word/"), { offset: c }))
            return {
              ext: "docx",
              mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            };
          if (n(mr("ppt/"), { offset: c }))
            return {
              ext: "pptx",
              mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            };
          if (n(mr("xl/"), { offset: c }))
            return {
              ext: "xlsx",
              mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
        }
      }
    }
  }
  if (n([80, 75]) && (t[2] === 3 || t[2] === 5 || t[2] === 7) && (t[3] === 4 || t[3] === 6 || t[3] === 8))
    return {
      ext: "zip",
      mime: "application/zip"
    };
  if (n([117, 115, 116, 97, 114], { offset: 257 }))
    return {
      ext: "tar",
      mime: "application/x-tar"
    };
  if (n([82, 97, 114, 33, 26, 7]) && (t[6] === 0 || t[6] === 1))
    return {
      ext: "rar",
      mime: "application/x-rar-compressed"
    };
  if (n([31, 139, 8]))
    return {
      ext: "gz",
      mime: "application/gzip"
    };
  if (n([66, 90, 104]))
    return {
      ext: "bz2",
      mime: "application/x-bzip2"
    };
  if (n([55, 122, 188, 175, 39, 28]))
    return {
      ext: "7z",
      mime: "application/x-7z-compressed"
    };
  if (n([120, 1]))
    return {
      ext: "dmg",
      mime: "application/x-apple-diskimage"
    };
  if (n([51, 103, 112, 53]) || // 3gp5
  n([0, 0, 0]) && n([102, 116, 121, 112], { offset: 4 }) && (n([109, 112, 52, 49], { offset: 8 }) || // MP41
  n([109, 112, 52, 50], { offset: 8 }) || // MP42
  n([105, 115, 111, 109], { offset: 8 }) || // ISOM
  n([105, 115, 111, 50], { offset: 8 }) || // ISO2
  n([109, 109, 112, 52], { offset: 8 }) || // MMP4
  n([77, 52, 86], { offset: 8 }) || // M4V
  n([100, 97, 115, 104], { offset: 8 })))
    return {
      ext: "mp4",
      mime: "video/mp4"
    };
  if (n([77, 84, 104, 100]))
    return {
      ext: "mid",
      mime: "audio/midi"
    };
  if (n([26, 69, 223, 163])) {
    const r = t.subarray(4, 4100), i = r.findIndex((a, o, s) => s[o] === 66 && s[o + 1] === 130);
    if (i !== -1) {
      const a = i + 3, o = (s) => Array.from(s).every((c, f) => r[a + f] === c.charCodeAt(0));
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
  if (n([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) || n([102, 114, 101, 101], { offset: 4 }) || n([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) || n([109, 100, 97, 116], { offset: 4 }) || // MJPEG
  n([119, 105, 100, 101], { offset: 4 }))
    return {
      ext: "mov",
      mime: "video/quicktime"
    };
  if (n([82, 73, 70, 70]) && n([65, 86, 73], { offset: 8 }))
    return {
      ext: "avi",
      mime: "video/x-msvideo"
    };
  if (n([48, 38, 178, 117, 142, 102, 207, 17, 166, 217]))
    return {
      ext: "wmv",
      mime: "video/x-ms-wmv"
    };
  if (n([0, 0, 1, 186]))
    return {
      ext: "mpg",
      mime: "video/mpeg"
    };
  for (let r = 0; r < 2 && r < t.length - 16; r++)
    if (n([73, 68, 51], { offset: r }) || // ID3 header
    n([255, 226], { offset: r, mask: [255, 226] }))
      return {
        ext: "mp3",
        mime: "audio/mpeg"
      };
  return n([102, 116, 121, 112, 77, 52, 65], { offset: 4 }) || n([77, 52, 65, 32]) ? {
    ext: "m4a",
    mime: "audio/m4a"
  } : n([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 }) ? {
    ext: "opus",
    mime: "audio/opus"
  } : n([79, 103, 103, 83]) ? {
    ext: "ogg",
    mime: "audio/ogg"
  } : n([102, 76, 97, 67]) ? {
    ext: "flac",
    mime: "audio/x-flac"
  } : n([82, 73, 70, 70]) && n([87, 65, 86, 69], { offset: 8 }) ? {
    ext: "wav",
    mime: "audio/x-wav"
  } : n([35, 33, 65, 77, 82, 10]) ? {
    ext: "amr",
    mime: "audio/amr"
  } : n([37, 80, 68, 70]) ? {
    ext: "pdf",
    mime: "application/pdf"
  } : n([77, 90]) ? {
    ext: "exe",
    mime: "application/x-msdownload"
  } : (t[0] === 67 || t[0] === 70) && n([87, 83], { offset: 1 }) ? {
    ext: "swf",
    mime: "application/x-shockwave-flash"
  } : n([123, 92, 114, 116, 102]) ? {
    ext: "rtf",
    mime: "application/rtf"
  } : n([0, 97, 115, 109]) ? {
    ext: "wasm",
    mime: "application/wasm"
  } : n([119, 79, 70, 70]) && (n([0, 1, 0, 0], { offset: 4 }) || n([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff",
    mime: "font/woff"
  } : n([119, 79, 70, 50]) && (n([0, 1, 0, 0], { offset: 4 }) || n([79, 84, 84, 79], { offset: 4 })) ? {
    ext: "woff2",
    mime: "font/woff2"
  } : n([76, 80], { offset: 34 }) && (n([0, 0, 1], { offset: 8 }) || n([1, 0, 2], { offset: 8 }) || n([2, 0, 2], { offset: 8 })) ? {
    ext: "eot",
    mime: "application/octet-stream"
  } : n([0, 1, 0, 0, 0]) ? {
    ext: "ttf",
    mime: "font/ttf"
  } : n([79, 84, 84, 79, 0]) ? {
    ext: "otf",
    mime: "font/otf"
  } : n([0, 0, 1, 0]) ? {
    ext: "ico",
    mime: "image/x-icon"
  } : n([70, 76, 86, 1]) ? {
    ext: "flv",
    mime: "video/x-flv"
  } : n([37, 33]) ? {
    ext: "ps",
    mime: "application/postscript"
  } : n([253, 55, 122, 88, 90, 0]) ? {
    ext: "xz",
    mime: "application/x-xz"
  } : n([83, 81, 76, 105]) ? {
    ext: "sqlite",
    mime: "application/x-sqlite3"
  } : n([78, 69, 83, 26]) ? {
    ext: "nes",
    mime: "application/x-nintendo-nes-rom"
  } : n([67, 114, 50, 52]) ? {
    ext: "crx",
    mime: "application/x-google-chrome-extension"
  } : n([77, 83, 67, 70]) || n([73, 83, 99, 40]) ? {
    ext: "cab",
    mime: "application/vnd.ms-cab-compressed"
  } : n([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121]) ? {
    ext: "deb",
    mime: "application/x-deb"
  } : n([33, 60, 97, 114, 99, 104, 62]) ? {
    ext: "ar",
    mime: "application/x-unix-archive"
  } : n([237, 171, 238, 219]) ? {
    ext: "rpm",
    mime: "application/x-rpm"
  } : n([31, 160]) || n([31, 157]) ? {
    ext: "Z",
    mime: "application/x-compress"
  } : n([76, 90, 73, 80]) ? {
    ext: "lz",
    mime: "application/x-lzip"
  } : n([208, 207, 17, 224, 161, 177, 26, 225]) ? {
    ext: "msi",
    mime: "application/x-msi"
  } : n([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2]) ? {
    ext: "mxf",
    mime: "application/mxf"
  } : n([71], { offset: 4 }) && (n([71], { offset: 192 }) || n([71], { offset: 196 })) ? {
    ext: "mts",
    mime: "video/mp2t"
  } : n([66, 76, 69, 78, 68, 69, 82]) ? {
    ext: "blend",
    mime: "application/x-blender"
  } : n([66, 80, 71, 251]) ? {
    ext: "bpg",
    mime: "image/bpg"
  } : null;
}, jp = [0, 1, 3, 7, 15, 31, 63, 127, 255], ki = function(e) {
  this.stream = e, this.bitOffset = 0, this.curByte = 0, this.hasByte = !1;
};
ki.prototype._ensureByte = function() {
  this.hasByte || (this.curByte = this.stream.readByte(), this.hasByte = !0);
};
ki.prototype.read = function(e) {
  for (var t = 0; e > 0; ) {
    this._ensureByte();
    var n = 8 - this.bitOffset;
    if (e >= n)
      t <<= n, t |= jp[n] & this.curByte, this.hasByte = !1, this.bitOffset = 0, e -= n;
    else {
      t <<= e;
      var r = n - e;
      t |= (this.curByte & jp[e] << r) >> r, this.bitOffset += e, e = 0;
    }
  }
  return t;
};
ki.prototype.seek = function(e) {
  var t = e % 8, n = (e - t) / 8;
  this.bitOffset = t, this.stream.seek(n), this.hasByte = !1;
};
ki.prototype.pi = function() {
  var e = new Buffer(6), t;
  for (t = 0; t < e.length; t++)
    e[t] = this.read(8);
  return e.toString("hex");
};
var Iw = ki, qn = function() {
};
qn.prototype.readByte = function() {
  throw new Error("abstract method readByte() not implemented");
};
qn.prototype.read = function(e, t, n) {
  for (var r = 0; r < n; ) {
    var i = this.readByte();
    if (i < 0)
      return r === 0 ? -1 : r;
    e[t++] = i, r++;
  }
  return r;
};
qn.prototype.seek = function(e) {
  throw new Error("abstract method seek() not implemented");
};
qn.prototype.writeByte = function(e) {
  throw new Error("abstract method readByte() not implemented");
};
qn.prototype.write = function(e, t, n) {
  var r;
  for (r = 0; r < n; r++)
    this.writeByte(e[t++]);
  return n;
};
qn.prototype.flush = function() {
};
var Nw = qn, $w = function() {
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
    var n = 4294967295;
    this.getCRC = function() {
      return ~n >>> 0;
    }, this.updateCRC = function(r) {
      n = n << 8 ^ e[(n >>> 24 ^ r) & 255];
    }, this.updateCRCRun = function(r, i) {
      for (; i-- > 0; )
        n = n << 8 ^ e[(n >>> 24 ^ r) & 255];
    };
  };
  return t;
}();
const Lw = "1.0.6", Uw = "MIT", Bw = {
  version: Lw,
  license: Uw
};
var jw = Iw, ai = Nw, dh = $w, mh = Bw, ha = 20, Mp = 258, qp = 0, Mw = 1, qw = 2, zw = 6, Hw = 50, Gw = "314159265359", Ww = "177245385090", zp = function(e, t) {
  var n = e[t], r;
  for (r = t; r > 0; r--)
    e[r] = e[r - 1];
  return e[0] = n, n;
}, de = {
  OK: 0,
  LAST_BLOCK: -1,
  NOT_BZIP_DATA: -2,
  UNEXPECTED_INPUT_EOF: -3,
  UNEXPECTED_OUTPUT_EOF: -4,
  DATA_ERROR: -5,
  OUT_OF_MEMORY: -6,
  OBSOLETE_INPUT: -7,
  END_OF_BLOCK: -8
}, un = {};
un[de.LAST_BLOCK] = "Bad file checksum";
un[de.NOT_BZIP_DATA] = "Not bzip data";
un[de.UNEXPECTED_INPUT_EOF] = "Unexpected input EOF";
un[de.UNEXPECTED_OUTPUT_EOF] = "Unexpected output EOF";
un[de.DATA_ERROR] = "Data error";
un[de.OUT_OF_MEMORY] = "Out of memory";
un[de.OBSOLETE_INPUT] = "Obsolete (pre 0.9.5) bzip format not supported.";
var Ne = function(e, t) {
  var n = un[e] || "unknown error";
  t && (n += ": " + t);
  var r = new TypeError(n);
  throw r.errorCode = e, r;
}, Ye = function(e, t) {
  this.writePos = this.writeCurrent = this.writeCount = 0, this._start_bunzip(e, t);
};
Ye.prototype._init_block = function() {
  var e = this._get_next_block();
  return e ? (this.blockCRC = new dh(), !0) : (this.writeCount = -1, !1);
};
Ye.prototype._start_bunzip = function(e, t) {
  var n = new Buffer(4);
  (e.read(n, 0, 4) !== 4 || String.fromCharCode(n[0], n[1], n[2]) !== "BZh") && Ne(de.NOT_BZIP_DATA, "bad magic");
  var r = n[3] - 48;
  (r < 1 || r > 9) && Ne(de.NOT_BZIP_DATA, "level out of range"), this.reader = new jw(e), this.dbufSize = 1e5 * r, this.nextoutput = 0, this.outputStream = t, this.streamCRC = 0;
};
Ye.prototype._get_next_block = function() {
  var e, t, n, r = this.reader, i = r.pi();
  if (i === Ww)
    return !1;
  i !== Gw && Ne(de.NOT_BZIP_DATA), this.targetBlockCRC = r.read(32) >>> 0, this.streamCRC = (this.targetBlockCRC ^ (this.streamCRC << 1 | this.streamCRC >>> 31)) >>> 0, r.read(1) && Ne(de.OBSOLETE_INPUT);
  var a = r.read(24);
  a > this.dbufSize && Ne(de.DATA_ERROR, "initial position out of bounds");
  var o = r.read(16), s = new Buffer(256), c = 0;
  for (e = 0; e < 16; e++)
    if (o & 1 << 15 - e) {
      var f = e * 16;
      for (n = r.read(16), t = 0; t < 16; t++)
        n & 1 << 15 - t && (s[c++] = f + t);
    }
  var l = r.read(3);
  (l < qw || l > zw) && Ne(de.DATA_ERROR);
  var u = r.read(15);
  u === 0 && Ne(de.DATA_ERROR);
  var d = new Buffer(256);
  for (e = 0; e < l; e++)
    d[e] = e;
  var h = new Buffer(u);
  for (e = 0; e < u; e++) {
    for (t = 0; r.read(1); t++)
      t >= l && Ne(de.DATA_ERROR);
    h[e] = zp(d, t);
  }
  var v = c + 2, x = [], g;
  for (t = 0; t < l; t++) {
    var y = new Buffer(v), b = new Uint16Array(ha + 1);
    for (o = r.read(5), e = 0; e < v; e++) {
      for (; (o < 1 || o > ha) && Ne(de.DATA_ERROR), !!r.read(1); )
        r.read(1) ? o-- : o++;
      y[e] = o;
    }
    var T, D;
    for (T = D = y[0], e = 1; e < v; e++)
      y[e] > D ? D = y[e] : y[e] < T && (T = y[e]);
    g = {}, x.push(g), g.permute = new Uint16Array(Mp), g.limit = new Uint32Array(ha + 2), g.base = new Uint32Array(ha + 1), g.minLen = T, g.maxLen = D;
    var U = 0;
    for (e = T; e <= D; e++)
      for (b[e] = g.limit[e] = 0, o = 0; o < v; o++)
        y[o] === e && (g.permute[U++] = o);
    for (e = 0; e < v; e++)
      b[y[e]]++;
    for (U = o = 0, e = T; e < D; e++)
      U += b[e], g.limit[e] = U - 1, U <<= 1, o += b[e], g.base[e + 1] = U - o;
    g.limit[D + 1] = Number.MAX_VALUE, g.limit[D] = U + b[D] - 1, g.base[T] = 0;
  }
  var k = new Uint32Array(256);
  for (e = 0; e < 256; e++)
    d[e] = e;
  var $ = 0, G = 0, S = 0, M, H = this.dbuf = new Uint32Array(this.dbufSize);
  for (v = 0; ; ) {
    for (v-- || (v = Hw - 1, S >= u && Ne(de.DATA_ERROR), g = x[h[S++]]), e = g.minLen, t = r.read(e); e > g.maxLen && Ne(de.DATA_ERROR), !(t <= g.limit[e]); e++)
      t = t << 1 | r.read(1);
    t -= g.base[e], (t < 0 || t >= Mp) && Ne(de.DATA_ERROR);
    var z = g.permute[t];
    if (z === qp || z === Mw) {
      $ || ($ = 1, o = 0), z === qp ? o += $ : o += 2 * $, $ <<= 1;
      continue;
    }
    if ($)
      for ($ = 0, G + o > this.dbufSize && Ne(de.DATA_ERROR), M = s[d[0]], k[M] += o; o--; )
        H[G++] = M;
    if (z > c)
      break;
    G >= this.dbufSize && Ne(de.DATA_ERROR), e = z - 1, M = zp(d, e), M = s[M], k[M]++, H[G++] = M;
  }
  for ((a < 0 || a >= G) && Ne(de.DATA_ERROR), t = 0, e = 0; e < 256; e++)
    n = t + k[e], k[e] = t, t = n;
  for (e = 0; e < G; e++)
    M = H[e] & 255, H[k[M]] |= e << 8, k[M]++;
  var J = 0, L = 0, N = 0;
  return G && (J = H[a], L = J & 255, J >>= 8, N = -1), this.writePos = J, this.writeCurrent = L, this.writeCount = G, this.writeRun = N, !0;
};
Ye.prototype._read_bunzip = function(e, t) {
  var n, r, i;
  if (this.writeCount < 0)
    return 0;
  var a = this.dbuf, o = this.writePos, s = this.writeCurrent, c = this.writeCount;
  this.outputsize;
  for (var f = this.writeRun; c; ) {
    for (c--, r = s, o = a[o], s = o & 255, o >>= 8, f++ === 3 ? (n = s, i = r, s = -1) : (n = 1, i = s), this.blockCRC.updateCRCRun(i, n); n--; )
      this.outputStream.writeByte(i), this.nextoutput++;
    s != r && (f = 0);
  }
  return this.writeCount = c, this.blockCRC.getCRC() !== this.targetBlockCRC && Ne(de.DATA_ERROR, "Bad block CRC (got " + this.blockCRC.getCRC().toString(16) + " expected " + this.targetBlockCRC.toString(16) + ")"), this.nextoutput;
};
var Rl = function(e) {
  if ("readByte" in e)
    return e;
  var t = new ai();
  return t.pos = 0, t.readByte = function() {
    return e[this.pos++];
  }, t.seek = function(n) {
    this.pos = n;
  }, t.eof = function() {
    return this.pos >= e.length;
  }, t;
}, hh = function(e) {
  var t = new ai(), n = !0;
  if (e)
    if (typeof e == "number")
      t.buffer = new Buffer(e), n = !1;
    else {
      if ("writeByte" in e)
        return e;
      t.buffer = e, n = !1;
    }
  else
    t.buffer = new Buffer(16384);
  return t.pos = 0, t.writeByte = function(r) {
    if (n && this.pos >= this.buffer.length) {
      var i = new Buffer(this.buffer.length * 2);
      this.buffer.copy(i), this.buffer = i;
    }
    this.buffer[this.pos++] = r;
  }, t.getBuffer = function() {
    if (this.pos !== this.buffer.length) {
      if (!n)
        throw new TypeError("outputsize does not match decoded input");
      var r = new Buffer(this.pos);
      this.buffer.copy(r, 0, 0, this.pos), this.buffer = r;
    }
    return this.buffer;
  }, t._coerced = !0, t;
};
Ye.Err = de;
Ye.decode = function(e, t, n) {
  for (var r = Rl(e), i = hh(t), a = new Ye(r, i); !("eof" in r && r.eof()); )
    if (a._init_block())
      a._read_bunzip();
    else {
      var o = a.reader.read(32) >>> 0;
      if (o !== a.streamCRC && Ne(de.DATA_ERROR, "Bad stream CRC (got " + a.streamCRC.toString(16) + " expected " + o.toString(16) + ")"), n && "eof" in r && !r.eof())
        a._start_bunzip(r, i);
      else break;
    }
  if ("getBuffer" in i)
    return i.getBuffer();
};
Ye.decodeBlock = function(e, t, n) {
  var r = Rl(e), i = hh(n), a = new Ye(r, i);
  a.reader.seek(t);
  var o = a._get_next_block();
  if (o && (a.blockCRC = new dh(), a.writeCopies = 0, a._read_bunzip()), "getBuffer" in i)
    return i.getBuffer();
};
Ye.table = function(e, t, n) {
  var r = new ai();
  r.delegate = Rl(e), r.pos = 0, r.readByte = function() {
    return this.pos++, this.delegate.readByte();
  }, r.delegate.eof && (r.eof = r.delegate.eof.bind(r.delegate));
  var i = new ai();
  i.pos = 0, i.writeByte = function() {
    this.pos++;
  };
  for (var a = new Ye(r, i), o = a.dbufSize; !("eof" in r && r.eof()); ) {
    var s = r.pos * 8 + a.reader.bitOffset;
    if (a.reader.hasByte && (s -= 8), a._init_block()) {
      var c = i.pos;
      a._read_bunzip(), t(s, i.pos - c);
    } else if (a.reader.read(32), n && "eof" in r && !r.eof())
      a._start_bunzip(r, i), console.assert(
        a.dbufSize === o,
        "shouldn't change block size within multistream file"
      );
    else break;
  }
};
Ye.Stream = ai;
Ye.version = mh.version;
Ye.license = mh.license;
var Vw = Ye, xh = { exports: {} };
(function(e, t) {
  var n = le;
  e.exports = r, r.through = r;
  function r(i, a, o) {
    i = i || function(v) {
      this.queue(v);
    }, a = a || function() {
      this.queue(null);
    };
    var s = !1, c = !1, f = [], l = !1, u = new n();
    u.readable = u.writable = !0, u.paused = !1, u.autoDestroy = !(o && o.autoDestroy === !1), u.write = function(v) {
      return i.call(this, v), !u.paused;
    };
    function d() {
      for (; f.length && !u.paused; ) {
        var v = f.shift();
        if (v === null)
          return u.emit("end");
        u.emit("data", v);
      }
    }
    u.queue = u.push = function(v) {
      return l || (v === null && (l = !0), f.push(v), d()), u;
    }, u.on("end", function() {
      u.readable = !1, !u.writable && u.autoDestroy && process.nextTick(function() {
        u.destroy();
      });
    });
    function h() {
      u.writable = !1, a.call(u), !u.readable && u.autoDestroy && u.destroy();
    }
    return u.end = function(v) {
      if (!s)
        return s = !0, arguments.length && u.write(v), h(), u;
    }, u.destroy = function() {
      if (!c)
        return c = !0, s = !0, f.length = 0, u.writable = u.readable = !1, u.emit("close"), u;
    }, u.pause = function() {
      if (!u.paused)
        return u.paused = !0, u;
    }, u.resume = function() {
      return u.paused && (u.paused = !1, u.emit("resume")), d(), u.paused || u.emit("drain"), u;
    }, u;
  }
})(xh);
var Yw = xh.exports;
function Cl(e) {
  this.name = "Bzip2Error", this.message = e, this.stack = new Error().stack;
}
Cl.prototype = new Error();
var Ie = {
  Error: function(e) {
    throw new Cl(e);
  }
}, Tt = {};
Tt.Bzip2Error = Cl;
Tt.crcTable = [
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
Tt.array = function(e) {
  var t = 0, n = 0, r = [0, 1, 3, 7, 15, 31, 63, 127, 255];
  return function(i) {
    for (var a = 0; i > 0; ) {
      var o = 8 - t;
      i >= o ? (a <<= o, a |= r[o] & e[n++], t = 0, i -= o) : (a <<= i, a |= (e[n] & r[i] << 8 - i - t) >> 8 - i - t, t += i, i = 0);
    }
    return a;
  };
};
Tt.simple = function(e, t) {
  var n = Tt.array(e), r = Tt.header(n), i = !1, a = 1e5 * r, o = new Int32Array(a);
  do
    i = Tt.decompress(n, t, o, a);
  while (!i);
};
Tt.header = function(e) {
  this.byteCount = new Int32Array(256), this.symToByte = new Uint8Array(256), this.mtfSymbol = new Int32Array(256), this.selectors = new Uint8Array(32768), e(8 * 3) != 4348520 && Ie.Error("No magic number found");
  var t = e(8) - 48;
  return (t < 1 || t > 9) && Ie.Error("Not a BZIP archive"), t;
};
Tt.decompress = function(e, t, n, r, i) {
  for (var a = 20, o = 258, s = 0, c = 1, f = 50, l = -1, u = "", d = 0; d < 6; d++) u += e(8).toString(16);
  if (u == "177245385090") {
    var h = e(32) | 0;
    return h !== i && Ie.Error("Error in bzip2: crc32 do not match"), e(null), null;
  }
  u != "314159265359" && Ie.Error("eek not valid bzip data");
  var v = e(32) | 0;
  e(1) && Ie.Error("unsupported obsolete version");
  var x = e(24);
  x > r && Ie.Error("Initial position larger than buffer size");
  var g = e(16), y = 0;
  for (d = 0; d < 16; d++)
    if (g & 1 << 15 - d) {
      var b = e(16);
      for (F = 0; F < 16; F++)
        b & 1 << 15 - F && (this.symToByte[y++] = 16 * d + F);
    }
  var T = e(3);
  (T < 2 || T > 6) && Ie.Error("another error");
  var D = e(15);
  D == 0 && Ie.Error("meh");
  for (var d = 0; d < T; d++) this.mtfSymbol[d] = d;
  for (var d = 0; d < D; d++) {
    for (var F = 0; e(1); F++) F >= T && Ie.Error("whoops another error");
    for (var U = this.mtfSymbol[F], b = F - 1; b >= 0; b--)
      this.mtfSymbol[b + 1] = this.mtfSymbol[b];
    this.mtfSymbol[0] = U, this.selectors[d] = U;
  }
  for (var w = y + 2, k = [], $ = new Uint8Array(o), G = new Uint16Array(a + 1), S, F = 0; F < T; F++) {
    g = e(5);
    for (var d = 0; d < w; d++) {
      for (; (g < 1 || g > a) && Ie.Error("I gave up a while ago on writing error messages"), !!e(1); )
        e(1) ? g-- : g++;
      $[d] = g;
    }
    var M, H;
    M = H = $[0];
    for (var d = 1; d < w; d++)
      $[d] > H ? H = $[d] : $[d] < M && (M = $[d]);
    S = k[F] = {}, S.permute = new Int32Array(o), S.limit = new Int32Array(a + 1), S.base = new Int32Array(a + 1), S.minLen = M, S.maxLen = H;
    for (var z = S.base, J = S.limit, L = 0, d = M; d <= H; d++)
      for (var g = 0; g < w; g++)
        $[g] == d && (S.permute[L++] = g);
    for (d = M; d <= H; d++) G[d] = J[d] = 0;
    for (d = 0; d < w; d++) G[$[d]]++;
    for (L = g = 0, d = M; d < H; d++)
      L += G[d], J[d] = L - 1, L <<= 1, z[d + 1] = L - (g += G[d]);
    J[H] = L + G[H] - 1, z[M] = 0;
  }
  for (var d = 0; d < 256; d++)
    this.mtfSymbol[d] = d, this.byteCount[d] = 0;
  var N, B, w, A;
  for (N = B = w = A = 0; ; ) {
    for (w-- || (w = f - 1, A >= D && Ie.Error("meow i'm a kitty, that's an error"), S = k[this.selectors[A++]], z = S.base, J = S.limit), d = S.minLen, F = e(d); d > S.maxLen && Ie.Error("rawr i'm a dinosaur"), !(F <= J[d]); )
      d++, F = F << 1 | e(1);
    F -= z[d], (F < 0 || F >= o) && Ie.Error("moo i'm a cow");
    var C = S.permute[F];
    if (C == s || C == c) {
      N || (N = 1, g = 0), C == s ? g += N : g += 2 * N, N <<= 1;
      continue;
    }
    if (N)
      for (N = 0, B + g > r && Ie.Error("Boom."), U = this.symToByte[this.mtfSymbol[0]], this.byteCount[U] += g; g--; ) n[B++] = U;
    if (C > y) break;
    B >= r && Ie.Error("I can't think of anything. Error"), d = C - 1, U = this.mtfSymbol[d];
    for (var b = d - 1; b >= 0; b--)
      this.mtfSymbol[b + 1] = this.mtfSymbol[b];
    this.mtfSymbol[0] = U, U = this.symToByte[U], this.byteCount[U]++, n[B++] = U;
  }
  (x < 0 || x >= B) && Ie.Error("I'm a monkey and I'm throwing something at someone, namely you");
  for (var F = 0, d = 0; d < 256; d++)
    b = F + this.byteCount[d], this.byteCount[d] = F, F = b;
  for (var d = 0; d < B; d++)
    U = n[d] & 255, n[this.byteCount[U]] |= d << 8, this.byteCount[U]++;
  var I = 0, j = 0, Z = 0;
  B && (I = n[x], j = I & 255, I >>= 8, Z = -1), B = B;
  for (var ee, V, se; B; ) {
    for (B--, V = j, I = n[I], j = I & 255, I >>= 8, Z++ == 3 ? (ee = j, se = V, j = -1) : (ee = 1, se = j); ee--; )
      l = (l << 8 ^ this.crcTable[(l >> 24 ^ se) & 255]) & 4294967295, t(se);
    j != V && (Z = 0);
  }
  return l = (l ^ -1) >>> 0, (l | 0) != (v | 0) && Ie.Error("Error in bzip2: crc32 do not match"), i = (l ^ (i << 1 | i >>> 31)) & 4294967295, i;
};
var Xw = Tt, Hp = [0, 1, 3, 7, 15, 31, 63, 127, 255], Kw = function(t) {
  var n = 0, r = 0, i = t(), a = function(o) {
    if (o === null && n != 0) {
      n = 0, r++;
      return;
    }
    for (var s = 0; o > 0; ) {
      r >= i.length && (r = 0, i = t());
      var c = 8 - n;
      n === 0 && o > 0 && a.bytesRead++, o >= c ? (s <<= c, s |= Hp[c] & i[r++], n = 0, o -= c) : (s <<= o, s |= (i[r] & Hp[o] << 8 - o - n) >> 8 - o - n, n += o, o = 0);
    }
    return s;
  };
  return a.bytesRead = 0, a;
}, Jw = Yw, Gp = Xw, Qw = Kw, Zw = e1;
function e1() {
  var e = [], t = 0, n = 0, r = !1, i = null, a = null;
  function o(f) {
    if (n) {
      var l = 1e5 * n, u = new Int32Array(l), d = [], h = function(v) {
        d.push(v);
      };
      return a = Gp.decompress(i, h, u, l, a), a === null ? (n = 0, !1) : (f(Buffer.from(d)), !0);
    } else
      return n = Gp.header(i), a = 0, !0;
  }
  var s = 0;
  function c(f) {
    if (!r)
      try {
        return o(function(l) {
          f.queue(l), l !== null && (s += l.length);
        });
      } catch (l) {
        return f.emit("error", l), r = !0, !1;
      }
  }
  return Jw(
    function(l) {
      for (e.push(l), t += l.length, i === null && (i = Qw(function() {
        return e.shift();
      })); !r && t - i.bytesRead + 1 >= (25e3 + 1e5 * n || 4); )
        c(this);
    },
    function(l) {
      for (; !r && i && t > i.bytesRead; )
        c(this);
      r || (a !== null && this.emit("error", new Error("input stream ended prematurely")), this.queue(null));
    }
  );
}
const Wp = Tl, Vp = kw, t1 = xl, n1 = Vw, r1 = Zw;
var i1 = () => (e) => !Buffer.isBuffer(e) && !t1(e) ? Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof e}`)) : Buffer.isBuffer(e) && (!Vp(e) || Vp(e).ext !== "bz2") ? Promise.resolve([]) : Buffer.isBuffer(e) ? Wp()(n1.decode(e)) : Wp()(e.pipe(r1()));
const a1 = lt, o1 = Tl, Yp = Fm, s1 = xl;
var c1 = () => (e) => {
  if (!Buffer.isBuffer(e) && !s1(e))
    return Promise.reject(new TypeError(`Expected a Buffer or Stream, got ${typeof e}`));
  if (Buffer.isBuffer(e) && (!Yp(e) || Yp(e).ext !== "gz"))
    return Promise.resolve([]);
  const t = a1.createGunzip(), n = o1()(t);
  return Buffer.isBuffer(e) ? t.end(e) : e.pipe(t), n;
}, l1 = function(e) {
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
}, bo = { exports: {} }, zs, Xp;
function u1() {
  if (Xp) return zs;
  Xp = 1;
  var e = "pending", t = "settled", n = "fulfilled", r = "rejected", i = function() {
  }, a = typeof ue < "u" && typeof ue.process < "u" && typeof ue.process.emit == "function", o = typeof setImmediate > "u" ? setTimeout : setImmediate, s = [], c;
  function f() {
    for (var k = 0; k < s.length; k++)
      s[k][0](s[k][1]);
    s = [], c = !1;
  }
  function l(k, $) {
    s.push([k, $]), c || (c = !0, o(f, 0));
  }
  function u(k, $) {
    function G(M) {
      v($, M);
    }
    function S(M) {
      g($, M);
    }
    try {
      k(G, S);
    } catch (M) {
      S(M);
    }
  }
  function d(k) {
    var $ = k.owner, G = $._state, S = $._data, M = k[G], H = k.then;
    if (typeof M == "function") {
      G = n;
      try {
        S = M(S);
      } catch (z) {
        g(H, z);
      }
    }
    h(H, S) || (G === n && v(H, S), G === r && g(H, S));
  }
  function h(k, $) {
    var G;
    try {
      if (k === $)
        throw new TypeError("A promises callback cannot return that same promise.");
      if ($ && (typeof $ == "function" || typeof $ == "object")) {
        var S = $.then;
        if (typeof S == "function")
          return S.call($, function(M) {
            G || (G = !0, $ === M ? x(k, M) : v(k, M));
          }, function(M) {
            G || (G = !0, g(k, M));
          }), !0;
      }
    } catch (M) {
      return G || g(k, M), !0;
    }
    return !1;
  }
  function v(k, $) {
    (k === $ || !h(k, $)) && x(k, $);
  }
  function x(k, $) {
    k._state === e && (k._state = t, k._data = $, l(b, k));
  }
  function g(k, $) {
    k._state === e && (k._state = t, k._data = $, l(T, k));
  }
  function y(k) {
    k._then = k._then.forEach(d);
  }
  function b(k) {
    k._state = n, y(k);
  }
  function T(k) {
    k._state = r, y(k), !k._handled && a && ue.process.emit("unhandledRejection", k._data, k);
  }
  function D(k) {
    ue.process.emit("rejectionHandled", k);
  }
  function U(k) {
    if (typeof k != "function")
      throw new TypeError("Promise resolver " + k + " is not a function");
    if (!(this instanceof U))
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    this._then = [], u(k, this);
  }
  return U.prototype = {
    constructor: U,
    _state: e,
    _then: null,
    _data: void 0,
    _handled: !1,
    then: function(k, $) {
      var G = {
        owner: this,
        then: new this.constructor(i),
        fulfilled: k,
        rejected: $
      };
      return ($ || k) && !this._handled && (this._handled = !0, this._state === r && a && l(D, this)), this._state === n || this._state === r ? l(d, G) : this._then.push(G), G.then;
    },
    catch: function(k) {
      return this.then(null, k);
    }
  }, U.all = function(k) {
    if (!Array.isArray(k))
      throw new TypeError("You must pass an array to Promise.all().");
    return new U(function($, G) {
      var S = [], M = 0;
      function H(L) {
        return M++, function(N) {
          S[L] = N, --M || $(S);
        };
      }
      for (var z = 0, J; z < k.length; z++)
        J = k[z], J && typeof J.then == "function" ? J.then(H(z), G) : S[z] = J;
      M || $(S);
    });
  }, U.race = function(k) {
    if (!Array.isArray(k))
      throw new TypeError("You must pass an array to Promise.race().");
    return new U(function($, G) {
      for (var S = 0, M; S < k.length; S++)
        M = k[S], M && typeof M.then == "function" ? M.then($, G) : $(M);
    });
  }, U.resolve = function(k) {
    return k && typeof k == "object" && k.constructor === U ? k : new U(function($) {
      $(k);
    });
  }, U.reject = function(k) {
    return new U(function($, G) {
      G(k);
    });
  }, zs = U, zs;
}
var p1 = typeof Promise == "function" ? Promise : u1();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Kp = Object.getOwnPropertySymbols, f1 = Object.prototype.hasOwnProperty, d1 = Object.prototype.propertyIsEnumerable;
function m1(e) {
  if (e == null)
    throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(e);
}
function h1() {
  try {
    if (!Object.assign)
      return !1;
    var e = new String("abc");
    if (e[5] = "de", Object.getOwnPropertyNames(e)[0] === "5")
      return !1;
    for (var t = {}, n = 0; n < 10; n++)
      t["_" + String.fromCharCode(n)] = n;
    var r = Object.getOwnPropertyNames(t).map(function(a) {
      return t[a];
    });
    if (r.join("") !== "0123456789")
      return !1;
    var i = {};
    return "abcdefghijklmnopqrst".split("").forEach(function(a) {
      i[a] = a;
    }), Object.keys(Object.assign({}, i)).join("") === "abcdefghijklmnopqrst";
  } catch {
    return !1;
  }
}
var vh = h1() ? Object.assign : function(e, t) {
  for (var n, r = m1(e), i, a = 1; a < arguments.length; a++) {
    n = Object(arguments[a]);
    for (var o in n)
      f1.call(n, o) && (r[o] = n[o]);
    if (Kp) {
      i = Kp(n);
      for (var s = 0; s < i.length; s++)
        d1.call(n, i[s]) && (r[i[s]] = n[i[s]]);
    }
  }
  return r;
}, x1 = le.PassThrough, v1 = vh, g1 = function(e) {
  e = v1({}, e);
  var t = e.array, n = e.encoding, r = n === "buffer", i = !1;
  t ? i = !(n || r) : n = n || "utf8", r && (n = null);
  var a = 0, o = [], s = new x1({ objectMode: i });
  return n && s.setEncoding(n), s.on("data", function(c) {
    o.push(c), i ? a = o.length : a += c.length;
  }), s.getBufferedValue = function() {
    return t ? o : r ? Buffer.concat(o, a) : o.join("");
  }, s.getBufferedLength = function() {
    return a;
  }, s;
}, Jp = p1, Ol = vh, y1 = g1;
function Pl(e, t) {
  if (!e)
    return Jp.reject(new Error("Expected a stream"));
  t = Ol({ maxBuffer: 1 / 0 }, t);
  var n = t.maxBuffer, r, i, a = new Jp(function(o, s) {
    r = y1(t), e.once("error", c), e.pipe(r), r.on("data", function() {
      r.getBufferedLength() > n && s(new Error("maxBuffer exceeded"));
    }), r.once("error", c), r.on("end", o), i = function() {
      e.unpipe && e.unpipe(r);
    };
    function c(f) {
      f && (f.bufferedData = r.getBufferedValue()), s(f);
    }
  });
  return a.then(i, i), a.then(function() {
    return r.getBufferedValue();
  });
}
bo.exports = Pl;
bo.exports.buffer = function(e, t) {
  return Pl(e, Ol({}, t, { encoding: "buffer" }));
};
bo.exports.array = function(e, t) {
  return Pl(e, Ol({}, t, { array: !0 }));
};
var b1 = bo.exports, gh = { exports: {} }, Qp = function(e, t, n) {
  return function() {
    for (var r = this, i = new Array(arguments.length), a = 0; a < arguments.length; a++)
      i[a] = arguments[a];
    return new t(function(o, s) {
      i.push(function(c, f) {
        if (c)
          s(c);
        else if (n.multiArgs) {
          for (var l = new Array(arguments.length - 1), u = 1; u < arguments.length; u++)
            l[u - 1] = arguments[u];
          o(l);
        } else
          o(f);
      }), e.apply(r, i);
    });
  };
}, Zp = gh.exports = function(e, t, n) {
  typeof t != "function" && (n = t, t = Promise), n = n || {}, n.exclude = n.exclude || [/.+Sync$/];
  var r = function(a) {
    var o = function(s) {
      return typeof s == "string" ? a === s : s.test(a);
    };
    return n.include ? n.include.some(o) : !n.exclude.some(o);
  }, i = typeof e == "function" ? function() {
    return n.excludeMain ? e.apply(this, arguments) : Qp(e, t, n).apply(this, arguments);
  } : {};
  return Object.keys(e).reduce(function(a, o) {
    var s = e[o];
    return a[o] = typeof s == "function" && r(o) ? Qp(s, t, n) : s, a;
  }, i);
};
Zp.all = Zp;
var yh = gh.exports, Pt = {}, Ii = {}, w1 = wo;
function wo() {
  this.pending = 0, this.max = 1 / 0, this.listeners = [], this.waiting = [], this.error = null;
}
wo.prototype.go = function(e) {
  this.pending < this.max ? wh(this, e) : this.waiting.push(e);
};
wo.prototype.wait = function(e) {
  this.pending === 0 ? e(this.error) : this.listeners.push(e);
};
wo.prototype.hold = function() {
  return bh(this);
};
function bh(e) {
  e.pending += 1;
  var t = !1;
  return n;
  function n(i) {
    if (t) throw new Error("callback called twice");
    if (t = !0, e.error = e.error || i, e.pending -= 1, e.waiting.length > 0 && e.pending < e.max)
      wh(e, e.waiting.shift());
    else if (e.pending === 0) {
      var a = e.listeners;
      e.listeners = [], a.forEach(r);
    }
  }
  function r(i) {
    i(e.error);
  }
}
function wh(e, t) {
  t(bh(e));
}
var Ni = at, Eo = Fe, Fl = le, Eh = Fl.Readable, Dl = Fl.Writable, E1 = Fl.PassThrough, _1 = w1, _o = Si.EventEmitter;
Ii.createFromBuffer = S1;
Ii.createFromFd = A1;
Ii.BufferSlicer = jt;
Ii.FdSlicer = Bt;
Eo.inherits(Bt, _o);
function Bt(e, t) {
  t = t || {}, _o.call(this), this.fd = e, this.pend = new _1(), this.pend.max = 1, this.refCount = 0, this.autoClose = !!t.autoClose;
}
Bt.prototype.read = function(e, t, n, r, i) {
  var a = this;
  a.pend.go(function(o) {
    Ni.read(a.fd, e, t, n, r, function(s, c, f) {
      o(), i(s, c, f);
    });
  });
};
Bt.prototype.write = function(e, t, n, r, i) {
  var a = this;
  a.pend.go(function(o) {
    Ni.write(a.fd, e, t, n, r, function(s, c, f) {
      o(), i(s, c, f);
    });
  });
};
Bt.prototype.createReadStream = function(e) {
  return new So(this, e);
};
Bt.prototype.createWriteStream = function(e) {
  return new Ao(this, e);
};
Bt.prototype.ref = function() {
  this.refCount += 1;
};
Bt.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.autoClose && Ni.close(e.fd, t);
  function t(n) {
    n ? e.emit("error", n) : e.emit("close");
  }
};
Eo.inherits(So, Eh);
function So(e, t) {
  t = t || {}, Eh.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end, this.pos = this.start, this.destroyed = !1;
}
So.prototype._read = function(e) {
  var t = this;
  if (!t.destroyed) {
    var n = Math.min(t._readableState.highWaterMark, e);
    if (t.endOffset != null && (n = Math.min(n, t.endOffset - t.pos)), n <= 0) {
      t.destroyed = !0, t.push(null), t.context.unref();
      return;
    }
    t.context.pend.go(function(r) {
      if (t.destroyed) return r();
      var i = new Buffer(n);
      Ni.read(t.context.fd, i, 0, n, t.pos, function(a, o) {
        a ? t.destroy(a) : o === 0 ? (t.destroyed = !0, t.push(null), t.context.unref()) : (t.pos += o, t.push(i.slice(0, o))), r();
      });
    });
  }
};
So.prototype.destroy = function(e) {
  this.destroyed || (e = e || new Error("stream destroyed"), this.destroyed = !0, this.emit("error", e), this.context.unref());
};
Eo.inherits(Ao, Dl);
function Ao(e, t) {
  t = t || {}, Dl.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end == null ? 1 / 0 : +t.end, this.bytesWritten = 0, this.pos = this.start, this.destroyed = !1, this.on("finish", this.destroy.bind(this));
}
Ao.prototype._write = function(e, t, n) {
  var r = this;
  if (!r.destroyed) {
    if (r.pos + e.length > r.endOffset) {
      var i = new Error("maximum file length exceeded");
      i.code = "ETOOBIG", r.destroy(), n(i);
      return;
    }
    r.context.pend.go(function(a) {
      if (r.destroyed) return a();
      Ni.write(r.context.fd, e, 0, e.length, r.pos, function(o, s) {
        o ? (r.destroy(), a(), n(o)) : (r.bytesWritten += s, r.pos += s, r.emit("progress"), a(), n());
      });
    });
  }
};
Ao.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.context.unref());
};
Eo.inherits(jt, _o);
function jt(e, t) {
  _o.call(this), t = t || {}, this.refCount = 0, this.buffer = e, this.maxChunkSize = t.maxChunkSize || Number.MAX_SAFE_INTEGER;
}
jt.prototype.read = function(e, t, n, r, i) {
  var a = r + n, o = a - this.buffer.length, s = o > 0 ? o : n;
  this.buffer.copy(e, t, r, a), setImmediate(function() {
    i(null, s);
  });
};
jt.prototype.write = function(e, t, n, r, i) {
  e.copy(this.buffer, r, t, t + n), setImmediate(function() {
    i(null, n, e);
  });
};
jt.prototype.createReadStream = function(e) {
  e = e || {};
  var t = new E1(e);
  t.destroyed = !1, t.start = e.start || 0, t.endOffset = e.end, t.pos = t.endOffset || this.buffer.length;
  for (var n = this.buffer.slice(t.start, t.pos), r = 0; ; ) {
    var i = r + this.maxChunkSize;
    if (i >= n.length) {
      r < n.length && t.write(n.slice(r, n.length));
      break;
    }
    t.write(n.slice(r, i)), r = i;
  }
  return t.end(), t.destroy = function() {
    t.destroyed = !0;
  }, t;
};
jt.prototype.createWriteStream = function(e) {
  var t = this;
  e = e || {};
  var n = new Dl(e);
  return n.start = e.start || 0, n.endOffset = e.end == null ? this.buffer.length : +e.end, n.bytesWritten = 0, n.pos = n.start, n.destroyed = !1, n._write = function(r, i, a) {
    if (!n.destroyed) {
      var o = n.pos + r.length;
      if (o > n.endOffset) {
        var s = new Error("maximum file length exceeded");
        s.code = "ETOOBIG", n.destroyed = !0, a(s);
        return;
      }
      r.copy(t.buffer, n.pos, 0, r.length), n.bytesWritten += r.length, n.pos = o, n.emit("progress"), a();
    }
  }, n.destroy = function() {
    n.destroyed = !0;
  }, n;
};
jt.prototype.ref = function() {
  this.refCount += 1;
};
jt.prototype.unref = function() {
  if (this.refCount -= 1, this.refCount < 0)
    throw new Error("invalid unref");
};
function S1(e, t) {
  return new jt(e, t);
}
function A1(e, t) {
  return new Bt(e, t);
}
var Kt = pl.Buffer, $c = [
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
typeof Int32Array < "u" && ($c = new Int32Array($c));
function _h(e) {
  if (Kt.isBuffer(e))
    return e;
  var t = typeof Kt.alloc == "function" && typeof Kt.from == "function";
  if (typeof e == "number")
    return t ? Kt.alloc(e) : new Kt(e);
  if (typeof e == "string")
    return t ? Kt.from(e) : new Kt(e);
  throw new Error("input must be buffer, number, or string, received " + typeof e);
}
function T1(e) {
  var t = _h(4);
  return t.writeInt32BE(e, 0), t;
}
function kl(e, t) {
  e = _h(e), Kt.isBuffer(t) && (t = t.readUInt32BE(0));
  for (var n = ~~t ^ -1, r = 0; r < e.length; r++)
    n = $c[(n ^ e[r]) & 255] ^ n >>> 8;
  return n ^ -1;
}
function Il() {
  return T1(kl.apply(null, arguments));
}
Il.signed = function() {
  return kl.apply(null, arguments);
};
Il.unsigned = function() {
  return kl.apply(null, arguments) >>> 0;
};
var R1 = Il, Lc = at, C1 = lt, Sh = Ii, O1 = R1, To = Fe, Ro = Si.EventEmitter, Ah = le.Transform, Nl = le.PassThrough, P1 = le.Writable;
Pt.open = F1;
Pt.fromFd = Th;
Pt.fromBuffer = D1;
Pt.fromRandomAccessReader = $l;
Pt.dosDateTimeToDate = Ch;
Pt.validateFileName = Oh;
Pt.ZipFile = rn;
Pt.Entry = $i;
Pt.RandomAccessReader = pn;
function F1(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !0), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = Xa), Lc.open(e, "r", function(r, i) {
    if (r) return n(r);
    Th(i, t, function(a, o) {
      a && Lc.close(i, Xa), n(a, o);
    });
  });
}
function Th(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !1), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = Xa), Lc.fstat(e, function(r, i) {
    if (r) return n(r);
    var a = Sh.createFromFd(e, { autoClose: !0 });
    $l(a, i.size, t, n);
  });
}
function D1(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose = !1, t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1);
  var r = Sh.createFromBuffer(e, { maxChunkSize: 65536 });
  $l(r, e.length, t, n);
}
function $l(e, t, n, r) {
  typeof n == "function" && (r = n, n = null), n == null && (n = {}), n.autoClose == null && (n.autoClose = !0), n.lazyEntries == null && (n.lazyEntries = !1), n.decodeStrings == null && (n.decodeStrings = !0);
  var i = !!n.decodeStrings;
  if (n.validateEntrySizes == null && (n.validateEntrySizes = !0), n.strictFileNames == null && (n.strictFileNames = !1), r == null && (r = Xa), typeof t != "number") throw new Error("expected totalSize parameter to be a number");
  if (t > Number.MAX_SAFE_INTEGER)
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  e.ref();
  var a = 22, o = 65535, s = Math.min(a + o, t), c = Rt(s), f = t - c.length;
  hr(e, c, 0, s, f, function(l) {
    if (l) return r(l);
    for (var u = s - a; u >= 0; u -= 1)
      if (c.readUInt32LE(u) === 101010256) {
        var d = c.slice(u), h = d.readUInt16LE(4);
        if (h !== 0)
          return r(new Error("multi-disk zip files are not supported: found disk number: " + h));
        var v = d.readUInt16LE(10), x = d.readUInt32LE(16), g = d.readUInt16LE(20), y = d.length - a;
        if (g !== y)
          return r(new Error("invalid comment length. expected: " + y + ". found: " + g));
        var b = i ? Ua(d, 22, d.length, !1) : d.slice(22);
        if (!(v === 65535 || x === 4294967295))
          return r(null, new rn(e, x, t, v, b, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames));
        var T = Rt(20), D = f + u - T.length;
        hr(e, T, 0, T.length, D, function(U) {
          if (U) return r(U);
          if (T.readUInt32LE(0) !== 117853008)
            return r(new Error("invalid zip64 end of central directory locator signature"));
          var k = xr(T, 8), $ = Rt(56);
          hr(e, $, 0, $.length, k, function(G) {
            return G ? r(G) : $.readUInt32LE(0) !== 101075792 ? r(new Error("invalid zip64 end of central directory record signature")) : (v = xr($, 32), x = xr($, 48), r(null, new rn(e, x, t, v, b, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames)));
          });
        });
        return;
      }
    r(new Error("end of central directory record signature not found"));
  });
}
To.inherits(rn, Ro);
function rn(e, t, n, r, i, a, o, s, c, f) {
  var l = this;
  Ro.call(l), l.reader = e, l.reader.on("error", function(u) {
    Rh(l, u);
  }), l.reader.once("close", function() {
    l.emit("close");
  }), l.readEntryCursor = t, l.fileSize = n, l.entryCount = r, l.comment = i, l.entriesRead = 0, l.autoClose = !!a, l.lazyEntries = !!o, l.decodeStrings = !!s, l.validateEntrySizes = !!c, l.strictFileNames = !!f, l.isOpen = !0, l.emittedError = !1, l.lazyEntries || l._readEntry();
}
rn.prototype.close = function() {
  this.isOpen && (this.isOpen = !1, this.reader.unref());
};
function dt(e, t) {
  e.autoClose && e.close(), Rh(e, t);
}
function Rh(e, t) {
  e.emittedError || (e.emittedError = !0, e.emit("error", t));
}
rn.prototype.readEntry = function() {
  if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
rn.prototype._readEntry = function() {
  var e = this;
  if (e.entryCount === e.entriesRead) {
    setImmediate(function() {
      e.autoClose && e.close(), !e.emittedError && e.emit("end");
    });
    return;
  }
  if (!e.emittedError) {
    var t = Rt(46);
    hr(e.reader, t, 0, t.length, e.readEntryCursor, function(n) {
      if (n) return dt(e, n);
      if (!e.emittedError) {
        var r = new $i(), i = t.readUInt32LE(0);
        if (i !== 33639248) return dt(e, new Error("invalid central directory file header signature: 0x" + i.toString(16)));
        if (r.versionMadeBy = t.readUInt16LE(4), r.versionNeededToExtract = t.readUInt16LE(6), r.generalPurposeBitFlag = t.readUInt16LE(8), r.compressionMethod = t.readUInt16LE(10), r.lastModFileTime = t.readUInt16LE(12), r.lastModFileDate = t.readUInt16LE(14), r.crc32 = t.readUInt32LE(16), r.compressedSize = t.readUInt32LE(20), r.uncompressedSize = t.readUInt32LE(24), r.fileNameLength = t.readUInt16LE(28), r.extraFieldLength = t.readUInt16LE(30), r.fileCommentLength = t.readUInt16LE(32), r.internalFileAttributes = t.readUInt16LE(36), r.externalFileAttributes = t.readUInt32LE(38), r.relativeOffsetOfLocalHeader = t.readUInt32LE(42), r.generalPurposeBitFlag & 64) return dt(e, new Error("strong encryption is not supported"));
        e.readEntryCursor += 46, t = Rt(r.fileNameLength + r.extraFieldLength + r.fileCommentLength), hr(e.reader, t, 0, t.length, e.readEntryCursor, function(a) {
          if (a) return dt(e, a);
          if (!e.emittedError) {
            var o = (r.generalPurposeBitFlag & 2048) !== 0;
            r.fileName = e.decodeStrings ? Ua(t, 0, r.fileNameLength, o) : t.slice(0, r.fileNameLength);
            var s = r.fileNameLength + r.extraFieldLength, c = t.slice(r.fileNameLength, s);
            r.extraFields = [];
            for (var f = 0; f < c.length - 3; ) {
              var l = c.readUInt16LE(f + 0), u = c.readUInt16LE(f + 2), d = f + 4, h = d + u;
              if (h > c.length) return dt(e, new Error("extra field length exceeds extra field buffer size"));
              var v = Rt(u);
              c.copy(v, 0, d, h), r.extraFields.push({
                id: l,
                data: v
              }), f = h;
            }
            if (r.fileComment = e.decodeStrings ? Ua(t, s, s + r.fileCommentLength, o) : t.slice(s, s + r.fileCommentLength), r.comment = r.fileComment, e.readEntryCursor += t.length, e.entriesRead += 1, r.uncompressedSize === 4294967295 || r.compressedSize === 4294967295 || r.relativeOffsetOfLocalHeader === 4294967295) {
              for (var x = null, f = 0; f < r.extraFields.length; f++) {
                var g = r.extraFields[f];
                if (g.id === 1) {
                  x = g.data;
                  break;
                }
              }
              if (x == null)
                return dt(e, new Error("expected zip64 extended information extra field"));
              var y = 0;
              if (r.uncompressedSize === 4294967295) {
                if (y + 8 > x.length)
                  return dt(e, new Error("zip64 extended information extra field does not include uncompressed size"));
                r.uncompressedSize = xr(x, y), y += 8;
              }
              if (r.compressedSize === 4294967295) {
                if (y + 8 > x.length)
                  return dt(e, new Error("zip64 extended information extra field does not include compressed size"));
                r.compressedSize = xr(x, y), y += 8;
              }
              if (r.relativeOffsetOfLocalHeader === 4294967295) {
                if (y + 8 > x.length)
                  return dt(e, new Error("zip64 extended information extra field does not include relative header offset"));
                r.relativeOffsetOfLocalHeader = xr(x, y), y += 8;
              }
            }
            if (e.decodeStrings)
              for (var f = 0; f < r.extraFields.length; f++) {
                var g = r.extraFields[f];
                if (g.id === 28789) {
                  if (g.data.length < 6 || g.data.readUInt8(0) !== 1)
                    continue;
                  var b = g.data.readUInt32LE(1);
                  if (O1.unsigned(t.slice(0, r.fileNameLength)) !== b)
                    continue;
                  r.fileName = Ua(g.data, 5, g.data.length, !0);
                  break;
                }
              }
            if (e.validateEntrySizes && r.compressionMethod === 0) {
              var T = r.uncompressedSize;
              if (r.isEncrypted() && (T += 12), r.compressedSize !== T) {
                var D = "compressed/uncompressed size mismatch for stored file: " + r.compressedSize + " != " + r.uncompressedSize;
                return dt(e, new Error(D));
              }
            }
            if (e.decodeStrings) {
              e.strictFileNames || (r.fileName = r.fileName.replace(/\\/g, "/"));
              var U = Oh(r.fileName, e.validateFileNameOptions);
              if (U != null) return dt(e, new Error(U));
            }
            e.emit("entry", r), e.lazyEntries || e._readEntry();
          }
        });
      }
    });
  }
};
rn.prototype.openReadStream = function(e, t, n) {
  var r = this, i = 0, a = e.compressedSize;
  if (n == null)
    n = t, t = {};
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
  if (!r.isOpen) return n(new Error("closed"));
  if (e.isEncrypted() && t.decrypt !== !1)
    return n(new Error("entry is encrypted, and options.decrypt !== false"));
  r.reader.ref();
  var o = Rt(30);
  hr(r.reader, o, 0, o.length, e.relativeOffsetOfLocalHeader, function(s) {
    try {
      if (s) return n(s);
      var c = o.readUInt32LE(0);
      if (c !== 67324752)
        return n(new Error("invalid local file header signature: 0x" + c.toString(16)));
      var f = o.readUInt16LE(26), l = o.readUInt16LE(28), u = e.relativeOffsetOfLocalHeader + o.length + f + l, d;
      if (e.compressionMethod === 0)
        d = !1;
      else if (e.compressionMethod === 8)
        d = t.decompress != null ? t.decompress : !0;
      else
        return n(new Error("unsupported compression method: " + e.compressionMethod));
      var h = u, v = h + e.compressedSize;
      if (e.compressedSize !== 0 && v > r.fileSize)
        return n(new Error("file data overflows file bounds: " + h + " + " + e.compressedSize + " > " + r.fileSize));
      var x = r.reader.createReadStream({
        start: h + i,
        end: h + a
      }), g = x;
      if (d) {
        var y = !1, b = C1.createInflateRaw();
        x.on("error", function(T) {
          setImmediate(function() {
            y || b.emit("error", T);
          });
        }), x.pipe(b), r.validateEntrySizes ? (g = new Li(e.uncompressedSize), b.on("error", function(T) {
          setImmediate(function() {
            y || g.emit("error", T);
          });
        }), b.pipe(g)) : g = b, g.destroy = function() {
          y = !0, b !== g && b.unpipe(g), x.unpipe(b), x.destroy();
        };
      }
      n(null, g);
    } finally {
      r.reader.unref();
    }
  });
};
function $i() {
}
$i.prototype.getLastModDate = function() {
  return Ch(this.lastModFileDate, this.lastModFileTime);
};
$i.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 1) !== 0;
};
$i.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};
function Ch(e, t) {
  var n = e & 31, r = (e >> 5 & 15) - 1, i = (e >> 9 & 127) + 1980, a = 0, o = (t & 31) * 2, s = t >> 5 & 63, c = t >> 11 & 31;
  return new Date(i, r, n, c, s, o, a);
}
function Oh(e) {
  return e.indexOf("\\") !== -1 ? "invalid characters in fileName: " + e : /^[a-zA-Z]:/.test(e) || /^\//.test(e) ? "absolute path: " + e : e.split("/").indexOf("..") !== -1 ? "invalid relative path: " + e : null;
}
function hr(e, t, n, r, i, a) {
  if (r === 0)
    return setImmediate(function() {
      a(null, Rt(0));
    });
  e.read(t, n, r, i, function(o, s) {
    if (o) return a(o);
    if (s < r)
      return a(new Error("unexpected EOF"));
    a();
  });
}
To.inherits(Li, Ah);
function Li(e) {
  Ah.call(this), this.actualByteCount = 0, this.expectedByteCount = e;
}
Li.prototype._transform = function(e, t, n) {
  if (this.actualByteCount += e.length, this.actualByteCount > this.expectedByteCount) {
    var r = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return n(new Error(r));
  }
  n(null, e);
};
Li.prototype._flush = function(e) {
  if (this.actualByteCount < this.expectedByteCount) {
    var t = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return e(new Error(t));
  }
  e();
};
To.inherits(pn, Ro);
function pn() {
  Ro.call(this), this.refCount = 0;
}
pn.prototype.ref = function() {
  this.refCount += 1;
};
pn.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.close(t);
  function t(n) {
    if (n) return e.emit("error", n);
    e.emit("close");
  }
};
pn.prototype.createReadStream = function(e) {
  var t = e.start, n = e.end;
  if (t === n) {
    var r = new Nl();
    return setImmediate(function() {
      r.end();
    }), r;
  }
  var i = this._readStreamForRange(t, n), a = !1, o = new Co(this);
  i.on("error", function(c) {
    setImmediate(function() {
      a || o.emit("error", c);
    });
  }), o.destroy = function() {
    i.unpipe(o), o.unref(), i.destroy();
  };
  var s = new Li(n - t);
  return o.on("error", function(c) {
    setImmediate(function() {
      a || s.emit("error", c);
    });
  }), s.destroy = function() {
    a = !0, o.unpipe(s), o.destroy();
  }, i.pipe(o).pipe(s);
};
pn.prototype._readStreamForRange = function(e, t) {
  throw new Error("not implemented");
};
pn.prototype.read = function(e, t, n, r, i) {
  var a = this.createReadStream({ start: r, end: r + n }), o = new P1(), s = 0;
  o._write = function(c, f, l) {
    c.copy(e, t + s, 0, c.length), s += c.length, l();
  }, o.on("finish", i), a.on("error", function(c) {
    i(c);
  }), a.pipe(o);
};
pn.prototype.close = function(e) {
  setImmediate(e);
};
To.inherits(Co, Nl);
function Co(e) {
  Nl.call(this), this.context = e, this.context.ref(), this.unreffedYet = !1;
}
Co.prototype._flush = function(e) {
  this.unref(), e();
};
Co.prototype.unref = function(e) {
  this.unreffedYet || (this.unreffedYet = !0, this.context.unref());
};
var k1 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
function Ua(e, t, n, r) {
  if (r)
    return e.toString("utf8", t, n);
  for (var i = "", a = t; a < n; a++)
    i += k1[e[a]];
  return i;
}
function xr(e, t) {
  var n = e.readUInt32LE(t), r = e.readUInt32LE(t + 4);
  return r * 4294967296 + n;
}
var Rt;
typeof Buffer.allocUnsafe == "function" ? Rt = function(e) {
  return Buffer.allocUnsafe(e);
} : Rt = function(e) {
  return new Buffer(e);
};
function Xa(e) {
  if (e) throw e;
}
const ef = l1, I1 = b1, Ph = yh, N1 = Pt, $1 = (e, t) => {
  const a = e.versionMadeBy >> 8;
  return (t & 61440) === 40960 ? "symlink" : (t & 61440) === 16384 || a === 0 && e.externalFileAttributes === 16 ? "directory" : "file";
}, L1 = (e, t) => {
  const n = {
    mode: e.externalFileAttributes >> 16 & 65535,
    mtime: e.getLastModDate(),
    path: e.fileName
  };
  return n.type = $1(e, n.mode), n.mode === 0 && n.type === "directory" && (n.mode = 493), n.mode === 0 && (n.mode = 420), Ph(t.openReadStream.bind(t))(e).then(I1.buffer).then((r) => (n.data = r, n.type === "symlink" && (n.linkname = r.toString()), n)).catch((r) => {
    throw t.close(), r;
  });
}, U1 = (e) => new Promise((t, n) => {
  const r = [];
  e.readEntry(), e.on("entry", (i) => {
    L1(i, e).catch(n).then((a) => {
      r.push(a), e.readEntry();
    });
  }), e.on("error", n), e.on("end", () => t(r));
});
var B1 = () => (e) => Buffer.isBuffer(e) ? !ef(e) || ef(e).ext !== "zip" ? Promise.resolve([]) : Ph(N1.fromBuffer)(e, { lazyEntries: !0 }).then(U1) : Promise.reject(new TypeError(`Expected a Buffer, got ${typeof e}`)), Ll = { exports: {} };
const tf = (e, t) => function() {
  const n = t.promiseModule, r = new Array(arguments.length);
  for (let i = 0; i < arguments.length; i++)
    r[i] = arguments[i];
  return new n((i, a) => {
    t.errorFirst ? r.push(function(o, s) {
      if (t.multiArgs) {
        const c = new Array(arguments.length - 1);
        for (let f = 1; f < arguments.length; f++)
          c[f - 1] = arguments[f];
        o ? (c.unshift(o), a(c)) : i(c);
      } else o ? a(o) : i(s);
    }) : r.push(function(o) {
      if (t.multiArgs) {
        const s = new Array(arguments.length - 1);
        for (let c = 0; c < arguments.length; c++)
          s[c] = arguments[c];
        i(s);
      } else
        i(o);
    }), e.apply(this, r);
  });
};
var j1 = (e, t) => {
  t = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise
  }, t);
  const n = (i) => {
    const a = (o) => typeof o == "string" ? i === o : o.test(i);
    return t.include ? t.include.some(a) : !t.exclude.some(a);
  };
  let r;
  typeof e == "function" ? r = function() {
    return t.excludeMain ? e.apply(this, arguments) : tf(e, t).apply(this, arguments);
  } : r = Object.create(Object.getPrototypeOf(e));
  for (const i in e) {
    const a = e[i];
    r[i] = typeof a == "function" && n(i) ? tf(a, t) : a;
  }
  return r;
};
const M1 = at, Fn = ce, nf = j1, Fh = {
  mode: 511 & ~process.umask(),
  fs: M1
}, Dh = (e) => {
  if (process.platform === "win32" && /[<>:"|?*]/.test(e.replace(Fn.parse(e).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${e}`);
    throw n.code = "EINVAL", n;
  }
};
Ll.exports = (e, t) => Promise.resolve().then(() => {
  Dh(e), t = Object.assign({}, Fh, t);
  const n = nf(t.fs.mkdir), r = nf(t.fs.stat), i = (a) => n(a, t.mode).then(() => a).catch((o) => {
    if (o.code === "ENOENT") {
      if (o.message.includes("null bytes") || Fn.dirname(a) === a)
        throw o;
      return i(Fn.dirname(a)).then(() => i(a));
    }
    return r(a).then((s) => s.isDirectory() ? a : Promise.reject()).catch(() => {
      throw o;
    });
  });
  return i(Fn.resolve(e));
});
Ll.exports.sync = (e, t) => {
  Dh(e), t = Object.assign({}, Fh, t);
  const n = (r) => {
    try {
      t.fs.mkdirSync(r, t.mode);
    } catch (i) {
      if (i.code === "ENOENT") {
        if (i.message.includes("null bytes") || Fn.dirname(r) === r)
          throw i;
        return n(Fn.dirname(r)), n(r);
      }
      try {
        if (!t.fs.statSync(r).isDirectory())
          throw new Error("The path is not a directory");
      } catch {
        throw i;
      }
    }
    return r;
  };
  return n(Fn.resolve(e));
};
var q1 = Ll.exports;
/*!
 * is-natural-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-natural-number.js
*/
function z1(e, t) {
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
const H1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: z1
}, Symbol.toStringTag, { value: "Module" })), G1 = /* @__PURE__ */ $g(H1);
/*!
 * strip-dirs | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/node-strip-dirs
*/
const qr = ce, zr = Fe, W1 = G1;
var V1 = function(t, n, r) {
  if (typeof t != "string")
    throw new TypeError(
      zr.inspect(t) + " is not a string. First argument to strip-dirs must be a path string."
    );
  if (qr.posix.isAbsolute(t) || qr.win32.isAbsolute(t))
    throw new Error(`${t} is an absolute path. strip-dirs requires a relative path.`);
  if (!W1(n, { includeZero: !0 }))
    throw new Error(
      "The Second argument of strip-dirs must be a natural number or 0, but received " + zr.inspect(n) + "."
    );
  if (r) {
    if (typeof r != "object")
      throw new TypeError(
        zr.inspect(r) + " is not an object. Expected an object with a boolean `disallowOverflow` property."
      );
    if (Array.isArray(r))
      throw new TypeError(
        zr.inspect(r) + " is an array. Expected an object with a boolean `disallowOverflow` property."
      );
    if ("disallowOverflow" in r && typeof r.disallowOverflow != "boolean")
      throw new TypeError(
        zr.inspect(r.disallowOverflow) + " is neither true nor false. `disallowOverflow` option must be a Boolean value."
      );
  } else
    r = { disallowOverflow: !1 };
  const i = qr.normalize(t).split(qr.sep);
  if (i.length > 1 && i[0] === "." && i.shift(), n > i.length - 1) {
    if (r.disallowOverflow)
      throw new RangeError("Cannot strip more directories than there are.");
    n = i.length - 1;
  }
  return qr.join.apply(null, i.slice(n));
};
const Ba = ce, Y1 = qe, X1 = Tl, K1 = i1, J1 = c1, Q1 = B1, Uc = q1, Z1 = yh, eE = V1, it = Z1(Y1), tE = (e, t) => t.plugins.length === 0 ? Promise.resolve([]) : Promise.all(t.plugins.map((n) => n(e, t))).then((n) => n.reduce((r, i) => r.concat(i))), Bc = (e, t) => it.realpath(e).catch((n) => {
  const r = Ba.dirname(e);
  return Bc(r, t);
}).then((n) => {
  if (n.indexOf(t) !== 0)
    throw new Error("Refusing to create a directory outside the output path.");
  return Uc(e).then(it.realpath);
}), nE = (e, t) => it.readlink(e).catch((n) => null).then((n) => {
  if (n)
    throw new Error("Refusing to write into a symlink");
  return t;
}), rE = (e, t, n) => tE(e, n).then((r) => (n.strip > 0 && (r = r.map((i) => (i.path = eE(i.path, n.strip), i)).filter((i) => i.path !== ".")), typeof n.filter == "function" && (r = r.filter(n.filter)), typeof n.map == "function" && (r = r.map(n.map)), t ? Promise.all(r.map((i) => {
  const a = Ba.join(t, i.path), o = i.mode & ~process.umask(), s = /* @__PURE__ */ new Date();
  return i.type === "directory" ? Uc(t).then((c) => it.realpath(c)).then((c) => Bc(a, c)).then(() => it.utimes(a, s, i.mtime)).then(() => i) : Uc(t).then((c) => it.realpath(c)).then((c) => Bc(Ba.dirname(a), c).then(() => c)).then((c) => i.type === "file" ? nE(a, c) : c).then((c) => it.realpath(Ba.dirname(a)).then((f) => {
    if (f.indexOf(c) !== 0)
      throw new Error("Refusing to write outside output directory: " + f);
  })).then(() => i.type === "link" || i.type === "symlink" && process.platform === "win32" ? it.link(i.linkname, a) : i.type === "symlink" ? it.symlink(i.linkname, a) : it.writeFile(a, i.data, { mode: o })).then(() => i.type === "file" && it.utimes(a, s, i.mtime)).then(() => i);
})) : r));
var iE = (e, t, n) => typeof e != "string" && !Buffer.isBuffer(e) ? Promise.reject(new TypeError("Input file required")) : (typeof t == "object" && (n = t, t = null), n = Object.assign({ plugins: [
  X1(),
  K1(),
  J1(),
  Q1()
] }, n), (typeof e == "string" ? it.readFile(e) : Promise.resolve(e)).then((i) => rE(i, t, n)));
const aE = /* @__PURE__ */ dl(iE);
function kh(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: oE } = Object.prototype, { getPrototypeOf: Ul } = Object, { iterator: Oo, toStringTag: Ih } = Symbol, Po = /* @__PURE__ */ ((e) => (t) => {
  const n = oE.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), gt = (e) => (e = e.toLowerCase(), (t) => Po(t) === e), Fo = (e) => (t) => typeof t === e, { isArray: Fr } = Array, wr = Fo("undefined");
function Ui(e) {
  return e !== null && !wr(e) && e.constructor !== null && !wr(e.constructor) && tt(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Nh = gt("ArrayBuffer");
function sE(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Nh(e.buffer), t;
}
const cE = Fo("string"), tt = Fo("function"), $h = Fo("number"), Bi = (e) => e !== null && typeof e == "object", lE = (e) => e === !0 || e === !1, ja = (e) => {
  if (Po(e) !== "object")
    return !1;
  const t = Ul(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Ih in e) && !(Oo in e);
}, uE = (e) => {
  if (!Bi(e) || Ui(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, pE = gt("Date"), fE = gt("File"), dE = gt("Blob"), mE = gt("FileList"), hE = (e) => Bi(e) && tt(e.pipe), xE = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || tt(e.append) && ((t = Po(e)) === "formdata" || // detect form-data instance
  t === "object" && tt(e.toString) && e.toString() === "[object FormData]"));
}, vE = gt("URLSearchParams"), [gE, yE, bE, wE] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(gt), EE = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ji(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, i;
  if (typeof e != "object" && (e = [e]), Fr(e))
    for (r = 0, i = e.length; r < i; r++)
      t.call(null, e[r], r, e);
  else {
    if (Ui(e))
      return;
    const a = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = a.length;
    let s;
    for (r = 0; r < o; r++)
      s = a[r], t.call(null, e[s], s, e);
  }
}
function Lh(e, t) {
  if (Ui(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], t === i.toLowerCase())
      return i;
  return null;
}
const An = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Uh = (e) => !wr(e) && e !== An;
function jc() {
  const { caseless: e, skipUndefined: t } = Uh(this) && this || {}, n = {}, r = (i, a) => {
    if (a === "__proto__" || a === "constructor" || a === "prototype")
      return;
    const o = e && Lh(n, a) || a;
    ja(n[o]) && ja(i) ? n[o] = jc(n[o], i) : ja(i) ? n[o] = jc({}, i) : Fr(i) ? n[o] = i.slice() : (!t || !wr(i)) && (n[o] = i);
  };
  for (let i = 0, a = arguments.length; i < a; i++)
    arguments[i] && ji(arguments[i], r);
  return n;
}
const _E = (e, t, n, { allOwnKeys: r } = {}) => (ji(
  t,
  (i, a) => {
    n && tt(i) ? Object.defineProperty(e, a, {
      value: kh(i, n),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, a, {
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: r }
), e), SE = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), AE = (e, t, n, r) => {
  e.prototype = Object.create(
    t.prototype,
    r
  ), Object.defineProperty(e.prototype, "constructor", {
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, TE = (e, t, n, r) => {
  let i, a, o;
  const s = {};
  if (t = t || {}, e == null) return t;
  do {
    for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0; )
      o = i[a], (!r || r(o, e, t)) && !s[o] && (t[o] = e[o], s[o] = !0);
    e = n !== !1 && Ul(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, RE = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, CE = (e) => {
  if (!e) return null;
  if (Fr(e)) return e;
  let t = e.length;
  if (!$h(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, OE = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ul(Uint8Array)), PE = (e, t) => {
  const r = (e && e[Oo]).call(e);
  let i;
  for (; (i = r.next()) && !i.done; ) {
    const a = i.value;
    t.call(e, a[0], a[1]);
  }
}, FE = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, DE = gt("HTMLFormElement"), kE = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, r, i) {
  return r.toUpperCase() + i;
}), rf = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), IE = gt("RegExp"), Bh = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  ji(n, (i, a) => {
    let o;
    (o = t(i, a, e)) !== !1 && (r[a] = o || i);
  }), Object.defineProperties(e, r);
}, NE = (e) => {
  Bh(e, (t, n) => {
    if (tt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (tt(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, $E = (e, t) => {
  const n = {}, r = (i) => {
    i.forEach((a) => {
      n[a] = !0;
    });
  };
  return Fr(e) ? r(e) : r(String(e).split(t)), n;
}, LE = () => {
}, UE = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function BE(e) {
  return !!(e && tt(e.append) && e[Ih] === "FormData" && e[Oo]);
}
const jE = (e) => {
  const t = new Array(10), n = (r, i) => {
    if (Bi(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (Ui(r))
        return r;
      if (!("toJSON" in r)) {
        t[i] = r;
        const a = Fr(r) ? [] : {};
        return ji(r, (o, s) => {
          const c = n(o, i + 1);
          !wr(c) && (a[s] = c);
        }), t[i] = void 0, a;
      }
    }
    return r;
  };
  return n(e, 0);
}, ME = gt("AsyncFunction"), qE = (e) => e && (Bi(e) || tt(e)) && tt(e.then) && tt(e.catch), jh = ((e, t) => e ? setImmediate : t ? ((n, r) => (An.addEventListener(
  "message",
  ({ source: i, data: a }) => {
    i === An && a === n && r.length && r.shift()();
  },
  !1
), (i) => {
  r.push(i), An.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(typeof setImmediate == "function", tt(An.postMessage)), zE = typeof queueMicrotask < "u" ? queueMicrotask.bind(An) : typeof process < "u" && process.nextTick || jh, HE = (e) => e != null && tt(e[Oo]), P = {
  isArray: Fr,
  isArrayBuffer: Nh,
  isBuffer: Ui,
  isFormData: xE,
  isArrayBufferView: sE,
  isString: cE,
  isNumber: $h,
  isBoolean: lE,
  isObject: Bi,
  isPlainObject: ja,
  isEmptyObject: uE,
  isReadableStream: gE,
  isRequest: yE,
  isResponse: bE,
  isHeaders: wE,
  isUndefined: wr,
  isDate: pE,
  isFile: fE,
  isBlob: dE,
  isRegExp: IE,
  isFunction: tt,
  isStream: hE,
  isURLSearchParams: vE,
  isTypedArray: OE,
  isFileList: mE,
  forEach: ji,
  merge: jc,
  extend: _E,
  trim: EE,
  stripBOM: SE,
  inherits: AE,
  toFlatObject: TE,
  kindOf: Po,
  kindOfTest: gt,
  endsWith: RE,
  toArray: CE,
  forEachEntry: PE,
  matchAll: FE,
  isHTMLForm: DE,
  hasOwnProperty: rf,
  hasOwnProp: rf,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Bh,
  freezeMethods: NE,
  toObjectSet: $E,
  toCamelCase: kE,
  noop: LE,
  toFiniteNumber: UE,
  findKey: Lh,
  global: An,
  isContextDefined: Uh,
  isSpecCompliantForm: BE,
  toJSONObject: jE,
  isAsyncFn: ME,
  isThenable: qE,
  setImmediate: jh,
  asap: zE,
  isIterable: HE
};
let W = class Mh extends Error {
  static from(t, n, r, i, a, o) {
    const s = new Mh(t.message, n || t.code, r, i, a);
    return s.cause = t, s.name = t.name, o && Object.assign(s, o), s;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(t, n, r, i, a) {
    super(t), this.name = "AxiosError", this.isAxiosError = !0, n && (this.code = n), r && (this.config = r), i && (this.request = i), a && (this.response = a, this.status = a.status);
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: P.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
W.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
W.ERR_BAD_OPTION = "ERR_BAD_OPTION";
W.ECONNABORTED = "ECONNABORTED";
W.ETIMEDOUT = "ETIMEDOUT";
W.ERR_NETWORK = "ERR_NETWORK";
W.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
W.ERR_DEPRECATED = "ERR_DEPRECATED";
W.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
W.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
W.ERR_CANCELED = "ERR_CANCELED";
W.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
W.ERR_INVALID_URL = "ERR_INVALID_URL";
var qh = le.Stream, GE = Fe, WE = yt;
function yt() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
GE.inherits(yt, qh);
yt.create = function(e, t) {
  var n = new this();
  t = t || {};
  for (var r in t)
    n[r] = t[r];
  n.source = e;
  var i = e.emit;
  return e.emit = function() {
    return n._handleEmit(arguments), i.apply(e, arguments);
  }, e.on("error", function() {
  }), n.pauseStream && e.pause(), n;
};
Object.defineProperty(yt.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
yt.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
yt.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
yt.prototype.pause = function() {
  this.source.pause();
};
yt.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
yt.prototype.pipe = function() {
  var e = qh.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
yt.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
yt.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var VE = Fe, zh = le.Stream, af = WE, YE = we;
function we() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
VE.inherits(we, zh);
we.create = function(e) {
  var t = new this();
  e = e || {};
  for (var n in e)
    t[n] = e[n];
  return t;
};
we.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
we.prototype.append = function(e) {
  var t = we.isStreamLike(e);
  if (t) {
    if (!(e instanceof af)) {
      var n = af.create(e, {
        maxDataSize: 1 / 0,
        pauseStream: this.pauseStreams
      });
      e.on("data", this._checkDataSize.bind(this)), e = n;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
};
we.prototype.pipe = function(e, t) {
  return zh.prototype.pipe.call(this, e, t), this.resume(), e;
};
we.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) {
    this._pendingNext = !0;
    return;
  }
  this._insideLoop = !0;
  try {
    do
      this._pendingNext = !1, this._realGetNext();
    while (this._pendingNext);
  } finally {
    this._insideLoop = !1;
  }
};
we.prototype._realGetNext = function() {
  var e = this._streams.shift();
  if (typeof e > "u") {
    this.end();
    return;
  }
  if (typeof e != "function") {
    this._pipeNext(e);
    return;
  }
  var t = e;
  t((function(n) {
    var r = we.isStreamLike(n);
    r && (n.on("data", this._checkDataSize.bind(this)), this._handleErrors(n)), this._pipeNext(n);
  }).bind(this));
};
we.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var t = we.isStreamLike(e);
  if (t) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var n = e;
  this.write(n), this._getNext();
};
we.prototype._handleErrors = function(e) {
  var t = this;
  e.on("error", function(n) {
    t._emitError(n);
  });
};
we.prototype.write = function(e) {
  this.emit("data", e);
};
we.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
we.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
we.prototype.end = function() {
  this._reset(), this.emit("end");
};
we.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
we.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
we.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
we.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(t) {
    t.dataSize && (e.dataSize += t.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
we.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var Hh = {};
const XE = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var KE = XE;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var t = KE, n = ce.extname, r = /^\s*([^;\s]*)(?:;|\s|$)/, i = /^text\//i;
  e.charset = a, e.charsets = { lookup: a }, e.contentType = o, e.extension = s, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = c, e.types = /* @__PURE__ */ Object.create(null), f(e.extensions, e.types);
  function a(l) {
    if (!l || typeof l != "string")
      return !1;
    var u = r.exec(l), d = u && t[u[1].toLowerCase()];
    return d && d.charset ? d.charset : u && i.test(u[1]) ? "UTF-8" : !1;
  }
  function o(l) {
    if (!l || typeof l != "string")
      return !1;
    var u = l.indexOf("/") === -1 ? e.lookup(l) : l;
    if (!u)
      return !1;
    if (u.indexOf("charset") === -1) {
      var d = e.charset(u);
      d && (u += "; charset=" + d.toLowerCase());
    }
    return u;
  }
  function s(l) {
    if (!l || typeof l != "string")
      return !1;
    var u = r.exec(l), d = u && e.extensions[u[1].toLowerCase()];
    return !d || !d.length ? !1 : d[0];
  }
  function c(l) {
    if (!l || typeof l != "string")
      return !1;
    var u = n("x." + l).toLowerCase().substr(1);
    return u && e.types[u] || !1;
  }
  function f(l, u) {
    var d = ["nginx", "apache", void 0, "iana"];
    Object.keys(t).forEach(function(v) {
      var x = t[v], g = x.extensions;
      if (!(!g || !g.length)) {
        l[v] = g;
        for (var y = 0; y < g.length; y++) {
          var b = g[y];
          if (u[b]) {
            var T = d.indexOf(t[u[b]].source), D = d.indexOf(x.source);
            if (u[b] !== "application/octet-stream" && (T > D || T === D && u[b].substr(0, 12) === "application/"))
              continue;
          }
          u[b] = v;
        }
      }
    });
  }
})(Hh);
var JE = QE;
function QE(e) {
  var t = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  t ? t(e) : setTimeout(e, 0);
}
var of = JE, Gh = ZE;
function ZE(e) {
  var t = !1;
  return of(function() {
    t = !0;
  }), function(r, i) {
    t ? e(r, i) : of(function() {
      e(r, i);
    });
  };
}
var Wh = e_;
function e_(e) {
  Object.keys(e.jobs).forEach(t_.bind(e)), e.jobs = {};
}
function t_(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var sf = Gh, n_ = Wh, Vh = r_;
function r_(e, t, n, r) {
  var i = n.keyedList ? n.keyedList[n.index] : n.index;
  n.jobs[i] = i_(t, i, e[i], function(a, o) {
    i in n.jobs && (delete n.jobs[i], a ? n_(n) : n.results[i] = o, r(a, n.results));
  });
}
function i_(e, t, n, r) {
  var i;
  return e.length == 2 ? i = e(n, sf(r)) : i = e(n, t, sf(r)), i;
}
var Yh = a_;
function a_(e, t) {
  var n = !Array.isArray(e), r = {
    index: 0,
    keyedList: n || t ? Object.keys(e) : null,
    jobs: {},
    results: n ? {} : [],
    size: n ? Object.keys(e).length : e.length
  };
  return t && r.keyedList.sort(n ? t : function(i, a) {
    return t(e[i], e[a]);
  }), r;
}
var o_ = Wh, s_ = Gh, Xh = c_;
function c_(e) {
  Object.keys(this.jobs).length && (this.index = this.size, o_(this), s_(e)(null, this.results));
}
var l_ = Vh, u_ = Yh, p_ = Xh, f_ = d_;
function d_(e, t, n) {
  for (var r = u_(e); r.index < (r.keyedList || e).length; )
    l_(e, t, r, function(i, a) {
      if (i) {
        n(i, a);
        return;
      }
      if (Object.keys(r.jobs).length === 0) {
        n(null, r.results);
        return;
      }
    }), r.index++;
  return p_.bind(r, n);
}
var Do = { exports: {} }, cf = Vh, m_ = Yh, h_ = Xh;
Do.exports = x_;
Do.exports.ascending = Kh;
Do.exports.descending = v_;
function x_(e, t, n, r) {
  var i = m_(e, n);
  return cf(e, t, i, function a(o, s) {
    if (o) {
      r(o, s);
      return;
    }
    if (i.index++, i.index < (i.keyedList || e).length) {
      cf(e, t, i, a);
      return;
    }
    r(null, i.results);
  }), h_.bind(i, r);
}
function Kh(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function v_(e, t) {
  return -1 * Kh(e, t);
}
var Jh = Do.exports, g_ = Jh, y_ = b_;
function b_(e, t, n) {
  return g_(e, t, null, n);
}
var w_ = {
  parallel: f_,
  serial: y_,
  serialOrdered: Jh
}, E_ = _l, lf = E_("%Object.defineProperty%", !0), __ = Km()(), S_ = El, A_ = Or, xa = __ ? Symbol.toStringTag : null, T_ = function(t, n) {
  var r = arguments.length > 2 && !!arguments[2] && arguments[2].force, i = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
  if (typeof r < "u" && typeof r != "boolean" || typeof i < "u" && typeof i != "boolean")
    throw new A_("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
  xa && (r || !S_(t, xa)) && (lf ? lf(t, xa, {
    configurable: !i,
    enumerable: !1,
    value: n,
    writable: !1
  }) : t[xa] = n);
}, R_ = function(e, t) {
  return Object.keys(t).forEach(function(n) {
    e[n] = e[n] || t[n];
  }), e;
}, Bl = YE, C_ = Fe, Hs = ce, O_ = uo, P_ = fl, F_ = ut.parse, D_ = at, k_ = le.Stream, I_ = jn, Gs = Hh, N_ = w_, $_ = T_, tn = El, Mc = R_;
function ae(e) {
  if (!(this instanceof ae))
    return new ae(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], Bl.call(this), e = e || {};
  for (var t in e)
    this[t] = e[t];
}
C_.inherits(ae, Bl);
ae.LINE_BREAK = `\r
`;
ae.DEFAULT_CONTENT_TYPE = "application/octet-stream";
ae.prototype.append = function(e, t, n) {
  n = n || {}, typeof n == "string" && (n = { filename: n });
  var r = Bl.prototype.append.bind(this);
  if ((typeof t == "number" || t == null) && (t = String(t)), Array.isArray(t)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var i = this._multiPartHeader(e, t, n), a = this._multiPartFooter();
  r(i), r(t), r(a), this._trackLength(i, t, n);
};
ae.prototype._trackLength = function(e, t, n) {
  var r = 0;
  n.knownLength != null ? r += Number(n.knownLength) : Buffer.isBuffer(t) ? r = t.length : typeof t == "string" && (r = Buffer.byteLength(t)), this._valueLength += r, this._overheadLength += Buffer.byteLength(e) + ae.LINE_BREAK.length, !(!t || !t.path && !(t.readable && tn(t, "httpVersion")) && !(t instanceof k_)) && (n.knownLength || this._valuesToMeasure.push(t));
};
ae.prototype._lengthRetriever = function(e, t) {
  tn(e, "fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? t(null, e.end + 1 - (e.start ? e.start : 0)) : D_.stat(e.path, function(n, r) {
    if (n) {
      t(n);
      return;
    }
    var i = r.size - (e.start ? e.start : 0);
    t(null, i);
  }) : tn(e, "httpVersion") ? t(null, Number(e.headers["content-length"])) : tn(e, "httpModule") ? (e.on("response", function(n) {
    e.pause(), t(null, Number(n.headers["content-length"]));
  }), e.resume()) : t("Unknown stream");
};
ae.prototype._multiPartHeader = function(e, t, n) {
  if (typeof n.header == "string")
    return n.header;
  var r = this._getContentDisposition(t, n), i = this._getContentType(t, n), a = "", o = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(r || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(i || [])
  };
  typeof n.header == "object" && Mc(o, n.header);
  var s;
  for (var c in o)
    if (tn(o, c)) {
      if (s = o[c], s == null)
        continue;
      Array.isArray(s) || (s = [s]), s.length && (a += c + ": " + s.join("; ") + ae.LINE_BREAK);
    }
  return "--" + this.getBoundary() + ae.LINE_BREAK + a + ae.LINE_BREAK;
};
ae.prototype._getContentDisposition = function(e, t) {
  var n;
  if (typeof t.filepath == "string" ? n = Hs.normalize(t.filepath).replace(/\\/g, "/") : t.filename || e && (e.name || e.path) ? n = Hs.basename(t.filename || e && (e.name || e.path)) : e && e.readable && tn(e, "httpVersion") && (n = Hs.basename(e.client._httpMessage.path || "")), n)
    return 'filename="' + n + '"';
};
ae.prototype._getContentType = function(e, t) {
  var n = t.contentType;
  return !n && e && e.name && (n = Gs.lookup(e.name)), !n && e && e.path && (n = Gs.lookup(e.path)), !n && e && e.readable && tn(e, "httpVersion") && (n = e.headers["content-type"]), !n && (t.filepath || t.filename) && (n = Gs.lookup(t.filepath || t.filename)), !n && e && typeof e == "object" && (n = ae.DEFAULT_CONTENT_TYPE), n;
};
ae.prototype._multiPartFooter = function() {
  return (function(e) {
    var t = ae.LINE_BREAK, n = this._streams.length === 0;
    n && (t += this._lastBoundary()), e(t);
  }).bind(this);
};
ae.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + ae.LINE_BREAK;
};
ae.prototype.getHeaders = function(e) {
  var t, n = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (t in e)
    tn(e, t) && (n[t.toLowerCase()] = e[t]);
  return n;
};
ae.prototype.setBoundary = function(e) {
  if (typeof e != "string")
    throw new TypeError("FormData boundary must be a string");
  this._boundary = e;
};
ae.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
ae.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), t = this.getBoundary(), n = 0, r = this._streams.length; n < r; n++)
    typeof this._streams[n] != "function" && (Buffer.isBuffer(this._streams[n]) ? e = Buffer.concat([e, this._streams[n]]) : e = Buffer.concat([e, Buffer.from(this._streams[n])]), (typeof this._streams[n] != "string" || this._streams[n].substring(2, t.length + 2) !== t) && (e = Buffer.concat([e, Buffer.from(ae.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
ae.prototype._generateBoundary = function() {
  this._boundary = "--------------------------" + I_.randomBytes(12).toString("hex");
};
ae.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
ae.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
ae.prototype.getLength = function(e) {
  var t = this._overheadLength + this._valueLength;
  if (this._streams.length && (t += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, t));
    return;
  }
  N_.parallel(this._valuesToMeasure, this._lengthRetriever, function(n, r) {
    if (n) {
      e(n);
      return;
    }
    r.forEach(function(i) {
      t += i;
    }), e(null, t);
  });
};
ae.prototype.submit = function(e, t) {
  var n, r, i = { method: "post" };
  return typeof e == "string" ? (e = F_(e), r = Mc({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, i)) : (r = Mc(e, i), r.port || (r.port = r.protocol === "https:" ? 443 : 80)), r.headers = this.getHeaders(e.headers), r.protocol === "https:" ? n = P_.request(r) : n = O_.request(r), this.getLength((function(a, o) {
    if (a && a !== "Unknown stream") {
      this._error(a);
      return;
    }
    if (o && n.setHeader("Content-Length", o), this.pipe(n), t) {
      var s, c = function(f, l) {
        return n.removeListener("error", c), n.removeListener("response", s), t.call(this, f, l);
      };
      s = c.bind(this, null), n.on("error", c), n.on("response", s);
    }
  }).bind(this)), n;
};
ae.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
ae.prototype.toString = function() {
  return "[object FormData]";
};
$_(ae.prototype, "FormData");
var L_ = ae;
const Qh = /* @__PURE__ */ dl(L_);
function qc(e) {
  return P.isPlainObject(e) || P.isArray(e);
}
function Zh(e) {
  return P.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function uf(e, t, n) {
  return e ? e.concat(t).map(function(i, a) {
    return i = Zh(i), !n && a ? "[" + i + "]" : i;
  }).join(n ? "." : "") : t;
}
function U_(e) {
  return P.isArray(e) && !e.some(qc);
}
const B_ = P.toFlatObject(P, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ko(e, t, n) {
  if (!P.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (Qh || FormData)(), n = P.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(x, g) {
    return !P.isUndefined(g[x]);
  });
  const r = n.metaTokens, i = n.visitor || l, a = n.dots, o = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && P.isSpecCompliantForm(t);
  if (!P.isFunction(i))
    throw new TypeError("visitor must be a function");
  function f(v) {
    if (v === null) return "";
    if (P.isDate(v))
      return v.toISOString();
    if (P.isBoolean(v))
      return v.toString();
    if (!c && P.isBlob(v))
      throw new W("Blob is not supported. Use a Buffer instead.");
    return P.isArrayBuffer(v) || P.isTypedArray(v) ? c && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function l(v, x, g) {
    let y = v;
    if (v && !g && typeof v == "object") {
      if (P.endsWith(x, "{}"))
        x = r ? x : x.slice(0, -2), v = JSON.stringify(v);
      else if (P.isArray(v) && U_(v) || (P.isFileList(v) || P.endsWith(x, "[]")) && (y = P.toArray(v)))
        return x = Zh(x), y.forEach(function(T, D) {
          !(P.isUndefined(T) || T === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? uf([x], D, a) : o === null ? x : x + "[]",
            f(T)
          );
        }), !1;
    }
    return qc(v) ? !0 : (t.append(uf(g, x, a), f(v)), !1);
  }
  const u = [], d = Object.assign(B_, {
    defaultVisitor: l,
    convertValue: f,
    isVisitable: qc
  });
  function h(v, x) {
    if (!P.isUndefined(v)) {
      if (u.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + x.join("."));
      u.push(v), P.forEach(v, function(y, b) {
        (!(P.isUndefined(y) || y === null) && i.call(
          t,
          y,
          P.isString(b) ? b.trim() : b,
          x,
          d
        )) === !0 && h(y, x ? x.concat(b) : [b]);
      }), u.pop();
    }
  }
  if (!P.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
}
function pf(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function e0(e, t) {
  this._pairs = [], e && ko(e, this, t);
}
const t0 = e0.prototype;
t0.append = function(t, n) {
  this._pairs.push([t, n]);
};
t0.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, pf);
  } : pf;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function j_(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function jl(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || j_, i = P.isFunction(n) ? {
    serialize: n
  } : n, a = i && i.serialize;
  let o;
  if (a ? o = a(t, i) : o = P.isURLSearchParams(t) ? t.toString() : new e0(t, i).toString(r), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class ff {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    P.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Io = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0
}, M_ = ut.URLSearchParams, Ws = "abcdefghijklmnopqrstuvwxyz", df = "0123456789", n0 = {
  DIGIT: df,
  ALPHA: Ws,
  ALPHA_DIGIT: Ws + Ws.toUpperCase() + df
}, q_ = (e = 16, t = n0.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t, i = new Uint32Array(e);
  jn.randomFillSync(i);
  for (let a = 0; a < e; a++)
    n += t[i[a] % r];
  return n;
}, z_ = {
  isNode: !0,
  classes: {
    URLSearchParams: M_,
    FormData: Qh,
    Blob: typeof Blob < "u" && Blob || null
  },
  ALPHABET: n0,
  generateString: q_,
  protocols: ["http", "https", "file", "data"]
}, Ml = typeof window < "u" && typeof document < "u", zc = typeof navigator == "object" && navigator || void 0, H_ = Ml && (!zc || ["ReactNative", "NativeScript", "NS"].indexOf(zc.product) < 0), G_ = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", W_ = Ml && window.location.href || "http://localhost", V_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ml,
  hasStandardBrowserEnv: H_,
  hasStandardBrowserWebWorkerEnv: G_,
  navigator: zc,
  origin: W_
}, Symbol.toStringTag, { value: "Module" })), ye = {
  ...V_,
  ...z_
};
function Y_(e, t) {
  return ko(e, new ye.classes.URLSearchParams(), {
    visitor: function(n, r, i, a) {
      return ye.isNode && P.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function X_(e) {
  return P.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function K_(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const i = n.length;
  let a;
  for (r = 0; r < i; r++)
    a = n[r], t[a] = e[a];
  return t;
}
function r0(e) {
  function t(n, r, i, a) {
    let o = n[a++];
    if (o === "__proto__") return !0;
    const s = Number.isFinite(+o), c = a >= n.length;
    return o = !o && P.isArray(i) ? i.length : o, c ? (P.hasOwnProp(i, o) ? i[o] = [i[o], r] : i[o] = r, !s) : ((!i[o] || !P.isObject(i[o])) && (i[o] = []), t(n, r, i[o], a) && P.isArray(i[o]) && (i[o] = K_(i[o])), !s);
  }
  if (P.isFormData(e) && P.isFunction(e.entries)) {
    const n = {};
    return P.forEachEntry(e, (r, i) => {
      t(X_(r), i, n, 0);
    }), n;
  }
  return null;
}
function J_(e, t, n) {
  if (P.isString(e))
    try {
      return (t || JSON.parse)(e), P.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Mi = {
  transitional: Io,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", i = r.indexOf("application/json") > -1, a = P.isObject(t);
    if (a && P.isHTMLForm(t) && (t = new FormData(t)), P.isFormData(t))
      return i ? JSON.stringify(r0(t)) : t;
    if (P.isArrayBuffer(t) || P.isBuffer(t) || P.isStream(t) || P.isFile(t) || P.isBlob(t) || P.isReadableStream(t))
      return t;
    if (P.isArrayBufferView(t))
      return t.buffer;
    if (P.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (a) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Y_(t, this.formSerializer).toString();
      if ((s = P.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return ko(
          s ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return a || i ? (n.setContentType("application/json", !1), J_(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Mi.transitional, r = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (P.isResponse(t) || P.isReadableStream(t))
      return t;
    if (t && P.isString(t) && (r && !this.responseType || i)) {
      const o = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (s) {
        if (o)
          throw s.name === "SyntaxError" ? W.from(s, W.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ye.classes.FormData,
    Blob: ye.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
P.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Mi.headers[e] = {};
});
const Q_ = P.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Z_ = (e) => {
  const t = {};
  let n, r, i;
  return e && e.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), n = o.substring(0, i).trim().toLowerCase(), r = o.substring(i + 1).trim(), !(!n || t[n] && Q_[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, mf = Symbol("internals");
function Hr(e) {
  return e && String(e).trim().toLowerCase();
}
function Ma(e) {
  return e === !1 || e == null ? e : P.isArray(e) ? e.map(Ma) : String(e);
}
function eS(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const tS = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Vs(e, t, n, r, i) {
  if (P.isFunction(r))
    return r.call(this, t, n);
  if (i && (t = n), !!P.isString(t)) {
    if (P.isString(r))
      return t.indexOf(r) !== -1;
    if (P.isRegExp(r))
      return r.test(t);
  }
}
function nS(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function rS(e, t) {
  const n = P.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(i, a, o) {
        return this[r].call(this, t, i, a, o);
      },
      configurable: !0
    });
  });
}
let Ue = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const i = this;
    function a(s, c, f) {
      const l = Hr(c);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const u = P.findKey(i, l);
      (!u || i[u] === void 0 || f === !0 || f === void 0 && i[u] !== !1) && (i[u || c] = Ma(s));
    }
    const o = (s, c) => P.forEach(s, (f, l) => a(f, l, c));
    if (P.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (P.isString(t) && (t = t.trim()) && !tS(t))
      o(Z_(t), n);
    else if (P.isObject(t) && P.isIterable(t)) {
      let s = {}, c, f;
      for (const l of t) {
        if (!P.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        s[f = l[0]] = (c = s[f]) ? P.isArray(c) ? [...c, l[1]] : [c, l[1]] : l[1];
      }
      o(s, n);
    } else
      t != null && a(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Hr(t), t) {
      const r = P.findKey(this, t);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return eS(i);
        if (P.isFunction(n))
          return n.call(this, i, r);
        if (P.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Hr(t), t) {
      const r = P.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Vs(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let i = !1;
    function a(o) {
      if (o = Hr(o), o) {
        const s = P.findKey(r, o);
        s && (!n || Vs(r, r[s], s, n)) && (delete r[s], i = !0);
      }
    }
    return P.isArray(t) ? t.forEach(a) : a(t), i;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const a = n[r];
      (!t || Vs(this, this[a], a, t, !0)) && (delete this[a], i = !0);
    }
    return i;
  }
  normalize(t) {
    const n = this, r = {};
    return P.forEach(this, (i, a) => {
      const o = P.findKey(r, a);
      if (o) {
        n[o] = Ma(i), delete n[a];
        return;
      }
      const s = t ? nS(a) : String(a).trim();
      s !== a && delete n[a], n[s] = Ma(i), r[s] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return P.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = t && P.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(t) {
    const r = (this[mf] = this[mf] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function a(o) {
      const s = Hr(o);
      r[s] || (rS(i, o), r[s] = !0);
    }
    return P.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
Ue.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
P.reduceDescriptors(Ue.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
P.freezeMethods(Ue);
function Ys(e, t) {
  const n = this || Mi, r = t || n, i = Ue.from(r.headers);
  let a = r.data;
  return P.forEach(e, function(s) {
    a = s.call(n, a, i.normalize(), t ? t.status : void 0);
  }), i.normalize(), a;
}
function i0(e) {
  return !!(e && e.__CANCEL__);
}
let $n = class extends W {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, n, r) {
    super(t ?? "canceled", W.ERR_CANCELED, n, r), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function or(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new W(
    "Request failed with status code " + n.status,
    [W.ERR_BAD_REQUEST, W.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function iS(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function aS(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ql(e, t, n) {
  let r = !iS(t);
  return e && (r || n == !1) ? aS(e, t) : t;
}
var a0 = {}, oS = ut.parse, sS = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, cS = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function lS(e) {
  var t = typeof e == "string" ? oS(e) : e || {}, n = t.protocol, r = t.host, i = t.port;
  if (typeof r != "string" || !r || typeof n != "string" || (n = n.split(":", 1)[0], r = r.replace(/:\d*$/, ""), i = parseInt(i) || sS[n] || 0, !uS(r, i)))
    return "";
  var a = sr("npm_config_" + n + "_proxy") || sr(n + "_proxy") || sr("npm_config_proxy") || sr("all_proxy");
  return a && a.indexOf("://") === -1 && (a = n + "://" + a), a;
}
function uS(e, t) {
  var n = (sr("npm_config_no_proxy") || sr("no_proxy")).toLowerCase();
  return n ? n === "*" ? !1 : n.split(/[,\s]/).every(function(r) {
    if (!r)
      return !0;
    var i = r.match(/^(.+):(\d+)$/), a = i ? i[1] : r, o = i ? parseInt(i[2]) : 0;
    return o && o !== t ? !0 : /^[.*]/.test(a) ? (a.charAt(0) === "*" && (a = a.slice(1)), !cS.call(e, a)) : e !== a;
  }) : !0;
}
function sr(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
a0.getProxyForUrl = lS;
var zl = { exports: {} }, Hc = { exports: {} }, va = { exports: {} }, Xs, hf;
function pS() {
  if (hf) return Xs;
  hf = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, a = r * 365.25;
  Xs = function(l, u) {
    u = u || {};
    var d = typeof l;
    if (d === "string" && l.length > 0)
      return o(l);
    if (d === "number" && isFinite(l))
      return u.long ? c(l) : s(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var d = parseFloat(u[1]), h = (u[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * a;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function s(l) {
    var u = Math.abs(l);
    return u >= r ? Math.round(l / r) + "d" : u >= n ? Math.round(l / n) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var u = Math.abs(l);
    return u >= r ? f(l, u, r, "day") : u >= n ? f(l, u, n, "hour") : u >= t ? f(l, u, t, "minute") : u >= e ? f(l, u, e, "second") : l + " ms";
  }
  function f(l, u, d, h) {
    var v = u >= d * 1.5;
    return Math.round(l / d) + " " + h + (v ? "s" : "");
  }
  return Xs;
}
var Ks, xf;
function o0() {
  if (xf) return Ks;
  xf = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = f, r.disable = s, r.enable = a, r.enabled = c, r.humanize = pS(), r.destroy = l, Object.keys(t).forEach((u) => {
      r[u] = t[u];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(u) {
      let d = 0;
      for (let h = 0; h < u.length; h++)
        d = (d << 5) - d + u.charCodeAt(h), d |= 0;
      return r.colors[Math.abs(d) % r.colors.length];
    }
    r.selectColor = n;
    function r(u) {
      let d, h = null, v, x;
      function g(...y) {
        if (!g.enabled)
          return;
        const b = g, T = Number(/* @__PURE__ */ new Date()), D = T - (d || T);
        b.diff = D, b.prev = d, b.curr = T, d = T, y[0] = r.coerce(y[0]), typeof y[0] != "string" && y.unshift("%O");
        let U = 0;
        y[0] = y[0].replace(/%([a-zA-Z%])/g, ($, G) => {
          if ($ === "%%")
            return "%";
          U++;
          const S = r.formatters[G];
          if (typeof S == "function") {
            const M = y[U];
            $ = S.call(b, M), y.splice(U, 1), U--;
          }
          return $;
        }), r.formatArgs.call(b, y), (b.log || r.log).apply(b, y);
      }
      return g.namespace = u, g.useColors = r.useColors(), g.color = r.selectColor(u), g.extend = i, g.destroy = r.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (v !== r.namespaces && (v = r.namespaces, x = r.enabled(u)), x),
        set: (y) => {
          h = y;
        }
      }), typeof r.init == "function" && r.init(g), g;
    }
    function i(u, d) {
      const h = r(this.namespace + (typeof d > "u" ? ":" : d) + u);
      return h.log = this.log, h;
    }
    function a(u) {
      r.save(u), r.namespaces = u, r.names = [], r.skips = [];
      const d = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of d)
        h[0] === "-" ? r.skips.push(h.slice(1)) : r.names.push(h);
    }
    function o(u, d) {
      let h = 0, v = 0, x = -1, g = 0;
      for (; h < u.length; )
        if (v < d.length && (d[v] === u[h] || d[v] === "*"))
          d[v] === "*" ? (x = v, g = h, v++) : (h++, v++);
        else if (x !== -1)
          v = x + 1, g++, h = g;
        else
          return !1;
      for (; v < d.length && d[v] === "*"; )
        v++;
      return v === d.length;
    }
    function s() {
      const u = [
        ...r.names,
        ...r.skips.map((d) => "-" + d)
      ].join(",");
      return r.enable(""), u;
    }
    function c(u) {
      for (const d of r.skips)
        if (o(u, d))
          return !1;
      for (const d of r.names)
        if (o(u, d))
          return !0;
      return !1;
    }
    function f(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Ks = e, Ks;
}
var vf;
function fS() {
  return vf || (vf = 1, function(e, t) {
    t.formatArgs = r, t.save = i, t.load = a, t.useColors = n, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
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
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      c.splice(1, 0, f, "color: inherit");
      let l = 0, u = 0;
      c[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (l++, d === "%c" && (u = l));
      }), c.splice(u, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function a() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = o0()(t);
    const { formatters: s } = e.exports;
    s.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(va, va.exports)), va.exports;
}
var ga = { exports: {} }, Js, gf;
function dS() {
  return gf || (gf = 1, Js = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), Js;
}
var Qs, yf;
function mS() {
  if (yf) return Qs;
  yf = 1;
  const e = po, t = Om, n = dS(), { env: r } = process;
  let i;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? i = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? i = 1 : r.FORCE_COLOR === "false" ? i = 0 : i = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function a(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function o(c, f) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (c && !f && i === void 0)
      return 0;
    const l = i || 0;
    if (r.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in r) || r.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const u = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : l;
  }
  function s(c) {
    const f = o(c, c && c.isTTY);
    return a(f);
  }
  return Qs = {
    supportsColor: s,
    stdout: a(o(!0, t.isatty(1))),
    stderr: a(o(!0, t.isatty(2)))
  }, Qs;
}
var bf;
function hS() {
  return bf || (bf = 1, function(e, t) {
    const n = Om, r = Fe;
    t.init = l, t.log = s, t.formatArgs = a, t.save = c, t.load = f, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = mS();
      d && (d.stderr || d).level >= 2 && (t.colors = [
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
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, h) => {
      const v = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, y) => y.toUpperCase());
      let x = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(x) ? x = !0 : /^(no|off|false|disabled)$/i.test(x) ? x = !1 : x === "null" ? x = null : x = Number(x), d[v] = x, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function a(d) {
      const { namespace: h, useColors: v } = this;
      if (v) {
        const x = this.color, g = "\x1B[3" + (x < 8 ? x : "8;5;" + x), y = `  ${g};1m${h} \x1B[0m`;
        d[0] = y + d[0].split(`
`).join(`
` + y), d.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = o() + h + " " + d[0];
    }
    function o() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...d) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function c(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function l(d) {
      d.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let v = 0; v < h.length; v++)
        d.inspectOpts[h[v]] = t.inspectOpts[h[v]];
    }
    e.exports = o0()(t);
    const { formatters: u } = e.exports;
    u.o = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, u.O = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts);
    };
  }(ga, ga.exports)), ga.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Hc.exports = fS() : Hc.exports = hS();
var s0 = Hc.exports, Gr, xS = function() {
  if (!Gr) {
    try {
      Gr = s0("follow-redirects");
    } catch {
    }
    typeof Gr != "function" && (Gr = function() {
    });
  }
  Gr.apply(null, arguments);
}, qi = ut, oi = qi.URL, vS = uo, gS = fl, Hl = le.Writable, Gl = ul, c0 = xS;
(function() {
  var t = typeof process < "u", n = typeof window < "u" && typeof document < "u", r = Ln(Error.captureStackTrace);
  !t && (n || !r) && console.warn("The follow-redirects package should be excluded from browser builds.");
})();
var Wl = !1;
try {
  Gl(new oi(""));
} catch (e) {
  Wl = e.code === "ERR_INVALID_URL";
}
var yS = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash"
], Vl = ["abort", "aborted", "connect", "error", "socket", "timeout"], Yl = /* @__PURE__ */ Object.create(null);
Vl.forEach(function(e) {
  Yl[e] = function(t, n, r) {
    this._redirectable.emit(e, t, n, r);
  };
});
var Gc = zi(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), Wc = zi(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), bS = zi(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  Wc
), wS = zi(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), ES = zi(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), _S = Hl.prototype.destroy || u0;
function nt(e, t) {
  Hl.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], t && this.on("response", t);
  var n = this;
  this._onNativeResponse = function(r) {
    try {
      n._processResponse(r);
    } catch (i) {
      n.emit("error", i instanceof Wc ? i : new Wc({ cause: i }));
    }
  }, this._performRequest();
}
nt.prototype = Object.create(Hl.prototype);
nt.prototype.abort = function() {
  Kl(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
nt.prototype.destroy = function(e) {
  return Kl(this._currentRequest, e), _S.call(this, e), this;
};
nt.prototype.write = function(e, t, n) {
  if (this._ending)
    throw new ES();
  if (!Dn(e) && !TS(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (Ln(t) && (n = t, t = null), e.length === 0) {
    n && n();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: t }), this._currentRequest.write(e, t, n)) : (this.emit("error", new wS()), this.abort());
};
nt.prototype.end = function(e, t, n) {
  if (Ln(e) ? (n = e, e = t = null) : Ln(t) && (n = t, t = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, n);
  else {
    var r = this, i = this._currentRequest;
    this.write(e, t, function() {
      r._ended = !0, i.end(null, null, n);
    }), this._ending = !0;
  }
};
nt.prototype.setHeader = function(e, t) {
  this._options.headers[e] = t, this._currentRequest.setHeader(e, t);
};
nt.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
nt.prototype.setTimeout = function(e, t) {
  var n = this;
  function r(o) {
    o.setTimeout(e), o.removeListener("timeout", o.destroy), o.addListener("timeout", o.destroy);
  }
  function i(o) {
    n._timeout && clearTimeout(n._timeout), n._timeout = setTimeout(function() {
      n.emit("timeout"), a();
    }, e), r(o);
  }
  function a() {
    n._timeout && (clearTimeout(n._timeout), n._timeout = null), n.removeListener("abort", a), n.removeListener("error", a), n.removeListener("response", a), n.removeListener("close", a), t && n.removeListener("timeout", t), n.socket || n._currentRequest.removeListener("socket", i);
  }
  return t && this.on("timeout", t), this.socket ? i(this.socket) : this._currentRequest.once("socket", i), this.on("socket", r), this.on("abort", a), this.on("error", a), this.on("response", a), this.on("close", a), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  nt.prototype[e] = function(t, n) {
    return this._currentRequest[e](t, n);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(nt.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
nt.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var t = e.path.indexOf("?");
    t < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, t), e.search = e.path.substring(t));
  }
};
nt.prototype._performRequest = function() {
  var e = this._options.protocol, t = this._options.nativeProtocols[e];
  if (!t)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var n = e.slice(0, -1);
    this._options.agent = this._options.agents[n];
  }
  var r = this._currentRequest = t.request(this._options, this._onNativeResponse);
  r._redirectable = this;
  for (var i of Vl)
    r.on(i, Yl[i]);
  if (this._currentUrl = /^\//.test(this._options.path) ? qi.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var a = 0, o = this, s = this._requestBodyBuffers;
    (function c(f) {
      if (r === o._currentRequest)
        if (f)
          o.emit("error", f);
        else if (a < s.length) {
          var l = s[a++];
          r.finished || r.write(l.data, l.encoding, c);
        } else o._ended && r.end();
    })();
  }
};
nt.prototype._processResponse = function(e) {
  var t = e.statusCode;
  this._options.trackRedirects && this._redirects.push({
    url: this._currentUrl,
    headers: e.headers,
    statusCode: t
  });
  var n = e.headers.location;
  if (!n || this._options.followRedirects === !1 || t < 300 || t >= 400) {
    e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
    return;
  }
  if (Kl(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new bS();
  var r, i = this._options.beforeRedirect;
  i && (r = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var a = this._options.method;
  ((t === 301 || t === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  t === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], Zs(/^content-/i, this._options.headers));
  var o = Zs(/^host$/i, this._options.headers), s = Xl(this._currentUrl), c = o || s.host, f = /^\w+:/.test(n) ? this._currentUrl : qi.format(Object.assign(s, { host: c })), l = SS(n, f);
  if (c0("redirecting to", l.href), this._isRedirect = !0, Vc(l, this._options), (l.protocol !== s.protocol && l.protocol !== "https:" || l.host !== c && !AS(l.host, c)) && Zs(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), Ln(i)) {
    var u = {
      headers: e.headers,
      statusCode: t
    }, d = {
      url: f,
      method: a,
      headers: r
    };
    i(this._options, u, d), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function l0(e) {
  var t = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, n = {};
  return Object.keys(e).forEach(function(r) {
    var i = r + ":", a = n[i] = e[r], o = t[r] = Object.create(a);
    function s(f, l, u) {
      return RS(f) ? f = Vc(f) : Dn(f) ? f = Vc(Xl(f)) : (u = l, l = p0(f), f = { protocol: i }), Ln(l) && (u = l, l = null), l = Object.assign({
        maxRedirects: t.maxRedirects,
        maxBodyLength: t.maxBodyLength
      }, f, l), l.nativeProtocols = n, !Dn(l.host) && !Dn(l.hostname) && (l.hostname = "::1"), Gl.equal(l.protocol, i, "protocol mismatch"), c0("options", l), new nt(l, u);
    }
    function c(f, l, u) {
      var d = o.request(f, l, u);
      return d.end(), d;
    }
    Object.defineProperties(o, {
      request: { value: s, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: c, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), t;
}
function u0() {
}
function Xl(e) {
  var t;
  if (Wl)
    t = new oi(e);
  else if (t = p0(qi.parse(e)), !Dn(t.protocol))
    throw new Gc({ input: e });
  return t;
}
function SS(e, t) {
  return Wl ? new oi(e, t) : Xl(qi.resolve(t, e));
}
function p0(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new Gc({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new Gc({ input: e.href || e });
  return e;
}
function Vc(e, t) {
  var n = t || {};
  for (var r of yS)
    n[r] = e[r];
  return n.hostname.startsWith("[") && (n.hostname = n.hostname.slice(1, -1)), n.port !== "" && (n.port = Number(n.port)), n.path = n.search ? n.pathname + n.search : n.pathname, n;
}
function Zs(e, t) {
  var n;
  for (var r in t)
    e.test(r) && (n = t[r], delete t[r]);
  return n === null || typeof n > "u" ? void 0 : String(n).trim();
}
function zi(e, t, n) {
  function r(i) {
    Ln(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, i || {}), this.code = e, this.message = this.cause ? t + ": " + this.cause.message : t;
  }
  return r.prototype = new (n || Error)(), Object.defineProperties(r.prototype, {
    constructor: {
      value: r,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), r;
}
function Kl(e, t) {
  for (var n of Vl)
    e.removeListener(n, Yl[n]);
  e.on("error", u0), e.destroy(t);
}
function AS(e, t) {
  Gl(Dn(e) && Dn(t));
  var n = e.length - t.length - 1;
  return n > 0 && e[n] === "." && e.endsWith(t);
}
function Dn(e) {
  return typeof e == "string" || e instanceof String;
}
function Ln(e) {
  return typeof e == "function";
}
function TS(e) {
  return typeof e == "object" && "length" in e;
}
function RS(e) {
  return oi && e instanceof oi;
}
zl.exports = l0({ http: vS, https: gS });
zl.exports.wrap = l0;
var CS = zl.exports;
const OS = /* @__PURE__ */ dl(CS), Ka = "1.13.5";
function f0(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
const PS = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function FS(e, t, n) {
  const r = n && n.Blob || ye.classes.Blob, i = f0(e);
  if (t === void 0 && r && (t = !0), i === "data") {
    e = i.length ? e.slice(i.length + 1) : e;
    const a = PS.exec(e);
    if (!a)
      throw new W("Invalid URL", W.ERR_INVALID_URL);
    const o = a[1], s = a[2], c = a[3], f = Buffer.from(decodeURIComponent(c), s ? "base64" : "utf8");
    if (t) {
      if (!r)
        throw new W("Blob is not supported", W.ERR_NOT_SUPPORT);
      return new r([f], { type: o });
    }
    return f;
  }
  throw new W("Unsupported protocol " + i, W.ERR_NOT_SUPPORT);
}
const ec = Symbol("internals");
class wf extends le.Transform {
  constructor(t) {
    t = P.toFlatObject(t, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (r, i) => !P.isUndefined(i[r])), super({
      readableHighWaterMark: t.chunkSize
    });
    const n = this[ec] = {
      timeWindow: t.timeWindow,
      chunkSize: t.chunkSize,
      maxRate: t.maxRate,
      minChunkSize: t.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (r) => {
      r === "progress" && (n.isCaptured || (n.isCaptured = !0));
    });
  }
  _read(t) {
    const n = this[ec];
    return n.onReadCallback && n.onReadCallback(), super._read(t);
  }
  _transform(t, n, r) {
    const i = this[ec], a = i.maxRate, o = this.readableHighWaterMark, s = i.timeWindow, c = 1e3 / s, f = a / c, l = i.minChunkSize !== !1 ? Math.max(i.minChunkSize, f * 0.01) : 0, u = (h, v) => {
      const x = Buffer.byteLength(h);
      i.bytesSeen += x, i.bytes += x, i.isCaptured && this.emit("progress", i.bytesSeen), this.push(h) ? process.nextTick(v) : i.onReadCallback = () => {
        i.onReadCallback = null, process.nextTick(v);
      };
    }, d = (h, v) => {
      const x = Buffer.byteLength(h);
      let g = null, y = o, b, T = 0;
      if (a) {
        const D = Date.now();
        (!i.ts || (T = D - i.ts) >= s) && (i.ts = D, b = f - i.bytes, i.bytes = b < 0 ? -b : 0, T = 0), b = f - i.bytes;
      }
      if (a) {
        if (b <= 0)
          return setTimeout(() => {
            v(null, h);
          }, s - T);
        b < y && (y = b);
      }
      y && x > y && x - y > l && (g = h.subarray(y), h = h.subarray(0, y)), u(h, g ? () => {
        process.nextTick(v, null, g);
      } : v);
    };
    d(t, function h(v, x) {
      if (v)
        return r(v);
      x ? d(x, h) : r(null);
    });
  }
}
const { asyncIterator: Ef } = Symbol, d0 = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[Ef] ? yield* e[Ef]() : yield e;
}, DS = ye.ALPHABET.ALPHA_DIGIT + "-_", si = typeof TextEncoder == "function" ? new TextEncoder() : new Fe.TextEncoder(), Tn = `\r
`, kS = si.encode(Tn), IS = 2;
class NS {
  constructor(t, n) {
    const { escapeName: r } = this.constructor, i = P.isString(n);
    let a = `Content-Disposition: form-data; name="${r(t)}"${!i && n.name ? `; filename="${r(n.name)}"` : ""}${Tn}`;
    i ? n = si.encode(String(n).replace(/\r?\n|\r\n?/g, Tn)) : a += `Content-Type: ${n.type || "application/octet-stream"}${Tn}`, this.headers = si.encode(a + Tn), this.contentLength = i ? n.byteLength : n.size, this.size = this.headers.byteLength + this.contentLength + IS, this.name = t, this.value = n;
  }
  async *encode() {
    yield this.headers;
    const { value: t } = this;
    P.isTypedArray(t) ? yield t : yield* d0(t), yield kS;
  }
  static escapeName(t) {
    return String(t).replace(/[\r\n"]/g, (n) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[n]);
  }
}
const $S = (e, t, n) => {
  const {
    tag: r = "form-data-boundary",
    size: i = 25,
    boundary: a = r + "-" + ye.generateString(i, DS)
  } = n || {};
  if (!P.isFormData(e))
    throw TypeError("FormData instance required");
  if (a.length < 1 || a.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const o = si.encode("--" + a + Tn), s = si.encode("--" + a + "--" + Tn);
  let c = s.byteLength;
  const f = Array.from(e.entries()).map(([u, d]) => {
    const h = new NS(u, d);
    return c += h.size, h;
  });
  c += o.byteLength * f.length, c = P.toFiniteNumber(c);
  const l = {
    "Content-Type": `multipart/form-data; boundary=${a}`
  };
  return Number.isFinite(c) && (l["Content-Length"] = c), t && t(l), Fg.from(async function* () {
    for (const u of f)
      yield o, yield* u.encode();
    yield s;
  }());
};
class LS extends le.Transform {
  __transform(t, n, r) {
    this.push(t), r();
  }
  _transform(t, n, r) {
    if (t.length !== 0 && (this._transform = this.__transform, t[0] !== 120)) {
      const i = Buffer.alloc(2);
      i[0] = 120, i[1] = 156, this.push(i, n);
    }
    this.__transform(t, n, r);
  }
}
const US = (e, t) => P.isAsyncFn(e) ? function(...n) {
  const r = n.pop();
  e.apply(this, n).then((i) => {
    try {
      t ? r(null, ...t(i)) : r(null, i);
    } catch (a) {
      r(a);
    }
  }, r);
} : e;
function BS(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let i = 0, a = 0, o;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const f = Date.now(), l = r[a];
    o || (o = f), n[i] = c, r[i] = f;
    let u = a, d = 0;
    for (; u !== i; )
      d += n[u++], u = u % e;
    if (i = (i + 1) % e, i === a && (a = (a + 1) % e), f - o < t)
      return;
    const h = l && f - l;
    return h ? Math.round(d * 1e3 / h) : void 0;
  };
}
function jS(e, t) {
  let n = 0, r = 1e3 / t, i, a;
  const o = (f, l = Date.now()) => {
    n = l, i = null, a && (clearTimeout(a), a = null), e(...f);
  };
  return [(...f) => {
    const l = Date.now(), u = l - n;
    u >= r ? o(f, l) : (i = f, a || (a = setTimeout(() => {
      a = null, o(i);
    }, r - u)));
  }, () => i && o(i)];
}
const Er = (e, t, n = 3) => {
  let r = 0;
  const i = BS(50, 250);
  return jS((a) => {
    const o = a.loaded, s = a.lengthComputable ? a.total : void 0, c = o - r, f = i(c), l = o <= s;
    r = o;
    const u = {
      loaded: o,
      total: s,
      progress: s ? o / s : void 0,
      bytes: c,
      rate: f || void 0,
      estimated: f && s && l ? (s - o) / f : void 0,
      event: a,
      lengthComputable: s != null,
      [t ? "download" : "upload"]: !0
    };
    e(u);
  }, n);
}, Ja = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Qa = (e) => (...t) => P.asap(() => e(...t));
function MS(e) {
  if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
  const t = e.indexOf(",");
  if (t < 0) return 0;
  const n = e.slice(5, t), r = e.slice(t + 1);
  if (/;base64/i.test(n)) {
    let a = r.length;
    const o = r.length;
    for (let d = 0; d < o; d++)
      if (r.charCodeAt(d) === 37 && d + 2 < o) {
        const h = r.charCodeAt(d + 1), v = r.charCodeAt(d + 2);
        (h >= 48 && h <= 57 || h >= 65 && h <= 70 || h >= 97 && h <= 102) && (v >= 48 && v <= 57 || v >= 65 && v <= 70 || v >= 97 && v <= 102) && (a -= 2, d += 2);
      }
    let s = 0, c = o - 1;
    const f = (d) => d >= 2 && r.charCodeAt(d - 2) === 37 && // '%'
    r.charCodeAt(d - 1) === 51 && // '3'
    (r.charCodeAt(d) === 68 || r.charCodeAt(d) === 100);
    c >= 0 && (r.charCodeAt(c) === 61 ? (s++, c--) : f(c) && (s++, c -= 3)), s === 1 && c >= 0 && (r.charCodeAt(c) === 61 || f(c)) && s++;
    const u = Math.floor(a / 4) * 3 - (s || 0);
    return u > 0 ? u : 0;
  }
  return Buffer.byteLength(r, "utf8");
}
const _f = {
  flush: lt.constants.Z_SYNC_FLUSH,
  finishFlush: lt.constants.Z_SYNC_FLUSH
}, qS = {
  flush: lt.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: lt.constants.BROTLI_OPERATION_FLUSH
}, Sf = P.isFunction(lt.createBrotliDecompress), { http: zS, https: HS } = OS, GS = /https:?/, Af = ye.protocols.map((e) => e + ":"), Tf = (e, [t, n]) => (e.on("end", n).on("error", n), t);
class WS {
  constructor() {
    this.sessions = /* @__PURE__ */ Object.create(null);
  }
  getSession(t, n) {
    n = Object.assign({
      sessionTimeout: 1e3
    }, n);
    let r = this.sessions[t];
    if (r) {
      let l = r.length;
      for (let u = 0; u < l; u++) {
        const [d, h] = r[u];
        if (!d.destroyed && !d.closed && Fe.isDeepStrictEqual(h, n))
          return d;
      }
    }
    const i = Cm.connect(t, n);
    let a;
    const o = () => {
      if (a)
        return;
      a = !0;
      let l = r, u = l.length, d = u;
      for (; d--; )
        if (l[d][0] === i) {
          u === 1 ? delete this.sessions[t] : l.splice(d, 1);
          return;
        }
    }, s = i.request, { sessionTimeout: c } = n;
    if (c != null) {
      let l, u = 0;
      i.request = function() {
        const d = s.apply(this, arguments);
        return u++, l && (clearTimeout(l), l = null), d.once("close", () => {
          --u || (l = setTimeout(() => {
            l = null, o();
          }, c));
        }), d;
      };
    }
    i.once("close", o);
    let f = [
      i,
      n
    ];
    return r ? r.push(f) : r = this.sessions[t] = [f], i;
  }
}
const VS = new WS();
function YS(e, t) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, t);
}
function m0(e, t, n) {
  let r = t;
  if (!r && r !== !1) {
    const i = a0.getProxyForUrl(n);
    i && (r = new URL(i));
  }
  if (r) {
    if (r.username && (r.auth = (r.username || "") + ":" + (r.password || "")), r.auth) {
      if (!!(r.auth.username || r.auth.password))
        r.auth = (r.auth.username || "") + ":" + (r.auth.password || "");
      else if (typeof r.auth == "object")
        throw new W("Invalid proxy authorization", W.ERR_BAD_OPTION, { proxy: r });
      const o = Buffer.from(r.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + o;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const i = r.hostname || r.host;
    e.hostname = i, e.host = i, e.port = r.port, e.path = n, r.protocol && (e.protocol = r.protocol.includes(":") ? r.protocol : `${r.protocol}:`);
  }
  e.beforeRedirects.proxy = function(a) {
    m0(a, t, a.href);
  };
}
const XS = typeof process < "u" && P.kindOf(process) === "process", KS = (e) => new Promise((t, n) => {
  let r, i;
  const a = (c, f) => {
    i || (i = !0, r && r(c, f));
  }, o = (c) => {
    a(c), t(c);
  }, s = (c) => {
    a(c, !0), n(c);
  };
  e(o, s, (c) => r = c).catch(s);
}), JS = ({ address: e, family: t }) => {
  if (!P.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: t || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, Rf = (e, t) => JS(P.isObject(e) ? e : { address: e, family: t }), QS = {
  request(e, t) {
    const n = e.protocol + "//" + e.hostname + ":" + (e.port || (e.protocol === "https:" ? 443 : 80)), { http2Options: r, headers: i } = e, a = VS.getSession(n, r), {
      HTTP2_HEADER_SCHEME: o,
      HTTP2_HEADER_METHOD: s,
      HTTP2_HEADER_PATH: c,
      HTTP2_HEADER_STATUS: f
    } = Cm.constants, l = {
      [o]: e.protocol.replace(":", ""),
      [s]: e.method,
      [c]: e.path
    };
    P.forEach(i, (d, h) => {
      h.charAt(0) !== ":" && (l[h] = d);
    });
    const u = a.request(l);
    return u.once("response", (d) => {
      const h = u;
      d = Object.assign({}, d);
      const v = d[f];
      delete d[f], h.headers = d, h.statusCode = +v, t(h);
    }), u;
  }
}, ZS = XS && function(t) {
  return KS(async function(r, i, a) {
    let { data: o, lookup: s, family: c, httpVersion: f = 1, http2Options: l } = t;
    const { responseType: u, responseEncoding: d } = t, h = t.method.toUpperCase();
    let v, x = !1, g;
    if (f = +f, Number.isNaN(f))
      throw TypeError(`Invalid protocol version: '${t.httpVersion}' is not a number`);
    if (f !== 1 && f !== 2)
      throw TypeError(`Unsupported protocol version '${f}'`);
    const y = f === 2;
    if (s) {
      const F = US(s, (I) => P.isArray(I) ? I : [I]);
      s = (I, j, Z) => {
        F(I, j, (ee, V, se) => {
          if (ee)
            return Z(ee);
          const m = P.isArray(V) ? V.map((p) => Rf(p)) : [Rf(V, se)];
          j.all ? Z(ee, m) : Z(ee, m[0].address, m[0].family);
        });
      };
    }
    const b = new Dg();
    function T(F) {
      try {
        b.emit("abort", !F || F.type ? new $n(null, t, g) : F);
      } catch (I) {
        console.warn("emit error", I);
      }
    }
    b.once("abort", i);
    const D = () => {
      t.cancelToken && t.cancelToken.unsubscribe(T), t.signal && t.signal.removeEventListener("abort", T), b.removeAllListeners();
    };
    (t.cancelToken || t.signal) && (t.cancelToken && t.cancelToken.subscribe(T), t.signal && (t.signal.aborted ? T() : t.signal.addEventListener("abort", T))), a((F, I) => {
      if (v = !0, I) {
        x = !0, D();
        return;
      }
      const { data: j } = F;
      if (j instanceof le.Readable || j instanceof le.Duplex) {
        const Z = le.finished(j, () => {
          Z(), D();
        });
      } else
        D();
    });
    const U = ql(t.baseURL, t.url, t.allowAbsoluteUrls), k = new URL(U, ye.hasBrowserEnv ? ye.origin : void 0), $ = k.protocol || Af[0];
    if ($ === "data:") {
      if (t.maxContentLength > -1) {
        const I = String(t.url || U || "");
        if (MS(I) > t.maxContentLength)
          return i(new W(
            "maxContentLength size of " + t.maxContentLength + " exceeded",
            W.ERR_BAD_RESPONSE,
            t
          ));
      }
      let F;
      if (h !== "GET")
        return or(r, i, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: t
        });
      try {
        F = FS(t.url, u === "blob", {
          Blob: t.env && t.env.Blob
        });
      } catch (I) {
        throw W.from(I, W.ERR_BAD_REQUEST, t);
      }
      return u === "text" ? (F = F.toString(d), (!d || d === "utf8") && (F = P.stripBOM(F))) : u === "stream" && (F = le.Readable.from(F)), or(r, i, {
        data: F,
        status: 200,
        statusText: "OK",
        headers: new Ue(),
        config: t
      });
    }
    if (Af.indexOf($) === -1)
      return i(new W(
        "Unsupported protocol " + $,
        W.ERR_BAD_REQUEST,
        t
      ));
    const G = Ue.from(t.headers).normalize();
    G.set("User-Agent", "axios/" + Ka, !1);
    const { onUploadProgress: S, onDownloadProgress: M } = t, H = t.maxRate;
    let z, J;
    if (P.isSpecCompliantForm(o)) {
      const F = G.getContentType(/boundary=([-_\w\d]{10,70})/i);
      o = $S(o, (I) => {
        G.set(I);
      }, {
        tag: `axios-${Ka}-boundary`,
        boundary: F && F[1] || void 0
      });
    } else if (P.isFormData(o) && P.isFunction(o.getHeaders)) {
      if (G.set(o.getHeaders()), !G.hasContentLength())
        try {
          const F = await Fe.promisify(o.getLength).call(o);
          Number.isFinite(F) && F >= 0 && G.setContentLength(F);
        } catch {
        }
    } else if (P.isBlob(o) || P.isFile(o))
      o.size && G.setContentType(o.type || "application/octet-stream"), G.setContentLength(o.size || 0), o = le.Readable.from(d0(o));
    else if (o && !P.isStream(o)) {
      if (!Buffer.isBuffer(o)) if (P.isArrayBuffer(o))
        o = Buffer.from(new Uint8Array(o));
      else if (P.isString(o))
        o = Buffer.from(o, "utf-8");
      else
        return i(new W(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          W.ERR_BAD_REQUEST,
          t
        ));
      if (G.setContentLength(o.length, !1), t.maxBodyLength > -1 && o.length > t.maxBodyLength)
        return i(new W(
          "Request body larger than maxBodyLength limit",
          W.ERR_BAD_REQUEST,
          t
        ));
    }
    const L = P.toFiniteNumber(G.getContentLength());
    P.isArray(H) ? (z = H[0], J = H[1]) : z = J = H, o && (S || z) && (P.isStream(o) || (o = le.Readable.from(o, { objectMode: !1 })), o = le.pipeline([o, new wf({
      maxRate: P.toFiniteNumber(z)
    })], P.noop), S && o.on("progress", Tf(
      o,
      Ja(
        L,
        Er(Qa(S), !1, 3)
      )
    )));
    let N;
    if (t.auth) {
      const F = t.auth.username || "", I = t.auth.password || "";
      N = F + ":" + I;
    }
    if (!N && k.username) {
      const F = k.username, I = k.password;
      N = F + ":" + I;
    }
    N && G.delete("authorization");
    let B;
    try {
      B = jl(
        k.pathname + k.search,
        t.params,
        t.paramsSerializer
      ).replace(/^\?/, "");
    } catch (F) {
      const I = new Error(F.message);
      return I.config = t, I.url = t.url, I.exists = !0, i(I);
    }
    G.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (Sf ? ", br" : ""),
      !1
    );
    const w = {
      path: B,
      method: h,
      headers: G.toJSON(),
      agents: { http: t.httpAgent, https: t.httpsAgent },
      auth: N,
      protocol: $,
      family: c,
      beforeRedirect: YS,
      beforeRedirects: {},
      http2Options: l
    };
    !P.isUndefined(s) && (w.lookup = s), t.socketPath ? w.socketPath = t.socketPath : (w.hostname = k.hostname.startsWith("[") ? k.hostname.slice(1, -1) : k.hostname, w.port = k.port, m0(w, t.proxy, $ + "//" + k.hostname + (k.port ? ":" + k.port : "") + w.path));
    let A;
    const C = GS.test(w.protocol);
    if (w.agent = C ? t.httpsAgent : t.httpAgent, y ? A = QS : t.transport ? A = t.transport : t.maxRedirects === 0 ? A = C ? fl : uo : (t.maxRedirects && (w.maxRedirects = t.maxRedirects), t.beforeRedirect && (w.beforeRedirects.config = t.beforeRedirect), A = C ? HS : zS), t.maxBodyLength > -1 ? w.maxBodyLength = t.maxBodyLength : w.maxBodyLength = 1 / 0, t.insecureHTTPParser && (w.insecureHTTPParser = t.insecureHTTPParser), g = A.request(w, function(I) {
      if (g.destroyed) return;
      const j = [I], Z = P.toFiniteNumber(I.headers["content-length"]);
      if (M || J) {
        const m = new wf({
          maxRate: P.toFiniteNumber(J)
        });
        M && m.on("progress", Tf(
          m,
          Ja(
            Z,
            Er(Qa(M), !0, 3)
          )
        )), j.push(m);
      }
      let ee = I;
      const V = I.req || g;
      if (t.decompress !== !1 && I.headers["content-encoding"])
        switch ((h === "HEAD" || I.statusCode === 204) && delete I.headers["content-encoding"], (I.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            j.push(lt.createUnzip(_f)), delete I.headers["content-encoding"];
            break;
          case "deflate":
            j.push(new LS()), j.push(lt.createUnzip(_f)), delete I.headers["content-encoding"];
            break;
          case "br":
            Sf && (j.push(lt.createBrotliDecompress(qS)), delete I.headers["content-encoding"]);
        }
      ee = j.length > 1 ? le.pipeline(j, P.noop) : j[0];
      const se = {
        status: I.statusCode,
        statusText: I.statusMessage,
        headers: new Ue(I.headers),
        config: t,
        request: V
      };
      if (u === "stream")
        se.data = ee, or(r, i, se);
      else {
        const m = [];
        let p = 0;
        ee.on("data", function(_) {
          m.push(_), p += _.length, t.maxContentLength > -1 && p > t.maxContentLength && (x = !0, ee.destroy(), T(new W(
            "maxContentLength size of " + t.maxContentLength + " exceeded",
            W.ERR_BAD_RESPONSE,
            t,
            V
          )));
        }), ee.on("aborted", function() {
          if (x)
            return;
          const _ = new W(
            "stream has been aborted",
            W.ERR_BAD_RESPONSE,
            t,
            V
          );
          ee.destroy(_), i(_);
        }), ee.on("error", function(_) {
          g.destroyed || i(W.from(_, null, t, V));
        }), ee.on("end", function() {
          try {
            let _ = m.length === 1 ? m[0] : Buffer.concat(m);
            u !== "arraybuffer" && (_ = _.toString(d), (!d || d === "utf8") && (_ = P.stripBOM(_))), se.data = _;
          } catch (_) {
            return i(W.from(_, null, t, se.request, se));
          }
          or(r, i, se);
        });
      }
      b.once("abort", (m) => {
        ee.destroyed || (ee.emit("error", m), ee.destroy());
      });
    }), b.once("abort", (F) => {
      g.close ? g.close() : g.destroy(F);
    }), g.on("error", function(I) {
      i(W.from(I, null, t, g));
    }), g.on("socket", function(I) {
      I.setKeepAlive(!0, 1e3 * 60);
    }), t.timeout) {
      const F = parseInt(t.timeout, 10);
      if (Number.isNaN(F)) {
        T(new W(
          "error trying to parse `config.timeout` to int",
          W.ERR_BAD_OPTION_VALUE,
          t,
          g
        ));
        return;
      }
      g.setTimeout(F, function() {
        if (v) return;
        let j = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
        const Z = t.transitional || Io;
        t.timeoutErrorMessage && (j = t.timeoutErrorMessage), T(new W(
          j,
          Z.clarifyTimeoutError ? W.ETIMEDOUT : W.ECONNABORTED,
          t,
          g
        ));
      });
    } else
      g.setTimeout(0);
    if (P.isStream(o)) {
      let F = !1, I = !1;
      o.on("end", () => {
        F = !0;
      }), o.once("error", (j) => {
        I = !0, g.destroy(j);
      }), o.on("close", () => {
        !F && !I && T(new $n("Request stream has been aborted", t, g));
      }), o.pipe(g);
    } else
      o && g.write(o), g.end();
  });
}, eA = ye.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, ye.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(ye.origin),
  ye.navigator && /(msie|trident)/i.test(ye.navigator.userAgent)
) : () => !0, tA = ye.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, i, a, o) {
      if (typeof document > "u") return;
      const s = [`${e}=${encodeURIComponent(t)}`];
      P.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`), P.isString(r) && s.push(`path=${r}`), P.isString(i) && s.push(`domain=${i}`), a === !0 && s.push("secure"), P.isString(o) && s.push(`SameSite=${o}`), document.cookie = s.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), Cf = (e) => e instanceof Ue ? { ...e } : e;
function Un(e, t) {
  t = t || {};
  const n = {};
  function r(f, l, u, d) {
    return P.isPlainObject(f) && P.isPlainObject(l) ? P.merge.call({ caseless: d }, f, l) : P.isPlainObject(l) ? P.merge({}, l) : P.isArray(l) ? l.slice() : l;
  }
  function i(f, l, u, d) {
    if (P.isUndefined(l)) {
      if (!P.isUndefined(f))
        return r(void 0, f, u, d);
    } else return r(f, l, u, d);
  }
  function a(f, l) {
    if (!P.isUndefined(l))
      return r(void 0, l);
  }
  function o(f, l) {
    if (P.isUndefined(l)) {
      if (!P.isUndefined(f))
        return r(void 0, f);
    } else return r(void 0, l);
  }
  function s(f, l, u) {
    if (u in t)
      return r(f, l);
    if (u in e)
      return r(void 0, f);
  }
  const c = {
    url: a,
    method: a,
    data: a,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: s,
    headers: (f, l, u) => i(Cf(f), Cf(l), u, !0)
  };
  return P.forEach(
    Object.keys({ ...e, ...t }),
    function(l) {
      if (l === "__proto__" || l === "constructor" || l === "prototype")
        return;
      const u = P.hasOwnProp(c, l) ? c[l] : i, d = u(e[l], t[l], l);
      P.isUndefined(d) && u !== s || (n[l] = d);
    }
  ), n;
}
const h0 = (e) => {
  const t = Un({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: a, headers: o, auth: s } = t;
  if (t.headers = o = Ue.from(o), t.url = jl(ql(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), s && o.set(
    "Authorization",
    "Basic " + btoa((s.username || "") + ":" + (s.password ? unescape(encodeURIComponent(s.password)) : ""))
  ), P.isFormData(n)) {
    if (ye.hasStandardBrowserEnv || ye.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if (P.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(c).forEach(([l, u]) => {
        f.includes(l.toLowerCase()) && o.set(l, u);
      });
    }
  }
  if (ye.hasStandardBrowserEnv && (r && P.isFunction(r) && (r = r(t)), r || r !== !1 && eA(t.url))) {
    const c = i && a && tA.read(a);
    c && o.set(i, c);
  }
  return t;
}, nA = typeof XMLHttpRequest < "u", rA = nA && function(e) {
  return new Promise(function(n, r) {
    const i = h0(e);
    let a = i.data;
    const o = Ue.from(i.headers).normalize();
    let { responseType: s, onUploadProgress: c, onDownloadProgress: f } = i, l, u, d, h, v;
    function x() {
      h && h(), v && v(), i.cancelToken && i.cancelToken.unsubscribe(l), i.signal && i.signal.removeEventListener("abort", l);
    }
    let g = new XMLHttpRequest();
    g.open(i.method.toUpperCase(), i.url, !0), g.timeout = i.timeout;
    function y() {
      if (!g)
        return;
      const T = Ue.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), U = {
        data: !s || s === "text" || s === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: T,
        config: e,
        request: g
      };
      or(function($) {
        n($), x();
      }, function($) {
        r($), x();
      }, U), g = null;
    }
    "onloadend" in g ? g.onloadend = y : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(y);
    }, g.onabort = function() {
      g && (r(new W("Request aborted", W.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function(D) {
      const U = D && D.message ? D.message : "Network Error", k = new W(U, W.ERR_NETWORK, e, g);
      k.event = D || null, r(k), g = null;
    }, g.ontimeout = function() {
      let D = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const U = i.transitional || Io;
      i.timeoutErrorMessage && (D = i.timeoutErrorMessage), r(new W(
        D,
        U.clarifyTimeoutError ? W.ETIMEDOUT : W.ECONNABORTED,
        e,
        g
      )), g = null;
    }, a === void 0 && o.setContentType(null), "setRequestHeader" in g && P.forEach(o.toJSON(), function(D, U) {
      g.setRequestHeader(U, D);
    }), P.isUndefined(i.withCredentials) || (g.withCredentials = !!i.withCredentials), s && s !== "json" && (g.responseType = i.responseType), f && ([d, v] = Er(f, !0), g.addEventListener("progress", d)), c && g.upload && ([u, h] = Er(c), g.upload.addEventListener("progress", u), g.upload.addEventListener("loadend", h)), (i.cancelToken || i.signal) && (l = (T) => {
      g && (r(!T || T.type ? new $n(null, e, g) : T), g.abort(), g = null);
    }, i.cancelToken && i.cancelToken.subscribe(l), i.signal && (i.signal.aborted ? l() : i.signal.addEventListener("abort", l)));
    const b = f0(i.url);
    if (b && ye.protocols.indexOf(b) === -1) {
      r(new W("Unsupported protocol " + b + ":", W.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(a || null);
  });
}, iA = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), i;
    const a = function(f) {
      if (!i) {
        i = !0, s();
        const l = f instanceof Error ? f : this.reason;
        r.abort(l instanceof W ? l : new $n(l instanceof Error ? l.message : l));
      }
    };
    let o = t && setTimeout(() => {
      o = null, a(new W(`timeout of ${t}ms exceeded`, W.ETIMEDOUT));
    }, t);
    const s = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(a) : f.removeEventListener("abort", a);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", a));
    const { signal: c } = r;
    return c.unsubscribe = () => P.asap(s), c;
  }
}, aA = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, i;
  for (; r < n; )
    i = r + t, yield e.slice(r, i), r = i;
}, oA = async function* (e, t) {
  for await (const n of sA(e))
    yield* aA(n, t);
}, sA = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, Of = (e, t, n, r) => {
  const i = oA(e, t);
  let a = 0, o, s = (c) => {
    o || (o = !0, r && r(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: f, value: l } = await i.next();
        if (f) {
          s(), c.close();
          return;
        }
        let u = l.byteLength;
        if (n) {
          let d = a += u;
          n(d);
        }
        c.enqueue(new Uint8Array(l));
      } catch (f) {
        throw s(f), f;
      }
    },
    cancel(c) {
      return s(c), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, Pf = 64 * 1024, { isFunction: ya } = P, cA = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(P.global), {
  ReadableStream: Ff,
  TextEncoder: Df
} = P.global, kf = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, lA = (e) => {
  e = P.merge.call({
    skipUndefined: !0
  }, cA, e);
  const { fetch: t, Request: n, Response: r } = e, i = t ? ya(t) : typeof fetch == "function", a = ya(n), o = ya(r);
  if (!i)
    return !1;
  const s = i && ya(Ff), c = i && (typeof Df == "function" ? /* @__PURE__ */ ((v) => (x) => v.encode(x))(new Df()) : async (v) => new Uint8Array(await new n(v).arrayBuffer())), f = a && s && kf(() => {
    let v = !1;
    const x = new n(ye.origin, {
      body: new Ff(),
      method: "POST",
      get duplex() {
        return v = !0, "half";
      }
    }).headers.has("Content-Type");
    return v && !x;
  }), l = o && s && kf(() => P.isReadableStream(new r("").body)), u = {
    stream: l && ((v) => v.body)
  };
  i && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((v) => {
    !u[v] && (u[v] = (x, g) => {
      let y = x && x[v];
      if (y)
        return y.call(x);
      throw new W(`Response type '${v}' is not supported`, W.ERR_NOT_SUPPORT, g);
    });
  });
  const d = async (v) => {
    if (v == null)
      return 0;
    if (P.isBlob(v))
      return v.size;
    if (P.isSpecCompliantForm(v))
      return (await new n(ye.origin, {
        method: "POST",
        body: v
      }).arrayBuffer()).byteLength;
    if (P.isArrayBufferView(v) || P.isArrayBuffer(v))
      return v.byteLength;
    if (P.isURLSearchParams(v) && (v = v + ""), P.isString(v))
      return (await c(v)).byteLength;
  }, h = async (v, x) => {
    const g = P.toFiniteNumber(v.getContentLength());
    return g ?? d(x);
  };
  return async (v) => {
    let {
      url: x,
      method: g,
      data: y,
      signal: b,
      cancelToken: T,
      timeout: D,
      onDownloadProgress: U,
      onUploadProgress: k,
      responseType: $,
      headers: G,
      withCredentials: S = "same-origin",
      fetchOptions: M
    } = h0(v), H = t || fetch;
    $ = $ ? ($ + "").toLowerCase() : "text";
    let z = iA([b, T && T.toAbortSignal()], D), J = null;
    const L = z && z.unsubscribe && (() => {
      z.unsubscribe();
    });
    let N;
    try {
      if (k && f && g !== "get" && g !== "head" && (N = await h(G, y)) !== 0) {
        let I = new n(x, {
          method: "POST",
          body: y,
          duplex: "half"
        }), j;
        if (P.isFormData(y) && (j = I.headers.get("content-type")) && G.setContentType(j), I.body) {
          const [Z, ee] = Ja(
            N,
            Er(Qa(k))
          );
          y = Of(I.body, Pf, Z, ee);
        }
      }
      P.isString(S) || (S = S ? "include" : "omit");
      const B = a && "credentials" in n.prototype, w = {
        ...M,
        signal: z,
        method: g.toUpperCase(),
        headers: G.normalize().toJSON(),
        body: y,
        duplex: "half",
        credentials: B ? S : void 0
      };
      J = a && new n(x, w);
      let A = await (a ? H(J, M) : H(x, w));
      const C = l && ($ === "stream" || $ === "response");
      if (l && (U || C && L)) {
        const I = {};
        ["status", "statusText", "headers"].forEach((V) => {
          I[V] = A[V];
        });
        const j = P.toFiniteNumber(A.headers.get("content-length")), [Z, ee] = U && Ja(
          j,
          Er(Qa(U), !0)
        ) || [];
        A = new r(
          Of(A.body, Pf, Z, () => {
            ee && ee(), L && L();
          }),
          I
        );
      }
      $ = $ || "text";
      let F = await u[P.findKey(u, $) || "text"](A, v);
      return !C && L && L(), await new Promise((I, j) => {
        or(I, j, {
          data: F,
          headers: Ue.from(A.headers),
          status: A.status,
          statusText: A.statusText,
          config: v,
          request: J
        });
      });
    } catch (B) {
      throw L && L(), B && B.name === "TypeError" && /Load failed|fetch/i.test(B.message) ? Object.assign(
        new W("Network Error", W.ERR_NETWORK, v, J, B && B.response),
        {
          cause: B.cause || B
        }
      ) : W.from(B, B && B.code, v, J, B && B.response);
    }
  };
}, uA = /* @__PURE__ */ new Map(), x0 = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: r, Response: i } = t, a = [
    r,
    i,
    n
  ];
  let o = a.length, s = o, c, f, l = uA;
  for (; s--; )
    c = a[s], f = l.get(c), f === void 0 && l.set(c, f = s ? /* @__PURE__ */ new Map() : lA(t)), l = f;
  return f;
};
x0();
const Jl = {
  http: ZS,
  xhr: rA,
  fetch: {
    get: x0
  }
};
P.forEach(Jl, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const If = (e) => `- ${e}`, pA = (e) => P.isFunction(e) || e === null || e === !1;
function fA(e, t) {
  e = P.isArray(e) ? e : [e];
  const { length: n } = e;
  let r, i;
  const a = {};
  for (let o = 0; o < n; o++) {
    r = e[o];
    let s;
    if (i = r, !pA(r) && (i = Jl[(s = String(r)).toLowerCase()], i === void 0))
      throw new W(`Unknown adapter '${s}'`);
    if (i && (P.isFunction(i) || (i = i.get(t))))
      break;
    a[s || "#" + o] = i;
  }
  if (!i) {
    const o = Object.entries(a).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let s = n ? o.length > 1 ? `since :
` + o.map(If).join(`
`) : " " + If(o[0]) : "as no adapter specified";
    throw new W(
      "There is no suitable adapter to dispatch the request " + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return i;
}
const v0 = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: fA,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: Jl
};
function tc(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new $n(null, e);
}
function Nf(e) {
  return tc(e), e.headers = Ue.from(e.headers), e.data = Ys.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), v0.getAdapter(e.adapter || Mi.adapter, e)(e).then(function(r) {
    return tc(e), r.data = Ys.call(
      e,
      e.transformResponse,
      r
    ), r.headers = Ue.from(r.headers), r;
  }, function(r) {
    return i0(r) || (tc(e), r && r.response && (r.response.data = Ys.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = Ue.from(r.response.headers))), Promise.reject(r);
  });
}
const No = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  No[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const $f = {};
No.transitional = function(t, n, r) {
  function i(a, o) {
    return "[Axios v" + Ka + "] Transitional option '" + a + "'" + o + (r ? ". " + r : "");
  }
  return (a, o, s) => {
    if (t === !1)
      throw new W(
        i(o, " has been removed" + (n ? " in " + n : "")),
        W.ERR_DEPRECATED
      );
    return n && !$f[o] && ($f[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(a, o, s) : !0;
  };
};
No.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function dA(e, t, n) {
  if (typeof e != "object")
    throw new W("options must be an object", W.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let i = r.length;
  for (; i-- > 0; ) {
    const a = r[i], o = t[a];
    if (o) {
      const s = e[a], c = s === void 0 || o(s, a, e);
      if (c !== !0)
        throw new W("option " + a + " must be " + c, W.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new W("Unknown option " + a, W.ERR_BAD_OPTION);
  }
}
const qa = {
  assertOptions: dA,
  validators: No
}, ct = qa.validators;
let kn = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new ff(),
      response: new ff()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let i = {};
        Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
        const a = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? a && !String(r.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + a) : r.stack = a;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Un(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: a } = n;
    r !== void 0 && qa.assertOptions(r, {
      silentJSONParsing: ct.transitional(ct.boolean),
      forcedJSONParsing: ct.transitional(ct.boolean),
      clarifyTimeoutError: ct.transitional(ct.boolean),
      legacyInterceptorReqResOrdering: ct.transitional(ct.boolean)
    }, !1), i != null && (P.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : qa.assertOptions(i, {
      encode: ct.function,
      serialize: ct.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), qa.assertOptions(n, {
      baseUrl: ct.spelling("baseURL"),
      withXsrfToken: ct.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = a && P.merge(
      a.common,
      a[n.method]
    );
    a && P.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete a[v];
      }
    ), n.headers = Ue.concat(o, a);
    const s = [];
    let c = !0;
    this.interceptors.request.forEach(function(x) {
      if (typeof x.runWhen == "function" && x.runWhen(n) === !1)
        return;
      c = c && x.synchronous;
      const g = n.transitional || Io;
      g && g.legacyInterceptorReqResOrdering ? s.unshift(x.fulfilled, x.rejected) : s.push(x.fulfilled, x.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(x) {
      f.push(x.fulfilled, x.rejected);
    });
    let l, u = 0, d;
    if (!c) {
      const v = [Nf.bind(this), void 0];
      for (v.unshift(...s), v.push(...f), d = v.length, l = Promise.resolve(n); u < d; )
        l = l.then(v[u++], v[u++]);
      return l;
    }
    d = s.length;
    let h = n;
    for (; u < d; ) {
      const v = s[u++], x = s[u++];
      try {
        h = v(h);
      } catch (g) {
        x.call(this, g);
        break;
      }
    }
    try {
      l = Nf.call(this, h);
    } catch (v) {
      return Promise.reject(v);
    }
    for (u = 0, d = f.length; u < d; )
      l = l.then(f[u++], f[u++]);
    return l;
  }
  getUri(t) {
    t = Un(this.defaults, t);
    const n = ql(t.baseURL, t.url, t.allowAbsoluteUrls);
    return jl(n, t.params, t.paramsSerializer);
  }
};
P.forEach(["delete", "get", "head", "options"], function(t) {
  kn.prototype[t] = function(n, r) {
    return this.request(Un(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
P.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(a, o, s) {
      return this.request(Un(s || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: o
      }));
    };
  }
  kn.prototype[t] = n(), kn.prototype[t + "Form"] = n(!0);
});
let mA = class g0 {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(a) {
      n = a;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners) return;
      let a = r._listeners.length;
      for (; a-- > 0; )
        r._listeners[a](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let a;
      const o = new Promise((s) => {
        r.subscribe(s), a = s;
      }).then(i);
      return o.cancel = function() {
        r.unsubscribe(a);
      }, o;
    }, t(function(a, o, s) {
      r.reason || (r.reason = new $n(a, o, s), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new g0(function(i) {
        t = i;
      }),
      cancel: t
    };
  }
};
function hA(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function xA(e) {
  return P.isObject(e) && e.isAxiosError === !0;
}
const Yc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(Yc).forEach(([e, t]) => {
  Yc[t] = e;
});
function y0(e) {
  const t = new kn(e), n = kh(kn.prototype.request, t);
  return P.extend(n, kn.prototype, t, { allOwnKeys: !0 }), P.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(i) {
    return y0(Un(e, i));
  }, n;
}
const _e = y0(Mi);
_e.Axios = kn;
_e.CanceledError = $n;
_e.CancelToken = mA;
_e.isCancel = i0;
_e.VERSION = Ka;
_e.toFormData = ko;
_e.AxiosError = W;
_e.Cancel = _e.CanceledError;
_e.all = function(t) {
  return Promise.all(t);
};
_e.spread = hA;
_e.isAxiosError = xA;
_e.mergeConfig = Un;
_e.AxiosHeaders = Ue;
_e.formToJSON = (e) => r0(P.isHTMLForm(e) ? new FormData(e) : e);
_e.getAdapter = v0.getAdapter;
_e.HttpStatusCode = Yc;
_e.default = _e;
const {
  Axios: iD,
  AxiosError: aD,
  CanceledError: oD,
  isCancel: sD,
  CancelToken: cD,
  VERSION: lD,
  all: uD,
  Cancel: pD,
  isAxiosError: fD,
  spread: dD,
  toFormData: mD,
  AxiosHeaders: hD,
  HttpStatusCode: xD,
  formToJSON: vD,
  getAdapter: gD,
  mergeConfig: yD
} = _e;
class vA {
  /**
   * Проверяет наличие Fabric и скачивает его манифест, если нужно.
   * @returns ID версии для запуска
   */
  static async setup(t, n, r, i) {
    const a = `fabric-loader-${n}-${t}`, o = xe.join(r, "versions", a), s = xe.join(o, `${a}.json`);
    if (ne.existsSync(s))
      return a;
    i.send("launch-status", `Fetching Fabric Meta for ${t}...`);
    try {
      const c = `https://meta.fabricmc.net/v2/versions/loader/${t}/${n}/profile/json`, l = (await _e.get(c)).data;
      return ne.existsSync(o) || ne.mkdirSync(o, { recursive: !0 }), ne.writeFileSync(s, JSON.stringify(l, null, 2)), i.send("launch-status", "Fabric manifest installed!"), a;
    } catch (c) {
      throw console.error("Fabric Setup Error:", c), new Error(`Failed to setup Fabric: ${c instanceof Error ? c.message : "Unknown error"}`);
    }
  }
}
var _r = {}, zn = {}, Ke = {};
Ke.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, a) => i != null ? r(i) : n(a)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Ke.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
(function(e) {
  const t = Ke.fromCallback, n = qe, r = [
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
  ].filter((i) => typeof n[i] == "function");
  Object.assign(e, n), r.forEach((i) => {
    e[i] = t(n[i]);
  }), e.exists = function(i, a) {
    return typeof a == "function" ? n.exists(i, a) : new Promise((o) => n.exists(i, o));
  }, e.read = function(i, a, o, s, c, f) {
    return typeof f == "function" ? n.read(i, a, o, s, c, f) : new Promise((l, u) => {
      n.read(i, a, o, s, c, (d, h, v) => {
        if (d) return u(d);
        l({ bytesRead: h, buffer: v });
      });
    });
  }, e.write = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? n.write(i, a, ...o) : new Promise((s, c) => {
      n.write(i, a, ...o, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? n.writev(i, a, ...o) : new Promise((s, c) => {
      n.writev(i, a, ...o, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(zn);
var Ql = {}, b0 = {};
const gA = ce;
b0.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(gA.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const w0 = zn, { checkPath: E0 } = b0, _0 = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Ql.makeDir = async (e, t) => (E0(e), w0.mkdir(e, {
  mode: _0(t),
  recursive: !0
}));
Ql.makeDirSync = (e, t) => (E0(e), w0.mkdirSync(e, {
  mode: _0(t),
  recursive: !0
}));
const yA = Ke.fromPromise, { makeDir: bA, makeDirSync: nc } = Ql, rc = yA(bA);
var Ft = {
  mkdirs: rc,
  mkdirsSync: nc,
  // alias
  mkdirp: rc,
  mkdirpSync: nc,
  ensureDir: rc,
  ensureDirSync: nc
};
const wA = Ke.fromPromise, S0 = zn;
function EA(e) {
  return S0.access(e).then(() => !0).catch(() => !1);
}
var Hn = {
  pathExists: wA(EA),
  pathExistsSync: S0.existsSync
};
const vr = qe;
function _A(e, t, n, r) {
  vr.open(e, "r+", (i, a) => {
    if (i) return r(i);
    vr.futimes(a, t, n, (o) => {
      vr.close(a, (s) => {
        r && r(o || s);
      });
    });
  });
}
function SA(e, t, n) {
  const r = vr.openSync(e, "r+");
  return vr.futimesSync(r, t, n), vr.closeSync(r);
}
var A0 = {
  utimesMillis: _A,
  utimesMillisSync: SA
};
const Sr = zn, Pe = ce, AA = Fe;
function TA(e, t, n) {
  const r = n.dereference ? (i) => Sr.stat(i, { bigint: !0 }) : (i) => Sr.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, a]) => ({ srcStat: i, destStat: a }));
}
function RA(e, t, n) {
  let r;
  const i = n.dereference ? (o) => Sr.statSync(o, { bigint: !0 }) : (o) => Sr.lstatSync(o, { bigint: !0 }), a = i(e);
  try {
    r = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: a, destStat: null };
    throw o;
  }
  return { srcStat: a, destStat: r };
}
function CA(e, t, n, r, i) {
  AA.callbackify(TA)(e, t, r, (a, o) => {
    if (a) return i(a);
    const { srcStat: s, destStat: c } = o;
    if (c) {
      if (Hi(s, c)) {
        const f = Pe.basename(e), l = Pe.basename(t);
        return n === "move" && f !== l && f.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: s, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && Zl(e, t) ? i(new Error($o(e, t, n))) : i(null, { srcStat: s, destStat: c });
  });
}
function OA(e, t, n, r) {
  const { srcStat: i, destStat: a } = RA(e, t, r);
  if (a) {
    if (Hi(i, a)) {
      const o = Pe.basename(e), s = Pe.basename(t);
      if (n === "move" && o !== s && o.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Zl(e, t))
    throw new Error($o(e, t, n));
  return { srcStat: i, destStat: a };
}
function T0(e, t, n, r, i) {
  const a = Pe.resolve(Pe.dirname(e)), o = Pe.resolve(Pe.dirname(n));
  if (o === a || o === Pe.parse(o).root) return i();
  Sr.stat(o, { bigint: !0 }, (s, c) => s ? s.code === "ENOENT" ? i() : i(s) : Hi(t, c) ? i(new Error($o(e, n, r))) : T0(e, t, o, r, i));
}
function R0(e, t, n, r) {
  const i = Pe.resolve(Pe.dirname(e)), a = Pe.resolve(Pe.dirname(n));
  if (a === i || a === Pe.parse(a).root) return;
  let o;
  try {
    o = Sr.statSync(a, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Hi(t, o))
    throw new Error($o(e, n, r));
  return R0(e, t, a, r);
}
function Hi(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Zl(e, t) {
  const n = Pe.resolve(e).split(Pe.sep).filter((i) => i), r = Pe.resolve(t).split(Pe.sep).filter((i) => i);
  return n.reduce((i, a, o) => i && r[o] === a, !0);
}
function $o(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Dr = {
  checkPaths: CA,
  checkPathsSync: OA,
  checkParentPaths: T0,
  checkParentPathsSync: R0,
  isSrcSubdir: Zl,
  areIdentical: Hi
};
const Ze = qe, ci = ce, PA = Ft.mkdirs, FA = Hn.pathExists, DA = A0.utimesMillis, li = Dr;
function kA(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), li.checkPaths(e, t, "copy", n, (i, a) => {
    if (i) return r(i);
    const { srcStat: o, destStat: s } = a;
    li.checkParentPaths(e, o, t, "copy", (c) => c ? r(c) : n.filter ? C0(Lf, s, e, t, n, r) : Lf(s, e, t, n, r));
  });
}
function Lf(e, t, n, r, i) {
  const a = ci.dirname(n);
  FA(a, (o, s) => {
    if (o) return i(o);
    if (s) return Za(e, t, n, r, i);
    PA(a, (c) => c ? i(c) : Za(e, t, n, r, i));
  });
}
function C0(e, t, n, r, i, a) {
  Promise.resolve(i.filter(n, r)).then((o) => o ? e(t, n, r, i, a) : a(), (o) => a(o));
}
function IA(e, t, n, r, i) {
  return r.filter ? C0(Za, e, t, n, r, i) : Za(e, t, n, r, i);
}
function Za(e, t, n, r, i) {
  (r.dereference ? Ze.stat : Ze.lstat)(t, (o, s) => o ? i(o) : s.isDirectory() ? MA(s, e, t, n, r, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? NA(s, e, t, n, r, i) : s.isSymbolicLink() ? HA(e, t, n, r, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function NA(e, t, n, r, i, a) {
  return t ? $A(e, n, r, i, a) : O0(e, n, r, i, a);
}
function $A(e, t, n, r, i) {
  if (r.overwrite)
    Ze.unlink(n, (a) => a ? i(a) : O0(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function O0(e, t, n, r, i) {
  Ze.copyFile(t, n, (a) => a ? i(a) : r.preserveTimestamps ? LA(e.mode, t, n, i) : Lo(n, e.mode, i));
}
function LA(e, t, n, r) {
  return UA(e) ? BA(n, e, (i) => i ? r(i) : Uf(e, t, n, r)) : Uf(e, t, n, r);
}
function UA(e) {
  return (e & 128) === 0;
}
function BA(e, t, n) {
  return Lo(e, t | 128, n);
}
function Uf(e, t, n, r) {
  jA(t, n, (i) => i ? r(i) : Lo(n, e, r));
}
function Lo(e, t, n) {
  return Ze.chmod(e, t, n);
}
function jA(e, t, n) {
  Ze.stat(e, (r, i) => r ? n(r) : DA(t, i.atime, i.mtime, n));
}
function MA(e, t, n, r, i, a) {
  return t ? P0(n, r, i, a) : qA(e.mode, n, r, i, a);
}
function qA(e, t, n, r, i) {
  Ze.mkdir(n, (a) => {
    if (a) return i(a);
    P0(t, n, r, (o) => o ? i(o) : Lo(n, e, i));
  });
}
function P0(e, t, n, r) {
  Ze.readdir(e, (i, a) => i ? r(i) : F0(a, e, t, n, r));
}
function F0(e, t, n, r, i) {
  const a = e.pop();
  return a ? zA(e, a, t, n, r, i) : i();
}
function zA(e, t, n, r, i, a) {
  const o = ci.join(n, t), s = ci.join(r, t);
  li.checkPaths(o, s, "copy", i, (c, f) => {
    if (c) return a(c);
    const { destStat: l } = f;
    IA(l, o, s, i, (u) => u ? a(u) : F0(e, n, r, i, a));
  });
}
function HA(e, t, n, r, i) {
  Ze.readlink(t, (a, o) => {
    if (a) return i(a);
    if (r.dereference && (o = ci.resolve(process.cwd(), o)), e)
      Ze.readlink(n, (s, c) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Ze.symlink(o, n, i) : i(s) : (r.dereference && (c = ci.resolve(process.cwd(), c)), li.isSrcSubdir(o, c) ? i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && li.isSrcSubdir(c, o) ? i(new Error(`Cannot overwrite '${c}' with '${o}'.`)) : GA(o, n, i)));
    else
      return Ze.symlink(o, n, i);
  });
}
function GA(e, t, n) {
  Ze.unlink(t, (r) => r ? n(r) : Ze.symlink(e, t, n));
}
var WA = kA;
const Me = qe, ui = ce, VA = Ft.mkdirsSync, YA = A0.utimesMillisSync, pi = Dr;
function XA(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = pi.checkPathsSync(e, t, "copy", n);
  return pi.checkParentPathsSync(e, r, t, "copy"), KA(i, e, t, n);
}
function KA(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = ui.dirname(n);
  return Me.existsSync(i) || VA(i), D0(e, t, n, r);
}
function JA(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return D0(e, t, n, r);
}
function D0(e, t, n, r) {
  const a = (r.dereference ? Me.statSync : Me.lstatSync)(t);
  if (a.isDirectory()) return i2(a, e, t, n, r);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return QA(a, e, t, n, r);
  if (a.isSymbolicLink()) return s2(e, t, n, r);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function QA(e, t, n, r, i) {
  return t ? ZA(e, n, r, i) : k0(e, n, r, i);
}
function ZA(e, t, n, r) {
  if (r.overwrite)
    return Me.unlinkSync(n), k0(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function k0(e, t, n, r) {
  return Me.copyFileSync(t, n), r.preserveTimestamps && e2(e.mode, t, n), eu(n, e.mode);
}
function e2(e, t, n) {
  return t2(e) && n2(n, e), r2(t, n);
}
function t2(e) {
  return (e & 128) === 0;
}
function n2(e, t) {
  return eu(e, t | 128);
}
function eu(e, t) {
  return Me.chmodSync(e, t);
}
function r2(e, t) {
  const n = Me.statSync(e);
  return YA(t, n.atime, n.mtime);
}
function i2(e, t, n, r, i) {
  return t ? I0(n, r, i) : a2(e.mode, n, r, i);
}
function a2(e, t, n, r) {
  return Me.mkdirSync(n), I0(t, n, r), eu(n, e);
}
function I0(e, t, n) {
  Me.readdirSync(e).forEach((r) => o2(r, e, t, n));
}
function o2(e, t, n, r) {
  const i = ui.join(t, e), a = ui.join(n, e), { destStat: o } = pi.checkPathsSync(i, a, "copy", r);
  return JA(o, i, a, r);
}
function s2(e, t, n, r) {
  let i = Me.readlinkSync(t);
  if (r.dereference && (i = ui.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = Me.readlinkSync(n);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return Me.symlinkSync(i, n);
      throw o;
    }
    if (r.dereference && (a = ui.resolve(process.cwd(), a)), pi.isSrcSubdir(i, a))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
    if (Me.statSync(n).isDirectory() && pi.isSrcSubdir(a, i))
      throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
    return c2(i, n);
  } else
    return Me.symlinkSync(i, n);
}
function c2(e, t) {
  return Me.unlinkSync(t), Me.symlinkSync(e, t);
}
var l2 = XA;
const u2 = Ke.fromCallback;
var tu = {
  copy: u2(WA),
  copySync: l2
};
const Bf = qe, N0 = ce, pe = ul, fi = process.platform === "win32";
function $0(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || Bf[n], n = n + "Sync", e[n] = e[n] || Bf[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function nu(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), pe(e, "rimraf: missing path"), pe.strictEqual(typeof e, "string", "rimraf: path should be a string"), pe.strictEqual(typeof n, "function", "rimraf: callback function required"), pe(t, "rimraf: invalid options argument provided"), pe.strictEqual(typeof t, "object", "rimraf: options should be object"), $0(t), jf(e, t, function i(a) {
    if (a) {
      if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const o = r * 100;
        return setTimeout(() => jf(e, t, i), o);
      }
      a.code === "ENOENT" && (a = null);
    }
    n(a);
  });
}
function jf(e, t, n) {
  pe(e), pe(t), pe(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && fi)
      return Mf(e, t, r, n);
    if (i && i.isDirectory())
      return za(e, t, r, n);
    t.unlink(e, (a) => {
      if (a) {
        if (a.code === "ENOENT")
          return n(null);
        if (a.code === "EPERM")
          return fi ? Mf(e, t, a, n) : za(e, t, a, n);
        if (a.code === "EISDIR")
          return za(e, t, a, n);
      }
      return n(a);
    });
  });
}
function Mf(e, t, n, r) {
  pe(e), pe(t), pe(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (a, o) => {
      a ? r(a.code === "ENOENT" ? null : n) : o.isDirectory() ? za(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function qf(e, t, n) {
  let r;
  pe(e), pe(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  try {
    r = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  r.isDirectory() ? Ha(e, t, n) : t.unlinkSync(e);
}
function za(e, t, n, r) {
  pe(e), pe(t), pe(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? p2(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function p2(e, t, n) {
  pe(e), pe(t), pe(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let a = i.length, o;
    if (a === 0) return t.rmdir(e, n);
    i.forEach((s) => {
      nu(N0.join(e, s), t, (c) => {
        if (!o) {
          if (c) return n(o = c);
          --a === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function L0(e, t) {
  let n;
  t = t || {}, $0(t), pe(e, "rimraf: missing path"), pe.strictEqual(typeof e, "string", "rimraf: path should be a string"), pe(t, "rimraf: missing options"), pe.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && fi && qf(e, t, r);
  }
  try {
    n && n.isDirectory() ? Ha(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return fi ? qf(e, t, r) : Ha(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    Ha(e, t, r);
  }
}
function Ha(e, t, n) {
  pe(e), pe(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      f2(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function f2(e, t) {
  if (pe(e), pe(t), t.readdirSync(e).forEach((n) => L0(N0.join(e, n), t)), fi) {
    const n = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - n < 500);
  } else
    return t.rmdirSync(e, t);
}
var d2 = nu;
nu.sync = L0;
const eo = qe, m2 = Ke.fromCallback, U0 = d2;
function h2(e, t) {
  if (eo.rm) return eo.rm(e, { recursive: !0, force: !0 }, t);
  U0(e, t);
}
function x2(e) {
  if (eo.rmSync) return eo.rmSync(e, { recursive: !0, force: !0 });
  U0.sync(e);
}
var Uo = {
  remove: m2(h2),
  removeSync: x2
};
const v2 = Ke.fromPromise, B0 = zn, j0 = ce, M0 = Ft, q0 = Uo, zf = v2(async function(t) {
  let n;
  try {
    n = await B0.readdir(t);
  } catch {
    return M0.mkdirs(t);
  }
  return Promise.all(n.map((r) => q0.remove(j0.join(t, r))));
});
function Hf(e) {
  let t;
  try {
    t = B0.readdirSync(e);
  } catch {
    return M0.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = j0.join(e, n), q0.removeSync(n);
  });
}
var g2 = {
  emptyDirSync: Hf,
  emptydirSync: Hf,
  emptyDir: zf,
  emptydir: zf
};
const y2 = Ke.fromCallback, z0 = ce, Zt = qe, H0 = Ft;
function b2(e, t) {
  function n() {
    Zt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  Zt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const a = z0.dirname(e);
    Zt.stat(a, (o, s) => {
      if (o)
        return o.code === "ENOENT" ? H0.mkdirs(a, (c) => {
          if (c) return t(c);
          n();
        }) : t(o);
      s.isDirectory() ? n() : Zt.readdir(a, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function w2(e) {
  let t;
  try {
    t = Zt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = z0.dirname(e);
  try {
    Zt.statSync(n).isDirectory() || Zt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") H0.mkdirsSync(n);
    else throw r;
  }
  Zt.writeFileSync(e, "");
}
var E2 = {
  createFile: y2(b2),
  createFileSync: w2
};
const _2 = Ke.fromCallback, G0 = ce, Qt = qe, W0 = Ft, S2 = Hn.pathExists, { areIdentical: V0 } = Dr;
function A2(e, t, n) {
  function r(i, a) {
    Qt.link(i, a, (o) => {
      if (o) return n(o);
      n(null);
    });
  }
  Qt.lstat(t, (i, a) => {
    Qt.lstat(e, (o, s) => {
      if (o)
        return o.message = o.message.replace("lstat", "ensureLink"), n(o);
      if (a && V0(s, a)) return n(null);
      const c = G0.dirname(t);
      S2(c, (f, l) => {
        if (f) return n(f);
        if (l) return r(e, t);
        W0.mkdirs(c, (u) => {
          if (u) return n(u);
          r(e, t);
        });
      });
    });
  });
}
function T2(e, t) {
  let n;
  try {
    n = Qt.lstatSync(t);
  } catch {
  }
  try {
    const a = Qt.lstatSync(e);
    if (n && V0(a, n)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const r = G0.dirname(t);
  return Qt.existsSync(r) || W0.mkdirsSync(r), Qt.linkSync(e, t);
}
var R2 = {
  createLink: _2(A2),
  createLinkSync: T2
};
const en = ce, Qr = qe, C2 = Hn.pathExists;
function O2(e, t, n) {
  if (en.isAbsolute(e))
    return Qr.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = en.dirname(t), i = en.join(r, e);
    return C2(i, (a, o) => a ? n(a) : o ? n(null, {
      toCwd: i,
      toDst: e
    }) : Qr.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), n(s)) : n(null, {
      toCwd: e,
      toDst: en.relative(r, e)
    })));
  }
}
function P2(e, t) {
  let n;
  if (en.isAbsolute(e)) {
    if (n = Qr.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = en.dirname(t), i = en.join(r, e);
    if (n = Qr.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = Qr.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: en.relative(r, e)
    };
  }
}
var F2 = {
  symlinkPaths: O2,
  symlinkPathsSync: P2
};
const Y0 = qe;
function D2(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  Y0.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function k2(e, t) {
  let n;
  if (t) return t;
  try {
    n = Y0.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var I2 = {
  symlinkType: D2,
  symlinkTypeSync: k2
};
const N2 = Ke.fromCallback, X0 = ce, vt = zn, K0 = Ft, $2 = K0.mkdirs, L2 = K0.mkdirsSync, J0 = F2, U2 = J0.symlinkPaths, B2 = J0.symlinkPathsSync, Q0 = I2, j2 = Q0.symlinkType, M2 = Q0.symlinkTypeSync, q2 = Hn.pathExists, { areIdentical: Z0 } = Dr;
function z2(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, vt.lstat(t, (i, a) => {
    !i && a.isSymbolicLink() ? Promise.all([
      vt.stat(e),
      vt.stat(t)
    ]).then(([o, s]) => {
      if (Z0(o, s)) return r(null);
      Gf(e, t, n, r);
    }) : Gf(e, t, n, r);
  });
}
function Gf(e, t, n, r) {
  U2(e, t, (i, a) => {
    if (i) return r(i);
    e = a.toDst, j2(a.toCwd, n, (o, s) => {
      if (o) return r(o);
      const c = X0.dirname(t);
      q2(c, (f, l) => {
        if (f) return r(f);
        if (l) return vt.symlink(e, t, s, r);
        $2(c, (u) => {
          if (u) return r(u);
          vt.symlink(e, t, s, r);
        });
      });
    });
  });
}
function H2(e, t, n) {
  let r;
  try {
    r = vt.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const s = vt.statSync(e), c = vt.statSync(t);
    if (Z0(s, c)) return;
  }
  const i = B2(e, t);
  e = i.toDst, n = M2(i.toCwd, n);
  const a = X0.dirname(t);
  return vt.existsSync(a) || L2(a), vt.symlinkSync(e, t, n);
}
var G2 = {
  createSymlink: N2(z2),
  createSymlinkSync: H2
};
const { createFile: Wf, createFileSync: Vf } = E2, { createLink: Yf, createLinkSync: Xf } = R2, { createSymlink: Kf, createSymlinkSync: Jf } = G2;
var W2 = {
  // file
  createFile: Wf,
  createFileSync: Vf,
  ensureFile: Wf,
  ensureFileSync: Vf,
  // link
  createLink: Yf,
  createLinkSync: Xf,
  ensureLink: Yf,
  ensureLinkSync: Xf,
  // symlink
  createSymlink: Kf,
  createSymlinkSync: Jf,
  ensureSymlink: Kf,
  ensureSymlinkSync: Jf
};
function V2(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const a = n ? t : "";
  return JSON.stringify(e, r, i).replace(/\n/g, t) + a;
}
function Y2(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ru = { stringify: V2, stripBom: Y2 };
let Ar;
try {
  Ar = qe;
} catch {
  Ar = at;
}
const Bo = Ke, { stringify: ex, stripBom: tx } = ru;
async function X2(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Ar, r = "throws" in t ? t.throws : !0;
  let i = await Bo.fromCallback(n.readFile)(e, t);
  i = tx(i);
  let a;
  try {
    a = JSON.parse(i, t ? t.reviver : null);
  } catch (o) {
    if (r)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
  return a;
}
const K2 = Bo.fromPromise(X2);
function J2(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Ar, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = tx(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Q2(e, t, n = {}) {
  const r = n.fs || Ar, i = ex(t, n);
  await Bo.fromCallback(r.writeFile)(e, i, n);
}
const Z2 = Bo.fromPromise(Q2);
function eT(e, t, n = {}) {
  const r = n.fs || Ar, i = ex(t, n);
  return r.writeFileSync(e, i, n);
}
var tT = {
  readFile: K2,
  readFileSync: J2,
  writeFile: Z2,
  writeFileSync: eT
};
const ba = tT;
var nT = {
  // jsonfile exports
  readJson: ba.readFile,
  readJsonSync: ba.readFileSync,
  writeJson: ba.writeFile,
  writeJsonSync: ba.writeFileSync
};
const rT = Ke.fromCallback, Zr = qe, nx = ce, rx = Ft, iT = Hn.pathExists;
function aT(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = nx.dirname(e);
  iT(i, (a, o) => {
    if (a) return r(a);
    if (o) return Zr.writeFile(e, t, n, r);
    rx.mkdirs(i, (s) => {
      if (s) return r(s);
      Zr.writeFile(e, t, n, r);
    });
  });
}
function oT(e, ...t) {
  const n = nx.dirname(e);
  if (Zr.existsSync(n))
    return Zr.writeFileSync(e, ...t);
  rx.mkdirsSync(n), Zr.writeFileSync(e, ...t);
}
var iu = {
  outputFile: rT(aT),
  outputFileSync: oT
};
const { stringify: sT } = ru, { outputFile: cT } = iu;
async function lT(e, t, n = {}) {
  const r = sT(t, n);
  await cT(e, r, n);
}
var uT = lT;
const { stringify: pT } = ru, { outputFileSync: fT } = iu;
function dT(e, t, n) {
  const r = pT(t, n);
  fT(e, r, n);
}
var mT = dT;
const hT = Ke.fromPromise, Xe = nT;
Xe.outputJson = hT(uT);
Xe.outputJsonSync = mT;
Xe.outputJSON = Xe.outputJson;
Xe.outputJSONSync = Xe.outputJsonSync;
Xe.writeJSON = Xe.writeJson;
Xe.writeJSONSync = Xe.writeJsonSync;
Xe.readJSON = Xe.readJson;
Xe.readJSONSync = Xe.readJsonSync;
var xT = Xe;
const vT = qe, Xc = ce, gT = tu.copy, ix = Uo.remove, yT = Ft.mkdirp, bT = Hn.pathExists, Qf = Dr;
function wT(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  Qf.checkPaths(e, t, "move", n, (a, o) => {
    if (a) return r(a);
    const { srcStat: s, isChangingCase: c = !1 } = o;
    Qf.checkParentPaths(e, s, t, "move", (f) => {
      if (f) return r(f);
      if (ET(t)) return Zf(e, t, i, c, r);
      yT(Xc.dirname(t), (l) => l ? r(l) : Zf(e, t, i, c, r));
    });
  });
}
function ET(e) {
  const t = Xc.dirname(e);
  return Xc.parse(t).root === t;
}
function Zf(e, t, n, r, i) {
  if (r) return ic(e, t, n, i);
  if (n)
    return ix(t, (a) => a ? i(a) : ic(e, t, n, i));
  bT(t, (a, o) => a ? i(a) : o ? i(new Error("dest already exists.")) : ic(e, t, n, i));
}
function ic(e, t, n, r) {
  vT.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : _T(e, t, n, r) : r());
}
function _T(e, t, n, r) {
  gT(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (a) => a ? r(a) : ix(e, r));
}
var ST = wT;
const ax = qe, Kc = ce, AT = tu.copySync, ox = Uo.removeSync, TT = Ft.mkdirpSync, ed = Dr;
function RT(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = ed.checkPathsSync(e, t, "move", n);
  return ed.checkParentPathsSync(e, i, t, "move"), CT(t) || TT(Kc.dirname(t)), OT(e, t, r, a);
}
function CT(e) {
  const t = Kc.dirname(e);
  return Kc.parse(t).root === t;
}
function OT(e, t, n, r) {
  if (r) return ac(e, t, n);
  if (n)
    return ox(t), ac(e, t, n);
  if (ax.existsSync(t)) throw new Error("dest already exists.");
  return ac(e, t, n);
}
function ac(e, t, n) {
  try {
    ax.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return PT(e, t, n);
  }
}
function PT(e, t, n) {
  return AT(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), ox(e);
}
var FT = RT;
const DT = Ke.fromCallback;
var kT = {
  move: DT(ST),
  moveSync: FT
}, fn = {
  // Export promiseified graceful-fs:
  ...zn,
  // Export extra methods:
  ...tu,
  ...g2,
  ...W2,
  ...xT,
  ...Ft,
  ...kT,
  ...iu,
  ...Hn,
  ...Uo
}, Gn = {}, an = {}, Re = {}, on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.CancellationError = on.CancellationToken = void 0;
const IT = Si;
class NT extends IT.EventEmitter {
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
      return Promise.reject(new Jc());
    const n = () => {
      if (r != null)
        try {
          this.removeListener("cancel", r), r = null;
        } catch {
        }
    };
    let r = null;
    return new Promise((i, a) => {
      let o = null;
      if (r = () => {
        try {
          o != null && (o(), o = null);
        } finally {
          a(new Jc());
        }
      }, this.cancelled) {
        r();
        return;
      }
      this.onCancel(r), t(i, a, (s) => {
        o = s;
      });
    }).then((i) => (n(), i)).catch((i) => {
      throw n(), i;
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
on.CancellationToken = NT;
class Jc extends Error {
  constructor() {
    super("cancelled");
  }
}
on.CancellationError = Jc;
var kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.newError = $T;
function $T(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var Ve = {}, Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.ProgressCallbackTransform = void 0;
const LT = le;
class UT extends LT.Transform {
  constructor(t, n, r) {
    super(), this.total = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
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
    }), this.delta = 0), r(null, t);
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
Gi.ProgressCallbackTransform = UT;
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.DigestTransform = Ve.HttpExecutor = Ve.HttpError = void 0;
Ve.createHttpError = Zc;
Ve.parseJson = WT;
Ve.configureRequestOptionsFromUrl = cx;
Ve.configureRequestUrl = ou;
Ve.safeGetHeader = gr;
Ve.configureRequestOptions = to;
Ve.safeStringifyJson = no;
const BT = jn, jT = s0, MT = at, qT = le, Qc = ut, zT = on, td = kr, HT = Gi, wn = (0, jT.default)("electron-builder");
function Zc(e, t = null) {
  return new au(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + no(e.headers), t);
}
const GT = /* @__PURE__ */ new Map([
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
class au extends Error {
  constructor(t, n = `HTTP error: ${GT.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ve.HttpError = au;
function WT(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class cr {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new zT.CancellationToken(), r) {
    to(t);
    const i = r == null ? void 0 : JSON.stringify(r), a = i ? Buffer.from(i) : void 0;
    if (a != null) {
      wn(i);
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
    return this.doApiRequest(t, n, (o) => o.end(a));
  }
  doApiRequest(t, n, r, i = 0) {
    return wn.enabled && wn(`Request: ${no(t)}`), n.createPromise((a, o, s) => {
      const c = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, n, a, o, i, r);
        } catch (l) {
          o(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, o, t.timeout), this.addRedirectHandlers(c, t, o, i, (f) => {
        this.doApiRequest(f, n, r, i).then(a).catch(o);
      }), r(c, o), s(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, n, r, i, a) {
  }
  addErrorAndTimeoutHandlers(t, n, r = 60 * 1e3) {
    this.addTimeOutHandler(t, n, r), t.on("error", n), t.on("aborted", () => {
      n(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, n, r, i, a, o, s) {
    var c;
    if (wn.enabled && wn(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${no(n)}`), t.statusCode === 404) {
      a(Zc(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = f >= 300 && f < 400, u = gr(t, "location");
    if (l && u != null) {
      if (o > this.maxRedirects) {
        a(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(cr.prepareRedirectUrlOptions(u, n), r, s, o).then(i).catch(a);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", a), t.on("data", (h) => d += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = gr(t, "content-type"), v = h != null && (Array.isArray(h) ? h.find((x) => x.includes("json")) != null : h.includes("json"));
          a(Zc(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${v ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (h) {
        a(h);
      }
    });
  }
  async downloadToBuffer(t, n) {
    return await n.cancellationToken.createPromise((r, i, a) => {
      const o = [], s = {
        headers: n.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      ou(t, s), to(s), this.doDownload(s, {
        destination: null,
        options: n,
        onCancel: a,
        callback: (c) => {
          c == null ? r(Buffer.concat(o)) : i(c);
        },
        responseHandler: (c, f) => {
          let l = 0;
          c.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            o.push(u);
          }), c.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, n, r) {
    const i = this.createRequest(t, (a) => {
      if (a.statusCode >= 400) {
        n.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${a.statusCode}: ${a.statusMessage}`));
        return;
      }
      a.on("error", n.callback);
      const o = gr(a, "location");
      if (o != null) {
        r < this.maxRedirects ? this.doDownload(cr.prepareRedirectUrlOptions(o, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? YT(n, a) : n.responseHandler(a, n.callback);
    });
    this.addErrorAndTimeoutHandlers(i, n.callback, t.timeout), this.addRedirectHandlers(i, t, n.callback, r, (a) => {
      this.doDownload(a, n, r++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, n, r) {
    t.on("socket", (i) => {
      i.setTimeout(r, () => {
        t.abort(), n(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, n) {
    const r = cx(t, { ...n }), i = r.headers;
    if (i != null && i.authorization) {
      const a = cr.reconstructOriginalUrl(n), o = sx(t, n);
      cr.isCrossOriginRedirect(a, o) && (wn.enabled && wn(`Given the cross-origin redirect (from ${a.host} to ${o.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return r;
  }
  static reconstructOriginalUrl(t) {
    const n = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const r = t.hostname, i = t.port ? `:${t.port}` : "", a = t.path || "/";
    return new Qc.URL(`${n}//${r}${i}${a}`);
  }
  static isCrossOriginRedirect(t, n) {
    if (t.hostname.toLowerCase() !== n.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && n.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(n.port))
      return !1;
    if (t.protocol !== n.protocol)
      return !0;
    const r = t.port, i = n.port;
    return r !== i;
  }
  static retryOnServerError(t, n = 3) {
    for (let r = 0; ; r++)
      try {
        return t();
      } catch (i) {
        if (r < n && (i instanceof au && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Ve.HttpExecutor = cr;
function sx(e, t) {
  try {
    return new Qc.URL(e);
  } catch {
    const n = t.hostname, r = t.protocol || "https:", i = t.port ? `:${t.port}` : "", a = `${r}//${n}${i}`;
    return new Qc.URL(e, a);
  }
}
function cx(e, t) {
  const n = to(t), r = sx(e, t);
  return ou(r, n), n;
}
function ou(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class el extends qT.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, BT.createHash)(n);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, n, r) {
    this.digester.update(t), r(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (n) {
        t(n);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, td.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, td.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ve.DigestTransform = el;
function VT(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function gr(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function YT(e, t) {
  if (!VT(gr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const o = gr(t, "content-length");
    o != null && n.push(new HT.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new el(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new el(e.options.sha2, "sha256", "hex"));
  const i = (0, MT.createWriteStream)(e.destination);
  n.push(i);
  let a = t;
  for (const o of n)
    o.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), a = a.pipe(o);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function to(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function no(e, t) {
  return JSON.stringify(e, (n, r) => n.endsWith("Authorization") || n.endsWith("authorization") || n.endsWith("Password") || n.endsWith("PASSWORD") || n.endsWith("Token") || n.includes("password") || n.includes("token") || t != null && t.has(n) ? "<stripped sensitive data>" : r, 2);
}
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
jo.MemoLazy = void 0;
class XT {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && lx(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
jo.MemoLazy = XT;
function lx(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), a = Object.keys(t);
    return i.length === a.length && i.every((o) => lx(e[o], t[o]));
  }
  return e === t;
}
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.githubUrl = KT;
Wi.githubTagPrefix = JT;
Wi.getS3LikeProviderBaseUrl = QT;
function KT(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function JT(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function QT(e) {
  const t = e.provider;
  if (t === "s3")
    return ZT(e);
  if (t === "spaces")
    return eR(e);
  throw new Error(`Not supported provider: ${t}`);
}
function ZT(e) {
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
  return ux(t, e.path);
}
function ux(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function eR(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return ux(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var su = {};
Object.defineProperty(su, "__esModule", { value: !0 });
su.retry = px;
const tR = on;
async function px(e, t) {
  var n;
  const { retries: r, interval: i, backoff: a = 0, attempt: o = 0, shouldRetry: s, cancellationToken: c = new tR.CancellationToken() } = t;
  try {
    return await e();
  } catch (f) {
    if (await Promise.resolve((n = s == null ? void 0 : s(f)) !== null && n !== void 0 ? n : !0) && r > 0 && !c.cancelled)
      return await new Promise((l) => setTimeout(l, i + a * o)), await px(e, { ...t, retries: r - 1, attempt: o + 1 });
    throw f;
  }
}
var cu = {};
Object.defineProperty(cu, "__esModule", { value: !0 });
cu.parseDn = nR;
function nR(e) {
  let t = !1, n = null, r = "", i = 0;
  e = e.trim();
  const a = /* @__PURE__ */ new Map();
  for (let o = 0; o <= e.length; o++) {
    if (o === e.length) {
      n !== null && a.set(n, r);
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
        const c = parseInt(e.slice(o, o + 2), 16);
        Number.isNaN(c) ? r += e[o] : (o++, r += String.fromCharCode(c));
        continue;
      }
      if (n === null && s === "=") {
        n = r, r = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        n !== null && a.set(n, r), n = null, r = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (r.length === 0)
        continue;
      if (o > i) {
        let c = o;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || n === null && e[i] === "=" || n !== null && e[i] === "+") {
        o = i - 1;
        continue;
      }
    }
    r += s;
  }
  return a;
}
var Tr = {};
Object.defineProperty(Tr, "__esModule", { value: !0 });
Tr.nil = Tr.UUID = void 0;
const fx = jn, dx = kr, rR = "options.name must be either a string or a Buffer", nd = (0, fx.randomBytes)(16);
nd[0] = nd[0] | 1;
const Ga = {}, oe = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ga[t] = e, oe[e] = t;
}
class Bn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = Bn.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return iR(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = aR(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ga[t[14] + t[15]] & 240) >> 4,
        variant: rd((Ga[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < n + 16)
        return !1;
      let r = 0;
      for (; r < 16 && t[n + r] === 0; r++)
        ;
      return r === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[n + 6] & 240) >> 4,
        variant: rd((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, dx.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = Ga[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
Tr.UUID = Bn;
Bn.OID = Bn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function rd(e) {
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
var ei;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(ei || (ei = {}));
function iR(e, t, n, r, i = ei.ASCII) {
  const a = (0, fx.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, dx.newError)(rR, "ERR_INVALID_UUID_NAME");
  a.update(r), a.update(e);
  const s = a.digest();
  let c;
  switch (i) {
    case ei.BINARY:
      s[6] = s[6] & 15 | n, s[8] = s[8] & 63 | 128, c = s;
      break;
    case ei.OBJECT:
      s[6] = s[6] & 15 | n, s[8] = s[8] & 63 | 128, c = new Bn(s);
      break;
    default:
      c = oe[s[0]] + oe[s[1]] + oe[s[2]] + oe[s[3]] + "-" + oe[s[4]] + oe[s[5]] + "-" + oe[s[6] & 15 | n] + oe[s[7]] + "-" + oe[s[8] & 63 | 128] + oe[s[9]] + "-" + oe[s[10]] + oe[s[11]] + oe[s[12]] + oe[s[13]] + oe[s[14]] + oe[s[15]];
      break;
  }
  return c;
}
function aR(e) {
  return oe[e[0]] + oe[e[1]] + oe[e[2]] + oe[e[3]] + "-" + oe[e[4]] + oe[e[5]] + "-" + oe[e[6]] + oe[e[7]] + "-" + oe[e[8]] + oe[e[9]] + "-" + oe[e[10]] + oe[e[11]] + oe[e[12]] + oe[e[13]] + oe[e[14]] + oe[e[15]];
}
Tr.nil = new Bn("00000000-0000-0000-0000-000000000000");
var Vi = {}, mx = {};
(function(e) {
  (function(t) {
    t.parser = function(m, p) {
      return new r(m, p);
    }, t.SAXParser = r, t.SAXStream = l, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
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
    function r(m, p) {
      if (!(this instanceof r))
        return new r(m, p);
      var R = this;
      a(R), R.q = R.c = "", R.bufferCheckPosition = t.MAX_BUFFER_LENGTH, R.opt = p || {}, R.opt.lowercase = R.opt.lowercase || R.opt.lowercasetags, R.looseCase = R.opt.lowercase ? "toLowerCase" : "toUpperCase", R.tags = [], R.closed = R.closedRoot = R.sawRoot = !1, R.tag = R.error = null, R.strict = !!m, R.noscript = !!(m || R.opt.noscript), R.state = S.BEGIN, R.strictEntities = R.opt.strictEntities, R.ENTITIES = R.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), R.attribList = [], R.opt.xmlns && (R.ns = Object.create(x)), R.opt.unquotedAttributeValues === void 0 && (R.opt.unquotedAttributeValues = !m), R.trackPosition = R.opt.position !== !1, R.trackPosition && (R.position = R.line = R.column = 0), H(R, "onready");
    }
    Object.create || (Object.create = function(m) {
      function p() {
      }
      p.prototype = m;
      var R = new p();
      return R;
    }), Object.keys || (Object.keys = function(m) {
      var p = [];
      for (var R in m) m.hasOwnProperty(R) && p.push(R);
      return p;
    });
    function i(m) {
      for (var p = Math.max(t.MAX_BUFFER_LENGTH, 10), R = 0, _ = 0, K = n.length; _ < K; _++) {
        var Y = m[n[_]].length;
        if (Y > p)
          switch (n[_]) {
            case "textNode":
              J(m);
              break;
            case "cdata":
              z(m, "oncdata", m.cdata), m.cdata = "";
              break;
            case "script":
              z(m, "onscript", m.script), m.script = "";
              break;
            default:
              N(m, "Max buffer length exceeded: " + n[_]);
          }
        R = Math.max(R, Y);
      }
      var Q = t.MAX_BUFFER_LENGTH - R;
      m.bufferCheckPosition = Q + m.position;
    }
    function a(m) {
      for (var p = 0, R = n.length; p < R; p++)
        m[n[p]] = "";
    }
    function o(m) {
      J(m), m.cdata !== "" && (z(m, "oncdata", m.cdata), m.cdata = ""), m.script !== "" && (z(m, "onscript", m.script), m.script = "");
    }
    r.prototype = {
      end: function() {
        B(this);
      },
      write: se,
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
    var c = t.EVENTS.filter(function(m) {
      return m !== "error" && m !== "end";
    });
    function f(m, p) {
      return new l(m, p);
    }
    function l(m, p) {
      if (!(this instanceof l))
        return new l(m, p);
      s.apply(this), this._parser = new r(m, p), this.writable = !0, this.readable = !0;
      var R = this;
      this._parser.onend = function() {
        R.emit("end");
      }, this._parser.onerror = function(_) {
        R.emit("error", _), R._parser.error = null;
      }, this._decoder = null, c.forEach(function(_) {
        Object.defineProperty(R, "on" + _, {
          get: function() {
            return R._parser["on" + _];
          },
          set: function(K) {
            if (!K)
              return R.removeAllListeners(_), R._parser["on" + _] = K, K;
            R.on(_, K);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(s.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(m) {
      return typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(m) && (this._decoder || (this._decoder = new TextDecoder("utf8")), m = this._decoder.decode(m, { stream: !0 })), this._parser.write(m.toString()), this.emit("data", m), !0;
    }, l.prototype.end = function(m) {
      if (m && m.length && this.write(m), this._decoder) {
        var p = this._decoder.decode();
        p && (this._parser.write(p), this.emit("data", p));
      }
      return this._parser.end(), !0;
    }, l.prototype.on = function(m, p) {
      var R = this;
      return !R._parser["on" + m] && c.indexOf(m) !== -1 && (R._parser["on" + m] = function() {
        var _ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        _.splice(0, 0, m), R.emit.apply(R, _);
      }), s.prototype.on.call(R, m, p);
    };
    var u = "[CDATA[", d = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", x = { xml: h, xmlns: v }, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, y = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, b = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function D(m) {
      return m === " " || m === `
` || m === "\r" || m === "	";
    }
    function U(m) {
      return m === '"' || m === "'";
    }
    function k(m) {
      return m === ">" || D(m);
    }
    function $(m, p) {
      return m.test(p);
    }
    function G(m, p) {
      return !$(m, p);
    }
    var S = 0;
    t.STATE = {
      BEGIN: S++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: S++,
      // leading whitespace
      TEXT: S++,
      // general stuff
      TEXT_ENTITY: S++,
      // &amp and such.
      OPEN_WAKA: S++,
      // <
      SGML_DECL: S++,
      // <!BLARG
      SGML_DECL_QUOTED: S++,
      // <!BLARG foo "bar
      DOCTYPE: S++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: S++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: S++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: S++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: S++,
      // <!-
      COMMENT: S++,
      // <!--
      COMMENT_ENDING: S++,
      // <!-- blah -
      COMMENT_ENDED: S++,
      // <!-- blah --
      CDATA: S++,
      // <![CDATA[ something
      CDATA_ENDING: S++,
      // ]
      CDATA_ENDING_2: S++,
      // ]]
      PROC_INST: S++,
      // <?hi
      PROC_INST_BODY: S++,
      // <?hi there
      PROC_INST_ENDING: S++,
      // <?hi "there" ?
      OPEN_TAG: S++,
      // <strong
      OPEN_TAG_SLASH: S++,
      // <strong /
      ATTRIB: S++,
      // <a
      ATTRIB_NAME: S++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: S++,
      // <a foo _
      ATTRIB_VALUE: S++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: S++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: S++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: S++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: S++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: S++,
      // <foo bar=&quot
      CLOSE_TAG: S++,
      // </a
      CLOSE_TAG_SAW_WHITE: S++,
      // </a   >
      SCRIPT: S++,
      // <script> ...
      SCRIPT_ENDING: S++
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
    }, Object.keys(t.ENTITIES).forEach(function(m) {
      var p = t.ENTITIES[m], R = typeof p == "number" ? String.fromCharCode(p) : p;
      t.ENTITIES[m] = R;
    });
    for (var M in t.STATE)
      t.STATE[t.STATE[M]] = M;
    S = t.STATE;
    function H(m, p, R) {
      m[p] && m[p](R);
    }
    function z(m, p, R) {
      m.textNode && J(m), H(m, p, R);
    }
    function J(m) {
      m.textNode = L(m.opt, m.textNode), m.textNode && H(m, "ontext", m.textNode), m.textNode = "";
    }
    function L(m, p) {
      return m.trim && (p = p.trim()), m.normalize && (p = p.replace(/\s+/g, " ")), p;
    }
    function N(m, p) {
      return J(m), m.trackPosition && (p += `
Line: ` + m.line + `
Column: ` + m.column + `
Char: ` + m.c), p = new Error(p), m.error = p, H(m, "onerror", p), m;
    }
    function B(m) {
      return m.sawRoot && !m.closedRoot && w(m, "Unclosed root tag"), m.state !== S.BEGIN && m.state !== S.BEGIN_WHITESPACE && m.state !== S.TEXT && N(m, "Unexpected end"), J(m), m.c = "", m.closed = !0, H(m, "onend"), r.call(m, m.strict, m.opt), m;
    }
    function w(m, p) {
      if (typeof m != "object" || !(m instanceof r))
        throw new Error("bad call to strictFail");
      m.strict && N(m, p);
    }
    function A(m) {
      m.strict || (m.tagName = m.tagName[m.looseCase]());
      var p = m.tags[m.tags.length - 1] || m, R = m.tag = { name: m.tagName, attributes: {} };
      m.opt.xmlns && (R.ns = p.ns), m.attribList.length = 0, z(m, "onopentagstart", R);
    }
    function C(m, p) {
      var R = m.indexOf(":"), _ = R < 0 ? ["", m] : m.split(":"), K = _[0], Y = _[1];
      return p && m === "xmlns" && (K = "xmlns", Y = ""), { prefix: K, local: Y };
    }
    function F(m) {
      if (m.strict || (m.attribName = m.attribName[m.looseCase]()), m.attribList.indexOf(m.attribName) !== -1 || m.tag.attributes.hasOwnProperty(m.attribName)) {
        m.attribName = m.attribValue = "";
        return;
      }
      if (m.opt.xmlns) {
        var p = C(m.attribName, !0), R = p.prefix, _ = p.local;
        if (R === "xmlns")
          if (_ === "xml" && m.attribValue !== h)
            w(
              m,
              "xml: prefix must be bound to " + h + `
Actual: ` + m.attribValue
            );
          else if (_ === "xmlns" && m.attribValue !== v)
            w(
              m,
              "xmlns: prefix must be bound to " + v + `
Actual: ` + m.attribValue
            );
          else {
            var K = m.tag, Y = m.tags[m.tags.length - 1] || m;
            K.ns === Y.ns && (K.ns = Object.create(Y.ns)), K.ns[_] = m.attribValue;
          }
        m.attribList.push([m.attribName, m.attribValue]);
      } else
        m.tag.attributes[m.attribName] = m.attribValue, z(m, "onattribute", {
          name: m.attribName,
          value: m.attribValue
        });
      m.attribName = m.attribValue = "";
    }
    function I(m, p) {
      if (m.opt.xmlns) {
        var R = m.tag, _ = C(m.tagName);
        R.prefix = _.prefix, R.local = _.local, R.uri = R.ns[_.prefix] || "", R.prefix && !R.uri && (w(
          m,
          "Unbound namespace prefix: " + JSON.stringify(m.tagName)
        ), R.uri = _.prefix);
        var K = m.tags[m.tags.length - 1] || m;
        R.ns && K.ns !== R.ns && Object.keys(R.ns).forEach(function(qt) {
          z(m, "onopennamespace", {
            prefix: qt,
            uri: R.ns[qt]
          });
        });
        for (var Y = 0, Q = m.attribList.length; Y < Q; Y++) {
          var ve = m.attribList[Y], Se = ve[0], pt = ve[1], Ee = C(Se, !0), He = Ee.prefix, Vn = Ee.local, Mt = He === "" ? "" : R.ns[He] || "", Dt = {
            name: Se,
            value: pt,
            prefix: He,
            local: Vn,
            uri: Mt
          };
          He && He !== "xmlns" && !Mt && (w(
            m,
            "Unbound namespace prefix: " + JSON.stringify(He)
          ), Dt.uri = He), m.tag.attributes[Se] = Dt, z(m, "onattribute", Dt);
        }
        m.attribList.length = 0;
      }
      m.tag.isSelfClosing = !!p, m.sawRoot = !0, m.tags.push(m.tag), z(m, "onopentag", m.tag), p || (!m.noscript && m.tagName.toLowerCase() === "script" ? m.state = S.SCRIPT : m.state = S.TEXT, m.tag = null, m.tagName = ""), m.attribName = m.attribValue = "", m.attribList.length = 0;
    }
    function j(m) {
      if (!m.tagName) {
        w(m, "Weird empty close tag."), m.textNode += "</>", m.state = S.TEXT;
        return;
      }
      if (m.script) {
        if (m.tagName !== "script") {
          m.script += "</" + m.tagName + ">", m.tagName = "", m.state = S.SCRIPT;
          return;
        }
        z(m, "onscript", m.script), m.script = "";
      }
      var p = m.tags.length, R = m.tagName;
      m.strict || (R = R[m.looseCase]());
      for (var _ = R; p--; ) {
        var K = m.tags[p];
        if (K.name !== _)
          w(m, "Unexpected close tag");
        else
          break;
      }
      if (p < 0) {
        w(m, "Unmatched closing tag: " + m.tagName), m.textNode += "</" + m.tagName + ">", m.state = S.TEXT;
        return;
      }
      m.tagName = R;
      for (var Y = m.tags.length; Y-- > p; ) {
        var Q = m.tag = m.tags.pop();
        m.tagName = m.tag.name, z(m, "onclosetag", m.tagName);
        var ve = {};
        for (var Se in Q.ns)
          ve[Se] = Q.ns[Se];
        var pt = m.tags[m.tags.length - 1] || m;
        m.opt.xmlns && Q.ns !== pt.ns && Object.keys(Q.ns).forEach(function(Ee) {
          var He = Q.ns[Ee];
          z(m, "onclosenamespace", { prefix: Ee, uri: He });
        });
      }
      p === 0 && (m.closedRoot = !0), m.tagName = m.attribValue = m.attribName = "", m.attribList.length = 0, m.state = S.TEXT;
    }
    function Z(m) {
      var p = m.entity, R = p.toLowerCase(), _, K = "";
      return m.ENTITIES[p] ? m.ENTITIES[p] : m.ENTITIES[R] ? m.ENTITIES[R] : (p = R, p.charAt(0) === "#" && (p.charAt(1) === "x" ? (p = p.slice(2), _ = parseInt(p, 16), K = _.toString(16)) : (p = p.slice(1), _ = parseInt(p, 10), K = _.toString(10))), p = p.replace(/^0+/, ""), isNaN(_) || K.toLowerCase() !== p || _ < 0 || _ > 1114111 ? (w(m, "Invalid character entity"), "&" + m.entity + ";") : String.fromCodePoint(_));
    }
    function ee(m, p) {
      p === "<" ? (m.state = S.OPEN_WAKA, m.startTagPosition = m.position) : D(p) || (w(m, "Non-whitespace before first tag."), m.textNode = p, m.state = S.TEXT);
    }
    function V(m, p) {
      var R = "";
      return p < m.length && (R = m.charAt(p)), R;
    }
    function se(m) {
      var p = this;
      if (this.error)
        throw this.error;
      if (p.closed)
        return N(
          p,
          "Cannot write after close. Assign an onready handler."
        );
      if (m === null)
        return B(p);
      typeof m == "object" && (m = m.toString());
      for (var R = 0, _ = ""; _ = V(m, R++), p.c = _, !!_; )
        switch (p.trackPosition && (p.position++, _ === `
` ? (p.line++, p.column = 0) : p.column++), p.state) {
          case S.BEGIN:
            if (p.state = S.BEGIN_WHITESPACE, _ === "\uFEFF")
              continue;
            ee(p, _);
            continue;
          case S.BEGIN_WHITESPACE:
            ee(p, _);
            continue;
          case S.TEXT:
            if (p.sawRoot && !p.closedRoot) {
              for (var Y = R - 1; _ && _ !== "<" && _ !== "&"; )
                _ = V(m, R++), _ && p.trackPosition && (p.position++, _ === `
` ? (p.line++, p.column = 0) : p.column++);
              p.textNode += m.substring(Y, R - 1);
            }
            _ === "<" && !(p.sawRoot && p.closedRoot && !p.strict) ? (p.state = S.OPEN_WAKA, p.startTagPosition = p.position) : (!D(_) && (!p.sawRoot || p.closedRoot) && w(p, "Text data outside of root node."), _ === "&" ? p.state = S.TEXT_ENTITY : p.textNode += _);
            continue;
          case S.SCRIPT:
            _ === "<" ? p.state = S.SCRIPT_ENDING : p.script += _;
            continue;
          case S.SCRIPT_ENDING:
            _ === "/" ? p.state = S.CLOSE_TAG : (p.script += "<" + _, p.state = S.SCRIPT);
            continue;
          case S.OPEN_WAKA:
            if (_ === "!")
              p.state = S.SGML_DECL, p.sgmlDecl = "";
            else if (!D(_)) if ($(g, _))
              p.state = S.OPEN_TAG, p.tagName = _;
            else if (_ === "/")
              p.state = S.CLOSE_TAG, p.tagName = "";
            else if (_ === "?")
              p.state = S.PROC_INST, p.procInstName = p.procInstBody = "";
            else {
              if (w(p, "Unencoded <"), p.startTagPosition + 1 < p.position) {
                var K = p.position - p.startTagPosition;
                _ = new Array(K).join(" ") + _;
              }
              p.textNode += "<" + _, p.state = S.TEXT;
            }
            continue;
          case S.SGML_DECL:
            if (p.sgmlDecl + _ === "--") {
              p.state = S.COMMENT, p.comment = "", p.sgmlDecl = "";
              continue;
            }
            p.doctype && p.doctype !== !0 && p.sgmlDecl ? (p.state = S.DOCTYPE_DTD, p.doctype += "<!" + p.sgmlDecl + _, p.sgmlDecl = "") : (p.sgmlDecl + _).toUpperCase() === u ? (z(p, "onopencdata"), p.state = S.CDATA, p.sgmlDecl = "", p.cdata = "") : (p.sgmlDecl + _).toUpperCase() === d ? (p.state = S.DOCTYPE, (p.doctype || p.sawRoot) && w(
              p,
              "Inappropriately located doctype declaration"
            ), p.doctype = "", p.sgmlDecl = "") : _ === ">" ? (z(p, "onsgmldeclaration", p.sgmlDecl), p.sgmlDecl = "", p.state = S.TEXT) : (U(_) && (p.state = S.SGML_DECL_QUOTED), p.sgmlDecl += _);
            continue;
          case S.SGML_DECL_QUOTED:
            _ === p.q && (p.state = S.SGML_DECL, p.q = ""), p.sgmlDecl += _;
            continue;
          case S.DOCTYPE:
            _ === ">" ? (p.state = S.TEXT, z(p, "ondoctype", p.doctype), p.doctype = !0) : (p.doctype += _, _ === "[" ? p.state = S.DOCTYPE_DTD : U(_) && (p.state = S.DOCTYPE_QUOTED, p.q = _));
            continue;
          case S.DOCTYPE_QUOTED:
            p.doctype += _, _ === p.q && (p.q = "", p.state = S.DOCTYPE);
            continue;
          case S.DOCTYPE_DTD:
            _ === "]" ? (p.doctype += _, p.state = S.DOCTYPE) : _ === "<" ? (p.state = S.OPEN_WAKA, p.startTagPosition = p.position) : U(_) ? (p.doctype += _, p.state = S.DOCTYPE_DTD_QUOTED, p.q = _) : p.doctype += _;
            continue;
          case S.DOCTYPE_DTD_QUOTED:
            p.doctype += _, _ === p.q && (p.state = S.DOCTYPE_DTD, p.q = "");
            continue;
          case S.COMMENT:
            _ === "-" ? p.state = S.COMMENT_ENDING : p.comment += _;
            continue;
          case S.COMMENT_ENDING:
            _ === "-" ? (p.state = S.COMMENT_ENDED, p.comment = L(p.opt, p.comment), p.comment && z(p, "oncomment", p.comment), p.comment = "") : (p.comment += "-" + _, p.state = S.COMMENT);
            continue;
          case S.COMMENT_ENDED:
            _ !== ">" ? (w(p, "Malformed comment"), p.comment += "--" + _, p.state = S.COMMENT) : p.doctype && p.doctype !== !0 ? p.state = S.DOCTYPE_DTD : p.state = S.TEXT;
            continue;
          case S.CDATA:
            for (var Y = R - 1; _ && _ !== "]"; )
              _ = V(m, R++), _ && p.trackPosition && (p.position++, _ === `
` ? (p.line++, p.column = 0) : p.column++);
            p.cdata += m.substring(Y, R - 1), _ === "]" && (p.state = S.CDATA_ENDING);
            continue;
          case S.CDATA_ENDING:
            _ === "]" ? p.state = S.CDATA_ENDING_2 : (p.cdata += "]" + _, p.state = S.CDATA);
            continue;
          case S.CDATA_ENDING_2:
            _ === ">" ? (p.cdata && z(p, "oncdata", p.cdata), z(p, "onclosecdata"), p.cdata = "", p.state = S.TEXT) : _ === "]" ? p.cdata += "]" : (p.cdata += "]]" + _, p.state = S.CDATA);
            continue;
          case S.PROC_INST:
            _ === "?" ? p.state = S.PROC_INST_ENDING : D(_) ? p.state = S.PROC_INST_BODY : p.procInstName += _;
            continue;
          case S.PROC_INST_BODY:
            if (!p.procInstBody && D(_))
              continue;
            _ === "?" ? p.state = S.PROC_INST_ENDING : p.procInstBody += _;
            continue;
          case S.PROC_INST_ENDING:
            _ === ">" ? (z(p, "onprocessinginstruction", {
              name: p.procInstName,
              body: p.procInstBody
            }), p.procInstName = p.procInstBody = "", p.state = S.TEXT) : (p.procInstBody += "?" + _, p.state = S.PROC_INST_BODY);
            continue;
          case S.OPEN_TAG:
            $(y, _) ? p.tagName += _ : (A(p), _ === ">" ? I(p) : _ === "/" ? p.state = S.OPEN_TAG_SLASH : (D(_) || w(p, "Invalid character in tag name"), p.state = S.ATTRIB));
            continue;
          case S.OPEN_TAG_SLASH:
            _ === ">" ? (I(p, !0), j(p)) : (w(
              p,
              "Forward-slash in opening tag not followed by >"
            ), p.state = S.ATTRIB);
            continue;
          case S.ATTRIB:
            if (D(_))
              continue;
            _ === ">" ? I(p) : _ === "/" ? p.state = S.OPEN_TAG_SLASH : $(g, _) ? (p.attribName = _, p.attribValue = "", p.state = S.ATTRIB_NAME) : w(p, "Invalid attribute name");
            continue;
          case S.ATTRIB_NAME:
            _ === "=" ? p.state = S.ATTRIB_VALUE : _ === ">" ? (w(p, "Attribute without value"), p.attribValue = p.attribName, F(p), I(p)) : D(_) ? p.state = S.ATTRIB_NAME_SAW_WHITE : $(y, _) ? p.attribName += _ : w(p, "Invalid attribute name");
            continue;
          case S.ATTRIB_NAME_SAW_WHITE:
            if (_ === "=")
              p.state = S.ATTRIB_VALUE;
            else {
              if (D(_))
                continue;
              w(p, "Attribute without value"), p.tag.attributes[p.attribName] = "", p.attribValue = "", z(p, "onattribute", {
                name: p.attribName,
                value: ""
              }), p.attribName = "", _ === ">" ? I(p) : $(g, _) ? (p.attribName = _, p.state = S.ATTRIB_NAME) : (w(p, "Invalid attribute name"), p.state = S.ATTRIB);
            }
            continue;
          case S.ATTRIB_VALUE:
            if (D(_))
              continue;
            U(_) ? (p.q = _, p.state = S.ATTRIB_VALUE_QUOTED) : (p.opt.unquotedAttributeValues || N(p, "Unquoted attribute value"), p.state = S.ATTRIB_VALUE_UNQUOTED, p.attribValue = _);
            continue;
          case S.ATTRIB_VALUE_QUOTED:
            if (_ !== p.q) {
              _ === "&" ? p.state = S.ATTRIB_VALUE_ENTITY_Q : p.attribValue += _;
              continue;
            }
            F(p), p.q = "", p.state = S.ATTRIB_VALUE_CLOSED;
            continue;
          case S.ATTRIB_VALUE_CLOSED:
            D(_) ? p.state = S.ATTRIB : _ === ">" ? I(p) : _ === "/" ? p.state = S.OPEN_TAG_SLASH : $(g, _) ? (w(p, "No whitespace between attributes"), p.attribName = _, p.attribValue = "", p.state = S.ATTRIB_NAME) : w(p, "Invalid attribute name");
            continue;
          case S.ATTRIB_VALUE_UNQUOTED:
            if (!k(_)) {
              _ === "&" ? p.state = S.ATTRIB_VALUE_ENTITY_U : p.attribValue += _;
              continue;
            }
            F(p), _ === ">" ? I(p) : p.state = S.ATTRIB;
            continue;
          case S.CLOSE_TAG:
            if (p.tagName)
              _ === ">" ? j(p) : $(y, _) ? p.tagName += _ : p.script ? (p.script += "</" + p.tagName + _, p.tagName = "", p.state = S.SCRIPT) : (D(_) || w(p, "Invalid tagname in closing tag"), p.state = S.CLOSE_TAG_SAW_WHITE);
            else {
              if (D(_))
                continue;
              G(g, _) ? p.script ? (p.script += "</" + _, p.state = S.SCRIPT) : w(p, "Invalid tagname in closing tag.") : p.tagName = _;
            }
            continue;
          case S.CLOSE_TAG_SAW_WHITE:
            if (D(_))
              continue;
            _ === ">" ? j(p) : w(p, "Invalid characters in closing tag");
            continue;
          case S.TEXT_ENTITY:
          case S.ATTRIB_VALUE_ENTITY_Q:
          case S.ATTRIB_VALUE_ENTITY_U:
            var Q, ve;
            switch (p.state) {
              case S.TEXT_ENTITY:
                Q = S.TEXT, ve = "textNode";
                break;
              case S.ATTRIB_VALUE_ENTITY_Q:
                Q = S.ATTRIB_VALUE_QUOTED, ve = "attribValue";
                break;
              case S.ATTRIB_VALUE_ENTITY_U:
                Q = S.ATTRIB_VALUE_UNQUOTED, ve = "attribValue";
                break;
            }
            if (_ === ";") {
              var Se = Z(p);
              p.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Se) ? (p.entity = "", p.state = Q, p.write(Se)) : (p[ve] += Se, p.entity = "", p.state = Q);
            } else $(p.entity.length ? T : b, _) ? p.entity += _ : (w(p, "Invalid character in entity name"), p[ve] += "&" + p.entity + _, p.entity = "", p.state = Q);
            continue;
          default:
            throw new Error(p, "Unknown state: " + p.state);
        }
      return p.position >= p.bufferCheckPosition && i(p), p;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var m = String.fromCharCode, p = Math.floor, R = function() {
        var _ = 16384, K = [], Y, Q, ve = -1, Se = arguments.length;
        if (!Se)
          return "";
        for (var pt = ""; ++ve < Se; ) {
          var Ee = Number(arguments[ve]);
          if (!isFinite(Ee) || // `NaN`, `+Infinity`, or `-Infinity`
          Ee < 0 || // not a valid Unicode code point
          Ee > 1114111 || // not a valid Unicode code point
          p(Ee) !== Ee)
            throw RangeError("Invalid code point: " + Ee);
          Ee <= 65535 ? K.push(Ee) : (Ee -= 65536, Y = (Ee >> 10) + 55296, Q = Ee % 1024 + 56320, K.push(Y, Q)), (ve + 1 === Se || K.length > _) && (pt += m.apply(null, K), K.length = 0);
        }
        return pt;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: R,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = R;
    }();
  })(e);
})(mx);
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.XElement = void 0;
Vi.parseXml = lR;
const oR = mx, wa = kr;
class hx {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, wa.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!cR(t))
      throw (0, wa.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, wa.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, wa.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (id(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => id(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
Vi.XElement = hx;
const sR = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function cR(e) {
  return sR.test(e);
}
function id(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function lR(e) {
  let t = null;
  const n = oR.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const a = new hx(i.name);
    if (a.attributes = i.attributes, t === null)
      t = a;
    else {
      const o = r[r.length - 1];
      o.elements == null && (o.elements = []), o.elements.push(a);
    }
    r.push(a);
  }, n.onclosetag = () => {
    r.pop();
  }, n.ontext = (i) => {
    r.length > 0 && (r[r.length - 1].value = i);
  }, n.oncdata = (i) => {
    const a = r[r.length - 1];
    a.value = i, a.isCData = !0;
  }, n.onerror = (i) => {
    throw i;
  }, n.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = u;
  var t = on;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = kr;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return n.newError;
  } });
  var r = Ve;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } });
  var i = jo;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var a = Gi;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var o = Wi;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return o.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return o.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return o.githubTagPrefix;
  } });
  var s = su;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var c = cu;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var f = Tr;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return f.UUID;
  } });
  var l = Vi;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(Re);
var Be = {}, lu = {}, bt = {};
function xx(e) {
  return typeof e > "u" || e === null;
}
function uR(e) {
  return typeof e == "object" && e !== null;
}
function pR(e) {
  return Array.isArray(e) ? e : xx(e) ? [] : [e];
}
function fR(e, t) {
  var n, r, i, a;
  if (t)
    for (a = Object.keys(t), n = 0, r = a.length; n < r; n += 1)
      i = a[n], e[i] = t[i];
  return e;
}
function dR(e, t) {
  var n = "", r;
  for (r = 0; r < t; r += 1)
    n += e;
  return n;
}
function mR(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
bt.isNothing = xx;
bt.isObject = uR;
bt.toArray = pR;
bt.repeat = dR;
bt.isNegativeZero = mR;
bt.extend = fR;
function vx(e, t) {
  var n = "", r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function di(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = vx(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
di.prototype = Object.create(Error.prototype);
di.prototype.constructor = di;
di.prototype.toString = function(t) {
  return this.name + ": " + vx(this, t);
};
var Yi = di, Kr = bt;
function oc(e, t, n, r, i) {
  var a = "", o = "", s = Math.floor(i / 2) - 1;
  return r - t > s && (a = " ... ", t = r - s + a.length), n - r > s && (o = " ...", n = r + s - o.length), {
    str: a + e.slice(t, n).replace(/\t/g, "→") + o,
    pos: r - t + a.length
    // relative position
  };
}
function sc(e, t) {
  return Kr.repeat(" ", t - e.length) + e;
}
function hR(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var n = /\r?\n|\r|\0/g, r = [0], i = [], a, o = -1; a = n.exec(e.buffer); )
    i.push(a.index), r.push(a.index + a[0].length), e.position <= a.index && o < 0 && (o = r.length - 2);
  o < 0 && (o = r.length - 1);
  var s = "", c, f, l = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(o - c < 0); c++)
    f = oc(
      e.buffer,
      r[o - c],
      i[o - c],
      e.position - (r[o] - r[o - c]),
      u
    ), s = Kr.repeat(" ", t.indent) + sc((e.line - c + 1).toString(), l) + " | " + f.str + `
` + s;
  for (f = oc(e.buffer, r[o], i[o], e.position, u), s += Kr.repeat(" ", t.indent) + sc((e.line + 1).toString(), l) + " | " + f.str + `
`, s += Kr.repeat("-", t.indent + l + 3 + f.pos) + `^
`, c = 1; c <= t.linesAfter && !(o + c >= i.length); c++)
    f = oc(
      e.buffer,
      r[o + c],
      i[o + c],
      e.position - (r[o] - r[o + c]),
      u
    ), s += Kr.repeat(" ", t.indent) + sc((e.line + c + 1).toString(), l) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var xR = hR, ad = Yi, vR = [
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
], gR = [
  "scalar",
  "sequence",
  "mapping"
];
function yR(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function bR(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (vR.indexOf(n) === -1)
      throw new ad('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = yR(t.styleAliases || null), gR.indexOf(this.kind) === -1)
    throw new ad('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Je = bR, Wr = Yi, cc = Je;
function od(e, t) {
  var n = [];
  return e[t].forEach(function(r) {
    var i = n.length;
    n.forEach(function(a, o) {
      a.tag === r.tag && a.kind === r.kind && a.multi === r.multi && (i = o);
    }), n[i] = r;
  }), n;
}
function wR() {
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
  }, t, n;
  function r(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, n = arguments.length; t < n; t += 1)
    arguments[t].forEach(r);
  return e;
}
function tl(e) {
  return this.extend(e);
}
tl.prototype.extend = function(t) {
  var n = [], r = [];
  if (t instanceof cc)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new Wr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(a) {
    if (!(a instanceof cc))
      throw new Wr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (a.loadKind && a.loadKind !== "scalar")
      throw new Wr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (a.multi)
      throw new Wr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(a) {
    if (!(a instanceof cc))
      throw new Wr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(tl.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = od(i, "implicit"), i.compiledExplicit = od(i, "explicit"), i.compiledTypeMap = wR(i.compiledImplicit, i.compiledExplicit), i;
};
var gx = tl, ER = Je, yx = new ER("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), _R = Je, bx = new _R("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), SR = Je, wx = new SR("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), AR = gx, Ex = new AR({
  explicit: [
    yx,
    bx,
    wx
  ]
}), TR = Je;
function RR(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function CR() {
  return null;
}
function OR(e) {
  return e === null;
}
var _x = new TR("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: RR,
  construct: CR,
  predicate: OR,
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
}), PR = Je;
function FR(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function DR(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function kR(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Sx = new PR("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: FR,
  construct: DR,
  predicate: kR,
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
}), IR = bt, NR = Je;
function $R(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function LR(e) {
  return 48 <= e && e <= 55;
}
function UR(e) {
  return 48 <= e && e <= 57;
}
function BR(e) {
  if (e === null) return !1;
  var t = e.length, n = 0, r = !1, i;
  if (!t) return !1;
  if (i = e[n], (i === "-" || i === "+") && (i = e[++n]), i === "0") {
    if (n + 1 === t) return !0;
    if (i = e[++n], i === "b") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "x") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!$R(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "o") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!LR(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; n < t; n++)
    if (i = e[n], i !== "_") {
      if (!UR(e.charCodeAt(n)))
        return !1;
      r = !0;
    }
  return !(!r || i === "_");
}
function jR(e) {
  var t = e, n = 1, r;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), r = t[0], (r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function MR(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !IR.isNegativeZero(e);
}
var Ax = new NR("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: BR,
  construct: jR,
  predicate: MR,
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
}), Tx = bt, qR = Je, zR = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function HR(e) {
  return !(e === null || !zR.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function GR(e) {
  var t, n;
  return t = e.replace(/_/g, "").toLowerCase(), n = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
var WR = /^[-+]?[0-9]+e/;
function VR(e, t) {
  var n;
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
  else if (Tx.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), WR.test(n) ? n.replace("e", ".e") : n;
}
function YR(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Tx.isNegativeZero(e));
}
var Rx = new qR("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: HR,
  construct: GR,
  predicate: YR,
  represent: VR,
  defaultStyle: "lowercase"
}), Cx = Ex.extend({
  implicit: [
    _x,
    Sx,
    Ax,
    Rx
  ]
}), Ox = Cx, XR = Je, Px = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Fx = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function KR(e) {
  return e === null ? !1 : Px.exec(e) !== null || Fx.exec(e) !== null;
}
function JR(e) {
  var t, n, r, i, a, o, s, c = 0, f = null, l, u, d;
  if (t = Px.exec(e), t === null && (t = Fx.exec(e)), t === null) throw new Error("Date resolve error");
  if (n = +t[1], r = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(n, r, i));
  if (a = +t[4], o = +t[5], s = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), f = (l * 60 + u) * 6e4, t[9] === "-" && (f = -f)), d = new Date(Date.UTC(n, r, i, a, o, s, c)), f && d.setTime(d.getTime() - f), d;
}
function QR(e) {
  return e.toISOString();
}
var Dx = new XR("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: KR,
  construct: JR,
  instanceOf: Date,
  represent: QR
}), ZR = Je;
function eC(e) {
  return e === "<<" || e === null;
}
var kx = new ZR("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: eC
}), tC = Je, uu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function nC(e) {
  if (e === null) return !1;
  var t, n, r = 0, i = e.length, a = uu;
  for (n = 0; n < i; n++)
    if (t = a.indexOf(e.charAt(n)), !(t > 64)) {
      if (t < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function rC(e) {
  var t, n, r = e.replace(/[\r\n=]/g, ""), i = r.length, a = uu, o = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | a.indexOf(r.charAt(t));
  return n = i % 4 * 6, n === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : n === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : n === 12 && s.push(o >> 4 & 255), new Uint8Array(s);
}
function iC(e) {
  var t = "", n = 0, r, i, a = e.length, o = uu;
  for (r = 0; r < a; r++)
    r % 3 === 0 && r && (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]), n = (n << 8) + e[r];
  return i = a % 3, i === 0 ? (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]) : i === 2 ? (t += o[n >> 10 & 63], t += o[n >> 4 & 63], t += o[n << 2 & 63], t += o[64]) : i === 1 && (t += o[n >> 2 & 63], t += o[n << 4 & 63], t += o[64], t += o[64]), t;
}
function aC(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Ix = new tC("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: nC,
  construct: rC,
  predicate: aC,
  represent: iC
}), oC = Je, sC = Object.prototype.hasOwnProperty, cC = Object.prototype.toString;
function lC(e) {
  if (e === null) return !0;
  var t = [], n, r, i, a, o, s = e;
  for (n = 0, r = s.length; n < r; n += 1) {
    if (i = s[n], o = !1, cC.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (sC.call(i, a))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function uC(e) {
  return e !== null ? e : [];
}
var Nx = new oC("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: lC,
  construct: uC
}), pC = Je, fC = Object.prototype.toString;
function dC(e) {
  if (e === null) return !0;
  var t, n, r, i, a, o = e;
  for (a = new Array(o.length), t = 0, n = o.length; t < n; t += 1) {
    if (r = o[t], fC.call(r) !== "[object Object]" || (i = Object.keys(r), i.length !== 1)) return !1;
    a[t] = [i[0], r[i[0]]];
  }
  return !0;
}
function mC(e) {
  if (e === null) return [];
  var t, n, r, i, a, o = e;
  for (a = new Array(o.length), t = 0, n = o.length; t < n; t += 1)
    r = o[t], i = Object.keys(r), a[t] = [i[0], r[i[0]]];
  return a;
}
var $x = new pC("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: dC,
  construct: mC
}), hC = Je, xC = Object.prototype.hasOwnProperty;
function vC(e) {
  if (e === null) return !0;
  var t, n = e;
  for (t in n)
    if (xC.call(n, t) && n[t] !== null)
      return !1;
  return !0;
}
function gC(e) {
  return e !== null ? e : {};
}
var Lx = new hC("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: vC,
  construct: gC
}), pu = Ox.extend({
  implicit: [
    Dx,
    kx
  ],
  explicit: [
    Ix,
    Nx,
    $x,
    Lx
  ]
}), Sn = bt, Ux = Yi, yC = xR, bC = pu, sn = Object.prototype.hasOwnProperty, ro = 1, Bx = 2, jx = 3, io = 4, lc = 1, wC = 2, sd = 3, EC = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, _C = /[\x85\u2028\u2029]/, SC = /[,\[\]\{\}]/, Mx = /^(?:!|!!|![a-z\-]+!)$/i, qx = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function cd(e) {
  return Object.prototype.toString.call(e);
}
function Ct(e) {
  return e === 10 || e === 13;
}
function In(e) {
  return e === 9 || e === 32;
}
function et(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function lr(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function AC(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function TC(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function RC(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function ld(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function CC(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function zx(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
var Hx = new Array(256), Gx = new Array(256);
for (var Qn = 0; Qn < 256; Qn++)
  Hx[Qn] = ld(Qn) ? 1 : 0, Gx[Qn] = ld(Qn);
function OC(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || bC, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function Wx(e, t) {
  var n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = yC(n), new Ux(t, n);
}
function te(e, t) {
  throw Wx(e, t);
}
function ao(e, t) {
  e.onWarning && e.onWarning.call(null, Wx(e, t));
}
var ud = {
  YAML: function(t, n, r) {
    var i, a, o;
    t.version !== null && te(t, "duplication of %YAML directive"), r.length !== 1 && te(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), i === null && te(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), o = parseInt(i[2], 10), a !== 1 && te(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && ao(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    var i, a;
    r.length !== 2 && te(t, "TAG directive accepts exactly two arguments"), i = r[0], a = r[1], Mx.test(i) || te(t, "ill-formed tag handle (first argument) of the TAG directive"), sn.call(t.tagMap, i) && te(t, 'there is a previously declared suffix for "' + i + '" tag handle'), qx.test(a) || te(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      a = decodeURIComponent(a);
    } catch {
      te(t, "tag prefix is malformed: " + a);
    }
    t.tagMap[i] = a;
  }
};
function nn(e, t, n, r) {
  var i, a, o, s;
  if (t < n) {
    if (s = e.input.slice(t, n), r)
      for (i = 0, a = s.length; i < a; i += 1)
        o = s.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || te(e, "expected valid JSON character");
    else EC.test(s) && te(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function pd(e, t, n, r) {
  var i, a, o, s;
  for (Sn.isObject(n) || te(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(n), o = 0, s = i.length; o < s; o += 1)
    a = i[o], sn.call(t, a) || (zx(t, a, n[a]), r[a] = !0);
}
function ur(e, t, n, r, i, a, o, s, c) {
  var f, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, l = i.length; f < l; f += 1)
      Array.isArray(i[f]) && te(e, "nested arrays are not supported inside keys"), typeof i == "object" && cd(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && cd(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (f = 0, l = a.length; f < l; f += 1)
        pd(e, t, a[f], n);
    else
      pd(e, t, a, n);
  else
    !e.json && !sn.call(n, i) && sn.call(t, i) && (e.line = o || e.line, e.lineStart = s || e.lineStart, e.position = c || e.position, te(e, "duplicated mapping key")), zx(t, i, a), delete n[i];
  return t;
}
function fu(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : te(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ae(e, t, n) {
  for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; In(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Ct(i))
      for (fu(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && ao(e, "deficient indentation"), r;
}
function Mo(e) {
  var t = e.position, n;
  return n = e.input.charCodeAt(t), !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || et(n)));
}
function du(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Sn.repeat(`
`, t - 1));
}
function PC(e, t, n) {
  var r, i, a, o, s, c, f, l, u = e.kind, d = e.result, h;
  if (h = e.input.charCodeAt(e.position), et(h) || lr(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), et(i) || n && lr(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = o = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), et(i) || n && lr(i))
        break;
    } else if (h === 35) {
      if (r = e.input.charCodeAt(e.position - 1), et(r))
        break;
    } else {
      if (e.position === e.lineStart && Mo(e) || n && lr(h))
        break;
      if (Ct(h))
        if (c = e.line, f = e.lineStart, l = e.lineIndent, Ae(e, !1, -1), e.lineIndent >= t) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = c, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    s && (nn(e, a, o, !1), du(e, e.line - c), a = o = e.position, s = !1), In(h) || (o = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return nn(e, a, o, !1), e.result ? !0 : (e.kind = u, e.result = d, !1);
}
function FC(e, t) {
  var n, r, i;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if (nn(e, r, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        r = e.position, e.position++, i = e.position;
      else
        return !0;
    else Ct(n) ? (nn(e, r, i, !0), du(e, Ae(e, !1, t)), r = i = e.position) : e.position === e.lineStart && Mo(e) ? te(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  te(e, "unexpected end of the stream within a single quoted scalar");
}
function DC(e, t) {
  var n, r, i, a, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return nn(e, n, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (nn(e, n, e.position, !0), s = e.input.charCodeAt(++e.position), Ct(s))
        Ae(e, !1, t);
      else if (s < 256 && Hx[s])
        e.result += Gx[s], e.position++;
      else if ((o = TC(s)) > 0) {
        for (i = o, a = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (o = AC(s)) >= 0 ? a = (a << 4) + o : te(e, "expected hexadecimal character");
        e.result += CC(a), e.position++;
      } else
        te(e, "unknown escape sequence");
      n = r = e.position;
    } else Ct(s) ? (nn(e, n, r, !0), du(e, Ae(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Mo(e) ? te(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  te(e, "unexpected end of the stream within a double quoted scalar");
}
function kC(e, t) {
  var n = !0, r, i, a, o = e.tag, s, c = e.anchor, f, l, u, d, h, v = /* @__PURE__ */ Object.create(null), x, g, y, b;
  if (b = e.input.charCodeAt(e.position), b === 91)
    l = 93, h = !1, s = [];
  else if (b === 123)
    l = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), b = e.input.charCodeAt(++e.position); b !== 0; ) {
    if (Ae(e, !0, t), b = e.input.charCodeAt(e.position), b === l)
      return e.position++, e.tag = o, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    n ? b === 44 && te(e, "expected the node content, but found ','") : te(e, "missed comma between flow collection entries"), g = x = y = null, u = d = !1, b === 63 && (f = e.input.charCodeAt(e.position + 1), et(f) && (u = d = !0, e.position++, Ae(e, !0, t))), r = e.line, i = e.lineStart, a = e.position, Rr(e, t, ro, !1, !0), g = e.tag, x = e.result, Ae(e, !0, t), b = e.input.charCodeAt(e.position), (d || e.line === r) && b === 58 && (u = !0, b = e.input.charCodeAt(++e.position), Ae(e, !0, t), Rr(e, t, ro, !1, !0), y = e.result), h ? ur(e, s, v, g, x, y, r, i, a) : u ? s.push(ur(e, null, v, g, x, y, r, i, a)) : s.push(x), Ae(e, !0, t), b = e.input.charCodeAt(e.position), b === 44 ? (n = !0, b = e.input.charCodeAt(++e.position)) : n = !1;
  }
  te(e, "unexpected end of the stream within a flow collection");
}
function IC(e, t) {
  var n, r, i = lc, a = !1, o = !1, s = t, c = 0, f = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    r = !1;
  else if (u === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      lc === i ? i = u === 43 ? sd : wC : te(e, "repeat of a chomping mode identifier");
    else if ((l = RC(u)) >= 0)
      l === 0 ? te(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? te(e, "repeat of an indentation width identifier") : (s = t + l - 1, o = !0);
    else
      break;
  if (In(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (In(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!Ct(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (fu(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), Ct(u)) {
      c++;
      continue;
    }
    if (e.lineIndent < s) {
      i === sd ? e.result += Sn.repeat(`
`, a ? 1 + c : c) : i === lc && a && (e.result += `
`);
      break;
    }
    for (r ? In(u) ? (f = !0, e.result += Sn.repeat(`
`, a ? 1 + c : c)) : f ? (f = !1, e.result += Sn.repeat(`
`, c + 1)) : c === 0 ? a && (e.result += " ") : e.result += Sn.repeat(`
`, c) : e.result += Sn.repeat(`
`, a ? 1 + c : c), a = !0, o = !0, c = 0, n = e.position; !Ct(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    nn(e, n, e.position, !1);
  }
  return !0;
}
function fd(e, t) {
  var n, r = e.tag, i = e.anchor, a = [], o, s = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, te(e, "tab characters must not be used in indentation")), !(c !== 45 || (o = e.input.charCodeAt(e.position + 1), !et(o)))); ) {
    if (s = !0, e.position++, Ae(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, Rr(e, t, jx, !1, !0), a.push(e.result), Ae(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && c !== 0)
      te(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = r, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function NC(e, t, n) {
  var r, i, a, o, s, c, f = e.tag, l = e.anchor, u = {}, d = /* @__PURE__ */ Object.create(null), h = null, v = null, x = null, g = !1, y = !1, b;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), b = e.input.charCodeAt(e.position); b !== 0; ) {
    if (!g && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, te(e, "tab characters must not be used in indentation")), r = e.input.charCodeAt(e.position + 1), a = e.line, (b === 63 || b === 58) && et(r))
      b === 63 ? (g && (ur(e, u, d, h, v, null, o, s, c), h = v = x = null), y = !0, g = !0, i = !0) : g ? (g = !1, i = !0) : te(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, b = r;
    else {
      if (o = e.line, s = e.lineStart, c = e.position, !Rr(e, n, Bx, !1, !0))
        break;
      if (e.line === a) {
        for (b = e.input.charCodeAt(e.position); In(b); )
          b = e.input.charCodeAt(++e.position);
        if (b === 58)
          b = e.input.charCodeAt(++e.position), et(b) || te(e, "a whitespace character is expected after the key-value separator within a block mapping"), g && (ur(e, u, d, h, v, null, o, s, c), h = v = x = null), y = !0, g = !1, i = !1, h = e.tag, v = e.result;
        else if (y)
          te(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = l, !0;
      } else if (y)
        te(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = l, !0;
    }
    if ((e.line === a || e.lineIndent > t) && (g && (o = e.line, s = e.lineStart, c = e.position), Rr(e, t, io, !0, i) && (g ? v = e.result : x = e.result), g || (ur(e, u, d, h, v, x, o, s, c), h = v = x = null), Ae(e, !0, -1), b = e.input.charCodeAt(e.position)), (e.line === a || e.lineIndent > t) && b !== 0)
      te(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return g && ur(e, u, d, h, v, null, o, s, c), y && (e.tag = f, e.anchor = l, e.kind = "mapping", e.result = u), y;
}
function $C(e) {
  var t, n = !1, r = !1, i, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && te(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (n = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (r = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, n) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : te(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !et(o); )
      o === 33 && (r ? te(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Mx.test(i) || te(e, "named tag handle cannot contain such characters"), r = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), SC.test(a) && te(e, "tag suffix cannot contain flow indicator characters");
  }
  a && !qx.test(a) && te(e, "tag name cannot contain such characters: " + a);
  try {
    a = decodeURIComponent(a);
  } catch {
    te(e, "tag name is malformed: " + a);
  }
  return n ? e.tag = a : sn.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : te(e, 'undeclared tag handle "' + i + '"'), !0;
}
function LC(e) {
  var t, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && te(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !et(n) && !lr(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && te(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function UC(e) {
  var t, n, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !et(r) && !lr(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && te(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), sn.call(e.anchorMap, n) || te(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], Ae(e, !0, -1), !0;
}
function Rr(e, t, n, r, i) {
  var a, o, s, c = 1, f = !1, l = !1, u, d, h, v, x, g;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = o = s = io === n || jx === n, r && Ae(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; $C(e) || LC(e); )
      Ae(e, !0, -1) ? (f = !0, s = a, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : s = !1;
  if (s && (s = f || i), (c === 1 || io === n) && (ro === n || Bx === n ? x = t : x = t + 1, g = e.position - e.lineStart, c === 1 ? s && (fd(e, g) || NC(e, g, x)) || kC(e, x) ? l = !0 : (o && IC(e, x) || FC(e, x) || DC(e, x) ? l = !0 : UC(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && te(e, "alias node should not have any properties")) : PC(e, x, ro === n) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = s && fd(e, g))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && te(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, d = e.implicitTypes.length; u < d; u += 1)
      if (v = e.implicitTypes[u], v.resolve(e.result)) {
        e.result = v.construct(e.result), e.tag = v.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (sn.call(e.typeMap[e.kind || "fallback"], e.tag))
      v = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (v = null, h = e.typeMap.multi[e.kind || "fallback"], u = 0, d = h.length; u < d; u += 1)
        if (e.tag.slice(0, h[u].tag.length) === h[u].tag) {
          v = h[u];
          break;
        }
    v || te(e, "unknown tag !<" + e.tag + ">"), e.result !== null && v.kind !== e.kind && te(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + v.kind + '", not "' + e.kind + '"'), v.resolve(e.result, e.tag) ? (e.result = v.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : te(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function BC(e) {
  var t = e.position, n, r, i, a = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (Ae(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (a = !0, o = e.input.charCodeAt(++e.position), n = e.position; o !== 0 && !et(o); )
      o = e.input.charCodeAt(++e.position);
    for (r = e.input.slice(n, e.position), i = [], r.length < 1 && te(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; In(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !Ct(o));
        break;
      }
      if (Ct(o)) break;
      for (n = e.position; o !== 0 && !et(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(n, e.position));
    }
    o !== 0 && fu(e), sn.call(ud, r) ? ud[r](e, r, i) : ao(e, 'unknown document directive "' + r + '"');
  }
  if (Ae(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ae(e, !0, -1)) : a && te(e, "directives end mark is expected"), Rr(e, e.lineIndent - 1, io, !1, !0), Ae(e, !0, -1), e.checkLineBreaks && _C.test(e.input.slice(t, e.position)) && ao(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Mo(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ae(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    te(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Vx(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new OC(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, te(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    BC(n);
  return n.documents;
}
function jC(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  var r = Vx(e, n);
  if (typeof t != "function")
    return r;
  for (var i = 0, a = r.length; i < a; i += 1)
    t(r[i]);
}
function MC(e, t) {
  var n = Vx(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Ux("expected a single document in the stream, but found more");
  }
}
lu.loadAll = jC;
lu.load = MC;
var Yx = {}, qo = bt, Xi = Yi, qC = pu, Xx = Object.prototype.toString, Kx = Object.prototype.hasOwnProperty, mu = 65279, zC = 9, mi = 10, HC = 13, GC = 32, WC = 33, VC = 34, nl = 35, YC = 37, XC = 38, KC = 39, JC = 42, Jx = 44, QC = 45, oo = 58, ZC = 61, eO = 62, tO = 63, nO = 64, Qx = 91, Zx = 93, rO = 96, ev = 123, iO = 124, tv = 125, ze = {};
ze[0] = "\\0";
ze[7] = "\\a";
ze[8] = "\\b";
ze[9] = "\\t";
ze[10] = "\\n";
ze[11] = "\\v";
ze[12] = "\\f";
ze[13] = "\\r";
ze[27] = "\\e";
ze[34] = '\\"';
ze[92] = "\\\\";
ze[133] = "\\N";
ze[160] = "\\_";
ze[8232] = "\\L";
ze[8233] = "\\P";
var aO = [
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
], oO = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function sO(e, t) {
  var n, r, i, a, o, s, c;
  if (t === null) return {};
  for (n = {}, r = Object.keys(t), i = 0, a = r.length; i < a; i += 1)
    o = r[i], s = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), c = e.compiledTypeMap.fallback[o], c && Kx.call(c.styleAliases, s) && (s = c.styleAliases[s]), n[o] = s;
  return n;
}
function cO(e) {
  var t, n, r;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    n = "x", r = 2;
  else if (e <= 65535)
    n = "u", r = 4;
  else if (e <= 4294967295)
    n = "U", r = 8;
  else
    throw new Xi("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + qo.repeat("0", r - t.length) + t;
}
var lO = 1, hi = 2;
function uO(e) {
  this.schema = e.schema || qC, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = qo.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = sO(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? hi : lO, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function dd(e, t) {
  for (var n = qo.repeat(" ", t), r = 0, i = -1, a = "", o, s = e.length; r < s; )
    i = e.indexOf(`
`, r), i === -1 ? (o = e.slice(r), r = s) : (o = e.slice(r, i + 1), r = i + 1), o.length && o !== `
` && (a += n), a += o;
  return a;
}
function rl(e, t) {
  return `
` + qo.repeat(" ", e.indent * t);
}
function pO(e, t) {
  var n, r, i;
  for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (i = e.implicitTypes[n], i.resolve(t))
      return !0;
  return !1;
}
function so(e) {
  return e === GC || e === zC;
}
function xi(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== mu || 65536 <= e && e <= 1114111;
}
function md(e) {
  return xi(e) && e !== mu && e !== HC && e !== mi;
}
function hd(e, t, n) {
  var r = md(e), i = r && !so(e);
  return (
    // ns-plain-safe
    (n ? (
      // c = flow-in
      r
    ) : r && e !== Jx && e !== Qx && e !== Zx && e !== ev && e !== tv) && e !== nl && !(t === oo && !i) || md(t) && !so(t) && e === nl || t === oo && i
  );
}
function fO(e) {
  return xi(e) && e !== mu && !so(e) && e !== QC && e !== tO && e !== oo && e !== Jx && e !== Qx && e !== Zx && e !== ev && e !== tv && e !== nl && e !== XC && e !== JC && e !== WC && e !== iO && e !== ZC && e !== eO && e !== KC && e !== VC && e !== YC && e !== nO && e !== rO;
}
function dO(e) {
  return !so(e) && e !== oo;
}
function Jr(e, t) {
  var n = e.charCodeAt(t), r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function nv(e) {
  var t = /^\n* /;
  return t.test(e);
}
var rv = 1, il = 2, iv = 3, av = 4, ir = 5;
function mO(e, t, n, r, i, a, o, s) {
  var c, f = 0, l = null, u = !1, d = !1, h = r !== -1, v = -1, x = fO(Jr(e, 0)) && dO(Jr(e, e.length - 1));
  if (t || o)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Jr(e, c), !xi(f))
        return ir;
      x = x && hd(f, l, s), l = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Jr(e, c), f === mi)
        u = !0, h && (d = d || // Foldable line = too long, and not more-indented.
        c - v - 1 > r && e[v + 1] !== " ", v = c);
      else if (!xi(f))
        return ir;
      x = x && hd(f, l, s), l = f;
    }
    d = d || h && c - v - 1 > r && e[v + 1] !== " ";
  }
  return !u && !d ? x && !o && !i(e) ? rv : a === hi ? ir : il : n > 9 && nv(e) ? ir : o ? a === hi ? ir : il : d ? av : iv;
}
function hO(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === hi ? '""' : "''";
    if (!e.noCompatMode && (aO.indexOf(t) !== -1 || oO.test(t)))
      return e.quotingType === hi ? '"' + t + '"' : "'" + t + "'";
    var a = e.indent * Math.max(1, n), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), s = r || e.flowLevel > -1 && n >= e.flowLevel;
    function c(f) {
      return pO(e, f);
    }
    switch (mO(
      t,
      s,
      e.indent,
      o,
      c,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case rv:
        return t;
      case il:
        return "'" + t.replace(/'/g, "''") + "'";
      case iv:
        return "|" + xd(t, e.indent) + vd(dd(t, a));
      case av:
        return ">" + xd(t, e.indent) + vd(dd(xO(t, o), a));
      case ir:
        return '"' + vO(t) + '"';
      default:
        throw new Xi("impossible error: invalid scalar style");
    }
  }();
}
function xd(e, t) {
  var n = nv(e) ? String(t) : "", r = e[e.length - 1] === `
`, i = r && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : r ? "" : "-";
  return n + a + `
`;
}
function vd(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function xO(e, t) {
  for (var n = /(\n+)([^\n]*)/g, r = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, n.lastIndex = f, gd(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", a, o; o = n.exec(e); ) {
    var s = o[1], c = o[2];
    a = c[0] === " ", r += s + (!i && !a && c !== "" ? `
` : "") + gd(c, t), i = a;
  }
  return r;
}
function gd(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, r, i = 0, a, o = 0, s = 0, c = ""; r = n.exec(e); )
    s = r.index, s - i > t && (a = o > i ? o : s, c += `
` + e.slice(i, a), i = a + 1), o = s;
  return c += `
`, e.length - i > t && o > i ? c += e.slice(i, o) + `
` + e.slice(o + 1) : c += e.slice(i), c.slice(1);
}
function vO(e) {
  for (var t = "", n = 0, r, i = 0; i < e.length; n >= 65536 ? i += 2 : i++)
    n = Jr(e, i), r = ze[n], !r && xi(n) ? (t += e[i], n >= 65536 && (t += e[i + 1])) : t += r || cO(n);
  return t;
}
function gO(e, t, n) {
  var r = "", i = e.tag, a, o, s;
  for (a = 0, o = n.length; a < o; a += 1)
    s = n[a], e.replacer && (s = e.replacer.call(n, String(a), s)), (Ut(e, t, s, !1, !1) || typeof s > "u" && Ut(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = i, e.dump = "[" + r + "]";
}
function yd(e, t, n, r) {
  var i = "", a = e.tag, o, s, c;
  for (o = 0, s = n.length; o < s; o += 1)
    c = n[o], e.replacer && (c = e.replacer.call(n, String(o), c)), (Ut(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Ut(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += rl(e, t)), e.dump && mi === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function yO(e, t, n) {
  var r = "", i = e.tag, a = Object.keys(n), o, s, c, f, l;
  for (o = 0, s = a.length; o < s; o += 1)
    l = "", r !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = a[o], f = n[c], e.replacer && (f = e.replacer.call(n, c, f)), Ut(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Ut(e, t, f, !1, !1) && (l += e.dump, r += l));
  e.tag = i, e.dump = "{" + r + "}";
}
function bO(e, t, n, r) {
  var i = "", a = e.tag, o = Object.keys(n), s, c, f, l, u, d;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Xi("sortKeys must be a boolean or a function");
  for (s = 0, c = o.length; s < c; s += 1)
    d = "", (!r || i !== "") && (d += rl(e, t)), f = o[s], l = n[f], e.replacer && (l = e.replacer.call(n, f, l)), Ut(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && mi === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, u && (d += rl(e, t)), Ut(e, t + 1, l, !0, u) && (e.dump && mi === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = a, e.dump = i || "{}";
}
function bd(e, t, n) {
  var r, i, a, o, s, c;
  for (i = n ? e.explicitTypes : e.implicitTypes, a = 0, o = i.length; a < o; a += 1)
    if (s = i[a], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (c = e.styleMap[s.tag] || s.defaultStyle, Xx.call(s.represent) === "[object Function]")
          r = s.represent(t, c);
        else if (Kx.call(s.represent, c))
          r = s.represent[c](t, c);
        else
          throw new Xi("!<" + s.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function Ut(e, t, n, r, i, a, o) {
  e.tag = null, e.dump = n, bd(e, n, !1) || bd(e, n, !0);
  var s = Xx.call(e.dump), c = r, f;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  var l = s === "[object Object]" || s === "[object Array]", u, d;
  if (l && (u = e.duplicates.indexOf(n), d = u !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (l && d && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), s === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (bO(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (yO(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !o && t > 0 ? yd(e, t - 1, e.dump, i) : yd(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (gO(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && hO(e, e.dump, t, a, c);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Xi("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function wO(e, t) {
  var n = [], r = [], i, a;
  for (al(e, n, r), i = 0, a = r.length; i < a; i += 1)
    t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(a);
}
function al(e, t, n) {
  var r, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      n.indexOf(i) === -1 && n.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        al(e[i], t, n);
    else
      for (r = Object.keys(e), i = 0, a = r.length; i < a; i += 1)
        al(e[r[i]], t, n);
}
function EO(e, t) {
  t = t || {};
  var n = new uO(t);
  n.noRefs || wO(e, n);
  var r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Ut(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
Yx.dump = EO;
var ov = lu, _O = Yx;
function hu(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Be.Type = Je;
Be.Schema = gx;
Be.FAILSAFE_SCHEMA = Ex;
Be.JSON_SCHEMA = Cx;
Be.CORE_SCHEMA = Ox;
Be.DEFAULT_SCHEMA = pu;
Be.load = ov.load;
Be.loadAll = ov.loadAll;
Be.dump = _O.dump;
Be.YAMLException = Yi;
Be.types = {
  binary: Ix,
  float: Rx,
  map: wx,
  null: _x,
  pairs: $x,
  set: Lx,
  timestamp: Dx,
  bool: Sx,
  int: Ax,
  merge: kx,
  omap: Nx,
  seq: bx,
  str: yx
};
Be.safeLoad = hu("safeLoad", "load");
Be.safeLoadAll = hu("safeLoadAll", "loadAll");
Be.safeDump = hu("safeDump", "dump");
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
zo.Lazy = void 0;
class SO {
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
zo.Lazy = SO;
var ol = { exports: {} };
const AO = "2.0.0", sv = 256, TO = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, RO = 16, CO = sv - 6, OO = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ho = {
  MAX_LENGTH: sv,
  MAX_SAFE_COMPONENT_LENGTH: RO,
  MAX_SAFE_BUILD_LENGTH: CO,
  MAX_SAFE_INTEGER: TO,
  RELEASE_TYPES: OO,
  SEMVER_SPEC_VERSION: AO,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const PO = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Go = PO;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = Ho, a = Go;
  t = e.exports = {};
  const o = t.re = [], s = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const d = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [d, r]
  ], v = (g) => {
    for (const [y, b] of h)
      g = g.split(`${y}*`).join(`${y}{0,${b}}`).split(`${y}+`).join(`${y}{1,${b}}`);
    return g;
  }, x = (g, y, b) => {
    const T = v(y), D = u++;
    a(g, D, y), l[g] = D, c[D] = y, f[D] = T, o[D] = new RegExp(y, b ? "g" : void 0), s[D] = new RegExp(T, b ? "g" : void 0);
  };
  x("NUMERICIDENTIFIER", "0|[1-9]\\d*"), x("NUMERICIDENTIFIERLOOSE", "\\d+"), x("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), x("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), x("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), x("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), x("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), x("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), x("BUILDIDENTIFIER", `${d}+`), x("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), x("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), x("FULL", `^${c[l.FULLPLAIN]}$`), x("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), x("LOOSE", `^${c[l.LOOSEPLAIN]}$`), x("GTLT", "((?:<|>)?=?)"), x("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), x("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), x("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), x("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), x("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), x("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), x("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), x("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), x("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), x("COERCERTL", c[l.COERCE], !0), x("COERCERTLFULL", c[l.COERCEFULL], !0), x("LONETILDE", "(?:~>?)"), x("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", x("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), x("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), x("LONECARET", "(?:\\^)"), x("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", x("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), x("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), x("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), x("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), x("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", x("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), x("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), x("STAR", "(<|>)?=?\\s*\\*"), x("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), x("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ol, ol.exports);
var Ki = ol.exports;
const FO = Object.freeze({ loose: !0 }), DO = Object.freeze({}), kO = (e) => e ? typeof e != "object" ? FO : e : DO;
var xu = kO;
const wd = /^[0-9]+$/, cv = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = wd.test(e), r = wd.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, IO = (e, t) => cv(t, e);
var lv = {
  compareIdentifiers: cv,
  rcompareIdentifiers: IO
};
const Ea = Go, { MAX_LENGTH: Ed, MAX_SAFE_INTEGER: _a } = Ho, { safeRe: Sa, t: Aa } = Ki, NO = xu, { compareIdentifiers: uc } = lv;
let $O = class At {
  constructor(t, n) {
    if (n = NO(n), t instanceof At) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Ed)
      throw new TypeError(
        `version is longer than ${Ed} characters`
      );
    Ea("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? Sa[Aa.LOOSE] : Sa[Aa.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > _a || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > _a || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > _a || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const a = +i;
        if (a >= 0 && a < _a)
          return a;
      }
      return i;
    }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Ea("SemVer.compare", this.version, this.options, t), !(t instanceof At)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new At(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof At || (t = new At(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof At || (t = new At(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (Ea("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return uc(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof At || (t = new At(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (Ea("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return uc(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? Sa[Aa.PRERELEASELOOSE] : Sa[Aa.PRERELEASE]);
        if (!i || i[1] !== n)
          throw new Error(`invalid identifier: ${n}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, r);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, r);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, r), this.inc("pre", n, r);
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
        const i = Number(r) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (n === this.prerelease.join(".") && r === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (n) {
          let a = [n, i];
          r === !1 && (a = [n]), uc(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Qe = $O;
const _d = Qe, LO = (e, t, n = !1) => {
  if (e instanceof _d)
    return e;
  try {
    return new _d(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var Ir = LO;
const UO = Ir, BO = (e, t) => {
  const n = UO(e, t);
  return n ? n.version : null;
};
var jO = BO;
const MO = Ir, qO = (e, t) => {
  const n = MO(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var zO = qO;
const Sd = Qe, HO = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new Sd(
      e instanceof Sd ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var GO = HO;
const Ad = Ir, WO = (e, t) => {
  const n = Ad(e, null, !0), r = Ad(t, null, !0), i = n.compare(r);
  if (i === 0)
    return null;
  const a = i > 0, o = a ? n : r, s = a ? r : n, c = !!o.prerelease.length;
  if (!!s.prerelease.length && !c) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(o) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return n.major !== r.major ? l + "major" : n.minor !== r.minor ? l + "minor" : n.patch !== r.patch ? l + "patch" : "prerelease";
};
var VO = WO;
const YO = Qe, XO = (e, t) => new YO(e, t).major;
var KO = XO;
const JO = Qe, QO = (e, t) => new JO(e, t).minor;
var ZO = QO;
const e6 = Qe, t6 = (e, t) => new e6(e, t).patch;
var n6 = t6;
const r6 = Ir, i6 = (e, t) => {
  const n = r6(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var a6 = i6;
const Td = Qe, o6 = (e, t, n) => new Td(e, n).compare(new Td(t, n));
var wt = o6;
const s6 = wt, c6 = (e, t, n) => s6(t, e, n);
var l6 = c6;
const u6 = wt, p6 = (e, t) => u6(e, t, !0);
var f6 = p6;
const Rd = Qe, d6 = (e, t, n) => {
  const r = new Rd(e, n), i = new Rd(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var vu = d6;
const m6 = vu, h6 = (e, t) => e.sort((n, r) => m6(n, r, t));
var x6 = h6;
const v6 = vu, g6 = (e, t) => e.sort((n, r) => v6(r, n, t));
var y6 = g6;
const b6 = wt, w6 = (e, t, n) => b6(e, t, n) > 0;
var Wo = w6;
const E6 = wt, _6 = (e, t, n) => E6(e, t, n) < 0;
var gu = _6;
const S6 = wt, A6 = (e, t, n) => S6(e, t, n) === 0;
var uv = A6;
const T6 = wt, R6 = (e, t, n) => T6(e, t, n) !== 0;
var pv = R6;
const C6 = wt, O6 = (e, t, n) => C6(e, t, n) >= 0;
var yu = O6;
const P6 = wt, F6 = (e, t, n) => P6(e, t, n) <= 0;
var bu = F6;
const D6 = uv, k6 = pv, I6 = Wo, N6 = yu, $6 = gu, L6 = bu, U6 = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return D6(e, n, r);
    case "!=":
      return k6(e, n, r);
    case ">":
      return I6(e, n, r);
    case ">=":
      return N6(e, n, r);
    case "<":
      return $6(e, n, r);
    case "<=":
      return L6(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var fv = U6;
const B6 = Qe, j6 = Ir, { safeRe: Ta, t: Ra } = Ki, M6 = (e, t) => {
  if (e instanceof B6)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? Ta[Ra.COERCEFULL] : Ta[Ra.COERCE]);
  else {
    const c = t.includePrerelease ? Ta[Ra.COERCERTLFULL] : Ta[Ra.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || f.index + f[0].length !== n.index + n[0].length) && (n = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", a = n[4] || "0", o = t.includePrerelease && n[5] ? `-${n[5]}` : "", s = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return j6(`${r}.${i}.${a}${o}${s}`, t);
};
var q6 = M6;
class z6 {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0)
      return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var H6 = z6, pc, Cd;
function Et() {
  if (Cd) return pc;
  Cd = 1;
  const e = /\s+/g;
  class t {
    constructor(N, B) {
      if (B = i(B), N instanceof t)
        return N.loose === !!B.loose && N.includePrerelease === !!B.includePrerelease ? N : new t(N.raw, B);
      if (N instanceof a)
        return this.raw = N.value, this.set = [[N]], this.formatted = void 0, this;
      if (this.options = B, this.loose = !!B.loose, this.includePrerelease = !!B.includePrerelease, this.raw = N.trim().replace(e, " "), this.set = this.raw.split("||").map((w) => this.parseRange(w.trim())).filter((w) => w.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const w = this.set[0];
        if (this.set = this.set.filter((A) => !x(A[0])), this.set.length === 0)
          this.set = [w];
        else if (this.set.length > 1) {
          for (const A of this.set)
            if (A.length === 1 && g(A[0])) {
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
        for (let N = 0; N < this.set.length; N++) {
          N > 0 && (this.formatted += "||");
          const B = this.set[N];
          for (let w = 0; w < B.length; w++)
            w > 0 && (this.formatted += " "), this.formatted += B[w].toString().trim();
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
    parseRange(N) {
      const w = ((this.options.includePrerelease && h) | (this.options.loose && v)) + ":" + N, A = r.get(w);
      if (A)
        return A;
      const C = this.options.loose, F = C ? c[f.HYPHENRANGELOOSE] : c[f.HYPHENRANGE];
      N = N.replace(F, z(this.options.includePrerelease)), o("hyphen replace", N), N = N.replace(c[f.COMPARATORTRIM], l), o("comparator trim", N), N = N.replace(c[f.TILDETRIM], u), o("tilde trim", N), N = N.replace(c[f.CARETTRIM], d), o("caret trim", N);
      let I = N.split(" ").map((V) => b(V, this.options)).join(" ").split(/\s+/).map((V) => H(V, this.options));
      C && (I = I.filter((V) => (o("loose invalid filter", V, this.options), !!V.match(c[f.COMPARATORLOOSE])))), o("range list", I);
      const j = /* @__PURE__ */ new Map(), Z = I.map((V) => new a(V, this.options));
      for (const V of Z) {
        if (x(V))
          return [V];
        j.set(V.value, V);
      }
      j.size > 1 && j.has("") && j.delete("");
      const ee = [...j.values()];
      return r.set(w, ee), ee;
    }
    intersects(N, B) {
      if (!(N instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((w) => y(w, B) && N.set.some((A) => y(A, B) && w.every((C) => A.every((F) => C.intersects(F, B)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(N) {
      if (!N)
        return !1;
      if (typeof N == "string")
        try {
          N = new s(N, this.options);
        } catch {
          return !1;
        }
      for (let B = 0; B < this.set.length; B++)
        if (J(this.set[B], N, this.options))
          return !0;
      return !1;
    }
  }
  pc = t;
  const n = H6, r = new n(), i = xu, a = Vo(), o = Go, s = Qe, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: d
  } = Ki, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: v } = Ho, x = (L) => L.value === "<0.0.0-0", g = (L) => L.value === "", y = (L, N) => {
    let B = !0;
    const w = L.slice();
    let A = w.pop();
    for (; B && w.length; )
      B = w.every((C) => A.intersects(C, N)), A = w.pop();
    return B;
  }, b = (L, N) => (L = L.replace(c[f.BUILD], ""), o("comp", L, N), L = k(L, N), o("caret", L), L = D(L, N), o("tildes", L), L = G(L, N), o("xrange", L), L = M(L, N), o("stars", L), L), T = (L) => !L || L.toLowerCase() === "x" || L === "*", D = (L, N) => L.trim().split(/\s+/).map((B) => U(B, N)).join(" "), U = (L, N) => {
    const B = N.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return L.replace(B, (w, A, C, F, I) => {
      o("tilde", L, w, A, C, F, I);
      let j;
      return T(A) ? j = "" : T(C) ? j = `>=${A}.0.0 <${+A + 1}.0.0-0` : T(F) ? j = `>=${A}.${C}.0 <${A}.${+C + 1}.0-0` : I ? (o("replaceTilde pr", I), j = `>=${A}.${C}.${F}-${I} <${A}.${+C + 1}.0-0`) : j = `>=${A}.${C}.${F} <${A}.${+C + 1}.0-0`, o("tilde return", j), j;
    });
  }, k = (L, N) => L.trim().split(/\s+/).map((B) => $(B, N)).join(" "), $ = (L, N) => {
    o("caret", L, N);
    const B = N.loose ? c[f.CARETLOOSE] : c[f.CARET], w = N.includePrerelease ? "-0" : "";
    return L.replace(B, (A, C, F, I, j) => {
      o("caret", L, A, C, F, I, j);
      let Z;
      return T(C) ? Z = "" : T(F) ? Z = `>=${C}.0.0${w} <${+C + 1}.0.0-0` : T(I) ? C === "0" ? Z = `>=${C}.${F}.0${w} <${C}.${+F + 1}.0-0` : Z = `>=${C}.${F}.0${w} <${+C + 1}.0.0-0` : j ? (o("replaceCaret pr", j), C === "0" ? F === "0" ? Z = `>=${C}.${F}.${I}-${j} <${C}.${F}.${+I + 1}-0` : Z = `>=${C}.${F}.${I}-${j} <${C}.${+F + 1}.0-0` : Z = `>=${C}.${F}.${I}-${j} <${+C + 1}.0.0-0`) : (o("no pr"), C === "0" ? F === "0" ? Z = `>=${C}.${F}.${I}${w} <${C}.${F}.${+I + 1}-0` : Z = `>=${C}.${F}.${I}${w} <${C}.${+F + 1}.0-0` : Z = `>=${C}.${F}.${I} <${+C + 1}.0.0-0`), o("caret return", Z), Z;
    });
  }, G = (L, N) => (o("replaceXRanges", L, N), L.split(/\s+/).map((B) => S(B, N)).join(" ")), S = (L, N) => {
    L = L.trim();
    const B = N.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return L.replace(B, (w, A, C, F, I, j) => {
      o("xRange", L, w, A, C, F, I, j);
      const Z = T(C), ee = Z || T(F), V = ee || T(I), se = V;
      return A === "=" && se && (A = ""), j = N.includePrerelease ? "-0" : "", Z ? A === ">" || A === "<" ? w = "<0.0.0-0" : w = "*" : A && se ? (ee && (F = 0), I = 0, A === ">" ? (A = ">=", ee ? (C = +C + 1, F = 0, I = 0) : (F = +F + 1, I = 0)) : A === "<=" && (A = "<", ee ? C = +C + 1 : F = +F + 1), A === "<" && (j = "-0"), w = `${A + C}.${F}.${I}${j}`) : ee ? w = `>=${C}.0.0${j} <${+C + 1}.0.0-0` : V && (w = `>=${C}.${F}.0${j} <${C}.${+F + 1}.0-0`), o("xRange return", w), w;
    });
  }, M = (L, N) => (o("replaceStars", L, N), L.trim().replace(c[f.STAR], "")), H = (L, N) => (o("replaceGTE0", L, N), L.trim().replace(c[N.includePrerelease ? f.GTE0PRE : f.GTE0], "")), z = (L) => (N, B, w, A, C, F, I, j, Z, ee, V, se) => (T(w) ? B = "" : T(A) ? B = `>=${w}.0.0${L ? "-0" : ""}` : T(C) ? B = `>=${w}.${A}.0${L ? "-0" : ""}` : F ? B = `>=${B}` : B = `>=${B}${L ? "-0" : ""}`, T(Z) ? j = "" : T(ee) ? j = `<${+Z + 1}.0.0-0` : T(V) ? j = `<${Z}.${+ee + 1}.0-0` : se ? j = `<=${Z}.${ee}.${V}-${se}` : L ? j = `<${Z}.${ee}.${+V + 1}-0` : j = `<=${j}`, `${B} ${j}`.trim()), J = (L, N, B) => {
    for (let w = 0; w < L.length; w++)
      if (!L[w].test(N))
        return !1;
    if (N.prerelease.length && !B.includePrerelease) {
      for (let w = 0; w < L.length; w++)
        if (o(L[w].semver), L[w].semver !== a.ANY && L[w].semver.prerelease.length > 0) {
          const A = L[w].semver;
          if (A.major === N.major && A.minor === N.minor && A.patch === N.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return pc;
}
var fc, Od;
function Vo() {
  if (Od) return fc;
  Od = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = n(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), o("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], d = l.match(u);
      if (!d)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new s(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (o("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new s(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, u).test(l.semver) : (u = n(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  fc = t;
  const n = xu, { safeRe: r, t: i } = Ki, a = fv, o = Go, s = Qe, c = Et();
  return fc;
}
const G6 = Et(), W6 = (e, t, n) => {
  try {
    t = new G6(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Yo = W6;
const V6 = Et(), Y6 = (e, t) => new V6(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var X6 = Y6;
const K6 = Qe, J6 = Et(), Q6 = (e, t, n) => {
  let r = null, i = null, a = null;
  try {
    a = new J6(t, n);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!r || i.compare(o) === -1) && (r = o, i = new K6(r, n));
  }), r;
};
var Z6 = Q6;
const eP = Qe, tP = Et(), nP = (e, t, n) => {
  let r = null, i = null, a = null;
  try {
    a = new tP(t, n);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!r || i.compare(o) === 1) && (r = o, i = new eP(r, n));
  }), r;
};
var rP = nP;
const dc = Qe, iP = Et(), Pd = Wo, aP = (e, t) => {
  e = new iP(e, t);
  let n = new dc("0.0.0");
  if (e.test(n) || (n = new dc("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let a = null;
    i.forEach((o) => {
      const s = new dc(o.semver.version);
      switch (o.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!a || Pd(s, a)) && (a = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!n || Pd(n, a)) && (n = a);
  }
  return n && e.test(n) ? n : null;
};
var oP = aP;
const sP = Et(), cP = (e, t) => {
  try {
    return new sP(e, t).range || "*";
  } catch {
    return null;
  }
};
var lP = cP;
const uP = Qe, dv = Vo(), { ANY: pP } = dv, fP = Et(), dP = Yo, Fd = Wo, Dd = gu, mP = bu, hP = yu, xP = (e, t, n, r) => {
  e = new uP(e, r), t = new fP(t, r);
  let i, a, o, s, c;
  switch (n) {
    case ">":
      i = Fd, a = mP, o = Dd, s = ">", c = ">=";
      break;
    case "<":
      i = Dd, a = hP, o = Fd, s = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (dP(e, t, r))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const l = t.set[f];
    let u = null, d = null;
    if (l.forEach((h) => {
      h.semver === pP && (h = new dv(">=0.0.0")), u = u || h, d = d || h, i(h.semver, u.semver, r) ? u = h : o(h.semver, d.semver, r) && (d = h);
    }), u.operator === s || u.operator === c || (!d.operator || d.operator === s) && a(e, d.semver))
      return !1;
    if (d.operator === c && o(e, d.semver))
      return !1;
  }
  return !0;
};
var wu = xP;
const vP = wu, gP = (e, t, n) => vP(e, t, ">", n);
var yP = gP;
const bP = wu, wP = (e, t, n) => bP(e, t, "<", n);
var EP = wP;
const kd = Et(), _P = (e, t, n) => (e = new kd(e, n), t = new kd(t, n), e.intersects(t, n));
var SP = _P;
const AP = Yo, TP = wt;
var RP = (e, t, n) => {
  const r = [];
  let i = null, a = null;
  const o = e.sort((l, u) => TP(l, u, n));
  for (const l of o)
    AP(l, t, n) ? (a = l, i || (i = l)) : (a && r.push([i, a]), a = null, i = null);
  i && r.push([i, null]);
  const s = [];
  for (const [l, u] of r)
    l === u ? s.push(l) : !u && l === o[0] ? s.push("*") : u ? l === o[0] ? s.push(`<=${u}`) : s.push(`${l} - ${u}`) : s.push(`>=${l}`);
  const c = s.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const Id = Et(), Eu = Vo(), { ANY: mc } = Eu, Vr = Yo, _u = wt, CP = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Id(e, n), t = new Id(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const a of t.set) {
      const o = PP(i, a, n);
      if (r = r || o !== null, o)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, OP = [new Eu(">=0.0.0-0")], Nd = [new Eu(">=0.0.0")], PP = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === mc) {
    if (t.length === 1 && t[0].semver === mc)
      return !0;
    n.includePrerelease ? e = OP : e = Nd;
  }
  if (t.length === 1 && t[0].semver === mc) {
    if (n.includePrerelease)
      return !0;
    t = Nd;
  }
  const r = /* @__PURE__ */ new Set();
  let i, a;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = $d(i, h, n) : h.operator === "<" || h.operator === "<=" ? a = Ld(a, h, n) : r.add(h.semver);
  if (r.size > 1)
    return null;
  let o;
  if (i && a) {
    if (o = _u(i.semver, a.semver, n), o > 0)
      return null;
    if (o === 0 && (i.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const h of r) {
    if (i && !Vr(h, String(i), n) || a && !Vr(h, String(a), n))
      return null;
    for (const v of t)
      if (!Vr(h, String(v), n))
        return !1;
    return !0;
  }
  let s, c, f, l, u = a && !n.includePrerelease && a.semver.prerelease.length ? a.semver : !1, d = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && a.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const h of t) {
    if (l = l || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", i) {
      if (d && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === d.major && h.semver.minor === d.minor && h.semver.patch === d.patch && (d = !1), h.operator === ">" || h.operator === ">=") {
        if (s = $d(i, h, n), s === h && s !== i)
          return !1;
      } else if (i.operator === ">=" && !Vr(i.semver, String(h), n))
        return !1;
    }
    if (a) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === "<" || h.operator === "<=") {
        if (c = Ld(a, h, n), c === h && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Vr(a.semver, String(h), n))
        return !1;
    }
    if (!h.operator && (a || i) && o !== 0)
      return !1;
  }
  return !(i && f && !a && o !== 0 || a && l && !i && o !== 0 || d || u);
}, $d = (e, t, n) => {
  if (!e)
    return t;
  const r = _u(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Ld = (e, t, n) => {
  if (!e)
    return t;
  const r = _u(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var FP = CP;
const hc = Ki, Ud = Ho, DP = Qe, Bd = lv, kP = Ir, IP = jO, NP = zO, $P = GO, LP = VO, UP = KO, BP = ZO, jP = n6, MP = a6, qP = wt, zP = l6, HP = f6, GP = vu, WP = x6, VP = y6, YP = Wo, XP = gu, KP = uv, JP = pv, QP = yu, ZP = bu, eF = fv, tF = q6, nF = Vo(), rF = Et(), iF = Yo, aF = X6, oF = Z6, sF = rP, cF = oP, lF = lP, uF = wu, pF = yP, fF = EP, dF = SP, mF = RP, hF = FP;
var mv = {
  parse: kP,
  valid: IP,
  clean: NP,
  inc: $P,
  diff: LP,
  major: UP,
  minor: BP,
  patch: jP,
  prerelease: MP,
  compare: qP,
  rcompare: zP,
  compareLoose: HP,
  compareBuild: GP,
  sort: WP,
  rsort: VP,
  gt: YP,
  lt: XP,
  eq: KP,
  neq: JP,
  gte: QP,
  lte: ZP,
  cmp: eF,
  coerce: tF,
  Comparator: nF,
  Range: rF,
  satisfies: iF,
  toComparators: aF,
  maxSatisfying: oF,
  minSatisfying: sF,
  minVersion: cF,
  validRange: lF,
  outside: uF,
  gtr: pF,
  ltr: fF,
  intersects: dF,
  simplifyRange: mF,
  subset: hF,
  SemVer: DP,
  re: hc.re,
  src: hc.src,
  tokens: hc.t,
  SEMVER_SPEC_VERSION: Ud.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ud.RELEASE_TYPES,
  compareIdentifiers: Bd.compareIdentifiers,
  rcompareIdentifiers: Bd.rcompareIdentifiers
}, Ji = {}, co = { exports: {} };
co.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, a = 2, o = 9007199254740991, s = "[object Arguments]", c = "[object Array]", f = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", h = "[object Function]", v = "[object GeneratorFunction]", x = "[object Map]", g = "[object Number]", y = "[object Null]", b = "[object Object]", T = "[object Promise]", D = "[object Proxy]", U = "[object RegExp]", k = "[object Set]", $ = "[object String]", G = "[object Symbol]", S = "[object Undefined]", M = "[object WeakMap]", H = "[object ArrayBuffer]", z = "[object DataView]", J = "[object Float32Array]", L = "[object Float64Array]", N = "[object Int8Array]", B = "[object Int16Array]", w = "[object Int32Array]", A = "[object Uint8Array]", C = "[object Uint8ClampedArray]", F = "[object Uint16Array]", I = "[object Uint32Array]", j = /[\\^$.*+?()[\]{}|]/g, Z = /^\[object .+?Constructor\]$/, ee = /^(?:0|[1-9]\d*)$/, V = {};
  V[J] = V[L] = V[N] = V[B] = V[w] = V[A] = V[C] = V[F] = V[I] = !0, V[s] = V[c] = V[H] = V[l] = V[z] = V[u] = V[d] = V[h] = V[x] = V[g] = V[b] = V[U] = V[k] = V[$] = V[M] = !1;
  var se = typeof ue == "object" && ue && ue.Object === Object && ue, m = typeof self == "object" && self && self.Object === Object && self, p = se || m || Function("return this")(), R = t && !t.nodeType && t, _ = R && !0 && e && !e.nodeType && e, K = _ && _.exports === R, Y = K && se.process, Q = function() {
    try {
      return Y && Y.binding && Y.binding("util");
    } catch {
    }
  }(), ve = Q && Q.isTypedArray;
  function Se(E, O) {
    for (var q = -1, X = E == null ? 0 : E.length, fe = 0, re = []; ++q < X; ) {
      var ge = E[q];
      O(ge, q, E) && (re[fe++] = ge);
    }
    return re;
  }
  function pt(E, O) {
    for (var q = -1, X = O.length, fe = E.length; ++q < X; )
      E[fe + q] = O[q];
    return E;
  }
  function Ee(E, O) {
    for (var q = -1, X = E == null ? 0 : E.length; ++q < X; )
      if (O(E[q], q, E))
        return !0;
    return !1;
  }
  function He(E, O) {
    for (var q = -1, X = Array(E); ++q < E; )
      X[q] = O(q);
    return X;
  }
  function Vn(E) {
    return function(O) {
      return E(O);
    };
  }
  function Mt(E, O) {
    return E.has(O);
  }
  function Dt(E, O) {
    return E == null ? void 0 : E[O];
  }
  function qt(E) {
    var O = -1, q = Array(E.size);
    return E.forEach(function(X, fe) {
      q[++O] = [fe, X];
    }), q;
  }
  function mn(E, O) {
    return function(q) {
      return E(O(q));
    };
  }
  function zt(E) {
    var O = -1, q = Array(E.size);
    return E.forEach(function(X) {
      q[++O] = X;
    }), q;
  }
  var hn = Array.prototype, Ov = Function.prototype, ta = Object.prototype, is = p["__core-js_shared__"], Du = Ov.toString, St = ta.hasOwnProperty, ku = function() {
    var E = /[^.]+$/.exec(is && is.keys && is.keys.IE_PROTO || "");
    return E ? "Symbol(src)_1." + E : "";
  }(), Iu = ta.toString, Pv = RegExp(
    "^" + Du.call(St).replace(j, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Nu = K ? p.Buffer : void 0, na = p.Symbol, $u = p.Uint8Array, Lu = ta.propertyIsEnumerable, Fv = hn.splice, xn = na ? na.toStringTag : void 0, Uu = Object.getOwnPropertySymbols, Dv = Nu ? Nu.isBuffer : void 0, kv = mn(Object.keys, Object), as = Yn(p, "DataView"), Lr = Yn(p, "Map"), os = Yn(p, "Promise"), ss = Yn(p, "Set"), cs = Yn(p, "WeakMap"), Ur = Yn(Object, "create"), Iv = yn(as), Nv = yn(Lr), $v = yn(os), Lv = yn(ss), Uv = yn(cs), Bu = na ? na.prototype : void 0, ls = Bu ? Bu.valueOf : void 0;
  function vn(E) {
    var O = -1, q = E == null ? 0 : E.length;
    for (this.clear(); ++O < q; ) {
      var X = E[O];
      this.set(X[0], X[1]);
    }
  }
  function Bv() {
    this.__data__ = Ur ? Ur(null) : {}, this.size = 0;
  }
  function jv(E) {
    var O = this.has(E) && delete this.__data__[E];
    return this.size -= O ? 1 : 0, O;
  }
  function Mv(E) {
    var O = this.__data__;
    if (Ur) {
      var q = O[E];
      return q === r ? void 0 : q;
    }
    return St.call(O, E) ? O[E] : void 0;
  }
  function qv(E) {
    var O = this.__data__;
    return Ur ? O[E] !== void 0 : St.call(O, E);
  }
  function zv(E, O) {
    var q = this.__data__;
    return this.size += this.has(E) ? 0 : 1, q[E] = Ur && O === void 0 ? r : O, this;
  }
  vn.prototype.clear = Bv, vn.prototype.delete = jv, vn.prototype.get = Mv, vn.prototype.has = qv, vn.prototype.set = zv;
  function kt(E) {
    var O = -1, q = E == null ? 0 : E.length;
    for (this.clear(); ++O < q; ) {
      var X = E[O];
      this.set(X[0], X[1]);
    }
  }
  function Hv() {
    this.__data__ = [], this.size = 0;
  }
  function Gv(E) {
    var O = this.__data__, q = ia(O, E);
    if (q < 0)
      return !1;
    var X = O.length - 1;
    return q == X ? O.pop() : Fv.call(O, q, 1), --this.size, !0;
  }
  function Wv(E) {
    var O = this.__data__, q = ia(O, E);
    return q < 0 ? void 0 : O[q][1];
  }
  function Vv(E) {
    return ia(this.__data__, E) > -1;
  }
  function Yv(E, O) {
    var q = this.__data__, X = ia(q, E);
    return X < 0 ? (++this.size, q.push([E, O])) : q[X][1] = O, this;
  }
  kt.prototype.clear = Hv, kt.prototype.delete = Gv, kt.prototype.get = Wv, kt.prototype.has = Vv, kt.prototype.set = Yv;
  function gn(E) {
    var O = -1, q = E == null ? 0 : E.length;
    for (this.clear(); ++O < q; ) {
      var X = E[O];
      this.set(X[0], X[1]);
    }
  }
  function Xv() {
    this.size = 0, this.__data__ = {
      hash: new vn(),
      map: new (Lr || kt)(),
      string: new vn()
    };
  }
  function Kv(E) {
    var O = aa(this, E).delete(E);
    return this.size -= O ? 1 : 0, O;
  }
  function Jv(E) {
    return aa(this, E).get(E);
  }
  function Qv(E) {
    return aa(this, E).has(E);
  }
  function Zv(E, O) {
    var q = aa(this, E), X = q.size;
    return q.set(E, O), this.size += q.size == X ? 0 : 1, this;
  }
  gn.prototype.clear = Xv, gn.prototype.delete = Kv, gn.prototype.get = Jv, gn.prototype.has = Qv, gn.prototype.set = Zv;
  function ra(E) {
    var O = -1, q = E == null ? 0 : E.length;
    for (this.__data__ = new gn(); ++O < q; )
      this.add(E[O]);
  }
  function eg(E) {
    return this.__data__.set(E, r), this;
  }
  function tg(E) {
    return this.__data__.has(E);
  }
  ra.prototype.add = ra.prototype.push = eg, ra.prototype.has = tg;
  function Ht(E) {
    var O = this.__data__ = new kt(E);
    this.size = O.size;
  }
  function ng() {
    this.__data__ = new kt(), this.size = 0;
  }
  function rg(E) {
    var O = this.__data__, q = O.delete(E);
    return this.size = O.size, q;
  }
  function ig(E) {
    return this.__data__.get(E);
  }
  function ag(E) {
    return this.__data__.has(E);
  }
  function og(E, O) {
    var q = this.__data__;
    if (q instanceof kt) {
      var X = q.__data__;
      if (!Lr || X.length < n - 1)
        return X.push([E, O]), this.size = ++q.size, this;
      q = this.__data__ = new gn(X);
    }
    return q.set(E, O), this.size = q.size, this;
  }
  Ht.prototype.clear = ng, Ht.prototype.delete = rg, Ht.prototype.get = ig, Ht.prototype.has = ag, Ht.prototype.set = og;
  function sg(E, O) {
    var q = oa(E), X = !q && Eg(E), fe = !q && !X && us(E), re = !q && !X && !fe && Yu(E), ge = q || X || fe || re, Ce = ge ? He(E.length, String) : [], De = Ce.length;
    for (var me in E)
      St.call(E, me) && !(ge && // Safari 9 has enumerable `arguments.length` in strict mode.
      (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      fe && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      re && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
      vg(me, De))) && Ce.push(me);
    return Ce;
  }
  function ia(E, O) {
    for (var q = E.length; q--; )
      if (Hu(E[q][0], O))
        return q;
    return -1;
  }
  function cg(E, O, q) {
    var X = O(E);
    return oa(E) ? X : pt(X, q(E));
  }
  function Br(E) {
    return E == null ? E === void 0 ? S : y : xn && xn in Object(E) ? hg(E) : wg(E);
  }
  function ju(E) {
    return jr(E) && Br(E) == s;
  }
  function Mu(E, O, q, X, fe) {
    return E === O ? !0 : E == null || O == null || !jr(E) && !jr(O) ? E !== E && O !== O : lg(E, O, q, X, Mu, fe);
  }
  function lg(E, O, q, X, fe, re) {
    var ge = oa(E), Ce = oa(O), De = ge ? c : Gt(E), me = Ce ? c : Gt(O);
    De = De == s ? b : De, me = me == s ? b : me;
    var rt = De == b, ft = me == b, je = De == me;
    if (je && us(E)) {
      if (!us(O))
        return !1;
      ge = !0, rt = !1;
    }
    if (je && !rt)
      return re || (re = new Ht()), ge || Yu(E) ? qu(E, O, q, X, fe, re) : dg(E, O, De, q, X, fe, re);
    if (!(q & i)) {
      var ot = rt && St.call(E, "__wrapped__"), st = ft && St.call(O, "__wrapped__");
      if (ot || st) {
        var Wt = ot ? E.value() : E, It = st ? O.value() : O;
        return re || (re = new Ht()), fe(Wt, It, q, X, re);
      }
    }
    return je ? (re || (re = new Ht()), mg(E, O, q, X, fe, re)) : !1;
  }
  function ug(E) {
    if (!Vu(E) || yg(E))
      return !1;
    var O = Gu(E) ? Pv : Z;
    return O.test(yn(E));
  }
  function pg(E) {
    return jr(E) && Wu(E.length) && !!V[Br(E)];
  }
  function fg(E) {
    if (!bg(E))
      return kv(E);
    var O = [];
    for (var q in Object(E))
      St.call(E, q) && q != "constructor" && O.push(q);
    return O;
  }
  function qu(E, O, q, X, fe, re) {
    var ge = q & i, Ce = E.length, De = O.length;
    if (Ce != De && !(ge && De > Ce))
      return !1;
    var me = re.get(E);
    if (me && re.get(O))
      return me == O;
    var rt = -1, ft = !0, je = q & a ? new ra() : void 0;
    for (re.set(E, O), re.set(O, E); ++rt < Ce; ) {
      var ot = E[rt], st = O[rt];
      if (X)
        var Wt = ge ? X(st, ot, rt, O, E, re) : X(ot, st, rt, E, O, re);
      if (Wt !== void 0) {
        if (Wt)
          continue;
        ft = !1;
        break;
      }
      if (je) {
        if (!Ee(O, function(It, bn) {
          if (!Mt(je, bn) && (ot === It || fe(ot, It, q, X, re)))
            return je.push(bn);
        })) {
          ft = !1;
          break;
        }
      } else if (!(ot === st || fe(ot, st, q, X, re))) {
        ft = !1;
        break;
      }
    }
    return re.delete(E), re.delete(O), ft;
  }
  function dg(E, O, q, X, fe, re, ge) {
    switch (q) {
      case z:
        if (E.byteLength != O.byteLength || E.byteOffset != O.byteOffset)
          return !1;
        E = E.buffer, O = O.buffer;
      case H:
        return !(E.byteLength != O.byteLength || !re(new $u(E), new $u(O)));
      case l:
      case u:
      case g:
        return Hu(+E, +O);
      case d:
        return E.name == O.name && E.message == O.message;
      case U:
      case $:
        return E == O + "";
      case x:
        var Ce = qt;
      case k:
        var De = X & i;
        if (Ce || (Ce = zt), E.size != O.size && !De)
          return !1;
        var me = ge.get(E);
        if (me)
          return me == O;
        X |= a, ge.set(E, O);
        var rt = qu(Ce(E), Ce(O), X, fe, re, ge);
        return ge.delete(E), rt;
      case G:
        if (ls)
          return ls.call(E) == ls.call(O);
    }
    return !1;
  }
  function mg(E, O, q, X, fe, re) {
    var ge = q & i, Ce = zu(E), De = Ce.length, me = zu(O), rt = me.length;
    if (De != rt && !ge)
      return !1;
    for (var ft = De; ft--; ) {
      var je = Ce[ft];
      if (!(ge ? je in O : St.call(O, je)))
        return !1;
    }
    var ot = re.get(E);
    if (ot && re.get(O))
      return ot == O;
    var st = !0;
    re.set(E, O), re.set(O, E);
    for (var Wt = ge; ++ft < De; ) {
      je = Ce[ft];
      var It = E[je], bn = O[je];
      if (X)
        var Xu = ge ? X(bn, It, je, O, E, re) : X(It, bn, je, E, O, re);
      if (!(Xu === void 0 ? It === bn || fe(It, bn, q, X, re) : Xu)) {
        st = !1;
        break;
      }
      Wt || (Wt = je == "constructor");
    }
    if (st && !Wt) {
      var sa = E.constructor, ca = O.constructor;
      sa != ca && "constructor" in E && "constructor" in O && !(typeof sa == "function" && sa instanceof sa && typeof ca == "function" && ca instanceof ca) && (st = !1);
    }
    return re.delete(E), re.delete(O), st;
  }
  function zu(E) {
    return cg(E, Ag, xg);
  }
  function aa(E, O) {
    var q = E.__data__;
    return gg(O) ? q[typeof O == "string" ? "string" : "hash"] : q.map;
  }
  function Yn(E, O) {
    var q = Dt(E, O);
    return ug(q) ? q : void 0;
  }
  function hg(E) {
    var O = St.call(E, xn), q = E[xn];
    try {
      E[xn] = void 0;
      var X = !0;
    } catch {
    }
    var fe = Iu.call(E);
    return X && (O ? E[xn] = q : delete E[xn]), fe;
  }
  var xg = Uu ? function(E) {
    return E == null ? [] : (E = Object(E), Se(Uu(E), function(O) {
      return Lu.call(E, O);
    }));
  } : Tg, Gt = Br;
  (as && Gt(new as(new ArrayBuffer(1))) != z || Lr && Gt(new Lr()) != x || os && Gt(os.resolve()) != T || ss && Gt(new ss()) != k || cs && Gt(new cs()) != M) && (Gt = function(E) {
    var O = Br(E), q = O == b ? E.constructor : void 0, X = q ? yn(q) : "";
    if (X)
      switch (X) {
        case Iv:
          return z;
        case Nv:
          return x;
        case $v:
          return T;
        case Lv:
          return k;
        case Uv:
          return M;
      }
    return O;
  });
  function vg(E, O) {
    return O = O ?? o, !!O && (typeof E == "number" || ee.test(E)) && E > -1 && E % 1 == 0 && E < O;
  }
  function gg(E) {
    var O = typeof E;
    return O == "string" || O == "number" || O == "symbol" || O == "boolean" ? E !== "__proto__" : E === null;
  }
  function yg(E) {
    return !!ku && ku in E;
  }
  function bg(E) {
    var O = E && E.constructor, q = typeof O == "function" && O.prototype || ta;
    return E === q;
  }
  function wg(E) {
    return Iu.call(E);
  }
  function yn(E) {
    if (E != null) {
      try {
        return Du.call(E);
      } catch {
      }
      try {
        return E + "";
      } catch {
      }
    }
    return "";
  }
  function Hu(E, O) {
    return E === O || E !== E && O !== O;
  }
  var Eg = ju(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ju : function(E) {
    return jr(E) && St.call(E, "callee") && !Lu.call(E, "callee");
  }, oa = Array.isArray;
  function _g(E) {
    return E != null && Wu(E.length) && !Gu(E);
  }
  var us = Dv || Rg;
  function Sg(E, O) {
    return Mu(E, O);
  }
  function Gu(E) {
    if (!Vu(E))
      return !1;
    var O = Br(E);
    return O == h || O == v || O == f || O == D;
  }
  function Wu(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= o;
  }
  function Vu(E) {
    var O = typeof E;
    return E != null && (O == "object" || O == "function");
  }
  function jr(E) {
    return E != null && typeof E == "object";
  }
  var Yu = ve ? Vn(ve) : pg;
  function Ag(E) {
    return _g(E) ? sg(E) : fg(E);
  }
  function Tg() {
    return [];
  }
  function Rg() {
    return !1;
  }
  e.exports = Sg;
})(co, co.exports);
var xF = co.exports;
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.DownloadedUpdateHelper = void 0;
Ji.createTempUpdateFile = wF;
const vF = jn, gF = at, jd = xF, En = fn, ti = ce;
class yF {
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
    return ti.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return jd(this.versionInfo, n) && jd(this.fileInfo.info, r.info) && await (0, En.pathExists)(t) ? t : null;
    const a = await this.getValidCachedUpdateFile(r, i);
    return a === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = a, a);
  }
  async setDownloadedFile(t, n, r, i, a, o) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: a,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, o && await (0, En.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, En.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, n) {
    const r = this.getUpdateInfoFile();
    if (!await (0, En.pathExists)(r))
      return null;
    let a;
    try {
      a = await (0, En.readJson)(r);
    } catch (f) {
      let l = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${f.message})`), n.info(l), null;
    }
    if (!((a == null ? void 0 : a.fileName) !== null))
      return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== a.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${a.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = ti.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, En.pathExists)(s))
      return n.info("Cached update file doesn't exist"), null;
    const c = await bF(s);
    return t.info.sha512 !== c ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, s);
  }
  getUpdateInfoFile() {
    return ti.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Ji.DownloadedUpdateHelper = yF;
function bF(e, t = "sha512", n = "base64", r) {
  return new Promise((i, a) => {
    const o = (0, vF.createHash)(t);
    o.on("error", a).setEncoding(n), (0, gF.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", a).on("end", () => {
      o.end(), i(o.read());
    }).pipe(o, { end: !1 });
  });
}
async function wF(e, t, n) {
  let r = 0, i = ti.join(t, e);
  for (let a = 0; a < 3; a++)
    try {
      return await (0, En.unlink)(i), i;
    } catch (o) {
      if (o.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${o}`), i = ti.join(t, `${r++}-${e}`);
    }
  return i;
}
var Xo = {}, Su = {};
Object.defineProperty(Su, "__esModule", { value: !0 });
Su.getAppCacheDir = _F;
const xc = ce, EF = po;
function _F() {
  const e = (0, EF.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || xc.join(e, "AppData", "Local") : process.platform === "darwin" ? t = xc.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || xc.join(e, ".cache"), t;
}
Object.defineProperty(Xo, "__esModule", { value: !0 });
Xo.ElectronAppAdapter = void 0;
const Md = ce, SF = Su;
class AF {
  constructor(t = Nn.app) {
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
    return this.isPackaged ? Md.join(process.resourcesPath, "app-update.yml") : Md.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, SF.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (n, r) => t(r));
  }
}
Xo.ElectronAppAdapter = AF;
var hv = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = Re;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return Nn.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(a) {
      super(), this.proxyLoginCallback = a, this.cachedSession = null;
    }
    async download(a, o, s) {
      return await s.cancellationToken.createPromise((c, f, l) => {
        const u = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(a, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: o,
          options: s,
          onCancel: l,
          callback: (d) => {
            d == null ? c(o) : f(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(a, o) {
      a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const s = Nn.net.request({
        ...a,
        session: this.cachedSession
      });
      return s.on("response", o), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(a, o, s, c, f) {
      a.on("redirect", (l, u, d) => {
        a.abort(), c > this.maxRedirects ? s(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(d, o));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(hv);
var Qi = {}, _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.newBaseUrl = TF;
_t.newUrlFromBase = RF;
_t.getChannelFilename = CF;
const xv = ut;
function TF(e) {
  const t = new xv.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function RF(e, t, n = !1) {
  const r = new xv.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function CF(e) {
  return `${e}.yml`;
}
var Te = {}, OF = "[object Symbol]", vv = /[\\^$.*+?()[\]{}|]/g, PF = RegExp(vv.source), FF = typeof ue == "object" && ue && ue.Object === Object && ue, DF = typeof self == "object" && self && self.Object === Object && self, kF = FF || DF || Function("return this")(), IF = Object.prototype, NF = IF.toString, qd = kF.Symbol, zd = qd ? qd.prototype : void 0, Hd = zd ? zd.toString : void 0;
function $F(e) {
  if (typeof e == "string")
    return e;
  if (UF(e))
    return Hd ? Hd.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function LF(e) {
  return !!e && typeof e == "object";
}
function UF(e) {
  return typeof e == "symbol" || LF(e) && NF.call(e) == OF;
}
function BF(e) {
  return e == null ? "" : $F(e);
}
function jF(e) {
  return e = BF(e), e && PF.test(e) ? e.replace(vv, "\\$&") : e;
}
var gv = jF;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.Provider = void 0;
Te.findFile = GF;
Te.parseUpdateInfo = WF;
Te.getFileList = yv;
Te.resolveFiles = VF;
const cn = Re, MF = Be, qF = ut, lo = _t, zF = gv;
class HF {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, n, r, i = null) {
    const a = (0, lo.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, lo.newUrlFromBase)(`${t.pathname.replace(new RegExp(zF(r), "g"), n)}.blockmap`, i ? new qF.URL(i) : t), a];
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
  httpRequest(t, n, r) {
    return this.executor.request(this.createRequestOptions(t, n), r);
  }
  createRequestOptions(t, n) {
    const r = {};
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, cn.configureRequestUrl)(t, r), r;
  }
}
Te.Provider = HF;
function GF(e, t, n) {
  var r;
  if (e.length === 0)
    throw (0, cn.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((o) => o.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), a = (r = i.find((o) => [o.url.pathname, o.info.url].some((s) => s.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return a || (n == null ? e[0] : e.find((o) => !n.some((s) => o.url.pathname.toLowerCase().endsWith(`.${s.toLowerCase()}`))));
}
function WF(e, t, n) {
  if (e == null)
    throw (0, cn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, MF.load)(e);
  } catch (i) {
    throw (0, cn.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function yv(e) {
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
  throw (0, cn.newError)(`No files provided: ${(0, cn.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function VF(e, t, n = (r) => r) {
  const i = yv(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, cn.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, cn.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, lo.newUrlFromBase)(n(s.url), t),
      info: s
    };
  }), a = e.packages, o = a == null ? null : a[process.arch] || a.ia32;
  return o != null && (i[0].packageInfo = {
    ...o,
    path: (0, lo.newUrlFromBase)(n(o.path), t).href
  }), i;
}
Object.defineProperty(Qi, "__esModule", { value: !0 });
Qi.GenericProvider = void 0;
const Gd = Re, vc = _t, gc = Te;
class YF extends gc.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, vc.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, vc.getChannelFilename)(this.channel), n = (0, vc.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, gc.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof Gd.HttpError && i.statusCode === 404)
          throw (0, Gd.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && r < 3) {
          await new Promise((a, o) => {
            try {
              setTimeout(a, 1e3 * r);
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
    return (0, gc.resolveFiles)(t, this.baseUrl);
  }
}
Qi.GenericProvider = YF;
var Ko = {}, Jo = {};
Object.defineProperty(Jo, "__esModule", { value: !0 });
Jo.BitbucketProvider = void 0;
const Wd = Re, yc = _t, bc = Te;
class XF extends bc.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: a } = t;
    this.baseUrl = (0, yc.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Wd.CancellationToken(), n = (0, yc.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, yc.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, bc.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Wd.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, bc.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
Jo.BitbucketProvider = XF;
var ln = {};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.GitHubProvider = ln.BaseGitHubProvider = void 0;
ln.computeReleaseNotes = wv;
const Nt = Re, Rn = mv, KF = ut, pr = _t, sl = Te, wc = /\/tag\/([^/]+)$/;
class bv extends sl.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, pr.newBaseUrl)((0, Nt.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, pr.newBaseUrl)((0, Nt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
ln.BaseGitHubProvider = bv;
class JF extends bv {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, a;
    const o = new Nt.CancellationToken(), s = await this.httpRequest((0, pr.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, o), c = (0, Nt.parseXml)(s);
    let f = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const g = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = Rn.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (g === null)
          l = wc.exec(f.element("link").attribute("href"))[1];
        else
          for (const y of c.getElements("entry")) {
            const b = wc.exec(y.element("link").attribute("href"));
            if (b === null)
              continue;
            const T = b[1], D = ((r = Rn.prerelease(T)) === null || r === void 0 ? void 0 : r[0]) || null, U = !g || ["alpha", "beta"].includes(g), k = D !== null && !["alpha", "beta"].includes(String(D));
            if (U && !k && !(g === "beta" && D === "alpha")) {
              l = T;
              break;
            }
            if (D && D === g) {
              l = T;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(o);
        for (const g of c.getElements("entry"))
          if (wc.exec(g.element("link").attribute("href"))[1] === l) {
            f = g;
            break;
          }
      }
    } catch (g) {
      throw (0, Nt.newError)(`Cannot parse releases feed: ${g.stack || g.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Nt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, d = "", h = "";
    const v = async (g) => {
      d = (0, pr.getChannelFilename)(g), h = (0, pr.newUrlFromBase)(this.getBaseDownloadPath(String(l), d), this.baseUrl);
      const y = this.createRequestOptions(h);
      try {
        return await this.executor.request(y, o);
      } catch (b) {
        throw b instanceof Nt.HttpError && b.statusCode === 404 ? (0, Nt.newError)(`Cannot find ${d} in the latest release artifacts (${h}): ${b.stack || b.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : b;
      }
    };
    try {
      let g = this.channel;
      this.updater.allowPrerelease && (!((i = Rn.prerelease(l)) === null || i === void 0) && i[0]) && (g = this.getCustomChannelName(String((a = Rn.prerelease(l)) === null || a === void 0 ? void 0 : a[0]))), u = await v(g);
    } catch (g) {
      if (this.updater.allowPrerelease)
        u = await v(this.getDefaultChannelName());
      else
        throw g;
    }
    const x = (0, sl.parseUpdateInfo)(u, d, h);
    return x.releaseName == null && (x.releaseName = f.elementValueOrEmpty("title")), x.releaseNotes == null && (x.releaseNotes = wv(this.updater.currentVersion, this.updater.fullChangelog, c, f)), {
      tag: l,
      ...x
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, pr.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new KF.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Nt.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, sl.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
ln.GitHubProvider = JF;
function Vd(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function wv(e, t, n, r) {
  if (!t)
    return Vd(r);
  const i = [];
  for (const a of n.getElements("entry")) {
    const o = /\/tag\/v?([^/]+)$/.exec(a.element("link").attribute("href"))[1];
    Rn.valid(o) && Rn.lt(e, o) && i.push({
      version: o,
      note: Vd(a)
    });
  }
  return i.sort((a, o) => Rn.rcompare(a.version, o.version));
}
var Qo = {};
Object.defineProperty(Qo, "__esModule", { value: !0 });
Qo.GitLabProvider = void 0;
const Ge = Re, Ec = ut, QF = gv, Ca = _t, _c = Te;
class ZF extends _c.Provider {
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
  constructor(t, n, r) {
    super({
      ...r,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = n, this.cachedLatestVersion = null;
    const a = t.host || "gitlab.com";
    this.baseApiUrl = (0, Ca.newBaseUrl)(`https://${a}/api/v4`);
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new Ge.CancellationToken(), n = (0, Ca.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let r;
    try {
      const d = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, h = await this.httpRequest(n, d, t);
      if (!h)
        throw (0, Ge.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      r = JSON.parse(h);
    } catch (d) {
      throw (0, Ge.newError)(`Unable to find latest release on GitLab (${n}): ${d.stack || d.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = r.tag_name;
    let a = null, o = "", s = null;
    const c = async (d) => {
      o = (0, Ca.getChannelFilename)(d);
      const h = r.assets.links.find((x) => x.name === o);
      if (!h)
        throw (0, Ge.newError)(`Cannot find ${o} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      s = new Ec.URL(h.direct_asset_url);
      const v = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const x = await this.httpRequest(s, v, t);
        if (!x)
          throw (0, Ge.newError)(`Empty response from ${s}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return x;
      } catch (x) {
        throw x instanceof Ge.HttpError && x.statusCode === 404 ? (0, Ge.newError)(`Cannot find ${o} in the latest release artifacts (${s}): ${x.stack || x.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : x;
      }
    };
    try {
      a = await c(this.channel);
    } catch (d) {
      if (this.channel !== this.getDefaultChannelName())
        a = await c(this.getDefaultChannelName());
      else
        throw d;
    }
    if (!a)
      throw (0, Ge.newError)(`Unable to parse channel data from ${o}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const f = (0, _c.parseUpdateInfo)(a, o, s);
    f.releaseName == null && (f.releaseName = r.name), f.releaseNotes == null && (f.releaseNotes = r.description || null);
    const l = /* @__PURE__ */ new Map();
    for (const d of r.assets.links)
      l.set(this.normalizeFilename(d.name), d.direct_asset_url);
    const u = {
      tag: i,
      assets: l,
      ...f
    };
    return this.cachedLatestVersion = u, u;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const n = /* @__PURE__ */ new Map();
    for (const r of t.links)
      n.set(this.normalizeFilename(r.name), r.direct_asset_url);
    return n;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, n) {
    const r = [`${n}.blockmap`, `${this.normalizeFilename(n)}.blockmap`];
    for (const i of r) {
      const a = t.get(i);
      if (a)
        return new Ec.URL(a);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const n = new Ge.CancellationToken(), r = [`v${t}`, t];
    for (const i of r) {
      const a = (0, Ca.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const o = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, s = await this.httpRequest(a, o, n);
        if (s)
          return JSON.parse(s);
      } catch (o) {
        if (o instanceof Ge.HttpError && o.statusCode === 404)
          continue;
        throw (0, Ge.newError)(`Unable to find release ${i} on GitLab (${a}): ${o.stack || o.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Ge.newError)(`Unable to find release with version ${t} (tried: ${r.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const n = {};
    return t != null && (t.startsWith("Bearer") ? n.authorization = t : n["PRIVATE-TOKEN"] = t), n;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const n = await this.fetchReleaseInfoByVersion(t);
    return n && n.assets ? this.convertAssetsToMap(n.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, n, r) {
    let i = null, a = null;
    const o = await this.getVersionInfoForBlockMap(n);
    o && (i = this.findBlockMapInAssets(o, r));
    const s = await this.getVersionInfoForBlockMap(t);
    if (s) {
      const c = r.replace(new RegExp(QF(n), "g"), t);
      a = this.findBlockMapInAssets(s, c);
    }
    return [a, i];
  }
  async getBlockMapFiles(t, n, r, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const a = t.pathname.split("/").pop() || "", [o, s] = await this.findBlockMapUrlsFromAssets(n, r, a);
      if (!s)
        throw (0, Ge.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!o)
        throw (0, Ge.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [o, s];
    } else
      return super.getBlockMapFiles(t, n, r, i);
  }
  resolveFiles(t) {
    return (0, _c.getFileList)(t).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((o) => t.assets.has(o)), a = i ? t.assets.get(i) : void 0;
      if (!a)
        throw (0, Ge.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Ec.URL(a),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
Qo.GitLabProvider = ZF;
var Zo = {};
Object.defineProperty(Zo, "__esModule", { value: !0 });
Zo.KeygenProvider = void 0;
const Yd = Re, Sc = _t, Ac = Te;
class e3 extends Ac.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Sc.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Yd.CancellationToken(), n = (0, Sc.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Sc.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Ac.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Yd.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Ac.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
Zo.KeygenProvider = e3;
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
es.PrivateGitHubProvider = void 0;
const Zn = Re, t3 = Be, n3 = ce, Xd = ut, Kd = _t, r3 = ln, i3 = Te;
class a3 extends r3.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new Zn.CancellationToken(), n = (0, Kd.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((s) => s.name === n);
    if (i == null)
      throw (0, Zn.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const a = new Xd.URL(i.url);
    let o;
    try {
      o = (0, t3.load)(await this.httpRequest(a, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Zn.HttpError && s.statusCode === 404 ? (0, Zn.newError)(`Cannot find ${n} in the latest release artifacts (${a}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return o.assets = r.assets, o;
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
    const n = this.updater.allowPrerelease;
    let r = this.basePath;
    n || (r = `${r}/latest`);
    const i = (0, Kd.newUrlFromBase)(r, this.baseUrl);
    try {
      const a = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return n ? a.find((o) => o.prerelease) || a[0] : a;
    } catch (a) {
      throw (0, Zn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, i3.getFileList)(t).map((n) => {
      const r = n3.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((a) => a != null && a.name === r);
      if (i == null)
        throw (0, Zn.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Xd.URL(i.url),
        info: n
      };
    });
  }
}
es.PrivateGitHubProvider = a3;
Object.defineProperty(Ko, "__esModule", { value: !0 });
Ko.isUrlProbablySupportMultiRangeRequests = Ev;
Ko.createClient = p3;
const Oa = Re, o3 = Jo, Jd = Qi, s3 = ln, c3 = Qo, l3 = Zo, u3 = es;
function Ev(e) {
  return !e.includes("s3.amazonaws.com");
}
function p3(e, t, n) {
  if (typeof e == "string")
    throw (0, Oa.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, a = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return a == null ? new s3.GitHubProvider(i, t, n) : new u3.PrivateGitHubProvider(i, t, a, n);
    }
    case "bitbucket":
      return new o3.BitbucketProvider(e, t, n);
    case "gitlab":
      return new c3.GitLabProvider(e, t, n);
    case "keygen":
      return new l3.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new Jd.GenericProvider({
        provider: "generic",
        url: (0, Oa.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Jd.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Ev(i.url)
      });
    }
    case "custom": {
      const i = e, a = i.updateProvider;
      if (!a)
        throw (0, Oa.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new a(i, t, n);
    }
    default:
      throw (0, Oa.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var ts = {}, Zi = {}, Nr = {}, Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.OperationKind = void 0;
Wn.computeOperations = f3;
var Cn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Cn || (Wn.OperationKind = Cn = {}));
function f3(e, t, n) {
  const r = Zd(e.files), i = Zd(t.files);
  let a = null;
  const o = t.files[0], s = [], c = o.name, f = r.get(c);
  if (f == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: d, checksumToOldSize: h } = m3(r.get(c), f.offset, n);
  let v = o.offset;
  for (let x = 0; x < l.checksums.length; v += l.sizes[x], x++) {
    const g = l.sizes[x], y = l.checksums[x];
    let b = d.get(y);
    b != null && h.get(y) !== g && (n.warn(`Checksum ("${y}") matches, but size differs (old: ${h.get(y)}, new: ${g})`), b = void 0), b === void 0 ? (u++, a != null && a.kind === Cn.DOWNLOAD && a.end === v ? a.end += g : (a = {
      kind: Cn.DOWNLOAD,
      start: v,
      end: v + g
      // oldBlocks: null,
    }, Qd(a, s, y, x))) : a != null && a.kind === Cn.COPY && a.end === b ? a.end += g : (a = {
      kind: Cn.COPY,
      start: b,
      end: b + g
      // oldBlocks: [checksum]
    }, Qd(a, s, y, x));
  }
  return u > 0 && n.info(`File${o.name === "file" ? "" : " " + o.name} has ${u} changed blocks`), s;
}
const d3 = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Qd(e, t, n, r) {
  if (d3 && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const a = [i.start, i.end, e.start, e.end].reduce((o, s) => o < s ? o : s);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${Cn[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - a} until ${i.end - a} and ${e.start - a} until ${e.end - a}`);
    }
  }
  t.push(e);
}
function m3(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let a = t;
  for (let o = 0; o < e.checksums.length; o++) {
    const s = e.checksums[o], c = e.sizes[o], f = i.get(s);
    if (f === void 0)
      r.set(s, a), i.set(s, c);
    else if (n.debug != null) {
      const l = f === c ? "(same size)" : `(size: ${f}, this size: ${c})`;
      n.debug(`${s} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    a += c;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function Zd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.DataSplitter = void 0;
Nr.copyData = _v;
const Pa = Re, h3 = at, x3 = le, v3 = Wn, em = Buffer.from(`\r
\r
`);
var Jt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Jt || (Jt = {}));
function _v(e, t, n, r, i) {
  const a = (0, h3.createReadStream)("", {
    fd: n,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  a.on("error", r), a.once("end", i), a.pipe(t, {
    end: !1
  });
}
class g3 extends x3.Writable {
  constructor(t, n, r, i, a, o, s, c) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = a, this.finishHandler = o, this.grandTotalBytes = s, this.onProgress = c, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListBuffer = null, this.readState = Jt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, n, r) {
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
      r();
    }).catch(r);
  }
  async handleData(t) {
    let n = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Pa.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === Jt.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = Jt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Jt.BODY)
          this.readState = Jt.INIT;
        else {
          this.partIndex++;
          let o = this.partIndexToTaskIndex.get(this.partIndex);
          if (o == null)
            if (this.isFinished)
              o = this.options.end;
            else
              throw (0, Pa.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < o)
            await this.copyExistingData(s, o);
          else if (s > o)
            throw (0, Pa.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = Jt.HEADER;
            return;
          }
        }
        const r = this.partIndexToLength[this.partIndex], i = n + r, a = Math.min(i, t.length);
        if (await this.processPartStarted(t, n, a), this.remainingPartDataCount = r - (a - n), this.remainingPartDataCount > 0)
          return;
        if (n = i + this.boundaryLength, n >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, n) {
    return new Promise((r, i) => {
      const a = () => {
        if (t === n) {
          r();
          return;
        }
        const o = this.options.tasks[t];
        if (o.kind !== v3.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        _v(o, this.out, this.options.oldFileFd, i, () => {
          t++, a();
        });
      };
      a();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = t.indexOf(em, n);
    if (r !== -1)
      return r + em.length;
    const i = n === 0 ? t : t.slice(n);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Pa.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, n, r) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, n, r);
  }
  processPartData(t, n, r) {
    this.actualPartLength += r - n, this.transferred += r - n, this.delta += r - n;
    const i = this.out;
    return i.write(n === 0 && t.length === r ? t : t.slice(n, r)) ? Promise.resolve() : new Promise((a, o) => {
      i.on("error", o), i.once("drain", () => {
        i.removeListener("error", o), a();
      });
    });
  }
}
Nr.DataSplitter = g3;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.executeTasksUsingMultipleRangeRequests = y3;
ns.checkIsRangesSupported = ll;
const cl = Re, tm = Nr, nm = Wn;
function y3(e, t, n, r, i) {
  const a = (o) => {
    if (o >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const s = o + 1e3;
    b3(e, {
      tasks: t,
      start: o,
      end: Math.min(t.length, s),
      oldFileFd: r
    }, n, () => a(s), i);
  };
  return a;
}
function b3(e, t, n, r, i) {
  let a = "bytes=", o = 0, s = 0;
  const c = /* @__PURE__ */ new Map(), f = [];
  for (let d = t.start; d < t.end; d++) {
    const h = t.tasks[d];
    h.kind === nm.OperationKind.DOWNLOAD && (a += `${h.start}-${h.end - 1}, `, c.set(o, d), o++, f.push(h.end - h.start), s += h.end - h.start);
  }
  if (o <= 1) {
    const d = (h) => {
      if (h >= t.end) {
        r();
        return;
      }
      const v = t.tasks[h++];
      if (v.kind === nm.OperationKind.COPY)
        (0, tm.copyData)(v, n, t.oldFileFd, i, () => d(h));
      else {
        const x = e.createRequestOptions();
        x.headers.Range = `bytes=${v.start}-${v.end - 1}`;
        const g = e.httpExecutor.createRequest(x, (y) => {
          y.on("error", i), ll(y, i) && (y.pipe(n, {
            end: !1
          }), y.once("end", () => d(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(g, i), g.end();
      }
    };
    d(t.start);
    return;
  }
  const l = e.createRequestOptions();
  l.headers.Range = a.substring(0, a.length - 2);
  const u = e.httpExecutor.createRequest(l, (d) => {
    if (!ll(d, i))
      return;
    const h = (0, cl.safeGetHeader)(d, "content-type"), v = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(h);
    if (v == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const x = new tm.DataSplitter(n, t, c, v[1] || v[2], f, r, s, e.options.onProgress);
    x.on("error", i), d.pipe(x), d.on("end", () => {
      setTimeout(() => {
        u.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function ll(e, t) {
  if (e.statusCode >= 400)
    return t((0, cl.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, cl.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.ProgressDifferentialDownloadCallbackTransform = void 0;
const w3 = le;
var fr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(fr || (fr = {}));
class E3 extends w3.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = fr.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == fr.COPY) {
      r(null, t);
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
    }), this.delta = 0), r(null, t);
  }
  beginFileCopy() {
    this.operationType = fr.COPY;
  }
  beginRangeDownload() {
    this.operationType = fr.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
rs.ProgressDifferentialDownloadCallbackTransform = E3;
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.DifferentialDownloader = void 0;
const Yr = Re, Tc = fn, _3 = at, S3 = Nr, A3 = ut, Fa = Wn, rm = ns, T3 = rs;
class R3 {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, n, r) {
    this.blockAwareFileInfo = t, this.httpExecutor = n, this.options = r, this.fileMetadataBuffer = null, this.logger = r.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, Yr.configureRequestUrl)(this.options.newUrl, t), (0, Yr.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, Fa.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let a = 0, o = 0;
    for (const c of i) {
      const f = c.end - c.start;
      c.kind === Fa.OperationKind.DOWNLOAD ? a += f : o += f;
    }
    const s = this.blockAwareFileInfo.size;
    if (a + o + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${a}, copySize: ${o}, newSize: ${s}`);
    return r.info(`Full: ${im(s)}, To download: ${im(a)} (${Math.round(a / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, Tc.close)(i.descriptor).catch((a) => {
      this.logger.error(`cannot close file "${i.path}": ${a}`);
    })));
    return this.doDownloadFile(t, n).then(r).catch((i) => r().catch((a) => {
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
  async doDownloadFile(t, n) {
    const r = await (0, Tc.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, Tc.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const a = (0, _3.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((o, s) => {
      const c = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const y = [];
        let b = 0;
        for (const D of t)
          D.kind === Fa.OperationKind.DOWNLOAD && (y.push(D.end - D.start), b += D.end - D.start);
        const T = {
          expectedByteCounts: y,
          grandTotal: b
        };
        f = new T3.ProgressDifferentialDownloadCallbackTransform(T, this.options.cancellationToken, this.options.onProgress), c.push(f);
      }
      const l = new Yr.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), a.on("finish", () => {
        a.close(() => {
          n.splice(1, 1);
          try {
            l.validate();
          } catch (y) {
            s(y);
            return;
          }
          o(void 0);
        });
      }), c.push(a);
      let u = null;
      for (const y of c)
        y.on("error", s), u == null ? u = y : u = u.pipe(y);
      const d = c[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, rm.executeTasksUsingMultipleRangeRequests)(this, t, d, r, s), h(0);
        return;
      }
      let v = 0, x = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const g = this.createRequestOptions();
      g.redirect = "manual", h = (y) => {
        var b, T;
        if (y >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const D = t[y++];
        if (D.kind === Fa.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, S3.copyData)(D, d, r, s, () => h(y));
          return;
        }
        const U = `bytes=${D.start}-${D.end - 1}`;
        g.headers.range = U, (T = (b = this.logger) === null || b === void 0 ? void 0 : b.debug) === null || T === void 0 || T.call(b, `download range: ${U}`), f && f.beginRangeDownload();
        const k = this.httpExecutor.createRequest(g, ($) => {
          $.on("error", s), $.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), $.statusCode >= 400 && s((0, Yr.createHttpError)($)), $.pipe(d, {
            end: !1
          }), $.once("end", () => {
            f && f.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => h(y), 1e3)) : h(y);
          });
        });
        k.on("redirect", ($, G, S) => {
          this.logger.info(`Redirect to ${C3(S)}`), x = S, (0, Yr.configureRequestUrl)(new A3.URL(x), g), k.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(k, s), k.end();
      }, h(0);
    });
  }
  async readRemoteBytes(t, n) {
    const r = Buffer.allocUnsafe(n + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${n}`;
    let a = 0;
    if (await this.request(i, (o) => {
      o.copy(r, a), a += o.length;
    }), a !== r.length)
      throw new Error(`Received data length ${a} is not equal to expected ${r.length}`);
    return r;
  }
  request(t, n) {
    return new Promise((r, i) => {
      const a = this.httpExecutor.createRequest(t, (o) => {
        (0, rm.checkIsRangesSupported)(o, i) && (o.on("error", i), o.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), o.on("data", n), o.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(a, i), a.end();
    });
  }
}
Zi.DifferentialDownloader = R3;
function im(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function C3(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(ts, "__esModule", { value: !0 });
ts.GenericDifferentialDownloader = void 0;
const O3 = Zi;
class P3 extends O3.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
ts.GenericDifferentialDownloader = P3;
var dn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = r;
  const t = Re;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class n {
    constructor(a) {
      this.emitter = a;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(a) {
      r(this.emitter, "login", a);
    }
    progress(a) {
      r(this.emitter, e.DOWNLOAD_PROGRESS, a);
    }
    updateDownloaded(a) {
      r(this.emitter, e.UPDATE_DOWNLOADED, a);
    }
    updateCancelled(a) {
      r(this.emitter, "update-cancelled", a);
    }
  }
  e.UpdaterSignal = n;
  function r(i, a, o) {
    i.on(a, o);
  }
})(dn);
Object.defineProperty(an, "__esModule", { value: !0 });
an.NoOpLogger = an.AppUpdater = void 0;
const We = Re, F3 = jn, D3 = po, k3 = Si, mt = fn, I3 = Be, Rc = zo, ht = ce, _n = mv, am = Ji, N3 = Xo, om = hv, $3 = Qi, Cc = Ko, Oc = lt, L3 = ts, er = dn;
class Au extends k3.EventEmitter {
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
        throw (0, We.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, We.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
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
    return (0, om.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Sv();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Rc.Lazy(() => this.loadUpdateConfig());
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
  constructor(t, n) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new er.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (a) => this.checkIfUpdateSupported(a), this._isUserWithinRollout = (a) => this.isStagingMatch(a), this.clientPromise = null, this.stagingUserIdPromise = new Rc.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Rc.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (a) => {
      this._logger.error(`Error: ${a.stack || a.message}`);
    }), n == null ? (this.app = new N3.ElectronAppAdapter(), this.httpExecutor = new om.ElectronHttpExecutor((a, o) => this.emit("login", a, o))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, _n.parse)(r);
    if (i == null)
      throw (0, We.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = U3(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
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
    const n = this.createProviderRuntimeOptions();
    let r;
    typeof t == "string" ? r = new $3.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, Cc.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, Cc.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
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
    const n = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((r) => (n(), r)).catch((r) => {
      throw n(), this.emit("error", r, `Cannot check for updates: ${(r.stack || r).toString()}`), r;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((n) => n != null && n.downloadPromise ? (n.downloadPromise.then(() => {
      const r = Au.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
      new Nn.Notification(r).show();
    }), n) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), n));
  }
  static formatDownloadNotification(t, n, r) {
    return r == null && (r = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), r = {
      title: r.title.replace("{appName}", n).replace("{version}", t),
      body: r.body.replace("{appName}", n).replace("{version}", t)
    }, r;
  }
  async isStagingMatch(t) {
    const n = t.stagingPercentage;
    let r = n;
    if (r == null)
      return !0;
    if (r = parseInt(r, 10), isNaN(r))
      return this._logger.warn(`Staging percentage is NaN: ${n}`), !0;
    r = r / 100;
    const i = await this.stagingUserIdPromise.value, o = We.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${o}, user id: ${i}`), o < r;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const n = (0, _n.parse)(t.version);
    if (n == null)
      throw (0, We.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, _n.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const a = (0, _n.gt)(n, r), o = (0, _n.lt)(n, r);
    return a ? !0 : this.allowDowngrade && o;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, D3.release)();
    if (n)
      try {
        if ((0, _n.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, Cc.createClient)(r, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, n = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": n })), {
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
    const t = await this.getUpdateInfoAndProvider(), n = t.info;
    if (!await this.isUpdateAvailable(n))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${n.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", n), {
        isUpdateAvailable: !1,
        versionInfo: n,
        updateInfo: n
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(n);
    const r = new We.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: n,
      updateInfo: n,
      cancellationToken: r,
      downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, We.asArray)(t.files).map((n) => n.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new We.CancellationToken()) {
    const n = this.updateInfoAndProvider;
    if (n == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, We.asArray)(n.info.files).map((i) => i.url).join(", ")}`);
    const r = (i) => {
      if (!(i instanceof We.CancellationError))
        try {
          this.dispatchError(i);
        } catch (a) {
          this._logger.warn(`Cannot dispatch error event: ${a.stack || a}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: n,
      requestHeaders: this.computeRequestHeaders(n.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw r(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(er.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, I3.load)(await (0, mt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const n = t.fileExtraDownloadHeaders;
    if (n != null) {
      const r = this.requestHeaders;
      return r == null ? n : {
        ...n,
        ...r
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = ht.join(this.app.userDataPath, ".updaterId");
    try {
      const r = await (0, mt.readFile)(t, "utf-8");
      if (We.UUID.check(r))
        return r;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${r}`);
    } catch (r) {
      r.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${r}`);
    }
    const n = We.UUID.v5((0, F3.randomBytes)(4096), We.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${n}`);
    try {
      await (0, mt.outputFile)(t, n);
    } catch (r) {
      this._logger.warn(`Couldn't write out staging user ID: ${r}`);
    }
    return n;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const n of Object.keys(t)) {
      const r = n.toLowerCase();
      if (r === "authorization" || r === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const n = (await this.configOnDisk.value).updaterCacheDirName, r = this._logger;
      n == null && r.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = ht.join(this.app.baseCachePath, n || this.app.name);
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new am.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const n = t.fileInfo, r = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: n.info.sha2,
      sha512: n.info.sha512
    };
    this.listenerCount(er.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (b) => this.emit(er.DOWNLOAD_PROGRESS, b));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, a = i.version, o = n.packageInfo;
    function s() {
      const b = decodeURIComponent(t.fileInfo.url.pathname);
      return b.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? ht.basename(b) : t.fileInfo.info.url;
    }
    const c = await this.getOrCreateDownloadHelper(), f = c.cacheDirForPendingUpdate;
    await (0, mt.mkdir)(f, { recursive: !0 });
    const l = s();
    let u = ht.join(f, l);
    const d = o == null ? null : ht.join(f, `package-${a}${ht.extname(o.path) || ".7z"}`), h = async (b) => {
      await c.setDownloadedFile(u, d, i, n, l, b), await t.done({
        ...i,
        downloadedFile: u
      });
      const T = ht.join(f, "current.blockmap");
      return await (0, mt.pathExists)(T) && await (0, mt.copyFile)(T, ht.join(c.cacheDir, "current.blockmap")), d == null ? [u] : [u, d];
    }, v = this._logger, x = await c.validateDownloadedPath(u, i, n, v);
    if (x != null)
      return u = x, await h(!1);
    const g = async () => (await c.clear().catch(() => {
    }), await (0, mt.unlink)(u).catch(() => {
    })), y = await (0, am.createTempUpdateFile)(`temp-${l}`, f, v);
    try {
      await t.task(y, r, d, g), await (0, We.retry)(() => (0, mt.rename)(y, u), {
        retries: 60,
        interval: 500,
        shouldRetry: (b) => b instanceof Error && /^EBUSY:/.test(b.message) ? !0 : (v.warn(`Cannot rename temp file to final file: ${b.message || b.stack}`), !1)
      });
    } catch (b) {
      throw await g(), b instanceof We.CancellationError && (v.info("cancelled"), this.emit("update-cancelled", i)), b;
    }
    return v.info(`New version ${a} has been downloaded to ${u}`), await h(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, a) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const o = n.updateInfoAndProvider.provider, s = await o.getBlockMapFiles(t.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
      const c = async (v) => {
        const x = await this.httpExecutor.downloadToBuffer(v, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (x == null || x.length === 0)
          throw new Error(`Blockmap "${v.href}" is empty`);
        try {
          return JSON.parse((0, Oc.gunzipSync)(x).toString());
        } catch (g) {
          throw new Error(`Cannot parse blockmap "${v.href}", error: ${g}`);
        }
      }, f = {
        newUrl: t.url,
        oldFile: ht.join(this.downloadedUpdateHelper.cacheDir, a),
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: o.isUseMultipleRangeRequest,
        requestHeaders: n.requestHeaders,
        cancellationToken: n.cancellationToken
      };
      this.listenerCount(er.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (v) => this.emit(er.DOWNLOAD_PROGRESS, v));
      const l = async (v, x) => {
        const g = ht.join(x, "current.blockmap");
        await (0, mt.outputFile)(g, (0, Oc.gzipSync)(JSON.stringify(v)));
      }, u = async (v) => {
        const x = ht.join(v, "current.blockmap");
        try {
          if (await (0, mt.pathExists)(x))
            return JSON.parse((0, Oc.gunzipSync)(await (0, mt.readFile)(x)).toString());
        } catch (g) {
          this._logger.warn(`Cannot parse blockmap "${x}", error: ${g}`);
        }
        return null;
      }, d = await c(s[1]);
      await l(d, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let h = await u(this.downloadedUpdateHelper.cacheDir);
      return h == null && (h = await c(s[0])), await new L3.GenericDifferentialDownloader(t.info, this.httpExecutor, f).download(h, d), !1;
    } catch (o) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), this._testOnlyOptions != null)
        throw o;
      return !0;
    }
  }
}
an.AppUpdater = Au;
function U3(e) {
  const t = (0, _n.prerelease)(e);
  return t != null && t.length > 0;
}
class Sv {
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
an.NoOpLogger = Sv;
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.BaseUpdater = void 0;
const sm = fo, B3 = an;
class j3 extends B3.AppUpdater {
  constructor(t, n) {
    super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Nn.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (n) => (this.dispatchUpdateDownloaded(n), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, n = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const r = this.downloadedUpdateHelper, i = this.installerPath, a = r == null ? null : r.downloadedFileInfo;
    if (i == null || a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${n}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: n,
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
  spawnSyncLog(t, n = [], r = {}) {
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const i = (0, sm.spawnSync)(t, n, {
      env: { ...process.env, ...r },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: o, stdout: s, stderr: c } = i;
    if (a != null)
      throw this._logger.error(c), a;
    if (o != null && o !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${o}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, n = [], r = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${n}`), new Promise((a, o) => {
      try {
        const s = { stdio: i, env: r, detached: !0 }, c = (0, sm.spawn)(t, n, s);
        c.on("error", (f) => {
          o(f);
        }), c.unref(), c.pid !== void 0 && a(!0);
      } catch (s) {
        o(s);
      }
    });
  }
}
Gn.BaseUpdater = j3;
var vi = {}, ea = {};
Object.defineProperty(ea, "__esModule", { value: !0 });
ea.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const tr = fn, M3 = Zi, q3 = lt;
class z3 extends M3.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = Av(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await H3(this.options.oldFile), i);
  }
}
ea.FileWithEmbeddedBlockMapDifferentialDownloader = z3;
function Av(e) {
  return JSON.parse((0, q3.inflateRawSync)(e).toString());
}
async function H3(e) {
  const t = await (0, tr.open)(e, "r");
  try {
    const n = (await (0, tr.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, tr.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, tr.read)(t, i, 0, i.length, n - r.length - i.length), await (0, tr.close)(t), Av(i);
  } catch (n) {
    throw await (0, tr.close)(t), n;
  }
}
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.AppImageUpdater = void 0;
const cm = Re, lm = fo, G3 = fn, W3 = at, Xr = ce, V3 = Gn, Y3 = ea, X3 = Te, um = dn;
class K3 extends V3.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, X3.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        const o = process.env.APPIMAGE;
        if (o == null)
          throw (0, cm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, o, i, n, t)) && await this.httpExecutor.download(r.url, i, a), await (0, G3.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, n, r, i, a) {
    try {
      const o = {
        newUrl: t.url,
        oldFile: n,
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: a.requestHeaders,
        cancellationToken: a.cancellationToken
      };
      return this.listenerCount(um.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(um.DOWNLOAD_PROGRESS, s)), await new Y3.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, o).download(), !1;
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, cm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, W3.unlinkSync)(n);
    let r;
    const i = Xr.basename(n), a = this.installerPath;
    if (a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Xr.basename(a) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = Xr.join(Xr.dirname(n), Xr.basename(a)), (0, lm.execFileSync)("mv", ["-f", a, r]), r !== n && this.emit("appimage-filename-updated", r);
    const o = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], o) : (o.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, lm.execFileSync)(r, [], { env: o })), !0;
  }
}
vi.AppImageUpdater = K3;
var gi = {}, $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
$r.LinuxUpdater = void 0;
const J3 = Gn;
class Q3 extends J3.BaseUpdater {
  constructor(t, n) {
    super(t, n);
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
    var t, n;
    return (n = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && n !== void 0 ? n : null;
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: n } = this.app, r = `"${n} would like to update"`, i = this.sudoWithArgs(r);
    this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
    let a = '"';
    return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (a = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${a}/bin/bash`, "-c", `'${t.join(" ")}'${a}`]);
  }
  sudoWithArgs(t) {
    const n = this.determineSudoCommand(), r = [n];
    return /kdesudo/i.test(n) ? (r.push("--comment", t), r.push("-c")) : /gksudo/i.test(n) ? r.push("--message", t) : /pkexec/i.test(n) && r.push("--disable-internal-agent"), r;
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
    for (const n of t)
      if (this.hasCommand(n))
        return n;
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
    var n;
    const r = (n = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || n === void 0 ? void 0 : n.trim();
    if (r)
      return r;
    for (const i of t)
      if (this.hasCommand(i))
        return i;
    return this._logger.warn(`No package manager found in the list: ${t.join(", ")}. Defaulting to the first one: ${t[0]}`), t[0];
  }
}
$r.LinuxUpdater = Q3;
Object.defineProperty(gi, "__esModule", { value: !0 });
gi.DebUpdater = void 0;
const Z3 = Te, pm = dn, e4 = $r;
class Tu extends e4.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Z3.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(pm.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(pm.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(r.url, i, a);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const r = ["dpkg", "apt"], i = this.detectPackageManager(r);
    try {
      Tu.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r, i) {
    var a;
    if (t === "dpkg")
      try {
        r(["dpkg", "-i", n]);
      } catch (o) {
        i.warn((a = o.message) !== null && a !== void 0 ? a : o), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), r(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), r([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        n
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
gi.DebUpdater = Tu;
var yi = {};
Object.defineProperty(yi, "__esModule", { value: !0 });
yi.PacmanUpdater = void 0;
const fm = dn, t4 = Te, n4 = $r;
class Ru extends n4.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, t4.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(fm.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(fm.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(r.url, i, a);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      Ru.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (r) {
      return this.dispatchError(r), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r) {
    var i;
    try {
      n(["pacman", "-U", "--noconfirm", t]);
    } catch (a) {
      r.warn((i = a.message) !== null && i !== void 0 ? i : a), r.warn("pacman installation failed, attempting to update package database and retry");
      try {
        n(["pacman", "-Sy", "--noconfirm"]), n(["pacman", "-U", "--noconfirm", t]);
      } catch (o) {
        throw r.error("Retry after pacman -Sy failed"), o;
      }
    }
  }
}
yi.PacmanUpdater = Ru;
var bi = {};
Object.defineProperty(bi, "__esModule", { value: !0 });
bi.RpmUpdater = void 0;
const dm = dn, r4 = Te, i4 = $r;
class Cu extends i4.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, r4.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(dm.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(dm.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(r.url, i, a);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      Cu.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r, i) {
    if (t === "zypper")
      return r(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", n]);
    if (t === "dnf")
      return r(["dnf", "install", "--nogpgcheck", "-y", n]);
    if (t === "yum")
      return r(["yum", "install", "--nogpgcheck", "-y", n]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), r(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", n]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
bi.RpmUpdater = Cu;
var wi = {};
Object.defineProperty(wi, "__esModule", { value: !0 });
wi.MacUpdater = void 0;
const mm = Re, Pc = fn, a4 = at, hm = ce, o4 = uo, s4 = an, c4 = Te, xm = fo, vm = jn;
class l4 extends s4.AppUpdater {
  constructor(t, n) {
    super(t, n), this.nativeUpdater = Nn.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
      this._logger.warn(r), this.emit("error", r);
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
    let n = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const r = this._logger, i = "sysctl.proc_translated";
    let a = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), a = (0, xm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${a})`);
    } catch (u) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${u}`);
    }
    let o = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const d = (0, xm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${d}`), o = o || d;
    } catch (u) {
      r.warn(`uname shell command to check for arm64 failed: ${u}`);
    }
    o = o || process.arch === "arm64" || a;
    const s = (u) => {
      var d;
      return u.url.pathname.includes("arm64") || ((d = u.info.url) === null || d === void 0 ? void 0 : d.includes("arm64"));
    };
    o && n.some(s) ? n = n.filter((u) => o === s(u)) : n = n.filter((u) => !s(u));
    const c = (0, c4.findFile)(n, "zip", ["pkg", "dmg"]);
    if (c == null)
      throw (0, mm.newError)(`ZIP file not provided: ${(0, mm.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const f = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: c,
      downloadUpdateOptions: t,
      task: async (u, d) => {
        const h = hm.join(this.downloadedUpdateHelper.cacheDir, l), v = () => (0, Pc.pathExistsSync)(h) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let x = !0;
        v() && (x = await this.differentialDownloadInstaller(c, t, u, f, l)), x && await this.httpExecutor.download(c.url, u, d);
      },
      done: async (u) => {
        if (!t.disableDifferentialDownload)
          try {
            const d = hm.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, Pc.copyFile)(u.downloadedFile, d);
          } catch (d) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${d.message}`);
          }
        return this.updateDownloaded(c, u);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, a = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, Pc.stat)(i)).size, o = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, o4.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      o.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const c = (f) => {
      const l = f.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((f, l) => {
      const u = (0, vm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), d = Buffer.from(`autoupdater:${u}`, "ascii"), h = `/${(0, vm.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (v, x) => {
        const g = v.url;
        if (o.info(`${g} requested`), g === "/") {
          if (!v.headers.authorization || v.headers.authorization.indexOf("Basic ") === -1) {
            x.statusCode = 401, x.statusMessage = "Invalid Authentication Credentials", x.end(), o.warn("No authenthication info");
            return;
          }
          const T = v.headers.authorization.split(" ")[1], D = Buffer.from(T, "base64").toString("ascii"), [U, k] = D.split(":");
          if (U !== "autoupdater" || k !== u) {
            x.statusCode = 401, x.statusMessage = "Invalid Authentication Credentials", x.end(), o.warn("Invalid authenthication credentials");
            return;
          }
          const $ = Buffer.from(`{ "url": "${c(this.server)}${h}" }`);
          x.writeHead(200, { "Content-Type": "application/json", "Content-Length": $.length }), x.end($);
          return;
        }
        if (!g.startsWith(h)) {
          o.warn(`${g} requested, but not supported`), x.writeHead(404), x.end();
          return;
        }
        o.info(`${h} requested by Squirrel.Mac, pipe ${i}`);
        let y = !1;
        x.on("finish", () => {
          y || (this.nativeUpdater.removeListener("error", l), f([]));
        });
        const b = (0, a4.createReadStream)(i);
        b.on("error", (T) => {
          try {
            x.end();
          } catch (D) {
            o.warn(`cannot end response: ${D}`);
          }
          y = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${T}`));
        }), x.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": a
        }), b.pipe(x);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
          url: c(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${d.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : f([]);
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
wi.MacUpdater = l4;
var Ei = {}, Ou = {};
Object.defineProperty(Ou, "__esModule", { value: !0 });
Ou.verifySignature = p4;
const gm = Re, Tv = fo, u4 = po, ym = ce;
function Rv(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function p4(e, t, n) {
  return new Promise((r, i) => {
    const a = t.replace(/'/g, "''");
    n.info(`Verifying signature ${a}`), (0, Tv.execFile)(...Rv(`"Get-AuthenticodeSignature -LiteralPath '${a}' | ConvertTo-Json -Compress"`, 20 * 1e3), (o, s, c) => {
      var f;
      try {
        if (o != null || c) {
          Fc(n, o, c, i), r(null);
          return;
        }
        const l = f4(s);
        if (l.Status === 0) {
          try {
            const v = ym.normalize(l.Path), x = ym.normalize(t);
            if (n.info(`LiteralPath: ${v}. Update Path: ${x}`), v !== x) {
              Fc(n, new Error(`LiteralPath of ${v} is different than ${x}`), c, i), r(null);
              return;
            }
          } catch (v) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = v.message) !== null && f !== void 0 ? f : v.stack}`);
          }
          const d = (0, gm.parseDn)(l.SignerCertificate.Subject);
          let h = !1;
          for (const v of e) {
            const x = (0, gm.parseDn)(v);
            if (x.size ? h = Array.from(x.keys()).every((y) => x.get(y) === d.get(y)) : v === d.get("CN") && (n.warn(`Signature validated using only CN ${v}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (d, h) => d === "RawData" ? void 0 : h, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (l) {
        Fc(n, l, null, i), r(null);
        return;
      }
    });
  });
}
function f4(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function Fc(e, t, n, r) {
  if (d4()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Tv.execFileSync)(...Rv("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function d4() {
  const e = u4.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Ei, "__esModule", { value: !0 });
Ei.NsisUpdater = void 0;
const Da = Re, bm = ce, m4 = Gn, h4 = ea, wm = dn, x4 = Te, v4 = fn, g4 = Ou, Em = ut;
class y4 extends m4.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, g4.verifySignature)(r, i, this._logger);
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
    const n = t.updateInfoAndProvider.provider, r = (0, x4.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, a, o, s) => {
        const c = r.packageInfo, f = c != null && o != null;
        if (f && t.disableWebInstaller)
          throw (0, Da.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, Da.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, a);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await s(), (0, Da.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(t, c, o, n))
          try {
            await this.httpExecutor.download(new Em.URL(c.path), o, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (u) {
            try {
              await (0, v4.unlink)(o);
            } catch {
            }
            throw u;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let n;
    try {
      if (n = (await this.configOnDisk.value).publisherName, n == null)
        return null;
    } catch (r) {
      if (r.code === "ENOENT")
        return null;
      throw r;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(n) ? n : [n], t);
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["--updated"];
    t.isSilent && r.push("/S"), t.isForceRunAfter && r.push("--force-run"), this.installDirectory && r.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && r.push(`--package-file=${i}`);
    const a = () => {
      this.spawnLog(bm.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((o) => this.dispatchError(o));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), a(), !0) : (this.spawnLog(n, r).catch((o) => {
      const s = o.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${o.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? a() : s === "ENOENT" ? Nn.shell.openPath(n).catch((c) => this.dispatchError(c)) : this.dispatchError(o);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const a = {
        newUrl: new Em.URL(n.path),
        oldFile: bm.join(this.downloadedUpdateHelper.cacheDir, Da.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(wm.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(wm.DOWNLOAD_PROGRESS, o)), await new h4.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, a).download();
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "win32";
    }
    return !1;
  }
}
Ei.NsisUpdater = y4;
(function(e) {
  var t = ue && ue.__createBinding || (Object.create ? function(g, y, b, T) {
    T === void 0 && (T = b);
    var D = Object.getOwnPropertyDescriptor(y, b);
    (!D || ("get" in D ? !y.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
      return y[b];
    } }), Object.defineProperty(g, T, D);
  } : function(g, y, b, T) {
    T === void 0 && (T = b), g[T] = y[b];
  }), n = ue && ue.__exportStar || function(g, y) {
    for (var b in g) b !== "default" && !Object.prototype.hasOwnProperty.call(y, b) && t(y, g, b);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = fn, i = ce;
  var a = Gn;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return a.BaseUpdater;
  } });
  var o = an;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return o.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return o.NoOpLogger;
  } });
  var s = Te;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
  } });
  var c = vi;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var f = gi;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return f.DebUpdater;
  } });
  var l = yi;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var u = bi;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var d = wi;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return d.MacUpdater;
  } });
  var h = Ei;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return h.NsisUpdater;
  } }), n(dn, e);
  let v;
  function x() {
    if (process.platform === "win32")
      v = new Ei.NsisUpdater();
    else if (process.platform === "darwin")
      v = new wi.MacUpdater();
    else {
      v = new vi.AppImageUpdater();
      try {
        const g = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(g))
          return v;
        switch ((0, r.readFileSync)(g).toString().trim()) {
          case "deb":
            v = new gi.DebUpdater();
            break;
          case "rpm":
            v = new bi.RpmUpdater();
            break;
          case "pacman":
            v = new yi.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (g) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", g.message);
      }
    }
    return v;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => v || x()
  });
})(_r);
const b4 = [
  {
    id: "1.21.11",
    type: "release"
  },
  {
    id: "Fabric 1.21.11",
    type: "modified"
  },
  {
    id: "1.21.10",
    type: "release"
  },
  {
    id: "Fabric 1.21.10",
    type: "modified"
  },
  {
    id: "1.21.9",
    type: "release"
  },
  {
    id: "Forge 1.21.9",
    type: "modified"
  },
  {
    id: "Fabric 1.21.9",
    type: "modified"
  },
  {
    id: "1.21.8",
    type: "release"
  },
  {
    id: "Fabric 1.21.8",
    type: "modified"
  },
  {
    id: "Forge 1.21.8",
    type: "modified"
  },
  {
    id: "1.21.7",
    type: "release"
  },
  {
    id: "Fabric 1.21.7",
    type: "modified"
  },
  {
    id: "Forge 1.21.7",
    type: "modified"
  },
  {
    id: "1.21.6",
    type: "release"
  },
  {
    id: "Fabric 1.21.6",
    type: "modified"
  },
  {
    id: "Forge 1.21.6",
    type: "modified"
  },
  {
    id: "1.21.5",
    type: "release"
  },
  {
    id: "Fabric 1.21.5",
    type: "modified"
  },
  {
    id: "Forge 1.21.5",
    type: "modified"
  },
  {
    id: "1.21.4",
    type: "release"
  },
  {
    id: "Fabric 1.21.4",
    type: "modified"
  },
  {
    id: "Forge 1.21.4",
    type: "modified"
  },
  {
    id: "1.21.3",
    type: "release"
  },
  {
    id: "Fabric 1.21.3",
    type: "modified"
  },
  {
    id: "Forge 1.21.3",
    type: "modified"
  },
  {
    id: "1.21.2",
    type: "release"
  },
  {
    id: "Fabric 1.21.2",
    type: "modified"
  },
  {
    id: "Forge 1.21.2",
    type: "modified"
  },
  {
    id: "1.21.1",
    type: "release"
  },
  {
    id: "Fabric 1.21.1",
    type: "modified"
  },
  {
    id: "Forge 1.21.1",
    type: "modified"
  },
  {
    id: "1.21",
    type: "release"
  },
  {
    id: "Fabric 1.21",
    type: "modified"
  },
  {
    id: "Forge 1.21",
    type: "modified"
  },
  {
    id: "1.20.6",
    type: "release"
  },
  {
    id: "Fabric 1.20.6",
    type: "modified"
  },
  {
    id: "Forge 1.20.6",
    type: "modified"
  },
  {
    id: "1.20.5",
    type: "release"
  },
  {
    id: "Fabric 1.20.5",
    type: "modified"
  },
  {
    id: "1.20.4",
    type: "release"
  },
  {
    id: "Fabric 1.20.4",
    type: "modified"
  },
  {
    id: "Forge 1.20.4",
    type: "modified"
  },
  {
    id: "1.20.3",
    type: "release"
  },
  {
    id: "Fabric 1.20.3",
    type: "modified"
  },
  {
    id: "Forge 1.20.3",
    type: "modified"
  },
  {
    id: "1.20.2",
    type: "release"
  },
  {
    id: "Fabric 1.20.2",
    type: "modified"
  },
  {
    id: "Forge 1.20.2",
    type: "modified"
  },
  {
    id: "1.20.1",
    type: "release"
  },
  {
    id: "Fabric 1.20.1",
    type: "modified"
  },
  {
    id: "Forge 1.20.1",
    type: "modified"
  },
  {
    id: "1.20",
    type: "release"
  },
  {
    id: "Fabric 1.20",
    type: "modified"
  },
  {
    id: "Forge 1.20",
    type: "modified"
  },
  {
    id: "1.19.4",
    type: "release"
  },
  {
    id: "Fabric 1.19.4",
    type: "modified"
  },
  {
    id: "Forge 1.19.4",
    type: "modified"
  },
  {
    id: "1.19.3",
    type: "release"
  },
  {
    id: "Fabric 1.19.3",
    type: "modified"
  },
  {
    id: "Forge 1.19.3",
    type: "modified"
  },
  {
    id: "1.19.2",
    type: "release"
  },
  {
    id: "Fabric 1.19.2",
    type: "modified"
  },
  {
    id: "Forge 1.19.2",
    type: "modified"
  },
  {
    id: "1.19.1",
    type: "release"
  },
  {
    id: "Fabric 1.19.1",
    type: "modified"
  },
  {
    id: "Forge 1.19.1",
    type: "modified"
  },
  {
    id: "1.19",
    type: "release"
  },
  {
    id: "Fabric 1.19",
    type: "modified"
  },
  {
    id: "Forge 1.19",
    type: "modified"
  },
  {
    id: "1.18.2",
    type: "release"
  },
  {
    id: "Fabric 1.18.2",
    type: "modified"
  },
  {
    id: "Forge 1.18.2",
    type: "modified"
  },
  {
    id: "1.18.1",
    type: "release"
  },
  {
    id: "Fabric 1.18.1",
    type: "modified"
  },
  {
    id: "Forge 1.18.1",
    type: "modified"
  },
  {
    id: "1.18",
    type: "release"
  },
  {
    id: "Fabric 1.18",
    type: "modified"
  },
  {
    id: "Forge 1.18",
    type: "modified"
  },
  {
    id: "1.17.1",
    type: "release"
  },
  {
    id: "Fabric 1.17.1",
    type: "modified"
  },
  {
    id: "Forge 1.17.1",
    type: "modified"
  },
  {
    id: "1.17",
    type: "release"
  },
  {
    id: "Fabric 1.17",
    type: "modified"
  },
  {
    id: "1.16.5",
    type: "release"
  },
  {
    id: "Fabric 1.16.5",
    type: "modified"
  },
  {
    id: "Forge 1.16.5",
    type: "modified"
  },
  {
    id: "1.16.4",
    type: "release"
  },
  {
    id: "Fabric 1.16.4",
    type: "modified"
  },
  {
    id: "Forge 1.16.4",
    type: "modified"
  },
  {
    id: "1.16.3",
    type: "release"
  },
  {
    id: "Fabric 1.16.3",
    type: "modified"
  },
  {
    id: "Forge 1.16.3",
    type: "modified"
  },
  {
    id: "1.16.2",
    type: "release"
  },
  {
    id: "Fabric 1.16.2",
    type: "modified"
  },
  {
    id: "Forge 1.16.2",
    type: "modified"
  },
  {
    id: "1.16.1",
    type: "release"
  },
  {
    id: "Fabric 1.16.1",
    type: "modified"
  },
  {
    id: "Forge 1.16.1",
    type: "modified"
  },
  {
    id: "1.16",
    type: "release"
  },
  {
    id: "Fabric 1.16",
    type: "modified"
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
    id: "Fabric 1.13.2",
    type: "modified"
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
    id: "Forge 1.7.10",
    type: "modified"
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
    id: "Forge 1.7.2",
    type: "modified"
  },
  {
    id: "1.6.4",
    type: "release"
  },
  {
    id: "Forge 1.6.4",
    type: "modified"
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
    id: "Forge 1.5.2",
    type: "modified"
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
    id: "Forge 1.2.5",
    type: "modified"
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
], w4 = {
  versions: b4
}, E4 = Ng(Ig), Pu = Cg(import.meta.url), Cv = xe.dirname(Og(import.meta.url)), _4 = Pu("minecraft-launcher-core"), S4 = _4.Client, $e = xe.join(_i.getPath("appData"), ".hard-monitoring"), _m = {
  // --- СОВРЕМЕННЫЕ ВЕРСИИ (Java 17/21) ---
  "1.21.4": "54.0.1",
  "1.21.3": "53.0.1",
  "1.21.1": "52.0.0",
  "1.21": "51.0.8",
  "1.20.6": "50.1.0",
  "1.20.4": "49.0.31",
  "1.20.2": "48.1.0",
  "1.20.1": "47.3.0",
  "1.19.4": "45.3.0",
  "1.19.3": "44.1.0",
  "1.19.2": "43.4.0",
  "1.19.1": "42.0.1",
  "1.19": "41.1.0",
  "1.18.2": "40.2.21",
  "1.18.1": "39.1.2",
  "1.17.1": "37.1.1",
  // --- КЛАССИЧЕСКИЕ ВЕРСИИ (Java 8/16) ---
  "1.16.5": "36.2.39",
  "1.16.4": "35.1.37",
  "1.16.3": "34.1.42",
  "1.16.1": "32.0.108",
  "1.15.2": "31.2.57",
  "1.14.4": "28.2.26",
  "1.13.2": "25.0.223",
  // --- СТАРЫЕ ВЕРСИИ (Другой формат ссылок) ---
  "1.12.2": "14.23.5.2860",
  "1.12.1": "14.22.1.2478",
  "1.12": "14.21.1.2387",
  "1.11.2": "13.20.1.2386",
  "1.10.2": "12.18.3.2511",
  "1.9.4": "12.17.0.1976",
  "1.8.9": "11.15.1.2318",
  "1.7.10": "10.13.4.1614"
};
function A4(e) {
  const n = Pu("crypto").createHash("md5").update(e).digest("hex"), r = [
    n.substring(0, 8),
    n.substring(8, 12),
    n.substring(12, 16),
    n.substring(16, 20),
    n.substring(20, 32)
  ].join("-");
  return {
    access_token: "null",
    // Для оффлайн режима можно любое значение
    client_token: r,
    uuid: r,
    name: e,
    user_properties: "{}"
  };
}
function Fu(e, t, n) {
  return new Promise((r, i) => {
    const a = ne.createWriteStream(t);
    Pg.get(e, {
      headers: { "User-Agent": "Mozilla/5.0" }
    }, (s) => {
      if ([301, 302, 307, 308].includes(s.statusCode || 0))
        return a.close(), Fu(s.headers.location, t, n).then(r).catch(i);
      if (s.statusCode !== 200)
        return a.close(), i(new Error(`Server responded with ${s.statusCode}`));
      const c = parseInt(s.headers["content-length"] || "0", 10);
      let f = 0;
      s.on("data", (l) => {
        if (f += l.length, c > 0) {
          const u = Math.round(f / c * 100);
          n.send("download-progress", {
            percent: u,
            current: (f / (1024 * 1024)).toFixed(1),
            total: (c / (1024 * 1024)).toFixed(1)
          });
        }
      }), s.pipe(a), a.on("finish", () => {
        a.close(() => {
          ne.statSync(t).size === 0 ? i(new Error("Downloaded file is empty")) : r();
        });
      });
    }).on("error", (s) => {
      a.close(), ne.existsSync(t) && ne.unlinkSync(t), i(s);
    });
  });
}
async function T4(e, t) {
  const n = xe.join($e, "runtime", `java-${e}`), r = process.platform === "win32" ? "java.exe" : "java", i = (c) => {
    if (!ne.existsSync(c)) return null;
    const f = (u, d = []) => (ne.readdirSync(u).forEach((v) => {
      const x = xe.join(u, v);
      ne.statSync(x).isDirectory() ? f(x, d) : d.push(x);
    }), d);
    return f(c).find((u) => u.toLowerCase().endsWith(xe.join("bin", r).toLowerCase())) || null;
  };
  let a = i(n);
  if (a) return a;
  let o = "";
  e === "21" ? o = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.zip" : e === "17" ? o = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jdk_x64_windows_hotspot_17.0.10_7.zip" : o = "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u402-b06/OpenJDK8U-jdk_x64_windows_hotspot_8u402b06.zip";
  const s = xe.join($e, `temp_java_${e}.zip`);
  ne.existsSync($e) || ne.mkdirSync($e, { recursive: !0 }), t.send("launch-status", `Downloading Java ${e}...`), await Fu(o, s, t), t.send("launch-status", "Extracting Java..."), ne.existsSync(n) && ne.rmSync(n, { recursive: !0, force: !0 }), ne.mkdirSync(n, { recursive: !0 });
  try {
    await E4(`tar -xf "${s}" -C "${n}"`);
  } catch {
    await aE(s, n);
  }
  return ne.existsSync(s) && ne.unlinkSync(s), i(n) || "";
}
process.env.APP_ROOT = xe.join(Cv, "..");
const Sm = process.env.VITE_DEV_SERVER_URL, R4 = xe.join(process.env.APP_ROOT, "dist");
let ni;
function C4() {
  ni = new Am({
    width: 1e3,
    height: 650,
    frame: !1,
    transparent: !0,
    webPreferences: {
      preload: xe.join(Cv, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), Sm ? ni.loadURL(Sm) : ni.loadFile(xe.join(R4, "index.html"));
}
Cr.on("window-control", (e, t) => {
  const n = Am.getFocusedWindow();
  t === "minimize" && (n == null || n.minimize()), t === "close" && _i.quit();
});
Cr.on("launch-game", async (e, { version: t, nickname: n }) => {
  var a, o, s;
  const r = e.sender, i = new S4();
  r.send("download-progress", { percent: 0, current: "0", total: "0", isChecking: !0 }), r.send("launch-status", "Preparing launch...");
  try {
    ne.existsSync($e) || ne.mkdirSync($e, { recursive: !0 });
    const c = t.match(/(\d+\.\d+)/), f = c ? c[0] : "1.21";
    let l = "8";
    const u = parseFloat(f);
    u >= 1.21 ? l = "21" : u >= 1.17 ? l = "17" : l = "8", console.log(`[DEBUG] Game: ${f}, Java: ${l}`);
    const d = await T4(l, r);
    let h = t;
    const v = t.toLowerCase().includes("fabric"), x = t.toLowerCase().includes("forge");
    if (v) {
      const y = ((a = t.match(/(\d+\.\d+\.?\d*)/)) == null ? void 0 : a[0]) || "1.21.1";
      r.send("launch-status", `Setting up Fabric for ${y}...`), h = await vA.setup(y, "0.16.10", $e, r);
    }
    if (x) {
      const y = ((o = t.match(/(\d+\.\d+\.?\d*)/)) == null ? void 0 : o[0]) || "1.21.1";
      let b = _m[y];
      if (!b) {
        const U = y.split(".").slice(0, 2).join(".");
        b = _m[U] || "52.0.0";
      }
      const T = `${y}-forge-${b}`, D = xe.join($e, "versions", t);
      if (console.log(`[DEBUG] Target: ${y}, Forge: ${b}`), !ne.existsSync(D) || ne.readdirSync(D).length === 0) {
        r.send("launch-status", `Installing Forge ${b}...`);
        const U = `https://maven.minecraftforge.net/net/minecraftforge/forge/${y}-${b}/forge-${y}-${b}-installer.jar`;
        console.log(`[DEBUG] Trying to download: ${U}`);
        const k = xe.join($e, "forge-installer.jar");
        try {
          await Fu(U, k, r);
          const { spawn: $ } = Pu("node:child_process"), G = $(d, [
            "-Djava.net.preferIPv4Stack=true",
            // Помогает при загрузке библиотек
            "-jar",
            k,
            "--installClient",
            $e
          ], { cwd: $e });
          await new Promise((M, H) => {
            G.stdout.on("data", (z) => console.log(`[Forge] ${z}`)), G.stderr.on("data", (z) => console.error(`[Forge Error] ${z}`)), G.on("close", (z) => z === 0 ? M(!0) : H(new Error(`Exit code ${z}`)));
          });
          const S = xe.join($e, "versions", T);
          if (ne.existsSync(S)) {
            ne.existsSync(D) && ne.rmSync(D, { recursive: !0, force: !0 }), ne.renameSync(S, D);
            const M = xe.join(D, `${T}.json`), H = xe.join(D, `${t}.json`);
            if (ne.existsSync(M)) {
              let z = JSON.parse(ne.readFileSync(M, "utf-8"));
              z.id = t, ne.writeFileSync(H, JSON.stringify(z)), ne.unlinkSync(M);
            }
          }
        } catch ($) {
          throw ne.existsSync(k) && ne.unlinkSync(k), new Error(`Forge fail: ${$.message}`);
        } finally {
          ne.existsSync(k) && ne.unlinkSync(k);
        }
      }
      h = t;
    }
    i.on("progress", (y) => {
      r.send("download-progress", {
        percent: y.percentage || 0,
        current: (y.task / 1024 / 1024).toFixed(1),
        total: (y.total / 1024 / 1024).toFixed(1),
        isChecking: !1
      });
    }), i.on("data", (y) => {
      (y.includes("Setting user:") || y.includes("Sound engine started")) && (r.send("version-downloaded", t), r.send("download-progress", null), r.send("launch-status", "Game Running")), console.log(`[GAME] ${y}`);
    });
    const g = {
      authorization: A4(n),
      root: $e,
      javaPath: d,
      version: {
        // Здесь мы используем launchVersion вместо исходного version
        number: v || x ? ((s = h.match(/(\d+\.\d+\.?\d*)/)) == null ? void 0 : s[0]) || "1.21.1" : h,
        custom: v || x ? h : void 0,
        type: "release"
      },
      customArgs: ["-Dforge.earlydisplay=false"],
      overrides: {
        versionType: "release",
        gameDirectory: xe.join($e, "instances", h)
        // И здесь тоже
      },
      memory: { max: "4G", min: "1G" }
    };
    i.launch(g), i.launch(g);
  } catch (c) {
    console.error("Launch Error:", c), r.send("launch-error", c.message);
  }
});
Cr.on("open-game-folder", () => {
  const e = xe.join(_i.getPath("appData"), ".hard-monitoring");
  ne.existsSync(e) || ne.mkdirSync(e, { recursive: !0 }), Tm.openPath(e);
});
Cr.handle("get-versions", async () => {
  try {
    const { versions: e } = w4, t = xe.join($e, "versions");
    return e.map((n) => {
      const r = xe.join(t, n.id);
      let i = !1;
      return ne.existsSync(r) && (i = ne.readdirSync(r).length > 0), {
        ...n,
        isDownloaded: i
      };
    });
  } catch (e) {
    return console.error("Error processing versions data:", e), [];
  }
});
Cr.handle("reset-version", async (e, t) => {
  try {
    const n = xe.join($e, "versions", t);
    ne.existsSync(n) && ne.rmSync(n, { recursive: !0, force: !0 });
    const r = xe.join($e, "forge-installer.jar");
    return ne.existsSync(r) && ne.unlinkSync(r), { success: !0 };
  } catch (n) {
    return console.error("Reset error:", n), { success: !1, error: n.message };
  }
});
Cr.on("open-external-link", (e, t) => {
  t && t.startsWith("http") && Tm.openExternal(t);
});
_i.on("ready", () => {
  _r.autoUpdater.checkForUpdatesAndNotify();
});
_r.autoUpdater.on("update-available", () => {
  ni && ni.webContents.send("update_available");
});
_r.autoUpdater.on("update-downloaded", () => {
  _r.autoUpdater.quitAndInstall();
});
_r.autoUpdater.on("error", (e) => {
  console.error("Ошибка авто-обновления:", e);
});
_i.whenReady().then(C4);
export {
  R4 as RENDERER_DIST,
  Sm as VITE_DEV_SERVER_URL
};
