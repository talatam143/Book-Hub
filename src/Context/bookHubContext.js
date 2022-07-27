import React from 'react'

const BookHubContext = React.createContext({
  showMenu: false,
  handleShowMenu: () => {},
})

export default BookHubContext
