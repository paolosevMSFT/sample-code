
// Bindings utilities

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant)
    @param {*=} __class__ */
function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant)
    @param {*=} __class__ */
function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts big (string or array) values into a C-style storage, in temporary space

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (ensureCache.needed) {
      // clear the temps
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc: function(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
  copy: function(array, view, offset) {
    offset >>>= 0;
    var bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offset >>>= 1; break;
      case 4: offset >>>= 2; break;
      case 8: offset >>>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[offset + i] = array[i];
    }
  },
};

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, HEAP8);
    ensureCache.copy(intArray, HEAP8, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP8);
    ensureCache.copy(value, HEAP8, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP16);
    ensureCache.copy(value, HEAP16, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP32);
    ensureCache.copy(value, HEAP32, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF32);
    ensureCache.copy(value, HEAPF32, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF64);
    ensureCache.copy(value, HEAPF64, offset);
    return offset;
  }
  return value;
}


// Light
/** @suppress {undefinedVars, duplicate} @this{Object} */function Light() { throw "cannot construct a Light, no constructor in IDL" }
Light.prototype = Object.create(WrapperObject.prototype);
Light.prototype.constructor = Light;
Light.prototype.__class__ = Light;
Light.__cache__ = {};
Module['Light'] = Light;

Light.prototype['attenuate'] = Light.prototype.attenuate = /** @suppress {undefinedVars, duplicate} @this{Object} */function(r) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  return _emscripten_bind_Light_attenuate_1(self, r);
};;

  Light.prototype['get_position'] = Light.prototype.get_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Light_get_position_0(self), Vector3);
};
    Light.prototype['set_position'] = Light.prototype.set_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Light_set_position_1(self, arg0);
};
    Object.defineProperty(Light.prototype, 'position', { get: Light.prototype.get_position, set: Light.prototype.set_position });
  Light.prototype['get_intensity'] = Light.prototype.get_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Light_get_intensity_0(self), Vector3);
};
    Light.prototype['set_intensity'] = Light.prototype.set_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Light_set_intensity_1(self, arg0);
};
    Object.defineProperty(Light.prototype, 'intensity', { get: Light.prototype.get_intensity, set: Light.prototype.set_intensity });
  Light.prototype['get_type'] = Light.prototype.get_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Light_get_type_0(self);
};
    Light.prototype['set_type'] = Light.prototype.set_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Light_set_type_1(self, arg0);
};
    Object.defineProperty(Light.prototype, 'type', { get: Light.prototype.get_type, set: Light.prototype.set_type });
  Light.prototype['get_samples'] = Light.prototype.get_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Light_get_samples_0(self);
};
    Light.prototype['set_samples'] = Light.prototype.set_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Light_set_samples_1(self, arg0);
};
    Object.defineProperty(Light.prototype, 'samples', { get: Light.prototype.get_samples, set: Light.prototype.set_samples });
  Light.prototype['get_width'] = Light.prototype.get_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Light_get_width_0(self);
};
    Light.prototype['set_width'] = Light.prototype.set_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Light_set_width_1(self, arg0);
};
    Object.defineProperty(Light.prototype, 'width', { get: Light.prototype.get_width, set: Light.prototype.set_width });
  Light.prototype['get_height'] = Light.prototype.get_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Light_get_height_0(self);
};
    Light.prototype['set_height'] = Light.prototype.set_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Light_set_height_1(self, arg0);
};
    Object.defineProperty(Light.prototype, 'height', { get: Light.prototype.get_height, set: Light.prototype.set_height });
  Light.prototype['__destroy__'] = Light.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Light___destroy___0(self);
};
// Shape
/** @suppress {undefinedVars, duplicate} @this{Object} */function Shape() { throw "cannot construct a Shape, no constructor in IDL" }
Shape.prototype = Object.create(WrapperObject.prototype);
Shape.prototype.constructor = Shape;
Shape.prototype.__class__ = Shape;
Shape.__cache__ = {};
Module['Shape'] = Shape;

