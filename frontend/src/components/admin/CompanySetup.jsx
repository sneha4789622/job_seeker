import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utills/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  useGetCompanyById(id);

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  Input handler
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //  File handler
  const changeFileHandler = (e) => {
    setInput({ ...input, logo: e.target.files?.[0] });
  };

  //  Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.logo) formData.append("logo", input.logo);

    try {
      setLoading(true);

      console.log(formData)
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update company"
      );
    } finally {
      setLoading(false);
    }
  };

  //  Populate data
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        logo: null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white p-8 rounded-xl shadow">
      <form onSubmit={submitHandler}>
        <div className="flex items-center gap-4 mb-6">
          <Button
            type="button"
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Company Setup</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label>Company Name</Label>
            <Input name="name" value={input.name} onChange={changeEventHandler} />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Website</Label>
            <Input
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Company Logo</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} className="w-full border border-slate-300 focus:ring-2 focus:ring-blue-200 outline-none" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:scale-[1.0] hover:shadow-lg transition "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Company"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CompanySetup;
