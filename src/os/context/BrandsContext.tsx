import { createContext, useContext, useCallback, type ReactNode } from 'react'
import type { Brand } from '../types'
import { useData } from '../store/DataContext'

interface CreateBrandInput {
  name: string
  brandType: string
  launchStatus: string
  color: string
  targetAudience: string
  websiteDomain: string
  connectedBrands?: string[]
}

interface BrandsContextValue {
  brands: Brand[]
  createBrand: (input: CreateBrandInput) => Brand
  cloneBrand: (sourceId: string, newName: string) => Brand | null
  getBrandById: (id: string) => Brand | undefined
}

const BrandsContext = createContext<BrandsContextValue | null>(null)

export function BrandsProvider({ children }: { children: ReactNode }) {
  const { brands, setBrands, getBrandById: getBrand } = useData()

  const createBrand = useCallback((input: CreateBrandInput): Brand => {
    const baseId = input.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'brand'
    const existingIds = brands.map((b) => b.id)
    let uniqId = baseId
    let n = 1
    while (existingIds.includes(uniqId)) {
      uniqId = `${baseId}-${n++}`
    }
    const category = input.brandType === 'Streetwear' ? 'Clothing & Culture' : input.brandType === 'Platform' ? 'Marketplace & Culture' : input.brandType
    const status = input.launchStatus === 'Concept' ? 'Planning' : input.launchStatus === 'Development' ? 'In Development' : 'Active'
    const brand: Brand = {
      id: uniqId,
      name: input.name,
      category,
      status: status as Brand['status'],
      color: input.color,
      members: [],
      description: `${input.name} — ${input.brandType} brand. Target: ${input.targetAudience}.${input.websiteDomain ? ` Domain: ${input.websiteDomain}` : ''}`,
    }
    setBrands((prev) => [...prev, brand])
    return brand
  }, [brands, setBrands])

  const cloneBrand = useCallback((sourceId: string, newName: string): Brand | null => {
    const source = brands.find((b) => b.id === sourceId)
    if (!source) return null
    const baseId = newName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'brand'
    const existingIds = brands.map((b) => b.id)
    let uniqId = baseId
    let n = 1
    while (existingIds.includes(uniqId)) {
      uniqId = `${baseId}-${n++}`
    }
    const brand: Brand = {
      ...source,
      id: uniqId,
      name: newName,
      members: [],
      description: `Cloned from ${source.name}. ${source.description}`,
    }
    setBrands((prev) => [...prev, brand])
    return brand
  }, [brands, setBrands])

  const getBrandById = useCallback((id: string) => getBrand(id), [getBrand])

  return (
    <BrandsContext.Provider value={{ brands, createBrand, cloneBrand, getBrandById }}>
      {children}
    </BrandsContext.Provider>
  )
}

export function useBrands() {
  const ctx = useContext(BrandsContext)
  if (!ctx) throw new Error('useBrands must be used within BrandsProvider')
  return ctx
}
