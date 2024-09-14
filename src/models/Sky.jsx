import { useGLTF } from '@react-three/drei'
import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import skyScene from '../assets/3d/sky.glb'

const Sky = ({ isRotating }) => { 
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
  const { gl } = useThree();

  // Auto-rotation state
  const autoRotate = useRef(true);
  const autoRotationSpeed = 0.9; // Positive value for counter-clockwise rotation

  useFrame((_, delta) => {
    if (autoRotate.current) {
      skyRef.current.rotation.y += autoRotationSpeed * delta;
    }
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta; 
    }
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  )
}

export default Sky