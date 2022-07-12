import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import { DebounceInput, Header } from "../../core/components";
import { clear } from "../../store/authentication/slice";
import ArrowDown from "../../assets/arrow-down.png";
import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import NotificationToastContext, {
  NotificationType,
} from "../../core/contexts/notification";
import AddUserForm from "./AddUserForm";
interface UserItem {
  id: number;
  name: string;
  gender: string;
  role: string;
  status: boolean;
  createdAt: number;
}

const NUMBER_ROW_PER_LIST = 8;
const TableItem = ({ item }: any) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={item.image}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{item.gender}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold text-${
            item.status ? "green" : "red"
          }-900 leading-tight`}
        >
          <span
            aria-hidden
            className={`absolute inset-0 bg-${
              item.status ? "green" : "red"
            }-200 opacity-50 rounded-full`}
          ></span>
          <span className="relative">
            {item.status ? "Active" : "Inactive"}
          </span>
        </span>
      </td>
    </tr>
  );
};
export default function Management() {
  const { setViewNotification } = useContext(NotificationToastContext);
  const [didRender, setDidRender] = useState(false);
  const [userList, setUserList] = useState<Array<UserItem>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const allItems = useRef(0);
  const addUserFormRef = useRef<any>(null);

  const getUserList = (pageNumber?: number) => {
    axios
      .post("https://api.spacex.land/graphql/", {
        query: `query Launches ($limit: Int!, $offset: Int!){
          launches(limit:$limit, offset: $offset) {
            mission_name
            mission_id
            rocket {
              rocket_name
            }
            launch_site {
              site_name
            }
            launch_date_local
          }
        }`,
        variables: {
          limit: 2,
          offset: 6,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    const url = Boolean(pageNumber)
      ? `https://62b16421196a9e987034823b.mockapi.io/users?page=${pageNumber}&limit=${NUMBER_ROW_PER_LIST}`
      : `https://62b16421196a9e987034823b.mockapi.io/users`;
    return axios
      .get(url)
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    if (didRender) {
      const getData = async () => {
        const data = await getUserList(pageNumber);
        setUserList(data);
      };
      getData();
    }
  }, [pageNumber]);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserList(1);
      const allData = await getUserList();
      setUserList(data);
      allItems.current = allData.length;
    };
    getData();
    setDidRender(true);
  }, []);

  const handleOpenCreatePopup = () => {
    addUserFormRef.current.setModalVisible(true);
    // if (window.ethereum) {
    //   // res[0] for fetching a first wallet
    //   window.ethereum
    //     .request({ method: 'eth_requestAccounts' })
    //     .then((res: any) => {
    //       console.log(res);
    //     });
    // } else {
    //   alert('install metamask extension!!');
    // }
  };

  const handleCreateUser = (data: any) => {
    return axios
      .post("https://62b16421196a9e987034823b.mockapi.io/users", { data })
      .then((response) => {
        const data = response.data;
        addUserFormRef.current.setModalVisible(false);
        setViewNotification("Create success", NotificationType.Success);
        return data;
      })
      .catch((err) => {
        setViewNotification("Create fail", NotificationType.Error);
        return err;
      });
  };

  return (
    <>
      <Header />
      <AddUserForm
        ref={addUserFormRef}
        handleOutsdeComponentSubmit={handleCreateUser}
      />
      <div className="w-full pt-5">
        <div className="md:container mx-auto ">
          <div className="bg-white rounded-md w-full">
            <div className="flex flex-col">
              <button
                className="self-end text-4xl text-white transition duration-150 hover:bg-sky-600 bg-sky-400 font-semibold py-2 px-8 rounded mb-4"
                onClick={handleOpenCreatePopup}
              >
                +
              </button>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Created at
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((item) => (
                        <TableItem item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                  <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    {/* <span className="text-xs xs:text-sm text-gray-900">
                      Showing 1 to 4 of 50 Entries
                    </span> */}
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button
                        className="text-sm text-gray-50 transition duration-150 hover:bg-gray-600 bg-gray-400 font-semibold py-2 px-4 rounded-l"
                        onClick={() => {
                          if (pageNumber <= 1) return;
                          setPageNumber(pageNumber - 1);
                        }}
                      >
                        Prev
                      </button>
                      &nbsp; &nbsp;
                      <button
                        className="text-sm text-gray-50 transition duration-150 hover:bg-gray-600 bg-gray-400 font-semibold py-2 px-4 rounded-r"
                        onClick={() => {
                          if (
                            allItems.current <=
                            pageNumber * NUMBER_ROW_PER_LIST
                          )
                            return;
                          setPageNumber(pageNumber + 1);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
