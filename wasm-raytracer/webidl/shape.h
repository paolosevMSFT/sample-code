#define K_EPSILON 0.00001

class Shape {
  public:
    Color color;              // Surface Diffuse Color
    Color color_specular;     // Surface Specular Color
    float ka, kd, ks;         // Ambient, Diffuse, Specular Coefficents
    float shininess;
    float reflectivity;       // Reflectivity of material [0, 1]
    float transparency;       // Transparency of material [0, 1]
    float glossiness;         // Strength of glossy reflections
    float glossy_transparency; // Strength of glossy transparency

    Shape(const Color &_color, const Color &_color_specular,
      const float _ka, const float _kd, const float _ks, const float _shinny, 
      const float _reflectScale, const float _transparency, const float _glossiness) :
        color(_color), color_specular(_color_specular), ka(_ka),
        kd(_kd), ks(_ks), shininess(_shinny), reflectivity(_reflectScale),
        transparency(_transparency), glossiness(_glossiness), glossy_transparency(0) {}    
    virtual ~Shape() {}

    virtual bool intersect(const Ray &ray, float* to, float* t1) = 0;
    virtual Vector3 getNormal(const Vector3 &hitPoint) = 0;
};

class Sphere : public Shape {
  public:
    Vector3 center;           // Position
    float radius, radius2;

    Sphere(
      const Vector3 &_center, const float _radius, const Color &_color, const Color &_color_specular, 
      const float _ka, const float _kd, const float _ks, const float _shinny = 128.0, 
      const float _reflectScale = 1.0, const float _transparency = 0.0, const float _glossiness = 0.0) :
      Shape(_color, _color_specular, _ka, _kd, _ks, _shinny, _reflectScale, _transparency, _glossiness),
      center(_center), radius(_radius), radius2(_radius * _radius) { 
    }
    
    // Compute a ray-sphere intersection using the geometric method
    bool intersect(const Ray &ray, float* t0, float* t1) {
      Vector3 l = center - ray.origin;
      float tca = l.dot(ray.direction); // Closest approach
      if (tca < 0) return false; // Ray intersection behind ray origin
      float d2 = l.dot(l) - tca*tca;
      if (d2 > radius2) return false; // Ray doesn't intersect
      float thc = sqrt(radius2 - d2); // Closest approach to surface of sphere
      *t0 = tca - thc;
      *t1 = tca + thc;
      return true;
    }

    Vector3 getNormal(const Vector3 &hitPoint) {
      return (hitPoint - center) / radius;
    }
};
