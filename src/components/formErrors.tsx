import { ReactNode } from "react";

function FormErrors({ children }: { children: ReactNode }) {
  return (
    <div className="text-sm text-red-500">
      <p>{children}</p>
    </div>
  );
}

export default FormErrors;
