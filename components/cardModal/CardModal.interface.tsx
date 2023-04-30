
export interface Card {
  children: JSX.Element;
  orientation: 'vertical' | 'horizontal';
  btnIcon: 'back' | 'close';
  show: boolean;
  changeShow: (show: boolean) => void;
}