import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Books() {
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

  const changeSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleGoogleSearch = (event) => {
    event.preventDefault();
    API.googleBooks(query).then((response) => {
      if (response.data.items === "error") {
        throw new Error(response.data.items);
      } else {
        let results = response.data.items;
        results = results.map((result) => {
          result = {
            key: result.id,
            id: result.id,
            title: result.volumeInfo.title,
            authors: result.volumeInfo.authors,
            synopsis: result.volumeInfo.description
          };
          return result;
        });
        setBooks(results);
      }
    });
  }
  // function Search() {
  //   const [books, setBooks] = useState();
   
  //   const [success, setSuccess] = useState("");
  
   
  //   }  ;
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search book on Google</h1>
              <Input
                onChange={changeSearch}
                name="title"
                placeholder="Title (required)"
              />
            <FormBtn
                //disabled={!(formObject.author && formObject.title)}
                onClick={handleGoogleSearch}
              >
                Search
              </FormBtn>
            </Jumbotron>
            <form>
              <h1>Add a book to the Database</h1>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books in Database</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
