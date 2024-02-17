import { type FunctionalComponent, type SVGAttributes } from 'vue'

interface SVGProps extends Partial<SVGAttributes> {
  size?: 24 | number;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}
type Icon = FunctionalComponent<SVGProps>;

export interface ILink {
  path: string
  text: string
  icon: Icon
}
