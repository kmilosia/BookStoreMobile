import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { NativeBaseProvider } from 'native-base';
function App() {
  return (
    <NativeBaseProvider>
    <MainContainer/>
    </NativeBaseProvider>
  );
}

export default App;