import Link from 'next/link'

export async function getStaticProps(context) {
  const { params } = context
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.todoId}`,
  )

  const todo = await data.json()

  return {
    props: { todo },
  }
}

export async function getStaticPaths() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/')
  const data = await response.json()

  const paths = data.map((todo) => {
    return {
      params: {
        todoId: `${todo.id}`,
      },
    }
  })

  return { paths, fallback: false }
}

export default function Todo({ todo }) {
  return (
    <>
      <Link href="/todos">
        Voltar
      </Link>
      <h1>Exibindo o todo: {todo.id}</h1>
      <p>Título: {todo.title}</p>
      <p>
        Comentário: primeiro
        <Link href={`/todos/${todo.id}/comment/1`}>
          Detalhes
        </Link>
      </p>
      <p>
        Comentário: segundo
        <Link href={`/todos/${todo.id}/comment/2`}>
          Detalhes
        </Link>
      </p>
      <p>
        Comentário:terceiro 
        <Link href={`/todos/${todo.id}/comment/3`}>
          Detalhes
        </Link>
      </p>
    </>
  )
}
