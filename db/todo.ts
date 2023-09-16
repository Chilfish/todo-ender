export const TABLE_TODO = 'todos'

export const initTodoDB = `CREATE TABLE IF NOT EXISTS ${TABLE_TODO} (
  id INT NOT NULL AUTO_INCREMENT,
  uid INT NOT NULL,
  text text NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

export const addTodoSQL = `INSERT INTO ${TABLE_TODO} (text, uid) VALUES (:text, :uid);`

export const getTodoSQL = `SELECT * FROM ${TABLE_TODO}
 WHERE id = :id AND deleted = FALSE AND uid = :uid 
ORDER BY updated_at DESC;
`

export const getTodosSQL = `SELECT * FROM ${TABLE_TODO}
 WHERE deleted = FALSE AND uid = :uid
 ORDER BY updated_at DESC;
`

export const upTodoSQL = `UPDATE ${TABLE_TODO} SET text = :text, completed = :completed 
 WHERE id = :id AND deleted = FALSE AND uid = :uid;
`

export const rmTodoSQL = `UPDATE ${TABLE_TODO}
SET deleted    = TRUE,
    deleted_at = CURRENT_TIMESTAMP
WHERE id = :id
  AND deleted = FALSE
  AND uid = :uid;
`

export const getAllTodosSQL = `SELECT * FROM ${TABLE_TODO}`
