import { useSidebarContext } from '@/context/sidebar/sideBarContext'
import styles from './styles.module.css'
import { downgradeToUser, upgradeToAdmin } from '@/services/firebase/user'

export default function UserAdministration() {
  const { users, setUsers } = useSidebarContext()

  return (
    <div className={styles.container}>
      <h2>Administración de Usuarios</h2>
      <div>
        <div
          className={styles.header + ' ' + styles.columns}
        >
          <h3>Correo</h3>
          <h3
            className={styles.emailTitle}
          >Tipo de usuario</h3>
        </div>
        <div
          className={styles.content}
        >
          {users.map((user, index) => (
            <span
              key={user.uid}
              className={styles.span + ' ' + styles.columns}
            >
              <p
                className={styles.email}
              >{user.email}</p>

              <select
                className={styles.select}
                value={user.isAdmin === true ? "0" : "1"}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const changes = users.slice()
                  if (e.target.value == "0") {
                    changes[index].isAdmin = true
                    upgradeToAdmin(user)
                  } else if (e.target.value == "1") {
                    changes[index].isAdmin = false
                    downgradeToUser(user)
                  }
                  setUsers(changes)
                }}
              >
                <option value={"0"}>Administrador</option>
                <option value={"1"}>Usuario</option>
              </select>
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
