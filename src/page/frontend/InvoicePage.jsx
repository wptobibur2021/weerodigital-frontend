import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useAllInvoiceQuery, useInvoiceDeleteByIdMutation } from "../../feature/invoice/invoiceSlice";
import { FaDownload, FaEye } from "react-icons/fa";
import { camelCase } from "../../utility/camelCase";
import { AiFillDelete } from "react-icons/ai";
import { deleteInvoice } from "../../feature/invoice/invoiceAPI";
import Loading from "../../components/dashboard/common/Loading";

const InvoicePage = () => {
    const {data} = useAllInvoiceQuery()
    const [filterText, setFilterText] = useState("");
    const [isLoad, setIsLoad] = useState(false);
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const invoices = data?.data || [];
    const [invoiceDeleteById] = useInvoiceDeleteByIdMutation()
    const invoiceDelete = (id) => {
        setIsLoad(true);
        deleteInvoice(invoiceDeleteById, id, setIsLoad);
      };
    const columns = [
      {
        name: "Pro Name",
        selector: (row) => camelCase(row.productId?.proName),
        sortable: true,
      },
      {
        name: "Qty",
        selector: (row) => row.proQty,
        sortable: true,
      },
      {
        name: "PPC",
        selector: (row) => row.productId.proPrice + " Tk",
        sortable: true,
      },
      {
        name: "TC",
        selector: (row) => row.totalAmount,
        sortable: true,
      },
      {
        name: "RC",
        selector: (row) => row.payment,
        sortable: true,
      },
      {
        name: "DC",
        selector: (row) => row.duePayment,
        sortable: true,
      },
      {
        name: "Download",
        cell: (row) => (
          <div className="flex justify-between">
            <button className="ml-5">
              <FaDownload className="cursor-pointer text-base text-red-600" />
            </button>
            <button className="ml-5" onClick={()=>invoiceDelete(row._id)}>
                <AiFillDelete className="cursor-pointer text-base text-red-600" />
            </button>
          </div>
        ),
        ignoreRowClick: false,
        allowOverflow: false,
      },
    ];
    const filteredItems = invoices?.filter(
      (item) =>
        item?.productId?.proName?.includes(filterText.toLowerCase())
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
          title="Invoice Information below"
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
  )
}

export default InvoicePage