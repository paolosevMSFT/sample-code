#include <vector>

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
