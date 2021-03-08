#include <vector>
#include <emscripten/bind.h>
using namespace emscripten;

class Scene {
  public:
    std::vector<Shape*> objects;
    std::vector<Light*> lights;
    AmbientLight ambientLight;
    Color backgroundColor;

    Scene() { backgroundColor = Color(); }

    void addAmbientLight(const AmbientLight& _light) {
      ambientLight = _light;
    }
    void addLight(Light *_light) {
      lights.push_back(_light);
    }
    void addObject(Shape *_object) {  
      objects.push_back(_object);
    }
};

// Binding code
EMSCRIPTEN_BINDINGS(scene) {
  class_<Scene>("Scene")
    .constructor<>()    
    .function("addAmbientLight", &Scene::addAmbientLight)   
    .function("addLight", &Scene::addLight, allow_raw_pointers())
    .function("addObject", &Scene::addObject, allow_raw_pointers())
    .property("ambientLight", &Scene::ambientLight)
    .property("backgroundColor", &Scene::backgroundColor)    
    ;
}