class P {
  constructor(t, e) {
    this.gl = t, this.program = e, this.vao = this.gl.createVertexArray(), this.attributes = {}, this.indexBuffer = null, this.vertCount = 0, this.indexCount = 0;
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
    this.indexBuffer = t, this.vao && (this.gl.bindVertexArray(this.vao), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer ? this.indexBuffer.buffer : null), this.gl.bindVertexArray(null), this.indexBuffer && this.indexBuffer.array && (this.indexCount = this.indexBuffer.array.length));
  }
  getVAO() {
    return this.vao;
  }
}
class G {
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
    return e || (e = new P(this.gl, this.program), this.vao.set(t, e), e);
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
class V {
  constructor(t) {
    this.gl = t, this.buffer = this.gl.createBuffer(), this.array = null;
  }
  setData(t, e = "vbo", s) {
    const i = e == "vbo" ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER;
    return this.gl.bindBuffer(i, this.buffer), this.gl.bufferData(i, t, s || this.gl.STATIC_DRAW), this.gl.bindBuffer(i, null), this.array = t, this;
  }
}
class w {
  constructor(t, e, s, i) {
    this.x = t || 0, this.y = e || 0, this.z = s || 0, this.w = i || 0;
  }
  get isVector() {
    return !0;
  }
  set(t, e, s, i) {
    return this.x = t, this.y = e != null ? e : this.y, this.z = s != null ? s : this.z, this.w = i != null ? i : this.w, this;
  }
  add(t) {
    var e, s, i, r;
    return typeof t == "number" ? (this.x += t, this.y += t, this.z += t, this.w += t) : (this.x += (e = t.x) != null ? e : 0, this.y += (s = t.y) != null ? s : 0, this.z += (i = t.z) != null ? i : 0, this.w += (r = t.w) != null ? r : 0), this;
  }
  sub(t) {
    var e, s, i, r;
    return typeof t == "number" ? (this.x -= t, this.y -= t, this.z -= t) : (this.x -= (e = t.x) != null ? e : 0, this.y -= (s = t.y) != null ? s : 0, this.z -= (i = t.z) != null ? i : 0, this.w -= (r = t.w) != null ? r : 0), this;
  }
  multiply(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  divide(t) {
    return this.x /= t, this.y /= t, this.z /= t, this.w /= t, this;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  normalize() {
    return this.divide(this.length() || 1);
  }
  cross(t) {
    const e = this.x, s = this.y, i = this.z, r = t.x, a = t.y, m = t.z;
    return this.x = s * m - i * a, this.y = i * r - e * m, this.z = e * a - s * r, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  copy(t) {
    var e, s, i, r;
    return this.x = (e = t.x) != null ? e : 0, this.y = (s = t.y) != null ? s : 0, this.z = (i = t.z) != null ? i : 0, this.w = (r = t.w) != null ? r : 0, this;
  }
  clone() {
    return new w(this.x, this.y, this.z, this.w);
  }
  getElm(t) {
    return t == "vec2" ? [this.x, this.y, this.z] : t == "vec3" ? [this.x, this.y, this.z] : [this.x, this.y, this.z, this.w];
  }
}
class k {
  constructor(t) {
    this.gl = t, this.image = null, this.unit = 0, this.size = new w(), this.texture = this.gl.createTexture(), this._setting = {
      type: this.gl.UNSIGNED_BYTE,
      internalFormat: this.gl.RGBA,
      format: this.gl.RGBA,
      magFilter: this.gl.NEAREST,
      minFilter: this.gl.NEAREST,
      generateMipmap: !1
    };
  }
  setting(t) {
    return this._setting = {
      ...this._setting,
      ...t
    }, this.attach(this.image), this;
  }
  attach(t) {
    return this.image = t, this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.image ? (this.size.set(this.image.width, this.image.height), this.image instanceof HTMLImageElement ? this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this._setting.format, this._setting.type, this.image) : this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.image.width, this.image.height, 0, this._setting.format, this._setting.type, null)) : (this.size.set(1, 1), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.size.x, this.size.y, 0, this._setting.format, this._setting.type, null)), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter), this._setting.generateMipmap && this.gl.generateMipmap(this.gl.TEXTURE_2D), this.gl.bindTexture(this.gl.TEXTURE_2D, null), this;
  }
  activate(t) {
    return this.gl.activeTexture(this.gl.TEXTURE0 + t), this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.unit = t, this;
  }
  load(t, e) {
    const s = new Image();
    return s.onload = () => {
      this.attach(s), e && e();
    }, s.src = t, this;
  }
  getTexture() {
    return this.texture;
  }
  loadAsync(t) {
    return new Promise((e, s) => {
      const i = new Image();
      i.onload = () => {
        this.attach(i), e(this);
      }, i.onerror = () => {
        s("img error, " + t);
      }, i.src = t;
    });
  }
}
class D {
  constructor(t) {
    this.gl = t, this.size = new w(1, 1), this.frameBuffer = this.gl.createFramebuffer(), this.depthRenderBuffer = this.gl.createRenderbuffer(), this.textures = [], this.textureAttachmentList = [], this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
  }
  setTexture(t) {
    this.textures = t, this.textureAttachmentList.length = 0, this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.textures.forEach((e, s) => {
      e.attach({ width: this.size.x, height: this.size.y }), this.gl.bindTexture(this.gl.TEXTURE_2D, e.getTexture()), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.bindTexture(this.gl.TEXTURE_2D, null);
      const i = this.gl.COLOR_ATTACHMENT0 + s;
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, i, this.gl.TEXTURE_2D, e.getTexture(), 0), this.textureAttachmentList.push(i);
    }), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }
  setSize(t, e) {
    typeof t == "number" ? (this.size.x = t, e !== void 0 && (this.size.y = e)) : this.size.copy(t), this.setTexture(this.textures), this.textures.forEach((s) => {
      s.attach({ width: this.size.x, height: this.size.y });
    }), this.depthRenderBuffer && (this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.size.x, this.size.y), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null));
  }
  getFrameBuffer() {
    return this.frameBuffer;
  }
}
class W {
  constructor(t) {
    this.gl = t, this.gl.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), this.gl.getExtension("EXT_color_buffer_float"), this.gl.getExtension("EXT_color_buffer_half_float");
  }
  createProgram() {
    return new G(this.gl);
  }
  createBuffer() {
    return new V(this.gl);
  }
  createTexture() {
    return new k(this.gl);
  }
  createFrameBuffer() {
    return new D(this.gl);
  }
}
class M {
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
    return new M().copy(this);
  }
  copy(t) {
    return this.set(t.elm), this;
  }
  perspective(t, e, s, i) {
    var r = 1 / Math.tan(t * Math.PI / 360), a = i - s;
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
      -(i + s) / a,
      -1,
      0,
      0,
      -(i * s * 2) / a,
      0
    ], this;
  }
  lookAt(t, e, s) {
    const i = t.clone().sub(e).normalize(), r = s.clone().cross(i).normalize(), a = i.clone().cross(r).normalize();
    return this.elm = [
      r.x,
      a.x,
      i.x,
      0,
      r.y,
      a.y,
      i.y,
      0,
      r.z,
      a.z,
      i.z,
      0,
      -t.dot(r),
      -t.dot(a),
      -t.dot(i),
      1
    ], this;
  }
  inverse() {
    const t = this.elm[0], e = this.elm[1], s = this.elm[2], i = this.elm[3], r = this.elm[4], a = this.elm[5], m = this.elm[6], u = this.elm[7], n = this.elm[8], h = this.elm[9], o = this.elm[10], c = this.elm[11], f = this.elm[12], g = this.elm[13], p = this.elm[14], y = this.elm[15], x = t * a - e * r, l = t * m - s * r, A = t * u - i * r, v = e * m - s * a, E = e * u - i * a, _ = s * u - i * m, T = n * g - h * f, R = n * p - o * f, F = n * y - c * f, L = h * p - o * g, O = h * y - c * g, C = o * y - c * p, N = x * C - l * O + A * L + v * F - E * R + _ * T, b = 1 / N;
    return N == 0 ? this.identity() : (this.elm[0] = (a * C - m * O + u * L) * b, this.elm[1] = (-e * C + s * O - i * L) * b, this.elm[2] = (g * _ - p * E + y * v) * b, this.elm[3] = (-h * _ + o * E - c * v) * b, this.elm[4] = (-r * C + m * F - u * R) * b, this.elm[5] = (t * C - s * F + i * R) * b, this.elm[6] = (-f * _ + p * A - y * l) * b, this.elm[7] = (n * _ - o * A + c * l) * b, this.elm[8] = (r * O - a * F + u * T) * b, this.elm[9] = (-t * O + e * F - i * T) * b, this.elm[10] = (f * E - g * A + y * x) * b, this.elm[11] = (-n * E + h * A - c * x) * b, this.elm[12] = (-r * L + a * R - m * T) * b, this.elm[13] = (t * L - e * R + s * T) * b, this.elm[14] = (-f * v + g * l - p * x) * b, this.elm[15] = (n * v - h * l + o * x) * b, this);
  }
  transpose() {
    const t = this.elm[0], e = this.elm[1], s = this.elm[2], i = this.elm[3], r = this.elm[4], a = this.elm[5], m = this.elm[6], u = this.elm[7], n = this.elm[8], h = this.elm[9], o = this.elm[10], c = this.elm[11], f = this.elm[12], g = this.elm[13], p = this.elm[14], y = this.elm[15];
    return this.elm[0] = t, this.elm[1] = r, this.elm[2] = n, this.elm[3] = f, this.elm[4] = e, this.elm[5] = a, this.elm[6] = h, this.elm[7] = g, this.elm[8] = s, this.elm[9] = m, this.elm[10] = o, this.elm[11] = p, this.elm[12] = i, this.elm[13] = u, this.elm[14] = c, this.elm[15] = y, this;
  }
  set(t) {
    var e;
    for (let s = 0; s < this.elm.length; s++)
      this.elm[s] = (e = t[s]) != null ? e : 0;
    return this;
  }
  setFromTransform(t, e, s) {
    return this.identity(), this.applyPosition(t), this.applyQuaternion(e), this.applyScale(s), this;
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
  applyQuaternion(t) {
    const e = t.x, s = t.y, i = t.z, r = t.w, a = e * e, m = s * s, u = i * i, n = r * r, h = e * s, o = e * i, c = e * r, f = s * i, g = s * r, p = i * r;
    return this.matmul([
      a - m - u + n,
      2 * (h + p),
      2 * (o - g),
      0,
      2 * (h - p),
      -a + m - u + n,
      2 * (f + c),
      0,
      2 * (o + g),
      2 * (f - c),
      -a - m + u + n,
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
        for (let a = 0; a < 4; a++)
          r += this.elm[a * 4 + i] * t[a + s * 4];
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
class Y {
  constructor() {
    this.x = 0, this.y = 0, this.z = 0, this.w = 1;
  }
  euler(t, e = "XYZ") {
    const s = Math.sin(t.x / 2), i = Math.sin(t.y / 2), r = Math.sin(t.z / 2), a = Math.cos(t.x / 2), m = Math.cos(t.y / 2), u = Math.cos(t.z / 2);
    return e == "XYZ" ? (this.x = a * i * r + s * m * u, this.y = -s * m * r + a * i * u, this.z = a * m * r + s * i * u, this.w = -s * i * r + a * m * u) : e == "XZY" ? (this.x = -a * i * r + s * m * u, this.y = a * i * u - s * m * r, this.z = s * i * u + a * m * r, this.w = s * i * r + a * m * u) : e == "YZX" ? (this.x = s * m * u + a * i * r, this.y = s * m * r + a * i * u, this.z = -s * i * u + a * m * r, this.w = -s * i * r + a * m * u) : e == "ZYX" && (this.x = s * m * u - a * i * r, this.y = s * m * r + a * i * u, this.z = -s * i * u + a * m * r, this.w = s * i * r + a * m * u), this;
  }
  multiply() {
  }
}
class B {
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
class K extends B {
  constructor(t = 1, e = 1, s = 1) {
    super();
    const i = t / 2, r = e / 2, a = s / 2, m = [
      -i,
      r,
      a,
      i,
      r,
      a,
      -i,
      -r,
      a,
      i,
      -r,
      a,
      i,
      r,
      -a,
      -i,
      r,
      -a,
      i,
      -r,
      -a,
      -i,
      -r,
      -a,
      i,
      r,
      a,
      i,
      r,
      -a,
      i,
      -r,
      a,
      i,
      -r,
      -a,
      -i,
      r,
      -a,
      -i,
      r,
      a,
      -i,
      -r,
      -a,
      -i,
      -r,
      a,
      -i,
      r,
      -a,
      i,
      r,
      -a,
      -i,
      r,
      a,
      i,
      r,
      a,
      -i,
      -r,
      a,
      i,
      -r,
      a,
      -i,
      -r,
      -a,
      i,
      -r,
      -a
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
    ], n = [], h = [];
    for (let o = 0; o < 6; o++) {
      n.push(
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0
      );
      const c = 4 * o;
      h.push(
        0 + c,
        2 + c,
        1 + c,
        1 + c,
        2 + c,
        3 + c
      );
    }
    this.setAttribute("position", m, 3), this.setAttribute("normal", u, 3), this.setAttribute("uv", n, 2), this.setAttribute("index", h, 1);
  }
}
class q extends B {
  constructor(t = 0.5, e = 0.5, s = 1, i = 10, r = 1) {
    super();
    const a = [], m = [], u = [], n = [];
    for (let h = 0; h <= r + 2; h++)
      for (let o = 0; o < i; o++) {
        const c = Math.PI * 2 / i * o;
        if (h <= r) {
          const f = h / r, g = (1 - f) * e + f * t, p = Math.cos(c) * g, y = -(s / 2) + s / r * h, x = Math.sin(c) * g;
          a.push(p, y, x), u.push(
            o / i,
            h / r
          );
          const l = new w(Math.cos(c), 0, Math.sin(c)).normalize();
          m.push(
            l.x,
            l.y,
            l.z
          ), h < r && n.push(
            h * i + o,
            (h + 1) * i + (o + 1) % i,
            h * i + (o + 1) % i,
            h * i + o,
            (h + 1) * i + o,
            (h + 1) * i + (o + 1) % i
          );
        } else {
          const f = h - r - 1, g = f ? t : e, p = Math.cos(c) * g, y = -(s / 2) + s * f, x = Math.sin(c) * g;
          a.push(p, y, x), u.push(
            (p + g) * 0.5 / g,
            (x + g) * 0.5 / g
          ), m.push(0, -1 + f * 2, 0);
          const l = i * (r + (f + 1));
          o <= i - 2 && (f == 0 ? n.push(
            l,
            l + o,
            l + o + 1
          ) : n.push(
            l,
            l + o + 1,
            l + o
          ));
        }
      }
    this.setAttribute("position", a, 3), this.setAttribute("normal", m, 3), this.setAttribute("uv", u, 2), this.setAttribute("index", n, 1);
  }
}
class J extends B {
  constructor(t = 1, e = 1, s = 1, i = 1) {
    super();
    const r = t / 2, a = e / 2, m = [], u = [], n = [], h = [];
    for (let o = 0; o <= i; o++)
      for (let c = 0; c <= s; c++) {
        const f = c / s, g = o / s;
        if (m.push(
          -r + t * f,
          -a + e * g,
          0
        ), n.push(f, g), u.push(0, 0, 1), o > 0 && c > 0) {
          const p = s + 1, y = p * o + c, x = p * (o - 1) + c - 1;
          h.push(
            y,
            p * o + c - 1,
            x,
            y,
            x,
            p * (o - 1) + c
          );
        }
      }
    this.setAttribute("position", m, 3), this.setAttribute("normal", u, 3), this.setAttribute("uv", n, 2), this.setAttribute("index", h, 1);
  }
}
class $ extends B {
  constructor(t = 0.5, e = 20, s = 10) {
    super();
    const i = [], r = [], a = [], m = [];
    for (let u = 0; u <= s; u++) {
      const n = u / s * Math.PI, h = (u != 0 && u != s, e);
      for (let o = 0; o < h; o++) {
        const c = o / h * Math.PI * 2, f = Math.sin(n) * t, g = Math.cos(c) * f, p = -Math.cos(n) * t, y = -Math.sin(c) * f;
        i.push(g, p, y), a.push(
          o / h,
          u / s
        );
        const x = new w(g, p, y).normalize();
        r.push(x.x, x.y, x.z), m.push(
          u * e + o,
          (u + 1) * e + (o + 1) % e,
          u * e + (o + 1) % e,
          u * e + o,
          (u + 1) * e + o,
          (u + 1) * e + (o + 1) % e
        );
      }
    }
    this.setAttribute("position", i, 3), this.setAttribute("normal", r, 3), this.setAttribute("uv", a, 2), this.setAttribute("index", m, 1);
  }
  setAttribute(t, e, s) {
    t == "index" && e.forEach((i, r) => {
      e[r] = i % this.count;
    }), super.setAttribute(t, e, s);
  }
}
class tt {
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
    s > -1 && t.entities.slice(s, 1), t.components.forEach((i) => {
      i[e] !== null && i[e] !== void 0 && (i[e] = null);
    });
  }
  addComponent(t, e, s, i) {
    let r = t.components.get(s);
    return r === void 0 && (r = [], t.components.set(s, r)), r.length < e + 1 && (r.length = e + 1), r[e] = i, i;
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
        const a = e[r], m = t.components.get(a);
        if (m === void 0 || m[i] === void 0)
          return !1;
      }
      return !0;
    });
  }
}
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, S = { exports: {} };
/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */
(function(d) {
  (function(t) {
    function e() {
    }
    var s = e.prototype, i = t.EventEmitter;
    function r(u, n) {
      for (var h = u.length; h--; )
        if (u[h].listener === n)
          return h;
      return -1;
    }
    function a(u) {
      return function() {
        return this[u].apply(this, arguments);
      };
    }
    s.getListeners = function(n) {
      var h = this._getEvents(), o, c;
      if (n instanceof RegExp) {
        o = {};
        for (c in h)
          h.hasOwnProperty(c) && n.test(c) && (o[c] = h[c]);
      } else
        o = h[n] || (h[n] = []);
      return o;
    }, s.flattenListeners = function(n) {
      var h = [], o;
      for (o = 0; o < n.length; o += 1)
        h.push(n[o].listener);
      return h;
    }, s.getListenersAsObject = function(n) {
      var h = this.getListeners(n), o;
      return h instanceof Array && (o = {}, o[n] = h), o || h;
    };
    function m(u) {
      return typeof u == "function" || u instanceof RegExp ? !0 : u && typeof u == "object" ? m(u.listener) : !1;
    }
    s.addListener = function(n, h) {
      if (!m(h))
        throw new TypeError("listener must be a function");
      var o = this.getListenersAsObject(n), c = typeof h == "object", f;
      for (f in o)
        o.hasOwnProperty(f) && r(o[f], h) === -1 && o[f].push(c ? h : {
          listener: h,
          once: !1
        });
      return this;
    }, s.on = a("addListener"), s.addOnceListener = function(n, h) {
      return this.addListener(n, {
        listener: h,
        once: !0
      });
    }, s.once = a("addOnceListener"), s.defineEvent = function(n) {
      return this.getListeners(n), this;
    }, s.defineEvents = function(n) {
      for (var h = 0; h < n.length; h += 1)
        this.defineEvent(n[h]);
      return this;
    }, s.removeListener = function(n, h) {
      var o = this.getListenersAsObject(n), c, f;
      for (f in o)
        o.hasOwnProperty(f) && (c = r(o[f], h), c !== -1 && o[f].splice(c, 1));
      return this;
    }, s.off = a("removeListener"), s.addListeners = function(n, h) {
      return this.manipulateListeners(!1, n, h);
    }, s.removeListeners = function(n, h) {
      return this.manipulateListeners(!0, n, h);
    }, s.manipulateListeners = function(n, h, o) {
      var c, f, g = n ? this.removeListener : this.addListener, p = n ? this.removeListeners : this.addListeners;
      if (typeof h == "object" && !(h instanceof RegExp))
        for (c in h)
          h.hasOwnProperty(c) && (f = h[c]) && (typeof f == "function" ? g.call(this, c, f) : p.call(this, c, f));
      else
        for (c = o.length; c--; )
          g.call(this, h, o[c]);
      return this;
    }, s.removeEvent = function(n) {
      var h = typeof n, o = this._getEvents(), c;
      if (h === "string")
        delete o[n];
      else if (n instanceof RegExp)
        for (c in o)
          o.hasOwnProperty(c) && n.test(c) && delete o[c];
      else
        delete this._events;
      return this;
    }, s.removeAllListeners = a("removeEvent"), s.emitEvent = function(n, h) {
      var o = this.getListenersAsObject(n), c, f, g, p, y;
      for (p in o)
        if (o.hasOwnProperty(p))
          for (c = o[p].slice(0), g = 0; g < c.length; g++)
            f = c[g], f.once === !0 && this.removeListener(n, f.listener), y = f.listener.apply(this, h || []), y === this._getOnceReturnValue() && this.removeListener(n, f.listener);
      return this;
    }, s.trigger = a("emitEvent"), s.emit = function(n) {
      var h = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(n, h);
    }, s.setOnceReturnValue = function(n) {
      return this._onceReturnValue = n, this;
    }, s._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, s._getEvents = function() {
      return this._events || (this._events = {});
    }, e.noConflict = function() {
      return t.EventEmitter = i, e;
    }, d.exports ? d.exports = e : t.EventEmitter = e;
  })(typeof window < "u" ? window : X || {});
})(S);
const z = S.exports;
class et extends z {
  constructor(t, e) {
    if (super(), this.ecs = t, this.queries = [], e) {
      const s = Object.keys(e);
      for (let i = 0; i < s.length; i++) {
        const r = s[i];
        this.queries.push({ name: r, query: e[r] });
      }
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
  dispose() {
    this.emitEvent("dispose");
  }
}
class st {
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
    let r = s.children.findIndex((a) => a == e);
    r > -1 && s.children.splice(r, 1), i.parent = void 0, r = this.entities.findIndex((a) => a === e), r > -1 && this.entities.splice(r, 1), this.cacheTransformUpdateOrder = null;
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
class j extends z {
  constructor(t) {
    super(), this.curves = {}, this.name = t || "", this.uniforms = {}, this.frame = {
      start: 0,
      end: 0,
      duration: 0
    };
  }
  addFcurveGroup(t, e) {
    this.curves[t] = e, this.calcFrame();
  }
  removeFCurve(t) {
    delete this.curves[t], this.calcFrame();
  }
  calcFrame() {
    const t = Object.keys(this.curves);
    let e = 1 / 0, s = -1 / 0;
    for (let i = 0; i < t.length; i++) {
      const r = this.curves[t[i]];
      r.frameStart < e && (e = r.frameStart), r.frameEnd > s && (s = r.frameEnd);
    }
    (e == -1 / 0 || s == 1 / 0) && (e = 0, s = 1), this.frame.start = e, this.frame.end = s, this.frame.duration = this.frame.end - this.frame.start;
  }
  getFCurveGroup(t) {
    return this.curves[t] || null;
  }
  assignUniforms(t, e) {
    this.uniforms[t] = e;
  }
  getUniforms(t) {
    if (this.uniforms[t])
      return this.uniforms[t];
    if (this.getFCurveGroup(t)) {
      const s = {
        value: { x: 0, y: 0, z: 0, w: 0 }
      };
      return this.uniforms[t] = s, s;
    }
    return null;
  }
  getValue(t, e) {
    const s = this.getUniforms(t);
    if (!s)
      return e || null;
    const i = s.value;
    return e ? (e.x = i.x, e.y = i.y, e.z = i.z, e.w = i.w, e) : i;
  }
  getValueAt(t, e, s) {
    const i = this.getFCurveGroup(t);
    return s ? i ? i.getValue(e || 0, s) : s : i ? i.getValue(e) : null;
  }
  updateFrame(t) {
    const e = Object.keys(this.curves);
    for (let s = 0; s < e.length; s++) {
      const i = this.curves[e[s]], r = this.getUniforms(e[s]);
      !r || i.getValue(t, r.value);
    }
    this.emitEvent("update", [this]);
  }
}
var I;
((d) => {
  d.NEWTON_ITERATIONS = 4, d.NEWTON_MIN_SLOPE = 1e-3, d.SUBDIVISION_PRECISION = 1e-7, d.SUBDIVISION_MAX_ITERATIONS = 10, d.BEZIER_EASING_CACHE_SIZE = 11, d.BEZIER_EASING_SAMPLE_STEP_SIZE = 1 / d.BEZIER_EASING_CACHE_SIZE;
  function t(n) {
    return -n.p0 + 3 * n.p1 - 3 * n.p2 + n.p3;
  }
  function e(n) {
    return 3 * n.p0 - 6 * n.p1 + 3 * n.p2;
  }
  function s(n) {
    return -3 * n.p0 + 3 * n.p1;
  }
  function i(n, h) {
    return 3 * t(n) * h * h + 2 * e(n) * h + s(n);
  }
  d.calcBezierSlope = i;
  function r(n, h) {
    return ((t(n) * h + e(n)) * h + s(n)) * h + n.p0;
  }
  d.calcBezier = r;
  function a(n, h, o, c) {
    let f = 0, g = 0;
    for (let p = 0; p < d.SUBDIVISION_MAX_ITERATIONS; p++)
      g = h + (o - h) / 2, f = r(c, g), f > n ? o = g : h = g;
    return g;
  }
  function m(n, h, o) {
    for (let c = 0; c < d.NEWTON_ITERATIONS; c++) {
      const f = i(h, o);
      if (f == 0)
        return o;
      o -= (r(h, o) - n) / f;
    }
    return o;
  }
  function u(n, h, o) {
    n.p1 = Math.max(n.p0, Math.min(n.p3, n.p1)), n.p2 = Math.max(n.p0, Math.min(n.p3, n.p2));
    let c = 0;
    for (let p = 1; p < o.length && (c = p - 1, !(h < o[p])); p++)
      ;
    const f = c / (d.BEZIER_EASING_CACHE_SIZE - 1), g = i(n, f) / (n.p3 - n.p0);
    return g == 0 ? f : g > 0.01 ? m(h, n, f) : a(h, f, f + d.BEZIER_EASING_SAMPLE_STEP_SIZE, n);
  }
  d.getBezierTfromX = u;
})(I || (I = {}));
var U;
((d) => {
  function t(l = 6) {
    return (A) => {
      var v = Math.exp(-l * (2 * A - 1)), E = Math.exp(-l);
      return (1 + (1 - v) / (1 + v) * (1 + E) / (1 - E)) / 2;
    };
  }
  d.sigmoid = t;
  function e(l, A, v) {
    const E = Math.max(0, Math.min(1, (v - l) / (A - l)));
    return E * E * (3 - 2 * E);
  }
  d.smoothstep = e;
  function s(l) {
    return l;
  }
  d.linear = s;
  function i(l) {
    return l * l;
  }
  d.easeInQuad = i;
  function r(l) {
    return l * (2 - l);
  }
  d.easeOutQuad = r;
  function a(l) {
    return l < 0.5 ? 2 * l * l : -1 + (4 - 2 * l) * l;
  }
  d.easeInOutQuad = a;
  function m(l) {
    return l * l * l;
  }
  d.easeInCubic = m;
  function u(l) {
    return --l * l * l + 1;
  }
  d.easeOutCubic = u;
  function n(l) {
    return l < 0.5 ? 4 * l * l * l : (l - 1) * (2 * l - 2) * (2 * l - 2) + 1;
  }
  d.easeInOutCubic = n;
  function h(l) {
    return l * l * l * l;
  }
  d.easeInQuart = h;
  function o(l) {
    return 1 - --l * l * l * l;
  }
  d.easeOutQuart = o;
  function c(l) {
    return l < 0.5 ? 8 * l * l * l * l : 1 - 8 * --l * l * l * l;
  }
  d.easeInOutQuart = c;
  function f(l) {
    return l * l * l * l * l;
  }
  d.easeInQuint = f;
  function g(l) {
    return 1 + --l * l * l * l * l;
  }
  d.easeOutQuint = g;
  function p(l) {
    return l < 0.5 ? 16 * l * l * l * l * l : 1 + 16 * --l * l * l * l * l;
  }
  d.easeInOutQuint = p;
  function y(l, A, v, E) {
    for (var _ = new Array(I.BEZIER_EASING_CACHE_SIZE), T = 0; T < I.BEZIER_EASING_CACHE_SIZE; ++T)
      _[T] = I.calcBezier({ p0: l.x, p1: A.x, p2: v.x, p3: E.x }, T / (I.BEZIER_EASING_CACHE_SIZE - 1));
    return (R) => R <= l.x ? l.y : E.x <= R ? E.y : I.calcBezier({ p0: l.y, p1: A.y, p2: v.y, p3: E.y }, I.getBezierTfromX({ p0: l.x, p1: A.x, p2: v.x, p3: E.x }, R, _));
  }
  d.bezier = y;
  function x(l, A, v, E) {
    return y(
      { x: 0, y: 0 },
      { x: l, y: A },
      { x: v, y: E },
      { x: 1, y: 1 }
    );
  }
  d.cubicBezier = x;
})(U || (U = {}));
class Z extends z {
  constructor(t) {
    super(), this.keyframes = [], this.cache = { frame: NaN, value: NaN }, this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.set(t);
  }
  set(t) {
    t && (this.keyframes.length = 0, t.forEach((e) => {
      this.addKeyFrame(e);
    }));
  }
  addKeyFrame(t) {
    let e = 0;
    for (let s = 0; s < this.keyframes.length && this.keyframes[s].coordinate.x < t.coordinate.x; s++)
      e++;
    this.keyframes.splice(e, 0, t), this.frameStart = this.keyframes[0].coordinate.x, this.frameEnd = this.keyframes[this.keyframes.length - 1].coordinate.x;
  }
  getValue(t) {
    if (t == this.cache.frame)
      return this.cache.value;
    let e = null;
    for (let s = 0; s < this.keyframes.length; s++) {
      const i = this.keyframes[s];
      if (t <= i.coordinate.x) {
        const r = this.keyframes[s - 1];
        r ? e = r.to(i, t) : e = i.coordinate.y;
        break;
      }
    }
    return e === null && this.keyframes.length > 0 && (e = this.keyframes[this.keyframes.length - 1].coordinate.y), e !== null ? (this.cache = {
      frame: t,
      value: e
    }, e) : 0;
  }
}
class Q extends z {
  constructor(t, e, s, i, r) {
    super(), this.name = t || "", this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.curves = /* @__PURE__ */ new Map(), e && this.setFCurve(e, "x"), s && this.setFCurve(s, "y"), i && this.setFCurve(i, "z"), r && this.setFCurve(r, "w");
  }
  setFCurve(t, e) {
    this.curves.set(e, t);
    let s = 1 / 0, i = -1 / 0;
    this.curves.forEach((r) => {
      r.frameStart < s && (s = r.frameStart), r.frameEnd > i && (i = r.frameEnd);
    }), (s == -1 / 0 || i == 1 / 0) && (s = 0, i = 1), this.frameStart = s, this.frameEnd = i, this.frameDuration = this.frameEnd - this.frameStart;
  }
  getValue(t, e) {
    const s = this.curves.get("x"), i = this.curves.get("y"), r = this.curves.get("z"), a = this.curves.get("w");
    return e ? (s && (e.x = s.getValue(t)), i && (e.y = i.getValue(t)), r && (e.z = r.getValue(t)), a && (e.w = a.getValue(t)), e) : {
      x: s ? s.getValue(t) : 0,
      y: i ? i.getValue(t) : 0,
      z: r ? r.getValue(t) : 0,
      w: a ? a.getValue(t) : 0
    };
  }
}
class H extends z {
  constructor(t, e, s, i) {
    super(), this.coordinate = { x: 0, y: 0 }, this.handleLeft = { x: 0, y: 0 }, this.handleRight = { x: 0, y: 0 }, this.interpolation = "BEZIER", this.easing = null, this.nextFrame = null, this.set(t, e, s, i);
  }
  set(t, e, s, i) {
    this.coordinate = t, this.handleLeft = e || t, this.handleRight = s || t, this.interpolation = i || "BEZIER";
  }
  getEasing(t, e) {
    return t == "BEZIER" ? U.bezier(this.coordinate, this.handleRight, e.handleLeft, e.coordinate) : (s) => {
      const i = e.coordinate.y - this.coordinate.y;
      return s = (s - this.coordinate.x) / (e.coordinate.x - this.coordinate.x), this.coordinate.y + s * i;
    };
  }
  to(t, e) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != t.coordinate.x || this.nextFrame.coordinate.y != t.coordinate.y) && (this.easing = this.getEasing(this.interpolation, t), this.nextFrame = t), this.easing ? this.easing(e) : 0;
  }
}
class it extends z {
  constructor(t) {
    super(), this.connected = !1, this.frameCurrent = 0, this.frameStart = 0, this.frameEnd = 0, this.objects = [], this.actions = [], this.scene = null, t && (this.url = t, this.connect(this.url));
  }
  connect(t) {
    this.url = t, this.ws = new WebSocket(this.url), this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = (e) => {
      console.error(e);
    };
  }
  syncJsonScene(t) {
    const e = new XMLHttpRequest();
    e.onreadystatechange = () => {
      e.readyState == 4 && e.status == 200 && this.onSyncScene(JSON.parse(e.response));
    }, e.open("GET", t), e.send();
  }
  onSyncScene(t) {
    this.actions.length = 0, this.objects.length = 0, t.actions.forEach((s) => {
      const i = new j(s.name), r = Object.keys(s.fcurve_groups);
      for (let a = 0; a < r.length; a++) {
        const m = r[a], u = new Q(m);
        s.fcurve_groups[m].forEach((n) => {
          const h = new Z();
          h.set(n.keyframes.map((o) => new H(o.c, o.h_l, o.h_r, o.i))), u.setFCurve(h, n.axis);
        }), i.addFcurveGroup(u.name, u);
      }
      this.actions.push(i);
    }), this.scene = t.scene, this.objects.length = 0;
    const e = (s) => {
      this.objects.push(s), s.children.forEach((i) => e(i));
    };
    e(this.scene), this.emitEvent("sync/scene", [this]), this.setTimeline(this.frameCurrent);
  }
  onSyncTimeline(t) {
    this.setTimeline(t.current, t.start, t.end);
  }
  onOpen(t) {
    this.connected = !0;
  }
  onMessage(t) {
    const e = JSON.parse(t.data);
    e.type == "sync/scene" ? this.onSyncScene(e.data) : e.type == "sync/timeline" && this.onSyncTimeline(e.data);
  }
  onClose(t) {
    this.disposeWS();
  }
  getActionNameList(t) {
    for (let e = 0; e < this.objects.length; e++)
      if (this.objects[e].name == t)
        return this.objects[e].actions;
    return [];
  }
  getAction(t) {
    for (let e = 0; e < this.actions.length; e++)
      if (this.actions[e].name == t)
        return this.actions[e];
    return null;
  }
  getActionList(t) {
    const e = [];
    return this.getActionNameList(t).forEach((i) => {
      const r = this.getAction(i);
      r && e.push(r);
    }), e;
  }
  getActionContainsAccessor(t) {
    return this.actions.find((e) => Object.keys(e.curves).some((i) => i == t)) || null;
  }
  setTimeline(t, e, s) {
    this.frameCurrent = t, this.frameStart = e || this.frameStart, this.frameEnd = s || this.frameEnd;
    for (let i = 0; i < this.actions.length; i++)
      this.actions[i].updateFrame(this.frameCurrent);
    this.emitEvent("sync/timeline", [this.frameCurrent, this.frameStart, this.frameEnd]);
  }
  dispose() {
    this.disposeWS();
  }
  disposeWS() {
    this.ws && (this.ws.close(), this.ws.onmessage = null, this.ws.onclose = null, this.ws.onopen = null, this.connected = !1);
  }
}
export {
  j as AnimationAction,
  it as BLidge,
  I as Bezier,
  K as CubeGeometry,
  q as CylinderGeometry,
  tt as ECS,
  U as Easings,
  Z as FCurve,
  Q as FCurveGroup,
  H as FCurveKeyFrame,
  V as GLPowerBuffer,
  D as GLPowerFrameBuffer,
  G as GLPowerProgram,
  k as GLPowerTexture,
  P as GLPowerVAO,
  B as Geometry,
  M as Matrix,
  J as PlaneGeometry,
  W as Power,
  Y as Quaternion,
  st as SceneGraph,
  $ as SphereGeometry,
  et as System,
  w as Vector
};
//# sourceMappingURL=glpower.js.map
