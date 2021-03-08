
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.

EM_JS(void, array_bounds_check_error, (size_t idx, size_t size), {
  throw 'Array index ' + idx + ' out of bounds: [0,' + size + ')';
});

void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    array_bounds_check_error(array_idx, array_size);
  }
}

// Light

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_attenuate_1(Light* self, const float r) {
  return self->attenuate(r);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_get_position_0(Light* self) {
  return &self->position;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_set_position_1(Light* self, Vector3* arg0) {
  self->position = *arg0;
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_get_intensity_0(Light* self) {
  return &self->intensity;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_set_intensity_1(Light* self, Vector3* arg0) {
  self->intensity = *arg0;
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_get_type_0(Light* self) {
  return self->type;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_set_type_1(Light* self, char arg0) {
  self->type = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_get_samples_0(Light* self) {
  return self->samples;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_set_samples_1(Light* self, int arg0) {
  self->samples = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_get_width_0(Light* self) {
  return self->width;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_set_width_1(Light* self, float arg0) {
  self->width = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_get_height_0(Light* self) {
  return self->height;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Light_set_height_1(Light* self, float arg0) {
  self->height = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Light___destroy___0(Light* self) {
  delete self;
}

// Shape

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_getNormal_1(Shape* self, const Vector3* hitPoint) {
  static Vector3 temp;
  return (temp = self->getNormal(*hitPoint), &temp);
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_color_0(Shape* self) {
  return &self->color;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_color_1(Shape* self, Color* arg0) {
  self->color = *arg0;
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_color_specular_0(Shape* self) {
  return &self->color_specular;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_color_specular_1(Shape* self, Color* arg0) {
  self->color_specular = *arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_ka_0(Shape* self) {
  return self->ka;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_ka_1(Shape* self, float arg0) {
  self->ka = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_kd_0(Shape* self) {
  return self->kd;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_kd_1(Shape* self, float arg0) {
  self->kd = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_ks_0(Shape* self) {
  return self->ks;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_ks_1(Shape* self, float arg0) {
  self->ks = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_shininess_0(Shape* self) {
  return self->shininess;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_shininess_1(Shape* self, float arg0) {
  self->shininess = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_reflectivity_0(Shape* self) {
  return self->reflectivity;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_reflectivity_1(Shape* self, float arg0) {
  self->reflectivity = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_transparency_0(Shape* self) {
  return self->transparency;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_transparency_1(Shape* self, float arg0) {
  self->transparency = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_glossiness_0(Shape* self) {
  return self->glossiness;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_glossiness_1(Shape* self, float arg0) {
  self->glossiness = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_get_glossy_transparency_0(Shape* self) {
  return self->glossy_transparency;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape_set_glossy_transparency_1(Shape* self, float arg0) {
  self->glossy_transparency = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Shape___destroy___0(Shape* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// Color

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_Color_0() {
  return new Color();
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_Color_1(float r) {
  return new Color(r);
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_Color_3(float r, float g, float b) {
  return new Color(r, g, b);
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_clamp_0(Color* self) {
  return &self->clamp();
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_add_1(Color* self, const Color* c) {
  return &self->add(*c);
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_mul_1(Color* self, float f) {
  static Color temp;
  return (temp = self->mul(f), &temp);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_get_r_0(Color* self) {
  return self->r;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_set_r_1(Color* self, float arg0) {
  self->r = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_get_g_0(Color* self) {
  return self->g;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_set_g_1(Color* self, float arg0) {
  self->g = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_get_b_0(Color* self) {
  return self->b;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Color_set_b_1(Color* self, float arg0) {
  self->b = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Color___destroy___0(Color* self) {
  delete self;
}

// Vector3

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_Vector3_0() {
  return new Vector3();
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_Vector3_1(float xx) {
  return new Vector3(xx);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_Vector3_3(float xx, float yy, float zz) {
  return new Vector3(xx, yy, zz);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_dot_1(Vector3* self, const Vector3* v) {
  return self->dot(*v);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_normalize_0(Vector3* self) {
  return &self->normalize();
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_random_0(Vector3* self) {
  static Vector3 temp;
  return (temp = self->random(), &temp);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_get_x_0(Vector3* self) {
  return self->x;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_set_x_1(Vector3* self, float arg0) {
  self->x = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_get_y_0(Vector3* self) {
  return self->y;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_set_y_1(Vector3* self, float arg0) {
  self->y = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_get_z_0(Vector3* self) {
  return self->z;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3_set_z_1(Vector3* self, float arg0) {
  self->z = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Vector3___destroy___0(Vector3* self) {
  delete self;
}

// Camera

Camera* EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_Camera_4(const Vector3* position, int width, int height, float fov) {
  return new Camera(*position, width, height, fov);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_pixelToViewport_1(Camera* self, const Vector3* pixel) {
  static Vector3 temp;
  return (temp = self->pixelToViewport(*pixel), &temp);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_position_0(Camera* self) {
  return &self->position;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_position_1(Camera* self, Vector3* arg0) {
  self->position = *arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_width_0(Camera* self) {
  return self->width;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_width_1(Camera* self, int arg0) {
  self->width = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_height_0(Camera* self) {
  return self->height;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_height_1(Camera* self, int arg0) {
  self->height = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_invWidth_0(Camera* self) {
  return self->invWidth;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_invWidth_1(Camera* self, float arg0) {
  self->invWidth = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_invHeight_0(Camera* self) {
  return self->invHeight;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_invHeight_1(Camera* self, float arg0) {
  self->invHeight = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_fov_0(Camera* self) {
  return self->fov;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_fov_1(Camera* self, float arg0) {
  self->fov = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_aspectratio_0(Camera* self) {
  return self->aspectratio;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_aspectratio_1(Camera* self, float arg0) {
  self->aspectratio = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_angle_0(Camera* self) {
  return self->angle;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_angle_1(Camera* self, float arg0) {
  self->angle = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_angleX_0(Camera* self) {
  return self->angleX;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_angleX_1(Camera* self, float arg0) {
  self->angleX = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_angleY_0(Camera* self) {
  return self->angleY;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_angleY_1(Camera* self, float arg0) {
  self->angleY = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_get_angleZ_0(Camera* self) {
  return self->angleZ;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera_set_angleZ_1(Camera* self, float arg0) {
  self->angleZ = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Camera___destroy___0(Camera* self) {
  delete self;
}

// Ray

Ray* EMSCRIPTEN_KEEPALIVE emscripten_bind_Ray_Ray_2(const Vector3* origin, const Vector3* direction) {
  return new Ray(*origin, *direction);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Ray_get_origin_0(Ray* self) {
  return &self->origin;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Ray_set_origin_1(Ray* self, Vector3* arg0) {
  self->origin = *arg0;
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Ray_get_direction_0(Ray* self) {
  return &self->direction;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Ray_set_direction_1(Ray* self, Vector3* arg0) {
  self->direction = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Ray___destroy___0(Ray* self) {
  delete self;
}

// AmbientLight

AmbientLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_AmbientLight_0() {
  return new AmbientLight();
}

AmbientLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_AmbientLight_1(const Vector3* intensity) {
  return new AmbientLight(*intensity);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_attenuate_1(AmbientLight* self, const float r) {
  return self->attenuate(r);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_get_position_0(AmbientLight* self) {
  return &self->position;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_set_position_1(AmbientLight* self, Vector3* arg0) {
  self->position = *arg0;
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_get_intensity_0(AmbientLight* self) {
  return &self->intensity;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_set_intensity_1(AmbientLight* self, Vector3* arg0) {
  self->intensity = *arg0;
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_get_type_0(AmbientLight* self) {
  return self->type;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_set_type_1(AmbientLight* self, char arg0) {
  self->type = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_get_samples_0(AmbientLight* self) {
  return self->samples;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_set_samples_1(AmbientLight* self, int arg0) {
  self->samples = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_get_width_0(AmbientLight* self) {
  return self->width;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_set_width_1(AmbientLight* self, float arg0) {
  self->width = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_get_height_0(AmbientLight* self) {
  return self->height;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight_set_height_1(AmbientLight* self, float arg0) {
  self->height = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AmbientLight___destroy___0(AmbientLight* self) {
  delete self;
}

// DirectionalLight

DirectionalLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_DirectionalLight_0() {
  return new DirectionalLight();
}

DirectionalLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_DirectionalLight_2(const Vector3* position, const Vector3* intensity) {
  return new DirectionalLight(*position, *intensity);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_attenuate_1(DirectionalLight* self, const float r) {
  return self->attenuate(r);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_get_position_0(DirectionalLight* self) {
  return &self->position;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_set_position_1(DirectionalLight* self, Vector3* arg0) {
  self->position = *arg0;
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_get_intensity_0(DirectionalLight* self) {
  return &self->intensity;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_set_intensity_1(DirectionalLight* self, Vector3* arg0) {
  self->intensity = *arg0;
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_get_type_0(DirectionalLight* self) {
  return self->type;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_set_type_1(DirectionalLight* self, char arg0) {
  self->type = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_get_samples_0(DirectionalLight* self) {
  return self->samples;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_set_samples_1(DirectionalLight* self, int arg0) {
  self->samples = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_get_width_0(DirectionalLight* self) {
  return self->width;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_set_width_1(DirectionalLight* self, float arg0) {
  self->width = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_get_height_0(DirectionalLight* self) {
  return self->height;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight_set_height_1(DirectionalLight* self, float arg0) {
  self->height = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DirectionalLight___destroy___0(DirectionalLight* self) {
  delete self;
}

// PointLight

PointLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_PointLight_0() {
  return new PointLight();
}

PointLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_PointLight_2(const Vector3* position, const Vector3* intensity) {
  return new PointLight(*position, *intensity);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_attenuate_1(PointLight* self, const float r) {
  return self->attenuate(r);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_get_position_0(PointLight* self) {
  return &self->position;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_set_position_1(PointLight* self, Vector3* arg0) {
  self->position = *arg0;
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_get_intensity_0(PointLight* self) {
  return &self->intensity;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_set_intensity_1(PointLight* self, Vector3* arg0) {
  self->intensity = *arg0;
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_get_type_0(PointLight* self) {
  return self->type;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_set_type_1(PointLight* self, char arg0) {
  self->type = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_get_samples_0(PointLight* self) {
  return self->samples;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_set_samples_1(PointLight* self, int arg0) {
  self->samples = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_get_width_0(PointLight* self) {
  return self->width;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_set_width_1(PointLight* self, float arg0) {
  self->width = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_get_height_0(PointLight* self) {
  return self->height;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight_set_height_1(PointLight* self, float arg0) {
  self->height = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_PointLight___destroy___0(PointLight* self) {
  delete self;
}

// AreaLight

AreaLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_AreaLight_0() {
  return new AreaLight();
}

AreaLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_AreaLight_2(const Vector3* position, const Vector3* intensity) {
  return new AreaLight(*position, *intensity);
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_attenuate_1(AreaLight* self, const float r) {
  return self->attenuate(r);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_get_position_0(AreaLight* self) {
  return &self->position;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_set_position_1(AreaLight* self, Vector3* arg0) {
  self->position = *arg0;
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_get_intensity_0(AreaLight* self) {
  return &self->intensity;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_set_intensity_1(AreaLight* self, Vector3* arg0) {
  self->intensity = *arg0;
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_get_type_0(AreaLight* self) {
  return self->type;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_set_type_1(AreaLight* self, char arg0) {
  self->type = arg0;
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_get_samples_0(AreaLight* self) {
  return self->samples;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_set_samples_1(AreaLight* self, int arg0) {
  self->samples = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_get_width_0(AreaLight* self) {
  return self->width;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_set_width_1(AreaLight* self, float arg0) {
  self->width = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_get_height_0(AreaLight* self) {
  return self->height;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight_set_height_1(AreaLight* self, float arg0) {
  self->height = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_AreaLight___destroy___0(AreaLight* self) {
  delete self;
}

// Sphere

Sphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_Sphere_9(const Vector3* center, const float radius, const Color* color, const Color* color_specular, const float ka, const float kd, const float ks, const float shinny, const float reflectScale) {
  return new Sphere(*center, radius, *color, *color_specular, ka, kd, ks, shinny, reflectScale);
}

Sphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_Sphere_10(const Vector3* center, const float radius, const Color* color, const Color* color_specular, const float ka, const float kd, const float ks, const float shinny, const float reflectScale, const float transparency) {
  return new Sphere(*center, radius, *color, *color_specular, ka, kd, ks, shinny, reflectScale, transparency);
}

Sphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_Sphere_11(const Vector3* center, const float radius, const Color* color, const Color* color_specular, const float ka, const float kd, const float ks, const float shinny, const float reflectScale, const float transparency, const float glossiness) {
  return new Sphere(*center, radius, *color, *color_specular, ka, kd, ks, shinny, reflectScale, transparency, glossiness);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_getNormal_1(Sphere* self, const Vector3* hitPoint) {
  static Vector3 temp;
  return (temp = self->getNormal(*hitPoint), &temp);
}

Vector3* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_center_0(Sphere* self) {
  return &self->center;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_center_1(Sphere* self, Vector3* arg0) {
  self->center = *arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_radius_0(Sphere* self) {
  return self->radius;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_radius_1(Sphere* self, float arg0) {
  self->radius = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_radius2_0(Sphere* self) {
  return self->radius2;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_radius2_1(Sphere* self, float arg0) {
  self->radius2 = arg0;
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_color_0(Sphere* self) {
  return &self->color;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_color_1(Sphere* self, Color* arg0) {
  self->color = *arg0;
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_color_specular_0(Sphere* self) {
  return &self->color_specular;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_color_specular_1(Sphere* self, Color* arg0) {
  self->color_specular = *arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_ka_0(Sphere* self) {
  return self->ka;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_ka_1(Sphere* self, float arg0) {
  self->ka = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_kd_0(Sphere* self) {
  return self->kd;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_kd_1(Sphere* self, float arg0) {
  self->kd = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_ks_0(Sphere* self) {
  return self->ks;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_ks_1(Sphere* self, float arg0) {
  self->ks = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_shininess_0(Sphere* self) {
  return self->shininess;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_shininess_1(Sphere* self, float arg0) {
  self->shininess = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_reflectivity_0(Sphere* self) {
  return self->reflectivity;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_reflectivity_1(Sphere* self, float arg0) {
  self->reflectivity = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_transparency_0(Sphere* self) {
  return self->transparency;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_transparency_1(Sphere* self, float arg0) {
  self->transparency = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_glossiness_0(Sphere* self) {
  return self->glossiness;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_glossiness_1(Sphere* self, float arg0) {
  self->glossiness = arg0;
}

float EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_get_glossy_transparency_0(Sphere* self) {
  return self->glossy_transparency;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere_set_glossy_transparency_1(Sphere* self, float arg0) {
  self->glossy_transparency = arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Sphere___destroy___0(Sphere* self) {
  delete self;
}

// Scene

Scene* EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_Scene_0() {
  return new Scene();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_addAmbientLight_1(Scene* self, const AmbientLight* light) {
  self->addAmbientLight(*light);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_addLight_1(Scene* self, Light* light) {
  self->addLight(light);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_addObject_1(Scene* self, Shape* shape) {
  self->addObject(shape);
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_get_backgroundColor_0(Scene* self) {
  return &self->backgroundColor;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_set_backgroundColor_1(Scene* self, Color* arg0) {
  self->backgroundColor = *arg0;
}

AmbientLight* EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_get_ambientLight_0(Scene* self) {
  return &self->ambientLight;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene_set_ambientLight_1(Scene* self, AmbientLight* arg0) {
  self->ambientLight = *arg0;
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Scene___destroy___0(Scene* self) {
  delete self;
}

// Renderer

Renderer* EMSCRIPTEN_KEEPALIVE emscripten_bind_Renderer_Renderer_4(float width, float height, const Scene* scene, const Camera* camera) {
  return new Renderer(width, height, *scene, *camera);
}

Color* EMSCRIPTEN_KEEPALIVE emscripten_bind_Renderer_trace_2(Renderer* self, const Ray* ray, const int depth) {
  static Color temp;
  return (temp = self->trace(*ray, depth), &temp);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Renderer___destroy___0(Renderer* self) {
  delete self;
}

}

