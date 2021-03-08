BUILD:
em++ -O3 rt.cpp -o rt.js --bind -fno-exceptions -Wno-implicit-const-int-float-conversion -s ALLOW_MEMORY_GROWTH=1

TEST: compare
1. d8 d8_raytracer.js --no-turbo-inline-js-wasm-calls
2. d8 d8_raytracer.js --turbo-inline-js-wasm-calls
