BUILD:
python C:\emsdk\upstream\emscripten\tools\webidl_binder.py rt.idl glue
em++ -O0 -g rt.cpp my_glue_wrapper.cpp -fno-exceptions -Wno-implicit-const-int-float-conversion -s ALLOW_MEMORY_GROWTH=1 --post-js glue.js -o rt.html

TEST: compare
1. d8 d8_raytracer.js --no-turbo-inline-js-wasm-calls
2. d8 d8_raytracer.js --turbo-inline-js-wasm-calls
