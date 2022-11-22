class O {
  constructor(t, e) {
    this.vao = null, this.indexBuffer = null, this.attributes = {}, this.vertCount = 0, this.gl = t, this.program = e, this.vao = this.gl.createVertexArray();
  }
  setAttribute(t, e, s, i) {
    let r = this.attributes[t];
    return r || (r = {
      buffer: e,
      location: null,
      size: s,
      count: i
    }, this.attributes[t] = r), this.updateAttributes(), this;
  }
  removeAttribute(t) {
    return delete this.attributes[t], this;
  }
  updateAttributes(t) {
    if (!this.vao)
      return;
    this.vertCount = 0;
    const e = Object.keys(this.attributes);
    this.gl.bindVertexArray(this.vao);
    for (let s = 0; s < e.length; s++) {
      const i = e[s], r = this.attributes[i];
      (r.location === null || t) && (r.location = this.gl.getAttribLocation(this.program, i), r.location > -1 && (this.gl.bindBuffer(this.gl.ARRAY_BUFFER, r.buffer.buffer), this.gl.enableVertexAttribArray(r.location), this.gl.vertexAttribPointer(r.location, r.size, this.gl.FLOAT, !1, 0, 0))), this.vertCount = Math.max(this.vertCount, r.count);
    }
    this.gl.bindVertexArray(null);
  }
  setIndex(t) {
    this.indexBuffer = t, this.vao && (this.gl.bindVertexArray(this.vao), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer ? this.indexBuffer.buffer : null), this.gl.bindVertexArray(null));
  }
  getVAO() {
    return this.vao;
  }
}
class F {
  constructor(t) {
    this.gl = t, this.program = this.gl.createProgram(), this.vao = /* @__PURE__ */ new Map(), this.uniforms = /* @__PURE__ */ new Map();
  }
  setShader(t, e) {
    if (this.program === null) {
      console.warn("program is null.");
      return;
    }
    const s = this.createShader(t, this.gl.VERTEX_SHADER), i = this.createShader(e, this.gl.FRAGMENT_SHADER);
    if (!(!s || !i))
      return this.gl.attachShader(this.program, s), this.gl.attachShader(this.program, i), this.gl.linkProgram(this.program), this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS) || console.warn("program link error."), this;
  }
  createShader(t, e) {
    const s = this.gl.createShader(e);
    return s ? (this.gl.shaderSource(s, t), this.gl.compileShader(s), this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS) ? s : (console.error(this.gl.getShaderInfoLog(s)), null)) : null;
  }
  setUniform(t, e, s) {
    const i = this.uniforms.get(t);
    if (i)
      if (i.type = e, i.value = s, i.cache) {
        for (let r = 0; r < s.length; r++)
          if (i.cache[r] !== s[r]) {
            i.needsUpdate = !0;
            break;
          }
      } else
        i.needsUpdate = !0;
    else
      this.uniforms.set(t, {
        value: s,
        type: e,
        location: null,
        needsUpdate: !0
      }), this.updateUniformLocations();
  }
  updateUniformLocations(t) {
    !this.program || this.uniforms.forEach((e, s) => {
      (e.location === null || t) && (e.location = this.gl.getUniformLocation(this.program, s));
    });
  }
  uploadUniforms() {
    this.uniforms.forEach((t) => {
      t.needsUpdate && (/Matrix[2|3|4]fv/.test(t.type) ? this.gl["uniform" + t.type](t.location, !1, t.value) : /[1|2|3|4][f|i]$/.test(t.type) ? this.gl["uniform" + t.type](t.location, ...t.value) : this.gl["uniform" + t.type](t.location, t.value), t.cache = t.value.concat(), t.needsUpdate = !1);
    });
  }
  getVAO(t = "_") {
    if (!this.program)
      return null;
    let e = this.vao.get(t);
    return e || (e = new O(this.gl, this.program), this.vao.set(t, e), e);
  }
  use() {
    !this.program || this.gl.useProgram(this.program);
  }
  clean() {
    this.gl.useProgram(null);
  }
  getProgram() {
    return this.program;
  }
}
class L {
  constructor(t) {
    this.gl = t, this.buffer = this.gl.createBuffer();
  }
  setData(t, e = "vbo", s) {
    const i = e == "vbo" ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER;
    return this.gl.bindBuffer(i, this.buffer), this.gl.bufferData(i, t, s || this.gl.STATIC_DRAW), this.gl.bindBuffer(i, null), this;
  }
}
class w {
  constructor(t) {
    this.gl = t, this.image = null, this.texture = this.gl.createTexture();
  }
  load(t) {
    const e = new Image();
    e.onload = () => {
      this.image = e, this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image), this.gl.generateMipmap(this.gl.TEXTURE_2D);
    }, e.src = t;
  }
  active(t) {
    this.gl.activeTexture(this.gl["TEXTURE" + t]), this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }
  getTexture() {
    return this.texture;
  }
}
class D {
  constructor(t) {
    this.gl = t, this.gl.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0);
  }
  createProgram() {
    return new F(this.gl);
  }
  createBuffer() {
    return new L(this.gl);
  }
  createTexture() {
    return new w(this.gl);
  }
}
class V {
  constructor(t, e) {
    this.x = t || 0, this.y = e || 0;
  }
  get isVector2() {
    return !0;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  add(t) {
    return t.isVector2 ? (this.x += t.x, this.y += t.y) : typeof t == "number" && (this.x += t, this.y += t), this;
  }
  sub(t) {
    return t.isVector2 ? (this.x -= t.x, this.y -= t.y) : typeof t == "number" && (this.x -= t, this.y -= t), this;
  }
  multiply(t) {
    return this.x *= t.x | t, this.y *= t.y | t, this;
  }
  divide(t) {
    return this.x /= t.x | t, this.y /= t.y | t, this;
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  clone() {
    return new V(this.x, this.y);
  }
  get elm() {
    return [this.x, this.y];
  }
}
class I {
  constructor(t, e, s) {
    this.x = t || 0, this.y = e || 0, this.z = s || 0;
  }
  get isVector3() {
    return !0;
  }
  set(t, e, s) {
    return this.x = t, this.y = e, this.z = s, this;
  }
  add(t) {
    return t.isVector3 ? (this.x += t.x, this.y += t.y, this.z += t.z) : typeof t == "number" && (this.x += t, this.y += t, this.z += t), this;
  }
  sub(t) {
    return t.isVector3 ? (this.x -= t.x, this.y -= t.y, this.z -= t.z) : typeof t == "number" && (this.x -= t, this.y -= t, this.z -= t), this;
  }
  multiply(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  divide(t) {
    return this.x /= t, this.y /= t, this.z /= t, this;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  normalize() {
    return this.divide(this.length() || 1);
  }
  cross(t) {
    const e = this.x, s = this.y, i = this.z, r = t.x, n = t.y, c = t.z;
    return this.x = s * c - i * n, this.y = i * r - e * c, this.z = e * n - s * r, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z || 0, this;
  }
  clone() {
    return new I(this.x, this.y, this.z);
  }
  get elm() {
    return [this.x, this.y, this.z];
  }
}
class _ {
  constructor(t) {
    this.elm = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t && this.set(t);
  }
  get isMat4() {
    return !0;
  }
  identity() {
    return this.elm = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], this;
  }
  clone() {
    return new _().copy(this);
  }
  copy(t) {
    return this.set(t.elm), this;
  }
  perspective(t, e, s, i) {
    var r = 1 / Math.tan(t * Math.PI / 360), n = i - s;
    return this.elm = [
      r / e,
      0,
      0,
      0,
      0,
      r,
      0,
      0,
      0,
      0,
      -(i + s) / n,
      -1,
      0,
      0,
      -(i * s * 2) / n,
      0
    ], this;
  }
  lookAt(t, e, s) {
    const i = t.clone().sub(e).normalize(), r = s.clone().cross(i).normalize(), n = i.clone().cross(r).normalize();
    return this.elm = [
      r.x,
      n.x,
      i.x,
      0,
      r.y,
      n.y,
      i.y,
      0,
      r.z,
      n.z,
      i.z,
      0,
      -t.dot(r),
      -t.dot(n),
      -t.dot(i),
      1
    ], this;
  }
  inverse() {
    const t = this.elm[0], e = this.elm[1], s = this.elm[2], i = this.elm[3], r = this.elm[4], n = this.elm[5], c = this.elm[6], u = this.elm[7], p = this.elm[8], l = this.elm[9], o = this.elm[10], h = this.elm[11], m = this.elm[12], a = this.elm[13], f = this.elm[14], d = this.elm[15], y = t * n - e * r, g = t * c - s * r, b = t * u - i * r, v = e * c - s * n, z = e * u - i * n, T = s * u - i * c, E = p * a - l * m, U = p * f - o * m, M = p * d - h * m, R = l * f - o * a, B = l * d - h * a, C = o * d - h * f, P = y * C - g * B + b * R + v * M - z * U + T * E, x = 1 / P;
    return P == 0 ? this.identity() : (this.elm[0] = (n * C - c * B + u * R) * x, this.elm[1] = (-e * C + s * B - i * R) * x, this.elm[2] = (a * T - f * z + d * v) * x, this.elm[3] = (-l * T + o * z - h * v) * x, this.elm[4] = (-r * C + c * M - u * U) * x, this.elm[5] = (t * C - s * M + i * U) * x, this.elm[6] = (-m * T + f * b - d * g) * x, this.elm[7] = (p * T - o * b + h * g) * x, this.elm[8] = (r * B - n * M + u * E) * x, this.elm[9] = (-t * B + e * M - i * E) * x, this.elm[10] = (m * z - a * b + d * y) * x, this.elm[11] = (-p * z + l * b - h * y) * x, this.elm[12] = (-r * R + n * U - c * E) * x, this.elm[13] = (t * R - e * U + s * E) * x, this.elm[14] = (-m * v + a * g - f * y) * x, this.elm[15] = (p * v - l * g + o * y) * x, this);
  }
  set(t) {
    var e;
    for (let s = 0; s < this.elm.length; s++)
      this.elm[s] = (e = t[s]) != null ? e : 0;
    return this;
  }
  setFromTransform(t, e, s) {
    return this.identity(), this.applyPosition(t), this.applyRot(e), this.applyScale(s), this;
  }
  decompose(t, e, s) {
    t && (t.x = this.elm[12], t.y = this.elm[13], t.z = this.elm[14]);
  }
  applyPosition(t) {
    return this.matmul([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      t.x,
      t.y,
      t.z,
      1
    ]), this;
  }
  applyRot(t) {
    let e = Math.cos(t.x), s = Math.sin(t.x);
    return this.matmul([
      1,
      0,
      0,
      0,
      0,
      e,
      s,
      0,
      0,
      -s,
      e,
      0,
      0,
      0,
      0,
      1
    ]), e = Math.cos(t.y), s = Math.sin(t.y), this.matmul([
      e,
      0,
      -s,
      0,
      0,
      1,
      0,
      0,
      s,
      0,
      e,
      0,
      0,
      0,
      0,
      1
    ]), e = Math.cos(t.z), s = Math.sin(t.z), this.matmul([
      e,
      s,
      0,
      0,
      -s,
      e,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ]), this;
  }
  applyScale(t) {
    return this.matmul([
      t.x,
      0,
      0,
      0,
      0,
      t.y,
      0,
      0,
      0,
      0,
      t.z,
      0,
      0,
      0,
      0,
      1
    ]), this;
  }
  matmul(t) {
    const e = new Array(16);
    for (let s = 0; s < 4; s++)
      for (let i = 0; i < 4; i++) {
        let r = 0;
        for (let n = 0; n < 4; n++)
          r += this.elm[n * 4 + i] * t[n + s * 4];
        e[i + s * 4] = r;
      }
    this.elm = e;
  }
  multiply(t) {
    return this.matmul(t.elm), this;
  }
  preMultiply(t) {
    const e = this.copyToArray([]);
    return this.set(t.elm), this.matmul(e), this;
  }
  copyToArray(t) {
    t.length = this.elm.length;
    for (let e = 0; e < this.elm.length; e++)
      t[e] = this.elm[e];
    return t;
  }
}
class N {
  constructor() {
    this.count = 0, this.attributes = {};
  }
  setAttribute(t, e, s) {
    this.attributes[t] = {
      array: e,
      size: s
    }, this.updateVertCount();
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  updateVertCount() {
    const t = Object.keys(this.attributes);
    this.count = t.length > 0 ? 1 / 0 : 0, t.forEach((e) => {
      const s = this.attributes[e];
      e != "index" && (this.count = Math.min(s.array.length / s.size, this.count));
    });
  }
  getAttributeBuffer(t, e, s, i = "vbo") {
    const r = this.getAttribute(e);
    return {
      buffer: t.createBuffer().setData(new s(r.array), i),
      size: r.size,
      count: r.array.length / r.size
    };
  }
  getComponent(t) {
    return {
      attributes: [
        { name: "position", ...this.getAttributeBuffer(t, "position", Float32Array) },
        { name: "uv", ...this.getAttributeBuffer(t, "uv", Float32Array) },
        { name: "normal", ...this.getAttributeBuffer(t, "normal", Float32Array) }
      ],
      index: this.getAttributeBuffer(t, "index", Uint16Array, "ibo")
    };
  }
}
class k extends N {
  constructor(t = 1, e = 1, s = 1) {
    super();
    const i = t / 2, r = e / 2, n = s / 2, c = [
      -i,
      r,
      n,
      i,
      r,
      n,
      -i,
      -r,
      n,
      i,
      -r,
      n,
      i,
      r,
      -n,
      -i,
      r,
      -n,
      i,
      -r,
      -n,
      -i,
      -r,
      -n,
      i,
      r,
      n,
      i,
      r,
      -n,
      i,
      -r,
      n,
      i,
      -r,
      -n,
      -i,
      r,
      -n,
      -i,
      r,
      n,
      -i,
      -r,
      -n,
      -i,
      -r,
      n,
      i,
      r,
      -n,
      i,
      r,
      n,
      -i,
      r,
      -n,
      -i,
      r,
      n,
      -i,
      -r,
      -n,
      -i,
      -r,
      n,
      i,
      -r,
      -n,
      i,
      -r,
      n
    ], u = [
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0,
      0,
      -1,
      0
    ], p = [], l = [];
    for (let o = 0; o < 6; o++) {
      p.push(
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0
      );
      const h = 4 * o;
      l.push(
        0 + h,
        2 + h,
        1 + h,
        1 + h,
        2 + h,
        3 + h
      );
    }
    this.setAttribute("position", c, 3), this.setAttribute("normal", u, 3), this.setAttribute("uv", p, 2), this.setAttribute("index", l, 1);
  }
}
class G extends N {
  constructor(t = 0.5, e = 0.5, s = 1, i = 10, r = 1) {
    super();
    const n = [], c = [], u = [], p = [];
    for (let l = 0; l <= r + 2; l++)
      for (let o = 0; o < i; o++) {
        const h = Math.PI * 2 / i * o;
        if (l <= r) {
          const m = l / r, a = (1 - m) * e + m * t, f = Math.cos(h) * a, d = -(s / 2) + s / r * l, y = Math.sin(h) * a;
          n.push(f, d, y), u.push(
            o / i,
            l / r
          );
          const g = new I(Math.cos(h), 0, Math.sin(h)).normalize();
          c.push(
            g.x,
            g.y,
            g.z
          ), l < r && p.push(
            l * i + o,
            (l + 1) * i + (o + 1) % i,
            l * i + (o + 1) % i,
            l * i + o,
            (l + 1) * i + o,
            (l + 1) * i + (o + 1) % i
          );
        } else {
          const m = l - r - 1, a = m ? t : e, f = Math.cos(h) * a, d = -(s / 2) + s * m, y = Math.sin(h) * a;
          n.push(f, d, y), u.push(
            (f + a) * 0.5 / a,
            (y + a) * 0.5 / a
          ), c.push(0, -1 + m * 2, 0);
          const g = i * (r + (m + 1));
          o <= i - 2 && (m == 0 ? p.push(
            g,
            g + o,
            g + o + 1
          ) : p.push(
            g,
            g + o + 1,
            g + o
          ));
        }
      }
    this.setAttribute("position", n, 3), this.setAttribute("normal", c, 3), this.setAttribute("uv", u, 2), this.setAttribute("index", p, 1);
  }
}
class j extends N {
  constructor(t = 1, e = 1, s = 1, i = 1) {
    super();
    const r = t / 2, n = e / 2, c = [], u = [], p = [], l = [];
    for (let o = 0; o <= i; o++)
      for (let h = 0; h <= s; h++) {
        const m = h / s, a = o / s;
        if (c.push(
          -r + t * m,
          -n + e * a,
          0
        ), p.push(m, a), u.push(0, 1, 0), o > 0 && h > 0) {
          const f = s + 1, d = f * o + h, y = f * (o - 1) + h - 1;
          l.push(
            d,
            f * o + h - 1,
            y,
            d,
            y,
            f * (o - 1) + h
          );
        }
      }
    this.setAttribute("position", c, 3), this.setAttribute("normal", u, 3), this.setAttribute("uv", p, 2), this.setAttribute("index", l, 1);
  }
}
class q extends N {
  constructor(t = 0.5, e = 20, s = 10) {
    super();
    const i = [], r = [], n = [], c = [];
    for (let u = 0; u <= s; u++) {
      const p = u / s * Math.PI, l = (u != 0 && u != s, e);
      for (let o = 0; o < l; o++) {
        const h = o / l * Math.PI * 2, m = Math.sin(p) * t, a = Math.cos(h) * m, f = -Math.cos(p) * t, d = Math.sin(h) * m;
        i.push(a, f, d), n.push(
          o / l,
          u / s
        );
        const y = new I(a, f, d).normalize();
        r.push(y.x, y.y, y.z), c.push(
          u * e + o,
          (u + 1) * e + (o + 1) % e,
          u * e + (o + 1) % e,
          u * e + o,
          (u + 1) * e + o,
          (u + 1) * e + (o + 1) % e
        );
      }
    }
    this.setAttribute("position", i, 3), this.setAttribute("normal", r, 3), this.setAttribute("uv", n, 2), this.setAttribute("index", c, 1);
  }
  setAttribute(t, e, s) {
    t == "index" && e.forEach((i, r) => {
      e[r] = i % this.count;
    }), super.setAttribute(t, e, s);
  }
}
class X {
  constructor() {
    this.time = 0, this.lastUpdateTime = new Date().getTime();
  }
  createWorld() {
    return {
      entitiesTotalCount: 0,
      entities: [],
      components: /* @__PURE__ */ new Map(),
      systems: /* @__PURE__ */ new Map()
    };
  }
  createEntity(t) {
    const e = t.entitiesTotalCount++;
    return t.entities.push(e), e;
  }
  removeEntity(t, e) {
    const s = t.entities.findIndex((i) => i == e);
    s > -1 && t.entities.slice(s, 1);
  }
  addComponent(t, e, s, i) {
    let r = t.components.get(s);
    r === void 0 && (r = [], t.components.set(s, r)), r.length < e + 1 && (r.length = e + 1), r[e] = i;
  }
  removeComponent(t, e, s) {
    const i = t.components.get(s);
    i && i.length > e && (i[e] = null);
  }
  getComponent(t, e, s) {
    const i = t.components.get(s);
    return i !== void 0 && i[e] || null;
  }
  addSystem(t, e, s) {
    t.systems.set(e, s);
  }
  removeSystem(t, e) {
    t.systems.delete(e);
  }
  update(t) {
    const e = new Date().getTime(), s = (e - this.lastUpdateTime) / 1e3;
    this.time += s, this.lastUpdateTime = e, t.systems.forEach((r) => {
      r.update({
        world: t,
        deltaTime: s,
        time: this.time,
        ecs: this
      });
    });
  }
  getEntities(t, e) {
    return t.entities.filter((i) => {
      for (let r = 0; r < e.length; r++) {
        const n = e[r], c = t.components.get(n);
        if (c === void 0 || c[i] === void 0)
          return !1;
      }
      return !0;
    });
  }
}
class Y {
  constructor(t) {
    this.queries = [];
    const e = Object.keys(t);
    for (let s = 0; s < e.length; s++) {
      const i = e[s];
      this.queries.push({ name: i, query: t[i] });
    }
  }
  update(t) {
    for (let e = 0; e < this.queries.length; e++) {
      const s = this.queries[e], i = t.ecs.getEntities(t.world, s.query);
      this.beforeUpdateImpl(s.name, t);
      for (let r = 0; r < i.length; r++)
        this.updateImpl(s.name, i[r], t);
      this.afterUpdateImpl(s.name, t);
    }
  }
  beforeUpdateImpl(t, e) {
  }
  updateImpl(t, e, s) {
  }
  afterUpdateImpl(t, e) {
  }
}
class W {
  constructor(t, e) {
    this.ecs = t, this.world = e, this.entities = [], this.cacheTransformUpdateOrder = null, this.cacheRenderOrder = null;
  }
  add(t, e) {
    const s = this.ecs.getComponent(this.world, t, "sceneNode");
    if (s === null) {
      console.log("parent not exists.");
      return;
    }
    const i = this.ecs.getComponent(this.world, e, "sceneNode");
    if (i === null) {
      console.log("children not exists.");
      return;
    }
    i.parent !== void 0 && this.remove(i.parent, e), s.children.push(e), i.parent = t, this.entities = Array.from(/* @__PURE__ */ new Set([t, e, ...this.entities])), this.cacheTransformUpdateOrder = null;
  }
  remove(t, e) {
    const s = this.ecs.getComponent(this.world, t, "sceneNode");
    if (s === null) {
      console.log("parent not exists.");
      return;
    }
    const i = this.ecs.getComponent(this.world, e, "sceneNode");
    if (i === null) {
      console.log("children not exists.");
      return;
    }
    let r = s.children.findIndex((n) => n == e);
    r > -1 && s.children.splice(r, 1), i.parent = void 0, r = this.entities.findIndex((n) => n === e), r > -1 && this.entities.splice(r, 1), this.cacheTransformUpdateOrder = null;
  }
  getTransformUpdateOrder() {
    if (this.cacheTransformUpdateOrder)
      return this.cacheTransformUpdateOrder;
    const t = [], e = (s) => {
      t.push(s);
      const i = this.ecs.getComponent(this.world, s, "sceneNode");
      if (i)
        for (let r = 0; r < i.children.length; r++)
          e(i.children[r]);
    };
    for (let s = 0; s < this.entities.length; s++) {
      const i = this.entities[s], r = this.ecs.getComponent(this.world, i, "sceneNode");
      r && r.parent === void 0 && e(i);
    }
    return this.cacheTransformUpdateOrder = t, t;
  }
}
export {
  L as Buffer,
  D as Core,
  k as CubeGeometry,
  G as CylinderGeometry,
  X as ECS,
  N as Geometry,
  _ as Matrix4,
  j as PlaneGeometry,
  F as Program,
  W as SceneGraph,
  q as SphereGeometry,
  Y as System,
  O as VAO,
  V as Vector2,
  I as Vector3
};
//# sourceMappingURL=glpower.js.map
