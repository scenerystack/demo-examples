// Copyright 2024, University of Colorado Boulder

/**
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import * as THREE from 'three';
import { Range, Vector3 } from 'scenerystack/dot';
import { NumberProperty, Property } from 'scenerystack/axon';
import { AlignBox, Color, Display, Font, Node, VBox } from 'scenerystack/scenery';
import { TextPushButton } from 'scenerystack/sun';
import { Keypad, NumberControl } from 'scenerystack/scenery-phet';
import { enableAssert } from 'scenerystack/assert';
import { NodeTexture, TextureQuad, ThreeNode, ThreeUtils } from 'scenerystack/mobius';

enableAssert();

// example-button-and-slider
{
  const scene = new Node( {
    renderer: 'svg'
  } );

  const mainFont = new Font( { family: 'sans-serif', size: 20 } );
  const boldFont = new Font( { family: 'sans-serif', size: 20, weight: 'bold' } );

  const countProperty = new NumberProperty( 0 );

  const mainBox = new VBox( {
    spacing: 10,
    children: [
      new TextPushButton( 'Increment Count', {
        font: mainFont,
        listener: () => { countProperty.value++; }
      } ),
      new NumberControl( 'Count', countProperty, new Range( 0, 100 ), {
        accessibleName: 'Count Slider',
        titleNodeOptions: {
          font: mainFont,
        },
        numberDisplayOptions: {
          textOptions: {
            font: boldFont,
          }
        }
      } )
    ]
  } );

  scene.addChild( new AlignBox( mainBox, {
    margin: 20,
    left: 0,
    top: 0
  } ) );

  const display = new Display( scene, {
    backgroundColor: '#eee',

    assumeFullWindow: false,
    listenToOnlyElement: true,

    container: document.querySelector( '#example-button-and-slider' )! as HTMLElement
  } );

  display.initializeEvents();

  display.updateOnRequestAnimationFrame( () => {
    display.width = Math.ceil( scene.width );
    display.height = Math.ceil( scene.height );
  } );
}

// threejs
{
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
}
