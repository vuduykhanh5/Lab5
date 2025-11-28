import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/tours", data)
      .then(() => {
        toast.success("Thêm mới tour thành công!");
        navigate("/tours");
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra: " + error.message);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới Tour</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Tên tour
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Tên tour là bắt buộc" })}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Giá
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: "Giá là bắt buộc", valueAsNumber: true })}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.price ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Mô tả
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Ảnh (URL)
          </label>
          <input
            type="url"
            id="image"
            {...register("image", { required: "URL ảnh là bắt buộc" })}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.image ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>


        <div>
          <label htmlFor="duration" className="block font-medium mb-1">
            Thời gian
          </label>
          <input
            type="text"
            id="duration"
            {...register("duration", { required: "Thời gian là bắt buộc" })}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.duration ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
        </div>
        
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Loại tour
          </label>
          <input
            type="text"
            id="category"
            {...register("category", { required: "Loại tour là bắt buộc" })}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.category ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              {...register("active")}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="active" className="text-gray-700">
              Kích hoạt
            </label>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thêm mới
        </button>
      </form>
    </div>
  );
}

export default Add;