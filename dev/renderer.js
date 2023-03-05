var createScene = function () {
	var scene = new BABYLON.Scene(engine);

	// Setup stuff lol
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 1;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);

	//var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -1, 1), scene);
    var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 19, 0), scene);
    light.position = new BABYLON.Vector3(0, 19.9, 0);
    light.intensity = 1;

	// This is were i put tha shadow stuff
	var shadowGenerator = new BABYLON.ShadowGenerator(4096, light);
    shadowGenerator.useExponentialShadowMap = true;
    shadowGenerator.useBlurExponentialShadowMap = true;
	shadowGenerator.bias = 0.01;
	light.shadowMaxZ = 130;
	light.shadowMinZ = 10;
    shadowGenerator.useContactHardeningShadow = true;
    shadowGenerator.setDarkness(0);
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 4; //increase blurkernel value


    shadowGenerator.getShadowMap().renderList.push(b);
    shadowGenerator.getShadowMap().renderList.push(b1);



    var ambientLight = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(0, 1, 0), scene);
    ambientLight.intensity = 0.5;
    ambientLight.ambient = 1;
    ambientLight.diffuse = BABYLON.Color3.FromInts(255, 200, 255);


    // past here is where the geometry is
	var lightSphere = BABYLON.Mesh.CreatePlane("plane", 10, scene);
	lightSphere.position = light.position;
	lightSphere.material = new BABYLON.StandardMaterial("light", scene);
	lightSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    lightSphere.rotation.x = 4.712389;


	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20, subdivisions: 100});

	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.material = groundMaterial;

    var b = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

    b.scaling.x = 5;
	b.scaling.y = 5;
    b.scaling.z = 5;

	b.position.y = 2.5;
	b.position.x = 0;
	b.position.z = 5;

    var mirrorMaterial = new BABYLON.StandardMaterial("mirror", scene);
    mirrorMaterial.specularPower = 64;
    mirrorMaterial.reflectivity = 1;
    b.material = mirrorMaterial;


    var b1 = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

    b1.scaling.x = 5;
	b1.scaling.y = 5;
    b1.scaling.z = 5;

	b1.position.y = 2.5;
	b1.position.x = 0;
	b1.position.z = -5;



    var standardMaterial = new BABYLON.StandardMaterial("standard", scene);
    standardMaterial.diffuseColor = BABYLON.Color3.FromInts(255, 255, 0);
    b1.material = standardMaterial;


    var blueMaterial = new BABYLON.StandardMaterial("blueMaterial", scene);
    blueMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.9);
    blueMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.9);

    var rightwall = BABYLON.Mesh.CreatePlane("plane", 10, scene);
    rightwall.scaling.x = 2;
    rightwall.scaling.y = 2;
    rightwall.scaling.z = 2;

    rightwall.position.y = 10;
    rightwall.position.x = 0;
    rightwall.position.z = 10;

    rightwall.material = blueMaterial;



    var redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
    redMaterial.diffuseColor = new BABYLON.Color3(0.9, 0.2, 0.2);
    redMaterial.specularColor = new BABYLON.Color3(0.9, 0.2, 0.2);

    var leftwall = BABYLON.Mesh.CreatePlane("plane", 10, scene);
    leftwall.scaling.x = 2;
    leftwall.scaling.y = 2;
    leftwall.scaling.z = 2;

    leftwall.rotation.y = 3.141593;

    leftwall.position.y = 10;
    leftwall.position.x = 0;
    leftwall.position.z = -10;

    leftwall.material = redMaterial;


    var backwall = BABYLON.Mesh.CreatePlane("plane", 10, scene);
    backwall.scaling.x = 2;
	backwall.scaling.y = 2;
    backwall.scaling.z = 2;

    backwall.rotation.y = 4.712389;

	backwall.position.y = 10;
	backwall.position.x = -10;
	backwall.position.z = 0;

    backwall.material = groundMaterial;

    var ceiling = BABYLON.Mesh.CreatePlane("plane", 10, scene);
    ceiling.scaling.x = 2;
	ceiling.scaling.y = 2;
    ceiling.scaling.z = 2;

    ceiling.rotation.x = 4.712389;

	ceiling.position.y = 20;
	ceiling.position.x = 0;
	ceiling.position.z = 0;

    backwall.material = groundMaterial;


	shadowGenerator.addShadowCaster(b);
	shadowGenerator.addShadowCaster(b1);
	shadowGenerator.addShadowCaster(rightwall);
    shadowGenerator.addShadowCaster(leftwall);
    shadowGenerator.addShadowCaster(backwall);
    shadowGenerator.addShadowCaster(ceiling);
	ground.receiveShadows = true;
    rightwall.receiveShadows = true;
    leftwall.receiveShadows = true;
    backwall.receiveShadows = true;
    ceiling.receiveShadows = true;
    b.receiveShadows = true;
    b1.receiveShadows = true;


	return scene;
}