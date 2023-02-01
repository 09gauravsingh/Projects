import { React, useEffect, useState, useRef, createRef } from "react";
import ReactPaginate from "react-paginate";
import "./Display.css";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBox from "../Components/SearchBox";
import EditRow from "./EditRow";
import Buttonn from "./Buttonn";

function Display() {
  const [sendData, setSendData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editId, setEditId] = useState("");

  const rowRef = useRef();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const result = response.data;
        setUserData(result);
        return result;
        //console.log(result);
      } catch (error) {
        console.log(error);
        setUserData(null);
        alert("Cannot fetch data at the moment");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSendData(userData);

    setFilteredUsers(userData.filter((user) => user.name.includes(searchUser)));
  }, [searchUser, userData]);

  const currentPageUsers = filteredUsers.slice(
    pageCount * itemsPerPage,
    (pageCount + 1) * itemsPerPage
  );

  //Callback... to edit
  const handleEdit = (id) => {
    setEditId(id);
  };

  //edit functionality
  const handleInputChange = (id, key, value) => {
    let temp = [...userData];
    temp.forEach((item) => {
      if (item.id == id) {
        item[key] = value;
      }
    });
    setUserData(temp);
  };

  //edit click back to previous state
  const handleEditClick = (e) => {
    if (e.target.localName === "input" || e.target.localName === "select") {
      e.stopPropagation();
    } else {
      editId !== "" && setEditId("");
    }
  };

  //Delete user data on Click
  const handleDelete = (indexOfData) => {
    const tempList = [...userData];
    tempList.splice(indexOfData, 1);
    setUserData(tempList);
  };

  //Handle the checkbox click for a user
  const handleCheckboxClick = (user) => {
    if (selectedUsers.includes(user)) {
      //deselect the user
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      //select the user
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  //select all checkbox
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedUsers(currentPageUsers);
    } else {
      // Deselect all users
      setSelectedUsers([]);
    }
  };

  //Delete Selected
  const handleDeleteSelectedClick = () => {
    //Remove the selected users from the list and re-render the table
    setUserData(userData.filter((user) => !selectedUsers.includes(user)));
  };

  //Pagination
  let pageVisited = pageCount * itemsPerPage;
  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const pageChange = ({ selected }) => {
    setPageCount(selected);
  };

  const handleSearch = (params) => {
    const mydata = userData.filter((user, index) => {
      if (searchUser === " ") {
        return user;
      } else if (
        user.name.includes(params) ||
        user.email.includes(params) ||
        user.role.includes(params)
      ) {
        return user;
      }
    });

    setPageCount(0);
    setSendData(mydata);
  };

  return (
    <>
      <div className="container" onClick={handleEditClick}>
        <SearchBox
          placeholder="Search name, email or role"
          handleSearch={handleSearch}
        />
        <table className="table1">
          <tr className="color">
            <th>
              <input
                id="checkbox-size"
                type="checkbox"
                name="allSelect"
                onChange={handleSelectAllClick}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          <hr />
          {/* Search data  */}
          <tbody className="table-body">
            {sendData
              .slice(pageVisited, pageVisited + itemsPerPage)
              .map((user, index) => {
                const rowRef = createRef();
                return (
                  <tr key={index.id} ref={rowRef}>
                    <td>
                      {" "}
                      <input
                        id="checkbox-size"
                        type="checkbox"
                        checked={selectedUsers.includes(user)}
                        onChange={() => handleCheckboxClick(user)}
                        onClick={(e, user) => {
                          if (e.target.checked) {
                            rowRef.current.style.backgroundColor = "#CCCCFF";
                          } else {
                            rowRef.current.style.backgroundColor = "";
                          }
                        }}
                      />{" "}
                    </td>
                    <EditRow
                      handleInputChange={handleInputChange}
                      editId={editId}
                      id={user.id}
                      name={user.name}
                      email={user.email}
                      role={user.role}
                    />

                    <td>
                      <Buttonn
                        className="edit-button"
                        selector="editButton"
                        id={user.id}
                        handleEdit={handleEdit}
                        imgSrc="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                      />{" "}
                      <Buttonn
                        className="delete-button"
                        selector="deleteButton"
                        id={index}
                        imgSrc="https://cdn-icons-png.flaticon.com/512/6460/6460112.png"
                        handleDelete={handleDelete}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br />
        <Button
          startIcon={<DeleteIcon />}
          className="deleteAllbutton"
          onClick={() => {
            handleDeleteSelectedClick();
          }}
        >
          Delete Selected
        </Button>
      </div>
      <div className="pageinate">
        <ReactPaginate
          className="pagination"
          activeClassName="activePage"
          previousClassName="next"
          nextClassName="next"
          pageClassName="page"
          totalPosts={userData.length}
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={pageChange}
        />
      </div>
    </>
  );
}

export default Display;
