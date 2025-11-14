import { useMutation } from '@tanstack/react-query';
import { apiClient } from './client';

export interface StretchParams {
  xStretch: number;
  yStretch: number;
  quality?: 'low' | 'medium' | 'high';
}

export interface UploadVideoResponse {
  id: string;
  originalUrl: string;
  processedUrl?: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

export const useUploadVideo = () => {
  return useMutation({
    mutationFn: async (videoFile: File): Promise<UploadVideoResponse> => {
      const formData = new FormData();
      formData.append('video', videoFile);

      const response = await apiClient.post('/stretch/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
  });
};

export const useStretchVideo = () => {
  return useMutation({
    mutationFn: async ({
      videoId,
      params,
    }: {
      videoId: string;
      params: StretchParams;
    }): Promise<UploadVideoResponse> => {
      const response = await apiClient.post(`/stretch/${videoId}/process`, params);
      return response.data;
    },
  });
};

export const useGetVideoStatus = () => {
  return useMutation({
    mutationFn: async (videoId: string): Promise<UploadVideoResponse> => {
      const response = await apiClient.get(`/stretch/${videoId}/status`);
      return response.data;
    },
  });
};