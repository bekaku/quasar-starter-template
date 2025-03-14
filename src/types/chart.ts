export type PieChartType =
  | 'pie'
  | 'donut'
  | 'bar'
  | 'area'
  | 'line'
  | 'radar'
  | 'radialBar';
export type ChartMode = 'light' | 'dark';
export type Strokestyle = 'smooth' | 'straight' | 'stepline';
export type ChartPosition = 'top' | 'bottom' | 'left' | 'right';
export type ChartThemePalete =
  | 'palette1'
  | 'palette2'
  | 'palette3'
  | 'palette4'
  | 'palette5'
  | 'palette6'
  | 'palette7'
  | 'palette8'
  | 'palette9'
  | 'palette10';
export interface IChartSeries {
  name: string
  data: number[]
  type?: string | null
  year?: string | null
  group?: string | null
}
export interface ISeriresCategories {
  series: IChartSeries[]
  categories: string[]
  colors?: string[] | undefined | null
  max?: number | undefined
}
export interface ISimpleChartSeries {
  series: number[]
  categories: string[]
  colors?: string[]
}
