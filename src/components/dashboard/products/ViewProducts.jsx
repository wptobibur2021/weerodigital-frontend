import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { useAllProductQuery, useProductDeleteByIdMutation } from "../../../feature/product/productSlice";
import { deleteProduct } from "../../../feature/product/productAPI";
import { AiFillDelete } from "react-icons/ai";
import { camelCase } from "../../../utility/camelCase";
import Loading from "../common/Loading";
import { FaPlus } from "react-icons/fa";
import InvoiceCreateModal from "../common/InvoiceCreateModal";
function ViewProducts() {
  const {data} = useAllProductQuery();
  const [showModal, setShowModal] = React.useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const products = data?.data || [];
  const [isLoad, setIsLoad] = useState(false);
  const [product, setProduct] = useState()
  const [productDeleteById] = useProductDeleteByIdMutation()
  const productDelete = (id) => {
    setIsLoad(true);
    deleteProduct(productDeleteById, id, setIsLoad);
  };
  const createInvoice = (id) =>{
    const proData = products.find((pro)=>pro._id === id);
    setProduct(proData)
    setShowModal(true)
  }
  const columns = [
    {
      name: "Product Name",
      selector: (row) => camelCase(row.proName),
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.photo} width={50} height={50} alt={row.proName} />
      ),
    },
    {
      name: "Price",
      selector: (row) => row.proPrice + " Tk",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.proQty + " Pes",
      sortable: true,
    },
    {
      name: "Dealer Name",
      selector: (row) => camelCase(row?.dealerId?.fullName),
      sortable: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <div className="flex justify-between">
          <button onClick={() => productDelete(row._id)}>
            <AiFillDelete className="cursor-pointer text-base text-red-600" />
          </button>
        </div>
      ),
      ignoreRowClick: false,
      allowOverflow: false,
    },
    {
      name: "Create Invoice",
      cell: (row) => (
        <div onClick={()=>createInvoice(row._id)} className="flex justify-between">
          <button>
            <FaPlus className="cursor-pointer text-base text-red-600" />
          </button>
        </div>
      ),
      ignoreRowClick: false,
      allowOverflow: false,
    },
  ];
  const filteredItems = products?.filter(
    (item) =>
      item?.dealerId?.fullName?.includes(filterText.toLowerCase())
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
          title="Product Information below"
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
    {
      showModal && (
        <InvoiceCreateModal product={product} setShowModal={setShowModal}/>
      )
    }
  </div>
  );
}

export default ViewProducts;
