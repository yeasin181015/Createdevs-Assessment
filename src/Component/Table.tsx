import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
type UserProps = {
  id: number;
  name: string;
  username: string;
  phone: string;
  website: string;
}[];

const Table = () => {
  const [user, setUser] = useState<UserProps>([]);
  //   const [order, setOrder] = useState(true);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleSort = (order: string, field: string) => {
    console.log(order, field);
    let data: {
      id: number;
      name: string;
      username: string;
      phone: string;
      website: string;
    }[] = [...user];

    console.log(data);

    if (order === "descending") {
      if (field === "name") {
        let descendingData: {
          id: number;
          name: string;
          username: string;
          phone: string;
          website: string;
        }[] = data.sort((p1, p2) =>
          p1.name < p2.name ? 1 : p1.name > p2.name ? -1 : 0
        );
        setUser(descendingData);
      } else if (field === "username") {
        let descendingData: {
          id: number;
          name: string;
          username: string;
          phone: string;
          website: string;
        }[] = data.sort((p1, p2) =>
          p1.name < p2.username ? 1 : p1.username > p2.username ? -1 : 0
        );
        setUser(descendingData);
      } else {
        let descendingData: {
          id: number;
          name: string;
          username: string;
          phone: string;
          website: string;
        }[] = data.sort((p1, p2) =>
          p1.name < p2.phone ? 1 : p1.phone > p2.phone ? -1 : 0
        );
        setUser(descendingData);
      }
    } else {
      if (field === "name") {
        let ascendingData: {
          id: number;
          name: string;
          username: string;
          phone: string;
          website: string;
        }[] = data
          .sort((p1, p2) =>
            p1.name < p2.name ? 1 : p1.name > p2.name ? -1 : 0
          )
          .reverse();
        setUser(ascendingData);
      } else if (field === "username") {
        let ascendingData: {
          id: number;
          name: string;
          username: string;
          phone: string;
          website: string;
        }[] = data
          .sort((p1, p2) =>
            p1.name < p2.name ? 1 : p1.username > p2.username ? -1 : 0
          )
          .reverse();
        setUser(ascendingData);
      } else {
        let ascendingData: {
          id: number;
          name: string;
          username: string;
          phone: string;
          website: string;
        }[] = data
          .sort((p1, p2) =>
            p1.name < p2.name ? 1 : p1.phone > p2.phone ? -1 : 0
          )
          .reverse();
        setUser(ascendingData);
      }
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              order: { value: string };
              field: { value: string };
            };
            const order = target.order.value;
            const field = target.field.value;
            handleSort(order, field);
          }}
        >
          <select name="order" id="order">
            <option value="ascending">ASC</option>
            <option value="descending">DESC</option>
          </select>
          <select name="field" id="field">
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="phone">Phone</option>
          </select>
          <br />
          <button className="border rounded bg-red-600 p-2">Submit</button>
        </form>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.username}</td>
                <td>{person.phone}</td>
                <td>{person.website}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
