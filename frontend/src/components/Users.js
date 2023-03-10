import UserAvatar from "./UserAvatar";
import CreateUser from "./CreateUser";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      postsCount
    }
  }
`;

export default function Users({ selectUser}) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;

  function updateUsers(cache, { data: { createUser }}) {
    const { users } = cache.readQuery({ query: GET_USERS });
    cache.writeQuery({
      query: GET_USERS,
      data: { users: users.concat([createUser.user]) },
    });
  }

  return (
    <div className="flex flex-wrap items-center pb-16">
    {data.users.map(user => (
      <div key={user.id} className="lg:w-1/3 w-full p-4 text-center inline" onClick={selectUser.bind(this, user)}>
        <UserAvatar user={user} />
      </div>
    ))}

    <CreateUser onCreateUser={updateUsers} />
  </div>
  )
}