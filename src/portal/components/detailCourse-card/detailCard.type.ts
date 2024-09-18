export interface courses {
  logo: string;
  title: string;
  description: string;
  level: string;
  currentPrice: string;
  originPrice: string;
  url: string;
  rating: string;
  isLoading?: boolean
}

export interface course {
  title:string,
  logo:string,
  priceAft:string,
  priceBef:string,
}
