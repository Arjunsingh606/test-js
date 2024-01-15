"use client"
import styles from './page.module.css'
import TodoList from '../../component/TodoList'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <TodoList/>
      </div>

    </main>
  )
}
