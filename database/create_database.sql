CREATE DATABASE borrow_system;

USE borrow_system;

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    student_id VARCHAR(100),
    face_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE items (

    id INT AUTO_INCREMENT PRIMARY KEY,
    item_code VARCHAR(100),
    item_name VARCHAR(100),

    status ENUM(
        'available',
        'borrowed'
    ) DEFAULT 'available',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE borrow_logs (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,
    item_id INT,

    borrow_time DATETIME,
    return_time DATETIME,

    status ENUM(
        'borrowed',
        'returned'
    ),

    FOREIGN KEY (user_id)
    REFERENCES users(id),

    FOREIGN KEY (item_id)
    REFERENCES items(id)

);