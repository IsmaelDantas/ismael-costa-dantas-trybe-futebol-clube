// Define uma interface chamada Iid com uma propriedade opcional chamada 'id' do tipo number
interface Iid { id?: number }
// Define uma interface chamada Iusername com uma propriedade opcional chamada 'username' do tipo string
interface Iusername { username?: string }
// Define uma interface chamada Irole com uma propriedade opcional chamada 'role' do tipo string
interface Irole { role?: string }
// Define uma interface chamada Iemail com uma propriedade obrigatória chamada 'email' do tipo string
interface Iemail { email: string }
// Define uma interface chamada Ipassword com uma propriedade obrigatória chamada 'password' do tipo string
interface Ipassword { password: string }
// Define uma interface chamada Istatus com uma propriedade opcional chamada 'status' do tipo string
interface Istatus { status?: string }
// Define uma interface chamada Imessage com uma propriedade opcional chamada 'message' do tipo string
interface Imessage { message?: string }
// Define uma interface chamada Itype com uma propriedade opcional chamada 'type' do tipo string
interface Itype { type?: string }

interface Ilogin extends
  Iid, // Herda propriedades de Iid
  Iusername, // Herda propriedades de Iusername
  Iemail, // Herda propriedades de Iemail
  Ipassword, // Herda propriedades de Ipassword
  Irole, // Herda propriedades de Irole
  Istatus, // Herda propriedades de Istatus
  Imessage, // Herda propriedades de Imessage
  Itype {} // Herda propriedades de Itype

export default Ilogin;
export { Iemail, Ipassword, Iusername, Irole, Iid, Istatus };
// exporta a interface Ilogin e as interfaces individuais que ela herda