Shape.prototype['getNormal'] = Shape.prototype.getNormal = /** @suppress {undefinedVars, duplicate} @this{Object} */function(hitPoint) {
  var self = this.ptr;
  if (hitPoint && typeof hitPoint === 'object') hitPoint = hitPoint.ptr;
  return wrapPointer(_emscripten_bind_Shape_getNormal_1(self, hitPoint), Vector3);
};;

  Shape.prototype['get_color'] = Shape.prototype.get_color = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Shape_get_color_0(self), Color);
};
    Shape.prototype['set_color'] = Shape.prototype.set_color = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_color_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'color', { get: Shape.prototype.get_color, set: Shape.prototype.set_color });
  Shape.prototype['get_color_specular'] = Shape.prototype.get_color_specular = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Shape_get_color_specular_0(self), Color);
};
    Shape.prototype['set_color_specular'] = Shape.prototype.set_color_specular = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_color_specular_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'color_specular', { get: Shape.prototype.get_color_specular, set: Shape.prototype.set_color_specular });
  Shape.prototype['get_ka'] = Shape.prototype.get_ka = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_ka_0(self);
};
    Shape.prototype['set_ka'] = Shape.prototype.set_ka = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_ka_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'ka', { get: Shape.prototype.get_ka, set: Shape.prototype.set_ka });
  Shape.prototype['get_kd'] = Shape.prototype.get_kd = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_kd_0(self);
};
    Shape.prototype['set_kd'] = Shape.prototype.set_kd = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_kd_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'kd', { get: Shape.prototype.get_kd, set: Shape.prototype.set_kd });
  Shape.prototype['get_ks'] = Shape.prototype.get_ks = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_ks_0(self);
};
    Shape.prototype['set_ks'] = Shape.prototype.set_ks = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_ks_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'ks', { get: Shape.prototype.get_ks, set: Shape.prototype.set_ks });
  Shape.prototype['get_shininess'] = Shape.prototype.get_shininess = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_shininess_0(self);
};
    Shape.prototype['set_shininess'] = Shape.prototype.set_shininess = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_shininess_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'shininess', { get: Shape.prototype.get_shininess, set: Shape.prototype.set_shininess });
  Shape.prototype['get_reflectivity'] = Shape.prototype.get_reflectivity = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_reflectivity_0(self);
};
    Shape.prototype['set_reflectivity'] = Shape.prototype.set_reflectivity = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_reflectivity_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'reflectivity', { get: Shape.prototype.get_reflectivity, set: Shape.prototype.set_reflectivity });
  Shape.prototype['get_transparency'] = Shape.prototype.get_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_transparency_0(self);
};
    Shape.prototype['set_transparency'] = Shape.prototype.set_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_transparency_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'transparency', { get: Shape.prototype.get_transparency, set: Shape.prototype.set_transparency });
  Shape.prototype['get_glossiness'] = Shape.prototype.get_glossiness = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_glossiness_0(self);
};
    Shape.prototype['set_glossiness'] = Shape.prototype.set_glossiness = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_glossiness_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'glossiness', { get: Shape.prototype.get_glossiness, set: Shape.prototype.set_glossiness });
  Shape.prototype['get_glossy_transparency'] = Shape.prototype.get_glossy_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Shape_get_glossy_transparency_0(self);
};
    Shape.prototype['set_glossy_transparency'] = Shape.prototype.set_glossy_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Shape_set_glossy_transparency_1(self, arg0);
};
    Object.defineProperty(Shape.prototype, 'glossy_transparency', { get: Shape.prototype.get_glossy_transparency, set: Shape.prototype.set_glossy_transparency });
  Shape.prototype['__destroy__'] = Shape.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Shape___destroy___0(self);
};
// VoidPtr
/** @suppress {undefinedVars, duplicate} @this{Object} */function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// Color
/** @suppress {undefinedVars, duplicate} @this{Object} */function Color(r, g, b) {
  if (r && typeof r === 'object') r = r.ptr;
  if (g && typeof g === 'object') g = g.ptr;
  if (b && typeof b === 'object') b = b.ptr;
  if (r === undefined) { this.ptr = _emscripten_bind_Color_Color_0(); getCache(Color)[this.ptr] = this;return }
  if (g === undefined) { this.ptr = _emscripten_bind_Color_Color_1(r); getCache(Color)[this.ptr] = this;return }
  if (b === undefined) { this.ptr = _emscripten_bind_Color_Color_2(r, g); getCache(Color)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Color_Color_3(r, g, b);
  getCache(Color)[this.ptr] = this;
};;
Color.prototype = Object.create(WrapperObject.prototype);
Color.prototype.constructor = Color;
Color.prototype.__class__ = Color;
Color.__cache__ = {};
Module['Color'] = Color;

Color.prototype['clamp'] = Color.prototype.clamp = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Color_clamp_0(self), Color);
};;

Color.prototype['add'] = Color.prototype.add = /** @suppress {undefinedVars, duplicate} @this{Object} */function(c) {
  var self = this.ptr;
  if (c && typeof c === 'object') c = c.ptr;
  return wrapPointer(_emscripten_bind_Color_add_1(self, c), Color);
};;

Color.prototype['mul'] = Color.prototype.mul = /** @suppress {undefinedVars, duplicate} @this{Object} */function(f) {
  var self = this.ptr;
  if (f && typeof f === 'object') f = f.ptr;
  return wrapPointer(_emscripten_bind_Color_mul_1(self, f), Color);
};;

  Color.prototype['get_r'] = Color.prototype.get_r = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Color_get_r_0(self);
};
    Color.prototype['set_r'] = Color.prototype.set_r = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Color_set_r_1(self, arg0);
};
    Object.defineProperty(Color.prototype, 'r', { get: Color.prototype.get_r, set: Color.prototype.set_r });
  Color.prototype['get_g'] = Color.prototype.get_g = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Color_get_g_0(self);
};
    Color.prototype['set_g'] = Color.prototype.set_g = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Color_set_g_1(self, arg0);
};
    Object.defineProperty(Color.prototype, 'g', { get: Color.prototype.get_g, set: Color.prototype.set_g });
  Color.prototype['get_b'] = Color.prototype.get_b = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Color_get_b_0(self);
};
    Color.prototype['set_b'] = Color.prototype.set_b = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Color_set_b_1(self, arg0);
};
    Object.defineProperty(Color.prototype, 'b', { get: Color.prototype.get_b, set: Color.prototype.set_b });
  Color.prototype['__destroy__'] = Color.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Color___destroy___0(self);
};
// Vector3
/** @suppress {undefinedVars, duplicate} @this{Object} */function Vector3(xx, yy, zz) {
  if (xx && typeof xx === 'object') xx = xx.ptr;
  if (yy && typeof yy === 'object') yy = yy.ptr;
  if (zz && typeof zz === 'object') zz = zz.ptr;
  if (xx === undefined) { this.ptr = _emscripten_bind_Vector3_Vector3_0(); getCache(Vector3)[this.ptr] = this;return }
  if (yy === undefined) { this.ptr = _emscripten_bind_Vector3_Vector3_1(xx); getCache(Vector3)[this.ptr] = this;return }
  if (zz === undefined) { this.ptr = _emscripten_bind_Vector3_Vector3_2(xx, yy); getCache(Vector3)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Vector3_Vector3_3(xx, yy, zz);
  getCache(Vector3)[this.ptr] = this;
};;
Vector3.prototype = Object.create(WrapperObject.prototype);
Vector3.prototype.constructor = Vector3;
Vector3.prototype.__class__ = Vector3;
Vector3.__cache__ = {};
Module['Vector3'] = Vector3;

Vector3.prototype['dot'] = Vector3.prototype.dot = /** @suppress {undefinedVars, duplicate} @this{Object} */function(v) {
  var self = this.ptr;
  if (v && typeof v === 'object') v = v.ptr;
  return _emscripten_bind_Vector3_dot_1(self, v);
};;

Vector3.prototype['normalize'] = Vector3.prototype.normalize = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Vector3_normalize_0(self), Vector3);
};;

