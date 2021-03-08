#include <emscripten/bind.h>
#include <emscripten/val.h>
using namespace emscripten;

#define MAX_RAY_DEPTH 5

class Renderer {
  public:
    int width, height;
    Scene scene;
    Camera camera;
    Color *image;
    uint32_t *buffer;
    
    Renderer(float _width, float _height, const Scene& _scene, const Camera& _camera) : 
      width(_width), height(_height), scene(_scene), camera(_camera) {
        buffer = new uint32_t[width * height];

        for (size_t i = 0; i < _scene.objects.size(); i++) {
          Shape* obj = _scene.objects[i];
        }
      }
    ~Renderer() {
      delete [] image;
      delete [] buffer;
    }

     void render_distributed_rays() { 
       int samples = 16;
       float inv_samples = 1 / (float) samples;

       if (image) delete [] image;
       image = new Color[width * height];
       Color* pixel = image;

       for (int y = 0; y < height; y++) {
         for (int x = 0; x < width; x++, pixel++) {
           for (int s = 0; s < samples; s++) {
             Vector3 r = Vector3::random();
             float jx = x + r.x;
             float jy = y + r.y;

             // Send a jittered ray through each pixel
             Vector3 rayDirection = camera.pixelToViewport( Vector3(jx, jy, 1) );

             Ray ray(camera.position, rayDirection);

             // Sent pixel for traced ray
             *pixel += trace(ray, 0) * inv_samples;
           } 
         }
       }

       setImage();
     }

    Color trace(const Ray &ray, const int depth) {
      Color rayColor;
      float tnear = INFINITY;
      Shape* hit = NULL;
      // Find nearest intersection with ray and objects in scene
      for (int i = 0; i < scene.objects.size(); i++) {
        float t0 = INFINITY, t1 = INFINITY;
        if (scene.objects[i]->intersect(ray, &t0, &t1)) {
          if (t0 < 0) t0 = t1;
          if (t0 < tnear) {
            tnear = t0;
            hit = scene.objects[i];
          }
        }
      }
      if (!hit) {
        if (depth < 1)
          return scene.backgroundColor;
        else
          return Color();
      }

      Vector3 hitPoint = ray.origin + ray.direction * tnear;
      Vector3 N = hit->getNormal(hitPoint);
      N.normalize();
      Vector3 V = camera.position - hitPoint;
      V.normalize();

      rayColor = Lighting::getLighting(*hit, hitPoint, N, V, scene.lights, scene.objects);

      float bias = 1e-4;
      bool inside = false;
      if (ray.direction.dot(N) > 0) N = -N, inside = true;
      if( (hit->transparency > 0 || hit->reflectivity > 0) && depth < MAX_RAY_DEPTH) {
          
          // Compute Reflection Ray and Color 
          Vector3 R = ray.direction - N * 2 * ray.direction.dot(N);
          R = R + Vector3::random() * hit->glossiness;
          R.normalize();

          Ray rRay(hitPoint + N * bias, R);
          float VdotR =  max(0.0f, V.dot(-R));
          Color reflectionColor = trace(rRay,  depth + 1); //* VdotR;
          Color refractionColor = Color();

          if (hit->transparency > 0) {
            // Compute Refracted Ray (transmission ray) and Color
            float ni = 1.0;
            float nt = 1.1;
            float nit = ni / nt;
            if(inside) nit = 1 / nit;
            float costheta = - N.dot(ray.direction);
            float k = 1 - nit * nit * (1 - costheta * costheta);
            Vector3 T = ray.direction * nit + N * (nit * costheta - sqrt(k));
            T = T + Vector3::random() * hit->glossy_transparency;
            T.normalize();

            Ray refractionRay(hitPoint - N * bias, T);
            refractionColor = trace(refractionRay, depth + 1);
            rayColor = (reflectionColor * hit->reflectivity) + (refractionColor * hit->transparency);
          }
          else {
            rayColor = rayColor + (reflectionColor * hit->reflectivity);
          }
          return rayColor;
        }
        else {
          return rayColor; 
        }
    }

  private:
     void setImage() {
       for (size_t i = 0; i < width * height; i++) {
          Color pixel = image[i].clamp();
          uint32_t p = ((uint8_t)pixel.r) << 24 | ((uint8_t)pixel.g << 16) | ((uint8_t)pixel.b << 8) | 255;
          buffer[i] = p;
       }
     }    
};

// Binding code
EMSCRIPTEN_BINDINGS(Renderer) {
  class_<Renderer>("Renderer")
    .constructor<float, float, const Scene&, const Camera&>()    
    .function("render_distributed_rays", &Renderer::render_distributed_rays)    
    .function("trace", &Renderer::trace)
    ;
}