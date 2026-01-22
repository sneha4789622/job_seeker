// import React, { useState } from "react";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Globe, MapPin, Mail, Pen } from "lucide-react";
// import { Label } from "./ui/label";
// // import UpdateCompanyDialog from "./UpdateCompanyDialog";
// import { useSelector } from "react-redux";

// const CompanyProfile = () => {
//   const [open, setOpen] = useState(false);

//   //  ADMIN DATA
//   const { user } = useSelector((store) => store.auth);

//   if (!user) return null;

//   return (
//     <div>
//       <div className="backdrop-blur max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 my-5 p-8">

//         {/* HEADER */}
//         <div className="flex justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-24 w-24">
//               <AvatarImage
//                 src={
//                   user?.profile?.profilePhoto ||
//                   "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                 }
//                 alt="admin-profile"
//                 className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-200 shadow-lg"
//               />
//             </Avatar>

//             <div>
//               <h1 className="font-medium text-xl">
//                 {user?.fullname}
//               </h1>
//               <p className="text-gray-600">
//                 {user?.profile?.description || "No description added"}
//               </p>
//             </div>
//           </div>

//           <Button onClick={() => setOpen(true)} variant="outline">
//             <Pen />
//           </Button>
//         </div>

//         {/* DETAILS */}
//         <div className="my-5 space-y-3">
//           <div className="flex items-center gap-3">
//             <Globe />
//             {user?.profile?.website ? (
//               <a
//                 href={user.profile.website}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 {user.profile.website}
//               </a>
//             ) : (
//               <span>Website not added</span>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             <MapPin />
//             <span>
//               {user?.profile?.location || "Location not specified"}
//             </span>
//           </div>

//           <div className="flex items-center gap-3">
//             <Mail />
//             <span>
//               {user?.email || "Email not added"}
//             </span>
//           </div>
//         </div>

//         {/* META */}
//         <div className="grid w-full max-w-sm items-center gap-1.5">
//           <Label className="text-md font-bold">Company Info</Label>
//           <p className="text-gray-700">
//             Helping companies hire the right talent faster.
//           </p>
//         </div>
//       </div>

//       {/* UPDATE DIALOG */}
//       <UpdateCompanyDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default CompanyProfile;
