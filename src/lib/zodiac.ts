export interface ZodiacSign {
  id: number
  name: string
  prediction: string
  imageQuery: string
  iconQuery: string
  couponCode: string
  couponCondition: string
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 0,
    name: 'Rato',
    prediction:
      'O Ano do Cavalo de Fogo acelera decisões e abre caminhos. Confie na sua inteligência, aja com estratégia e aproveite novas oportunidades que surgirem rapidamente.',
    imageQuery: 'chinese zodiac rat elegant art',
    iconQuery: 'rat',
    couponCode: '12OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$80)',
  },
  {
    id: 1,
    name: 'Búfalo',
    prediction:
      'Este é um ano para sair da zona de conforto. O Cavalo de Fogo traz mudanças que exigem flexibilidade — quanto mais você se mover, mais prosperidade atrai.',
    imageQuery: 'chinese zodiac ox buffalo elegant art',
    iconQuery: 'bull',
    couponCode: '12OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$80)',
  },
  {
    id: 2,
    name: 'Tigre',
    prediction:
      'Energia em alta! O Ano do Cavalo de Fogo favorece coragem, liderança e grandes conquistas. Confie no seu instinto e avance sem medo.',
    imageQuery: 'chinese zodiac tiger elegant art',
    iconQuery: 'tiger',
    couponCode: '30OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$200)',
  },
  {
    id: 3,
    name: 'Coelho',
    prediction:
      'O Cavalo de Fogo pede mais atitude. Este é o momento de equilibrar sensibilidade com ação e transformar boas ideias em resultados reais.',
    imageQuery: 'chinese zodiac rabbit elegant art',
    iconQuery: 'rabbit',
    couponCode: '12OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$80)',
  },
  {
    id: 4,
    name: 'Dragão',
    prediction:
      'Um ano poderoso para expansão e reconhecimento. O Cavalo de Fogo impulsiona sua força natural e favorece crescimento, sucesso e visibilidade.',
    imageQuery: 'chinese zodiac dragon elegant art',
    iconQuery: 'dragon',
    couponCode: '30OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$200)',
  },
  {
    id: 5,
    name: 'Serpente',
    prediction:
      'Estratégia e sabedoria continuam sendo seus aliados. O Cavalo de Fogo traz movimento — planeje bem e aja no momento certo para prosperar.',
    imageQuery: 'chinese zodiac snake elegant art',
    iconQuery: 'snake',
    couponCode: '12OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$80)',
  },
  {
    id: 6,
    name: 'Cavalo',
    prediction:
      'Seu ano chegou! O Cavalo de Fogo potencializa energia, liberdade e conquistas. Aproveite para liderar, ousar e seguir seu próprio ritmo.',
    imageQuery: 'chinese zodiac horse elegant art',
    iconQuery: 'horse',
    couponCode: '30OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$200)',
  },
  {
    id: 7,
    name: 'Cabra',
    prediction:
      'Criatividade e sensibilidade ganham força. O Cavalo de Fogo convida você a confiar mais em si e transformar talento em novas oportunidades.',
    imageQuery: 'chinese zodiac goat sheep elegant art',
    iconQuery: 'goat',
    couponCode: '12OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$80)',
  },
  {
    id: 8,
    name: 'Macaco',
    prediction:
      'Um ano dinâmico e cheio de possibilidades. O Cavalo de Fogo favorece inovação, inteligência e soluções rápidas — use sua criatividade a seu favor.',
    imageQuery: 'chinese zodiac monkey elegant art',
    iconQuery: 'monkey',
    couponCode: '30OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$200)',
  },
  {
    id: 9,
    name: 'Galo',
    prediction:
      'Organização e foco serão essenciais. O Cavalo de Fogo traz movimento, mas recompensa quem mantém disciplina e clareza nos objetivos.',
    imageQuery: 'chinese zodiac rooster chicken elegant art',
    iconQuery: 'rooster',
    couponCode: '30OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$200)',
  },
  {
    id: 10,
    name: 'Cachorro',
    prediction:
      'Relações ganham destaque. O Cavalo de Fogo favorece parcerias, confiança e lealdade — cuide dos vínculos e colha bons resultados.',
    imageQuery: 'chinese zodiac dog elegant art',
    iconQuery: 'dog',
    couponCode: '30OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$200)',
  },
  {
    id: 11,
    name: 'Porco',
    prediction:
      'Um ano de recompensas e boas surpresas. O Cavalo de Fogo traz prosperidade, prazer e novas experiências — aproveite sem excessos.',
    imageQuery: 'chinese zodiac pig elegant art',
    iconQuery: 'pig',
    couponCode: '12OFF',
    couponCondition: '(NOS PEDIDOS ACIMA DE R$80)',
  },
]

export function calculateZodiac(year: number): ZodiacSign {
  // (year - 4) % 12 maps to the signs starting with Rat at index 0
  const index = (year - 4) % 12
  const adjustedIndex = index < 0 ? index + 12 : index
  return zodiacSigns[adjustedIndex]
}
