import React, { Suspense, useRef } from 'react';
import './App.scss';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Bloom, EffectComposer } from 'react-postprocessing'
import { KernelSize } from 'postprocessing'

import { Canvas, useLoader, useFrame } from 'react-three-fiber';

import { softShadows, OrbitControls } from 'drei';

//softShadows();



const Lamppost = () => {
  const { nodes, materials } = useLoader(GLTFLoader, "lamppost.glb");
  return (
    <mesh geometry={nodes.Lamppost.geometry} scale={[0.1, 3.7, 0.1]} material={materials.victorian} position={[0, -1, 0]} castShadow>
    </mesh>
  );
};

const Shade = () => {
  const { nodes } = useLoader(GLTFLoader, "shadeorange.glb");
  return (
    <mesh geometry={nodes.Shade.geometry} scale={[0.47, 0.47, 0.5]} position={[-0.04, 3.35, -0.36]} rotation={[-Math.PI/2, 0, 0]} >
      <meshStandardMaterial attach='material' emissive={'orange'} emissiveIntensity={0.1} color={'orange'}/>
    </mesh>
  );
}





function App() {
  return (
    <>
      <div className='title'>
        <div className='pmb'>
          Peterhouse<br />May Ball
        </div>
        <div className='year'>
          June<br />2021
        </div>
      </div>
      <Canvas colorManagement camera={{position: [5, 4, 10], fov: 60}} shadowMap>
        <ambientLight intensity={10} color='orange'/>
        <pointLight position={[0, 3.5, 0]} intensity={20} color={'orange'} distance={1.3} />
        <directionalLight
          castShadow
          intensity={3}
          color={'orange'}
          position={[2, 10, 5]}
          shadow-mapSize-width={3000}
          shadow-mapSize-height={3000}
          shadow-camera-far={50}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-camera-left={-8}
          shadow-camera-right={8}

        />
        <Suspense fallback={null}>
          <Lamppost />
          <Shade />
        </Suspense>
        <group>
          <mesh rotation={[-Math.PI / 2, 0, -0.1]} position={[0, -5.6, 0]} receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3}/>
          </mesh>
        </group>

        <Suspense fallback={null}>
          <EffectComposer smaa edgeDetection={0.9}>
            <Bloom
              intensity={1} // The bloom intensity.
              luminanceThreshold={0.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.05} // smoothness of the luminance threshold. Range is [0, 1]
              kernelSize={KernelSize.VERY_SMALL}
            />
          </EffectComposer>
        </Suspense>


        

        <OrbitControls autoRotate autoRotateSpeed={4}/>
      </Canvas>

    </>
  );
}

export default App;
