"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { InverterDisplay } from "./inverter-display"
import { InverterSimulation } from "./inverter-simulation"
import type { InverterState, StaticInverterNodeProps } from "./types"

interface ResponsiveInverterWrapperProps extends Omit<StaticInverterNodeProps, "position"> {}

export default function ResponsiveInverterWrapper({
  inverterOn,
  onInverterChange,
  gridConnected: initialGridConnected = false,
  solarConnected: initialSolarConnected = false,
  batteryConnected: initialBatteryConnected = false,
  loadPercentage: initialLoadPercentage = 0,
  efficiency: initialEfficiency = 97,
  inputVoltage: initialInputVoltage = 48,
  outputVoltage: initialOutputVoltage = 230,
  frequency: initialFrequency = 50,
  batteryLevel: initialBatteryLevel = 80,
  batteryCharging: initialBatteryCharging = false,
  totalEnergyGenerated: initialTotalEnergyGenerated = 23.5,
  temperature: initialTemperature = 45,
  fanSpeed: initialFanSpeed = 40,
  mode: initialMode = "normal",
}: ResponsiveInverterWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const BASE_WIDTH = 360
  const BASE_HEIGHT = 531

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const availableWidth = viewportWidth * 0.9
      const availableHeight = viewportHeight * 0.85

      const scaleX = availableWidth / BASE_WIDTH
      const scaleY = availableHeight / BASE_HEIGHT

      let finalScale = Math.min(scaleX, scaleY)

      if (viewportWidth < 320) {
        // 1st generation extra small phones (below 320px)
        finalScale = Math.max(finalScale, 0.45)
      } else if (viewportWidth < 475) {
        // Extra small phones (320px - 474px)
        finalScale = Math.max(finalScale, 0.55)
      } else if (viewportWidth < 640) {
        // Small phones (475px - 639px)
        finalScale = Math.max(finalScale, 0.7)
      } else if (viewportWidth < 768) {
        // Large phones / small tablets (640px - 767px)
        finalScale = Math.max(finalScale, 0.8)
      } else if (viewportWidth < 1024) {
        // Tablets (768px - 1023px)
        finalScale = Math.max(finalScale, 0.85)
      }

      finalScale = Math.min(finalScale, 1.2)
      finalScale = Math.max(finalScale, 0.35) // Lowered minimum for 320px support

      setScale(finalScale)
    }

    calculateScale()
    window.addEventListener("resize", calculateScale)
    return () => window.removeEventListener("resize", calculateScale)
  }, [])

  const [state, setState] = useState<InverterState>({
    gridConnected: initialGridConnected,
    solarConnected: initialSolarConnected,
    batteryConnected: initialBatteryConnected,
    temperature: initialTemperature,
    loadPercentage: initialLoadPercentage,
    efficiency: initialEfficiency,
    inputVoltage: initialInputVoltage,
    outputVoltage: initialOutputVoltage,
    inputFrequency: 0,
    outputFrequency: initialFrequency,
    batteryLevel: initialBatteryLevel,
    batteryCharging: initialBatteryCharging,
    totalEnergyGenerated: initialTotalEnergyGenerated,
    fanSpeed: initialFanSpeed,
    mode: initialMode,
    selectedMode: initialMode === "normal" ? 0 : initialMode === "pv" ? 1 : 2,
    faultCondition: false,
    screenActive: false,
    configMode: false,
    displayOption: 0,
    screenBrightness: 1,
    bootupPhase: 3,
    hovered: false,
    showActivatePrompt: !inverterOn,
  })

  const changeMode = () => {
    const modes = ["normal", "pv", "battery"] as const
    const newModeIndex = (state.selectedMode + 1) % 3
    setState((prev) => ({
      ...prev,
      selectedMode: newModeIndex,
      mode: modes[newModeIndex],
    }))
  }

  const changeDisplayOption = () => {
    setState((prev) => ({
      ...prev,
      displayOption: (prev.displayOption + 1) % 3,
    }))
  }

  useEffect(() => {
    if (!inverterOn) {
      setState((prev) => ({
        ...prev,
        gridConnected: false,
        solarConnected: false,
        batteryConnected: false,
      }))
    } else {
      if (state.mode === "pv") {
        setState((prev) => ({
          ...prev,
          solarConnected: true,
          batteryConnected: true,
          gridConnected: false,
        }))
      } else if (state.mode === "normal") {
        setState((prev) => ({
          ...prev,
          gridConnected: true,
          solarConnected: false,
          batteryConnected: false,
        }))
      } else if (state.mode === "battery") {
        setState((prev) => ({
          ...prev,
          batteryConnected: true,
          gridConnected: false,
          solarConnected: false,
        }))
      }
    }
  }, [inverterOn, state.mode])

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: `${-BASE_HEIGHT / 2}px`,
          marginLeft: `${-BASE_WIDTH / 2}px`,
        }}
        animate={{
          scale: scale,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3,
        }}
        onMouseEnter={() => setState((prev) => ({ ...prev, hovered: true }))}
        onMouseLeave={() => setState((prev) => ({ ...prev, hovered: false }))}
      >
        <InverterDisplay
          state={state}
          inverterOn={inverterOn}
          scale={1}
          onInverterChange={onInverterChange}
          onCycleMode={changeMode}
          onCycleDisplayOption={changeDisplayOption}
        />

        <InverterSimulation inverterOn={inverterOn} state={state} setState={setState} />
      </motion.div>
    </div>
  )
}
