const calculaValor = require('../src/calcula-valor')
require('./extensoes')

describe('calcularMontante', () => {
  test('Com uma prestação o montante é igual ao capital', () => {
    // Operação
    const montante = calculaValor.calcularMontante(100, 0.0175, 1)

    // Resultado ou comportamento experado
    expect(montante).toBe(100)
  })

  test('Com 4 prestações o montante é acrescido de juros', () => {
    // Operação
    const montante = calculaValor.calcularMontante(500, 0.025, 4)

    // Resultado ou comportamento esperado
    expect(montante).toBe(538.45)
  })
})

describe('arredondar', () => {
  test('Arredondar em duas casas decimais', () => {
    const resultado = calculaValor.arredondar(538.4453124999998)
    expect(resultado).toBe(538.45)
  })

  test('Arredondar 1.005 deve retornar 1.01', () => {
    const resultado = calculaValor.arredondar(1.005)
    expect(resultado).toBe(1.01)
  })
})

describe('calcularPrestacoes', () => {
  test('O número de parcelas é igual ao número de prestações', () => {
    // Premissas
    const numeroPrestacoes = 6

    // Operação
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)

    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
  })

  test('Uma única prestação, valor igual ao montante', () => {
    const numeroPrestacoes = 1

    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(50)
  })

  test('Duas prestações, valor igual à metade do montante', () => {
    const numeroPrestacoes = 2

    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(25)
    expect(prestacoes[1]).toBe(25)
  })

  test('Valor da soma das prestações deve ser igual ao montante com duas casas decimais', () => {
    // Dados (given)
    const numeroPrestacoes = 3
    const montante = 100

    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes)
    const soma = calculaValor.arredondar(prestacoes[0] + prestacoes[1] + prestacoes[2])
    expect(soma).toBe(montante)
    expect(prestacoes).sejaDecrencente()
  })

  test('Desafio semi-final', () => {
    // Given
    const numeroPrestacoes = 3
    const montante = 101.994

    // Quando (when)
    const prestacoes = calculaValor.calcularPrestacoes(calculaValor.arredondar(montante), numeroPrestacoes)

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes).tenhaSomaDeValoresIgual(montante)
    expect(prestacoes).sejaDecrencente()
  })
})
