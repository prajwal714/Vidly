import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import Paginate from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";

class Movies extends Component {

  componentDidMount()
  {
    const genres=[{name: "All Genres"},...getGenres()]
    this.setState({movies: getMovies(),genres: genres});
  }
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 3,
    currentPage: 1
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect=genre=>{
    this.setState({selectedGenre: genre, currentPage: 1});
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies , genres, selectedGenre} = this.state;


    const filtered=selectedGenre&&selectedGenre._id?
    (allMovies.filter(m=>m.genre._id===selectedGenre._id)):allMovies;
    const movies = Paginate(filtered, currentPage, pageSize);

    if (count === 0) return <p>Their are no movies in the Database</p>;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3">
            <ListGroup 
            genres={genres} 
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}/>
          </div>
          <div className="col-md-9">
            <p>Showing {filtered.length} movies in the database.</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>

                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>

                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
