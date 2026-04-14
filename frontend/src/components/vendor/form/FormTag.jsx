export default function FormTag({ children }) {
  return (
    <form className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-md rounded-lg">
      {children}
    </form>
  );
}
