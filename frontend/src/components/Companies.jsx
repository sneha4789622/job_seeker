// // // CATEGORIES SECTION--------------------------------------------

import { company } from "../componentsData/Companydata";
import Marquee from "react-fast-marquee";

const Companies = () => {
  return (
    <div className="py-10 flex flex-col mb-10 bg-blue-950">
      
      <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight text-center mb-10">
        Companies Trusted Us
      </h3>

      <Marquee speed={50} pauseOnHover={true}>
        {company.map((data, index) => (
          <div key={index} className="mx-10">
            <img
              src={`/company/${data}.png`}
              alt="company"
              className="h-20 object-contain "
            />
          </div>
        ))}
      </Marquee>

    </div>
  );
};

export default Companies;
