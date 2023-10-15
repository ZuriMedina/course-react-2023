import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    userName: 'zmedina',
    name: 'Zuri Medina',
    IsFollowing: true
  },
  {
    userName: 'pepe',
    name: 'Pepe gil',
    IsFollowing: false
  },
  {
    userName: 'laura',
    name: 'Laura Menz',
    IsFollowing: true
  }
]

function App() {
  const formattedUserName = (userName) => `@${userName}`

  return (
    <div className='App'>
      {
        users.map(user => {
          const { userName, name, IsFollowing } = user
          return (
            <TwitterFollowCard
              key={userName}
              formattedUserName={formattedUserName}
              initialIsFollowing={IsFollowing}
              userName={userName}
              name={name} />
          )
        })
      }
      {/* <TwitterFollowCard
        formattedUserName={formattedUserName}
        initialIsFollowing={false}
        userName="midudev"
        name="Zuri Medina" />

      <TwitterFollowCard
        formattedUserName={formattedUserName}
        initialIsFollowing={true}
        userName="midudev"
        name="Zuri Medina" /> */}
    </div>
  )
}

export default App
