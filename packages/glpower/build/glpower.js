class K {
  constructor(t) {
    this.gl = t, this.gl.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), this.gl.getExtension("EXT_color_buffer_float"), this.gl.getExtension("EXT_color_buffer_half_float"), this.extDisJointTimerQuery = this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
  }
}
class Z {
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
class W {
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
        Array.from(l).forEach((o, u) => {
          const h = Number(o[1]), c = Math.max(0, h - 5), f = Math.min(r.length, h + 2);
          let x = s.split(`
`)[u] + `
`;
          r.forEach((m, g) => {
            c <= g && g <= f && (x += `${g + 1}: ${m}
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
      t.needsUpdate && t.location !== null && (/Matrix[2|3|4]fv/.test(t.type) ? this.gl["uniform" + t.type](t.location, !1, t.value) : /[1|2|3|4][f|i]$/.test(t.type) ? this.gl["uniform" + t.type](t.location, ...t.value) : this.gl["uniform" + t.type](t.location, t.value), t.cache = t.value.concat(), t.needsUpdate = !1);
    });
  }
  getVAO(t = "_") {
    if (!this.program)
      return null;
    let e = this.vao.get(t);
    return e || (e = new Z(this.gl, this.program), this.vao.set(t, e), e);
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
class j {
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
class F {
  constructor(t, e, i, s) {
    this.x = t || 0, this.y = e || 0, this.z = i || 0, this.w = s || 0;
  }
  get isVector() {
    return !0;
  }
  set(t, e, i, s) {
    return this.x = t, this.y = e != null ? e : t, this.z = i != null ? i : t, this.w = s != null ? s : t, this;
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
    const e = this.x, i = this.y, s = this.z, r = t.x, l = t.y, o = t.z;
    return this.x = i * o - s * l, this.y = s * r - e * o, this.z = e * l - i * r, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  applyMatrix3(t) {
    const e = t.elm, i = e[0], s = e[1], r = e[2], l = e[4], o = e[5], u = e[6], h = e[8], c = e[9], f = e[10], x = this.x * i + this.y * l + this.z * h, m = this.x * s + this.y * o + this.z * c, g = this.x * r + this.y * u + this.z * f;
    return this.x = x, this.y = m, this.z = g, this.w = 0, this;
  }
  applyMatrix4(t) {
    const e = t.elm, i = e[0], s = e[1], r = e[2], l = e[3], o = e[4], u = e[5], h = e[6], c = e[7], f = e[8], x = e[9], m = e[10], g = e[11], y = e[12], A = e[13], R = e[14], n = e[15], T = this.x * i + this.y * o + this.z * f + this.w * y, d = this.x * s + this.y * u + this.z * x + this.w * A, E = this.x * r + this.y * h + this.z * m + this.w * R, z = this.x * l + this.y * c + this.z * g + this.w * n;
    return this.x = T, this.y = d, this.z = E, this.w = z, this;
  }
  floor() {
    this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w);
  }
  lerp(t, e) {
    return this.x = this.x + (t.x - this.x) * e, this.y = this.y + (t.y - this.y) * e, this.z = this.z + (t.z - this.z) * e, this.w = this.w + (t.w - this.w) * e, this;
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
    this.gl = t, this.image = null, this.unit = 0, this.size = new F(), this.glTex = this.gl.createTexture(), this._setting = {
      type: this.gl.UNSIGNED_BYTE,
      internalFormat: this.gl.RGBA,
      format: this.gl.RGBA,
      magFilter: this.gl.NEAREST,
      minFilter: this.gl.NEAREST,
      generateMipmap: !1,
      wrapS: this.gl.CLAMP_TO_EDGE,
      wrapT: this.gl.CLAMP_TO_EDGE
    }, this.textureType = t.TEXTURE_2D;
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
    if (this.image = t, this.gl.bindTexture(this.textureType, this.glTex), this.image) {
      const e = Array.isArray(this.image) ? this.image[0] : this.image;
      this.size.set(e.width, e.height), e instanceof HTMLImageElement || e instanceof HTMLCanvasElement ? this.gl.texImage2D(this.textureType, 0, this._setting.internalFormat, this._setting.format, this._setting.type, e) : this.gl.texImage2D(this.textureType, 0, this._setting.internalFormat, e.width, e.height, 0, this._setting.format, this._setting.type, e.data || null);
    } else
      this.size.set(1, 1), this.gl.texImage2D(this.textureType, 0, this._setting.internalFormat, this.size.x, this.size.y, 0, this._setting.format, this._setting.type, null);
    return this._setting.generateMipmap && this.gl.generateMipmap(this.textureType), this.gl.texParameteri(this.textureType, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter), this.gl.texParameteri(this.textureType, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter), this.gl.texParameterf(this.textureType, this.gl.TEXTURE_WRAP_S, this._setting.wrapS), this.gl.texParameterf(this.textureType, this.gl.TEXTURE_WRAP_T, this._setting.wrapT), this.gl.bindTexture(this.textureType, null), this;
  }
  activate(t) {
    return this.gl.activeTexture(this.gl.TEXTURE0 + t), this.gl.bindTexture(this.textureType, this.glTex), this.unit = t, this;
  }
  load(t, e) {
    const i = new Image();
    return i.onload = () => {
      this.attach(i), e && e();
    }, i.src = t, this;
  }
  getTexture() {
    return this.glTex;
  }
  get type() {
    return this.textureType;
  }
  dispose() {
    this.gl.deleteTexture(this.glTex);
  }
}
class Q {
  constructor(t, e) {
    this.gl = t, this.size = new F(1, 1), this.glFrameBuffer = this.gl.createFramebuffer(), this.depthTexture = null, this.textures = [], this.textureAttachmentList = [], (!e || !e.disableDepthBuffer) && this.setDepthTexture(new k(this.gl).setting({
      internalFormat: this.gl.DEPTH_COMPONENT32F,
      format: this.gl.DEPTH_COMPONENT,
      type: this.gl.FLOAT,
      magFilter: this.gl.NEAREST,
      minFilter: this.gl.NEAREST
    }));
  }
  setDepthTexture(t) {
    this.depthTexture = t, this.depthTexture && (this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.glFrameBuffer), this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.getTexture(), 0), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null));
  }
  setTexture(t) {
    return this.textures = t, this.textureAttachmentList = [], this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.glFrameBuffer), this.textures.forEach((e, i) => {
      e.attach({ width: this.size.x, height: this.size.y });
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
    return this.glFrameBuffer;
  }
  dispose() {
    this.gl.deleteFramebuffer(this.glFrameBuffer);
  }
}
class $ extends Q {
  constructor(t, e) {
    super(t, e), this.textures = [], this.cubeTarget = [
      this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ], this.currentFace = this.cubeTarget[0];
  }
  setTexture(t) {
    return this.textures = t, this.textureAttachmentList = [], this.textures.forEach((e) => {
      e.attach({ width: this.size.x, height: this.size.y });
    }), this;
  }
  face(t) {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.glFrameBuffer), this.textureAttachmentList = [], this.textures.forEach((e, i) => {
      const s = this.gl.COLOR_ATTACHMENT0 + i;
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, s, this.cubeTarget[t], e.getTexture(), 0), this.textureAttachmentList.push(s);
    }), this.currentFace = this.cubeTarget[t], this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }
}
class J extends k {
  constructor(t) {
    super(t), this.textureType = t.TEXTURE_CUBE_MAP, this.cubeTarget = [
      this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
      this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ];
  }
  attach(t) {
    if (this.image = t, this.gl.bindTexture(this.textureType, this.glTex), this.image)
      for (let e = 0; e < 6; e++) {
        const i = Array.isArray(this.image) ? this.image[e] : this.image;
        this.size.set(i.width, i.height), i instanceof HTMLImageElement || i instanceof HTMLCanvasElement ? this.gl.texImage2D(this.cubeTarget[e], 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, i) : this.gl.texImage2D(this.cubeTarget[e], 0, this._setting.internalFormat, i.width, i.height, 0, this._setting.format, this._setting.type, i.data || null);
      }
    return this._setting.generateMipmap && this.gl.generateMipmap(this.textureType), this.gl.texParameteri(this.textureType, this.gl.TEXTURE_MAG_FILTER, this._setting.magFilter), this.gl.texParameteri(this.textureType, this.gl.TEXTURE_MIN_FILTER, this._setting.minFilter), this.gl.texParameterf(this.textureType, this.gl.TEXTURE_WRAP_S, this._setting.wrapS), this.gl.texParameterf(this.textureType, this.gl.TEXTURE_WRAP_T, this._setting.wrapT), this.gl.bindTexture(this.textureType, null), this;
  }
}
class q {
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
  perspective(t, e, i, s) {
    const r = 1 / Math.tan(t * Math.PI / 360), l = s - i;
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
    const t = this.elm[0], e = this.elm[1], i = this.elm[2], s = this.elm[3], r = this.elm[4], l = this.elm[5], o = this.elm[6], u = this.elm[7], h = this.elm[8], c = this.elm[9], f = this.elm[10], x = this.elm[11], m = this.elm[12], g = this.elm[13], y = this.elm[14], A = this.elm[15], R = t * l - e * r, n = t * o - i * r, T = t * u - s * r, d = e * o - i * l, E = e * u - s * l, z = i * u - s * o, _ = h * g - c * m, b = h * y - f * m, w = h * A - x * m, M = c * y - f * g, v = c * A - x * g, S = f * A - x * y, O = R * S - n * v + T * M + d * w - E * b + z * _, p = 1 / O;
    return O == 0 ? this.identity() : (this.elm[0] = (l * S - o * v + u * M) * p, this.elm[1] = (-e * S + i * v - s * M) * p, this.elm[2] = (g * z - y * E + A * d) * p, this.elm[3] = (-c * z + f * E - x * d) * p, this.elm[4] = (-r * S + o * w - u * b) * p, this.elm[5] = (t * S - i * w + s * b) * p, this.elm[6] = (-m * z + y * T - A * n) * p, this.elm[7] = (h * z - f * T + x * n) * p, this.elm[8] = (r * v - l * w + u * _) * p, this.elm[9] = (-t * v + e * w - s * _) * p, this.elm[10] = (m * E - g * T + A * R) * p, this.elm[11] = (-h * E + c * T - x * R) * p, this.elm[12] = (-r * M + l * b - o * _) * p, this.elm[13] = (t * M - e * b + i * _) * p, this.elm[14] = (-m * d + g * n - y * R) * p, this.elm[15] = (h * d - c * n + f * R) * p, this);
  }
  transpose() {
    const t = this.elm[0], e = this.elm[1], i = this.elm[2], s = this.elm[3], r = this.elm[4], l = this.elm[5], o = this.elm[6], u = this.elm[7], h = this.elm[8], c = this.elm[9], f = this.elm[10], x = this.elm[11], m = this.elm[12], g = this.elm[13], y = this.elm[14], A = this.elm[15];
    return this.elm[0] = t, this.elm[1] = r, this.elm[2] = h, this.elm[3] = m, this.elm[4] = e, this.elm[5] = l, this.elm[6] = c, this.elm[7] = g, this.elm[8] = i, this.elm[9] = o, this.elm[10] = f, this.elm[11] = y, this.elm[12] = s, this.elm[13] = u, this.elm[14] = x, this.elm[15] = A, this;
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
    const e = t.x, i = t.y, s = t.z, r = t.w, l = e * e, o = i * i, u = s * s, h = r * r, c = e * i, f = e * s, x = e * r, m = i * s, g = i * r, y = s * r;
    return this.matmul([
      l - o - u + h,
      2 * (c + y),
      2 * (f - g),
      0,
      2 * (c - y),
      -l + o - u + h,
      2 * (m + x),
      0,
      2 * (f + g),
      2 * (m - x),
      -l - o + u + h,
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
  setRotationFromDirection(t, e) {
    e = e || { x: 0, y: 1, z: 0 };
    const i = new F().copy(t).normalize(), s = new F().copy(e).cross(i).normalize();
    s.length() == 0 && (i.x += 1e-3, s.copy(e).cross(i).normalize());
    const r = i.clone().cross(s).normalize();
    return this.set([
      s.x,
      s.y,
      s.z,
      0,
      r.x,
      r.y,
      r.z,
      0,
      i.x,
      i.y,
      i.z,
      0,
      0,
      0,
      0,
      1
    ]), this;
  }
  makeRotationAxis(t, e) {
    const i = Math.cos(e), s = Math.sin(e), r = 1 - i, l = t.x, o = t.y, u = t.z, h = r * l, c = r * o;
    return this.set(
      [
        h * l + i,
        h * o - s * u,
        h * u + s * o,
        0,
        h * o + s * u,
        c * o + i,
        c * u - s * l,
        0,
        h * u - s * o,
        c * u + s * l,
        r * u * u + i,
        0,
        0,
        0,
        0,
        1
      ]
    ), this;
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
class tt extends F {
  constructor(t, e, i, s) {
    super(t, e, i, 0), this.order = s || "XYZ";
  }
  copy(t) {
    return "order" in t && (this.order = t.order), super.copy(t);
  }
  setFromQuaternion(t) {
    const e = new N().applyQuaternion(t);
    return this.setFromRotationMatrix(e), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elm, i = e[0], s = e[4], r = e[8];
    e[1];
    const l = e[5], o = e[9];
    e[2];
    const u = e[6], h = e[10];
    return this.order = "XYZ", this.y = Math.asin(Math.min(1, Math.max(-1, r))), Math.abs(r) < 0.9999999 ? (this.x = Math.atan2(-o, h), this.z = Math.atan2(-s, i)) : (this.x = Math.atan2(u, l), this.z = 0), this;
  }
}
class G {
  constructor(t, e, i, s) {
    this.updated = !1, this.x = 0, this.y = 0, this.z = 0, this.w = 1, this.set(t, e, i, s);
  }
  set(t, e, i, s) {
    this.x = t != null ? t : this.x, this.y = e != null ? e : this.y, this.z = i != null ? i : this.z, this.w = s != null ? s : this.w, this.updated = !0;
  }
  setFromEuler(t, e) {
    const i = e || ("order" in t ? t.order : "XYZ"), s = Math.sin(t.x / 2), r = Math.sin(t.y / 2), l = Math.sin(t.z / 2), o = Math.cos(t.x / 2), u = Math.cos(t.y / 2), h = Math.cos(t.z / 2);
    return i == "XYZ" ? (this.x = o * r * l + s * u * h, this.y = -s * u * l + o * r * h, this.z = o * u * l + s * r * h, this.w = -s * r * l + o * u * h) : i == "XZY" ? (this.x = -o * r * l + s * u * h, this.y = o * r * h - s * u * l, this.z = s * r * h + o * u * l, this.w = s * r * l + o * u * h) : i == "YZX" ? (this.x = s * u * h + o * r * l, this.y = s * u * l + o * r * h, this.z = -s * r * h + o * u * l, this.w = -s * r * l + o * u * h) : i == "ZYX" && (this.x = s * u * h - o * r * l, this.y = s * u * l + o * r * h, this.z = -s * r * h + o * u * l, this.w = s * r * l + o * u * h), this.updated = !0, this;
  }
  setFromMatrix(t) {
    const e = t.elm, i = e[0] + e[5] + e[10];
    let s, r, l, o;
    if (i > 0) {
      const h = Math.sqrt(i + 1) * 2;
      o = 0.25 * h, s = (e[6] - e[9]) / h, r = (e[8] - e[2]) / h, l = (e[1] - e[4]) / h;
    } else if (e[0] > e[5] && e[0] > e[10]) {
      const h = Math.sqrt(1 + e[0] - e[5] - e[10]) * 2;
      o = (e[6] - e[9]) / h, s = 0.25 * h, r = (e[1] + e[4]) / h, l = (e[2] + e[8]) / h;
    } else if (e[5] > e[10]) {
      const h = Math.sqrt(1 + e[5] - e[0] - e[10]) * 2;
      o = (e[8] - e[2]) / h, s = (e[1] + e[4]) / h, r = 0.25 * h, l = (e[6] + e[9]) / h;
    } else {
      const h = Math.sqrt(1 + e[10] - e[0] - e[5]) * 2;
      o = (e[1] - e[4]) / h, s = (e[2] + e[8]) / h, r = (e[6] + e[9]) / h, l = 0.25 * h;
    }
    const u = Math.sqrt(s * s + r * r + l * l + o * o);
    return s /= u, r /= u, l /= u, o /= u, this.x = s, this.y = r, this.z = l, this.w = o, this.updated = !0, this;
  }
  multiply(t) {
    const e = this.w * t.w - this.x * t.x - this.y * t.y - this.z * t.z, i = this.w * t.x + this.x * t.w + this.y * t.z - this.z * t.y, s = this.w * t.y - this.x * t.z + this.y * t.w + this.z * t.x, r = this.w * t.z + this.x * t.y - this.y * t.x + this.z * t.w;
    return this.set(i, s, r, e), this.updated = !0, this;
  }
  inverse() {
    return this.set(-this.x, -this.y, -this.z, this.w), this.updated = !0, this;
  }
  copy(t) {
    var e, i, s, r;
    return this.x = (e = t.x) != null ? e : 0, this.y = (i = t.y) != null ? i : 0, this.z = (s = t.z) != null ? s : 0, this.w = (r = t.w) != null ? r : 0, this.updated = !0, this;
  }
  clone() {
    return new G(this.x, this.y, this.z, this.w);
  }
}
var D;
((a) => {
  a.randomSeed = (t) => {
    t ^= t << 13, t ^= 2 >>> 17, t ^= t << 5;
    let e = 123456789 ^ t;
    t ^= t << 13, t ^= 2 >>> 17, t ^= t << 5;
    let i = 362436069 ^ t;
    t ^= t << 13, t ^= 2 >>> 17, t ^= t << 5;
    let s = 521288629 ^ t;
    t ^= t << 13, t ^= 2 >>> 17, t ^= t << 5;
    let r = 88675123 ^ t, l;
    return () => (l = e ^ e << 11, e = i, i = s, s = r, r = (r ^ r >>> 19 ^ (l ^ l >>> 8)) >>> 0, r / 4294967296);
  }, a.randomRange = (t = -1, e = 1) => t + Math.random() * (e - t), a.randomVector = (t = new F(-1, -1, -1, -1), e = new F(1, 1, 1, 1)) => new F(
    a.randomRange(t.x, e.x),
    a.randomRange(t.y, e.y),
    a.randomRange(t.z, e.z),
    a.randomRange(t.w, e.w)
  );
})(D || (D = {}));
class P {
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
    this.listeners = this.listeners.filter((i) => e == null ? i.event != t : !(i.event == t && i.cb == e));
  }
  emit(t, e) {
    const i = this.listeners.concat();
    for (let s = 0; s < i.length; s++) {
      const r = i[s];
      r.event == t && (r.cb.apply(this, e || []), r.once && this.off(t, r.cb));
    }
  }
  hasEvent(t) {
    return this.listeners.some((e) => e.event == t);
  }
}
var I;
((a) => {
  a.NEWTON_ITERATIONS = 4, a.NEWTON_MIN_SLOPE = 1e-3, a.SUBDIVISION_PRECISION = 1e-7, a.SUBDIVISION_MAX_ITERATIONS = 10, a.BEZIER_EASING_CACHE_SIZE = 11, a.BEZIER_EASING_SAMPLE_STEP_SIZE = 1 / a.BEZIER_EASING_CACHE_SIZE;
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
  a.calcBezierSlope = s;
  function r(h, c) {
    return ((t(h) * c + e(h)) * c + i(h)) * c + h.p0;
  }
  a.calcBezier = r;
  function l(h, c, f, x) {
    let m = 0, g = 0;
    for (let y = 0; y < a.SUBDIVISION_MAX_ITERATIONS; y++)
      g = c + (f - c) / 2, m = r(x, g), m > h ? f = g : c = g;
    return g;
  }
  function o(h, c, f) {
    for (let x = 0; x < a.NEWTON_ITERATIONS; x++) {
      const m = s(c, f);
      if (m == 0)
        return f;
      f -= (r(c, f) - h) / m;
    }
    return f;
  }
  function u(h, c, f) {
    h.p1 = Math.max(h.p0, Math.min(h.p3, h.p1)), h.p2 = Math.max(h.p0, Math.min(h.p3, h.p2));
    let x = 0;
    for (let y = 1; y < f.length && (x = y - 1, !(c < f[y])); y++)
      ;
    const m = x / (a.BEZIER_EASING_CACHE_SIZE - 1), g = s(h, m) / (h.p3 - h.p0);
    return g == 0 ? m : g > 0.01 ? o(c, h, m) : l(c, m, m + a.BEZIER_EASING_SAMPLE_STEP_SIZE, h);
  }
  a.getBezierTfromX = u;
})(I || (I = {}));
var U;
((a) => {
  function t(n = 6) {
    return (T) => {
      const d = Math.exp(-n * (2 * T - 1)), E = Math.exp(-n);
      return (1 + (1 - d) / (1 + d) * (1 + E) / (1 - E)) / 2;
    };
  }
  a.sigmoid = t;
  function e(n, T, d) {
    const E = Math.max(0, Math.min(1, (d - n) / (T - n)));
    return E * E * (3 - 2 * E);
  }
  a.smoothstep = e;
  function i(n) {
    return n;
  }
  a.linear = i;
  function s(n) {
    return n * n;
  }
  a.easeInQuad = s;
  function r(n) {
    return n * (2 - n);
  }
  a.easeOutQuad = r;
  function l(n) {
    return n < 0.5 ? 2 * n * n : -1 + (4 - 2 * n) * n;
  }
  a.easeInOutQuad = l;
  function o(n) {
    return n * n * n;
  }
  a.easeInCubic = o;
  function u(n) {
    return --n * n * n + 1;
  }
  a.easeOutCubic = u;
  function h(n) {
    return n < 0.5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1;
  }
  a.easeInOutCubic = h;
  function c(n) {
    return n * n * n * n;
  }
  a.easeInQuart = c;
  function f(n) {
    return 1 - --n * n * n * n;
  }
  a.easeOutQuart = f;
  function x(n) {
    return n < 0.5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n;
  }
  a.easeInOutQuart = x;
  function m(n) {
    return n * n * n * n * n;
  }
  a.easeInQuint = m;
  function g(n) {
    return 1 + --n * n * n * n * n;
  }
  a.easeOutQuint = g;
  function y(n) {
    return n < 0.5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n;
  }
  a.easeInOutQuint = y;
  function A(n, T, d, E) {
    const z = new Array(I.BEZIER_EASING_CACHE_SIZE);
    for (let _ = 0; _ < I.BEZIER_EASING_CACHE_SIZE; ++_)
      z[_] = I.calcBezier({ p0: n.x, p1: T.x, p2: d.x, p3: E.x }, _ / (I.BEZIER_EASING_CACHE_SIZE - 1));
    return (_) => _ <= n.x ? n.y : E.x <= _ ? E.y : I.calcBezier({ p0: n.y, p1: T.y, p2: d.y, p3: E.y }, I.getBezierTfromX({ p0: n.x, p1: T.x, p2: d.x, p3: E.x }, _, z));
  }
  a.bezier = A;
  function R(n, T, d, E) {
    return A(
      { x: 0, y: 0 },
      { x: n, y: T },
      { x: d, y: E },
      { x: 1, y: 1 }
    );
  }
  a.cubicBezier = R;
})(U || (U = {}));
var C;
((a) => {
  a.number = (t, e, i) => t + (e - t) * i, a.vector = (t, e, i) => t.lerp(e, i);
})(C || (C = {}));
const L = (a) => typeof a == "number" ? a : "clone" in a ? a.clone() : a, B = (a, t) => typeof a == "number" ? t : "clone" in a && typeof t != "number" ? a.copy(t) : t, H = (a) => typeof a == "number" ? C.number : C.vector, Y = (a) => typeof a == "number" ? "1f" : "4fv";
class et extends P {
  constructor() {
    super(), this.variables = /* @__PURE__ */ new Map();
  }
  add(t, e, i = U.easeInOutCubic, s) {
    this.variables.set(t, {
      time: 0,
      duration: 1,
      value: e,
      valueStart: L(e),
      valueEnd: L(e),
      easingFunc: i,
      lerpFunc: H(e),
      animating: !1,
      type: Y(e) || s
    });
  }
  get(t) {
    var e;
    return (e = this.variables.get(t)) != null ? e : null;
  }
  getValue(t) {
    const e = this.get(t);
    return e === null ? null : e.value;
  }
  cancel(t) {
    const e = this.variables.get(t);
    !e || (e.animating = !1);
  }
  animate(t, e, i = 1, s) {
    const r = this.variables.get(t);
    !r || (r.animating = !0, r.valueStart = B(r.valueStart, r.value), r.valueEnd = B(r.valueEnd, e), r.duration = i, r.onFinish = s, r.time = 0, i === 0 && (r.animating = !1, r.value = B(r.value, e), r.onFinish && r.onFinish()));
  }
  update(t) {
    this.variables.forEach((e) => {
      !e.animating || (e.time >= 1 && (e.animating = !1, e.time = 1), e.value = B(e.value, e.valueStart), e.value = e.lerpFunc(e.value, e.valueEnd, e.easingFunc(e.time)), e.time += t / e.duration, e.animating == !1 && e.onFinish && e.onFinish());
    });
  }
}
class it extends P {
  constructor(t) {
    super(), this.keyframes = [], this.cache = { frame: NaN, value: NaN }, this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.set(t);
  }
  set(t) {
    t && (this.keyframes = [], t.forEach((e) => {
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
class st extends P {
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
class rt extends P {
  constructor(t, e, i, s) {
    super(), this.coordinate = { x: 0, y: 0 }, this.handleLeft = { x: 0, y: 0 }, this.handleRight = { x: 0, y: 0 }, this.interpolation = "BEZIER", this.easing = null, this.nextFrame = null, this.set(t, e, i, s);
  }
  set(t, e, i, s) {
    this.coordinate = t, this.handleLeft = e || t, this.handleRight = i || t, this.interpolation = s || "BEZIER";
  }
  getEasing(t, e) {
    return t == "BEZIER" ? U.bezier(this.coordinate, this.handleRight, e.handleLeft, e.coordinate) : t == "CONSTANT" ? () => this.coordinate.y : (i) => {
      const s = e.coordinate.y - this.coordinate.y;
      return i = (i - this.coordinate.x) / (e.coordinate.x - this.coordinate.x), this.coordinate.y + i * s;
    };
  }
  to(t, e) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != t.coordinate.x || this.nextFrame.coordinate.y != t.coordinate.y) && (this.easing = this.getEasing(this.interpolation, t), this.nextFrame = t), this.easing ? this.easing(e) : 0;
  }
}
var X;
((a) => {
  function t(...e) {
    const i = {};
    for (let s = 0; s < e.length; s++)
      e[s] != null && Object.assign(i, e[s]);
    return i;
  }
  a.merge = t;
})(X || (X = {}));
var V;
((a) => {
  function t() {
    return self.crypto.randomUUID();
  }
  a.genUUID = t;
})(V || (V = {}));
export {
  et as Animator,
  I as Bezier,
  U as Easings,
  tt as Euler,
  P as EventEmitter,
  it as FCurve,
  st as FCurveGroup,
  rt as FCurveKeyFrame,
  j as GLPowerBuffer,
  Q as GLPowerFrameBuffer,
  $ as GLPowerFrameBufferCube,
  W as GLPowerProgram,
  k as GLPowerTexture,
  J as GLPowerTextureCube,
  q as GLPowerTransformFeedback,
  Z as GLPowerVAO,
  V as ID,
  D as Maths,
  N as Matrix,
  K as Power,
  G as Quaternion,
  X as UniformsUtils,
  F as Vector
};
//# sourceMappingURL=glpower.js.map
