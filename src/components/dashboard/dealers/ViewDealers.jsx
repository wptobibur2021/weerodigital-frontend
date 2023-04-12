import { useAllDealerQuery, useDealerDeleteByIdMutation } from "../../../feature/delears/apiSlice";
import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { camelCase } from "../../../utility/camelCase";
import Loading from "../common/Loading";
import { deleteDealer } from "../../../feature/delears/dealersAPI";
import { FaEye } from "react-icons/fa";
function ViewDealers() {
  const {data} = useAllDealerQuery();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const dealers = data?.data || [];
  const [isLoad, setIsLoad] = useState(false);
  const [dealerDeleteById] = useDealerDeleteByIdMutation()
  const dealerDelete = (id) => {
    setIsLoad(true);
    deleteDealer(dealerDeleteById, id, setIsLoad);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => camelCase(row.fullName),
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.photo} width={50} height={50} alt={row.fullName} />
      ),
    },
    {
      name: "Shop Address",
      selector: (row) => camelCase(row.shopAddress),
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobileNo,
      sortable: true,
    },
    {
      name: "NID No",
      selector: (row) => row.nidNo,
      sortable: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <div className="flex justify-between">
          <button onClick={() => dealerDelete(row._id)}>
            <AiFillDelete className="cursor-pointer text-base text-red-600" />
          </button>
          <Link to={`/dashboard/user/profile/${row._id}`} className="ml-5">
            <FaEye className="cursor-pointer text-base text-red-600" />
          </Link>
        </div>
      ),
      ignoreRowClick: false,
      allowOverflow: false,
    },
  ];
  const filteredItems = dealers?.filter(
    (item) =>
      item?.fullName?.includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <div className="flex items-center mb-5">
        <input
          id="search"
          type="text"
          placeholder="Type Dealer Name"
          aria-label="Search Input"
          className="border rounded md:p-2 p-1 px-2 focus:outline-none"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          type="button"
          className="bg-red-500 px-3 py-1 md:py-2 md:px-5 text-white ml-1 rounded-sm"
          onClick={handleClear}
        >
          X
        </button>
      </div>
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div className="relative">
      {isLoad && (
        <div className="z-50 absolute flex justify-center top-0 w-full h-full right-0 opacity-70 bg-white">
          <Loading />
        </div>
      )}
      <div className="shadow-md p-5">
        <div>
          <DataTable
            title="Dealers Information below"
            columns={columns}
            data={filteredItems}
            pagination
            highlightOnHover
            pointerOnHover
            selectableRows
            fixedHeader={true}
            responsive={true}
            subHeader
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            subHeaderComponent={subHeaderComponentMemo}
            paginationResetDefaultPage={resetPaginationToggle}
            filterServer={true}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewDealers;
