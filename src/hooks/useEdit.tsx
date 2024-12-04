import { useEffect, useState } from "react";

export default function useEditUser(props?: unknown) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEditIconMode, setIsEditIconMode] = useState<boolean>();

  const handleEditMode = (stateDefault?: boolean) => {
    setIsEditMode(
      typeof stateDefault === "boolean" ? stateDefault : !isEditMode
    );
  };

  const handleEditIconMode = (stateDefault?: boolean) => {
    setIsEditIconMode(
      typeof stateDefault === "boolean" ? stateDefault : !isEditIconMode
    );
  };

  const closeEditMode = () => {
    setIsEditMode(false);
    setIsEditIconMode(false);
  };

  useEffect(() => {
    closeEditMode();
  }, [props]);

  return { isEditMode, handleEditMode, isEditIconMode, handleEditIconMode };
}
