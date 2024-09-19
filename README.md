CREATE DATABASE todo_app;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE
);


INSERT INTO tasks (title, description, completed)
VALUES
('Tarea 1', 'Descripción de la tarea 1', FALSE),
('Tarea 2', 'Descripción de la tarea 2', TRUE),
('Tarea 3', 'Descripción de la tarea 3', FALSE);


SELECT * FROM tasks;
