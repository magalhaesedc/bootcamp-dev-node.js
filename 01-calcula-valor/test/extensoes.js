const calculaValor = require('../src/calcula-valor')

expect.extend({
  tenhaSomaDeValoresIgual (itens, soma) {
    const somaReal = calculaValor.arredondar(itens.reduce((a, t) => a + t))
    const passou = somaReal === calculaValor.arredondar(soma)

    return {
      message: () => `A soma ${somaReal} deve ser igual a ${soma}`,
      pass: passou
    }
  },

  sejaDecrencente (itens) {
    for (let i = 0; i < itens.length - 1; i++) {
      const j = i + 1
      if (itens[1] < itens[j]) {
        return {
          message: () => 'O array deve ser em ordem decrescente',
          pass: false
        }
      }
    }

    return {
      message: () => 'O array deve ser em ordem decrescente',
      pass: true
    }
  }

})
