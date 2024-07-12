import express, { Request, Response } from "express";
import {
  Book,
  Author,
  BookWithAuthor,
  CreateBook,
  UpdateBook,
  CreateAuthor,
  UpdateAuthor,
} from "./types/types";
import mysql, { Connection, QueryError, ResultSetHeader } from "mysql2";
import cors from "cors";

const app = express();

const db: Connection = mysql.createConnection({
  user: "root",
  password: "root",
  host: "127.0.0.1",
  port: 3306,
  database: "book",
});

// to send from html body
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});

//////////////////////// API LIBRI //////////////////////////

app.get("/book", (req: Request, res: Response) => {
  const q = "SELECT * FROM books";
  db.query<Book[]>(q, (err: QueryError | null, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get("/book/:id", (req: Request<{ id: string }>, res: Response) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id=?";
  db.query<Book[]>(q, [bookId], (err: QueryError | null, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get(
  "/books/search/:ricerca",
  (req: Request<{ ricerca: string }>, res: Response) => {
    const ricerca = req.params.ricerca;
    const q = ` SELECT *
              FROM autori a
              JOIN books b ON a.id = b.id_autore
              WHERE a.nome LIKE ? OR a.cognome LIKE ? OR b.title LIKE ? `;
    db.query<BookWithAuthor[]>(
      q,
      [`%${ricerca}%`, `%${ricerca}%`, `%${ricerca}%`],
      (err: QueryError | null, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
      }
    );
  }
);

app.get(
  "/books/title/:title",
  (req: Request<{ title: string }>, res: Response) => {
    const title = req.params.title;
    const q = ` SELECT *
              FROM autori a
              JOIN books b
              ON a.id = b.id_autore 
              WHERE title = ? `;
    db.query<BookWithAuthor[]>(q, [title], (err: QueryError | null, data) => {
      // console.log(data.find((book) => book.title.toLocaleLowerCase() === title.toLocaleLowerCase()));
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  }
);

app.post("/book", (req: Request<{}, {}, CreateBook>, res: Response) => {
  const q = "INSERT INTO books (title,`desc`,price,cover,id_autore) VALUES (?)";
  const values: [string, string, number, string, number] = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    req.body.id_autore,
  ];
  console.log(values);
  db.query<ResultSetHeader>(q, [values], (err: QueryError | null, data) => {
    if (err) return res.status(500).json(err);
    return res.json(`Book has been added. ID added: ${data.insertId}`);
  });
});

app.put(
  "/book/:id",
  (req: Request<{ id: string }, {}, UpdateBook>, res: Response) => {
    const bookId = req.params.id;
    const q =
      "UPDATE books SET title=?, `desc`=?, price=?, cover=?, id_autore=? WHERE id=?";
    const values: [string, string, number, string, number] = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
      req.body.id_autore,
    ];
    console.log(values);
    db.query<ResultSetHeader>(
      q,
      [...values, bookId],
      (err: QueryError | null, data) => {
        if (err) return res.status(500).json(err);
        return res.json(`Book has been updated. ${data.info}`);
      }
    );
  }
);

app.delete("/book/:id", (req: Request<{ id: string }>, res: Response) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id=?";
  db.query<ResultSetHeader>(q, [bookId], (err: QueryError | null, data) => {
    if (err) return res.status(500).json(err);
    return res.json(`Book has been deleted.`);
  });
});

//////////////////////// API AUTORI //////////////////////////

app.get("/author", (req: Request, res: Response) => {
  const q = "SELECT * FROM autori";
  db.query<Author[]>(q, (err: QueryError | null, data) => {
    // console.log(data.map((author) => author.nome));
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get("/author/:id", (req: Request<{ id: string }>, res: Response) => {
  const authorId = req.params.id;
  const q = "SELECT * FROM autori WHERE id=?";
  db.query<Author[]>(q, [authorId], (err: QueryError | null, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post("/author", (req: Request<{}, {}, CreateAuthor>, res: Response) => {
  const q = "INSERT INTO autori (nome,cognome) VALUES (?)";
  const values: [string, string] = [req.body.nome, req.body.cognome];
  db.query<ResultSetHeader>(q, [values], (err: QueryError | null, data) => {
    if (err) return res.status(500).json(err);
    return res.json(`Author has been added. ID added: ${data.insertId}`);
  });
});

app.put(
  "/author/:id",
  (req: Request<{ id: string }, {}, UpdateAuthor>, res: Response) => {
    const authorId = req.params.id;
    const q = "UPDATE autori SET nome=?, cognome=? WHERE id=?";
    const values: [string, string] = [req.body.nome, req.body.cognome];
    db.query<ResultSetHeader>(
      q,
      [...values, authorId],
      (err: QueryError | null, data) => {
        if (err) return res.status(500).json(err);
        return res.json(`Author has been updated. ${data.info}`);
      }
    );
  }
);

app.delete("/author/:id", (req: Request<{ id: string }>, res: Response) => {
  const authorId = req.params.id;
  const q = "DELETE FROM autori WHERE id=?";
  db.query<ResultSetHeader>(q, [authorId], (err: QueryError | null, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Author has been deleted.");
  });
});

//////////////////////// AVVIO DEL SERVER //////////////////////////

app.listen(8800, () => {
  console.log("Connect to backend.");
});
