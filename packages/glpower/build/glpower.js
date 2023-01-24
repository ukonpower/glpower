class P {
  constructor(t, e) {
    this.gl = t, this.program = e, this.vao = this.gl.createVertexArray(), this.attributes = {}, this.indexBuffer = null, this.vertCount = 0, this.indexCount = 0, this.instanceCount = 0;
  }
  setAttribute(t, e, s, i) {
    let r = this.attributes[t];
    const h = e.array ? e.array.length / s : 0;
    return r ? (r.buffer = e, r.size = s, r.count = h, r.instanceDivisor = i, r.location = void 0) : (r = {
      buffer: e,
      size: s,
      count: h,
      instanceDivisor: i
    }, this.attributes[t] = r), this.updateAttributes(), this;
  }
  removeAttribute(t) {
    return delete this.attributes[t], this;
  }
  updateAttributes(t) {
    if (!this.vao)
      return;
    this.vertCount = 0, this.instanceCount = 0;
    const e = Object.keys(this.attributes);
    this.gl.bindVertexArray(this.vao);
    for (let s = 0; s < e.length; s++) {
      const i = e[s], r = this.attributes[i];
      (r.location === void 0 || t) && (r.location = this.gl.getAttribLocation(this.program, i), r.location > -1 && (this.gl.bindBuffer(this.gl.ARRAY_BUFFER, r.buffer.buffer), this.gl.enableVertexAttribArray(r.location), this.gl.vertexAttribPointer(r.location, r.size, this.gl.FLOAT, !1, 0, 0), r.instanceDivisor !== void 0 && this.gl.vertexAttribDivisor(r.location, r.instanceDivisor))), this.vertCount = Math.max(this.vertCount, r.count), r.instanceDivisor !== void 0 && r.instanceDivisor > 0 && (this.instanceCount == 0 ? this.instanceCount = r.count : this.instanceCount = Math.min(this.instanceCount, r.count));
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
class D {
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
      return this.gl.attachShader(this.program, s), this.gl.attachShader(this.program, i), this.gl.linkProgram(this.program), this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS) || console.error("program link error:", this.gl.getProgramInfoLog(this.program)), this;
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
class G {
  constructor(t) {
    this.gl = t, this.buffer = this.gl.createBuffer(), this.array = null;
  }
  setData(t, e = "vbo", s) {
    const i = e == "vbo" ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER;
    return this.gl.bindBuffer(i, this.buffer), this.gl.bufferData(i, t, s || this.gl.STATIC_DRAW), this.gl.bindBuffer(i, null), this.array = t, this;
  }
}
class z {
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
    return typeof t == "number" ? (this.x *= t, this.y *= t, this.z *= t, this.w *= t) : (this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w), this;
  }
  divide(t) {
    return typeof t == "number" ? (this.x /= t, this.y /= t, this.z /= t, this.w /= t) : (this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w), this;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  normalize() {
    return this.divide(this.length() || 1);
  }
  cross(t) {
    const e = this.x, s = this.y, i = this.z, r = t.x, h = t.y, f = t.z;
    return this.x = s * f - i * h, this.y = i * r - e * f, this.z = e * h - s * r, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  applyMatrix3(t) {
    const e = t.elm, s = e[0], i = e[1], r = e[2], h = e[4], f = e[5], l = e[6], n = e[8], o = e[9], u = e[10], c = this.x * s + this.y * h + this.z * n, m = this.x * i + this.y * f + this.z * o, p = this.x * r + this.y * l + this.z * u;
    this.x = c, this.y = m, this.z = p, this.w = 0;
  }
  applyMatrix4(t) {
    const e = t.elm, s = e[0], i = e[1], r = e[2], h = e[3], f = e[4], l = e[5], n = e[6], o = e[7], u = e[8], c = e[9], m = e[10], p = e[11], y = e[12], d = e[13], x = e[14], a = e[15], b = this.x * s + this.y * f + this.z * u + this.w * y, v = this.x * i + this.y * l + this.z * c + this.w * d, E = this.x * r + this.y * n + this.z * m + this.w * x, T = this.x * h + this.y * o + this.z * p + this.w * a;
    return this.x = b, this.y = v, this.z = E, this.w = T, this;
  }
  copy(t) {
    var e, s, i, r;
    return this.x = (e = t.x) != null ? e : 0, this.y = (s = t.y) != null ? s : 0, this.z = (i = t.z) != null ? i : 0, this.w = (r = t.w) != null ? r : 0, this;
  }
  clone() {
    return new z(this.x, this.y, this.z, this.w);
  }
  getElm(t) {
    return t == "vec2" ? [this.x, this.y] : t == "vec3" ? [this.x, this.y, this.z] : [this.x, this.y, this.z, this.w];
  }
}
class X {
  constructor(t) {
    this.gl = t, this.image = null, this.unit = 0, this.size = new z(), this.texture = this.gl.createTexture(), this._setting = {
      type: this.gl.UNSIGNED_BYTE,
      internalFormat: this.gl.RGBA,
      format: this.gl.RGBA,
      magFilter: this.gl.NEAREST,
      minFilter: this.gl.NEAREST,
      generateMipmap: !1,
      wrapS: this.gl.CLAMP_TO_EDGE,
      wrapT: this.gl.CLAMP_TO_EDGE
    };
  }
  get isTexture() {
    return !0;
  }
  setting(t) {
    return this._setting = {
      ...this._setting,
      ...t
    }, this.attach(this.image), this;
  }
  attach(t) {
    return this.image = t, this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.image ? (this.size.set(this.image.width, this.image.height), this.image instanceof HTMLImageElement ? this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this._setting.format, this._setting.type, this.image) : this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.image.width, this.image.height, 0, this._setting.format, this._setting.type, null)) : (this.size.set(1, 1), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.size.x, this.size.y, 0, this._setting.format, this._setting.type, null)), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter), this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this._setting.wrapS), this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this._setting.wrapT), this._setting.generateMipmap && this.gl.generateMipmap(this.gl.TEXTURE_2D), this.gl.bindTexture(this.gl.TEXTURE_2D, null), this;
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
class k {
  constructor(t) {
    this.gl = t, this.size = new z(1, 1), this.frameBuffer = this.gl.createFramebuffer(), this.depthRenderBuffer = this.gl.createRenderbuffer(), this.textures = [], this.textureAttachmentList = [], this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
  }
  setTexture(t) {
    return this.textures = t, this.textureAttachmentList.length = 0, this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.textures.forEach((e, s) => {
      e.attach({ width: this.size.x, height: this.size.y }), this.gl.bindTexture(this.gl.TEXTURE_2D, e.getTexture()), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.bindTexture(this.gl.TEXTURE_2D, null);
      const i = this.gl.COLOR_ATTACHMENT0 + s;
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, i, this.gl.TEXTURE_2D, e.getTexture(), 0), this.textureAttachmentList.push(i);
    }), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this;
  }
  setSize(t, e) {
    typeof t == "number" ? (this.size.x = t, e !== void 0 && (this.size.y = e)) : this.size.copy(t), this.setTexture(this.textures), this.textures.forEach((s) => {
      s.attach({ width: this.size.x, height: this.size.y });
    }), this.depthRenderBuffer && (this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT32F, this.size.x, this.size.y), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null));
  }
  getFrameBuffer() {
    return this.frameBuffer;
  }
}
class H {
  constructor(t) {
    this.gl = t, this.gl.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), this.gl.getExtension("EXT_color_buffer_float"), this.gl.getExtension("EXT_color_buffer_half_float");
  }
  createProgram() {
    return new D(this.gl);
  }
  createBuffer() {
    return new G(this.gl);
  }
  createTexture() {
    return new X(this.gl);
  }
  createFrameBuffer() {
    return new k(this.gl);
  }
}
class N {
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
    return new N().copy(this);
  }
  copy(t) {
    return this.set(t.elm), this;
  }
  perspective(t, e, s, i) {
    var r = 1 / Math.tan(t * Math.PI / 360), h = i - s;
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
      -(i + s) / h,
      -1,
      0,
      0,
      -(i * s * 2) / h,
      0
    ], this;
  }
  orthographic(t, e, s, i) {
    return this.elm = [
      2 / t,
      0,
      0,
      0,
      0,
      2 / e,
      0,
      0,
      0,
      0,
      -2 / (i - s),
      0,
      0,
      0,
      -(i + s) / (i - s),
      1
    ], this;
  }
  lookAt(t, e, s) {
    const i = t.clone().sub(e).normalize(), r = s.clone().cross(i).normalize(), h = i.clone().cross(r).normalize();
    return this.elm = [
      r.x,
      h.x,
      i.x,
      0,
      r.y,
      h.y,
      i.y,
      0,
      r.z,
      h.z,
      i.z,
      0,
      -t.dot(r),
      -t.dot(h),
      -t.dot(i),
      1
    ], this;
  }
  inverse() {
    const t = this.elm[0], e = this.elm[1], s = this.elm[2], i = this.elm[3], r = this.elm[4], h = this.elm[5], f = this.elm[6], l = this.elm[7], n = this.elm[8], o = this.elm[9], u = this.elm[10], c = this.elm[11], m = this.elm[12], p = this.elm[13], y = this.elm[14], d = this.elm[15], x = t * h - e * r, a = t * f - s * r, b = t * l - i * r, v = e * f - s * h, E = e * l - i * h, T = s * l - i * f, R = n * p - o * m, _ = n * y - u * m, w = n * d - c * m, F = o * y - u * p, L = o * d - c * p, M = u * d - c * y, U = x * M - a * L + b * F + v * w - E * _ + T * R, A = 1 / U;
    return U == 0 ? this.identity() : (this.elm[0] = (h * M - f * L + l * F) * A, this.elm[1] = (-e * M + s * L - i * F) * A, this.elm[2] = (p * T - y * E + d * v) * A, this.elm[3] = (-o * T + u * E - c * v) * A, this.elm[4] = (-r * M + f * w - l * _) * A, this.elm[5] = (t * M - s * w + i * _) * A, this.elm[6] = (-m * T + y * b - d * a) * A, this.elm[7] = (n * T - u * b + c * a) * A, this.elm[8] = (r * L - h * w + l * R) * A, this.elm[9] = (-t * L + e * w - i * R) * A, this.elm[10] = (m * E - p * b + d * x) * A, this.elm[11] = (-n * E + o * b - c * x) * A, this.elm[12] = (-r * F + h * _ - f * R) * A, this.elm[13] = (t * F - e * _ + s * R) * A, this.elm[14] = (-m * v + p * a - y * x) * A, this.elm[15] = (n * v - o * a + u * x) * A, this);
  }
  transpose() {
    const t = this.elm[0], e = this.elm[1], s = this.elm[2], i = this.elm[3], r = this.elm[4], h = this.elm[5], f = this.elm[6], l = this.elm[7], n = this.elm[8], o = this.elm[9], u = this.elm[10], c = this.elm[11], m = this.elm[12], p = this.elm[13], y = this.elm[14], d = this.elm[15];
    return this.elm[0] = t, this.elm[1] = r, this.elm[2] = n, this.elm[3] = m, this.elm[4] = e, this.elm[5] = h, this.elm[6] = o, this.elm[7] = p, this.elm[8] = s, this.elm[9] = f, this.elm[10] = u, this.elm[11] = y, this.elm[12] = i, this.elm[13] = l, this.elm[14] = c, this.elm[15] = d, this;
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
    const e = t.x, s = t.y, i = t.z, r = t.w, h = e * e, f = s * s, l = i * i, n = r * r, o = e * s, u = e * i, c = e * r, m = s * i, p = s * r, y = i * r;
    return this.matmul([
      h - f - l + n,
      2 * (o + y),
      2 * (u - p),
      0,
      2 * (o - y),
      -h + f - l + n,
      2 * (m + c),
      0,
      2 * (u + p),
      2 * (m - c),
      -h - f + l + n,
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
        for (let h = 0; h < 4; h++)
          r += this.elm[h * 4 + i] * t[h + s * 4];
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
class W {
  constructor(t, e, s, i) {
    this.x = 0, this.y = 0, this.z = 0, this.w = 1, this.set(t, e, s, i);
  }
  set(t, e, s, i) {
    this.x = t != null ? t : this.x, this.y = e != null ? e : this.y, this.z = s != null ? s : this.z, this.w = i != null ? i : this.w;
  }
  euler(t, e = "XYZ") {
    const s = Math.sin(t.x / 2), i = Math.sin(t.y / 2), r = Math.sin(t.z / 2), h = Math.cos(t.x / 2), f = Math.cos(t.y / 2), l = Math.cos(t.z / 2);
    return e == "XYZ" ? (this.x = h * i * r + s * f * l, this.y = -s * f * r + h * i * l, this.z = h * f * r + s * i * l, this.w = -s * i * r + h * f * l) : e == "XZY" ? (this.x = -h * i * r + s * f * l, this.y = h * i * l - s * f * r, this.z = s * i * l + h * f * r, this.w = s * i * r + h * f * l) : e == "YZX" ? (this.x = s * f * l + h * i * r, this.y = s * f * r + h * i * l, this.z = -s * i * l + h * f * r, this.w = -s * i * r + h * f * l) : e == "ZYX" && (this.x = s * f * l - h * i * r, this.y = s * f * r + h * i * l, this.z = -s * i * l + h * f * r, this.w = s * i * r + h * f * l), this;
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
    const e = [];
    return this.getAttribute("position") && e.push({ name: "position", ...this.getAttributeBuffer(t, "position", Float32Array) }), this.getAttribute("uv") && e.push({ name: "uv", ...this.getAttributeBuffer(t, "uv", Float32Array) }), this.getAttribute("normal") && e.push({ name: "normal", ...this.getAttributeBuffer(t, "normal", Float32Array) }), {
      attributes: e,
      index: this.getAttributeBuffer(t, "index", Uint16Array, "ibo")
    };
  }
}
class Y extends B {
  constructor(t = 1, e = 1, s = 1) {
    super();
    const i = t / 2, r = e / 2, h = s / 2, f = [
      -i,
      r,
      h,
      i,
      r,
      h,
      -i,
      -r,
      h,
      i,
      -r,
      h,
      i,
      r,
      -h,
      -i,
      r,
      -h,
      i,
      -r,
      -h,
      -i,
      -r,
      -h,
      i,
      r,
      h,
      i,
      r,
      -h,
      i,
      -r,
      h,
      i,
      -r,
      -h,
      -i,
      r,
      -h,
      -i,
      r,
      h,
      -i,
      -r,
      -h,
      -i,
      -r,
      h,
      -i,
      r,
      -h,
      i,
      r,
      -h,
      -i,
      r,
      h,
      i,
      r,
      h,
      -i,
      -r,
      h,
      i,
      -r,
      h,
      -i,
      -r,
      -h,
      i,
      -r,
      -h
    ], l = [
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
    ], n = [], o = [];
    for (let u = 0; u < 6; u++) {
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
      const c = 4 * u;
      o.push(
        0 + c,
        2 + c,
        1 + c,
        1 + c,
        2 + c,
        3 + c
      );
    }
    this.setAttribute("position", f, 3), this.setAttribute("normal", l, 3), this.setAttribute("uv", n, 2), this.setAttribute("index", o, 1);
  }
}
class K extends B {
  constructor(t = 0.5, e = 0.5, s = 1, i = 10, r = 1) {
    super();
    const h = [], f = [], l = [], n = [];
    for (let o = 0; o <= r + 2; o++)
      for (let u = 0; u < i; u++) {
        const c = Math.PI * 2 / i * u;
        if (o <= r) {
          const m = o / r, p = (1 - m) * e + m * t, y = Math.cos(c) * p, d = -(s / 2) + s / r * o, x = Math.sin(c) * p;
          h.push(y, d, x), l.push(
            u / i,
            o / r
          );
          const a = new z(Math.cos(c), 0, Math.sin(c)).normalize();
          f.push(
            a.x,
            a.y,
            a.z
          ), o < r && n.push(
            o * i + u,
            (o + 1) * i + (u + 1) % i,
            o * i + (u + 1) % i,
            o * i + u,
            (o + 1) * i + u,
            (o + 1) * i + (u + 1) % i
          );
        } else {
          const m = o - r - 1, p = m ? t : e, y = Math.cos(c) * p, d = -(s / 2) + s * m, x = Math.sin(c) * p;
          h.push(y, d, x), l.push(
            (y + p) * 0.5 / p,
            (x + p) * 0.5 / p
          ), f.push(0, -1 + m * 2, 0);
          const a = i * (r + (m + 1));
          u <= i - 2 && (m == 0 ? n.push(
            a,
            a + u,
            a + u + 1
          ) : n.push(
            a,
            a + u + 1,
            a + u
          ));
        }
      }
    this.setAttribute("position", h, 3), this.setAttribute("normal", f, 3), this.setAttribute("uv", l, 2), this.setAttribute("index", n, 1);
  }
}
class q extends B {
  constructor(t = 1, e = 1, s = 1, i = 1) {
    super();
    const r = t / 2, h = e / 2, f = [], l = [], n = [], o = [];
    for (let u = 0; u <= i; u++)
      for (let c = 0; c <= s; c++) {
        const m = c / s, p = u / s;
        if (f.push(
          -r + t * m,
          -h + e * p,
          0
        ), n.push(m, p), l.push(0, 0, 1), u > 0 && c > 0) {
          const y = s + 1, d = y * u + c, x = y * (u - 1) + c - 1;
          o.push(
            d,
            y * u + c - 1,
            x,
            d,
            x,
            y * (u - 1) + c
          );
        }
      }
    this.setAttribute("position", f, 3), this.setAttribute("normal", l, 3), this.setAttribute("uv", n, 2), this.setAttribute("index", o, 1);
  }
}
class J extends B {
  constructor(t = 0.5, e = 20, s = 10) {
    super();
    const i = [], r = [], h = [], f = [];
    for (let l = 0; l <= s; l++) {
      const n = l / s * Math.PI, o = (l != 0 && l != s, e);
      for (let u = 0; u < o; u++) {
        const c = u / o * Math.PI * 2, m = Math.sin(n) * t, p = Math.cos(c) * m, y = -Math.cos(n) * t, d = -Math.sin(c) * m;
        i.push(p, y, d), h.push(
          u / o,
          l / s
        );
        const x = new z(p, y, d).normalize();
        r.push(x.x, x.y, x.z), f.push(
          l * e + u,
          l * e + (u + 1) % e,
          (l + 1) * e + (u + 1) % e,
          l * e + u,
          (l + 1) * e + (u + 1) % e,
          (l + 1) * e + u
        );
      }
    }
    this.setAttribute("position", i, 3), this.setAttribute("normal", r, 3), this.setAttribute("uv", h, 2), this.setAttribute("index", f, 1);
  }
  setAttribute(t, e, s) {
    t == "index" && e.forEach((i, r) => {
      e[r] = i % this.count;
    }), super.setAttribute(t, e, s);
  }
}
class $ extends B {
  constructor(t = 7) {
    super(), this.count = t;
    const e = [], s = [], i = [], r = new z(0, 0);
    let h = 1;
    for (let f = 0; f < t; f++) {
      e.push(-1 + r.x, 1 + r.y, 0), e.push(-1 + r.x + h, 1 + r.y, 0), e.push(-1 + r.x + h, 1 + r.y - h, 0), e.push(-1 + r.x, 1 + r.y - h, 0), s.push(0, 1), s.push(1, 1), s.push(1, 0), s.push(0, 0);
      const l = (f + 0) * 4;
      i.push(l + 0, l + 2, l + 1, l + 0, l + 3, l + 2), r.x += h, r.y = r.y - h, h *= 0.5;
    }
    this.setAttribute("position", e, 3), this.setAttribute("uv", s, 2), this.setAttribute("index", i, 1);
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
      i[e] = void 0;
    });
  }
  addComponent(t, e, s, i) {
    let r = t.components.get(s);
    return r === void 0 && (r = [], t.components.set(s, r)), r.length < e + 1 && (r.length = e + 1), r[e] = i, i;
  }
  removeComponent(t, e, s) {
    const i = t.components.get(s);
    i && i.length > e && (i[e] = void 0);
  }
  getComponent(t, e, s) {
    const i = t.components.get(s);
    return i !== void 0 ? i[e] : null;
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
        const h = e[r], f = t.components.get(h);
        if (f === void 0 || f[i] === void 0)
          return !1;
      }
      return !0;
    });
  }
}
var V = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, S = { exports: {} };
/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */
(function(g) {
  (function(t) {
    function e() {
    }
    var s = e.prototype, i = t.EventEmitter;
    function r(l, n) {
      for (var o = l.length; o--; )
        if (l[o].listener === n)
          return o;
      return -1;
    }
    function h(l) {
      return function() {
        return this[l].apply(this, arguments);
      };
    }
    s.getListeners = function(n) {
      var o = this._getEvents(), u, c;
      if (n instanceof RegExp) {
        u = {};
        for (c in o)
          o.hasOwnProperty(c) && n.test(c) && (u[c] = o[c]);
      } else
        u = o[n] || (o[n] = []);
      return u;
    }, s.flattenListeners = function(n) {
      var o = [], u;
      for (u = 0; u < n.length; u += 1)
        o.push(n[u].listener);
      return o;
    }, s.getListenersAsObject = function(n) {
      var o = this.getListeners(n), u;
      return o instanceof Array && (u = {}, u[n] = o), u || o;
    };
    function f(l) {
      return typeof l == "function" || l instanceof RegExp ? !0 : l && typeof l == "object" ? f(l.listener) : !1;
    }
    s.addListener = function(n, o) {
      if (!f(o))
        throw new TypeError("listener must be a function");
      var u = this.getListenersAsObject(n), c = typeof o == "object", m;
      for (m in u)
        u.hasOwnProperty(m) && r(u[m], o) === -1 && u[m].push(c ? o : {
          listener: o,
          once: !1
        });
      return this;
    }, s.on = h("addListener"), s.addOnceListener = function(n, o) {
      return this.addListener(n, {
        listener: o,
        once: !0
      });
    }, s.once = h("addOnceListener"), s.defineEvent = function(n) {
      return this.getListeners(n), this;
    }, s.defineEvents = function(n) {
      for (var o = 0; o < n.length; o += 1)
        this.defineEvent(n[o]);
      return this;
    }, s.removeListener = function(n, o) {
      var u = this.getListenersAsObject(n), c, m;
      for (m in u)
        u.hasOwnProperty(m) && (c = r(u[m], o), c !== -1 && u[m].splice(c, 1));
      return this;
    }, s.off = h("removeListener"), s.addListeners = function(n, o) {
      return this.manipulateListeners(!1, n, o);
    }, s.removeListeners = function(n, o) {
      return this.manipulateListeners(!0, n, o);
    }, s.manipulateListeners = function(n, o, u) {
      var c, m, p = n ? this.removeListener : this.addListener, y = n ? this.removeListeners : this.addListeners;
      if (typeof o == "object" && !(o instanceof RegExp))
        for (c in o)
          o.hasOwnProperty(c) && (m = o[c]) && (typeof m == "function" ? p.call(this, c, m) : y.call(this, c, m));
      else
        for (c = u.length; c--; )
          p.call(this, o, u[c]);
      return this;
    }, s.removeEvent = function(n) {
      var o = typeof n, u = this._getEvents(), c;
      if (o === "string")
        delete u[n];
      else if (n instanceof RegExp)
        for (c in u)
          u.hasOwnProperty(c) && n.test(c) && delete u[c];
      else
        delete this._events;
      return this;
    }, s.removeAllListeners = h("removeEvent"), s.emitEvent = function(n, o) {
      var u = this.getListenersAsObject(n), c, m, p, y, d;
      for (y in u)
        if (u.hasOwnProperty(y))
          for (c = u[y].slice(0), p = 0; p < c.length; p++)
            m = c[p], m.once === !0 && this.removeListener(n, m.listener), d = m.listener.apply(this, o || []), d === this._getOnceReturnValue() && this.removeListener(n, m.listener);
      return this;
    }, s.trigger = h("emitEvent"), s.emit = function(n) {
      var o = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(n, o);
    }, s.setOnceReturnValue = function(n) {
      return this._onceReturnValue = n, this;
    }, s._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, s._getEvents = function() {
      return this._events || (this._events = {});
    }, e.noConflict = function() {
      return t.EventEmitter = i, e;
    }, g.exports ? g.exports = e : t.EventEmitter = e;
  })(typeof window < "u" ? window : V || {});
})(S);
const O = S.exports;
class et extends O {
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
      this.beforeUpdateImpl(s.name, t, i);
      for (let r = 0; r < i.length; r++)
        this.updateImpl(s.name, i[r], t);
      this.afterUpdateImpl(s.name, t);
    }
  }
  beforeUpdateImpl(t, e, s) {
  }
  updateImpl(t, e, s) {
  }
  afterUpdateImpl(t, e) {
  }
  dispose() {
    this.emitEvent("dispose");
  }
}
var I;
((g) => {
  g.NEWTON_ITERATIONS = 4, g.NEWTON_MIN_SLOPE = 1e-3, g.SUBDIVISION_PRECISION = 1e-7, g.SUBDIVISION_MAX_ITERATIONS = 10, g.BEZIER_EASING_CACHE_SIZE = 11, g.BEZIER_EASING_SAMPLE_STEP_SIZE = 1 / g.BEZIER_EASING_CACHE_SIZE;
  function t(n) {
    return -n.p0 + 3 * n.p1 - 3 * n.p2 + n.p3;
  }
  function e(n) {
    return 3 * n.p0 - 6 * n.p1 + 3 * n.p2;
  }
  function s(n) {
    return -3 * n.p0 + 3 * n.p1;
  }
  function i(n, o) {
    return 3 * t(n) * o * o + 2 * e(n) * o + s(n);
  }
  g.calcBezierSlope = i;
  function r(n, o) {
    return ((t(n) * o + e(n)) * o + s(n)) * o + n.p0;
  }
  g.calcBezier = r;
  function h(n, o, u, c) {
    let m = 0, p = 0;
    for (let y = 0; y < g.SUBDIVISION_MAX_ITERATIONS; y++)
      p = o + (u - o) / 2, m = r(c, p), m > n ? u = p : o = p;
    return p;
  }
  function f(n, o, u) {
    for (let c = 0; c < g.NEWTON_ITERATIONS; c++) {
      const m = i(o, u);
      if (m == 0)
        return u;
      u -= (r(o, u) - n) / m;
    }
    return u;
  }
  function l(n, o, u) {
    n.p1 = Math.max(n.p0, Math.min(n.p3, n.p1)), n.p2 = Math.max(n.p0, Math.min(n.p3, n.p2));
    let c = 0;
    for (let y = 1; y < u.length && (c = y - 1, !(o < u[y])); y++)
      ;
    const m = c / (g.BEZIER_EASING_CACHE_SIZE - 1), p = i(n, m) / (n.p3 - n.p0);
    return p == 0 ? m : p > 0.01 ? f(o, n, m) : h(o, m, m + g.BEZIER_EASING_SAMPLE_STEP_SIZE, n);
  }
  g.getBezierTfromX = l;
})(I || (I = {}));
var C;
((g) => {
  function t(a = 6) {
    return (b) => {
      var v = Math.exp(-a * (2 * b - 1)), E = Math.exp(-a);
      return (1 + (1 - v) / (1 + v) * (1 + E) / (1 - E)) / 2;
    };
  }
  g.sigmoid = t;
  function e(a, b, v) {
    const E = Math.max(0, Math.min(1, (v - a) / (b - a)));
    return E * E * (3 - 2 * E);
  }
  g.smoothstep = e;
  function s(a) {
    return a;
  }
  g.linear = s;
  function i(a) {
    return a * a;
  }
  g.easeInQuad = i;
  function r(a) {
    return a * (2 - a);
  }
  g.easeOutQuad = r;
  function h(a) {
    return a < 0.5 ? 2 * a * a : -1 + (4 - 2 * a) * a;
  }
  g.easeInOutQuad = h;
  function f(a) {
    return a * a * a;
  }
  g.easeInCubic = f;
  function l(a) {
    return --a * a * a + 1;
  }
  g.easeOutCubic = l;
  function n(a) {
    return a < 0.5 ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
  }
  g.easeInOutCubic = n;
  function o(a) {
    return a * a * a * a;
  }
  g.easeInQuart = o;
  function u(a) {
    return 1 - --a * a * a * a;
  }
  g.easeOutQuart = u;
  function c(a) {
    return a < 0.5 ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a;
  }
  g.easeInOutQuart = c;
  function m(a) {
    return a * a * a * a * a;
  }
  g.easeInQuint = m;
  function p(a) {
    return 1 + --a * a * a * a * a;
  }
  g.easeOutQuint = p;
  function y(a) {
    return a < 0.5 ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a;
  }
  g.easeInOutQuint = y;
  function d(a, b, v, E) {
    for (var T = new Array(I.BEZIER_EASING_CACHE_SIZE), R = 0; R < I.BEZIER_EASING_CACHE_SIZE; ++R)
      T[R] = I.calcBezier({ p0: a.x, p1: b.x, p2: v.x, p3: E.x }, R / (I.BEZIER_EASING_CACHE_SIZE - 1));
    return (_) => _ <= a.x ? a.y : E.x <= _ ? E.y : I.calcBezier({ p0: a.y, p1: b.y, p2: v.y, p3: E.y }, I.getBezierTfromX({ p0: a.x, p1: b.x, p2: v.x, p3: E.x }, _, T));
  }
  g.bezier = d;
  function x(a, b, v, E) {
    return d(
      { x: 0, y: 0 },
      { x: a, y: b },
      { x: v, y: E },
      { x: 1, y: 1 }
    );
  }
  g.cubicBezier = x;
})(C || (C = {}));
class Z extends O {
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
class j extends O {
  constructor(t, e, s, i, r) {
    super(), this.updatedFrame = -1, this.name = t || "", this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.curves = /* @__PURE__ */ new Map(), this.value = new z(), e && this.setFCurve(e, "x"), s && this.setFCurve(s, "y"), i && this.setFCurve(i, "z"), r && this.setFCurve(r, "w");
  }
  setFCurve(t, e) {
    this.curves.set(e, t);
    let s = 1 / 0, i = -1 / 0;
    this.curves.forEach((r) => {
      r.frameStart < s && (s = r.frameStart), r.frameEnd > i && (i = r.frameEnd);
    }), (s == -1 / 0 || i == 1 / 0) && (s = 0, i = 1), this.frameStart = s, this.frameEnd = i, this.frameDuration = this.frameEnd - this.frameStart;
  }
  getFCurve(t) {
    return this.curves.get(t) || null;
  }
  setFrame(t) {
    if (t == this.updatedFrame)
      return this;
    const e = this.curves.get("x"), s = this.curves.get("y"), i = this.curves.get("z"), r = this.curves.get("w");
    return e && (this.value.x = e.getValue(t)), s && (this.value.y = s.getValue(t)), i && (this.value.z = i.getValue(t)), r && (this.value.w = r.getValue(t)), this.updatedFrame = t, this;
  }
}
class Q extends O {
  constructor(t, e, s, i) {
    super(), this.coordinate = { x: 0, y: 0 }, this.handleLeft = { x: 0, y: 0 }, this.handleRight = { x: 0, y: 0 }, this.interpolation = "BEZIER", this.easing = null, this.nextFrame = null, this.set(t, e, s, i);
  }
  set(t, e, s, i) {
    this.coordinate = t, this.handleLeft = e || t, this.handleRight = s || t, this.interpolation = i || "BEZIER";
  }
  getEasing(t, e) {
    return t == "BEZIER" ? C.bezier(this.coordinate, this.handleRight, e.handleLeft, e.coordinate) : t == "CONSTANT" ? () => this.coordinate.y : (s) => {
      const i = e.coordinate.y - this.coordinate.y;
      return s = (s - this.coordinate.x) / (e.coordinate.x - this.coordinate.x), this.coordinate.y + s * i;
    };
  }
  to(t, e) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != t.coordinate.x || this.nextFrame.coordinate.y != t.coordinate.y) && (this.easing = this.getEasing(this.interpolation, t), this.nextFrame = t), this.easing ? this.easing(e) : 0;
  }
}
class st extends O {
  constructor(t) {
    super(), this.connected = !1, this.frame = {
      start: -1,
      end: -1,
      current: -1
    }, this.objects = [], this.curveGroups = [], this.scene = null, t && (this.url = t, this.connect(this.url));
  }
  connect(t) {
    this.url = t, this.ws = new WebSocket(this.url), this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = (e) => {
      console.error(e), this.emitEvent("error");
    };
  }
  syncJsonScene(t) {
    const e = new XMLHttpRequest();
    e.onreadystatechange = () => {
      e.readyState == 4 && e.status == 200 && this.onSyncScene(JSON.parse(e.response));
    }, e.open("GET", t), e.send();
  }
  onSyncScene(t) {
    this.frame.start = t.frame.start, this.frame.end = t.frame.end, this.curveGroups.length = 0, this.objects.length = 0;
    const e = Object.keys(t.animations);
    for (let i = 0; i < e.length; i++) {
      const r = e[i], h = new j(r);
      t.animations[r].forEach((f) => {
        const l = new Z();
        l.set(f.keyframes.map((n) => new Q(n.c, n.h_l, n.h_r, n.i))), h.setFCurve(l, f.axis);
      }), this.curveGroups.push(h);
    }
    this.scene = t.scene, this.objects.length = 0;
    const s = (i) => {
      this.objects.push(i), i.children.forEach((r) => s(r));
    };
    s(this.scene), this.emitEvent("sync/scene", [this]);
  }
  onSyncTimeline(t) {
    this.frame = t, this.emitEvent("sync/timeline", [this.frame]);
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
  getCurveGroup(t) {
    return this.curveGroups.find((e) => e.name == t);
  }
  dispose() {
    this.disposeWS();
  }
  disposeWS() {
    this.ws && (this.ws.close(), this.ws.onmessage = null, this.ws.onclose = null, this.ws.onopen = null, this.connected = !1);
  }
}
export {
  st as BLidge,
  I as Bezier,
  Y as CubeGeometry,
  K as CylinderGeometry,
  tt as ECS,
  C as Easings,
  Z as FCurve,
  j as FCurveGroup,
  Q as FCurveKeyFrame,
  G as GLPowerBuffer,
  k as GLPowerFrameBuffer,
  D as GLPowerProgram,
  X as GLPowerTexture,
  P as GLPowerVAO,
  B as Geometry,
  N as Matrix,
  $ as MipMapGeometry,
  q as PlaneGeometry,
  H as Power,
  W as Quaternion,
  J as SphereGeometry,
  et as System,
  z as Vector
};
//# sourceMappingURL=glpower.js.map
