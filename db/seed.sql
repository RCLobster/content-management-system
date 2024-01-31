INSERT INTO department (name)
VALUES ("Narrative Designer"),
	   ("Level Designer"),
       ("Programmer"),
       ("Animator");

INSERT INTO role (title, salary, department_id)
VALUES ("Narrative Designer", 2000.00, 1),
        ("Level Designer", 2500.00, 2),
        ("Programmer", 3000.00, 2),
        ("Animator", 2750.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ethan", "Stone", 1, null),
        ("Anthony", "Yoo", 1, null),
        ("Carl", "Smith", 3, 1),
        ("Bryan", "Swarthout", 4, 1),
        ("Paul", "Rudd", 2, 2),
        ("Jordan", "Hernandez", 5, 2),
        ("Olivia", "Baker", 3, 1),
        ("Sydney", "Channel", 4, 1),
        ("Ashley", "Birch", 2, 2);