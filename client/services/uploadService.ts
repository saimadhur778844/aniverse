import api from "@/lib/axios";

export interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
}

class UploadService {
  async uploadImage(
    file: File
  ): Promise<UploadResponse> {
    const formData = new FormData();

    formData.append("image", file);

    const { data } = await api.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return data;
  }

  async deleteImage(
    filename: string
  ) {
    const { data } =
      await api.delete(
        `/upload/${filename}`
      );

    return data;
  }
}

export default new UploadService();