var Module = {};
Module.onRuntimeInitialized = function () {
  var startTime = new Date;

  try {
    go(540, 400);
    //go(1080, 800);
  } catch (e) {
      print(e);
  }

  var t = new Date() - startTime;
  print('RunTime: ' + t + ' ms.\n');
}

load('rt.js');
load("ray.js");

