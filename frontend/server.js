const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

app.db = router.db

const rules = auth.rewriter({
  users: 600,
  contas: 664,
  despesas: 664,
  estoque: 664,
  orcamentos: 664,
  transacoes: 664
})

app.use(rules)
app.use(auth)
app.use(router)

app.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})
