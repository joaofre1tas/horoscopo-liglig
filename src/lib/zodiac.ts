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
      'Um ano de agilidade e novas oportunidades baterão à sua porta. Sua inteligência será a chave para abrir caminhos inesperados.',
    imageQuery: 'chinese zodiac rat elegant art',
    iconQuery: 'rat',
  },
  {
    id: 1,
    name: 'Búfalo',
    prediction:
      'Sua persistência será recompensada com estabilidade e prosperidade. Construa com calma e colha frutos duradouros.',
    imageQuery: 'chinese zodiac ox buffalo elegant art',
    iconQuery: 'bull',
  },
  {
    id: 2,
    name: 'Tigre',
    prediction:
      'A coragem guiará seus passos para grandes conquistas este ano. Não tenha medo de liderar e mostrar sua verdadeira força.',
    imageQuery: 'chinese zodiac tiger elegant art',
    iconQuery: 'tiger',
  },
  {
    id: 3,
    name: 'Coelho',
    prediction:
      'Um período de paz, harmonia e momentos doces com quem você ama. A sorte estará nos detalhes e nas conexões gentis.',
    imageQuery: 'chinese zodiac rabbit elegant art',
    iconQuery: 'rabbit',
  },
  {
    id: 4,
    name: 'Dragão',
    prediction:
      'Sua energia está no auge! É hora de brilhar e liderar novos projetos. O sucesso acompanha aqueles que ousam sonhar alto.',
    imageQuery: 'chinese zodiac dragon elegant art',
    iconQuery: 'dragon',
  },
  {
    id: 5,
    name: 'Serpente',
    prediction:
      'A sabedoria será sua melhor aliada para tomar decisões brilhantes. Observe, planeje e ataque no momento certo.',
    imageQuery: 'chinese zodiac snake elegant art',
    iconQuery: 'snake',
  },
  {
    id: 6,
    name: 'Cavalo',
    prediction:
      'Prepare-se para uma jornada cheia de liberdade e novas aventuras. O movimento trará a renovação que você busca.',
    imageQuery: 'chinese zodiac horse elegant art',
    iconQuery: 'horse',
  },
  {
    id: 7,
    name: 'Cabra',
    prediction:
      'Sua criatividade florescerá, trazendo beleza para todos os seus dias. Use sua arte para encantar e transformar o mundo ao redor.',
    imageQuery: 'chinese zodiac goat sheep elegant art',
    iconQuery: 'goat',
  },
  {
    id: 8,
    name: 'Macaco',
    prediction:
      'Sua inteligência e bom humor abrirão caminhos antes fechados. A inovação será sua marca registrada neste ciclo.',
    imageQuery: 'chinese zodiac monkey elegant art',
    iconQuery: 'monkey',
  },
  {
    id: 9,
    name: 'Galo',
    prediction:
      'O reconhecimento pelo seu esforço chegará de forma surpreendente. Mostre suas cores e orgulhe-se de quem você é.',
    imageQuery: 'chinese zodiac rooster chicken elegant art',
    iconQuery: 'rooster',
  },
  {
    id: 10,
    name: 'Cão',
    prediction:
      'A lealdade e as boas amizades serão o pilar de um ano inesquecível. Proteja quem você ama e será recompensado.',
    imageQuery: 'chinese zodiac dog elegant art',
    iconQuery: 'dog',
  },
  {
    id: 11,
    name: 'Porco',
    prediction:
      'Um ano de fartura, celebração e muita alegria em cada detalhe. Aproveite a abundância e compartilhe bons momentos.',
    imageQuery: 'chinese zodiac pig elegant art',
    iconQuery: 'pig',
  },
]

export function calculateZodiac(year: number): ZodiacSign {
  // (year - 4) % 12 maps to the signs starting with Rat at index 0
  // 1924 was Year of the Rat. (1924 - 4) % 12 = 0.
  // 1992 was Year of the Monkey. (1992 - 4) % 12 = 8. Correct.
  const index = (year - 4) % 12
  const adjustedIndex = index < 0 ? index + 12 : index
  return zodiacSigns[adjustedIndex]
}
