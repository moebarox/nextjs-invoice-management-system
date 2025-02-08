import Link from 'next/link';

export default function SideMenu() {
  return (
    <ul>
      <li>
        <Link href="/create">Add Invoice</Link>
        <Link href="/">My Invoices</Link>
      </li>
    </ul>
  );
}
