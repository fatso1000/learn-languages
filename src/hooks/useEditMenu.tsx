import { useEffect, useState } from "react";

export function useEditMode(props?: any) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditIconMode, setIsEditIconMode] = useState<boolean>();

  const handleEditMode = (stateDefault?: boolean) =>
    setIsEditMode(
      typeof stateDefault === "boolean" ? stateDefault : !isEditMode
    );

  const handleEditIconMode = (stateDefault?: boolean) =>
    setIsEditIconMode(
      typeof stateDefault === "boolean" ? stateDefault : !isEditIconMode
    );

  useEffect(() => {
    const closeEditMode = () => {
      setIsEditMode(false);
      setIsEditIconMode(false);
    };

    closeEditMode();
  }, [props]);

  return {
    isEditMode,
    isEditIconMode,
    handleEditMode,
    handleEditIconMode,
  };
}
