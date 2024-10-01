import Link from "next/link";

const Breadcrumbs = ({ items }) => (
  <nav aria-label="breadcrumb">
    <ol className="flex space-x-2 text-gray-500">
      {items.map((item, index) => (
        <li key={index}>
          {index > 0 && <span>/</span>}
          <Link href={item.href}>
            <a className="text-blue-600 hover:underline">{item.name}</a>
          </Link>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
