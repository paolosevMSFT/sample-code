class Ray {
  public:
    Vector3 origin;
    Vector3 direction;
    
    Ray(const Vector3& _origin, const Vector3& _direction) : origin(_origin), direction(_direction) {}
};
