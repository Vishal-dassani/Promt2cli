import api from "../api/axiosInstance";

export const generateCommand = async (prompt, shell) => {

    const response = await api.post("/api/commands/generate", {
        prompt,
        shell,
    });

    return response.data;
};