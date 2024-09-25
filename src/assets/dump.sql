 PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS aips_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderby INTEGER, 
    question TEXT,
    question_type INTEGER
);

CREATE TABLE IF NOT EXISTS aips_aswers  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    questionid INTEGER,
    orderby INTEGER, 
    aswer TEXT,
    FOREIGN KEY(questionid) REFERENCES aips_questions(id)
);

INSERT or IGNORE INTO questions (id, question_type, orderby, question) VALUES (1, 1, 1, "Qual seu grau de conhecimento sobre a AIDS?");

INSERT OR IGNORE INTO aips_aswers (id, questionid, orderby, aswer) VALUES (1, 1, 1, "Nunca ouvir falar")
INSERT OR IGNORE INTO aips_aswers (id, questionid, orderby, aswer) VALUES (2, 1, 1, "Sei algumas coisas")
INSERT OR IGNORE INTO aips_aswers (id, questionid, orderby, aswer) VALUES (3, 1, 1, "Sei tudo")

INSERT or IGNORE INTO questions (id, question_type, orderby, question) VALUES (2, 1, 1, "Como está sua saúde?");

INSERT OR IGNORE INTO aips_aswers (id, questionid, orderby, aswer) VALUES (1, 2, 1, "Estou muito bem")
INSERT OR IGNORE INTO aips_aswers (id, questionid, orderby, aswer) VALUES (2, 2, 1, "Estou estranho")
INSERT OR IGNORE INTO aips_aswers (id, questionid, orderby, aswer) VALUES (3, 2, 1, "Me sinto mal frequentemente")