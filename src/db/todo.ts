export const TABLE_TODO = 'todos'

export const initTodoDB = `CREATE TABLE IF NOT EXISTS ${TABLE_TODO} (
  id INT NOT NULL AUTO_INCREMENT,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

export const addTodoSQL = `INSERT INTO ${TABLE_TODO} (text) VALUES (?)`

export const getTodoSQL = `SELECT * FROM ${TABLE_TODO} WHERE id = ?`

export const getTodosSQL = `SELECT * FROM ${TABLE_TODO} WHERE deleted = FALSE ORDER BY updated_at DESC`

export const upTodoSQL = `UPDATE ${TABLE_TODO} SET text = ?, completed = ? WHERE id = ?`

export const rmTodoSQL = `UPDATE ${TABLE_TODO} SET deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE id = ?`

export const rmTodosSQL = `UPDATE ${TABLE_TODO} SET deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE id IN (?)`
