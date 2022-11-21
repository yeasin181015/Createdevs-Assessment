import { useEffect, useState } from "react";
import { UserEntity } from "./../entities";

type UserProps = {
  id: number;
  name: string;
  username: string;
  phone: string;
  website: string;
}[];

const Table = () => {
  const [user, setUser] = useState<UserProps>([]);
  const [query, setQuery] = useState<string>("");
  const [direction, setDirection] = useState(true);
  //false-descending true-ascending

  let filteredData: {
    id: number;
    name: string;
    username: string;
    phone: string;
    website: string;
  }[];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        if (query.length === 0) {
          console.log(data);
          setUser(data);
        } else {
          filteredData = data.filter(
            (person: {
              name: string;
              username: string;
              website: string;
              phone: string;
            }) =>
              person.name.toLowerCase().includes(query.toLowerCase()) ||
              person.username.toLowerCase().includes(query.toLowerCase()) ||
              person.phone.toLowerCase().includes(query.toLowerCase()) ||
              person.website.toLowerCase().includes(query.toLowerCase())
          );
          setUser(filteredData);
        }
      });
  }, [query]);

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
        let descendingData: UserEntity[] = data.sort((p1, p2) =>
          p1.name < p2.name ? 1 : p1.name > p2.name ? -1 : 0
        );
        setUser(descendingData);
      } else if (field === "username") {
        let descendingData: UserEntity[] = data.sort((p1, p2) =>
          p1.name < p2.username ? 1 : p1.username > p2.username ? -1 : 0
        );
        setUser(descendingData);
      } else {
        let descendingData: UserEntity[] = data.sort((p1, p2) =>
          p1.name < p2.phone ? 1 : p1.phone > p2.phone ? -1 : 0
        );
        setUser(descendingData);
      }
    } else {
      if (field === "name") {
        let ascendingData: UserEntity[] = data
          .sort((p1, p2) =>
            p1.name < p2.name ? 1 : p1.name > p2.name ? -1 : 0
          )
          .reverse();
        setUser(ascendingData);
      } else if (field === "username") {
        let ascendingData: UserEntity[] = data
          .sort((p1, p2) =>
            p1.name < p2.name ? 1 : p1.username > p2.username ? -1 : 0
          )
          .reverse();
        setUser(ascendingData);
      } else {
        let ascendingData: UserEntity[] = data
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
      <div className="flex justify-center mt-8">
        <div className="mr-5">
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
            <div className="flex">
              <select
                className="select select-error max-w-xs mr-2"
                name="order"
                id="order"
              >
                <option disabled selected>
                  Order
                </option>
                <option value="ascending">ASC</option>
                <option value="descending">DESC</option>
              </select>
              <select
                className="select select-error max-w-xs mr-2"
                name="field"
                id="field"
              >
                <option disabled selected>
                  Field
                </option>
                <option value="name">Name</option>
                <option value="username">Username</option>
                <option value="phone">Phone</option>
              </select>
              <button className="btn  btn-active btn-accent ">Sort</button>
            </div>
          </form>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="search input input-bordered input-error w-full max-w-xs"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
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
