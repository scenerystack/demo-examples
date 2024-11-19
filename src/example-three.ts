// Copyright 2024, University of Colorado Boulder

/**
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import * as THREE from 'three';
import { Vector3 } from 'scenerystack/dot';
import { Property } from 'scenerystack/axon';
import { Color, Display, Font, Node } from 'scenerystack/scenery';
import { TextPushButton } from 'scenerystack/sun';
import { Keypad } from 'scenerystack/scenery-phet';
import { NodeTexture, TextureQuad, ThreeNode, ThreeUtils } from 'scenerystack/mobius';

const width = 300;
const height = 300;

const threeNode = new ThreeNode( width, height, {
  backgroundColorProperty: new Property( Color.TRANSPARENT ),
  cameraPosition: new Vector3( 0, 0.4, 2 )
} );

// Camera settings
threeNode.stage.threeCamera.zoom = 1.7;
threeNode.stage.threeCamera.updateProjectionMatrix();
threeNode.stage.threeCamera.up = new THREE.Vector3( 0, 0, -1 );
threeNode.stage.threeCamera.lookAt( ThreeUtils.vectorToThree( Vector3.ZERO ) );

// Transparent background
threeNode.stage.threeScene.background = null;

// Lights
const ambientLight = new THREE.AmbientLight( 0x333333 );
threeNode.stage.threeScene.add( ambientLight );
const sunLight = new THREE.DirectionalLight( 0xffffff, 1 );
sunLight.position.set( -1, 1.5, 0.8 );
threeNode.stage.threeScene.add( sunLight );
const moonLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
moonLight.position.set( 2.0, -1.0, 1.0 );
threeNode.stage.threeScene.add( moonLight );

const cubeGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const cubeMaterial = new THREE.MeshLambertMaterial( {
  color: 0xFF0000
} );

// Create a mesh with the geometry and material
const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
threeNode.stage.threeScene.add( cubeMesh );

// Toss some Node content into the 3D scene. Would call update() on the NodeTexture whenever it needs updates.
const exampleNode = new Keypad( Keypad.PositiveIntegerLayout, {
  scale: 3,
  left: 1,
  top: 1
} );
const size = Math.ceil( Math.max( exampleNode.width, exampleNode.height ) ) + 2;
const texture = new NodeTexture( exampleNode, {
  width: size,
  height: size
} );

{
  const label = new TextureQuad( texture, 0.4, 0.4 );
  label.position.copy( ThreeUtils.vectorToThree( new Vector3( -0.2, -0.2, 0.251 ) ) );
  cubeMesh.add( label );
}

{
  const label = new TextureQuad( texture, 0.4, 0.4 );
  label.position.copy( ThreeUtils.vectorToThree( new Vector3( 0.2, -0.2, -0.251 ) ) );
  label.rotation.y = Math.PI;
  cubeMesh.add( label );
}



const scene = new Node( {
  renderer: 'svg'
} );

scene.addChild( threeNode );

scene.addChild( new TextPushButton( 'Change Color', {
  font: new Font( { family: 'sans-serif', size: 20 } ),
  listener: () => {
    cubeMaterial.color.set( Math.random() * 0xffffff );
  },
  centerX: width / 2,
  top: 10
} ) );

const display = new Display( scene, {
  backgroundColor: '#eee',

  assumeFullWindow: false,
  listenToOnlyElement: true,

  width: width,
  height: height,

  container: document.querySelector( '#threejs' )! as HTMLElement
} );

display.initializeEvents();

display.updateOnRequestAnimationFrame( dt => {
  cubeMesh.rotateY( dt );

  threeNode.layout();

  threeNode.render( undefined );
} );