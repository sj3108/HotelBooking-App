import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import NewRoom from "../../pages/newRoom/NewRoom";

const Datatable = ({ col, endpoint }) => {
  // const [data, setData] = useState(userRows);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800${endpoint}`
  );
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/user/${id}`, {
        withCredentials: true,
      });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  // const col = { columns };
  // console.log({col});

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={col.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