Vector3.prototype['random'] = Vector3.prototype.random = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Vector3_random_0(self), Vector3);
};;

  Vector3.prototype['get_x'] = Vector3.prototype.get_x = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Vector3_get_x_0(self);
};
    Vector3.prototype['set_x'] = Vector3.prototype.set_x = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Vector3_set_x_1(self, arg0);
};
    Object.defineProperty(Vector3.prototype, 'x', { get: Vector3.prototype.get_x, set: Vector3.prototype.set_x });
  Vector3.prototype['get_y'] = Vector3.prototype.get_y = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Vector3_get_y_0(self);
};
    Vector3.prototype['set_y'] = Vector3.prototype.set_y = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Vector3_set_y_1(self, arg0);
};
    Object.defineProperty(Vector3.prototype, 'y', { get: Vector3.prototype.get_y, set: Vector3.prototype.set_y });
  Vector3.prototype['get_z'] = Vector3.prototype.get_z = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Vector3_get_z_0(self);
};
    Vector3.prototype['set_z'] = Vector3.prototype.set_z = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Vector3_set_z_1(self, arg0);
};
    Object.defineProperty(Vector3.prototype, 'z', { get: Vector3.prototype.get_z, set: Vector3.prototype.set_z });
  Vector3.prototype['__destroy__'] = Vector3.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Vector3___destroy___0(self);
};
// Camera
/** @suppress {undefinedVars, duplicate} @this{Object} */function Camera(position, width, height, fov) {
  if (position && typeof position === 'object') position = position.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  if (fov && typeof fov === 'object') fov = fov.ptr;
  this.ptr = _emscripten_bind_Camera_Camera_4(position, width, height, fov);
  getCache(Camera)[this.ptr] = this;
};;
Camera.prototype = Object.create(WrapperObject.prototype);
Camera.prototype.constructor = Camera;
Camera.prototype.__class__ = Camera;
Camera.__cache__ = {};
Module['Camera'] = Camera;

