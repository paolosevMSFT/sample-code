This raytracer is useful as a performance test useful to evaluate the speed of Emscripten bindings.

We use Emscripten to produce bindings for a series of classes (Camera, Ray, Vector, Sphere, Light, …)
that represent the building blocks for a ray tracer, while the main rendering loop is implemented in JS.
In this way we can mimic the behavior of JS code that has a very chatty interaction with Wasm modules,
to see what is the overhead of using Embind versus WebIDL.

The C++ code is "borrowed" from Michael Mendoza's Raytracer (https://github.com/michaelmendoza/simple-raytracer).


