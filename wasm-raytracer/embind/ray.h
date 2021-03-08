#include <emscripten/bind.h>
using namespace emscripten;

class Ray {
  public:
    Vector3 origin;
    Vector3 direction;
    
    Ray(const Vector3& _origin, const Vector3& _direction) : origin(_origin), direction(_direction) {}
};

// Binding code
EMSCRIPTEN_BINDINGS(ray) {
  class_<Ray>("Ray")
    .constructor<Vector3&, Vector3&>()    
    .property("origin", &Ray::origin)
    .property("direction", &Ray::direction)    
    ;
}