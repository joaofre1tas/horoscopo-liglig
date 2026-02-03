export interface ZodiacSign {
  id: number
  name: string
  prediction: string
  imageQuery: string
  iconQuery: string
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 0,
    name: 'Rato',
    prediction:
      'Um ano de agilidade e novas oportunidades baterão à sua porta.',
    imageQuery: 'chinese zodiac rat art',
    iconQuery: 'rat',
  },
  {
    id: 1,
    name: 'Búfalo',
    prediction:
      'Sua persistência será recompensada com estabilidade e prosperidade.',
    imageQuery: 'chinese zodiac ox buffalo art',
    iconQuery: 'bull',
  },
  {
    id: 2,
    name: 'Tigre',
    prediction:
      'A coragem guiará seus passos para grandes conquistas este ano.',
    imageQuery: 'chinese zodiac tiger art',
    iconQuery: 'tiger',
  },
  {
    id: 3,
    name: 'Coelho',
    prediction:
      'Um período de paz, harmonia e momentos doces com quem você ama.',
    imageQuery: 'chinese zodiac rabbit art',
    iconQuery: 'rabbit',
  },
  {
    id: 4,
    name: 'Dragão',
    prediction:
      'Sua energia está no auge! É hora de brilhar e liderar novos projetos.',
    imageQuery: 'chinese zodiac dragon art',
    iconQuery: 'dragon',
  },
  {
    id: 5,
    name: 'Serpente',
    prediction:
      'A sabedoria será sua melhor aliada para tomar decisões brilhantes.',
    imageQuery: 'chinese zodiac snake art',
    iconQuery: 'snake',
  },
  {
    id: 6,
    name: 'Cavalo',
    prediction:
      'Prepare-se para uma jornada cheia de liberdade e novas aventuras.',
    imageQuery: 'chinese zodiac horse art',
    iconQuery: 'horse',
  },
  {
    id: 7,
    name: 'Cabra',
    prediction:
      'Sua criatividade florescerá, trazendo beleza para todos os seus dias.',
    imageQuery: 'chinese zodiac goat sheep art',
    iconQuery: 'goat',
  },
  {
    id: 8,
    name: 'Macaco',
    prediction: 'Sua inteligência e bom humor abrirão caminhos antes fechados.',
    imageQuery: 'chinese zodiac monkey art',
    iconQuery: 'monkey',
  },
  {
    id: 9,
    name: 'Galo',
    prediction:
      'O reconhecimento pelo seu esforço chegará de forma surpreendente.',
    imageQuery: 'chinese zodiac rooster chicken art',
    iconQuery: 'rooster',
  },
  {
    id: 10,
    name: 'Cão',
    prediction:
      'A lealdade e as boas amizades serão o pilar de um ano inesquecível.',
    imageQuery: 'chinese zodiac dog art',
    iconQuery: 'dog',
  },
  {
    id: 11,
    name: 'Porco',
    prediction:
      'Um ano de fartura, celebração e muita alegria em cada detalhe.',
    imageQuery: 'chinese zodiac pig art',
    iconQuery: 'pig',
  },
]

export function calculateZodiac(year: number): ZodiacSign {
  // (year - 4) % 12 maps to the signs starting with Rat at index 0
  const index = (year - 4) % 12
  // Handle negative years just in case, though unlikely for birth years
  const adjustedIndex = index < 0 ? index + 12 : index
  return zodiacSigns[adjustedIndex]
}
