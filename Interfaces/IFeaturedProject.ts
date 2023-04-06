export interface IFeaturedProject {
  id: number
  category: string
  title: string
  description: string
  technologies: string
  github: string
  image: string
  imageAlt: string
  external?: string
  externalTitle?: string
  designDocument?: string
  functionalAnalysis?: string
}
