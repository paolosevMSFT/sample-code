const M_PI = 3.141592653589793;
const INFINITY = 1e8;

function go(width, height) {
    let fov = 30.0;
  
    let scene = new Module.Scene();
    scene.backgroundColor = new Module.Color();

    let s1 = new Module.Sphere(new Module.Vector3(0, 0, 20), 2, new Module.Color(165, 10, 14), new Module.Color(255), 0.3, 0.8, 0.5, 128.0, .65, 0.99);//0.05, 0.95); // Clear
    s1.glossy_transparency = 0.02;
    s1.glossiness = 0.05;
    let s2 = new Module.Sphere(new Module.Vector3(5, -1, 15), 2, new Module.Color(235, 179, 41), new Module.Color(255), 0.4, 0.6, 0.4, 128.0, 1.0, 0.0, 0.2); // Yellow
    let s3 = new Module.Sphere(new Module.Vector3(5, 0, 25), 3, new Module.Color(6, 72, 111), new Module.Color(255), 0.3, 0.8, 0.1, 128.0, 1.0, 0.0, 0.4);  // Blue
    let s4 = new Module.Sphere(new Module.Vector3(-3.5, -1, 10), 2, new Module.Color(8, 88, 56), new Module.Color(255), 0.4, 0.6, 0.5, 64.0, 1.0, 0.0, 0.3); // Green
    let s5 = new Module.Sphere(new Module.Vector3(-5.5, 0, 15), 3, new Module.Color(51, 51, 51), new Module.Color(255), 0.3, 0.8, 0.25, 32.0, 0.0); // Black
  
    // Add objects to scene    
    scene.addObject(s1);  // Red
    scene.addObject(s2);  // Yellow
    scene.addObject(s3);  // Blue
    scene.addObject(s4);  // Green
    scene.addObject(s5);  // Black
    
    // Add light to scene
    scene.addAmbientLight(new Module.AmbientLight( new Module.Vector3(1.0) ) );
    let l0 = new Module.AreaLight( new Module.Vector3(0, 20, 35), new Module.Vector3(1.4) );
    let l1 = new Module.AreaLight( new Module.Vector3(20, 20, 35), new Module.Vector3(1.8) );
    scene.addLight(l0);
    scene.addLight(l1);
  
    // Add camera
    let camera = new Module.Camera(new Module.Vector3(0, 20, -20), width, height, fov);
    camera.angleX = 30 * M_PI/ 180.0;
    camera.angleY = 0 * M_PI/ 180.0;
    camera.angleZ = 0 * M_PI/ 180.0;
  
    // Create Renderer
    let r = new Module.Renderer(width, height, scene, camera);
    return render_distributed_rays(r, width, height, camera);
}

function trace(x, y, renderer, camera) {
    let samples = 16.0;
    let inv_samples = 1 / samples;
    let pixel = new Module.Color();
    for (let s = 0; s < samples; s++) {
        let rand = Module.Vector3.prototype.random();

        // Send a jittered ray through each pixel
        let v = new Module.Vector3(x + rand.x, y + rand.y, 1);
        let rayDirection = camera.pixelToViewport(v);
        let ray = new Module.Ray(camera.position, rayDirection);

        // Get pixel for traced ray
        var color = renderer.trace(ray, 0).mul(inv_samples);
        pixel.add(color);
    }
    return pixel;
}

function render_distributed_rays(renderer, width, height, camera) {
    let bufferLength = width * height * 4;
    let myUint8Array = new Uint8Array(bufferLength);

    let j = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let pixel = trace(x, y, renderer, camera);
            pixel = pixel.clamp();
            myUint8Array[j++] = pixel.r;
            myUint8Array[j++] = pixel.g;
            myUint8Array[j++] = pixel.b;
            myUint8Array[j++] = 255;
        }
    }
    return myUint8Array;
}