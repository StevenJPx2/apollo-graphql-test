import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faTrash,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const ALL_BOOKS = gql`
  {
    books {
      id
      name
      author {
        name
      }
    }
  }
`;

const ALL_AUTHORS = gql`
  {
    authors {
      id
      name
    }
  }
`;

const NEW_BOOK = gql`
  mutation newBook($name: String!, $authorId: ID!, $pages: Int) {
    createBook(name: $name, authorId: $authorId, pages: $pages) {
      name
    }
  }
`;

const NEW_AUTHOR = gql`
  mutation newAuthor($name: String!) {
    createAuthor(name: $name) {
      name
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;

function App() {
  const {
    loading: loadingBooks,
    error: errorBooks,
    data: booksData,
  } = useQuery(ALL_BOOKS);

  const {
    loading: loadingAuthors,
    error: errorAuthors,
    data: authorsData,
  } = useQuery(ALL_AUTHORS);

  const [createNewBook] = useMutation(NEW_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [createAuthor] = useMutation(NEW_AUTHOR);

  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ];

  const [showBookModal, setShowBookModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [newBookData, setBookData] = useState({
    name: null,
    pages: null,
    authorId: null,
  });
  const [newAuthorName, setAuthorName] = useState(null);
  const [authorSelected, setAuthorSelected] = useState(null);

  if (loadingBooks || loadingAuthors) return <p>Loading...</p>;
  if (errorBooks || errorAuthors) return <p>Error :(</p>;

  const colorArray = booksData.books.map(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  return (
    <div>
      <header className="container">
        <nav className="heading">
          <h1>Library</h1>
          <button>
            <FontAwesomeIcon size="3x" icon={faPlus} />
            <FontAwesomeIcon size="lg" icon={faChevronDown} />
          </button>
          <div className="dropdown">
            <ul>
              <li>
                <button onClick={() => setShowBookModal(true)}>New Book</button>
              </li>

              <li>
                <button onClick={() => setShowAuthorModal(true)}>
                  New Author
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <article className="cards">
          {booksData.books.map(({ id, name, author }, index) => (
            <section key={id} className={`card bg-${colorArray[index]}-600`}>
              <h2>{name}</h2>
              <hr />
              <small>{author.name}</small>
              <section className="more-info">
                <button
                  onClick={() => {
                    try {
                      deleteBook({
                        variables: { id: id },
                      });
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className={`btn bg-${colorArray[index]}-700`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete Book
                </button>
              </section>
            </section>
          ))}
        </article>
      </header>
      {showBookModal && (
        <div className="modal">
          <div className="modal-card">
            <nav>
              <h2>Add a new book</h2>
              <button onClick={() => setShowBookModal(false)}>
                <FontAwesomeIcon size="2x" icon={faTimes} />
              </button>
            </nav>
            <hr />
            <input
              type="text"
              placeholder="Book Name"
              onChange={(event) =>
                setBookData({
                  name: event.target.value,
                  authorId: newBookData.authorId,
                  pages: newBookData.pages,
                })
              }
            />
            <ul className="modal-dropdown">
              {authorsData.authors.map(({ id, name }) => (
                <li key={id}>
                  <button
                    className={`w-full h-full text-left ${
                      id === authorSelected ? "author-selected" : ""
                    }`}
                    onClick={() => {
                      setBookData({
                        authorId: id,
                        name: newBookData.name,
                        pages: newBookData.pages,
                      });
                      setAuthorSelected(id);
                    }}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Pages (Optional)"
              onChange={(event) =>
                setBookData({
                  pages: event.target.value,
                  authorId: newBookData.authorId,
                  name: newBookData.name,
                })
              }
            />
            <button
              onClick={() =>
                createNewBook({
                  variables: {
                    id: newBookData.id,
                    name: newBookData.name,
                    authorId: newBookData.authorId,
                  },
                })
              }
              className="btn submit-button"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {showAuthorModal && (
        <div className="modal">
          <div className="modal-card">
            <nav>
              <h2>Add a new author</h2>
              <button onClick={() => setShowAuthorModal(false)}>
                <FontAwesomeIcon size="2x" icon={faTimes} />
              </button>
            </nav>
            <hr />
            <input
              type="text"
              placeholder="Author Name"
              onChange={(event) => setAuthorName(event.target.value)}
            />
            <button
              onClick={() =>
                createAuthor({ variables: { name: newAuthorName } })
              }
              className="btn submit-button"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
