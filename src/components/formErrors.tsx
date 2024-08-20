function FormErrors({ message }: { message?: string }) {
  return (
    <div className="text-sm text-red-500">
      <p>{message}</p>
    </div>
  );
}

export default FormErrors;
