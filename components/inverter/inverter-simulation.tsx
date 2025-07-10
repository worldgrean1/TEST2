"use client"

import type React from "react"
import { useEffect, useMemo, useCallback } from "react"
import type { InverterState } from "./types"

interface InverterSimulationProps {
  inverterOn: boolean
  state: InverterState
  setState: React.Dispatch<React.SetStateAction<InverterState>>
}

export function InverterSimulation({ inverterOn, state, setState }: InverterSimulationProps) {
  const loadFactor = useMemo(() => state.loadPercentage / 100, [state.loadPercentage])
  const coolingEffect = useMemo(() => state.fanSpeed / 100, [state.fanSpeed])

  const updateTemperature = useCallback(
    (currentTemp: number, targetTemp: number) => {
      const heatRate = loadFactor * 1.5
      const coolRate = coolingEffect * 2.5
      return currentTemp < targetTemp
        ? Math.min(currentTemp + heatRate, targetTemp)
        : Math.max(currentTemp - coolRate, targetTemp)
    },
    [loadFactor, coolingEffect],
  )

  const calculateFanSpeed = useCallback((temp: number) => {
    if (temp > 65) return 100
    if (temp > 55) return 80 + Math.round(Math.random() * 5)
    if (temp > 45) return 60 + Math.round(Math.random() * 5)
    if (temp > 40) return 40 + Math.round(Math.random() * 5)
    return 20 + Math.round(Math.random() * 5)
  }, [])

  const updateState = useCallback(
    (updates: Partial<InverterState>) => {
      setState((prev) => ({ ...prev, ...updates }))
    },
    [setState],
  )

  useEffect(() => {
    let cooldownInterval: NodeJS.Timeout | null = null
    let heatupInterval: NodeJS.Timeout | null = null

    if (!inverterOn) {
      cooldownInterval = setInterval(() => {
        updateState({
          temperature: Math.max(state.temperature - (state.temperature - 35) / 10, 35),
        })
      }, 1000)
    } else {
      heatupInterval = setInterval(() => {
        const randomVariation = Math.random() * 2 - 1
        const targetTemp = 35 + loadFactor * 30 + randomVariation

        const newTemp = updateTemperature(state.temperature, targetTemp)
        const newFanSpeed = calculateFanSpeed(newTemp)

        updateState({
          temperature: newTemp,
          fanSpeed: newFanSpeed,
        })

        if (state.solarConnected && state.mode === "pv") {
          const generationRate = 0.001 * (1 + (Math.random() * 0.2 - 0.1))
          updateState({
            totalEnergyGenerated: state.totalEnergyGenerated + generationRate,
          })
        }

        if (state.batteryConnected) {
          if (state.solarConnected && state.loadPercentage < 80) {
            const chargeRate = 0.01 * (1 - state.batteryLevel / 150)
            updateState({
              batteryCharging: true,
              batteryLevel: Math.min(state.batteryLevel + chargeRate, 100),
            })
          } else if (state.loadPercentage > 0) {
            const dischargeRate = 0.02 * (state.loadPercentage / 50)
            updateState({
              batteryCharging: false,
              batteryLevel: Math.max(state.batteryLevel - dischargeRate, 0),
            })

            if (state.batteryLevel < 10 && !state.faultCondition && state.mode === "battery") {
              updateState({ faultCondition: true })
              setTimeout(() => updateState({ faultCondition: false }), 5000)
            }
          } else {
            updateState({ batteryCharging: false })
          }
        }

        if (state.mode === "normal" && state.gridConnected) {
          updateState({ inputFrequency: 49.8 + Math.random() * 0.4 })
        } else if (state.mode === "pv" && state.solarConnected) {
          updateState({ inputFrequency: 0 })
        } else {
          updateState({ inputFrequency: 0 })
        }

        if (inverterOn && state.outputFrequency > 0) {
          updateState({ outputFrequency: 49.9 + Math.random() * 0.2 })
        }

        if (inverterOn && Math.random() < 0.001 && !state.faultCondition) {
          updateState({ faultCondition: true })
          setTimeout(() => updateState({ faultCondition: false }), 3000)
        }
      }, 1000)
    }

    return () => {
      if (cooldownInterval) clearInterval(cooldownInterval)
      if (heatupInterval) clearInterval(heatupInterval)
    }
  }, [inverterOn, state, loadFactor, coolingEffect, updateTemperature, calculateFanSpeed, updateState])

  return null
}
