class HttpException extends Error {
  status: number;
  // Declara uma propriedade 'status' do tipo number
  message: string;
  // Declara uma propriedade 'message' do tipo string

  constructor(status: number, message: string) {
    super(message);
    // Chama o construtor da classe pai (Error) com o parâmetro message
    this.status = status;
    // Atribui o valor de status a propriedade status
    this.message = message;
    // Atribui o valor de message a propriedade message
  }
}

export default HttpException;
// Exporta a classe HttpException como default.
