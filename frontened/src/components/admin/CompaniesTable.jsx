import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Delete, Edit2, MoreHorizontal, AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utills/constant";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const navigate = useNavigate();

  //  DELETE COMPANY
  const companyDelete = async () => {
    try {
      await axios.delete(
        `${COMPANY_API_END_POINT}/${selectedCompanyId}`,
        { withCredentials: true }
      );

      setFilteredCompanies((prev) =>
        prev.filter((company) => company._id !== selectedCompanyId)
      );

      // Close modal
      setShowDeleteModal(false);
      setSelectedCompanyId(null);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  //  FILTER COMPANIES
  useEffect(() => {
    if (!searchCompanyByText) {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter((company) =>
        company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companies, searchCompanyByText]);

  return (
    <>
      {/* ================= TABLE ================= */}
      <div className="mt-6 rounded-xl border bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableCaption className="py-4 text-gray-500">
            A list of your registered companies
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-20">Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <TableRow
                  key={company._id}
                  className="hover:bg-blue-50 transition"
                >
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={
                          company.logo ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                      />
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-medium">
                    {company.name}
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {company.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 rounded-md hover:bg-gray-200 transition">
                          <MoreHorizontal size={18} />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-32 p-2 bg-white">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </div>

                        <div
                          onClick={() => {
                            setSelectedCompanyId(company._id);
                            setShowDeleteModal(true);
                          }}
                          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-red-50 cursor-pointer text-red-600"
                        >
                          <Delete size={16} />
                          <span>Delete</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No companies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="text-red-600" />
              </div>
              <h2 className="text-lg font-semibold">Delete Company</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this company?
              <span className="text-red-600 font-medium">
                {" "}This action cannot be undone.
              </span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCompanyId(null);
                }}
                className="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={companyDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompaniesTable;
