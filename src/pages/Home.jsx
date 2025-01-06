import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Loader from "../components/Loader"
import Island from "../models/Island"
import Sky from "../models/Sky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"
import HomeInfo from "../components/HomeInfo"
import { soundoff, soundon, arrowdown } from "../assets/icons"

// Lazy load audio
const sakura = () => import("../assets/sakura.mp3").then(module => module.default)

const Home = () => {
  const audioRef = useRef(null)
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  
  useEffect(() => {
    async function loadAudio() {
      if (!audioRef.current) {
        const audioModule = await sakura()
        audioRef.current = new Audio(audioModule)
        audioRef.current.volume = 0.4
        audioRef.current.loop = true
      }
    }
    loadAudio()
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlayingMusic])

  const adjustIslandForScreenSize = useCallback(() => {
    let screenScale = null
    let screenPosition = [0, -6.5, -43]
    let rotation = [0.1, 4.7, 0]
    
    if (window.innerWidth < 768) {
      screenScale = [0.4, 0.5, 0.5]
    } else {
      screenScale = [1, 1, 1]
    }
    
    return [screenScale, screenPosition, rotation]
  }, [])

  const adjustPlaneForScreenSize = useCallback(() => {
    let screenScale, screenPosition
    
    if (window.innerWidth < 768) {
      screenScale = [1.0, 1.0, 1.0]
      screenPosition = [0, -1.5, 0]
    } else {
      screenScale = [3, 3, 3]
      screenPosition = [0, -4, -4]
    }
    
    return [screenScale, screenPosition]
  }, [])

  const [islandScale, islandPosition, islandRotation] = useMemo(() => adjustIslandForScreenSize(), [adjustIslandForScreenSize])
  const [planeScale, planePosition] = useMemo(() => adjustPlaneForScreenSize(), [adjustPlaneForScreenSize])

  const toggleAudio = () => setIsPlayingMusic(!isPlayingMusic)

  return (
    <section className="w-full h-screen relative overflow-hidden">
      {currentStage && (
        <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
          <HomeInfo currentStage={currentStage} />
        </div>
      )}
      <Canvas 
        className={`w-[24.063rem] h-[45rem] sm:w-full sm:h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-5 left-2">
        {!isPlayingMusic && (
          <img src={arrowdown} alt="click here" className="w-9 h-3 bouncing" />
        )}
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={toggleAudio}
        />
      </div>
    </section>
  )
}

export default Home