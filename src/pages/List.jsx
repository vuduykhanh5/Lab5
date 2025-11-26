import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/tours/${id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("Xoá thành công");
      setTours(tours.filter((tour) => tour.id !== id));
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tên tour
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Giá
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.price}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <Link
                    to={`/tours/${tour.id}/edit`}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
