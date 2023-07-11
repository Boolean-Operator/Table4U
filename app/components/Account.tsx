export default function Account({ data }: { data: any }) {
  return (
    <div>
      <h3>Hello, {data?.firstName}</h3>
    </div>
  );
}
