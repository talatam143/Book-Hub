import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './components/ProtectedRoutes'
import Login from './components/Login/index'
import Home from './components/Home/index'
import BookShelves from './components/BookShelves/index'
import BookHubContext from './Context/bookHubContext'
import BookDetails from './components/Bookdetails/index'
import NotFound from './components/NotFound'
// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class App extends Component {
  state = {showMenu: false}

  handleShowMenu = () => {
    this.setState(oldState => ({showMenu: !oldState.showMenu}))
  }

  render() {
    const {showMenu} = this.state
    return (
      <BookHubContext.Provider
        value={{
          showMenu,
          handleShowMenu: this.handleShowMenu,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/shelf"
            component={() => <BookShelves bookshelvesList={bookshelvesList} />}
          />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route exact path="/login" component={Login} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BookHubContext.Provider>
    )
  }
}

export default App