Camera.prototype['pixelToViewport'] = Camera.prototype.pixelToViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function(pixel) {
  var self = this.ptr;
  if (pixel && typeof pixel === 'object') pixel = pixel.ptr;
  return wrapPointer(_emscripten_bind_Camera_pixelToViewport_1(self, pixel), Vector3);
};;

  Camera.prototype['get_position'] = Camera.prototype.get_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Camera_get_position_0(self), Vector3);
};
    Camera.prototype['set_position'] = Camera.prototype.set_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_position_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'position', { get: Camera.prototype.get_position, set: Camera.prototype.set_position });
  Camera.prototype['get_width'] = Camera.prototype.get_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_width_0(self);
};
    Camera.prototype['set_width'] = Camera.prototype.set_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_width_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'width', { get: Camera.prototype.get_width, set: Camera.prototype.set_width });
  Camera.prototype['get_height'] = Camera.prototype.get_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_height_0(self);
};
    Camera.prototype['set_height'] = Camera.prototype.set_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_height_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'height', { get: Camera.prototype.get_height, set: Camera.prototype.set_height });
  Camera.prototype['get_invWidth'] = Camera.prototype.get_invWidth = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_invWidth_0(self);
};
    Camera.prototype['set_invWidth'] = Camera.prototype.set_invWidth = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_invWidth_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'invWidth', { get: Camera.prototype.get_invWidth, set: Camera.prototype.set_invWidth });
  Camera.prototype['get_invHeight'] = Camera.prototype.get_invHeight = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_invHeight_0(self);
};
    Camera.prototype['set_invHeight'] = Camera.prototype.set_invHeight = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_invHeight_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'invHeight', { get: Camera.prototype.get_invHeight, set: Camera.prototype.set_invHeight });
  Camera.prototype['get_fov'] = Camera.prototype.get_fov = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_fov_0(self);
};
    Camera.prototype['set_fov'] = Camera.prototype.set_fov = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_fov_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'fov', { get: Camera.prototype.get_fov, set: Camera.prototype.set_fov });
  Camera.prototype['get_aspectratio'] = Camera.prototype.get_aspectratio = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_aspectratio_0(self);
};
    Camera.prototype['set_aspectratio'] = Camera.prototype.set_aspectratio = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_aspectratio_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'aspectratio', { get: Camera.prototype.get_aspectratio, set: Camera.prototype.set_aspectratio });
  Camera.prototype['get_angle'] = Camera.prototype.get_angle = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_angle_0(self);
};
    Camera.prototype['set_angle'] = Camera.prototype.set_angle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_angle_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'angle', { get: Camera.prototype.get_angle, set: Camera.prototype.set_angle });
  Camera.prototype['get_angleX'] = Camera.prototype.get_angleX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_angleX_0(self);
};
    Camera.prototype['set_angleX'] = Camera.prototype.set_angleX = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_angleX_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'angleX', { get: Camera.prototype.get_angleX, set: Camera.prototype.set_angleX });
  Camera.prototype['get_angleY'] = Camera.prototype.get_angleY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_angleY_0(self);
};
    Camera.prototype['set_angleY'] = Camera.prototype.set_angleY = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_angleY_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'angleY', { get: Camera.prototype.get_angleY, set: Camera.prototype.set_angleY });
  Camera.prototype['get_angleZ'] = Camera.prototype.get_angleZ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Camera_get_angleZ_0(self);
};
    Camera.prototype['set_angleZ'] = Camera.prototype.set_angleZ = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Camera_set_angleZ_1(self, arg0);
};
    Object.defineProperty(Camera.prototype, 'angleZ', { get: Camera.prototype.get_angleZ, set: Camera.prototype.set_angleZ });
  Camera.prototype['__destroy__'] = Camera.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Camera___destroy___0(self);
};
// Ray
/** @suppress {undefinedVars, duplicate} @this{Object} */function Ray(origin, direction) {
  if (origin && typeof origin === 'object') origin = origin.ptr;
  if (direction && typeof direction === 'object') direction = direction.ptr;
  this.ptr = _emscripten_bind_Ray_Ray_2(origin, direction);
  getCache(Ray)[this.ptr] = this;
};;
Ray.prototype = Object.create(WrapperObject.prototype);
Ray.prototype.constructor = Ray;
Ray.prototype.__class__ = Ray;
Ray.__cache__ = {};
Module['Ray'] = Ray;

  Ray.prototype['get_origin'] = Ray.prototype.get_origin = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Ray_get_origin_0(self), Vector3);
};
    Ray.prototype['set_origin'] = Ray.prototype.set_origin = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Ray_set_origin_1(self, arg0);
};
    Object.defineProperty(Ray.prototype, 'origin', { get: Ray.prototype.get_origin, set: Ray.prototype.set_origin });
  Ray.prototype['get_direction'] = Ray.prototype.get_direction = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Ray_get_direction_0(self), Vector3);
};
    Ray.prototype['set_direction'] = Ray.prototype.set_direction = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Ray_set_direction_1(self, arg0);
};
    Object.defineProperty(Ray.prototype, 'direction', { get: Ray.prototype.get_direction, set: Ray.prototype.set_direction });
  Ray.prototype['__destroy__'] = Ray.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Ray___destroy___0(self);
};
// AmbientLight
/** @suppress {undefinedVars, duplicate} @this{Object} */function AmbientLight(intensity) {
  if (intensity && typeof intensity === 'object') intensity = intensity.ptr;
  if (intensity === undefined) { this.ptr = _emscripten_bind_AmbientLight_AmbientLight_0(); getCache(AmbientLight)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_AmbientLight_AmbientLight_1(intensity);
  getCache(AmbientLight)[this.ptr] = this;
};;
AmbientLight.prototype = Object.create(Light.prototype);
AmbientLight.prototype.constructor = AmbientLight;
AmbientLight.prototype.__class__ = AmbientLight;
AmbientLight.__cache__ = {};
Module['AmbientLight'] = AmbientLight;

AmbientLight.prototype['attenuate'] = AmbientLight.prototype.attenuate = /** @suppress {undefinedVars, duplicate} @this{Object} */function(r) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  return _emscripten_bind_AmbientLight_attenuate_1(self, r);
};;

  AmbientLight.prototype['get_position'] = AmbientLight.prototype.get_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AmbientLight_get_position_0(self), Vector3);
};
    AmbientLight.prototype['set_position'] = AmbientLight.prototype.set_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AmbientLight_set_position_1(self, arg0);
};
    Object.defineProperty(AmbientLight.prototype, 'position', { get: AmbientLight.prototype.get_position, set: AmbientLight.prototype.set_position });
  AmbientLight.prototype['get_intensity'] = AmbientLight.prototype.get_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AmbientLight_get_intensity_0(self), Vector3);
};
    AmbientLight.prototype['set_intensity'] = AmbientLight.prototype.set_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AmbientLight_set_intensity_1(self, arg0);
};
    Object.defineProperty(AmbientLight.prototype, 'intensity', { get: AmbientLight.prototype.get_intensity, set: AmbientLight.prototype.set_intensity });
  AmbientLight.prototype['get_type'] = AmbientLight.prototype.get_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AmbientLight_get_type_0(self);
};
    AmbientLight.prototype['set_type'] = AmbientLight.prototype.set_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AmbientLight_set_type_1(self, arg0);
};
    Object.defineProperty(AmbientLight.prototype, 'type', { get: AmbientLight.prototype.get_type, set: AmbientLight.prototype.set_type });
  AmbientLight.prototype['get_samples'] = AmbientLight.prototype.get_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AmbientLight_get_samples_0(self);
};
    AmbientLight.prototype['set_samples'] = AmbientLight.prototype.set_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AmbientLight_set_samples_1(self, arg0);
};
    Object.defineProperty(AmbientLight.prototype, 'samples', { get: AmbientLight.prototype.get_samples, set: AmbientLight.prototype.set_samples });
  AmbientLight.prototype['get_width'] = AmbientLight.prototype.get_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AmbientLight_get_width_0(self);
};
    AmbientLight.prototype['set_width'] = AmbientLight.prototype.set_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AmbientLight_set_width_1(self, arg0);
};
    Object.defineProperty(AmbientLight.prototype, 'width', { get: AmbientLight.prototype.get_width, set: AmbientLight.prototype.set_width });
  AmbientLight.prototype['get_height'] = AmbientLight.prototype.get_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AmbientLight_get_height_0(self);
};
    AmbientLight.prototype['set_height'] = AmbientLight.prototype.set_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AmbientLight_set_height_1(self, arg0);
};
    Object.defineProperty(AmbientLight.prototype, 'height', { get: AmbientLight.prototype.get_height, set: AmbientLight.prototype.set_height });
  AmbientLight.prototype['__destroy__'] = AmbientLight.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_AmbientLight___destroy___0(self);
};
// DirectionalLight
/** @suppress {undefinedVars, duplicate} @this{Object} */function DirectionalLight(position, intensity) {
  if (position && typeof position === 'object') position = position.ptr;
  if (intensity && typeof intensity === 'object') intensity = intensity.ptr;
  if (position === undefined) { this.ptr = _emscripten_bind_DirectionalLight_DirectionalLight_0(); getCache(DirectionalLight)[this.ptr] = this;return }
  if (intensity === undefined) { this.ptr = _emscripten_bind_DirectionalLight_DirectionalLight_1(position); getCache(DirectionalLight)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_DirectionalLight_DirectionalLight_2(position, intensity);
  getCache(DirectionalLight)[this.ptr] = this;
};;
DirectionalLight.prototype = Object.create(Light.prototype);
DirectionalLight.prototype.constructor = DirectionalLight;
DirectionalLight.prototype.__class__ = DirectionalLight;
DirectionalLight.__cache__ = {};
Module['DirectionalLight'] = DirectionalLight;

DirectionalLight.prototype['attenuate'] = DirectionalLight.prototype.attenuate = /** @suppress {undefinedVars, duplicate} @this{Object} */function(r) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  return _emscripten_bind_DirectionalLight_attenuate_1(self, r);
};;

  DirectionalLight.prototype['get_position'] = DirectionalLight.prototype.get_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_DirectionalLight_get_position_0(self), Vector3);
};
    DirectionalLight.prototype['set_position'] = DirectionalLight.prototype.set_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_DirectionalLight_set_position_1(self, arg0);
};
    Object.defineProperty(DirectionalLight.prototype, 'position', { get: DirectionalLight.prototype.get_position, set: DirectionalLight.prototype.set_position });
  DirectionalLight.prototype['get_intensity'] = DirectionalLight.prototype.get_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_DirectionalLight_get_intensity_0(self), Vector3);
};
    DirectionalLight.prototype['set_intensity'] = DirectionalLight.prototype.set_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_DirectionalLight_set_intensity_1(self, arg0);
};
    Object.defineProperty(DirectionalLight.prototype, 'intensity', { get: DirectionalLight.prototype.get_intensity, set: DirectionalLight.prototype.set_intensity });
  DirectionalLight.prototype['get_type'] = DirectionalLight.prototype.get_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_DirectionalLight_get_type_0(self);
};
    DirectionalLight.prototype['set_type'] = DirectionalLight.prototype.set_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_DirectionalLight_set_type_1(self, arg0);
};
    Object.defineProperty(DirectionalLight.prototype, 'type', { get: DirectionalLight.prototype.get_type, set: DirectionalLight.prototype.set_type });
  DirectionalLight.prototype['get_samples'] = DirectionalLight.prototype.get_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_DirectionalLight_get_samples_0(self);
};
    DirectionalLight.prototype['set_samples'] = DirectionalLight.prototype.set_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_DirectionalLight_set_samples_1(self, arg0);
};
    Object.defineProperty(DirectionalLight.prototype, 'samples', { get: DirectionalLight.prototype.get_samples, set: DirectionalLight.prototype.set_samples });
  DirectionalLight.prototype['get_width'] = DirectionalLight.prototype.get_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_DirectionalLight_get_width_0(self);
};
    DirectionalLight.prototype['set_width'] = DirectionalLight.prototype.set_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_DirectionalLight_set_width_1(self, arg0);
};
    Object.defineProperty(DirectionalLight.prototype, 'width', { get: DirectionalLight.prototype.get_width, set: DirectionalLight.prototype.set_width });
  DirectionalLight.prototype['get_height'] = DirectionalLight.prototype.get_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_DirectionalLight_get_height_0(self);
};
    DirectionalLight.prototype['set_height'] = DirectionalLight.prototype.set_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_DirectionalLight_set_height_1(self, arg0);
};
    Object.defineProperty(DirectionalLight.prototype, 'height', { get: DirectionalLight.prototype.get_height, set: DirectionalLight.prototype.set_height });
  DirectionalLight.prototype['__destroy__'] = DirectionalLight.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_DirectionalLight___destroy___0(self);
};
// PointLight
/** @suppress {undefinedVars, duplicate} @this{Object} */function PointLight(position, intensity) {
  if (position && typeof position === 'object') position = position.ptr;
  if (intensity && typeof intensity === 'object') intensity = intensity.ptr;
  if (position === undefined) { this.ptr = _emscripten_bind_PointLight_PointLight_0(); getCache(PointLight)[this.ptr] = this;return }
  if (intensity === undefined) { this.ptr = _emscripten_bind_PointLight_PointLight_1(position); getCache(PointLight)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_PointLight_PointLight_2(position, intensity);
  getCache(PointLight)[this.ptr] = this;
};;
PointLight.prototype = Object.create(Light.prototype);
PointLight.prototype.constructor = PointLight;
PointLight.prototype.__class__ = PointLight;
PointLight.__cache__ = {};
Module['PointLight'] = PointLight;

PointLight.prototype['attenuate'] = PointLight.prototype.attenuate = /** @suppress {undefinedVars, duplicate} @this{Object} */function(r) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  return _emscripten_bind_PointLight_attenuate_1(self, r);
};;

  PointLight.prototype['get_position'] = PointLight.prototype.get_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PointLight_get_position_0(self), Vector3);
};
    PointLight.prototype['set_position'] = PointLight.prototype.set_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PointLight_set_position_1(self, arg0);
};
    Object.defineProperty(PointLight.prototype, 'position', { get: PointLight.prototype.get_position, set: PointLight.prototype.set_position });
  PointLight.prototype['get_intensity'] = PointLight.prototype.get_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_PointLight_get_intensity_0(self), Vector3);
};
    PointLight.prototype['set_intensity'] = PointLight.prototype.set_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PointLight_set_intensity_1(self, arg0);
};
    Object.defineProperty(PointLight.prototype, 'intensity', { get: PointLight.prototype.get_intensity, set: PointLight.prototype.set_intensity });
  PointLight.prototype['get_type'] = PointLight.prototype.get_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_PointLight_get_type_0(self);
};
    PointLight.prototype['set_type'] = PointLight.prototype.set_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PointLight_set_type_1(self, arg0);
};
    Object.defineProperty(PointLight.prototype, 'type', { get: PointLight.prototype.get_type, set: PointLight.prototype.set_type });
  PointLight.prototype['get_samples'] = PointLight.prototype.get_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_PointLight_get_samples_0(self);
};
    PointLight.prototype['set_samples'] = PointLight.prototype.set_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PointLight_set_samples_1(self, arg0);
};
    Object.defineProperty(PointLight.prototype, 'samples', { get: PointLight.prototype.get_samples, set: PointLight.prototype.set_samples });
  PointLight.prototype['get_width'] = PointLight.prototype.get_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_PointLight_get_width_0(self);
};
    PointLight.prototype['set_width'] = PointLight.prototype.set_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PointLight_set_width_1(self, arg0);
};
    Object.defineProperty(PointLight.prototype, 'width', { get: PointLight.prototype.get_width, set: PointLight.prototype.set_width });
  PointLight.prototype['get_height'] = PointLight.prototype.get_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_PointLight_get_height_0(self);
};
    PointLight.prototype['set_height'] = PointLight.prototype.set_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_PointLight_set_height_1(self, arg0);
};
    Object.defineProperty(PointLight.prototype, 'height', { get: PointLight.prototype.get_height, set: PointLight.prototype.set_height });
  PointLight.prototype['__destroy__'] = PointLight.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_PointLight___destroy___0(self);
};
// AreaLight
/** @suppress {undefinedVars, duplicate} @this{Object} */function AreaLight(position, intensity) {
  if (position && typeof position === 'object') position = position.ptr;
  if (intensity && typeof intensity === 'object') intensity = intensity.ptr;
  if (position === undefined) { this.ptr = _emscripten_bind_AreaLight_AreaLight_0(); getCache(AreaLight)[this.ptr] = this;return }
  if (intensity === undefined) { this.ptr = _emscripten_bind_AreaLight_AreaLight_1(position); getCache(AreaLight)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_AreaLight_AreaLight_2(position, intensity);
  getCache(AreaLight)[this.ptr] = this;
};;
AreaLight.prototype = Object.create(Light.prototype);
AreaLight.prototype.constructor = AreaLight;
AreaLight.prototype.__class__ = AreaLight;
AreaLight.__cache__ = {};
Module['AreaLight'] = AreaLight;

AreaLight.prototype['attenuate'] = AreaLight.prototype.attenuate = /** @suppress {undefinedVars, duplicate} @this{Object} */function(r) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  return _emscripten_bind_AreaLight_attenuate_1(self, r);
};;

  AreaLight.prototype['get_position'] = AreaLight.prototype.get_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AreaLight_get_position_0(self), Vector3);
};
    AreaLight.prototype['set_position'] = AreaLight.prototype.set_position = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AreaLight_set_position_1(self, arg0);
};
    Object.defineProperty(AreaLight.prototype, 'position', { get: AreaLight.prototype.get_position, set: AreaLight.prototype.set_position });
  AreaLight.prototype['get_intensity'] = AreaLight.prototype.get_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_AreaLight_get_intensity_0(self), Vector3);
};
    AreaLight.prototype['set_intensity'] = AreaLight.prototype.set_intensity = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AreaLight_set_intensity_1(self, arg0);
};
    Object.defineProperty(AreaLight.prototype, 'intensity', { get: AreaLight.prototype.get_intensity, set: AreaLight.prototype.set_intensity });
  AreaLight.prototype['get_type'] = AreaLight.prototype.get_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AreaLight_get_type_0(self);
};
    AreaLight.prototype['set_type'] = AreaLight.prototype.set_type = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AreaLight_set_type_1(self, arg0);
};
    Object.defineProperty(AreaLight.prototype, 'type', { get: AreaLight.prototype.get_type, set: AreaLight.prototype.set_type });
  AreaLight.prototype['get_samples'] = AreaLight.prototype.get_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AreaLight_get_samples_0(self);
};
    AreaLight.prototype['set_samples'] = AreaLight.prototype.set_samples = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AreaLight_set_samples_1(self, arg0);
};
    Object.defineProperty(AreaLight.prototype, 'samples', { get: AreaLight.prototype.get_samples, set: AreaLight.prototype.set_samples });
  AreaLight.prototype['get_width'] = AreaLight.prototype.get_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AreaLight_get_width_0(self);
};
    AreaLight.prototype['set_width'] = AreaLight.prototype.set_width = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AreaLight_set_width_1(self, arg0);
};
    Object.defineProperty(AreaLight.prototype, 'width', { get: AreaLight.prototype.get_width, set: AreaLight.prototype.set_width });
  AreaLight.prototype['get_height'] = AreaLight.prototype.get_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_AreaLight_get_height_0(self);
};
    AreaLight.prototype['set_height'] = AreaLight.prototype.set_height = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_AreaLight_set_height_1(self, arg0);
};
    Object.defineProperty(AreaLight.prototype, 'height', { get: AreaLight.prototype.get_height, set: AreaLight.prototype.set_height });
  AreaLight.prototype['__destroy__'] = AreaLight.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_AreaLight___destroy___0(self);
};
// Sphere
/** @suppress {undefinedVars, duplicate} @this{Object} */function Sphere(center, radius, color, color_specular, ka, kd, ks, shinny, reflectScale, transparency, glossiness) {
  if (center && typeof center === 'object') center = center.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (color_specular && typeof color_specular === 'object') color_specular = color_specular.ptr;
  if (ka && typeof ka === 'object') ka = ka.ptr;
  if (kd && typeof kd === 'object') kd = kd.ptr;
  if (ks && typeof ks === 'object') ks = ks.ptr;
  if (shinny && typeof shinny === 'object') shinny = shinny.ptr;
  if (reflectScale && typeof reflectScale === 'object') reflectScale = reflectScale.ptr;
  if (transparency && typeof transparency === 'object') transparency = transparency.ptr;
  if (glossiness && typeof glossiness === 'object') glossiness = glossiness.ptr;
  if (transparency === undefined) { this.ptr = _emscripten_bind_Sphere_Sphere_9(center, radius, color, color_specular, ka, kd, ks, shinny, reflectScale); getCache(Sphere)[this.ptr] = this;return }
  if (glossiness === undefined) { this.ptr = _emscripten_bind_Sphere_Sphere_10(center, radius, color, color_specular, ka, kd, ks, shinny, reflectScale, transparency); getCache(Sphere)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_Sphere_Sphere_11(center, radius, color, color_specular, ka, kd, ks, shinny, reflectScale, transparency, glossiness);
  getCache(Sphere)[this.ptr] = this;
};;
Sphere.prototype = Object.create(Shape.prototype);
Sphere.prototype.constructor = Sphere;
Sphere.prototype.__class__ = Sphere;
Sphere.__cache__ = {};
Module['Sphere'] = Sphere;

Sphere.prototype['getNormal'] = Sphere.prototype.getNormal = /** @suppress {undefinedVars, duplicate} @this{Object} */function(hitPoint) {
  var self = this.ptr;
  if (hitPoint && typeof hitPoint === 'object') hitPoint = hitPoint.ptr;
  return wrapPointer(_emscripten_bind_Sphere_getNormal_1(self, hitPoint), Vector3);
};;

  Sphere.prototype['get_center'] = Sphere.prototype.get_center = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sphere_get_center_0(self), Vector3);
};
    Sphere.prototype['set_center'] = Sphere.prototype.set_center = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_center_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'center', { get: Sphere.prototype.get_center, set: Sphere.prototype.set_center });
  Sphere.prototype['get_radius'] = Sphere.prototype.get_radius = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_radius_0(self);
};
    Sphere.prototype['set_radius'] = Sphere.prototype.set_radius = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_radius_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'radius', { get: Sphere.prototype.get_radius, set: Sphere.prototype.set_radius });
  Sphere.prototype['get_radius2'] = Sphere.prototype.get_radius2 = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_radius2_0(self);
};
    Sphere.prototype['set_radius2'] = Sphere.prototype.set_radius2 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_radius2_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'radius2', { get: Sphere.prototype.get_radius2, set: Sphere.prototype.set_radius2 });
  Sphere.prototype['get_color'] = Sphere.prototype.get_color = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sphere_get_color_0(self), Color);
};
    Sphere.prototype['set_color'] = Sphere.prototype.set_color = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_color_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'color', { get: Sphere.prototype.get_color, set: Sphere.prototype.set_color });
  Sphere.prototype['get_color_specular'] = Sphere.prototype.get_color_specular = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Sphere_get_color_specular_0(self), Color);
};
    Sphere.prototype['set_color_specular'] = Sphere.prototype.set_color_specular = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_color_specular_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'color_specular', { get: Sphere.prototype.get_color_specular, set: Sphere.prototype.set_color_specular });
  Sphere.prototype['get_ka'] = Sphere.prototype.get_ka = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_ka_0(self);
};
    Sphere.prototype['set_ka'] = Sphere.prototype.set_ka = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_ka_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'ka', { get: Sphere.prototype.get_ka, set: Sphere.prototype.set_ka });
  Sphere.prototype['get_kd'] = Sphere.prototype.get_kd = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_kd_0(self);
};
    Sphere.prototype['set_kd'] = Sphere.prototype.set_kd = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_kd_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'kd', { get: Sphere.prototype.get_kd, set: Sphere.prototype.set_kd });
  Sphere.prototype['get_ks'] = Sphere.prototype.get_ks = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_ks_0(self);
};
    Sphere.prototype['set_ks'] = Sphere.prototype.set_ks = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_ks_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'ks', { get: Sphere.prototype.get_ks, set: Sphere.prototype.set_ks });
  Sphere.prototype['get_shininess'] = Sphere.prototype.get_shininess = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_shininess_0(self);
};
    Sphere.prototype['set_shininess'] = Sphere.prototype.set_shininess = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_shininess_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'shininess', { get: Sphere.prototype.get_shininess, set: Sphere.prototype.set_shininess });
  Sphere.prototype['get_reflectivity'] = Sphere.prototype.get_reflectivity = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_reflectivity_0(self);
};
    Sphere.prototype['set_reflectivity'] = Sphere.prototype.set_reflectivity = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_reflectivity_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'reflectivity', { get: Sphere.prototype.get_reflectivity, set: Sphere.prototype.set_reflectivity });
  Sphere.prototype['get_transparency'] = Sphere.prototype.get_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_transparency_0(self);
};
    Sphere.prototype['set_transparency'] = Sphere.prototype.set_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_transparency_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'transparency', { get: Sphere.prototype.get_transparency, set: Sphere.prototype.set_transparency });
  Sphere.prototype['get_glossiness'] = Sphere.prototype.get_glossiness = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_glossiness_0(self);
};
    Sphere.prototype['set_glossiness'] = Sphere.prototype.set_glossiness = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_glossiness_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'glossiness', { get: Sphere.prototype.get_glossiness, set: Sphere.prototype.set_glossiness });
  Sphere.prototype['get_glossy_transparency'] = Sphere.prototype.get_glossy_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_Sphere_get_glossy_transparency_0(self);
};
    Sphere.prototype['set_glossy_transparency'] = Sphere.prototype.set_glossy_transparency = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Sphere_set_glossy_transparency_1(self, arg0);
};
    Object.defineProperty(Sphere.prototype, 'glossy_transparency', { get: Sphere.prototype.get_glossy_transparency, set: Sphere.prototype.set_glossy_transparency });
  Sphere.prototype['__destroy__'] = Sphere.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Sphere___destroy___0(self);
};
// Scene
/** @suppress {undefinedVars, duplicate} @this{Object} */function Scene() {
  this.ptr = _emscripten_bind_Scene_Scene_0();
  getCache(Scene)[this.ptr] = this;
};;
Scene.prototype = Object.create(WrapperObject.prototype);
Scene.prototype.constructor = Scene;
Scene.prototype.__class__ = Scene;
Scene.__cache__ = {};
Module['Scene'] = Scene;

