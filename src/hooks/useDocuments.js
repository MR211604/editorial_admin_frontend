import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDocument,
  getDocuments,
  toggleDocumentState,
  updateDocument,
  uploadDocumentImage,
} from "../api/documents/documentsService";

export const useDocuments = () => {
  const query = useQuery({
    queryKey: ["editorialDocuments"],
    queryFn: getDocuments,
  });

  return {
    documents: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};

export const useDocumentMutations = () => {
  const queryClient = useQueryClient();
  const refreshDocuments = () =>
    queryClient.invalidateQueries({ queryKey: ["editorialDocuments"] });

  const createMutation = useMutation({
    mutationFn: createDocument,
    onSuccess: refreshDocuments,
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, documentData }) => updateDocument(id, documentData),
    onSuccess: refreshDocuments,
  });
  const toggleMutation = useMutation({
    mutationFn: toggleDocumentState,
    onSuccess: refreshDocuments,
  });
  const uploadImageMutation = useMutation({ mutationFn: uploadDocumentImage });

  return {
    createDocument: createMutation.mutateAsync,
    updateDocument: updateMutation.mutateAsync,
    toggleDocumentState: toggleMutation.mutateAsync,
    uploadDocumentImage: uploadImageMutation.mutateAsync,
    isSaving:
      createMutation.isPending ||
      updateMutation.isPending ||
      uploadImageMutation.isPending,
  };
};
