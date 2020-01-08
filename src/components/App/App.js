import React from 'react';
import CanvasField from '../../containers/CanvasField';
import ButtonGroup from '../../containers/ButtonGroup';
import CanvasHeader from '../../components/CanvasHeader/CanvasHeader';

function App() {
  return (
    <>
      <CanvasHeader></CanvasHeader>
      <CanvasField></CanvasField>
      <ButtonGroup></ButtonGroup>
    </>
  )
}

export default App;