Scene.prototype['addAmbientLight'] = Scene.prototype.addAmbientLight = /** @suppress {undefinedVars, duplicate} @this{Object} */function(light) {
  var self = this.ptr;
  if (light && typeof light === 'object') light = light.ptr;
  _emscripten_bind_Scene_addAmbientLight_1(self, light);
};;

Scene.prototype['addLight'] = Scene.prototype.addLight = /** @suppress {undefinedVars, duplicate} @this{Object} */function(light) {
  var self = this.ptr;
  if (light && typeof light === 'object') light = light.ptr;
  _emscripten_bind_Scene_addLight_1(self, light);
};;

Scene.prototype['addObject'] = Scene.prototype.addObject = /** @suppress {undefinedVars, duplicate} @this{Object} */function(shape) {
  var self = this.ptr;
  if (shape && typeof shape === 'object') shape = shape.ptr;
  _emscripten_bind_Scene_addObject_1(self, shape);
};;

  Scene.prototype['get_backgroundColor'] = Scene.prototype.get_backgroundColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Scene_get_backgroundColor_0(self), Color);
};
    Scene.prototype['set_backgroundColor'] = Scene.prototype.set_backgroundColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Scene_set_backgroundColor_1(self, arg0);
};
    Object.defineProperty(Scene.prototype, 'backgroundColor', { get: Scene.prototype.get_backgroundColor, set: Scene.prototype.set_backgroundColor });
  Scene.prototype['get_ambientLight'] = Scene.prototype.get_ambientLight = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_Scene_get_ambientLight_0(self), AmbientLight);
};
    Scene.prototype['set_ambientLight'] = Scene.prototype.set_ambientLight = /** @suppress {undefinedVars, duplicate} @this{Object} */function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_Scene_set_ambientLight_1(self, arg0);
};
    Object.defineProperty(Scene.prototype, 'ambientLight', { get: Scene.prototype.get_ambientLight, set: Scene.prototype.set_ambientLight });
  Scene.prototype['__destroy__'] = Scene.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Scene___destroy___0(self);
};
// Renderer
/** @suppress {undefinedVars, duplicate} @this{Object} */function Renderer(width, height, scene, camera) {
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  if (scene && typeof scene === 'object') scene = scene.ptr;
  if (camera && typeof camera === 'object') camera = camera.ptr;
  this.ptr = _emscripten_bind_Renderer_Renderer_4(width, height, scene, camera);
  getCache(Renderer)[this.ptr] = this;
};;
Renderer.prototype = Object.create(WrapperObject.prototype);
Renderer.prototype.constructor = Renderer;
Renderer.prototype.__class__ = Renderer;
Renderer.__cache__ = {};
Module['Renderer'] = Renderer;

Renderer.prototype['trace'] = Renderer.prototype.trace = /** @suppress {undefinedVars, duplicate} @this{Object} */function(ray, depth) {
  var self = this.ptr;
  if (ray && typeof ray === 'object') ray = ray.ptr;
  if (depth && typeof depth === 'object') depth = depth.ptr;
  return wrapPointer(_emscripten_bind_Renderer_trace_2(self, ray, depth), Color);
};;

  Renderer.prototype['__destroy__'] = Renderer.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_Renderer___destroy___0(self);
};