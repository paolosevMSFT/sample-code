#include <emscripten/bind.h>
using namespace emscripten;

class Light {
  public:
    Vector3 position;
    Vector3 intensity;
    unsigned char type;

    int samples;
    float width, height;

    Light() : position(Vector3()), intensity(Vector3()) { type = 0x01; }
    Light(Vector3 _intensity) : position(Vector3()), intensity(_intensity) { type = 0x01; } 
    Light(Vector3 _position, Vector3 _intensity) : position(_position), intensity(_intensity) { type = 0x01; }

    virtual ~Light() {}
    virtual float attenuate(const float r) const = 0;// { return 1.0; }
};

class AmbientLight : public Light {
  public:
    AmbientLight() : Light() { type = 0x02; }
    AmbientLight(const Vector3& _intensity) : Light(_intensity) { type = 0x02; }
    float attenuate(const float r) const { return 1.0; }
};

class DirectionalLight : public Light {
  public:
    DirectionalLight() : Light() { type = 0x04; }
    DirectionalLight(const Vector3& _position, const Vector3& _intensity) : Light(_position, _intensity) { type = 0x04; }
    float attenuate(const float r) const { return 1.0; }
};

class PointLight : public Light {
  public:
    PointLight() : Light() { type = 0x08; }
    PointLight(const Vector3& _position, const Vector3& _intensity) : Light(_position, _intensity) { type = 0x08; }
    float attenuate(const float r) const { return 1.0 / (r * r); }
};

class SpotLight : public Light {
  public:
    SpotLight() : Light() { type = 0x10; }
    SpotLight(const Vector3& _position, const Vector3& _intensity) : Light(_position, _intensity) { type = 0x10; }
    float attenuate(Vector3 Vobj, Vector3 Vlight) const { return Vobj.dot(Vlight); }
};

class AreaLight : public Light {
  public:
    AreaLight() : Light() {
      type = 0x20;
      samples = 2;
      width = 4;
      height = 4;
    }
    AreaLight(Vector3 _position, Vector3 _intensity) : Light(_position, _intensity) {
      type = 0x20;
      samples = 2;
      width = 4;
      height = 4;
    }
    float attenuate(const float r) const { return 1.0; }
};

// Binding code

struct LightWrapper : public wrapper<Light> {
    EMSCRIPTEN_WRAPPER(LightWrapper);
    float attenuate(const float r) const {
        return call<float>("attenuate", r);
    }
};

EMSCRIPTEN_BINDINGS(light) {
  class_<Light>("Light")
    .allow_subclass<LightWrapper>("LightWrapper")  
    .function("attenuate", &Light::attenuate, pure_virtual())
    .property("position", &Light::position)
    .property("intensity", &Light::intensity)
    .property("type", &Light::type)
    .property("samples", &Light::samples)
    .property("width", &Light::width)
    .property("height", &Light::height)
    ;
  class_<AmbientLight, base<Light>>("AmbientLight")
    .constructor<>()
    .constructor<Vector3>()
    .function("attenuate", &AmbientLight::attenuate)
    ;
  class_<DirectionalLight, base<Light>>("DirectionalLight")
    .constructor<>()
    .constructor<Vector3, Vector3>()
    .function("attenuate", &DirectionalLight::attenuate)
    ;
  class_<PointLight, base<Light>>("PointLight")
    .constructor<>()
    .constructor<Vector3, Vector3>()
    .function("attenuate", &PointLight::attenuate)
    ;
  class_<AreaLight, base<Light>>("AreaLight")
    .constructor<>()
    .constructor<Vector3, Vector3>()
    .function("attenuate", &AreaLight::attenuate)
    ;       
}