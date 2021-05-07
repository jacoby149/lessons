// Code goes here

var scene, camera, renderer;
var geometry, material, mesh;
var sprite1;

init();
animate();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );

    geometry = new THREE.SphereGeometry( 159, 32, 32 );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    //var map = THREE.ImageUtils.loadTexture( "sprite1.png" );
    var material2 = new THREE.SpriteMaterial( { color:0x00ff00 } );
    sprite1 = new THREE.Sprite( material2 );
    sprite1.position.set(100,100,100);
    sprite1.scale.set(40,40,40);
    mesh.add(sprite1);

    var sprite2 = new THREE.Sprite( material2);
    sprite2.position.set(-100,-100,-100);
    sprite2.scale.set(30,30,30);
    mesh.add(sprite2);

    var sprite3 = new THREE.Sprite(material2);
    sprite3.position.set(100,-100,100);
    sprite3.scale.set(20,20,20);
    mesh.add(sprite3);

    renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {
    requestAnimationFrame( animate );
    mesh.rotation.y += 0.01;
    renderer.render( scene, camera );
}

function lookAtSprite() {
  
  // as sprite is a child of mesh get world position
  var spritePos = new THREE.Vector3().setFromMatrixPosition(sprite1.matrixWorld);
  
  // get the vectors for calculating angle
  var cv3 = new THREE.Vector3().subVectors(camera.position, mesh.position);
  var sv3 = new THREE.Vector3().subVectors(spritePos, mesh.position);
  
  // we only want to rotate around y-axis, so only the angle in x-z-plane is relevant
  var cv2 = new THREE.Vector2(cv3.x, cv3.z);
  var sv2 = new THREE.Vector2(sv3.x, sv3.z);
  
  // normalize Vectors
  cv2.normalize();
  sv2.normalize();
  
  // dot product
  var dot = cv2.dot(sv2);
  
  console.log(dot);
  
  // angle to between sprite and camera in radians
  // cosinus is from 1 to -1, so we need to normalize and invert it and multiply it with PI to get proper angle
  var angle = (1 - (dot + 1) / 2) * Math.PI;
  
  console.log(angle);
  
  // is sprite left or right from camera? (might be the other way round)
  if(spritePos.x < 0) {
    console.log('left');
    mesh.rotation.y += angle;
  }
  else {
    console.log('right');
    mesh.rotation.y -= angle;
  }

}