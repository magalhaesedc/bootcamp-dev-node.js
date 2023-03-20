function calcularMontante (capital, taxa, periodo) {
  const montante = capital * Math.pow((1 + taxa), (periodo - 1))
  return arredondar(montante)
}

function arredondar (valor) {
  const precisao = 100
  const arrendodado = Math.round((valor + Number.EPSILON) * precisao) / precisao
  return arrendodado
}

function calcularPrestacoes (montante, numeroParcelas) {
  const prestacaoBase = arredondar(montante / numeroParcelas)
  const resultado = Array(numeroParcelas).fill(prestacaoBase)

  let somaPrestacoes = resultado.reduce((a, t) => a + t)
  let diferenca = arredondar(montante - somaPrestacoes)
  const fator = diferenca > 0 ? 1 : -1

  let i = fator === 1 ? 0 : numeroParcelas - 1
  while (diferenca !== 0) {
    resultado[i] = arredondar(resultado[i] + (0.01 * fator))
    somaPrestacoes = resultado.reduce((a, t) => a + t)
    diferenca = arredondar(montante - somaPrestacoes)
    i += fator
  }

  return resultado
}

console.log(calcularPrestacoes(arredondar(101.994), 3))

module.exports = {
  calcularMontante,
  arredondar,
  calcularPrestacoes
}
