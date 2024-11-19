// Copyright 2024, University of Colorado Boulder

/**
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import { Slider, Stack } from '@mui/material';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Rectangle } from 'scenerystack/scenery';
import { Scenery } from 'scenerystack/react';

const Demo = () => {
  const [ size, setSize ] = useState<number>( 50 );

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <label>Size</label>
        <Slider aria-label="Size" value={size} onChange={( _event, newValue ) => setSize( newValue as number )} min={1} max={100}/>
      </Stack>
      <Scenery node={new Rectangle( 0, 0, size, 50, { fill: 'red', opacity: 1 } )} backgroundColor={'#eee'}>
      </Scenery>
    </>
  );
};

const root = createRoot( document.querySelector( '#react' )! );

root.render( <Demo/> );

// For now, force unmounting on HMR (so we reload everything)
// @ts-ignore
if ( window.module && module.hot ) {
  // @ts-ignore
  module.hot.dispose( () => {
    root.unmount();
  } );
}