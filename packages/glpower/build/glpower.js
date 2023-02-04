class O {
  constructor(t, e) {
    this.gl = t, this.program = e, this.vao = this.gl.createVertexArray(), this.attributes = /* @__PURE__ */ new Map(), this.indexBuffer = null, this.vertCount = 0, this.indexCount = 0, this.instanceCount = 0;
  }
  setAttribute(t, e, i, s) {
    const r = this.attributes.get(t), h = e.array ? e.array.length / i : 0;
    return this.attributes.set(t, {
      ...r,
      buffer: e,
      size: i,
      count: h,
      ...s,
      location: void 0
    }), this.updateAttributes(), this;
  }
  removeAttribute(t) {
    return this.attributes.delete(t), this;
  }
  updateAttributes(t) {
    !this.vao || (this.vertCount = 0, this.instanceCount = 0, this.gl.bindVertexArray(this.vao), this.attributes.forEach((e, i) => {
      (e.location === void 0 || t) && (e.location = this.gl.getAttribLocation(this.program, i), e.location > -1 && (this.gl.bindBuffer(this.gl.ARRAY_BUFFER, e.buffer.buffer), this.gl.enableVertexAttribArray(e.location), this.gl.vertexAttribPointer(e.location, e.size, this.gl.FLOAT, !1, 0, 0), e.instanceDivisor !== void 0 && this.gl.vertexAttribDivisor(e.location, e.instanceDivisor))), this.vertCount = Math.max(this.vertCount, e.count), e.instanceDivisor !== void 0 && e.instanceDivisor > 0 && (this.instanceCount == 0 ? this.instanceCount = e.count : this.instanceCount = Math.min(this.instanceCount, e.count));
    }), this.gl.bindVertexArray(null));
  }
  setIndex(t) {
    this.indexBuffer = t, this.vao && (this.gl.bindVertexArray(this.vao), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer ? this.indexBuffer.buffer : null), this.gl.bindVertexArray(null), this.indexBuffer && this.indexBuffer.array && (this.indexCount = this.indexBuffer.array.length));
  }
  use(t) {
    this.gl.bindVertexArray(this.vao), t && t(this), this.gl.bindVertexArray(null);
  }
  getVAO() {
    return this.vao;
  }
}
class P {
  constructor(t) {
    this.gl = t, this.program = this.gl.createProgram(), this.vao = /* @__PURE__ */ new Map(), this.uniforms = /* @__PURE__ */ new Map();
  }
  setShader(t, e, i) {
    if (this.program === null) {
      console.warn("program is null.");
      return;
    }
    const s = this.createShader(t, this.gl.VERTEX_SHADER), r = this.createShader(e, this.gl.FRAGMENT_SHADER);
    if (!(!s || !r))
      return this.gl.attachShader(this.program, s), this.gl.attachShader(this.program, r), i && i.transformFeedbackVaryings && this.gl.transformFeedbackVaryings(this.program, i.transformFeedbackVaryings, this.gl.SEPARATE_ATTRIBS), this.gl.linkProgram(this.program), this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS) || console.error("program link error:", this.gl.getProgramInfoLog(this.program)), this;
  }
  createShader(t, e) {
    const i = this.gl.createShader(e);
    return i ? (this.gl.shaderSource(i, t), this.gl.compileShader(i), this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS) ? i : (console.error(this.gl.getShaderInfoLog(i)), null)) : null;
  }
  setUniform(t, e, i) {
    const s = this.uniforms.get(t);
    if (s)
      if (s.type = e, s.value = i, s.cache) {
        for (let r = 0; r < i.length; r++)
          if (s.cache[r] !== i[r]) {
            s.needsUpdate = !0;
            break;
          }
      } else
        s.needsUpdate = !0;
    else
      this.uniforms.set(t, {
        value: i,
        type: e,
        location: null,
        needsUpdate: !0
      }), this.updateUniformLocations();
  }
  updateUniformLocations(t) {
    !this.program || this.uniforms.forEach((e, i) => {
      (e.location === null || t) && (e.location = this.gl.getUniformLocation(this.program, i));
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
  use(t) {
    !this.program || (this.gl.useProgram(this.program), t && t(this), this.gl.useProgram(null));
  }
  getProgram() {
    return this.program;
  }
}
class L {
  constructor(t) {
    this.gl = t, this.buffer = this.gl.createBuffer(), this.array = null;
  }
  setData(t, e = "vbo", i) {
    const s = e == "vbo" ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER;
    return this.gl.bindBuffer(s, this.buffer), this.gl.bufferData(s, t, i || this.gl.STATIC_DRAW), this.gl.bindBuffer(s, null), this.array = t, this;
  }
}
class F {
  constructor(t, e, i, s) {
    this.x = t || 0, this.y = e || 0, this.z = i || 0, this.w = s || 0;
  }
  get isVector() {
    return !0;
  }
  set(t, e, i, s) {
    return this.x = t, this.y = e != null ? e : this.y, this.z = i != null ? i : this.z, this.w = s != null ? s : this.w, this;
  }
  add(t) {
    var e, i, s, r;
    return typeof t == "number" ? (this.x += t, this.y += t, this.z += t, this.w += t) : (this.x += (e = t.x) != null ? e : 0, this.y += (i = t.y) != null ? i : 0, this.z += (s = t.z) != null ? s : 0, this.w += (r = t.w) != null ? r : 0), this;
  }
  sub(t) {
    var e, i, s, r;
    return typeof t == "number" ? (this.x -= t, this.y -= t, this.z -= t) : (this.x -= (e = t.x) != null ? e : 0, this.y -= (i = t.y) != null ? i : 0, this.z -= (s = t.z) != null ? s : 0, this.w -= (r = t.w) != null ? r : 0), this;
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
    const e = this.x, i = this.y, s = this.z, r = t.x, h = t.y, u = t.z;
    return this.x = i * u - s * h, this.y = s * r - e * u, this.z = e * h - i * r, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  applyMatrix3(t) {
    const e = t.elm, i = e[0], s = e[1], r = e[2], h = e[4], u = e[5], l = e[6], o = e[8], c = e[9], a = e[10], m = this.x * i + this.y * h + this.z * o, g = this.x * s + this.y * u + this.z * c, p = this.x * r + this.y * l + this.z * a;
    this.x = m, this.y = g, this.z = p, this.w = 0;
  }
  applyMatrix4(t) {
    const e = t.elm, i = e[0], s = e[1], r = e[2], h = e[3], u = e[4], l = e[5], o = e[6], c = e[7], a = e[8], m = e[9], g = e[10], p = e[11], y = e[12], d = e[13], E = e[14], n = e[15], b = this.x * i + this.y * u + this.z * a + this.w * y, A = this.x * s + this.y * l + this.z * m + this.w * d, x = this.x * r + this.y * o + this.z * g + this.w * E, R = this.x * h + this.y * c + this.z * p + this.w * n;
    return this.x = b, this.y = A, this.z = x, this.w = R, this;
  }
  copy(t) {
    var e, i, s, r;
    return this.x = (e = t.x) != null ? e : 0, this.y = (i = t.y) != null ? i : 0, this.z = (s = t.z) != null ? s : 0, this.w = (r = t.w) != null ? r : 0, this;
  }
  clone() {
    return new F(this.x, this.y, this.z, this.w);
  }
  getElm(t) {
    return t == "vec2" ? [this.x, this.y] : t == "vec3" ? [this.x, this.y, this.z] : [this.x, this.y, this.z, this.w];
  }
}
class k {
  constructor(t) {
    this.gl = t, this.image = null, this.unit = 0, this.size = new F(), this.texture = this.gl.createTexture(), this._setting = {
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
    const i = new Image();
    return i.onload = () => {
      this.attach(i), e && e();
    }, i.src = t, this;
  }
  getTexture() {
    return this.texture;
  }
  loadAsync(t) {
    return new Promise((e, i) => {
      const s = new Image();
      s.onload = () => {
        this.attach(s), e(this);
      }, s.onerror = () => {
        i("img error, " + t);
      }, s.src = t;
    });
  }
}
class X {
  constructor(t) {
    this.gl = t, this.size = new F(1, 1), this.frameBuffer = this.gl.createFramebuffer(), this.depthRenderBuffer = this.gl.createRenderbuffer(), this.textures = [], this.textureAttachmentList = [], this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
  }
  setTexture(t) {
    return this.textures = t, this.textureAttachmentList.length = 0, this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.textures.forEach((e, i) => {
      e.attach({ width: this.size.x, height: this.size.y }), this.gl.bindTexture(this.gl.TEXTURE_2D, e.getTexture()), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.bindTexture(this.gl.TEXTURE_2D, null);
      const s = this.gl.COLOR_ATTACHMENT0 + i;
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, s, this.gl.TEXTURE_2D, e.getTexture(), 0), this.textureAttachmentList.push(s);
    }), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this;
  }
  setSize(t, e) {
    typeof t == "number" ? (this.size.x = t, e !== void 0 && (this.size.y = e)) : this.size.copy(t), this.setTexture(this.textures), this.textures.forEach((i) => {
      i.attach({ width: this.size.x, height: this.size.y });
    }), this.depthRenderBuffer && (this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthRenderBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT32F, this.size.x, this.size.y), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null));
  }
  getFrameBuffer() {
    return this.frameBuffer;
  }
}
class Q {
  constructor(t) {
    this.gl = t, this.gl.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), this.gl.getExtension("EXT_color_buffer_float"), this.gl.getExtension("EXT_color_buffer_half_float");
  }
  createProgram() {
    return new P(this.gl);
  }
  createBuffer() {
    return new L(this.gl);
  }
  createTexture() {
    return new k(this.gl);
  }
  createFrameBuffer() {
    return new X(this.gl);
  }
}
class H {
  constructor(t) {
    this.gl = t, this.transformFeedback = this.gl.createTransformFeedback(), this.feedbackBuffer = /* @__PURE__ */ new Map();
  }
  bind(t) {
    this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback), t && t(), this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);
  }
  setBuffer(t, e, i) {
    this.feedbackBuffer.set(t, {
      buffer: e,
      varyingIndex: i
    });
  }
  use(t) {
    this.bind(() => {
      this.feedbackBuffer.forEach((e) => {
        this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, e.varyingIndex, e.buffer.buffer);
      }), t && t(this), this.feedbackBuffer.forEach((e) => {
        this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, e.varyingIndex, null);
      });
    });
  }
}
class D {
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
    return new D().copy(this);
  }
  copy(t) {
    return this.set(t.elm), this;
  }
  perspective(t, e, i, s) {
    var r = 1 / Math.tan(t * Math.PI / 360), h = s - i;
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
      -(s + i) / h,
      -1,
      0,
      0,
      -(s * i * 2) / h,
      0
    ], this;
  }
  orthographic(t, e, i, s) {
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
      -2 / (s - i),
      0,
      0,
      0,
      -(s + i) / (s - i),
      1
    ], this;
  }
  lookAt(t, e, i) {
    const s = t.clone().sub(e).normalize(), r = i.clone().cross(s).normalize(), h = s.clone().cross(r).normalize();
    return this.elm = [
      r.x,
      h.x,
      s.x,
      0,
      r.y,
      h.y,
      s.y,
      0,
      r.z,
      h.z,
      s.z,
      0,
      -t.dot(r),
      -t.dot(h),
      -t.dot(s),
      1
    ], this;
  }
  inverse() {
    const t = this.elm[0], e = this.elm[1], i = this.elm[2], s = this.elm[3], r = this.elm[4], h = this.elm[5], u = this.elm[6], l = this.elm[7], o = this.elm[8], c = this.elm[9], a = this.elm[10], m = this.elm[11], g = this.elm[12], p = this.elm[13], y = this.elm[14], d = this.elm[15], E = t * h - e * r, n = t * u - i * r, b = t * l - s * r, A = e * u - i * h, x = e * l - s * h, R = i * l - s * u, _ = o * p - c * g, v = o * y - a * g, z = o * d - m * g, B = c * y - a * p, M = c * d - m * p, w = a * d - m * y, N = E * w - n * M + b * B + A * z - x * v + R * _, T = 1 / N;
    return N == 0 ? this.identity() : (this.elm[0] = (h * w - u * M + l * B) * T, this.elm[1] = (-e * w + i * M - s * B) * T, this.elm[2] = (p * R - y * x + d * A) * T, this.elm[3] = (-c * R + a * x - m * A) * T, this.elm[4] = (-r * w + u * z - l * v) * T, this.elm[5] = (t * w - i * z + s * v) * T, this.elm[6] = (-g * R + y * b - d * n) * T, this.elm[7] = (o * R - a * b + m * n) * T, this.elm[8] = (r * M - h * z + l * _) * T, this.elm[9] = (-t * M + e * z - s * _) * T, this.elm[10] = (g * x - p * b + d * E) * T, this.elm[11] = (-o * x + c * b - m * E) * T, this.elm[12] = (-r * B + h * v - u * _) * T, this.elm[13] = (t * B - e * v + i * _) * T, this.elm[14] = (-g * A + p * n - y * E) * T, this.elm[15] = (o * A - c * n + a * E) * T, this);
  }
  transpose() {
    const t = this.elm[0], e = this.elm[1], i = this.elm[2], s = this.elm[3], r = this.elm[4], h = this.elm[5], u = this.elm[6], l = this.elm[7], o = this.elm[8], c = this.elm[9], a = this.elm[10], m = this.elm[11], g = this.elm[12], p = this.elm[13], y = this.elm[14], d = this.elm[15];
    return this.elm[0] = t, this.elm[1] = r, this.elm[2] = o, this.elm[3] = g, this.elm[4] = e, this.elm[5] = h, this.elm[6] = c, this.elm[7] = p, this.elm[8] = i, this.elm[9] = u, this.elm[10] = a, this.elm[11] = y, this.elm[12] = s, this.elm[13] = l, this.elm[14] = m, this.elm[15] = d, this;
  }
  set(t) {
    var e;
    for (let i = 0; i < this.elm.length; i++)
      this.elm[i] = (e = t[i]) != null ? e : 0;
    return this;
  }
  setFromTransform(t, e, i) {
    return this.identity(), this.applyPosition(t), this.applyQuaternion(e), this.applyScale(i), this;
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
    const e = t.x, i = t.y, s = t.z, r = t.w, h = e * e, u = i * i, l = s * s, o = r * r, c = e * i, a = e * s, m = e * r, g = i * s, p = i * r, y = s * r;
    return this.matmul([
      h - u - l + o,
      2 * (c + y),
      2 * (a - p),
      0,
      2 * (c - y),
      -h + u - l + o,
      2 * (g + m),
      0,
      2 * (a + p),
      2 * (g - m),
      -h - u + l + o,
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
    for (let i = 0; i < 4; i++)
      for (let s = 0; s < 4; s++) {
        let r = 0;
        for (let h = 0; h < 4; h++)
          r += this.elm[h * 4 + s] * t[h + i * 4];
        e[s + i * 4] = r;
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
class j {
  constructor(t, e, i, s) {
    this.x = 0, this.y = 0, this.z = 0, this.w = 1, this.set(t, e, i, s);
  }
  set(t, e, i, s) {
    this.x = t != null ? t : this.x, this.y = e != null ? e : this.y, this.z = i != null ? i : this.z, this.w = s != null ? s : this.w;
  }
  euler(t, e = "XYZ") {
    const i = Math.sin(t.x / 2), s = Math.sin(t.y / 2), r = Math.sin(t.z / 2), h = Math.cos(t.x / 2), u = Math.cos(t.y / 2), l = Math.cos(t.z / 2);
    return e == "XYZ" ? (this.x = h * s * r + i * u * l, this.y = -i * u * r + h * s * l, this.z = h * u * r + i * s * l, this.w = -i * s * r + h * u * l) : e == "XZY" ? (this.x = -h * s * r + i * u * l, this.y = h * s * l - i * u * r, this.z = i * s * l + h * u * r, this.w = i * s * r + h * u * l) : e == "YZX" ? (this.x = i * u * l + h * s * r, this.y = i * u * r + h * s * l, this.z = -i * s * l + h * u * r, this.w = -i * s * r + h * u * l) : e == "ZYX" && (this.x = i * u * l - h * s * r, this.y = i * u * r + h * s * l, this.z = -i * s * l + h * u * r, this.w = i * s * r + h * u * l), this;
  }
  multiply() {
  }
}
class C {
  constructor() {
    this.count = 0, this.attributes = {};
  }
  setAttribute(t, e, i) {
    this.attributes[t] = {
      array: e,
      size: i
    }, this.updateVertCount();
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  updateVertCount() {
    const t = Object.keys(this.attributes);
    this.count = t.length > 0 ? 1 / 0 : 0, t.forEach((e) => {
      const i = this.attributes[e];
      e != "index" && (this.count = Math.min(i.array.length / i.size, this.count));
    });
  }
  getAttributeBuffer(t, e, i, s = "vbo") {
    const r = this.getAttribute(e);
    return {
      buffer: t.createBuffer().setData(new i(r.array), s),
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
class W extends C {
  constructor(t = 1, e = 1, i = 1) {
    super();
    const s = t / 2, r = e / 2, h = i / 2, u = [
      -s,
      r,
      h,
      s,
      r,
      h,
      -s,
      -r,
      h,
      s,
      -r,
      h,
      s,
      r,
      -h,
      -s,
      r,
      -h,
      s,
      -r,
      -h,
      -s,
      -r,
      -h,
      s,
      r,
      h,
      s,
      r,
      -h,
      s,
      -r,
      h,
      s,
      -r,
      -h,
      -s,
      r,
      -h,
      -s,
      r,
      h,
      -s,
      -r,
      -h,
      -s,
      -r,
      h,
      -s,
      r,
      -h,
      s,
      r,
      -h,
      -s,
      r,
      h,
      s,
      r,
      h,
      -s,
      -r,
      h,
      s,
      -r,
      h,
      -s,
      -r,
      -h,
      s,
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
    ], o = [], c = [];
    for (let a = 0; a < 6; a++) {
      o.push(
        0,
        1,
        1,
        1,
        0,
        0,
        1,
        0
      );
      const m = 4 * a;
      c.push(
        0 + m,
        2 + m,
        1 + m,
        1 + m,
        2 + m,
        3 + m
      );
    }
    this.setAttribute("position", u, 3), this.setAttribute("normal", l, 3), this.setAttribute("uv", o, 2), this.setAttribute("index", c, 1);
  }
}
class Y extends C {
  constructor(t = 0.5, e = 0.5, i = 1, s = 10, r = 1) {
    super();
    const h = [], u = [], l = [], o = [];
    for (let c = 0; c <= r + 2; c++)
      for (let a = 0; a < s; a++) {
        const m = Math.PI * 2 / s * a;
        if (c <= r) {
          const g = c / r, p = (1 - g) * e + g * t, y = Math.cos(m) * p, d = -(i / 2) + i / r * c, E = Math.sin(m) * p;
          h.push(y, d, E), l.push(
            a / s,
            c / r
          );
          const n = new F(Math.cos(m), 0, Math.sin(m)).normalize();
          u.push(
            n.x,
            n.y,
            n.z
          ), c < r && o.push(
            c * s + a,
            (c + 1) * s + (a + 1) % s,
            c * s + (a + 1) % s,
            c * s + a,
            (c + 1) * s + a,
            (c + 1) * s + (a + 1) % s
          );
        } else {
          const g = c - r - 1, p = g ? t : e, y = Math.cos(m) * p, d = -(i / 2) + i * g, E = Math.sin(m) * p;
          h.push(y, d, E), l.push(
            (y + p) * 0.5 / p,
            (E + p) * 0.5 / p
          ), u.push(0, -1 + g * 2, 0);
          const n = s * (r + (g + 1));
          a <= s - 2 && (g == 0 ? o.push(
            n,
            n + a,
            n + a + 1
          ) : o.push(
            n,
            n + a + 1,
            n + a
          ));
        }
      }
    this.setAttribute("position", h, 3), this.setAttribute("normal", u, 3), this.setAttribute("uv", l, 2), this.setAttribute("index", o, 1);
  }
}
class K extends C {
  constructor(t = 1, e = 1, i = 1, s = 1) {
    super();
    const r = t / 2, h = e / 2, u = [], l = [], o = [], c = [];
    for (let a = 0; a <= s; a++)
      for (let m = 0; m <= i; m++) {
        const g = m / i, p = a / i;
        if (u.push(
          -r + t * g,
          -h + e * p,
          0
        ), o.push(g, p), l.push(0, 0, 1), a > 0 && m > 0) {
          const y = i + 1, d = y * a + m, E = y * (a - 1) + m - 1;
          c.push(
            d,
            y * a + m - 1,
            E,
            d,
            E,
            y * (a - 1) + m
          );
        }
      }
    this.setAttribute("position", u, 3), this.setAttribute("normal", l, 3), this.setAttribute("uv", o, 2), this.setAttribute("index", c, 1);
  }
}
class q extends C {
  constructor(t = 0.5, e = 20, i = 10) {
    super();
    const s = [], r = [], h = [], u = [];
    for (let l = 0; l <= i; l++) {
      const o = l / i * Math.PI, c = (l != 0 && l != i, e);
      for (let a = 0; a < c; a++) {
        const m = a / c * Math.PI * 2, g = Math.sin(o) * t, p = Math.cos(m) * g, y = -Math.cos(o) * t, d = -Math.sin(m) * g;
        s.push(p, y, d), h.push(
          a / c,
          l / i
        );
        const E = new F(p, y, d).normalize();
        r.push(E.x, E.y, E.z), u.push(
          l * e + a,
          l * e + (a + 1) % e,
          (l + 1) * e + (a + 1) % e,
          l * e + a,
          (l + 1) * e + (a + 1) % e,
          (l + 1) * e + a
        );
      }
    }
    this.setAttribute("position", s, 3), this.setAttribute("normal", r, 3), this.setAttribute("uv", h, 2), this.setAttribute("index", u, 1);
  }
  setAttribute(t, e, i) {
    t == "index" && e.forEach((s, r) => {
      e[r] = s % this.count;
    }), super.setAttribute(t, e, i);
  }
}
class J extends C {
  constructor(t = 7) {
    super(), this.count = t;
    const e = [], i = [], s = [], r = new F(0, 0);
    let h = 1;
    for (let u = 0; u < t; u++) {
      e.push(-1 + r.x, 1 + r.y, 0), e.push(-1 + r.x + h, 1 + r.y, 0), e.push(-1 + r.x + h, 1 + r.y - h, 0), e.push(-1 + r.x, 1 + r.y - h, 0), i.push(0, 1), i.push(1, 1), i.push(1, 0), i.push(0, 0);
      const l = (u + 0) * 4;
      s.push(l + 0, l + 2, l + 1, l + 0, l + 3, l + 2), r.x += h, r.y = r.y - h, h *= 0.5;
    }
    this.setAttribute("position", e, 3), this.setAttribute("uv", i, 2), this.setAttribute("index", s, 1);
  }
}
class $ {
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
    const i = t.entities.findIndex((s) => s == e);
    i > -1 && t.entities.slice(i, 1), t.components.forEach((s) => {
      s[e] = void 0;
    });
  }
  addComponent(t, e, i, s) {
    let r = t.components.get(i);
    return r === void 0 && (r = [], t.components.set(i, r)), r.length < e + 1 && (r.length = e + 1), r[e] = s, s;
  }
  removeComponent(t, e, i) {
    const s = t.components.get(i);
    s && s.length > e && (s[e] = void 0);
  }
  getComponent(t, e, i) {
    const s = t.components.get(i);
    return s !== void 0 ? s[e] : null;
  }
  addSystem(t, e, i) {
    t.systems.set(e, i);
  }
  removeSystem(t, e) {
    t.systems.delete(e);
  }
  update(t) {
    const e = new Date().getTime(), i = (e - this.lastUpdateTime) / 1e3;
    this.time += i, this.lastUpdateTime = e, t.systems.forEach((r) => {
      r.update({
        world: t,
        deltaTime: i,
        time: this.time,
        ecs: this
      });
    });
  }
  getEntities(t, e) {
    return t.entities.filter((s) => {
      for (let r = 0; r < e.length; r++) {
        const h = e[r], u = t.components.get(h);
        if (u === void 0 || u[s] === void 0)
          return !1;
      }
      return !0;
    });
  }
}
class U {
  constructor() {
    this.listeners = [];
  }
  on(t, e) {
    this.listeners.push({
      event: t,
      cb: e
    });
  }
  once(t, e) {
    this.listeners.push({
      event: t,
      cb: e,
      once: !0
    });
  }
  off(t, e) {
    this.listeners = this.listeners.filter((i) => !(i.event == t && i.cb == e));
  }
  emit(t, e) {
    const i = this.listeners.concat();
    for (let s = 0; s < i.length; s++) {
      const r = i[s];
      r.event == t && (r.cb.apply(this, e || []), r.once && this.off(t, r.cb));
    }
  }
}
class tt extends U {
  constructor(t, e) {
    if (super(), this.ecs = t, this.queries = [], e) {
      const i = Object.keys(e);
      for (let s = 0; s < i.length; s++) {
        const r = i[s];
        this.queries.push({ name: r, query: e[r] });
      }
    }
  }
  update(t) {
    for (let e = 0; e < this.queries.length; e++) {
      const i = this.queries[e], s = t.ecs.getEntities(t.world, i.query);
      this.beforeUpdateImpl(i.name, t, s);
      for (let r = 0; r < s.length; r++)
        this.updateImpl(i.name, s[r], t);
      this.afterUpdateImpl(i.name, t);
    }
  }
  beforeUpdateImpl(t, e, i) {
  }
  updateImpl(t, e, i) {
  }
  afterUpdateImpl(t, e) {
  }
  dispose() {
    this.emit("dispose");
  }
}
var I;
((f) => {
  f.NEWTON_ITERATIONS = 4, f.NEWTON_MIN_SLOPE = 1e-3, f.SUBDIVISION_PRECISION = 1e-7, f.SUBDIVISION_MAX_ITERATIONS = 10, f.BEZIER_EASING_CACHE_SIZE = 11, f.BEZIER_EASING_SAMPLE_STEP_SIZE = 1 / f.BEZIER_EASING_CACHE_SIZE;
  function t(o) {
    return -o.p0 + 3 * o.p1 - 3 * o.p2 + o.p3;
  }
  function e(o) {
    return 3 * o.p0 - 6 * o.p1 + 3 * o.p2;
  }
  function i(o) {
    return -3 * o.p0 + 3 * o.p1;
  }
  function s(o, c) {
    return 3 * t(o) * c * c + 2 * e(o) * c + i(o);
  }
  f.calcBezierSlope = s;
  function r(o, c) {
    return ((t(o) * c + e(o)) * c + i(o)) * c + o.p0;
  }
  f.calcBezier = r;
  function h(o, c, a, m) {
    let g = 0, p = 0;
    for (let y = 0; y < f.SUBDIVISION_MAX_ITERATIONS; y++)
      p = c + (a - c) / 2, g = r(m, p), g > o ? a = p : c = p;
    return p;
  }
  function u(o, c, a) {
    for (let m = 0; m < f.NEWTON_ITERATIONS; m++) {
      const g = s(c, a);
      if (g == 0)
        return a;
      a -= (r(c, a) - o) / g;
    }
    return a;
  }
  function l(o, c, a) {
    o.p1 = Math.max(o.p0, Math.min(o.p3, o.p1)), o.p2 = Math.max(o.p0, Math.min(o.p3, o.p2));
    let m = 0;
    for (let y = 1; y < a.length && (m = y - 1, !(c < a[y])); y++)
      ;
    const g = m / (f.BEZIER_EASING_CACHE_SIZE - 1), p = s(o, g) / (o.p3 - o.p0);
    return p == 0 ? g : p > 0.01 ? u(c, o, g) : h(c, g, g + f.BEZIER_EASING_SAMPLE_STEP_SIZE, o);
  }
  f.getBezierTfromX = l;
})(I || (I = {}));
var S;
((f) => {
  function t(n = 6) {
    return (b) => {
      var A = Math.exp(-n * (2 * b - 1)), x = Math.exp(-n);
      return (1 + (1 - A) / (1 + A) * (1 + x) / (1 - x)) / 2;
    };
  }
  f.sigmoid = t;
  function e(n, b, A) {
    const x = Math.max(0, Math.min(1, (A - n) / (b - n)));
    return x * x * (3 - 2 * x);
  }
  f.smoothstep = e;
  function i(n) {
    return n;
  }
  f.linear = i;
  function s(n) {
    return n * n;
  }
  f.easeInQuad = s;
  function r(n) {
    return n * (2 - n);
  }
  f.easeOutQuad = r;
  function h(n) {
    return n < 0.5 ? 2 * n * n : -1 + (4 - 2 * n) * n;
  }
  f.easeInOutQuad = h;
  function u(n) {
    return n * n * n;
  }
  f.easeInCubic = u;
  function l(n) {
    return --n * n * n + 1;
  }
  f.easeOutCubic = l;
  function o(n) {
    return n < 0.5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
  }
  f.easeInOutCubic = o;
  function c(n) {
    return n * n * n * n;
  }
  f.easeInQuart = c;
  function a(n) {
    return 1 - --n * n * n * n;
  }
  f.easeOutQuart = a;
  function m(n) {
    return n < 0.5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
  }
  f.easeInOutQuart = m;
  function g(n) {
    return n * n * n * n * n;
  }
  f.easeInQuint = g;
  function p(n) {
    return 1 + --n * n * n * n * n;
  }
  f.easeOutQuint = p;
  function y(n) {
    return n < 0.5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
  }
  f.easeInOutQuint = y;
  function d(n, b, A, x) {
    for (var R = new Array(I.BEZIER_EASING_CACHE_SIZE), _ = 0; _ < I.BEZIER_EASING_CACHE_SIZE; ++_)
      R[_] = I.calcBezier({ p0: n.x, p1: b.x, p2: A.x, p3: x.x }, _ / (I.BEZIER_EASING_CACHE_SIZE - 1));
    return (v) => v <= n.x ? n.y : x.x <= v ? x.y : I.calcBezier({ p0: n.y, p1: b.y, p2: A.y, p3: x.y }, I.getBezierTfromX({ p0: n.x, p1: b.x, p2: A.x, p3: x.x }, v, R));
  }
  f.bezier = d;
  function E(n, b, A, x) {
    return d(
      { x: 0, y: 0 },
      { x: n, y: b },
      { x: A, y: x },
      { x: 1, y: 1 }
    );
  }
  f.cubicBezier = E;
})(S || (S = {}));
class G extends U {
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
    for (let i = 0; i < this.keyframes.length && this.keyframes[i].coordinate.x < t.coordinate.x; i++)
      e++;
    this.keyframes.splice(e, 0, t), this.frameStart = this.keyframes[0].coordinate.x, this.frameEnd = this.keyframes[this.keyframes.length - 1].coordinate.x;
  }
  getValue(t) {
    if (t == this.cache.frame)
      return this.cache.value;
    let e = null;
    for (let i = 0; i < this.keyframes.length; i++) {
      const s = this.keyframes[i];
      if (t <= s.coordinate.x) {
        const r = this.keyframes[i - 1];
        r ? e = r.to(s, t) : e = s.coordinate.y;
        break;
      }
    }
    return e === null && this.keyframes.length > 0 && (e = this.keyframes[this.keyframes.length - 1].coordinate.y), e !== null ? (this.cache = {
      frame: t,
      value: e
    }, e) : 0;
  }
}
class V extends U {
  constructor(t, e, i, s, r) {
    super(), this.updatedFrame = -1, this.name = t || "", this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.curves = /* @__PURE__ */ new Map(), this.value = new F(), e && this.setFCurve(e, "x"), i && this.setFCurve(i, "y"), s && this.setFCurve(s, "z"), r && this.setFCurve(r, "w");
  }
  setFCurve(t, e) {
    this.curves.set(e, t);
    let i = 1 / 0, s = -1 / 0;
    this.curves.forEach((r) => {
      r.frameStart < i && (i = r.frameStart), r.frameEnd > s && (s = r.frameEnd);
    }), (i == -1 / 0 || s == 1 / 0) && (i = 0, s = 1), this.frameStart = i, this.frameEnd = s, this.frameDuration = this.frameEnd - this.frameStart;
  }
  getFCurve(t) {
    return this.curves.get(t) || null;
  }
  setFrame(t) {
    if (t == this.updatedFrame)
      return this;
    const e = this.curves.get("x"), i = this.curves.get("y"), s = this.curves.get("z"), r = this.curves.get("w");
    return e && (this.value.x = e.getValue(t)), i && (this.value.y = i.getValue(t)), s && (this.value.z = s.getValue(t)), r && (this.value.w = r.getValue(t)), this.updatedFrame = t, this;
  }
}
class Z extends U {
  constructor(t, e, i, s) {
    super(), this.coordinate = { x: 0, y: 0 }, this.handleLeft = { x: 0, y: 0 }, this.handleRight = { x: 0, y: 0 }, this.interpolation = "BEZIER", this.easing = null, this.nextFrame = null, this.set(t, e, i, s);
  }
  set(t, e, i, s) {
    this.coordinate = t, this.handleLeft = e || t, this.handleRight = i || t, this.interpolation = s || "BEZIER";
  }
  getEasing(t, e) {
    return t == "BEZIER" ? S.bezier(this.coordinate, this.handleRight, e.handleLeft, e.coordinate) : t == "CONSTANT" ? () => this.coordinate.y : (i) => {
      const s = e.coordinate.y - this.coordinate.y;
      return i = (i - this.coordinate.x) / (e.coordinate.x - this.coordinate.x), this.coordinate.y + i * s;
    };
  }
  to(t, e) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != t.coordinate.x || this.nextFrame.coordinate.y != t.coordinate.y) && (this.easing = this.getEasing(this.interpolation, t), this.nextFrame = t), this.easing ? this.easing(e) : 0;
  }
}
class et extends U {
  constructor(t) {
    super(), this.connected = !1, this.frame = {
      start: -1,
      end: -1,
      current: -1
    }, this.objects = [], this.curveGroups = [], this.scene = null, t && (this.url = t, this.connect(this.url));
  }
  connect(t) {
    this.url = t, this.ws = new WebSocket(this.url), this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = (e) => {
      console.error(e), this.emit("error");
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
    for (let s = 0; s < e.length; s++) {
      const r = e[s], h = new V(r);
      t.animations[r].forEach((u) => {
        const l = new G();
        l.set(u.keyframes.map((o) => new Z(o.c, o.h_l, o.h_r, o.i))), h.setFCurve(l, u.axis);
      }), this.curveGroups.push(h);
    }
    this.scene = t.scene, this.objects.length = 0;
    const i = (s) => {
      this.objects.push(s), s.children.forEach((r) => i(r));
    };
    i(this.scene), this.emit("sync/scene", [this]);
  }
  onSyncTimeline(t) {
    this.frame = t, this.emit("sync/timeline", [this.frame]);
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
  et as BLidge,
  I as Bezier,
  W as CubeGeometry,
  Y as CylinderGeometry,
  $ as ECS,
  S as Easings,
  U as EventEmitter,
  G as FCurve,
  V as FCurveGroup,
  Z as FCurveKeyFrame,
  L as GLPowerBuffer,
  X as GLPowerFrameBuffer,
  P as GLPowerProgram,
  k as GLPowerTexture,
  H as GLPowerTransformFeedback,
  O as GLPowerVAO,
  C as Geometry,
  D as Matrix,
  J as MipMapGeometry,
  K as PlaneGeometry,
  Q as Power,
  j as Quaternion,
  q as SphereGeometry,
  tt as System,
  F as Vector
};
//# sourceMappingURL=glpower.js.map
