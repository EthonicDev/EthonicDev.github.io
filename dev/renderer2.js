var createScene = function () {
    //scene
    var scene = new BABYLON.Scene(engine);

    // Async loading list
    var promises = [];

    // cam
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", BABYLON.Tools.ToRadians(205), BABYLON.Tools.ToRadians(78), 1.6, new BABYLON.Vector3(0, 0.3, 0), scene);
    camera.minZ = 0.1;
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 0.05;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;
    camera.minZ = 0.01;
    scene.clearColor = new BABYLON.Color4.FromInts(10, 10, 10, 255);

    //l
    var areaLight = BABYLON.CubeTexture.CreateFromPrefilteredData("https://patrickryanms.github.io/BabylonJStextures/Demos/sheen/singleSourceAreaLight.env", scene);
    areaLight.name = "areaLight";
    areaLight.gammaSpace = false;
    scene.environmentTexture = areaLight;
    scene.environmentTexture.setReflectionTextureMatrix(BABYLON.Matrix.RotationY(BABYLON.Tools.ToRadians(190)));

    //assets
    promises.push(BABYLON.SceneLoader.AppendAsync("https://patrickryanms.github.io/BabylonJStextures/Demos/sheen/SheenCloth.gltf"));

    //afagaegraeg
    Promise.all(promises).then(function() {
        let root = scene.getMeshByName("__root__");
        root.scaling = new BABYLON.Vector3(20, 20, 20);
        scene.debugLayer.show({embedMode: true});
    });

    return scene;
};