import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    duration: "",
    available: "",
    category: "",
    active: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tours/${id}`);
        setTour(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Không thể tải thông tin tour!");
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTour((prevTour) => ({
      ...prevTour,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/tours/${id}`, tour);
      toast.success("Cập nhật tour thành công!");
      navigate("/tours");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật tour.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Đang tải...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cập nhật Tour</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Tên tour
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={tour.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Giá
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={tour.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Ảnh
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={tour.image}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Thời gian
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={tour.duration}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available">
              Số lượng
            </label>
            <input
              type="number"
              name="available"
              id="available"
              value={tour.available}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Loại
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={tour.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Mô tả
            </label>
            <textarea
              name="description"
              id="description"
              value={tour.description}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="active"
              id="active"
              checked={tour.active}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <label className="block text-gray-700 text-sm font-bold" htmlFor="active">
              Kích hoạt
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Cập nhật Tour
          </button>
          <button
            type="button"
            onClick={() => navigate("/tours")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPage;