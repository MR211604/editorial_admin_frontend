import { Controller, useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";
import { useUsers } from "../../hooks/useUsers";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import CustomSelect from "../ui/CustomSelect";
import { useUserRoles } from "../../hooks/useUserRoles";

export default function UserCreate({ isOpen, onClose, onSuccess }) {
  const { allRoles } = useUserRoles();
  const { createUser, isCreating } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const nameValue = watch("name");
  const passwordValue = watch("password");
  useEffect(() => {
    if (errors.name?.type === "server") clearErrors("name");
  }, [nameValue, clearErrors, errors.name]);
  useEffect(() => {
    if (errors.password?.type === "server") clearErrors("password");
  }, [passwordValue, clearErrors, errors.password]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    createUser(data, {
      onSuccess: () => {
        toast.success("Autor creado exitosamente");
        onSuccess();
        handleClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear nuevo usuario"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={"Crear Usuario"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="createAuthorName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="createAuthorName"
            isInvalid={!!errors.name}
            disabled={isCreating}
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
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Contraseña</Form.Label>
          <Form.Control
            type="password"
            id="password"
            isInvalid={!!errors.password}
            disabled={isCreating}
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
              maxLength: { value: 100, message: "Máximo 100 caracteres" },
              validate: (v) =>
                v?.trim().length ? true : "La contraseña es obligatoria",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

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
                  disabled={isCreating}
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
