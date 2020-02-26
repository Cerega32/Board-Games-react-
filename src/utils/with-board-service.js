import React from "react"
import { BoardServiceConsumer } from "./board-service-contexts"

const withBoardService = () => Wrapped => {
  return props => {
    return (
      <BoardServiceConsumer>
        {boardService => {
          return <Wrapped {...props} boardService={boardService} />
        }}
      </BoardServiceConsumer>
    )
  }
}

export default withBoardService
