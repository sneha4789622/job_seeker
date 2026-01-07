
import { categories } from '../componentsData/CategoryD'
import { useDispatch } from 'react-redux';
import { setSeachedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';



function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    console.log("Searching for jobs with query:", query);
    // Implement search functionality here
    dispatch(setSeachedQuery(query));
    navigate('/browse');

  }
  return (
    <section className="mb-20 px-6 md:px-12">


      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
          Browse Job Categories
        </h3>
        <p className="text-gray-500 mt-2">
          Explore opportunities by category
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((items) => (
          <Category
            key={items.code}
            items={items}
            onSearch={searchJobHandler}
          />
        ))}
      </div>

    </section>
  );
}
export default Categories;


function Category({ items, onSearch }) {
  return (
    <button
      onClick={() => onSearch(items.Cname)}
      className="group bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full group-hover:bg-blue-950 transition">
        <img
          src={items.img}
          alt={items.Cname}
          className="h-8"
        />
      </div>

      <h4 className="font-semibold text-gray-800 group-hover:text-blue-950 transition">
        {items.Cname}
      </h4>
    </button>
  );
}
