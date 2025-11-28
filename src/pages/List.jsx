import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tours");
        setTours(response.data);
      } catch (error) {
        toast.error("Không thể tải danh sách tour!");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá tour này không?")) {
      try {
        await axios.delete(`http://localhost:3000/tours/${id}`);
        toast.success("Xoá tour thành công!");
        setTours(tours.filter((tour) => tour.id !== id));
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xoá tour.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Danh sách Tour</h1>
        <Link
          to="/tours/add"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Thêm mới Tour
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">#</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Tên tour</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Ảnh</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Giá</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Thời gian</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Loại</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Trạng thái</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-gray-700">{index + 1}</td>
                <td className="p-4 font-medium text-gray-800">{tour.name}</td>
                <td className="p-4">
                  <img src={tour.image} alt={tour.name} className="w-24 h-16 object-cover rounded-md" />
                </td>
                <td className="p-4 text-green-600 font-semibold">
                  {new Intl.NumberFormat("vi-VN").format(tour.price)} VNĐ
                </td>
                <td className="p-4 text-gray-600">{tour.duration}</td>
                <td className="p-4 text-gray-600">{tour.category}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    tour.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {tour.active ? 'Kích hoạt' : 'Ẩn'}
                  </span>
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <Link
                    to={`/tours/${tour.id}/edit`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
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
