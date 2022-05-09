export type Hero = {
  _id: string;
  name: string;
  class: string;
  generalTier: string;
  primaryAbilities: HeroAbility[];
  heroicAbilities: HeroAbility[];
  trait: HeroAbility;
  goodMaps: string[];
  averageMaps: string[];
  badMaps: string[];
};

type HeroAbility = {
  name: string;
  description: string;
};
