import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPlusCircle, faTimes);

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

function App() {
  const { loading, error, data } = useQuery(ALL_BOOKS);

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

  const [showModal, setShowModal] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const colorArray = data.books.map(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

  return (
    <div>
      <header className="container">
        <nav className="heading">
          <h1>Library</h1>
          <button onClick={() => setShowModal(true)}>
            <FontAwesomeIcon size="3x" icon={faPlusCircle} />
          </button>
        </nav>
        <article className="cards">
          {data.books.map(({ id, name, author }, index) => (
            <section key={id} className={`card bg-${colorArray[index]}-600`}>
              <h2>{name}</h2>
              <hr />
              <small>{author.name}</small>
            </section>
          ))}
        </article>
      </header>
      {showModal && (
        <div class="modal">
          <div class="modal-card">
            <nav>
              <h2>Add a new book</h2>
              <button onClick={() => setShowModal(false)}>
                <FontAwesomeIcon size="2x" icon={faTimes} />
              </button>
            </nav>
            <hr />
            <input type="text" placeholder="Book Name" />
            <input type="text" placeholder="Author Name" />
            <input type="text" placeholder="Pages (Optional)" />
            <button className="submitButton">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
