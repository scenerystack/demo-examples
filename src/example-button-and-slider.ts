// Copyright 2024, University of Colorado Boulder

/**
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import { Range } from 'scenerystack/dot';
import { NumberProperty } from 'scenerystack/axon';
import { AlignBox, Display, Font, Node, VBox } from 'scenerystack/scenery';
import { TextPushButton } from 'scenerystack/sun';
import { NumberControl } from 'scenerystack/scenery-phet';

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
