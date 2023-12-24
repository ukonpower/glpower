class L {
  constructor(t, e) {
    this.gl = t, this.program = e, this.vao = this.gl.createVertexArray(), this.attributes = /* @__PURE__ */ new Map(), this.indexBuffer = null, this.vertCount = 0, this.indexCount = 0, this.instanceCount = 0;
  }
  setAttribute(t, e, i, s) {
    const r = this.attributes.get(t), l = e.array ? e.array.length / i : 0;
    return this.attributes.set(t, {
      ...r,
      buffer: e,
      size: i,
      count: l,
      ...s,
      location: void 0
    }), this.updateAttributes(), this;
  }
  removeAttribute(t) {
    return this.attributes.delete(t), this;
  }
  updateAttributes(t) {
    !this.vao || (this.vertCount = 0, this.instanceCount = 0, this.gl.bindVertexArray(this.vao), this.attributes.forEach((e, i) => {
      (e.location === void 0 || t) && (e.location = this.gl.getAttribLocation(this.program, i), e.location > -1 && (this.gl.bindBuffer(this.gl.ARRAY_BUFFER, e.buffer.buffer), this.gl.enableVertexAttribArray(e.location), this.gl.vertexAttribPointer(e.location, e.size, this.gl.FLOAT, !1, 0, 0), e.instanceDivisor !== void 0 && this.gl.vertexAttribDivisor(e.location, e.instanceDivisor))), e.instanceDivisor == null && i != "index" && (this.vertCount = Math.max(this.vertCount, e.count)), e.instanceDivisor !== void 0 && e.instanceDivisor > 0 && (this.instanceCount == 0 ? this.instanceCount = e.count : this.instanceCount = Math.min(this.instanceCount, e.count));
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
  dispose() {
    this.attributes.forEach((t) => {
      t.buffer.dispose();
    });
  }
}
class X {
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
    if (!i)
      return null;
    if (this.gl.shaderSource(i, t), this.gl.compileShader(i), this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS))
      return i;
    if (process.env.NODE_ENV == "development") {
      const s = this.gl.getShaderInfoLog(i);
      if (s) {
        const r = t.split(`
`), l = s.matchAll(/ERROR: 0:(\d+)/g);
        Array.from(l).forEach((a, u) => {
          const h = Number(a[1]), c = Math.max(0, h - 5), f = Math.min(r.length, h + 2);
          let x = s.split(`
`)[u] + `
`;
          r.forEach((g, m) => {
            c <= m && m <= f && (x += `${m + 1}: ${g}
`);
          }), console.error(x);
        });
      }
    }
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
    return e || (e = new L(this.gl, this.program), this.vao.set(t, e), e);
  }
  use(t) {
    !this.program || (this.gl.useProgram(this.program), t && t(this), this.gl.useProgram(null));
  }
  getProgram() {
    return this.program;
  }
  dispose() {
    this.vao.forEach((t) => {
      t.dispose();
    }), this.vao.clear(), this.gl.deleteProgram(this.program);
  }
}
class k {
  constructor(t) {
    this.gl = t, this.buffer = this.gl.createBuffer(), this.array = null;
  }
  setData(t, e = "vbo", i) {
    const s = e == "vbo" ? this.gl.ARRAY_BUFFER : this.gl.ELEMENT_ARRAY_BUFFER;
    return this.gl.bindBuffer(s, this.buffer), this.gl.bufferData(s, t, i || this.gl.STATIC_DRAW), this.gl.bindBuffer(s, null), this.array = t, this;
  }
  dispose() {
    this.gl.deleteBuffer(this.buffer);
  }
}
class w {
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
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  normalize() {
    const t = this.length() || 1;
    return this.x /= t, this.y /= t, this.z /= t, this;
  }
  cross(t) {
    const e = this.x, i = this.y, s = this.z, r = t.x, l = t.y, a = t.z;
    return this.x = i * a - s * l, this.y = s * r - e * a, this.z = e * l - i * r, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  applyMatrix3(t) {
    const e = t.elm, i = e[0], s = e[1], r = e[2], l = e[4], a = e[5], u = e[6], h = e[8], c = e[9], f = e[10], x = this.x * i + this.y * l + this.z * h, g = this.x * s + this.y * a + this.z * c, m = this.x * r + this.y * u + this.z * f;
    this.x = x, this.y = g, this.z = m, this.w = 0;
  }
  applyMatrix4(t) {
    const e = t.elm, i = e[0], s = e[1], r = e[2], l = e[3], a = e[4], u = e[5], h = e[6], c = e[7], f = e[8], x = e[9], g = e[10], m = e[11], E = e[12], _ = e[13], R = e[14], n = e[15], p = this.x * i + this.y * a + this.z * f + this.w * E, y = this.x * s + this.y * u + this.z * x + this.w * _, d = this.x * r + this.y * h + this.z * g + this.w * R, A = this.x * l + this.y * c + this.z * m + this.w * n;
    return this.x = p, this.y = y, this.z = d, this.w = A, this;
  }
  floor() {
    this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w);
  }
  copy(t) {
    var e, i, s, r;
    return this.x = (e = t.x) != null ? e : 0, this.y = (i = t.y) != null ? i : 0, this.z = (s = t.z) != null ? s : 0, this.w = (r = t.w) != null ? r : 0, this;
  }
  clone() {
    return new w(this.x, this.y, this.z, this.w);
  }
  getElm(t) {
    return t == "vec2" ? [this.x, this.y] : t == "vec3" ? [this.x, this.y, this.z] : [this.x, this.y, this.z, this.w];
  }
}
class D {
  constructor(t) {
    this.gl = t, this.image = null, this.unit = 0, this.size = new w(), this.texture = this.gl.createTexture(), this._setting = {
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
    return this.image = t, this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.image ? (this.size.set(this.image.width, this.image.height), this.image instanceof HTMLImageElement || this.image instanceof HTMLCanvasElement ? this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this._setting.format, this._setting.type, this.image) : this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.image.width, this.image.height, 0, this._setting.format, this._setting.type, null)) : (this.size.set(1, 1), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this._setting.internalFormat, this.size.x, this.size.y, 0, this._setting.format, this._setting.type, null)), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter), this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this._setting.wrapS), this.gl.texParameterf(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this._setting.wrapT), this._setting.generateMipmap && this.gl.generateMipmap(this.gl.TEXTURE_2D), this.gl.bindTexture(this.gl.TEXTURE_2D, null), this;
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
  dispose() {
    this.gl.deleteTexture(this.texture);
  }
}
class V {
  constructor(t, e) {
    this.gl = t, this.size = new w(1, 1), this.frameBuffer = this.gl.createFramebuffer(), this.depthTexture = null, this.textures = [], this.textureAttachmentList = [], (!e || !e.disableDepthBuffer) && this.setDepthTexture(new D(this.gl).setting({
      internalFormat: this.gl.DEPTH_COMPONENT32F,
      format: this.gl.DEPTH_COMPONENT,
      type: this.gl.FLOAT,
      magFilter: this.gl.NEAREST,
      minFilter: this.gl.NEAREST
    }));
  }
  setDepthTexture(t) {
    this.depthTexture = t, this.depthTexture && (this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.getTexture(), 0), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null));
  }
  setTexture(t) {
    return this.textures = t, this.textureAttachmentList.length = 0, this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer), this.textures.forEach((e, i) => {
      e.attach({ width: this.size.x, height: this.size.y }), this.gl.bindTexture(this.gl.TEXTURE_2D, e.getTexture()), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.bindTexture(this.gl.TEXTURE_2D, null);
      const s = this.gl.COLOR_ATTACHMENT0 + i;
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, s, this.gl.TEXTURE_2D, e.getTexture(), 0), this.textureAttachmentList.push(s);
    }), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this;
  }
  setSize(t, e) {
    return typeof t == "number" ? (this.size.x = t, e !== void 0 && (this.size.y = e)) : this.size.copy(t), this.size.floor(), this.setTexture(this.textures), this.textures.forEach((i) => {
      i.attach({ width: this.size.x, height: this.size.y });
    }), this.depthTexture && this.depthTexture.attach({ width: this.size.x, height: this.size.y }), this;
  }
  getFrameBuffer() {
    return this.frameBuffer;
  }
  dispose() {
    this.gl.deleteFramebuffer(this.frameBuffer);
  }
}
class Z {
  constructor(t) {
    this.gl = t, this.gl.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), this.gl.getExtension("EXT_color_buffer_float"), this.gl.getExtension("EXT_color_buffer_half_float"), this.extDisJointTimerQuery = this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
  }
  createProgram() {
    return new X(this.gl);
  }
  createBuffer() {
    return new k(this.gl);
  }
  createTexture() {
    return new D(this.gl);
  }
  createFrameBuffer() {
    return new V(this.gl);
  }
}
class G {
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
class Q extends w {
  constructor(t, e, i, s) {
    super(t, e, i, 0), this.order = s || "XYZ";
  }
  copy(t) {
    return "order" in t && (this.order = t.order), super.copy(t);
  }
}
class O {
  constructor(t, e, i, s) {
    this.x = 0, this.y = 0, this.z = 0, this.w = 1, this.set(t, e, i, s);
  }
  set(t, e, i, s) {
    this.x = t != null ? t : this.x, this.y = e != null ? e : this.y, this.z = i != null ? i : this.z, this.w = s != null ? s : this.w;
  }
  setFromEuler(t, e) {
    const i = e || ("order" in t ? t.order : "XYZ"), s = Math.sin(t.x / 2), r = Math.sin(t.y / 2), l = Math.sin(t.z / 2), a = Math.cos(t.x / 2), u = Math.cos(t.y / 2), h = Math.cos(t.z / 2);
    return i == "XYZ" ? (this.x = a * r * l + s * u * h, this.y = -s * u * l + a * r * h, this.z = a * u * l + s * r * h, this.w = -s * r * l + a * u * h) : i == "XZY" ? (this.x = -a * r * l + s * u * h, this.y = a * r * h - s * u * l, this.z = s * r * h + a * u * l, this.w = s * r * l + a * u * h) : i == "YZX" ? (this.x = s * u * h + a * r * l, this.y = s * u * l + a * r * h, this.z = -s * r * h + a * u * l, this.w = -s * r * l + a * u * h) : i == "ZYX" && (this.x = s * u * h - a * r * l, this.y = s * u * l + a * r * h, this.z = -s * r * h + a * u * l, this.w = s * r * l + a * u * h), this;
  }
  setFromMatrix(t) {
    const e = t.elm, i = e[0] + e[5] + e[10];
    let s, r, l, a;
    if (i > 0) {
      const h = Math.sqrt(i + 1) * 2;
      a = 0.25 * h, s = (e[6] - e[9]) / h, r = (e[8] - e[2]) / h, l = (e[1] - e[4]) / h;
    } else if (e[0] > e[5] && e[0] > e[10]) {
      const h = Math.sqrt(1 + e[0] - e[5] - e[10]) * 2;
      a = (e[6] - e[9]) / h, s = 0.25 * h, r = (e[1] + e[4]) / h, l = (e[2] + e[8]) / h;
    } else if (e[5] > e[10]) {
      const h = Math.sqrt(1 + e[5] - e[0] - e[10]) * 2;
      a = (e[8] - e[2]) / h, s = (e[1] + e[4]) / h, r = 0.25 * h, l = (e[6] + e[9]) / h;
    } else {
      const h = Math.sqrt(1 + e[10] - e[0] - e[5]) * 2;
      a = (e[1] - e[4]) / h, s = (e[2] + e[8]) / h, r = (e[6] + e[9]) / h, l = 0.25 * h;
    }
    const u = Math.sqrt(s * s + r * r + l * l + a * a);
    return s /= u, r /= u, l /= u, a /= u, this.x = s, this.y = r, this.z = l, this.w = a, this;
  }
  multiply(t) {
    const e = this.w * t.w - this.x * t.x - this.y * t.y - this.z * t.z, i = this.w * t.x + this.x * t.w + this.y * t.z - this.z * t.y, s = this.w * t.y - this.x * t.z + this.y * t.w + this.z * t.x, r = this.w * t.z + this.x * t.y - this.y * t.x + this.z * t.w;
    return this.set(i, s, r, e), this;
  }
  inverse() {
    return this.set(-this.x, -this.y, -this.z, this.w), this;
  }
  copy(t) {
    var e, i, s, r;
    return this.x = (e = t.x) != null ? e : 0, this.y = (i = t.y) != null ? i : 0, this.z = (s = t.z) != null ? s : 0, this.w = (r = t.w) != null ? r : 0, this;
  }
  clone() {
    return new O(this.x, this.y, this.z, this.w);
  }
}
class P {
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
    return new P().copy(this);
  }
  copy(t) {
    return this.set(t.elm), this;
  }
  perspective(t, e, i, s) {
    var r = 1 / Math.tan(t * Math.PI / 360), l = s - i;
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
      -(s + i) / l,
      -1,
      0,
      0,
      -(s * i * 2) / l,
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
    const s = t.clone().sub(e).normalize(), r = i.clone().cross(s).normalize(), l = s.clone().cross(r).normalize();
    return this.elm = [
      r.x,
      r.y,
      r.z,
      0,
      l.x,
      l.y,
      l.z,
      0,
      s.x,
      s.y,
      s.z,
      0,
      t.x,
      t.y,
      t.z,
      1
    ], this;
  }
  inverse() {
    const t = this.elm[0], e = this.elm[1], i = this.elm[2], s = this.elm[3], r = this.elm[4], l = this.elm[5], a = this.elm[6], u = this.elm[7], h = this.elm[8], c = this.elm[9], f = this.elm[10], x = this.elm[11], g = this.elm[12], m = this.elm[13], E = this.elm[14], _ = this.elm[15], R = t * l - e * r, n = t * a - i * r, p = t * u - s * r, y = e * a - i * l, d = e * u - s * l, A = i * u - s * a, z = h * m - c * g, F = h * E - f * g, b = h * _ - x * g, v = c * E - f * m, S = c * _ - x * m, M = f * _ - x * E, N = R * M - n * S + p * v + y * b - d * F + A * z, T = 1 / N;
    return N == 0 ? this.identity() : (this.elm[0] = (l * M - a * S + u * v) * T, this.elm[1] = (-e * M + i * S - s * v) * T, this.elm[2] = (m * A - E * d + _ * y) * T, this.elm[3] = (-c * A + f * d - x * y) * T, this.elm[4] = (-r * M + a * b - u * F) * T, this.elm[5] = (t * M - i * b + s * F) * T, this.elm[6] = (-g * A + E * p - _ * n) * T, this.elm[7] = (h * A - f * p + x * n) * T, this.elm[8] = (r * S - l * b + u * z) * T, this.elm[9] = (-t * S + e * b - s * z) * T, this.elm[10] = (g * d - m * p + _ * R) * T, this.elm[11] = (-h * d + c * p - x * R) * T, this.elm[12] = (-r * v + l * F - a * z) * T, this.elm[13] = (t * v - e * F + i * z) * T, this.elm[14] = (-g * y + m * n - E * R) * T, this.elm[15] = (h * y - c * n + f * R) * T, this);
  }
  transpose() {
    const t = this.elm[0], e = this.elm[1], i = this.elm[2], s = this.elm[3], r = this.elm[4], l = this.elm[5], a = this.elm[6], u = this.elm[7], h = this.elm[8], c = this.elm[9], f = this.elm[10], x = this.elm[11], g = this.elm[12], m = this.elm[13], E = this.elm[14], _ = this.elm[15];
    return this.elm[0] = t, this.elm[1] = r, this.elm[2] = h, this.elm[3] = g, this.elm[4] = e, this.elm[5] = l, this.elm[6] = c, this.elm[7] = m, this.elm[8] = i, this.elm[9] = a, this.elm[10] = f, this.elm[11] = E, this.elm[12] = s, this.elm[13] = u, this.elm[14] = x, this.elm[15] = _, this;
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
    const e = t.x, i = t.y, s = t.z, r = t.w, l = e * e, a = i * i, u = s * s, h = r * r, c = e * i, f = e * s, x = e * r, g = i * s, m = i * r, E = s * r;
    return this.matmul([
      l - a - u + h,
      2 * (c + E),
      2 * (f - m),
      0,
      2 * (c - E),
      -l + a - u + h,
      2 * (g + x),
      0,
      2 * (f + m),
      2 * (g - x),
      -l - a + u + h,
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
        for (let l = 0; l < 4; l++)
          r += this.elm[l * 4 + s] * t[l + i * 4];
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
  decompose(t, e, i) {
    t && (t.x = this.elm[12], t.y = this.elm[13], t.z = this.elm[14]), e && e.setFromMatrix(this);
  }
  copyToArray(t) {
    t.length = this.elm.length;
    for (let e = 0; e < this.elm.length; e++)
      t[e] = this.elm[e];
    return t;
  }
}
var I;
((o) => {
  o.NEWTON_ITERATIONS = 4, o.NEWTON_MIN_SLOPE = 1e-3, o.SUBDIVISION_PRECISION = 1e-7, o.SUBDIVISION_MAX_ITERATIONS = 10, o.BEZIER_EASING_CACHE_SIZE = 11, o.BEZIER_EASING_SAMPLE_STEP_SIZE = 1 / o.BEZIER_EASING_CACHE_SIZE;
  function t(h) {
    return -h.p0 + 3 * h.p1 - 3 * h.p2 + h.p3;
  }
  function e(h) {
    return 3 * h.p0 - 6 * h.p1 + 3 * h.p2;
  }
  function i(h) {
    return -3 * h.p0 + 3 * h.p1;
  }
  function s(h, c) {
    return 3 * t(h) * c * c + 2 * e(h) * c + i(h);
  }
  o.calcBezierSlope = s;
  function r(h, c) {
    return ((t(h) * c + e(h)) * c + i(h)) * c + h.p0;
  }
  o.calcBezier = r;
  function l(h, c, f, x) {
    let g = 0, m = 0;
    for (let E = 0; E < o.SUBDIVISION_MAX_ITERATIONS; E++)
      m = c + (f - c) / 2, g = r(x, m), g > h ? f = m : c = m;
    return m;
  }
  function a(h, c, f) {
    for (let x = 0; x < o.NEWTON_ITERATIONS; x++) {
      const g = s(c, f);
      if (g == 0)
        return f;
      f -= (r(c, f) - h) / g;
    }
    return f;
  }
  function u(h, c, f) {
    h.p1 = Math.max(h.p0, Math.min(h.p3, h.p1)), h.p2 = Math.max(h.p0, Math.min(h.p3, h.p2));
    let x = 0;
    for (let E = 1; E < f.length && (x = E - 1, !(c < f[E])); E++)
      ;
    const g = x / (o.BEZIER_EASING_CACHE_SIZE - 1), m = s(h, g) / (h.p3 - h.p0);
    return m == 0 ? g : m > 0.01 ? a(c, h, g) : l(c, g, g + o.BEZIER_EASING_SAMPLE_STEP_SIZE, h);
  }
  o.getBezierTfromX = u;
})(I || (I = {}));
var B;
((o) => {
  function t(n = 6) {
    return (p) => {
      var y = Math.exp(-n * (2 * p - 1)), d = Math.exp(-n);
      return (1 + (1 - y) / (1 + y) * (1 + d) / (1 - d)) / 2;
    };
  }
  o.sigmoid = t;
  function e(n, p, y) {
    const d = Math.max(0, Math.min(1, (y - n) / (p - n)));
    return d * d * (3 - 2 * d);
  }
  o.smoothstep = e;
  function i(n) {
    return n;
  }
  o.linear = i;
  function s(n) {
    return n * n;
  }
  o.easeInQuad = s;
  function r(n) {
    return n * (2 - n);
  }
  o.easeOutQuad = r;
  function l(n) {
    return n < 0.5 ? 2 * n * n : -1 + (4 - 2 * n) * n;
  }
  o.easeInOutQuad = l;
  function a(n) {
    return n * n * n;
  }
  o.easeInCubic = a;
  function u(n) {
    return --n * n * n + 1;
  }
  o.easeOutCubic = u;
  function h(n) {
    return n < 0.5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
  }
  o.easeInOutCubic = h;
  function c(n) {
    return n * n * n * n;
  }
  o.easeInQuart = c;
  function f(n) {
    return 1 - --n * n * n * n;
  }
  o.easeOutQuart = f;
  function x(n) {
    return n < 0.5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
  }
  o.easeInOutQuart = x;
  function g(n) {
    return n * n * n * n * n;
  }
  o.easeInQuint = g;
  function m(n) {
    return 1 + --n * n * n * n * n;
  }
  o.easeOutQuint = m;
  function E(n) {
    return n < 0.5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
  }
  o.easeInOutQuint = E;
  function _(n, p, y, d) {
    for (var A = new Array(I.BEZIER_EASING_CACHE_SIZE), z = 0; z < I.BEZIER_EASING_CACHE_SIZE; ++z)
      A[z] = I.calcBezier({ p0: n.x, p1: p.x, p2: y.x, p3: d.x }, z / (I.BEZIER_EASING_CACHE_SIZE - 1));
    return (F) => F <= n.x ? n.y : d.x <= F ? d.y : I.calcBezier({ p0: n.y, p1: p.y, p2: y.y, p3: d.y }, I.getBezierTfromX({ p0: n.x, p1: p.x, p2: y.x, p3: d.x }, F, A));
  }
  o.bezier = _;
  function R(n, p, y, d) {
    return _(
      { x: 0, y: 0 },
      { x: n, y: p },
      { x: y, y: d },
      { x: 1, y: 1 }
    );
  }
  o.cubicBezier = R;
})(B || (B = {}));
class C {
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
class H extends C {
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
      if (t < s.coordinate.x) {
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
class Y extends C {
  constructor(t, e, i, s, r) {
    super(), this.updatedFrame = -1, this.name = t || "", this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.curves = /* @__PURE__ */ new Map(), this.value = new w(), e && this.setFCurve(e, "x"), i && this.setFCurve(i, "y"), s && this.setFCurve(s, "z"), r && this.setFCurve(r, "w");
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
class K extends C {
  constructor(t, e, i, s) {
    super(), this.coordinate = { x: 0, y: 0 }, this.handleLeft = { x: 0, y: 0 }, this.handleRight = { x: 0, y: 0 }, this.interpolation = "BEZIER", this.easing = null, this.nextFrame = null, this.set(t, e, i, s);
  }
  set(t, e, i, s) {
    this.coordinate = t, this.handleLeft = e || t, this.handleRight = i || t, this.interpolation = s || "BEZIER";
  }
  getEasing(t, e) {
    return t == "BEZIER" ? B.bezier(this.coordinate, this.handleRight, e.handleLeft, e.coordinate) : t == "CONSTANT" ? () => this.coordinate.y : (i) => {
      const s = e.coordinate.y - this.coordinate.y;
      return i = (i - this.coordinate.x) / (e.coordinate.x - this.coordinate.x), this.coordinate.y + i * s;
    };
  }
  to(t, e) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != t.coordinate.x || this.nextFrame.coordinate.y != t.coordinate.y) && (this.easing = this.getEasing(this.interpolation, t), this.nextFrame = t), this.easing ? this.easing(e) : 0;
  }
}
var U;
((o) => {
  function t(...e) {
    const i = {};
    for (let s = 0; s < e.length; s++)
      e[s] != null && Object.assign(i, e[s]);
    return i;
  }
  o.merge = t;
})(U || (U = {}));
export {
  I as Bezier,
  B as Easings,
  Q as Euler,
  C as EventEmitter,
  H as FCurve,
  Y as FCurveGroup,
  K as FCurveKeyFrame,
  k as GLPowerBuffer,
  V as GLPowerFrameBuffer,
  X as GLPowerProgram,
  D as GLPowerTexture,
  G as GLPowerTransformFeedback,
  L as GLPowerVAO,
  P as Matrix,
  Z as Power,
  O as Quaternion,
  U as UniformsUtils,
  w as Vector
};
//# sourceMappingURL=glpower.js.map
