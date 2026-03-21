import { useEffect } from "react";
import Modal from "../ui/modal/Modal";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useUpdateUser } from "../../hooks/useUsers";
import { useUserRoles } from "../../hooks/useUserRoles";
import CustomSelect from "../ui/CustomSelect";
import { formatErrors } from "../../helpers/formatErrors";

export default function UserUpdate({
  isOpen,
  onClose,
  onSuccess,
  selectedUser,
}) {
  const { allRoles } = useUserRoles();
  const { updateUser, isUpdating } = useUpdateUser(selectedUser?.id);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: selectedUser?.name || "",
      rol_id: selectedUser?.user_roles?.[0].id || "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset({
        name: selectedUser?.name || selectedUser.name || "",
        rol_id: selectedUser?.user_roles?.[0].id || "",
      });
    }
  }, [selectedUser, reset]);

  const nameValue = watch("name");
  useEffect(() => {
    if (errors.name?.type === "server") clearErrors("name");
  }, [nameValue, clearErrors, errors.name]);

  const onSubmit = (data) => {
    const updateData = {
      id: selectedUser?.id || selectedUser.id,
      ...data,
    };

    updateUser(updateData, {
      onSuccess: () => {
        toast.success("Usuario actualizado exitosamente");
        onSuccess();
      },
      onError: (error) => {
        if (error.errors) {
          formatErrors(error, setError);
        } else {
          toast.error(error.message || "Error al actualizar usuario");
        }
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Usuario"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={isUpdating ? "Actualizando..." : "Actualizar usuario"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="editUserName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="editUserName"
            isInvalid={!!errors.name}
            disabled={isUpdating}
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              validate: (v) =>
                v?.trim().length ? true : "El nombre es obligatorio",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* TODO: Cambiar luego para poder cambiar contraseña usando credenciales del portal */}
        {/* <Form.Group className="mb-3">
          <Form.Label htmlFor="editUserPassword">Contraseña</Form.Label>
          <Form.Control
            type="password"
            id="editUserPassword"
            isInvalid={!!errors.password}
            disabled={isUpdating}
            {...register("password", {
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastname?.message}
          </Form.Control.Feedback>
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Rol</Form.Label>
          <Controller
            name="rol_id"
            control={control}
            rules={{
              required: "El rol del usuario es obligatorio",
              validate: (value) =>
                value !== "" || "El rol del usuario es obligatorio",
            }}
            render={({ field }) => (
              <>
                <CustomSelect
                  onSelectChange={(e) => field.onChange(e.target.value)}
                  selectedValue={field.value}
                  className={
                    "form-select " + (errors.rol_id ? "is-invalid" : "")
                  }
                  optionValues={allRoles?.data?.map((role) => ({
                    label: role.name,
                    value: role.id,
                  }))}
                  disabled={isUpdating}
                />
                {errors.rol_id && (
                  <div className="invalid-feedback">
                    {errors.rol_id.message}
                  </div>
                )}
              </>
            )}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
}
